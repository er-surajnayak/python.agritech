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
  DefToLambdaConverter,
  FunctionDebugChallenges,
  FunctionStyleComparator,
  LambdaBuilder,
  LambdaExecutionSection,
  LambdaMiniProject,
  LambdaPlaygroundSupplement,
  LambdaStory,
  LambdaSyntaxExplorer,
  WhyLambdaCard,
} from "@/components/learning/LambdaFunctionLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"],
  ["story", "Story"],
  ["why-lambda", "Why lambda?"],
  ["lambda-syntax", "Lambda syntax"],
  ["style-comparator", "def vs lambda"],
  ["lambda-execution", "Execution"],
  ["lambda-builder", "Lambda builder"],
  ["def-lambda-converter", "Converter"],
  ["agritech-examples", "Agritech examples"],
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

function validateLambdaScope(code: string) {
  if (/\b(?:map|filter|reduce)\s*\(/.test(code))
    return "map(), filter(), and reduce() are intentionally deferred to the functional-programming module.";
  if (/sorted\s*\([^)]*\bkey\s*=/.test(code))
    return "Sorting with key functions is intentionally deferred.";
  if (/\b(?:closure|decorator|yield|recursion)\b/.test(code))
    return "Closures, decorators, generators, and recursion are outside this lesson.";
  return null;
}

export function LambdaFunctionsLessonRenderer({
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
  if (!pack || pack.kind !== "lambda-functions") return null;
  return (
    <article className="published-lesson lambda-functions-development-pack">
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
      <div className="published-lesson-layout lambda-functions-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard
            id="objectives"
            objectives={lesson.objectives}
          />
          <LambdaStory content={pack.story} />
          <WhyLambdaCard content={pack.motivation} />
          <LambdaSyntaxExplorer content={pack.syntax} />
          <FunctionStyleComparator
            content={pack.comparisonExample}
            comparison={pack.comparison}
          />
          <LambdaExecutionSection content={pack.execution} />
          <LambdaBuilder content={pack.builder} />
          <DefToLambdaConverter content={pack.converter} />
          <section
            id="agritech-examples"
            className="lambda-agritech-examples"
            aria-label="Agritech lambda examples"
          >
            {pack.agritechExamples.map((example, index) => (
              <CodeExampleCard
                key={example.title}
                id={`lambda-agritech-${index + 1}`}
                label="Agritech lambda example"
                example={example}
              />
            ))}
          </section>
          <IndustryInsightCard
            id="industry-insight"
            section={lesson.industryMotivation}
          />
          <CodePlayground
            id="playground"
            content={lesson.playground}
            className="lambda-functions-playground"
            traceExecution
            validateCode={validateLambdaScope}
            renderSupplement={(_, execution) => (
              <LambdaPlaygroundSupplement execution={execution} />
            )}
          />
          <CommonMistakesCard
            title={pack.mistakesTitle}
            mistakes={pack.mistakes}
          />
          <FunctionDebugChallenges challenges={pack.debugChallenges} />
          <EngineerScenario content={pack.engineerScenario} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <LambdaMiniProject content={pack.miniProject} />
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
