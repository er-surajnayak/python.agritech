import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CommonMistakesCard } from "@/components/learning/FirstProgramLessonBlocks";
import { LessonHero } from "@/components/learning/LessonHero";
import {
  AssignmentCard,
  IndustryInsightCard,
  KeyTakeawaysCard,
  LearningObjectivesCard,
  QuizCard,
  SummaryCard,
  WhatsNextCard,
} from "@/components/learning/LearningBlocks";
import {
  AlgorithmViewer,
  CodeWalkthroughPanel,
  CompleteProgramCard,
  FlowchartViewer,
  ModuleCompletionCard,
  ProjectChallengeTasks,
  ProjectOverviewCard,
  ProjectPlayground,
  ProjectProgressChecklist,
  ProjectStoryCard,
  RequirementAnalysisPanel,
} from "@/components/learning/CapstoneProjectLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const capstoneOutline = [
  ["objectives", "Objectives"],
  ["project-story", "Startup assignment"],
  ["project-overview", "Project overview"],
  ["requirements-analysis", "Requirements"],
  ["algorithm-viewer", "Algorithm"],
  ["flowchart-viewer", "Flowchart"],
  ["project-progress", "Build steps"],
  ["complete-program", "Complete program"],
  ["code-walkthrough", "Code walkthrough"],
  ["playground", "Project playground"],
  ["testing-panel", "Testing"],
  ["common-mistakes", "Common mistakes"],
  ["challenge-tasks", "Challenges"],
  ["engineer-scenario", "Engineer thinking"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["module-completion", "Module completion"],
  ["whats-next", "Module 2"],
] as const;

export function CapstoneProjectLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "capstone-project") return null;

  return <article className="published-lesson capstone-project-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout capstone-project-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><ProjectStoryCard content={pack.story} /><ProjectOverviewCard content={pack.overview} /><RequirementAnalysisPanel content={pack.requirements} /><AlgorithmViewer content={pack.algorithm} /><FlowchartViewer /><ProjectProgressChecklist steps={pack.buildSteps} /><CompleteProgramCard code={pack.finalProgram} /><CodeWalkthroughPanel code={pack.finalProgram} walkthrough={pack.walkthrough} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><ProjectPlayground content={lesson.playground} fields={pack.simulatorFields} datasets={pack.testDatasets} /><CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes} /><ProjectChallengeTasks challenges={pack.challenges} /><EngineerScenario content={pack.engineerScenario} /><QuizCard id="quiz" quiz={lesson.quiz} /><AssignmentCard id="assignment" assignment={lesson.assignment} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><ModuleCompletionCard content={pack.completion} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{capstoneOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
