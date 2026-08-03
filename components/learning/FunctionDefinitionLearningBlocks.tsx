import { useEffect, useState } from "react";
import { Accordion, AccordionItem, Button, CodeSnippet, Tag, Tile } from "@carbon/react";
import {
  ArrowRight,
  CheckmarkOutline,
  Code,
  Compare,
  FunctionMath,
  IbmCloudProjects,
  Play,
  Restart,
  StackLimitation,
  Task,
  Debug,
} from "@carbon/icons-react";
import { CodeTracePanel } from "@/components/learning/CodeTracePanel";
import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";
import type { FunctionDefinitionLessonDevelopmentPack } from "@/types/content";

export function FunctionDefinitionStory({ content }: { content: FunctionDefinitionLessonDevelopmentPack["story"] }) {
  return (
    <section id="story" className="lesson-card function-definition-story" aria-labelledby="function-story-title">
      <p className="lesson-section-label"><IbmCloudProjects size={16} /> Story continuation</p>
      <h2 id="function-story-title">{content.title}</h2><p>{content.body}</p>
      <div className="definition-story-transform"><div><Tag type="red">Repeated</Tag><CodeSnippet type="multi" feedback="Copied">{content.repeatedCode}</CodeSnippet></div><ArrowRight /><Tile><Tag type="green">Reusable</Tag><code>{content.conceptualCall}</code><span>One definition · Many calls</span></Tile></div>
      <div className="definition-story-consumers" aria-label="Function consumers">{content.consumers.map((consumer) => <Tile key={consumer}><span>{consumer}</span><ArrowRight /><code>{content.conceptualCall}</code></Tile>)}</div>
    </section>
  );
}

export function DefKeywordCard({ content }: { content: FunctionDefinitionLessonDevelopmentPack["definitionKeyword"] }) {
  return (
    <section id="def-keyword" className="lesson-card def-keyword-card" aria-labelledby="def-keyword-title">
      <p className="lesson-section-label"><FunctionMath size={16} /> New Python keyword</p>
      <h2 id="def-keyword-title">{content.title}</h2><p>{content.body}</p>
      <div className="def-keyword-visual"><code>{content.keyword}</code><ArrowRight /><Tile><strong>{content.meaning}</strong></Tile></div>
      <ol>{content.workflow.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{step.title}</strong><p>{step.description}</p></div></li>)}</ol>
    </section>
  );
}

export function FunctionAnatomyExplorer({ content }: { content: FunctionDefinitionLessonDevelopmentPack["anatomy"] }) {
  const [activeId, setActiveId] = useState(content.parts[0]?.id ?? "");
  const active = content.parts.find((part) => part.id === activeId) ?? content.parts[0];
  if (!active) return null;
  return (
    <section id="function-anatomy" className="lesson-card function-anatomy-explorer" aria-labelledby="function-anatomy-title">
      <p className="lesson-section-label"><Code size={16} /> Function anatomy explorer</p>
      <h2 id="function-anatomy-title">{content.title}</h2><p>{content.body}</p>
      <CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet>
      <div className="function-anatomy-parts" role="tablist" aria-label="Function anatomy">{content.parts.map((part) => <Button role="tab" aria-selected={part.id === active.id} key={part.id} size="sm" kind={part.id === active.id ? "primary" : "tertiary"} onClick={() => setActiveId(part.id)}><code>{part.token}</code><span>{part.label}</span></Button>)}</div>
      <Tile className="function-anatomy-detail" aria-live="polite"><Tag type="purple">{active.label}</Tag><code>{active.token}</code><p>{active.description}</p></Tile>
    </section>
  );
}

export function DefinitionCallComparator({ defining, calling, comparison }: { defining: FunctionDefinitionLessonDevelopmentPack["defining"]; calling: FunctionDefinitionLessonDevelopmentPack["calling"]; comparison: FunctionDefinitionLessonDevelopmentPack["comparison"] }) {
  return (
    <section id="definition-vs-call" className="lesson-card definition-call-comparator" aria-labelledby="definition-call-title">
      <p className="lesson-section-label"><Compare size={16} /> Definition vs call comparator</p>
      <h2 id="definition-call-title">{comparison.title}</h2><p>{comparison.body}</p>
      <div className="definition-call-grid"><div><Tag type="blue">Definition</Tag><h3>{defining.title}</h3><CodeSnippet type="multi" feedback="Copied">{defining.code}</CodeSnippet><Tile><strong>{defining.status}</strong><span>Output: {defining.output}</span></Tile></div><div><Tag type="green">Call</Tag><h3>{calling.title}</h3><CodeSnippet type="multi" feedback="Copied">{calling.code}</CodeSnippet><Tile><strong>{calling.call}</strong><span>Output: {calling.output}</span></Tile></div></div>
      <div className="definition-call-table" role="region" aria-label="Definition and call comparison" tabIndex={0}><table><thead><tr><th>Action</th><th>Code</th><th>Effect</th></tr></thead><tbody>{comparison.rows.map((row) => <tr key={row.action}><td>{row.action}</td><td><code>{row.code}</code></td><td>{row.effect}</td></tr>)}</tbody></table></div>
    </section>
  );
}

export function ReuseFunctionCard({ content }: { content: FunctionDefinitionLessonDevelopmentPack["multipleCalls"] }) {
  const [calls, setCalls] = useState(1);
  return (
    <section id="multiple-calls" className="lesson-card reuse-function-card" aria-labelledby="multiple-calls-title">
      <p className="lesson-section-label"><Restart size={16} /> Reuse a function</p><h2 id="multiple-calls-title">{content.title}</h2><p>{content.explanation}</p>
      <div className="reuse-call-controls" role="group" aria-label="Number of function calls">{Array.from({ length: content.callCount }, (_, index) => index + 1).map((count) => <Button key={count} size="sm" kind={calls === count ? "primary" : "tertiary"} onClick={() => setCalls(count)}>{count} {count === 1 ? "call" : "calls"}</Button>)}</div>
      <div className="reuse-call-grid"><Tile><span>Definition</span><code>greet()</code><p>Written once</p></Tile><div aria-label={`${calls} function calls`}>{Array.from({ length: calls }, (_, index) => <Tile key={index}><span>Call {index + 1}</span><code>greet()</code></Tile>)}</div><pre aria-live="polite"><code>{Array.from({ length: calls }, () => "Welcome to Smart Farm").join("\n")}</code></pre></div>
    </section>
  );
}

export function CallStackPreview({ stack, activeFrame }: { stack: string[]; activeFrame?: string }) {
  const frames = stack.length ? stack : ["Main Program"];
  return <div className="call-stack-preview" aria-label="Simplified call stack"><div><StackLimitation size={18} /><h3>Call Stack Preview</h3></div><ol>{[...frames].reverse().map((frame, index) => <li key={`${frame}-${index}`} className={frame === activeFrame || (!activeFrame && index === 0) ? "is-active" : ""}><span>{index === 0 ? "Active" : "Caller"}</span><code>{frame}</code></li>)}</ol></div>;
}

export function FunctionExecutionVisualizer({ content }: { content: FunctionDefinitionLessonDevelopmentPack["execution"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const active = content.steps[activeIndex];
  useEffect(() => {
    if (!playing) return;
    if (activeIndex >= content.steps.length - 1) return;
    const timer = window.setTimeout(() => {
      const nextIndex = activeIndex + 1;
      setActiveIndex(nextIndex);
      if (nextIndex >= content.steps.length - 1) setPlaying(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [activeIndex, content.steps.length, playing]);
  const codeLines = content.code.split("\n");
  const stack = active.frame === "Main Program" ? ["Main Program"] : ["Main Program", active.frame];
  return (
    <section id="execution-visualizer" className="lesson-card function-execution-visualizer" aria-labelledby="function-execution-title">
      <p className="lesson-section-label"><Play size={16} /> Function execution visualizer</p><h2 id="function-execution-title">{content.title}</h2><p>{content.body}</p>
      <div className="function-execution-layout"><ol className="function-code-lines" aria-label="Python source lines">{codeLines.map((line, index) => <li key={`${index}-${line}`} className={index + 1 === active.lineNumber ? "is-active" : ""}><span>{index + 1}</span><code>{line || " "}</code></li>)}</ol><div><CallStackPreview stack={stack} activeFrame={active.frame} /><Tile className="function-step-detail" aria-live="polite"><Tag type={active.frame === "Main Program" ? "blue" : "purple"}>{active.frame}</Tag><h3>{active.title}</h3><p>{active.description}</p>{active.output && <code>{active.output}</code>}</Tile></div></div>
      <div className="function-execution-controls"><Button size="sm" kind="secondary" disabled={activeIndex === 0 || playing} onClick={() => setActiveIndex((index) => index - 1)}>Previous</Button><Button size="sm" renderIcon={Play} disabled={playing} onClick={() => activeIndex === content.steps.length - 1 ? setActiveIndex(0) : setPlaying(true)}>{activeIndex === content.steps.length - 1 ? "Replay" : "Play execution"}</Button><Button size="sm" kind="tertiary" disabled={activeIndex === content.steps.length - 1 || playing} onClick={() => setActiveIndex((index) => index + 1)}>Next</Button></div>
      <p className="function-live-status" aria-live="polite">Step {activeIndex + 1} of {content.steps.length}: {active.title}</p>
    </section>
  );
}

export function FunctionLibraryPanel({ content }: { content: FunctionDefinitionLessonDevelopmentPack["functionLibrary"] }) {
  const [history, setHistory] = useState<Array<{ name: string; output: string }>>([]);
  return (
    <section id="function-library" className="lesson-card function-library-panel" aria-labelledby="function-library-title">
      <p className="lesson-section-label"><IbmCloudProjects size={16} /> Persistent function library</p><h2 id="function-library-title">{content.title}</h2><p>{content.body}</p>
      <div className="function-library-layout"><div className="function-library-list">{content.functions.map((item) => <Tile key={item.id}><FunctionMath size={20} /><code>{item.name}</code><p>{item.description}</p><Button size="sm" kind="tertiary" renderIcon={Play} onClick={() => setHistory((current) => [...current, { name: item.name, output: item.output }])}>Call function</Button></Tile>)}</div><div className="function-library-console" aria-live="polite"><div><span>Function call history</span><Button size="sm" kind="ghost" renderIcon={Restart} onClick={() => setHistory([])} disabled={!history.length}>Clear</Button></div>{history.length ? <ol>{history.map((item, index) => <li key={`${item.name}-${index}`}><code>{item.name}</code><span>{item.output}</span></li>)}</ol> : <p>Call a function to observe its output.</p>}</div></div>
    </section>
  );
}

export function FunctionPlaygroundSupplement({ execution }: { execution: PlaygroundExecution }) {
  const active = execution.trace.at(-1);
  return <div className="function-playground-supplement"><CallStackPreview stack={active?.callStack ?? ["Main Program"]} activeFrame={active?.frameName} /><CodeTracePanel execution={execution} /></div>;
}

export function SmartFarmModuleProject({ content }: { content: FunctionDefinitionLessonDevelopmentPack["miniProject"] }) {
  return (
    <section id="mini-project" className="lesson-card smart-farm-function-project" aria-labelledby="function-project-title">
      <p className="lesson-section-label"><Task size={16} /> Mini project</p><h2 id="function-project-title">{content.title}</h2><p>{content.brief}</p>
      <div className="function-project-grid"><div><h3>Function library</h3>{content.functions.map((item) => <Tile key={item}><CheckmarkOutline size={16} /><code>{item}</code></Tile>)}</div><CodeSnippet type="multi" feedback="Copied">{content.starterCode}</CodeSnippet></div>
      <Tile className="function-project-challenge"><strong>Challenge</strong><p>Rearrange only the four function calls. Run the program again and explain why the output order changes while every definition stays identical.</p></Tile>
    </section>
  );
}

export function FunctionDebugChallenges({ challenges }: { challenges: FunctionDefinitionLessonDevelopmentPack["debugChallenges"] }) {
  return (
    <section id="debug-challenges" className="lesson-card function-debug-challenges" aria-labelledby="function-debug-title">
      <p className="lesson-section-label"><Debug size={16} /> Debug challenges</p><h2 id="function-debug-title">Repair function definitions and calls</h2><p>Inspect each program before revealing the solution.</p>
      <Accordion align="start">{challenges.map((challenge) => <AccordionItem key={challenge.title} title={challenge.title}><p>{challenge.prompt}</p><div className="function-debug-grid"><div><Tag type="red">{challenge.mistakesToFind} mistake</Tag><pre><code>{challenge.code}</code></pre></div><div><span>Correct version</span><pre><code>{challenge.solution}</code></pre><p>{challenge.hiddenGuidance}</p></div></div></AccordionItem>)}</Accordion>
    </section>
  );
}
