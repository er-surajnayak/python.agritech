import { useState } from "react";
import { CodeSnippet, Tile } from "@carbon/react";
import { DataTable, Filter, TagGroup } from "@carbon/icons-react";
import type { PandasSeriesDevelopmentPack } from "@/types/content";

type Pack = PandasSeriesDevelopmentPack;
type OperationId = Pack["operations"][number]["id"];

function SeriesVisual({ labels, values, name, active = [] }: { labels: Array<string | number>; values: number[]; name: string; active?: number[] }) {
  return <div className="pandas-series-visual"><div className="is-heading"><strong>index</strong><strong>{name}</strong></div>{values.map((value, index) => <div className={active.includes(index) ? "is-active" : ""} key={String(labels[index])}><span>{labels[index]}</span><strong>{value}</strong></div>)}<div className="is-dtype"><span>dtype</span><code>int64</code></div></div>;
}

export function NumpyPandasBridge({ comparison }: { comparison: Pack["comparison"] }) {
  return <section id="bridge" className="lesson-card"><p className="lesson-section-label">NumPy → Pandas</p><h2>Add labels and tabular meaning to numerical data</h2><div className="pandas-bridge-flow"><Tile><code>np.array([28, 32, 35, 29])</code><strong>Numerical values</strong></Tile><span>→</span><Tile><code>pd.Series(...)</code><strong>Labeled values</strong></Tile></div><div className="pandas-comparison-table"><div className="is-heading"><strong>Feature</strong><strong>NumPy</strong><strong>Pandas</strong></div>{comparison.map((row) => <div key={row.feature}><span>{row.feature}</span><span>{row.numpy}</span><span>{row.pandas}</span></div>)}</div></section>;
}

export function FarmSensorSeriesExplorer({ series, operations }: { series: Pack["series"]; operations: Pack["operations"] }) {
  const [mode, setMode] = useState<OperationId>("create");
  const active = operations.find((operation) => operation.id === mode) ?? operations[0];
  const highlighted = mode === "filter" ? series.values.flatMap((value, index) => value > 30 ? [index] : []) : mode === "loc" || mode === "iloc" ? [0] : [];
  return <section id="series-explorer" className="lesson-card"><p className="lesson-section-label">Interactive Farm Sensor Series Explorer</p><h2>See labels, values, access, filtering, and statistics together</h2><div className="pandas-series-tabs" role="tablist" aria-label="Series operation">{operations.map((operation) => <button type="button" role="tab" aria-selected={mode === operation.id} className={mode === operation.id ? "is-active" : ""} onClick={() => setMode(operation.id)} key={operation.id}>{operation.id === "filter" ? <Filter size={18} /> : operation.id === "index" || operation.id === "values" ? <TagGroup size={18} /> : <DataTable size={18} />}{operation.label}</button>)}</div><div className="pandas-series-explorer-layout"><SeriesVisual labels={series.labels} values={series.values} name={series.name} active={highlighted} /><Tile><span>Result</span><pre>{active.output}</pre><p>{active.explanation}</p><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet></Tile></div><div className="pandas-access-distinction"><Tile><code>.loc[label]</code><strong>Label-based</strong><span>Ask for “Farm A”</span></Tile><Tile><code>.iloc[position]</code><strong>Position-based</strong><span>Ask for item 0</span></Tile></div></section>;
}

export function SeriesPropertiesMethods({ properties, methods }: { properties: Pack["properties"]; methods: Pack["methods"] }) {
  const [mode, setMode] = useState<"properties" | "methods">("properties");
  const rows = mode === "properties" ? properties : methods;
  return <section id="inspect" className="lesson-card"><p className="lesson-section-label">Inspect and summarize</p><h2>Properties describe the Series; methods calculate results</h2><div className="pandas-series-tabs" role="tablist" aria-label="Properties or methods"><button type="button" role="tab" aria-selected={mode === "properties"} className={mode === "properties" ? "is-active" : ""} onClick={() => setMode("properties")}>Series properties</button><button type="button" role="tab" aria-selected={mode === "methods"} className={mode === "methods" ? "is-active" : ""} onClick={() => setMode("methods")}>Statistical methods</button></div><div className="pandas-property-grid">{rows.map((row) => <Tile key={row.name}><code>{row.name}</code><strong>{row.result}</strong><span>{row.purpose}</span></Tile>)}</div><Tile className="pandas-method-note"><strong>{mode === "properties" ? "No parentheses" : "Call with parentheses"}</strong><code>{mode === "properties" ? "temperature.shape" : "temperature.mean()"}</code></Tile></section>;
}

export function IrrigationSeriesPanel({ content }: { content: Pack["moisture"] }) {
  const active = content.values.flatMap((value, index) => value < content.threshold ? [index] : []);
  return <section id="irrigation" className="lesson-card"><p className="lesson-section-label">Agritech Series decision</p><h2>Labels make the filtered result immediately actionable</h2><div className="pandas-irrigation-layout"><SeriesVisual labels={content.labels} values={content.values} name="Soil Moisture" active={active} /><Tile><span>Rule</span><code>soil_moisture &lt; {content.threshold}</code><span>Fields requiring irrigation</span>{content.matches.map((match) => <strong key={match.label}>Field {match.label} · {match.value}</strong>)}<CodeSnippet type="single" feedback="Copied">soil_moisture[soil_moisture &lt; 30]</CodeSnippet></Tile></div></section>;
}

export function PandasSeriesQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Pandas Series at a glance</h2><div className="pandas-series-reference">{rows.map((row) => <Tile key={row.task}><strong>{row.task}</strong><code>{row.code}</code></Tile>)}</div></section>;
}
