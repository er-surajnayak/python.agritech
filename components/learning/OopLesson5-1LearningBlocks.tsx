import { useState } from "react";
import { Button, CodeSnippet, Tag, Tile } from "@carbon/react";
import {
  ChevronRight,
  ChevronLeft,
  AgricultureAnalytics,
  Idea,
  View,
  Debug,
  CheckmarkFilled,
} from "@carbon/icons-react";
import type {
  OopWhyOopDevelopmentPack,
  OopMemoryObject,
} from "@/types/content";

// ─── 1. Growing Problem Timeline ─────────────────────────────────────────────

export function OopGrowingProblemTimeline({
  content,
}: {
  content: OopWhyOopDevelopmentPack["growingProblem"];
}) {
  const [step, setStep] = useState(0);
  const active = content.scalingSteps[step];

  return (
    <section id="growing-problem" className="lesson-card oop-growing-problem">
      <h2>{content.title}</h2>
      <p>{content.body}</p>

      {/* Scaling visualizer */}
      <div className="oop-scaling-visualizer" aria-label="Farm scaling problem">
        <div className="oop-scaling-steps">
          {content.scalingSteps.map((s, i) => (
            <button
              key={s.label}
              className={`oop-scaling-node${i === step ? " active" : ""}${s.highlight ? " highlight" : ""}`}
              onClick={() => setStep(i)}
              aria-current={i === step}
              aria-label={`${s.label}: ${s.count} ${s.unit}`}
            >
              <span className="oop-scaling-label">{s.label}</span>
              <span className="oop-scaling-count">
                {s.count.toLocaleString()}
              </span>
              <span className="oop-scaling-unit">{s.unit}</span>
            </button>
          ))}
        </div>

        <div
          className={`oop-scaling-spotlight${active.highlight ? " is-critical" : ""}`}
          role="status"
          aria-live="polite"
        >
          <div className="oop-scaling-spotlight-farm">{active.label}</div>
          <div className="oop-scaling-spotlight-count">
            {active.count.toLocaleString()}
          </div>
          <div className="oop-scaling-spotlight-unit">{active.unit}</div>
          {active.highlight && (
            <p className="oop-scaling-crisis">⚠ Maintenance crisis</p>
          )}
        </div>

        <div className="oop-scaling-nav" role="navigation" aria-label="Step through scaling">
          <Button
            kind="ghost"
            size="sm"
            renderIcon={ChevronLeft}
            iconDescription="Previous"
            hasIconOnly
            onClick={() => setStep((p) => Math.max(0, p - 1))}
            disabled={step === 0}
          />
          <span className="oop-scaling-counter">
            {step + 1} / {content.scalingSteps.length}
          </span>
          <Button
            kind="ghost"
            size="sm"
            renderIcon={ChevronRight}
            iconDescription="Next"
            hasIconOnly
            onClick={() =>
              setStep((p) => Math.min(content.scalingSteps.length - 1, p + 1))
            }
            disabled={step === content.scalingSteps.length - 1}
          />
        </div>
      </div>

      {/* Procedural code example */}
      <div className="oop-procedural-code">
        <h3>The procedural approach — already hard to manage at 3 farms</h3>
        <CodeSnippet type="multi" feedback="Copied">
          {content.proceduralCode}
        </CodeSnippet>
      </div>

      {/* Pain points */}
      <div className="oop-pain-points">
        <h3>Why this fails at scale</h3>
        <ul className="oop-pain-list" role="list">
          {content.painPoints.map((p, i) => (
            <li key={i} className="oop-pain-item">
              <span className="oop-pain-icon" aria-hidden="true">✗</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <Tile className="oop-scaling-question">
        <Idea size={20} aria-hidden="true" />
        <p>{content.scalingQuestion}</p>
      </Tile>
    </section>
  );
}

// ─── 2. Class–Object Visualizer ───────────────────────────────────────────────

interface OopClassDef {
  title: string;
  definition: string;
  agritechContext: string;
  attributes: Array<{ name: string; type: string; isPrivate?: boolean }>;
  methods: Array<{ name: string; params: string; returnType: string }>;
  code: string;
}

interface OopObjectDef {
  title: string;
  definition: string;
  instances: Array<{ name: string; represents: string }>;
  code: string;
  output: string;
}

export function OopClassObjectVisualizer({
  classConcept,
  objectConcept,
}: {
  classConcept: OopClassDef;
  objectConcept: OopObjectDef;
}) {
  const [createdCount, setCreatedCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"class" | "object">("class");

  function handleCreate() {
    if (createdCount < objectConcept.instances.length) {
      setCreatedCount((c) => c + 1);
    }
  }

  function handleReset() {
    setCreatedCount(0);
  }

  return (
    <section
      id="class-object-visualizer"
      className="lesson-card oop-class-object-visualizer"
    >
      <h2>Class vs Object — Interactive Visualizer</h2>
      <p>
        Explore the Class blueprint and create Object instances one at a time.
        Watch each new farm object appear with its own memory identity.
      </p>

      {/* Tab switcher */}
      <div className="oop-cov-tabs" role="tablist" aria-label="Class or Object view">
        <button
          role="tab"
          aria-selected={activeTab === "class"}
          className={`oop-cov-tab${activeTab === "class" ? " active" : ""}`}
          onClick={() => setActiveTab("class")}
          id="tab-class"
          aria-controls="panel-class"
        >
          Class Blueprint
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "object"}
          className={`oop-cov-tab${activeTab === "object" ? " active" : ""}`}
          onClick={() => setActiveTab("object")}
          id="tab-object"
          aria-controls="panel-object"
        >
          Object Instances
        </button>
      </div>

      {/* Class panel */}
      {activeTab === "class" && (
        <div
          id="panel-class"
          role="tabpanel"
          aria-labelledby="tab-class"
          className="oop-cov-panel"
        >
          <div className="oop-class-card" aria-label={`Class: Farm`}>
            <div className="oop-class-header">
              <Tag type="purple" size="sm">
                CLASS
              </Tag>
              <span className="oop-class-name">Farm</span>
            </div>
            <div className="oop-class-body">
              <div className="oop-class-section">
                <p className="oop-class-section-label">ATTRIBUTES</p>
                {classConcept.attributes.map((a) => (
                  <div key={a.name} className="oop-class-attr-row">
                    <span className="oop-attr-name">
                      {a.isPrivate ? "_" : ""}
                      {a.name}
                    </span>
                    <span className="oop-attr-colon">:</span>
                    <span className="oop-attr-type">{a.type}</span>
                  </div>
                ))}
              </div>
              <div className="oop-class-section oop-method-section">
                <p className="oop-class-section-label">METHODS</p>
                {classConcept.methods.map((m) => (
                  <div key={m.name} className="oop-class-method-row">
                    <span className="oop-method-name">{m.name}</span>
                    <span className="oop-method-params">({m.params})</span>
                    <span className="oop-method-arrow"> → </span>
                    <span className="oop-method-return">{m.returnType}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="oop-concept-box">
            <h3>{classConcept.title}</h3>
            <p>{classConcept.definition}</p>
            <p className="oop-agritech-context">{classConcept.agritechContext}</p>
          </div>

          <div className="oop-code-preview">
            <p className="oop-code-label">Python syntax</p>
            <CodeSnippet type="multi" feedback="Copied">
              {classConcept.code}
            </CodeSnippet>
          </div>
        </div>
      )}

      {/* Object panel */}
      {activeTab === "object" && (
        <div
          id="panel-object"
          role="tabpanel"
          aria-labelledby="tab-object"
          className="oop-cov-panel"
        >
          <div className="oop-concept-box">
            <h3>{objectConcept.title}</h3>
            <p>{objectConcept.definition}</p>
          </div>

          <div className="oop-object-instances-area">
            <div className="oop-object-instances-grid" aria-label="Farm objects">
              {objectConcept.instances.map((inst, i) => (
                <div
                  key={inst.name}
                  className={`oop-object-card${i < createdCount ? " oop-object-card--visible" : ""}`}
                  aria-hidden={i >= createdCount}
                >
                  <div className="oop-object-header">
                    <Tag type="blue" size="sm">
                      OBJECT
                    </Tag>
                    <span className="oop-object-name">{inst.name}</span>
                    <Tag type="cool-gray" size="sm">
                      Farm
                    </Tag>
                  </div>
                  <div className="oop-object-body">
                    <span className="oop-object-represents">{inst.represents}</span>
                    <span className="oop-object-empty-note">
                      No data yet — add <code>__init__</code> in Lesson 5.2
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="oop-object-controls">
              <Button
                kind="primary"
                size="md"
                renderIcon={AgricultureAnalytics}
                onClick={handleCreate}
                disabled={createdCount >= objectConcept.instances.length}
                aria-label="Create a new Farm object"
              >
                Create Farm()
              </Button>
              <Button
                kind="ghost"
                size="md"
                onClick={handleReset}
                disabled={createdCount === 0}
                aria-label="Reset object instances"
              >
                Reset
              </Button>
              <span className="oop-object-count" role="status" aria-live="polite">
                {createdCount} / {objectConcept.instances.length} objects created
              </span>
            </div>
          </div>

          <div className="oop-code-preview">
            <p className="oop-code-label">Python code</p>
            <CodeSnippet type="multi" feedback="Copied">
              {objectConcept.code}
            </CodeSnippet>
            <div className="oop-output-box">
              <span className="oop-output-label">Output</span>
              <code>{objectConcept.output}</code>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── 3. Memory Basic Viewer ───────────────────────────────────────────────────

export function OopMemoryBasicViewer({
  memoryObjects,
  multipleObjectsContent,
}: {
  memoryObjects: OopMemoryObject[];
  multipleObjectsContent: OopWhyOopDevelopmentPack["multipleObjects"];
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  const visible = memoryObjects.slice(0, visibleCount);
  const stackVars = memoryObjects.map((o) => o.instanceName);

  return (
    <section id="memory-viewer" className="lesson-card oop-memory-viewer">
      <h2>Memory Visualization — Objects in the Heap</h2>
      <p>
        Every Farm() call reserves space in memory (the heap) and binds the
        variable name (the stack) to that space. Click the button to create each
        object and watch the memory diagram grow.
      </p>

      <div className="oop-memory-layout" aria-label="Memory diagram">
        {/* Stack panel */}
        <div className="oop-memory-stack" aria-label="Stack — variable names">
          <p className="oop-memory-panel-label">STACK</p>
          <p className="oop-memory-panel-subtitle">Variable names</p>
          <div className="oop-memory-stack-rows">
            {stackVars.map((name, i) => (
              <div
                key={name}
                className={`oop-stack-row${i < visibleCount ? " oop-stack-row--active" : ""}`}
                aria-label={`Variable ${name}`}
              >
                <span className="oop-stack-varname">{name}</span>
                {i < visibleCount && (
                  <span className="oop-stack-arrow" aria-hidden="true">
                    ──▶
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Heap panel */}
        <div className="oop-memory-heap" aria-label="Heap — object instances">
          <p className="oop-memory-panel-label">HEAP</p>
          <p className="oop-memory-panel-subtitle">Object instances</p>
          <div className="oop-memory-heap-blocks">
            {visible.map((obj) => (
              <div
                key={obj.instanceName}
                className="oop-heap-block oop-heap-block--appear"
                aria-label={`${obj.className} object at ${obj.address}`}
              >
                <div className="oop-heap-address">{obj.address}</div>
                <div className="oop-heap-class">
                  <Tag type="purple" size="sm">
                    {obj.className}
                  </Tag>
                </div>
                <div className="oop-heap-note">(empty — no data yet)</div>
              </div>
            ))}
            {visibleCount === 0 && (
              <p className="oop-heap-empty">Create objects to see them here</p>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="oop-memory-controls">
        <Button
          kind="primary"
          size="md"
          renderIcon={View}
          onClick={() =>
            setVisibleCount((c) => Math.min(memoryObjects.length, c + 1))
          }
          disabled={visibleCount >= memoryObjects.length}
          aria-label="Create next object in memory"
        >
          Create Next Object
        </Button>
        <Button
          kind="ghost"
          size="md"
          onClick={() => setVisibleCount(0)}
          disabled={visibleCount === 0}
          aria-label="Clear memory diagram"
        >
          Clear Memory
        </Button>
        <span className="oop-memory-count" role="status" aria-live="polite">
          {visibleCount} object{visibleCount !== 1 ? "s" : ""} in memory
        </span>
      </div>

      {/* Multiple objects code */}
      <div className="oop-memory-code">
        <h3>{multipleObjectsContent.title}</h3>
        <p>{multipleObjectsContent.body}</p>
        <CodeSnippet type="multi" feedback="Copied">
          {multipleObjectsContent.code}
        </CodeSnippet>
        <Tile className="oop-independence-note">
          <CheckmarkFilled size={16} aria-hidden="true" />
          <span>{multipleObjectsContent.independenceNote}</span>
        </Tile>
      </div>
    </section>
  );
}

// ─── 4. Object Evolution Panel ────────────────────────────────────────────────

export function OopObjectEvolutionPanel({
  evolutionState,
}: {
  evolutionState: OopWhyOopDevelopmentPack["objectEvolutionState"];
}) {
  const totalLessons = 10;
  const currentLesson = parseInt(evolutionState.lessonNumber.split(".")[1], 10);
  const progress = Math.round((currentLesson / totalLessons) * 100);

  return (
    <section
      id="object-evolution"
      className="lesson-card oop-evolution-panel"
      aria-label="Object Evolution Panel"
    >
      <div className="oop-evolution-header">
        <Debug size={20} aria-hidden="true" />
        <h2>Object Evolution — Lesson {evolutionState.lessonNumber}</h2>
      </div>

      <p className="oop-evolution-subtitle">
        This panel shows the <strong>current state of our Farm class</strong> as
        it evolves through Module 5. Return here each lesson to see it grow.
      </p>

      {/* Progress bar */}
      <div className="oop-evolution-progress" aria-label={`Lesson progress: ${currentLesson} of ${totalLessons}`}>
        <div className="oop-evolution-progress-steps">
          {Array.from({ length: totalLessons }, (_, i) => i + 1).map((n) => (
            <div
              key={n}
              className={`oop-evolution-step${n <= currentLesson ? " completed" : ""}${n === currentLesson ? " current" : ""}`}
              aria-label={`Lesson 5.${n}${n === currentLesson ? " (current)" : ""}`}
              title={`Lesson 5.${n}`}
            />
          ))}
        </div>
        <span className="oop-evolution-progress-label">
          {progress}% of Module 5 complete
        </span>
      </div>

      {/* Code snapshot */}
      <div className="oop-evolution-code">
        <p className="oop-evolution-code-title">{evolutionState.title}</p>
        <CodeSnippet type="multi" feedback="Copied">
          {evolutionState.code}
        </CodeSnippet>
      </div>

      <Tile className="oop-evolution-note">
        <p>{evolutionState.note}</p>
      </Tile>

      {/* Lesson roadmap */}
      <div className="oop-evolution-roadmap">
        <p className="oop-evolution-roadmap-title">What gets added each lesson</p>
        <div className="oop-evolution-roadmap-list">
          {[
            { lesson: "5.1", label: "class Farm: pass", done: true },
            { lesson: "5.2", label: "+ __init__ and instance variables", done: false },
            { lesson: "5.3", label: "+ Class variables and methods", done: false },
            { lesson: "5.4", label: "+ Encapsulation and @property", done: false },
            { lesson: "5.5", label: "+ Inheritance (TemperatureSensor)", done: false },
            { lesson: "5.6", label: "+ Polymorphism (method overriding)", done: false },
            { lesson: "5.7", label: "+ Abstract Base Class", done: false },
            { lesson: "5.8", label: "+ Magic methods (__str__, __repr__)", done: false },
            { lesson: "5.9", label: "+ Composition (Farm HAS-A WeatherStation)", done: false },
            { lesson: "5.10", label: "= Complete Smart Farm System", done: false },
          ].map((row) => (
            <div
              key={row.lesson}
              className={`oop-evolution-row${row.done ? " done" : ""}`}
              aria-label={`Lesson ${row.lesson}: ${row.label}${row.done ? " — completed" : ""}`}
            >
              <span className="oop-evolution-row-lesson">{row.lesson}</span>
              <span className="oop-evolution-row-label">{row.label}</span>
              {row.done && (
                <CheckmarkFilled
                  size={16}
                  className="oop-evolution-check"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. Debug Challenge Block ─────────────────────────────────────────────────

export function OopDebugChallenges({
  challenges,
}: {
  challenges: OopWhyOopDevelopmentPack["debugChallenges"];
}) {
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  return (
    <section id="debug-challenge" className="lesson-card oop-debug-challenges">
      <h2>Debug Challenge</h2>
      <p>
        Each program below contains a real mistake that beginner OOP students
        commonly make. Find the error and fix it before revealing the solution.
      </p>
      <div className="oop-debug-list">
        {challenges.map((c, i) => {
          const isRevealed = revealedIndex === i;
          return (
            <div key={i} className="oop-debug-item">
              <div className="oop-debug-item-header">
                <Tag type="red" size="sm">
                  {c.mistakesToFind === 0
                    ? "Discussion"
                    : `${c.mistakesToFind} mistake${c.mistakesToFind !== 1 ? "s" : ""}`}
                </Tag>
                <h3>{c.title}</h3>
              </div>
              <p>{c.prompt}</p>
              <CodeSnippet type="multi" feedback="Copied">
                {c.code}
              </CodeSnippet>
              {!isRevealed ? (
                <div className="oop-debug-guidance">
                  <p className="oop-debug-hint">{c.hiddenGuidance}</p>
                  <Button
                    kind="secondary"
                    size="sm"
                    onClick={() => setRevealedIndex(i)}
                    aria-label={`Show solution for: ${c.title}`}
                  >
                    Show solution
                  </Button>
                </div>
              ) : (
                <div className="oop-debug-solution">
                  <p className="oop-debug-solution-label">Solution</p>
                  <CodeSnippet type="multi" feedback="Copied">
                    {c.solution}
                  </CodeSnippet>
                  <Button
                    kind="ghost"
                    size="sm"
                    onClick={() => setRevealedIndex(null)}
                    aria-label={`Hide solution for: ${c.title}`}
                  >
                    Hide solution
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── 6. Think Like an Engineer ───────────────────────────────────────────────

export function OopEngineerThinkingCard({
  prompt,
}: {
  prompt: string;
}) {
  return (
    <section
      id="think-like-engineer"
      className="lesson-card oop-engineer-thinking"
      aria-label="Think like an engineer"
    >
      <div className="oop-engineer-header">
        <Idea size={24} aria-hidden="true" />
        <h2>Think Like an Engineer</h2>
      </div>
      <p className="oop-engineer-prompt">{prompt}</p>
      <Tile className="oop-engineer-note">
        <p>
          There is no single right answer. Write your reasoning in the comments
          of your playground code, or discuss with a peer.
        </p>
      </Tile>
    </section>
  );
}
