import { Accordion, AccordionItem, Button, CodeSnippet, Tag, Tile, Toggle } from "@carbon/react";
import {
  CheckmarkOutline,
  Code,
  Debug,
  ErrorOutline,
  Idea,
  Industry,
  Play,
  Reset,
  Task,
} from "@carbon/icons-react";
import { useEffect, useState } from "react";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { CodeExampleContent, FirstProgramDevelopmentPack } from "@/types/content";

export function CodeExampleCard({ id, label, example }: { id: string; label: string; example: CodeExampleContent }) {
  return (
    <section id={id} className="lesson-card code-example-card" aria-labelledby={`${id}-title`}>
      <p className="lesson-section-label"><Code size={16} /> {label}</p>
      <h2 id={`${id}-title`}>{example.title}</h2>
      <p>{example.explanation}</p>
      <div className="code-example-grid">
        <div><span>Python</span><CodeSnippet type="multi" feedback="Copied">{example.code}</CodeSnippet></div>
        {example.output !== undefined && <div className="code-example-output"><span>Output</span><pre><code>{example.output}</code></pre></div>}
      </div>
    </section>
  );
}

export function ProgrammingExplanation({ content }: { content: FirstProgramDevelopmentPack["programming"] }) {
  return (
    <>
      <section id="programming" className="lesson-card programming-card" aria-labelledby="programming-title">
        <p className="lesson-section-label"><Idea size={16} /> Programming foundations</p>
        <h2 id="programming-title">{content.title}</h2>
        <p>{content.body}</p>
      </section>
      <WorkflowAnimation id="human-instructions" title={content.humanWorkflow.title} description={content.humanWorkflow.description} steps={content.humanWorkflow.steps} />
      <WorkflowAnimation id="computer-instructions" title={content.computerWorkflow.title} description={content.computerWorkflow.description} steps={content.computerWorkflow.steps} />
      <section id="programming-industries" className="lesson-card programming-industries" aria-labelledby="programming-industries-title">
        <p className="lesson-section-label"><Industry size={16} /> Industry insight</p>
        <h2 id="programming-industries-title">{content.industryTitle}</h2>
        <div>{content.industries.map((industry) => <Tile key={industry}>{industry}</Tile>)}</div>
      </section>
    </>
  );
}

export function PythonCodeExplanation({ content }: { content: FirstProgramDevelopmentPack["pythonCode"] }) {
  return (
    <>
      <section id="python-code" className="lesson-card python-code-card" aria-labelledby="python-code-title">
        <p className="lesson-section-label"><Code size={16} /> Python code</p>
        <h2 id="python-code-title">{content.title}</h2>
        <p>{content.body}</p>
        <CodeSnippet type="multi" feedback="Copied">{content.example.code}</CodeSnippet>
        <Tile className="python-code-explanation"><strong>{content.example.explanation}</strong><span>Output: {content.example.output}</span></Tile>
      </section>
      <WorkflowAnimation id="python-code-flow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} />
    </>
  );
}

export function ExecutionTracer({ content }: { content: FirstProgramDevelopmentPack["execution"] }) {
  const [activeLine, setActiveLine] = useState(-1);
  const [outputs, setOutputs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || activeLine < 0) return;
    const timer = window.setTimeout(() => {
      setOutputs((current) => [...current, content.lines[activeLine].output]);
      if (activeLine === content.lines.length - 1) {
        setRunning(false);
      } else {
        setActiveLine((line) => line + 1);
      }
    }, 650);
    return () => window.clearTimeout(timer);
  }, [activeLine, content.lines, running]);

  function runTrace() {
    setOutputs([]);
    setActiveLine(0);
    setRunning(true);
  }

  function resetTrace() {
    setRunning(false);
    setActiveLine(-1);
    setOutputs([]);
  }

  return (
    <section id="execution-trace" className="lesson-card execution-tracer" aria-labelledby="execution-trace-title">
      <div className="lesson-card-heading">
        <div><p className="lesson-section-label"><Play size={16} /> Execution animation</p><h2 id="execution-trace-title">{content.title}</h2><p>{content.description}</p></div>
        <Tag type={running ? "blue" : activeLine === content.lines.length - 1 ? "green" : "gray"}>{running ? `Line ${activeLine + 1}` : activeLine < 0 ? "Ready" : "Complete"}</Tag>
      </div>
      <div className="execution-grid">
        <ol aria-label="Python statements">
          {content.lines.map((line, index) => <li key={line.code} className={index === activeLine && running ? "is-executing" : index < outputs.length ? "is-complete" : ""}><span>{index + 1}</span><code>{line.code}</code></li>)}
        </ol>
        <div className="execution-output" aria-live="polite"><span>Output</span><pre><code>{outputs.join("\n")}</code></pre></div>
      </div>
      <div className="execution-actions"><Button size="sm" renderIcon={Play} onClick={runTrace} disabled={running}>Run execution</Button><Button size="sm" kind="secondary" renderIcon={Reset} onClick={resetTrace} disabled={running}>Reset</Button></div>
    </section>
  );
}

export function PrintExplorer({ content }: { content: FirstProgramDevelopmentPack["print"] }) {
  const [selected, setSelected] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const active = content.examples[selected];

  function selectExample(index: number) {
    setSelected(index);
    setRevealed(false);
  }

  return (
    <section id="print-explorer" className="lesson-card print-explorer" aria-labelledby="print-explorer-title">
      <p className="lesson-section-label"><Code size={16} /> print()</p>
      <h2 id="print-explorer-title">{content.title}</h2><p>{content.body}</p>
      <div className="print-example-tabs" role="tablist" aria-label="Print examples">
        {content.examples.map((example, index) => <Button key={example.title} kind={selected === index ? "primary" : "ghost"} size="sm" role="tab" aria-selected={selected === index} onClick={() => selectExample(index)}>{example.title}</Button>)}
      </div>
      <div className="print-prediction">
        <CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet>
        <div><p>{content.predictionPrompt}</p><Button size="sm" kind="tertiary" onClick={() => setRevealed(true)} disabled={revealed}>Reveal output</Button></div>
        <Tile aria-live="polite"><span>Output</span><strong>{revealed ? active.output : "?"}</strong><small>{revealed ? active.explanation : "Make a prediction first"}</small></Tile>
      </div>
    </section>
  );
}

export function StatementsCard({ content }: { content: FirstProgramDevelopmentPack["statements"] }) {
  return (
    <>
      <section id="statements" className="lesson-card statements-card" aria-labelledby="statements-title">
        <p className="lesson-section-label"><Task size={16} /> Statements</p><h2 id="statements-title">{content.title}</h2><p>{content.body}</p>
        <div className="statement-list">{content.examples.map((example, index) => <Tile key={example}><span>Statement {index + 1}</span><code>{example}</code></Tile>)}</div>
      </section>
      <WorkflowAnimation id="statement-flow" title={content.workflow.title} description={content.workflow.description} steps={content.workflow.steps} />
    </>
  );
}

export function CommentExplorer({ content }: { content: FirstProgramDevelopmentPack["comments"] }) {
  const [showComment, setShowComment] = useState(true);
  return (
    <section id="comments" className="lesson-card comments-card" aria-labelledby="comments-title">
      <div className="lesson-card-heading"><div><p className="lesson-section-label"><Code size={16} /> Comments</p><h2 id="comments-title">{content.title}</h2><p>{content.body}</p></div><Toggle id="comment-visibility" labelText="Comment visibility" labelA="Hidden" labelB="Shown" toggled={showComment} onToggle={setShowComment} /></div>
      <div className="comment-code" aria-live="polite"><pre><code>{showComment ? `${content.comment}\n${content.executableCode}` : content.executableCode}</code></pre></div>
      <div className="comment-behaviour"><Tile className={showComment ? "is-visible" : ""}><span>Python ignores</span><code>{showComment ? content.comment : "Comment hidden"}</code></Tile><Tile><span>Python executes</span><code>{content.executableCode}</code></Tile></div>
    </section>
  );
}

export function IndentationExplorer({ content }: { content: FirstProgramDevelopmentPack["indentation"] }) {
  const [correct, setCorrect] = useState(false);
  return (
    <section id="indentation" className="lesson-card indentation-card" aria-labelledby="indentation-title">
      <div className="lesson-card-heading"><div><p className="lesson-section-label"><Code size={16} /> Indentation</p><h2 id="indentation-title">{content.title}</h2><p>{content.body}</p></div><Toggle id="indentation-correction" labelText="Code version" labelA="Wrong" labelB="Correct" toggled={correct} onToggle={setCorrect} /></div>
      <div className={`indentation-demo ${correct ? "is-correct" : "is-wrong"}`}>
        <div><Tag type={correct ? "green" : "red"}>{correct ? "Correct" : "Incorrect"}</Tag><pre><code>{correct ? content.correctCode : content.wrongCode}</code></pre></div>
        <Tile aria-live="polite">{correct ? <CheckmarkOutline size={24} /> : <ErrorOutline size={24} />}<p>{correct ? content.correctExplanation : content.wrongExplanation}</p></Tile>
      </div>
      <div className="future-indentation"><span>Indentation will be used later with</span>{content.futureUses.map((item) => <Tag key={item} type="gray">{item}</Tag>)}</div>
    </section>
  );
}

export function PlaygroundActivityList({ activities }: { activities: string[] }) {
  return <Tile className="playground-activity-list"><p className="lesson-section-label"><Task size={16} /> Playground activities</p><ol>{activities.map((activity) => <li key={activity}>{activity}</li>)}</ol></Tile>;
}

export function CommonMistakesCard({ title, mistakes }: { title: string; mistakes: FirstProgramDevelopmentPack["mistakes"] }) {
  return (
    <section id="common-mistakes" className="lesson-card common-mistakes-card" aria-labelledby="common-mistakes-title">
      <p className="lesson-section-label"><ErrorOutline size={16} /> Common mistakes</p><h2 id="common-mistakes-title">{title}</h2>
      <Accordion align="start">
        {mistakes.map((mistake) => <AccordionItem key={mistake.title} title={mistake.title}><div className="mistake-comparison"><div><span>Incorrect</span><code>{mistake.incorrect}</code></div><div><span>Why?</span><p>{mistake.reason}</p></div><div><span>Correct version</span><code>{mistake.correct}</code></div></div></AccordionItem>)}
      </Accordion>
    </section>
  );
}

export function DebugChallengeCard({ content }: { content: FirstProgramDevelopmentPack["debugChallenge"] }) {
  const [showSolution, setShowSolution] = useState(false);
  return (
    <section id="debug-challenge" className="lesson-card debug-challenge-card" aria-labelledby="debug-challenge-title">
      <p className="lesson-section-label"><Debug size={16} /> Debug challenge</p><h2 id="debug-challenge-title">{content.title}</h2><p>{content.prompt}</p>
      <div className="debug-code"><Tag type="red">{content.mistakesToFind} mistakes</Tag><pre><code>{content.code}</code></pre></div>
      <Button kind="tertiary" size="sm" onClick={() => setShowSolution((shown) => !shown)}>{showSolution ? "Hide solution" : "Show solution"}</Button>
      <Tile className={`debug-solution ${showSolution ? "is-visible" : ""}`} aria-live="polite">{showSolution ? <><CheckmarkOutline size={20} /><pre><code>{content.solution}</code></pre></> : <p>{content.hiddenGuidance}</p>}</Tile>
    </section>
  );
}

export function AgritechProgramCard({ example }: { example: CodeExampleContent }) {
  return <CodeExampleCard id="agritech-program" label="Agritech example" example={example} />;
}
