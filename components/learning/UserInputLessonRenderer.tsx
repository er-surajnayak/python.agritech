import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodeExampleCard, CommonMistakesCard, DebugChallengeCard } from "@/components/learning/FirstProgramLessonBlocks";
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
import { PredictionCard } from "@/components/learning/PredictionCard";
import {
  InputConversionCard,
  InputFunctionCard,
  InputProgramComparison,
  MiniProjectCard,
  NumericInputCard,
  UserInputPlayground,
  UserInputStoryCard,
} from "@/components/learning/UserInputLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const userInputOutline = [
  ["objectives", "Objectives"],
  ["user-input-story", "Smart irrigation story"],
  ["why-user-input", "Why user input?"],
  ["input-function", "input()"],
  ["text-input", "Text input"],
  ["multiple-inputs", "Multiple inputs"],
  ["numeric-input", "Numeric input"],
  ["input-conversion", "Conversion"],
  ["why-conversion-matters", "Predict output"],
  ["agritech-input-example", "Agritech example"],
  ["playground", "Input lab"],
  ["common-mistakes", "Common mistakes"],
  ["debug-challenge", "Debug challenge"],
  ["engineer-scenario", "Engineer scenario"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["mini-project", "Mini project"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["key-takeaways", "Key takeaways"],
  ["whats-next", "What's next"],
] as const;

export function UserInputLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "user-input") return null;

  return (
    <article className="published-lesson user-input-development-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} />
      <div className="published-lesson-layout user-input-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <UserInputStoryCard content={pack.story} />
          <InputProgramComparison content={pack.whyInput} />
          <InputFunctionCard content={pack.inputFunction} />
          <CodeExampleCard id="text-input" label="Receiving text input" example={pack.textInput} />
          <CodeExampleCard id="multiple-inputs" label="Multiple inputs" example={pack.multipleInputs} />
          <NumericInputCard content={pack.numericInput} />
          <InputConversionCard content={pack.conversion} />
          <PredictionCard id="why-conversion-matters" content={pack.whyConversion} />
          <CodeExampleCard id="agritech-input-example" label="Agritech example" example={pack.agritechProgram} />
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <UserInputPlayground content={lesson.playground} simulator={pack.simulator} activities={pack.playgroundActivities} />
          <CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes} />
          <DebugChallengeCard content={pack.debugChallenge} />
          <EngineerScenario content={pack.engineerScenario} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <MiniProjectCard project={pack.miniProject} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>
        <aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{userInputOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside>
      </div>
      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
