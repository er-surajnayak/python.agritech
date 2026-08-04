import { useState } from "react";
import { Button, CodeSnippet, Tag, Tile } from "@carbon/react";
import {
  Idea,
  CheckmarkFilled,
  Flow,
  Subtract,
  Add,
  ChevronRight,
} from "@carbon/icons-react";
import type { OopInheritanceDevelopmentPack } from "@/types/content";

// ─── 1. Code Savings Counter Widget ──────────────────────────────────────────

export function OopCodeSavingsCounter({
  codeSavingsCounter,
}: {
  codeSavingsCounter: OopInheritanceDevelopmentPack["codeSavingsCounter"];
}) {
  const [showWithInheritance, setShowWithInheritance] = useState(true);

  return (
    <section id="code-savings-counter" className="lesson-card oop-code-savings">
      <h2>Interactive Code Savings Counter</h2>
      <p>
        Compare how inheritance drastically reduces boilerplate lines of code across 4 sensor classes.
      </p>

      <div className="oop-cs-toggle-bar">
        <Button
          kind={!showWithInheritance ? "primary" : "ghost"}
          size="sm"
          onClick={() => setShowWithInheritance(false)}
        >
          Without Inheritance (Repetitive)
        </Button>
        <Button
          kind={showWithInheritance ? "primary" : "ghost"}
          size="sm"
          onClick={() => setShowWithInheritance(true)}
        >
          With Inheritance (Reusable Base Class)
        </Button>
      </div>

      <div className="oop-cs-metrics-grid">
        <Tile className={`oop-cs-stat-card${!showWithInheritance ? " is-active" : ""}`}>
          <span className="oop-cs-label">Without Inheritance</span>
          <span className="oop-cs-number oop-cs-bad">
            {codeSavingsCounter.withoutInheritanceLines} Lines
          </span>
          <p className="oop-cs-desc">4 separate classes repeating sensor_id, battery, and display()</p>
        </Tile>

        <Tile className={`oop-cs-stat-card${showWithInheritance ? " is-active" : ""}`}>
          <span className="oop-cs-label">With Inheritance</span>
          <span className="oop-cs-number oop-cs-good">
            {codeSavingsCounter.withInheritanceLines} Lines
          </span>
          <p className="oop-cs-desc">1 parent Sensor class (30 lines) + 4 child classes (8 lines each)</p>
        </Tile>

        <Tile className="oop-cs-stat-card oop-cs-savings-card">
          <span className="oop-cs-label">Code Reduction</span>
          <span className="oop-cs-number oop-cs-highlight">
            -{codeSavingsCounter.savedPercentage}%
          </span>
          <p className="oop-cs-desc">Saved 98 lines of redundant maintenance code!</p>
        </Tile>
      </div>

      <p className="oop-cs-explanation">{codeSavingsCounter.explanation}</p>
    </section>
  );
}

// ─── 2. Interactive Inheritance Tree Visualizer ──────────────────────────────

export function OopInheritanceTreeVisualizer({
  typesOfInheritance,
}: {
  typesOfInheritance: OopInheritanceDevelopmentPack["typesOfInheritance"];
}) {
  const [selectedType, setSelectedType] = useState<number>(0);
  const current = typesOfInheritance[selectedType];

  return (
    <section id="inheritance-tree" className="lesson-card oop-inheritance-tree">
      <h2>Interactive Inheritance Tree & Subclass Inspector</h2>
      <p>
        Select different inheritance structures to visualize parent-child relationships in Agritech systems.
      </p>

      {/* Inheritance Type Tabs */}
      <div className="oop-it-tabs" role="tablist" aria-label="Inheritance Types">
        {typesOfInheritance.map((t, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={selectedType === idx}
            className={`oop-it-tab${selectedType === idx ? " active" : ""}`}
            onClick={() => setSelectedType(idx)}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Selected Type Detail Card */}
      <Tile className="oop-it-detail-tile">
        <div className="oop-it-header">
          <Tag type="blue" size="sm">
            {current.structure}
          </Tag>
          <h3>{current.name}</h3>
        </div>
        <p className="oop-it-desc">{current.description}</p>

        <div className="oop-it-tree-preview">
          <div className="oop-it-tree-box oop-it-parent">
            <span className="oop-it-role">PARENT BASE CLASS</span>
            <code>Sensor (sensor_id, battery, display())</code>
          </div>
          <ChevronRight className="oop-it-arrow" size={20} aria-hidden="true" />
          <div className="oop-it-tree-box oop-it-child">
            <span className="oop-it-role">CHILD SUBCLASS</span>
            <code>{current.agritechExample}</code>
          </div>
        </div>

        <div className="oop-it-agritech-badge">
          <strong>Smart Farm Real-World Example:</strong> {current.agritechExample}
        </div>
      </Tile>
    </section>
  );
}

// ─── 3. Debug Challenges 5.5 ──────────────────────────────────────────────────

export function OopDebugChallenges5_5({
  challenges,
}: {
  challenges: OopInheritanceDevelopmentPack["debugChallenges"];
}) {
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  return (
    <section id="debug-challenge" className="lesson-card oop-debug-challenges">
      <h2>Debug Challenge — Inheritance Bugs</h2>
      <p>
        Identify and fix these common inheritance errors involving missing <code>super()</code> calls, invalid super syntax, and missing parent class declarations.
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

// ─── 4. Think Like an Engineer 5.5 ───────────────────────────────────────────

export function OopEngineerThinkingCard5_5({
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
        <h2>Think Like an Engineer — Composition vs Deep Inheritance</h2>
      </div>
      <p className="oop-engineer-prompt">{prompt}</p>
      <Tile className="oop-engineer-note">
        <p>
          Rule of Thumb: Prefer shallow inheritance hierarchies (1–2 levels max). If you find yourself building a 5-level deep inheritance tree, consider using Composition (&quot;has-a&quot; relationship) instead!
        </p>
      </Tile>
    </section>
  );
}
