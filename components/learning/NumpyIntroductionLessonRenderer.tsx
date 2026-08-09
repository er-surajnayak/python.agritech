import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import { IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import {
  ArrayCreationExplorer,
  AttributeExplorer,
  DimensionExplorer,
  FirstCalculationPanel,
  ListArrayComparison,
  MLPipeline,
  NumpyDefinitionCard,
  NumpyPlaygroundSupplement,
  SmartFarmArrayPanel,
  VectorizationComparator,
} from "@/components/learning/NumpyIntroductionLearningBlocks";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"],
  ["story", "Smart Farm problem"],
  ["what-is-numpy", "What is NumPy?"],
  ["why-numpy", "Why NumPy?"],
  ["list-vs-array", "List vs array"],
  ["dimensions", "Array dimensions"],
  ["creation-functions", "Creating arrays"],
  ["attributes", "Attributes & dtype"],
  ["first-calculation", "First calculation"],
  ["playground", "Playground"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;

export function NumpyIntroductionLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "numpy-introduction") return null;

  return (
    <article className="published-lesson numpy-introduction-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} />
      <div className="published-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <section id="story" className="lesson-card numpy-story"><p className="lesson-section-label">Smart Farm problem</p><h2>Thousands of readings should not require thousands of operations</h2><p>{pack.storyHook}</p><div className="numpy-story-flow"><span>Python Lists</span><ArrowLabel /><span>NumPy Arrays</span><ArrowLabel /><span>Data Science & ML</span></div></section>
          <NumpyDefinitionCard content={pack.definition} />
          <VectorizationComparator content={pack.vectorization} />
          <ListArrayComparison rows={pack.comparison} />
          <SmartFarmArrayPanel sensors={pack.sensorExamples} />
          <DimensionExplorer dimensions={pack.dimensions} />
          <ArrayCreationExplorer functions={pack.creationFunctions} spacing={pack.spacingComparison} />
          <AttributeExplorer content={pack.attributeExample} dataTypes={pack.dataTypes} />
          <FirstCalculationPanel content={pack.firstCalculation} />
          <WorkflowAnimation id="numpy-workflow" title={lesson.workflow.title} description={lesson.workflow.description} steps={lesson.workflow.steps} />
          <MLPipeline steps={pack.mlPipeline} />
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <CodePlayground id="playground" content={lesson.playground} className="numpy-playground" renderSupplement={(code) => <NumpyPlaygroundSupplement code={code} />} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>
        <aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{outline.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside>
      </div>
      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}

function ArrowLabel() {
  return <span className="numpy-story-arrow" aria-hidden="true">→</span>;
}
