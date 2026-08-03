import { useState } from "react";
import { Button, Tag, Tile } from "@carbon/react";
import {
  Application,
  ArrowRight,
  CheckmarkOutline,
  Code,
  Compare,
  Flow,
  IbmCloudProjects,
  Idea,
  Repeat,
  Restart,
  WarningAlt,
} from "@carbon/icons-react";
import type {
  FunctionConceptModule,
  WhyFunctionsDevelopmentPack,
} from "@/types/content";

export function RepeatedCodeStory({ content }: { content: WhyFunctionsDevelopmentPack["story"] }) {
  return (
    <section id="story" className="lesson-card function-story-card" aria-labelledby="story-title">
      <p className="lesson-section-label"><Repeat size={16} /> Story continuation</p>
      <h2 id="story-title">{content.title}</h2>
      <p>{content.body}</p>
      <div className="function-story-locations" aria-label="Locations containing repeated irrigation logic">
        {content.locations.map((location) => (
          <Tile key={location}>
            <Application size={20} />
            <h3>{location}</h3>
            <ul>{content.repeatedCode.map((line) => <li key={line}>{line}</li>)}</ul>
          </Tile>
        ))}
      </div>
      <blockquote>{content.quote}</blockquote>
    </section>
  );
}

export function CodeDuplicationDetector({ content }: { content: WhyFunctionsDevelopmentPack["duplication"] }) {
  const [showReusable, setShowReusable] = useState(false);
  return (
    <section id="duplication-detector" className="lesson-card duplication-detector" aria-labelledby="duplication-title">
      <p className="lesson-section-label"><WarningAlt size={16} /> Code duplication detector</p>
      <div className="function-section-heading">
        <div><h2 id="duplication-title">{content.title}</h2><p>{content.body}</p></div>
        <div className="duplication-metrics" aria-label="Duplication scale">
          <span><strong>{content.projectLines}</strong> project lines</span>
          <span><strong>{content.occurrences}</strong> copies</span>
        </div>
      </div>
      <div className="function-view-toggle" role="group" aria-label="Duplication view">
        <Button size="sm" kind={showReusable ? "secondary" : "primary"} onClick={() => setShowReusable(false)}>Repeated version</Button>
        <Button size="sm" kind={showReusable ? "primary" : "secondary"} onClick={() => setShowReusable(true)}>Reusable concept</Button>
      </div>
      {!showReusable ? (
        <div className="duplicate-block-grid">
          {content.repeatedLocations.map((location) => <Tile key={location.title} className="duplicate-code-tile"><Tag type="red">Duplicate</Tag><h3>{location.title}</h3>{location.lines.map((line) => <code key={line}>{line}</code>)}</Tile>)}
        </div>
      ) : (
        <div className="reusable-concept-view" aria-live="polite">
          <Tile className="function-call-tile"><Code size={24} /><code>{content.conceptualReplacement}</code><p>One focused responsibility serves every feature.</p></Tile>
          <div className="reuse-consumers">{content.repeatedLocations.map((location) => <span key={location.title}><ArrowRight size={16} /> {location.title}</span>)}</div>
        </div>
      )}
      <ul className="duplication-risks">{content.risks.map((risk) => <li key={risk}>{risk}</li>)}</ul>
    </section>
  );
}

export function RemoteControlAnalogy({ content }: { content: WhyFunctionsDevelopmentPack["analogy"] }) {
  return (
    <section id="analogy" className="lesson-card function-analogy" aria-labelledby="analogy-title">
      <p className="lesson-section-label"><Idea size={16} /> Real-world analogy</p>
      <h2 id="analogy-title">{content.title}</h2><p>{content.body}</p>
      <div className="analogy-flow"><Tile><strong>{content.trigger}</strong></Tile><ArrowRight /><Tile><span>Hidden focused work</span><ul>{content.hiddenWork.map((step) => <li key={step}>{step}</li>)}</ul></Tile><ArrowRight /><Tile><strong>{content.result}</strong></Tile></div>
    </section>
  );
}

export function FunctionDefinitionCard({ content, benefits }: { content: WhyFunctionsDevelopmentPack["definition"]; benefits: WhyFunctionsDevelopmentPack["benefits"] }) {
  return (
    <section id="function-concept" className="lesson-card function-definition-card" aria-labelledby="function-definition-title">
      <p className="lesson-section-label"><Code size={16} /> Function concept</p>
      <h2 id="function-definition-title">{content.title}</h2><p>{content.body}</p>
      <div className="function-benefit-grid">{benefits.map((benefit) => <Tile key={benefit.title}><CheckmarkOutline size={20} /><h3>{benefit.title}</h3><p>{benefit.description}</p></Tile>)}</div>
    </section>
  );
}

export function BeforeAfterComparator({ content }: { content: WhyFunctionsDevelopmentPack["comparison"] }) {
  return (
    <section id="before-after" className="lesson-card before-after-comparator" aria-labelledby="before-after-title">
      <p className="lesson-section-label"><Compare size={16} /> Before vs after comparator</p>
      <h2 id="before-after-title">{content.title}</h2><p>{content.body}</p>
      <div className="before-after-grid"><Tile className="comparison-column comparison-column--before"><Tag type="red">Without functions</Tag><ul>{content.without.map((item) => <li key={item}>{item}</li>)}</ul></Tile><Tile className="comparison-column comparison-column--after"><Tag type="green">With functions</Tag><ul>{content.with.map((item) => <li key={item}>{item}</li>)}</ul></Tile></div>
    </section>
  );
}

export function AgritechFunctionConcept({ content }: { content: WhyFunctionsDevelopmentPack["agritechConcept"] }) {
  return (
    <section id="agritech-concept" className="lesson-card agritech-function-concept" aria-labelledby="agritech-concept-title">
      <p className="lesson-section-label"><IbmCloudProjects size={16} /> Agritech example</p>
      <h2 id="agritech-concept-title">{content.title}</h2><p>{content.body}</p>
      <div className="agritech-function-transform"><div>{content.repeatedTask.map((task) => <Tile key={task}>{task}</Tile>)}</div><ArrowRight /><Tile className="function-call-tile"><code>{content.conceptualCall}</code><span>One name · One task · Many uses</span></Tile></div>
    </section>
  );
}

export function FunctionCallAnimation({ module, activePhase }: { module: FunctionConceptModule; activePhase: number }) {
  const phases = [
    { title: "Main program", detail: "Needs a focused task" },
    { title: module.conceptualCall, detail: "Calls the reusable module" },
    { title: module.title, detail: module.process[Math.min(activePhase - 2, module.process.length - 1)] ?? "Performs the focused work" },
    { title: "Return control", detail: module.outcome },
    { title: "Program continues", detail: "Ready for the next responsibility" },
  ];
  return <div className="function-call-animation" aria-label={`Function call flow for ${module.title}`}>{phases.map((phase, index) => <div key={phase.title} className={`function-flow-node${index === activePhase ? " is-active" : ""}${index < activePhase ? " is-complete" : ""}`} aria-current={index === activePhase ? "step" : undefined}><span>{index + 1}</span><div><strong>{phase.title}</strong><p>{phase.detail}</p></div>{index < phases.length - 1 && <ArrowRight className="function-flow-arrow" />}</div>)}</div>;
}

export function FunctionFlowVisualizer({ content, module }: { content: WhyFunctionsDevelopmentPack["functionFlow"]; module: FunctionConceptModule }) {
  const [activePhase, setActivePhase] = useState(0);
  return (
    <section id="function-flow" className="lesson-card function-flow-visualizer" aria-labelledby="function-flow-title">
      <p className="lesson-section-label"><Flow size={16} /> Function flow visualizer</p>
      <h2 id="function-flow-title">{content.title}</h2><p>{content.body}</p>
      <FunctionCallAnimation module={module} activePhase={activePhase} />
      <div className="function-flow-controls"><Button size="sm" kind="secondary" disabled={activePhase === 0} onClick={() => setActivePhase((value) => Math.max(0, value - 1))}>Previous</Button><Button size="sm" onClick={() => setActivePhase((value) => value === 4 ? 0 : value + 1)}>{activePhase === 4 ? <><Restart /> Replay</> : "Next step"}</Button></div>
      <p className="function-live-status" aria-live="polite">Step {activePhase + 1} of 5: {content.steps[activePhase]?.title}</p>
    </section>
  );
}

export function ModularDesignExplorer({ modules }: { modules: FunctionConceptModule[] }) {
  const [selectedId, setSelectedId] = useState(modules[0]?.id ?? "");
  const selected = modules.find((module) => module.id === selectedId) ?? modules[0];
  if (!selected) return null;
  return (
    <section id="modular-design" className="lesson-card modular-design-explorer" aria-labelledby="modular-design-title">
      <p className="lesson-section-label"><IbmCloudProjects size={16} /> Modular design explorer</p>
      <h2 id="modular-design-title">Divide the Smart Farm into focused responsibilities</h2><p>Select a module to inspect its purpose, conceptual name, process, and outcome.</p>
      <div className="module-explorer-layout"><div className="module-selector" role="list" aria-label="Smart Farm modules">{modules.map((module) => <Button key={module.id} size="sm" kind={module.id === selected.id ? "primary" : "tertiary"} onClick={() => setSelectedId(module.id)}>{module.title}</Button>)}</div><Tile className="module-detail" aria-live="polite"><Tag type="teal">Focused responsibility</Tag><h3>{selected.title}</h3><code>{selected.conceptualCall}</code><p>{selected.description}</p><ol>{selected.process.map((step) => <li key={step}>{step}</li>)}</ol><strong>{selected.outcome}</strong></Tile></div>
    </section>
  );
}

export function ConceptualFunctionPlayground({ content }: { content: WhyFunctionsDevelopmentPack["simulation"] }) {
  const [selectedId, setSelectedId] = useState(content.modules[0]?.id ?? "");
  const [activePhase, setActivePhase] = useState(0);
  const selected = content.modules.find((module) => module.id === selectedId) ?? content.modules[0];
  if (!selected) return null;
  function selectModule(id: string) { setSelectedId(id); setActivePhase(0); }
  return (
    <section id="conceptual-playground" className="lesson-card conceptual-function-playground" aria-labelledby="conceptual-playground-title">
      <p className="lesson-section-label"><Application size={16} /> Interactive conceptual playground</p>
      <h2 id="conceptual-playground-title">{content.title}</h2><p>{content.body}</p>
      <div className="playground-module-buttons" role="group" aria-label="Choose a conceptual Smart Farm task">{content.modules.map((module) => <Button key={module.id} kind={module.id === selected.id ? "primary" : "secondary"} size="sm" onClick={() => selectModule(module.id)}>{module.title}</Button>)}</div>
      <FunctionCallAnimation module={selected} activePhase={activePhase} />
      <div className="conceptual-console"><span>Conceptual execution</span><p>{activePhase < 4 ? selected.process[Math.max(0, Math.min(activePhase - 1, selected.process.length - 1))] : selected.outcome}</p></div>
      <div className="function-flow-controls"><Button size="sm" onClick={() => setActivePhase((value) => Math.min(4, value + 1))} disabled={activePhase === 4}>Run next step</Button><Button size="sm" kind="ghost" renderIcon={Restart} onClick={() => setActivePhase(0)}>Reset</Button></div>
    </section>
  );
}

export function ReusabilityMiniChallenge({ content }: { content: WhyFunctionsDevelopmentPack["challenge"] }) {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState(false);
  const answeredAll = content.tasks.every((task) => answers[task.id] !== undefined);
  return (
    <section id="mini-challenge" className="lesson-card reusability-challenge" aria-labelledby="mini-challenge-title">
      <p className="lesson-section-label"><Idea size={16} /> Mini challenge</p><h2 id="mini-challenge-title">{content.title}</h2><p>{content.body}</p>
      <div className="challenge-task-list">{content.tasks.map((task) => <Tile key={task.id}><h3>{task.title}</h3><p>{task.location}</p><div role="group" aria-label={`Should ${task.title} become a function?`}><Button size="sm" kind={answers[task.id] === true ? "primary" : "tertiary"} onClick={() => { setAnswers((current) => ({ ...current, [task.id]: true })); setRevealed(false); }}>Reusable</Button><Button size="sm" kind={answers[task.id] === false ? "primary" : "tertiary"} onClick={() => { setAnswers((current) => ({ ...current, [task.id]: false })); setRevealed(false); }}>Keep inline</Button></div>{revealed && <p className={answers[task.id] === task.shouldBecomeFunction ? "challenge-correct" : "challenge-review"}>{answers[task.id] === task.shouldBecomeFunction ? "Good choice. " : "Review this choice. "}{task.explanation}</p>}</Tile>)}</div>
      <Button size="sm" disabled={!answeredAll} onClick={() => setRevealed(true)}>Reveal engineering rationale</Button>
      <p aria-live="polite">{revealed ? "Rationale revealed for every responsibility." : answeredAll ? "All tasks classified. Reveal the rationale when ready." : "Classify every task to continue."}</p>
    </section>
  );
}
