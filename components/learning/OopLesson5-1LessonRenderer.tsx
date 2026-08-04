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
} from "@/components/learning/LearningBlocks";
import {
  OopGrowingProblemTimeline,
  OopClassObjectVisualizer,
  OopMemoryBasicViewer,
  OopObjectEvolutionPanel,
  OopDebugChallenges,
  OopEngineerThinkingCard,
} from "@/components/learning/OopLesson5-1LearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"],
  ["growing-problem", "The growing problem"],
  ["class-object-visualizer", "Class vs Object"],
  ["memory-viewer", "Memory visualization"],
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

export function OopLesson5_1LessonRenderer({
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
  if (!pack || pack.kind !== "oop-lesson-5-1") return null;

  return (
    <article className="published-lesson oop-development-pack oop-lesson-5-1-pack">
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

          {/* 2 · Story + Growing Problem */}
          <OopGrowingProblemTimeline content={pack.growingProblem} />

          {/* 3 · Class vs Object Visualizer */}
          <OopClassObjectVisualizer
            classConcept={pack.classConcept}
            objectConcept={pack.objectConcept}
          />

          {/* 4 · Memory Visualization */}
          <OopMemoryBasicViewer
            memoryObjects={pack.memoryObjects}
            multipleObjectsContent={pack.multipleObjects}
          />

          {/* 5 · Object Evolution Panel */}
          <OopObjectEvolutionPanel evolutionState={pack.objectEvolutionState} />

          {/* 6 · Industry Insight */}
          <IndustryInsightCard
            id="industry-insight"
            section={lesson.industryMotivation}
          />

          {/* 7 · Interactive Playground */}
          <CodePlayground
            id="playground"
            content={lesson.playground}
          />

          {/* 8 · Guided Practice */}
          <PracticeCard id="practice" tasks={lesson.practice} />

          {/* 9 · Quiz */}
          <QuizCard id="quiz" quiz={lesson.quiz} />

          {/* 10 · Debug Challenge */}
          <OopDebugChallenges challenges={pack.debugChallenges} />

          {/* 11 · Think Like an Engineer */}
          <OopEngineerThinkingCard prompt={pack.engineerThinkingPrompt} />

          {/* 12 · Assignment */}
          <AssignmentCard id="assignment" assignment={lesson.assignment} />

          {/* 13 · Summary */}
          <SummaryCard id="summary" section={lesson.summarySection} />

          {/* 14 · Key Takeaways */}
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />

          {/* 15 · What's Next */}
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
