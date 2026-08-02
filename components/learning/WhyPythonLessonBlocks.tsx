import { Button, Slider, Tag, Tile } from "@carbon/react";
import {
  AgricultureAnalytics,
  ChartRelationship,
  CheckmarkOutline,
  Code,
  DataVis_1,
  Earth,
  Idea,
  IotPlatform,
  Location,
} from "@carbon/icons-react";
import { useState } from "react";
import { WorkflowAnimation } from "@/components/learning/WorkflowAnimation";
import { LessonVisualIconView } from "@/components/learning/WelcomeLessonBlocks";
import type { WhyPythonDevelopmentPack, WorkflowStep } from "@/types/content";

export function SmartFarmStory({
  story,
  workflow,
}: {
  story: WhyPythonDevelopmentPack["story"];
  workflow: { title: string; description: string; steps: WorkflowStep[] };
}) {
  return (
    <>
      <section id="smart-farm-story" className="lesson-card why-python-story" aria-labelledby="smart-farm-story-title">
        <p className="lesson-section-label"><IotPlatform size={16} /> Smart farm story</p>
        <h2 id="smart-farm-story-title">{story.title}</h2>
        <p>{story.body}</p>
        <div className="smart-farm-signals">
          {story.signals.map((signal, index) => (
            <Tile key={signal}><span>{String(index + 1).padStart(2, "0")}</span><strong>{signal}</strong></Tile>
          ))}
        </div>
        <div className="smart-farm-answer">
          <Idea size={24} />
          <div><h3>{story.question}</h3><p>{story.answer}</p></div>
        </div>
      </section>
      <WorkflowAnimation id="smart-farm-workflow" title={workflow.title} description={workflow.description} steps={workflow.steps} />
    </>
  );
}

export function PythonDefinition({ definition }: { definition: WhyPythonDevelopmentPack["definition"] }) {
  return (
    <>
      <section id="python-definition" className="lesson-card python-definition-card" aria-labelledby="python-definition-title">
        <p className="lesson-section-label"><Code size={16} /> Core concept</p>
        <h2 id="python-definition-title">{definition.title}</h2>
        <p className="python-definition-lead">{definition.body}</p>
        {definition.items && <ul className="python-purpose-grid">{definition.items.map((item) => <li key={item}><CheckmarkOutline size={16} /><span>{item}</span></li>)}</ul>}
      </section>
      <WorkflowAnimation id="python-definition-workflow" title={definition.workflow.title} description={definition.workflow.description} steps={definition.workflow.steps} />
    </>
  );
}

export function AgritechEcosystemMap({ content }: { content: WhyPythonDevelopmentPack["agritech"] }) {
  const [selected, setSelected] = useState(0);
  const active = content.applications[selected];

  return (
    <section id="agritech-ecosystem" className="lesson-card ecosystem-card" aria-labelledby="agritech-ecosystem-title">
      <p className="lesson-section-label"><AgricultureAnalytics size={16} /> Agritech ecosystem</p>
      <h2 id="agritech-ecosystem-title">{content.title}</h2>
      <p>{content.description}</p>
      <div className="ecosystem-map" aria-label="Interactive map of Python applications across a farm">
        <div className="ecosystem-map-field" aria-hidden="true"><span /><span /><span /><span /></div>
        {content.applications.map((application, index) => (
          <Button
            key={application.title}
            kind="ghost"
            size="sm"
            className={`ecosystem-zone ecosystem-zone--${index + 1}${index === selected ? " is-active" : ""}`}
            onClick={() => setSelected(index)}
            aria-pressed={index === selected}
          >
            <LessonVisualIconView name={application.icon} size={20} />
            <span>{application.title}</span>
          </Button>
        ))}
      </div>
      <Tile className="ecosystem-detail" aria-live="polite">
        <LessonVisualIconView name={active.icon} />
        <div><Tag type="green" size="sm">{active.description}</Tag><h3>{active.title}</h3><p>{active.detail}</p></div>
      </Tile>
    </section>
  );
}

export function GlobalAdoptionMap({ content }: { content: WhyPythonDevelopmentPack["everywhere"] }) {
  const [selected, setSelected] = useState(0);
  const active = content.organizations[selected];

  return (
    <section id="python-everywhere" className="lesson-card global-adoption-card" aria-labelledby="python-everywhere-title">
      <p className="lesson-section-label"><Earth size={16} /> Global adoption</p>
      <h2 id="python-everywhere-title">{content.title}</h2>
      <p>{content.description}</p>
      <div className="adoption-network" role="group" aria-label="Select an organisation or field">
        <Earth className="adoption-network-globe" size={96} aria-hidden="true" />
        {content.organizations.map((organization, index) => (
          <Button
            key={organization.name}
            kind="ghost"
            size="sm"
            className={`adoption-pin adoption-pin--${index + 1}${index === selected ? " is-active" : ""}`}
            style={{ "--pin-index": index } as React.CSSProperties}
            onClick={() => setSelected(index)}
            aria-pressed={index === selected}
          >
            <Location size={16} /><span>{organization.name}</span>
          </Button>
        ))}
      </div>
      <div className="adoption-detail" aria-live="polite"><strong>{active.name}</strong><span>{active.context}</span></div>
    </section>
  );
}

function ratingLabel(value: number) {
  return `${value} out of 5`;
}

export function LanguageComparison({ content }: { content: WhyPythonDevelopmentPack["comparison"] }) {
  const [threshold, setThreshold] = useState(1);
  const languages = ["python", "c", "java"] as const;

  return (
    <section id="language-comparison" className="lesson-card language-comparison-card" aria-labelledby="language-comparison-title">
      <p className="lesson-section-label"><ChartRelationship size={16} /> Language comparison</p>
      <h2 id="language-comparison-title">{content.title}</h2>
      <p>{content.description}</p>
      <div className="comparison-control">
        <Slider
          id="language-fit-threshold"
          min={1}
          max={5}
          step={1}
          value={threshold}
          labelText="Minimum fit"
          hideTextInput
          onChange={({ value }) => setThreshold(Number(value))}
        />
        <Tag type="blue">{threshold} / 5</Tag>
      </div>
      <div className="comparison-table-wrap">
        <table>
          <caption>High-level learning and application comparison; 5 is the strongest fit.</caption>
          <thead><tr><th scope="col">Priority</th><th scope="col">Python</th><th scope="col">C</th><th scope="col">Java</th></tr></thead>
          <tbody>
            {content.rows.map((row) => (
              <tr key={row.feature}>
                <th scope="row">{row.feature}</th>
                {languages.map((language) => {
                  const rating = row[language];
                  return <td key={language} className={rating >= threshold ? "meets-threshold" : "below-threshold"}><span aria-hidden="true">{"●".repeat(rating)}{"○".repeat(5 - rating)}</span><span className="visually-hidden">{ratingLabel(rating)}</span></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="comparison-note">{content.note}</p>
    </section>
  );
}

export function EngineerScenario({ content }: { content: WhyPythonDevelopmentPack["engineerScenario"] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected === null ? null : content.options[selected];

  return (
    <section id="engineer-scenario" className="lesson-card engineer-scenario-card" aria-labelledby="engineer-scenario-title">
      <p className="lesson-section-label"><DataVis_1 size={16} /> Think like an engineer</p>
      <h2 id="engineer-scenario-title">{content.title}</h2>
      <Tile className="engineer-brief"><p>{content.scenario}</p><strong>{content.question}</strong></Tile>
      <div className="engineer-options" role="group" aria-label={content.question}>
        {content.options.map((option, index) => (
          <Button key={option.label} kind={selected === index ? "primary" : "tertiary"} onClick={() => setSelected(index)} aria-pressed={selected === index}>{option.label}</Button>
        ))}
      </div>
      <div className={`engineer-feedback${active ? " is-visible" : ""}`} aria-live="polite">
        {active ? <><Tag type={active.recommended ? "green" : "warm-gray"}>{active.recommended ? "Strong engineering choice" : "Review this choice"}</Tag><p>{active.explanation}</p></> : <p>Select an approach to inspect its engineering trade-off.</p>}
      </div>
    </section>
  );
}
