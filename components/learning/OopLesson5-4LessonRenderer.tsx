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
  OopAccessModifierInspector,
  OopEncapsulationInspector,
  OopDebugChallenges5_4,
  OopEngineerThinkingCard5_4,
} from "@/components/learning/OopLesson5-4LearningBlocks";
import { OopObjectEvolutionPanel } from "@/components/learning/OopLesson5-1LearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"],
  ["security-problem", "The security problem"],
  ["what-is-encapsulation", "What is encapsulation?"],
  ["access-modifiers", "Public, protected & private"],
  ["getters-setters", "Getters & setters with validation"],
  ["complete-example", "Complete encapsulated sensor"],
  ["agritech-example", "IrrigationController safeguards"],
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

export function OopLesson5_4LessonRenderer({
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
  if (!pack || pack.kind !== "oop-lesson-5-4") return null;

  return (
    <article className="published-lesson oop-development-pack oop-lesson-5-4-pack">
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

          {/* 2 · The Security Problem */}
          <LessonContentCard
            id="security-problem"
            label="Security Risk"
            section={{
              title: pack.securityProblem.title,
              body: pack.securityProblem.body,
              items: pack.securityProblem.consequences,
            }}
            tone="purple"
          />

          {/* 3 · What is Encapsulation? */}
          <LessonContentCard
            id="what-is-encapsulation"
            label="Encapsulation"
            section={{
              title: pack.whatIsEncapsulation.title,
              body: pack.whatIsEncapsulation.definition,
              items: [
                `📱 ${pack.whatIsEncapsulation.phoneAnalogy.title}: ${pack.whatIsEncapsulation.phoneAnalogy.body}`,
              ],
            }}
            tone="blue"
          />

          {/* 4 · Public, Protected & Private Access Modifiers */}
          <OopAccessModifierInspector
            accessModifiers={pack.accessModifiers}
            pythonPhilosophyNote={pack.pythonPhilosophyNote}
          />

          {/* 5 · Getters & Setters */}
          <OopEncapsulationInspector
            gettersAndSetters={pack.gettersAndSetters}
          />

          {/* 6 · Complete Encapsulated Sensor Example */}
          <LessonContentCard
            id="complete-example"
            label="Encapsulated Sensor"
            section={{
              title: pack.completeExample.title,
              body: pack.completeExample.body,
            }}
            tone="blue"
          />

          {/* 7 · Agritech IrrigationController Safeguards */}
          <LessonContentCard
            id="agritech-example"
            label="Agritech Safeguards"
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
          <OopDebugChallenges5_4 challenges={pack.debugChallenges} />

          {/* 14 · Think Like an Engineer */}
          <OopEngineerThinkingCard5_4 prompt={pack.engineerThinkingPrompt} />

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
