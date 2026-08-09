import { useMemo, useState } from "react";
import { Button, CodeSnippet, Tile } from "@carbon/react";
import type { PandasSelectionDevelopmentPack } from "@/types/content";

type Pack = PandasSelectionDevelopmentPack;
type ColumnId = Pack["filterColumns"][number]["id"];
type Operator = Pack["operators"][number];
type SelectionId = Pack["selectionExamples"][number]["id"];

const columnIndex: Record<ColumnId, number> = { Temperature: 1, Humidity: 2, Soil_Moisture: 3, Yield: 4 };
const compare = (value: number, operator: Operator, target: number) => operator === ">" ? value > target : operator === ">=" ? value >= target : operator === "<" ? value < target : operator === "<=" ? value <= target : value === target;

function FarmTable({ dataset, rows = dataset.rows, columns = dataset.columns, mask, indexes }: { dataset: Pack["dataset"]; rows?: number[][]; columns?: string[]; mask?: boolean[]; indexes?: Array<string | number> }) {
  return <div className="pandas-select-table-wrap"><table className="pandas-select-table"><thead><tr><th>index</th>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr className={mask?.[rowIndex] ? "is-match" : mask ? "is-muted" : ""} key={`${row[0]}-${rowIndex}`}><th>{indexes?.[rowIndex] ?? rowIndex}</th>{row.map((value, valueIndex) => <td key={`${row[0]}-${columns[valueIndex]}`}>{value}</td>)}</tr>)}</tbody></table></div>;
}

export function SelectionProblemStory({ dataset }: { dataset: Pack["dataset"] }) {
  return <section id="dataset" className="lesson-card"><p className="lesson-section-label">Agritech dataset</p><h2>Move from looking at rows to asking farm questions</h2><FarmTable dataset={dataset} /><div className="pandas-question-grid"><Tile><strong>Which fields need irrigation?</strong><span>Soil_Moisture &lt; 30</span></Tile><Tile><strong>Which fields are hot and productive?</strong><span>Temperature &gt; 30 AND Yield &gt; 500</span></Tile><Tile><strong>Which details matter?</strong><span>Select Field ID, Temperature, and Yield</span></Tile></div></section>;
}

function selectionResult(id: SelectionId, dataset: Pack["dataset"]) {
  if (id === "columns") return { columns: ["Field_ID", "Temperature", "Yield"], rows: dataset.rows.map((r) => [r[0], r[1], r[4]]), indexes: [0, 1, 2, 3, 4, 5] };
  if (id === "loc-row") return { columns: dataset.columns.slice(1), rows: [[...dataset.rows[2].slice(1)]], indexes: [103] };
  if (id === "loc-range") return { columns: dataset.columns.slice(1), rows: dataset.rows.slice(0, 4).map((r) => r.slice(1)), indexes: [101, 102, 103, 104] };
  if (id === "loc-grid") return { columns: ["Temperature", "Yield"], rows: [dataset.rows[0], dataset.rows[2], dataset.rows[4]].map((r) => [r[1], r[4]]), indexes: [101, 103, 105] };
  if (id === "iloc-row") return { columns: dataset.columns, rows: [dataset.rows[2]], indexes: [2] };
  return { columns: ["Field_ID", "Humidity", "Yield"], rows: dataset.rows.slice(0, 3).map((r) => [r[0], r[2], r[4]]), indexes: [0, 1, 2] };
}

export function LocIlocExplorer({ dataset, examples }: { dataset: Pack["dataset"]; examples: Pack["selectionExamples"] }) {
  const [mode, setMode] = useState<SelectionId>("loc-grid");
  const active = examples.find((example) => example.id === mode) ?? examples[0];
  const result = selectionResult(mode, dataset);
  return <section id="loc-iloc" className="lesson-card"><p className="lesson-section-label">Interactive loc vs iloc</p><h2>Labels answer “which identity?”; positions answer “where?”</h2><div className="pandas-selector-mental"><Tile><code>loc[]</code><strong>Labels</strong><span>Field 103 · Temperature</span></Tile><Tile><code>iloc[]</code><strong>Positions</strong><span>Row 2 · Column 1</span></Tile></div><div className="pandas-select-tabs" role="tablist" aria-label="Selection example">{examples.map((example) => <button type="button" role="tab" aria-selected={mode === example.id} className={mode === example.id ? "is-active" : ""} onClick={() => setMode(example.id)} key={example.id}>{example.label}</button>)}</div><div className="pandas-selection-result"><Tile><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><p>{active.explanation}</p></Tile><FarmTable dataset={dataset} columns={result.columns} rows={result.rows} indexes={result.indexes} /></div><p className="pandas-inclusive-note"><strong>Remember:</strong> <code>loc[101:104]</code> includes label 104; <code>iloc[0:4]</code> excludes position 4.</p></section>;
}

export function FarmDataFilterLab({ dataset, columns, operators }: { dataset: Pack["dataset"]; columns: Pack["filterColumns"]; operators: Pack["operators"] }) {
  const [column, setColumn] = useState<ColumnId>("Temperature");
  const [operator, setOperator] = useState<Operator>(">");
  const [target, setTarget] = useState(30);
  const index = columnIndex[column];
  const mask = dataset.rows.map((row) => compare(row[index], operator, target));
  const matched = dataset.rows.filter((_, rowIndex) => mask[rowIndex]);
  const code = `df[df["${column}"] ${operator} ${target}]`;
  return <section id="filter-lab" className="lesson-card"><p className="lesson-section-label">Interactive Farm Data Filter Lab</p><h2>Turn one condition into a Boolean mask and matching records</h2><div className="pandas-filter-controls"><label>Column<select value={column} onChange={(event) => setColumn(event.target.value as ColumnId)}>{columns.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label><label>Operator<select value={operator} onChange={(event) => setOperator(event.target.value as Operator)}>{operators.map((item) => <option value={item} key={item}>{item}</option>)}</select></label><label>Value<input type="number" value={target} onChange={(event) => setTarget(Number(event.target.value))} /></label></div><div className="pandas-mask-strip"><strong>Boolean mask</strong>{mask.map((value, indexValue) => <span className={value ? "is-true" : ""} key={dataset.rows[indexValue][0]}>{value ? "True" : "False"}</span>)}</div><FarmTable dataset={dataset} rows={matched} indexes={matched.map((row) => row[0])} /><div className="pandas-generated-code"><CodeSnippet type="single" feedback="Copied">{code}</CodeSnippet><strong>{matched.length} matching field{matched.length === 1 ? "" : "s"}</strong></div></section>;
}

export function MultiConditionBuilder({ dataset, columns, operators }: { dataset: Pack["dataset"]; columns: Pack["filterColumns"]; operators: Pack["operators"] }) {
  const [columnA, setColumnA] = useState<ColumnId>("Temperature");
  const [operatorA, setOperatorA] = useState<Operator>(">");
  const [targetA, setTargetA] = useState(30);
  const [join, setJoin] = useState<"AND" | "OR">("AND");
  const [columnB, setColumnB] = useState<ColumnId>("Soil_Moisture");
  const [operatorB, setOperatorB] = useState<Operator>("<");
  const [targetB, setTargetB] = useState(35);
  const matches = useMemo(() => dataset.rows.filter((row) => { const a = compare(row[columnIndex[columnA]], operatorA, targetA); const b = compare(row[columnIndex[columnB]], operatorB, targetB); return join === "AND" ? a && b : a || b; }), [columnA, operatorA, targetA, join, columnB, operatorB, targetB, dataset.rows]);
  const symbol = join === "AND" ? "&" : "|";
  const code = `df[\n    (df["${columnA}"] ${operatorA} ${targetA}) ${symbol}\n    (df["${columnB}"] ${operatorB} ${targetB})\n]`;
  const field = (value: ColumnId, set: (value: ColumnId) => void) => <select value={value} onChange={(event) => set(event.target.value as ColumnId)}>{columns.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select>;
  const op = (value: Operator, set: (value: Operator) => void) => <select value={value} onChange={(event) => set(event.target.value as Operator)}>{operators.map((item) => <option value={item} key={item}>{item}</option>)}</select>;
  return <section id="condition-builder" className="lesson-card"><p className="lesson-section-label">Multi-condition builder</p><h2>Combine masks with element-wise AND or OR</h2><div className="pandas-condition-row"><span>Condition 1</span>{field(columnA, setColumnA)}{op(operatorA, setOperatorA)}<input aria-label="Condition 1 value" type="number" value={targetA} onChange={(event) => setTargetA(Number(event.target.value))} /></div><div className="pandas-join-toggle"><Button size="sm" kind={join === "AND" ? "primary" : "tertiary"} onClick={() => setJoin("AND")}>AND · &amp;</Button><Button size="sm" kind={join === "OR" ? "primary" : "tertiary"} onClick={() => setJoin("OR")}>OR · |</Button></div><div className="pandas-condition-row"><span>Condition 2</span>{field(columnB, setColumnB)}{op(operatorB, setOperatorB)}<input aria-label="Condition 2 value" type="number" value={targetB} onChange={(event) => setTargetB(Number(event.target.value))} /></div><div className="pandas-builder-result"><FarmTable dataset={dataset} rows={matches} indexes={matches.map((row) => row[0])} /><Tile><CodeSnippet type="multi" feedback="Copied">{code}</CodeSnippet><strong>Fields: {matches.map((row) => row[0]).join(", ") || "none"}</strong><p>Use <code>{symbol}</code>, not Python <code>{join === "AND" ? "and" : "or"}</code>, and parenthesize each Series condition.</p></Tile></div></section>;
}

export function QueryPatternExplorer({ examples }: { examples: Pack["queryExamples"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = examples[activeIndex];
  return <section id="query-patterns" className="lesson-card"><p className="lesson-section-label">isin, between, query, and NOT</p><h2>Choose the clearest tool for the question</h2><div className="pandas-query-layout"><div>{examples.map((example, index) => <button type="button" className={index === activeIndex ? "is-active" : ""} onClick={() => setActiveIndex(index)} key={example.title}>{example.title}</button>)}</div><Tile><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><strong>{active.result}</strong><p>{active.explanation}</p></Tile></div></section>;
}

export function PandasSelectionQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Select and filter at a glance</h2><div className="pandas-selection-reference">{rows.map((row) => <Tile key={row.task}><strong>{row.task}</strong><code>{row.code}</code></Tile>)}</div></section>;
}
