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
  SetVisualizer,
  DuplicateEliminator,
  SetOperationsVisualizer,
  MembershipExplorer,
  BuiltInFunctionExplorer,
  MethodExplorer,
  SetsComparisonCard,
  SetsAgritechPanel,
  SetsStorySection,
  SetsCharacteristicsSection,
  SetsCreationSection,
  SetsEngineerScenario,
} from "@/components/learning/SetsLearningBlocks";
import { CollectionDecisionTree } from "@/components/learning/CollectionDecisionTree";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Learning objectives"],
  ["story", "Duplicate Sensor Problem"],
  ["characteristics", "What is a Set?"],
  ["creation", "Creating Sets"],
  ["set-visualizer", "Set Visualizer"],
  ["duplicate-eliminator", "Duplicate Eliminator"],
  ["membership-explorer", "Membership Explorer"],
  ["set-operations", "Set Operations Visualizer"],
  ["built-ins", "Built-in Functions"],
  ["methods", "Set Methods"],
  ["comparison", "List vs Tuple vs Set"],
  ["decision-tree", "Collection Decision Tree"],
  ["agritech-example", "Agritech Example"],
  ["playground", "Playground"],
  ["debug-challenge", "Debug Challenge"],
  ["practice", "Practice"],
  ["engineer", "Think like an Engineer"],
  ["summary", "Summary"],
  ["whats-next", "What’s next"],
] as const;

function validateSetsCode(code: string) {
  // Check for indexing syntax like A[0]
  if (/\[\s*\d+\s*\]/.test(code) && !/set\(\s*\[/.test(code) && !/list\(\s*A\s*\)\s*\[/.test(code)) {
    return "Sets are unordered and do not support indexing like A[0]. Convert the set to a list with list(A) first if you need subscript access.";
  }
  // Check for empty braces dictionary mistake
  if (/=\s*\{\s*\}/.test(code)) {
    return "Creating a set with empty braces '{}' creates a dictionary instead. Use 'set()' for an empty set.";
  }
  // Check for appending or key errors
  if (/\.append\s*\(/.test(code)) {
    return "Sets do not have an append() method. Use add() to insert elements into a set.";
  }
  return null;
}

export function SetsLessonRenderer({
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
  if (!pack || pack.kind !== "sets") return null;

  return (
    <article className="published-lesson sets-development-pack">
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
          
          <SetsStorySection story={pack.story} />
          
          <SetsCharacteristicsSection characteristics={pack.whatIsSet} />
          
          <SetsCreationSection creation={pack.creation} />
          
          <SetVisualizer />
          
          <DuplicateEliminator />
          
          <MembershipExplorer />
          
          <SetOperationsVisualizer
            farmA={pack.operations.farmAValues}
            farmB={pack.operations.farmBValues}
            rows={pack.operations.rows}
          />
          
          <BuiltInFunctionExplorer builtIns={pack.builtIns} />
          
          <MethodExplorer methods={pack.methods} />
          
          <SetsComparisonCard comparison={pack.comparison} />

          <CollectionDecisionTree />
          
          <SetsAgritechPanel agritech={pack.agritech} />
          
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          
          <CodePlayground
            id="playground"
            content={lesson.playground}
            validateCode={validateSetsCode}
            traceExecution
          />
          
          <DebugChallengeCollection challenges={pack.debugChallenges} />
          
          <PracticeCard id="practice" tasks={lesson.practice} />
          
          <SetsEngineerScenario content={pack.engineerScenario} />
          
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
