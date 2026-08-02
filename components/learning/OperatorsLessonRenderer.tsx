import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodeExampleCard, CommonMistakesCard, DebugChallengeCard } from "@/components/learning/FirstProgramLessonBlocks";
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
  AssignmentOperatorExplorer,
  BitwiseExplorer,
  IdentityMembershipCard,
  OperatorCategoryCard,
  OperatorDefinitionCard,
  OperatorExplorer,
  OperatorPlayground,
  OperatorPrecedenceVisualizer,
  OperatorStoryCard,
  TruthTableExplorer,
} from "@/components/learning/OperatorLearningBlocks";
import { PredictionCard } from "@/components/learning/PredictionCard";
import { MiniProjectCard } from "@/components/learning/UserInputLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const operatorOutline = [
  ["objectives", "Objectives"],
  ["operator-story", "Smart-farm story"],
  ["operator-definition", "Operators"],
  ["arithmetic-operators", "Arithmetic"],
  ["comparison-operators", "Comparison"],
  ["logical-operators", "Logical"],
  ["truth-table", "Truth table"],
  ["assignment-operators", "Assignment"],
  ["identity-operators", "Identity"],
  ["membership-operators", "Membership"],
  ["bitwise-operators", "Bitwise"],
  ["operator-precedence", "Precedence"],
  ["agritech-operators", "Agritech case study"],
  ["playground", "Operator lab"],
  ["common-mistakes", "Common mistakes"],
  ["debug-challenge", "Debug challenge"],
  ["engineer-scenario", "Engineer scenario"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["mini-project", "Mini project"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["key-takeaways", "Key takeaways"],
  ["whats-next", "What's next"],
] as const;

export function OperatorsLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "operators") return null;

  return <article className="published-lesson operators-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout operators-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><OperatorStoryCard content={pack.story} /><OperatorDefinitionCard content={pack.definition} /><OperatorCategoryCard id="arithmetic-operators" label="Arithmetic operators" content={pack.arithmetic} example={pack.arithmetic.agritechExample} /><OperatorExplorer arithmetic={pack.arithmetic.rows} comparison={pack.comparison.rows} /><OperatorCategoryCard id="comparison-operators" label="Comparison operators" content={pack.comparison} example={pack.comparison.example} secondaryExample={pack.comparison.agritechExample} /><PredictionCard id="comparison-predictions" content={pack.comparison.prediction} /><OperatorCategoryCard id="logical-operators" label="Logical operators" content={pack.logical} example={pack.logical.example} /><TruthTableExplorer content={pack.logical} /><AssignmentOperatorExplorer content={pack.assignmentOperators} /><IdentityMembershipCard identity={pack.identity} membership={pack.membership} /><BitwiseExplorer content={pack.bitwise} /><OperatorPrecedenceVisualizer content={pack.precedence} /><CodeExampleCard id="agritech-operators" label="Agritech case study" example={pack.agritechProgram} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><OperatorPlayground content={lesson.playground} arithmetic={pack.arithmetic.rows} comparison={pack.comparison.rows} expressions={pack.expressions} activities={pack.playgroundActivities} /><CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes} /><DebugChallengeCard content={pack.debugChallenge} /><EngineerScenario content={pack.engineerScenario} /><PracticeCard id="practice" tasks={lesson.practice} /><QuizCard id="quiz" quiz={lesson.quiz} /><MiniProjectCard project={pack.miniProject} /><AssignmentCard id="assignment" assignment={lesson.assignment} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{operatorOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
