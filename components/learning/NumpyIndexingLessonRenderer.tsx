import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import { IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
import { IndexingQuickReference, ModificationAndMaskPanel, NumpyDataExplorer, OneDimensionalIndexExplorer, ReshapePlayground, ShapeTransformComparator, SlicePatternGallery } from "@/components/learning/NumpyIndexingLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"], ["indexing-1d", "1D indexing"], ["data-explorer", "Data Explorer"],
  ["slicing", "Slicing"], ["modify-filter", "Modify & masks"], ["reshape-lab", "Reshape lab"],
  ["shape-transforms", "Shape transforms"], ["playground", "Code runner"], ["practice", "Practice"],
  ["debug-challenge", "Debug"], ["quiz", "Quiz"], ["quick-reference", "Quick reference"],
  ["summary", "Summary"], ["whats-next", "What's next"],
] as const;

export function NumpyIndexingLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "numpy-indexing-reshaping") return null;
  return <article className="published-lesson numpy-introduction-pack numpy-indexing-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><section className="lesson-card"><p className="lesson-section-label">Smart Farm problem</p><h2>Select only the data the question needs</h2><p>{pack.storyHook}</p><div className="numpy-access-flow"><span>Locate</span><span>Select</span><span>Modify</span><span>Restructure</span></div></section><OneDimensionalIndexExplorer content={pack.oneDimensional} /><NumpyDataExplorer matrix={pack.matrix} /><SlicePatternGallery slices={pack.slices} /><ModificationAndMaskPanel modifications={pack.modification} mask={pack.booleanIndexing} /><ReshapePlayground content={pack.reshape} /><ShapeTransformComparator flattening={pack.flattening} transpose={pack.transpose} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><CodePlayground id="playground" content={lesson.playground} className="numpy-playground" /><PracticeCard id="practice" tasks={lesson.practice} /><DebugChallengeCollection challenges={pack.debugChallenges} /><QuizCard id="quiz" quiz={lesson.quiz} /><IndexingQuickReference rows={pack.quickReference} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{outline.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
