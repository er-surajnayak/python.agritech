import { Button, CodeSnippet, Slider, Tag, TextInput, Tile } from "@carbon/react";
import { AgricultureAnalytics, ArrowDown, ArrowUp, Checkmark, Code, Debug, Flow, Renew, TestTool } from "@carbon/icons-react";
import { useMemo, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { analyzeConditionOrder, selectBranchForValue } from "@/components/learning/condition-order-analyzer";
import { CodeStepRunner, DecisionTimeline } from "@/components/learning/IfStatementLearningBlocks";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { ConditionalBranchContent, IfElifElseLessonDevelopmentPack, PlaygroundContent } from "@/types/content";

export function IfElifStoryCard({ content }: { content: IfElifElseLessonDevelopmentPack["story"] }) {
  return <><section id="elif-story" className="lesson-card elif-story" aria-labelledby="elif-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Story continuation</p><h2 id="elif-story-title">{content.title}</h2><p>{content.body}</p><div className="elif-story-grid"><div><span>Current two-way controller</span><CodeSnippet type="multi" feedback="Copied">{content.priorCode}</CodeSnippet></div><div>{content.situations.map((situation, index) => <Tile key={situation}><span>State {index + 1}</span><strong>{situation}</strong></Tile>)}</div></div></section><WorkflowAnimation id="elif-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function WhyTwoPathsCard({ content }: { content: IfElifElseLessonDevelopmentPack["whyTwoPaths"] }) {
  return <section id="why-two-paths" className="lesson-card why-two-paths" aria-labelledby="why-two-paths-title"><p className="lesson-section-label"><Flow size={16} /> Why two paths are not enough</p><h2 id="why-two-paths-title">{content.title}</h2><p>{content.body}</p><div className="multi-situation-grid">{content.cases.map((item) => <Tile key={item.value}><span>Moisture</span><strong>{item.value}%</strong><p>{item.action}</p></Tile>)}</div></section>;
}

export function ElifDefinitionCard({ content }: { content: IfElifElseLessonDevelopmentPack["definition"] }) {
  return <section id="elif-definition" className="lesson-card elif-definition" aria-labelledby="elif-definition-title"><p className="lesson-section-label"><Code size={16} /> What is elif?</p><h2 id="elif-definition-title">{content.title}</h2><p>{content.body}</p><ol>{content.rules.map((rule, index) => <li key={rule}><span>{index + 1}</span><strong>{rule}</strong></li>)}</ol></section>;
}

export function ElifSyntaxBreakdown({ content }: { content: IfElifElseLessonDevelopmentPack["syntax"] }) {
  const [active, setActive] = useState(0);
  return <section id="elif-syntax" className="lesson-card elif-syntax" aria-labelledby="elif-syntax-title"><p className="lesson-section-label"><Code size={16} /> Syntax</p><h2 id="elif-syntax-title">{content.title}</h2><p>{content.body}</p><CodeSnippet type="multi" feedback="Copied">{content.template}</CodeSnippet><div className="elif-syntax-parts">{content.parts.map((part, index) => <button type="button" key={part.label} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}><code>{part.token}</code><strong>{part.label}</strong></button>)}</div><Tile><strong>{content.parts[active].label}</strong><p>{content.parts[active].description}</p></Tile></section>;
}

export function BranchExecutionTimeline({ branches, value, selectedIndex }: { branches: ConditionalBranchContent[]; value: number; selectedIndex: number }) {
  return <div className="branch-execution-timeline" aria-label={`Branch ${selectedIndex + 1} selected for value ${value}`}><div className="branch-input"><span>Input</span><strong>{value}</strong></div><ArrowDown size={20} /><ol>{branches.map((branch, index) => { const evaluated = index <= selectedIndex; const selected = index === selectedIndex; return <li key={branch.id} className={selected ? "is-selected" : evaluated ? "is-evaluated" : "is-skipped"}><span>{branch.kind}</span><code>{branch.condition ?? "default"}</code><Tag size="sm" type={selected ? "green" : evaluated ? "red" : "gray"}>{selected ? "First True" : evaluated ? "False" : "Skipped"}</Tag><strong>{branch.action}</strong></li>; })}</ol></div>;
}

export function IfElifElseVisualizer({ content, id = "elif-first-example" }: { content: IfElifElseLessonDevelopmentPack["firstExample"] | IfElifElseLessonDevelopmentPack["agritechExamples"][number]; id?: string }) {
  const [value, setValue] = useState(content.defaultValue);
  const selected = selectBranchForValue(content.branches, value);
  return <section id={id} className="lesson-card if-elif-else-visualizer" aria-labelledby={`${id}-title`}><p className="lesson-section-label"><Flow size={16} /> If-Elif-Else Visualizer</p><h2 id={`${id}-title`}>{content.title}</h2><p>{content.explanation}</p><div className="elif-visualizer-grid"><div><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><Slider id={`${id}-value`} labelText={"unit" in content ? `${content.variable} (${content.unit})` : content.variable} min={content.min} max={content.max} value={value} onChange={({ value: next }) => setValue(Number(next))} /></div><BranchExecutionTimeline branches={content.branches} value={value} selectedIndex={selected} /></div></section>;
}

export function AgritechElifExamples({ examples }: { examples: IfElifElseLessonDevelopmentPack["agritechExamples"] }) {
  const [selected, setSelected] = useState(0);
  return <section id="elif-agritech-examples" className="agritech-elif-examples"><div className="agritech-elif-tabs">{examples.map((example, index) => <Button key={example.title} size="sm" kind={selected === index ? "primary" : "ghost"} onClick={() => setSelected(index)}>{example.title}</Button>)}</div><IfElifElseVisualizer key={examples[selected].title} content={examples[selected]} id="elif-agritech-active" /></section>;
}

export function ConditionOrderAnalyzer({ content, branches }: { content: IfElifElseLessonDevelopmentPack["orderAnalyzer"]; branches: ConditionalBranchContent[] }) {
  const [useIncorrect, setUseIncorrect] = useState(true);
  const active = useIncorrect ? [branches[2], branches[1], branches[0], branches[3]] : branches;
  const issues = analyzeConditionOrder(active);
  return <section id="condition-order-analyzer" className="lesson-card condition-order-analyzer" aria-labelledby="condition-order-title"><p className="lesson-section-label"><Debug size={16} /> Condition Order Analyzer</p><h2 id="condition-order-title">{content.title}</h2><p>{content.body}</p><div className="order-example-controls"><Button size="sm" kind={useIncorrect ? "danger" : "ghost"} onClick={() => setUseIncorrect(true)}>Analyze incorrect order</Button><Button size="sm" kind={!useIncorrect ? "primary" : "ghost"} onClick={() => setUseIncorrect(false)}>Analyze correct order</Button></div><CodeSnippet type="multi" feedback="Copied">{useIncorrect ? content.incorrectCode : content.correctCode}</CodeSnippet><div className="order-analysis-results">{issues.length ? issues.map((issue) => <Tile key={`${issue.branchId}-${issue.kind}`}><Tag type="red">{issue.kind}</Tag><strong>{issue.message}</strong><p>{issue.suggestion}</p></Tile>) : <Tile className="is-valid"><Checkmark size={20} /><div><strong>Every ordered branch is reachable</strong><p>The thresholds progress from narrow to broad before the default branch.</p></div></Tile>}</div></section>;
}

export function DecisionTreeBuilder({ content }: { content: IfElifElseLessonDevelopmentPack["treeBuilder"] }) {
  const [branches, setBranches] = useState(content.branches);
  const issues = analyzeConditionOrder(branches);
  function move(index: number, direction: -1 | 1) { const next = index + direction; if (next < 0 || next >= branches.length - 1 || index >= branches.length - 1) return; setBranches((current) => { const copy = [...current]; [copy[index], copy[next]] = [copy[next], copy[index]]; return copy; }); }
  return <section id="decision-tree-builder" className="lesson-card decision-tree-builder" aria-labelledby="decision-tree-builder-title"><div className="lesson-card-heading"><div><p className="lesson-section-label"><Flow size={16} /> Decision Tree Builder</p><h2 id="decision-tree-builder-title">{content.title}</h2><p>{content.body}</p></div><Button size="sm" kind="ghost" renderIcon={Renew} onClick={() => setBranches(content.branches)}>Reset</Button></div><ol>{branches.map((branch, index) => <li key={branch.id} className={issues.some((issue) => issue.branchId === branch.id) ? "has-issue" : ""}><span>{index + 1}</span><div><Tag size="sm" type={branch.kind === "else" ? "gray" : "purple"}>{branch.kind}</Tag><code>{branch.condition ?? "default"}</code><strong>{branch.action}</strong></div>{branch.kind !== "else" && <div><Button hasIconOnly size="sm" kind="ghost" renderIcon={ArrowUp} iconDescription="Move condition earlier" disabled={index === 0} onClick={() => move(index, -1)} /><Button hasIconOnly size="sm" kind="ghost" renderIcon={ArrowDown} iconDescription="Move condition later" disabled={index >= branches.length - 2} onClick={() => move(index, 1)} /></div>}</li>)}</ol><Tile className={issues.length ? "tree-builder-status has-issues" : "tree-builder-status is-valid"}><strong>{issues.length ? `${issues.length} logic issue${issues.length === 1 ? "" : "s"} detected` : "Valid multi-level decision tree"}</strong><p>{issues[0]?.suggestion ?? "Every threshold is reachable and the default remains last."}</p></Tile></section>;
}

export function ConditionCoverageTester({ content }: { content: IfElifElseLessonDevelopmentPack["coverage"] }) {
  const [input, setInput] = useState(content.defaultInputs);
  const values = useMemo(() => input.split(",").map((value) => Number(value.trim())).filter(Number.isFinite), [input]);
  const selected = values.map((value) => ({ value, branch: selectBranchForValue(content.branches, value) }));
  const covered = new Set(selected.map((item) => item.branch).filter((index) => index >= 0));
  return <section id="condition-coverage" className="lesson-card condition-coverage" aria-labelledby="condition-coverage-title"><p className="lesson-section-label"><TestTool size={16} /> Condition Coverage Tester</p><h2 id="condition-coverage-title">{content.title}</h2><p>{content.body}</p><TextInput id="coverage-inputs" labelText="Test soil values separated by commas" helperText="Example: 10, 22, 40, 70" value={input} onChange={(event) => setInput(event.currentTarget.value)} /><div className="coverage-results"><div>{selected.map((item, index) => <Tile key={`${item.value}-${index}`}><span>{item.value}</span><strong>{item.branch >= 0 ? content.branches[item.branch].action : "No branch"}</strong></Tile>)}</div><ol>{content.branches.map((branch, index) => <li key={branch.id} className={covered.has(index) ? "is-covered" : "is-missing"}><Tag size="sm" type={covered.has(index) ? "green" : "gray"}>{covered.has(index) ? "Covered" : "Untested"}</Tag><code>{branch.condition ?? "else"}</code><span>{branch.action}</span></li>)}</ol></div><p className="coverage-summary" aria-live="polite">{covered.size} of {content.branches.length} branches covered.</p></section>;
}

export function MultiBranchExecutionComparator({ branches }: { branches: ConditionalBranchContent[] }) {
  const [left, setLeft] = useState(18);
  const [right, setRight] = useState(70);
  const leftBranch = selectBranchForValue(branches, left);
  const rightBranch = selectBranchForValue(branches, right);
  return <section id="elif-execution-comparator" className="lesson-card elif-execution-comparator" aria-labelledby="elif-execution-comparator-title"><p className="lesson-section-label"><TestTool size={16} /> Execution Comparator</p><h2 id="elif-execution-comparator-title">Compare two multi-branch executions</h2><p>The code remains unchanged. Compare how each input evaluates a different number of conditions before selecting its first matching branch.</p><div className="elif-comparator-inputs"><TextInput id="elif-comparator-left" labelText="First soil reading (%)" type="number" value={String(left)} onChange={(event) => setLeft(Number(event.currentTarget.value))} /><TextInput id="elif-comparator-right" labelText="Second soil reading (%)" type="number" value={String(right)} onChange={(event) => setRight(Number(event.currentTarget.value))} /></div><div className="elif-comparator-grid"><BranchExecutionTimeline branches={branches} value={left} selectedIndex={leftBranch} /><BranchExecutionTimeline branches={branches} value={right} selectedIndex={rightBranch} /></div></section>;
}

export function ElifPlayground({ content, fields, branches }: { content: PlaygroundContent; fields: IfElifElseLessonDevelopmentPack["simulatorFields"]; branches: ConditionalBranchContent[] }) {
  const field = fields[0];
  const [input, setInput] = useState(field.defaultValue);
  const value = Number(input);
  const selected = selectBranchForValue(branches, value);
  return <CodePlayground id="playground" content={content} className="elif-playground" inputValues={[input]} traceExecution renderSupplement={(code, execution) => <div className="if-playground-supplement"><div className="if-playground-input"><TextInput id="elif-playground-soil" labelText={field.label} helperText="This value is supplied to input() when the program runs." inputMode="decimal" value={input} onChange={(event) => setInput(event.currentTarget.value)} /><Button size="sm" kind="ghost" renderIcon={Renew} onClick={() => setInput(field.defaultValue)}>Reset input</Button></div>{Number.isFinite(value) && <BranchExecutionTimeline branches={branches} value={value} selectedIndex={selected} />}<DecisionTimeline input={`${field.label}: ${input}`} code={code} execution={execution} mode="if-elif-else" /><CodeStepRunner key={`${execution.status}-${execution.trace.length}-${execution.output}`} code={code} execution={execution} mode="if-elif-else" /></div>} />;
}
