import { Tag } from "@carbon/react";
import { Time } from "@carbon/icons-react";
import { CodePlayground } from "@/components/learning/CodePlayground";
import {
  AgritechExampleCard,
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
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import { WelcomeLessonRenderer } from "@/components/learning/WelcomeLessonRenderer";
import { WhyPythonLessonRenderer } from "@/components/learning/WhyPythonLessonRenderer";
import { FirstProgramLessonRenderer } from "@/components/learning/FirstProgramLessonRenderer";
import { VariablesLessonRenderer } from "@/components/learning/VariablesLessonRenderer";
import { DataTypesLessonRenderer } from "@/components/learning/DataTypesLessonRenderer";
import { UserInputLessonRenderer } from "@/components/learning/UserInputLessonRenderer";
import { TypeConversionLessonRenderer } from "@/components/learning/TypeConversionLessonRenderer";
import { OperatorsLessonRenderer } from "@/components/learning/OperatorsLessonRenderer";
import { ProblemSolvingLessonRenderer } from "@/components/learning/ProblemSolvingLessonRenderer";
import { CapstoneProjectLessonRenderer } from "@/components/learning/CapstoneProjectLessonRenderer";
import { DecisionMakingLessonRenderer } from "@/components/learning/DecisionMakingLessonRenderer";
import { IfStatementLessonRenderer } from "@/components/learning/IfStatementLessonRenderer";
import { IfElseLessonRenderer } from "@/components/learning/IfElseLessonRenderer";
import { IfElifElseLessonRenderer } from "@/components/learning/IfElifElseLessonRenderer";
import { NestedIfLessonRenderer } from "@/components/learning/NestedIfLessonRenderer";
import { MatchCaseLessonRenderer } from "@/components/learning/MatchCaseLessonRenderer";
import { ForLoopLessonRenderer } from "@/components/learning/ForLoopLessonRenderer";
import { WhileLoopLessonRenderer } from "@/components/learning/WhileLoopLessonRenderer";
import { LoopControlLessonRenderer } from "@/components/learning/LoopControlLessonRenderer";
import { ControlFlowCapstoneLessonRenderer } from "@/components/learning/ControlFlowCapstoneLessonRenderer";
import { WhyFunctionsLessonRenderer } from "@/components/learning/WhyFunctionsLessonRenderer";
import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { CourseIcon } from "@/components/course/CourseIcon";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["introduction", "Introduction"],
  ["objectives", "Objectives"],
  ["why-this-matters", "Why this matters"],
  ["industry-motivation", "Industry motivation"],
  ["concept", "Concept explanation"],
  ["visual-workflow", "Visual workflow"],
  ["agritech-example", "Agritech example"],
  ["playground", "Playground"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["key-takeaways", "Key takeaways"],
  ["whats-next", "What's next"],
] as const;

export function LessonRenderer({
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
  if (lesson.developmentPack?.kind === "welcome") {
    return <WelcomeLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "why-python") {
    return <WhyPythonLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "first-program") {
    return <FirstProgramLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "variables") {
    return <VariablesLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "data-types") {
    return <DataTypesLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "user-input") {
    return <UserInputLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "type-conversion") {
    return <TypeConversionLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "operators") {
    return <OperatorsLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "problem-solving") {
    return <ProblemSolvingLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "capstone-project") {
    return <CapstoneProjectLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "decision-making") {
    return <DecisionMakingLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "if-statement") {
    return <IfStatementLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "if-else") {
    return <IfElseLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "if-elif-else") {
    return <IfElifElseLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "nested-if") {
    return <NestedIfLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "match-case") {
    return <MatchCaseLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "for-loop") {
    return <ForLoopLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "while-loop") {
    return <WhileLoopLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "loop-control") {
    return <LoopControlLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "control-flow-capstone") {
    return <ControlFlowCapstoneLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }
  if (lesson.developmentPack?.kind === "why-functions") {
    return <WhyFunctionsLessonRenderer lesson={lesson} courseLesson={courseLesson} module={module} previous={previous} next={next} />;
  }

  return (
    <article className="published-lesson">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <header className="course-workspace-header published-lesson-header">
        <div className="course-workspace-module-icon"><CourseIcon name={module.icon} size={24} /></div>
        <div>
          <p className="eyebrow">Module {module.index} · Lesson {lesson.number}</p>
          <h1>{lesson.title}</h1>
          <p className="published-lesson-summary">{lesson.summary}</p>
          <div className="course-workspace-meta">
            <Tag type="green">{lesson.level}</Tag>
            <span><Time size={16} /> {lesson.durationMinutes} min</span>
            <span>Interactive lesson</span>
          </div>
        </div>
      </header>

      <div className="published-lesson-layout">
        <div className="published-lesson-flow">
          <LessonContentCard id="introduction" label="Lesson introduction" section={lesson.introduction} />
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <LessonContentCard id="why-this-matters" label="Why this matters" section={lesson.whyThisMatters} tone="green" />
          <IndustryInsightCard id="industry-motivation" section={lesson.industryMotivation} />
          <LessonContentCard id="concept" label="Concept explanation" section={lesson.concept} tone="purple" />
          <WorkflowAnimation id="visual-workflow" title={lesson.workflow.title} description={lesson.workflow.description} steps={lesson.workflow.steps} />
          <AgritechExampleCard id="agritech-example" section={lesson.agritechExample} />
          <CodePlayground id="playground" content={lesson.playground} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>

        <aside className="lesson-outline published-lesson-outline" aria-label="On this page">
          <p>On this page</p>
          {outline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </aside>
      </div>

      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
