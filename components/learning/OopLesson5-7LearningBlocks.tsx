import { useState } from "react";
import { Button, CodeSnippet, Tag, Tile } from "@carbon/react";
import { ArrowDown, CheckmarkFilled, Idea, Locked, WarningAltFilled } from "@carbon/icons-react";
import type { OopAbstractionDevelopmentPack } from "@/types/content";

type Pack = OopAbstractionDevelopmentPack;

export function OopContinuityBridge({ continuity }: { continuity: Pack["continuity"] }) {
  return (
    <section id="continuity" className="lesson-card oop-abs-continuity">
      <p className="lesson-card-kicker">Connect the concepts</p>
      <h2>From polymorphic capability to an abstract requirement</h2>
      <div className="oop-abs-continuity-flow">
        <Tile><Tag type="purple" size="sm">Lesson 5.6</Tag><h3>Polymorphism</h3><p>{continuity.polymorphism}</p></Tile>
        <ArrowDown size={24} aria-hidden="true" />
        <Tile><Tag type="blue" size="sm">Lesson 5.7</Tag><h3>Abstraction</h3><p>{continuity.abstraction}</p></Tile>
      </div>
    </section>
  );
}

export function AbstractionBoundaryVisualizer({ definition }: { definition: Pack["definition"] }) {
  return (
    <section id="abstraction-boundary" className="lesson-card oop-abs-boundary">
      <h2>{definition.title}</h2>
      <p>{definition.body}</p>
      <div className="oop-abs-boundary-grid">
        <Tile className="oop-abs-visible">
          <span className="oop-abs-label">CONTROLLER CAN DEPEND ON</span>
          <h3>Essential interface</h3>
          {definition.visibleInterface.map((item) => <code key={item}>{item}</code>)}
        </Tile>
        <div className="oop-abs-screen" aria-label="Abstraction boundary"><Locked size={24} /><strong>Abstraction boundary</strong><span>Complexity stays behind this line</span></div>
        <Tile className="oop-abs-hidden">
          <span className="oop-abs-label">IMPLEMENTATION DETAILS</span>
          <h3>Hidden machinery</h3>
          {definition.hiddenDetails.map((item) => <span key={item}>{item}</span>)}
        </Tile>
      </div>
    </section>
  );
}

export function EncapsulationAbstractionComparator({ rows }: { rows: Pack["encapsulationComparison"] }) {
  return (
    <section id="encapsulation-vs-abstraction" className="lesson-card oop-abs-comparison">
      <h2>Encapsulation vs abstraction</h2>
      <p className="oop-abs-comparison-lead">Keep this distinction visible: one protects state; the other defines the essential promise.</p>
      <div className="oop-abs-memory-grid">
        <Tile className="is-encapsulation"><span>LESSON 5.4</span><strong>Encapsulation</strong><p>“Who can access or change my data?”</p></Tile>
        <Tile className="is-abstraction"><span>LESSON 5.7</span><strong>Abstraction</strong><p>“What does this object promise to provide?”</p></Tile>
      </div>
      <div className="oop-abs-table" role="table" aria-label="Encapsulation and abstraction comparison">
        <div className="oop-abs-table-row is-heading" role="row"><strong role="columnheader">Feature</strong><strong role="columnheader">Encapsulation</strong><strong role="columnheader">Abstraction</strong></div>
        {rows.map((row) => <div className="oop-abs-table-row" role="row" key={row.feature}><strong role="cell">{row.feature}</strong><span role="cell">{row.encapsulation}</span><span role="cell">{row.abstraction}</span></div>)}
      </div>
    </section>
  );
}

export function AbstractClassInspector({ abstractClass, contract }: { abstractClass: Pack["abstractClass"]; contract: Pack["contract"] }) {
  const [activePart, setActivePart] = useState<"abc" | "decorator" | "method">("abc");
  const explanations = {
    abc: { title: "ABC", body: "Marks Sensor as an abstract base class that may contain unfinished requirements." },
    decorator: { title: "@abstractmethod", body: "Records read() as a requirement that concrete child classes must fulfill." },
    method: { title: "read()", body: "The stable operation every Smart Farm controller can depend on." },
  };
  return (
    <section id="abstract-class" className="lesson-card oop-abs-inspector">
      <h2>{abstractClass.title}</h2><p>{abstractClass.body}</p>
      <div className="oop-abs-inspector-grid">
        <div className="oop-abs-class-card">
          <div className="oop-abs-class-header"><span>ABSTRACT CLASS</span><strong>Sensor (ABC)</strong></div>
          <button type="button" className={activePart === "abc" ? "is-active" : ""} onClick={() => setActivePart("abc")}><code>class Sensor(ABC):</code></button>
          <button type="button" className={activePart === "decorator" ? "is-active" : ""} onClick={() => setActivePart("decorator")}><code>@abstractmethod</code></button>
          <button type="button" className={activePart === "method" ? "is-active" : ""} onClick={() => setActivePart("method")}><code>def read(self): ...</code></button>
        </div>
        <Tile className="oop-abs-inspector-note" aria-live="polite"><Tag type="blue" size="sm">Selected part</Tag><h3>{explanations[activePart].title}</h3><p>{explanations[activePart].body}</p></Tile>
      </div>
      <div className="oop-abs-contract-strip"><strong>Sensor contract</strong><code>{contract.method}</code><span>{contract.explanation}</span></div>
    </section>
  );
}

export function ContractValidationVisualizer({ sensors }: { sensors: Pack["sensors"] }) {
  const [rainfallImplemented, setRainfallImplemented] = useState(false);
  const [selected, setSelected] = useState("RainfallSensor");
  const displaySensors = sensors.map((sensor) => sensor.className === "RainfallSensor" ? { ...sensor, implemented: rainfallImplemented } : sensor);
  const active = displaySensors.find((sensor) => sensor.className === selected) ?? displaySensors[0];
  return (
    <section id="contract-validator" className="lesson-card oop-abs-validator">
      <p className="lesson-card-kicker">Interactive contract validation</p>
      <h2>Can Python create this sensor object?</h2>
      <p>Select a subclass. RainfallSensor begins incomplete so you can see the abstract contract block object creation.</p>
      <div className="oop-abs-contract-card"><span>ABSTRACT SENSOR CONTRACT</span><strong>MUST implement</strong><code>read()</code></div>
      <ArrowDown className="oop-abs-down-arrow" size={24} aria-hidden="true" />
      <div className="oop-abs-sensor-grid" role="list" aria-label="Sensor subclasses">
        {displaySensors.map((sensor) => <button type="button" role="listitem" key={sensor.className} className={`${selected === sensor.className ? "is-active" : ""}${sensor.implemented ? " is-valid" : " is-invalid"}`} onClick={() => setSelected(sensor.className)} aria-pressed={selected === sensor.className}><strong>{sensor.className}</strong><span>{sensor.implemented ? "read() implemented" : "read() missing"}</span></button>)}
      </div>
      <Tile className={`oop-abs-validation-result${active.implemented ? " is-valid" : " is-invalid"}`} aria-live="polite">
        {active.implemented ? <CheckmarkFilled size={22} /> : <WarningAltFilled size={22} />}
        <div><span>{active.implemented ? "Contract satisfied" : "Cannot instantiate abstract class"}</span><strong>{active.implemented ? `${active.className} created → ${active.output}` : `Missing: ${active.className}.read()`}</strong></div>
      </Tile>
      {selected === "RainfallSensor" && <Button size="sm" kind={rainfallImplemented ? "tertiary" : "primary"} onClick={() => setRainfallImplemented((value) => !value)}>{rainfallImplemented ? "Remove read() implementation" : "Implement read() and retry"}</Button>}
    </section>
  );
}

export function AbstractArchitectureDiagram({ data }: { data: Pack["commonFunctionality"] }) {
  return (
    <section id="common-functionality" className="lesson-card oop-abs-architecture">
      <h2>{data.title}</h2><p>{data.body}</p>
      <div className="oop-abs-architecture-card">
        <div className="oop-abs-architecture-header"><span>ABSTRACT PARENT</span><strong>Sensor</strong></div>
        <div><span>COMMON DATA</span><code>sensor_id</code></div>
        <div><span>FINISHED METHOD</span><code>show_id()</code></div>
        <div className="is-required"><span>REQUIRED METHOD</span><code>read()</code></div>
      </div>
      <CodeSnippet type="multi" feedback="Copied">{data.code}</CodeSnippet>
    </section>
  );
}

export function OopDebugChallenges5_7({ challenges }: { challenges: Pack["debugChallenges"] }) {
  const [revealed, setRevealed] = useState<number | null>(null);
  return (
    <section id="debug-challenge" className="lesson-card oop-debug-challenges">
      <h2>Debug Challenge — Incomplete abstract contracts</h2><p>Find whether the contract is missing, the child implementation is missing, or the child accidentally remains abstract.</p>
      <div className="oop-debug-list">{challenges.map((challenge, index) => <div className="oop-debug-item" key={challenge.title}><div className="oop-debug-item-header"><Tag type="red" size="sm">{challenge.mistakesToFind} issue</Tag><h3>{challenge.title}</h3></div><p>{challenge.prompt}</p><CodeSnippet type="multi" feedback="Copied">{challenge.code}</CodeSnippet>{revealed === index ? <div className="oop-debug-solution"><p className="oop-debug-solution-label">Explanation and fix</p><CodeSnippet type="multi" feedback="Copied">{challenge.solution}</CodeSnippet><Button size="sm" kind="ghost" onClick={() => setRevealed(null)}>Hide solution</Button></div> : <div className="oop-debug-guidance"><p className="oop-debug-hint">{challenge.hiddenGuidance}</p><Button size="sm" kind="secondary" onClick={() => setRevealed(index)}>Show solution</Button></div>}</div>)}</div>
    </section>
  );
}

export function OopEngineerThinkingCard5_7({ prompt }: { prompt: string }) {
  return <section id="think-like-engineer" className="lesson-card oop-engineer-thinking"><div className="oop-engineer-header"><Idea size={24} aria-hidden="true" /><h2>Think Like an Engineer — Publish a stable Sensor API</h2></div><p className="oop-engineer-prompt">{prompt}</p><Tile className="oop-engineer-note"><p>Design goal: vendors own the hidden implementation; the platform owns the small, stable contract.</p></Tile></section>;
}
