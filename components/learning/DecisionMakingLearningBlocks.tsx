import { Button, CodeSnippet, Slider, Tag, TextInput, Tile, Toggle } from "@carbon/react";
import { AgricultureAnalytics, ArrowDown, ArrowRight, ArrowUp, CheckmarkOutline, DecisionTree, Flow, Renew, TrashCan } from "@carbon/icons-react";
import { useState } from "react";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { DecisionMakingLessonDevelopmentPack, FlowchartNodeContent, FlowchartSymbolType } from "@/types/content";

function evaluateComparison(left: number, operator: string, right: number) {
  if (operator === ">") return left > right;
  if (operator === "<") return left < right;
  if (operator === ">=") return left >= right;
  if (operator === "<=") return left <= right;
  if (operator === "==") return left === right;
  return left !== right;
}

export function DecisionStoryCard({ content }: { content: DecisionMakingLessonDevelopmentPack["story"] }) {
  return <><section id="decision-story" className="lesson-card decision-story-card" aria-labelledby="decision-story-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Smart Farm Automation story</p><h2 id="decision-story-title">{content.title}</h2><p>{content.body}</p><div className="decision-story-readings">{content.readings.map((reading) => <Tile key={reading.label}><span>{reading.label}</span><strong>{reading.value}</strong></Tile>)}</div><Tile className="decision-story-question"><strong>{content.question}</strong><p>{content.answer}</p></Tile></section><WorkflowAnimation id="decision-story-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function WhyDecisionMakingCard({ content }: { content: DecisionMakingLessonDevelopmentPack["whyDecisions"] }) {
  const [selected, setSelected] = useState(0);
  const active = content.examples[selected];
  return <section id="why-decisions" className="lesson-card why-decisions-card" aria-labelledby="why-decisions-title"><p className="lesson-section-label"><DecisionTree size={16} /> Why decisions?</p><h2 id="why-decisions-title">{content.title}</h2><p>{content.body}</p><div className="decision-example-tabs">{content.examples.map((example, index) => <Button key={example.title} size="sm" kind={selected === index ? "primary" : "ghost"} onClick={() => setSelected(index)}>{example.title}</Button>)}</div><Tile aria-live="polite"><Tag type={active.decisionRequired ? "purple" : "gray"}>{active.decisionRequired ? "Decision required" : "Sequential calculation"}</Tag><h3>{active.question}</h3>{active.condition ? <><span>Condition</span><code>{active.condition}</code></> : <p>The same calculation runs every time.</p>}</Tile></section>;
}

export function ExecutionComparison({ content }: { content: DecisionMakingLessonDevelopmentPack["executionComparison"] }) {
  const [conditional, setConditional] = useState(false);
  return <section id="execution-comparison" className="lesson-card execution-comparison" aria-labelledby="execution-comparison-title"><div className="lesson-card-heading"><div><p className="lesson-section-label"><Flow size={16} /> Sequential vs conditional</p><h2 id="execution-comparison-title">{content.title}</h2><p>{content.body}</p></div><Toggle id="execution-mode" labelText="Execution mode" labelA="Sequential" labelB="Conditional" toggled={conditional} onToggle={setConditional} /></div>{conditional ? <DecisionTreeViewer nodes={content.conditional} result /> : <ol className="sequential-flow">{content.sequential.map((step, index) => <li key={step.title}><span>{index + 1}</span><div><strong>{step.title}</strong><p>{step.description}</p></div>{index < content.sequential.length - 1 && <ArrowDown size={20} />}</li>)}</ol>}</section>;
}

export function ConditionEvaluator({ content }: { content: DecisionMakingLessonDevelopmentPack["conditions"] }) {
  const [expression, setExpression] = useState(content.examples[0].expression);
  const [values, setValues] = useState<Record<string, number>>(() => Object.fromEntries(content.variableDefaults.map((variable) => [variable.name, variable.value])));
  const parsed = expression.trim().match(/^([A-Za-z_]\w*)\s*(>=|<=|==|!=|>|<)\s*([A-Za-z_]\w*|-?\d+(?:\.\d+)?)$/);
  const leftName = parsed?.[1];
  const operator = parsed?.[2];
  const rightToken = parsed?.[3];
  const left = leftName ? values[leftName] : undefined;
  const right = rightToken ? /^-?\d/.test(rightToken) ? Number(rightToken) : values[rightToken] : undefined;
  const valid = left !== undefined && right !== undefined && Boolean(operator);
  const result = valid ? evaluateComparison(left, operator!, right) : null;
  const explanation = valid ? `${leftName} is ${left}; ${rightToken} is ${right}. The ${operator} comparison is ${result ? "True" : "False"}.` : "Use a known variable, one comparison operator, and a number or known variable.";
  return <section id="condition-evaluator" className="lesson-card condition-evaluator" aria-labelledby="condition-evaluator-title"><p className="lesson-section-label"><DecisionTree size={16} /> Condition Evaluator</p><h2 id="condition-evaluator-title">{content.title}</h2><p>{content.body}</p><div className="condition-presets">{content.examples.map((example) => <Button key={example.expression} size="sm" kind={expression === example.expression ? "primary" : "ghost"} onClick={() => setExpression(example.expression)}>{example.expression}</Button>)}</div><div className="condition-variable-grid">{content.variableDefaults.map((variable) => <TextInput key={variable.name} id={`condition-${variable.name}`} labelText={variable.label} inputMode="decimal" value={String(values[variable.name])} onChange={(event) => setValues((current) => ({ ...current, [variable.name]: Number(event.currentTarget.value) }))} />)}</div><TextInput id="condition-expression" labelText="Condition expression" helperText="Supported operators: >, <, >=, <=, ==, !=" value={expression} onChange={(event) => setExpression(event.currentTarget.value)} invalid={!parsed || !valid} invalidText="Enter a comparison using the available variables." /><div className="condition-result" aria-live="polite"><div><span>Expression</span><code>{expression || "—"}</code></div><ArrowRight size={24} /><Tile><span>Evaluated result</span><strong>{result === null ? "?" : result ? "True" : "False"}</strong><Tag type={result === null ? "gray" : result ? "green" : "red"}>{result === null ? "Incomplete" : "bool"}</Tag></Tile></div><p className="condition-explanation">{explanation}</p></section>;
}

export function BooleanReviewCard({ content }: { content: DecisionMakingLessonDevelopmentPack["booleanReview"] }) {
  const [selected, setSelected] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const active = content.expressions[selected];
  function choose(index: number) { setSelected(index); setRevealed(false); }
  return <><section id="boolean-review" className="lesson-card boolean-review-card" aria-labelledby="boolean-review-title"><p className="lesson-section-label"><CheckmarkOutline size={16} /> Boolean review</p><h2 id="boolean-review-title">{content.title}</h2><p>{content.body}</p><div className="boolean-expression-tabs">{content.expressions.map((item, index) => <Button key={item.expression} size="sm" kind={selected === index ? "primary" : "ghost"} onClick={() => choose(index)}>{item.expression}</Button>)}</div><div className="boolean-prediction"><CodeSnippet type="single" feedback="Copied">{active.expression}</CodeSnippet><ArrowRight size={24} /><Tile aria-live="polite"><span>Result</span><strong>{revealed ? active.result ? "True" : "False" : "?"}</strong><p>{revealed ? active.explanation : "Predict before revealing."}</p></Tile></div><Button kind="tertiary" size="sm" onClick={() => setRevealed(true)} disabled={revealed}>Reveal Boolean result</Button></section><WorkflowAnimation id="boolean-workflow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} /></>;
}

export function ControlFlowAnimator({ content }: { content: DecisionMakingLessonDevelopmentPack["controlFlow"] }) {
  const [decisionMode, setDecisionMode] = useState(true);
  const [result, setResult] = useState(true);
  return <section id="control-flow" className="lesson-card control-flow-animator" aria-labelledby="control-flow-title"><div className="lesson-card-heading"><div><p className="lesson-section-label"><Flow size={16} /> Control Flow Animator</p><h2 id="control-flow-title">{content.title}</h2><p>{content.body}</p></div><Toggle id="control-flow-mode" labelText="Flow mode" labelA="Top to bottom" labelB="Decision" toggled={decisionMode} onToggle={setDecisionMode} /></div>{decisionMode ? <><Toggle id="control-flow-result" labelText="Condition result" labelA="False" labelB="True" toggled={result} onToggle={setResult} /><DecisionTreeViewer nodes={content.decisionTree} result={result} /></> : <ol className="control-flow-sequence">{content.sequential.map((step, index) => <li key={step.title}><span>{index + 1}</span><strong>{step.title}</strong><p>{step.description}</p></li>)}</ol>}</section>;
}

export function DecisionTreeViewer({ nodes, result }: { nodes: FlowchartNodeContent[]; result: boolean }) {
  const branchIndexes = nodes.map((node, index) => node.branch ? index : -1).filter((index) => index >= 0);
  const firstBranch = branchIndexes.length ? Math.min(...branchIndexes) : nodes.length;
  const lastBranch = branchIndexes.length ? Math.max(...branchIndexes) : -1;
  const trunk = nodes.filter((node, index) => !node.branch && index < firstBranch);
  const footer = nodes.filter((node, index) => !node.branch && index > lastBranch);
  return <div className="decision-tree-viewer" aria-label={`Decision path for a ${result ? "True" : "False"} condition`}><div className="decision-tree-trunk">{trunk.map((node, index) => <div key={node.id} className={`flow-node flow-node--${node.type}`}><span>{node.label}</span>{index < trunk.length - 1 && <ArrowDown size={20} />}</div>)}</div><div className="decision-tree-branches"><div className={result ? "is-active" : ""}><Tag type="green">Yes · True</Tag>{nodes.filter((node) => node.branch === "yes").map((node) => <div key={node.id} className={`flow-node flow-node--${node.type}`}>{node.label}</div>)}</div><div className={!result ? "is-active" : ""}><Tag type="red">No · False</Tag>{nodes.filter((node) => node.branch === "no").map((node) => <div key={node.id} className={`flow-node flow-node--${node.type}`}>{node.label}</div>)}</div></div>{footer.length > 0 && <div className="decision-tree-footer"><ArrowDown size={20} />{footer.map((node) => <div key={node.id} className={`flow-node flow-node--${node.type}`}>{node.label}</div>)}</div>}</div>;
}

export function FlowchartViewer({ id = "flowchart-viewer", title, description, nodes, result = true }: { id?: string; title: string; description: string; nodes: FlowchartNodeContent[]; result?: boolean }) {
  return <section id={id} className="flowchart-viewer lesson-card" aria-labelledby={`${id}-title`}><p className="lesson-section-label"><Flow size={16} /> Flowchart Viewer</p><h2 id={`${id}-title`}>{title}</h2><p>{description}</p><DecisionTreeViewer nodes={nodes} result={result} /></section>;
}

export function FlowchartSymbolGuide({ content }: { content: DecisionMakingLessonDevelopmentPack["flowcharts"] }) {
  return <section id="flowchart-symbols" className="lesson-card flowchart-symbol-guide" aria-labelledby="flowchart-symbols-title"><p className="lesson-section-label"><Flow size={16} /> Flowchart introduction</p><h2 id="flowchart-symbols-title">{content.title}</h2><p>{content.body}</p><div className="flowchart-symbol-grid">{content.symbols.map((symbol) => <Tile key={symbol.type}><div className={`flow-symbol flow-symbol--${symbol.type}`}>{symbol.name}</div><strong>{symbol.meaning}</strong></Tile>)}</div></section>;
}

export function FlowchartBuilder({ content }: { content: DecisionMakingLessonDevelopmentPack["flowcharts"] }) {
  const [nodes, setNodes] = useState<FlowchartNodeContent[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const targetTypes = content.builderTarget.map((node) => node.type);
  const valid = nodes.length === targetTypes.length && nodes.every((node, index) => node.type === targetTypes[index]);
  function addNode(type: FlowchartSymbolType) {
    const usedIds = new Set(nodes.map((node) => node.id));
    const target = content.builderTarget.find((node) => node.type === type && !usedIds.has(node.id));
    if (target) setNodes((current) => [...current, target]);
  }
  function move(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= nodes.length) return;
    setNodes((current) => { const copy = [...current]; [copy[index], copy[next]] = [copy[next], copy[index]]; return copy; });
  }
  function drop(targetIndex: number) {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    setNodes((current) => { const copy = [...current]; const [item] = copy.splice(draggedIndex, 1); copy.splice(targetIndex, 0, item); return copy; });
    setDraggedIndex(null);
  }
  return <section id="flowchart-builder" className="lesson-card flowchart-builder" aria-labelledby="flowchart-builder-title"><div className="lesson-card-heading"><div><p className="lesson-section-label"><Flow size={16} /> Flowchart Builder</p><h2 id="flowchart-builder-title">Build the Smart Water Tank logic</h2><p>Add or drag symbols into this order: Start → Read Water Level → Decision → Choose Motor Action → Display Action → End. Connecting arrows are generated automatically.</p></div><Button kind="ghost" size="sm" renderIcon={Renew} onClick={() => setNodes([])} disabled={!nodes.length}>Reset</Button></div><div className="flowchart-toolbox" aria-label="Flowchart symbol toolbox">{content.symbols.map((symbol) => <Button key={symbol.type} size="sm" kind="tertiary" onClick={() => addNode(symbol.type)} disabled={!content.builderTarget.some((node) => node.type === symbol.type && !nodes.some((placed) => placed.id === node.id))}>Add {symbol.meaning}</Button>)}</div><ol className="flowchart-canvas">{nodes.length ? nodes.map((node, index) => <li key={node.id} draggable onDragStart={() => setDraggedIndex(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => drop(index)}><div className={`flow-node flow-node--${node.type}`}><span>{node.label}</span></div><div className="flowchart-node-actions"><Button hasIconOnly iconDescription="Move step up" size="sm" kind="ghost" renderIcon={ArrowUp} onClick={() => move(index, -1)} disabled={index === 0} /><Button hasIconOnly iconDescription="Move step down" size="sm" kind="ghost" renderIcon={ArrowDown} onClick={() => move(index, 1)} disabled={index === nodes.length - 1} /><Button hasIconOnly iconDescription="Remove step" size="sm" kind="ghost" renderIcon={TrashCan} onClick={() => setNodes((current) => current.filter((item) => item.id !== node.id))} /></div>{index < nodes.length - 1 && <ArrowDown size={22} />}</li>) : <li className="flowchart-empty">Add a Start / End symbol to begin.</li>}</ol><Tile className={`flowchart-validation${valid ? " is-valid" : ""}`} aria-live="polite"><strong>{valid ? "Valid simple flowchart" : "Flowchart incomplete"}</strong><p>{valid ? "The symbols follow the required logical order. Review each label and the automatic arrows." : `${nodes.length} of ${targetTypes.length} required steps placed. Order and symbol type are both checked.`}</p></Tile></section>;
}

export function AgritechDecisionCase({ content }: { content: DecisionMakingLessonDevelopmentPack["agritechCase"] }) {
  const result = content.moisture < content.threshold;
  return <section id="agritech-case" className="lesson-card agritech-decision-case" aria-labelledby="agritech-case-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Agritech case study</p><h2 id="agritech-case-title">{content.title}</h2><p>{content.body}</p><div className="agritech-condition"><Tile><span>Soil moisture</span><strong>{content.moisture}%</strong></Tile><span>&lt;</span><Tile><span>Threshold</span><strong>{content.threshold}%</strong></Tile><ArrowRight size={24} /><Tile><span>Result</span><strong>{result ? "True" : "False"}</strong></Tile></div><DecisionTreeViewer nodes={content.tree} result={result} /></section>;
}

export function InteractiveFlowSimulator({ content }: { content: DecisionMakingLessonDevelopmentPack["simulator"] }) {
  const [soil, setSoil] = useState(content.defaults.soilMoisture);
  const [temperature, setTemperature] = useState(content.defaults.temperature);
  const [rainfall, setRainfall] = useState(content.defaults.rainfall);
  const soilLow = soil < content.thresholds.soilMoisture;
  const temperatureHigh = temperature > content.thresholds.temperature;
  const rainfallLow = rainfall < content.thresholds.rainfall;
  const result = soilLow && temperatureHigh && rainfallLow;
  return <section id="flow-simulator" className="lesson-card interactive-flow-simulator" aria-labelledby="flow-simulator-title"><p className="lesson-section-label"><AgricultureAnalytics size={16} /> Interactive Flow Simulator</p><h2 id="flow-simulator-title">{content.title}</h2><p>{content.body}</p><div className="flow-simulator-controls"><Slider id="simulator-soil" labelText="Soil Moisture (%)" min={0} max={100} value={soil} onChange={({ value }) => setSoil(Number(value))} /><Slider id="simulator-temperature" labelText="Temperature (°C)" min={0} max={50} value={temperature} onChange={({ value }) => setTemperature(Number(value))} /><Slider id="simulator-rainfall" labelText="Rainfall (mm)" min={0} max={150} value={rainfall} onChange={({ value }) => setRainfall(Number(value))} /></div><div className="flow-simulator-expression"><span>Condition</span><code>soil_moisture &lt; {content.thresholds.soilMoisture} and temperature &gt; {content.thresholds.temperature} and rainfall &lt; {content.thresholds.rainfall}</code><strong>{result ? "True" : "False"}</strong></div><div className="flow-simulator-signals"><Tile className={soilLow ? "is-true" : "is-false"}><span>Soil low?</span><strong>{soilLow ? "True" : "False"}</strong></Tile><Tile className={temperatureHigh ? "is-true" : "is-false"}><span>Temperature high?</span><strong>{temperatureHigh ? "True" : "False"}</strong></Tile><Tile className={rainfallLow ? "is-true" : "is-false"}><span>Rainfall low?</span><strong>{rainfallLow ? "True" : "False"}</strong></Tile></div><div className={`motor-action ${result ? "is-on" : "is-off"}`} aria-live="polite"><span>Selected path</span><strong>{result ? "MOTOR ON" : "MOTOR OFF"}</strong><p>{result ? "All three irrigation conditions are True." : "At least one required condition is False."}</p></div></section>;
}

export function RealLifeDecisionCards({ scenarios }: { scenarios: DecisionMakingLessonDevelopmentPack["realLifeScenarios"] }) {
  const [selected, setSelected] = useState(0);
  const active = scenarios[selected];
  return <section id="real-life-examples" className="lesson-card real-life-decisions" aria-labelledby="real-life-examples-title"><p className="lesson-section-label"><DecisionTree size={16} /> Real-life decisions</p><h2 id="real-life-examples-title">The same logic appears across industries</h2><div className="real-life-tabs">{scenarios.map((scenario, index) => <Button key={scenario.title} size="sm" kind={selected === index ? "primary" : "ghost"} onClick={() => setSelected(index)}>{scenario.title}</Button>)}</div><Tile aria-live="polite"><h3>{active.question}</h3><div>{active.checks.map((check) => <Tag key={check} type="blue">{check}</Tag>)}</div><div className="real-life-outcomes"><span>Yes → <strong>{active.yesAction}</strong></span><span>No → <strong>{active.noAction}</strong></span></div></Tile></section>;
}

export function ScenarioDecisionCard({ scenarios }: { scenarios: DecisionMakingLessonDevelopmentPack["scenarioPractice"] }) {
  const [selected, setSelected] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const active = scenarios[selected];
  const correct = answer === active.requiresDecision;
  function next() { setSelected((current) => (current + 1) % scenarios.length); setAnswer(null); }
  return <section id="scenario-practice" className="lesson-card scenario-decision-card" aria-labelledby="scenario-practice-title"><p className="lesson-section-label"><DecisionTree size={16} /> Scenario practice</p><h2 id="scenario-practice-title">Does this scenario require a decision?</h2><Tile><Tag type="gray">Scenario {selected + 1} of {scenarios.length}</Tag><h3>{active.scenario}</h3><div><Button kind={answer === false ? "primary" : "tertiary"} onClick={() => setAnswer(false)}>Sequential</Button><Button kind={answer === true ? "primary" : "tertiary"} onClick={() => setAnswer(true)}>Decision required</Button></div>{answer !== null && <div className={`scenario-feedback ${correct ? "is-correct" : "is-review"}`} aria-live="polite"><strong>{correct ? "Correct" : "Review your reasoning"}</strong><p>{active.explanation}</p><Button size="sm" kind="ghost" renderIcon={ArrowRight} onClick={next}>Next scenario</Button></div>}</Tile></section>;
}
