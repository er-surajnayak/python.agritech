"use client";

import { useState } from "react";
import { Button, Tag, Tile } from "@carbon/react";
import { CheckmarkOutline, Help } from "@carbon/icons-react";

interface DecisionNode {
  id: string;
  question: string;
  yesId: string; // Next node ID or result structure
  noId: string; // Next node ID or result structure
}

const DECISION_TREE: Record<string, DecisionNode> = {
  start: {
    id: "start",
    question: "Do you need to store multiple values?",
    yesId: "uniqueness",
    noId: "single_var",
  },
  uniqueness: {
    id: "uniqueness",
    question: "Do you need all values to be unique (automatically eliminate duplicates)?",
    yesId: "set",
    noId: "fixed",
  },
  fixed: {
    id: "fixed",
    question: "Is the data fixed (read-only) and should never change during runtime?",
    yesId: "tuple",
    noId: "keyvalue",
  },
  keyvalue: {
    id: "keyvalue",
    question: "Do you need to map label-like keys to values (e.g. name to age)?",
    yesId: "dict",
    noId: "list",
  },
};

const RESULTS: Record<
  string,
  { name: string; type: string; desc: string; example: string; syntax: string }
> = {
  single_var: {
    name: "Single Variable",
    type: "variable",
    desc: "Use a simple variable (int, float, string, boolean) to hold a single separate data point.",
    example: "temperature = 25.4",
    syntax: "x = value",
  },
  set: {
    name: "Set",
    type: "set",
    desc: "An unordered collection of unique elements. Automatically deletes duplicates and supports math set operations.",
    example: "sensor_ids = {101, 205, 310}",
    syntax: "{val1, val2, ...} or set()",
  },
  tuple: {
    name: "Tuple",
    type: "tuple",
    desc: "An ordered, immutable collection. Protects fixed metadata configurations from accidental runtime changes.",
    example: "gps_coordinate = (17.385, 78.486)",
    syntax: "(val1, val2, ...)",
  },
  dict: {
    name: "Dictionary",
    type: "dictionary",
    desc: "A collection of key-value pairs. Optimized for fast lookups by descriptive keys.",
    example: "sensor_info = {'id': 101, 'type': 'Moisture'}",
    syntax: "{key1: val1, key2: val2, ...}",
  },
  list: {
    name: "List",
    type: "list",
    desc: "An ordered, mutable collection that allows duplicates. Ideal for tracking streams or sequences of data.",
    example: "temperatures = [22, 25, 22, 27]",
    syntax: "[val1, val2, ...]",
  },
};

export function CollectionDecisionTree() {
  const [currentNodeId, setCurrentNodeId] = useState<string>("start");
  const [history, setHistory] = useState<string[]>([]);
  const [resultId, setResultId] = useState<string | null>(null);

  function handleAnswer(answer: "yes" | "no") {
    const node = DECISION_TREE[currentNodeId];
    if (!node) return;

    const nextId = answer === "yes" ? node.yesId : node.noId;
    setHistory([...history, currentNodeId]);

    if (RESULTS[nextId]) {
      setResultId(nextId);
    } else {
      setCurrentNodeId(nextId);
    }
  }

  function handleReset() {
    setCurrentNodeId("start");
    setHistory([]);
    setResultId(null);
  }

  // Determine path of questions/results to highlight
  const allVisited = [...history];
  if (resultId) {
    allVisited.push(resultId);
  } else {
    allVisited.push(currentNodeId);
  }

  return (
    <section id="decision-tree" className="lesson-card collections-decision-tree" aria-labelledby="decision-tree-title">
      <p className="lesson-section-label">Collection Decision Tree</p>
      <h2 id="decision-tree-title">Choosing the Right Collection</h2>
      <p>
        As programs grow, choosing the correct data structure is critical for performance and code safety. Use this interactive tool to find the best collection structure.
      </p>

      <div className="decision-tree-layout">
        {/* Left Side: Question flow */}
        <div className="decision-tree-wizard">
          {resultId ? (
            <Tile className="decision-result-tile">
              <Tag type="green" size="sm">Recommended Structure</Tag>
              <h3>{RESULTS[resultId].name}</h3>
              <p className="result-desc">{RESULTS[resultId].desc}</p>
              <div className="result-code-box">
                <p><strong>Syntax:</strong> <code>{RESULTS[resultId].syntax}</code></p>
                <p><strong>Example:</strong> <code>{RESULTS[resultId].example}</code></p>
              </div>
              <Button size="sm" kind="tertiary" onClick={handleReset} style={{ marginTop: "1rem" }}>
                Start Over
              </Button>
            </Tile>
          ) : (
            <Tile className="decision-question-tile">
              <div className="question-header">
                <Help size={20} />
                <span>Question</span>
              </div>
              <h3>{DECISION_TREE[currentNodeId]?.question}</h3>
              <div className="decision-actions">
                <Button size="sm" onClick={() => handleAnswer("yes")}>
                  Yes
                </Button>
                <Button size="sm" kind="danger" onClick={() => handleAnswer("no")}>
                  No
                </Button>
              </div>
              {history.length > 0 && (
                <Button size="sm" kind="ghost" onClick={() => {
                  const newHistory = [...history];
                  const prev = newHistory.pop() || "start";
                  setHistory(newHistory);
                  setCurrentNodeId(prev);
                  setResultId(null);
                }} style={{ marginTop: "1.5rem" }}>
                  Back
                </Button>
              )}
            </Tile>
          )}
        </div>

        {/* Right Side: Visual flow tree diagram */}
        <div className="decision-tree-diagram">
          <div className="tree-step" data-active={allVisited.includes("start")}>
            <div className="tree-node">
              <span>Multiple Values?</span>
            </div>
            <div className="tree-branches">
              <div className="tree-branch yes" data-active={allVisited.includes("uniqueness")}>
                <span className="branch-label">Yes</span>
                <div className="tree-step" data-active={allVisited.includes("uniqueness")}>
                  <div className="tree-node">
                    <span>Need Uniqueness?</span>
                  </div>
                  <div className="tree-branches">
                    <div className="tree-branch yes" data-active={allVisited.includes("set")}>
                      <span className="branch-label">Yes</span>
                      <div className="tree-leaf" data-active={allVisited.includes("set")}>
                        <strong>Set</strong>
                      </div>
                    </div>
                    <div className="tree-branch no" data-active={allVisited.includes("fixed")}>
                      <span className="branch-label">No</span>
                      <div className="tree-step" data-active={allVisited.includes("fixed")}>
                        <div className="tree-node">
                          <span>Read-Only / Fixed?</span>
                        </div>
                        <div className="tree-branches">
                          <div className="tree-branch yes" data-active={allVisited.includes("tuple")}>
                            <span className="branch-label">Yes</span>
                            <div className="tree-leaf" data-active={allVisited.includes("tuple")}>
                              <strong>Tuple</strong>
                            </div>
                          </div>
                          <div className="tree-branch no" data-active={allVisited.includes("keyvalue")}>
                            <span className="branch-label">No</span>
                            <div className="tree-step" data-active={allVisited.includes("keyvalue")}>
                              <div className="tree-node">
                                <span>Key-Value Mapping?</span>
                              </div>
                              <div className="tree-branches">
                                <div className="tree-branch yes" data-active={allVisited.includes("dict")}>
                                  <span className="branch-label">Yes</span>
                                  <div className="tree-leaf" data-active={allVisited.includes("dict")}>
                                    <strong>Dictionary</strong>
                                  </div>
                                </div>
                                <div className="tree-branch no" data-active={allVisited.includes("list")}>
                                  <span className="branch-label">No</span>
                                  <div className="tree-leaf" data-active={allVisited.includes("list")}>
                                    <strong>List</strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tree-branch no" data-active={allVisited.includes("single_var")}>
                <span className="branch-label">No</span>
                <div className="tree-leaf" data-active={allVisited.includes("single_var")}>
                  <strong>Single Variable</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
