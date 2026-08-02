import { Button, CodeSnippet, Tag, Tile, Toggle } from "@carbon/react";
import {
  AgricultureAnalytics,
  ArrowRight,
  CheckmarkOutline,
  Code,
  DataBase,
  Switcher,
} from "@carbon/icons-react";
import { useMemo, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { PredictionCard } from "@/components/learning/PredictionCard";
import { TypeBadge, VariableExplorer } from "@/components/learning/VariableLearningBlocks";
import { inspectPythonVariables } from "@/components/learning/variable-inspector";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { DataTypeLessonDevelopmentPack, PlaygroundContent } from "@/types/content";

export function DataTypeStoryCard({ content }: { content: DataTypeLessonDevelopmentPack["story"] }) {
  return (
    <>
      <section id="data-type-story" className="lesson-card data-type-story-card" aria-labelledby="data-type-story-title">
        <p className="lesson-section-label"><AgricultureAnalytics size={16} /> Real-life story</p><h2 id="data-type-story-title">{content.title}</h2><p>{content.body}</p>
        <div className="typed-farm-facts">{content.facts.map((fact) => <Tile key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong><TypeBadge type={fact.type} /></Tile>)}</div>
      </section>
      <WorkflowAnimation id="data-type-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} />
    </>
  );
}

export function DataTypeDefinitionCard({ content }: { content: DataTypeLessonDevelopmentPack["definition"] }) {
  return (
    <>
      <section id="data-type-definition" className="lesson-card data-type-definition-card" aria-labelledby="data-type-definition-title"><p className="lesson-section-label"><DataBase size={16} /> Data type concept</p><h2 id="data-type-definition-title">{content.title}</h2><p>{content.body}</p><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet></section>
      <WorkflowAnimation id="data-type-memory-flow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} />
    </>
  );
}

export function PredictOutputCard({ content }: { content: DataTypeLessonDevelopmentPack["whyTypesMatter"] }) {
  return <PredictionCard id="why-types-matter" content={content} />;
}

export function DataTypeComparisonCard({ types }: { types: DataTypeLessonDevelopmentPack["types"] }) {
  const [selected, setSelected] = useState(0);
  const active = types.items[selected];
  return (
    <section id="data-type-comparison" className="lesson-card data-type-comparison-card" aria-labelledby="data-type-comparison-title">
      <p className="lesson-section-label"><DataBase size={16} /> Foundational data types</p><h2 id="data-type-comparison-title">{types.title}</h2><p>{types.body}</p>
      <div className="data-type-selector">{types.items.map((item, index) => <Button id={`data-type-${item.type.toLowerCase()}`} key={item.type} kind={selected === index ? "primary" : "ghost"} onClick={() => setSelected(index)} aria-pressed={selected === index}><TypeBadge type={item.type} /><span>{item.title}</span></Button>)}</div>
      <div className="data-type-detail" aria-live="polite"><div><TypeBadge type={active.type} /><h3>{active.title}</h3><p>{active.definition}</p><CodeSnippet type="multi" feedback="Copied">{active.examples}</CodeSnippet><Tile><AgricultureAnalytics size={20} /><div><span>Agritech example</span><code>{active.agritechExample}</code></div></Tile></div><ol>{active.visualValues.map((value, index) => <li key={value}><span>{String(index + 1).padStart(2, "0")}</span><strong>{value}</strong></li>)}</ol></div>
    </section>
  );
}

export function StringQuoteExplorer({ content }: { content: DataTypeLessonDevelopmentPack["stringQuotes"] }) {
  const [quoted, setQuoted] = useState(true);
  return (
    <section id="string-quotes" className="lesson-card string-quote-card" aria-labelledby="string-quotes-title"><div className="lesson-card-heading"><div><p className="lesson-section-label"><Code size={16} /> String experiment</p><h2 id="string-quotes-title">{content.title}</h2><p>{content.body}</p></div><Toggle id="string-quotes-toggle" labelText="Quotation marks" labelA="Removed" labelB="Included" toggled={quoted} onToggle={setQuoted} /></div><CodeSnippet type="multi" feedback="Copied">{quoted ? content.quotedCode : content.unquotedCode}</CodeSnippet><Tile className={quoted ? "quote-result is-success" : "quote-result is-error"} aria-live="polite"><Tag type={quoted ? "green" : "red"}>{quoted ? "Output" : "Error"}</Tag><code>{quoted ? content.success : content.error}</code></Tile></section>
  );
}

export function BooleanSwitchCard({ content }: { content: DataTypeLessonDevelopmentPack["booleanSwitch"] }) {
  const [on, setOn] = useState(true);
  return (
    <section id="boolean-switch" className="lesson-card boolean-switch-card" aria-labelledby="boolean-switch-title"><div><p className="lesson-section-label"><Switcher size={16} /> Boolean switch</p><h2 id="boolean-switch-title">{content.title}</h2><p>{content.body}</p></div><div className={`boolean-switch-visual${on ? " is-on" : ""}`}><Button hasIconOnly renderIcon={Switcher} iconDescription={on ? "Turn motor off" : "Turn motor on"} onClick={() => setOn((value) => !value)} /><div><TypeBadge type="bool" /><strong>{on ? "ON" : "OFF"}</strong><code>{on ? content.onName : content.offName}</code></div></div></section>
  );
}

export function TypeFunctionExplorer({ content }: { content: DataTypeLessonDevelopmentPack["typeFunction"] }) {
  const [selected, setSelected] = useState(0);
  const active = content.examples[selected];
  return (
    <section id="type-function" className="lesson-card type-function-card" aria-labelledby="type-function-title"><p className="lesson-section-label"><Code size={16} /> type() function</p><h2 id="type-function-title">{content.title}</h2><p>{content.body}</p><div className="type-function-selector">{content.examples.map((example, index) => <Button key={example.title} size="sm" kind={selected === index ? "primary" : "ghost"} onClick={() => setSelected(index)}>{example.title}</Button>)}</div><div className="type-function-example" aria-live="polite"><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><Tile><span>Output</span><code>{active.output}</code><p>{active.explanation}</p></Tile></div></section>
  );
}

export function TypeConversionVisualizer({ content }: { content: DataTypeLessonDevelopmentPack["conversions"] }) {
  const [selected, setSelected] = useState(0);
  const active = content.items[selected];
  return (
    <section id="type-conversion" className="lesson-card type-conversion-card" aria-labelledby="type-conversion-title"><p className="lesson-section-label"><ArrowRight size={16} /> Type conversion</p><h2 id="type-conversion-title">{content.title}</h2><p>{content.body}</p><div className="conversion-selector">{content.items.map((item, index) => <Button key={`${item.from}-${item.to}`} size="sm" kind={selected === index ? "primary" : "ghost"} onClick={() => setSelected(index)}><TypeBadge type={item.from} /><ArrowRight size={16} /><TypeBadge type={item.to} /></Button>)}</div><div className="conversion-visual" aria-live="polite"><div><TypeBadge type={active.from} /><strong>{active.input}</strong></div><ArrowRight size={28} /><div><TypeBadge type={active.to} /><strong>{active.output}</strong></div></div><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><Tile className="conversion-explanation"><CheckmarkOutline size={20} /><p>{active.explanation}</p></Tile></section>
  );
}

export function DataTypePlayground({ id, content, activities }: { id: string; content: PlaygroundContent; activities: string[] }) {
  return <CodePlayground id={id} content={content} className="data-type-playground" renderSupplement={(code) => <DataTypePlaygroundSupplement code={code} activities={activities} />} />;
}

function DataTypePlaygroundSupplement({ code, activities }: { code: string; activities: string[] }) {
  const variables = useMemo(() => inspectPythonVariables(code), [code]);
  return <><VariableExplorer variables={variables} /><Tile className="data-type-playground-activities"><p className="lesson-section-label">Type experiments</p><ol>{activities.map((activity) => <li key={activity}>{activity}</li>)}</ol></Tile></>;
}
