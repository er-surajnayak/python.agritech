import { useState } from "react";
import { Button, CodeSnippet, Tile } from "@carbon/react";
import type { PandasDataFrameDevelopmentPack } from "@/types/content";

type Pack = PandasDataFrameDevelopmentPack;
type CreationId = Pack["creation"][number]["id"];
type ExplorerId = Pack["explorer"][number]["id"];

function DataFrameTable({ columns, rows, indexes, compact = false }: { columns: string[]; rows: Array<Array<number | string>>; indexes?: Array<number | string>; compact?: boolean }) {
  return <div className={`pandas-df-table-wrap${compact ? " is-compact" : ""}`}><table className="pandas-df-table"><thead><tr><th>index</th>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={String(indexes?.[rowIndex] ?? rowIndex)}><th>{indexes?.[rowIndex] ?? rowIndex}</th>{row.map((value, columnIndex) => <td key={`${rowIndex}-${columns[columnIndex]}`}>{value}</td>)}</tr>)}</tbody></table></div>;
}

export function SeriesDataFrameBridge({ dataset }: { dataset: Pack["dataset"] }) {
  return <section id="bridge" className="lesson-card"><p className="lesson-section-label">Series → DataFrame</p><h2>Put labeled columns together to describe complete farm records</h2><div className="pandas-df-bridge"><Tile><span>One Series</span><code>df["Temperature"]</code><strong>One labeled column</strong></Tile><span>+</span><Tile><span>More Series</span><code>Humidity · Moisture · Yield</code><strong>Related variables</strong></Tile><span>→</span><Tile className="is-result"><span>DataFrame</span><strong>Rows × Columns</strong><code>index keeps each record aligned</code></Tile></div><DataFrameTable columns={dataset.columns} rows={dataset.rows.slice(0, 4)} /><div className="pandas-df-structure"><span><strong>Rows</strong> individual fields</span><span><strong>Columns</strong> measured features</span><span><strong>Index</strong> row labels</span></div></section>;
}

export function DataFrameCreationExplorer({ dataset, creation }: { dataset: Pack["dataset"]; creation: Pack["creation"] }) {
  const [mode, setMode] = useState<CreationId>("dictionary");
  const active = creation.find((item) => item.id === mode) ?? creation[0];
  return <section id="create" className="lesson-card"><p className="lesson-section-label">Create a DataFrame</p><h2>Different Python sources can produce the same labeled table</h2><div className="pandas-df-tabs" role="tablist" aria-label="DataFrame source">{creation.map((item) => <button type="button" role="tab" aria-selected={mode === item.id} className={mode === item.id ? "is-active" : ""} onClick={() => setMode(item.id)} key={item.id}>{item.label}</button>)}</div><div className="pandas-df-creation-layout"><Tile><p>{active.explanation}</p><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet></Tile><DataFrameTable columns={dataset.columns} rows={dataset.rows.slice(0, 3)} compact /></div></section>;
}

export function DataFramePropertiesPanel({ properties }: { properties: Pack["properties"] }) {
  return <section id="properties" className="lesson-card"><p className="lesson-section-label">Rows, columns, index, and types</p><h2>Inspect the structure before you analyze it</h2><div className="pandas-df-property-grid">{properties.map((property) => <Tile key={property.name}><code>{property.name}</code><strong>{property.result}</strong><span>{property.purpose}</span></Tile>)}</div><p className="pandas-df-platform-note">* Integer width can vary by platform. Inspect <code>df.dtypes</code> instead of assuming a specific width.</p></section>;
}

function ExplorerResult({ mode, dataset }: { mode: ExplorerId; dataset: Pack["dataset"] }) {
  if (mode === "head") return <DataFrameTable columns={dataset.columns} rows={dataset.rows.slice(0, 2)} compact />;
  if (mode === "tail") return <DataFrameTable columns={dataset.columns} rows={dataset.rows.slice(-2)} indexes={[4, 5]} compact />;
  if (mode === "sample") return <DataFrameTable columns={dataset.columns} rows={[dataset.rows[1], dataset.rows[4]]} indexes={[1, 4]} compact />;
  if (mode === "info") return <pre className="pandas-df-console">{`RangeIndex: 6 entries, 0 to 5\nData columns (total 5 columns)\n #  Column         Non-Null Count  Dtype\n 0  Field_ID       6 non-null      int64\n 1  Temperature    6 non-null      int64\n 2  Humidity       6 non-null      int64\n 3  Soil_Moisture  6 non-null      int64\n 4  Yield          6 non-null      int64`}</pre>;
  if (mode === "describe") return <DataFrameTable columns={["Temperature", "Humidity", "Soil_Moisture", "Yield"]} indexes={["count", "mean", "min", "max"]} rows={[[6, 6, 6, 6], [32.17, 69.33, 35.83, 478.33], [28, 65, 22, 390], [38, 75, 48, 560]]} compact />;
  if (mode === "columns") return <pre className="pandas-df-console">[&apos;Field_ID&apos;, &apos;Temperature&apos;, &apos;Humidity&apos;, &apos;Soil_Moisture&apos;, &apos;Yield&apos;]</pre>;
  if (mode === "shape") return <div className="pandas-df-shape"><strong>(6, 5)</strong><span>6 rows × 5 columns</span></div>;
  return <div className="pandas-df-selection"><Tile><span>Series</span><code>df["Temperature"]</code><pre>{`0    28\n1    32\n2    35\n3    29\n4    38\n5    31`}</pre></Tile><Tile><span>DataFrame</span><code>df[["Temperature", "Humidity"]]</code><DataFrameTable columns={["Temperature", "Humidity"]} rows={dataset.rows.map((row) => [row[1], row[2]])} compact /></Tile></div>;
}

export function FarmDataFrameExplorer({ dataset, explorer }: { dataset: Pack["dataset"]; explorer: Pack["explorer"] }) {
  const [mode, setMode] = useState<ExplorerId>("head");
  const active = explorer.find((item) => item.id === mode) ?? explorer[0];
  return <section id="explorer" className="lesson-card"><p className="lesson-section-label">Interactive Farm DataFrame Explorer</p><h2>Ask structural questions before analytical ones</h2><div className="pandas-df-tabs" role="tablist" aria-label="DataFrame inspection">{explorer.map((item) => <button type="button" role="tab" aria-selected={mode === item.id} className={mode === item.id ? "is-active" : ""} onClick={() => setMode(item.id)} key={item.id}>{item.label}</button>)}</div><div className="pandas-df-explorer-result"><ExplorerResult mode={mode} dataset={dataset} /></div><Tile className="pandas-df-explorer-note"><CodeSnippet type="single" feedback="Copied">{active.code}</CodeSnippet><p>{active.explanation}</p></Tile></section>;
}

export function ColumnOperationsPanel({ operations }: { operations: Pack["columnOperations"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = operations[activeIndex];
  return <section id="columns" className="lesson-card"><p className="lesson-section-label">Column operations</p><h2>Select, derive, modify, remove, and promote an index</h2><div className="pandas-df-operation-layout"><div className="pandas-df-operation-list">{operations.map((operation, index) => <button type="button" className={index === activeIndex ? "is-active" : ""} onClick={() => setActiveIndex(index)} key={operation.title}>{operation.title}</button>)}</div><Tile><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><strong>{active.result}</strong><p>{active.note}</p></Tile></div></section>;
}

export function DatasetLoadingWorkflow({ operations }: { operations: Pack["fileOperations"] }) {
  return <section id="files" className="lesson-card"><p className="lesson-section-label">Real data workflow</p><h2>Load first, inspect second, analyze third</h2><div className="pandas-df-workflow">{["Raw dataset", "read_csv()", "DataFrame", "head()", "info()", "describe()", "Clean / analyze"].map((step, index) => <div key={step}><span>{index + 1}</span><strong>{step}</strong></div>)}</div><div className="pandas-df-file-grid">{operations.map((operation) => <Tile key={operation.title}><strong>{operation.title}</strong><CodeSnippet type="single" feedback="Copied">{operation.code}</CodeSnippet><p>{operation.purpose}</p></Tile>)}</div></section>;
}

export function CsvLoadingSimulation({ dataset }: { dataset: Pack["dataset"] }) {
  const [loaded, setLoaded] = useState(false);
  return <section id="csv-simulation" className="lesson-card"><p className="lesson-section-label">Built-in CSV simulation</p><h2>Practice the load → preview → inspect sequence without a file dependency</h2><div className="pandas-df-loader"><div><span>Sample file</span><strong>farm_data.csv</strong><code>6 rows · 5 columns</code></div><Button size="sm" onClick={() => setLoaded(true)} disabled={loaded}>Load CSV</Button><Button size="sm" kind="tertiary" onClick={() => setLoaded(false)} disabled={!loaded}>Reset</Button></div>{loaded ? <div className="pandas-df-loaded"><div className="pandas-df-load-status"><strong>Dataset loaded</strong><span>Preview from <code>pd.read_csv("farm_data.csv")</code></span></div><DataFrameTable columns={dataset.columns} rows={dataset.rows.slice(0, 3)} compact /><div className="pandas-df-load-summary"><span><strong>Shape</strong> (6, 5)</span><span><strong>Null values</strong> 0</span><span><strong>Numeric columns</strong> 5</span></div></div> : <p className="pandas-df-empty">Load the built-in sample to reveal its DataFrame preview and structural summary.</p>}</section>;
}

export function DataFrameQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Pandas DataFrame foundations at a glance</h2><div className="pandas-df-reference">{rows.map((row) => <Tile key={row.task}><strong>{row.task}</strong><code>{row.code}</code></Tile>)}</div></section>;
}
