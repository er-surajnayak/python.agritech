import { Button, Tag, Tile } from "@carbon/react";
import {
  AgricultureAnalytics,
  ArrowDown,
  Book,
  Catalog,
  ChartLine,
  Code,
  CropGrowth,
  Dashboard,
  DataVis_1,
  Drone,
  Idea,
  IotPlatform,
  Locked,
  MachineLearningModel,
  Menu,
  Moon,
  Notebook,
  ProgressBarRound,
  Search,
  Sprout,
  Task,
  TaskComplete,
  Terminal,
  Tree,
  Trophy,
  UserAvatar,
  Wheat,
  type CarbonIconType,
} from "@carbon/icons-react";
import { useState } from "react";
import { Link } from "@/components/navigation/client-router";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import type {
  InteractiveFeature,
  LessonTextSection,
  LessonVisualIcon,
  WelcomeLessonDevelopmentPack,
  WorkflowStep,
} from "@/types/content";

const visualIcons: Record<LessonVisualIcon, CarbonIconType> = {
  farmer: UserAvatar,
  drone: Drone,
  python: Code,
  sensor: IotPlatform,
  dashboard: Dashboard,
  field: Wheat,
  learn: Book,
  visualize: DataVis_1,
  experiment: Code,
  practice: Task,
  challenge: Trophy,
  apply: AgricultureAnalytics,
  sidebar: Menu,
  search: Search,
  theme: Moon,
  progress: ProgressBarRound,
  playground: Terminal,
  notes: Notebook,
  assignments: TaskComplete,
  projects: AgricultureAnalytics,
  resources: Catalog,
  achievements: Trophy,
};

export function LessonVisualIconView({ name, size = 24 }: { name: LessonVisualIcon; size?: number }) {
  const Icon = visualIcons[name];
  return <Icon size={size} />;
}

export function WelcomeLessonHero({
  hero,
  durationMinutes,
  level,
}: {
  hero: WelcomeLessonDevelopmentPack["hero"];
  durationMinutes: number;
  level: string;
}) {
  return (
    <header className="welcome-lesson-hero" aria-labelledby="welcome-hero-title">
      <div className="welcome-hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="welcome-hero-title">{hero.title}</h1>
        <p>{hero.subtitle}</p>
        <div className="welcome-hero-meta">
          <Tag type="green">{level}</Tag>
          <span>{durationMinutes} minutes</span>
          <span>Prerequisite: {hero.prerequisite}</span>
        </div>
        <Button href="#why-course" renderIcon={ArrowDown}>{hero.cta}</Button>
      </div>

      <div className="welcome-hero-visual" role="img" aria-label="Farmer, drone, Python, sensors, dashboard, and crop field connected in an agritech system">
        <div className="welcome-hero-connector" aria-hidden="true" />
        {hero.visualNodes.map((node, index) => {
          const Icon = visualIcons[node.icon];
          return (
            <div key={node.label} className={`welcome-hero-node welcome-hero-node--${index + 1}`} style={{ "--node-index": index } as React.CSSProperties}>
              <Icon size={24} />
              <span>{node.label}</span>
            </div>
          );
        })}
      </div>
    </header>
  );
}

export function FarmDataStory({
  story,
  workflow,
}: {
  story: WelcomeLessonDevelopmentPack["dataStory"];
  workflow: { title: string; description: string; steps: WorkflowStep[] };
}) {
  return (
    <>
      <section id="why-course" className="lesson-card farm-data-story" aria-labelledby="why-course-title">
        <p className="lesson-section-label"><AgricultureAnalytics size={16} /> Why this course</p>
        <h2 id="why-course-title">{story.title}</h2>
        <p>{story.introduction}</p>
        <div className="farm-signal-grid">
          {story.signals.map((signal, index) => <Tile key={signal}><span>{String(index + 1).padStart(2, "0")}</span><strong>{signal}</strong></Tile>)}
        </div>
        <div className="farm-question">
          <p>{story.question}</p>
          <strong>{story.answer}</strong>
        </div>
        <div className="python-capabilities">
          <h3>{story.capabilitiesTitle}</h3>
          <ul>{story.capabilities.map((capability) => <li key={capability}><span>✓</span>{capability}</li>)}</ul>
        </div>
      </section>

      <WorkflowAnimation id="data-workflow" title={workflow.title} description={workflow.description} steps={workflow.steps} />

      <section id="industry-insight" className="lesson-card welcome-industry-card" aria-labelledby="industry-insight-title">
        <p className="lesson-section-label"><ChartLine size={16} /> Industry insight</p>
        <h2 id="industry-insight-title">{story.industryTitle}</h2>
        <div className="industry-use-grid">{story.industryUses.map((use) => <Tile key={use}>{use}</Tile>)}</div>
      </section>
    </>
  );
}

export function DidYouKnowCard({ id, section }: { id: string; section: LessonTextSection }) {
  return (
    <Tile id={id} className="did-you-know-card">
      <Idea size={24} />
      <div><p className="lesson-section-label">Did you know?</p><h2>{section.title}</h2><p>{section.body}</p></div>
    </Tile>
  );
}

export function InteractiveFeatureGrid({
  id,
  label,
  title,
  description,
  features,
}: {
  id: string;
  label: string;
  title: string;
  description: string;
  features: InteractiveFeature[];
}) {
  const [selected, setSelected] = useState(0);
  const activeFeature = features[selected];

  return (
    <section id={id} className="lesson-card interactive-feature-card" aria-labelledby={`${id}-title`}>
      <p className="lesson-section-label"><Dashboard size={16} /> {label}</p>
      <h2 id={`${id}-title`}>{title}</h2>
      <p>{description}</p>
      <div className="interactive-feature-grid">
        {features.map((feature, index) => {
          const Icon = visualIcons[feature.icon];
          return (
            <Button
              key={feature.title}
              kind="ghost"
              className={index === selected ? "is-active" : ""}
              onClick={() => setSelected(index)}
              aria-pressed={index === selected}
            >
              <Icon size={24} />
              <span><strong>{feature.title}</strong><small>{feature.description}</small></span>
            </Button>
          );
        })}
      </div>
      <div id={`${id}-detail`} className="interactive-feature-detail" aria-live="polite">
        <div><Tag size="sm" type="green">{activeFeature.title}</Tag><p>{activeFeature.detail}</p></div>
        {activeFeature.href && <a className="text-action" href={activeFeature.href}>Open this area →</a>}
      </div>
    </section>
  );
}

export function MeetDINotes({ content }: { content: WelcomeLessonDevelopmentPack["diNotes"] }) {
  return (
    <>
      <section id="meet-di-notes" className="lesson-card meet-di-notes-card" aria-labelledby="meet-di-notes-title">
        <p className="lesson-section-label"><Dashboard size={16} /> Meet DI Notes</p>
        <h2 id="meet-di-notes-title">{content.title}</h2>
        <p>{content.introduction}</p>
        <div className="di-notes-comparison">
          <Tile><h3>{content.notTitle}</h3><ul>{content.notList.map((item) => <li key={item}><span aria-hidden="true">×</span>{item}</li>)}</ul></Tile>
          <Tile><h3>{content.isTitle}</h3><ul>{content.isList.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></Tile>
        </div>
      </section>
      <InteractiveFeatureGrid id="learning-experience" label="Interactive learning" title="Choose how you want to engage" description="Select a card to see how each part supports your learning." features={content.features} />
    </>
  );
}

export function LearningTimeline({
  id,
  title,
  description,
  steps,
}: {
  id: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
}) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id={id} className="lesson-card learning-timeline-card" aria-labelledby={`${id}-title`}>
      <p className="lesson-section-label"><ProgressBarRound size={16} /> Learning methodology</p>
      <h2 id={`${id}-title`}>{title}</h2>
      <p>{description}</p>
      <ol className="learning-timeline">
        {steps.map((step, index) => (
          <li key={step.title} className={index === activeStep ? "is-active" : ""}>
            <Button kind="ghost" onClick={() => setActiveStep(index)} onMouseEnter={() => setActiveStep(index)} onFocus={() => setActiveStep(index)} aria-current={index === activeStep ? "step" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <small>{step.description}</small>
            </Button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function LearningCompanion({ content }: { content: WelcomeLessonDevelopmentPack["companion"] }) {
  const icons = [UserAvatar, Code, Dashboard, MachineLearningModel];
  return (
    <section id="learning-companion" className="lesson-card learning-companion-card" aria-labelledby="learning-companion-title">
      <div>
        <p className="lesson-section-label"><UserAvatar size={16} /> Learning companion</p>
        <h2 id="learning-companion-title">{content.title}</h2>
        {content.message.map((message) => <p key={message}>{message}</p>)}
      </div>
      <ol className="companion-stages">
        {content.stages.map((stage, index) => {
          const Icon = icons[index];
          return <li key={stage.title}><Icon size={24} /><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage.title}</strong><small>{stage.description}</small></li>;
        })}
      </ol>
    </section>
  );
}

export function CourseJourneyRoadmap({ content }: { content: WelcomeLessonDevelopmentPack["roadmap"] }) {
  const [selected, setSelected] = useState(0);
  const activeModule = content.modules[selected];

  return (
    <section id="course-journey" className="lesson-card course-journey-card" aria-labelledby="course-journey-title">
      <p className="lesson-section-label"><Catalog size={16} /> Course journey</p>
      <h2 id="course-journey-title">{content.title}</h2>
      <p>{content.description}</p>
      <ol className="course-journey-roadmap">
        {content.modules.map((module, index) => (
          <li key={module.index} className={index === selected ? "is-active" : ""}>
            <Button kind="ghost" onClick={() => setSelected(index)} aria-pressed={index === selected}>
              <span>{String(module.index).padStart(2, "0")}</span>
              <strong>{module.title}</strong>
              {module.locked ? <Locked size={16} aria-label="Locked" /> : <Tag size="sm" type="green">Current</Tag>}
            </Button>
          </li>
        ))}
      </ol>
      <div className="course-journey-detail" aria-live="polite">
        <div><span>Module {activeModule.index}</span><h3>{activeModule.title}</h3><p>{activeModule.description}</p></div>
        {activeModule.locked ? <Tag type="gray">Future module · locked</Tag> : <Link className="text-action" href="/modules#module-0">View current module →</Link>}
      </div>
    </section>
  );
}

export function MotivationGrowth({ content }: { content: WelcomeLessonDevelopmentPack["motivation"] }) {
  const icons = [Sprout, CropGrowth, Tree, Wheat];
  return (
    <section id="motivation" className="lesson-card motivation-card" aria-labelledby="motivation-title">
      <p className="lesson-section-label"><Sprout size={16} /> Motivation</p>
      <h2 id="motivation-title">{content.title}</h2>
      <blockquote>{content.quote.map((line) => <p key={line}>{line}</p>)}</blockquote>
      <ol className="growth-journey">
        {content.stages.map((stage, index) => {
          const Icon = icons[index];
          return <li key={stage.title} style={{ "--growth-index": index } as React.CSSProperties}><Icon size={28} /><strong>{stage.title}</strong><small>{stage.description}</small></li>;
        })}
      </ol>
    </section>
  );
}
