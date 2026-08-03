import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import {
  CodeExampleCard,
  CommonMistakesCard,
} from "@/components/learning/FirstProgramLessonBlocks";
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
  BaseCaseCard,
  BaseCaseDetector,
  CallStackAnimator,
  FactorialExplorer,
  FunctionDebugChallenges,
  LoopRecursionComparator,
  ProblemDecomposition,
  RecursionConcept,
  RecursionMiniProject,
  RecursionStory,
  RecursionTreeExplorer,
  RecursiveCaseCard,
  RecursivePlaygroundSupplement,
} from "@/components/learning/RecursionLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"],
  ["story", "Story"],
  ["recursion-concept", "What is recursion?"],
  ["smaller-problems", "Smaller problems"],
  ["base-case", "Base case"],
  ["recursive-case", "Recursive case"],
  ["countdown", "Countdown"],
  ["recursion-tree", "Recursion tree"],
  ["call-stack", "Call stack"],
  ["base-case-detector", "Base case detector"],
  ["agritech-examples", "Agritech example"],
  ["factorial", "Factorial"],
  ["compare-choose", "Loops vs recursion"],
  ["playground", "Playground"],
  ["common-mistakes", "Common mistakes"],
  ["debug-challenges", "Debug challenges"],
  ["engineer-scenario", "Engineer thinking"],
  ["practice", "Practice"],
  ["mini-project", "Mini project"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;

function validateRecursionScope(code: string) {
  if (
    /\b(?:memoization|lru_cache|cache|dynamic programming|tail recursion|mutual recursion)\b/i.test(
      code,
    )
  )
    return "Advanced recursion techniques are intentionally deferred.";
  const definition = code.match(/def\s+(\w+)\s*\((\w+)\)\s*:\s*([\s\S]*)/);
  if (definition) {
    const [, name, parameter, body] = definition;
    const selfCall = new RegExp(`\\b${name}\\s*\\(`).test(body);
    const hasStop = /\bif\b[\s\S]*\breturn\b/.test(body);
    if (selfCall && !hasStop)
      return "Add a reachable base case before running recursive code.";
    if (new RegExp(`\\b${name}\\s*\\(\\s*${parameter}\\s*\\)`).test(body))
      return "The recursive call receives the unchanged problem and may never reach its base case.";
  }
  return null;
}

export function RecursionLessonRenderer({
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
  if (!pack || pack.kind !== "recursion") return null;
  return (
    <article className="published-lesson recursion-development-pack">
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
      <div className="published-lesson-layout recursion-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard
            id="objectives"
            objectives={lesson.objectives}
          />
          <RecursionStory content={pack.story} />
          <RecursionConcept content={pack.definition} />
          <ProblemDecomposition content={pack.decomposition} />
          <BaseCaseCard content={pack.baseCase} />
          <RecursiveCaseCard content={pack.recursiveCase} />
          <CodeExampleCard
            id="countdown"
            label="First recursive function"
            example={pack.countdown}
          />
          <RecursionTreeExplorer
            functionName={pack.countdown.functionName}
            initialValue={pack.countdown.initialValue}
            baseValue={pack.countdown.baseValue}
          />
          <CallStackAnimator content={pack.stack} />
          <BaseCaseDetector content={pack.detector} />
          <section
            id="agritech-examples"
            className="recursion-agritech-examples"
            aria-label="Agritech recursion examples"
          >
            {pack.agritechExamples.map((example, index) => (
              <CodeExampleCard
                key={example.title}
                id={`recursion-agritech-${index + 1}`}
                label="Agritech recursion example"
                example={example}
              />
            ))}
          </section>
          <FactorialExplorer content={pack.factorial} />
          <LoopRecursionComparator content={pack.comparison} />
          <IndustryInsightCard
            id="industry-insight"
            section={lesson.industryMotivation}
          />
          <CodePlayground
            id="playground"
            content={lesson.playground}
            className="recursion-playground"
            traceExecution
            validateCode={validateRecursionScope}
            renderSupplement={(_, execution) => (
              <RecursivePlaygroundSupplement execution={execution} />
            )}
          />
          <CommonMistakesCard
            title={pack.mistakesTitle}
            mistakes={pack.mistakes}
          />
          <FunctionDebugChallenges challenges={pack.debugChallenges} />
          <EngineerScenario content={pack.engineerScenario} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <RecursionMiniProject content={pack.miniProject} />
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
