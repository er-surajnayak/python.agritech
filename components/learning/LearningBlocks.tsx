import {
  Accordion,
  AccordionItem,
  Button,
  RadioButton,
  RadioButtonGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Tile,
} from "@carbon/react";
import {
  AgricultureAnalytics,
  CheckmarkOutline,
  Education,
  Idea,
  Industry,
  NextOutline,
  Notebook,
  QuestionAnswering,
  Task,
  TaskComplete,
} from "@carbon/icons-react";
import type {
  AssignmentContent,
  LessonTextSection,
  PracticeTask,
  QuizPlaceholderContent,
} from "@/types/content";
import { useState } from "react";

type SectionTone = "blue" | "green" | "purple" | "teal" | "gray";

export function LessonContentCard({
  id,
  label,
  section,
  tone = "blue",
  icon: Icon = Education,
}: {
  id: string;
  label: string;
  section: LessonTextSection;
  tone?: SectionTone;
  icon?: typeof Education;
}) {
  return (
    <section id={id} className={`lesson-card lesson-card--${tone}`} aria-labelledby={`${id}-title`}>
      <p className="lesson-section-label"><Icon size={16} /> {label}</p>
      <h2 id={`${id}-title`}>{section.title}</h2>
      <p>{section.body}</p>
      {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
    </section>
  );
}

export function LearningObjectivesCard({ id, objectives }: { id: string; objectives: string[] }) {
  return (
    <section id={id} className="lesson-card objectives-card" aria-labelledby={`${id}-title`}>
      <p className="lesson-section-label"><Education size={16} /> Learning objectives</p>
      <h2 id={`${id}-title`}>By the end of this lesson, you can</h2>
      <ol>{objectives.map((objective, index) => <li key={objective}><span>{String(index + 1).padStart(2, "0")}</span><p>{objective}</p></li>)}</ol>
    </section>
  );
}

export function IndustryInsightCard({ id, section }: { id: string; section: LessonTextSection & { signal: string } }) {
  return (
    <section id={id} className="lesson-card industry-card" aria-labelledby={`${id}-title`}>
      <div><p className="lesson-section-label"><Industry size={16} /> Industry motivation</p><h2 id={`${id}-title`}>{section.title}</h2><p>{section.body}</p></div>
      <Tile className="industry-signal"><Idea size={20} /><p>{section.signal}</p></Tile>
    </section>
  );
}

export function AgritechExampleCard({ id, section }: { id: string; section: LessonTextSection }) {
  return <LessonContentCard id={id} label="Agritech example" section={section} tone="green" icon={AgricultureAnalytics} />;
}

export function PracticeCard({ id, tasks }: { id: string; tasks: PracticeTask[] }) {
  return (
    <section id={id} className="lesson-card practice-card" aria-labelledby={`${id}-title`}>
      <p className="lesson-section-label"><Task size={16} /> Practice section</p>
      <h2 id={`${id}-title`}>Strengthen the idea at three levels</h2>
      <Tabs>
        <TabList aria-label="Practice difficulty">
          {tasks.map((task) => <Tab key={task.level}>{task.level}</Tab>)}
        </TabList>
        <TabPanels>
          {tasks.map((task) => (
            <TabPanel key={task.level}>
              <Tag type={task.level === "Easy" ? "green" : task.level === "Medium" ? "blue" : "purple"}>{task.level}</Tag>
              <h3>{task.title}</h3>
              <p>{task.prompt}</p>
              {task.activities && <ol className="practice-activities">{task.activities.map((activity) => <li key={activity}>{activity}</li>)}</ol>}
              <Accordion align="start"><AccordionItem title="Show guidance"><p>{task.guidance}</p></AccordionItem></Accordion>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </section>
  );
}

export function QuizCard({ id, quiz }: { id: string; quiz: QuizPlaceholderContent | QuizPlaceholderContent[] }) {
  const questions = Array.isArray(quiz) ? quiz : [quiz];
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const isInteractive = questions.every((question) => question.correctOptionIndex !== undefined);
  const answeredAll = questions.every((_, index) => answers[index] !== undefined);
  const score = questions.reduce((total, question, index) => total + (answers[index] === question.options[question.correctOptionIndex ?? -1] ? 1 : 0), 0);

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section id={id} className="lesson-card quiz-card" aria-labelledby={`${id}-title`}>
      <p className="lesson-section-label"><QuestionAnswering size={16} /> Quiz section</p>
      <h2 id={`${id}-title`}>Quick quiz</h2>
      <div className="quiz-question-list">
        {questions.map((question, questionIndex) => (
          <div className="quiz-question" key={question.question}>
            <Tag type="magenta" size="sm">{question.title}</Tag>
            <p>{question.question}</p>
            <RadioButtonGroup
              name={`${id}-options-${questionIndex}`}
              legendText={`Choose one answer for ${question.title}`}
              orientation="vertical"
              valueSelected={answers[questionIndex]}
              onChange={(selection) => {
                setAnswers((current) => ({ ...current, [questionIndex]: String(selection) }));
                setSubmitted(false);
              }}
            >
              {question.options.map((option, optionIndex) => <RadioButton key={option} id={`${id}-${questionIndex}-option-${optionIndex}`} value={option} labelText={option} disabled={!isInteractive} />)}
            </RadioButtonGroup>
            {(!isInteractive || submitted) && <p className={`quiz-question-note${isInteractive ? answers[questionIndex] === question.options[question.correctOptionIndex ?? -1] ? " is-correct" : " is-incorrect" : ""}`}>{isInteractive ? `${answers[questionIndex] === question.options[question.correctOptionIndex ?? -1] ? "Correct." : "Review this answer."} ${question.explanation ?? question.note}` : question.note}</p>}
          </div>
        ))}
      </div>
      <div className="quiz-placeholder-footer">
        <Button size="sm" onClick={() => setSubmitted(true)} disabled={!isInteractive || !answeredAll}>Check answers</Button>
        {isInteractive && <Button size="sm" kind="ghost" onClick={resetQuiz} disabled={!Object.keys(answers).length}>Reset</Button>}
        <p aria-live="polite">{isInteractive ? submitted ? `Score: ${score} of ${questions.length}. Review the feedback for each question.` : "Answer every question, then check your responses." : "Response and scoring logic will be connected through the reusable quiz engine."}</p>
      </div>
    </section>
  );
}

export function AssignmentCard({ id, assignment }: { id: string; assignment: AssignmentContent }) {
  return (
    <section id={id} className="lesson-card assignment-card" aria-labelledby={`${id}-title`}>
      <p className="lesson-section-label"><TaskComplete size={16} /> Assignment</p>
      <h2 id={`${id}-title`}>{assignment.title}</h2>
      <p>{assignment.brief}</p>
      <div className="assignment-deliverables"><h3>Deliverables</h3><ul>{assignment.deliverables.map((item) => <li key={item}><CheckmarkOutline size={16} /><span>{item}</span></li>)}</ul></div>
    </section>
  );
}

export function SummaryCard({ id, section }: { id: string; section: LessonTextSection }) {
  return <LessonContentCard id={id} label="Summary" section={section} tone="teal" icon={Notebook} />;
}

export function KeyTakeawaysCard({ id, items }: { id: string; items: string[] }) {
  return (
    <section id={id} className="lesson-card takeaways-card" aria-labelledby={`${id}-title`}>
      <p className="lesson-section-label"><CheckmarkOutline size={16} /> Key takeaways</p>
      <h2 id={`${id}-title`}>Remember these ideas</h2>
      <ul>{items.map((item) => <li key={item}><CheckmarkOutline size={18} /><span>{item}</span></li>)}</ul>
    </section>
  );
}

export function WhatsNextCard({ id, section }: { id: string; section: LessonTextSection }) {
  return <LessonContentCard id={id} label="What's next" section={section} tone="gray" icon={NextOutline} />;
}
