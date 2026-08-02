import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import {
  AgritechProgramCard,
  CommentExplorer,
  CommonMistakesCard,
  DebugChallengeCard,
  ExecutionTracer,
  IndentationExplorer,
  PlaygroundActivityList,
  PrintExplorer,
  ProgrammingExplanation,
  PythonCodeExplanation,
  StatementsCard,
  CodeExampleCard,
} from "@/components/learning/FirstProgramLessonBlocks";
import { LessonHero } from "@/components/learning/LessonHero";
import {
  AssignmentCard,
  IndustryInsightCard,
  KeyTakeawaysCard,
  LearningObjectivesCard,
  LessonContentCard,
  PracticeCard,
  QuizCard,
  SummaryCard,
  WhatsNextCard,
} from "@/components/learning/LearningBlocks";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const firstProgramOutline = [
  ["objectives", "Objectives"],
  ["story", "Farmer story"],
  ["programming", "Programming"],
  ["python-code", "Python code"],
  ["execution-trace", "Execution flow"],
  ["first-program", "First program"],
  ["print-explorer", "print()"],
  ["statements", "Statements"],
  ["comments", "Comments"],
  ["indentation", "Indentation"],
  ["agritech-program", "Agritech example"],
  ["playground", "Playground"],
  ["common-mistakes", "Common mistakes"],
  ["debug-challenge", "Debug challenge"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;

export function FirstProgramLessonRenderer({
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
  if (!pack || pack.kind !== "first-program") return null;

  return (
    <article className="published-lesson first-program-development-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} />

      <div className="published-lesson-layout first-program-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <LessonContentCard id="story" label="Real-life story" section={pack.story} tone="green" />
          <WorkflowAnimation id="story-workflow" title={pack.story.workflow.title} description={pack.story.workflow.description} steps={pack.story.workflow.steps} />
          <ProgrammingExplanation content={pack.programming} />
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <PythonCodeExplanation content={pack.pythonCode} />
          <ExecutionTracer content={pack.execution} />
          <CodeExampleCard id="first-program" label="First Python program" example={pack.firstProgram} />
          <PrintExplorer content={pack.print} />
          <StatementsCard content={pack.statements} />
          <CommentExplorer content={pack.comments} />
          <IndentationExplorer content={pack.indentation} />
          <AgritechProgramCard example={pack.agritechProgram} />
          <CodePlayground id="playground" content={lesson.playground} />
          <PlaygroundActivityList activities={pack.playgroundActivities} />
          <CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes} />
          <DebugChallengeCard content={pack.debugChallenge} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <LessonContentCard id="mini-activity" label="Mini activity" section={pack.miniActivity} tone="purple" />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>

        <aside className="lesson-outline published-lesson-outline" aria-label="On this page">
          <p>On this page</p>
          {firstProgramOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </aside>
      </div>
      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
