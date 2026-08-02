import { Button, CodeSnippet, DataTable, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow, Tag, Tile } from "@carbon/react";
import { AgricultureAnalytics, Flow, Pause, SkipForward, StopFilled } from "@carbon/icons-react";
import { useMemo, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CodeStepRunner } from "@/components/learning/IfStatementLearningBlocks";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import { inspectLoopControlExecution } from "@/components/learning/if-statement-inspector";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";
import type { LoopControlLessonDevelopmentPack, LoopControlStatement, PlaygroundContent } from "@/types/content";

const statementTone: Record<LoopControlStatement | "none", "red" | "purple" | "teal" | "gray"> = { break: "red", continue: "purple", pass: "teal", none: "gray" };
const statementIcon = { break: StopFilled, continue: SkipForward, pass: Pause };

export function LoopControlStoryCard({ content }: { content: LoopControlLessonDevelopmentPack["story"] }) {
  return <><section id="loop-control-story" className="lesson-card loop-control-story" aria-labelledby="loop-control-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Smart Farm story continuation</p><h2 id="loop-control-story-title">{content.title}</h2><p>{content.body}</p><div className="loop-control-incidents">{content.incidents.map((incident, index) => <Tile key={incident}><span>{index + 1}</span><strong>{incident}</strong><Tag type={index === 2 ? "red" : index === 1 ? "purple" : "teal"}>{index === 2 ? "stop" : index === 1 ? "skip" : "respond"}</Tag></Tile>)}</div></section><WorkflowAnimation id="loop-control-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

function FlowStrip({ title, values, tone }: { title: string; values: string[]; tone: "blue" | "purple" | "red" }) {
  return <Tile><Tag type={tone}>{title}</Tag><div className="control-flow-strip">{values.map((value, index) => <span key={`${value}-${index}`}>{value}</span>)}</div></Tile>;
}

export function WhyLoopControlCard({ content }: { content: LoopControlLessonDevelopmentPack["whyControl"] }) {
  return <section id="why-loop-control" className="lesson-card why-loop-control" aria-labelledby="why-loop-control-title"><p className="lesson-section-label"><Flow size={16} /> Why loop control?</p><h2 id="why-loop-control-title">{content.title}</h2><p>{content.body}</p><div className="control-flow-examples"><FlowStrip title="Normal" values={content.normalFlow} tone="blue" /><FlowStrip title="Fault · continue" values={content.faultFlow} tone="purple" /><FlowStrip title="Emergency · break" values={content.emergencyFlow} tone="red" /></div></section>;
}

function buildControlIterations(statement: LoopControlStatement, trigger: number) {
  const items: Array<{ value: number; action: LoopControlStatement | "none"; result: string }> = [];
  for (let value = 1; value <= 8; value += 1) {
    const action = value === trigger ? statement : "none";
    items.push({ value, action, result: action === "break" ? "Exit loop" : action === "continue" ? "Skip output" : action === "pass" ? "No action; output runs" : "Print value" });
    if (action === "break") break;
  }
  return items;
}

export function IterationFlowAnimator({ statement, trigger }: { statement: LoopControlStatement; trigger: number }) {
  const items = buildControlIterations(statement, trigger);
  return <div className="iteration-flow-animator" aria-live="polite"><ol>{items.map((item, index) => <li key={item.value} className={`is-${item.action}`}><span>Iteration {index + 1}</span><code>value = {item.value}</code><Tag type={statementTone[item.action]}>{item.action === "none" ? "normal" : item.action}</Tag><strong>{item.result}</strong></li>)}</ol><Tile className="control-result"><strong>{statement === "break" ? "Loop ended early" : "Loop reached the end"}</strong><p>{statement === "continue" ? `Value ${trigger} produced no output.` : statement === "pass" ? `Value ${trigger} still reached the following print.` : `No values after ${trigger} were processed.`}</p></Tile></div>;
}

export function LoopControlVisualizer({ controls }: { controls: LoopControlLessonDevelopmentPack["controls"] }) {
  const [selected, setSelected] = useState(0);
  const active = controls[selected];
  const Icon = statementIcon[active.statement];
  return <section id="loop-control-visualizer" className="lesson-card loop-control-visualizer" aria-labelledby="loop-control-visualizer-title"><p className="lesson-section-label"><Flow size={16} /> Loop Control Visualizer</p><h2 id="loop-control-visualizer-title">Stop, skip, or deliberately do nothing</h2><div className="control-tabs" role="tablist" aria-label="Loop control statement">{controls.map((control, index) => <Button role="tab" aria-selected={selected === index} key={control.statement} size="sm" kind={selected === index ? "primary" : "ghost"} renderIcon={statementIcon[control.statement]} onClick={() => setSelected(index)}>{control.statement}</Button>)}</div><div className="control-definition"><div><Tag type={statementTone[active.statement]}><Icon size={14} /> {active.statement}</Tag><h3>{active.title}</h3><p>{active.explanation}</p><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><pre><code>{active.output}</code></pre></div><IterationFlowAnimator statement={active.statement} trigger={active.triggerValue} /></div><Tile className="agritech-control-example"><strong>Agritech application</strong><p>{active.agritechExplanation}</p><CodeSnippet type="multi" feedback="Copied">{active.agritechCode}</CodeSnippet></Tile></section>;
}

export function ControlStatementComparator({ content, controls }: { content: LoopControlLessonDevelopmentPack["comparator"]; controls: LoopControlLessonDevelopmentPack["controls"] }) {
  const headers = [{ key: "statement", header: "Statement" }, { key: "effect", header: "Effect" }, { key: "loopContinues", header: "Loop continues?" }, { key: "currentIteration", header: "Current iteration" }];
  return <section id="control-comparator" className="lesson-card control-comparator" aria-labelledby="control-comparator-title"><p className="lesson-section-label"><Flow size={16} /> Control Statement Comparator</p><h2 id="control-comparator-title">{content.title}</h2><p>{content.body}</p><DataTable rows={content.rows.map((row, index) => ({ id: String(index), ...row }))} headers={headers}>{({ rows, headers: tableHeaders, getHeaderProps, getRowProps, getTableProps }) => <TableContainer><Table {...getTableProps()}><TableHead><TableRow>{tableHeaders.map((header) => <TableHeader {...getHeaderProps({ header })} key={header.key}>{header.header}</TableHeader>)}</TableRow></TableHead><TableBody>{rows.map((row) => <TableRow {...getRowProps({ row })} key={row.id}>{row.cells.map((cell) => <TableCell key={cell.id}>{cell.value}</TableCell>)}</TableRow>)}</TableBody></Table></TableContainer>}</DataTable><div className="comparator-visuals"><FlowStrip title="No control" values={["1 · print", "2 · print", "3 · print", "4 · print", "5 · print"]} tone="blue" />{controls.map((control) => <Tile key={control.statement}><Tag type={statementTone[control.statement]}>{control.statement}</Tag><IterationFlowAnimator statement={control.statement} trigger={3} /></Tile>)}</div></section>;
}

export function SensorFaultSimulator({ content }: { content: LoopControlLessonDevelopmentPack["simulator"] }) {
  const [maintenance, setMaintenance] = useState(content.maintenanceSensor);
  const [critical, setCritical] = useState(content.criticalSensor);
  const sensors = useMemo(() => Array.from({ length: Math.min(content.sensorCount, critical) }, (_, index) => { const sensor = index + 1; return { sensor, action: sensor === critical ? "break" as const : sensor === maintenance ? "continue" as const : "none" as const }; }), [content.sensorCount, critical, maintenance]);
  return <section id="sensor-fault-simulator" className="lesson-card sensor-fault-simulator" aria-labelledby="sensor-simulator-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Sensor Fault Simulator</p><h2 id="sensor-simulator-title">{content.title}</h2><p>{content.body}</p><div className="sensor-simulator-controls"><Slider id="maintenance-sensor" labelText="Maintenance sensor · continue" min={1} max={content.sensorCount} value={maintenance} onChange={({ value }) => setMaintenance(Number(value))} /><Slider id="critical-sensor" labelText="Critical sensor · break" min={1} max={content.sensorCount} value={critical} onChange={({ value }) => setCritical(Number(value))} /></div><div className="sensor-simulator-grid" aria-live="polite">{sensors.map((item) => <Tile key={item.sensor} className={`is-${item.action}`}><span>Sensor {item.sensor}</span><Tag type={statementTone[item.action]}>{item.action === "none" ? "checked" : item.action}</Tag></Tile>)}</div><Tile><strong>{critical <= maintenance ? `Inspection stops at sensor ${critical} before sensor ${maintenance} can be skipped.` : `Sensor ${maintenance} is skipped; inspection stops at sensor ${critical}.`}</strong></Tile></section>;
}

export function LoopControlExecutionTimeline({ code, execution }: { code: string; execution: PlaygroundExecution }) {
  const inspection = inspectLoopControlExecution(code, execution);
  return <section className="loop-control-timeline" aria-labelledby="control-timeline-title"><div><p className="lesson-section-label"><Flow size={16} /> Execution Timeline</p><h3 id="control-timeline-title">Trace each real Python iteration</h3></div>{inspection.iterations.length ? <ol>{inspection.iterations.map((item) => <li key={item.index} className={`is-${item.action}`}><span>Iteration {item.index}</span><code>{inspection.variable} = {item.value}</code><Tag type={statementTone[item.action]}>{item.action === "none" ? "normal" : item.action}</Tag><strong>{item.output || (item.action === "continue" ? "Output skipped" : item.action === "pass" ? "Placeholder executed" : "No output")}</strong><small>Executed lines: {item.executedLines.join(", ")}</small></li>)}</ol> : <Tile><p>Run the playground to collect iteration data.</p></Tile>}<Tile><Tag type={inspection.terminatedEarly ? "red" : "green"}>{inspection.terminatedEarly ? "Stopped by break" : "Loop complete"}</Tag></Tile></section>;
}

export function LoopControlPlayground({ content }: { content: PlaygroundContent }) {
  return <CodePlayground id="playground" content={content} className="loop-control-playground" traceExecution renderSupplement={(code, execution) => <div className="if-playground-supplement"><LoopControlExecutionTimeline code={code} execution={execution} /><CodeStepRunner key={`${execution.status}-${execution.trace.length}-${execution.output}`} code={code} execution={execution} mode="loop-control" /></div>} />;
}

export function ControlCompareChoose({ content }: { content: LoopControlLessonDevelopmentPack["comparison"] }) {
  return <section id="compare-choose" className="lesson-card control-compare-choose" aria-labelledby="control-choose-title"><p className="lesson-section-label"><Flow size={16} /> Compare & Choose</p><h2 id="control-choose-title">{content.title}</h2><p>{content.body}</p><div>{content.rows.map((row) => <Tile key={row.situation}><span>{row.situation}</span><Tag type={row.bestChoice === "break" ? "red" : row.bestChoice === "continue" ? "purple" : row.bestChoice === "pass" ? "teal" : "gray"}>{row.bestChoice}</Tag><p>{row.reason}</p></Tile>)}</div></section>;
}
