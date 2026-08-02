import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import {
  BooleanSwitchCard,
  DataTypeComparisonCard,
  DataTypeDefinitionCard,
  DataTypePlayground,
  DataTypeStoryCard,
  PredictOutputCard,
  StringQuoteExplorer,
  TypeConversionVisualizer,
  TypeFunctionExplorer,
} from "@/components/learning/DataTypeLearningBlocks";
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
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const dataTypesOutline = [
  ["objectives", "Objectives"],
  ["data-type-story", "Farm-data story"],
  ["data-type-definition", "What are data types?"],
  ["why-types-matter", "Why types matter"],
  ["data-type-int", "Integer"],
  ["data-type-float", "Float"],
  ["data-type-str", "String"],
  ["data-type-bool", "Boolean"],
  ["data-type-nonetype", "None"],
  ["string-quotes", "String experiment"],
  ["boolean-switch", "Boolean switch"],
  ["type-function", "type()"],
  ["type-conversion", "Conversion"],
  ["agritech-data-types", "Agritech example"],
  ["playground", "Variable Explorer"],
  ["common-mistakes", "Common mistakes"],
  ["debug-challenge", "Debug challenge"],
  ["engineer-scenario", "Engineer scenario"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;

export function DataTypesLessonRenderer({
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
  if (!pack || pack.kind !== "data-types") return null;

  return (
    <article className="published-lesson data-types-development-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} />
      <div className="published-lesson-layout data-types-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <DataTypeStoryCard content={pack.story} />
          <DataTypeDefinitionCard content={pack.definition} />
          <PredictOutputCard content={pack.whyTypesMatter} />
          <DataTypeComparisonCard types={pack.types} />
          <StringQuoteExplorer content={pack.stringQuotes} />
          <BooleanSwitchCard content={pack.booleanSwitch} />
          <TypeFunctionExplorer content={pack.typeFunction} />
          <TypeConversionVisualizer content={pack.conversions} />
          <CodeExampleCard id="agritech-data-types" label="Agritech example" example={pack.agritechProgram} />
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <DataTypePlayground id="playground" content={lesson.playground} activities={pack.playgroundActivities} />
          <CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes} />
          <DebugChallengeCard content={pack.debugChallenge} />
          <EngineerScenario content={pack.engineerScenario} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>
        <aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{dataTypesOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside>
      </div>
      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
