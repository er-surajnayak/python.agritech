"use client";

import { Button, NumberInput, TextInput, Tag } from "@carbon/react";
import { useMemo, useState } from "react";
import type { TupleDevelopmentPack } from "@/types/content";

type TupleValue = string | number | boolean;
type Pack = TupleDevelopmentPack;

function renderTupleValue(value: TupleValue) {
  return typeof value === "string" ? `"${value}"` : String(value);
}

function parseTupleTuple(code: string) {
  const assignment = code.match(/\b([A-Za-z_]\w*)\s*=\s*\(([^)]*)\)/m);
  if (!assignment) return null;
  const raw = assignment[2].trim();
  const values = raw ? raw.split(",").map((item) => item.trim()).filter(Boolean).map((value) => {
    if (/^[-+]?\d+$/.test(value)) return Number(value);
    if (/^[-+]?\d*\.\d+$/.test(value)) return Number(value);
    if (value === "True") return true;
    if (value === "False") return false;
    return value.replace(/^['\"]|['\"]$/g, "");
  }) : [];
  const access = code.match(new RegExp(`${assignment[1]}\\[(.*?)\\]`));
  return {
    values,
    name: assignment[1],
    selectedIndex: access ? access[1].trim() : null,
  };
}

function parseIndexTuple(indexText: string, length: number) {
  if (indexText === "") return null;
  const index = Number(indexText);
  if (Number.isNaN(index)) return null;
  return index < 0 ? length + index : index;
}

export function TupleStorySection({ story }: { story: Pack["story"] }) {
  return <section id="story" className="lesson-card" aria-labelledby="tuple-story-title"><p className="lesson-section-label">Story continuation</p><h2 id="tuple-story-title">{story.title}</h2><p>{story.body}</p><div className="list-anatomy-grid"><article><h3>{story.problem.title}</h3><p>{story.problem.body}</p><ul>{story.problem.examples.map((item) => <li key={item}>{item}</li>)}</ul></article><article><h3>{story.locked.title}</h3><p>{story.locked.body}</p><ul>{story.locked.items.map((item) => <li key={item}>{item}</li>)}</ul></article></div></section>;
}

export function TupleWhySection({ data }: { data: Pack["whyTuples"] }) {
  return <section id="why-tuples" className="lesson-card" aria-labelledby="tuple-why-title"><p className="lesson-section-label">Why tuples?</p><h2 id="tuple-why-title">{data.title}</h2><p>{data.body}</p><div className="list-story-grid">{data.bullets.map((bullet) => <article key={bullet}><Tag type="blue">Hint</Tag><p>{bullet}</p></article>)}</div></section>;
}

export function TupleDefinitionPanel({ creation, anatomy }: { creation: Pack["creation"]; anatomy: Pack["anatomy"] }) {
  return <section id="definition" className="lesson-card" aria-labelledby="tuple-def-title"><p className="lesson-section-label">Creating and reading tuples</p><h2 id="tuple-def-title">{creation.title}</h2><p>{creation.body}</p><div className="list-example-grid">{creation.examples.map((example) => <article key={example.label}><Tag type="gray">{example.label}</Tag><pre><code>{example.code}</code></pre><p>{example.note}</p></article>)}</div><div className="lesson-card-subsection"><h3>{anatomy.title}</h3><p>{anatomy.body}</p><div className="list-element-row" aria-label={`${anatomy.tupleName} tuple anatomy`}>{anatomy.values.map((value, index) => <button type="button" key={`${anatomy.tupleName}-${index}`}><small>index {index}</small><strong>{renderTupleValue(value)}</strong><span>position {index + 1}</span></button>)}</div></div></section>;
}

export function TupleIndexingPanel({ indexing }: { indexing: Pack["indexing"] }) {
  const [selected, setSelected] = useState<number>(0);
  const active = indexing.examples.find((item) => item.index === selected || item.index === String(selected)) ?? indexing.examples[0];

  return <section id="indexing" className="lesson-card" aria-labelledby="tuple-index-title"><p className="lesson-section-label">Tuple indexing</p><h2 id="tuple-index-title">{indexing.title}</h2><p>{indexing.body}</p>
    {indexing.examples.length > 0 && <div className="index-mapping-result"><code>location[{selected}]</code><span>selects</span><strong>{renderTupleValue(active.result)}</strong></div>}
    <div className="list-index-examples">{indexing.examples.map((item) => <Button size="sm" key={`${item.code}`} kind={selected === item.index ? "primary" : "tertiary"} onClick={() => setSelected(Number(item.index))}>{item.code} → {String(item.result)}</Button>)}</div>{indexing.slicing ? <p><strong>Slicing:</strong> <code>{indexing.slicing}</code></p> : null}</section>;
}

export function TupleLockSimulator({ immutability }: { immutability: Pack["immutability"] }) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("18");
  const [feedback, setFeedback] = useState(immutability.message);
  const tupleName = useMemo(() => immutability.example.code.split("[")[0].trim() || "tuple", [immutability.example.code]);
  const currentValue = useMemo(() => (value === "" ? '""' : value), [value]);
  const currentIndex = Number.isNaN(index) ? "0" : String(index);

  function attemptMutation() {
    const attempted = `${tupleName}[${currentIndex}] = ${currentValue}`;
    setFeedback(`${attempted}\n${immutability.example.result}`);
  }

  return <section id="immutability" className="lesson-card" aria-labelledby="tuple-lock-title"><p className="lesson-section-label">Tuple immutability</p><h2 id="tuple-lock-title">{immutability.title}</h2><p>{immutability.body}</p><div className="mutability-simulator"><pre><code>location[0] = 18</code></pre><p><strong>Try to update:</strong></p><div className="list-mutation-controls"><NumberInput id="tuple-index" label="Index" value={index} min={0} max={10} onChange={(_event, state) => setIndex(Number(state.value))} /><TextInput id="tuple-value" labelText="New value" value={value} onChange={(event) => setValue(event.target.value)} /><Button onClick={attemptMutation}>Attempt assignment</Button></div><pre><code>{feedback}</code></pre></div></section>;
}

export function TuplePackingSection({ packing, unpacking }: { packing: Pack["packing"]; unpacking: Pack["unpacking"] }) {
  return <section id="packing" className="lesson-card" aria-labelledby="tuple-packing-title"><p className="lesson-section-label">Packing and unpacking</p><h2 id="tuple-packing-title">{packing.title}</h2><p>{packing.body}</p><pre><code>{packing.code}</code></pre><h3>Unpacking</h3><p>{unpacking.body}</p><pre><code>{unpacking.code}</code></pre><div className="list-mapping-table">{unpacking.mapping.map((entry) => <article key={entry.variable}><Tag type="blue">{entry.variable}</Tag><strong>{renderTupleValue(entry.variableValue)}</strong></article>)}</div></section>;
}

export function TupleBuiltInExplorer({ builtIns, values, title }: { builtIns: Pack["builtIns"]; values: TupleValue[]; title: string }) {
  type BuiltInName = Pack["builtIns"]["examples"][number]["name"];
  const [selected, setSelected] = useState<BuiltInName>("len");
  const sortedValues = [...values].sort((a, b) => {
    if (typeof a === "number" && typeof b === "number") return a - b;
    return String(a).localeCompare(String(b));
  });

  const result = useMemo(() => {
    const numbers = values.filter((value): value is number => typeof value === "number");
    switch (selected) {
      case "len":
        return String(values.length);
      case "max":
        return values.length ? String(numbers.length ? Math.max(...numbers) : String(values[values.length - 1]) ) : "ValueError";
      case "min":
        return values.length ? String(numbers.length ? Math.min(...numbers) : String(values[0])) : "ValueError";
      case "sum":
        return values.length ? String(values.reduce<number>((total, value) => total + (typeof value === "number" ? value : 0), 0)) : "0";
      case "sorted":
        return `[${sortedValues.map(renderTupleValue).join(", ")}]`;
      case "any": {
        const bools = values.map((value) => Boolean(value));
        return bools.some(Boolean) ? "True" : "False";
      }
      case "all": {
        const bools = values.map((value) => Boolean(value));
        return bools.every(Boolean) ? "True" : "False";
      }
      default:
        return "";
    }
  }, [selected, values, sortedValues]);

  return <section id="built-ins" className="lesson-card" aria-labelledby="tuple-builtins-title"><p className="lesson-section-label">Built-in functions</p><h2 id="tuple-builtins-title">{title}</h2><p>{builtIns.body}</p><div className="built-in-explorer-grid"><div className="built-in-controls">{builtIns.examples.map((example) => <button key={example.name} type="button" className={selected === example.name ? "is-selected" : ""} onClick={() => setSelected(example.name)}><code>{example.name}(values)</code><span>{example.purpose}</span></button>)}</div><div className="built-in-result"><span>Result</span><strong>{result}</strong><p>{builtIns.examples.find((example) => example.name === selected)?.purpose}</p></div></div></section>;
}

export function TupleMethodExplorer({ methods }: { methods: Pack["methods"] }) {
  const [selected, setSelected] = useState(0);
  const method = methods.rows[selected];

  return <section id="methods" className="lesson-card" aria-labelledby="tuple-method-title"><p className="lesson-section-label">Tuple methods</p><h2 id="tuple-method-title">{methods.title}</h2><p>{methods.body}</p><div className="code-selection-row">{methods.rows.map((item, index) => <Button key={item.method} size="sm" kind={selected === index ? "primary" : "tertiary"} onClick={() => setSelected(index)}>{item.method}()</Button>)}</div><pre><code>{method.example}</code></pre><p>{method.purpose}</p><div className="built-in-result"><span>Output</span><strong>{method.output}</strong></div></section>;
}

export function TupleComparisonCard({ comparison }: { comparison: Pack["comparison"] }) {
  return <section id="comparison" className="lesson-card" aria-labelledby="tuple-comparison-title"><p className="lesson-section-label">List vs tuple</p><h2 id="tuple-comparison-title">{comparison.title}</h2><p>{comparison.body}</p><div className="collection-comparison-table" role="table"><div role="row" className="comparison-heading"><strong role="columnheader">Feature</strong><strong role="columnheader">List</strong><strong role="columnheader">Tuple</strong></div>{comparison.rows.map((row) => <div role="row" key={row.feature}><span role="cell">{row.feature}</span><span role="cell">{row.list}</span><span role="cell">{row.tuple}</span></div>)}</div></section>;
}

export function TupleAgritechPanel({ agritech }: { agritech: Pack["agritech"] }) {
  return <section id="agritech-example" className="lesson-card" aria-labelledby="tuple-agritech-title"><p className="lesson-section-label">Agritech example</p><h2 id="tuple-agritech-title">{agritech.title}</h2><p>{agritech.body}</p><div className="list-anatomy-grid"><article><h3>Immutable metadata</h3><div className="list-element-row">{agritech.immutableValues.map((value, index) => <button type="button" key={`${value}-${index}`}><small>index {index}</small><strong>{renderTupleValue(value)}</strong></button>)}</div></article><article><h3>Mutable values</h3><div className="list-element-row">{agritech.mutableValues.map((value, index) => <button type="button" key={`${value}-${index}`}><small>index {index}</small><strong>{renderTupleValue(value)}</strong></button>)}</div></article></div><blockquote>{agritech.question}</blockquote></section>;
}

export function TuplePlaygroundSupplement({ code, values: fallbackValues }: { code: string; values: TupleValue[] }) {
  const parsed = useMemo(() => parseTupleTuple(code), [code]);
  const values = parsed ? parsed.values : fallbackValues;
  const selected = useMemo(() => {
    if (!parsed?.selectedIndex) return null;
    return parseIndexTuple(parsed.selectedIndex, values.length);
  }, [parsed, values.length]);

  return <div className="list-playground-supplement"><div className="tuple-visualizer"><div className="list-name-chip"><span>Tuple name</span><strong>{parsed?.name ?? "tuple"}</strong></div><div className="list-element-row">{values.map((value, index) => <button key={`${index}-${value}`} aria-pressed={selected === index}><small>index {index}</small><strong>{renderTupleValue(value)}</strong></button>)}</div></div><div className="collections-code-analysis"><div><span>Tuple size</span><strong>{values.length}</strong></div><div><span>Selected</span><strong>{selected ?? "None"}</strong></div><div><span>Has strings?</span><strong>{values.some((value) => typeof value === "string") ? "Yes" : "No"}</strong></div><div><span>Has Booleans?</span><strong>{values.some((value) => typeof value === "boolean") ? "Yes" : "No"}</strong></div></div></div>;
}

export function TupleEngineerScenario({ content }: { content: Pack["engineerScenario"] }) {
  return <section id="engineer" className="lesson-card collections-engineer" aria-labelledby="tuple-engineer-title"><p className="lesson-section-label">Think like an engineer</p><h2 id="tuple-engineer-title">{content.title}</h2><p>{content.body}</p><blockquote>{content.question}</blockquote></section>;
}
