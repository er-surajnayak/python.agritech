export type BoxSummary = { min: number; q1: number; median: number; q3: number; max: number; iqr: number; lower: number; upper: number; outliers: number[] };

export function quantile(values: number[], q: number) { const sorted = [...values].sort((a, b) => a - b); const position = (sorted.length - 1) * q; const base = Math.floor(position); const rest = position - base; return sorted[base + 1] === undefined ? sorted[base] : sorted[base] + rest * (sorted[base + 1] - sorted[base]); }

export function summarizeBox(values: number[]): BoxSummary { const q1 = quantile(values, .25); const median = quantile(values, .5); const q3 = quantile(values, .75); const iqr = q3 - q1; const lower = q1 - 1.5 * iqr; const upper = q3 + 1.5 * iqr; const regular = values.filter((value) => value >= lower && value <= upper); return { min: Math.min(...regular), q1, median, q3, max: Math.max(...regular), iqr, lower, upper, outliers: values.filter((value) => value < lower || value > upper) }; }
