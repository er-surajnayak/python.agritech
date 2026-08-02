import { Tag } from "@carbon/react";
import { Time } from "@carbon/icons-react";
import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { CourseIcon } from "@/components/course/CourseIcon";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
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
import { DidYouKnowCard, InteractiveFeatureGrid } from "@/components/learning/WelcomeLessonBlocks";
import {
  AgritechEcosystemMap,
  EngineerScenario,
  GlobalAdoptionMap,
  LanguageComparison,
  PythonDefinition,
  SmartFarmStory,
} from "@/components/learning/WhyPythonLessonBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const whyPythonOutline = [
  ["objectives", "Objectives"],
  ["smart-farm-story", "Smart farm story"],
  ["python-definition", "What is Python?"],
  ["did-you-know", "Did you know?"],
  ["why-python-popular", "Why Python is popular"],
  ["agritech-ecosystem", "Agritech ecosystem"],
  ["python-everywhere", "Python everywhere"],
  ["industry-insight", "Industry insight"],
  ["language-comparison", "Language comparison"],
  ["playground", "First commands"],
  ["engineer-scenario", "Engineer scenario"],
  ["practice", "Practice"],
  ["quiz", "Quiz"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["key-takeaways", "Takeaways"],
  ["whats-next", "What's next"],
] as const;

export function WhyPythonLessonRenderer({
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
  if (!pack || pack.kind !== "why-python") return null;

  return (
    <article className="published-lesson why-python-development-pack">
      <CourseBreadcrumb module={module} lesson={courseLesson} />
      <header className="course-workspace-header published-lesson-header why-python-header">
        <div className="course-workspace-module-icon"><CourseIcon name={module.icon} size={24} /></div>
        <div>
          <p className="eyebrow">Module {module.index} · Lesson {lesson.number}</p>
          <h1>{lesson.title}</h1>
          <p className="published-lesson-summary">{lesson.summary}</p>
          <div className="course-workspace-meta">
            <Tag type="green">{lesson.level}</Tag>
            <span><Time size={16} /> {lesson.durationMinutes} min</span>
            <span>Prerequisite: {pack.prerequisite}</span>
          </div>
        </div>
      </header>

      <div className="published-lesson-layout why-python-layout">
        <div className="published-lesson-flow">
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />
          <SmartFarmStory story={pack.story} workflow={lesson.workflow} />
          <PythonDefinition definition={pack.definition} />
          <DidYouKnowCard id="did-you-know" section={pack.didYouKnow} />
          <InteractiveFeatureGrid id="why-python-popular" label="Why Python is popular" title={pack.popularity.title} description={pack.popularity.description} features={pack.popularity.features} />
          <AgritechEcosystemMap content={pack.agritech} />
          <GlobalAdoptionMap content={pack.everywhere} />
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <LanguageComparison content={pack.comparison} />
          <CodePlayground id="playground" content={lesson.playground} />
          <EngineerScenario content={pack.engineerScenario} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>

        <aside className="lesson-outline published-lesson-outline" aria-label="On this page">
          <p>On this page</p>
          {whyPythonOutline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </aside>
      </div>

      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
