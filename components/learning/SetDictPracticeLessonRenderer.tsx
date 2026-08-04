import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import {
  AssignmentCard,
  IndustryInsightCard,
  KeyTakeawaysCard,
  LearningObjectivesCard,
  PracticeCard,
  QuizCard,
  SummaryCard,
  WhatsNextCard,
} from "@/components/learning/LearningBlocks";
import {
  QuestionFilterHeader,
  QuestionAccordionCard,
  QuestionNavigator,
  FarmReadingAnalyzerCapstone,
} from "@/components/learning/ListTuplePracticeLearningBlocks";
import { useState } from "react";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Learning objectives"],
  ["questions-list", "30 Solved Questions"],
  ["playground", "Interactive Playground"],
  ["capstone", "Coding Challenge"],
  ["practice", "Guided Practice"],
  ["quiz", "Knowledge Check"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;

export function SetDictPracticeLessonRenderer({
  lesson,
  courseLesson,
  module,
  previous,
  next,
}: {
  lesson: LessonDocument;
  courseLesson: CourseLesson;
  module: CourseModule;
  previous: CourseLesson | null;
  next: CourseLesson | null;
}) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "set-dict-practice") return null;

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [customStarter, setCustomStarter] = useState<string>(lesson.playground.starterCode);

  function toggleComplete(id: string) {
    setCompletedIds((prev) => {
      const nextSet = new Set(prev);
      if (nextSet.has(id)) {
        nextSet.delete(id);
      } else {
        nextSet.add(id);
      }
      return nextSet;
    });
  }

  const filteredQuestions =
    activeFilter === "All"
      ? pack.questions
      : pack.questions.filter((q) => q.difficulty === activeFilter);

  return (
    <article className="published-lesson list-tuple-practice-development-pack set-dict-practice-development-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <LessonHero
        eyebrow={`Module ${module.index} · Lesson ${lesson.number}`}
        title={lesson.title}
        summary={lesson.summary}
        icon={module.icon}
        level={lesson.level}
        durationMinutes={lesson.durationMinutes}
        prerequisite={pack.prerequisite}
      />

      <div className="published-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />

          <section id="questions-list" className="lesson-card solved-questions-section">
            <h2>30 Solved Programming Questions</h2>
            <p>
              Filter questions by difficulty. Expand any card to reveal the hint, solution, step-by-step dry run, expected output, explanation, common pitfall, and challenge extension. Use the <strong>Open in Playground</strong> button to load code directly into the Monaco editor.
            </p>

            <QuestionFilterHeader
              questions={pack.questions}
              activeFilter={activeFilter}
              onSelectFilter={setActiveFilter}
              completedIds={completedIds}
            />

            <div className="questions-accordion-container">
              {filteredQuestions.map((q) => (
                <QuestionAccordionCard
                  key={q.id}
                  question={q}
                  isCompleted={completedIds.has(q.id)}
                  onToggleComplete={() => toggleComplete(q.id)}
                  onLoadCode={(code) => {
                    setCustomStarter(code);
                    const el = document.getElementById("playground");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          </section>

          <CodePlayground
            id="playground"
            content={{
              ...lesson.playground,
              starterCode: customStarter,
            }}
            traceExecution
          />

          <FarmReadingAnalyzerCapstone capstone={pack.capstoneChallenge} />

          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />

          <PracticeCard id="practice" tasks={lesson.practice} />

          <QuizCard id="quiz" quiz={lesson.quiz} />

          <AssignmentCard id="assignment" assignment={lesson.assignment} />

          <SummaryCard id="summary" section={lesson.summarySection} />

          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />

          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>

        <aside className="lesson-outline published-lesson-outline" aria-label="On this page">
          <p>On this page</p>
          {outline.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
          <div className="sidebar-navigator-wrapper">
            <QuestionNavigator
              questions={pack.questions}
              completedIds={completedIds}
              activeFilter={activeFilter}
            />
          </div>
        </aside>
      </div>

      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
