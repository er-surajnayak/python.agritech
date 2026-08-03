import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
import { LessonHero } from "@/components/learning/LessonHero";
import { AssignmentCard, IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { AdvancedListVisualizer, BuiltInFunctionDashboard, BuiltInMethodComparison, ListManagementStoryCards, MethodPlayground, NegativeIndexExplorer, SliceExplorer, TraversalAnimator, WorkingListEngineerScenario, WorkingListStory } from "@/components/learning/WorkingWithListsLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [["objectives", "Objectives"], ["story", "Story & revision"], ["negative-indexing", "Negative indexing"], ["slicing", "Slicing"], ["updating", "Updating"], ["methods", "List methods"], ["traversal", "Traversal"], ["built-ins", "Built-ins"], ["built-in-method-comparison", "Built-in vs method"], ["playground", "Playground"], ["debug-challenge", "Debug challenge"], ["practice", "Practice"], ["engineer", "Think like an engineer"], ["summary", "Summary"], ["whats-next", "What's next"]] as const;

function validateWorkingListCode(code: string) {
  if (/\[[^\]]+\bfor\b[^\]]+\]/s.test(code)) return "List comprehensions are outside Lesson 4.3. Use an ordinary for loop for traversal.";
  if (/\[\s*\[[^\]]*\]/.test(code)) return "Nested Lists and 2D matrices are outside Lesson 4.3. Keep the data one-dimensional.";
  if (/\.sort\s*\([^)]*\bkey\s*=|\bsorted\s*\([^)]*\bkey\s*=/.test(code)) return "Advanced sorting with key begins later. Sort simple comparable values here.";
  return null;
}

function PlaygroundListPreview() {
  return <div className="working-list-playground-preview"><h3>Default execution preview</h3><AdvancedListVisualizer values={[25, 30, 28, 29, 31]} highlighted={[1, 2, 3]} /><p>Edit and run the code to inspect the authoritative Python output and line-by-line trace.</p></div>;
}

export function WorkingWithListsLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "working-with-lists") return null;
  return <article className="published-lesson working-with-lists-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><WorkingListStory story={pack.story} revision={pack.revision} /><NegativeIndexExplorer content={pack.negativeIndexing} values={pack.revision.values} /><SliceExplorer content={pack.slicing} values={pack.revision.values} /><ListManagementStoryCards updating={pack.updating} agritech={pack.agritech} /><MethodPlayground methods={pack.methods} initialValues={pack.revision.values} /><TraversalAnimator content={pack.traversal} /><BuiltInFunctionDashboard builtIns={pack.builtIns} values={pack.agritech.values} /><BuiltInMethodComparison content={pack.comparison} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><CodePlayground id="playground" content={lesson.playground} traceExecution validateCode={validateWorkingListCode} renderSupplement={() => <PlaygroundListPreview />} /><DebugChallengeCollection challenges={pack.debugChallenges} /><PracticeCard id="practice" tasks={lesson.practice} /><WorkingListEngineerScenario content={pack.engineerScenario} /><QuizCard id="quiz" quiz={lesson.quiz} /><AssignmentCard id="assignment" assignment={lesson.assignment} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{outline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
