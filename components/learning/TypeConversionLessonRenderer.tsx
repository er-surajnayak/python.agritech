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
  ConversionDefinitionCard,
  ConversionFunctionExplorer,
  ConversionPlayground,
  ErrorExplorer,
  ExplicitConversionCard,
  ImplicitConversionCard,
  ImplicitExplicitComparison,
  TypeConversionStoryCard,
} from "@/components/learning/TypeConversionLearningBlocks";
import { MiniProjectCard } from "@/components/learning/UserInputLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const typeConversionOutline = [
  ["objectives", "Objectives"],
  ["conversion-story", "Weather-station story"],
  ["conversion-definition", "Type conversion"],
  ["why-conversion-needed", "Why convert?"],
  ["implicit-conversion", "Implicit conversion"],
  ["explicit-conversion", "Explicit conversion"],
  ["conversion-functions", "Conversion functions"],
  ["boolean-predictions", "Boolean predictions"],
  ["conversion-errors", "Conversion errors"],
  ["agritech-conversion", "Agritech example"],
  ["playground", "Conversion lab"],
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

export function TypeConversionLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "type-conversion") return null;

  return <article className="published-lesson type-conversion-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout type-conversion-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><TypeConversionStoryCard content={pack.story} /><ConversionDefinitionCard content={pack.definition} /><PredictionCard id="why-conversion-needed" content={pack.whyConversion} /><ImplicitExplicitComparison implicitTitle={pack.implicitConversion.title} explicitTitle={pack.explicitConversion.title} /><ImplicitConversionCard content={pack.implicitConversion} /><ExplicitConversionCard content={pack.explicitConversion} /><ConversionFunctionExplorer content={pack.conversionFunctions} /><PredictionCard id="boolean-predictions" label="Predict True or False" content={pack.booleanPredictions} /><ErrorExplorer content={pack.errorExplorer} /><CodeExampleCard id="agritech-conversion" label="Agritech example" example={pack.agritechProgram} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><ConversionPlayground content={lesson.playground} examples={pack.visualizerExamples} activities={pack.playgroundActivities} /><CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes} /><DebugChallengeCard content={pack.debugChallenge} /><EngineerScenario content={pack.engineerScenario} /><PracticeCard id="practice" tasks={lesson.practice} /><QuizCard id="quiz" quiz={lesson.quiz} /><MiniProjectCard project={pack.miniProject} /><AssignmentCard id="assignment" assignment={lesson.assignment} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{typeConversionOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
