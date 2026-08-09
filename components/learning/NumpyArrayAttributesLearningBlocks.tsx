import { useState } from "react";
import { CodeSnippet, Tag, Tile } from "@carbon/react";
import { DataStructured, Information, WarningAlt } from "@carbon/icons-react";
import { ArrayGrid } from "@/components/learning/NumpyIntroductionLearningBlocks";
import type { NumpyArrayAttributesDevelopmentPack } from "@/types/content";

type Pack = NumpyArrayAttributesDevelopmentPack;

export function SensorDatasetProblem({ content }: { content: Pack["sensorDataset"] }) {
  return <section id="sensor-problem" className="lesson-card"><p className="lesson-section-label">Smart Farm dataset</p><h2>Inspect before you calculate</h2><p>An engineer should understand an array before feeding it into a dashboard or model.</p><div className="numpy-inspection-problem"><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><div><ArrayGrid values={content.values} name="sensor_data" /><div className="numpy-column-meaning">{content.columns.map((column) => <Tag type="teal" key={column}>{column}</Tag>)}</div></div></div><div className="numpy-inspection-questions">{content.questions.map((question) => <span key={question}>{question}</span>)}</div></section>;
}

export function ArrayAttributeInspector({ attributes, values }: { attributes: Pack["attributes"]; values: number[][] }) {
  const [activeId, setActiveId] = useState<Pack["attributes"][number]["id"]>("shape");
  const active = attributes.find((item) => item.id === activeId) ?? attributes[0];
  return <section id="array-inspector" className="lesson-card"><p className="lesson-section-label">NumPy Array Inspector</p><h2>Six attributes answer six engineering questions</h2><div className="numpy-attribute-inspector-layout"><div><ArrayGrid values={values} name="sensor_data" /><CodeSnippet type="single" feedback="Copied">{active.code}</CodeSnippet></div><div className="numpy-inspector-controls" role="tablist" aria-label="NumPy array attributes">{attributes.map((item) => <button type="button" role="tab" aria-selected={item.id === active.id} className={item.id === active.id ? "is-active" : ""} onClick={() => setActiveId(item.id)} key={item.id}><code>.{item.id}</code><span>{item.question}</span></button>)}</div></div><Tile className="numpy-inspector-result" aria-live="polite"><div><span>{active.question}</span><code>{active.name}</code></div><strong>{active.value}</strong><p>{active.meaning}</p></Tile><div className="numpy-attribute-equation"><span><code>ndim</code> = how many axes</span><span><code>shape</code> = length of each axis</span><span><code>size</code> = total values</span></div></section>;
}

export function DimensionStructureVisualizer({ dimensions }: { dimensions: Pack["dimensions"] }) {
  const [activeId, setActiveId] = useState<Pack["dimensions"][number]["id"]>("2D");
  const active = dimensions.find((item) => item.id === activeId) ?? dimensions[0];
  return <section id="dimensions" className="lesson-card"><p className="lesson-section-label">Dimension visualizer</p><h2>Axes describe how data is arranged</h2><div className="numpy-dimension-tabs" role="tablist" aria-label="Choose array dimension">{dimensions.map((item) => <button type="button" role="tab" aria-selected={item.id === active.id} className={item.id === active.id ? "is-active" : ""} onClick={() => setActiveId(item.id)} key={item.id}><strong>{item.id}</strong><span>{item.description}</span></button>)}</div><div className="numpy-dimension-inspector"><div className="numpy-array-layers">{active.values.map((layer, index) => <div key={index}><span>{active.id === "3D" ? `Layer ${index + 1}` : active.farmMeaning}</span><ArrayGrid values={layer} name={active.id === "3D" ? `layer_${index + 1}` : active.id} /></div>)}</div><Tile className="numpy-dimension-stats"><DataStructured size={28} aria-hidden="true" /><dl><dt>ndim</dt><dd>{active.ndim}</dd><dt>shape</dt><dd>{active.shape}</dd><dt>size</dt><dd>{active.size}</dd></dl><p>{active.farmMeaning}</p></Tile></div></section>;
}

export function DtypeConversionExplorer({ types, conversion }: { types: Pack["dataTypes"]; conversion: Pack["conversion"] }) {
  const [mode, setMode] = useState<"creation" | "existing">("existing");
  return <section id="dtype-conversion" className="lesson-card"><p className="lesson-section-label">dtype and astype()</p><h2>Choose storage at creation—or convert later</h2><div className="numpy-dtype-cards">{types.map((type) => <article className={type.focus ? "is-focus" : ""} key={type.name}><code>{type.name}</code><strong>{type.meaning}</strong><span>{type.example}</span></article>)}</div><div className="numpy-mode-tabs" role="tablist" aria-label="Data type conversion timing"><button type="button" role="tab" aria-selected={mode === "creation"} className={mode === "creation" ? "is-active" : ""} onClick={() => setMode("creation")}>dtype= at creation</button><button type="button" role="tab" aria-selected={mode === "existing"} className={mode === "existing" ? "is-active" : ""} onClick={() => setMode("existing")}>astype() later</button></div><div className="numpy-conversion-result"><CodeSnippet type="multi" feedback="Copied">{mode === "creation" ? conversion.creationCode : conversion.existingCode}</CodeSnippet><Tile><span>Result</span><strong>{mode === "creation" ? conversion.creationOutput : conversion.existingOutput}</strong></Tile></div><Tile className="numpy-conversion-warning"><WarningAlt size={20} aria-hidden="true" /><p>{conversion.warning}</p></Tile></section>;
}

export function ArrayMemoryPanel({ content }: { content: Pack["memory"] }) {
  return <section id="memory" className="lesson-card"><p className="lesson-section-label">itemsize and nbytes</p><h2>From one element to total element memory</h2><div className="numpy-memory-equation"><div><code>itemsize</code><span>bytes per value</span></div><strong>×</strong><div><code>size</code><span>number of values</span></div><strong>=</strong><div><code>nbytes</code><span>total element bytes</span></div></div><Tile><strong>{content.formula}</strong><span>{content.example}</span></Tile><div className="numpy-platform-note"><Information size={20} aria-hidden="true" /><p>{content.platformNote}</p></div></section>;
}

export function ReshapePreview({ content }: { content: Pack["reshapePreview"] }) {
  return <section id="reshape-preview" className="lesson-card"><p className="lesson-section-label">reshape() preview</p><h2>Change structure, keep the same values</h2><div className="numpy-reshape-preview"><CodeSnippet type="multi" feedback="Copied">{content.code}</CodeSnippet><div><span>{content.fromShape}</span><strong>12 values</strong></div><b>→</b><div><span>{content.toShape}</span><strong>3 rows × 4 columns</strong></div></div><p>{content.rule}</p></section>;
}

export function AttributeQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Attributes describe; methods perform an action</h2><div className="numpy-attribute-reference" role="table" aria-label="NumPy array attributes and methods"><div className="is-heading" role="row"><strong>Name</strong><strong>Purpose</strong><strong>Kind</strong></div>{rows.map((row) => <div role="row" key={row.name}><code>{row.name}</code><span>{row.purpose}</span><Tag type={row.kind === "attribute" ? "blue" : row.kind === "method" ? "purple" : "gray"}>{row.kind}</Tag></div>)}</div><Tile className="numpy-shape-callout"><strong>Correct: <code>arr.shape</code></strong><span>Incorrect: <code>arr.shape()</code> — shape is an attribute, not a method.</span></Tile></section>;
}
