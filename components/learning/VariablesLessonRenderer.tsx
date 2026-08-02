import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import {
  CodeExampleCard,
  CommonMistakesCard,
  DebugChallengeCard,
} from "@/components/learning/FirstProgramLessonBlocks";
import { LessonHero } from "@/components/learning/LessonHero";
import {
  AssignmentCard,
  IndustryInsightCard,
  KeyTakeawaysCard,
  LearningObjectivesCard,
  LessonContentCard,
  PracticeCard,
  QuizCard,
  SummaryCard,
  WhatsNextCard,
} from "@/components/learning/LearningBlocks";
import {
  AssignmentOperatorCard,
  CreatingVariablesCard,
  NamingConventionsCard,
  NamingRuleValidator,
  UpdatingVariableCard,
  VariableDefinitionCard,
  VariablePlayground,
  VariableStoryCard,
  VariableSwapCard,
  WhyVariablesCard,
} from "@/components/learning/VariableLearningBlocks";
import { EngineerScenario } from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const variablesOutline = [
  ["objectives", "Objectives"],
  ["variable-story", "Farmer story"],
  ["variable-definition", "What is a variable?"],
  ["why-variables", "Why variables?"],
  ["memory-concept", "Memory"],
  ["creating-variables", "Creating variables"],
  ["assignment-operator", "Assignment"],
  ["naming-rules", "Naming rules"],
  ["naming-conventions", "Naming conventions"],
  ["printing-variable-1", "Printing variables"],
  ["dynamic-typing", "Dynamic typing"],
  ["updating-variables", "Updating"],
  ["multiple-assignment", "Multiple assignment"],
  ["variable-swapping", "Swapping"],
  ["agritech-variables", "Agritech example"],
  ["playground", "Live playground"],
  ["common-mistakes", "Common mistakes"],
  ["debug-challenge", "Debug challenge"],
  ["engineer-scenario", "Engineer scenario"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment task"],
  ["summary", "Summary"],
  ["whats-next", "What's next"],
] as const;

export function VariablesLessonRenderer({
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
  if (!pack || pack.kind !== "variables") return null;

  return (
    <article className="published-lesson variables-development-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} />
      <div className="published-lesson-layout variables-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <VariableStoryCard content={pack.story} />
          <VariableDefinitionCard content={pack.definition} />
          <WhyVariablesCard content={pack.whyVariables} />
          <LessonContentCard id="memory-concept" label="Memory concept" section={pack.memory} tone="purple" />
          <CreatingVariablesCard content={pack.creating} />
          <AssignmentOperatorCard content={pack.assignment} />
          <NamingRuleValidator content={pack.namingRules} />
          <NamingConventionsCard content={pack.namingConventions} />
          {pack.printing.map((example, index) => <CodeExampleCard key={example.title} id={`printing-variable-${index + 1}`} label="Printing variables" example={example} />)}
          <CodeExampleCard id="dynamic-typing" label="Dynamic typing" example={pack.dynamicTyping} />
          <UpdatingVariableCard content={pack.updating} />
          <CodeExampleCard id="multiple-assignment" label="Multiple assignment" example={pack.multipleAssignment} />
          <VariableSwapCard content={pack.swapping} />
          <CodeExampleCard id="agritech-variables" label="Agritech example" example={pack.agritechProgram} />
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <VariablePlayground id="playground" content={lesson.playground} activities={pack.playgroundActivities} />
          <CommonMistakesCard title={pack.mistakesTitle} mistakes={pack.mistakes} />
          <DebugChallengeCard content={pack.debugChallenge} />
          <EngineerScenario content={pack.engineerScenario} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>
        <aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{variablesOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside>
      </div>
      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
