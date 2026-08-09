import { useState } from "react";
import { CodeSnippet, NumberInput, Tag, TextInput, Tile } from "@carbon/react";
import { Checkmark, Close } from "@carbon/icons-react";
import { ArrayGrid } from "@/components/learning/NumpyIntroductionLearningBlocks";
import type { NumpyOperationsDevelopmentPack } from "@/types/content";

type Pack = NumpyOperationsDevelopmentPack;
type CalculatorOperation = "+" | "-" | "*" | "/";

function calculate(left: number[], right: number[], operation: CalculatorOperation) {
  return left.map((value, index) => operation === "+" ? value + right[index] : operation === "-" ? value - right[index] : operation === "*" ? value * right[index] : value / right[index]);
}

export function VectorizationComparison({ content }: { content: Pack["vectorization"] }) {
  const [mode, setMode] = useState<"loop" | "numpy">("numpy");
  return <section id="vectorization" className="lesson-card"><p className="lesson-section-label">Vectorized operations</p><h2>Describe the calculation once for the whole array</h2><div className="numpy-mode-tabs" role="tablist" aria-label="Loop and NumPy comparison"><button type="button" role="tab" aria-selected={mode === "loop"} className={mode === "loop" ? "is-active" : ""} onClick={() => setMode("loop")}>Python loop</button><button type="button" role="tab" aria-selected={mode === "numpy"} className={mode === "numpy" ? "is-active" : ""} onClick={() => setMode("numpy")}>NumPy expression</button></div><CodeSnippet type="multi" feedback="Copied">{mode === "loop" ? content.listCode : content.numpyCode}</CodeSnippet><Tile className="numpy-vectorized-result"><span>{mode === "loop" ? "Process one value per iteration" : "Vectorized whole-array operation"}</span><strong>{content.result}</strong><p>{content.explanation}</p></Tile></section>;
}

export function ArithmeticOperationsExplorer({ operations }: { operations: Pack["arithmetic"] }) {
  const [activeId, setActiveId] = useState<Pack["arithmetic"][number]["id"]>("add");
  const active = operations.find((item) => item.id === activeId) ?? operations[0];
  return <section id="arithmetic" className="lesson-card"><p className="lesson-section-label">Element-wise arithmetic</p><h2>Corresponding elements calculate together</h2><div className="numpy-operation-tabs" role="tablist" aria-label="Arithmetic operations">{operations.map((item) => <button type="button" role="tab" aria-selected={item.id === active.id} className={item.id === active.id ? "is-active" : ""} onClick={() => setActiveId(item.id)} key={item.id}><strong>{item.operator}</strong><span>{item.id}</span></button>)}</div><div className="numpy-equation-visual"><ArrayGrid values={[active.left]} name="A" /><strong>{active.operator}</strong>{active.right ? <ArrayGrid values={[active.right]} name="B" /> : <Tile><span>Scalar</span><strong>{active.scalar}</strong></Tile>}<strong>=</strong><Tile className="numpy-operation-output"><span>{active.meaning}</span><strong>{active.output}</strong></Tile></div></section>;
}

export function CelsiusAndComparisonPanel({ celsius, comparisons, booleanSum }: { celsius: Pack["celsius"]; comparisons: Pack["comparisons"]; booleanSum: Pack["booleanSum"] }) {
  const [active, setActive] = useState(0);
  return <section id="comparisons" className="lesson-card"><p className="lesson-section-label">Formula and comparisons</p><h2>Transform values, then ask a question about every result</h2><div className="numpy-celsius-flow"><ArrayGrid values={[celsius.input]} name="temperature_c" /><div><code>{celsius.formula}</code><CodeSnippet type="single" feedback="Copied">{celsius.code}</CodeSnippet></div><ArrayGrid values={[celsius.output]} name="temperature_f" /></div><div className="numpy-comparison-layout"><div className="numpy-comparison-list">{comparisons.map((item, index) => <button type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={item.code}><code>{item.code}</code><span>{item.meaning}</span></button>)}</div><Tile><strong>{comparisons[active].output}</strong><p>{comparisons[active].meaning}</p><hr /><code>{booleanSum.code}</code><strong>{booleanSum.output} True values</strong><p>{booleanSum.meaning}</p></Tile></div></section>;
}

export function ArrayCalculator() {
  const [mode, setMode] = useState<"array" | "scalar">("array");
  const [operation, setOperation] = useState<CalculatorOperation>("+");
  const [scalar, setScalar] = useState(5);
  const left = [10, 20, 30];
  const right = mode === "array" ? [1, 2, 3] : [scalar, scalar, scalar];
  const result = calculate(left, right, operation);
  const code = mode === "array" ? `A ${operation} B` : `A ${operation} ${scalar}`;
  return <section id="array-calculator" className="lesson-card"><p className="lesson-section-label">Interactive NumPy Array Calculator</p><h2>Switch between array-to-array and scalar operations</h2><div className="numpy-mode-tabs" role="tablist" aria-label="Calculator operand mode"><button type="button" role="tab" aria-selected={mode === "array"} className={mode === "array" ? "is-active" : ""} onClick={() => setMode("array")}>Array B</button><button type="button" role="tab" aria-selected={mode === "scalar"} className={mode === "scalar" ? "is-active" : ""} onClick={() => setMode("scalar")}>Scalar</button></div><div className="numpy-calculator-controls"><div>{(["+", "-", "*", "/"] as CalculatorOperation[]).map((item) => <button type="button" aria-pressed={operation === item} className={operation === item ? "is-active" : ""} onClick={() => setOperation(item)} key={item}>{item}</button>)}</div>{mode === "scalar" && <NumberInput id="calculator-scalar" label="Scalar" value={scalar} onChange={(_event, state) => setScalar(Number(state.value))} />}</div><div className="numpy-calculator-equation"><ArrayGrid values={[left]} name="A" /><strong>{operation}</strong>{mode === "array" ? <ArrayGrid values={[[1, 2, 3]]} name="B" /> : <Tile><span>Scalar</span><strong>{scalar}</strong></Tile>}<strong>=</strong><ArrayGrid values={[result]} name="result" /></div><CodeSnippet type="single" feedback="Copied">{code}</CodeSnippet></section>;
}

export function BroadcastingVisualizer({ content }: { content: Pack["broadcasting"] }) {
  const [mode, setMode] = useState<"row" | "column">("row");
  const matrix = mode === "row" ? content.matrix : content.columnMatrix;
  const smaller = mode === "row" ? [content.rowOffset] : content.columnOffset;
  const result = mode === "row" ? content.rowResult : content.columnResult;
  const expanded = mode === "row" ? matrix.map(() => content.rowOffset) : content.columnOffset.map((row) => Array(matrix[0].length).fill(row[0]));
  const code = mode === "row" ? "data + np.array([1, 2, 3])" : "data + np.array([[1], [2]])";
  return <section id="broadcasting" className="lesson-card"><p className="lesson-section-label">Interactive Broadcasting Visualizer</p><h2>The smaller compatible shape expands conceptually</h2><div className="numpy-mode-tabs" role="tablist" aria-label="Broadcast direction"><button type="button" role="tab" aria-selected={mode === "row"} className={mode === "row" ? "is-active" : ""} onClick={() => setMode("row")}>Across rows</button><button type="button" role="tab" aria-selected={mode === "column"} className={mode === "column" ? "is-active" : ""} onClick={() => setMode("column")}>Across columns</button></div><div className="numpy-broadcast-stages"><div><ArrayGrid values={matrix} name={`A ${matrix.length}×${matrix[0].length}`} /></div><strong>+</strong><div><ArrayGrid values={smaller} name={mode === "row" ? "offset (3,)" : "offset (2, 1)"} /><span>broadcasts as</span><ArrayGrid values={expanded} name="conceptual expansion" /></div><strong>=</strong><ArrayGrid values={result} name="result" /></div><div className="numpy-broadcast-status"><Checkmark size={20} aria-hidden="true" /><strong>Compatible</strong><code>{code}</code><span>Result shape ({result.length}, {result[0].length})</span></div></section>;
}

function parseShape(value: string) { const values = value.match(/\d+/g)?.map(Number) ?? []; return values.length ? values : null; }
function checkBroadcast(left: number[], right: number[]) {
  const length = Math.max(left.length, right.length);
  const comparisons = Array.from({ length }, (_, index) => ({ a: left[left.length - 1 - index] ?? 1, b: right[right.length - 1 - index] ?? 1 }));
  const failed = comparisons.find((item) => item.a !== item.b && item.a !== 1 && item.b !== 1);
  return { compatible: !failed, comparisons, reason: failed ? `${failed.a} vs ${failed.b}: different and neither is 1` : "Every aligned pair is equal or contains 1" };
}

export function BroadcastingCompatibilityChecker({ rules }: { rules: Pack["rules"] }) {
  const [leftText, setLeftText] = useState("(3, 4)");
  const [rightText, setRightText] = useState("(4,)");
  const left = parseShape(leftText);
  const right = parseShape(rightText);
  const result = left && right ? checkBroadcast(left, right) : null;
  return <section id="compatibility-checker" className="lesson-card"><p className="lesson-section-label">Broadcasting Compatibility Checker</p><h2>Compare shapes from the rightmost dimension</h2><div className="numpy-shape-inputs"><TextInput id="shape-a" labelText="Shape A" value={leftText} onChange={(event) => setLeftText(event.currentTarget.value)} /><strong>+</strong><TextInput id="shape-b" labelText="Shape B" value={rightText} onChange={(event) => setRightText(event.currentTarget.value)} /></div>{result ? <Tile className={result.compatible ? "numpy-compatible" : "numpy-incompatible"}>{result.compatible ? <Checkmark size={24} aria-hidden="true" /> : <Close size={24} aria-hidden="true" />}<div><strong>{result.compatible ? "Compatible" : "Not compatible"}</strong><p>{result.reason}</p><div className="numpy-shape-pairs">{result.comparisons.map((item, index) => <code key={index}>{item.a} vs {item.b}</code>)}</div></div></Tile> : <Tile className="numpy-incompatible"><Close size={24} aria-hidden="true" /><strong>Enter shapes such as (3, 4) and (4,)</strong></Tile>}<div className="numpy-broadcast-rules">{rules.statements.map((rule) => <span key={rule}>{rule}</span>)}</div></section>;
}

export function CalibrationAndOperators({ calibration, multiply, operators, comparisons }: { calibration: Pack["calibration"]; multiply: Pack["multiplyComparison"]; operators: Pack["operatorReference"]; comparisons: Pack["comparisonReference"] }) {
  return <><section id="calibration" className="lesson-card"><p className="lesson-section-label">Agritech calibration</p><h2>One offset vector corrects every sensor row</h2><div className="numpy-calibration-flow"><ArrayGrid values={calibration.matrix} name="sensor_data" /><div><span>Column offsets</span><ArrayGrid values={[calibration.offset]} name="offset" /></div><ArrayGrid values={calibration.result} name="calibrated" /></div><div className="numpy-column-meaning">{calibration.columns.map((item, index) => <Tag type="teal" key={item}>C{index} · {item}</Tag>)}</div></section><section id="operators" className="lesson-card"><p className="lesson-section-label">Operators and * vs @</p><h2>Know which multiplication you are asking for</h2><div className="numpy-multiply-comparison"><Tile><code>{multiply.elementWise}</code><strong>{multiply.elementOutput}</strong><span>Element-wise</span></Tile><Tile><code>{multiply.matrix}</code><strong>{multiply.matrixOutput}</strong><span>Matrix multiplication</span></Tile></div><p>{multiply.explanation}</p><div className="numpy-operator-reference">{operators.map((item) => <article key={item.operator}><code>{item.operator}</code><strong>{item.meaning}</strong><span>{item.example}</span></article>)}</div><div className="numpy-comparison-reference">{comparisons.map((item) => <Tag type="purple" key={item.operator}><code>{item.operator}</code> {item.meaning}</Tag>)}</div></section></>;
}

export function OperationsQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Whole-array operations at a glance</h2><div className="numpy-operations-reference">{rows.map((row) => <Tile key={row.concept}><strong>{row.concept}</strong><code>{row.example}</code></Tile>)}</div></section>;
}
