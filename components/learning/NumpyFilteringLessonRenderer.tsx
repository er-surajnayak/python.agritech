import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { BooleanMaskVisualizer, FilteringQuickReference, IrrigationDecisionPanel, MultipleConditionsPanel, SmartFarmSensorFilter, SortingVisualizer } from "@/components/learning/NumpyFilteringLearningBlocks";
import { LessonHero } from "@/components/learning/LessonHero";
import { IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"], ["sorting", "Sorting"], ["boolean-mask", "Boolean masks"],
  ["conditions", "Conditions"], ["irrigation", "Irrigation"], ["farm-filter", "Farm filter"],
  ["playground", "Code runner"], ["practice", "Practice"], ["debug-challenge", "Debug"],
  ["quiz", "Quiz"], ["quick-reference", "Quick reference"], ["summary", "Summary"], ["whats-next", "What's next"],
] as const;

export function NumpyFilteringLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "numpy-sorting-searching-filtering") return null;
  return <article className="published-lesson numpy-introduction-pack numpy-filtering-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><section className="lesson-card"><p className="lesson-section-label">Smart Farm problem</p><h2>Find the readings that need attention</h2><p>{pack.storyHook}</p><div className="numpy-filtering-flow"><span>Sort</span><span>Search</span><span>Build mask</span><span>Keep matches</span></div></section><SortingVisualizer content={pack.sorting} /><BooleanMaskVisualizer content={pack.where} /><MultipleConditionsPanel conditions={pack.conditions} anyAll={pack.anyAll} where={pack.where} /><IrrigationDecisionPanel content={pack.irrigation} /><SmartFarmSensorFilter content={pack.sensorFilter} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><CodePlayground id="playground" content={lesson.playground} className="numpy-playground" /><PracticeCard id="practice" tasks={lesson.practice} /><DebugChallengeCollection challenges={pack.debugChallenges} /><QuizCard id="quiz" quiz={lesson.quiz} /><FilteringQuickReference rows={pack.quickReference} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{outline.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
