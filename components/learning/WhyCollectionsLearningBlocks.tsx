"use client";

import { Button, Tag } from "@carbon/react";
import { useMemo, useState } from "react";
import type { WhyCollectionsDevelopmentPack } from "@/types/content";

type Pack = WhyCollectionsDevelopmentPack;

function generatedVariables(count: number, values: number[]) {
  const visible = Math.min(count, 12);
  const lines = Array.from({ length: visible }, (_, index) => `sensor${index + 1} = ${values[index % values.length]}`);
  if (count > visible) lines.push(`… ${(count - visible).toLocaleString()} more declarations`);
  return lines.join("\n");
}

function effortLabel(count: number, tiers: Pack["growth"]["effort"]) {
  return tiers.find((tier) => count <= tier.maximum)?.label ?? tiers.at(-1)?.label ?? "Unmanageable";
}

export function GrowingFarmStory({ content }: { content: Pack["story"] }) {
  return <section id="story" className="lesson-card collections-story"><p className="lesson-section-label">Story continuation</p><h2>{content.title}</h2><p>{content.body}</p><div className="collections-scale-steps">{content.scales.map((scale, index) => <div key={scale}><strong>{scale}</strong>{index < content.scales.length - 1 && <span aria-hidden="true">→</span>}</div>)}</div><div className="collections-chip-row">{content.sensorTypes.map((sensor) => <Tag key={sensor} type="green">{sensor} sensors</Tag>)}</div></section>;
}

export function VariableProblemCards({ individual, update, maximum, patterns }: { individual: Pack["individualVariables"]; update: Pack["updateProblem"]; maximum: Pack["maximumProblem"]; patterns: Pack["repeatedPatterns"] }) {
  return <section id="variable-problem" className="collections-problem-grid">
    {[individual, update, maximum].map((item) => <article className="lesson-card" key={item.title}><p className="lesson-section-label">Scaling problem</p><h2>{item.title}</h2><p>{item.body}</p><pre><code>{item.code}</code></pre><strong className="collections-question">{"question" in item ? item.question : item.impact.join(" · ")}</strong></article>)}
    <article className="lesson-card collections-pattern-card"><p className="lesson-section-label">Repeated pattern</p><h2>{patterns.title}</h2><p>{patterns.body}</p><div className="collections-variable-stack">{patterns.variables.map((variable) => <code key={variable}>{variable}</code>)}</div><p className="collections-insight">{patterns.insight}</p></article>
  </section>;
}

export function VariableExplosionSimulator({ simulator, growth }: { simulator: Pack["simulator"]; growth: Pack["growth"] }) {
  const [count, setCount] = useState(simulator.presets[0]);
  const code = useMemo(() => generatedVariables(count, simulator.baseValues), [count, simulator.baseValues]);
  const width = Math.max(2, Math.min(100, (Math.log10(count + 1) / 4) * 100));
  return <section id="variable-explosion" className="lesson-card collections-simulator"><div className="lesson-card-heading"><div><p className="lesson-section-label">Interactive simulator</p><h2>{simulator.title}</h2><p>{simulator.body}</p></div><Tag type={count >= 500 ? "red" : count >= 50 ? "magenta" : "green"}>{count.toLocaleString()} sensors</Tag></div><div className="collections-preset-row">{simulator.presets.map((preset) => <Button key={preset} size="sm" kind={count === preset ? "primary" : "tertiary"} onClick={() => setCount(preset)}>{preset.toLocaleString()}</Button>)}</div><div className="collections-simulator-grid"><pre><code>{code}</code></pre><div className="collections-growth-panel"><h3>{growth.title}</h3><p>{growth.body}</p><div className="collections-growth-track"><span style={{ width: `${width}%` }} /></div><dl><div><dt>Variable declarations</dt><dd>{count.toLocaleString()}</dd></div><div><dt>Likely update points</dt><dd>{count.toLocaleString()}</dd></div><div><dt>Approximate lines</dt><dd>{(count * 2).toLocaleString()}</dd></div><div><dt>Maintenance effort</dt><dd>{effortLabel(count, growth.effort)}</dd></div></dl></div></div></section>;
}

export function DataOrganizationComparator({ content, analogy }: { content: Pack["comparator"]; analogy: Pack["analogy"] }) {
  return <section id="organization" className="lesson-card"><p className="lesson-section-label">Organization comparator</p><h2>{content.title}</h2><p>{content.body}</p><div className="collections-compare-grid"><article><Tag type="red">Scattered</Tag><h3>{content.scatteredLabel}</h3><div className="collections-scattered">{analogy.before.map((item) => <span key={item}>{item}</span>)}</div></article><article className="collections-grouped"><Tag type="green">Organized</Tag><h3>{content.groupedLabel}</h3><div>{analogy.after.map((item) => <span key={item}>{item}</span>)}</div><small>Concept only · Python syntax begins in Lesson 4.2</small></article></div><p className="collections-analogy-copy"><strong>{analogy.title}.</strong> {analogy.body}</p></section>;
}

export function ScaleSimulator({ content }: { content: Pack["scale"] }) {
  const [count, setCount] = useState(100);
  return <section id="scale-simulator" className="lesson-card"><div className="lesson-card-heading"><div><p className="lesson-section-label">Scale simulator</p><h2>{content.title}</h2><p>{content.body}</p></div><strong className="collections-scale-value">{count.toLocaleString()}</strong></div><label className="collections-range-label" htmlFor="collections-scale">Number of sensors</label><input id="collections-scale" className="collections-range" type="range" min={content.minimum} max={content.maximum} step="1" value={count} onChange={(event) => setCount(Number(event.target.value))} /><div className="collections-scale-metrics"><div><span>Names to invent</span><strong>{count.toLocaleString()}</strong></div><div><span>Declarations</span><strong>{count.toLocaleString()}</strong></div><div><span>Update points</span><strong>{count.toLocaleString()}</strong></div><div><span>Review burden</span><strong>{count < 20 ? "Low" : count < 200 ? "Growing" : count < 2000 ? "High" : "Extreme"}</strong></div></div></section>;
}

export function CollectionPreviewTimeline({ content }: { content: Pack["collectionPreview"] }) {
  return <section id="collection-preview" className="lesson-card"><p className="lesson-section-label">Module roadmap</p><h2>{content.title}</h2><p>{content.body}</p><ol className="collections-roadmap">{content.lessons.map((lesson) => <li key={lesson.number}><span>{lesson.number}</span><strong>{lesson.title}</strong></li>)}</ol><Tag type="blue">Names only · no collection syntax yet</Tag></section>;
}

export function AgritechGroupingPreview({ content }: { content: Pack["agritechMotivation"] }) {
  return <section id="agritech-example" className="lesson-card"><p className="lesson-section-label">Agritech example</p><h2>{content.title}</h2><p>{content.body}</p><div className="collections-reading-grid">{content.readings.map((reading) => <article key={reading.label}><span>{reading.label}</span><strong>{reading.value}%</strong></article>)}</div><div className="collections-group-placeholder"><span>One related body of moisture data</span><small>Organization preview—not Python code</small></div></section>;
}

export function EngineerScaleScenario({ content }: { content: Pack["engineerScenario"] }) {
  return <section id="engineer" className="lesson-card collections-engineer"><p className="lesson-section-label">Think like an engineer</p><h2>{content.title}</h2><p>{content.body}</p><div className="collections-chip-row">{content.examples.map((example) => <Tag key={example} type="purple">{example}</Tag>)}</div><blockquote>{content.question}</blockquote></section>;
}

export function VariablePatternAnalysis({ code }: { code: string }) {
  const declarations = code.split("\n").filter((line) => /^\s*sensor\d+\s*=/.test(line)).length;
  return <div className="collections-code-analysis"><div><span>Repeated sensor declarations</span><strong>{declarations}</strong></div><div><span>Pattern detected</span><strong>{declarations >= 2 ? "sensor + number" : "Keep exploring"}</strong></div><div><span>Design signal</span><strong>{declarations >= 5 ? "Related data should be grouped" : "Add more readings"}</strong></div></div>;
}
