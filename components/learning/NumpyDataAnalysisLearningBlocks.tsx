import { useMemo, useState } from "react";
import { CodeSnippet, NumberInput, Select, SelectItem, Tile } from "@carbon/react";
import { ChartAverage, Filter, Trophy } from "@carbon/icons-react";
import { ArrayGrid } from "@/components/learning/NumpyIntroductionLearningBlocks";
import type { NumpyDataAnalysisDevelopmentPack } from "@/types/content";

type Pack = NumpyDataAnalysisDevelopmentPack;
type AnalysisId = Pack["analyses"][number]["id"];

function FarmTable({ values, columns, selected = [] }: { values: number[][]; columns: string[]; selected?: number[] }) {
  return <div className="numpy-farm-table"><div className="is-heading">{columns.map((column) => <strong key={column}>{column}</strong>)}</div>{values.map((row) => <div className={selected.includes(row[0]) ? "is-selected" : ""} key={row[0]}>{row.map((value, index) => <span key={index}>{value}</span>)}</div>)}</div>;
}

export function SmartFarmDataset({ content }: { content: Pack["dataset"] }) {
  const [column, setColumn] = useState(1);
  return <section id="dataset" className="lesson-card"><p className="lesson-section-label">The Smart Farm dataset</p><h2>Six fields, five numerical features, one analysis table</h2><FarmTable values={content.values} columns={content.columns} /><div className="numpy-dataset-inspector"><Tile><span>ndim</span><strong>{content.ndim}</strong><small>two axes</small></Tile><Tile><span>shape</span><strong>{content.shape}</strong><small>6 fields × 5 columns</small></Tile><Tile><span>size</span><strong>{content.size}</strong><small>total values</small></Tile></div><div className="numpy-column-selector"><Select id="dataset-column" labelText="Select a column" value={column} onChange={(event) => setColumn(Number(event.target.value))}>{content.columns.map((label, index) => <SelectItem key={label} value={index} text={label} />)}</Select><div><ArrayGrid values={[content.values.map((row) => row[column])]} name={content.columns[column]} /><CodeSnippet type="single" feedback="Copied">{`farm_data[:, ${column}]`}</CodeSnippet></div></div></section>;
}

function analysisResult(id: AnalysisId, data: number[][]) {
  const yields = data.map((row) => row[4]);
  const ranked = [...data].sort((a, b) => b[4] - a[4]);
  if (id === "average") return { rows: [], text: "[32.17  69.33  35.83  478.33]" };
  if (id === "highest") return { rows: [data[yields.indexOf(Math.max(...yields))]], text: "Field 104 · Yield 560" };
  if (id === "lowest") return { rows: [data[yields.indexOf(Math.min(...yields))]], text: "Field 105 · Yield 390" };
  if (id === "irrigation") return { rows: data.filter((row) => row[3] < 30), text: "Field IDs [103  105]" };
  if (id === "top3") return { rows: ranked.slice(0, 3), text: "Fields 104, 101, and 106" };
  return { rows: ranked, text: "Complete records ranked by yield" };
}

export function SmartFarmAnalyzer({ dataset, analyses }: { dataset: Pack["dataset"]; analyses: Pack["analyses"] }) {
  const [mode, setMode] = useState<AnalysisId>("average");
  const active = analyses.find((analysis) => analysis.id === mode) ?? analyses[0];
  const result = analysisResult(mode, dataset.values);
  return <section id="analyzer" className="lesson-card"><p className="lesson-section-label">Interactive Smart Farm Analyzer</p><h2>Ask a complete data-analysis question</h2><div className="numpy-analysis-tabs" role="tablist" aria-label="Farm analysis">{analyses.map((analysis) => <button type="button" role="tab" aria-selected={mode === analysis.id} className={mode === analysis.id ? "is-active" : ""} onClick={() => setMode(analysis.id)} key={analysis.id}>{analysis.id === "average" ? <ChartAverage size={18} /> : analysis.id === "highest" || analysis.id === "top3" ? <Trophy size={18} /> : <Filter size={18} />}{analysis.label}</button>)}</div><div className="numpy-analysis-result"><Tile><span>Result</span><strong>{result.text}</strong><p>{active.explanation}</p><CodeSnippet type="single" feedback="Copied">{active.code}</CodeSnippet></Tile>{result.rows.length > 0 && <FarmTable values={result.rows} columns={dataset.columns} selected={result.rows.map((row) => row[0])} />}</div></section>;
}

type Operator = ">" | "<" | ">=" | "<=" | "==";
export function SmartFarmDataFilter({ dataset, columns }: { dataset: Pack["dataset"]; columns: Pack["filterColumns"] }) {
  const [columnId, setColumnId] = useState(columns[0].id);
  const [operator, setOperator] = useState<Operator>(">");
  const [threshold, setThreshold] = useState(34);
  const column = columns.find((item) => item.id === columnId) ?? columns[0];
  const mask = useMemo(() => dataset.values.map((row) => { const value = row[column.index]; return operator === ">" ? value > threshold : operator === "<" ? value < threshold : operator === ">=" ? value >= threshold : operator === "<=" ? value <= threshold : value === threshold; }), [column.index, dataset.values, operator, threshold]);
  const rows = dataset.values.filter((_row, index) => mask[index]);
  return <section id="filter" className="lesson-card"><p className="lesson-section-label">Interactive Smart Farm Filter</p><h2>Turn a feature threshold into matching field records</h2><div className="numpy-data-filter-controls"><Select id="analysis-filter-column" labelText="Column" value={columnId} onChange={(event) => setColumnId(event.target.value as typeof columnId)}>{columns.map((item) => <SelectItem key={item.id} value={item.id} text={item.label} />)}</Select><Select id="analysis-filter-operator" labelText="Operator" value={operator} onChange={(event) => setOperator(event.target.value as Operator)}>{([">", "<", ">=", "<=", "=="] as Operator[]).map((item) => <SelectItem key={item} value={item} text={item} />)}</Select><NumberInput id="analysis-filter-threshold" label="Value" value={threshold} onChange={(_event, state) => setThreshold(Number(state.value))} /></div><div className="numpy-filter-capstone-summary"><Tile><span>Boolean mask</span><strong>[{mask.map((keep) => keep ? "T" : "F").join("  ")}]</strong><span>Matching Field IDs</span><strong>[{rows.map((row) => row[0]).join("  ") || "None"}]</strong><CodeSnippet type="single" feedback="Copied">{`farm_data[farm_data[:, ${column.index}] ${operator} ${threshold}]`}</CodeSnippet></Tile><FarmTable values={dataset.values} columns={dataset.columns} selected={rows.map((row) => row[0])} /></div></section>;
}

export function FarmRanking({ dataset }: { dataset: Pack["dataset"] }) {
  const [descending, setDescending] = useState(true);
  const ranked = [...dataset.values].sort((a, b) => descending ? b[4] - a[4] : a[4] - b[4]);
  return <section id="ranking" className="lesson-card"><p className="lesson-section-label">Interactive Farm Ranking</p><h2>Use feature indices to keep complete records aligned</h2><div className="numpy-ranking-controls" role="tablist" aria-label="Yield ranking order"><button type="button" role="tab" aria-selected={descending} className={descending ? "is-active" : ""} onClick={() => setDescending(true)}>Highest → Lowest</button><button type="button" role="tab" aria-selected={!descending} className={!descending ? "is-active" : ""} onClick={() => setDescending(false)}>Lowest → Highest</button></div><ol className="numpy-ranking-list">{ranked.map((row, index) => <li key={row[0]}><span>{index + 1}</span><strong>Field {row[0]}</strong><b>{row[4]} yield</b></li>)}</ol><CodeSnippet type="multi" feedback="Copied">{descending ? "indices = np.argsort(farm_data[:, 4])[::-1]\nfarm_data[indices]" : "indices = np.argsort(farm_data[:, 4])\nfarm_data[indices]"}</CodeSnippet></section>;
}

export function TransformationPanel({ normalization, metric, dataset }: { normalization: Pack["normalization"]; metric: Pack["derivedMetric"]; dataset: Pack["dataset"] }) {
  const [mode, setMode] = useState<"normalize" | "metric">("normalize");
  return <section id="transform" className="lesson-card"><p className="lesson-section-label">Transform and derive</p><h2>Create analysis-ready features with vectorized expressions</h2><div className="numpy-analysis-tabs" role="tablist" aria-label="Data transformation"><button type="button" role="tab" aria-selected={mode === "normalize"} className={mode === "normalize" ? "is-active" : ""} onClick={() => setMode("normalize")}>Normalize temperature</button><button type="button" role="tab" aria-selected={mode === "metric"} className={mode === "metric" ? "is-active" : ""} onClick={() => setMode("metric")}>Yield ÷ Moisture</button></div>{mode === "normalize" ? <div className="numpy-transform-flow"><ArrayGrid values={[normalization.input]} name="temperature" /><span>min-max</span><ArrayGrid values={[normalization.output]} name="normalized" /><p>{normalization.explanation}</p><CodeSnippet type="multi" feedback="Copied">{normalization.code}</CodeSnippet></div> : <div className="numpy-transform-flow"><ArrayGrid values={[metric.output]} name={metric.name} /><Tile><span>Highest ratio</span><strong>Field {metric.bestField}</strong><p>{dataset.values.find((row) => row[0] === metric.bestField)?.[4]} yield ÷ {dataset.values.find((row) => row[0] === metric.bestField)?.[3]} moisture</p></Tile><CodeSnippet type="single" feedback="Copied">{metric.code}</CodeSnippet></div>}</section>;
}

export function DataAnalysisQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">NumPy data-analysis cheat sheet</p><h2>From question to expression</h2><div className="numpy-analysis-reference">{rows.map((row) => <Tile key={row.task}><strong>{row.task}</strong><code>{row.code}</code></Tile>)}</div></section>;
}
