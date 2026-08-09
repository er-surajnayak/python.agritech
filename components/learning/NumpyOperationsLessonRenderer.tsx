import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import { IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
import { ArithmeticOperationsExplorer, ArrayCalculator, BroadcastingCompatibilityChecker, BroadcastingVisualizer, CalibrationAndOperators, CelsiusAndComparisonPanel, OperationsQuickReference, VectorizationComparison } from "@/components/learning/NumpyOperationsLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"], ["vectorization", "Vectorization"], ["arithmetic", "Arithmetic"],
  ["comparisons", "Comparisons"], ["array-calculator", "Array calculator"], ["broadcasting", "Broadcasting"],
  ["compatibility-checker", "Shape checker"], ["calibration", "Calibration"], ["operators", "Operators"],
  ["playground", "Code runner"], ["practice", "Practice"], ["debug-challenge", "Debug"],
  ["quiz", "Quiz"], ["quick-reference", "Quick reference"], ["summary", "Summary"], ["whats-next", "What's next"],
] as const;

export function NumpyOperationsLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "numpy-operations-broadcasting") return null;
  return <article className="published-lesson numpy-introduction-pack numpy-operations-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><section className="lesson-card"><p className="lesson-section-label">Smart Farm problem</p><h2>Calculate across the complete sensor dataset</h2><p>{pack.storyHook}</p><div className="numpy-operations-flow"><span>Calibrate</span><span>Convert</span><span>Compare</span><span>Broadcast</span></div></section><VectorizationComparison content={pack.vectorization} /><ArithmeticOperationsExplorer operations={pack.arithmetic} /><CelsiusAndComparisonPanel celsius={pack.celsius} comparisons={pack.comparisons} booleanSum={pack.booleanSum} /><ArrayCalculator /><BroadcastingVisualizer content={pack.broadcasting} /><BroadcastingCompatibilityChecker rules={pack.rules} /><CalibrationAndOperators calibration={pack.calibration} multiply={pack.multiplyComparison} operators={pack.operatorReference} comparisons={pack.comparisonReference} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><CodePlayground id="playground" content={lesson.playground} className="numpy-playground" /><PracticeCard id="practice" tasks={lesson.practice} /><DebugChallengeCollection challenges={pack.debugChallenges} /><QuizCard id="quiz" quiz={lesson.quiz} /><OperationsQuickReference rows={pack.quickReference} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{outline.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
