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
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import {
  FunctionDebugChallenges,
  GlobalScopeCard,
  LocalScopeCard,
  ScopeBoundaryVisualizer,
  ScopeComparison,
  ScopeConcept,
  ScopeExplorer,
  ScopeMiniProject,
  ScopePlaygroundSupplement,
  ScopeStory,
  ShadowingSimulator,
  VariableLifetimeTimeline,
} from "@/components/learning/VariableScopeLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";
const outline = [
  ["objectives", "Objectives"],
  ["story", "Story"],
  ["scope-concept", "Scope concept"],
  ["local-scope", "Local variables"],
  ["global-scope", "Global variables"],
  ["shadowing", "Shadowing"],
  ["lifetime", "Variable lifetime"],
  ["scope-boundaries", "Scope boundaries"],
  ["scope-explorer", "Scope explorer"],
  ["agritech-examples", "Agritech examples"],
  ["playground", "Playground"],
  ["common-mistakes", "Common mistakes"],
  ["debug-challenges", "Debug challenges"],
  ["engineer-scenario", "Engineer thinking"],
  ["practice", "Practice"],
  ["mini-project", "Mini project"],
  ["compare-choose", "Compare & choose"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;
function validateScopeLesson(code: string) {
  if (/\bglobal\b/.test(code))
    return "The global keyword is intentionally deferred. Prefer parameters and return values.";
  if (/\bnonlocal\b/.test(code))
    return "The nonlocal keyword belongs to advanced scope and closure topics.";
  if (/@\w+|\bdecorator\b/.test(code))
    return "Decorators are outside this lesson.";
  if (/\bclosure\b/.test(code))
    return "Closures are outside this introductory scope lesson.";
  return null;
}
export function VariableScopeLessonRenderer({
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
  if (!pack || pack.kind !== "variable-scope") return null;
  return (
    <article className="published-lesson variable-scope-development-pack">
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
      <div className="published-lesson-layout variable-scope-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard
            id="objectives"
            objectives={lesson.objectives}
          />
          <ScopeStory content={pack.story} />
          <ScopeConcept content={pack.definition} />
          <LocalScopeCard content={pack.local} />
          <GlobalScopeCard content={pack.global} />
          <ShadowingSimulator content={pack.shadowing} />
          <VariableLifetimeTimeline content={pack.lifetime} />
          <ScopeBoundaryVisualizer content={pack.boundaries} />
          <ScopeExplorer content={pack.explorer} />
          <section
            id="agritech-examples"
            className="scope-agritech-examples"
            aria-label="Agritech scope examples"
          >
            {pack.agritechExamples.map((example, index) => (
              <CodeExampleCard
                key={example.title}
                id={`scope-agritech-${index + 1}`}
                label="Agritech scope example"
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
            className="variable-scope-playground"
            traceExecution
            validateCode={validateScopeLesson}
            renderSupplement={(_, execution) => (
              <ScopePlaygroundSupplement execution={execution} />
            )}
          />
          <CommonMistakesCard
            title={pack.mistakesTitle}
            mistakes={pack.mistakes}
          />
          <FunctionDebugChallenges challenges={pack.debugChallenges} />
          <EngineerScenario content={pack.engineerScenario} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <ScopeMiniProject content={pack.miniProject} />
          <ScopeComparison content={pack.comparison} />
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
