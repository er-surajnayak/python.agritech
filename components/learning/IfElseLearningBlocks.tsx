import { Button, CodeSnippet, Slider, Tag, TextInput, Tile } from "@carbon/react";
import { AgricultureAnalytics, ArrowDown, Checkmark, Code, Compare, Flow, Renew } from "@carbon/icons-react";
import { useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CodeStepRunner, DecisionTimeline } from "@/components/learning/IfStatementLearningBlocks";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { IfElseLessonDevelopmentPack, PlaygroundContent } from "@/types/content";

export function IfElseStoryCard({ content }: { content: IfElseLessonDevelopmentPack["story"] }) {
  return <><section id="if-else-story" className="lesson-card if-else-story" aria-labelledby="if-else-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Story continuation</p><h2 id="if-else-story-title">{content.title}</h2><p>{content.body}</p><div className="if-else-story-grid"><div><span>Lesson 2.2 controller</span><CodeSnippet type="multi" feedback="Copied">{content.priorCode}</CodeSnippet></div><Tile><span>Reading</span><strong>{content.missingValue}%</strong><p>The condition is False, so the one-way program says nothing.</p></Tile><Tile className="missing-outcome"><span>Required alternative</span><strong>{content.missingOutcome}</strong></Tile></div></section><WorkflowAnimation id="if-else-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function WhyIfAloneCard({ content }: { content: IfElseLessonDevelopmentPack["whyIfAlone"] }) {
  return <section id="why-if-alone" className="lesson-card why-if-alone" aria-labelledby="why-if-alone-title"><p className="lesson-section-label"><Flow size={16} /> Why if alone is not enough</p><h2 id="why-if-alone-title">{content.title}</h2><p>{content.explanation}</p><div className="why-if-alone-grid"><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><Tile><span>Output</span><pre><code>{content.output}</code></pre><strong>{content.question}</strong><p>{content.answer}</p></Tile></div></section>;
}

export function ConditionOutcomeCard({ label, active, action }: { label: "True" | "False"; active: boolean; action: string }) {
  return <Tile className={`condition-outcome-card ${active ? "is-active" : "is-skipped"}`}><Tag type={label === "True" ? "green" : "red"}>{label}</Tag><strong>{label === "True" ? "if block" : "else block"}</strong><code>{action}</code><span>{active ? "Executed" : "Skipped"}</span></Tile>;
}

export function DualPathAnimation({ condition, result, trueAction, falseAction }: { condition: string; result: boolean; trueAction: string; falseAction: string }) {
  return <div className="dual-path-animation" aria-label={`${condition} selects the ${result ? "if" : "else"} block`}><Tile className="dual-path-condition"><span>Condition</span><code>{condition}</code><strong>{result ? "True" : "False"}</strong></Tile><ArrowDown size={22} /><div className="dual-path-branches"><ConditionOutcomeCard label="True" active={result} action={trueAction} /><ConditionOutcomeCard label="False" active={!result} action={falseAction} /></div></div>;
}

export function IfElseVisualizer({ content }: { content: IfElseLessonDevelopmentPack["definition"] }) {
  const [result, setResult] = useState(true);
  return <section id="if-else-definition" className="lesson-card if-else-visualizer" aria-labelledby="if-else-definition-title"><p className="lesson-section-label"><Flow size={16} /> If-Else Visualizer</p><h2 id="if-else-definition-title">{content.title}</h2><p>{content.body}</p><div className="if-result-controls"><Button size="sm" kind={result ? "primary" : "ghost"} onClick={() => setResult(true)}>Condition is True</Button><Button size="sm" kind={!result ? "danger" : "ghost"} onClick={() => setResult(false)}>Condition is False</Button></div><DualPathAnimation condition="condition" result={result} trueAction={content.trueAction} falseAction={content.falseAction} /><Tile className="exactly-one-outcome"><Checkmark size={20} /><strong>{content.guarantee}</strong></Tile></section>;
}

export function IfElseSyntaxBreakdown({ content }: { content: IfElseLessonDevelopmentPack["syntax"] }) {
  const [active, setActive] = useState(0);
  return <section id="if-else-syntax" className="lesson-card if-else-syntax" aria-labelledby="if-else-syntax-title"><p className="lesson-section-label"><Code size={16} /> Syntax</p><h2 id="if-else-syntax-title">{content.title}</h2><p>{content.body}</p><CodeSnippet type="multi" feedback="Copied">{content.template}</CodeSnippet><div className="if-else-syntax-parts">{content.parts.map((part, index) => <button type="button" key={part.label} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}><code>{part.token}</code><strong>{part.label}</strong></button>)}</div><Tile aria-live="polite"><strong>{content.parts[active].label}</strong><p>{content.parts[active].description}</p></Tile></section>;
}

export function FirstIfElseExample({ content }: { content: IfElseLessonDevelopmentPack["firstExample"] }) {
  const [value, setValue] = useState(content.trueValue);
  const result = value > content.threshold;
  const code = `${content.variable} = ${value}\n\nif ${content.variable} > ${content.threshold}:\n    print("${content.trueOutput}")\nelse:\n    print("${content.falseOutput}")`;
  return <section id="first-if-else-example" className="lesson-card first-if-else-example" aria-labelledby="first-if-else-example-title"><p className="lesson-section-label"><Code size={16} /> First example</p><h2 id="first-if-else-example-title">{content.title}</h2><p>{content.explanation}</p><div className="first-if-else-grid"><div><CodeSnippet type="multi" feedback="Copied">{code}</CodeSnippet><Slider id="if-else-temperature" labelText="Temperature (°C)" min={20} max={45} value={value} onChange={({ value: next }) => setValue(Number(next))} /></div><DualPathAnimation condition={`${value} > ${content.threshold}`} result={result} trueAction={content.trueOutput} falseAction={content.falseOutput} /></div></section>;
}

export function AgritechIfElseGallery({ examples }: { examples: IfElseLessonDevelopmentPack["agritechExamples"] }) {
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState(examples[0].defaultValue);
  const active = examples[selected];
  const result = active.operator === "<" ? value < active.threshold : value > active.threshold;
  function choose(index: number) { setSelected(index); setValue(examples[index].defaultValue); }
  return <section id="agritech-if-else" className="lesson-card agritech-if-else" aria-labelledby="agritech-if-else-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Agritech examples</p><h2 id="agritech-if-else-title">Complete both operational outcomes</h2><div className="agritech-if-else-tabs">{examples.map((example, index) => <Button key={example.title} size="sm" kind={selected === index ? "primary" : "ghost"} onClick={() => choose(index)}>{example.title}</Button>)}</div><div className="agritech-if-else-grid"><div><h3>{active.title}</h3><p>{active.explanation}</p><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><Slider id="agritech-if-else-value" labelText="Sensor value" min={0} max={200} value={value} onChange={({ value: next }) => setValue(Number(next))} /></div><DualPathAnimation condition={`${value} ${active.operator} ${active.threshold}`} result={result} trueAction={active.trueAction} falseAction={active.falseAction} /></div></section>;
}

function ComparatorLane({ value, condition, result, output }: { value: number; condition: string; result: boolean; output: string }) {
  return <Tile className={`comparator-lane ${result ? "is-true" : "is-false"}`}><div><span>Input</span><strong>{value}%</strong></div><ArrowDown size={18} /><code>{condition}</code><Tag type={result ? "green" : "red"}>{result ? "True" : "False"}</Tag><div><span>Selected branch</span><strong>{result ? "if block" : "else block"}</strong></div><pre><code>{output}</code></pre></Tile>;
}

export function ExecutionComparator({ content }: { content: IfElseLessonDevelopmentPack["comparator"] }) {
  const [left, setLeft] = useState(content.trueInput);
  const [right, setRight] = useState(content.falseInput);
  const leftResult = left < 30;
  const rightResult = right < 30;
  return <section id="execution-comparator" className="lesson-card execution-comparator" aria-labelledby="execution-comparator-title"><p className="lesson-section-label"><Compare size={16} /> Execution Comparator</p><h2 id="execution-comparator-title">{content.title}</h2><p>{content.body}</p><div className="comparator-inputs"><TextInput id="comparator-left" labelText="First soil reading (%)" type="number" value={String(left)} onChange={(event) => setLeft(Number(event.currentTarget.value))} /><TextInput id="comparator-right" labelText="Second soil reading (%)" type="number" value={String(right)} onChange={(event) => setRight(Number(event.currentTarget.value))} /></div><div className="comparator-grid"><ComparatorLane value={left} condition={`${left} < 30`} result={leftResult} output={leftResult ? content.trueOutput : content.falseOutput} /><ComparatorLane value={right} condition={`${right} < 30`} result={rightResult} output={rightResult ? content.trueOutput : content.falseOutput} /></div></section>;
}

export function CompareChooseCard({ content }: { content: IfElseLessonDevelopmentPack["comparison"] }) {
  return <section id="compare-choose" className="lesson-card compare-choose-card" aria-labelledby="compare-choose-title"><p className="lesson-section-label"><Compare size={16} /> Compare & Choose</p><h2 id="compare-choose-title">{content.title}</h2><p>{content.body}</p><div className="compare-choose-table"><table><thead><tr><th>Feature</th><th><code>if</code></th><th><code>if-else</code></th></tr></thead><tbody>{content.rows.map((row) => <tr key={row.feature}><th>{row.feature}</th><td>{row.ifOnly}</td><td>{row.ifElse}</td></tr>)}</tbody></table></div></section>;
}

export function IfElsePlayground({ content, fields }: { content: PlaygroundContent; fields: IfElseLessonDevelopmentPack["simulatorFields"] }) {
  const field = fields[0];
  const [input, setInput] = useState(field.defaultValue);
  return <CodePlayground id="playground" content={content} className="if-else-playground" inputValues={[input]} traceExecution renderSupplement={(code, execution) => <div className="if-playground-supplement"><div className="if-playground-input"><TextInput id="if-else-playground-soil" labelText={field.label} helperText="This value is supplied to input() when the program runs." inputMode="decimal" value={input} onChange={(event) => setInput(event.currentTarget.value)} /><Button size="sm" kind="ghost" renderIcon={Renew} onClick={() => setInput(field.defaultValue)}>Reset input</Button></div><DecisionTimeline input={`${field.label}: ${input}`} code={code} execution={execution} mode="if-else" /><CodeStepRunner key={`${execution.status}-${execution.trace.length}-${execution.output}`} code={code} execution={execution} mode="if-else" /></div>} />;
}
