import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import { AssignmentCard, IndustryInsightCard, KeyTakeawaysCard, LearningObjectivesCard, PracticeCard, QuizCard, SummaryCard, WhatsNextCard } from "@/components/learning/LearningBlocks";
import { AgritechGroupingPreview, CollectionPreviewTimeline, DataOrganizationComparator, EngineerScaleScenario, GrowingFarmStory, ScaleSimulator, VariableExplosionSimulator, VariablePatternAnalysis, VariableProblemCards } from "@/components/learning/WhyCollectionsLearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [["objectives", "Objectives"], ["story", "Growing farm"], ["variable-problem", "Individual variables"], ["variable-explosion", "Variable explosion"], ["organization", "Data organization"], ["scale-simulator", "Scale simulator"], ["agritech-example", "Agritech example"], ["collection-preview", "Collection roadmap"], ["playground", "Playground"], ["practice", "Practice"], ["engineer", "Think like an engineer"], ["summary", "Summary"], ["whats-next", "What's next"]] as const;

function validateConceptOnlyCode(code: string) {
  if (code.includes("[") || code.includes("]") || code.includes("{") || code.includes("}") || /\b(?:for|while)\b/.test(code) || /\b(?:list|tuple|set|dict)\s*\(/.test(code) || /\.(?:append|extend|add|remove|pop|items|keys|values)\s*\(/.test(code)) return "Lesson 4.1 is concept-only. Use separate sensor variables here; collection syntax and iteration begin in later lessons.";
  return null;
}

export function WhyCollectionsLessonRenderer({ lesson, courseLesson, module, previous, next }: { lesson: LessonDocument; courseLesson: CourseLesson; module: CourseModule; previous: CourseLesson | null; next: CourseLesson | null }) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "why-collections") return null;
  return <article className="published-lesson why-collections-development-pack"><CourseBreadcrumb module={module} lesson={courseLesson} /><LessonHero eyebrow={`Module ${module.index} · Lesson ${lesson.number}`} title={lesson.title} summary={lesson.summary} icon={module.icon} level={lesson.level} durationMinutes={lesson.durationMinutes} prerequisite={pack.prerequisite} /><div className="published-lesson-layout"><div className="published-lesson-flow"><LearningObjectivesCard id="objectives" objectives={lesson.objectives} /><GrowingFarmStory content={pack.story} /><VariableProblemCards individual={pack.individualVariables} update={pack.updateProblem} maximum={pack.maximumProblem} patterns={pack.repeatedPatterns} /><VariableExplosionSimulator simulator={pack.simulator} growth={pack.growth} /><DataOrganizationComparator content={pack.comparator} analogy={pack.analogy} /><ScaleSimulator content={pack.scale} /><AgritechGroupingPreview content={pack.agritechMotivation} /><IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} /><CollectionPreviewTimeline content={pack.collectionPreview} /><CodePlayground id="playground" content={lesson.playground} validateCode={validateConceptOnlyCode} renderSupplement={(code) => <VariablePatternAnalysis code={code} />} /><PracticeCard id="practice" tasks={lesson.practice} /><EngineerScaleScenario content={pack.engineerScenario} /><QuizCard id="quiz" quiz={lesson.quiz} /><AssignmentCard id="assignment" assignment={lesson.assignment} /><SummaryCard id="summary" section={lesson.summarySection} /><KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} /><WhatsNextCard id="whats-next" section={lesson.whatsNext} /></div><aside className="lesson-outline published-lesson-outline" aria-label="On this page"><p>On this page</p>{outline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</aside></div><PreviousNextNavigation previous={previous} next={next} /></article>;
}
