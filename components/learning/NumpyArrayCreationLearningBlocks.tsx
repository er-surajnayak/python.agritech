import { useMemo, useState } from "react";
import { CodeSnippet, NumberInput, Tag, Tile } from "@carbon/react";
import { ChartLine, DataTable, Renew, WarningAlt } from "@carbon/icons-react";
import { ArrayGrid } from "@/components/learning/NumpyIntroductionLearningBlocks";
import type { NumpyArrayCreationDevelopmentPack } from "@/types/content";

type Pack = NumpyArrayCreationDevelopmentPack;
type FactoryKind = "zeros" | "ones" | "full" | "arange" | "linspace" | "random integers" | "random floats";

function seededRandom(seed: number) {
  let state = Math.abs(Math.trunc(seed)) || 1;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function rangeValues(start: number, stop: number, step: number) {
  if (step === 0) return [];
  const values: number[] = [];
  if (step > 0) for (let value = start; value < stop && values.length < 40; value += step) values.push(value);
  else for (let value = start; value > stop && values.length < 40; value += step) values.push(value);
  return values;
}

export function ArrayFromDataPanel({ content }: { content: Pack["fromData"] }) {
  const [mode, setMode] = useState<"1D" | "2D">("1D");
  return <section id="from-data" className="lesson-card"><p className="lesson-section-label">Creating arrays from Python data</p><h2>{content.title}</h2><p>{content.body}</p><div className="numpy-mode-tabs" role="tablist" aria-label="Array from Python data dimensions"><button type="button" role="tab" aria-selected={mode === "1D"} className={mode === "1D" ? "is-active" : ""} onClick={() => setMode("1D")}>1D readings</button><button type="button" role="tab" aria-selected={mode === "2D"} className={mode === "2D" ? "is-active" : ""} onClick={() => setMode("2D")}>2D field grid</button></div><div className="numpy-creation-example-grid"><CodeSnippet type="multi" feedback="Copied">{mode === "1D" ? content.oneDimensionalCode : content.twoDimensionalCode}</CodeSnippet><ArrayGrid values={mode === "1D" ? [[28, 30, 31, 29, 32]] : content.matrix} name={mode === "1D" ? "temperature" : "soil"} /></div></section>;
}

export function InitializedArrayExplorer({ items }: { items: Pack["initializedArrays"] }) {
  const [activeId, setActiveId] = useState<Pack["initializedArrays"][number]["id"]>("zeros");
  const active = items.find((item) => item.id === activeId) ?? items[0];
  const fill = active.id === "ones" ? 1 : active.id === "full" ? 25 : 0;
  const values = Array.from({ length: 3 }, () => Array.from({ length: 4 }, () => fill));
  return <section id="initialized-arrays" className="lesson-card"><p className="lesson-section-label">Initialized arrays</p><h2>Choose the starting value intentionally</h2><div className="numpy-factory-tabs" role="tablist" aria-label="Initialized array functions">{items.map((item) => <button type="button" role="tab" aria-selected={active.id === item.id} className={active.id === item.id ? "is-active" : ""} onClick={() => setActiveId(item.id)} key={item.id}><code>{item.name}</code><span>{item.purpose}</span></button>)}</div><div className="numpy-initialized-layout"><div><CodeSnippet type="multi" feedback="Copied">{`${active.oneDimensional}\n${active.twoDimensional}`}</CodeSnippet><Tile className="numpy-use-case"><Tag type="green">Smart Farm use</Tag><p>{active.useCase}</p></Tile>{active.warning && <Tile className="numpy-empty-warning"><WarningAlt size={20} aria-hidden="true" /><p>{active.warning}</p></Tile>}</div>{active.id === "empty" ? <Tile className="numpy-empty-memory"><WarningAlt size={28} aria-hidden="true" /><strong>Contents intentionally not visualized</strong><span>Values depend on allocated memory and are not predictable.</span></Tile> : <ArrayGrid values={values} name={active.id} />}</div></section>;
}

export function SequenceFunctionComparator({ items }: { items: Pack["sequenceFunctions"] }) {
  return <section id="sequences" className="lesson-card"><p className="lesson-section-label">Creating sequences</p><h2>Step size or number of values?</h2><div className="numpy-sequence-grid">{items.map((item) => <article key={item.id}><Tag type={item.id === "arange" ? "cyan" : "purple"}>{item.name}</Tag><h3>{item.control}</h3><code>{item.syntax}</code><CodeSnippet type="single" feedback="Copied">{item.code}</CodeSnippet><strong>{item.output}</strong><p>{item.endpoint}</p><Tile><span>Farm use</span><p>{item.agritechUse}</p></Tile></article>)}</div><div className="numpy-sequence-memory"><div><strong>arange()</strong><span>Start → add step → stop before boundary</span></div><div><strong>linspace()</strong><span>Start → requested count → even spacing → stop</span></div></div></section>;
}

export function IdentityMatrixPanel({ content }: { content: Pack["identityMatrix"] }) {
  return <section id="identity-matrix" className="lesson-card"><p className="lesson-section-label">Special matrix</p><h2>{content.title}</h2><p>{content.body}</p><div className="numpy-eye-layout"><div><CodeSnippet type="single" feedback="Copied">{content.code}</CodeSnippet><div className="numpy-application-chips">{content.futureUses.map((item) => <Tag type="blue" key={item}>{item}</Tag>)}</div></div><ArrayGrid values={content.values} name="identity" /></div></section>;
}

export function RandomFunctionExplorer({ functions, seed }: { functions: Pack["randomFunctions"]; seed: Pack["seed"] }) {
  const [activeId, setActiveId] = useState<Pack["randomFunctions"][number]["id"]>("randint");
  const active = functions.find((item) => item.id === activeId) ?? functions[0];
  return <section id="random-arrays" className="lesson-card"><p className="lesson-section-label">Random array generation</p><h2>Simulate Smart Farm readings</h2><div className="numpy-random-layout"><div className="numpy-random-list" role="list">{functions.map((item) => <button type="button" role="listitem" className={active.id === item.id ? "is-active" : ""} onClick={() => setActiveId(item.id)} key={item.id}><code>{item.name}</code><span>{item.purpose}</span></button>)}</div><Tile className="numpy-random-result" aria-live="polite"><Tag type="teal">{active.name}</Tag><code>{active.code}</code><strong>{active.output}</strong><p>{active.agritechUse}</p></Tile></div><div className="numpy-seed-panel"><div><Renew size={24} aria-hidden="true" /><div><h3>{seed.title}</h3><p>{seed.body}</p></div></div><CodeSnippet type="multi" feedback="Copied">{seed.code}</CodeSnippet><div>{seed.benefits.map((item) => <Tag type="green" key={item}>{item}</Tag>)}</div></div></section>;
}

export function DtypeCreationPanel({ content }: { content: Pack["dtype"] }) {
  return <section id="dtype" className="lesson-card"><p className="lesson-section-label">Specifying dtype</p><h2>{content.title}</h2><p>{content.body}</p><div className="numpy-dtype-example-grid">{content.examples.map((item) => <Tile key={item.code}><CodeSnippet type="multi" feedback="Copied">{item.code}</CodeSnippet><span>Output</span><strong>{item.output}</strong><p>{item.note}</p></Tile>)}</div></section>;
}

export function ArrayCreationCheatSheet({ rows }: { rows: Pack["cheatSheet"] }) {
  return <section id="cheat-sheet" className="lesson-card"><div className="numpy-section-heading"><DataTable size={24} aria-hidden="true" /><div><p className="lesson-section-label">Quick reference</p><h2>Array creation cheat sheet</h2></div></div><div className="numpy-cheat-sheet" role="table" aria-label="NumPy array creation functions"><div className="numpy-cheat-row is-heading" role="row"><strong role="columnheader">Function</strong><strong role="columnheader">Purpose</strong><strong role="columnheader">Example</strong></div>{rows.map((row) => <div className="numpy-cheat-row" role="row" key={row.name}><code role="cell">{row.name}</code><span role="cell">{row.purpose}</span><code role="cell">{row.example}</code></div>)}</div></section>;
}

export function NumpyArrayFactory() {
  const kinds: FactoryKind[] = ["zeros", "ones", "full", "arange", "linspace", "random integers", "random floats"];
  const [kind, setKind] = useState<FactoryKind>("zeros");
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(4);
  const [fill, setFill] = useState(25);
  const [start, setStart] = useState(0);
  const [stop, setStop] = useState(20);
  const [amount, setAmount] = useState(5);
  const [minimum, setMinimum] = useState(20);
  const [maximum, setMaximum] = useState(40);
  const [seed, setSeed] = useState(42);

  const result = useMemo(() => {
    const safeRows = Math.max(1, Math.min(6, Math.trunc(rows)));
    const safeColumns = Math.max(1, Math.min(8, Math.trunc(columns)));
    if (kind === "zeros" || kind === "ones" || kind === "full") {
      const value = kind === "zeros" ? 0 : kind === "ones" ? 1 : fill;
      return { values: Array.from({ length: safeRows }, () => Array.from({ length: safeColumns }, () => value)), code: kind === "full" ? `np.full((${safeRows}, ${safeColumns}), ${fill})` : `np.${kind}((${safeRows}, ${safeColumns}))` };
    }
    if (kind === "arange") return { values: [rangeValues(start, stop, amount)], code: `np.arange(${start}, ${stop}, ${amount})` };
    if (kind === "linspace") {
      const count = Math.max(2, Math.min(20, Math.trunc(amount)));
      return { values: [Array.from({ length: count }, (_, index) => start + ((stop - start) * index) / (count - 1))], code: `np.linspace(${start}, ${stop}, ${count})` };
    }
    const random = seededRandom(seed);
    const count = Math.max(1, Math.min(20, Math.trunc(amount)));
    const span = maximum - minimum;
    const values = Array.from({ length: count }, () => kind === "random integers" ? Math.floor(minimum + random() * Math.max(1, span)) : minimum + random() * span);
    return { values: [values], code: kind === "random integers" ? `np.random.randint(${minimum}, ${maximum}, ${count})` : `np.random.uniform(${minimum}, ${maximum}, ${count})` };
  }, [kind, rows, columns, fill, start, stop, amount, minimum, maximum, seed]);

  const isGrid = kind === "zeros" || kind === "ones" || kind === "full";
  const isSequence = kind === "arange" || kind === "linspace";
  const isRandom = kind.startsWith("random");
  return <section id="array-factory" className="lesson-card numpy-array-factory"><p className="lesson-section-label">Interactive NumPy Array Factory</p><h2>Choose a creator, adjust its inputs, inspect the code</h2><div className="numpy-factory-tabs" role="tablist" aria-label="Array factory types">{kinds.map((item) => <button type="button" role="tab" aria-selected={kind === item} className={kind === item ? "is-active" : ""} key={item} onClick={() => setKind(item)}>{item}</button>)}</div><div className="numpy-factory-workspace"><div className="numpy-factory-controls">{isGrid && <><NumberInput id="factory-rows" label="Rows" min={1} max={6} value={rows} onChange={(_event, state) => setRows(Number(state.value))} /><NumberInput id="factory-columns" label="Columns" min={1} max={8} value={columns} onChange={(_event, state) => setColumns(Number(state.value))} />{kind === "full" && <NumberInput id="factory-fill" label="Fill value" value={fill} onChange={(_event, state) => setFill(Number(state.value))} />}</>}{isSequence && <><NumberInput id="factory-start" label="Start" value={start} onChange={(_event, state) => setStart(Number(state.value))} /><NumberInput id="factory-stop" label="Stop" value={stop} onChange={(_event, state) => setStop(Number(state.value))} /><NumberInput id="factory-amount" label={kind === "arange" ? "Step" : "Number of values"} value={amount} onChange={(_event, state) => setAmount(Number(state.value))} /></>}{isRandom && <><NumberInput id="factory-min" label="Minimum" value={minimum} onChange={(_event, state) => setMinimum(Number(state.value))} /><NumberInput id="factory-max" label="Maximum" value={maximum} onChange={(_event, state) => setMaximum(Number(state.value))} /><NumberInput id="factory-count" label="Values" min={1} max={20} value={amount} onChange={(_event, state) => setAmount(Number(state.value))} /><NumberInput id="factory-seed" label="Seed" value={seed} onChange={(_event, state) => setSeed(Number(state.value))} /></>}</div><div className="numpy-factory-result"><CodeSnippet type="single" feedback="Copied">{result.code}</CodeSnippet>{result.values[0]?.length ? <ArrayGrid values={result.values} name={kind} /> : <Tile className="numpy-empty-warning"><WarningAlt size={20} aria-hidden="true" /><p>This parameter combination generates no values. Check the direction and step.</p></Tile>}</div></div></section>;
}

export function RandomSensorSimulator() {
  const [seed, setSeed] = useState(42);
  const data = useMemo(() => {
    const random = seededRandom(seed);
    return {
      temperature: Array.from({ length: 8 }, () => Math.floor(20 + random() * 20)),
      moisture: Array.from({ length: 8 }, () => 30 + random() * 30),
    };
  }, [seed]);
  return <section id="random-simulator" className="lesson-card"><div className="numpy-section-heading"><ChartLine size={24} aria-hidden="true" /><div><p className="lesson-section-label">Random Sensor Playground</p><h2>Repeat the same farm experiment</h2></div></div><div className="numpy-simulator-controls"><NumberInput id="simulator-seed" label="Seed" value={seed} onChange={(_event, state) => setSeed(Number(state.value))} /></div><div className="numpy-simulator-grid"><ArrayGrid values={[data.temperature]} name="temperature" /><ArrayGrid values={[data.moisture]} name="soil moisture" /></div><CodeSnippet type="multi" feedback="Copied">{`np.random.seed(${seed})\ntemperature = np.random.randint(20, 40, 8)\nmoisture = np.random.uniform(30, 60, 8)`}</CodeSnippet><p className="numpy-seed-note">Changing the seed changes the sequence. Keeping it fixed reproduces the same preview.</p></section>;
}
