export type MatplotlibChartKind = "line" | "bar" | "barh" | "scatter" | "area";

type ChartProps = {
  kind: MatplotlibChartKind;
  x: Array<number | string>;
  y: number[];
  title: string;
  xLabel: string;
  yLabel: string;
  secondSeries?: { y: number[]; label: string };
  seriesLabel?: string;
};

export function MatplotlibChartRenderer({ kind, x, y, title, xLabel, yLabel, secondSeries, seriesLabel = yLabel }: ChartProps) {
  const width = 680; const height = 320; const left = kind === "barh" ? 96 : 64; const right = 24; const top = 38; const bottom = 54;
  const allY = [...y, ...(secondSeries?.y ?? [])]; const minY = kind === "scatter" || kind === "line" ? Math.min(...allY) : 0; const maxY = Math.max(...allY); const padY = Math.max((maxY - minY) * .12, 1); const lowY = kind === "barh" ? 0 : minY - padY; const highY = maxY + padY;
  const numericX = x.every((value) => typeof value === "number"); const xNumbers = numericX ? x as number[] : x.map((_, index) => index); const minX = Math.min(...xNumbers); const maxX = Math.max(...xNumbers); const padX = Math.max((maxX - minX) * .04, .25);
  const px = (index: number) => kind === "scatter" && numericX ? left + ((xNumbers[index] - minX + padX) / (maxX - minX + padX * 2)) * (width - left - right) : left + (index + .5) * ((width - left - right) / x.length);
  const py = (value: number) => top + ((highY - value) / (highY - lowY)) * (height - top - bottom);
  const baseY = py(Math.max(0, lowY)); const slot = (width - left - right) / x.length; const ticks = Array.from({ length: 5 }, (_, index) => lowY + index * ((highY - lowY) / 4));
  const points = y.map((value, index) => `${px(index)},${py(value)}`).join(" "); const secondPoints = secondSeries?.y.map((value, index) => `${px(index)},${py(value)}`).join(" ");
  const description = `${title}. ${kind} chart with ${y.length} observations.`;
  return <div className="matplotlib-chart-shell"><svg className={`matplotlib-core-chart chart-${kind}`} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={description}><title>{title}</title><desc>{description}</desc>
    {kind !== "barh" && ticks.map((tick) => <g key={tick}><line className="chart-grid" x1={left} x2={width - right} y1={py(tick)} y2={py(tick)} /><text className="chart-tick" x={left - 9} y={py(tick) + 4} textAnchor="end">{tick.toFixed(maxY - minY < 8 ? 1 : 0)}</text></g>)}
    <line className="chart-axis" x1={left} x2={left} y1={top} y2={height - bottom} /><line className="chart-axis" x1={left} x2={width - right} y1={height - bottom} y2={height - bottom} />
    {kind !== "barh" && x.map((value, index) => <text className="chart-tick" x={px(index)} y={height - bottom + 20} textAnchor="middle" key={`${value}-${index}`}>{value}</text>)}
    {kind === "line" && <><polyline className="chart-series" points={points} fill="none" />{y.map((value, index) => <circle className="chart-marker" cx={px(index)} cy={py(value)} r="5" key={index} />)}{secondPoints && <><polyline className="chart-series chart-series-secondary" points={secondPoints} fill="none" />{secondSeries?.y.map((value, index) => <rect className="chart-marker chart-marker-secondary" x={px(index) - 4} y={py(value) - 4} width="8" height="8" key={index} />)}</>}</>}
    {kind === "area" && <><polygon className="chart-area" points={`${px(0)},${baseY} ${points} ${px(y.length - 1)},${baseY}`} /><polyline className="chart-series" points={points} fill="none" /></>}
    {kind === "scatter" && y.map((value, index) => <circle className="chart-scatter" cx={px(index)} cy={py(value)} r="6" key={index} />)}
    {kind === "bar" && y.map((value, index) => <rect className="chart-bar" x={px(index) - slot * .32} y={py(value)} width={slot * .64} height={baseY - py(value)} key={index} />)}
    {kind === "barh" && y.map((value, index) => { const row = (height - top - bottom) / y.length; const yPos = top + index * row + row * .16; const barWidth = (value / highY) * (width - left - right); return <g key={index}><text className="chart-tick" x={left - 9} y={yPos + row * .36} textAnchor="end">{x[index]}</text><rect className="chart-bar" x={left} y={yPos} width={barWidth} height={row * .62} /><text className="chart-value" x={left + barWidth + 7} y={yPos + row * .4}>{value}</text></g>; })}
    <text className="chart-title" x={left} y="22">{title}</text><text className="chart-label" x={(left + width - right) / 2} y={height - 10} textAnchor="middle">{kind === "barh" ? yLabel : xLabel}</text>{kind !== "barh" && <text className="chart-label" transform={`translate(16 ${(top + height - bottom) / 2}) rotate(-90)`} textAnchor="middle">{yLabel}</text>}
    {(kind === "line" && secondSeries) && <g className="chart-legend" transform={`translate(${width - 205} 12)`}><circle cx="5" cy="7" r="4" /><text x="14" y="11">{seriesLabel}</text><rect className="chart-marker-secondary" x="96" y="3" width="8" height="8" /><text x="109" y="11">{secondSeries.label}</text></g>}
  </svg></div>;
}
