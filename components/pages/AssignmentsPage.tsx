import { Accordion, AccordionItem, Button, Checkbox, ProgressBar, Search, Tag, Tile } from "@carbon/react";
import { CheckmarkOutline, TaskComplete } from "@carbon/icons-react";
import { useMemo, useState } from "react";
import { assignmentTopics } from "@/content/assignments";

const difficultyTags = {
  "Warm-up": "green",
  Beginner: "cyan",
  Intermediate: "blue",
  Applied: "purple",
  Challenge: "magenta",
} as const;

export function AssignmentsPage() {
  const [selectedTopicId, setSelectedTopicId] = useState(assignmentTopics[0].id);
  const [query, setQuery] = useState("");
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const topic = assignmentTopics.find((item) => item.id === selectedTopicId) ?? assignmentTopics[0];
  const allQuestions = topic.sections.flatMap((item) => item.questions);
  const completedCount = allQuestions.filter((question) => completed.has(question.id)).length;
  const progress = Math.round((completedCount / allQuestions.length) * 100);
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const visibleSections = useMemo(() => topic.sections.map((section) => ({
    ...section,
    questions: normalizedQuery
      ? section.questions.filter((question) => [question.prompt, ...(question.requirements ?? [])].join(" ").toLocaleLowerCase().includes(normalizedQuery))
      : section.questions,
  })).filter((section) => section.questions.length), [normalizedQuery, topic]);

  const visibleQuestionCount = visibleSections.reduce((total, section) => total + section.questions.length, 0);

  function selectTopic(id: string) {
    setSelectedTopicId(id);
    setQuery("");
  }

  function toggleQuestion(id: string, checked: boolean) {
    setCompleted((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <div className="standard-page assignments-page page-enter">
      <header className="assignments-hero">
        <div>
          <p className="eyebrow">Assignments · Topic-wise practice</p>
          <h1>Build confidence one decision at a time</h1>
          <p>Choose a topic, work through its levels, and mark questions complete as you test each Python program.</p>
          <div className="assignment-concept-tags">{topic.concepts.map((concept) => <Tag key={concept} type="green">{concept}</Tag>)}</div>
        </div>
        <Tile className="assignment-progress-card">
          <div><span>Topic progress</span><strong>{progress}%</strong></div>
          <ProgressBar label={`${completedCount} of ${allQuestions.length} questions complete`} value={progress} />
          <p>Progress is kept for this session so learners can use the checklist without creating an account.</p>
        </Tile>
      </header>

      <nav className="assignment-topic-navigation" aria-label="Assignment topics">
        {assignmentTopics.map((item) => {
          const questionCount = item.sections.reduce((total, section) => total + section.questions.length, 0);
          return <Button key={item.id} kind={item.id === topic.id ? "primary" : "ghost"} onClick={() => selectTopic(item.id)} aria-pressed={item.id === topic.id}><span>{item.shortTitle}</span><small>{questionCount} questions</small></Button>;
        })}
      </nav>

      <section className="assignment-topic-header" aria-labelledby="assignment-topic-title">
        <div><p className="lesson-section-label"><TaskComplete size={16} /> Current assignment</p><h2 id="assignment-topic-title">{topic.title}</h2><p>{topic.description}</p></div>
        <Search id="assignment-search" labelText="Search assignment questions" placeholder="Search questions or concepts" value={query} onChange={(event) => setQuery(event.currentTarget.value)} closeButtonLabelText="Clear assignment search" />
      </section>

      <div className="assignment-result-summary" aria-live="polite"><span>{visibleQuestionCount} questions shown</span>{normalizedQuery && <span>Search: “{query.trim()}”</span>}</div>

      {visibleSections.length ? (
        <Accordion className="assignment-sections" align="start">
          {visibleSections.map((section) => (
            <AccordionItem key={section.id} title={<div className="assignment-section-title"><span><strong>{section.title}</strong><small>{section.description}</small></span><Tag type={difficultyTags[section.difficulty]}>{section.difficulty}</Tag><span>{section.questions.length} questions</span></div>}>
              <ol className="assignment-question-list">
                {section.questions.map((question) => (
                  <li key={question.id} className={completed.has(question.id) ? "is-complete" : ""}>
                    <Checkbox id={`assignment-${question.id}`} checked={completed.has(question.id)} onChange={(_, data) => toggleQuestion(question.id, Boolean(data.checked))} labelText={<span className="assignment-question-label"><span>Question {question.number}</span><strong>{question.prompt}</strong></span>} />
                    {question.requirements?.length && <ul>{question.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ul>}
                    {question.example && <pre aria-label={`Example for question ${question.number}`}><code>{question.example}</code></pre>}
                    {completed.has(question.id) && <span className="assignment-complete-label"><CheckmarkOutline size={16} /> Completed</span>}
                  </li>
                ))}
              </ol>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Tile className="assignment-empty-state"><strong>No questions match “{query.trim()}”.</strong><p>Try a broader term such as loop, number, password, or sensor.</p><Button kind="ghost" size="sm" onClick={() => setQuery("")}>Clear search</Button></Tile>
      )}
    </div>
  );
}
