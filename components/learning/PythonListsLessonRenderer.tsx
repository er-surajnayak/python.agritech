import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { DebugChallengeCollection } from "@/components/learning/ProblemSolvingLearningBlocks";
import { LessonHero } from "@/components/learning/LessonHero";
import { AssignmentCard, IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { BuiltInFunctionExplorer, CollectionComparisonPanel, ListAnatomyExplorer, ListDefinitionPanel, ListEngineerScenario, ListPlaygroundSupplement, ListStoryComparator, MutabilitySimulator } from "@/components/learning/PythonListsLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [["objectives", "Objectives"], ["story", "Smart Farm story"], ["definition", "What is a List?"], ["creating-lists", "Creating Lists"], ["list-anatomy", "Anatomy & indexing"], ["mutability", "Mutability"], ["comparison", "List vs variables"], ["built-ins", "Built-in functions"], ["playground", "Playground"], ["debug-challenge", "Debug challenge"], ["practice", "Practice"], ["engineer", "Think like an engineer"], ["summary", "Summary"], ["whats-next", "What's next"]] as const;

function validateListFundamentals(code: string) {
  if (/\[\s*-\d+\s*\]/.test(code)) return "Negative indexing begins in Lesson 4.3. Use zero or a positive index here.";
  if (/\[[^\]]*:[^\]]*\]/.test(code)) return "Slicing begins in Lesson 4.3. Access one positive index in this lesson.";
  if (/\.(?:append|extend|insert|remove|pop|clear|sort|reverse|copy|count|index)\s*\(/.test(code)) return "List methods are preview-only in Lesson 4.2 and will be taught in later lessons.";
  if (/\b(?:for|while)\b/.test(code)) return "Loops over Lists are outside Lesson 4.2. Work directly with creation, indexing, replacement, len(), max(), and min().";
  if (/\b(?:sum|sorted|reversed|enumerate|zip|any|all)\s*\(/.test(code)) return "This built-in is preview-only. Use len(), max(), or min() in Lesson 4.2.";
  return null;
}

export function PythonListsLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "python-lists") return null;
  return <article className="published-lesson python-lists-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><ListStoryComparator content={pack.story} /><ListDefinitionPanel definition={pack.definition} creation={pack.creation} /><ListAnatomyExplorer anatomy={pack.anatomy} indexing={pack.indexing} /><MutabilitySimulator content={pack.mutability} /><CollectionComparisonPanel content={pack.comparison} /><BuiltInFunctionExplorer content={pack.builtIns} values={pack.agritech.values} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><CodePlayground id="playground" content={lesson.playground} traceExecution validateCode={validateListFundamentals} renderSupplement={(code) => <ListPlaygroundSupplement code={code} />} /><DebugChallengeCollection challenges={pack.debugChallenges} /><PracticeCard id="practice" tasks={lesson.practice} /><ListEngineerScenario content={pack.engineerScenario} /><QuizCard id="quiz" quiz={lesson.quiz} /><AssignmentCard id="assignment" assignment={lesson.assignment} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{outline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
