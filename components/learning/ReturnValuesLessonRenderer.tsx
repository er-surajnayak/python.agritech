import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CodeExampleCard, CommonMistakesCard } from "@/components/learning/FirstProgramLessonBlocks";
import { LessonHero } from "@/components/learning/LessonHero";
import { AssignmentCard, IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import {
  FirstReturnCard,
  FunctionDebugChallenges,
  FunctionEvolutionPanel,
  FunctionLifecyclePanel,
  PrintProblemCard,
  PrintReturnComparator,
  ReturnComparison,
  ReturnConceptCard,
  ReturnEndsFunction,
  ReturnFlowVisualizer,
  ReturnMiniProject,
  ReturnPlaygroundSupplement,
  ReturnStory,
  ReturnTypesPanel,
  ValuePropagationExplorer,
} from "@/components/learning/ReturnValueLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const returnOutline = [["function-evolution","Function evolution"],["function-lifecycle","Function lifecycle"],["objectives","Objectives"],["story","Story"],["print-problem","Problem with print"],["return-concept","Return concept"],["first-return","First return"],["return-flow","Return flow"],["print-vs-return","Print vs return"],["value-propagation","Value propagation"],["agritech-examples","Agritech examples"],["return-types","Return types"],["return-ends","Return ends function"],["playground","Playground"],["common-mistakes","Common mistakes"],["debug-challenges","Debug challenges"],["engineer-scenario","Engineer thinking"],["practice","Practice"],["mini-project","Mini project"],["compare-choose","Compare & choose"],["quiz","Quiz"],["assignment","Assignment"],["summary","Summary"],["whats-next","What's next"]] as const;

function validateReturnLessonScope(code: string) {
  if (/^(?!\s*def\b)\s*\w+\([^\n)]*\w+\s*=/m.test(code)) return "Keyword arguments begin in Lesson 3.5. Use positional arguments in this lesson.";
  if (/^\s*def\s+\w+\([^)]*=.+\)\s*:/m.test(code)) return "Default arguments begin in Lesson 3.6. Use required parameters only.";
  if (/\blambda\b/.test(code)) return "Lambda functions are introduced later in Module 3.";
  if (/\braise\b|\btry\s*:|\bexcept\b/.test(code)) return "Exception handling is outside this lesson. Focus on produced values and return flow.";
  return null;
}

export function ReturnValuesLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack=lesson.developmentPack; if(!pack||pack.kind!=="return-values") return null;
  return <article className="published-lesson return-values-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson}/><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite}/><div className="published-lesson-layout return-values-lesson-layout"><div className="published-lesson-flow"><FunctionEvolutionPanel content={pack.evolution}/><FunctionLifecyclePanel content={pack.lifecycle}/><LearningObjectivesCard id="objectives" objectives={lesson.objectives}/><ReturnStory content={pack.story}/><PrintProblemCard content={pack.printProblem}/><ReturnConceptCard content={pack.definition}/><FirstReturnCard content={pack.firstReturn}/><ReturnFlowVisualizer content={pack.returnFlow}/><PrintReturnComparator content={pack.comparator}/><ValuePropagationExplorer content={pack.propagation}/><section id="agritech-examples" className="return-agritech-examples" aria-label="Agritech return examples">{pack.agritechExamples.map((example,index)=><CodeExampleCard key={example.title} id={`return-agritech-${index+1}`} label="Agritech return example" example={example}/>)}</section><ReturnTypesPanel content={pack.returnTypes}/><ReturnEndsFunction content={pack.returnEnds}/><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation}/><CodePlayground id="playground" content={lesson.playground} className="return-values-playground" traceExecution validateCode={validateReturnLessonScope} renderSupplement={(_,execution)=><ReturnPlaygroundSupplement execution={execution}/>}/><CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes}/><FunctionDebugChallenges challenges={pack.debugChallenges}/><EngineerScenario content={pack.engineerScenario}/><PracticeCard id="practice" tasks={lesson.practice}/><ReturnMiniProject content={pack.miniProject}/><ReturnComparison content={pack.comparison}/><QuizCard id="quiz" quiz={lesson.quiz}/><AssignmentCard id="assignment" assignment={lesson.assignment}/><SummaryCard id="summary" section={lesson.summarySection}/><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways}/><WhatsNextCard id="whats-next" section={lesson.whatsNext}/></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{returnOutline.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next}/></article>;
}
