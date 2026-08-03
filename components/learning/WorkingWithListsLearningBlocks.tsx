"use client";

import { Button, Tag, TextInput } from "@carbon/react";
import { useMemo, useState } from "react";
import type { WorkingWithListsDevelopmentPack } from "@/types/content";

type Pack = WorkingWithListsDevelopmentPack;
type MethodName = Pack["methods"][number]["name"];

function sliceIndexes(length: number, startText: string, stopText: string, stepText: string) {
  const step = Number(stepText) || 1;
  if (step === 0) return [];
  const normalize = (value: number) => value < 0 ? Math.max(0, length + value) : Math.min(length, value);
  const start = startText === "" ? (step > 0 ? 0 : length - 1) : normalize(Number(startText));
  const stop = stopText === "" ? (step > 0 ? length : -1) : (Number(stopText) < 0 ? length + Number(stopText) : Math.min(length, Number(stopText)));
  const indexes: number[] = [];
  if (step > 0) for (let index = start; index < stop; index += step) indexes.push(index);
  else for (let index = start; index > stop; index += step) indexes.push(index);
  return indexes;
}

export function AdvancedListVisualizer({ name = "moisture", values, highlighted = [], onSelect, onReorder }: { name?: string; values: number[]; highlighted?: number[]; onSelect?: (index: number) => void; onReorder?: (from: number, to: number) => void }) {
  const [dragged, setDragged] = useState<number | null>(null);
  function move(index: number, direction: -1 | 1) { const target = index + direction; if (target >= 0 && target < values.length) onReorder?.(index, target); }
  return <div className="advanced-list-visualizer"><div className="advanced-list-name"><span>List</span><code>{name}</code><Tag type="blue">{values.length} elements</Tag></div><div className="advanced-list-row">{values.map((value, index) => <div key={`${index}-${value}`} className={highlighted.includes(index) ? "is-highlighted" : ""} draggable={Boolean(onReorder)} onDragStart={() => setDragged(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (dragged !== null && dragged !== index) onReorder?.(dragged, index); setDragged(null); }}><small>+{index}</small><button type="button" onClick={() => onSelect?.(index)}>{value}</button><small>{index - values.length}</small>{onReorder && <span className="list-reorder-controls"><button type="button" aria-label={`Move ${value} left`} disabled={index === 0} onClick={() => move(index, -1)}>←</button><button type="button" aria-label={`Move ${value} right`} disabled={index === values.length - 1} onClick={() => move(index, 1)}>→</button></span>}</div>)}</div><div className="advanced-list-legend"><span>Top: positive index</span><span>Center: element value</span><span>Bottom: negative index</span></div></div>;
}

export function WorkingListStory({ story, revision }: { story: Pack["story"]; revision: Pack["revision"] }) {
  return <section id="story" className="lesson-card"><p className="lesson-section-label">Story continuation</p><h2>{story.title}</h2><p>{story.body}</p><pre><code>{story.code}</code></pre><div className="working-list-events">{story.events.map((event, index) => <article key={event}><span>{index + 1}</span><strong>{event}</strong></article>)}</div><h3>{revision.title}</h3><p>{revision.body}</p><AdvancedListVisualizer values={revision.values} /></section>;
}

export function NegativeIndexExplorer({ content, values }: { content: Pack["negativeIndexing"]; values: number[] }) {
  const [selected, setSelected] = useState(-1);
  const actualIndex = values.length + selected;
  return <section id="negative-indexing" className="lesson-card"><p className="lesson-section-label">Negative indexing</p><h2>{content.title}</h2><p>{content.body}</p><AdvancedListVisualizer values={values} highlighted={[actualIndex]} onSelect={(index) => setSelected(index - values.length)} /><div className="working-list-control-row">{content.examples.map((example) => <Button key={example.code} size="sm" kind={selected === example.index ? "primary" : "tertiary"} onClick={() => setSelected(example.index)}>{example.code} → {example.result}</Button>)}</div><div className="index-mapping-result"><code>moisture[{selected}]</code><span>maps to positive index {actualIndex}</span><strong>{values[actualIndex]}</strong></div></section>;
}

export function SliceExplorer({ content, values }: { content: Pack["slicing"]; values: number[] }) {
  const [start, setStart] = useState("1"); const [stop, setStop] = useState("4"); const [step, setStep] = useState("1");
  const indexes = useMemo(() => sliceIndexes(values.length, start, stop, step), [values.length, start, stop, step]);
  const result = indexes.map((index) => values[index]);
  return <section id="slicing" className="lesson-card"><p className="lesson-section-label">Slice Explorer</p><h2>{content.title}</h2><p>{content.body}</p><code className="slice-syntax">{content.syntax}</code><div className="slice-control-grid"><label>Start<input type="number" value={start} placeholder="blank" onChange={(event) => setStart(event.target.value)} /></label><label>Stop<input type="number" value={stop} placeholder="blank" onChange={(event) => setStop(event.target.value)} /></label><label>Step<input type="number" value={step} onChange={(event) => setStep(event.target.value)} /></label></div><AdvancedListVisualizer values={values} highlighted={indexes} /><div className="slice-result"><code>{`moisture[${start}:${stop}${step === "1" ? "" : `:${step}`}]`}</code><span>→</span><strong>[{result.join(", ")}]</strong></div><div className="working-list-control-row">{content.examples.map((example) => <Button key={example.code} size="sm" kind="tertiary" onClick={() => { setStart(example.start === null ? "" : String(example.start)); setStop(example.stop === null ? "" : String(example.stop)); setStep(example.step === null ? "1" : String(example.step)); }}>{example.code}</Button>)}</div></section>;
}

export function TraversalAnimator({ content }: { content: Pack["traversal"] }) {
  const [cursor, setCursor] = useState(0);
  return <section id="traversal" className="lesson-card"><p className="lesson-section-label">List traversal</p><h2>{content.title}</h2><p>{content.body}</p><pre><code>{content.code}</code></pre><AdvancedListVisualizer values={content.values} highlighted={[cursor]} /><div className="index-mapping-result"><span>Current reading</span><strong>{content.values[cursor]}</strong><Button size="sm" onClick={() => setCursor((current) => (current + 1) % content.values.length)}>Next iteration</Button></div></section>;
}

export function MethodPlayground({ methods, initialValues }: { methods: Pack["methods"]; initialValues: number[] }) {
  const [values, setValues] = useState(initialValues); const [method, setMethod] = useState<MethodName>("append"); const [value, setValue] = useState("40"); const [position, setPosition] = useState("2"); const [timeline, setTimeline] = useState<string[]>([]); const [result, setResult] = useState("Ready");
  function record(message: string) { setTimeline((current) => [message, ...current].slice(0, 6)); setResult(message); }
  function apply() {
    const next = [...values]; const number = Number(value); const index = Number(position);
    try {
      if (method === "append") next.push(number);
      if (method === "insert") next.splice(Math.max(0, index), 0, number);
      if (method === "extend") next.push(...value.split(",").map(Number).filter(Number.isFinite));
      if (method === "remove") { const found = next.indexOf(number); if (found < 0) throw new Error(`${number} is not in the List`); next.splice(found, 1); }
      if (method === "pop") { if (!next.length) throw new Error("Cannot pop from an empty List"); const popped = position === "" ? next.pop() : next.splice(index, 1)[0]; setValues(next); record(`pop() returned ${popped}`); return; }
      if (method === "clear") next.splice(0);
      if (method === "sort") next.sort((a, b) => a - b);
      if (method === "reverse") next.reverse();
      if (method === "copy") { record(`copy() created [${next.join(", ")}]`); return; }
      if (method === "count") { record(`count(${number}) returned ${next.filter((item) => item === number).length}`); return; }
      if (method === "index") { const found = next.indexOf(number); if (found < 0) throw new Error(`${number} is not in the List`); record(`index(${number}) returned ${found}`); return; }
      setValues(next); record(`${method}() changed the List`);
    } catch (error) { record(error instanceof Error ? error.message : "Operation failed"); }
  }
  function reorder(from: number, to: number) { const next = [...values]; const [moved] = next.splice(from, 1); next.splice(to, 0, moved); setValues(next); record(`Moved ${moved} from index ${from} to ${to}`); }
  const selectedMethod = methods.find((item) => item.name === method)!;
  return <section id="methods" className="lesson-card"><p className="lesson-section-label">Method Playground & Operation Timeline</p><h2>Manage the live List with methods</h2><p>Select a method, supply the needed value or position, and compare mutation with returned query results.</p><AdvancedListVisualizer values={values} onReorder={reorder} /><div className="method-playground-grid"><label>List method<select value={method} onChange={(event) => setMethod(event.target.value as MethodName)}>{methods.map((item) => <option key={item.name} value={item.name}>{item.name}() · {item.category}</option>)}</select></label><TextInput id="method-value" labelText={method === "extend" ? "Values (comma separated)" : "Value"} value={value} onChange={(event) => setValue(event.target.value)} /><TextInput id="method-position" labelText="Position / index" value={position} onChange={(event) => setPosition(event.target.value)} /><Button onClick={apply}>Apply {method}()</Button><Button kind="secondary" onClick={() => { setValues(initialValues); setTimeline([]); setResult("Ready"); }}>Reset</Button></div><div className="method-explanation"><code>{selectedMethod.example}</code><span>{selectedMethod.purpose}</span><strong>{result}</strong></div><ol className="operation-timeline">{timeline.length ? timeline.map((item, index) => <li key={`${item}-${index}`}><span>{timeline.length - index}</span>{item}</li>) : <li>No operations yet</li>}</ol></section>;
}

export function BuiltInFunctionDashboard({ builtIns, values }: { builtIns: Pack["builtIns"]; values: number[] }) {
  const results: Record<Pack["builtIns"][number]["name"], string> = { len: String(values.length), max: values.length ? String(Math.max(...values)) : "ValueError", min: values.length ? String(Math.min(...values)) : "ValueError", sum: String(values.reduce((total, value) => total + value, 0)), sorted: `[${[...values].sort((a, b) => a - b).join(", ")}]`, reversed: `[${[...values].reverse().join(", ")}]`, any: String(values.some(Boolean)), all: String(values.every(Boolean)) };
  return <section id="built-ins" className="lesson-card"><p className="lesson-section-label">Built-in Function Dashboard</p><h2>Compute without hiding what changes</h2><p>These Python functions accept the List and return information or a separate result. They do not add or remove elements from the live List.</p><div className="built-in-dashboard">{builtIns.map((item) => <article key={item.name}><code>{item.example}</code><strong>{results[item.name]}</strong><span>{item.purpose}</span></article>)}</div></section>;
}

export function BuiltInMethodComparison({ content }: { content: Pack["comparison"] }) {
  return <section id="built-in-method-comparison" className="lesson-card"><p className="lesson-section-label">Built-in vs method</p><h2>{content.title}</h2><p>{content.body}</p><div className="built-method-table" role="table">{content.rows.map((row) => <div role="row" key={row.builtIn}><code role="cell">{row.builtIn}</code><code role="cell">{row.method}</code><span role="cell">{row.distinction}</span></div>)}</div></section>;
}

export function ListManagementStoryCards({ updating, agritech }: { updating: Pack["updating"]; agritech: Pack["agritech"] }) {
  return <section id="updating" className="working-list-two-column"><article className="lesson-card"><p className="lesson-section-label">Updating elements</p><h2>{updating.title}</h2><p>{updating.body}</p><pre><code>{updating.code}</code></pre></article><article id="agritech-example" className="lesson-card"><p className="lesson-section-label">Agritech example</p><h2>{agritech.title}</h2><p>{agritech.body}</p><pre><code>{agritech.code}</code></pre></article></section>;
}

export function WorkingListEngineerScenario({ content }: { content: Pack["engineerScenario"] }) {
  return <section id="engineer" className="lesson-card collections-engineer"><p className="lesson-section-label">Think like an engineer</p><h2>{content.title}</h2><p>{content.body}</p><div className="collections-chip-row">{content.operations.map((operation) => <Tag key={operation} type="purple">{operation}</Tag>)}</div><blockquote>{content.question}</blockquote></section>;
}
