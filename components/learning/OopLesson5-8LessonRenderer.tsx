import { CodeSnippet, Tile } from "@carbon/react";
import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import { AssignmentCard, IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, LessonContentCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { AgritechSyntaxComparator, DunderNameExplainer, MagicMethodExplorer, MagicMethodReference, OopDebugChallenges5_8, OopEngineerThinkingCard5_8 } from "@/components/learning/OopLesson5-8LearningBlocks";
import type { LessonDocument, OopMagicMethodsDevelopmentPack } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"], ["object-problem", "Smart Farm problem"], ["dunder-definition", "Magic and dunder methods"],
  ["automatic-invocation", "Automatic invocation"], ["method-init", "__init__()"], ["method-str", "__str__()"],
  ["method-len", "__len__()"], ["method-eq", "__eq__()"], ["method-lt", "__lt__()"],
  ["magic-method-explorer", "Magic Method Explorer"], ["reference-table", "Reference table"],
  ["complete-example", "Complete Sensor example"], ["agritech-connection", "Agritech connection"],
  ["industry-insight", "Industry insight"], ["playground", "Playground"], ["practice", "Practice"], ["quiz", "Quiz"],
  ["debug-challenge", "Debug challenge"], ["think-like-engineer", "Think like an engineer"], ["assignment", "Assignment"],
  ["summary", "Summary"], ["key-takeaways", "Key takeaways"], ["whats-next", "What's next"],
] as const;

function MethodLessonCard({ method }: { method: OopMagicMethodsDevelopmentPack["methods"][number] }) {
  return <section id={`method-${method.id}`} className="lesson-card oop-magic-method-card"><p className="lesson-card-kicker">Primary protocol · {method.operation}</p><h2>{method.name} — {method.title}</h2><p>{method.body}</p><CodeSnippet type="multi" feedback="Copied">{method.implementation}</CodeSnippet><div className="oop-magic-method-result"><span>Result</span><strong>{method.output}</strong></div><Tile className="oop-magic-method-rule"><strong>Rule</strong><span>{method.rule}</span></Tile></section>;
}

export function OopLesson5_8LessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "oop-lesson-5-8") return null;
  return (
    <article className="published-lesson oop-development-pack oop-lesson-5-8-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} />
      <div className="published-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <section id="object-problem" className="lesson-card oop-magic-problem"><p className="lesson-card-kicker">Smart Farm problem</p><h2>{pack.objectProblem.title}</h2><p>{pack.storyHook} {pack.objectProblem.body}</p><CodeSnippet type="multi" feedback="Copied">{pack.objectProblem.code}</CodeSnippet><div className="oop-magic-output-comparison"><Tile><span>DEFAULT OUTPUT</span><code>{pack.objectProblem.defaultOutput}</code></Tile><Tile className="is-desired"><span>DESIRED OUTPUT</span><code>{pack.objectProblem.desiredOutput}</code></Tile></div></section>

          <DunderNameExplainer definition={pack.definition} />
          <LessonContentCard id="automatic-invocation" label="Automatic invocation" section={{ title: pack.automaticInvocation.title, body: pack.automaticInvocation.body, items: pack.automaticInvocation.steps.map((step) => `${step.title}: ${step.description}`) }} tone="purple" />
          {pack.methods.map((method) => <MethodLessonCard key={method.id} method={method} />)}
          <MagicMethodExplorer methods={pack.methods} />
          <MagicMethodReference primary={pack.methods} reference={pack.referenceMethods} />

          <section id="complete-example" className="lesson-card oop-magic-complete"><p className="lesson-card-kicker">Complete Smart Farm example</p><h2>{pack.completeExample.title}</h2><p>{pack.completeExample.body}</p><CodeSnippet type="multi" feedback="Copied">{pack.completeExample.code}</CodeSnippet><div className="oop-magic-console"><span>Output</span><pre>{pack.completeExample.output}</pre></div></section>
          <AgritechSyntaxComparator rows={pack.agritechComparison} />
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <CodePlayground id="playground" content={lesson.playground} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <OopDebugChallenges5_8 challenges={pack.debugChallenges} />
          <OopEngineerThinkingCard5_8 prompt={pack.engineerThinkingPrompt} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>
        <aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{outline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside>
      </div>
      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
