import { Button, CodeSnippet, Select, SelectItem, Tag, TextInput, Tile, Toggle } from "@carbon/react";
import { AgricultureAnalytics, ArrowRight, Calculator as Calculate, CheckmarkOutline, Code, Flow, Rule } from "@carbon/icons-react";
import { useId, useMemo, useState } from "react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CodeTracePanel } from "@/components/learning/CodeTracePanel";
import { VariableExplorer } from "@/components/learning/VariableLearningBlocks";
import { inspectPythonVariables } from "@/components/learning/variable-inspector";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";
import type { CodeExampleContent, ExpressionVisualizationContent, OperatorLessonDevelopmentPack, OperatorRow, PlaygroundContent } from "@/types/content";

export function OperatorStoryCard({ content }: { content: OperatorLessonDevelopmentPack["story"] }) {
  return <><section id="operator-story" className="lesson-card operator-story-card" aria-labelledby="operator-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Real-life story</p><h2 id="operator-story-title">{content.title}</h2><p>{content.body}</p><div className="operator-story-readings">{content.readings.map((reading) => <Tile key={reading.label}><span>{reading.label}</span><strong>{reading.value}</strong></Tile>)}</div><div className="operator-story-questions">{content.questions.map((question) => <Tile key={question}><Rule size={18} /><span>{question}</span></Tile>)}</div></section><WorkflowAnimation id="operator-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function OperatorDefinitionCard({ content }: { content: OperatorLessonDevelopmentPack["definition"] }) {
  return <section id="operator-definition" className="lesson-card operator-definition-card" aria-labelledby="operator-definition-title"><p className="lesson-section-label"><Calculate size={16} /> Operator foundations</p><h2 id="operator-definition-title">{content.title}</h2><p>{content.body}</p><div className="operator-equation"><Tile><span>Operand</span><strong>{content.operands[0]}</strong></Tile><strong className="operator-symbol">{content.operator}</strong><Tile><span>Operand</span><strong>{content.operands[1]}</strong></Tile><ArrowRight size={24} /><Tile className="is-result"><span>Result</span><strong>{content.result}</strong></Tile></div><CodeSnippet type="multi" feedback="Copied">{content.example.code}</CodeSnippet><p className="operator-example-explanation">{content.example.explanation}</p></section>;
}

export function OperatorComparisonTable({ title, rows }: { title: string; rows: OperatorRow[] }) {
  return <div className="operator-table-wrap"><table><caption>{title}</caption><thead><tr><th scope="col">Operator</th><th scope="col">Meaning</th><th scope="col">Example</th><th scope="col">Output</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.operator}-${row.example}`}><th scope="row"><code>{row.operator}</code></th><td>{row.meaning}</td><td><code>{row.example}</code></td><td><strong>{row.output}</strong></td></tr>)}</tbody></table></div>;
}

export function OperatorCategoryCard({ id, label, content, example, secondaryExample }: { id: string; label: string; content: { title: string; body: string; rows: OperatorRow[] }; example: CodeExampleContent; secondaryExample?: CodeExampleContent }) {
  const examples = secondaryExample ? [example, secondaryExample] : [example];
  return <section id={id} className={`lesson-card operator-category-card operator-category-card--${id}`} aria-labelledby={`${id}-title`}><p className="lesson-section-label"><Code size={16} /> {label}</p><h2 id={`${id}-title`}>{content.title}</h2><p>{content.body}</p><OperatorComparisonTable title={`${content.title} reference`} rows={content.rows} /><div className="operator-category-examples">{examples.map((item, index) => <div key={item.title}><span>{index === 0 ? "Example" : "Agritech example"}</span><h3>{item.title}</h3><p>{item.explanation}</p><CodeSnippet type="multi" feedback="Copied">{item.code}</CodeSnippet>{item.output !== undefined && <pre><code>{item.output}</code></pre>}</div>)}</div></section>;
}

function evaluateOperator(operator: string, left: number, right: number) {
  if (operator === "+") return left + right;
  if (operator === "-") return left - right;
  if (operator === "*") return left * right;
  if (operator === "/") return right === 0 ? "ZeroDivisionError" : left / right;
  if (operator === "//") return right === 0 ? "ZeroDivisionError" : Math.floor(left / right);
  if (operator === "%") return right === 0 ? "ZeroDivisionError" : ((left % right) + right) % right;
  if (operator === "**") return left ** right;
  if (operator === "==") return left === right;
  if (operator === "!=") return left !== right;
  if (operator === ">") return left > right;
  if (operator === "<") return left < right;
  if (operator === ">=") return left >= right;
  return left <= right;
}

export function OperatorExplorer({ arithmetic, comparison }: { arithmetic: OperatorRow[]; comparison: OperatorRow[] }) {
  const operators = [...arithmetic, ...comparison];
  const [operator, setOperator] = useState("+");
  const [leftText, setLeftText] = useState("32");
  const [rightText, setRightText] = useState("20");
  const left = Number(leftText);
  const right = Number(rightText);
  const valid = Number.isFinite(left) && Number.isFinite(right);
  const result = valid ? evaluateOperator(operator, left, right) : "Enter two numbers";
  return <section className="operator-explorer" aria-labelledby="operator-explorer-title"><div><Calculate size={20} /><h3 id="operator-explorer-title">Operator Explorer</h3><Tag size="sm" type={typeof result === "boolean" ? "teal" : typeof result === "string" ? "red" : "blue"}>{typeof result}</Tag></div><div className="operator-explorer-controls"><TextInput id="operator-left-value" labelText="Left operand" inputMode="decimal" value={leftText} onChange={(event) => setLeftText(event.currentTarget.value)} /><Select id="operator-symbol-select" labelText="Operator" value={operator} onChange={(event) => setOperator(event.currentTarget.value)}>{operators.map((row) => <SelectItem key={`${row.operator}-${row.meaning}`} value={row.operator} text={`${row.operator} · ${row.meaning}`} />)}</Select><TextInput id="operator-right-value" labelText="Right operand" inputMode="decimal" value={rightText} onChange={(event) => setRightText(event.currentTarget.value)} /></div><div className="operator-explorer-result" aria-live="polite"><code>{leftText || "?"} {operator} {rightText || "?"}</code><ArrowRight size={20} /><strong>{String(result)}</strong></div></section>;
}

export function TruthTableExplorer({ content }: { content: OperatorLessonDevelopmentPack["logical"] }) {
  const [operator, setOperator] = useState<"and" | "or" | "not">("and");
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const result = operator === "and" ? a && b : operator === "or" ? a || b : !a;
  const table = content.truthTables.find((item) => item.operator === operator);
  return <section id="truth-table" className="lesson-card truth-table-explorer" aria-labelledby="truth-table-title"><p className="lesson-section-label"><Rule size={16} /> Interactive truth table</p><h2 id="truth-table-title">Test and, or, and not</h2><p>{content.body}</p><div className="truth-operator-tabs" role="tablist" aria-label="Logical operator">{content.truthTables.map((item) => <Button key={item.operator} role="tab" aria-selected={operator === item.operator} kind={operator === item.operator ? "primary" : "ghost"} onClick={() => setOperator(item.operator)}>{item.operator}</Button>)}</div><div className="truth-controls"><Toggle id="truth-value-a" labelText="Value A" labelA="False" labelB="True" toggled={a} onToggle={setA} />{operator !== "not" && <Toggle id="truth-value-b" labelText="Value B" labelA="False" labelB="True" toggled={b} onToggle={setB} />}<Tile aria-live="polite"><code>{operator === "not" ? `not ${a ? "True" : "False"}` : `${a ? "True" : "False"} ${operator} ${b ? "True" : "False"}`}</code><strong>{result ? "True" : "False"}</strong></Tile></div><div className="truth-table-reference"><table><thead><tr><th scope="col">A</th>{operator !== "not" && <th scope="col">B</th>}<th scope="col">Result</th></tr></thead><tbody>{table?.rows.map((row, index) => <tr key={`${row.a}-${row.b}-${index}`} className={row.a === a && (operator === "not" || row.b === b) ? "is-active" : ""}><td>{row.a ? "T" : "F"}</td>{operator !== "not" && <td>{row.b ? "T" : "F"}</td>}<td>{row.result ? "T" : "F"}</td></tr>)}</tbody></table></div></section>;
}

export function AssignmentOperatorExplorer({ content }: { content: OperatorLessonDevelopmentPack["assignmentOperators"] }) {
  const [operator, setOperator] = useState("+=");
  const [start, setStart] = useState("200");
  const [change, setChange] = useState("25");
  const a = Number(start); const b = Number(change);
  const arithmeticOperator = operator.slice(0, -1);
  const result = operator === "=" ? b : Number.isFinite(a) && Number.isFinite(b) ? evaluateOperator(arithmeticOperator, a, b) : "Enter numbers";
  return <section id="assignment-operators" className="lesson-card assignment-operator-explorer" aria-labelledby="assignment-operators-title"><p className="lesson-section-label"><Calculate size={16} /> Assignment operators</p><h2 id="assignment-operators-title">{content.title}</h2><p>{content.body}</p><OperatorComparisonTable title="Assignment operator reference" rows={content.rows} /><div className="assignment-operator-controls"><TextInput id="assignment-start" labelText="Current plants" inputMode="decimal" value={start} onChange={(event) => setStart(event.currentTarget.value)} /><Select id="assignment-operator" labelText="Update operator" value={operator} onChange={(event) => setOperator(event.currentTarget.value)}>{content.rows.map((row) => <SelectItem key={row.operator} value={row.operator} text={`${row.operator} · ${row.meaning}`} />)}</Select><TextInput id="assignment-change" labelText="Update value" inputMode="decimal" value={change} onChange={(event) => setChange(event.currentTarget.value)} /><Tile aria-live="polite"><code>plants {operator} {change}</code><strong>{String(result)}</strong></Tile></div></section>;
}

export function IdentityMembershipCard({ identity, membership }: { identity: OperatorLessonDevelopmentPack["identity"]; membership: OperatorLessonDevelopmentPack["membership"] }) {
  const [sameObject, setSameObject] = useState(true);
  const [search, setSearch] = useState("Rice");
  const crops = ["Rice", "Wheat", "Maize"];
  return <section className="lesson-card identity-membership-card" aria-labelledby="identity-membership-title"><p className="lesson-section-label"><Rule size={16} /> Reference and presence checks</p><h2 id="identity-membership-title">Identity and membership operators</h2><div className="identity-membership-grid"><div id="identity-operators"><h3>{identity.title}</h3><p>{identity.body}</p><OperatorComparisonTable title="Identity operators" rows={identity.rows} /><Toggle id="identity-object-toggle" labelText="Object relationship" labelA="Separate objects" labelB="Same object" toggled={sameObject} onToggle={setSameObject} /><Tile aria-live="polite"><code>field_a is field_b</code><strong>{sameObject ? "True" : "False"}</strong><p>{identity.note}</p></Tile></div><div id="membership-operators"><h3>{membership.title}</h3><p>{membership.body}</p><OperatorComparisonTable title="Membership operators" rows={membership.rows} /><TextInput id="crop-membership-search" labelText="Crop to find" value={search} onChange={(event) => setSearch(event.currentTarget.value)} /><Tile aria-live="polite"><code>{JSON.stringify(search)} in {JSON.stringify(crops)}</code><strong>{crops.includes(search) ? "True" : "False"}</strong></Tile></div></div></section>;
}

export function BitwiseExplorer({ content }: { content: OperatorLessonDevelopmentPack["bitwise"] }) {
  const [operator, setOperator] = useState("&");
  const [left, setLeft] = useState("5");
  const [right, setRight] = useState("3");
  const a = Number.parseInt(left, 10) || 0; const b = Number.parseInt(right, 10) || 0;
  const result = operator === "&" ? a & b : operator === "|" ? a | b : a ^ b;
  const binary = (value: number) => (value >>> 0).toString(2).padStart(4, "0");
  return <section id="bitwise-operators" className="lesson-card bitwise-explorer" aria-labelledby="bitwise-operators-title"><p className="lesson-section-label"><Flow size={16} /> Bitwise introduction</p><h2 id="bitwise-operators-title">{content.title}</h2><p>{content.body}</p><OperatorComparisonTable title="Bitwise operator reference" rows={content.rows} /><div className="bitwise-controls"><TextInput id="bitwise-left" labelText="Integer A" inputMode="numeric" value={left} onChange={(event) => setLeft(event.currentTarget.value)} /><div className="bitwise-operator-tabs">{["&", "|", "^"].map((item) => <Button key={item} size="sm" kind={operator === item ? "primary" : "ghost"} onClick={() => setOperator(item)}>{item}</Button>)}</div><TextInput id="bitwise-right" labelText="Integer B" inputMode="numeric" value={right} onChange={(event) => setRight(event.currentTarget.value)} /></div><div className="binary-visual" aria-live="polite"><code>{binary(a)}</code><strong>{operator}</strong><code>{binary(b)}</code><ArrowRight size={20} /><code>{binary(result)}</code><Tag type="purple">{result}</Tag></div><Tile className="bitwise-note"><p>{content.note}</p></Tile></section>;
}

export function ExpressionVisualizer({ expressions, title = "Expression Visualizer" }: { expressions: ExpressionVisualizationContent[]; title?: string }) {
  const titleId = useId();
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState(0);
  const active = expressions[selected];
  function selectExpression(index: number) { setSelected(index); setStep(0); }
  return <section className="expression-visualizer" aria-labelledby={titleId}><div><Flow size={20} /><h3 id={titleId}>{title}</h3><Tag size="sm" type="purple">precedence</Tag></div><div className="expression-selector">{expressions.map((expression, index) => <Button key={expression.title} size="sm" kind={selected === index ? "tertiary" : "ghost"} onClick={() => selectExpression(index)}>{expression.title}</Button>)}</div><div className="expression-stage" aria-live="polite"><span>Original expression</span><code>{active.expression}</code><ArrowRight size={22} /><span>Evaluation step {step + 1}</span><code>{active.steps[step].expression}</code><p>{active.steps[step].explanation}</p><div>{active.steps.map((item, index) => <Button key={`${item.expression}-${index}`} size="sm" kind={step === index ? "primary" : "ghost"} aria-label={`Show evaluation step ${index + 1}`} onClick={() => setStep(index)}>{index + 1}</Button>)}</div><Tile><span>Final output</span><strong>{active.result}</strong></Tile></div></section>;
}

export function OperatorPrecedenceVisualizer({ content }: { content: OperatorLessonDevelopmentPack["precedence"] }) {
  return <section id="operator-precedence" className="lesson-card operator-precedence-card" aria-labelledby="operator-precedence-title"><p className="lesson-section-label"><Flow size={16} /> Operator precedence</p><h2 id="operator-precedence-title">{content.title}</h2><p>{content.body}</p><ol className="precedence-levels">{content.levels.map((level, index) => <li key={level}><span>{String(index + 1).padStart(2, "0")}</span><strong>{level}</strong></li>)}</ol><ExpressionVisualizer expressions={content.examples} title="Precedence Visualizer" /></section>;
}

export function OperatorPlayground({ content, arithmetic, comparison, expressions, activities }: { content: PlaygroundContent; arithmetic: OperatorRow[]; comparison: OperatorRow[]; expressions: ExpressionVisualizationContent[]; activities: string[] }) {
  return <CodePlayground id="playground" content={content} className="operator-playground" traceExecution renderSupplement={(code, execution) => <OperatorPlaygroundSupplement code={code} execution={execution} arithmetic={arithmetic} comparison={comparison} expressions={expressions} activities={activities} />} />;
}

function OperatorPlaygroundSupplement({ code, execution, arithmetic, comparison, expressions, activities }: { code: string; execution: PlaygroundExecution; arithmetic: OperatorRow[]; comparison: OperatorRow[]; expressions: ExpressionVisualizationContent[]; activities: string[] }) {
  const variables = useMemo(() => inspectPythonVariables(code), [code]);
  return <><div className="operator-learning-panels"><div><OperatorExplorer arithmetic={arithmetic} comparison={comparison} /><VariableExplorer variables={variables} /></div><div><ExpressionVisualizer expressions={expressions} /><CodeTracePanel key={`${execution.status}-${execution.trace.length}-${execution.output}`} execution={execution} /></div></div><Tile className="operator-playground-activities"><p className="lesson-section-label"><CheckmarkOutline size={16} /> Operator experiments</p><ol>{activities.map((activity) => <li key={activity}>{activity}</li>)}</ol></Tile></>;
}
