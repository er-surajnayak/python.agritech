import { useState } from "react";
import { CodeSnippet, Tile } from "@carbon/react";
import type { PandasGroupByDevelopmentPack } from "@/types/content";

type Pack = PandasGroupByDevelopmentPack;
type GroupColumn = Pack["groupColumns"][number];
type MetricColumn = Pack["metricColumns"][number];
type Aggregation = Pack["aggregations"][number]["id"];
type Cell = number | string;
const columnIndex: Record<string, number> = { Field_ID: 0, Crop: 1, Region: 2, Temperature: 3, Soil_Moisture: 4, Yield: 5 };

function AnalysisTable({ columns, rows, highlight }: { columns: string[]; rows: Cell[][]; highlight?: string }) {
  return <div className="pandas-group-table-wrap"><table className="pandas-group-table"><thead><tr>{columns.map((column) => <th className={column === highlight ? "is-result" : ""} key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={`${rowIndex}-${String(row[0])}`}>{row.map((value, index) => <td className={columns[index] === highlight ? "is-result" : ""} key={`${rowIndex}-${columns[index]}`}>{typeof value === "number" && !Number.isInteger(value) ? value.toFixed(2) : String(value)}</td>)}</tr>)}</tbody></table></div>;
}

function aggregate(values: number[], operation: Aggregation) {
  if (operation === "count") return values.length;
  if (operation === "sum") return values.reduce((total, value) => total + value, 0);
  if (operation === "min") return Math.min(...values);
  if (operation === "max") return Math.max(...values);
  const sorted = [...values].sort((a, b) => a - b);
  if (operation === "median") return sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  const mean = values.reduce((total, value) => total + value, 0) / values.length;
  if (operation === "std") return values.length < 2 ? "NaN" : Math.sqrt(values.reduce((total, value) => total + (value - mean) ** 2, 0) / (values.length - 1));
  return mean;
}

function groupedRows(rows: Cell[][], groups: GroupColumn[], metric: MetricColumn, operation: Aggregation): Cell[][] {
  const buckets = new Map<string, { labels: Cell[]; values: number[] }>();
  rows.forEach((row) => {
    const labels = groups.map((group) => row[columnIndex[group]]);
    const key = labels.join("||");
    const current = buckets.get(key) ?? { labels, values: [] };
    current.values.push(Number(row[columnIndex[metric]]));
    buckets.set(key, current);
  });
  return [...buckets.values()].map((bucket) => [...bucket.labels, aggregate(bucket.values, operation)]);
}

export function GroupByConcept() {
  const functions = [["mean", "average"], ["sum", "total"], ["min", "smallest"], ["max", "largest"], ["median", "middle"], ["count", "non-missing"], ["std", "variation"]];
  return <section id="groupby-concept" className="lesson-card"><p className="lesson-section-label">Split · apply · combine</p><h2>Grouping turns repeated categories into comparable summaries</h2><div className="pandas-group-flow"><span>Original rows</span><span>Group by Crop</span><span>Aggregate Yield</span><span>One result per crop</span></div><div className="pandas-aggregation-legend">{functions.map(([name, meaning]) => <Tile key={name}><code>.{name}()</code><strong>{meaning}</strong></Tile>)}</div><div className="pandas-count-size"><Tile><strong>count()</strong><span>Counts non-missing values in a selected column.</span></Tile><Tile><strong>size()</strong><span>Counts all rows in each group—even when a metric is missing.</span></Tile></div></section>;
}

export function FarmGroupByExplorer({ pack }: { pack: Pack }) {
  const [group, setGroup] = useState<GroupColumn>("Crop");
  const [metric, setMetric] = useState<MetricColumn>("Yield");
  const [operation, setOperation] = useState<Aggregation>("mean");
  const active = pack.aggregations.find((item) => item.id === operation) ?? pack.aggregations[0];
  const result = groupedRows(pack.dataset.rows, [group], metric, operation);
  const method = operation === "count" ? "count" : operation;
  return <section id="groupby-explorer" className="lesson-card"><p className="lesson-section-label">Interactive Agritech GroupBy Explorer</p><h2>Change the analytical question and watch the summary update</h2><div className="pandas-group-controls"><label>Group by<select value={group} onChange={(event) => setGroup(event.target.value as GroupColumn)}>{pack.groupColumns.map((column) => <option key={column}>{column}</option>)}</select></label><label>Metric<select value={metric} onChange={(event) => setMetric(event.target.value as MetricColumn)}>{pack.metricColumns.map((column) => <option key={column}>{column}</option>)}</select></label><label>Aggregation<select value={operation} onChange={(event) => setOperation(event.target.value as Aggregation)}>{pack.aggregations.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label></div><AnalysisTable columns={[group, `${active.label} ${metric}`]} rows={result} highlight={`${active.label} ${metric}`} /><Tile className="pandas-group-code"><CodeSnippet type="multi" feedback="Copied">{`df.groupby("${group}")["${metric}"].${method}()`}</CodeSnippet><p>{active.explanation} The grouped object becomes useful only after choosing a metric and calculation.</p></Tile></section>;
}

export function MultiGroupExplorer({ pack }: { pack: Pack }) {
  const [operation, setOperation] = useState<Aggregation>("mean");
  const result = groupedRows(pack.dataset.rows, ["Crop", "Region"], "Yield", operation);
  return <section id="multi-group-explorer" className="lesson-card"><p className="lesson-section-label">Multi-Group Explorer</p><h2>Nest Region inside each Crop</h2><div className="pandas-multi-group-head"><div><strong>Crop</strong><span>first grouping level</span></div><div><strong>Region</strong><span>second grouping level</span></div><label>Aggregation<select value={operation} onChange={(event) => setOperation(event.target.value as Aggregation)}>{pack.aggregations.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label></div><AnalysisTable columns={["Crop", "Region", `${operation} Yield`]} rows={result} highlight={`${operation} Yield`} /><CodeSnippet type="multi" feedback="Copied">{`df.groupby(["Crop", "Region"])["Yield"].${operation}()`}</CodeSnippet></section>;
}

type AggSelection = Record<"Yield" | "Soil_Moisture" | "Temperature", Array<"mean" | "min" | "max">>;
export function AggregationBuilder({ options, rows }: { options: Pack["aggOptions"]; rows: Cell[][] }) {
  const [selected, setSelected] = useState<AggSelection>({ Yield: ["mean"], Soil_Moisture: ["mean"], Temperature: ["max"] });
  const toggle = (column: keyof AggSelection, fn: "mean" | "min" | "max") => setSelected((current) => ({ ...current, [column]: current[column].includes(fn) ? current[column].filter((item) => item !== fn) : [...current[column], fn] }));
  const activeEntries = Object.entries(selected).filter(([, functions]) => functions.length) as Array<[keyof AggSelection, Array<"mean" | "min" | "max">]>;
  const summary = ["Rice", "Wheat", "Maize"].map((crop) => {
    const cropRows = rows.filter((row) => row[1] === crop);
    return [crop, ...activeEntries.flatMap(([column, functions]) => functions.map((fn) => aggregate(cropRows.map((row) => Number(row[columnIndex[column]])), fn)))];
  });
  const codeBody = activeEntries.map(([column, functions]) => `    "${column}": [${functions.map((fn) => `"${fn}"`).join(", ")}]`).join(",\n");
  const headers = ["Crop", ...activeEntries.flatMap(([column, functions]) => functions.map((fn) => `${column} · ${fn}`))];
  return <section id="agg-builder" className="lesson-card"><p className="lesson-section-label">agg() Builder</p><h2>Assign several calculations to the columns that need them</h2><div className="pandas-agg-options">{options.map((option) => <Tile key={option.column}><strong>{option.column}</strong>{option.functions.map((fn) => <label key={fn}><input type="checkbox" checked={selected[option.column].includes(fn)} onChange={() => toggle(option.column, fn)} /> {fn}</label>)}</Tile>)}</div>{activeEntries.length ? <><AnalysisTable columns={headers} rows={summary} /><CodeSnippet type="multi" feedback="Copied">{`df.groupby("Crop").agg({\n${codeBody}\n})`}</CodeSnippet></> : <p className="pandas-agg-empty">Select at least one aggregation to build the summary.</p>}<p className="pandas-named-agg"><strong>Named aggregation produces cleaner labels:</strong> <code>average_yield=("Yield", "mean")</code></p></section>;
}

export function TransformVisualizer({ rows }: { rows: Cell[][] }) {
  const cropMeans = new Map<string, number>();
  ["Rice", "Wheat", "Maize"].forEach((crop) => {
    const values = rows.filter((row) => row[1] === crop).map((row) => Number(row[5]));
    cropMeans.set(crop, Number(aggregate(values, "mean")));
  });
  const transformed = rows.map((row) => {
    const mean = cropMeans.get(String(row[1])) ?? 0;
    return [row[0], row[1], row[5], mean, Number(row[5]) - mean];
  });
  return <section id="transform-visualizer" className="lesson-card"><p className="lesson-section-label">transform() Visualizer</p><h2>Broadcast each group average back to its original rows</h2><div className="pandas-transform-story"><Tile><strong>groupby().mean()</strong><span>3 crop-level results</span></Tile><span>versus</span><Tile><strong>groupby().transform("mean")</strong><span>8 row-aligned results</span></Tile></div><AnalysisTable columns={["Field_ID", "Crop", "Yield", "Crop_Avg_Yield", "Yield_vs_Crop_Avg"]} rows={transformed} highlight="Yield_vs_Crop_Avg" /><CodeSnippet type="multi" feedback="Copied">{`df["Crop_Avg_Yield"] = df.groupby("Crop")["Yield"].transform("mean")
df["Yield_vs_Crop_Avg"] = df["Yield"] - df["Crop_Avg_Yield"]`}</CodeSnippet><p className="pandas-transform-note">Positive differences perform above their crop average; negative differences perform below it.</p></section>;
}

export function GroupedResultPatterns() {
  return <section id="result-patterns" className="lesson-card"><p className="lesson-section-label">Analysis-ready summaries</p><h2>Name, filter, sort, and restore columns intentionally</h2><div className="pandas-result-patterns"><Tile><code>as_index=False</code><strong>Keep Crop as a column</strong></Tile><Tile><code>.reset_index()</code><strong>Move grouped labels back to columns</strong></Tile><Tile><code>.sort_values(...)</code><strong>Rank by the calculated metric</strong></Tile><Tile><code>summary[summary["Yield"] &gt; 480]</code><strong>Filter aggregated results</strong></Tile></div></section>;
}

export function PandasGroupByQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Pandas grouping essentials</h2><div className="pandas-group-reference">{rows.map((row) => <Tile key={row.task}><strong>{row.task}</strong><code>{row.code}</code></Tile>)}</div></section>;
}
