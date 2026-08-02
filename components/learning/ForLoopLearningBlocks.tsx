import { Button, CodeSnippet, DataTable, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow, Tag, TextInput, Tile } from "@carbon/react";
import { AgricultureAnalytics, Checkmark, Code, Flow, Renew, Repeat, SkipForward } from "@carbon/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CodeStepRunner } from "@/components/learning/IfStatementLearningBlocks";
import { inspectForLoopExecution } from "@/components/learning/if-statement-inspector";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { ForLoopLessonDevelopmentPack, PlaygroundContent, RangeExampleContent } from "@/types/content";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";

function buildRange(start: number, stop: number, step: number) {
  const values: number[] = [];
  const safeStep = Math.max(1, step);
  for (let value = start; value < stop && values.length < 50; value += safeStep) values.push(value);
  return values;
}

export function ForLoopStoryCard({ content }: { content: ForLoopLessonDevelopmentPack["story"] }) {
  return <><section id="for-story" className="lesson-card for-story" aria-labelledby="for-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Smart Farm story continuation</p><h2 id="for-story-title">{content.title}</h2><p>{content.body}</p><div className="sensor-scale-grid">{content.sensorCounts.map((item) => <Tile key={item.label}><span>{item.label}</span><strong>{item.count}</strong></Tile>)}</div><div className="repeated-sensor-code"><CodeSnippet type="multi" feedback="Copied">{content.repeatedCode}</CodeSnippet><Tile><strong>“We have hundreds of sensors. This won’t scale.”</strong><p>The program needs one reusable processing rule.</p></Tile></div></section><WorkflowAnimation id="for-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function WhyLoopsCard({ content }: { content: ForLoopLessonDevelopmentPack["whyLoops"] }) {
  return <section id="why-loops" className="lesson-card why-loops" aria-labelledby="why-loops-title"><p className="lesson-section-label"><Repeat size={16} /> Why loops?</p><h2 id="why-loops-title">{content.title}</h2><p>{content.body}</p><div className="loop-code-comparison"><div><Tag type="red">Without loop</Tag><CodeSnippet type="multi" feedback="Copied">{content.withoutLoop}</CodeSnippet></div><div><Tag type="green">With loop</Tag><CodeSnippet type="multi" feedback="Copied">{content.withLoop}</CodeSnippet></div></div><Tile className="loop-cleaner-result"><Checkmark size={20} /><strong>One repeated block replaces {content.repeatedCount} copied statements.</strong></Tile></section>;
}

export function ForLoopDefinitionCard({ content }: { content: ForLoopLessonDevelopmentPack["definition"] }) {
  return <section id="for-definition" className="lesson-card for-definition" aria-labelledby="for-definition-title"><p className="lesson-section-label"><Flow size={16} /> What is a for loop?</p><h2 id="for-definition-title">{content.title}</h2><p>{content.body}</p><div className="for-flow-strip">{content.flow.map((step, index) => <div key={step.title}><span>{index + 1}</span><strong>{step.title}</strong><p>{step.description}</p></div>)}</div></section>;
}

export function ForSyntaxBreakdown({ content }: { content: ForLoopLessonDevelopmentPack["syntax"] }) {
  const [active, setActive] = useState(0);
  return <section id="for-syntax" className="lesson-card for-syntax" aria-labelledby="for-syntax-title"><p className="lesson-section-label"><Code size={16} /> Syntax</p><h2 id="for-syntax-title">{content.title}</h2><p>{content.body}</p><CodeSnippet type="multi" feedback="Copied">{content.template}</CodeSnippet><div className="for-syntax-parts">{content.parts.map((part, index) => <button type="button" key={part.label} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}><code>{part.token}</code><strong>{part.label}</strong></button>)}</div><Tile aria-live="polite"><strong>{content.parts[active].label}</strong><p>{content.parts[active].description}</p></Tile></section>;
}

export function LoopCounter({ current, total }: { current: number; total: number }) {
  const complete = total > 0 && current >= total;
  return <Tile className="loop-counter" aria-live="polite"><span>Loop counter</span><strong>{Math.min(current, total)} <small>of {total}</small></strong><div role="progressbar" aria-label="Loop progress" aria-valuemin={0} aria-valuemax={total} aria-valuenow={Math.min(current, total)}><span style={{ width: `${total ? Math.min(100, (current / total) * 100) : 0}%` }} /></div><Tag type={complete ? "green" : "blue"}>{complete ? "Complete" : "Processing"}</Tag></Tile>;
}

export interface IterationItem {
  index: number;
  value: string;
  output: string;
  executedLines?: number[];
}

export function IterationTimeline({ variable, items, activeIndex = items.length - 1, completed = true }: { variable: string; items: IterationItem[]; activeIndex?: number; completed?: boolean }) {
  return <section className="iteration-timeline" aria-labelledby="iteration-timeline-title"><div><p className="lesson-section-label"><Repeat size={16} /> Iteration Timeline</p><h3 id="iteration-timeline-title">Watch each item become the current value</h3></div>{items.length ? <ol>{items.map((item, index) => <li key={`${item.index}-${item.value}`} className={index === activeIndex ? "is-active" : index < activeIndex ? "is-complete" : "is-pending"}><span>Iteration {item.index}</span><code>{variable} = {item.value}</code><strong>{item.output || "No printed output"}</strong>{item.executedLines?.length ? <small>Executed lines: {item.executedLines.join(", ")}</small> : null}</li>)}{completed && <li className="loop-end"><Checkmark size={18} /><strong>Loop Ends</strong></li>}</ol> : <Tile><p>Run the loop to collect iteration data.</p></Tile>}</section>;
}

export function LoopVisualizer({ values, variable = "i", outputLabel = "print(i)" }: { values: Array<string | number>; variable?: string; outputLabel?: string }) {
  const [active, setActive] = useState(values.length ? 0 : -1);
  const timers = useRef<number[]>([]);
  useEffect(() => () => { timers.current.forEach((timer) => window.clearTimeout(timer)); }, []);
  const safeActive = values.length ? Math.min(active, values.length - 1) : -1;
  const replay = () => { timers.current.forEach((timer) => window.clearTimeout(timer)); timers.current = []; setActive(0); values.slice(1).forEach((_, index) => { timers.current.push(window.setTimeout(() => setActive(index + 1), (index + 1) * 500)); }); };
  const items = values.map((value, index) => ({ index: index + 1, value: String(value), output: `${outputLabel.replace(/\([^)]*\)/, "") || "Output"}: ${value}` }));
  return <div className="loop-visualizer"><div className="loop-visualizer-controls"><Button size="sm" renderIcon={Repeat} onClick={replay} disabled={!values.length}>Replay loop</Button><Button size="sm" kind="ghost" renderIcon={SkipForward} onClick={() => setActive((index) => Math.min(values.length - 1, index + 1))} disabled={!values.length || safeActive >= values.length - 1}>Next iteration</Button></div><LoopCounter current={safeActive + 1} total={values.length} /><IterationTimeline variable={variable} items={items} activeIndex={safeActive} completed={safeActive >= values.length - 1 && values.length > 0} /></div>;
}

export function RangeExplorer({ examples }: { examples: RangeExampleContent[] }) {
  const initial = examples[2] ?? examples[0];
  const [start, setStart] = useState(initial.start);
  const [stop, setStop] = useState(initial.stop);
  const [step, setStep] = useState(initial.step);
  const values = useMemo(() => buildRange(start, stop, step), [start, step, stop]);
  return <section id="range-explorer" className="lesson-card range-explorer" aria-labelledby="range-explorer-title"><p className="lesson-section-label"><Flow size={16} /> Range Explorer</p><h2 id="range-explorer-title">Build the sequence before running the loop</h2><p>Adjust start, exclusive stop, and step. The generated values show exactly what the loop will process.</p><div className="range-controls"><Slider id="range-start" labelText="Start" min={0} max={10} value={start} onChange={({ value }) => setStart(Number(value))} /><Slider id="range-stop" labelText="Stop (exclusive)" min={1} max={20} value={stop} onChange={({ value }) => setStop(Number(value))} /><Slider id="range-step" labelText="Step" min={1} max={5} value={step} onChange={({ value }) => setStep(Number(value))} /></div><Tile className="generated-range"><span>Generated sequence</span><code>range({start}, {stop}, {step})</code><div>{values.length ? values.map((value) => <Tag key={value} type="teal">{value}</Tag>) : <Tag type="red">empty sequence</Tag>}</div></Tile><LoopVisualizer values={values} /></section>;
}

export function AgritechLoopExamples({ examples }: { examples: ForLoopLessonDevelopmentPack["agritechExamples"] }) {
  const [selected, setSelected] = useState(0);
  const active = examples[selected];
  return <section id="agritech-loop-examples" className="lesson-card agritech-loop-examples" aria-labelledby="agritech-loop-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Agritech examples</p><h2 id="agritech-loop-title">One loop pattern, many farm collections</h2><div>{examples.map((example, index) => <Button key={example.title} size="sm" kind={index === selected ? "primary" : "ghost"} onClick={() => setSelected(index)}>{example.title}</Button>)}</div><div className="agritech-loop-detail"><div><h3>{active.title}</h3><p>{active.explanation}</p><pre><code>{active.output}</code></pre></div><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet></div></section>;
}

export function SequenceExplorer({ stringExample, listExample }: { stringExample: ForLoopLessonDevelopmentPack["stringExample"]; listExample: ForLoopLessonDevelopmentPack["listExample"] }) {
  const [mode, setMode] = useState<"range" | "string" | "list">("string");
  const [text, setText] = useState("RICE");
  const [listText, setListText] = useState("Rice, Wheat, Cotton");
  const values = mode === "range" ? buildRange(1, 6, 1).map(String) : mode === "string" ? [...text] : listText.split(",").map((item) => item.trim()).filter(Boolean);
  const variable = mode === "string" ? "letter" : mode === "list" ? "crop" : "number";
  const code = mode === "string" ? stringExample.code : mode === "list" ? listExample.code : "for number in range(1, 6):\n    print(number)";
  return <section id="sequence-explorer" className="lesson-card sequence-explorer" aria-labelledby="sequence-explorer-title"><p className="lesson-section-label"><Repeat size={16} /> Sequence Explorer</p><h2 id="sequence-explorer-title">Process ranges, strings, and lists one item at a time</h2><p>{mode === "string" ? stringExample.explanation : mode === "list" ? listExample.explanation : "range() produces a numeric sequence for the loop."}</p><div className="sequence-tabs">{(["range", "string", "list"] as const).map((item) => <Button key={item} size="sm" kind={mode === item ? "primary" : "ghost"} onClick={() => setMode(item)}>{item === "range" ? "range()" : item[0].toUpperCase() + item.slice(1)}</Button>)}</div>{mode === "string" && <TextInput id="sequence-string" labelText="String value" value={text} onChange={(event) => setText(event.currentTarget.value)} />}{mode === "list" && <TextInput id="sequence-list" labelText="Crop list (comma separated)" value={listText} onChange={(event) => setListText(event.currentTarget.value)} />}<CodeSnippet type="multi" feedback="Copied">{code}</CodeSnippet><div className="sequence-items">{values.map((value, index) => <Tile key={`${value}-${index}`}><span>{index + 1}</span><strong>{value}</strong></Tile>)}</div><LoopVisualizer values={values} variable={variable} outputLabel={`print(${variable})`} /></section>;
}

export function NestedLoopPreview({ content }: { content: ForLoopLessonDevelopmentPack["nestedPreview"] }) {
  return <section id="nested-loop-preview" className="lesson-card nested-loop-preview" aria-labelledby="nested-loop-preview-title"><p className="lesson-section-label"><Code size={16} /> Concept preview only</p><h2 id="nested-loop-preview-title">{content.title}</h2><p>{content.explanation}</p><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><Tile><strong>Not part of this lesson’s required coding</strong><p>Nested-loop reasoning will be taught separately. This preview only shows that loops can later process data at more than one level.</p></Tile></section>;
}

export function TraceIterationTimeline({ code, execution }: { code: string; execution: PlaygroundExecution }) {
  const inspection = inspectForLoopExecution(code, execution);
  return <IterationTimeline variable={inspection.variable || "item"} items={inspection.iterations} completed={inspection.completed} />;
}

export function ForLoopPlayground({ content, fields }: { content: PlaygroundContent; fields: ForLoopLessonDevelopmentPack["simulatorFields"] }) {
  const field = fields[0];
  const [input, setInput] = useState(field.defaultValue);
  return <CodePlayground id="playground" content={content} className="for-loop-playground" inputValues={[input]} traceExecution renderSupplement={(code, execution) => <div className="if-playground-supplement"><div className="if-playground-input"><TextInput id="for-loop-count" labelText={field.label} helperText="Use a small positive count while tracing each iteration." type="number" min={0} max={20} value={input} onChange={(event) => setInput(event.currentTarget.value)} /><Button size="sm" kind="ghost" renderIcon={Renew} onClick={() => setInput(field.defaultValue)}>Reset input</Button></div><TraceIterationTimeline code={code} execution={execution} /><CodeStepRunner key={`${execution.status}-${execution.trace.length}-${execution.output}`} code={code} execution={execution} mode="for-loop" /></div>} />;
}

export function LoopComparisonCard({ content }: { content: ForLoopLessonDevelopmentPack["comparison"] }) {
  const headers = [{ key: "situation", header: "Situation" }, { key: "bestConstruct", header: "Best construct" }, { key: "reason", header: "Reason" }];
  return <section id="compare-choose" className="lesson-card loop-comparison" aria-labelledby="loop-comparison-title"><p className="lesson-section-label"><Flow size={16} /> Compare & Choose</p><h2 id="loop-comparison-title">{content.title}</h2><p>{content.body}</p><DataTable rows={content.rows.map((row, index) => ({ id: String(index), ...row }))} headers={headers}>{({ rows, headers: tableHeaders, getHeaderProps, getRowProps, getTableProps }) => <TableContainer><Table {...getTableProps()}><TableHead><TableRow>{tableHeaders.map((header) => <TableHeader {...getHeaderProps({ header })} key={header.key}>{header.header}</TableHeader>)}</TableRow></TableHead><TableBody>{rows.map((row) => <TableRow {...getRowProps({ row })} key={row.id}>{row.cells.map((cell) => <TableCell key={cell.id}>{cell.value}</TableCell>)}</TableRow>)}</TableBody></Table></TableContainer>}</DataTable></section>;
}
