import { Accordion, AccordionItem, Button, Checkbox, CodeSnippet, ProgressBar, Tag, TextInput, Tile } from "@carbon/react";
import { AgricultureAnalytics, ArrowRight, CheckmarkOutline, Code, DataBase, Debug, Flow, Task, Trophy } from "@carbon/icons-react";
import { useId, useMemo, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CodeTracePanel } from "@/components/learning/CodeTracePanel";
import { TypeBadge } from "@/components/learning/VariableLearningBlocks";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";
import type { CapstoneProjectLessonDevelopmentPack, PlaygroundContent, ProjectTestDataset, UserInputField } from "@/types/content";

export function ProjectStoryCard({ content }: { content: CapstoneProjectLessonDevelopmentPack["story"] }) {
  return <><section id="project-story" className="lesson-card project-story-card" aria-labelledby="project-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Startup assignment</p><h2 id="project-story-title">{content.title}</h2><p>{content.body}</p><blockquote>{content.request}</blockquote><Tile><strong>Developer mindset</strong><p>{content.insight}</p></Tile></section><WorkflowAnimation id="project-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function ProjectOverviewCard({ content }: { content: CapstoneProjectLessonDevelopmentPack["overview"] }) {
  return <section id="project-overview" className="lesson-card project-overview-card" aria-labelledby="project-overview-title"><p className="lesson-section-label"><Task size={16} /> Project overview</p><h2 id="project-overview-title">{content.title}</h2><p>{content.purpose}</p><div className="project-feature-grid">{content.features.map((feature, index) => <Tile key={feature.title}><span>{String(index + 1).padStart(2, "0")}</span><CheckmarkOutline size={20} /><h3>{feature.title}</h3><p>{feature.description}</p></Tile>)}</div></section>;
}

export function RequirementAnalysisPanel({ content }: { content: CapstoneProjectLessonDevelopmentPack["requirements"] }) {
  const [view, setView] = useState<"inputs" | "processing" | "outputs">("inputs");
  return <section id="requirements-analysis" className="lesson-card requirement-analysis-panel" aria-labelledby="requirements-title"><p className="lesson-section-label"><DataBase size={16} /> Requirements analysis</p><h2 id="requirements-title">{content.title}</h2><p>{content.body}</p><div className="requirement-tabs" role="tablist" aria-label="Requirement category">{(["inputs", "processing", "outputs"] as const).map((item) => <Button key={item} role="tab" aria-selected={view === item} kind={view === item ? "primary" : "ghost"} onClick={() => setView(item)}>{item}</Button>)}</div><div className="requirement-view" aria-live="polite">{view === "inputs" && <div className="requirement-inputs">{content.inputs.map((input) => <Tile key={input.variable}><div><strong>{input.label}</strong>{input.unit && <span>{input.unit}</span>}</div><code>{input.variable}</code><TypeBadge type={input.type} /></Tile>)}</div>}{view === "processing" && <div className="requirement-processing">{content.processing.map((process) => <Tile key={process.variable}><span>{process.label}</span><strong>{process.formula}</strong><ArrowRight size={20} /><code>{process.variable}</code></Tile>)}</div>}{view === "outputs" && <ol className="requirement-outputs">{content.outputs.map((output, index) => <li key={output}><span>{index + 1}</span><strong>{output}</strong></li>)}</ol>}</div></section>;
}

export function AlgorithmViewer({ content }: { content: CapstoneProjectLessonDevelopmentPack["algorithm"] }) {
  const [active, setActive] = useState(0);
  const step = content.steps[active];
  return <section id="algorithm-viewer" className="lesson-card algorithm-viewer" aria-labelledby="algorithm-viewer-title"><p className="lesson-section-label"><Flow size={16} /> Algorithm viewer</p><h2 id="algorithm-viewer-title">{content.title}</h2><p>{content.body}</p><ol>{content.steps.map((item, index) => <li key={item.title} className={index === active ? "is-active" : index < active ? "is-complete" : ""}><Button kind="ghost" size="sm" onClick={() => setActive(index)} aria-current={index === active ? "step" : undefined}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.title}</strong><Tag size="sm" type={item.phase === "process" ? "purple" : item.phase === "output" ? "green" : item.phase === "input" ? "blue" : "gray"}>{item.phase}</Tag></Button>{index < content.steps.length - 1 && <ArrowRight size={18} />}</li>)}</ol><Tile aria-live="polite"><Tag type={step.phase === "process" ? "purple" : step.phase === "output" ? "green" : step.phase === "input" ? "blue" : "gray"}>{step.phase}</Tag><h3>{step.title}</h3><p>{step.description}</p></Tile></section>;
}

export function FlowchartViewer({ id = "flowchart-viewer", activePhase = "start" }: { id?: string; activePhase?: "start" | "input" | "process" | "output" | "end" }) {
  const phases = ["start", "input", "process", "output", "end"] as const;
  return <section id={id} className="lesson-card project-flowchart" aria-labelledby={`${id}-title`}><p className="lesson-section-label"><Flow size={16} /> Interactive flowchart</p><h2 id={`${id}-title`}>START → INPUT → PROCESS → OUTPUT → END</h2><ol>{phases.map((phase, index) => <li key={phase} className={phase === activePhase ? "is-active" : ""} aria-current={phase === activePhase ? "step" : undefined}><span>{phase}</span>{index < phases.length - 1 && <ArrowRight size={22} />}</li>)}</ol><p aria-live="polite">Current phase: <strong>{activePhase.toUpperCase()}</strong></p></section>;
}

export function ProjectProgressChecklist({ steps }: { steps: CapstoneProjectLessonDevelopmentPack["buildSteps"] }) {
  const prefix = useId();
  const [completed, setCompleted] = useState<string[]>([]);
  const percentage = Math.round(completed.length / steps.length * 100);
  return <section id="project-progress" className="lesson-card project-progress-checklist" aria-labelledby={`${prefix}-title`}><div className="project-progress-heading"><div><p className="lesson-section-label"><CheckmarkOutline size={16} /> Project progress checklist</p><h2 id={`${prefix}-title`}>Build the application in five deliberate stages</h2></div><Tag type={percentage === 100 ? "green" : "blue"}>{completed.length} of {steps.length}</Tag></div><ProgressBar label="Local project checklist progress" value={percentage} helperText="This checklist is for the current session and is not persisted." /><Accordion align="start">{steps.map((step, index) => { const checked = completed.includes(step.title); return <AccordionItem key={step.title} title={step.title} open={index === 0}><div className="project-step-heading"><Checkbox id={`${prefix}-${index}`} labelText="I understand and completed this stage" checked={checked} onChange={(_, state) => setCompleted((current) => state.checked ? [...current, step.title] : current.filter((item) => item !== step.title))} /><div>{step.concepts.map((concept) => <Tag key={concept} size="sm" type="teal">{concept}</Tag>)}</div></div><p>{step.purpose}</p><CodeSnippet type="multi" feedback="Copied">{step.code}</CodeSnippet></AccordionItem>; })}</Accordion></section>;
}

export function CompleteProgramCard({ code }: { code: string }) {
  return <section id="complete-program" className="lesson-card complete-program-card" aria-labelledby="complete-program-title"><p className="lesson-section-label"><Code size={16} /> Complete program</p><h2 id="complete-program-title">Smart Farm Information System</h2><p>Every section below uses only concepts introduced in Module 1.</p><CodeSnippet type="multi" feedback="Copied complete program">{code}</CodeSnippet></section>;
}

export function CodeWalkthroughPanel({ code, walkthrough }: { code: string; walkthrough: CapstoneProjectLessonDevelopmentPack["walkthrough"] }) {
  const lines = code.split("\n").map((text, index) => ({ text, number: index + 1 })).filter((line) => line.text.trim());
  const [activeLine, setActiveLine] = useState(lines[0]?.number ?? 1);
  const detail = walkthrough.find((item) => activeLine >= item.startLine && activeLine <= item.endLine) ?? walkthrough[0];
  return <section id="code-walkthrough" className="lesson-card code-walkthrough-panel" aria-labelledby="code-walkthrough-title"><p className="lesson-section-label"><Code size={16} /> Interactive code walkthrough</p><h2 id="code-walkthrough-title">Click any line to understand its role</h2><div className="walkthrough-grid"><div className="walkthrough-code" role="listbox" aria-label="Complete Python program lines">{lines.map((line) => <button key={line.number} type="button" role="option" aria-selected={activeLine === line.number} className={activeLine === line.number ? "is-active" : ""} onClick={() => setActiveLine(line.number)}><span>{line.number}</span><code>{line.text}</code></button>)}</div><aside className="walkthrough-detail" aria-live="polite"><Tag type="blue">Line {activeLine}</Tag><h3>{detail.title}</h3><p>{detail.purpose}</p><dl><dt>Variables used</dt><dd>{detail.variables.length ? detail.variables.map((variable) => <code key={variable}>{variable}</code>) : "None"}</dd><dt>Data types involved</dt><dd>{detail.dataTypes.map((type) => <Tag key={type} size="sm" type="purple">{type}</Tag>)}</dd><dt>Expected result</dt><dd>{detail.expectedOutput}</dd></dl></aside></div></section>;
}

export function TestingPanel({ datasets, selectedId, onSelect, execution }: { datasets: ProjectTestDataset[]; selectedId: string; onSelect: (dataset: ProjectTestDataset) => void; execution: PlaygroundExecution }) {
  const selected = datasets.find((dataset) => dataset.id === selectedId) ?? datasets[0];
  const passed = execution.status === "success" && selected.expectedOutputFragments.every((fragment) => execution.output.includes(fragment));
  const status = execution.status === "success" ? passed ? "Passed" : "Review output" : "Ready to run";
  return <section id="testing-panel" className="testing-panel" aria-labelledby="testing-panel-title"><div className="testing-panel-heading"><div><CheckmarkOutline size={20} /><h3 id="testing-panel-title">Testing Panel</h3></div><Tag type={passed ? "green" : execution.status === "success" ? "red" : "gray"}>{status}</Tag></div><div className="test-dataset-tabs">{datasets.map((dataset) => <Button key={dataset.id} size="sm" kind={selected.id === dataset.id ? "primary" : "ghost"} onClick={() => onSelect(dataset)}>{dataset.title}</Button>)}</div><Tile><h4>{selected.title}</h4><p>{selected.description}</p><div className="expected-values">{selected.expectedValues.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div></Tile><p className="testing-guidance" aria-live="polite">{execution.status === "success" ? passed ? "The current output contains every expected calculated value." : "The program ran, but one or more expected values were not found. Compare the formula, inputs, and labels." : "Load this dataset, run the program, and compare the console with the expected values."}</p></section>;
}

export function ProjectPlayground({ content, fields, datasets }: { content: PlaygroundContent; fields: UserInputField[]; datasets: ProjectTestDataset[] }) {
  const defaults = useMemo(() => Object.fromEntries(fields.map((field) => [field.id, field.defaultValue])), [fields]);
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [selectedId, setSelectedId] = useState(datasets[0].id);
  function selectDataset(dataset: ProjectTestDataset) { setSelectedId(dataset.id); setValues(dataset.inputValues); }
  return <CodePlayground id="playground" content={content} className="capstone-project-playground" inputValues={fields.map((field) => values[field.id] ?? "")} traceExecution renderSupplement={(_, execution) => <><div className="project-playground-inputs"><div><h3>Simulated farmer inputs</h3><p>Edit values here, then run the complete program.</p></div><div>{fields.map((field) => <TextInput key={field.id} id={`capstone-${field.id}`} labelText={field.label} value={values[field.id] ?? ""} inputMode={field.type === "str" ? "text" : "decimal"} onChange={(event) => setValues((current) => ({ ...current, [field.id]: event.currentTarget.value }))} />)}</div></div><FlowchartViewer id="runtime-flowchart" activePhase={execution.status === "idle" ? "start" : execution.status === "loading" ? "input" : execution.status === "running" ? "process" : execution.status === "success" ? "output" : "end"} /><div className="project-runtime-panels"><TestingPanel datasets={datasets} selectedId={selectedId} onSelect={selectDataset} execution={execution} /><CodeTracePanel key={`${execution.status}-${execution.trace.length}-${execution.output}`} execution={execution} /></div></>} />;
}

export function ProjectChallengeTasks({ challenges }: { challenges: CapstoneProjectLessonDevelopmentPack["challenges"] }) {
  const [selected, setSelected] = useState(0);
  const challenge = challenges[selected];
  return <section id="challenge-tasks" className="lesson-card project-challenge-tasks" aria-labelledby="challenge-tasks-title"><p className="lesson-section-label"><Debug size={16} /> Challenge tasks</p><h2 id="challenge-tasks-title">Improve the prototype without new Python concepts</h2><div className="project-challenge-tabs">{challenges.map((item, index) => <Button key={item.title} size="sm" kind={selected === index ? "primary" : "ghost"} onClick={() => setSelected(index)}>Challenge {index + 1}</Button>)}</div><Tile aria-live="polite"><Tag type="magenta">{challenge.concept}</Tag><h3>{challenge.title}</h3><p>{challenge.brief}</p><strong>Guidance</strong><p>{challenge.guidance}</p></Tile></section>;
}

export function ModuleCompletionCard({ content }: { content: CapstoneProjectLessonDevelopmentPack["completion"] }) {
  return <section id="module-completion" className="lesson-card module-completion-card" aria-labelledby="module-completion-title"><div className="module-completion-heading"><Trophy size={40} /><div><p className="lesson-section-label">Module milestone</p><h2 id="module-completion-title">{content.title}</h2><p>{content.body}</p></div></div><div className="module-completion-skills">{content.skills.map((skill) => <Tile key={skill}><CheckmarkOutline size={18} /><span>{skill}</span></Tile>)}</div><Tile className="module-readiness-check"><strong>Ready for Module 2?</strong><p>{content.checkpoint}</p></Tile></section>;
}
