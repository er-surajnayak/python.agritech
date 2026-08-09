import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import { IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import {
  ArrayCreationCheatSheet,
  ArrayFromDataPanel,
  DtypeCreationPanel,
  IdentityMatrixPanel,
  InitializedArrayExplorer,
  NumpyArrayFactory,
  RandomFunctionExplorer,
  RandomSensorSimulator,
  SequenceFunctionComparator,
} from "@/components/learning/NumpyArrayCreationLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"],
  ["from-data", "From Python data"],
  ["initialized-arrays", "Initialized arrays"],
  ["sequences", "Sequences"],
  ["identity-matrix", "Identity matrix"],
  ["random-arrays", "Random arrays"],
  ["dtype", "dtype"],
  ["cheat-sheet", "Cheat sheet"],
  ["array-factory", "Array Factory"],
  ["random-simulator", "Sensor simulator"],
  ["playground", "Code runner"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;

export function NumpyArrayCreationLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "numpy-array-creation") return null;
  return <article className="published-lesson numpy-introduction-pack numpy-array-creation-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><section className="lesson-card numpy-creation-story"><p className="lesson-section-label">Smart Farm story</p><h2>One dataset, many possible starting structures</h2><p>{pack.storyHook}</p><div className="numpy-toolbox-flow"><span>Existing readings</span><span>Initialized storage</span><span>Sequences</span><span>Simulated data</span></div></section><ArrayFromDataPanel content={pack.fromData} /><InitializedArrayExplorer items={pack.initializedArrays} /><SequenceFunctionComparator items={pack.sequenceFunctions} /><IdentityMatrixPanel content={pack.identityMatrix} /><RandomFunctionExplorer functions={pack.randomFunctions} seed={pack.seed} /><DtypeCreationPanel content={pack.dtype} /><ArrayCreationCheatSheet rows={pack.cheatSheet} /><NumpyArrayFactory /><RandomSensorSimulator /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><CodePlayground id="playground" content={lesson.playground} className="numpy-playground" /><PracticeCard id="practice" tasks={lesson.practice} /><QuizCard id="quiz" quiz={lesson.quiz} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{outline.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
