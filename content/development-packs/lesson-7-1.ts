import type { PandasSeriesDevelopmentPack } from "@/types/content";

export const pandasSeriesDevelopmentPack: PandasSeriesDevelopmentPack = {
  kind: "pandas-introduction-series",
  prerequisite: "Module 6 · Scientific Computing with NumPy",
  storyHook: "NumPy gave the Smart Farm fast numerical arrays. The next challenge is meaning: analysts want a temperature labeled Farm A, not merely value 28 at position 0.",
  comparison: [
    { feature: "Primary strength", numpy: "Numerical arrays", pandas: "Labeled tabular data" },
    { feature: "1D structure", numpy: "ndarray", pandas: "Series" },
    { feature: "Element identity", numpy: "Position", pandas: "Position + label" },
    { feature: "Typical work", numpy: "Vectorized mathematics", pandas: "Cleaning and analysis" },
  ],
  series: { values: [28, 32, 35, 29], labels: ["Farm A", "Farm B", "Farm C", "Farm D"], name: "Temperature" },
  operations: [
    { id: "create", label: "Create Series", code: "pd.Series([28, 32, 35, 29], index=['Farm A', 'Farm B', 'Farm C', 'Farm D'])", output: "Farm A  28\nFarm B  32\nFarm C  35\nFarm D  29", explanation: "A Series pairs every value with an index label." },
    { id: "index", label: "Show index", code: "temperature.index", output: "Index(['Farm A', 'Farm B', 'Farm C', 'Farm D'])", explanation: "The index carries the labels used to identify values." },
    { id: "values", label: "Show values", code: "temperature.values", output: "[28 32 35 29]", explanation: "The underlying numerical values remain vectorized." },
    { id: "loc", label: "Label access", code: "temperature.loc['Farm A']", output: "28", explanation: "loc selects by label." },
    { id: "iloc", label: "Position access", code: "temperature.iloc[0]", output: "28", explanation: "iloc selects by integer position." },
    { id: "filter", label: "Filter > 30", code: "temperature[temperature > 30]", output: "Farm B  32\nFarm C  35", explanation: "The Boolean condition keeps both matching values and their labels." },
    { id: "statistics", label: "Statistics", code: "temperature.describe()", output: "count 4.00\nmean 31.00\nstd  3.16\nmin 28.00\nmax 35.00", explanation: "describe summarizes count, center, spread, and range." },
  ],
  properties: [
    { name: ".shape", result: "(4,)", purpose: "Series dimensions" }, { name: ".size", result: "4", purpose: "Number of values" },
    { name: ".dtype", result: "int64", purpose: "Value data type" }, { name: ".index", result: "Farm labels", purpose: "Label axis" },
    { name: ".values", result: "[28 32 35 29]", purpose: "Underlying values" },
  ],
  methods: [
    { name: ".mean()", result: "31.0", purpose: "Average" }, { name: ".sum()", result: "124", purpose: "Total" },
    { name: ".min()", result: "28", purpose: "Minimum" }, { name: ".max()", result: "35", purpose: "Maximum" },
    { name: ".median()", result: "30.5", purpose: "Middle value" }, { name: ".std()", result: "3.16", purpose: "Sample standard deviation" },
    { name: ".describe()", result: "summary", purpose: "Descriptive statistics" },
  ],
  moisture: { values: [42, 35, 28, 48, 22, 40], labels: [101, 102, 103, 104, 105, 106], threshold: 30, matches: [{ label: 103, value: 28 }, { label: 105, value: 22 }] },
  quickReference: [
    { task: "Import", code: "import pandas as pd" }, { task: "Create Series", code: "pd.Series(data, index=labels)" },
    { task: "Position access", code: "series.iloc[0]" }, { task: "Label access", code: "series.loc['Farm A']" },
    { task: "Inspect labels", code: "series.index" }, { task: "Inspect values", code: "series.values" },
    { task: "Average", code: "series.mean()" }, { task: "Filter", code: "series[series > 30]" },
  ],
  debugChallenges: [
    { title: "Label or position?", prompt: "Select Farm A explicitly by label.", code: "temperature.iloc['Farm A']", mistakesToFind: 1, solution: "temperature.loc['Farm A']", hiddenGuidance: "loc uses labels; iloc uses integer positions." },
    { title: "Position access", prompt: "Select the first item by position.", code: "temperature.loc[0]", mistakesToFind: 1, solution: "temperature.iloc[0]", hiddenGuidance: "The custom index contains farm names, not integer label 0." },
    { title: "Filtered labels", prompt: "Predict which labels remain.", code: "temperature[temperature > 30]", mistakesToFind: 0, solution: "Farm B (32) and Farm C (35).", hiddenGuidance: "The condition is applied to values while labels remain attached." },
  ],
};
