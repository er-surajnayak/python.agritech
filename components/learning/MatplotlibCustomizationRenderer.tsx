import type { MatplotlibCustomizationDevelopmentPack } from "@/types/content";

type StyleConfig = { title: string; xLabel: string; yLabel: string; marker: string; lineStyle: string; lineWidth: number; alpha: number; showGrid: boolean; showLegend: boolean; legendPosition: string };
const points = (values: number[], width: number, height: number) => { const min = Math.min(...values) - 2; const max = Math.max(...values) + 2; return values.map((value, index) => ({ x: 58 + index * ((width - 86) / (values.length - 1)), y: 40 + (max - value) * ((height - 92) / (max - min)) })); };
const dash = (style: string) => style === "--" ? "9 6" : style === ":" ? "2 5" : style === "-." ? "9 4 2 4" : undefined;

function Marker({ x, y, kind }: { x: number; y: number; kind: string }) {
  if (kind === "s") return <rect className="style-marker" x={x - 4} y={y - 4} width="8" height="8" />;
  if (kind === "^") return <path className="style-marker" d={`M ${x} ${y - 5} L ${x + 5} ${y + 4} L ${x - 5} ${y + 4} Z`} />;
  if (kind === "x") return <path className="style-marker no-fill" d={`M ${x - 4} ${y - 4} L ${x + 4} ${y + 4} M ${x + 4} ${y - 4} L ${x - 4} ${y + 4}`} />;
  if (kind === "*") return <text className="style-star" x={x} y={y + 5}>★</text>;
  return <circle className="style-marker" cx={x} cy={y} r="4" />;
}

export function StyledLineChart({ days, values, config, compact = false }: { days: number[]; values: number[]; config: StyleConfig; compact?: boolean }) {
  const width = 620, height = compact ? 240 : 330, plotted = points(values, width, height), polyline = plotted.map(({ x, y }) => `${x},${y}`).join(" ");
  const legendX = config.legendPosition.includes("right") ? 455 : config.legendPosition === "center" ? 270 : 72;
  const legendY = config.legendPosition.includes("lower") ? height - 75 : config.legendPosition === "center" ? height / 2 : 55;
  return <div className="style-chart-shell"><svg className="style-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${config.title}. ${values.length}-point line chart with ${config.marker} markers and ${config.lineStyle} line style.`}>
    <title>{config.title}</title><desc>{config.yLabel} plotted against {config.xLabel}.</desc>
    <text className="style-title" x={width / 2} y="22">{config.title}</text>
    {config.showGrid && [0, 1, 2, 3, 4].map(i => <line className="style-grid" key={i} x1="58" x2={width - 28} y1={40 + i * ((height - 92) / 4)} y2={40 + i * ((height - 92) / 4)} />)}
    <line className="style-axis" x1="58" x2="58" y1="38" y2={height - 50} /><line className="style-axis" x1="58" x2={width - 28} y1={height - 50} y2={height - 50} />
    <polyline className="style-line" points={polyline} strokeDasharray={dash(config.lineStyle)} strokeWidth={config.lineWidth} opacity={config.alpha} />
    {plotted.map((point, i) => <Marker key={days[i]} {...point} kind={config.marker} />)}
    {days.map((day, i) => <text className="style-tick" key={day} x={plotted[i].x} y={height - 34}>{day}</text>)}
    <text className="style-axis-label" x={width / 2} y={height - 10}>{config.xLabel}</text><text className="style-axis-label" transform={`translate(16 ${height / 2}) rotate(-90)`}>{config.yLabel}</text>
    {config.showLegend && <g className="style-legend" transform={`translate(${legendX} ${legendY})`}><rect width="118" height="30" /><line x1="10" x2="38" y1="15" y2="15" /><text x="46" y="19">Temperature</text></g>}
  </svg></div>;
}

export function SubplotFigure({ pack, selected, rows, columns, shareX = false }: { pack: MatplotlibCustomizationDevelopmentPack; selected: string[]; rows: number; columns: number; shareX?: boolean }) {
  const variables = pack.data.variables.filter(item => selected.includes(item.id)).slice(0, rows * columns);
  return <div className="subplot-figure" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }} role="img" aria-label={`${rows} by ${columns} subplot Figure containing ${variables.map(item => item.label).join(", ") || "no selected variables"}`}>
    {variables.map((variable, index) => <div className="subplot-axes" key={variable.id}><strong>{variable.label}</strong><svg viewBox="0 0 300 150" aria-hidden="true"><line className="style-axis" x1="38" y1="18" x2="38" y2="120"/><line className="style-axis" x1="38" y1="120" x2="286" y2="120"/>{variable.chart === "bar" ? variable.values.map((v, i) => <rect className="subplot-bar" key={i} x={48 + i * 33} y={115 - v * 13} width="18" height={v * 13}/>) : <polyline className="subplot-line" points={points(variable.values, 300, 150).map(({x,y}) => `${Math.max(38, x - 20)},${Math.min(116, y - 10)}`).join(" ")}/>}<text className="subplot-unit" x="8" y="15">{variable.unit}</text>{(!shareX || index >= variables.length - columns) && <text className="subplot-unit" x="144" y="143">Day</text>}</svg></div>)}
    {!variables.length && <p className="subplot-empty">Select at least one farm variable.</p>}
  </div>;
}
