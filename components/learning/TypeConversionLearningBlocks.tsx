import { Button, CodeSnippet, Tag, Tile, Toggle } from "@carbon/react";
import { AgricultureAnalytics, ArrowRight, CheckmarkOutline, Code, ErrorOutline, Flow, Renew } from "@carbon/icons-react";
import { useMemo, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CodeTracePanel } from "@/components/learning/CodeTracePanel";
import { inspectPythonConversions, type ConversionInspection } from "@/components/learning/conversion-inspector";
import { TypeBadge, VariableExplorer } from "@/components/learning/VariableLearningBlocks";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";
import type { ConversionExampleContent, PlaygroundContent, TypeConversionLessonDevelopmentPack, WorkflowStep } from "@/types/content";

type ConversionDisplay = Pick<ConversionExampleContent, "title" | "originalValue" | "originalType" | "conversion" | "convertedValue" | "convertedType" | "code" | "explanation"> & { error?: string };

export function TypeConversionStoryCard({ content }: { content: TypeConversionLessonDevelopmentPack["story"] }) {
  return <><section id="conversion-story" className="lesson-card conversion-story-card" aria-labelledby="conversion-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Real-life story</p><h2 id="conversion-story-title">{content.title}</h2><p>{content.body}</p><div className="conversion-story-problem"><Tile><span>Sensor payload</span><strong>{content.sensorValue}</strong><TypeBadge type="str" /></Tile><CodeSnippet type="multi" feedback="Copied">{content.failedCode}</CodeSnippet><Tile className="conversion-story-answer"><ErrorOutline size={20} /><p>{content.answer}</p></Tile></div></section><WorkflowAnimation id="conversion-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function TypeFlowDiagram({ id, title, description, steps }: { id: string; title: string; description: string; steps: WorkflowStep[] }) {
  return <section id={id} className="lesson-card type-flow-diagram" aria-labelledby={`${id}-title`}><p className="lesson-section-label"><Flow size={16} /> Type flow diagram</p><h2 id={`${id}-title`}>{title}</h2><p>{description}</p><ol>{steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.title}</strong><p>{step.description}</p>{index < steps.length - 1 && <ArrowRight size={20} />}</li>)}</ol></section>;
}

export function ConversionDefinitionCard({ content }: { content: TypeConversionLessonDevelopmentPack["definition"] }) {
  return <><section id="conversion-definition" className="lesson-card conversion-definition-card" aria-labelledby="conversion-definition-title"><p className="lesson-section-label"><Renew size={16} /> Type conversion</p><h2 id="conversion-definition-title">{content.title}</h2><p>{content.body}</p><div className="conversion-definition-grid"><CodeSnippet type="multi" feedback="Copied">{content.example.code}</CodeSnippet><Tile><span>Output</span><strong>{content.example.output}</strong><p>{content.example.explanation}</p></Tile></div><ul>{content.items?.map((item) => <li key={item}>{item}</li>)}</ul></section><TypeFlowDiagram id="conversion-type-flow" title="One value can move through compatible representations" description="Conversion functions create new representations that suit the next task." steps={content.flow} /></>;
}

export function ImplicitConversionCard({ content }: { content: TypeConversionLessonDevelopmentPack["implicitConversion"] }) {
  return <><section id="implicit-conversion" className="lesson-card implicit-conversion-card" aria-labelledby="implicit-conversion-title"><p className="lesson-section-label"><Renew size={16} /> Implicit conversion</p><h2 id="implicit-conversion-title">{content.title}</h2><p>{content.explanation}</p><div className="implicit-conversion-grid"><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><div className="implicit-type-equation">{content.before.map((value) => <Tile key={`${value.value}-${value.type}`}><strong>{value.value}</strong><TypeBadge type={value.type} /></Tile>)}<ArrowRight size={24} /><Tile className="is-result"><strong>{content.after.value}</strong><TypeBadge type={content.after.type} /></Tile></div></div></section><WorkflowAnimation id="implicit-conversion-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function ExplicitConversionCard({ content }: { content: TypeConversionLessonDevelopmentPack["explicitConversion"] }) {
  return <><section id="explicit-conversion" className="lesson-card explicit-conversion-card" aria-labelledby="explicit-conversion-title"><p className="lesson-section-label"><Code size={16} /> Explicit conversion</p><h2 id="explicit-conversion-title">{content.title}</h2><p>{content.body}</p><ConversionResultCard conversion={content.example} /></section><WorkflowAnimation id="explicit-conversion-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function ConversionResultCard({ conversion }: { conversion: ConversionDisplay }) {
  return <Tile className={`conversion-result-card${conversion.error ? " has-error" : ""}`}><div><span>Original value</span><strong>{conversion.originalValue}</strong><TypeBadge type={conversion.originalType} /></div><div className="conversion-result-function"><ArrowRight size={18} /><code>{conversion.conversion}()</code><ArrowRight size={18} /></div><div><span>{conversion.error ? "Conversion error" : "Converted value"}</span><strong>{conversion.error ?? conversion.convertedValue}</strong>{!conversion.error && <TypeBadge type={conversion.convertedType} />}</div><CodeSnippet type="multi" feedback="Copied">{conversion.code}</CodeSnippet><p>{conversion.explanation}</p></Tile>;
}

export function ConversionFunctionExplorer({ content }: { content: TypeConversionLessonDevelopmentPack["conversionFunctions"] }) {
  const [functionIndex, setFunctionIndex] = useState(0);
  const [exampleIndex, setExampleIndex] = useState(0);
  const activeFunction = content[functionIndex];
  const activeExample = activeFunction.examples[Math.min(exampleIndex, activeFunction.examples.length - 1)];
  function selectFunction(index: number) { setFunctionIndex(index); setExampleIndex(0); }
  return <section id="conversion-functions" className="lesson-card conversion-function-explorer" aria-labelledby="conversion-functions-title"><p className="lesson-section-label"><Renew size={16} /> Conversion functions</p><h2 id="conversion-functions-title">Convert with int(), float(), str(), and bool()</h2><div className="conversion-function-tabs" role="tablist" aria-label="Conversion functions">{content.map((item, index) => <Button key={item.functionName} role="tab" aria-selected={functionIndex === index} kind={functionIndex === index ? "primary" : "ghost"} onClick={() => selectFunction(index)}>{item.functionName}()</Button>)}</div><div className="conversion-function-heading"><div><TypeBadge type={activeFunction.functionName === "str" ? "str" : activeFunction.functionName === "bool" ? "bool" : activeFunction.functionName} /><h3>{activeFunction.title}</h3><p>{activeFunction.purpose}</p></div>{activeFunction.agritechExample && <Tile><AgricultureAnalytics size={20} /><code>{activeFunction.agritechExample}</code></Tile>}</div><div className="conversion-example-tabs">{activeFunction.examples.map((example, index) => <Button key={example.title} size="sm" kind={exampleIndex === index ? "tertiary" : "ghost"} onClick={() => setExampleIndex(index)}>{example.title}</Button>)}</div><ConversionResultCard conversion={activeExample} /></section>;
}

export function ErrorExplorer({ content }: { content: TypeConversionLessonDevelopmentPack["errorExplorer"] }) {
  const [selected, setSelected] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const active = content.cases[selected];
  function select(index: number) { setSelected(index); setRevealed(false); }
  return <section id="conversion-errors" className="lesson-card conversion-error-explorer" aria-labelledby="conversion-errors-title"><p className="lesson-section-label"><ErrorOutline size={16} /> Error explorer</p><h2 id="conversion-errors-title">{content.title}</h2><p>{content.body}</p><div className="error-case-selector">{content.cases.map((item, index) => <Button key={item.label} size="sm" kind={selected === index ? "primary" : "ghost"} onClick={() => select(index)}>{item.label}</Button>)}</div><div className="error-case-detail"><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><Tile className={revealed ? active.valid ? "is-valid" : "is-invalid" : ""}><span>Predict: valid or invalid?</span><div><Button size="sm" kind="tertiary" onClick={() => setRevealed(true)} disabled={revealed}>Reveal result</Button></div><div aria-live="polite">{revealed ? <><Tag type={active.valid ? "green" : "red"}>{active.valid ? "Valid" : "Invalid"}</Tag><strong>{active.result}</strong><p>{active.explanation}</p></> : <p>Decide before revealing.</p>}</div></Tile></div></section>;
}

export function ConversionVisualizer({ conversions }: { conversions: ConversionDisplay[] }) {
  const [selected, setSelected] = useState(0);
  const active = conversions[Math.min(selected, conversions.length - 1)];
  if (!active) return <section className="conversion-visualizer"><div><Renew size={20} /><h3>Conversion visualizer</h3></div><Tile><p>Add an assignment using int(), float(), str(), or bool() to inspect its type transformation.</p></Tile></section>;
  return <section className="conversion-visualizer" aria-labelledby="conversion-visualizer-title"><div><Renew size={20} /><h3 id="conversion-visualizer-title">Conversion visualizer</h3><Tag size="sm" type={active.error ? "red" : "green"}>{active.error ? "error" : `${conversions.length} detected`}</Tag></div><div className="conversion-visualizer-selector">{conversions.map((conversion, index) => <Button key={`${conversion.title}-${index}`} size="sm" kind={selected === index ? "tertiary" : "ghost"} onClick={() => setSelected(index)}>{conversion.title}</Button>)}</div><ConversionResultCard conversion={active} /></section>;
}

function toDisplay(conversion: ConversionInspection, index: number): ConversionDisplay {
  return { title: conversion.variable || `Conversion ${index + 1}`, ...conversion, code: `${conversion.variable} = ${conversion.conversion}(${conversion.originalValue})`, explanation: conversion.error ? "Python could not create the requested representation." : `${conversion.originalType} was converted explicitly to ${conversion.convertedType}.` };
}

export function ConversionPlayground({ content, examples, activities }: { content: PlaygroundContent; examples: ConversionExampleContent[]; activities: string[] }) {
  return <CodePlayground id="playground" content={content} className="conversion-playground" traceExecution renderSupplement={(code, execution) => <ConversionPlaygroundSupplement code={code} execution={execution} examples={examples} activities={activities} />} />;
}

function ConversionPlaygroundSupplement({ code, execution, examples, activities }: { code: string; execution: PlaygroundExecution; examples: ConversionExampleContent[]; activities: string[] }) {
  const inspected = useMemo(() => inspectPythonConversions(code), [code]);
  const liveConversions = inspected.conversions.map(toDisplay);
  return <><div className="conversion-learning-panels"><div><ConversionVisualizer conversions={liveConversions.length ? liveConversions : examples} /><VariableExplorer variables={inspected.variables} /></div><CodeTracePanel key={`${execution.status}-${execution.trace.length}-${execution.output}`} execution={execution} /></div><Tile className="conversion-playground-activities"><p className="lesson-section-label">Conversion experiments</p><ol>{activities.map((activity) => <li key={activity}>{activity}</li>)}</ol></Tile></>;
}

export function ImplicitExplicitComparison({ implicitTitle, explicitTitle }: { implicitTitle: string; explicitTitle: string }) {
  const [explicit, setExplicit] = useState(false);
  return <Tile className="implicit-explicit-toggle"><Toggle id="implicit-explicit-toggle" labelText="Conversion responsibility" labelA="Python" labelB="Programmer" toggled={explicit} onToggle={setExplicit} /><div aria-live="polite"><Tag type={explicit ? "purple" : "blue"}>{explicit ? "Explicit" : "Implicit"}</Tag><strong>{explicit ? explicitTitle : implicitTitle}</strong></div></Tile>;
}

export function ConversionCompleteCard() {
  return <Tile className="conversion-complete-card"><CheckmarkOutline size={20} /><p>The value, type, conversion function, result, and execution trace now describe the complete transformation.</p></Tile>;
}
