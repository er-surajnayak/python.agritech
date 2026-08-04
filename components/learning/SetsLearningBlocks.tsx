"use client";

import { useMemo, useState, useEffect } from "react";
import { Button, NumberInput, TextInput, Tag, Tile } from "@carbon/react";
import { Checkmark, Close, Play, Reset, SkipForward } from "@carbon/icons-react";
import type { SetsDevelopmentPack } from "@/types/content";

type Pack = SetsDevelopmentPack;

// Simple helper to render values cleanly
function renderValue(val: string | number) {
  return typeof val === "string" ? `"${val}"` : String(val);
}

/* ==========================================================================
   1. Set Visualizer
   ========================================================================== */
export function SetVisualizer() {
  const [elements, setElements] = useState<number[]>([101, 205, 310]);
  const [inputVal, setInputVal] = useState<number>(410);
  const [duplicateAlert, setDuplicateAlert] = useState<number | null>(null);
  const [addedItem, setAddedItem] = useState<number | null>(null);

  function handleAdd(val: number) {
    if (Number.isNaN(val)) return;
    if (elements.includes(val)) {
      setDuplicateAlert(val);
      setTimeout(() => setDuplicateAlert(null), 1000);
    } else {
      setElements([...elements, val]);
      setAddedItem(val);
      setTimeout(() => setAddedItem(null), 800);
    }
  }

  function handleRemove(val: number) {
    setElements(elements.filter((el) => el !== val));
  }

  return (
    <section id="set-visualizer" className="lesson-card" aria-labelledby="set-vis-title">
      <p className="lesson-section-label">Interactive Set Visualizer</p>
      <h2 id="set-vis-title">Unordered Unique Collection</h2>
      <p>
        Add values to the set. Notice how adding duplicates causes a visual alert and is ignored, and how set items don't have indexes.
      </p>

      <div className="set-visualizer-container">
        {/* Controls */}
        <div className="set-visualizer-controls">
          <NumberInput
            id="set-input-num"
            label="Element Value"
            value={inputVal}
            onChange={(_evt, state) => setInputVal(Number(state.value))}
          />
          <div className="control-buttons">
            <Button size="sm" onClick={() => handleAdd(inputVal)}>Add to Set</Button>
            <Button size="sm" kind="tertiary" onClick={() => handleAdd(101)}>Add Duplicate (101)</Button>
            <Button size="sm" kind="ghost" onClick={() => setElements([101, 205, 310])}>Reset</Button>
          </div>
        </div>

        {/* Display Set */}
        <div className="set-visualizer-display">
          <div className="set-braces">{`{`}</div>
          <div className="set-chips-container">
            {elements.length === 0 ? (
              <span className="empty-set-text">empty set</span>
            ) : (
              elements.map((el) => {
                const isDuplicateConflict = duplicateAlert === el;
                const isRecentlyAdded = addedItem === el;
                return (
                  <div
                    key={el}
                    className={`set-chip ${isDuplicateConflict ? "animate-bounce-error" : ""} ${isRecentlyAdded ? "animate-added" : ""}`}
                  >
                    <span>{el}</span>
                    <button type="button" className="remove-chip-btn" onClick={() => handleRemove(el)} aria-label={`Remove ${el}`}>
                      &times;
                    </button>
                  </div>
                );
              })
            )}
          </div>
          <div className="set-braces">{`}`}</div>
        </div>

        {duplicateAlert !== null && (
          <div className="duplicate-alert-banner">
            <span>Value <strong>{duplicateAlert}</strong> already exists in the Set! Ignored.</span>
          </div>
        )}
      </div>
    </section>
  );
}

/* ==========================================================================
   2. Duplicate Eliminator
   ========================================================================== */
export function DuplicateEliminator() {
  const incomingQueue = [101, 101, 205, 310, 205, 410];
  const [queueIndex, setQueueIndex] = useState(0);
  const [uniqueSet, setUniqueSet] = useState<number[]>([]);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [animState, setAnimState] = useState<"idle" | "incoming" | "checking" | "accepted" | "rejected">("idle");

  function handleReset() {
    setQueueIndex(0);
    setUniqueSet([]);
    setActiveItem(null);
    setAnimState("idle");
  }

  function handleStep() {
    if (queueIndex >= incomingQueue.length) return;
    const current = incomingQueue[queueIndex];
    setActiveItem(current);
    setAnimState("incoming");

    // Move to checking state
    setTimeout(() => {
      setAnimState("checking");
      // Check for uniqueness
      setTimeout(() => {
        if (uniqueSet.includes(current)) {
          setAnimState("rejected");
          setTimeout(() => {
            setAnimState("idle");
            setActiveItem(null);
            setQueueIndex((prev) => prev + 1);
          }, 1200);
        } else {
          setAnimState("accepted");
          setTimeout(() => {
            setUniqueSet((prev) => [...prev, current]);
            setAnimState("idle");
            setActiveItem(null);
            setQueueIndex((prev) => prev + 1);
          }, 1200);
        }
      }, 1000);
    }, 800);
  }

  return (
    <section id="duplicate-eliminator" className="lesson-card" aria-labelledby="eliminator-title">
      <p className="lesson-section-label">Duplicate Eliminator</p>
      <h2 id="eliminator-title">Data Pipeline Duplicate Filter</h2>
      <p>
        Watch how incoming values from a list or stream are processed when converting to a Set. Duplicates are rejected, while unique items are accepted.
      </p>

      <div className="eliminator-grid">
        <div className="eliminator-sidebar">
          <h3>Incoming Streams</h3>
          <div className="stream-queue">
            {incomingQueue.map((item, idx) => (
              <div
                key={idx}
                className={`queue-item ${idx === queueIndex ? "is-active" : ""} ${idx < queueIndex ? "is-processed" : ""}`}
              >
                <span>{item}</span>
                {idx < queueIndex && (
                  <span className="queue-badge">
                    {uniqueSet.filter((x) => x === item).length > 0 ? "✓ Accepted" : "✗ Duplicate"}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="pipeline-controls" style={{ marginTop: "1rem" }}>
            <Button
              size="sm"
              renderIcon={SkipForward}
              onClick={handleStep}
              disabled={queueIndex >= incomingQueue.length || animState !== "idle"}
            >
              Step Pipeline
            </Button>
            <Button size="sm" kind="ghost" renderIcon={Reset} onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>

        <div className="eliminator-pipeline">
          {/* Incoming Slot */}
          <div className="pipeline-lane incoming-lane">
            <h4>Incoming Value</h4>
            <div className="lane-box">
              {animState !== "idle" && activeItem !== null && (
                <div className="moving-value-chip animate-flow">{activeItem}</div>
              )}
            </div>
          </div>

          {/* Decision Node */}
          <div className="pipeline-lane decision-lane">
            <h4>Already in Set?</h4>
            <div className={`lane-box decision-box ${animState}`}>
              {animState === "checking" && <span className="checking-text">Checking Uniqueness...</span>}
              {animState === "accepted" && <span className="accepted-text text-success">No! Accept Element</span>}
              {animState === "rejected" && <span className="rejected-text text-danger">Yes! Duplicate Ignored</span>}
            </div>
          </div>

          {/* Unique Collection */}
          <div className="pipeline-lane result-lane">
            <h4>Unique Set</h4>
            <div className="lane-box set-box">
              {uniqueSet.map((el) => (
                <div key={el} className="static-set-chip">{el}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   3. Set Operations Visualizer
   ========================================================================== */
export function SetOperationsVisualizer({ farmA, farmB, rows }: { farmA: number[]; farmB: number[]; rows: Pack["operations"]["rows"] }) {
  const [selectedOp, setSelectedOp] = useState<string>("Union (|)");

  const activeRow = useMemo(() => {
    return rows.find((r) => r.operation === selectedOp) ?? rows[0];
  }, [selectedOp, rows]);

  // Elements to highlight in Venn circles
  const highlightedElements = useMemo(() => {
    switch (selectedOp) {
      case "Union (|)":
        return [101, 102, 103, 104, 105];
      case "Intersection (&)":
        return [103];
      case "Difference (-)":
        return [101, 102];
      case "Symmetric Difference (^)":
        return [101, 102, 104, 105];
      default:
        return [];
    }
  }, [selectedOp]);

  return (
    <section id="set-operations" className="lesson-card" aria-labelledby="operations-title">
      <p className="lesson-section-label">Mathematical Operations</p>
      <h2 id="operations-title">Set Operations Visualizer (Venn Diagram)</h2>
      <p>
        Observe the results of combining sensor registries from two different farms: **Farm A** and **Farm B** using Venn Diagram regions.
      </p>

      <div className="set-operations-layout">
        {/* Left Side Venn Diagram */}
        <div className="venn-diagram-container">
          <div className="venn-wrapper">
            {/* Circle A */}
            <div
              className={`venn-circle circle-a ${
                selectedOp === "Union (|)" || selectedOp === "Difference (-)" || selectedOp === "Symmetric Difference (^)" ? "highlight" : ""
              }`}
            >
              <span className="circle-label">Farm A</span>
              <div className="venn-elements-left">
                <span className={`venn-el ${highlightedElements.includes(101) ? "active" : ""}`}>101</span>
                <span className={`venn-el ${highlightedElements.includes(102) ? "active" : ""}`}>102</span>
              </div>
            </div>

            {/* Circle B */}
            <div
              className={`venn-circle circle-b ${
                selectedOp === "Union (|)" || selectedOp === "Symmetric Difference (^)" ? "highlight" : ""
              }`}
            >
              <span className="circle-label">Farm B</span>
              <div className="venn-elements-right">
                <span className={`venn-el ${highlightedElements.includes(104) ? "active" : ""}`}>104</span>
                <span className={`venn-el ${highlightedElements.includes(105) ? "active" : ""}`}>105</span>
              </div>
            </div>

            {/* Overlap */}
            <div
              className={`venn-overlap ${
                selectedOp === "Union (|)" || selectedOp === "Intersection (&)" ? "highlight" : ""
              }`}
            >
              <span className={`venn-el ${highlightedElements.includes(103) ? "active" : ""}`}>103</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Controls & Codes */}
        <div className="set-operations-info">
          <div className="operation-tabs">
            {rows.map((row) => (
              <Button
                key={row.operation}
                size="sm"
                kind={selectedOp === row.operation ? "primary" : "tertiary"}
                onClick={() => setSelectedOp(row.operation)}
              >
                {row.operation.split(" (")[0]}
              </Button>
            ))}
          </div>

          <Tile className="operation-details-tile">
            <h4>Code Statement</h4>
            <pre><code>{activeRow.code}</code></pre>
            <h4>Output Result</h4>
            <pre><code>{activeRow.result}</code></pre>
            <p className="op-desc">{activeRow.description}</p>
          </Tile>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   4. Membership Explorer
   ========================================================================== */
export function MembershipExplorer() {
  const sensorIds = [101, 205, 310];
  const [checkVal, setCheckVal] = useState<number>(101);
  const [result, setResult] = useState<boolean | null>(null);
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);

  function handleCheck() {
    setHighlightIdx(null);
    setResult(null);

    // Animate lookup
    const idx = sensorIds.indexOf(checkVal);
    if (idx !== -1) {
      setHighlightIdx(idx);
      setResult(true);
    } else {
      setResult(false);
    }
  }

  return (
    <section id="membership-explorer" className="lesson-card" aria-labelledby="membership-title">
      <p className="lesson-section-label">Membership Testing</p>
      <h2 id="membership-title">O(1) Membership Explorer</h2>
      <p>
        Sets are optimized for checking if a value exists in the collection using the <code>in</code> operator. Try checking values.
      </p>

      <div className="membership-explorer-container">
        <div className="membership-controls">
          <NumberInput
            id="member-input"
            label="Sensor ID to test"
            value={checkVal}
            onChange={(_evt, state) => setCheckVal(Number(state.value))}
          />
          <Button size="sm" onClick={handleCheck}>Run: {checkVal} in sensor_ids</Button>
        </div>

        <div className="membership-display-row">
          <span className="variable-label">sensor_ids =</span>
          <div className="set-elements-display">
            {`{`}
            {sensorIds.map((item, idx) => (
              <span
                key={item}
                className={`membership-chip ${highlightIdx === idx ? "highlight-success animate-bounce" : ""}`}
              >
                {item}
              </span>
            ))}
            {`}`}
          </div>
        </div>

        {result !== null && (
          <div className={`membership-result-banner ${result ? "banner-success" : "banner-danger animate-shake"}`}>
            {result ? (
              <>
                <Checkmark size={20} />
                <span>Result: <strong>True</strong>. {checkVal} is present in the set.</span>
              </>
            ) : (
              <>
                <Close size={20} />
                <span>Result: <strong>False</strong>. {checkVal} is NOT in the set.</span>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ==========================================================================
   5. Built-in Function Explorer
   ========================================================================== */
export function BuiltInFunctionExplorer({ builtIns }: { builtIns: Pack["builtIns"] }) {
  const sensorIds = [101, 205, 310];
  const [selected, setSelected] = useState<string>("len");

  const activeExample = useMemo(() => {
    return builtIns.examples.find((ex) => ex.name === selected) ?? builtIns.examples[0];
  }, [selected, builtIns]);

  return (
    <section id="built-ins" className="lesson-card" aria-labelledby="builtins-title">
      <p className="lesson-section-label">Built-in Functions</p>
      <h2 id="builtins-title">{builtIns.title}</h2>
      <p>{builtIns.body}</p>

      <div className="built-in-explorer-grid">
        <div className="built-in-controls">
          {builtIns.examples.map((example) => (
            <button
              key={example.name}
              type="button"
              className={selected === example.name ? "is-selected" : ""}
              onClick={() => setSelected(example.name)}
            >
              <code>{example.name}(sensor_ids)</code>
              <span>{example.purpose}</span>
            </button>
          ))}
        </div>
        <div className="built-in-result">
          <span>Output Result</span>
          <strong>{activeExample.output}</strong>
          <p>Expression: <code>{activeExample.code}</code></p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   6. Method Explorer
   ========================================================================== */
export function MethodExplorer({ methods }: { methods: Pack["methods"] }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeMethod = methods.rows[selectedIdx];

  return (
    <section id="methods" className="lesson-card" aria-labelledby="methods-title">
      <p className="lesson-section-label">Set Methods</p>
      <h2 id="methods-title">{methods.title}</h2>
      <p>{methods.body}</p>

      <div className="method-explorer-grid">
        <div className="method-selection-sidebar">
          {methods.rows.map((row, index) => (
            <Button
              key={row.method}
              size="sm"
              kind={selectedIdx === index ? "primary" : "tertiary"}
              onClick={() => setSelectedIdx(index)}
              style={{ justifyContent: "flex-start", width: "100%", textTransform: "none" }}
            >
              {row.method}()
            </Button>
          ))}
        </div>

        <Tile className="method-details-panel">
          <h3>{activeMethod.method}()</h3>
          <p className="method-purpose"><strong>Purpose:</strong> {activeMethod.purpose}</p>
          <div className="code-example-block">
            <h4>Code Statement</h4>
            <pre><code>{activeMethod.example}</code></pre>
            <h4>Expected Result / Output</h4>
            <pre><code>{activeMethod.output}</code></pre>
          </div>
        </Tile>
      </div>
    </section>
  );
}

/* ==========================================================================
   7. List vs Tuple vs Set Comparison Component
   ========================================================================== */
export function SetsComparisonCard({ comparison }: { comparison: Pack["comparison"] }) {
  return (
    <section id="comparison" className="lesson-card" aria-labelledby="comparison-title">
      <p className="lesson-section-label">Comparison</p>
      <h2 id="comparison-title">{comparison.title}</h2>
      <p>{comparison.body}</p>
      <div className="collection-comparison-table sets-comparison" role="table">
        <div role="row" className="comparison-heading">
          <strong role="columnheader">Feature</strong>
          <strong role="columnheader">List</strong>
          <strong role="columnheader">Tuple</strong>
          <strong role="columnheader">Set</strong>
        </div>
        {comparison.rows.map((row) => (
          <div role="row" key={row.feature} className="comparison-row">
            <span role="cell" className="feature-cell">{row.feature}</span>
            <span role="cell">{row.list}</span>
            <span role="cell">{row.tuple}</span>
            <span role="cell">{row.set}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   8. Agritech Example Panel
   ========================================================================== */
export function SetsAgritechPanel({ agritech }: { agritech: Pack["agritech"] }) {
  return (
    <section id="agritech-example" className="lesson-card" aria-labelledby="agritech-title">
      <p className="lesson-section-label">Agritech Example</p>
      <h2 id="agritech-title">{agritech.title}</h2>
      <p>{agritech.body}</p>

      <div className="agritech-example-grid">
        <div className="agritech-barn-card">
          <h4>Barn A Sensor List</h4>
          <div className="chip-row">
            {agritech.sensorIds.map((id, index) => (
              <span key={`${id}-${index}`} className="barn-chip barn-a">{id}</span>
            ))}
          </div>
        </div>
        <div className="agritech-barn-card">
          <h4>Barn B Sensor List</h4>
          <div className="chip-row">
            {agritech.newSensorIds.map((id, index) => (
              <span key={`${id}-${index}`} className="barn-chip barn-b">{id}</span>
            ))}
          </div>
        </div>
        <div className="agritech-barn-card union-card">
          <h4>Union Dashboard Registry (Unique Sensors)</h4>
          <div className="chip-row">
            {agritech.unionResult.map((id) => (
              <span key={id} className="barn-chip barn-union">{id}</span>
            ))}
          </div>
        </div>
      </div>
      <blockquote style={{ marginTop: "1rem" }}>{agritech.explanation}</blockquote>
    </section>
  );
}

/* ==========================================================================
   9. Story & Characteristics Sections
   ========================================================================== */
export function SetsStorySection({ story }: { story: Pack["story"] }) {
  return (
    <section id="story" className="lesson-card" aria-labelledby="sets-story-title">
      <p className="lesson-section-label">Story Continuation</p>
      <h2 id="sets-story-title">{story.title}</h2>
      <p>{story.body}</p>
      <div className="list-anatomy-grid">
        <article>
          <h3>{story.problem.title}</h3>
          <p>{story.problem.body}</p>
          <ul>
            {story.problem.examples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h3>{story.whyListsNotEnough.title}</h3>
          <p>{story.whyListsNotEnough.body}</p>
          <ul>
            {story.whyListsNotEnough.examples.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export function SetsCharacteristicsSection({ characteristics }: { characteristics: Pack["whatIsSet"] }) {
  return (
    <section id="characteristics" className="lesson-card" aria-labelledby="char-title">
      <p className="lesson-section-label">Characteristics</p>
      <h2 id="char-title">{characteristics.title}</h2>
      <p>{characteristics.body}</p>
      <div className="list-story-grid">
        {characteristics.characteristics.map((bullet) => (
          <article key={bullet}>
            <Tag type="blue">Set Core Rule</Tag>
            <p>{bullet}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SetsCreationSection({ creation }: { creation: Pack["creation"] }) {
  return (
    <section id="creation" className="lesson-card" aria-labelledby="creation-title">
      <p className="lesson-section-label">Creating Sets</p>
      <h2 id="creation-title">{creation.title}</h2>
      <p>{creation.body}</p>
      <div className="list-example-grid">
        {creation.examples.map((example) => (
          <article key={example.label}>
            <Tag type="gray">{example.label}</Tag>
            <pre><code>{example.code}</code></pre>
            <p>{example.note}</p>
          </article>
        ))}
      </div>
      <div className="lesson-card-subsection empty-creation-warning">
        <h3>{creation.emptyCreation.title}</h3>
        <p>{creation.emptyCreation.body}</p>
        <div className="code-comparison-boxes">
          <div className="box-correct">
            <Tag type="green">Correct (Empty Set)</Tag>
            <pre><code>{creation.emptyCreation.correct}</code></pre>
          </div>
          <div className="box-incorrect">
            <Tag type="red">Incorrect (Creates Dictionary)</Tag>
            <pre><code>{creation.emptyCreation.incorrect}</code></pre>
          </div>
        </div>
        <p className="warning-reason"><strong>Reason:</strong> {creation.emptyCreation.reason}</p>
      </div>
    </section>
  );
}

export function SetsEngineerScenario({ content }: { content: Pack["engineerScenario"] }) {
  return (
    <section id="engineer" className="lesson-card collections-engineer" aria-labelledby="engineer-title">
      <p className="lesson-section-label">Think like an engineer</p>
      <h2 id="engineer-title">{content.title}</h2>
      <p>{content.body}</p>
      <blockquote>{content.question}</blockquote>
    </section>
  );
}
