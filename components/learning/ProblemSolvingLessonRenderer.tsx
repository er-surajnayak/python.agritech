import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
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
  ChallengeCard,
  DebugChallengeCollection,
  ExpressionBuilder,
  ExpressionBuildingCard,
  FormulaCard,
  GuidedPracticeLab,
  ProblemSolvingFrameworkCard,
  ProblemSolvingPlayground,
  ProblemSolvingStoryCard,
} from "@/components/learning/ProblemSolvingLearningBlocks";
import { MiniProjectCard } from "@/components/learning/UserInputLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const problemSolvingOutline = [
  ["objectives", "Objectives"],
  ["problem-story", "Real-world story"],
  ["problem-solving-framework", "Problem-solving framework"],
  ["expression-building", "Expressions"],
  ["temperature-converter", "Temperature converter"],
  ["rectangle-area", "Rectangle area"],
  ["percentage", "Percentage"],
  ["simple-interest", "Simple interest"],
  ["crop-yield", "Agritech problems"],
  ["expression-builder", "Expression builder"],
  ["playground", "Problem-solving lab"],
  ["guided-practice", "Guided practice"],
  ["challenge-problems", "Challenges"],
  ["debug-challenge", "Debug challenge"],
  ["engineer-scenario", "Engineer thinking"],
  ["quiz", "Quiz"],
  ["mini-project", "Mini project"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;

export function ProblemSolvingLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "problem-solving") return null;

  return <article className="published-lesson problem-solving-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout problem-solving-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><ProblemSolvingStoryCard content={pack.story} /><ProblemSolvingFrameworkCard content={pack.framework} /><ExpressionBuildingCard content={pack.expressionBuilding} />{pack.workedExamples.map((problem) => <FormulaCard key={problem.id} problem={problem} />)}<IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />{pack.agritechProblems.map((problem) => <FormulaCard key={problem.id} problem={problem} agritech />)}<ExpressionBuilder content={pack.expressionBuilder} /><ProblemSolvingPlayground content={lesson.playground} fields={pack.simulatorFields} expressionBuilder={pack.expressionBuilder} /><GuidedPracticeLab guided={pack.guidedPractice} independent={pack.independentPractice} /><PracticeCard id="practice" tasks={lesson.practice} /><ChallengeCard challenges={pack.challenges} /><DebugChallengeCollection challenges={pack.debugChallenges} /><EngineerScenario content={pack.engineerScenario} /><QuizCard id="quiz" quiz={lesson.quiz} /><MiniProjectCard project={pack.miniProject} /><AssignmentCard id="assignment" assignment={lesson.assignment} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{problemSolvingOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
