"use client";

import { Button, NumberInput, Tag, TextInput } from "@carbon/react";
import { useMemo, useState } from "react";
import type { PythonListsDevelopmentPack } from "@/types/content";

type Pack = PythonListsDevelopmentPack;
type ListValue = string | number | boolean;

function displayValue(value: ListValue) {
  return typeof value === "string" ? `"${value}"` : String(value);
}

function parseSimpleList(code: string): { name: string; values: ListValue[]; selectedIndex: number | null } | null {
  const assignment = code.match(/^\s*([A-Za-z_]\w*)\s*=\s*\[([^\]]*)\]/m);
  if (!assignment) return null;
  const raw = assignment[2].trim();
  const values = raw ? raw.split(",").map((item) => {
    const value = item.trim();
    if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
    if (value === "True") return true;
    if (value === "False") return false;
    return value.replace(/^['"]|['"]$/g, "");
  }) : [];
  const access = code.match(new RegExp(`${assignment[1]}\\[(\\d+)\\]`));
  return { name: assignment[1], values, selectedIndex: access ? Number(access[1]) : null };
}

export function ListStoryComparator({ content }: { content: Pack["story"] }) {
  return <section id="story" className="lesson-card"><p className="lesson-section-label">Story continuation</p><h2>{content.title}</h2><p>{content.body}</p><div className="list-story-grid"><article><Tag type="red">Before</Tag><pre><code>{content.before}</code></pre></article><span className="list-transform-arrow" aria-hidden="true">→</span><article><Tag type="green">After</Tag><pre><code>{content.after}</code></pre></article></div></section>;
}

export function ListDefinitionPanel({ definition, creation }: { definition: Pack["definition"]; creation: Pack["creation"] }) {
  return <><section id="definition" className="lesson-card"><p className="lesson-section-label">What is a List?</p><h2>{definition.title}</h2><p>{definition.body}</p><div className="list-character-grid">{definition.characteristics.map((item) => <article key={item.label}><strong>{item.label}</strong><p>{item.explanation}</p></article>)}</div></section><section id="creating-lists" className="lesson-card"><p className="lesson-section-label">Creating Lists</p><h2>{creation.title}</h2><p>{creation.body}</p><div className="list-example-grid">{creation.examples.map((example) => <article key={example.label}><Tag type="blue">{example.label}</Tag><pre><code>{example.code}</code></pre><p>{example.note}</p></article>)}</div></section></>;
}

export function ListVisualizer({ name, values, selectedIndex, onSelect }: { name: string; values: ListValue[]; selectedIndex: number | null; onSelect?: (index: number) => void }) {
  return <div className="list-visualizer" aria-label={`${name} List visualization`}><div className="list-name-chip"><span>List name</span><strong>{name}</strong></div><div className="list-element-row">{values.map((value, index) => <button type="button" key={`${index}-${String(value)}`} className={selectedIndex === index ? "is-selected" : ""} onClick={() => onSelect?.(index)} aria-pressed={selectedIndex === index}><small>index {index}</small><strong>{displayValue(value)}</strong><span>position {index + 1}</span></button>)}</div>{values.length === 0 && <p className="list-empty-state">This List contains no elements yet.</p>}</div>;
}

export function ListAnatomyExplorer({ anatomy, indexing }: { anatomy: Pack["anatomy"]; indexing: Pack["indexing"] }) {
  const [selected, setSelected] = useState(0);
  return <section id="list-anatomy" className="lesson-card"><p className="lesson-section-label">List anatomy & Index Mapper</p><h2>{anatomy.title}</h2><p>{anatomy.body}</p><ListVisualizer name={anatomy.listName} values={anatomy.values} selectedIndex={selected} onSelect={setSelected} /><div className="index-mapping-result"><code>{anatomy.listName}[{selected}]</code><span>selects</span><strong>{displayValue(anatomy.values[selected])}</strong></div><div className="list-index-examples">{indexing.examples.map((example) => <Button size="sm" kind={selected === example.index ? "primary" : "tertiary"} key={example.code} onClick={() => setSelected(example.index)}>{example.code} → {example.result}</Button>)}</div><p>{indexing.body}</p></section>;
}

export function MutabilitySimulator({ content }: { content: Pack["mutability"] }) {
  const [values, setValues] = useState<ListValue[]>(content.before);
  const [index, setIndex] = useState(content.index);
  const [replacement, setReplacement] = useState(String(content.replacement));
  const [changed, setChanged] = useState<number | null>(null);
  function replaceValue() {
    const next = [...values];
    next[index] = Number.isNaN(Number(replacement)) ? replacement : Number(replacement);
    setValues(next);
    setChanged(index);
  }
  function reset() { setValues(content.before); setIndex(content.index); setReplacement(String(content.replacement)); setChanged(null); }
  return <section id="mutability" className="lesson-card"><p className="lesson-section-label">Mutability Simulator</p><h2>{content.title}</h2><p>{content.body}</p><div className={changed !== null ? "list-change-flash" : ""}><ListVisualizer name="moisture" values={values} selectedIndex={index} onSelect={setIndex} /></div><div className="list-mutation-controls"><NumberInput id="mutable-index" label="Positive index" min={0} max={Math.max(0, values.length - 1)} value={index} onChange={(_event, state) => { setIndex(Number(state.value)); setChanged(null); }} /><TextInput id="mutable-value" labelText="Replacement value" value={replacement} onChange={(event) => { setReplacement(event.target.value); setChanged(null); }} /><Button onClick={replaceValue}>Replace element</Button><Button kind="secondary" onClick={reset}>Reset</Button></div><pre><code>{`moisture[${index}] = ${replacement}`}</code></pre></section>;
}

export function BuiltInFunctionExplorer({ content, values }: { content: Pack["builtIns"]; values: number[] }) {
  const [selected, setSelected] = useState<"len" | "max" | "min">("len");
  const result = selected === "len" ? values.length : selected === "max" ? Math.max(...values) : Math.min(...values);
  return <section id="built-ins" className="lesson-card"><p className="lesson-section-label">Built-in Function Explorer</p><h2>{content.title}</h2><p>{content.body}</p><ListVisualizer name="temperatures" values={values} selectedIndex={selected === "max" ? values.indexOf(Math.max(...values)) : selected === "min" ? values.indexOf(Math.min(...values)) : null} /><div className="built-in-explorer-grid"><div className="built-in-controls">{content.functions.map((item) => <button type="button" key={item.name} className={selected === item.name ? "is-selected" : ""} onClick={() => setSelected(item.name)}><code>{item.name}(temperatures)</code><span>{item.purpose}</span></button>)}</div><div className="built-in-result"><span>Result</span><strong>{result}</strong><code>{selected}(temperatures)</code></div></div><div className="operation-preview-grid"><article><Tag type="blue">Python built-in functions</Tag><p>Work with Lists and many other iterable types.</p><div>{content.previewBuiltIns.map((name) => <code key={name}>{name}</code>)}</div></article><article><Tag type="purple">List methods</Tag><p>Belong specifically to List objects.</p><div>{content.previewMethods.map((name) => <code key={name}>{name}</code>)}</div></article></div><p className="preview-only-note">Coming soon: these names are a preview only and are not interactive in this lesson.</p></section>;
}

export function CollectionComparisonPanel({ content }: { content: Pack["comparison"] }) {
  return <section id="comparison" className="lesson-card"><p className="lesson-section-label">Collection Comparison Panel</p><h2>{content.title}</h2><p>{content.body}</p><div className="collection-comparison-table" role="table"><div role="row" className="comparison-heading"><strong role="columnheader">Individual variables</strong><strong role="columnheader">Single List</strong></div>{content.rows.map((row) => <div role="row" key={row.variables}><span role="cell">{row.variables}</span><span role="cell">{row.list}</span></div>)}</div></section>;
}

export function ListPlaygroundSupplement({ code }: { code: string }) {
  const parsed = useMemo(() => parseSimpleList(code), [code]);
  if (!parsed) return <div className="list-playground-empty"><strong>No simple List detected.</strong><span>Create one with a variable name and square brackets to activate the visualizer.</span></div>;
  const numericValues = parsed.values.filter((value): value is number => typeof value === "number");
  return <div className="list-playground-supplement"><ListVisualizer name={parsed.name} values={parsed.values} selectedIndex={parsed.selectedIndex} /><div className="collections-code-analysis"><div><span>Elements</span><strong>{parsed.values.length}</strong></div><div><span>Selected index</span><strong>{parsed.selectedIndex ?? "None"}</strong></div><div><span>Maximum</span><strong>{numericValues.length ? Math.max(...numericValues) : "Not numeric"}</strong></div><div><span>Minimum</span><strong>{numericValues.length ? Math.min(...numericValues) : "Not numeric"}</strong></div></div></div>;
}

export function ListEngineerScenario({ content }: { content: Pack["engineerScenario"] }) {
  return <section id="engineer" className="lesson-card collections-engineer"><p className="lesson-section-label">Think like an engineer</p><h2>{content.title}</h2><p>{content.body}</p><blockquote>{content.question}</blockquote></section>;
}
