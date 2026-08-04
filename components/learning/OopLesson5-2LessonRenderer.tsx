import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import {
  IndustryInsightCard,
  KeyTakeawaysCard,
  LearningObjectivesCard,
  PracticeCard,
  QuizCard,
  SummaryCard,
  WhatsNextCard,
  AssignmentCard,
  LessonContentCard,
} from "@/components/learning/LearningBlocks";
import {
  OopConstructorFlowVisualizer,
  OopSelfExplorer,
  OopInstanceVariableInspector,
  OopDebugChallenges5_2,
  OopEngineerThinkingCard5_2,
} from "@/components/learning/OopLesson5-2LearningBlocks";
import { OopObjectEvolutionPanel } from "@/components/learning/OopLesson5-1LearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"],
  ["empty-object-problem", "The empty object problem"],
  ["init-concept", "Understanding __init__()"],
  ["self-explorer", "Understanding self"],
  ["constructor-flow", "Constructor execution flow"],
  ["instance-variables", "Instance variables & memory"],
  ["agritech-example", "Agritech example"],
  ["object-evolution", "Object evolution"],
  ["industry-insight", "Industry insight"],
  ["playground", "Playground"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["debug-challenge", "Debug challenge"],
  ["think-like-engineer", "Think like an engineer"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["key-takeaways", "Key takeaways"],
  ["whats-next", "What's next"],
] as const;

export function OopLesson5_2LessonRenderer({
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
  if (!pack || pack.kind !== "oop-lesson-5-2") return null;

  return (
    <article className="published-lesson oop-development-pack oop-lesson-5-2-pack">
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

      <div className="published-lesson-layout">
        <div className="published-lesson-flow">
          {/* 1 · Learning Objectives */}
          <LearningObjectivesCard
            id="objectives"
            objectives={lesson.objectives}
          />

          {/* 2 · Empty Object Problem */}
          <LessonContentCard
            id="empty-object-problem"
            label="The Problem"
            section={{
              title: pack.problemSection.title,
              body: pack.problemSection.body,
              items: [pack.problemSection.painPoint],
            }}
            tone="purple"
          />

          {/* 3 · Understanding __init__() */}
          <LessonContentCard
            id="init-concept"
            label="Constructors"
            section={{
              title: pack.initConcept.title,
              body: pack.initConcept.definition,
              items: pack.initConcept.rules,
            }}
            tone="blue"
          />

          {/* 4 · Understanding self */}
          <OopSelfExplorer selfConcept={pack.selfConcept} />

          {/* 5 · Constructor Flow Visualizer */}
          <OopConstructorFlowVisualizer steps={pack.constructorFlowSteps} />

          {/* 6 · Instance Variables & Memory */}
          <OopInstanceVariableInspector
            instanceVariables={pack.instanceVariables}
            memoryVisualization={pack.memoryVisualization}
          />

          {/* 7 · Agritech Sensor Example */}
          <LessonContentCard
            id="agritech-example"
            label="Agritech Example"
            section={{
              title: pack.agritechExample.title,
              body: pack.agritechExample.body,
              items: [pack.agritechExample.discussion],
            }}
            tone="green"
          />

          {/* 8 · Object Evolution Panel */}
          <OopObjectEvolutionPanel evolutionState={pack.objectEvolutionState} />

          {/* 9 · Industry Insight */}
          <IndustryInsightCard
            id="industry-insight"
            section={lesson.industryMotivation}
          />

          {/* 10 · Interactive Playground */}
          <CodePlayground id="playground" content={lesson.playground} />

          {/* 11 · Guided Practice */}
          <PracticeCard id="practice" tasks={lesson.practice} />

          {/* 12 · Quiz */}
          <QuizCard id="quiz" quiz={lesson.quiz} />

          {/* 13 · Debug Challenge */}
          <OopDebugChallenges5_2 challenges={pack.debugChallenges} />

          {/* 14 · Think Like an Engineer */}
          <OopEngineerThinkingCard5_2 prompt={pack.engineerThinkingPrompt} />

          {/* 15 · Assignment */}
          <AssignmentCard id="assignment" assignment={lesson.assignment} />

          {/* 16 · Summary */}
          <SummaryCard id="summary" section={lesson.summarySection} />

          {/* Key Takeaways */}
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />

          {/* What's Next */}
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
