import { useState } from "react";
import { Button, CodeSnippet, Tag, Tile } from "@carbon/react";
import { ArrowRight, CheckmarkFilled, Idea, Repeat } from "@carbon/icons-react";
import type { OopPolymorphismDevelopmentPack } from "@/types/content";

type Pack = OopPolymorphismDevelopmentPack;

export function PolymorphismVisualizer({ dispatches }: { dispatches: Pack["dispatches"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [includeRainfall, setIncludeRainfall] = useState(false);
  const visibleDispatches = includeRainfall ? dispatches : dispatches.slice(0, 3);
  const active = visibleDispatches[Math.min(activeIndex, visibleDispatches.length - 1)];

  function advance() {
    setActiveIndex((current) => (current + 1) % visibleDispatches.length);
  }

  return (
    <section id="dispatch-visualizer" className="lesson-card oop-poly-visualizer">
      <div className="oop-poly-section-heading">
        <Repeat size={24} aria-hidden="true" />
        <div>
          <p className="lesson-card-kicker">Interactive method dispatch</p>
          <h2>Same <code>read()</code> call, different behaviour</h2>
        </div>
      </div>
      <p>Select a sensor or step through the collection. The controller sends one command; the active object selects the implementation.</p>

      <div className="oop-poly-call" aria-label="Common method call">
        <span>Controller</span><code>sensor.read()</code>
      </div>
      <div className="oop-poly-connector" aria-hidden="true" />

      <div className="oop-poly-sensor-grid" role="list" aria-label="Sensor objects">
        {visibleDispatches.map((item, index) => (
          <button
            type="button"
            role="listitem"
            key={item.className}
            className={`oop-poly-sensor${index === activeIndex ? " is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-pressed={index === activeIndex}
          >
            <span className="oop-poly-object-label">OBJECT</span>
            <strong>{item.className}</strong>
            <code>{item.method}</code>
          </button>
        ))}
      </div>

      <div className="oop-poly-output" aria-live="polite">
        <span>Resolved implementation</span>
        <strong>{active.className}.read()</strong>
        <code>{active.output}</code>
      </div>

      <div className="oop-poly-actions">
        <Button size="sm" kind="primary" onClick={advance}>Run next <code>read()</code></Button>
        <Button
          size="sm"
          kind={includeRainfall ? "tertiary" : "secondary"}
          onClick={() => {
            setIncludeRainfall((value) => !value);
            setActiveIndex(0);
          }}
        >
          {includeRainfall ? "Remove RainfallSensor" : "Add RainfallSensor"}
        </Button>
      </div>
      <Tile className="oop-poly-extension-note">
        <CheckmarkFilled size={18} aria-hidden="true" />
        <p>The controller loop stays unchanged when a compatible RainfallSensor joins the collection.</p>
      </Tile>
    </section>
  );
}

export function SameInterfaceComparator({ data }: { data: Pack["sameInterface"] }) {
  return (
    <section id="same-interface" className="lesson-card oop-poly-interface">
      <h2>{data.title}</h2>
      <p>{data.body}</p>
      <div className="oop-poly-interface-grid">
        <Tile className="oop-poly-interface-panel is-specific">
          <Tag type="red" size="sm">Type-specific controller</Tag>
          <h3>Many instructions</h3>
          {data.specificCalls.map((call) => <code key={call}>{call}</code>)}
        </Tile>
        <ArrowRight className="oop-poly-interface-arrow" size={24} aria-hidden="true" />
        <Tile className="oop-poly-interface-panel is-common">
          <Tag type="green" size="sm">Polymorphic interface</Tag>
          <h3>One expected behaviour</h3>
          {data.commonCalls.map((call) => <code key={call}>{call}</code>)}
        </Tile>
      </div>
    </section>
  );
}

export function DuckTypingVisualizer({ duckTyping }: { duckTyping: Pack["duckTyping"] }) {
  const [active, setActive] = useState<"weather" | "drone" | "broken">("weather");
  const object = active === "weather"
    ? { name: "WeatherStation", parent: "No Sensor parent", output: "Weather data collected", compatible: true }
    : active === "drone"
      ? { name: "Drone", parent: "No Sensor parent", output: "Drone camera data collected", compatible: true }
      : { name: "IrrigationPump", parent: "No Sensor parent", output: "AttributeError: no read()", compatible: false };

  return (
    <section id="duck-typing" className="lesson-card oop-duck-typing">
      <h2>{duckTyping.title}</h2>
      <p>{duckTyping.body}</p>
      <div className="oop-duck-controls" role="group" aria-label="Choose an object to inspect">
        <Button size="sm" kind={active === "weather" ? "primary" : "ghost"} onClick={() => setActive("weather")}>WeatherStation</Button>
        <Button size="sm" kind={active === "drone" ? "primary" : "ghost"} onClick={() => setActive("drone")}>Drone</Button>
        <Button size="sm" kind={active === "broken" ? "danger" : "ghost"} onClick={() => setActive("broken")}>Incompatible Pump</Button>
      </div>
      <div className="oop-duck-flow">
        <div className="oop-duck-object">
          <span>OBJECT</span><strong>{object.name}</strong><small>{object.parent}</small>
        </div>
        <ArrowRight size={24} aria-hidden="true" />
        <div className={`oop-duck-contract${object.compatible ? " is-valid" : " is-invalid"}`}>
          <span>EXPECTED BEHAVIOUR</span><code>read()</code>
        </div>
        <ArrowRight size={24} aria-hidden="true" />
        <div className={`oop-duck-result${object.compatible ? " is-valid" : " is-invalid"}`} aria-live="polite">
          <span>RESULT</span><strong>{object.output}</strong>
        </div>
      </div>
      <ul className="oop-duck-rules">
        {duckTyping.rules.map((rule) => <li key={rule}>{rule}</li>)}
      </ul>
    </section>
  );
}

export function PolymorphismComparison({ rows }: { rows: Pack["comparison"] }) {
  return (
    <section id="comparison" className="lesson-card oop-poly-comparison">
      <h2>Inheritance polymorphism vs duck typing</h2>
      <div className="oop-poly-table" role="table" aria-label="Inheritance polymorphism and duck typing comparison">
        <div className="oop-poly-table-row is-heading" role="row">
          <strong role="columnheader">Feature</strong><strong role="columnheader">Inheritance</strong><strong role="columnheader">Duck typing</strong>
        </div>
        {rows.map((row) => (
          <div className="oop-poly-table-row" role="row" key={row.feature}>
            <strong role="cell">{row.feature}</strong><span role="cell">{row.inheritance}</span><span role="cell">{row.duckTyping}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PolymorphismIndustryGrid({ items }: { items: Pack["industryConnections"] }) {
  return (
    <section id="industry-connections" className="lesson-card oop-poly-industry">
      <h2>One interface across real industries</h2>
      <p>The caller stays stable while specialized implementations change behind the shared method.</p>
      <div className="oop-poly-industry-grid">
        {items.map((item) => (
          <Tile key={item.title} className="oop-poly-industry-card">
            <span>{item.title}</span><code>{item.interfaceName}</code>
            <ul>{item.examples.map((example) => <li key={example}>{example}</li>)}</ul>
          </Tile>
        ))}
      </div>
    </section>
  );
}

export function OopDebugChallenges5_6({ challenges }: { challenges: Pack["debugChallenges"] }) {
  const [revealed, setRevealed] = useState<number | null>(null);
  return (
    <section id="debug-challenge" className="lesson-card oop-debug-challenges">
      <h2>Debug Challenge — Broken behavioural contracts</h2>
      <p>Trace the object receiving each call, verify that the expected method exists, and predict the selected implementation.</p>
      <div className="oop-debug-list">
        {challenges.map((challenge, index) => (
          <div className="oop-debug-item" key={challenge.title}>
            <div className="oop-debug-item-header">
              <Tag type={challenge.mistakesToFind ? "red" : "purple"} size="sm">
                {challenge.mistakesToFind ? `${challenge.mistakesToFind} issue` : "Predict"}
              </Tag>
              <h3>{challenge.title}</h3>
            </div>
            <p>{challenge.prompt}</p>
            <CodeSnippet type="multi" feedback="Copied">{challenge.code}</CodeSnippet>
            {revealed === index ? (
              <div className="oop-debug-solution">
                <p className="oop-debug-solution-label">Explanation and fix</p>
                <CodeSnippet type="multi" feedback="Copied">{challenge.solution}</CodeSnippet>
                <Button size="sm" kind="ghost" onClick={() => setRevealed(null)}>Hide solution</Button>
              </div>
            ) : (
              <div className="oop-debug-guidance">
                <p className="oop-debug-hint">{challenge.hiddenGuidance}</p>
                <Button size="sm" kind="secondary" onClick={() => setRevealed(index)}>Show solution</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function OopEngineerThinkingCard5_6({ prompt }: { prompt: string }) {
  return (
    <section id="think-like-engineer" className="lesson-card oop-engineer-thinking">
      <div className="oop-engineer-header"><Idea size={24} aria-hidden="true" /><h2>Think Like an Engineer — Design for extension</h2></div>
      <p className="oop-engineer-prompt">{prompt}</p>
      <Tile className="oop-engineer-note"><p>Design signal: a controller with repeated <code>isinstance()</code> checks may be depending on concrete types when a common behaviour would be clearer.</p></Tile>
    </section>
  );
}
