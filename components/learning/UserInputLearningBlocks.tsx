import {
  Button,
  CodeSnippet,
  InlineLoading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TextInput,
  Tile,
  Toggle,
} from "@carbon/react";
import {
  AgricultureAnalytics,
  ArrowRight,
  CheckmarkOutline,
  Code,
  DataBase,
  Keyboard,
  Play,
  Reset,
  User,
} from "@carbon/icons-react";
import { useMemo, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { TypeBadge } from "@/components/learning/VariableLearningBlocks";
import { usePythonRunner } from "@/components/learning/usePythonRunner";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { AssignmentContent, PlaygroundContent, UserInputField, UserInputLessonDevelopmentPack } from "@/types/content";

type InputValues = Record<string, string>;
type ConsoleStatus = "idle" | "loading" | "running" | "success" | "error";

export function UserInputStoryCard({ content }: { content: UserInputLessonDevelopmentPack["story"] }) {
  return (
    <>
      <section id="user-input-story" className="lesson-card user-input-story" aria-labelledby="user-input-story-title">
        <p className="lesson-section-label"><AgricultureAnalytics size={16} /> Real-life story</p><h2 id="user-input-story-title">{content.title}</h2><p>{content.body}</p>
        <div className="input-story-prompts">{content.prompts.map((prompt) => <Tile key={prompt}><Keyboard size={20} /><span>{prompt}</span></Tile>)}</div>
        <Tile className="input-story-answer"><strong>{content.question}</strong><p>{content.answer}</p></Tile>
      </section>
      <WorkflowAnimation id="user-input-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} />
    </>
  );
}

export function InputProgramComparison({ content }: { content: UserInputLessonDevelopmentPack["whyInput"] }) {
  const [interactive, setInteractive] = useState(false);
  return (
    <section id="why-user-input" className="lesson-card input-program-comparison" aria-labelledby="why-user-input-title">
      <div className="lesson-card-heading"><div><p className="lesson-section-label"><User size={16} /> Why user input?</p><h2 id="why-user-input-title">{content.title}</h2><p>{content.body}</p></div><Toggle id="interactive-program-toggle" labelText="Program mode" labelA="Static" labelB="Interactive" toggled={interactive} onToggle={setInteractive} /></div>
      <CodeSnippet type="multi" feedback="Copied">{interactive ? content.interactiveCode : content.staticCode}</CodeSnippet>
      <ol className="input-program-stages">{content.stages.map((stage, index) => <li key={stage.title} className={interactive && index > 0 ? "is-active" : !interactive && index === 0 ? "is-active" : ""}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{stage.title}</strong><p>{stage.description}</p></div></li>)}</ol>
    </section>
  );
}

export function InputFunctionCard({ content }: { content: UserInputLessonDevelopmentPack["inputFunction"] }) {
  return (
    <>
      <section id="input-function" className="lesson-card input-function-card" aria-labelledby="input-function-title"><p className="lesson-section-label"><Keyboard size={16} /> input() function</p><h2 id="input-function-title">{content.title}</h2><p>{content.body}</p><div className="input-syntax"><span>Syntax</span><code>{content.syntax}</code></div><div className="code-example-grid"><div><span>Python</span><CodeSnippet type="multi" feedback="Copied">{content.example.code}</CodeSnippet></div><div className="code-example-output"><span>Console</span><pre><code>{content.example.output}</code></pre><p>{content.example.explanation}</p></div></div></section>
      <WorkflowAnimation id="input-function-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} />
    </>
  );
}

export function NumericInputCard({ content }: { content: UserInputLessonDevelopmentPack["numericInput"] }) {
  const [revealed, setRevealed] = useState(false);
  return <section id="numeric-input" className="lesson-card numeric-input-card" aria-labelledby="numeric-input-title"><p className="lesson-section-label"><DataBase size={16} /> Numeric-looking input</p><h2 id="numeric-input-title">{content.title}</h2><p>{content.explanation}</p><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><Tile><strong>{content.question}</strong><Button size="sm" kind="tertiary" onClick={() => setRevealed(true)} disabled={revealed}>Reveal type</Button><div aria-live="polite">{revealed ? <TypeBadge type="str" /> : <span>Predict before revealing</span>}</div></Tile></section>;
}

export function InputConversionCard({ content }: { content: UserInputLessonDevelopmentPack["conversion"] }) {
  return (
    <>
      <section id="input-conversion" className="lesson-card input-conversion-card" aria-labelledby="input-conversion-title"><p className="lesson-section-label"><ArrowRight size={16} /> Type conversion</p><h2 id="input-conversion-title">{content.title}</h2><p>{content.body}</p><div className="input-conversion-grid">{[content.integer, content.decimal].map((example) => <Tile key={example.title}><Tag type={example === content.integer ? "blue" : "cyan"}>{example.title}</Tag><CodeSnippet type="multi" feedback="Copied">{example.code}</CodeSnippet><pre><code>{example.output}</code></pre><p>{example.explanation}</p></Tile>)}</div></section>
      <WorkflowAnimation id="input-conversion-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} />
    </>
  );
}

export function UserDataCard({ fields, values }: { fields: UserInputField[]; values: InputValues }) {
  return <section className="user-data-card" aria-label="Current simulated user data"><div className="user-data-heading"><User size={20} /><h3>User data</h3></div><div>{fields.map((field) => <Tile key={field.id}><span>{field.label}</span><strong>{values[field.id] || "—"}</strong><TypeBadge type={field.type} /></Tile>)}</div></section>;
}

export function ConsoleEmulator({ status, output }: { status: ConsoleStatus; output: string }) {
  const busy = status === "loading" || status === "running";
  return <section className="console-emulator" aria-labelledby="console-emulator-title" aria-live="polite" aria-busy={busy}><div><Keyboard size={20} /><h3 id="console-emulator-title">Console emulator</h3><Tag size="sm" type={status === "error" ? "red" : status === "success" ? "green" : "gray"}>{status}</Tag></div><pre><code>{output}</code></pre></section>;
}

export function FormToCodeVisualizer({ fields }: { fields: UserInputField[] }) {
  return <section className="form-to-code" aria-labelledby="form-to-code-title"><p className="lesson-section-label"><Code size={16} /> Form-to-code visualizer</p><h3 id="form-to-code-title">Each field maps to one Python input</h3><ol>{fields.map((field) => <li key={field.id}><span>{field.label}</span><ArrowRight size={18} /><code>{field.id} = {field.type === "str" ? "" : `${field.type}(`}input(&quot;{field.prompt}&quot;){field.type === "str" ? "" : ")"}</code></li>)}</ol></section>;
}

function isFieldValid(field: UserInputField, value: string) {
  if (!value.trim()) return false;
  if (field.type === "int") return /^[-+]?\d+$/.test(value.trim());
  if (field.type === "float") return Number.isFinite(Number(value));
  return true;
}

export function InputSimulator({ content, values, onChange, onReset }: { content: UserInputLessonDevelopmentPack["simulator"]; values: InputValues; onChange: (id: string, value: string) => void; onReset: () => void }) {
  const { status, output, run, clear } = usePythonRunner();
  const invalidFields = content.fields.filter((field) => !isFieldValid(field, values[field.id] ?? ""));
  const busy = status === "loading" || status === "running";

  function reset() {
    onReset();
    clear();
  }

  return <div className="input-simulator"><div className="input-simulator-form">{content.fields.map((field) => <TextInput key={field.id} id={`input-simulator-${field.id}`} labelText={field.label} value={values[field.id] ?? ""} inputMode={field.type === "str" ? "text" : field.type === "int" ? "numeric" : "decimal"} invalid={!isFieldValid(field, values[field.id] ?? "")} invalidText={field.type === "str" ? "Enter a value." : `Enter a valid ${field.type === "int" ? "whole number" : "number"}.`} onChange={(event) => onChange(field.id, event.currentTarget.value)} disabled={busy} />)}<div className="playground-actions"><Button renderIcon={Play} onClick={() => run(content.code, content.fields.map((field) => values[field.id] ?? ""))} disabled={busy || invalidFields.length > 0}>{busy ? "Running…" : "Run form"}</Button><Button kind="secondary" renderIcon={Reset} onClick={reset} disabled={busy}>Reset</Button>{busy && <InlineLoading description={status === "loading" ? "Loading Python" : "Executing code"} />}</div></div><ConsoleEmulator status={status} output={output} /><UserDataCard fields={content.fields} values={values} /><FormToCodeVisualizer fields={content.fields} /></div>;
}

export function UserInputPlayground({ content, simulator, activities }: { content: PlaygroundContent; simulator: UserInputLessonDevelopmentPack["simulator"]; activities: string[] }) {
  const defaults = useMemo(() => Object.fromEntries(simulator.fields.map((field) => [field.id, field.defaultValue])), [simulator.fields]);
  const [values, setValues] = useState<InputValues>(defaults);
  const consoleInputs = simulator.fields.map((field) => values[field.id] ?? "");

  return (
    <section id="playground" className="lesson-card user-input-lab" aria-labelledby="playground-title">
      <p className="lesson-section-label"><Keyboard size={16} /> Interactive playground</p><h2 id="playground-title">{simulator.title}</h2><p>{simulator.description}</p>
      <Tabs>
        <TabList aria-label="Input learning mode"><Tab>Interactive form mode</Tab><Tab>Console mode</Tab></TabList>
        <TabPanels>
          <TabPanel><InputSimulator content={simulator} values={values} onChange={(id, value) => setValues((current) => ({ ...current, [id]: value }))} onReset={() => setValues(defaults)} /></TabPanel>
          <TabPanel><CodePlayground id="console-input-playground" content={content} className="user-input-code-playground" inputValues={consoleInputs} outputLabel="Console emulator" renderSupplement={() => <UserDataCard fields={simulator.fields} values={values} />} /></TabPanel>
        </TabPanels>
      </Tabs>
      <Tile className="input-playground-activities"><p className="lesson-section-label">Try these changes</p><ol>{activities.map((activity) => <li key={activity}>{activity}</li>)}</ol></Tile>
    </section>
  );
}

export function MiniProjectCard({ project }: { project: AssignmentContent & { outputTemplate: string } }) {
  return <section id="mini-project" className="lesson-card mini-project-card" aria-labelledby="mini-project-title"><p className="lesson-section-label"><CheckmarkOutline size={16} /> Mini project</p><h2 id="mini-project-title">{project.title}</h2><p>{project.brief}</p><div className="mini-project-grid"><div><h3>Requirements</h3><ul>{project.deliverables.map((item) => <li key={item}><CheckmarkOutline size={16} /><span>{item}</span></li>)}</ul></div><div><span>Output template</span><pre><code>{project.outputTemplate}</code></pre></div></div></section>;
}
