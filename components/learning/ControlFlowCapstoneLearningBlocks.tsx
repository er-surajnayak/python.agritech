import { Accordion, AccordionItem, Button, Checkbox, CodeSnippet, DataTable, ProgressBar, Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow, Tag, TextInput, Tile } from "@carbon/react";
import { AgricultureAnalytics, CheckmarkOutline, Code, Flow, Play, Renew, Task, Trophy } from "@carbon/icons-react";
import { useMemo, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CodeTracePanel } from "@/components/learning/CodeTracePanel";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";
import type { CapstoneConsoleModule, ControlFlowCapstoneDevelopmentPack, PlaygroundContent } from "@/types/content";

export function CapstoneStoryCard({ content }: { content: ControlFlowCapstoneDevelopmentPack["story"] }) {
  return <><section id="capstone-story" className="lesson-card control-capstone-story" aria-labelledby="capstone-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Project introduction</p><h2 id="capstone-story-title">{content.title}</h2><p>{content.body}</p><Tile><Tag type="green">New assignment</Tag><h3>{content.company}</h3><div>{content.responsibilities.map((item) => <span key={item}><CheckmarkOutline size={16} />{item}</span>)}</div></Tile></section><WorkflowAnimation id="capstone-journey" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function CapstoneOverviewCard({ content }: { content: ControlFlowCapstoneDevelopmentPack["overview"] }) {
  return <section id="project-overview" className="lesson-card control-capstone-overview" aria-labelledby="capstone-overview-title"><p className="lesson-section-label"><Task size={16} /> Project overview</p><h2 id="capstone-overview-title">{content.title}</h2><p>{content.body}</p><div className="capstone-overview-grid"><pre aria-label="Smart Farm application menu"><code>{["==============================", "SMART FARM AUTOMATION", "==============================", "", ...content.menu, "", "Choose Option:"].join("\n")}</code></pre><div>{content.features.map((feature) => <Tile key={feature.title}><strong>{feature.title}</strong><p>{feature.description}</p></Tile>)}</div></div></section>;
}

export function ConceptMappingCard({ content }: { content: ControlFlowCapstoneDevelopmentPack["conceptMapping"] }) {
  const headers = [{ key: "feature", header: "Application feature" }, { key: "concept", header: "Python concept" }, { key: "role", header: "Role" }];
  return <section id="concept-mapping" className="lesson-card concept-mapping-card" aria-labelledby="concept-map-title"><p className="lesson-section-label"><Flow size={16} /> Concept Mapping</p><h2 id="concept-map-title">{content.title}</h2><p>{content.body}</p><DataTable rows={content.rows.map((row, index) => ({ id: String(index), ...row }))} headers={headers}>{({ rows, headers: tableHeaders, getHeaderProps, getRowProps, getTableProps }) => <TableContainer><Table {...getTableProps()}><TableHead><TableRow>{tableHeaders.map((header) => <TableHeader {...getHeaderProps({ header })} key={header.key}>{header.header}</TableHeader>)}</TableRow></TableHead><TableBody>{rows.map((row) => <TableRow {...getRowProps({ row })} key={row.id}>{row.cells.map((cell) => <TableCell key={cell.id}>{cell.value}</TableCell>)}</TableRow>)}</TableBody></Table></TableContainer>}</DataTable></section>;
}

export function ApplicationFlowVisualizer({ id = "application-flow", steps, activePhase = "start", title = "Start → menu → module → result → return or exit", body }: { id?: string; steps: ControlFlowCapstoneDevelopmentPack["architecture"]["steps"]; activePhase?: "start" | "input" | "process" | "output" | "end"; title?: string; body?: string }) {
  const activeIndex = Math.max(0, steps.findIndex((step) => step.phase === activePhase));
  return <section id={id} className="lesson-card application-flow" aria-labelledby={`${id}-title`}><p className="lesson-section-label"><Flow size={16} /> Application Flow Visualizer</p><h2 id={`${id}-title`}>{title}</h2>{body && <p>{body}</p>}<ol>{steps.map((step, index) => <li key={step.title} className={index === activeIndex ? "is-active" : index < activeIndex ? "is-complete" : ""}><span>{index + 1}</span><div><strong>{step.title}</strong><p>{step.description}</p></div><Tag type={step.phase === "process" ? "purple" : step.phase === "output" ? "green" : step.phase === "input" ? "blue" : "gray"}>{step.phase}</Tag></li>)}</ol></section>;
}

export function CapstoneProgramCard({ code }: { code: string }) {
  return <section id="complete-program" className="lesson-card complete-program-card" aria-labelledby="control-capstone-program-title"><p className="lesson-section-label"><Code size={16} /> Complete application</p><h2 id="control-capstone-program-title">Smart Farm Automation Console</h2><p>This single-file learning application intentionally uses only concepts introduced through Module 2.</p><CodeSnippet type="multi" feedback="Copied complete application">{code}</CodeSnippet></section>;
}

export function ModuleNavigator({ modules, selectedId, onSelect }: { modules: CapstoneConsoleModule[]; selectedId: string; onSelect: (id: string) => void }) {
  return <nav className="capstone-module-navigator" aria-label="Application modules">{modules.map((module) => <Button key={module.id} size="sm" kind={module.id === selectedId ? "primary" : "ghost"} onClick={() => onSelect(module.id)}><span className="module-nav-number">{module.option}</span><span className="module-nav-label">{module.title}</span></Button>)}</nav>;
}

export function ApplicationModules({ modules, futureFeature }: { modules: CapstoneConsoleModule[]; futureFeature: ControlFlowCapstoneDevelopmentPack["futureFeature"] }) {
  const [selected, setSelected] = useState(modules[0].id);
  const module = modules.find((item) => item.id === selected) ?? modules[0];
  return <section id="application-modules" className="lesson-card application-modules" aria-labelledby="application-modules-title"><p className="lesson-section-label"><Code size={16} /> Application modules</p><h2 id="application-modules-title">Build five focused operations inside one console</h2><ModuleNavigator modules={modules} selectedId={selected} onSelect={setSelected} /><Tile className="module-detail" aria-live="polite"><div><Tag type="blue">Option {module.option}</Tag><Tag type="purple">{module.concept}</Tag></div><h3>{module.title}</h3><p>{module.description}</p><strong>Inputs</strong><div>{module.fields.map((field) => <code key={field.id}>{field.label}</code>)}</div><strong>Expected result</strong><code>{module.expectedOutput}</code></Tile><Tile className="future-feature"><Tag type="teal">Future feature</Tag><h3>{futureFeature.title}</h3><p>{futureFeature.explanation}</p><CodeSnippet type="multi" feedback="Copied">{futureFeature.code}</CodeSnippet></Tile></section>;
}

export function ProjectProgressTracker({ title, items }: { title: string; items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const percent = Math.round((checked.size / items.length) * 100);
  const toggle = (index: number, value: boolean) => setChecked((current) => { const next = new Set(current); if (value) next.add(index); else next.delete(index); return next; });
  return <section id="project-progress" className="lesson-card control-capstone-progress" aria-labelledby="project-progress-title"><div className="progress-heading"><div><p className="lesson-section-label"><Task size={16} /> Project Progress Tracker</p><h2 id="project-progress-title">{title}</h2></div><Tag type={percent === 100 ? "green" : "blue"}>{percent}%</Tag></div><ProgressBar label={`${checked.size} of ${items.length} complete`} value={percent} /><div>{items.map((item, index) => <Checkbox key={item} id={`capstone-progress-${index}`} labelText={item} checked={checked.has(index)} onChange={(_, data) => toggle(index, Boolean(data.checked))} />)}</div></section>;
}

export function ExecutionDashboard({ execution, activeModule }: { execution: PlaygroundExecution; activeModule: CapstoneConsoleModule }) {
  const lastStep = execution.trace.at(-1);
  const structure = [...execution.trace].reverse().find((step) => /^(?:while|match|case|if|elif|else|for|break|continue|pass)\b/.test(step.code.trim()))?.code.trim() ?? "Waiting to run";
  return <section className="execution-dashboard" aria-labelledby="execution-dashboard-title"><div className="dashboard-title"><div><Flow size={20} /><h3 id="execution-dashboard-title">Execution Dashboard</h3></div><Tag type={execution.status === "success" ? "green" : execution.status === "error" ? "red" : "gray"}>{execution.status}</Tag></div><div className="execution-dashboard-grid"><Tile><span>Current menu</span><strong>Option {activeModule.option}</strong><p>{activeModule.title}</p></Tile><Tile><span>Control structure</span><code>{structure}</code></Tile><Tile><span>Current line</span><strong>{lastStep ? `Line ${lastStep.lineNumber}` : "—"}</strong><code>{lastStep?.code ?? "Run to trace"}</code></Tile><Tile><span>Active variables</span><div>{lastStep?.variables.length ? lastStep.variables.map((variable) => <Tag key={variable.name} type="blue">{variable.name} = {variable.value}</Tag>) : <p>No values yet.</p>}</div></Tile></div></section>;
}

function CapstoneTestingPanel({ tests, selectedTest, execution, onLoad }: { tests: ControlFlowCapstoneDevelopmentPack["tests"]; selectedTest: string | null; execution: PlaygroundExecution; onLoad: (id: string) => void }) {
  const test = tests.find((item) => item.id === selectedTest);
  const passed = Boolean(test && execution.status === "success" && test.expectedOutput.every((fragment) => execution.output.includes(fragment)));
  const completed = Boolean(test && execution.status === "success");
  const status = passed ? "Passed" : completed ? "Review output" : test ? "Ready" : "Select a test";
  return <section id="testing-panel" className="capstone-testing-panel" aria-labelledby="capstone-testing-title"><div><h3 id="capstone-testing-title">Testing Panel</h3><Tag type={passed ? "green" : completed ? "red" : "gray"}>{status}</Tag></div><div className="capstone-test-list">{tests.map((item) => <Button size="sm" kind={item.id === selectedTest ? "primary" : "ghost"} key={item.id} onClick={() => onLoad(item.id)}>{item.title}</Button>)}</div>{test && <Tile><strong>Expected output</strong>{test.expectedOutput.map((fragment) => <code key={fragment}>{fragment}</code>)}</Tile>}</section>;
}

export function InteractiveConsoleSimulator({ content, modules, tests }: { content: PlaygroundContent; modules: CapstoneConsoleModule[]; tests: ControlFlowCapstoneDevelopmentPack["tests"] }) {
  const [selectedId, setSelectedId] = useState(modules[0].id);
  const module = modules.find((item) => item.id === selectedId) ?? modules[0];
  const defaults = useMemo(() => Object.fromEntries(modules.flatMap((item) => item.fields.map((field) => [field.id, field.defaultValue]))), [modules]);
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const inputs = [module.option, ...module.fields.map((field) => values[field.id] ?? field.defaultValue), "6"];
  const selectModule = (id: string) => { setSelectedId(id); setSelectedTest(null); };
  const loadTest = (id: string) => { const test = tests.find((item) => item.id === id); if (!test) return; setSelectedTest(id); setSelectedId(test.moduleId); setValues((current) => ({ ...current, ...test.values })); };
  const resetInputs = () => { setValues(defaults); setSelectedTest(null); };
  return <CodePlayground id="playground" content={content} className="control-flow-capstone-playground" inputValues={inputs} traceExecution renderSupplement={(_code, execution) => <div className="control-capstone-runtime"><section className="interactive-console-controls" aria-labelledby="interactive-console-title"><div><p className="lesson-section-label"><Play size={16} /> Interactive Console Simulator</p><h3 id="interactive-console-title">Choose one module, supply its inputs, then run the complete application</h3></div><ModuleNavigator modules={modules} selectedId={selectedId} onSelect={selectModule} /><div className="console-field-grid">{module.fields.map((field) => <TextInput key={field.id} id={`console-${field.id}`} labelText={field.label} value={values[field.id] ?? ""} inputMode={field.type === "str" ? "text" : "decimal"} onChange={(event) => setValues((current) => ({ ...current, [field.id]: event.currentTarget.value }))} />)}</div><Button size="sm" kind="ghost" renderIcon={Renew} onClick={resetInputs}>Reset simulation inputs</Button></section><ApplicationFlowVisualizer id="runtime-application-flow" steps={[{ title: "Start", description: "Application initialized", phase: "start" }, { title: "Menu", description: `Option ${module.option} selected`, phase: "input" }, { title: module.title, description: module.concept, phase: "process" }, { title: "Result", description: module.expectedOutput, phase: "output" }, { title: "Exit", description: "Option 6 closes the console", phase: "end" }]} activePhase={execution.status === "idle" ? "start" : execution.status === "loading" ? "input" : execution.status === "running" ? "process" : execution.status === "success" && execution.output.includes("Exiting") ? "end" : execution.status === "success" ? "output" : "end"} /><ExecutionDashboard execution={execution} activeModule={module} /><CapstoneTestingPanel tests={tests} selectedTest={selectedTest} execution={execution} onLoad={loadTest} /><CodeTracePanel key={`${execution.status}-${execution.trace.length}-${execution.output}`} execution={execution} /></div>} />;
}

export function ExtensionChallenges({ extensions }: { extensions: ControlFlowCapstoneDevelopmentPack["extensions"] }) {
  return <section id="extension-challenges" className="lesson-card extension-challenges" aria-labelledby="extensions-title"><p className="lesson-section-label"><Trophy size={16} /> Extension challenges</p><h2 id="extensions-title">Grow the console without losing its architecture</h2><Accordion align="start">{extensions.map((item) => <AccordionItem key={item.level} title={`${item.level} · ${item.title}`}><p>{item.brief}</p><strong>Guidance</strong><p>{item.guidance}</p></AccordionItem>)}</Accordion></section>;
}

export function ReflectionCard({ content }: { content: ControlFlowCapstoneDevelopmentPack["reflection"] }) {
  return <section id="reflection" className="lesson-card capstone-reflection" aria-labelledby="reflection-title"><p className="lesson-section-label"><Flow size={16} /> Think Like an Engineer</p><h2 id="reflection-title">{content.title}</h2><p>{content.body}</p><ol>{content.prompts.map((prompt) => <li key={prompt}><span>?</span><p>{prompt}</p></li>)}</ol></section>;
}

export function CapstoneChecklist({ content }: { content: ControlFlowCapstoneDevelopmentPack["checklist"] }) {
  return <section id="capstone-checklist"><ProjectProgressTracker title={content.title} items={content.items} /><Tile className="capstone-completion"><Trophy size={32} /><div><strong>Module 2 complete</strong><p>{content.body}</p></div></Tile></section>;
}
