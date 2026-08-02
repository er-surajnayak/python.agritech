import { Accordion, AccordionItem, Button, CodeSnippet, DataTable, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow, Tag, TextInput, Tile } from "@carbon/react";
import { AgricultureAnalytics, ArrowDown, Checkmark, Code, Flow, Renew, TreeView, WarningAlt } from "@carbon/icons-react";
import { useEffect, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CodeStepRunner, DecisionTimeline } from "@/components/learning/IfStatementLearningBlocks";
import { inspectNestedExecution } from "@/components/learning/if-statement-inspector";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { NestedIfLessonDevelopmentPack, PlaygroundContent } from "@/types/content";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";

type NestedPath = "outer-false" | "outer-true-inner-false" | "outer-true-inner-true";

function resolvePath(soil: number, temperature: number): NestedPath {
  if (soil >= 30) return "outer-false";
  return temperature > 35 ? "outer-true-inner-true" : "outer-true-inner-false";
}

export function NestedStoryCard({ content }: { content: NestedIfLessonDevelopmentPack["story"] }) {
  return <><section id="nested-story" className="lesson-card nested-story" aria-labelledby="nested-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Smart Farm story continuation</p><h2 id="nested-story-title">{content.title}</h2><p>{content.body}</p><div className="nested-story-grid"><Tile><span>Previous controller</span>{content.priorFlow.map((step) => <strong key={step}>{step}</strong>)}</Tile><ArrowDown size={24} /><Tile><span>New evidence</span>{content.addedSignals.map((signal) => <Tag key={signal} type="teal">{signal}</Tag>)}</Tile></div></section><WorkflowAnimation id="nested-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function WhyHierarchyCard({ content }: { content: NestedIfLessonDevelopmentPack["whyHierarchy"] }) {
  return <section id="why-hierarchy" className="lesson-card why-hierarchy" aria-labelledby="why-hierarchy-title"><p className="lesson-section-label"><Flow size={16} /> Why hierarchy?</p><h2 id="why-hierarchy-title">{content.title}</h2><p>{content.body}</p><div className="hierarchy-case-grid">{content.cases.map((item) => <Tile key={`${item.soil}-${item.temperature}`}><div><span>Soil</span><strong>{item.soil}%</strong></div><div><span>Temperature</span><strong>{item.temperature}°C</strong></div><ArrowDown size={18} /><Tag type="green">{item.result}</Tag></Tile>)}</div></section>;
}

export function NestedDefinitionCard({ content }: { content: NestedIfLessonDevelopmentPack["definition"] }) {
  return <section id="nested-definition" className="lesson-card nested-definition" aria-labelledby="nested-definition-title"><p className="lesson-section-label"><TreeView size={16} /> What is nested if?</p><h2 id="nested-definition-title">{content.title}</h2><p>{content.body}</p><ol>{content.rules.map((rule, index) => <li key={rule}><span>{index + 1}</span><strong>{rule}</strong></li>)}</ol><div className="nested-analogy">{content.analogy.map((step, index) => <Tile key={step.title}><span>Checkpoint {index + 1}</span><strong>{step.title}</strong><p>{step.description}</p></Tile>)}</div></section>;
}

export function NestedSyntaxBreakdown({ content }: { content: NestedIfLessonDevelopmentPack["syntax"] }) {
  const [active, setActive] = useState(0);
  return <section id="nested-syntax" className="lesson-card nested-syntax" aria-labelledby="nested-syntax-title"><p className="lesson-section-label"><Code size={16} /> Syntax</p><h2 id="nested-syntax-title">{content.title}</h2><p>{content.body}</p><CodeSnippet type="multi" feedback="Copied">{content.template}</CodeSnippet><div className="nested-syntax-parts">{content.parts.map((part, index) => <button type="button" key={part.label} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}><code>{part.token}</code><strong>{part.label}</strong></button>)}</div><Tile aria-live="polite"><strong>{content.parts[active].label}</strong><p>{content.parts[active].description}</p></Tile></section>;
}

export function NestedDecisionTree({ content, soil, temperature, path, visibleDepth = 3 }: { content: NestedIfLessonDevelopmentPack["decisionTree"]; soil: number; temperature: number; path: NestedPath; visibleDepth?: number }) {
  const outerTrue = path !== "outer-false";
  const innerTrue = path === "outer-true-inner-true";
  return <div className="nested-decision-tree" data-stage={visibleDepth} aria-label={`Nested path: ${path.replaceAll("-", " ")}`}><div className="tree-input"><span>Inputs</span><strong>soil {soil}% · temperature {temperature}°C</strong></div><ArrowDown size={20} /><div className={`tree-level ${visibleDepth >= 1 ? "is-active" : "is-pending"}`}><span>{content.nodes[0].label}</span><code>{content.nodes[0].condition}</code><Tag type={outerTrue ? "green" : "red"}>{String(outerTrue)}</Tag></div><div className={`tree-branches ${visibleDepth >= 2 ? "is-visible" : "is-pending"}`}><div className={outerTrue ? "is-active" : "is-skipped"}><span>True</span>{outerTrue ? <><ArrowDown size={18} /><div className="tree-level is-active"><span>{content.nodes[1].label}</span><code>{content.nodes[1].condition}</code><Tag type={innerTrue ? "green" : "red"}>{String(innerTrue)}</Tag></div><strong className={visibleDepth >= 3 ? "" : "is-pending"}>{innerTrue ? content.nodes[1].trueLabel : content.nodes[1].falseLabel}</strong></> : <small>Inner condition skipped</small>}</div><div className={!outerTrue ? "is-active" : "is-skipped"}><span>False</span><strong className={visibleDepth >= 3 ? "" : "is-pending"}>{content.nodes[0].falseLabel}</strong></div></div></div>;
}

export function ExecutionTreeViewer({ content, soil = 20, temperature = 38, id = "execution-tree-viewer" }: { content: NestedIfLessonDevelopmentPack["decisionTree"]; soil?: number; temperature?: number; id?: string }) {
  const [currentSoil, setCurrentSoil] = useState(soil);
  const [currentTemperature, setCurrentTemperature] = useState(temperature);
  const [visibleDepth, setVisibleDepth] = useState(3);
  const path = resolvePath(currentSoil, currentTemperature);
  useEffect(() => { if (visibleDepth >= 3) return; const timer = window.setTimeout(() => setVisibleDepth((value) => value + 1), 450); return () => window.clearTimeout(timer); }, [visibleDepth]);
  return <section id={id} className="lesson-card execution-tree-viewer" aria-labelledby={`${id}-title`}><div className="lesson-card-heading"><div><p className="lesson-section-label"><TreeView size={16} /> Execution Tree Viewer</p><h2 id={`${id}-title`}>{content.title}</h2><p>{content.body}</p></div><Button size="sm" kind="ghost" renderIcon={Renew} onClick={() => setVisibleDepth(0)} disabled={visibleDepth < 3}>Replay path</Button></div><div className="nested-slider-grid"><Slider id={`${id}-soil`} labelText="Soil Moisture (%)" min={0} max={70} value={currentSoil} onChange={({ value }) => { setCurrentSoil(Number(value)); setVisibleDepth(3); }} /><Slider id={`${id}-temperature`} labelText="Temperature (°C)" min={10} max={50} value={currentTemperature} onChange={({ value }) => { setCurrentTemperature(Number(value)); setVisibleDepth(3); }} /></div><NestedDecisionTree content={content} soil={currentSoil} temperature={currentTemperature} path={path} visibleDepth={visibleDepth} /></section>;
}

export function NestedBlockHighlighter({ code, execution }: { code: string; execution: PlaygroundExecution }) {
  const inspection = inspectNestedExecution(code, execution);
  const executed = new Set(inspection.executedLines);
  return <section className="nested-block-highlighter" aria-labelledby="nested-block-highlighter-title"><div><p className="lesson-section-label"><Code size={16} /> Nested Block Highlighter</p><h3 id="nested-block-highlighter-title">See depth and execution together</h3></div><ol>{code.split("\n").map((line, index) => { const depth = Math.floor((line.match(/^\s*/)?.[0].length ?? 0) / 4); return <li key={`${index}-${line}`} className={executed.has(index + 1) ? "is-executed" : "is-skipped"} style={{ "--nest-depth": depth } as React.CSSProperties}><span>{index + 1}</span><code>{line || " "}</code><Tag size="sm" type={executed.has(index + 1) ? "green" : "gray"}>{executed.has(index + 1) ? "executed" : "skipped"}</Tag></li>; })}</ol></section>;
}

export function HierarchyExplorer({ content }: { content: NestedIfLessonDevelopmentPack["hierarchy"] }) {
  return <section id="hierarchy-explorer" className="lesson-card hierarchy-explorer" aria-labelledby="hierarchy-explorer-title"><p className="lesson-section-label"><TreeView size={16} /> Hierarchy Explorer</p><h2 id="hierarchy-explorer-title">{content.title}</h2><p>{content.body}</p><Accordion align="start">{content.levels.map((level, index) => <AccordionItem key={level.title} title={`${index + 1}. ${level.title}`} open={index === 0}><code>{level.condition}</code><p>{level.description}</p></AccordionItem>)}</Accordion></section>;
}

export function AgritechNestedExamples({ examples, withElse }: { examples: NestedIfLessonDevelopmentPack["agritechExamples"]; withElse: NestedIfLessonDevelopmentPack["withElse"] }) {
  const [selected, setSelected] = useState(0);
  const all = [...examples, withElse];
  const active = all[selected];
  return <section id="nested-agritech-examples" className="lesson-card nested-examples" aria-labelledby="nested-examples-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Agritech examples</p><h2 id="nested-examples-title">Dependent decisions across farm systems</h2><div>{all.map((example, index) => <Button key={example.title} size="sm" kind={index === selected ? "primary" : "ghost"} onClick={() => setSelected(index)}>{example.title}</Button>)}</div><div className="nested-example-detail"><div><h3>{active.title}</h3><p>{active.explanation}</p></div><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><pre><code>{active.output}</code></pre></div></section>;
}

export function LogicPathSimulator({ content, tree }: { content: NestedIfLessonDevelopmentPack["simulator"]; tree: NestedIfLessonDevelopmentPack["decisionTree"] }) {
  const [soil, setSoil] = useState(content.defaultSoil);
  const [temperature, setTemperature] = useState(content.defaultTemperature);
  const [rainfall, setRainfall] = useState(content.defaultRainfall);
  const path = resolvePath(soil, temperature);
  const action = soil >= 30 ? "No Irrigation Required" : rainfall > 100 ? "Cancel Irrigation · Rainfall safety" : temperature > 35 ? "Immediate Irrigation" : "Schedule Evening Irrigation";
  return <section id="logic-path-simulator" className="lesson-card logic-path-simulator" aria-labelledby="logic-path-simulator-title"><p className="lesson-section-label"><Flow size={16} /> Logic Path Simulator</p><h2 id="logic-path-simulator-title">{content.title}</h2><p>{content.body}</p><div className="nested-slider-grid"><Slider id="logic-soil" labelText="Soil Moisture (%)" min={0} max={70} value={soil} onChange={({ value }) => setSoil(Number(value))} /><Slider id="logic-temperature" labelText="Temperature (°C)" min={10} max={50} value={temperature} onChange={({ value }) => setTemperature(Number(value))} /><Slider id="logic-rainfall" labelText="Rainfall (mm)" min={0} max={200} value={rainfall} onChange={({ value }) => setRainfall(Number(value))} /></div><NestedDecisionTree content={tree} soil={soil} temperature={temperature} path={path} /><Tile className="logic-path-result" aria-live="polite"><Checkmark size={20} /><div><span>Recommended action</span><strong>{action}</strong>{soil < 30 && <small>Rainfall is checked inside the dry-soil branch.</small>}</div></Tile></section>;
}

export function NestedPlayground({ content, fields, tree }: { content: PlaygroundContent; fields: NestedIfLessonDevelopmentPack["simulatorFields"]; tree: NestedIfLessonDevelopmentPack["decisionTree"] }) {
  const [inputs, setInputs] = useState(fields.map((field) => field.defaultValue));
  const soil = Number(inputs[0]);
  const temperature = Number(inputs[1]);
  const update = (index: number, value: string) => setInputs((current) => current.map((item, itemIndex) => itemIndex === index ? value : item));
  return <CodePlayground id="playground" content={content} className="nested-playground" inputValues={inputs} traceExecution renderSupplement={(code, execution) => <div className="if-playground-supplement"><div className="nested-playground-inputs">{fields.map((field, index) => <TextInput key={field.id} id={`nested-playground-${field.id}`} labelText={field.label} helperText="Supplied to input() when the program runs." inputMode="decimal" value={inputs[index]} onChange={(event) => update(index, event.currentTarget.value)} />)}<Button size="sm" kind="ghost" renderIcon={Renew} onClick={() => setInputs(fields.map((field) => field.defaultValue))}>Reset inputs</Button></div>{Number.isFinite(soil) && Number.isFinite(temperature) && <NestedDecisionTree content={tree} soil={soil} temperature={temperature} path={resolvePath(soil, temperature)} />}<NestedBlockHighlighter code={code} execution={execution} /><DecisionTimeline input={`${fields[0].label}: ${inputs[0]} · ${fields[1].label}: ${inputs[1]}`} code={code} execution={execution} mode="nested-if" /><CodeStepRunner key={`${execution.status}-${execution.trace.length}-${execution.output}`} code={code} execution={execution} mode="nested-if" /></div>} />;
}

export function CompareChooseCard({ content }: { content: NestedIfLessonDevelopmentPack["comparison"] }) {
  const headers = [{ key: "feature", header: "Feature" }, { key: "ifElse", header: "if-else" }, { key: "ifElifElse", header: "if-elif-else" }, { key: "nestedIf", header: "Nested if" }];
  return <section id="compare-choose" className="lesson-card nested-comparison" aria-labelledby="compare-choose-title"><p className="lesson-section-label"><Flow size={16} /> Compare & Choose</p><h2 id="compare-choose-title">{content.title}</h2><p>{content.body}</p><DataTable rows={content.rows.map((row, index) => ({ id: String(index), ...row }))} headers={headers}>{({ rows, headers: tableHeaders, getHeaderProps, getRowProps, getTableProps }) => <TableContainer><Table {...getTableProps()}><TableHead><TableRow>{tableHeaders.map((header) => <TableHeader {...getHeaderProps({ header })} key={header.key}>{header.header}</TableHeader>)}</TableRow></TableHead><TableBody>{rows.map((row) => <TableRow {...getRowProps({ row })} key={row.id}>{row.cells.map((cell) => <TableCell key={cell.id}>{cell.value}</TableCell>)}</TableRow>)}</TableBody></Table></TableContainer>}</DataTable></section>;
}

export function DecisionPatternSelector({ content }: { content: NestedIfLessonDevelopmentPack["patternSelector"] }) {
  const [scenario, setScenario] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const active = content.scenarios[scenario];
  const choices = ["if", "if-else", "if-elif-else", "nested-if"];
  const correct = choice === active.answer;
  const next = () => { setScenario((value) => (value + 1) % content.scenarios.length); setChoice(null); setRevealed(false); };
  return <section id="decision-pattern-selector" className="lesson-card decision-pattern-selector" aria-labelledby="decision-pattern-title"><p className="lesson-section-label"><TreeView size={16} /> Decision Pattern Selector</p><h2 id="decision-pattern-title">{content.title}</h2><p>{content.body}</p><Tile><span>Scenario {scenario + 1} of {content.scenarios.length}</span><strong>{active.prompt}</strong></Tile><div className="pattern-choice-grid">{choices.map((item) => <Button key={item} size="sm" kind={choice === item ? "primary" : "tertiary"} onClick={() => { setChoice(item); setRevealed(false); }}>{item}</Button>)}</div><div className="pattern-actions"><Button size="sm" disabled={!choice} onClick={() => setRevealed(true)}>Check choice</Button><Button size="sm" kind="ghost" onClick={next}>Next scenario</Button></div>{revealed && <Tile className={correct ? "is-correct" : "is-incorrect"} aria-live="polite">{correct ? <Checkmark size={20} /> : <WarningAlt size={20} />}<div><strong>{correct ? "Good pattern choice" : `Use ${active.answer}`}</strong><p>{active.explanation}</p></div></Tile>}</section>;
}
