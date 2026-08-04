import { Accordion, AccordionItem, Button, Checkbox, Tag, Tile } from "@carbon/react";
import { AgricultureAnalytics, Checkmark, Code, Flow, Help, Warning } from "@carbon/icons-react";
import { useState } from "react";
import type { SolvedQuestionItem, ListTuplePracticeDevelopmentPack } from "@/types/content";

type Pack = ListTuplePracticeDevelopmentPack;

export function QuestionFilterHeader({
  questions,
  activeFilter,
  onSelectFilter,
  completedIds,
}: {
  questions: SolvedQuestionItem[];
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  completedIds: Set<string>;
}) {
  const total = questions.length;
  const completedCount = completedIds.size;
  const percent = Math.round((completedCount / total) * 100);

  return (
    <div className="question-filter-header">
      <div className="filter-controls">
        <span className="filter-label">Filter Difficulty:</span>
        {(["All", "Easy", "Medium", "Advanced"] as const).map((level) => {
          const count = level === "All" ? total : questions.filter((q) => q.difficulty === level).length;
          return (
            <Button
              key={level}
              size="sm"
              kind={activeFilter === level ? "primary" : "ghost"}
              onClick={() => onSelectFilter(level)}
            >
              {level} ({count})
            </Button>
          );
        })}
      </div>

      <div className="progress-tracker-box">
        <div className="progress-text">
          <span>Progress: <strong>{completedCount} / {total}</strong> completed</span>
          <strong>{percent}%</strong>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}

export function QuestionAccordionCard({
  question,
  isCompleted,
  onToggleComplete,
  onLoadCode,
}: {
  question: SolvedQuestionItem;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onLoadCode: (code: string) => void;
}) {
  const diffTag =
    question.difficulty === "Easy" ? "blue" : question.difficulty === "Medium" ? "purple" : "red";

  return (
    <div id={`question-${question.number}`} className={`question-card-wrapper ${isCompleted ? "is-completed" : ""}`}>
      <Tile className="question-item-tile">
        <div className="question-card-header">
          <div className="question-header-left">
            <Checkbox
              id={`check-${question.id}`}
              labelText=""
              checked={isCompleted}
              onChange={() => onToggleComplete()}
            />
            <span className="question-number">Q{question.number}</span>
            <Tag type={diffTag}>{question.difficulty}</Tag>
            <h3>{question.title}</h3>
          </div>

          {isCompleted && (
            <Tag type="green" className="completed-badge">
              <Checkmark size={12} /> Solved
            </Tag>
          )}
        </div>

        <div className="question-body-section">
          <div className="problem-statement-box">
            <p><strong>Problem:</strong> {question.problem}</p>
            <p className="agritech-context">🌾 <strong>Scenario:</strong> {question.agritechScenario}</p>
          </div>

          <Accordion className="question-details-accordion">
            <AccordionItem title="💡 Hint (Click to reveal)">
              <p className="hint-text">{question.hint}</p>
            </AccordionItem>

            <AccordionItem title="🐍 Solution & Playground Link">
              <div className="solution-box">
                <div className="solution-header">
                  <span>Python Solution</span>
                  <Button size="sm" kind="tertiary" onClick={() => onLoadCode(question.solution)}>
                    <Code size={14} /> Open in Playground
                  </Button>
                </div>
                <pre><code>{question.solution}</code></pre>
              </div>
            </AccordionItem>

            <AccordionItem title="⚙️ Step-by-Step Dry Run & Output">
              <div className="dryrun-grid">
                <div className="dryrun-pane">
                  <span>Execution Dry Run</span>
                  <pre>{question.dryRun}</pre>
                </div>
                <div className="output-pane">
                  <span>Expected Output</span>
                  <pre>{question.output}</pre>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem title="📘 Detailed Explanation">
              <p className="explanation-text">{question.explanation}</p>
            </AccordionItem>

            <AccordionItem title="⚠️ Common Pitfall & Challenge Extension">
              <div className="pitfall-challenge-grid">
                <div className="pitfall-box">
                  <span className="box-title"><Warning size={14} /> Common Pitfall</span>
                  <p>{question.commonMistake}</p>
                </div>
                <div className="challenge-box">
                  <span className="box-title"><Flow size={14} /> Challenge Extension</span>
                  <p>{question.challengeExtension}</p>
                </div>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </Tile>
    </div>
  );
}

export function QuestionNavigator({
  questions,
  completedIds,
  activeFilter,
}: {
  questions: SolvedQuestionItem[];
  completedIds: Set<string>;
  activeFilter: string;
}) {
  const filtered =
    activeFilter === "All" ? questions : questions.filter((q) => q.difficulty === activeFilter);

  return (
    <Tile className="question-navigator-card">
      <h4>Question Navigator ({filtered.length})</h4>
      <div className="question-grid-nav">
        {filtered.map((q) => {
          const isDone = completedIds.has(q.id);
          return (
            <a
              key={q.id}
              href={`#question-${q.number}`}
              className={`question-nav-node ${isDone ? "is-done" : ""} ${q.difficulty.toLowerCase()}`}
              title={`Q${q.number}: ${q.title}`}
            >
              Q{q.number}
            </a>
          );
        })}
      </div>
    </Tile>
  );
}

export function FarmReadingAnalyzerCapstone({ capstone }: { capstone: Pack["capstoneChallenge"] }) {
  return (
    <section id="capstone" className="lesson-card capstone-challenge-card" aria-labelledby="capstone-title">
      <p className="lesson-section-label"><AgricultureAnalytics size={16} /> Coding challenge mini-project</p>
      <h2 id="capstone-title">{capstone.title}</h2>
      <p>{capstone.brief}</p>

      <div className="requirements-list">
        <h4>Requirements:</h4>
        <ul>
          {capstone.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="agritech-example-grid">
        <div className="code-display-block">
          <span>Starter Template</span>
          <pre><code>{capstone.starterCode}</code></pre>
        </div>
        <div className="output-display-block">
          <span>Expected Output</span>
          <pre><code>{capstone.expectedOutcome}</code></pre>
        </div>
      </div>
    </section>
  );
}
