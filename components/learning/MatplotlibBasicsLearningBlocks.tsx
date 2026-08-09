import { useState } from "react";
import { CodeSnippet, Tile } from "@carbon/react";
import type { MatplotlibBasicsDevelopmentPack } from "@/types/content";

type Pack = MatplotlibBasicsDevelopmentPack;
type VariableId = Pack["dataset"]["variables"][number]["id"];
type Marker = Pack["markers"][number]["value"];
type LineStyle = Pack["lineStyles"][number]["value"];

function LineChart({ x, y, label, unit, title, marker = "o", lineStyle = "-", grid = true, legend = true, markers = true }: { x: number[]; y: number[]; label: string; unit: string; title: string; marker?: Marker; lineStyle?: LineStyle; grid?: boolean; legend?: boolean; markers?: boolean }) {
  const width = 640; const height = 300; const left = 58; const right = 22; const top = 34; const bottom = 48;
  const min = Math.min(...y); const max = Math.max(...y); const padding = Math.max((max - min) * .18, 1); const low = min - padding; const high = max + padding;
  const px = (index: number) => left + index * ((width - left - right) / Math.max(x.length - 1, 1));
  const py = (value: number) => top + (high - value) * ((height - top - bottom) / (high - low));
  const points = y.map((value, index) => `${px(index)},${py(value)}`).join(" ");
  const ticks = Array.from({ length: 5 }, (_, index) => low + index * ((high - low) / 4));
  const dash = lineStyle === "--" ? "9 7" : lineStyle === ":" ? "2 6" : undefined;
  return <div className="matplotlib-chart-shell"><svg className="matplotlib-line-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${title}. ${label} ranges from ${min} to ${max} ${unit}.`}><title>{title}</title><desc>{label} values plotted across {x.length} days.</desc>{grid && ticks.map((tick) => <line className="chart-grid" x1={left} x2={width - right} y1={py(tick)} y2={py(tick)} key={tick} />)}<line className="chart-axis" x1={left} x2={left} y1={top} y2={height - bottom} /><line className="chart-axis" x1={left} x2={width - right} y1={height - bottom} y2={height - bottom} />{ticks.map((tick) => <text className="chart-tick" x={left - 9} y={py(tick) + 4} textAnchor="end" key={tick}>{tick.toFixed(max - min < 6 ? 1 : 0)}</text>)}{x.map((value, index) => <text className="chart-tick" x={px(index)} y={height - bottom + 20} textAnchor="middle" key={`${value}-${index}`}>{value}</text>)}<text className="chart-label" x={(left + width - right) / 2} y={height - 10} textAnchor="middle">Day</text><text className="chart-label" transform={`translate(15 ${(top + height - bottom) / 2}) rotate(-90)`} textAnchor="middle">{label} ({unit})</text><polyline className="chart-series" points={points} fill="none" strokeDasharray={dash} />{markers && y.map((value, index) => marker === "s" ? <rect className="chart-marker" x={px(index) - 5} y={py(value) - 5} width="10" height="10" key={`${index}-${value}`} /> : marker === "^" ? <polygon className="chart-marker" points={`${px(index)},${py(value) - 6} ${px(index) - 6},${py(value) + 5} ${px(index) + 6},${py(value) + 5}`} key={`${index}-${value}`} /> : <circle className="chart-marker" cx={px(index)} cy={py(value)} r="5" key={`${index}-${value}`} />)}<text className="chart-title" x={left} y="20">{title}</text>{legend && <g className="chart-legend" transform={`translate(${width - 155} 14)`}><line x1="0" x2="24" y1="7" y2="7" /><circle cx="12" cy="7" r="4" /><text x="31" y="11">{label}</text></g>}</svg></div>;
}

export function VisualizationPurpose() {
  const charts = [["Line", "trend over ordered values"], ["Bar", "category comparison"], ["Scatter", "relationship between variables"], ["Histogram", "distribution"], ["Box", "spread and outliers"]];
  return <section id="visualization-purpose" className="lesson-card"><p className="lesson-section-label">Why visualize?</p><h2>Charts turn measurements into patterns we can inspect</h2><div className="matplotlib-question-flow"><span>Numbers</span><span>Visual pattern</span><span>Question</span><span>Decision</span></div><div className="matplotlib-chart-purpose">{charts.map(([name, purpose]) => <Tile key={name}><strong>{name} chart</strong><span>{purpose}</span></Tile>)}</div><p className="matplotlib-focus-note">This lesson begins with line charts. Other chart types are introduced in Lessons 8.2 and 8.3.</p></section>;
}

export function FigureAxesConcept() {
  const pyplot = `plt.plot(days, temperature)
plt.title("Temperature")
plt.xlabel("Day")
plt.ylabel("Temperature (°C)")
plt.show()`;
  const objects = `fig, ax = plt.subplots()
ax.plot(days, temperature)
ax.set_title("Temperature")
ax.set_xlabel("Day")
ax.set_ylabel("Temperature (°C)")
plt.show()`;
  return <section id="figure-axes" className="lesson-card"><p className="lesson-section-label">Matplotlib structure</p><h2>A Figure contains one or more Axes</h2><div className="matplotlib-figure-model"><div><strong>Figure</strong><div><strong>Axes</strong><span>X-axis</span><span>Y-axis</span><span>Title</span><span>Plot</span></div></div><Tile><strong>pyplot style</strong><CodeSnippet type="multi" feedback="Copied">{pyplot}</CodeSnippet></Tile><Tile><strong>object-oriented style</strong><CodeSnippet type="multi" feedback="Copied">{objects}</CodeSnippet></Tile></div><p className="matplotlib-focus-note">Both styles are valid. The object-oriented approach scales more clearly when a Figure contains several Axes.</p></section>;
}

export function AgritechTrendExplorer({ pack }: { pack: Pack }) {
  const [variable, setVariable] = useState<VariableId>("temperature");
  const [marker, setMarker] = useState<Marker>("o");
  const [lineStyle, setLineStyle] = useState<LineStyle>("-");
  const [showMarkers, setShowMarkers] = useState(true); const [showGrid, setShowGrid] = useState(true); const [showLegend, setShowLegend] = useState(true);
  const active = pack.dataset.variables.find((item) => item.id === variable) ?? pack.dataset.variables[0];
  const plotArgs = [`    days,`, `    ${active.id},`, ...(showMarkers ? [`    marker="${marker}",`] : []), `    linestyle="${lineStyle}",`, `    label="${active.label}"`].join("\n");
  const code = [`days = [${pack.dataset.days.join(", ")}]`, `${active.id} = [${active.values.join(", ")}]`, "", "plt.plot(", plotArgs, ")", `plt.title("${active.chartTitle}")`, 'plt.xlabel("Day")', `plt.ylabel("${active.label} (${active.unit})")`, ...(showLegend ? ["plt.legend()"] : []), ...(showGrid ? ["plt.grid()"] : []), "plt.show()"].join("\n");
  return <section id="trend-explorer" className="lesson-card"><p className="lesson-section-label">Interactive Agritech Trend Explorer</p><h2>Change presentation choices without changing the data</h2><div className="matplotlib-trend-controls"><label>Variable<select value={variable} onChange={(event) => setVariable(event.target.value as VariableId)}>{pack.dataset.variables.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label><label>Marker<select value={marker} disabled={!showMarkers} onChange={(event) => setMarker(event.target.value as Marker)}>{pack.markers.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label><label>Line style<select value={lineStyle} onChange={(event) => setLineStyle(event.target.value as LineStyle)}>{pack.lineStyles.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label></div><div className="matplotlib-option-checks"><label><input type="checkbox" checked={showMarkers} onChange={(event) => setShowMarkers(event.target.checked)} /> Show markers</label><label><input type="checkbox" checked={showGrid} onChange={(event) => setShowGrid(event.target.checked)} /> Show grid</label><label><input type="checkbox" checked={showLegend} onChange={(event) => setShowLegend(event.target.checked)} /> Show legend</label></div><LineChart x={pack.dataset.days} y={active.values} label={active.label} unit={active.unit} title={active.chartTitle} marker={marker} lineStyle={lineStyle} grid={showGrid} legend={showLegend} markers={showMarkers} /><Tile className="matplotlib-generated-code"><CodeSnippet type="multi" feedback="Copied">{code}</CodeSnippet><p>Generated Matplotlib code mirrors the selected variable and presentation options.</p></Tile></section>;
}

function parseList(source: string, name: string) {
  const match = source.match(new RegExp(`${name}\\s*=\\s*\\[([^\\]]*)\\]`));
  if (!match) return null;
  const values = match[1].split(",").map((value) => Number(value.trim()));
  return values.length && values.every(Number.isFinite) ? values : null;
}

export function CodeToChartExplorer() {
  const starter = "days = [1, 2, 3, 4, 5]\ntemperature = [25, 28, 30, 29, 27]";
  const [code, setCode] = useState(starter); const [chart, setChart] = useState({ x: [1, 2, 3, 4, 5], y: [25, 28, 30, 29, 27] }); const [message, setMessage] = useState("Edit either list, then run the chart.");
  const run = () => { const x = parseList(code, "days"); const y = parseList(code, "temperature"); if (!x || !y) { setMessage("Use numeric Python lists named days and temperature."); return; } if (x.length !== y.length) { setMessage(`Length mismatch: days has ${x.length} values; temperature has ${y.length}.`); return; } if (x.length < 2) { setMessage("Add at least two points to show a trend."); return; } setChart({ x, y }); setMessage(`Rendered ${x.length} matching x/y points.`); };
  return <section id="code-chart-explorer" className="lesson-card"><p className="lesson-section-label">Interactive Code-to-Chart Explorer</p><h2>Edit Python data and render its line immediately</h2><div className="matplotlib-code-chart-layout"><div><label htmlFor="matplotlib-code-input">Python data</label><textarea id="matplotlib-code-input" value={code} onChange={(event) => setCode(event.target.value)} spellCheck={false} /><button type="button" onClick={run}>Run chart</button><p aria-live="polite">{message}</p></div><LineChart x={chart.x} y={chart.y} label="Temperature" unit="°C" title="Farm Temperature Trend" /></div><div className="matplotlib-code-flow"><span>Python data</span><span>Run</span><span>Matplotlib</span><span>Chart</span></div></section>;
}

export function MultipleSeriesCaution() {
  const code = `plt.plot(days, temperature, marker="o", label="Temperature")
plt.plot(days, moisture, marker="s", label="Soil Moisture")
plt.legend()
plt.grid()
plt.show()`;
  return <section id="multiple-series" className="lesson-card"><p className="lesson-section-label">Labels and legends</p><h2>A legend identifies series; it does not make their units comparable</h2><div className="matplotlib-multiple-series"><Tile><strong>Temperature</strong><code>marker="o"</code><span>measured in °C</span></Tile><Tile><strong>Soil Moisture</strong><code>marker="s"</code><span>measured in %</span></Tile><CodeSnippet type="multi" feedback="Copied">{code}</CodeSnippet></div><p className="matplotlib-unit-warning"><strong>Use this example to learn multiple lines and legends.</strong> Because °C and % are different units, do not interpret their vertical positions as directly comparable.</p></section>;
}

export function MatplotlibWorkflow({ steps }: { steps: string[] }) {
  const saveCode = `plt.savefig(
    "farm_temperature.png",
    dpi=300,
    bbox_inches="tight"
)
plt.close()`;
  return <section id="matplotlib-workflow" className="lesson-card"><p className="lesson-section-label">Basic workflow</p><h2>Build the chart in a deliberate order</h2><div className="matplotlib-workflow">{steps.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></div>)}</div><Tile className="matplotlib-save-card"><CodeSnippet type="multi" feedback="Copied">{saveCode}</CodeSnippet><p><code>dpi</code> controls output resolution. <code>bbox_inches="tight"</code> trims excess whitespace. Save before closing.</p></Tile></section>;
}

export function MatplotlibMistakes({ mistakes }: { mistakes: Pack["commonMistakes"] }) {
  return <section id="common-mistakes" className="lesson-card"><p className="lesson-section-label">Common mistakes</p><h2>Correct syntax is only one part of a useful chart</h2><div className="matplotlib-mistakes">{mistakes.map((mistake) => <Tile key={mistake.title}><strong>{mistake.title}</strong><pre><code>{mistake.code}</code></pre><p>{mistake.explanation}</p></Tile>)}</div></section>;
}

export function MatplotlibQuickReference({ rows }: { rows: Pack["quickReference"] }) {
  return <section id="quick-reference" className="lesson-card"><p className="lesson-section-label">Quick reference</p><h2>Matplotlib basics at a glance</h2><div className="matplotlib-reference">{rows.map((row) => <Tile key={row.task}><strong>{row.task}</strong><code>{row.code}</code></Tile>)}</div></section>;
}
