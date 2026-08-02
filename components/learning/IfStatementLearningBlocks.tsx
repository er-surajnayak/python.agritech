import { Button, CodeSnippet, Slider, Tag, TextArea, TextInput, Tile } from "@carbon/react";
import { AgricultureAnalytics, ArrowDown, ArrowRight, Checkmark, Code, Debug, Flow, Renew } from "@carbon/icons-react";
import { useEffect, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import { checkIfIndentation, inspectConditionalChain, inspectForLoopExecution, inspectIfElseExecution, inspectIfExecution, inspectLoopControlExecution, inspectMatchCaseExecution, inspectNestedExecution, inspectWhileLoopExecution } from "@/components/learning/if-statement-inspector";
import type { PlaygroundExecution, PythonTraceVariable } from "@/components/learning/usePythonRunner";
import type { IfStatementLessonDevelopmentPack, PlaygroundContent } from "@/types/content";

export function IfStoryCard({ content }: { content: IfStatementLessonDevelopmentPack["story"] }) {
  return <><section id="if-story" className="lesson-card if-story-card" aria-labelledby="if-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Smart irrigation story</p><h2 id="if-story-title">{content.title}</h2><p>{content.body}</p><div className="if-story-readings">{content.readings.map((reading) => <Tile key={reading.label}><span>{reading.label}</span><strong>{reading.value}</strong></Tile>)}</div><Tile className="if-story-condition"><span>Motor starts only if</span><code>{content.condition}</code></Tile></section><WorkflowAnimation id="if-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function ConditionStatusCard({ condition, result }: { condition: string; result: boolean | null }) {
  return <Tile className={`condition-status-card ${result === null ? "is-waiting" : result ? "is-true" : "is-false"}`} aria-live="polite"><span>Condition status</span><code>{condition}</code><strong>{result === null ? "Run to evaluate" : result ? "True" : "False"}</strong><Tag type={result === null ? "gray" : result ? "green" : "red"}>{result === null ? "waiting" : "bool"}</Tag></Tile>;
}

export function ExecutionPathViewer({ condition, result, action }: { condition: string; result: boolean; action: string }) {
  return <div className="execution-path-viewer" aria-label={`${condition} is ${result ? "True" : "False"}`}><div><span>Condition</span><code>{condition}</code></div><ArrowDown size={20} /><div className={result ? "is-active" : ""}><span>True</span><strong>Execute block</strong><small>{action}</small></div><div className={!result ? "is-active" : ""}><span>False</span><strong>Skip block</strong><small>Continue after the indented code</small></div></div>;
}

export function IfStatementVisualizer({ content }: { content: IfStatementLessonDevelopmentPack["definition"] }) {
  const [result, setResult] = useState(true);
  return <section id="if-definition" className="lesson-card if-statement-visualizer" aria-labelledby="if-definition-title"><p className="lesson-section-label"><Flow size={16} /> If Statement Visualizer</p><h2 id="if-definition-title">{content.title}</h2><p>{content.body}</p><div className="if-result-controls"><Button size="sm" kind={result ? "primary" : "ghost"} onClick={() => setResult(true)}>Condition is True</Button><Button size="sm" kind={!result ? "danger" : "ghost"} onClick={() => setResult(false)}>Condition is False</Button></div><ExecutionPathViewer condition="condition" result={result} action={content.trueAction} /><p className="if-false-guidance">{content.falseAction}</p></section>;
}

export function IfSyntaxBreakdown({ content }: { content: IfStatementLessonDevelopmentPack["syntax"] }) {
  const [active, setActive] = useState(0);
  return <section id="if-syntax" className="lesson-card if-syntax-breakdown" aria-labelledby="if-syntax-title"><p className="lesson-section-label"><Code size={16} /> Syntax breakdown</p><h2 id="if-syntax-title">{content.title}</h2><p>{content.body}</p><CodeSnippet type="multi" feedback="Copied">{content.template}</CodeSnippet><div className="if-syntax-parts">{content.parts.map((part, index) => <button type="button" key={part.label} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}><code>{part.token}</code><strong>{part.label}</strong></button>)}</div><Tile aria-live="polite"><strong>{content.parts[active].label}</strong><p>{content.parts[active].description}</p></Tile></section>;
}

export function FirstIfExample({ content }: { content: IfStatementLessonDevelopmentPack["firstExample"] }) {
  const [value, setValue] = useState(content.defaultValue);
  const result = value > content.threshold;
  const exampleCode = `${content.variable} = ${value}\n\nif ${content.variable} > ${content.threshold}:\n    print("Hot Weather")`;
  return <section id="first-if-example" className="lesson-card first-if-example" aria-labelledby="first-if-example-title"><p className="lesson-section-label"><Code size={16} /> First example</p><h2 id="first-if-example-title">{content.title}</h2><p>{content.explanation}</p><div className="first-if-grid"><div><CodeSnippet type="multi" feedback="Copied">{exampleCode}</CodeSnippet><Slider id="first-if-temperature" labelText="Temperature (°C)" min={15} max={45} value={value} onChange={({ value: next }) => setValue(Number(next))} /></div><ConditionStatusCard condition={`${content.variable} > ${content.threshold}`} result={result} /></div><ExecutionPathViewer condition={`${value} > ${content.threshold}`} result={result} action={'print("Hot Weather")'} /></section>;
}

export function IfExecutionFlow({ content }: { content: IfStatementLessonDevelopmentPack["executionFlow"] }) {
  const [value, setValue] = useState(content.falseValue);
  const result = value > 30;
  const lines = ["print(\"Start\")", `temperature = ${value}`, "if temperature > 30:", "    print(\"Motor ON\")", "print(\"End\")"];
  return <section id="execution-flow" className="lesson-card if-execution-flow" aria-labelledby="execution-flow-title"><p className="lesson-section-label"><Flow size={16} /> Execution flow</p><h2 id="execution-flow-title">{content.title}</h2><p>{content.explanation}</p><div className="execution-value-buttons"><Button size="sm" kind={value === content.falseValue ? "primary" : "ghost"} onClick={() => setValue(content.falseValue)}>False path · {content.falseValue}°C</Button><Button size="sm" kind={value === content.trueValue ? "primary" : "ghost"} onClick={() => setValue(content.trueValue)}>True path · {content.trueValue}°C</Button></div><ol className="execution-line-preview">{lines.map((line, index) => { const skipped = index === 3 && !result; return <li key={`${line}-${index}`} className={skipped ? "is-skipped" : "is-executed"}><span>{index + 1}</span><code>{line}</code><Tag size="sm" type={skipped ? "gray" : "green"}>{skipped ? "skipped" : "executed"}</Tag></li>; })}</ol><ExecutionPathViewer condition={`${value} > 30`} result={result} action={'print("Motor ON")'} /></section>;
}

export function IndentationChecker({ content }: { content: IfStatementLessonDevelopmentPack["indentation"] }) {
  const [code, setCode] = useState(content.missingIndentation);
  const issues = checkIfIndentation(code);
  return <section id="indentation-checker" className="lesson-card indentation-checker" aria-labelledby="indentation-checker-title"><p className="lesson-section-label"><Checkmark size={16} /> Indentation Checker</p><h2 id="indentation-checker-title">{content.title}</h2><p>{content.body}</p><div className="indentation-presets"><Button size="sm" kind="ghost" onClick={() => setCode(content.missingIndentation)}>Missing indentation</Button><Button size="sm" kind="ghost" onClick={() => setCode(content.extraIndentation)}>Extra indentation</Button><Button size="sm" kind="ghost" onClick={() => setCode(content.missingColon)}>Missing colon</Button><Button size="sm" kind="tertiary" onClick={() => setCode(content.correctCode)}>Correct example</Button></div><TextArea id="indentation-code" labelText="Edit the if statement" rows={5} value={code} onChange={(event) => setCode(event.currentTarget.value)} /><div className="indentation-results" aria-live="polite">{issues.length ? issues.map((issue) => <Tile key={`${issue.kind}-${issue.line}`}><Tag type="red">Line {issue.line}</Tag><strong>{issue.message}</strong><p>{issue.suggestion}</p></Tile>) : <Tile className="is-correct"><Checkmark size={20} /><div><strong>Block structure looks correct</strong><p>The header has a colon and the controlled statement uses four spaces.</p></div></Tile>}</div></section>;
}

export function IfExamplesGallery({ multiple, examples }: { multiple: IfStatementLessonDevelopmentPack["multipleStatements"]; examples: IfStatementLessonDevelopmentPack["agritechExamples"] }) {
  const [selected, setSelected] = useState(0);
  const active = examples[selected];
  return <><section id="multiple-statements" className="lesson-card if-multiple-statements" aria-labelledby="multiple-statements-title"><p className="lesson-section-label"><Code size={16} /> Multiple statements</p><h2 id="multiple-statements-title">{multiple.title}</h2><p>{multiple.explanation}</p><CodeSnippet type="multi" feedback="Copied">{multiple.code}</CodeSnippet><pre><code>{multiple.output}</code></pre></section><section id="agritech-if-examples" className="lesson-card if-examples-gallery" aria-labelledby="agritech-if-examples-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Agritech examples</p><h2 id="agritech-if-examples-title">One syntax pattern, many farm decisions</h2><div>{examples.map((example, index) => <Button key={example.title} size="sm" kind={index === selected ? "primary" : "ghost"} onClick={() => setSelected(index)}>{example.title}</Button>)}</div><div className="if-example-detail"><div><h3>{active.title}</h3><p>{active.explanation}</p><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet></div><ExecutionPathViewer condition={active.condition} result={active.result} action={active.output ?? "Execute action"} /></div></section></>;
}

export function CodeStepRunner({ code, execution, mode = "if" }: { code: string; execution: PlaygroundExecution; mode?: "if" | "if-else" | "if-elif-else" | "nested-if" | "match-case" | "for-loop" | "while-loop" | "loop-control" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const inspection = mode === "loop-control" ? inspectLoopControlExecution(code, execution) : mode === "while-loop" ? inspectWhileLoopExecution(code, execution) : mode === "for-loop" ? inspectForLoopExecution(code, execution) : mode === "match-case" ? inspectMatchCaseExecution(code, execution) : mode === "nested-if" ? inspectNestedExecution(code, execution) : mode === "if-elif-else" ? inspectConditionalChain(code, execution) : mode === "if-else" ? inspectIfElseExecution(code, execution) : inspectIfExecution(code, execution);
  const safeIndex = Math.min(activeIndex, Math.max(0, execution.trace.length - 1));
  const step = execution.trace[safeIndex];
  const variables: PythonTraceVariable[] = step?.variables ?? [];
  return <section className="code-step-runner" aria-labelledby="code-step-runner-title"><div className="code-step-runner-heading"><div><p className="lesson-section-label"><Debug size={16} /> Code Step Runner</p><h3 id="code-step-runner-title">Inspect each executed line</h3></div><Tag type={execution.status === "success" ? "green" : execution.status === "error" ? "red" : "gray"}>{execution.status}</Tag></div>{step ? <><div className="step-runner-controls"><Button size="sm" kind="ghost" disabled={safeIndex === 0} onClick={() => setActiveIndex((value) => Math.max(0, value - 1))}>Previous</Button><span>Step {safeIndex + 1} of {execution.trace.length}</span><Button size="sm" kind="tertiary" disabled={safeIndex === execution.trace.length - 1} onClick={() => setActiveIndex((value) => Math.min(execution.trace.length - 1, value + 1))}>Next</Button></div><div className="step-runner-grid"><Tile><span>Current line</span><strong>Line {step.lineNumber}</strong><code>{step.code}</code></Tile><ConditionStatusCard condition={inspection.condition} result={inspection.conditionResult} /><Tile><span>Console output</span><pre><code>{step.output || "No output yet."}</code></pre></Tile></div><div className="step-variable-grid"><span>Variable Inspector · values after this line</span>{variables.length ? variables.map((variable) => <Tile key={variable.name}><strong>{variable.name}</strong><code>{variable.value}</code><Tag size="sm" type="blue">{variable.type}</Tag></Tile>) : <p>No learner variables exist yet.</p>}</div></> : <Tile><p>Run the playground to collect real Python execution steps.</p></Tile>}</section>;
}

export function DecisionTimeline({ input, code, execution, mode = "if" }: { input: string; code: string; execution: PlaygroundExecution; mode?: "if" | "if-else" | "if-elif-else" | "nested-if" | "match-case" }) {
  const matchInspection = mode === "match-case" ? inspectMatchCaseExecution(code, execution) : null;
  const nestedInspection = mode === "nested-if" ? inspectNestedExecution(code, execution) : null;
  const chainInspection = mode === "if-elif-else" ? inspectConditionalChain(code, execution) : null;
  const inspection = matchInspection ?? nestedInspection ?? chainInspection ?? (mode === "if-else" ? inspectIfElseExecution(code, execution) : inspectIfExecution(code, execution));
  const chainBranch = chainInspection?.selectedBranch !== null && chainInspection?.selectedBranch !== undefined ? `${chainInspection.branches[chainInspection.selectedBranch].kind} branch ${chainInspection.selectedBranch + 1}` : null;
  const nestedBranch = nestedInspection?.selectedPath ? nestedInspection.selectedPath.replaceAll("-", " ") : null;
  const matchBranch = matchInspection?.selectedCase !== null && matchInspection?.selectedCase !== undefined ? `case ${matchInspection.cases[matchInspection.selectedCase].pattern}` : null;
  const branch = matchBranch ?? nestedBranch ?? chainBranch ?? (mode === "if-else" && inspection.conditionResult !== null ? inspection.conditionResult ? "if block" : "else block" : inspection.conditionResult === null ? "Waiting" : inspection.conditionResult ? "if block" : "Block skipped");
  const items = [{ label: "Input values", value: input || "—" }, { label: "Condition evaluated", value: inspection.condition }, { label: "Selected branch", value: branch }, { label: "Executed lines", value: inspection.executedLines.length ? inspection.executedLines.join(", ") : "—" }, { label: "Final output", value: execution.status === "success" ? execution.output.trim() || "No printed output" : "—" }];
  const [visibleCount, setVisibleCount] = useState(items.length);
  useEffect(() => {
    if (visibleCount >= items.length) return;
    const timer = window.setTimeout(() => setVisibleCount((count) => count + 1), 450);
    return () => window.clearTimeout(timer);
  }, [items.length, visibleCount]);
  const replaying = visibleCount < items.length;
  return <section className="decision-timeline" aria-labelledby="decision-timeline-title"><div><Flow size={20} /><h3 id="decision-timeline-title">Decision Timeline</h3><Button size="sm" kind="ghost" renderIcon={Renew} onClick={() => setVisibleCount(1)} disabled={execution.status !== "success" || replaying}>Replay timeline</Button></div><ol>{items.map((item, index) => <li key={item.label} className={index < visibleCount ? "is-visible" : ""}><span>{index + 1}</span><div><strong>{item.label}</strong><code>{item.value}</code></div>{index < items.length - 1 && <ArrowRight size={18} />}</li>)}</ol></section>;
}

export function IfPlayground({ content, fields }: { content: PlaygroundContent; fields: IfStatementLessonDevelopmentPack["simulatorFields"] }) {
  const field = fields[0];
  const [input, setInput] = useState(field.defaultValue);
  return <CodePlayground id="playground" content={content} className="if-playground" inputValues={[input]} traceExecution renderSupplement={(code, execution) => <div className="if-playground-supplement"><div className="if-playground-input"><TextInput id="if-playground-temperature" labelText={field.label} helperText="This value is supplied to input() when you run the code." inputMode="decimal" value={input} onChange={(event) => setInput(event.currentTarget.value)} /><Button size="sm" kind="ghost" renderIcon={Renew} onClick={() => setInput(field.defaultValue)}>Reset input</Button></div><DecisionTimeline input={`${field.label}: ${input}`} code={code} execution={execution} /><CodeStepRunner key={`${execution.status}-${execution.trace.length}-${execution.output}`} code={code} execution={execution} /></div>} />;
}
