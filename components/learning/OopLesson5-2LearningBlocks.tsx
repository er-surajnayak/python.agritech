import { useState } from "react";
import { Button, CodeSnippet, Tag, Tile } from "@carbon/react";
import {
  ChevronRight,
  ChevronLeft,
  Idea,
  CheckmarkFilled,
  Warning,
  Run,
  Catalog,
} from "@carbon/icons-react";
import type {
  OopConstructorsDevelopmentPack,
  OopConstructorStep,
} from "@/types/content";
import { OopObjectEvolutionPanel } from "@/components/learning/OopLesson5-1LearningBlocks";

// ─── 1. Constructor Flow Visualizer ──────────────────────────────────────────

export function OopConstructorFlowVisualizer({
  steps,
}: {
  steps: OopConstructorStep[];
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const step = steps[currentStepIndex];

  return (
    <section id="constructor-flow" className="lesson-card oop-constructor-flow">
      <h2>Constructor Flow Visualizer — How __init__() Executes</h2>
      <p>
        Step through the initialization of <code>farm1 = Farm("Green Valley", "Rice")</code> line by line. Watch how Python creates the object, binds <code>self</code>, and attaches instance variables.
      </p>

      <div className="oop-cfv-container" aria-label="Constructor Execution Flow">
        {/* Left: Step navigation & code execution */}
        <div className="oop-cfv-code-panel">
          <div className="oop-cfv-header">
            <Tag type="warm-gray" size="sm">
              __init__() EXECUTION
            </Tag>
            <span className="oop-cfv-step-badge">
              Step {step.stepNumber} of {steps.length}
            </span>
          </div>

          <div className="oop-cfv-code-display">
            <pre>
              <code>
                {`class Farm:
    def __init__(self, name, crop):`}
                {"\n"}
                <span
                  className={
                    step.lineHighlight.includes("self.name")
                      ? "oop-cfv-line--active"
                      : ""
                  }
                >
                  {"        self.name = name"}
                </span>
                {"\n"}
                <span
                  className={
                    step.lineHighlight.includes("self.crop")
                      ? "oop-cfv-line--active"
                      : ""
                  }
                >
                  {"        self.crop = crop"}
                </span>
                {"\n\n"}
                <span
                  className={
                    step.lineHighlight.includes("Farm(")
                      ? "oop-cfv-line--active"
                      : ""
                  }
                >
                  {"farm1 = Farm('Green Valley', 'Rice')"}
                </span>
              </code>
            </pre>
          </div>

          <div className="oop-cfv-explanation" role="status" aria-live="polite">
            <p className="oop-cfv-explanation-title">{step.label}</p>
            <p className="oop-cfv-explanation-text">{step.explanation}</p>
          </div>

          <div className="oop-cfv-controls">
            <Button
              kind="ghost"
              size="sm"
              renderIcon={ChevronLeft}
              onClick={() => setCurrentStepIndex((p) => Math.max(0, p - 1))}
              disabled={currentStepIndex === 0}
              aria-label="Previous step"
            >
              Previous
            </Button>
            <Button
              kind="primary"
              size="sm"
              renderIcon={ChevronRight}
              onClick={() =>
                setCurrentStepIndex((p) =>
                  Math.min(steps.length - 1, p + 1)
                )
              }
              disabled={currentStepIndex === steps.length - 1}
              aria-label="Next step"
            >
              Next Step
            </Button>
          </div>
        </div>

        {/* Right: Object Self State Card */}
        <div className="oop-cfv-state-panel">
          <p className="oop-cfv-state-title">
            <span className="oop-cfv-self-tag">self</span> Object Memory State
          </p>
          <div className="oop-cfv-state-card">
            <div className="oop-cfv-card-header">
              <span className="oop-cfv-card-id">{step.selfState.id}</span>
              <Tag type="blue" size="sm">
                Farm Instance
              </Tag>
            </div>
            <div className="oop-cfv-card-attributes">
              <div className="oop-cfv-attr-row">
                <span className="oop-cfv-attr-key">self.name</span>
                <span className="oop-cfv-attr-colon">:</span>
                <span
                  className={`oop-cfv-attr-val${
                    step.selfState.name !== "(unassigned)"
                      ? " oop-cfv-attr-val--set"
                      : ""
                  }`}
                >
                  {step.selfState.name}
                </span>
              </div>
              <div className="oop-cfv-attr-row">
                <span className="oop-cfv-attr-key">self.crop</span>
                <span className="oop-cfv-attr-colon">:</span>
                <span
                  className={`oop-cfv-attr-val${
                    step.selfState.crop !== "(unassigned)"
                      ? " oop-cfv-attr-val--set"
                      : ""
                  }`}
                >
                  {step.selfState.crop}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. Self Explorer ────────────────────────────────────────────────────────

export function OopSelfExplorer({
  selfConcept,
}: {
  selfConcept: OopConstructorsDevelopmentPack["selfConcept"];
}) {
  const [selectedEntity, setSelectedEntity] = useState<"farm1" | "farm2">(
    "farm1"
  );

  return (
    <section id="self-explorer" className="lesson-card oop-self-explorer">
      <h2>{selfConcept.title}</h2>
      <p>{selfConcept.definition}</p>

      {/* Classroom Analogy Card */}
      <Tile className="oop-self-analogy-tile">
        <h3>Classroom Analogy</h3>
        <p className="oop-analogy-prompt">
          🗣 <strong>{selfConcept.classroomAnalogy.teacherPrompt}</strong>
        </p>
        <p className="oop-analogy-action">
          ✍️ {selfConcept.classroomAnalogy.studentAction}
        </p>
        <div className="oop-analogy-lesson">
          <Idea size={20} aria-hidden="true" />
          <p>{selfConcept.classroomAnalogy.lesson}</p>
        </div>
      </Tile>

      {/* Interactive Self Switcher */}
      <div className="oop-self-interactive">
        <h3>Interactive: Who is "self" right now?</h3>
        <p>Click an object below to see what <code>self</code> means when its constructor runs:</p>

        <div className="oop-self-buttons" role="group" aria-label="Select Farm Instance">
          <button
            className={`oop-self-btn${selectedEntity === "farm1" ? " active" : ""}`}
            onClick={() => setSelectedEntity("farm1")}
            aria-pressed={selectedEntity === "farm1"}
          >
            farm1 = Farm("Green Valley", "Rice")
          </button>
          <button
            className={`oop-self-btn${selectedEntity === "farm2" ? " active" : ""}`}
            onClick={() => setSelectedEntity("farm2")}
            aria-pressed={selectedEntity === "farm2"}
          >
            farm2 = Farm("Sunrise Farm", "Wheat")
          </button>
        </div>

        <div className="oop-self-display-box">
          {selectedEntity === "farm1" ? (
            <div>
              <p className="oop-self-resolved">
                When <code>farm1</code> is being created:
              </p>
              <div className="oop-self-mapping">
                <code>self</code> ➔ points to memory location <code>#0x1A2B</code> (farm1)
              </div>
              <p className="oop-self-effect">
                <code>self.name = "Green Valley"</code> sets <code>farm1.name</code>. <code>farm2</code> is unaffected!
              </p>
            </div>
          ) : (
            <div>
              <p className="oop-self-resolved">
                When <code>farm2</code> is being created:
              </p>
              <div className="oop-self-mapping">
                <code>self</code> ➔ points to memory location <code>#0x3C4D</code> (farm2)
              </div>
              <p className="oop-self-effect">
                <code>self.name = "Sunrise Farm"</code> sets <code>farm2.name</code>. <code>farm1</code> is unaffected!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Rules list */}
      <div className="oop-self-rules">
        <h3>Key Rules of self</h3>
        <ul>
          {selfConcept.rules.map((rule, i) => (
            <li key={i}>
              <CheckmarkFilled size={16} aria-hidden="true" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── 3. Instance Variable Inspector ─────────────────────────────────────────

export function OopInstanceVariableInspector({
  instanceVariables,
  memoryVisualization,
}: {
  instanceVariables: OopConstructorsDevelopmentPack["instanceVariables"];
  memoryVisualization: OopConstructorsDevelopmentPack["memoryVisualization"];
}) {
  return (
    <section id="instance-variables" className="lesson-card oop-instance-inspector">
      <h2>{instanceVariables.title}</h2>
      <p>{instanceVariables.body}</p>

      <CodeSnippet type="multi" feedback="Copied">
        {instanceVariables.code}
      </CodeSnippet>

      <div className="oop-output-box">
        <span className="oop-output-label">Output</span>
        <pre>{instanceVariables.output}</pre>
      </div>

      <p className="oop-instance-exp">{instanceVariables.explanation}</p>

      {/* Side-by-side Memory State Cards */}
      <div className="oop-memory-state-section">
        <h3>{memoryVisualization.title}</h3>
        <p>{memoryVisualization.body}</p>

        <div className="oop-memory-cards-grid">
          {memoryVisualization.objects.map((obj) => (
            <div key={obj.instanceName} className="oop-memory-instance-card">
              <div className="oop-mic-header">
                <Tag type="blue" size="sm">
                  {obj.instanceName}
                </Tag>
                <span className="oop-mic-address">{obj.address}</span>
              </div>
              <div className="oop-mic-body">
                <p className="oop-mic-class">Class: {obj.className}</p>
                <div className="oop-mic-attrs">
                  {obj.attributes.map((attr) => (
                    <div key={attr.key} className="oop-mic-attr-row">
                      <span className="oop-mic-key">self.{attr.key}</span>
                      <span className="oop-mic-eq">=</span>
                      <span className="oop-mic-val">{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. Debug Challenges ─────────────────────────────────────────────────────

export function OopDebugChallenges5_2({
  challenges,
}: {
  challenges: OopConstructorsDevelopmentPack["debugChallenges"];
}) {
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  return (
    <section id="debug-challenge" className="lesson-card oop-debug-challenges">
      <h2>Debug Challenge — Constructor Mistakes</h2>
      <p>
        Identify and fix these three common constructor bugs before revealing the solutions.
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
                    : `${c.mistakesToFind} mistake${
                        c.mistakesToFind !== 1 ? "s" : ""
                      }`}
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

// ─── 5. Think Like an Engineer ───────────────────────────────────────────────

export function OopEngineerThinkingCard5_2({
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
        <h2>Think Like an Engineer — Constructor Design</h2>
      </div>
      <p className="oop-engineer-prompt">{prompt}</p>
      <Tile className="oop-engineer-note">
        <p>
          Consider trade-offs: strict mandatory parameters vs default fallbacks.
          In critical IoT and agricultural telemetry, missing data can cause bad irrigation decisions.
        </p>
      </Tile>
    </section>
  );
}
