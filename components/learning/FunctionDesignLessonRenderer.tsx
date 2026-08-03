import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { CommonMistakesCard } from "@/components/learning/FirstProgramLessonBlocks";
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
  AgritechRefactoring,
  CodeQualityCard,
  DesignComparison,
  DesignPlaygroundSupplement,
  DocumentationCard,
  ExplicitDataFlowCard,
  FunctionDebugChallenges,
  FunctionDesignMiniProject,
  FunctionDesignStory,
  FunctionHealthReport,
  FunctionSizeCard,
  NamingQualityMeter,
  RefactoringWorkspace,
  SRPVisualizer,
} from "@/components/learning/FunctionDesignLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"],
  ["story", "Story"],
  ["code-quality", "Code quality"],
  ["naming", "Naming"],
  ["single-responsibility", "Single responsibility"],
  ["small-functions", "Function size"],
  ["data-flow", "Parameters & returns"],
  ["documentation", "Documentation"],
  ["health-report", "Health report"],
  ["refactoring", "Refactoring"],
  ["agritech-examples", "Agritech example"],
  ["playground", "Playground"],
  ["common-mistakes", "Common mistakes"],
  ["debug-challenges", "Debug challenge"],
  ["engineer-scenario", "Engineer thinking"],
  ["practice", "Practice"],
  ["mini-project", "Mini project"],
  ["compare-choose", "Compare & choose"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;
function validateDesignScope(code: string) {
  if (/:\s*(?:int|float|str|bool)\b|->/.test(code))
    return "Type hints are intentionally deferred.";
  if (/@\w+/.test(code)) return "Decorators are intentionally deferred.";
  if (/\b(?:pytest|unittest|design pattern|static analysis)\b/i.test(code))
    return "Testing frameworks, design patterns, and static-analysis tools are outside this lesson.";
  return null;
}
export function FunctionDesignLessonRenderer({
  lesson,
  courseLesson,
  module,
  previous,
  next,
}: {
  lesson: LessonDocument;
  courseLesson: CourseLesson;
  module: CourseModule;
  previous: CourseLesson | null;
  next: CourseLesson | null;
}) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "function-design") return null;
  return (
    <article className="published-lesson function-design-development-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <LessonHero
        eyebrow={`Module ${module.index} · Lesson ${lesson.number}`}
        title={lesson.title}
        summary={lesson.summary}
        icon={module.icon}
        level={lesson.level}
        durationMinutes={lesson.durationMinutes}
        prerequisite={pack.prerequisite}
      />
      <div className="published-lesson-layout function-design-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard
            id="objectives"
            objectives={lesson.objectives}
          />
          <FunctionDesignStory content={pack.story} />
          <CodeQualityCard content={pack.quality} />
          <NamingQualityMeter content={pack.naming} />
          <SRPVisualizer content={pack.srp} />
          <FunctionSizeCard content={pack.size} />
          <ExplicitDataFlowCard
            parameters={pack.parameters}
            returns={pack.returns}
          />
          <DocumentationCard content={pack.documentation} />
          <FunctionHealthReport
            content={pack.checklist}
            code={pack.refactoring.stages.at(-1)?.code ?? ""}
          />
          <RefactoringWorkspace content={pack.refactoring} />
          <AgritechRefactoring content={pack.agritechExamples} />
          <IndustryInsightCard
            id="industry-insight"
            section={lesson.industryMotivation}
          />
          <CodePlayground
            id="playground"
            content={lesson.playground}
            className="function-design-playground"
            traceExecution
            validateCode={validateDesignScope}
            renderSupplement={(code, execution) => (
              <DesignPlaygroundSupplement code={code} execution={execution} />
            )}
          />
          <CommonMistakesCard
            title={pack.mistakesTitle}
            mistakes={pack.mistakes}
          />
          <FunctionDebugChallenges challenges={pack.debugChallenges} />
          <EngineerScenario content={pack.engineerScenario} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <FunctionDesignMiniProject content={pack.miniProject} />
          <DesignComparison content={pack.comparison} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>
        <aside
          className="lesson-outline published-lesson-outline"
          aria-label="On this page"
        >
          <p>On this page</p>
          {outline.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </aside>
      </div>
      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
