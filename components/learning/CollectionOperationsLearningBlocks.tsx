import { Button, Tag, Tile } from "@carbon/react";
import { AgricultureAnalytics, CheckmarkOutline, Code, Flow, Idea } from "@carbon/icons-react";
import { useState } from "react";
import type { CollectionOperationsDevelopmentPack } from "@/types/content";

type Pack = CollectionOperationsDevelopmentPack;

export function CollectionOperationsStorySection({ story }: { story: Pack["story"] }) {
  return (
    <section id="story" className="lesson-card collection-operations-story" aria-labelledby="story-title">
      <p className="lesson-section-label"><AgricultureAnalytics size={16} /> Real-world story</p>
      <h2 id="story-title">{story.title}</h2>
      <p>{story.body}</p>

      <div className="operations-problem-block">
        <h3>{story.problem.title}</h3>
        <p>{story.problem.body}</p>
        
        <div className="multi-payload-flex">
          <Tile className="payload-card">
            <span className="payload-tag">List Payload</span>
            <code>moisture = [25, 30, 28]</code>
          </Tile>
          <Tile className="payload-card">
            <span className="payload-tag">Tuple Payload</span>
            <code>location = (17.38, 78.48)</code>
          </Tile>
          <Tile className="payload-card">
            <span className="payload-tag">Set Payload</span>
            <code>active_ids = {"{101, 102, 103}"}</code>
          </Tile>
          <Tile className="payload-card">
            <span className="payload-tag">Dict Payload</span>
            <code>farm = {"{'name': 'Valley'}"}</code>
          </Tile>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// INTERACTIVE FUNCTION EXPLORER
// ----------------------------------------------------
export function FunctionExplorer({ builtIns }: { builtIns: Pack["builtIns"] }) {
  const [activeFunc, setActiveFunc] = useState<string>("len()");

  const selectedItem = builtIns.items.find((i) => i.func === activeFunc) || builtIns.items[0];

  // Dynamic values for the 4 collection cards
  const samples = {
    list: [10, 20, 30],
    tuple: [70, 85, 90],
    set: new Set([2, 8, 5]),
    dict: { A: 5, B: 9, C: 2 }
  };

  function executeFunc(funcName: string, collType: "list" | "tuple" | "set" | "dict") {
    try {
      if (funcName === "len()") {
        if (collType === "list") return "3";
        if (collType === "tuple") return "3";
        if (collType === "set") return "3";
        if (collType === "dict") return "3 (key-value pairs)";
      }
      if (funcName === "max()") {
        if (collType === "list") return "30";
        if (collType === "tuple") return "90";
        if (collType === "set") return "8";
        if (collType === "dict") return "'C' (inspects keys)";
      }
      if (funcName === "min()") {
        if (collType === "list") return "10";
        if (collType === "tuple") return "70";
        if (collType === "set") return "2";
        if (collType === "dict") return "'A' (inspects keys)";
      }
      if (funcName === "sum()") {
        if (collType === "list") return "60";
        if (collType === "tuple") return "245";
        if (collType === "set") return "15";
        if (collType === "dict") return "16 (requires sum(d.values()))";
      }
      if (funcName === "sorted()") {
        if (collType === "list") return "[10, 20, 30]";
        if (collType === "tuple") return "[70, 85, 90]";
        if (collType === "set") return "[2, 5, 8]";
        if (collType === "dict") return "['A', 'B', 'C']";
      }
      if (funcName === "reversed()") {
        if (collType === "list") return "[30, 20, 10]";
        if (collType === "tuple") return "[90, 85, 70]";
        if (collType === "set") return "❌ TypeError (unordered)";
        if (collType === "dict") return "❌ TypeError (unordered)";
      }
      if (funcName === "any()") {
        return "True";
      }
      if (funcName === "all()") {
        return "True";
      }
    } catch {
      return "Error";
    }
    return "N/A";
  }

  return (
    <section id="function-explorer" className="lesson-card function-explorer-card" aria-labelledby="func-explorer-title">
      <p className="lesson-section-label"><Flow size={16} /> Interactive tool</p>
      <h2 id="func-explorer-title">Universal Function Explorer</h2>
      <p>
        Select a built-in function below to inspect how Python evaluates it simultaneously across a List, Tuple, Set, and Dictionary.
      </p>

      <div className="function-tabs-row">
        {builtIns.items.map((item) => (
          <Button
            key={item.func}
            size="sm"
            kind={activeFunc === item.func ? "primary" : "ghost"}
            onClick={() => setActiveFunc(item.func)}
          >
            <code>{item.func}</code>
          </Button>
        ))}
      </div>

      <Tile className="function-detail-tile">
        <div className="func-header">
          <code>{selectedItem.func}</code>
          <span>{selectedItem.description}</span>
        </div>
        {selectedItem.dictNote && (
          <p className="func-dict-note">💡 <strong>Dictionary Behavior:</strong> {selectedItem.dictNote}</p>
        )}
      </Tile>

      <div className="collection-parallel-grid">
        <Tile className="parallel-card">
          <Tag type="blue">List</Tag>
          <code>numbers = [10, 20, 30]</code>
          <div className="result-box">
            <span>Result:</span>
            <strong>{executeFunc(activeFunc, "list")}</strong>
          </div>
        </Tile>

        <Tile className="parallel-card">
          <Tag type="purple">Tuple</Tag>
          <code>marks = (70, 85, 90)</code>
          <div className="result-box">
            <span>Result:</span>
            <strong>{executeFunc(activeFunc, "tuple")}</strong>
          </div>
        </Tile>

        <Tile className="parallel-card">
          <Tag type="teal">Set</Tag>
          <code>values = {"{2, 8, 5}"}</code>
          <div className="result-box">
            <span>Result:</span>
            <strong>{executeFunc(activeFunc, "set")}</strong>
          </div>
        </Tile>

        <Tile className="parallel-card">
          <Tag type="green">Dictionary</Tag>
          <code>farm = {"{'A': 5, 'B': 9, 'C': 2}"}</code>
          <div className="result-box">
            <span>Result:</span>
            <strong>{executeFunc(activeFunc, "dict")}</strong>
          </div>
        </Tile>
      </div>
    </section>
  );
}

export function BuiltInComparisonTable({ builtInComparison }: { builtInComparison: Pack["builtInComparison"] }) {
  return (
    <section id="built-in-matrix" className="lesson-card builtin-matrix-card" aria-labelledby="matrix-title">
      <p className="lesson-section-label"><CheckmarkOutline size={16} /> Reference matrix</p>
      <h2 id="matrix-title">{builtInComparison.title}</h2>
      <p>{builtInComparison.body}</p>

      <div className="collection-comparison-table collection-comparison-table--5col" role="table">
        <div role="row" className="comparison-heading">
          <strong role="columnheader">Function</strong>
          <strong role="columnheader">List</strong>
          <strong role="columnheader">Tuple</strong>
          <strong role="columnheader">Set</strong>
          <strong role="columnheader">Dictionary</strong>
        </div>
        {builtInComparison.rows.map((row, i) => (
          <div role="row" key={i}>
            <span role="cell"><code>{row.function}</code></span>
            <span role="cell">{row.list}</span>
            <span role="cell">{row.tuple}</span>
            <span role="cell">{row.set}</span>
            <span role="cell">{row.dict}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ----------------------------------------------------
// INTERACTIVE METHOD EXPLORER
// ----------------------------------------------------
export function MethodExplorer({ methodsSummary }: { methodsSummary: Pack["methodsSummary"] }) {
  const [selectedType, setSelectedType] = useState<string>("list");
  const [selectedMethod, setSelectedMethod] = useState<string>("append()");

  const activeCollection = methodsSummary.collections.find((c) => c.type === selectedType) || methodsSummary.collections[0];
  const activeMethod = activeCollection.methods.find((m) => m.name === selectedMethod) || activeCollection.methods[0];

  return (
    <section id="method-explorer" className="lesson-card method-explorer-card" aria-labelledby="method-exp-title">
      <p className="lesson-section-label"><Code size={16} /> Interactive simulator</p>
      <h2 id="method-exp-title">Collection Method Explorer</h2>
      <p>
        Select a collection type and a method to inspect how the method signature operates.
      </p>

      <div className="type-selector-buttons">
        {methodsSummary.collections.map((c) => (
          <Button
            key={c.type}
            size="sm"
            kind={selectedType === c.type ? "primary" : "ghost"}
            onClick={() => {
              setSelectedType(c.type);
              setSelectedMethod(c.methods[0].name);
            }}
          >
            {c.name}
          </Button>
        ))}
      </div>

      <div className="method-explorer-flex">
        <div className="methods-sidebar">
          {activeCollection.methods.map((m) => (
            <button
              type="button"
              key={m.name}
              className={`method-nav-btn ${selectedMethod === m.name ? "is-selected" : ""}`}
              onClick={() => setSelectedMethod(m.name)}
            >
              <code>{m.name}</code>
            </button>
          ))}
        </div>

        <Tile className="method-display-pane">
          <span>Method Signature</span>
          <code>{activeMethod.signature}</code>
          <span>Operation Description</span>
          <p>{activeMethod.desc}</p>
        </Tile>
      </div>
    </section>
  );
}

export function OperationsComparisonMatrix({ operationsMatrix }: { operationsMatrix: Pack["operationsMatrix"] }) {
  return (
    <section id="operations-matrix" className="lesson-card operations-matrix-card" aria-labelledby="ops-matrix-title">
      <p className="lesson-section-label"><CheckmarkOutline size={16} /> Action comparison</p>
      <h2 id="ops-matrix-title">{operationsMatrix.title}</h2>
      <p>{operationsMatrix.body}</p>

      <div className="collection-comparison-table collection-comparison-table--5col" role="table">
        <div role="row" className="comparison-heading">
          <strong role="columnheader">Operation</strong>
          <strong role="columnheader">List</strong>
          <strong role="columnheader">Tuple</strong>
          <strong role="columnheader">Set</strong>
          <strong role="columnheader">Dictionary</strong>
        </div>
        {operationsMatrix.rows.map((row, i) => (
          <div role="row" key={i}>
            <span role="cell"><strong>{row.operation}</strong></span>
            <span role="cell"><code>{row.list}</code></span>
            <span role="cell"><code>{row.tuple}</code></span>
            <span role="cell"><code>{row.set}</code></span>
            <span role="cell"><code>{row.dict}</code></span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CollectionAgritechPanel({ agritech }: { agritech: Pack["agritech"] }) {
  return (
    <section id="agritech-example" className="lesson-card agritech-operations-panel" aria-labelledby="agritech-title">
      <p className="lesson-section-label"><AgricultureAnalytics size={16} /> Industry application</p>
      <h2 id="agritech-title">{agritech.title}</h2>
      <p>{agritech.body}</p>

      <div className="agritech-example-grid">
        <div className="code-display-block">
          <span>Python script</span>
          <pre><code>{agritech.code}</code></pre>
        </div>
        <div className="output-display-block">
          <span>Expected output</span>
          <pre><code>{agritech.output}</code></pre>
        </div>
      </div>
    </section>
  );
}

export function CollectionEngineerScenario({ content }: { content: Pack["engineerScenario"] }) {
  return (
    <section id="engineer" className="lesson-card collection-engineer" aria-labelledby="engineer-title">
      <p className="lesson-section-label"><Idea size={16} /> Think like an engineer</p>
      <h2 id="engineer-title">{content.title}</h2>
      <p>{content.body}</p>
      <blockquote>{content.question}</blockquote>
    </section>
  );
}
