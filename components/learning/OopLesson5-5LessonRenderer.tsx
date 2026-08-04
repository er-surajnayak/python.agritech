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
  OopCodeSavingsCounter,
  OopInheritanceTreeVisualizer,
  OopDebugChallenges5_5,
  OopEngineerThinkingCard5_5,
} from "@/components/learning/OopLesson5-5LearningBlocks";
import { OopObjectEvolutionPanel } from "@/components/learning/OopLesson5-1LearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"],
  ["duplication-problem", "Code duplication crisis"],
  ["code-savings-counter", "Code savings counter"],
  ["parent-class", "Parent (Base) class"],
  ["child-class", "Child (Subclass) class"],
  ["super-function", "super() constructor delegation"],
  ["method-overriding", "Method overriding"],
  ["inheritance-tree", "Types of inheritance"],
  ["complete-example", "Complete sensor hierarchy"],
  ["agritech-example", "Agricultural Tractor subclass"],
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

export function OopLesson5_5LessonRenderer({
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
  if (!pack || pack.kind !== "oop-lesson-5-5") return null;

  return (
    <article className="published-lesson oop-development-pack oop-lesson-5-5-pack">
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

          {/* 2 · The Code Duplication Problem */}
          <LessonContentCard
            id="duplication-problem"
            label="Duplication Problem"
            section={{
              title: pack.duplicationProblem.title,
              body: pack.duplicationProblem.body,
              items: pack.duplicationProblem.painPoints,
            }}
            tone="purple"
          />

          {/* 3 · Code Savings Counter */}
          <OopCodeSavingsCounter
            codeSavingsCounter={pack.codeSavingsCounter}
          />

          {/* 4 · Parent Class */}
          <LessonContentCard
            id="parent-class"
            label="Parent Class"
            section={{
              title: pack.parentClass.title,
              body: pack.parentClass.definition,
            }}
            tone="blue"
          />

          {/* 5 · Child Class */}
          <LessonContentCard
            id="child-class"
            label="Child Class"
            section={{
              title: pack.childClass.title,
              body: pack.childClass.definition,
              items: [`Syntax: ${pack.childClass.syntax}`],
            }}
            tone="blue"
          />

          {/* 6 · super() Function */}
          <LessonContentCard
            id="super-function"
            label="super() Function"
            section={{
              title: pack.superFunction.title,
              body: pack.superFunction.definition,
              items: [pack.superFunction.explanation],
            }}
            tone="purple"
          />

          {/* 7 · Method Overriding */}
          <LessonContentCard
            id="method-overriding"
            label="Method Overriding"
            section={{
              title: pack.methodOverriding.title,
              body: pack.methodOverriding.definition,
            }}
            tone="blue"
          />

          {/* 8 · Types of Inheritance */}
          <OopInheritanceTreeVisualizer
            typesOfInheritance={pack.typesOfInheritance}
          />

          {/* 9 · Complete Sensor Hierarchy Example */}
          <LessonContentCard
            id="complete-example"
            label="Complete Example"
            section={{
              title: pack.completeExample.title,
              body: pack.completeExample.body,
            }}
            tone="blue"
          />

          {/* 10 · Agritech Tractor Machine Example */}
          <LessonContentCard
            id="agritech-example"
            label="Agritech Hierarchy"
            section={{
              title: pack.agritechExample.title,
              body: pack.agritechExample.body,
              items: [pack.agritechExample.discussion],
            }}
            tone="green"
          />

          {/* 11 · Object Evolution Panel */}
          <OopObjectEvolutionPanel evolutionState={pack.objectEvolutionState} />

          {/* 12 · Industry Insight */}
          <IndustryInsightCard
            id="industry-insight"
            section={lesson.industryMotivation}
          />

          {/* 13 · Interactive Playground */}
          <CodePlayground id="playground" content={lesson.playground} />

          {/* 14 · Guided Practice */}
          <PracticeCard id="practice" tasks={lesson.practice} />

          {/* 15 · Quiz */}
          <QuizCard id="quiz" quiz={lesson.quiz} />

          {/* 16 · Debug Challenge */}
          <OopDebugChallenges5_5 challenges={pack.debugChallenges} />

          {/* Think Like an Engineer */}
          <OopEngineerThinkingCard5_5 prompt={pack.engineerThinkingPrompt} />

          {/* Assignment */}
          <AssignmentCard id="assignment" assignment={lesson.assignment} />

          {/* Summary */}
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
