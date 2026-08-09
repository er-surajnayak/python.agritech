import { useState } from "react";
import { Button, CodeSnippet, Tag, Tile } from "@carbon/react";
import { ArrowDown, CheckmarkFilled, Idea, MagicWand } from "@carbon/icons-react";
import type { OopMagicMethodsDevelopmentPack } from "@/types/content";

type Pack = OopMagicMethodsDevelopmentPack;

export function DunderNameExplainer({ definition }: { definition: Pack["definition"] }) {
  return (
    <section id="dunder-definition" className="lesson-card oop-magic-definition">
      <div className="oop-magic-heading"><MagicWand size={24} aria-hidden="true" /><div><p className="lesson-card-kicker">Dunder = double underscore</p><h2>{definition.title}</h2></div></div>
      <p>{definition.body}</p>
      <div className="oop-magic-name-flow">
        {definition.wordParts.map((item) => <Tile key={item.part}><strong>{item.part}</strong><span>{item.meaning}</span></Tile>)}
        <Tile className="is-result"><strong>Dunder</strong><span>Special Python protocol method</span></Tile>
      </div>
      <div className="oop-magic-method-chips">{definition.examples.map((example) => <code key={example}>{example}</code>)}</div>
    </section>
  );
}

export function MagicMethodExplorer({ methods }: { methods: Pack["methods"] }) {
  const [activeId, setActiveId] = useState<Pack["methods"][number]["id"]>("str");
  const active = methods.find((method) => method.id === activeId) ?? methods[0];
  return (
    <section id="magic-method-explorer" className="lesson-card oop-magic-explorer">
      <p className="lesson-card-kicker">Interactive Magic Method Explorer</p>
      <h2>From normal Python syntax to custom object behaviour</h2>
      <p>Select an operation to trace the special method Python invokes automatically.</p>
      <div className="oop-magic-tabs" role="tablist" aria-label="Magic methods">
        {methods.map((method) => <button type="button" role="tab" aria-selected={active.id === method.id} key={method.id} className={active.id === method.id ? "is-active" : ""} onClick={() => setActiveId(method.id)}>{method.name}</button>)}
      </div>
      <div className="oop-magic-operation-flow" aria-live="polite">
        <Tile><span>PYTHON OPERATION</span><code>{active.operation}</code></Tile><ArrowDown size={22} aria-hidden="true" />
        <Tile><span>SPECIAL METHOD</span><code>{active.name}</code></Tile><ArrowDown size={22} aria-hidden="true" />
        <Tile className="is-implementation"><span>YOUR IMPLEMENTATION</span><CodeSnippet type="multi" feedback="Copied">{active.implementation}</CodeSnippet></Tile><ArrowDown size={22} aria-hidden="true" />
        <Tile className="is-output"><span>RESULT</span><strong>{active.output}</strong></Tile>
      </div>
      <Tile className="oop-magic-rule"><CheckmarkFilled size={18} aria-hidden="true" /><p><strong>Protocol rule:</strong> {active.rule}</p></Tile>
    </section>
  );
}

export function MagicMethodReference({ primary, reference }: { primary: Pack["methods"]; reference: Pack["referenceMethods"] }) {
  return (
    <section id="reference-table" className="lesson-card oop-magic-reference">
      <h2>Magic method reference</h2><p>The first five methods are this lesson's focus. The final three are a preview only.</p>
      <div className="oop-magic-reference-table" role="table" aria-label="Magic method reference">
        <div className="oop-magic-reference-row is-heading" role="row"><strong role="columnheader">Operation</strong><strong role="columnheader">Magic method</strong><strong role="columnheader">Purpose</strong><strong role="columnheader">Scope</strong></div>
        {primary.map((method) => <div className="oop-magic-reference-row" role="row" key={method.id}><code role="cell">{method.operation}</code><code role="cell">{method.name}</code><span role="cell">{method.title}</span><Tag type="green" size="sm">Primary</Tag></div>)}
        {reference.map((method) => <div className="oop-magic-reference-row is-preview" role="row" key={method.method}><code role="cell">{method.operation}</code><code role="cell">{method.method}</code><span role="cell">{method.purpose}</span><Tag type="gray" size="sm">Preview</Tag></div>)}
      </div>
    </section>
  );
}

export function AgritechSyntaxComparator({ rows }: { rows: Pack["agritechComparison"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = rows[activeIndex];
  return (
    <section id="agritech-connection" className="lesson-card oop-magic-comparator">
      <h2>Make Smart Farm code feel natural</h2><p>Choose a task and compare a separate utility function with the Python protocol syntax.</p>
      <div className="oop-magic-comparator-grid">
        <div className="oop-magic-comparator-options" role="list" aria-label="Smart Farm operations">{rows.map((row, index) => <button type="button" role="listitem" key={row.natural} className={activeIndex === index ? "is-active" : ""} onClick={() => setActiveIndex(index)}><code>{row.natural}</code><span>{row.benefit}</span></button>)}</div>
        <Tile className="oop-magic-comparison-result" aria-live="polite"><Tag type="red" size="sm">Utility-style</Tag><code>{active.utility}</code><span>becomes</span><Tag type="green" size="sm">Python-native</Tag><code>{active.natural}</code><p>{active.benefit}</p></Tile>
      </div>
    </section>
  );
}

export function OopDebugChallenges5_8({ challenges }: { challenges: Pack["debugChallenges"] }) {
  const [revealed, setRevealed] = useState<number | null>(null);
  return (
    <section id="debug-challenge" className="lesson-card oop-debug-challenges">
      <h2>Debug Challenge — Broken Python protocols</h2><p>Inspect the required return type, operands, and comparison operator for each special method.</p>
      <div className="oop-debug-list">{challenges.map((challenge, index) => <div className="oop-debug-item" key={challenge.title}><div className="oop-debug-item-header"><Tag type="red" size="sm">{challenge.mistakesToFind} issue</Tag><h3>{challenge.title}</h3></div><p>{challenge.prompt}</p><CodeSnippet type="multi" feedback="Copied">{challenge.code}</CodeSnippet>{revealed === index ? <div className="oop-debug-solution"><p className="oop-debug-solution-label">Explanation and fix</p><CodeSnippet type="multi" feedback="Copied">{challenge.solution}</CodeSnippet><Button kind="ghost" size="sm" onClick={() => setRevealed(null)}>Hide solution</Button></div> : <div className="oop-debug-guidance"><p className="oop-debug-hint">{challenge.hiddenGuidance}</p><Button kind="secondary" size="sm" onClick={() => setRevealed(index)}>Show solution</Button></div>}</div>)}</div>
    </section>
  );
}

export function OopEngineerThinkingCard5_8({ prompt }: { prompt: string }) {
  return <section id="think-like-engineer" className="lesson-card oop-engineer-thinking"><div className="oop-engineer-header"><Idea size={24} aria-hidden="true" /><h2>Think Like an Engineer — Natural syntax with clear meaning</h2></div><p className="oop-engineer-prompt">{prompt}</p><Tile className="oop-engineer-note"><p>Use a magic method when the Python operation has an obvious domain meaning. Prefer a named method when the action would be surprising or ambiguous.</p></Tile></section>;
}
