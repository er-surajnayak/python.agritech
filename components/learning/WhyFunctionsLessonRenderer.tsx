import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
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
  AgritechFunctionConcept,
  BeforeAfterComparator,
  CodeDuplicationDetector,
  ConceptualFunctionPlayground,
  FunctionDefinitionCard,
  FunctionFlowVisualizer,
  ModularDesignExplorer,
  RemoteControlAnalogy,
  RepeatedCodeStory,
  ReusabilityMiniChallenge,
} from "@/components/learning/WhyFunctionsLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const whyFunctionsOutline = [
  ["objectives", "Objectives"],
  ["story", "Smart Farm story"],
  ["duplication-detector", "Repeated code"],
  ["analogy", "Real-world analogy"],
  ["function-concept", "What is a function?"],
  ["before-after", "Why functions?"],
  ["agritech-concept", "Agritech concept"],
  ["function-flow", "Function call flow"],
  ["modular-design", "Modular design"],
  ["conceptual-playground", "Interactive playground"],
  ["mini-challenge", "Mini challenge"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;

export function WhyFunctionsLessonRenderer({
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
  if (!pack || pack.kind !== "why-functions") return null;

  return (
    <article className="published-lesson why-functions-development-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} />
      <div className="published-lesson-layout why-functions-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <RepeatedCodeStory content={pack.story} />
          <CodeDuplicationDetector content={pack.duplication} />
          <RemoteControlAnalogy content={pack.analogy} />
          <FunctionDefinitionCard content={pack.definition} benefits={pack.benefits} />
          <BeforeAfterComparator content={pack.comparison} />
          <AgritechFunctionConcept content={pack.agritechConcept} />
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <FunctionFlowVisualizer content={pack.functionFlow} module={pack.modules[0]} />
          <ModularDesignExplorer modules={pack.modules} />
          <ConceptualFunctionPlayground content={pack.simulation} />
          <ReusabilityMiniChallenge content={pack.challenge} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>
        <aside className="lesson-outline published-lesson-outline" aria-label="On this page">
          <p>On this page</p>
          {whyFunctionsOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </aside>
      </div>
      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
