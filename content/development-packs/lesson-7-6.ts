import type { PandasGroupByDevelopmentPack } from "@/types/content";

export const pandasGroupByDevelopmentPack: PandasGroupByDevelopmentPack = {
  kind: "pandas-groupby-aggregation",
  prerequisite: "Lesson 7.5 · Data Transformation & Feature Engineering",
  storyHook: "Individual field records explain one location at a time. GroupBy reorganizes those records into crop and region groups so an aggregation can answer comparative farm questions.",
  dataset: {
    columns: ["Field_ID", "Crop", "Region", "Temperature", "Soil_Moisture", "Yield"],
    rows: [
      [101, "Rice", "North", 28, 42, 520], [102, "Rice", "South", 32, 35, 480],
      [103, "Wheat", "North", 35, 28, 410], [104, "Wheat", "South", 29, 48, 560],
      [105, "Rice", "North", 30, 40, 500], [106, "Wheat", "North", 31, 39, 510],
      [107, "Maize", "South", 33, 30, 430], [108, "Maize", "South", 34, 27, 450],
    ],
  },
  groupColumns: ["Crop", "Region"],
  metricColumns: ["Yield", "Temperature", "Soil_Moisture", "Field_ID"],
  aggregations: [
    { id: "mean", label: "Mean", explanation: "Average value per group." },
    { id: "sum", label: "Sum", explanation: "Total value per group." },
    { id: "min", label: "Minimum", explanation: "Smallest value in each group." },
    { id: "max", label: "Maximum", explanation: "Largest value in each group." },
    { id: "median", label: "Median", explanation: "Middle value after sorting each group." },
    { id: "count", label: "Count", explanation: "Number of non-missing metric values." },
    { id: "std", label: "Standard deviation", explanation: "Sample variation within each group; one-row groups return NaN." },
  ],
  aggOptions: [
    { column: "Yield", functions: ["mean", "min", "max"] },
    { column: "Soil_Moisture", functions: ["mean", "min"] },
    { column: "Temperature", functions: ["mean", "max"] },
  ],
  quickReference: [
    { task: "Group data", code: "df.groupby(...)" }, { task: "Group mean", code: `df.groupby("Crop")["Yield"].mean()` },
    { task: "Common summaries", code: ".sum() · .min() · .max() · .median() · .std()" }, { task: "Count values", code: ".count()" },
    { task: "Count rows", code: ".size()" }, { task: "Multiple groups", code: `df.groupby(["Crop", "Region"])` },
    { task: "Multiple functions", code: `.agg(["mean", "min", "max"])` }, { task: "Per-column rules", code: ".agg({...})" },
    { task: "Named output", code: `.agg(name=("column", "mean"))` }, { task: "Keep group column", code: "groupby(..., as_index=False)" },
    { task: "Restore column", code: ".reset_index()" }, { task: "Row-aligned group value", code: `.transform("mean")` },
    { task: "Sort summary", code: ".sort_values(...)" }, { task: "Filter summary", code: `summary[summary["Yield"] > 480]` },
  ],
  debugChallenges: [
    { title: "Grouped object is not a summary", prompt: "Calculate average Yield by Crop.", code: `df.groupby("Crop")`, mistakesToFind: 1, solution: `df.groupby("Crop")["Yield"].mean()`, hiddenGuidance: "Choose a metric column and aggregation after grouping." },
    { title: "count versus size", prompt: "Count every row even when Yield is missing.", code: `df.groupby("Crop")["Yield"].count()`, mistakesToFind: 1, solution: `df.groupby("Crop").size()`, hiddenGuidance: "count ignores missing values in its selected column; size counts group rows." },
    { title: "Summary cannot align to rows", prompt: "Attach each crop's mean Yield to every original record.", code: `df["Crop_Avg_Yield"] = df.groupby("Crop")["Yield"].mean()`, mistakesToFind: 1, solution: `df["Crop_Avg_Yield"] = df.groupby("Crop")["Yield"].transform("mean")`, hiddenGuidance: "transform returns one aligned value per original row." },
    { title: "Sort the values, not crop labels", prompt: "Rank the summary by average_yield descending.", code: `summary.sort_index(ascending=False)`, mistakesToFind: 1, solution: `summary.sort_values("average_yield", ascending=False)`, hiddenGuidance: "sort_index orders labels; sort_values orders the metric." },
  ],
};
