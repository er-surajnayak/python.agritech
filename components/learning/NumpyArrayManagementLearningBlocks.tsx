import { useMemo, useState } from "react";
import { Button, CodeSnippet, NumberInput, Tile } from "@carbon/react";
import { ArrowsVertical, Copy, DataView, Reset } from "@carbon/icons-react";
import { ArrayGrid } from "@/components/learning/NumpyIntroductionLearningBlocks";
import type { NumpyArrayManagementDevelopmentPack } from "@/types/content";

type Pack = NumpyArrayManagementDevelopmentPack;
type CombineMode = Pack["combining"]["operations"][number]["id"];

export function ArrayCombiner({ content }: { content: Pack["combining"] }) {
  const [mode, setMode] = useState<CombineMode>("concatenate");
  const active = content.operations.find((operation) => operation.id === mode) ?? content.operations[0];
  return <section id="combining" className="lesson-card"><p className="lesson-section-label">Interactive Farm Data Combiner</p><h2>Choose how two sensor arrays should meet</h2><div className="numpy-management-inputs"><ArrayGrid values={[content.first]} name="morning" /><span>+</span><ArrayGrid values={[content.second]} name="evening" /></div><div className="numpy-management-tabs" role="tablist" aria-label="Array combining operation">{content.operations.map((operation) => <button type="button" role="tab" aria-selected={mode === operation.id} className={mode === operation.id ? "is-active" : ""} onClick={() => setMode(operation.id)} key={operation.id}>{operation.label}</button>)}</div><div className="numpy-combiner-result"><div><span>Generated array</span><ArrayGrid values={active.result} name={`${active.label} result`} /></div><Tile><span>Result shape</span><strong>{active.shape}</strong><p>{active.explanation}</p><CodeSnippet type="single" feedback="Copied">{active.code}</CodeSnippet></Tile></div><div className="numpy-combine-distinction"><Tile><strong>concatenate</strong><span>Extends an existing dimension</span></Tile><Tile><strong>stack</strong><span>Creates a new dimension</span></Tile></div></section>;
}

export function TwoDimensionalConcatenationPanel({ content }: { content: Pack["twoDimensional"] }) {
  const [axis, setAxis] = useState<0 | 1>(0);
  const result = axis === 0 ? content.axis0 : content.axis1;
  return <section id="two-dimensional" className="lesson-card"><p className="lesson-section-label">2D concatenation</p><h2>Axis 0 adds rows; axis 1 adds columns</h2><div className="numpy-concat-axis-tabs" role="tablist" aria-label="Concatenation axis"><button type="button" role="tab" aria-selected={axis === 0} className={axis === 0 ? "is-active" : ""} onClick={() => setAxis(0)}>axis=0 · add rows</button><button type="button" role="tab" aria-selected={axis === 1} className={axis === 1 ? "is-active" : ""} onClick={() => setAxis(1)}>axis=1 · add columns</button></div><div className="numpy-concat-layout"><div><ArrayGrid values={content.farmA} name="farm_a" /><ArrayGrid values={content.farmB} name="farm_b" /></div><ArrowsVertical size={28} /><div><ArrayGrid values={result} name="combined" /><CodeSnippet type="single" feedback="Copied">{`np.concatenate((farm_a, farm_b), axis=${axis})`}</CodeSnippet></div></div></section>;
}

function splitValues(values: number[], parts: number, allowUnequal: boolean) {
  if (parts < 1) return { sections: [] as number[][], error: "Choose at least one part." };
  if (!allowUnequal && values.length % parts !== 0) return { sections: [] as number[][], error: `Cannot split ${values.length} elements equally into ${parts} parts.` };
  const base = Math.floor(values.length / parts);
  const remainder = values.length % parts;
  const sections: number[][] = [];
  let cursor = 0;
  for (let index = 0; index < parts; index += 1) {
    const size = base + (allowUnequal && index < remainder ? 1 : 0);
    sections.push(values.slice(cursor, cursor + size));
    cursor += size;
  }
  return { sections, error: "" };
}

export function ArraySplitter({ content }: { content: Pack["splitter"] }) {
  const [dataset, setDataset] = useState<"even" | "uneven">("even");
  const [method, setMethod] = useState<"split" | "array_split">("split");
  const [parts, setParts] = useState(3);
  const values = dataset === "even" ? content.evenValues : content.unevenValues;
  const outcome = useMemo(() => splitValues(values, Math.max(1, Math.trunc(parts)), method === "array_split"), [method, parts, values]);
  return <section id="splitting" className="lesson-card"><p className="lesson-section-label">Interactive Array Splitter</p><h2>Equal sections when possible, flexible sections when needed</h2><div className="numpy-split-controls"><div role="tablist" aria-label="Input dataset"><button type="button" role="tab" aria-selected={dataset === "even"} className={dataset === "even" ? "is-active" : ""} onClick={() => setDataset("even")}>6 values</button><button type="button" role="tab" aria-selected={dataset === "uneven"} className={dataset === "uneven" ? "is-active" : ""} onClick={() => setDataset("uneven")}>5 values</button></div><div role="tablist" aria-label="Split function"><button type="button" role="tab" aria-selected={method === "split"} className={method === "split" ? "is-active" : ""} onClick={() => setMethod("split")}>np.split()</button><button type="button" role="tab" aria-selected={method === "array_split"} className={method === "array_split" ? "is-active" : ""} onClick={() => setMethod("array_split")}>np.array_split()</button></div><NumberInput id="array-split-parts" label="Number of parts" min={1} max={8} value={parts} onChange={(_event, state) => setParts(Number(state.value))} /></div><ArrayGrid values={[values]} name="data" />{outcome.error ? <Tile className="numpy-split-error"><strong>Cannot split equally</strong><span>{outcome.error} Use <code>np.array_split()</code> when unequal sections are acceptable.</span></Tile> : <div className="numpy-split-parts">{outcome.sections.map((section, index) => <Tile key={index}><span>Part {index + 1}</span><strong>[{section.join("  ")}]</strong></Tile>)}</div>}<CodeSnippet type="single" feedback="Copied">{`np.${method}(data, ${Math.max(1, Math.trunc(parts))})`}</CodeSnippet></section>;
}

export function ColumnStackPanel({ content }: { content: Pack["columnStack"] }) {
  return <section id="column-stack" className="lesson-card"><p className="lesson-section-label">Agritech feature construction</p><h2>Turn separate sensor features into dataset columns</h2><div className="numpy-column-stack-layout"><div><ArrayGrid values={[content.temperature]} name="temperature" /><ArrayGrid values={[content.humidity]} name="humidity" /><ArrayGrid values={[content.moisture]} name="moisture" /></div><span>→</span><div><ArrayGrid values={content.result} name="sensor_data" /><p>Temperature · Humidity · Moisture</p></div></div><CodeSnippet type="single" feedback="Copied">np.column_stack((temperature, humidity, moisture))</CodeSnippet></section>;
}

export function CopyViewDemonstrator({ content }: { content: Pack["copyView"] }) {
  const [mode, setMode] = useState<"view" | "copy">("view");
  const [modified, setModified] = useState(false);
  const original = modified ? (mode === "view" ? content.viewOriginal : content.copyOriginal) : content.original;
  const selection = modified ? (mode === "view" ? content.viewSelection : content.copySelection) : content.original.slice(content.sliceStart, content.sliceStop);
  const selectMode = (next: "view" | "copy") => { setMode(next); setModified(false); };
  return <section id="copy-view" className="lesson-card"><p className="lesson-section-label">Interactive Copy vs View Demonstrator</p><h2>Decide whether selected data should stay connected</h2><div className="numpy-copy-controls" role="tablist" aria-label="Copy or view"><button type="button" role="tab" aria-selected={mode === "view"} className={mode === "view" ? "is-active" : ""} onClick={() => selectMode("view")}><DataView size={18} />Create view</button><button type="button" role="tab" aria-selected={mode === "copy"} className={mode === "copy" ? "is-active" : ""} onClick={() => selectMode("copy")}><Copy size={18} />Create copy</button></div><div className={`numpy-copy-status is-${mode}`}><strong>{mode === "view" ? "Same underlying data" : "Independent data"}</strong><span>{mode === "view" ? "A basic slice usually shares storage with the original." : ".copy() creates separate storage for the selected values."}</span></div><div className="numpy-copy-layout"><div><ArrayGrid values={[original]} name="original" /></div><div className={`numpy-memory-link is-${mode}`}><span>{mode === "view" ? "shared" : "separate"}</span></div><div><ArrayGrid values={[selection]} name={mode} /><CodeSnippet type="single" feedback="Copied">{mode === "view" ? "selected = original[1:3]" : "selected = original[1:3].copy()"}</CodeSnippet></div></div><div className="numpy-copy-actions"><Button size="sm" onClick={() => setModified(true)} disabled={modified}>Set selected[0] = {content.modifiedValue}</Button><Button kind="tertiary" size="sm" renderIcon={Reset} onClick={() => setModified(false)}>Reset</Button></div>{modified && <Tile className="numpy-copy-explanation"><strong>{mode === "view" ? "The original changed too." : "The original stayed unchanged."}</strong><span>{mode === "view" ? "Both arrays reference the same underlying value." : "Only the independent copy received the new value."}</span></Tile>}</section>;
}

export function ArrayManagementQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Array management at a glance</h2><div className="numpy-management-reference">{rows.map((row) => <Tile key={row.name}><code>{row.name}</code><strong>{row.purpose}</strong><span>{row.example}</span></Tile>)}</div></section>;
}
