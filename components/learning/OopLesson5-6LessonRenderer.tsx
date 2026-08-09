import { CodeSnippet, Tag, Tile } from "@carbon/react";
import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { CodePlayground } from "@/components/learning/CodePlayground";
import { LessonHero } from "@/components/learning/LessonHero";
import {
  AssignmentCard,
  IndustryInsightCard,
  KeyTakeawaysCard,
  LearningObjectivesCard,
  LessonContentCard,
  PracticeCard,
  QuizCard,
  SummaryCard,
  WhatsNextCard,
} from "@/components/learning/LearningBlocks";
import {
  DuckTypingVisualizer,
  OopDebugChallenges5_6,
  OopEngineerThinkingCard5_6,
  PolymorphismComparison,
  PolymorphismIndustryGrid,
  PolymorphismVisualizer,
  SameInterfaceComparator,
} from "@/components/learning/OopLesson5-6LearningBlocks";
import type { LessonDocument } from "@/types/content";
import type { CourseLesson, CourseModule } from "@/types/course";

const outline = [
  ["objectives", "Objectives"],
  ["smart-farm-problem", "Smart Farm problem"],
  ["meaning", "What is polymorphism?"],
  ["analogy", "Same command analogy"],
  ["inheritance-polymorphism", "Inheritance polymorphism"],
  ["same-interface", "Same interface"],
  ["dispatch-visualizer", "Method dispatch visualizer"],
  ["loop-polymorphism", "Polymorphism with a loop"],
  ["duck-typing", "Duck typing"],
  ["comparison", "Inheritance vs duck typing"],
  ["agritech-example", "Agritech application"],
  ["industry-insight", "Industry insight"],
  ["industry-connections", "Industry connections"],
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

export function OopLesson5_6LessonRenderer({ lesson, courseLesson, module, previous, next }: {
  lesson: LessonDocument;
  courseLesson: CourseLesson;
  module: CourseModule;
  previous: CourseLesson | null;
  next: CourseLesson | null;
}) {
  const pack = lesson.developmentPack;
  if (!pack || pack.kind !== "oop-lesson-5-6") return null;

  return (
    <article className="published-lesson oop-development-pack oop-lesson-5-6-pack">
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

          <LessonContentCard
            id="smart-farm-problem"
            label="Smart Farm problem"
            section={{
              title: pack.smartFarmProblem.title,
              body: `${pack.storyHook} ${pack.smartFarmProblem.body}`,
              items: pack.smartFarmProblem.readings.map((item) => `${item.className}: ${item.output}`),
            }}
            tone="purple"
          />

          <LessonContentCard
            id="meaning"
            label="Concept"
            section={{ title: pack.meaning.title, body: pack.meaning.body, items: pack.meaning.items }}
            tone="blue"
          />

          <section id="analogy" className="lesson-card oop-poly-analogy">
            <p className="lesson-card-kicker">Real-life analogy</p>
            <h2>{pack.analogy.title}</h2>
            <p>{pack.analogy.body}</p>
            <div className="oop-poly-word-parts" aria-label="Meaning of the word polymorphism">
              {pack.meaning.wordParts.map((item) => (
                <Tile key={item.part}><strong>{item.part}</strong><span>{item.meaning}</span></Tile>
              ))}
              <Tile className="is-result"><strong>Polymorphism</strong><span>Many forms</span></Tile>
            </div>
            <div className="oop-poly-analogy-grid">
              {pack.analogy.devices.map((device) => (
                <Tile key={device.name}><Tag type="teal" size="sm">Start!</Tag><h3>{device.name}</h3><p>{device.response}</p></Tile>
              ))}
            </div>
          </section>

          <section id="inheritance-polymorphism" className="lesson-card oop-poly-code-section">
            <p className="lesson-card-kicker">Method overriding review</p>
            <h2>{pack.inheritanceExample.title}</h2>
            <p>{pack.inheritanceExample.body}</p>
            <CodeSnippet type="multi" feedback="Copied">{pack.inheritanceExample.code}</CodeSnippet>
            <div className="oop-poly-console"><span>Output</span><pre>{pack.inheritanceExample.output}</pre></div>
          </section>

          <SameInterfaceComparator data={pack.sameInterface} />
          <PolymorphismVisualizer dispatches={pack.dispatches} />

          <section id="loop-polymorphism" className="lesson-card oop-poly-code-section">
            <p className="lesson-card-kicker">Collection processing</p>
            <h2>{pack.loopExample.title}</h2>
            <p>{pack.loopExample.body}</p>
            <CodeSnippet type="multi" feedback="Copied">{pack.loopExample.code}</CodeSnippet>
            <div className="oop-poly-console"><span>Output</span><pre>{pack.loopExample.output}</pre></div>
          </section>

          <DuckTypingVisualizer duckTyping={pack.duckTyping} />
          <PolymorphismComparison rows={pack.comparison} />

          <LessonContentCard id="agritech-example" label="Agritech application" section={lesson.agritechExample} tone="green" />
          <IndustryInsightCard id="industry-insight" section={lesson.industryMotivation} />
          <PolymorphismIndustryGrid items={pack.industryConnections} />

          <CodePlayground id="playground" content={lesson.playground} />
          <PracticeCard id="practice" tasks={lesson.practice} />
          <QuizCard id="quiz" quiz={lesson.quiz} />
          <OopDebugChallenges5_6 challenges={pack.debugChallenges} />
          <OopEngineerThinkingCard5_6 prompt={pack.engineerThinkingPrompt} />
          <AssignmentCard id="assignment" assignment={lesson.assignment} />
          <SummaryCard id="summary" section={lesson.summarySection} />
          <KeyTakeawaysCard id="key-takeaways" items={lesson.keyTakeaways} />
          <WhatsNextCard id="whats-next" section={lesson.whatsNext} />
        </div>

        <aside className="lesson-outline published-lesson-outline" aria-label="On this page">
          <p>On this page</p>
          {outline.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </aside>
      </div>
      <PreviousNextNavigation previous={previous} next={next} />
    </article>
  );
}
