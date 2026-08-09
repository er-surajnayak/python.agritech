import { useState } from "react";
import { CodeSnippet, Tile } from "@carbon/react";
import type { PandasCleaningDevelopmentPack } from "@/types/content";

type Pack = PandasCleaningDevelopmentPack;
type OperationId = Pack["operations"][number]["id"];
type Cell = number | string | boolean | null;

function CleaningTable({ columns, rows, boolean = false, duplicateLast = false }: { columns: string[]; rows: Cell[][]; boolean?: boolean; duplicateLast?: boolean }) {
  return <div className="pandas-clean-table-wrap"><table className="pandas-clean-table"><thead><tr><th>index</th>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr className={duplicateLast && rowIndex === rows.length - 1 ? "is-duplicate" : ""} key={`${rowIndex}-${String(row[0])}`}><th>{rowIndex}</th>{row.map((value, columnIndex) => { const missing = value === null; return <td className={missing ? "is-missing" : boolean && value === true ? "is-true" : ""} key={`${rowIndex}-${columns[columnIndex]}`}>{missing ? "NaN" : String(value)}</td>; })}</tr>)}</tbody></table></div>;
}

const cloneRows = (rows: Cell[][]) => rows.map((row) => [...row]);

function operationRows(id: OperationId, rows: Cell[][]): { columns?: string[]; rows: Cell[][]; boolean?: boolean; note: string } {
  if (id === "detect") return { rows: rows.map((row) => row.map((value) => value === null)), boolean: true, note: "True identifies every missing cell." };
  if (id === "count") return { columns: ["Column", "Missing"], rows: [["Field_ID", 0], ["Temperature", 1], ["Humidity", 1], ["Soil_Moisture", 1], ["Yield", 2], ["Crop_Type", 0]], note: "Five missing cells exist across four columns." };
  if (id === "drop") return { rows: rows.filter((row) => !row.some((value) => value === null)), note: "Only complete rows remain. This is a large information loss, so inspect before choosing it." };
  const next = cloneRows(rows);
  if (id === "mean") { next.forEach((row) => { if (row[1] === null) row[1] = 33; }); return { rows: next, note: "The observed mean temperature, 33.0, replaces one gap." }; }
  if (id === "median") { next.forEach((row) => { if (row[4] === null) row[4] = 500; }); return { rows: next, note: "The observed median yield, 500, replaces both gaps." }; }
  if (id === "ffill") { next.forEach((row, index) => { if (row[2] === null && index > 0) row[2] = next[index - 1][2]; }); return { rows: next, note: "Field 102 receives the previous humidity reading, 65." }; }
  if (id === "bfill") { for (let index = next.length - 2; index >= 0; index -= 1) if (next[index][2] === null) next[index][2] = next[index + 1][2]; return { rows: next, note: "Field 102 receives the next humidity reading, 72." }; }
  if (id === "duplicates") return { rows, note: "The final Field 105 row repeats the preceding record." };
  if (id === "dedupe") return { rows: rows.filter((row, index) => index === rows.findIndex((candidate) => candidate[0] === row[0])), note: "One Field 105 record remains after applying the identifier rule." };
  next.forEach((row) => { row[5] = String(row[5]).trim().toLowerCase(); });
  return { rows: next, note: "Whitespace and capitalization are standardized to rice and wheat." };
}

export function MessyDatasetStory({ dataset }: { dataset: Pack["dataset"] }) {
  return <section id="messy-data" className="lesson-card"><p className="lesson-section-label">Messy Agritech dataset</p><h2>Missing readings, a duplicate upload, and inconsistent crop labels</h2><CleaningTable columns={dataset.columns} rows={dataset.rows} duplicateLast /><div className="pandas-quality-summary"><Tile><strong>5</strong><span>missing cells</span></Tile><Tile><strong>1</strong><span>duplicate row</span></Tile><Tile><strong>3 styles</strong><span>for “rice”</span></Tile></div><p className="pandas-cleaning-purpose">Cleaning is not cosmetic. It establishes whether the table is reliable enough to support a farm decision.</p></section>;
}

export function MissingDataPatterns() {
  return <section id="missing-patterns" className="lesson-card"><p className="lesson-section-label">Detect before changing</p><h2>Ask where, how much, and which records are incomplete</h2><div className="pandas-pattern-grid"><Tile><code>df.isna()</code><strong>Cell-level mask</strong><span><code>isnull()</code> is equivalent.</span></Tile><Tile><code>df.isna().sum()</code><strong>Missing per column</strong><span>Prioritize affected features.</span></Tile><Tile><code>df.isna().sum().sum()</code><strong>Total missing</strong><span>Five cells in this dataset.</span></Tile><Tile><code>df[df.isna().any(axis=1)]</code><strong>Incomplete rows</strong><span><code>axis=1</code> checks across columns.</span></Tile><Tile><code>df.columns[df.isna().any()]</code><strong>Affected columns</strong><span>Temperature, Humidity, Soil_Moisture, Yield.</span></Tile><Tile><code>df.dropna(how="all")</code><strong>Only fully empty rows</strong><span>Less aggressive than the default.</span></Tile></div></section>;
}

export function FarmDataCleaningLab({ dataset, operations }: { dataset: Pack["dataset"]; operations: Pack["operations"] }) {
  const [mode, setMode] = useState<OperationId>("detect");
  const active = operations.find((operation) => operation.id === mode) ?? operations[0];
  const result = operationRows(mode, dataset.rows);
  return <section id="cleaning-lab" className="lesson-card"><p className="lesson-section-label">Interactive Farm Data Cleaning Lab</p><h2>Compare the evidence before and after one deliberate operation</h2><div className="pandas-clean-tabs" role="tablist" aria-label="Cleaning operation">{operations.map((operation) => <button type="button" role="tab" aria-selected={mode === operation.id} className={mode === operation.id ? "is-active" : ""} onClick={() => setMode(operation.id)} key={operation.id}>{operation.label}</button>)}</div><div className="pandas-before-after"><div><span>Before</span><CleaningTable columns={dataset.columns} rows={dataset.rows} duplicateLast={mode === "duplicates" || mode === "dedupe"} /></div><div><span>After · {active.label}</span><CleaningTable columns={result.columns ?? dataset.columns} rows={result.rows} boolean={result.boolean} duplicateLast={mode === "duplicates"} /></div></div><Tile className="pandas-clean-operation"><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><p>{active.explanation}</p><strong>{result.note}</strong></Tile></section>;
}

export function CleaningWorkflow({ steps }: { steps: Pack["workflow"] }) {
  return <section id="workflow" className="lesson-card"><p className="lesson-section-label">Cleaning workflow</p><h2>Profile first, change intentionally, verify last</h2><div className="pandas-clean-workflow">{steps.map((step, index) => <div key={step}><span>{index + 1}</span><strong>{step}</strong></div>)}</div><p className="pandas-verify-note"><strong>Verification closes the loop:</strong> recount missing values, duplicates, types, and expected record count after cleaning.</p></section>;
}

export function TypeAndTextExplorer({ examples }: { examples: Pack["typeExamples"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = examples[activeIndex];
  return <section id="types-text" className="lesson-card"><p className="lesson-section-label">Names, data types, and values</p><h2>Standardize meaning after structural problems are understood</h2><div className="pandas-clean-example-layout"><div>{examples.map((example, index) => <button type="button" className={activeIndex === index ? "is-active" : ""} onClick={() => setActiveIndex(index)} key={example.title}>{example.title}</button>)}</div><Tile><CodeSnippet type="multi" feedback="Copied">{active.code}</CodeSnippet><strong>{active.result}</strong><p>{active.explanation}</p></Tile></div><p className="pandas-coerce-note"><code>errors="coerce"</code> does not magically repair invalid data—it exposes invalid tokens as <code>NaN</code> so the next decision is explicit.</p></section>;
}

export function CleaningDecisionSimulator({ decisions }: { decisions: Pack["decisions"] }) {
  const [scenario, setScenario] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const active = decisions[scenario];
  return <section id="decision-simulator" className="lesson-card"><p className="lesson-section-label">Cleaning Decision Simulator</p><h2>Correct syntax does not guarantee a correct data decision</h2><div className="pandas-decision-scenarios">{decisions.map((decision, index) => <button type="button" className={scenario === index ? "is-active" : ""} onClick={() => { setScenario(index); setAnswer(null); }} key={decision.question}>Scenario {index + 1}</button>)}</div><Tile className="pandas-decision-card"><strong>{active.question}</strong><div>{active.options.map((option, index) => <button type="button" className={answer === index ? "is-selected" : ""} onClick={() => setAnswer(index)} key={option}>{String.fromCharCode(65 + index)}. {option}</button>)}</div>{answer !== null && <p className={answer === active.correctIndex ? "is-correct" : "is-wrong"}><strong>{answer === active.correctIndex ? "Reasonable choice" : "Reconsider the context"}</strong>{active.explanation}</p>}</Tile></section>;
}

export function PandasCleaningQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Pandas cleaning essentials</h2><div className="pandas-clean-reference">{rows.map((row) => <Tile key={row.task}><strong>{row.task}</strong><code>{row.code}</code></Tile>)}</div></section>;
}
