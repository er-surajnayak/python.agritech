import { useState } from "react";
import { CodeSnippet, Tile } from "@carbon/react";
import type { PandasCombiningReshapingDevelopmentPack } from "@/types/content";

type Pack = PandasCombiningReshapingDevelopmentPack;
type Cell = number | string | null;
type MergeHow = "inner" | "left" | "right" | "outer";
type Combination = "concat" | "merge" | "join";
type Reshape = "pivot" | "pivot_table" | "melt";

function DataTable({ columns, rows, highlight }: { columns: string[]; rows: Cell[][]; highlight?: string[] }) {
  return <div className="pandas-combine-table-wrap"><table className="pandas-combine-table"><thead><tr>{columns.map((column) => <th className={highlight?.includes(column) ? "is-key" : ""} key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={`${rowIndex}-${String(row[0])}`}>{row.map((value, index) => <td className={highlight?.includes(columns[index]) ? "is-key" : ""} key={`${rowIndex}-${columns[index]}`}>{value === null ? "NaN" : String(value)}</td>)}</tr>)}</tbody></table></div>;
}

function mergeRows(pack: Pack, how: MergeHow) {
  const fieldMap = new Map(pack.fields.rows.map((row) => [Number(row[0]), row]));
  const sensorMap = new Map(pack.sensor.rows.map((row) => [Number(row[0]), row]));
  const leftKeys = pack.fields.rows.map((row) => Number(row[0]));
  const rightKeys = pack.sensor.rows.map((row) => Number(row[0]));
  const keys = how === "inner" ? leftKeys.filter((key) => sensorMap.has(key)) : how === "left" ? leftKeys : how === "right" ? rightKeys : [...new Set([...leftKeys, ...rightKeys])];
  return keys.map((key) => {
    const left = fieldMap.get(key);
    const right = sensorMap.get(key);
    return [key, left?.[1] ?? null, left?.[2] ?? null, right?.[1] ?? null, right?.[2] ?? null] as Cell[];
  });
}

export function CombinationConcept() {
  const methods = [
    ["concat()", "Stack compatible rows or align columns by index"],
    ["merge()", "Match related records with one or more keys"],
    ["join()", "Connect DataFrames through their indexes"],
    ["pivot()", "Turn unique row values into columns"],
    ["pivot_table()", "Reshape while aggregating duplicates"],
    ["melt()", "Turn wide columns into long observations"],
  ];
  return <section id="combine-concept" className="lesson-card"><p className="lesson-section-label">Combine first · reshape second</p><h2>Choose the operation from the relationship between records</h2><div className="pandas-combine-axis"><Tile><strong>Vertical</strong><span>row + row</span><code>concat(axis=0)</code></Tile><Tile><strong>Horizontal</strong><span>column + column</span><code>concat(axis=1)</code></Tile><Tile><strong>Relational</strong><span>key ↔ key</span><code>merge()</code></Tile></div><div className="pandas-combine-methods">{methods.map(([method, meaning]) => <Tile key={method}><code>{method}</code><span>{meaning}</span></Tile>)}</div><p className="pandas-combine-warning"><strong>Important:</strong> horizontal concat aligns indexes. It does not search for matching <code>Field_ID</code> values.</p></section>;
}

export function MergeTypesVisualizer({ pack }: { pack: Pack }) {
  const [how, setHow] = useState<MergeHow>("inner");
  const descriptions: Record<MergeHow, string> = { inner: "Common keys only", left: "Every field plus matching sensor data", right: "Every sensor row plus matching field data", outer: "Every key from both datasets" };
  return <section id="merge-types" className="lesson-card"><p className="lesson-section-label">Merge types visual</p><h2>Change which side is guaranteed to survive</h2><div className="pandas-merge-tabs">{(["inner", "left", "right", "outer"] as MergeHow[]).map((item) => <button className={how === item ? "is-active" : ""} onClick={() => setHow(item)} type="button" key={item}>{item}</button>)}</div><div className="pandas-key-sets"><span>Fields · 101 102 103 104</span><strong>{descriptions[how]}</strong><span>Sensor · 101 102 103 105</span></div><DataTable columns={["Field_ID", "Crop", "Region", "Temperature", "Moisture"]} rows={mergeRows(pack, how)} highlight={["Field_ID"]} /><CodeSnippet type="multi" feedback="Copied">{`pd.merge(fields, sensor, on="Field_ID", how="${how}")`}</CodeSnippet></section>;
}

export function FarmDataIntegrationLab({ pack }: { pack: Pack }) {
  const [operation, setOperation] = useState<Combination>("merge");
  const [how, setHow] = useState<MergeHow>("left");
  const jan = pack.yieldData.rows.slice(0, 2);
  const feb = pack.yieldData.rows.slice(2);
  const result = operation === "concat" ? [...jan, ...feb] : mergeRows(pack, operation === "join" ? "left" : how);
  const columns = operation === "concat" ? pack.yieldData.columns : ["Field_ID", "Crop", "Region", "Temperature", "Moisture"];
  const code = operation === "concat" ? "pd.concat([jan, feb], ignore_index=True)" : operation === "join" ? `fields.set_index("Field_ID").join(sensor.set_index("Field_ID"), how="left")` : `pd.merge(fields, sensor, on="Field_ID", how="${how}")`;
  return <section id="integration-lab" className="lesson-card"><p className="lesson-section-label">Interactive Farm Data Integration Lab</p><h2>Stack records, match keys, or align indexes</h2><div className="pandas-source-cards"><Tile><strong>Field Data</strong><span>Crop and Region</span><small>IDs 101–104</small></Tile><Tile><strong>Sensor Data</strong><span>Temperature and Moisture</span><small>IDs 101, 102, 103, 105</small></Tile><Tile><strong>Yield Data</strong><span>Monthly-compatible records</span><small>IDs 101–104</small></Tile></div><div className="pandas-combine-controls"><label>Operation<select value={operation} onChange={(event) => setOperation(event.target.value as Combination)}><option value="concat">concat</option><option value="merge">merge</option><option value="join">join</option></select></label><label>Key<input value="Field_ID" readOnly /></label><label>How<select value={how} disabled={operation !== "merge"} onChange={(event) => setHow(event.target.value as MergeHow)}>{(["inner", "left", "right", "outer"] as MergeHow[]).map((item) => <option key={item}>{item}</option>)}</select></label></div><div className="pandas-combine-equation"><span>Dataset A</span><b>+</b><span>Dataset B</span><b>→</b><strong>{operation}()</strong></div><DataTable columns={columns} rows={result} highlight={operation === "concat" ? undefined : ["Field_ID"]} /><Tile className="pandas-combine-code"><CodeSnippet type="multi" feedback="Copied">{code}</CodeSnippet><p>{operation === "concat" ? "Rows are stacked and a fresh index is created." : operation === "join" ? "Field_ID becomes the index before index-based alignment." : `${how} controls which Field_ID keys remain.`}</p></Tile></section>;
}

export function ReshapingLab({ pack }: { pack: Pack }) {
  const [operation, setOperation] = useState<Reshape>("pivot");
  const pivotRows: Cell[][] = [[101, 500, 520], [102, 470, 490]];
  const cropYield = new Map(pack.yieldData.rows.map((row) => [Number(row[0]), Number(row[1])]));
  const buckets = new Map<string, number[]>();
  pack.fields.rows.forEach((row) => { const key = `${row[1]}||${row[2]}`; buckets.set(key, [...(buckets.get(key) ?? []), cropYield.get(Number(row[0])) ?? 0]); });
  const crops = ["Rice", "Wheat", "Maize"];
  const pivotTableRows = crops.map((crop) => { const north = buckets.get(`${crop}||North`); const south = buckets.get(`${crop}||South`); const mean = (values?: number[]) => values?.length ? values.reduce((a, b) => a + b, 0) / values.length : null; return [crop, mean(north), mean(south)] as Cell[]; });
  const meltRows = pack.monthlyWide.rows.flatMap((row) => [1, 2, 3].map((index) => [row[0], pack.monthlyWide.columns[index], row[index]] as Cell[]));
  const config = operation === "pivot" ? { before: pack.monthlyLong, columns: ["Field_ID", "Jan", "Feb"], rows: pivotRows, code: `df.pivot(index="Field_ID", columns="Month", values="Yield")`, note: "pivot requires one value for every Field_ID–Month pair." } : operation === "pivot_table" ? { before: { columns: ["Field_ID", "Crop", "Region", "Yield"], rows: pack.fields.rows.map((row) => [row[0], row[1], row[2], cropYield.get(Number(row[0])) ?? null]) }, columns: ["Crop", "North", "South"], rows: pivotTableRows, code: `df.pivot_table(index="Crop", columns="Region", values="Yield", aggfunc="mean")`, note: "pivot_table aggregates repeated Crop–Region pairs." } : { before: pack.monthlyWide, columns: ["Field_ID", "Month", "Yield"], rows: meltRows, code: `df.melt(id_vars="Field_ID", var_name="Month", value_name="Yield")`, note: "melt preserves Field_ID and converts month columns into observations." };
  return <section id="reshaping-lab" className="lesson-card"><p className="lesson-section-label">Interactive Reshaping Lab</p><h2>Move between long observations and readable summaries</h2><div className="pandas-reshape-tabs">{(["pivot", "pivot_table", "melt"] as Reshape[]).map((item) => <button className={operation === item ? "is-active" : ""} onClick={() => setOperation(item)} type="button" key={item}>{item}</button>)}</div><div className="pandas-reshape-before-after"><div><span>Before</span><DataTable columns={config.before.columns} rows={config.before.rows} /></div><b>→</b><div><span>After</span><DataTable columns={config.columns} rows={config.rows} /></div></div><CodeSnippet type="multi" feedback="Copied">{config.code}</CodeSnippet><p className="pandas-reshape-note">{config.note}</p></section>;
}

export function OperationDecisionSimulator({ decisions }: { decisions: Pack["decisions"] }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const scenario = decisions[index];
  const operations = ["concat", "merge", "join", "pivot", "pivot_table", "melt"];
  const choose = (value: string) => setAnswer(value);
  const next = () => { setIndex((current) => (current + 1) % decisions.length); setAnswer(null); };
  return <section id="operation-decider" className="lesson-card"><p className="lesson-section-label">Choose the right Pandas operation</p><h2>Let the data relationship choose the method</h2><div className="pandas-decision-progress">Scenario {index + 1} of {decisions.length}</div><p className="pandas-decision-question">{scenario.question}</p><div className="pandas-operation-choices">{operations.map((operation) => <button className={answer === operation ? "is-selected" : ""} onClick={() => choose(operation)} type="button" key={operation}>{operation}()</button>)}</div>{answer && <Tile className={answer === scenario.answer ? "is-correct" : "is-incorrect"}><strong>{answer === scenario.answer ? "Correct" : `Use ${scenario.answer}()`}</strong><p>{scenario.explanation}</p><button onClick={next} type="button">Next scenario</button></Tile>}</section>;
}

export function CombiningDecisionMap() {
  const rows = [["Stack rows", "concat()"], ["Align columns by index", "concat(axis=1)"], ["Match a key", "merge()"], ["Connect indexes", "join()"], ["Values → columns", "pivot()"], ["Pivot + summarize", "pivot_table()"], ["Wide → long", "melt()"]];
  return <section id="decision-map" className="lesson-card"><p className="lesson-section-label">Final decision map</p><h2>Start with what you need the records to do</h2><div className="pandas-combine-decision-map">{rows.map(([need, method]) => <Tile key={need}><span>{need}</span><strong>{method}</strong></Tile>)}</div></section>;
}

export function PandasCombiningQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Pandas combining and reshaping essentials</h2><div className="pandas-combine-reference">{rows.map((row) => <Tile key={row.task}><strong>{row.task}</strong><code>{row.code}</code></Tile>)}</div></section>;
}
