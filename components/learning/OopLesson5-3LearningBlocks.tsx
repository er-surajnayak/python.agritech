import { useState } from "react";
import { Button, CodeSnippet, Tag, Tile } from "@carbon/react";
import {
  ChevronRight,
  ChevronLeft,
  Idea,
  CheckmarkFilled,
  Run,
  Flow,
} from "@carbon/icons-react";
import type {
  OopMethodsAndClassVarsDevelopmentPack,
} from "@/types/content";

// ─── 1. Instance vs Class Variable Comparator ────────────────────────────────

export function OopInstanceVsClassVarComparator({
  comparisonTable,
  classVariablesContent,
}: {
  comparisonTable: OopMethodsAndClassVarsDevelopmentPack["comparisonTable"];
  classVariablesContent: OopMethodsAndClassVarsDevelopmentPack["classVariables"];
}) {
  const [activeTab, setActiveTab] = useState<"instance" | "class">("instance");

  return (
    <section id="instance-vs-class-var" className="lesson-card oop-var-comparator">
      <h2>Instance Variables vs Class Variables</h2>
      <p>
        Understand the difference between object-specific state (instance variables) and shared blueprint state (class variables).
      </p>

      {/* Tab Controls */}
      <div className="oop-vc-tabs" role="tablist" aria-label="Variable Scope Comparator">
        <button
          role="tab"
          aria-selected={activeTab === "instance"}
          className={`oop-vc-tab${activeTab === "instance" ? " active" : ""}`}
          onClick={() => setActiveTab("instance")}
          id="tab-instance-var"
          aria-controls="panel-instance-var"
        >
          Instance Variables (self.name)
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "class"}
          className={`oop-vc-tab${activeTab === "class" ? " active" : ""}`}
          onClick={() => setActiveTab("class")}
          id="tab-class-var"
          aria-controls="panel-class-var"
        >
          Class Variables (Farm.total_farms)
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "instance" && (
        <div id="panel-instance-var" role="tabpanel" aria-labelledby="tab-instance-var" className="oop-vc-panel">
          <Tile className="oop-vc-tile oop-vc-tile--instance">
            <div className="oop-vc-tile-header">
              <Tag type="blue" size="sm">
                INSTANCE VARIABLE
              </Tag>
              <h3>Stored per Object Instance</h3>
            </div>
            <p>
              <code>self.name = name</code> creates an attribute attached to a single object in memory. <code>farm1.name</code> ("Green Valley") is stored in <code>farm1</code>&apos;s heap box, while <code>farm2.name</code> ("Sunrise Farm") is stored in <code>farm2</code>&apos;s heap box.
            </p>
            <div className="oop-vc-code-box">
              <code>{`farm1.name -> "Green Valley"\nfarm2.name -> "Sunrise Farm"`}</code>
            </div>
          </Tile>
        </div>
      )}

      {activeTab === "class" && (
        <div id="panel-class-var" role="tabpanel" aria-labelledby="tab-class-var" className="oop-vc-panel">
          <Tile className="oop-vc-tile oop-vc-tile--class">
            <div className="oop-vc-tile-header">
              <Tag type="purple" size="sm">
                CLASS VARIABLE
              </Tag>
              <h3>Stored Once on the Class Object</h3>
            </div>
            <p>{classVariablesContent.problemBody}</p>
            <CodeSnippet type="multi" feedback="Copied">
              {classVariablesContent.code}
            </CodeSnippet>
            <div className="oop-output-box">
              <span className="oop-output-label">Output</span>
              <pre>{classVariablesContent.output}</pre>
            </div>
          </Tile>
        </div>
      )}

      {/* Comparison Table */}
      <div className="oop-vc-table-wrapper">
        <h3>Feature Comparison Table</h3>
        <table className="oop-vc-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Instance Variable (self.attr)</th>
              <th>Class Variable (Class.attr)</th>
            </tr>
          </thead>
          <tbody>
            {comparisonTable.map((row, i) => (
              <tr key={i}>
                <td className="oop-vct-feature">{row.feature}</td>
                <td className="oop-vct-instance">{row.instanceVar}</td>
                <td className="oop-vct-class">{row.classVar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── 2. Class Method Explorer ────────────────────────────────────────────────

export function OopClassMethodExplorer({
  classMethodsContent,
}: {
  classMethodsContent: OopMethodsAndClassVarsDevelopmentPack["classMethods"];
}) {
  const [farmCount, setFarmCount] = useState(2);

  return (
    <section id="class-methods" className="lesson-card oop-class-method-explorer">
      <h2>{classMethodsContent.title}</h2>
      <p>{classMethodsContent.definition}</p>

      <div className="oop-cm-breakdown">
        <Tile className="oop-cm-tile">
          <div className="oop-cm-badge-row">
            <Tag type="warm-gray" size="sm">
              {classMethodsContent.decorator}
            </Tag>
            <Tag type="purple" size="sm">
              cls parameter
            </Tag>
          </div>
          <p className="oop-cm-exp">{classMethodsContent.clsExplanation}</p>
        </Tile>
      </div>

      <CodeSnippet type="multi" feedback="Copied">
        {classMethodsContent.code}
      </CodeSnippet>

      {/* Interactive Class Method Execution Simulator */}
      <div className="oop-cm-simulator">
        <h3>Interactive: Execute Farm.get_total_farms()</h3>
        <p>Simulate instantiating new Farm objects and observe how the class method reads <code>cls.total_farms</code>:</p>

        <div className="oop-cms-controls">
          <Button
            kind="primary"
            size="sm"
            renderIcon={Run}
            onClick={() => setFarmCount((c) => c + 1)}
          >
            Create New Farm()
          </Button>
          <Button
            kind="ghost"
            size="sm"
            onClick={() => setFarmCount(0)}
            disabled={farmCount === 0}
          >
            Reset Counter
          </Button>
          <span className="oop-cms-count">
            Farm.total_farms = <strong>{farmCount}</strong>
          </span>
        </div>

        <div className="oop-cms-execution-box">
          <p className="oop-cms-call">Executing: <code>Farm.get_total_farms()</code></p>
          <div className="oop-cms-result">
            📊 Total registered farms in Smart Farm Global: <strong>{farmCount}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. Debug Challenges 5.3 ──────────────────────────────────────────────────

export function OopDebugChallenges5_3({
  challenges,
}: {
  challenges: OopMethodsAndClassVarsDevelopmentPack["debugChallenges"];
}) {
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

  return (
    <section id="debug-challenge" className="lesson-card oop-debug-challenges">
      <h2>Debug Challenge — Methods & Class Variables</h2>
      <p>
        Identify and fix these common mistakes involving instance methods, class variables, and class methods.
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

// ─── 4. Think Like an Engineer 5.3 ───────────────────────────────────────────

export function OopEngineerThinkingCard5_3({
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
        <h2>Think Like an Engineer — Memory & Architecture</h2>
      </div>
      <p className="oop-engineer-prompt">{prompt}</p>
      <Tile className="oop-engineer-note">
        <p>
          Memory calculation hint: 100,000 objects × 2 string attributes = 200,000 string references in heap vs 2 string references stored once on the Class object.
        </p>
      </Tile>
    </section>
  );
}
