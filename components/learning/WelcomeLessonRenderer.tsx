import { CodePlayground } from "@/components/learning/CodePlayground";
import {
  AssignmentCard,
  KeyTakeawaysCard,
  LearningObjectivesCard,
  PracticeCard,
  QuizCard,
  SummaryCard,
  WhatsNextCard,
} from "@/components/learning/LearningBlocks";
import {
  CourseJourneyRoadmap,
  DidYouKnowCard,
  FarmDataStory,
  InteractiveFeatureGrid,
  LearningCompanion,
  LearningTimeline,
  MeetDINotes,
  MotivationGrowth,
  WelcomeLessonHero,
} from "@/components/learning/WelcomeLessonBlocks";
import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const welcomeOutline = [
  ["welcome-hero-title", "Welcome"],
  ["objectives", "Objectives"],
  ["why-course", "Why this course"],
  ["data-workflow", "Data workflow"],
  ["industry-insight", "Industry insight"],
  ["did-you-know", "Did you know?"],
  ["meet-di-notes", "Meet DI Notes"],
  ["how-you-learn", "How you will learn"],
  ["learning-companion", "Learning companion"],
  ["course-journey", "Course journey"],
  ["platform-tour", "Platform tour"],
  ["motivation", "Motivation"],
  ["summary", "Summary"],
  ["playground", "Playground"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["whats-next", "What's next"],
] as const;

export function WelcomeLessonRenderer({
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
  if (!pack || pack.kind !== "welcome") return null;

  return (
    <article className="published-lesson welcome-development-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <WelcomeLessonHero hero={pack.hero} durationMinutes={lesson.durationMinutes} level={lesson.level} />

      <div className="published-lesson-layout welcome-lesson-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <FarmDataStory story={pack.dataStory} workflow={lesson.workflow} />
          <DidYouKnowCard id="did-you-know" section={pack.didYouKnow} />
          <MeetDINotes content={pack.diNotes} />
          <LearningTimeline id="how-you-learn" title={pack.learningTimeline.title} description={pack.learningTimeline.description} steps={pack.learningTimeline.steps} />
          <LearningCompanion content={pack.companion} />
          <CourseJourneyRoadmap content={pack.roadmap} />
          <InteractiveFeatureGrid id="platform-tour" label="Platform tour" title={pack.platformTour.title} description={pack.platformTour.description} features={pack.platformTour.features} />
          <MotivationGrowth content={pack.motivation} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <CodePlayground id="playground" content={lesson.playground} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>

        <aside className="lesson-outline published-lesson-outline" aria-label="On this page">
          <p>On this page</p>
          {welcomeOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </aside>
      </div>

      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
