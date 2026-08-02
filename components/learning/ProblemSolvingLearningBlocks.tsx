import { Accordion, AccordionItem, Button, CodeSnippet, Select, SelectItem, Slider, Tag, TextInput, Tile } from "@carbon/react";
import { AgricultureAnalytics, ArrowRight, Calculator, CheckmarkOutline, Code, Debug, Flow, Idea } from "@carbon/icons-react";
import { useId, useMemo, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CodeTracePanel } from "@/components/learning/CodeTracePanel";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { FormulaProblemContent, ProblemSolvingLessonDevelopmentPack, UserInputField } from "@/types/content";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";

type NumericValues = Record<string, number>;

function calculateProblem(problem: FormulaProblemContent, values: NumericValues) {
  if (problem.id === "temperature-converter") return (values.celsius * 9 / 5) + 32;
  if (problem.id === "rectangle-area") return values.length * values.width;
  if (problem.id === "percentage") return (values.m1 + values.m2 + values.m3 + values.m4 + values.m5) / 500 * 100;
  if (problem.id === "simple-interest") return values.principal * values.rate * values.time / 100;
  if (problem.id === "crop-yield") return values.area * values.yield_per_acre;
  if (problem.id === "fertilizer") return values.area * values.fertilizer_per_acre;
  if (problem.id === "water") return values.area * values.water_per_acre;
  if (problem.id === "seed") return values.area * values.seeds_per_acre;
  return 0;
}

export function ProblemSolvingStoryCard({ content }: { content: ProblemSolvingLessonDevelopmentPack["story"] }) {
  return <><section id="problem-story" className="lesson-card problem-solving-story" aria-labelledby="problem-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Real-world story</p><h2 id="problem-story-title">{content.title}</h2><p>{content.body}</p><blockquote>{content.request}</blockquote><Tile><Idea size={24} /><div><strong>Engineering insight</strong><p>{content.insight}</p></div></Tile></section><WorkflowAnimation id="problem-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function ProblemSolvingFrameworkCard({ content }: { content: ProblemSolvingLessonDevelopmentPack["framework"] }) {
  return <section id="problem-solving-framework" className="lesson-card problem-solving-framework" aria-labelledby="problem-solving-framework-title"><p className="lesson-section-label"><Flow size={16} /> Reusable problem-solving framework</p><h2 id="problem-solving-framework-title">{content.title}</h2><p>{content.body}</p><div className="problem-framework-route" aria-hidden="true">{content.steps.map((step, index) => <div key={step.title}><span>{index + 1}</span><strong>{step.title}</strong>{index < content.steps.length - 1 && <ArrowRight size={18} />}</div>)}</div><Accordion align="start">{content.steps.map((step, index) => <AccordionItem key={step.title} title={`${index + 1}. ${step.title}`} open={index === 0}><p>{step.guidance}</p><Tile><strong>Check yourself</strong><p>{step.check}</p></Tile></AccordionItem>)}</Accordion></section>;
}

export function ExpressionBuildingCard({ content }: { content: ProblemSolvingLessonDevelopmentPack["expressionBuilding"] }) {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const active = content.examples[exampleIndex];
  function selectExample(index: number) { setExampleIndex(index); setStepIndex(0); }
  return <section id="expression-building" className="lesson-card expression-building-card" aria-labelledby="expression-building-title"><p className="lesson-section-label"><Code size={16} /> Expression building</p><h2 id="expression-building-title">{content.title}</h2><p>{content.body}</p><Tile className="expression-definition"><strong>{content.definition}</strong></Tile><div className="expression-anatomy">{content.anatomy.map((part, index) => <div key={`${part.label}-${index}`}><span>{part.label}</span><code>{part.value}</code></div>)}</div><div className="expression-example-tabs">{content.examples.map((example, index) => <Button key={example.title} size="sm" kind={index === exampleIndex ? "primary" : "ghost"} onClick={() => selectExample(index)}>{example.title}</Button>)}</div><CalculationStepsPanel title={active.title} original={active.expression} steps={active.steps.map((step) => ({ label: step.expression, explanation: step.explanation }))} result={active.result} activeStep={stepIndex} onStepChange={setStepIndex} /></section>;
}

export function FormulaCard({ problem, agritech = false }: { problem: FormulaProblemContent; agritech?: boolean }) {
  const initialValues = useMemo(() => Object.fromEntries(problem.inputs.map((input) => [input.name, input.value])), [problem.inputs]);
  const [values, setValues] = useState<NumericValues>(initialValues);
  const result = calculateProblem(problem, values);
  const isTemperature = problem.id === "temperature-converter";
  return <section id={problem.id} className={`lesson-card formula-card${agritech ? " formula-card--agritech" : ""}`} aria-labelledby={`${problem.id}-title`}><div className="formula-card-heading"><div><p className="lesson-section-label"><Calculator size={16} /> {agritech ? "Agritech calculation" : "Worked example"}</p><h2 id={`${problem.id}-title`}>{problem.title}</h2><p>{problem.context}</p></div><Tag type={agritech ? "green" : "blue"}>{problem.outputLabel}</Tag></div><div className="formula-ribbon"><span>Formula</span><strong>{problem.formula}</strong><code>{problem.pythonExpression}</code></div><div className="formula-interactive-grid"><div className="formula-inputs">{problem.inputs.map((input) => isTemperature ? <Slider key={input.name} id={`${problem.id}-${input.name}`} labelText={`${input.label} (${input.unit})`} min={-20} max={60} step={1} value={values[input.name]} onChange={({ value }) => setValues((current) => ({ ...current, [input.name]: Number(value) }))} /> : <TextInput key={input.name} id={`${problem.id}-${input.name}`} labelText={`${input.label}${input.unit ? ` (${input.unit})` : ""}`} inputMode="decimal" value={String(values[input.name])} onChange={(event) => setValues((current) => ({ ...current, [input.name]: Number(event.currentTarget.value) }))} />)}</div><Tile className="formula-live-result" aria-live="polite"><span>{problem.outputLabel}</span><strong>{Number.isFinite(result) ? Number(result.toFixed(2)).toLocaleString() : "—"}</strong><small>{problem.outputUnit}</small></Tile></div><div className="formula-code-steps"><div><span>Complete Python program</span><CodeSnippet type="multi" feedback="Copied">{problem.code}</CodeSnippet></div><CalculationStepsPanel title="Calculation steps" original={problem.formula} steps={problem.calculationSteps.map((step, index) => ({ label: `Step ${index + 1}`, explanation: step }))} result={`${Number(result.toFixed(2))} ${problem.outputUnit ?? ""}`} /></div></section>;
}

export function CalculationStepsPanel({ title, original, steps, result, activeStep: controlledStep, onStepChange }: { title: string; original: string; steps: Array<{ label: string; explanation: string }>; result: string; activeStep?: number; onStepChange?: (step: number) => void }) {
  const headingId = useId();
  const [localStep, setLocalStep] = useState(0);
  const activeStep = controlledStep ?? localStep;
  function choose(step: number) { onStepChange?.(step); if (controlledStep === undefined) setLocalStep(step); }
  return <section className="calculation-steps-panel" aria-labelledby={headingId}><div><Flow size={20} /><h3 id={headingId}>{title}</h3></div><code>{original}</code><div className="calculation-step-selector">{steps.map((step, index) => <Button key={`${step.label}-${index}`} size="sm" kind={activeStep === index ? "primary" : "ghost"} onClick={() => choose(index)} aria-label={`Show calculation step ${index + 1}`}>{index + 1}</Button>)}</div><Tile aria-live="polite"><span>{steps[activeStep]?.label}</span><p>{steps[activeStep]?.explanation}</p></Tile><div className="calculation-final-result"><span>Verified result</span><strong>{result}</strong></div></section>;
}

function calculateExpression(left: number, operator: string, right: number) {
  if (operator === "+") return left + right;
  if (operator === "-") return left - right;
  if (operator === "*") return left * right;
  if (operator === "/") return right === 0 ? "Cannot divide by zero" : left / right;
  if (operator === ">") return left > right;
  if (operator === "<") return left < right;
  return left === right;
}

export function ExpressionBuilder({ content }: { content: ProblemSolvingLessonDevelopmentPack["expressionBuilder"] }) {
  const [leftName, setLeftName] = useState(content.variables[0].value);
  const [operator, setOperator] = useState("*");
  const [rightMode, setRightMode] = useState<"variable" | "number">("variable");
  const [rightValue, setRightValue] = useState(content.variables[1].value);
  const [values, setValues] = useState<NumericValues>(() => Object.fromEntries(content.variables.map((variable) => [variable.value, variable.defaultValue])));
  const left = values[leftName];
  const right = rightMode === "variable" ? values[rightValue] : Number(rightValue);
  const expression = `${leftName} ${operator} ${rightMode === "variable" ? rightValue : rightValue}`;
  const result = calculateExpression(left, operator, right);
  return <section id="expression-builder" className="lesson-card expression-builder" aria-labelledby="expression-builder-title"><p className="lesson-section-label"><Calculator size={16} /> Interactive expression builder</p><h2 id="expression-builder-title">{content.title}</h2><p>{content.body}</p><div className="expression-builder-values">{content.variables.map((variable) => <TextInput key={variable.value} id={`builder-value-${variable.value}`} labelText={variable.label} inputMode="decimal" value={String(values[variable.value])} onChange={(event) => setValues((current) => ({ ...current, [variable.value]: Number(event.currentTarget.value) }))} />)}</div><div className="expression-builder-controls"><Select id="builder-left" labelText="First variable" value={leftName} onChange={(event) => setLeftName(event.currentTarget.value)}>{content.variables.map((variable) => <SelectItem key={variable.value} value={variable.value} text={variable.label} />)}</Select><Select id="builder-operator" labelText="Operator" value={operator} onChange={(event) => setOperator(event.currentTarget.value)}>{content.operators.map((item) => <SelectItem key={item.value} value={item.value} text={item.label} />)}</Select><Select id="builder-right-mode" labelText="Second operand type" value={rightMode} onChange={(event) => { const mode = event.currentTarget.value as "variable" | "number"; setRightMode(mode); setRightValue(mode === "variable" ? content.variables[1].value : String(content.numbers[0])); }}><SelectItem value="variable" text="Variable" /><SelectItem value="number" text="Number" /></Select><Select id="builder-right" labelText="Second operand" value={rightValue} onChange={(event) => setRightValue(event.currentTarget.value)}>{rightMode === "variable" ? content.variables.map((variable) => <SelectItem key={variable.value} value={variable.value} text={variable.label} />) : content.numbers.map((number) => <SelectItem key={number} value={String(number)} text={String(number)} />)}</Select></div><div className="expression-builder-output"><div><span>Generated Python</span><CodeSnippet type="single" feedback="Copied">{expression}</CodeSnippet></div><Tile aria-live="polite"><span>Preview result</span><strong>{String(result)}</strong><small>{typeof result}</small></Tile></div></section>;
}

export function GuidedPracticeLab({ guided, independent }: { guided: ProblemSolvingLessonDevelopmentPack["guidedPractice"]; independent: string[] }) {
  const [selected, setSelected] = useState(0);
  const active = guided[selected];
  return <section id="guided-practice" className="lesson-card guided-practice-lab" aria-labelledby="guided-practice-title"><p className="lesson-section-label"><CheckmarkOutline size={16} /> Guided and independent practice</p><h2 id="guided-practice-title">Build confidence one complete problem at a time</h2><div className="guided-practice-grid"><div><h3>Guided practice</h3><div className="guided-problem-tabs">{guided.map((problem, index) => <Button key={problem.title} size="sm" kind={index === selected ? "primary" : "ghost"} onClick={() => setSelected(index)}>{problem.title}</Button>)}</div><Tile><strong>{active.title}</strong><code>{active.formula}</code><p>{active.guidance}</p></Tile></div><div id="independent-practice"><h3>Independent practice</h3><ol>{independent.map((problem) => <li key={problem}><span>{problem}</span><Tag size="sm" type="purple">Solve independently</Tag></li>)}</ol></div></div></section>;
}

export function ChallengeCard({ challenges }: { challenges: ProblemSolvingLessonDevelopmentPack["challenges"] }) {
  const [revealed, setRevealed] = useState<string[]>([]);
  return <section id="challenge-problems" className="lesson-card challenge-problems" aria-labelledby="challenge-problems-title"><p className="lesson-section-label"><Debug size={16} /> Challenge problems</p><h2 id="challenge-problems-title">Translate requirements before writing code</h2><div className="challenge-card-grid">{challenges.map((challenge, index) => { const isRevealed = revealed.includes(challenge.title); return <Tile key={challenge.title}><Tag type="magenta">Challenge {index + 1}</Tag><h3>{challenge.title}</h3><p>{challenge.brief}</p><dl><dt>Inputs</dt><dd>{challenge.inputs.join(" · ")}</dd><dt>Required output</dt><dd>{challenge.output}</dd></dl><Button size="sm" kind="tertiary" onClick={() => setRevealed((current) => isRevealed ? current.filter((item) => item !== challenge.title) : [...current, challenge.title])} aria-expanded={isRevealed}>{isRevealed ? "Hide hint" : "Reveal hint"}</Button>{isRevealed && <p className="challenge-hint" aria-live="polite">{challenge.hint}</p>}</Tile>; })}</div></section>;
}

export function DebugChallengeCollection({ challenges }: { challenges: ProblemSolvingLessonDevelopmentPack["debugChallenges"] }) {
  const [revealed, setRevealed] = useState<string[]>([]);
  return <section id="debug-challenge" className="lesson-card problem-debug-challenges" aria-labelledby="problem-debug-title"><p className="lesson-section-label"><Debug size={16} /> Debug challenge</p><h2 id="problem-debug-title">Repair the reasoning, then repair the code</h2><div>{challenges.map((challenge) => { const visible = revealed.includes(challenge.title); return <Tile key={challenge.title}><div><h3>{challenge.title}</h3><Tag type="red">{challenge.mistakesToFind} {challenge.mistakesToFind === 1 ? "mistake" : "mistakes"}</Tag></div><p>{challenge.prompt}</p><pre><code>{challenge.code}</code></pre><Button size="sm" kind="tertiary" onClick={() => setRevealed((current) => visible ? current.filter((item) => item !== challenge.title) : [...current, challenge.title])}>{visible ? "Hide solution" : "Show solution"}</Button><div className="problem-debug-solution" aria-live="polite">{visible ? <pre><code>{challenge.solution}</code></pre> : <p>{challenge.hiddenGuidance}</p>}</div></Tile>; })}</div></section>;
}

export function ProblemSolvingPlayground({ content, fields, expressionBuilder }: { content: { title: string; description: string; starterCode: string; expectedOutcome: string }; fields: UserInputField[]; expressionBuilder: ProblemSolvingLessonDevelopmentPack["expressionBuilder"] }) {
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((field) => [field.id, field.defaultValue])));
  return <CodePlayground id="playground" content={content} className="problem-solving-playground" inputValues={fields.map((field) => values[field.id])} traceExecution renderSupplement={(_, execution) => <ProblemSolvingPlaygroundSupplement fields={fields} values={values} onChange={(id, value) => setValues((current) => ({ ...current, [id]: value }))} execution={execution} expressionBuilder={expressionBuilder} />} />;
}

function ProblemSolvingPlaygroundSupplement({ fields, values, onChange, execution, expressionBuilder }: { fields: UserInputField[]; values: Record<string, string>; onChange: (id: string, value: string) => void; execution: PlaygroundExecution; expressionBuilder: ProblemSolvingLessonDevelopmentPack["expressionBuilder"] }) {
  const result = Number(values.area) * Number(values.yield_per_acre);
  return <><div className="problem-playground-inputs"><div><h3>Simulated console inputs</h3>{fields.map((field) => <TextInput key={field.id} id={`problem-playground-${field.id}`} labelText={field.label} value={values[field.id]} inputMode="decimal" onChange={(event) => onChange(field.id, event.currentTarget.value)} />)}</div><Tile className="problem-input-queue"><h3>Input sequence</h3><p>The runtime supplies these responses to input() from top to bottom.</p><ol>{fields.map((field, index) => <li key={field.id}><span>{index + 1}</span><div><strong>{field.prompt}</strong><code>{values[field.id]}</code></div></li>)}</ol></Tile></div><div className="problem-playground-panels"><CalculationStepsPanel title="Crop-yield calculation" original="total_yield = area * yield_per_acre" steps={[{ label: "Identify inputs", explanation: `Area is ${values.area} acres and yield rate is ${values.yield_per_acre} kg per acre.` }, { label: "Apply formula", explanation: `${values.area} × ${values.yield_per_acre}` }, { label: "Verify and label", explanation: "Check the multiplication and communicate the result in kilograms." }]} result={Number.isFinite(result) ? `${result} kg` : "Enter valid numbers"} /><CodeTracePanel key={`${execution.status}-${execution.trace.length}-${execution.output}`} execution={execution} /></div><ExpressionBuilder content={expressionBuilder} /></>;
}
