import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { FunctionDebugChallenges } from "@/components/learning/FunctionDefinitionLearningBlocks";
import {
  ArgumentParameterMapper,
  FunctionEvolutionPanel,
  FunctionInputSimulator,
  HardcodedFunctionProblem,
  MultiParameterExplorer,
  ParameterComparison,
  ParameterConceptCard,
  ParameterFlowVisualizer,
  ParameterMiniProject,
  ParameterPlaygroundSupplement,
  ParameterizedFunctionCard,
  ParameterStory,
} from "@/components/learning/FunctionParameterLearningBlocks";
import { CodeExampleCard, CommonMistakesCard } from "@/components/learning/FirstProgramLessonBlocks";
import { LessonHero } from "@/components/learning/LessonHero";
import { AssignmentCard, IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const parameterOutline = [["function-evolution","Function evolution"],["objectives","Objectives"],["story","Story"],["hardcoded-problem","Hardcoded values"],["parameter-concept","Parameter concept"],["first-parameter","First parameter"],["parameter-flow","Parameter flow"],["argument-mapper","Argument mapper"],["input-simulator","Input simulator"],["multi-parameter","Multiple parameters"],["agritech-examples","Agritech examples"],["playground","Playground"],["common-mistakes","Common mistakes"],["debug-challenges","Debug challenges"],["engineer-scenario","Engineer thinking"],["practice","Practice"],["mini-project","Mini project"],["compare-choose","Compare & choose"],["quiz","Quiz"],["assignment","Assignment"],["summary","Summary"],["whats-next","What's next"]] as const;

function validateParameterLessonScope(code: string) {
  if (/\breturn\b/.test(code)) return "Return values begin in Lesson 3.4. Display values with print() for now.";
  if (/\blambda\b/.test(code)) return "Lambda functions are introduced later in Module 3.";
  if (/^\s*def\s+\w+\([^)]*=.+\)\s*:/m.test(code)) return "Default parameters begin in Lesson 3.6. Use required parameters only.";
  if (/^(?!\s*def\b)\s*\w+\([^\n)]*\w+\s*=/m.test(code)) return "Keyword arguments begin in Lesson 3.5. Supply arguments by position in this lesson.";
  return null;
}

export function FunctionParametersLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack; if (!pack || pack.kind !== "function-parameters") return null;
  return <article className="published-lesson function-parameters-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson}/><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite}/><div className="published-lesson-layout function-parameters-lesson-layout"><div className="published-lesson-flow"><FunctionEvolutionPanel content={pack.evolution}/><LearningObjectivesCard id="objectives" objectives={lesson.objectives}/><ParameterStory content={pack.story}/><HardcodedFunctionProblem content={pack.hardcoded}/><ParameterConceptCard content={pack.definition}/><ParameterizedFunctionCard content={pack.firstParameter}/><ParameterFlowVisualizer content={pack.parameterFlow}/><ArgumentParameterMapper content={pack.mapper}/><FunctionInputSimulator content={pack.simulator}/><MultiParameterExplorer content={pack.explorer}/><section id="agritech-examples" className="function-agritech-examples" aria-label="Agritech parameter examples">{pack.agritechExamples.map((example,index)=><CodeExampleCard key={example.title} id={`parameter-agritech-${index+1}`} label="Agritech parameter example" example={example}/>)}</section><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation}/><CodePlayground id="playground" content={lesson.playground} className="function-parameters-playground" traceExecution validateCode={validateParameterLessonScope} renderSupplement={(_,execution)=><ParameterPlaygroundSupplement execution={execution}/>}/><CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes}/><FunctionDebugChallenges challenges={pack.debugChallenges}/><EngineerScenario content={pack.engineerScenario}/><PracticeCard id="practice" tasks={lesson.practice}/><ParameterMiniProject content={pack.miniProject}/><ParameterComparison content={pack.comparison}/><QuizCard id="quiz" quiz={lesson.quiz}/><AssignmentCard id="assignment" assignment={lesson.assignment}/><SummaryCard id="summary" section={lesson.summarySection}/><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways}/><WhatsNextCard id="whats-next" section={lesson.whatsNext}/></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{parameterOutline.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next}/></article>;
}
