import { Button, CodeSnippet, DataTable, InlineNotification, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow, Tag, TextArea, TextInput, Tile } from "@carbon/react";
import { AgricultureAnalytics, Code, Flow, Renew, Repeat, WarningAlt } from "@carbon/icons-react";
import { useMemo, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { IterationTimeline } from "@/components/learning/ForLoopLearningBlocks";
import { CodeStepRunner } from "@/components/learning/IfStatementLearningBlocks";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import { analyzeWhileLoopSafety, inspectWhileLoopExecution } from "@/components/learning/if-statement-inspector";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";
import type { PlaygroundContent, WhileLoopLessonDevelopmentPack } from "@/types/content";

function buildWhileValues(initial: number, target: number, increment: number) {
  const values: number[] = [];
  if (increment <= 0) return values;
  for (let value = initial; value < target && values.length < 50; value += increment) values.push(value);
  return values;
}

export function WhileLoopStoryCard({ content }: { content: WhileLoopLessonDevelopmentPack["story"] }) {
  return <><section id="while-story" className="lesson-card while-story" aria-labelledby="while-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Smart Farm story continuation</p><h2 id="while-story-title">{content.title}</h2><p>{content.body}</p><div className="while-story-grid"><Tile><span>Known collection</span><div>{content.knownSequence.map((item) => <Tag key={item} type="blue">{item}</Tag>)}</div><strong>Use a for loop</strong></Tile><Tile><span>Unknown duration</span><div>{content.unknownDurations.map((item) => <Tag key={item} type="purple">{item}</Tag>)}</div><strong>Use a while loop</strong></Tile></div></section><WorkflowAnimation id="while-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function WhyWhileCard({ content }: { content: WhileLoopLessonDevelopmentPack["whyWhile"] }) {
  return <section id="why-while" className="lesson-card why-while" aria-labelledby="why-while-title"><p className="lesson-section-label"><Repeat size={16} /> Why for is not enough</p><h2 id="why-while-title">{content.title}</h2><p>{content.body}</p><div className="loop-model-comparison"><Tile><Tag type="blue">for</Tag><strong>{content.knownLabel}</strong><CodeSnippet type="multi" feedback="Copied">{content.forCode}</CodeSnippet></Tile><Tile><Tag type="purple">while</Tag><strong>{content.unknownLabel}</strong><p>Keep checking until the monitored state reaches its target.</p></Tile></div></section>;
}

export function WhileDefinitionCard({ content }: { content: WhileLoopLessonDevelopmentPack["definition"] }) {
  return <section id="while-definition" className="lesson-card while-definition" aria-labelledby="while-definition-title"><p className="lesson-section-label"><Flow size={16} /> What is a while loop?</p><h2 id="while-definition-title">{content.title}</h2><p>{content.body}</p><div className="while-flow-strip">{content.flow.map((step, index) => <Tile key={step.title}><span>{index + 1}</span><strong>{step.title}</strong><p>{step.description}</p></Tile>)}</div></section>;
}

export function WhileSyntaxBreakdown({ content }: { content: WhileLoopLessonDevelopmentPack["syntax"] }) {
  const [active, setActive] = useState(0);
  return <section id="while-syntax" className="lesson-card while-syntax" aria-labelledby="while-syntax-title"><p className="lesson-section-label"><Code size={16} /> Syntax</p><h2 id="while-syntax-title">{content.title}</h2><p>{content.body}</p><CodeSnippet type="multi" feedback="Copied">{content.template}</CodeSnippet><div className="while-syntax-parts">{content.parts.map((part, index) => <button type="button" key={part.label} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}><code>{part.token}</code><strong>{part.label}</strong></button>)}</div><Tile aria-live="polite"><strong>{content.parts[active].label}</strong><p>{content.parts[active].description}</p></Tile></section>;
}

export function ConditionMonitor({ variable, value, condition, result }: { variable: string; value: number | string; condition: string; result: boolean }) {
  return <Tile className={`condition-monitor ${result ? "is-true" : "is-false"}`} aria-live="polite"><span>Condition Monitor</span><div><code>{variable} = {value}</code><code>{condition}</code></div><Tag type={result ? "green" : "red"}>{result ? "True · repeat" : "False · end"}</Tag></Tile>;
}

export function WhileLoopVisualizer({ example }: { example: WhileLoopLessonDevelopmentPack["firstExample"] }) {
  const [initial, setInitial] = useState(example.initialValue);
  const [target, setTarget] = useState(example.targetValue);
  const [increment, setIncrement] = useState(example.increment);
  const values = useMemo(() => buildWhileValues(initial, target, increment), [increment, initial, target]);
  const finalValue = values.length ? values.at(-1)! + increment : initial;
  const items = values.map((value, index) => ({ index: index + 1, value: String(value), output: `${value} → ${value + increment}` }));
  return <section id="while-visualizer" className="lesson-card while-visualizer" aria-labelledby="while-visualizer-title"><p className="lesson-section-label"><Repeat size={16} /> While Loop Visualizer</p><h2 id="while-visualizer-title">{example.title}</h2><p>{example.explanation}</p><CodeSnippet type="multi" feedback="Copied">{example.code}</CodeSnippet><div className="while-visualizer-controls"><Slider id="while-initial" labelText="Initial value" min={0} max={50} value={initial} onChange={({ value }) => setInitial(Number(value))} /><Slider id="while-target" labelText="Target" min={1} max={60} value={target} onChange={({ value }) => setTarget(Number(value))} /><Slider id="while-increment" labelText="Increment" min={1} max={10} value={increment} onChange={({ value }) => setIncrement(Number(value))} /></div><ConditionMonitor variable={example.variable} value={initial} condition={`${example.variable} < ${target}`} result={initial < target} /><IterationTimeline variable={example.variable} items={items} completed /><ConditionMonitor variable={example.variable} value={finalValue} condition={`${example.variable} < ${target}`} result={finalValue < target} /></section>;
}

export function UpdateCycleCard({ content }: { content: WhileLoopLessonDevelopmentPack["updateCycle"] }) {
  return <section id="update-cycle" className="lesson-card update-cycle" aria-labelledby="update-cycle-title"><p className="lesson-section-label"><Renew size={16} /> Understanding the update</p><h2 id="update-cycle-title">{content.title}</h2><p>{content.body}</p><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><div className="infinite-cycle">{content.steps.map((step) => <Tile key={step.title}><strong>{step.title}</strong><p>{step.description}</p></Tile>)}</div></section>;
}

export function AgritechWhileExamples({ examples }: { examples: WhileLoopLessonDevelopmentPack["agritechExamples"] }) {
  const [selected, setSelected] = useState(0);
  const active = examples[selected];
  return <section id="agritech-while-examples" className="lesson-card agritech-while-examples" aria-labelledby="agritech-while-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Agritech examples</p><h2 id="agritech-while-title">Monitor a changing state until it is safe</h2><div>{examples.map((example, index) => <Button key={example.title} size="sm" kind={index === selected ? "primary" : "ghost"} onClick={() => setSelected(index)}>{example.title}</Button>)}</div><div className="agritech-while-detail"><div><h3>{active.title}</h3><p>{active.explanation}</p><pre><code>{active.output}</code></pre></div><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet></div></section>;
}

export function InfiniteLoopDetector({ content }: { content: WhileLoopLessonDevelopmentPack["infiniteLoop"] }) {
  const safeCode = "count = 1\n\nwhile count <= 5:\n    print(count)\n    count += 1";
  const [code, setCode] = useState(content.dangerousCode);
  const analysis = analyzeWhileLoopSafety(code);
  return <section id="infinite-loop-detector" className="lesson-card infinite-loop-detector" aria-labelledby="infinite-detector-title"><p className="lesson-section-label"><WarningAlt size={16} /> Infinite Loop Detector</p><h2 id="infinite-detector-title">{content.title}</h2><p>{content.body}</p><div className="detector-presets"><Button size="sm" kind="ghost" onClick={() => setCode(content.dangerousCode)}>Missing update</Button><Button size="sm" kind="tertiary" onClick={() => setCode(safeCode)}>Safe update</Button></div><TextArea id="while-safety-code" labelText="Inspect the loop before running" rows={7} value={code} onChange={(event) => setCode(event.currentTarget.value)} /><InlineNotification lowContrast hideCloseButton kind={analysis.severity === "safe" ? "success" : analysis.severity === "danger" ? "error" : "warning"} title={analysis.message} subtitle={analysis.hint} /><div className="infinite-cycle">{content.cycle.map((step) => <Tile key={step.title}><strong>{step.title}</strong><p>{step.description}</p></Tile>)}</div></section>;
}

export function WhileLoopTimeline({ code, execution }: { code: string; execution: PlaygroundExecution }) {
  const inspection = inspectWhileLoopExecution(code, execution);
  const items = inspection.iterations.map((item) => ({ index: item.index, value: item.beforeValue, output: `${item.beforeValue} → ${item.afterValue}${item.output ? ` · ${item.output.replaceAll("\n", " · ")}` : ""}`, executedLines: item.executedLines }));
  return <div className="while-trace"><IterationTimeline variable={inspection.variable || "value"} items={items} completed={inspection.completed} /><ConditionMonitor variable={inspection.variable || "value"} value={inspection.finalValue} condition={inspection.condition} result={!inspection.completed && inspection.iterations.length > 0} /></div>;
}

export function WhileLoopPlayground({ content, fields }: { content: PlaygroundContent; fields: WhileLoopLessonDevelopmentPack["simulatorFields"] }) {
  const field = fields[0];
  const [input, setInput] = useState(field.defaultValue);
  const validateCode = (code: string) => { const analysis = analyzeWhileLoopSafety(code); return analysis.severity === "danger" ? analysis.message : null; };
  return <CodePlayground id="playground" content={content} className="while-loop-playground" inputValues={[input]} traceExecution validateCode={validateCode} renderSupplement={(code, execution) => <div className="if-playground-supplement"><div className="if-playground-input"><TextInput id="while-loop-moisture" labelText={field.label} helperText="This value is supplied to input() when the program runs." type="number" min={0} max={100} value={input} onChange={(event) => setInput(event.currentTarget.value)} /><Button size="sm" kind="ghost" renderIcon={Renew} onClick={() => setInput(field.defaultValue)}>Reset input</Button></div><WhileLoopTimeline code={code} execution={execution} /><CodeStepRunner key={`${execution.status}-${execution.trace.length}-${execution.output}`} code={code} execution={execution} mode="while-loop" /></div>} />;
}

function ComparisonTable({ title, body, rows, headers }: { title: string; body: string; rows: Array<Record<string, string>>; headers: Array<{ key: string; header: string }> }) {
  return <section className="lesson-card loop-comparison"><h2>{title}</h2><p>{body}</p><DataTable rows={rows.map((row, index) => ({ id: String(index), ...row }))} headers={headers}>{({ rows: tableRows, headers: tableHeaders, getHeaderProps, getRowProps, getTableProps }) => <TableContainer><Table {...getTableProps()}><TableHead><TableRow>{tableHeaders.map((header) => <TableHeader {...getHeaderProps({ header })} key={header.key}>{header.header}</TableHeader>)}</TableRow></TableHead><TableBody>{tableRows.map((row) => <TableRow {...getRowProps({ row })} key={row.id}>{row.cells.map((cell) => <TableCell key={cell.id}>{cell.value}</TableCell>)}</TableRow>)}</TableBody></Table></TableContainer>}</DataTable></section>;
}

export function LoopComparisonCard({ content }: { content: WhileLoopLessonDevelopmentPack["forWhileComparison"] }) {
  return <div id="for-while-comparison"><ComparisonTable title={content.title} body={content.body} rows={content.rows} headers={[{ key: "feature", header: "Feature" }, { key: "forLoop", header: "for" }, { key: "whileLoop", header: "while" }]} /></div>;
}

export function CompareChooseCard({ content }: { content: WhileLoopLessonDevelopmentPack["comparison"] }) {
  return <div id="compare-choose"><ComparisonTable title={content.title} body={content.body} rows={content.rows} headers={[{ key: "situation", header: "Situation" }, { key: "bestConstruct", header: "Best construct" }, { key: "reason", header: "Reason" }]} /></div>;
}
