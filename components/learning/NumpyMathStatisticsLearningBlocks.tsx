import { useState } from "react";
import type React from "react";
import { CodeSnippet, Tag, Tile } from "@carbon/react";
import { ArrowDown, ArrowRight, Location, Sigma } from "@carbon/icons-react";
import { ArrayGrid } from "@/components/learning/NumpyIntroductionLearningBlocks";
import type { NumpyMathStatisticsDevelopmentPack } from "@/types/content";

type Pack = NumpyMathStatisticsDevelopmentPack;
type StatisticId = Pack["moisture"]["statistics"][number]["id"];
type AxisFunction = Pack["axis"]["functions"][number]["id"];

export function StatisticalFunctionExplorer({ content }: { content: Pack["moisture"] }) {
  const [activeId, setActiveId] = useState<StatisticId>("mean");
  const active = content.statistics.find((item) => item.id === activeId) ?? content.statistics[0];
  return <section id="statistics" className="lesson-card"><p className="lesson-section-label">Statistical functions</p><h2>Ask a useful question about the complete dataset</h2><ArrayGrid values={[content.values]} name="moisture" /><div className="numpy-stat-tabs" role="tablist" aria-label="Statistical functions">{content.statistics.map((item) => <button type="button" role="tab" aria-selected={item.id === active.id} className={item.id === active.id ? "is-active" : ""} onClick={() => setActiveId(item.id)} key={item.id}><strong>{item.label}</strong><code>{item.code}</code></button>)}</div><Tile className="numpy-stat-result"><div><span>Function</span><code>{active.code}</code></div><div><span>Result</span><strong>{active.result}</strong></div><p>{active.meaning}</p></Tile><div className="numpy-median-range"><Tile><span>Sorted for median</span><strong>[{content.sorted.join("  ")}]</strong></Tile><Tile><span>Range = max − min</span><strong>{content.range}</strong></Tile></div></section>;
}

export function ExtremeAndSpreadPanel({ extremes, spread }: { extremes: Pack["extremes"]; spread: Pack["spread"] }) {
  return <section id="extremes-spread" className="lesson-card"><p className="lesson-section-label">Values, positions, and spread</p><h2>Separate what happened from where it happened</h2><div className="numpy-extreme-strip">{extremes.values.map((value, index) => <div className={index === extremes.minimum.index ? "is-min" : index === extremes.maximum.index ? "is-max" : ""} key={index}><small>[{index}]</small><strong>{value}</strong>{index === extremes.minimum.index && <span>argmin</span>}{index === extremes.maximum.index && <span>argmax</span>}</div>)}</div><div className="numpy-extreme-cards"><Tile><Location size={20} /><span><code>np.min()</code> returns value</span><strong>{extremes.minimum.value}</strong><span><code>np.argmin()</code> returns index</span><strong>{extremes.minimum.index}</strong></Tile><Tile><Location size={20} /><span><code>np.max()</code> returns value</span><strong>{extremes.maximum.value}</strong><span><code>np.argmax()</code> returns index</span><strong>{extremes.maximum.index}</strong></Tile><Tile><Sigma size={20} /><span>Variance</span><strong>{spread.variance}</strong><span>Standard deviation</span><strong>{spread.standardDeviation}</strong></Tile></div><p className="numpy-spread-note">{spread.explanation}</p></section>;
}

export function MathematicalFunctionGallery({ functions }: { functions: Pack["mathematical"] }) {
  const [activeId, setActiveId] = useState<Pack["mathematical"][number]["id"]>("sqrt");
  const active = functions.find((item) => item.id === activeId) ?? functions[0];
  return <section id="mathematical-functions" className="lesson-card"><p className="lesson-section-label">Mathematical functions</p><h2>Apply one mathematical transformation to every element</h2><div className="numpy-math-gallery"><div className="numpy-math-list" role="tablist" aria-label="Mathematical functions">{functions.map((item) => <button type="button" role="tab" aria-selected={item.id === active.id} className={item.id === active.id ? "is-active" : ""} onClick={() => setActiveId(item.id)} key={item.id}><code>np.{item.id}()</code>{item.focus && <Tag type="green">Core</Tag>}</button>)}</div><Tile className="numpy-math-result"><code>{active.code}</code><div><span>Input</span><strong>{active.input}</strong></div><ArrowDown size={24} aria-hidden="true" /><div><span>Output</span><strong>{active.output}</strong></div><p>{active.meaning}</p></Tile></div></section>;
}

const analyticsValues = [28, 30, 31, 29, 32, 35, 27];
const analyticsResults: Record<StatisticId, string> = { sum: "212", mean: "30.286", median: "30", min: "27", max: "35", var: "6.204", std: "2.491", argmin: "6", argmax: "5" };

export function SensorAnalyticsDashboard({ operations }: { operations: Pack["moisture"]["statistics"] }) {
  const [activeId, setActiveId] = useState<StatisticId>("mean");
  const operation = operations.find((item) => item.id === activeId) ?? operations[0];
  const code = operation.code.replace("moisture", "temperature");
  return <section id="sensor-analytics" className="lesson-card"><p className="lesson-section-label">Interactive Smart Farm Sensor Analytics</p><h2>Turn seven temperature readings into one decision metric</h2><ArrayGrid values={[analyticsValues]} name="temperature" /><div className="numpy-analytics-dashboard">{operations.map((item) => <button type="button" aria-pressed={item.id === activeId} className={item.id === activeId ? "is-active" : ""} onClick={() => setActiveId(item.id)} key={item.id}><span>{item.label}</span><strong>{analyticsResults[item.id]}</strong></button>)}</div><Tile className="numpy-analytics-output"><div><span>Function</span><code>{code}</code></div><div><span>Result</span><strong>{analyticsResults[activeId]}</strong></div><CodeSnippet type="single" feedback="Copied">{code}</CodeSnippet></Tile></section>;
}

export function AxisExplorer({ content }: { content: Pack["axis"] }) {
  const [axis, setAxis] = useState<0 | 1>(0);
  const [functionId, setFunctionId] = useState<AxisFunction>("mean");
  const result = axis === 0 ? content.results[functionId].axis0 : content.results[functionId].axis1;
  const label = content.functions.find((item) => item.id === functionId)?.label ?? "Mean";
  return <section id="axis-explorer" className="lesson-card"><p className="lesson-section-label">Interactive Axis Explorer</p><h2>Choose which direction NumPy should reduce</h2><div className="numpy-axis-controls"><div role="tablist" aria-label="Axis function">{content.functions.map((item) => <button type="button" role="tab" aria-selected={item.id === functionId} className={item.id === functionId ? "is-active" : ""} onClick={() => setFunctionId(item.id)} key={item.id}>{item.label}</button>)}</div><div role="tablist" aria-label="Array axis"><button type="button" role="tab" aria-selected={axis === 0} className={axis === 0 ? "is-active" : ""} onClick={() => setAxis(0)}>axis=0</button><button type="button" role="tab" aria-selected={axis === 1} className={axis === 1 ? "is-active" : ""} onClick={() => setAxis(1)}>axis=1</button></div></div><div className={`numpy-axis-layout axis-${axis}`}><div className="numpy-axis-matrix"><div className="numpy-axis-head"><span />{content.columns.map((column) => <strong key={column}>{column}</strong>)}</div>{content.matrix.map((row, rowIndex) => <div className="numpy-axis-row" key={rowIndex}><small>Field {rowIndex + 1}</small>{row.map((value, columnIndex) => <span style={{ "--axis-index": axis === 0 ? columnIndex : rowIndex } as React.CSSProperties} key={columnIndex}>{value}</span>)}</div>)}</div><div className="numpy-axis-direction">{axis === 0 ? <ArrowDown size={32} /> : <ArrowRight size={32} />}<strong>{axis === 0 ? "Down rows" : "Across columns"}</strong><span>{axis === 0 ? "One result per column" : "One result per row"}</span></div><Tile className="numpy-axis-result"><code>{`np.${functionId}(sensor_data, axis=${axis})`}</code><strong>[{result.join("  ")}]</strong><span>{label} · result shape ({result.length},)</span></Tile></div></section>;
}

export function FunctionEquivalentsAndReference({ equivalents, rows }: { equivalents: Pack["methodEquivalents"]; rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Functions, methods, and their purpose</h2><div className="numpy-method-equivalents">{equivalents.map((item) => <Tile key={item.function}><code>{item.function}</code><span>=</span><code>{item.method}</code><strong>{item.purpose}</strong></Tile>)}</div><div className="numpy-math-reference">{(["Statistical", "Mathematical"] as const).map((category) => <div key={category}><h3>{category}</h3>{rows.filter((row) => row.category === category).map((row) => <article key={row.name}><code>{row.name}</code><span>{row.purpose}</span></article>)}</div>)}</div></section>;
}
