import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
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
  CollectionOperationsStorySection,
  FunctionExplorer,
  BuiltInComparisonTable,
  MethodExplorer,
  OperationsComparisonMatrix,
  CollectionAgritechPanel,
  CollectionEngineerScenario,
} from "@/components/learning/CollectionOperationsLearningBlocks";
import { CollectionDecisionTree } from "@/components/learning/CollectionDecisionTree";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Learning objectives"],
  ["story", "Story: Multi-API Integration"],
  ["function-explorer", "Function Explorer"],
  ["built-in-matrix", "Built-in Comparison Table"],
  ["method-explorer", "Method Explorer"],
  ["operations-matrix", "Operations Comparison Matrix"],
  ["agritech-example", "Agritech Example"],
  ["decision-tree", "Collection Decision Tree"],
  ["playground", "Playground"],
  ["debug-challenge", "Debug Challenge"],
  ["practice", "Practice"],
  ["engineer", "Think like an Engineer"],
  ["quiz", "Knowledge Check"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What’s next"],
] as const;

function validateCollectionOperationsCode(code: string) {
  // Check for calling append() on tuples
  if (/\([^\)]*\)\.append\s*\(/.test(code)) {
    return "Tuples are immutable and do not have an append() method. Use tuple concatenation t + (val,) or convert to a list first.";
  }
  // Check for calling reversed() directly on a set
  if (/reversed\s*\(\s*\{[^\}]*\}\s*\)/.test(code)) {
    return "Sets are unordered collections and do not support reversed(). Call sorted() on the set first: list(reversed(sorted(s))).";
  }
  return null;
}

export function CollectionOperationsLessonRenderer({
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
  if (!pack || pack.kind !== "collection-operations") return null;

  return (
    <article className="published-lesson collection-operations-development-pack">
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

          <CollectionOperationsStorySection story={pack.story} />

          <FunctionExplorer builtIns={pack.builtIns} />

          <BuiltInComparisonTable builtInComparison={pack.builtInComparison} />

          <MethodExplorer methodsSummary={pack.methodsSummary} />

          <OperationsComparisonMatrix operationsMatrix={pack.operationsMatrix} />

          <CollectionAgritechPanel agritech={pack.agritech} />

          <CollectionDecisionTree />

          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />

          <CodePlayground
            id="playground"
            content={lesson.playground}
            validateCode={validateCollectionOperationsCode}
            traceExecution
          />

          <DebugChallengeCollection challenges={pack.debugChallenges} />

          <PracticeCard id="practice" tasks={lesson.practice} />

          <CollectionEngineerScenario content={pack.engineerScenario} />

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
        </aside>
      </div>

      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
