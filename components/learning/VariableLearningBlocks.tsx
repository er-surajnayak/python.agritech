import {
  Button,
  CodeSnippet,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
  StructuredListWrapper,
  Tag,
  TextInput,
  Tile,
  Toggle,
} from "@carbon/react";
import {
  ArrowRight,
  CheckmarkOutline,
  DataBase,
  Edit,
  Information,
  Rule,
  Save,
} from "@carbon/icons-react";
import { useId, useMemo, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { inspectPythonVariables, validateVariableName, type InspectedVariable } from "@/components/learning/variable-inspector";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { PlaygroundContent, VariableLessonDevelopmentPack } from "@/types/content";

export function VariableCard({ variable, index = 0 }: { variable: InspectedVariable; index?: number }) {
  return (
    <Tile className="variable-card" style={{ "--variable-index": index } as React.CSSProperties}>
      <div><DataBase size={20} /><TypeBadge type={variable.type} /></div>
      <strong>{variable.name}</strong>
      <span>{variable.value}</span>
    </Tile>
  );
}

const typeTagColors = {
  int: "blue",
  float: "cyan",
  str: "purple",
  bool: "teal",
  NoneType: "gray",
  reference: "warm-gray",
  expression: "magenta",
} as const;

export function TypeBadge({ type }: { type: InspectedVariable["type"] }) {
  return <Tag size="sm" type={typeTagColors[type]}>{type}</Tag>;
}

export function MemoryVisualizer({ variables, title = "Memory visualizer" }: { variables: InspectedVariable[]; title?: string }) {
  const titleId = useId();
  return (
    <section className="memory-visualizer" aria-labelledby={titleId}>
      <div className="memory-visualizer-heading"><div><Save size={20} /><h3 id={titleId}>{title}</h3></div><Tag type="green" size="sm">{variables.length} {variables.length === 1 ? "variable" : "variables"}</Tag></div>
      {variables.length ? <div className="memory-cells" aria-live="polite">{variables.map((variable, index) => <VariableCard key={variable.name} variable={variable} index={index} />)}</div> : <Tile className="memory-empty"><Information size={20} /><p>Add a valid assignment to create a memory cell.</p></Tile>}
    </section>
  );
}

export function TypeInspector({ variables, title = "Type inspector" }: { variables: InspectedVariable[]; title?: string }) {
  const titleId = useId();
  return (
    <section className="variable-inspector" aria-labelledby={titleId}>
      <div className="variable-inspector-heading"><DataBase size={20} /><h3 id={titleId}>{title}</h3></div>
      <StructuredListWrapper aria-label="Current Python variables">
        <StructuredListHead><StructuredListRow head><StructuredListCell head>Variable name</StructuredListCell><StructuredListCell head>Current value</StructuredListCell><StructuredListCell head>Python type</StructuredListCell></StructuredListRow></StructuredListHead>
        <StructuredListBody>
          {variables.length ? variables.map((variable) => <StructuredListRow key={variable.name}><StructuredListCell>{variable.name}</StructuredListCell><StructuredListCell>{variable.value}</StructuredListCell><StructuredListCell><TypeBadge type={variable.type} /></StructuredListCell></StructuredListRow>) : <StructuredListRow><StructuredListCell>No variables detected</StructuredListCell><StructuredListCell>—</StructuredListCell><StructuredListCell>—</StructuredListCell></StructuredListRow>}
        </StructuredListBody>
      </StructuredListWrapper>
      <p>The inspector recognizes the assignment patterns introduced in this lesson. Python remains the source of truth when the program runs.</p>
    </section>
  );
}

export function VariableInspector({ variables }: { variables: InspectedVariable[] }) {
  return <TypeInspector variables={variables} title="Variable inspector" />;
}

export function VariableExplorer({ variables }: { variables: InspectedVariable[] }) {
  return <div className="variable-explorer"><MemoryVisualizer variables={variables} /><TypeInspector variables={variables} /></div>;
}

export function VariablePlayground({ id, content, activities }: { id: string; content: PlaygroundContent; activities: string[] }) {
  return <CodePlayground id={id} content={content} className="variable-playground" renderSupplement={(code) => <VariablePlaygroundSupplement code={code} activities={activities} />} />;
}

function VariablePlaygroundSupplement({ code, activities }: { code: string; activities: string[] }) {
  const variables = useMemo(() => inspectPythonVariables(code), [code]);
  return <><VariableExplorer variables={variables} /><Tile className="variable-playground-activities"><p className="lesson-section-label">Try these changes</p><ol>{activities.map((activity) => <li key={activity}>{activity}</li>)}</ol></Tile></>;
}

export function VariableDefinitionCard({ content }: { content: VariableLessonDevelopmentPack["definition"] }) {
  const variables: InspectedVariable[] = content.examples.map(({ name, value }) => ({ name, value, type: /^-?\d+$/.test(value) ? "int" : "str" }));
  return (
    <section id="variable-definition" className="lesson-card variable-definition-card" aria-labelledby="variable-definition-title">
      <p className="lesson-section-label"><DataBase size={16} /> Variable concept</p><h2 id="variable-definition-title">{content.title}</h2><p>{content.body}</p>
      <div className="label-box-analogy">{content.examples.map((example) => <Tile key={example.name}><span>{example.name}</span><ArrowRight size={18} /><strong>{example.value}</strong></Tile>)}</div>
      <MemoryVisualizer variables={variables} title="Label-to-value model" />
    </section>
  );
}

export function VariableStoryCard({ content }: { content: VariableLessonDevelopmentPack["story"] }) {
  return (
    <>
      <section id="variable-story" className="lesson-card variable-story-card" aria-labelledby="variable-story-title"><p className="lesson-section-label"><Save size={16} /> Real-life story</p><h2 id="variable-story-title">{content.title}</h2><p>{content.body}</p><div className="farmer-fact-grid">{content.facts.map((fact, index) => <Tile key={fact}><span>{String(index + 1).padStart(2, "0")}</span><strong>{fact}</strong></Tile>)}</div></section>
      <WorkflowAnimation id="variable-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} />
    </>
  );
}

export function WhyVariablesCard({ content }: { content: VariableLessonDevelopmentPack["whyVariables"] }) {
  const [withVariables, setWithVariables] = useState(false);
  return (
    <section id="why-variables" className="lesson-card why-variables-card" aria-labelledby="why-variables-title">
      <div className="lesson-card-heading"><div><p className="lesson-section-label"><Information size={16} /> Why variables?</p><h2 id="why-variables-title">{content.title}</h2><p>{content.body}</p></div><Toggle id="variable-clarity-toggle" labelText="Code version" labelA="Without names" labelB="With variables" toggled={withVariables} onToggle={setWithVariables} /></div>
      <CodeSnippet type="multi" feedback="Copied">{withVariables ? content.withVariables : content.withoutVariables}</CodeSnippet>
      <Tile className="why-variables-answer" aria-live="polite"><strong>{content.question}</strong><p>{withVariables ? content.answer : "Switch to the variable version to restore the meaning of each value."}</p></Tile>
    </section>
  );
}

export function CreatingVariablesCard({ content }: { content: VariableLessonDevelopmentPack["creating"] }) {
  return (
    <>
      <section id="creating-variables" className="lesson-card creating-variables-card" aria-labelledby="creating-variables-title"><p className="lesson-section-label"><Edit size={16} /> Creating variables</p><h2 id="creating-variables-title">{content.title}</h2><p>{content.body}</p><div className="variable-syntax"><span>Syntax</span><code>{content.syntax}</code></div><CodeSnippet type="multi" feedback="Copied">{content.examples}</CodeSnippet></section>
      <WorkflowAnimation id="assignment-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} />
    </>
  );
}

export function AssignmentOperatorCard({ content }: { content: VariableLessonDevelopmentPack["assignment"] }) {
  return (
    <section id="assignment-operator" className="lesson-card assignment-operator-card" aria-labelledby="assignment-operator-title"><p className="lesson-section-label"><Save size={16} /> Assignment operator</p><h2 id="assignment-operator-title">{content.title}</h2><p>{content.body}</p><div className="assignment-operator-visual"><strong>{content.symbol}</strong><CodeSnippet type="single" feedback="Copied">{content.example}</CodeSnippet><ArrowRight size={24} /><p>{content.reading}</p></div><Tile className="assignment-misconception"><Information size={20} /><p>{content.misconception}</p></Tile></section>
  );
}

export function NamingRuleValidator({ content }: { content: VariableLessonDevelopmentPack["namingRules"] }) {
  const [name, setName] = useState("crop_name");
  const result = validateVariableName(name);
  return (
    <section id="naming-rules" className="lesson-card naming-validator-card" aria-labelledby="naming-rules-title"><p className="lesson-section-label"><Rule size={16} /> Naming rule validator</p><h2 id="naming-rules-title">{content.title}</h2><p>{content.body}</p><div className="naming-validator-input"><TextInput id="variable-name-validator" labelText="Variable name" value={name} onChange={(event) => setName(event.currentTarget.value)} invalid={Boolean(name) && !result.valid} invalidText={result.reason} helperText={!name || !result.valid ? undefined : result.reason} /><Tile className={result.valid ? "is-valid" : "is-invalid"} aria-live="polite">{result.valid ? <CheckmarkOutline size={24} /> : <Information size={24} />}<strong>{result.valid ? "Valid" : "Invalid"}</strong><p>{result.reason}</p></Tile></div><div className="naming-rule-examples">{content.rules.map((rule) => <Button key={rule.example} size="sm" kind="ghost" onClick={() => setName(rule.example)}><code>{rule.example}</code><small>{rule.explanation}</small><Tag size="sm" type={rule.valid ? "green" : "red"}>{rule.valid ? "Valid" : "Invalid"}</Tag></Button>)}</div></section>
  );
}

export function NamingConventionsCard({ content }: { content: VariableLessonDevelopmentPack["namingConventions"] }) {
  return <section id="naming-conventions" className="lesson-card naming-conventions-card" aria-labelledby="naming-conventions-title"><p className="lesson-section-label"><Edit size={16} /> Naming conventions</p><h2 id="naming-conventions-title">{content.title}</h2><p>{content.body}</p><div className="naming-convention-grid">{content.tiers.map((tier) => <Tile key={tier.label}><Tag type={tier.label === "Best" ? "green" : tier.label === "Better" ? "blue" : "gray"}>{tier.label}</Tag><div>{tier.examples.map((example) => <code key={example}>{example}</code>)}</div><p>{tier.explanation}</p></Tile>)}</div></section>;
}

export function UpdatingVariableCard({ content }: { content: VariableLessonDevelopmentPack["updating"] }) {
  const [step, setStep] = useState(0);
  return (
    <section id="updating-variables" className="lesson-card updating-variable-card" aria-labelledby="updating-variables-title"><p className="lesson-section-label"><Edit size={16} /> Updating variables</p><h2 id="updating-variables-title">{content.title}</h2><p>{content.explanation}</p><div className="updating-variable-grid"><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><div className="water-memory"><span>water_level</span><strong key={step}>{content.workflow[step].title}</strong><p>{content.workflow[step].description}</p><div>{content.workflow.map((item, index) => <Button key={item.title} size="sm" kind={step === index ? "primary" : "ghost"} onClick={() => setStep(index)}>{item.title}</Button>)}</div></div></div></section>
  );
}

export function VariableSwapCard({ content }: { content: VariableLessonDevelopmentPack["swapping"] }) {
  const [swapped, setSwapped] = useState(false);
  const variables = (swapped ? content.after : content.before).map(({ name, value }) => ({ name, value, type: "str" as const }));
  return (
    <section id="variable-swapping" className="lesson-card variable-swap-card" aria-labelledby="variable-swapping-title"><div className="lesson-card-heading"><div><p className="lesson-section-label"><Edit size={16} /> Variable swapping</p><h2 id="variable-swapping-title">{content.title}</h2><p>{content.body}</p></div><Toggle id="swap-variable-values" labelText="Swap state" labelA="Before" labelB="After" toggled={swapped} onToggle={setSwapped} /></div><div className="swap-code-grid"><div><span>Traditional</span><CodeSnippet type="multi" feedback="Copied">{content.traditional}</CodeSnippet></div><div><span>Python way</span><CodeSnippet type="multi" feedback="Copied">{content.python}</CodeSnippet></div></div><MemoryVisualizer variables={variables} title={swapped ? "Values after swap" : "Values before swap"} /></section>
  );
}
