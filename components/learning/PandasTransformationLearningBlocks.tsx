import { useMemo, useState } from "react";
import { CodeSnippet, Tile } from "@carbon/react";
import type { PandasTransformationDevelopmentPack } from "@/types/content";

type Pack = PandasTransformationDevelopmentPack;
type OperationId = Pack["operations"][number]["id"];
type Cell = number | string;

function FeatureTable({ columns, rows, highlight }: { columns: string[]; rows: Cell[][]; highlight?: string }) {
  return <div className="pandas-feature-table-wrap"><table className="pandas-feature-table"><thead><tr>{columns.map((column) => <th className={column === highlight ? "is-new" : ""} key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={String(row[0])}>{row.map((value, columnIndex) => <td className={columns[columnIndex] === highlight ? "is-new" : ""} key={`${rowIndex}-${columns[columnIndex]}`}>{typeof value === "number" && !Number.isInteger(value) ? value.toFixed(2) : String(value)}</td>)}</tr>)}</tbody></table></div>;
}

function engineeredValues(id: OperationId, rows: Cell[][]): Cell[] {
  return rows.map((row) => {
    const temperature = Number(row[1]);
    const moisture = Number(row[3]);
    const farmYield = Number(row[4]);
    const risk = Number(temperature > 34) + Number(moisture < 30);
    if (id === "fahrenheit") return temperature * 9 / 5 + 32;
    if (id === "ratio") return farmYield / moisture;
    if (id === "gap") return 40 - moisture;
    if (id === "irrigation") return moisture < 30 ? "Required" : "Not Required";
    if (id === "moisture-status") return moisture < 25 ? "Critical" : moisture <= 35 ? "Low" : "Adequate";
    if (id === "yield-category") return farmYield >= 500 ? "High" : farmYield >= 450 ? "Medium" : "Low";
    if (id === "risk-score") return risk;
    return ["Low", "Moderate", "High"][risk];
  });
}

export function TransformationDefinition({ storyHook }: { storyHook: string }) {
  return <section id="transformation-definition" className="lesson-card"><p className="lesson-section-label">Transformation or feature engineering?</p><h2>Change the representation—or create new information</h2><p>{storyHook}</p><div className="pandas-transform-compare"><Tile><span>Transformation</span><strong>Change existing data</strong><code>28°C → 82.4°F</code><p>Units, labels, types, or values become more useful.</p></Tile><Tile><span>Feature engineering</span><strong>Create a new signal</strong><code>Yield ÷ Moisture</code><p>Existing columns combine into a feature with analytical meaning.</p></Tile><Tile><span>Cleaning</span><strong>Improve reliability</strong><code>" rice " → "rice"</code><p>Missingness, duplicates, and inconsistencies are resolved first.</p></Tile></div></section>;
}

export function FarmFeatureEngineeringLab({ dataset, operations }: { dataset: Pack["dataset"]; operations: Pack["operations"] }) {
  const [mode, setMode] = useState<OperationId>("fahrenheit");
  const active = operations.find((operation) => operation.id === mode) ?? operations[0];
  const resultRows = dataset.rows.map((row, index) => [...row.slice(0, 5), engineeredValues(mode, dataset.rows)[index]]);
  return <section id="feature-lab" className="lesson-card"><p className="lesson-section-label">Interactive Farm Feature Engineering Lab</p><h2>Turn a farm question into one transparent new column</h2><div className="pandas-feature-tabs" role="tablist" aria-label="Feature operation">{operations.map((operation) => <button type="button" role="tab" aria-selected={mode === operation.id} className={mode === operation.id ? "is-active" : ""} onClick={() => setMode(operation.id)} key={operation.id}>{operation.label}</button>)}</div><div className="pandas-feature-before-after"><div><span>Original data</span><FeatureTable columns={dataset.columns.slice(0, 5)} rows={dataset.rows.map((row) => row.slice(0, 5))} /></div><div><span>New feature · {active.column}</span><FeatureTable columns={[...dataset.columns.slice(0, 5), active.column]} rows={resultRows} highlight={active.column} /></div></div><Tile className="pandas-feature-operation"><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><div><strong>{active.label}</strong><p>{active.explanation}</p></div></Tile></section>;
}

const builderColumns = {
  Temperature: [28, 32, 35, 29, 38, 31],
  Soil_Moisture: [42, 35, 28, 48, 22, 40],
  Yield: [520, 480, 410, 560, 390, 510],
} as const;
type BuilderColumn = keyof typeof builderColumns;
type BuilderOperation = "multiply" | "add" | "less-than";

export function TransformationBuilder() {
  const [column, setColumn] = useState<BuilderColumn>("Temperature");
  const [operation, setOperation] = useState<BuilderOperation>("multiply");
  const [value, setValue] = useState(1.8);
  const result = useMemo(() => builderColumns[column].map((item) => operation === "multiply" ? item * value : operation === "add" ? item + value : item < value ? "Alert" : "Normal"), [column, operation, value]);
  const symbol = operation === "multiply" ? "*" : operation === "add" ? "+" : "<";
  const code = operation === "less-than"
    ? `df["${column}_Status"] = np.where(df["${column}"] < ${value}, "Alert", "Normal")`
    : `df["${column}_Transformed"] = df["${column}"] ${symbol} ${value}`;
  return <section id="transformation-builder" className="lesson-card"><p className="lesson-section-label">Transformation Builder</p><h2>Adjust the rule and inspect generated Pandas code</h2><div className="pandas-builder-controls"><label>Column<select value={column} onChange={(event) => setColumn(event.target.value as BuilderColumn)}>{Object.keys(builderColumns).map((name) => <option key={name}>{name}</option>)}</select></label><label>Operation<select value={operation} onChange={(event) => setOperation(event.target.value as BuilderOperation)}><option value="multiply">Multiply</option><option value="add">Add</option><option value="less-than">Less than → status</option></select></label><label>Value<input type="number" step="0.1" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label></div><div className="pandas-builder-result"><Tile><span>Input</span><strong>[{builderColumns[column].join(", ")}]</strong></Tile><Tile><span>Result</span><strong>[{result.map((item) => typeof item === "number" ? Number(item.toFixed(2)) : item).join(", ")}]</strong></Tile></div><CodeSnippet type="multi" feedback="Copied">{code}</CodeSnippet><p className="pandas-builder-note">A generated expression is only useful when its units, threshold, and business meaning are validated.</p></section>;
}

export function TransformationMethodExplorer({ examples }: { examples: Pack["methodExamples"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = examples[activeIndex];
  return <section id="method-explorer" className="lesson-card"><p className="lesson-section-label">Pandas transformation methods</p><h2>Choose the clearest tool for the rule</h2><div className="pandas-method-explorer"><div>{examples.map((example, index) => <button type="button" className={activeIndex === index ? "is-active" : ""} onClick={() => setActiveIndex(index)} key={example.title}><span>{example.method}</span>{example.title}</button>)}</div><Tile><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><strong>{active.result}</strong><p>{active.explanation}</p></Tile></div><div className="pandas-axis-callout"><strong>axis=0</strong><span>apply down each column</span><strong>axis=1</strong><span>apply across each complete row</span></div></section>;
}

export function FeaturePipeline({ steps }: { steps: string[] }) {
  return <section id="feature-pipeline" className="lesson-card"><p className="lesson-section-label">Feature engineering pipeline</p><h2>Start from a question, not from a clever formula</h2><div className="pandas-feature-pipeline">{steps.map((step, index) => <div key={step}><span>{index + 1}</span><strong>{step}</strong></div>)}</div><p className="pandas-feature-validation">Engineered features should be explainable, use consistent units, avoid accidental leakage, and be checked before analysis or machine learning.</p></section>;
}

export function PandasTransformationQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Pandas transformation essentials</h2><div className="pandas-feature-reference">{rows.map((row) => <Tile key={row.task}><strong>{row.task}</strong><code>{row.code}</code></Tile>)}</div></section>;
}

