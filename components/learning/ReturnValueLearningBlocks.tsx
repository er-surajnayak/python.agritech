import { useEffect, useState } from "react";
import { Button, CodeSnippet, Tag, Tile } from "@carbon/react";
import { ArrowRight, CheckmarkOutline, DataConnected, FunctionMath, Play, Restart, Task, UserData } from "@carbon/icons-react";
import { CallStackPreview, FunctionDebugChallenges } from "@/components/learning/FunctionDefinitionLearningBlocks";
import { FunctionEvolutionPanel } from "@/components/learning/FunctionParameterLearningBlocks";
import { CodeTracePanel } from "@/components/learning/CodeTracePanel";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";
import type { ReturnValuesLessonDevelopmentPack } from "@/types/content";

export { FunctionDebugChallenges, FunctionEvolutionPanel };

export function FunctionLifecyclePanel({ content }: { content: ReturnValuesLessonDevelopmentPack["lifecycle"] }) {
  return <section id="function-lifecycle" className="lesson-card function-lifecycle-panel" aria-labelledby="function-lifecycle-title"><p className="lesson-section-label"><DataConnected size={16}/> Persistent mental model</p><h2 id="function-lifecycle-title">{content.title}</h2><p>{content.body}</p><ol>{content.steps.map((step,index)=><li key={step.title} className={step.title===content.activeStep?"is-active":index<4?"is-complete":""}><span>{index+1}</span><strong>{step.title}</strong><small>{step.description}</small></li>)}</ol></section>;
}

export function ReturnStory({ content }: { content: ReturnValuesLessonDevelopmentPack["story"] }) {
  return <section id="story" className="lesson-card return-story" aria-labelledby="return-story-title"><p className="lesson-section-label"><FunctionMath size={16}/> Story continuation</p><h2 id="return-story-title">{content.title}</h2><p>{content.body}</p><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><div className="return-story-flow">{content.flow.map((step,index)=><div key={step.title}><Tile><strong>{step.title}</strong><span>{step.description}</span></Tile>{index<content.flow.length-1&&<ArrowRight/>}</div>)}</div><div className="return-consumers">{content.consumers.map((consumer)=><Tile key={consumer}><UserData size={18}/><strong>{consumer}</strong><span>Needs reusable data</span></Tile>)}</div></section>;
}

export function PrintProblemCard({ content }: { content: ReturnValuesLessonDevelopmentPack["printProblem"] }) {
  return <section id="print-problem" className="lesson-card print-problem-card" aria-labelledby="print-problem-title"><p className="lesson-section-label"><DataConnected size={16}/> The problem with print()</p><h2 id="print-problem-title">{content.title}</h2><p>{content.explanation}</p><div className="print-problem-grid"><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><div><Tile><span>Console output</span><pre><code>{content.output}</code></pre></Tile><Tile className="is-none"><span>Variable inspector</span><code>{content.assignedVariable} = {content.assignedValue}</code><Tag type="red">NoneType</Tag></Tile></div></div></section>;
}

export function ReturnConceptCard({ content }: { content: ReturnValuesLessonDevelopmentPack["definition"] }) {
  return <section id="return-concept" className="lesson-card return-concept-card" aria-labelledby="return-concept-title"><p className="lesson-section-label"><FunctionMath size={16}/> What is return?</p><h2 id="return-concept-title">{content.title}</h2><p>{content.body}</p><h3>{content.analogy.title}</h3><div className="return-analogy-flow">{content.analogy.steps.map((step,index)=><div key={step.title}><Tile><strong>{step.title}</strong><span>{step.description}</span></Tile>{index<content.analogy.steps.length-1&&<ArrowRight/>}</div>)}</div></section>;
}

export function FirstReturnCard({ content }: { content: ReturnValuesLessonDevelopmentPack["firstReturn"] }) {
  return <section id="first-return" className="lesson-card first-return-card" aria-labelledby="first-return-title"><p className="lesson-section-label"><FunctionMath size={16}/> First return function</p><h2 id="first-return-title">{content.title}</h2><p>{content.explanation}</p><div className="first-return-grid"><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><div><Tile><span>Function call</span><code>{content.call}</code></Tile><ArrowRight/><Tile><span>Returned value</span><strong>{content.returnedValue}</strong></Tile><ArrowRight/><Tile><span>Receiving variable</span><code>{content.receivingVariable} = {content.returnedValue}</code></Tile></div></div></section>;
}

export function ReturnFlowVisualizer({ content }: { content: ReturnValuesLessonDevelopmentPack["returnFlow"] }) {
  const [activeStep,setActiveStep]=useState(0); const [playing,setPlaying]=useState(false);
  useEffect(()=>{if(!playing||activeStep>=content.steps.length-1)return;const timer=window.setTimeout(()=>{const next=activeStep+1;setActiveStep(next);if(next>=content.steps.length-1)setPlaying(false);},650);return()=>window.clearTimeout(timer);},[activeStep,content.steps.length,playing]);
  return <section id="return-flow" className="lesson-card return-flow-visualizer" aria-labelledby="return-flow-title"><p className="lesson-section-label"><Play size={16}/> Return flow visualizer</p><h2 id="return-flow-title">{content.title}</h2><p>{content.body}</p><div className="return-flow-equation"><code>{content.receivingVariable} = {content.functionName}({content.argument})</code><ArrowRight/><code>{content.receivingVariable} = {content.returnedValue}</code></div><ol>{content.steps.map((step,index)=><li key={step.title} className={index===activeStep?"is-active":index<activeStep?"is-complete":""}><span>{index+1}</span><strong>{step.title}</strong><small>{step.description}</small></li>)}</ol><div className="return-flow-controls"><Button size="sm" kind="secondary" disabled={activeStep===0||playing} onClick={()=>setActiveStep((step)=>step-1)}>Previous</Button><Button size="sm" renderIcon={activeStep===content.steps.length-1?Restart:Play} onClick={()=>{if(activeStep===content.steps.length-1)setActiveStep(0);else setPlaying(true);}}>{activeStep===content.steps.length-1?"Replay":"Play flow"}</Button><Button size="sm" kind="tertiary" disabled={activeStep===content.steps.length-1||playing} onClick={()=>setActiveStep((step)=>step+1)}>Next</Button></div><p aria-live="polite">Step {activeStep+1} of {content.steps.length}: {content.steps[activeStep].title}</p></section>;
}

export function PrintReturnComparator({ content }: { content: ReturnValuesLessonDevelopmentPack["comparator"] }) {
  const [selected,setSelected]=useState<"print"|"return">("return"); const panels=[{id:"print" as const,label:"Using print()",code:content.printCode,console:content.printConsole,value:content.printVariable,reusable:false},{id:"return" as const,label:"Using return",code:content.returnCode,console:content.returnConsole,value:content.returnVariable,reusable:true}];
  return <section id="print-vs-return" className="lesson-card print-return-comparator" aria-labelledby="print-return-title"><p className="lesson-section-label"><DataConnected size={16}/> Print vs return comparator</p><h2 id="print-return-title">{content.title}</h2><p>{content.body}</p><div className="print-return-tabs" role="tablist" aria-label="Execution comparison">{panels.map((panel)=><Button role="tab" aria-selected={selected===panel.id} key={panel.id} size="sm" kind={selected===panel.id?"primary":"tertiary"} onClick={()=>setSelected(panel.id)}>{panel.label}</Button>)}</div><div className="print-return-grid">{panels.map((panel)=><article key={panel.id} className={selected===panel.id?"is-selected":""}><h3>{panel.label}</h3><CodeSnippet type="multi" feedback="Copied">{panel.code}</CodeSnippet><div><Tile><span>Console</span><pre><code>{panel.console}</code></pre></Tile><Tile><span>value contains</span><code>{panel.value}</code><Tag type={panel.reusable?"green":"red"}>{panel.reusable?"Reusable":"Not reusable"}</Tag></Tile></div></article>)}</div></section>;
}

export function ValuePropagationExplorer({ content }: { content: ReturnValuesLessonDevelopmentPack["propagation"] }) {
  const [active,setActive]=useState(0); return <section id="value-propagation" className="lesson-card value-propagation" aria-labelledby="value-propagation-title"><p className="lesson-section-label"><DataConnected size={16}/> Value propagation explorer</p><h2 id="value-propagation-title">{content.title}</h2><p>{content.body}</p><div className="propagation-source"><code>{content.source}</code><ArrowRight/><Tag type="purple">returns {content.returnedValue}</Tag><ArrowRight/><code>{content.receivingVariable} = {content.returnedValue}</code></div><div className="propagation-consumers" role="tablist" aria-label="Returned value consumers">{content.consumers.map((consumer,index)=><button role="tab" aria-selected={index===active} key={consumer.title} type="button" className={index===active?"is-active":""} onClick={()=>setActive(index)}><strong>{consumer.title}</strong><span>{consumer.use}</span><code>{content.receivingVariable}</code></button>)}</div><p aria-live="polite">{content.consumers[active].title} receives the stored value {content.returnedValue}: {content.consumers[active].use}.</p></section>;
}

export function ReturnTypesPanel({ content }: { content: ReturnValuesLessonDevelopmentPack["returnTypes"] }) {
  return <section id="return-types" className="lesson-card return-types-panel" aria-labelledby="return-types-title"><p className="lesson-section-label"><UserData size={16}/> Returning different value types</p><h2 id="return-types-title">A function can return several kinds of value</h2><p>Numbers, text, and Boolean results can all travel back to the caller. Collections and objects arrive in later lessons.</p><div>{content.map((item)=><Tile key={item.type}><Tag type={item.type==="Number"?"blue":item.type==="String"?"purple":"teal"}>{item.type}</Tag><code>{item.code}</code><span>{item.example}</span></Tile>)}</div></section>;
}

export function ReturnEndsFunction({ content }: { content: ReturnValuesLessonDevelopmentPack["returnEnds"] }) {
  return <section id="return-ends" className="lesson-card return-ends-card" aria-labelledby="return-ends-title"><p className="lesson-section-label"><FunctionMath size={16}/> Return ends the function</p><h2 id="return-ends-title">{content.title}</h2><p>{content.explanation}</p><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><div className="return-end-steps">{content.steps.map((step,index)=><Tile key={step.title} className={index===2?"is-return":""}><span>{index+1}</span><strong>{step.title}</strong><small>{step.description}</small></Tile>)}</div><Tile className="unreachable-line"><Tag type="red">Not executed</Tag><code>{content.skippedLine}</code></Tile></section>;
}

export function ReturnOutputInspector({ execution }: { execution: PlaygroundExecution }) {
  const mainSteps=execution.trace.filter((step)=>step.frameName==="Main Program"); const latest=mainSteps.at(-1); const values=latest?.variables??[]; const preferred=values.find((variable)=>["water","result","value","status"].includes(variable.name))??values.at(-1);
  return <div className="return-output-inspector" aria-labelledby="return-output-title"><div><UserData size={18}/><h3 id="return-output-title">Function Output Inspector</h3><Tag size="sm" type={preferred?"green":"gray"}>{preferred?"Result captured":"Waiting"}</Tag></div>{preferred?<div><Tile><span>Receiving variable</span><strong>{preferred.name}</strong></Tile><Tile><span>Current value</span><code>{preferred.value}</code></Tile><Tile><span>Returned data type</span><Tag type="blue">{preferred.type}</Tag></Tile><Tile><span>Next statement</span><code>{latest?.code.trim()||"Main program continues"}</code></Tile></div>:<p>Run code that stores a returned value to inspect the result in the main program.</p>}</div>;
}

export function ReturnPlaygroundSupplement({ execution }: { execution: PlaygroundExecution }) {
  const active=execution.trace.at(-1); return <div className="return-playground-supplement"><div><CallStackPreview stack={active?.callStack??["Main Program"]} activeFrame={active?.frameName}/><ReturnOutputInspector execution={execution}/></div><CodeTracePanel execution={execution}/></div>;
}

export function ReturnComparison({ content }: { content: ReturnValuesLessonDevelopmentPack["comparison"] }) {
  return <section id="compare-choose" className="lesson-card return-comparison" aria-labelledby="return-comparison-title"><p className="lesson-section-label"><DataConnected size={16}/> Compare & choose</p><h2 id="return-comparison-title">{content.title}</h2><p>{content.body}</p><div tabIndex={0} role="region" aria-label="Print and return comparison"><table><thead><tr><th>Feature</th><th>print()</th><th>return</th></tr></thead><tbody>{content.rows.map((row)=><tr key={row.feature}><th>{row.feature}</th><td>{row.print}</td><td>{row.returns}</td></tr>)}</tbody></table></div></section>;
}

export function ReturnMiniProject({ content }: { content: ReturnValuesLessonDevelopmentPack["miniProject"] }) {
  return <section id="mini-project" className="lesson-card return-mini-project" aria-labelledby="return-project-title"><p className="lesson-section-label"><Task size={16}/> Mini project</p><h2 id="return-project-title">{content.title}</h2><p>{content.brief}</p><CodeSnippet type="multi" feedback="Copied">{content.starterCode}</CodeSnippet><div className="return-project-checklist">{content.deliverables.map((item)=><Tile key={item}><CheckmarkOutline size={16}/><span>{item}</span></Tile>)}</div><Tile className="return-project-challenge"><strong>Challenge</strong><p>{content.challenge}</p></Tile></section>;
}
