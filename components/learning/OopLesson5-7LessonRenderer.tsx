import { CodeSnippet, Tag, Tile } from "@carbon/react";
import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import { AssignmentCard, IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, LessonContentCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { AbstractArchitectureDiagram, AbstractClassInspector, AbstractionBoundaryVisualizer, ContractValidationVisualizer, EncapsulationAbstractionComparator, OopContinuityBridge, OopDebugChallenges5_7, OopEngineerThinkingCard5_7 } from "@/components/learning/OopLesson5-7LearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"], ["smart-farm-problem", "Smart Farm problem"], ["analogy", "Contract analogy"],
  ["continuity", "5.6 to 5.7"], ["abstraction-boundary", "What is abstraction?"],
  ["encapsulation-vs-abstraction", "Abstraction vs encapsulation"], ["abstract-class", "ABC and @abstractmethod"],
  ["instantiate-abstract", "Instantiation rule"], ["concrete-class", "Concrete child"],
  ["contract-validator", "Contract validator"], ["complete-example", "Complete sensor family"],
  ["common-functionality", "Common functionality"], ["farm-machine", "FarmMachine contract"],
  ["industry-insight", "Industry insight"], ["playground", "Playground"], ["practice", "Practice"],
  ["quiz", "Quiz"], ["debug-challenge", "Debug challenge"], ["think-like-engineer", "Think like an engineer"],
  ["assignment", "Assignment"], ["summary", "Summary"], ["key-takeaways", "Key takeaways"], ["whats-next", "What's next"],
] as const;

function CodeLessonSection({ id, kicker, title, body, code, output }: { id: string; kicker: string; title: string; body: string; code: string; output?: string }) {
  return <section id={id} className="lesson-card oop-abs-code-section"><p className="lesson-card-kicker">{kicker}</p><h2>{title}</h2><p>{body}</p><CodeSnippet type="multi" feedback="Copied">{code}</CodeSnippet>{output && <div className="oop-abs-console"><span>Output</span><pre>{output}</pre></div>}</section>;
}

export function OopLesson5_7LessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "oop-lesson-5-7") return null;
  return (
    <article className="published-lesson oop-development-pack oop-lesson-5-7-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} />
      <div className="published-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <LessonContentCard id="smart-farm-problem" label="Smart Farm problem" section={{ title: pack.smartFarmProblem.title, body: `${pack.storyHook} ${pack.smartFarmProblem.body}`, items: pack.smartFarmProblem.requirements }} tone="purple" />

          <section id="analogy" className="lesson-card oop-abs-analogy"><p className="lesson-card-kicker">Real-life contract</p><h2>{pack.analogy.title}</h2><p>{pack.analogy.body}</p><div className="oop-abs-form"><div className="oop-abs-form-header"><span>UNIVERSITY APPLICATION CONTRACT</span><strong>Required fields</strong></div>{pack.analogy.requiredFields.map((field) => <div key={field}><span aria-hidden="true">✓</span><strong>{field}</strong><small>Required</small></div>)}</div><Tile className="oop-abs-analogy-note"><strong>Sensor equivalent</strong><span>Every concrete application differs, but every one must include <code>read()</code>.</span></Tile></section>

          <OopContinuityBridge continuity={pack.continuity} />
          <AbstractionBoundaryVisualizer definition={pack.definition} />
          <EncapsulationAbstractionComparator rows={pack.encapsulationComparison} />
          <AbstractClassInspector abstractClass={pack.abstractClass} contract={pack.contract} />

          <CodeLessonSection id="instantiate-abstract" kicker="Abstract blueprint" title={pack.instantiationError.title} body={pack.instantiationError.explanation} code={pack.instantiationError.code} output={pack.instantiationError.error} />
          <CodeLessonSection id="concrete-class" kicker="Concrete implementation" title={pack.concreteClass.title} body={pack.concreteClass.body} code={pack.concreteClass.code} output={pack.concreteClass.output} />
          <ContractValidationVisualizer sensors={pack.sensors} />
          <CodeLessonSection id="complete-example" kicker="Complete Smart Farm example" title={pack.completeExample.title} body={pack.completeExample.body} code={pack.completeExample.code} output={pack.completeExample.output} />
          <AbstractArchitectureDiagram data={pack.commonFunctionality} />

          <section id="farm-machine" className="lesson-card oop-abs-machine"><p className="lesson-card-kicker">Agritech application</p><h2>{pack.machineExample.title}</h2><p>{pack.machineExample.body}</p><div className="oop-abs-machine-flow"><Tile><span>ABSTRACT BLUEPRINT</span><strong>FarmMachine</strong>{pack.machineExample.contract.map((method) => <code key={method}>{method}</code>)}</Tile><div className="oop-abs-machine-children">{pack.machineExample.implementations.map((name) => <Tile key={name}><Tag type="green" size="sm">Concrete</Tag><strong>{name}</strong></Tile>)}</div></div><CodeSnippet type="multi" feedback="Copied">{pack.machineExample.code}</CodeSnippet></section>

          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <CodePlayground id="playground" content={lesson.playground} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <OopDebugChallenges5_7 challenges={pack.debugChallenges} />
          <OopEngineerThinkingCard5_7 prompt={pack.engineerThinkingPrompt} />
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
