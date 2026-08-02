import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import {
  AgritechDecisionCase,
  BooleanReviewCard,
  ConditionEvaluator,
  ControlFlowAnimator,
  DecisionStoryCard,
  ExecutionComparison,
  FlowchartBuilder,
  FlowchartViewer,
  FlowchartSymbolGuide,
  InteractiveFlowSimulator,
  RealLifeDecisionCards,
  ScenarioDecisionCard,
  WhyDecisionMakingCard,
} from "@/components/learning/DecisionMakingLearningBlocks";
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
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const decisionMakingOutline = [
  ["objectives", "Objectives"],
  ["decision-story", "Smart Farm story"],
  ["why-decisions", "Why decisions?"],
  ["execution-comparison", "Execution paths"],
  ["condition-evaluator", "Conditions"],
  ["boolean-review", "Boolean review"],
  ["control-flow", "Control flow"],
  ["flowchart-symbols", "Flowcharts"],
  ["flowchart-example", "Example flowchart"],
  ["flowchart-builder", "Flowchart builder"],
  ["agritech-case", "Agritech case"],
  ["flow-simulator", "Flow simulator"],
  ["real-life-examples", "Real-life examples"],
  ["scenario-practice", "Scenario practice"],
  ["engineer-scenario", "Engineer thinking"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;

export function DecisionMakingLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "decision-making") return null;

  return <article className="published-lesson decision-making-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout decision-making-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><DecisionStoryCard content={pack.story} /><WhyDecisionMakingCard content={pack.whyDecisions} /><ExecutionComparison content={pack.executionComparison} /><ConditionEvaluator content={pack.conditions} /><BooleanReviewCard content={pack.booleanReview} /><ControlFlowAnimator content={pack.controlFlow} /><FlowchartSymbolGuide content={pack.flowcharts} /><FlowchartViewer id="flowchart-example" title="Read a pass-or-fail flowchart" description="Follow the marks input into the decision diamond, then compare the highlighted Yes and No paths." nodes={pack.flowcharts.example} /><FlowchartBuilder content={pack.flowcharts} /><AgritechDecisionCase content={pack.agritechCase} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><InteractiveFlowSimulator content={pack.simulator} /><RealLifeDecisionCards scenarios={pack.realLifeScenarios} /><ScenarioDecisionCard scenarios={pack.scenarioPractice} /><EngineerScenario content={pack.engineerScenario} /><PracticeCard id="practice" tasks={lesson.practice} /><QuizCard id="quiz" quiz={lesson.quiz} /><AssignmentCard id="assignment" assignment={lesson.assignment} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{decisionMakingOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
