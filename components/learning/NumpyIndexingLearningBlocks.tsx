import { useMemo, useState } from "react";
import { CodeSnippet, NumberInput, Tag, Tile } from "@carbon/react";
import { Checkmark, DataStructured, WarningAlt } from "@carbon/icons-react";
import { ArrayGrid } from "@/components/learning/NumpyIntroductionLearningBlocks";
import type { NumpyIndexingDevelopmentPack } from "@/types/content";

type Pack = NumpyIndexingDevelopmentPack;
type DataOperation = "cell" | "row" | "column" | "slice" | "flatten" | "transpose";

export function OneDimensionalIndexExplorer({ content }: { content: Pack["oneDimensional"] }) {
  const [active, setActive] = useState(0);
  const selected = content.examples[active];
  return <section id="indexing-1d" className="lesson-card"><p className="lesson-section-label">1D indexing</p><h2>One value can have two useful index labels</h2><div className="numpy-dual-index"><div className="is-label"><span>Positive</span>{content.values.map((_, index) => <code key={index}>{index}</code>)}</div><div className="is-values"><span>Values</span>{content.values.map((value, index) => <button type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={index}>{value}</button>)}</div><div className="is-label"><span>Negative</span>{content.values.map((_, index) => <code key={index}>{index - content.values.length}</code>)}</div></div><div className="numpy-example-tabs" role="tablist" aria-label="One dimensional index examples">{content.examples.map((example, index) => <button type="button" role="tab" aria-selected={active === index} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={example.code}><code>{example.code}</code></button>)}</div><Tile className="numpy-index-result"><code>{selected.code}</code><strong>{selected.output}</strong><p>{selected.meaning}</p></Tile></section>;
}

export function NumpyDataExplorer({ matrix }: { matrix: Pack["matrix"] }) {
  const [operation, setOperation] = useState<DataOperation>("cell");
  const [row, setRow] = useState(1);
  const [column, setColumn] = useState(2);
  const operations: DataOperation[] = ["cell", "row", "column", "slice", "flatten", "transpose"];
  const result = useMemo(() => {
    if (operation === "cell") return { code: `${matrix.name}[${row}, ${column}]`, values: [[matrix.values[row]?.[column] ?? 0]], label: `Row ${row}, column ${column}` };
    if (operation === "row") return { code: `${matrix.name}[${row}]`, values: [matrix.values[row] ?? []], label: `Entire row ${row}` };
    if (operation === "column") return { code: `${matrix.name}[:, ${column}]`, values: [matrix.values.map((item) => item[column] ?? 0)], label: matrix.columns[column] ?? `Column ${column}` };
    if (operation === "slice") return { code: `${matrix.name}[:2, :2]`, values: matrix.values.slice(0, 2).map((item) => item.slice(0, 2)), label: "First two rows and columns" };
    if (operation === "flatten") return { code: `${matrix.name}.flatten()`, values: [matrix.values.flat()], label: "1D copy" };
    return { code: `${matrix.name}.T`, values: matrix.values[0].map((_, index) => matrix.values.map((item) => item[index])), label: "Rows and columns swapped" };
  }, [column, matrix, operation, row]);
  return <section id="data-explorer" className="lesson-card"><p className="lesson-section-label">Interactive NumPy Data Explorer</p><h2>Select the operation; see the exact code and result</h2><div className="numpy-data-tabs" role="tablist" aria-label="NumPy data operations">{operations.map((item) => <button type="button" role="tab" aria-selected={operation === item} className={operation === item ? "is-active" : ""} onClick={() => setOperation(item)} key={item}>{item}</button>)}</div><div className="numpy-data-explorer-layout"><div><div className="numpy-clickable-matrix" role="grid" aria-label="Smart Farm sensor matrix">{matrix.values.map((values, rowIndex) => <div role="row" key={rowIndex}>{values.map((value, columnIndex) => <button type="button" role="gridcell" aria-selected={row === rowIndex && column === columnIndex} className={row === rowIndex && column === columnIndex ? "is-selected" : ""} onClick={() => { setRow(rowIndex); setColumn(columnIndex); setOperation("cell"); }} key={columnIndex}><small>[{rowIndex}, {columnIndex}]</small><strong>{value}</strong></button>)}</div>)}</div><div className="numpy-column-meaning">{matrix.columns.map((name, index) => <Tag type="teal" key={name}>C{index} · {name}</Tag>)}</div></div><div className="numpy-data-controls">{(operation === "cell" || operation === "row") && <NumberInput id="data-row" label="Row" min={0} max={matrix.values.length - 1} value={row} onChange={(_event, state) => setRow(Number(state.value))} />}{(operation === "cell" || operation === "column") && <NumberInput id="data-column" label="Column" min={0} max={matrix.values[0].length - 1} value={column} onChange={(_event, state) => setColumn(Number(state.value))} />}<CodeSnippet type="single" feedback="Copied">{result.code}</CodeSnippet><span>{result.label}</span><ArrayGrid values={result.values} name="result" /></div></div></section>;
}

export function SlicePatternGallery({ slices }: { slices: Pack["slices"] }) {
  const [active, setActive] = useState(0);
  const item = slices[active];
  return <section id="slicing" className="lesson-card"><p className="lesson-section-label">Slicing patterns</p><h2>start is included; stop is excluded</h2><div className="numpy-slice-layout"><div className="numpy-slice-list">{slices.map((slice, index) => <button type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={slice.code}><code>{slice.code}</code><span>{slice.meaning}</span></button>)}</div><Tile aria-live="polite"><code>{item.code}</code><strong>{item.output}</strong><p>{item.meaning}</p></Tile></div><div className="numpy-slice-anatomy"><span>start</span><b>:</b><span>stop</span><b>:</b><span>step</span></div></section>;
}

export function ModificationAndMaskPanel({ modifications, mask }: { modifications: Pack["modification"]; mask: Pack["booleanIndexing"] }) {
  return <section id="modify-filter" className="lesson-card"><p className="lesson-section-label">Modify and select</p><h2>Index expressions can read or update data</h2><div className="numpy-modification-grid">{modifications.map((item) => <Tile key={item.code}><code>{item.code}</code><div><span>{item.before}</span><b>→</b><strong>{item.after}</strong></div><p>{item.meaning}</p></Tile>)}</div><div className="numpy-mask-flow"><ArrayGrid values={[mask.values]} name="temperature" /><div><code>{mask.condition}</code><strong>{mask.mask}</strong></div><b>→</b><div><code>{mask.code}</code><strong>{mask.output}</strong></div></div><p className="numpy-filter-note">{mask.note}</p></section>;
}

function reshapeValues(values: number[], rows: number, columns: number) {
  if (rows * columns !== values.length) return null;
  return Array.from({ length: rows }, (_, index) => values.slice(index * columns, (index + 1) * columns));
}

export function ReshapePlayground({ content }: { content: Pack["reshape"] }) {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(4);
  const reshaped = reshapeValues(content.values, rows, columns);
  return <section id="reshape-lab" className="lesson-card"><p className="lesson-section-label">Interactive Reshape Playground</p><h2>The product of the new shape must remain 12</h2><ArrayGrid values={[content.values]} name="np.arange(12)" /><div className="numpy-reshape-controls"><NumberInput id="reshape-rows" label="Rows" min={1} max={12} value={rows} onChange={(_event, state) => setRows(Number(state.value))} /><strong>×</strong><NumberInput id="reshape-columns" label="Columns" min={1} max={12} value={columns} onChange={(_event, state) => setColumns(Number(state.value))} /><span>= {rows * columns} positions</span></div>{reshaped ? <div className="numpy-reshape-success"><Tile><Checkmark size={20} aria-hidden="true" /><strong>Valid shape ({rows}, {columns})</strong><code>data.reshape({rows}, {columns})</code></Tile><ArrayGrid values={reshaped} name="reshaped" /></div> : <Tile className="numpy-reshape-error"><WarningAlt size={22} aria-hidden="true" /><div><strong>Cannot reshape 12 elements into ({rows}, {columns}).</strong><p>{rows} × {columns} = {rows * columns}, but the array contains only 12 elements.</p></div></Tile>}<div className="numpy-valid-shapes">{content.validShapes.map((shape) => <Tag type="green" key={shape}>{shape}</Tag>)}<Tag type="red">{content.invalidShape} invalid</Tag></div><div className="numpy-auto-shape">{content.autoExamples.map((item) => <Tile key={item.code}><code>{item.code}</code><span>NumPy calculates</span><strong>{item.shape}</strong></Tile>)}</div></section>;
}

export function ShapeTransformComparator({ flattening, transpose }: { flattening: Pack["flattening"]; transpose: Pack["transpose"] }) {
  return <section id="shape-transforms" className="lesson-card"><p className="lesson-section-label">Flatten, ravel, and transpose</p><h2>Three transformations, two different goals</h2><div className="numpy-flatten-grid">{flattening.map((item) => <Tile key={item.name}><Tag type={item.name === "flatten" ? "blue" : "purple"}>{item.name}()</Tag><code>{item.code}</code><strong>{item.output}</strong><p>{item.behavior}</p></Tile>)}</div><div className="numpy-transpose-flow"><ArrayGrid values={transpose.values} name={`matrix ${transpose.fromShape}`} /><div><DataStructured size={24} aria-hidden="true" /><code>{transpose.code}</code><span>{transpose.fromShape} → {transpose.toShape}</span></div><ArrayGrid values={transpose.values[0].map((_, index) => transpose.values.map((row) => row[index]))} name={`matrix.T ${transpose.toShape}`} /></div></section>;
}

export function IndexingQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Access and reshape at a glance</h2><div className="numpy-index-reference" role="table" aria-label="NumPy indexing and reshaping reference"><div className="is-heading" role="row"><strong>Operation</strong><strong>Example</strong><strong>Purpose</strong></div>{rows.map((row) => <div role="row" key={row.operation}><strong>{row.operation}</strong><code>{row.example}</code><span>{row.purpose}</span></div>)}</div></section>;
}
