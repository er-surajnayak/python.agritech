import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CommonMistakesCard } from "@/components/learning/FirstProgramLessonBlocks";
import {
  FirstIfExample,
  IfExamplesGallery,
  IfExecutionFlow,
  IfPlayground,
  IfStatementVisualizer,
  IfStoryCard,
  IfSyntaxBreakdown,
  IndentationChecker,
} from "@/components/learning/IfStatementLearningBlocks";
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
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
import { MiniProjectCard } from "@/components/learning/UserInputLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const ifStatementOutline = [
  ["objectives", "Objectives"], ["if-story", "Smart irrigation story"], ["if-definition", "What is if?"],
  ["if-syntax", "Syntax"], ["first-if-example", "First example"], ["execution-flow", "Execution flow"],
  ["indentation-checker", "Indentation checker"], ["multiple-statements", "Multiple statements"],
  ["agritech-if-examples", "Agritech examples"], ["playground", "Execution lab"],
  ["common-mistakes", "Common mistakes"], ["debug-challenge", "Debug challenge"],
  ["engineer-scenario", "Engineer thinking"], ["practice", "Practice"], ["quiz", "Quiz"],
  ["mini-project", "Mini project"], ["assignment", "Assignment"], ["summary", "Summary"], ["whats-next", "What's next"],
] as const;

export function IfStatementLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "if-statement") return null;
  return <article className="published-lesson if-statement-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout if-statement-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><IfStoryCard content={pack.story} /><IfStatementVisualizer content={pack.definition} /><IfSyntaxBreakdown content={pack.syntax} /><FirstIfExample content={pack.firstExample} /><IfExecutionFlow content={pack.executionFlow} /><IndentationChecker content={pack.indentation} /><IfExamplesGallery multiple={pack.multipleStatements} examples={pack.agritechExamples} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><IfPlayground content={lesson.playground} fields={pack.simulatorFields} /><CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes} /><DebugChallengeCollection challenges={pack.debugChallenges} /><EngineerScenario content={pack.engineerScenario} /><PracticeCard id="practice" tasks={lesson.practice} /><QuizCard id="quiz" quiz={lesson.quiz} /><MiniProjectCard project={pack.miniProject} /><AssignmentCard id="assignment" assignment={lesson.assignment} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{ifStatementOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
