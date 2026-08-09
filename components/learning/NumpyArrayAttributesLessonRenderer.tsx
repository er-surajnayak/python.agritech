import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import { IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
import {
  ArrayAttributeInspector,
  ArrayMemoryPanel,
  AttributeQuickReference,
  DimensionStructureVisualizer,
  DtypeConversionExplorer,
  ReshapePreview,
  SensorDatasetProblem,
} from "@/components/learning/NumpyArrayAttributesLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"], ["sensor-problem", "Smart Farm dataset"], ["array-inspector", "Array Inspector"],
  ["dimensions", "Dimensions"], ["dtype-conversion", "dtype & astype"], ["memory", "Memory"],
  ["reshape-preview", "reshape preview"], ["playground", "Code runner"], ["practice", "Practice"],
  ["debug-challenge", "Debug"], ["quiz", "Quiz"], ["quick-reference", "Quick reference"],
  ["summary", "Summary"], ["whats-next", "What's next"],
] as const;

export function NumpyArrayAttributesLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "numpy-array-attributes") return null;
  return <article className="published-lesson numpy-introduction-pack numpy-array-attributes-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><section className="lesson-card numpy-attributes-story"><p className="lesson-section-label">Smart Farm story</p><h2>Structure first, analysis second</h2><p>{pack.storyHook}</p><div className="numpy-inspection-flow"><span>Create</span><span>Inspect</span><span>Convert if needed</span><span>Calculate confidently</span></div></section><SensorDatasetProblem content={pack.sensorDataset} /><ArrayAttributeInspector attributes={pack.attributes} values={pack.sensorDataset.values} /><DimensionStructureVisualizer dimensions={pack.dimensions} /><DtypeConversionExplorer types={pack.dataTypes} conversion={pack.conversion} /><ArrayMemoryPanel content={pack.memory} /><ReshapePreview content={pack.reshapePreview} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><CodePlayground id="playground" content={lesson.playground} className="numpy-playground" /><PracticeCard id="practice" tasks={lesson.practice} /><DebugChallengeCollection challenges={pack.debugChallenges} /><QuizCard id="quiz" quiz={lesson.quiz} /><AttributeQuickReference rows={pack.quickReference} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{outline.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
