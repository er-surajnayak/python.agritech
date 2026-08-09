import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import { IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { AxisExplorer, ExtremeAndSpreadPanel, FunctionEquivalentsAndReference, MathematicalFunctionGallery, SensorAnalyticsDashboard, StatisticalFunctionExplorer } from "@/components/learning/NumpyMathStatisticsLearningBlocks";
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"], ["statistics", "Statistics"], ["extremes-spread", "Position & spread"],
  ["mathematical-functions", "Mathematical functions"], ["sensor-analytics", "Analytics dashboard"],
  ["axis-explorer", "Axis explorer"], ["playground", "Code runner"], ["practice", "Practice"],
  ["debug-challenge", "Debug"], ["quiz", "Quiz"], ["quick-reference", "Quick reference"],
  ["summary", "Summary"], ["whats-next", "What's next"],
] as const;

export function NumpyMathStatisticsLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "numpy-math-statistics") return null;
  return <article className="published-lesson numpy-introduction-pack numpy-math-statistics-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><section className="lesson-card"><p className="lesson-section-label">Smart Farm problem</p><h2>Turn raw readings into useful evidence</h2><p>{pack.storyHook}</p><div className="numpy-analysis-flow"><span>Summarize</span><span>Locate</span><span>Measure spread</span><span>Compare axes</span></div></section><StatisticalFunctionExplorer content={pack.moisture} /><ExtremeAndSpreadPanel extremes={pack.extremes} spread={pack.spread} /><MathematicalFunctionGallery functions={pack.mathematical} /><SensorAnalyticsDashboard operations={pack.moisture.statistics} /><AxisExplorer content={pack.axis} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><CodePlayground id="playground" content={lesson.playground} className="numpy-playground" /><PracticeCard id="practice" tasks={lesson.practice} /><DebugChallengeCollection challenges={pack.debugChallenges} /><QuizCard id="quiz" quiz={lesson.quiz} /><FunctionEquivalentsAndReference equivalents={pack.methodEquivalents} rows={pack.quickReference} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{outline.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
