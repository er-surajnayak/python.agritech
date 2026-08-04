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
  OopInstanceVsClassVarComparator,
  OopClassMethodExplorer,
  OopDebugChallenges5_3,
  OopEngineerThinkingCard5_3,
} from "@/components/learning/OopLesson5-3LearningBlocks";
import { OopObjectEvolutionPanel } from "@/components/learning/OopLesson5-1LearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"],
  ["why-behaviour", "Why objects need behaviour"],
  ["instance-methods", "Instance methods"],
  ["instance-vs-class-var", "Instance vs class variables"],
  ["class-methods", "Class methods"],
  ["complete-example", "Complete example"],
  ["agritech-example", "Agritech fleet example"],
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

export function OopLesson5_3LessonRenderer({
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
  if (!pack || pack.kind !== "oop-lesson-5-3") return null;

  return (
    <article className="published-lesson oop-development-pack oop-lesson-5-3-pack">
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

          {/* 2 · Why Objects Need Behaviour */}
          <LessonContentCard
            id="why-behaviour"
            label="Object Behaviour"
            section={{
              title: pack.whyObjectsNeedBehaviour.title,
              body: pack.whyObjectsNeedBehaviour.body,
            }}
            tone="blue"
          />

          {/* 3 · Instance Methods */}
          <LessonContentCard
            id="instance-methods"
            label="Instance Methods"
            section={{
              title: pack.instanceMethods.title,
              body: pack.instanceMethods.definition,
              items: [
                `Syntax: ${pack.instanceMethods.syntax}`,
                pack.instanceMethods.explanation,
              ],
            }}
            tone="purple"
          />

          {/* 4 · Instance Variables vs Class Variables */}
          <OopInstanceVsClassVarComparator
            comparisonTable={pack.comparisonTable}
            classVariablesContent={pack.classVariables}
          />

          {/* 5 · Class Methods */}
          <OopClassMethodExplorer classMethodsContent={pack.classMethods} />

          {/* 6 · Complete Example */}
          <LessonContentCard
            id="complete-example"
            label="Complete Farm Class"
            section={{
              title: pack.completeExample.title,
              body: pack.completeExample.body,
            }}
            tone="blue"
          />

          {/* 7 · Agritech IoT Fleet Example */}
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
          <OopDebugChallenges5_3 challenges={pack.debugChallenges} />

          {/* 14 · Think Like an Engineer */}
          <OopEngineerThinkingCard5_3 prompt={pack.engineerThinkingPrompt} />

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
