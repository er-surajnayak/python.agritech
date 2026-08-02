import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CommonMistakesCard } from "@/components/learning/FirstProgramLessonBlocks";
import {
  AgritechIfElseGallery,
  CompareChooseCard,
  ExecutionComparator,
  FirstIfElseExample,
  IfElsePlayground,
  IfElseStoryCard,
  IfElseSyntaxBreakdown,
  IfElseVisualizer,
  WhyIfAloneCard,
} from "@/components/learning/IfElseLearningBlocks";
import { LessonHero } from "@/components/learning/LessonHero";
import { AssignmentCard, IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
import { MiniProjectCard } from "@/components/learning/UserInputLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { CourseLesson, CourseModule } from "@/types/course";
import type { LessonDocument } from "@/types/content";

const ifElseOutline = [
  ["objectives", "Objectives"], ["if-else-story", "Story continuation"], ["why-if-alone", "Why if is not enough"],
  ["if-else-definition", "What is else?"], ["if-else-syntax", "Syntax"], ["first-if-else-example", "First example"],
  ["agritech-if-else", "Agritech examples"], ["execution-comparator", "Compare executions"],
  ["playground", "Execution lab"], ["common-mistakes", "Common mistakes"], ["debug-challenge", "Debug challenge"],
  ["engineer-scenario", "Engineer thinking"], ["practice", "Practice"], ["mini-project", "Mini project"],
  ["quiz", "Quiz"], ["assignment", "Assignment"], ["compare-choose", "Compare & Choose"],
  ["summary", "Summary"], ["whats-next", "What's next"],
] as const;

export function IfElseLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "if-else") return null;
  return <article className="published-lesson if-else-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout if-else-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><IfElseStoryCard content={pack.story} /><WhyIfAloneCard content={pack.whyIfAlone} /><IfElseVisualizer content={pack.definition} /><IfElseSyntaxBreakdown content={pack.syntax} /><FirstIfElseExample content={pack.firstExample} /><AgritechIfElseGallery examples={pack.agritechExamples} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><ExecutionComparator content={pack.comparator} /><IfElsePlayground content={lesson.playground} fields={pack.simulatorFields} /><CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes} /><DebugChallengeCollection challenges={pack.debugChallenges} /><EngineerScenario content={pack.engineerScenario} /><PracticeCard id="practice" tasks={lesson.practice} /><MiniProjectCard project={pack.miniProject} /><QuizCard id="quiz" quiz={lesson.quiz} /><AssignmentCard id="assignment" assignment={lesson.assignment} /><CompareChooseCard content={pack.comparison} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{ifElseOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
