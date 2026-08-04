import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
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
  DictionaryStorySection,
  DictionaryCharacteristicsSection,
  DictionaryCreationSection,
  DictionaryVisualizer,
  DictionaryAccessingSection,
  DictionaryMutationSection,
  DictionaryRemovingSection,
  DictionaryBuiltInExplorer,
  DictionaryMethodExplorer,
  DictionaryIterationPreview,
  DictionaryComparisonSection,
  RealWorldMappingSection,
  DictionaryAgritechPanel,
  DictionaryEngineerScenario,
} from "@/components/learning/DictionaryLearningBlocks";
import { CollectionDecisionTree } from "@/components/learning/CollectionDecisionTree";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Learning objectives"],
  ["story", "Story: Smart Farm Asset Management"],
  ["characteristics", "What is a Dictionary?"],
  ["creation", "Creating Dictionaries"],
  ["dictionary-visualizer", "Dictionary Visualizer"],
  ["accessing", "Accessing Values"],
  ["updating", "Updating & Adding Values"],
  ["removing", "Removing Keys"],
  ["built-ins", "Built-in Functions"],
  ["methods", "Dictionary Methods"],
  ["iteration", "Iterating (Preview)"],
  ["comparison", "Collection Type Comparison"],
  ["mapping", "Real-World Mapping"],
  ["decision-tree", "Collection Decision Tree"],
  ["agritech-example", "Agritech Example"],
  ["playground", "Playground"],
  ["debug-challenge", "Debug Challenge"],
  ["practice", "Practice"],
  ["engineer", "Think like an Engineer"],
  ["quiz", "Knowledge Check"],
  ["assignment", "Assignment"],
  ["summary", "Summary"],
  ["whats-next", "What’s next"],
] as const;

function validateDictionaryCode(code: string) {
  // Check for append()
  if (/\.append\s*\(/.test(code)) {
    return "Dictionaries do not have an append() method. To add a key-value pair, assign to it directly: dict[key] = value.";
  }
  // Check for add()
  if (/\.add\s*\(/.test(code)) {
    return "Dictionaries do not have an add() method. To add a key-value pair, assign to it directly: dict[key] = value, or use dict.update().";
  }
  // Check for index view access mistake: keys[0] or values[0]
  if (/\.keys\(\s*\)\s*\[\s*\d+\s*\]/.test(code) || /\.values\(\s*\)\s*\[\s*\d+\s*\]/.test(code)) {
    return "Dictionary keys() and values() return view objects which do not support indexing directly. Convert them to a list first: list(d.keys())[0].";
  }
  return null;
}

export function DictionaryLessonRenderer({
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
  if (!pack || pack.kind !== "dictionary") return null;

  return (
    <article className="published-lesson dictionary-development-pack">
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
          <LearningObjectivesCard id="objectives" objectives={lesson.objectives} />

          <DictionaryStorySection story={pack.story} />

          <DictionaryCharacteristicsSection whatIsDict={pack.whatIsDict} />

          <DictionaryCreationSection creation={pack.creation} />

          <DictionaryVisualizer />

          <DictionaryAccessingSection accessing={pack.accessing} />

          <DictionaryMutationSection updating={pack.updating} adding={pack.adding} />

          <DictionaryRemovingSection removing={pack.removing} />

          <DictionaryBuiltInExplorer builtIns={pack.builtIns} />

          <DictionaryMethodExplorer methods={pack.methods} />

          <DictionaryIterationPreview iteration={pack.iteration} />

          <DictionaryComparisonSection comparison={pack.comparison} />

          <RealWorldMappingSection />

          <CollectionDecisionTree />

          <DictionaryAgritechPanel agritech={pack.agritech} />

          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />

          <CodePlayground
            id="playground"
            content={lesson.playground}
            validateCode={validateDictionaryCode}
            traceExecution
          />

          <DebugChallengeCollection challenges={pack.debugChallenges} />

          <PracticeCard id="practice" tasks={lesson.practice} />

          <DictionaryEngineerScenario content={pack.engineerScenario} />

          <QuizCard id="quiz" quiz={lesson.quiz} />

          <AssignmentCard id="assignment" assignment={lesson.assignment} />

          <SummaryCard id="summary" section={lesson.summarySection} />

          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />

          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>

        <aside className="lesson-outline published-lesson-outline" aria-label="On this page">
          <p>On this page</p>
          {outline.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </aside>
      </div>

      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
