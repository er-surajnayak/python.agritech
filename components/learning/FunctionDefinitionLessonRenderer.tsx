import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import {
  DefinitionCallComparator,
  DefKeywordCard,
  FunctionAnatomyExplorer,
  FunctionDebugChallenges,
  FunctionDefinitionStory,
  FunctionExecutionVisualizer,
  FunctionLibraryPanel,
  FunctionPlaygroundSupplement,
  ReuseFunctionCard,
  SmartFarmModuleProject,
} from "@/components/learning/FunctionDefinitionLearningBlocks";
import { CodeExampleCard, CommonMistakesCard } from "@/components/learning/FirstProgramLessonBlocks";
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

const definitionLessonOutline = [
  ["objectives", "Objectives"],
  ["story", "Story"],
  ["def-keyword", "Meet def"],
  ["function-anatomy", "Function anatomy"],
  ["definition-vs-call", "Definition vs call"],
  ["multiple-calls", "Multiple calls"],
  ["agritech-function", "Agritech function"],
  ["execution-visualizer", "Execution visualizer"],
  ["function-library", "Function library"],
  ["playground", "Playground"],
  ["common-mistakes", "Common mistakes"],
  ["debug-challenges", "Debug challenges"],
  ["engineer-scenario", "Engineer thinking"],
  ["practice", "Practice"],
  ["mini-project", "Mini project"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;

function validateLessonScope(code: string) {
  if (/\breturn\b/.test(code)) return "Return values begin in Lesson 3.4. Use print() inside the function for this lesson.";
  if (/\blambda\b/.test(code)) return "Lambda functions are introduced later in Module 3.";
  const definitions = [...code.matchAll(/^\s*def\s+[A-Za-z_]\w*\(([^)]*)\)\s*:/gm)];
  if (definitions.some((match) => match[1].trim())) return "Function parameters begin in Lesson 3.3. Keep the parentheses empty for now.";
  return null;
}

export function FunctionDefinitionLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "function-definition") return null;
  return (
    <article className="published-lesson function-definition-development-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} />
      <div className="published-lesson-layout function-definition-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <FunctionDefinitionStory content={pack.story} />
          <DefKeywordCard content={pack.definitionKeyword} />
          <FunctionAnatomyExplorer content={pack.anatomy} />
          <DefinitionCallComparator defining={pack.defining} calling={pack.calling} comparison={pack.comparison} />
          <ReuseFunctionCard content={pack.multipleCalls} />
          <CodeExampleCard id="agritech-function" label="Agritech function" example={pack.agritechExample} />
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <FunctionExecutionVisualizer content={pack.execution} />
          <FunctionLibraryPanel content={pack.functionLibrary} />
          <CodePlayground id="playground" content={lesson.playground} className="function-definition-playground" traceExecution validateCode={validateLessonScope} renderSupplement={(_, execution) => <FunctionPlaygroundSupplement execution={execution} />} />
          <CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes} />
          <FunctionDebugChallenges challenges={pack.debugChallenges} />
          <EngineerScenario content={pack.engineerScenario} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <SmartFarmModuleProject content={pack.miniProject} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>
        <aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{definitionLessonOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside>
      </div>
      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
