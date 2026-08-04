import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
import { LessonHero } from "@/components/learning/LessonHero";
import { AssignmentCard, IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { TupleAgritechPanel, TupleBuiltInExplorer, TupleComparisonCard, TupleDefinitionPanel, TupleEngineerScenario, TupleIndexingPanel, TupleLockSimulator, TupleMethodExplorer, TuplePlaygroundSupplement, TupleStorySection, TupleWhySection, TuplePackingSection } from "@/components/learning/TupleLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Learning objectives"],
  ["story", "Story and why tuples"],
  ["why-tuples", "Why tuples"],
  ["definition", "Creating and indexing"],
  ["indexing", "Indexing"],
  ["immutability", "Immutability"],
  ["packing", "Packing and unpacking"],
  ["built-ins", "Built-in functions"],
  ["methods", "Tuple methods"],
  ["comparison", "List vs tuple"],
  ["agritech-example", "Agritech example"],
  ["playground", "Playground"],
  ["debug-challenge", "Debug challenge"],
  ["practice", "Practice"],
  ["engineer", "Think like an engineer"],
  ["summary", "Summary"],
  ["whats-next", "What’s next"],
] as const;

function validateTupleCode(code: string) {
  if (/\[[^\]]*\]/.test(code)) return "Tuples use parentheses, not square brackets. Keep list-like methods for Lesson 4.2/4.3 examples.";
  if (/\.(?:append|extend|insert|remove|pop|sort|reverse|clear|copy)\s*\(/.test(code)) return "Tuple methods are limited. Keep this lesson focused on tuple behavior and tuple-allowed methods only.";
  if (/\{[^}]*\}/.test(code)) return "Use only tuple-focused syntax in this lesson.";
  return null;
}

export function TupleLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "tuples") return null;

  return (
    <article className="published-lesson tuple-development-pack">
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
          <TupleStorySection story={pack.story} />
          <TupleWhySection data={pack.whyTuples} />
          <TupleDefinitionPanel creation={pack.creation} anatomy={pack.anatomy} />
          <TupleIndexingPanel indexing={pack.indexing} />
          <TupleLockSimulator immutability={pack.immutability} />
          <TuplePackingSection packing={pack.packing} unpacking={pack.unpacking} />
          <TupleBuiltInExplorer builtIns={pack.builtIns} values={pack.agritech.immutableValues} title={pack.builtIns.title} />
          <TupleMethodExplorer methods={pack.methods} />
          <TupleComparisonCard comparison={pack.comparison} />
          <TupleAgritechPanel agritech={pack.agritech} />
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <CodePlayground
            id="playground"
            content={lesson.playground}
            validateCode={validateTupleCode}
            traceExecution
            renderSupplement={(code) => <TuplePlaygroundSupplement code={code} values={pack.agritech.immutableValues} />}
          />
          <DebugChallengeCollection challenges={pack.debugChallenges} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <TupleEngineerScenario content={pack.engineerScenario} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>
        <aside className="lesson-outline published-lesson-outline" aria-label="On this page">
          <p>On this page</p>
          {outline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </aside>
      </div>
      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
