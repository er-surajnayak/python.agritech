import { useMemo, useState } from "react";
import { Button, CodeSnippet, Tag, Tile } from "@carbon/react";
import { ArrowDown, Calculator, DataStructured, MachineLearningModel } from "@carbon/icons-react";
import type { NumpyIntroductionDevelopmentPack } from "@/types/content";

type Pack = NumpyIntroductionDevelopmentPack;

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(3)));
}

function ArrayGrid({ values, name = "array" }: { values: number[][]; name?: string }) {
  const [selected, setSelected] = useState<[number, number]>([0, 0]);
  const isOneDimensional = values.length === 1;
  return (
    <div className="numpy-array-grid-wrap">
      <div className="numpy-array-grid-meta"><span>{name}</span><Tag type="blue" size="sm">{isOneDimensional ? "1D" : "2D"}</Tag></div>
      <div className="numpy-column-labels" style={{ gridTemplateColumns: `repeat(${values[0]?.length ?? 1}, minmax(3rem, 1fr))` }}>
        {(values[0] ?? []).map((_, column) => <span key={column}>C{column}</span>)}
      </div>
      <div className="numpy-array-grid">
        {values.map((row, rowIndex) => (
          <div className="numpy-array-row" key={rowIndex} style={{ gridTemplateColumns: `repeat(${row.length}, minmax(3rem, 1fr))` }}>
            {row.map((value, columnIndex) => (
              <button type="button" key={`${rowIndex}-${columnIndex}`} className={selected[0] === rowIndex && selected[1] === columnIndex ? "is-selected" : ""} onClick={() => setSelected([rowIndex, columnIndex])} aria-label={`Index ${isOneDimensional ? columnIndex : `${rowIndex}, ${columnIndex}`}, value ${value}`}>
                <small>{isOneDimensional ? `[${columnIndex}]` : `[${rowIndex}, ${columnIndex}]`}</small>
                <strong>{formatNumber(value)}</strong>
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="numpy-cell-inspector" aria-live="polite"><span>Selected index</span><code>{isOneDimensional ? `[${selected[1]}]` : `[${selected[0]}, ${selected[1]}]`}</code><span>Value</span><strong>{formatNumber(values[selected[0]]?.[selected[1]] ?? 0)}</strong></div>
    </div>
  );
}

export function NumpyDefinitionCard({ content }: { content: Pack["definition"] }) {
  return <section id="what-is-numpy" className="lesson-card numpy-definition"><div className="numpy-section-heading"><Calculator size={24} aria-hidden="true" /><div><p className="lesson-section-label">What is NumPy?</p><h2>{content.title}</h2></div></div><p>{content.body}</p><div className="numpy-name-expansion"><strong>Num</strong><span>Numerical</span><strong>Py</strong><span>Python</span></div><div className="numpy-application-chips">{content.applications.map((item) => <Tag type="teal" key={item}>{item}</Tag>)}</div></section>;
}

export function VectorizationComparator({ content }: { content: Pack["vectorization"] }) {
  const [mode, setMode] = useState<"list" | "numpy">("numpy");
  return <section id="why-numpy" className="lesson-card numpy-vectorization"><p className="lesson-section-label">Why NumPy?</p><h2>{content.title}</h2><p>{content.body}</p><div className="numpy-mode-tabs" role="tablist" aria-label="List and NumPy comparison"><button type="button" role="tab" aria-selected={mode === "list"} className={mode === "list" ? "is-active" : ""} onClick={() => setMode("list")}>Python List</button><button type="button" role="tab" aria-selected={mode === "numpy"} className={mode === "numpy" ? "is-active" : ""} onClick={() => setMode("numpy")}>NumPy Array</button></div><CodeSnippet type="multi" feedback="Copied">{mode === "list" ? content.listCode : content.numpyCode}</CodeSnippet><div className="numpy-vector-result"><span>{mode === "list" ? "Explicit iteration" : "Vectorized expression"}</span><ArrowDown size={20} aria-hidden="true" /><code>{content.output}</code></div></section>;
}

export function ListArrayComparison({ rows }: { rows: Pack["comparison"] }) {
  return <section id="list-vs-array" className="lesson-card"><p className="lesson-section-label">Python List vs NumPy Array</p><h2>Choose the structure designed for the job</h2><div className="numpy-comparison-table" role="table" aria-label="Python List and NumPy Array comparison"><div className="numpy-comparison-row is-heading" role="row"><strong role="columnheader">Feature</strong><strong role="columnheader">Python List</strong><strong role="columnheader">NumPy Array</strong></div>{rows.map((row) => <div className="numpy-comparison-row" role="row" key={row.feature}><strong role="cell">{row.feature}</strong><span role="cell">{row.pythonList}</span><span role="cell">{row.numpyArray}</span></div>)}</div></section>;
}

export function SmartFarmArrayPanel({ sensors }: { sensors: Pack["sensorExamples"] }) {
  const [active, setActive] = useState(0);
  const sensor = sensors[active];
  return <section id="smart-farm-data" className="lesson-card"><p className="lesson-section-label">NumPy in the Smart Farm</p><h2>Process complete sensor datasets</h2><div className="numpy-sensor-tabs" role="tablist" aria-label="Sensor arrays">{sensors.map((item, index) => <button type="button" role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={item.label}>{item.label}</button>)}</div><ArrayGrid values={[sensor.values]} name={sensor.label} /><p className="numpy-sensor-summary">Five related readings, one array, unit: <strong>{sensor.unit}</strong>.</p></section>;
}

export function DimensionExplorer({ dimensions }: { dimensions: Pack["dimensions"] }) {
  const [active, setActive] = useState(0);
  const item = dimensions[active];
  const displayValues = active === 0 ? [[28, 30, 31, 29, 32]] : active === 1 ? [[35, 40, 42], [45, 38, 41], [30, 36, 39]] : null;
  return <section id="dimensions" className="lesson-card"><p className="lesson-section-label">Array dimensions</p><h2>From one row to multidimensional farm data</h2><div className="numpy-dimension-tabs" role="tablist" aria-label="Array dimensions">{dimensions.map((dimension, index) => <button type="button" role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={dimension.dimension}><strong>{dimension.dimension}</strong><span>{dimension.title}</span></button>)}</div><div className="numpy-dimension-content"><div><h3>{item.title}</h3><p>{item.description}</p><CodeSnippet type="multi" feedback="Copied">{item.code}</CodeSnippet></div>{displayValues ? <ArrayGrid values={displayValues} name={item.dimension === "1D" ? "temperature" : "soil"} /> : <Tile className="numpy-3d-preview"><DataStructured size={32} aria-hidden="true" /><strong>Multiple farms</strong><span>contain fields</span><span>that contain sensor readings</span><Tag type="purple">Concept preview only</Tag></Tile>}</div></section>;
}

export function ArrayCreationExplorer({ functions, spacing }: { functions: Pack["creationFunctions"]; spacing: Pack["spacingComparison"] }) {
  const [active, setActive] = useState(0);
  const selected = functions[active];
  return <section id="creation-functions" className="lesson-card"><p className="lesson-section-label">Important creation functions</p><h2>Create the numerical structure you need</h2><div className="numpy-creation-layout"><div className="numpy-creation-list" role="list">{functions.map((item, index) => <button type="button" role="listitem" className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={item.name}><code>{item.name}</code><span>{item.purpose}</span></button>)}</div><Tile className="numpy-creation-result" aria-live="polite"><Tag type="blue">{selected.name}</Tag><code>{selected.code}</code><span>Output</span><strong>{selected.output}</strong></Tile></div><div className="numpy-spacing-comparison">{spacing.map((item) => <Tile key={item.name}><Tag type={item.name === "arange" ? "cyan" : "purple"}>{item.name}()</Tag><strong>{item.mentalModel}</strong><code>{item.code}</code><span>{item.output}</span></Tile>)}</div></section>;
}

export function AttributeExplorer({ content, dataTypes }: { content: Pack["attributeExample"]; dataTypes: Pack["dataTypes"] }) {
  const [active, setActive] = useState<Pack["attributeExample"]["attributes"][number]["name"]>("shape");
  const selected = content.attributes.find((item) => item.name === active) ?? content.attributes[0];
  return <section id="attributes" className="lesson-card"><p className="lesson-section-label">Array attributes & dtype</p><h2>Four questions describe an array</h2><div className="numpy-attribute-layout"><div><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><ArrayGrid values={content.values} name="arr" /></div><div className="numpy-attribute-panel">{content.attributes.map((item) => <button type="button" className={active === item.name ? "is-active" : ""} onClick={() => setActive(item.name)} key={item.name}><code>.{item.name}</code><strong>{item.value}</strong><span>{item.meaning}</span></button>)}<Tile className="numpy-attribute-explanation" aria-live="polite"><code>arr.{selected.name}</code><strong>{selected.value}</strong><p>{selected.meaning}</p></Tile></div></div><div className="numpy-dtype-strip">{dataTypes.map((type) => <article key={type.name}><code>{type.name}</code><span>{type.description}</span><small>{type.example}</small></article>)}</div></section>;
}

export function FirstCalculationPanel({ content }: { content: Pack["firstCalculation"] }) {
  const [operation, setOperation] = useState<"mean" | "max" | "min">("mean");
  const result = operation === "mean" ? content.readings.reduce((sum, value) => sum + value, 0) / content.readings.length : operation === "max" ? Math.max(...content.readings) : Math.min(...content.readings);
  return <section id="first-calculation" className="lesson-card"><p className="lesson-section-label">First Smart Farm calculation</p><h2>Summarize the whole temperature array</h2><ArrayGrid values={[content.readings]} name="temperature" /><div className="numpy-calculation-controls">{(["mean", "max", "min"] as const).map((name) => <Button size="sm" kind={operation === name ? "primary" : "tertiary"} key={name} onClick={() => setOperation(name)}>np.{name}()</Button>)}</div><Tile className="numpy-calculation-result" aria-live="polite"><code>np.{operation}(temperature)</code><strong>{formatNumber(result)}</strong></Tile></section>;
}

export function MLPipeline({ steps }: { steps: Pack["mlPipeline"] }) {
  return <section id="ml-connection" className="lesson-card"><div className="numpy-section-heading"><MachineLearningModel size={24} aria-hidden="true" /><div><p className="lesson-section-label">NumPy + machine learning</p><h2>Arrays connect raw readings to models</h2></div></div><div className="numpy-ml-pipeline">{steps.map((step, index) => <div key={step}><Tile><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></Tile>{index < steps.length - 1 && <ArrowDown size={20} aria-hidden="true" />}</div>)}</div></section>;
}

function extractFirstNumpyArray(code: string): number[][] | null {
  const marker = code.search(/np\.array\s*\(/);
  if (marker < 0) return null;
  const start = code.indexOf("[", marker);
  if (start < 0) return null;
  let depth = 0;
  let end = -1;
  for (let index = start; index < code.length; index += 1) {
    if (code[index] === "[") depth += 1;
    if (code[index] === "]") depth -= 1;
    if (depth === 0) { end = index; break; }
  }
  if (end < 0) return null;
  try {
    const parsed = JSON.parse(code.slice(start, end + 1)) as unknown;
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    if (parsed.every((value) => typeof value === "number")) return [parsed as number[]];
    if (parsed.every((row) => Array.isArray(row) && row.every((value) => typeof value === "number"))) return parsed as number[][];
  } catch { return null; }
  return null;
}

export function NumpyPlaygroundSupplement({ code }: { code: string }) {
  const values = useMemo(() => extractFirstNumpyArray(code), [code]);
  if (!values) return <div className="numpy-playground-empty"><strong>No simple numerical np.array() detected.</strong><span>Create a 1D or rectangular 2D numerical array to activate the explorer.</span></div>;
  const columns = values[0]?.length ?? 0;
  const rectangular = values.every((row) => row.length === columns);
  if (!rectangular) return <div className="numpy-playground-empty"><strong>Rows have different lengths.</strong><span>Use the same number of sensor columns in each field row.</span></div>;
  const flat = values.flat();
  const dimensions = values.length === 1 ? 1 : 2;
  return <div className="numpy-playground-supplement"><ArrayGrid values={values} name="detected array" /><div className="numpy-live-attributes"><div><span>ndim</span><strong>{dimensions}</strong></div><div><span>shape</span><strong>{dimensions === 1 ? `(${flat.length},)` : `(${values.length}, ${columns})`}</strong></div><div><span>size</span><strong>{flat.length}</strong></div><div><span>dtype</span><strong>{flat.some((value) => !Number.isInteger(value)) ? "float" : "int"}</strong></div></div></div>;
}
