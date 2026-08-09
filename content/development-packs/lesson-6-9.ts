import type { NumpyDataAnalysisDevelopmentPack } from "@/types/content";

export const numpyDataAnalysisDevelopmentPack: NumpyDataAnalysisDevelopmentPack = {
  kind: "numpy-data-analysis-capstone",
  prerequisite: "Lessons 6.1–6.8 · NumPy foundations",
  storyHook: "The Smart Farm team has one clean table and a real decision to make: which fields are productive, which need irrigation, and how can raw readings become a repeatable analysis instead of disconnected calculations?",
  dataset: {
    columns: ["Field ID", "Temperature", "Humidity", "Soil Moisture", "Crop Yield"],
    values: [[101, 28, 65, 42, 520], [102, 32, 70, 35, 480], [103, 35, 72, 28, 410], [104, 29, 68, 48, 560], [105, 38, 75, 22, 390], [106, 31, 66, 40, 510]],
    shape: "(6, 5)", ndim: 2, size: 30,
  },
  analyses: [
    { id: "average", label: "Feature averages", code: "np.mean(farm_data[:, 1:], axis=0)", explanation: "Calculate one mean for temperature, humidity, moisture, and yield." },
    { id: "highest", label: "Highest yield", code: "farm_data[np.argmax(farm_data[:, 4])]", explanation: "argmax finds the row position; indexing retrieves Field 104 and its full record." },
    { id: "lowest", label: "Lowest yield", code: "farm_data[np.argmin(farm_data[:, 4])]", explanation: "argmin points to Field 105, whose crop yield is 390." },
    { id: "irrigation", label: "Irrigation fields", code: "farm_data[farm_data[:, 3] < 30, 0]", explanation: "A moisture mask selects Field IDs 103 and 105." },
    { id: "sort", label: "Rank by yield", code: "farm_data[np.argsort(farm_data[:, 4])[::-1]]", explanation: "argsort orders complete records from highest to lowest yield." },
    { id: "top3", label: "Top 3 fields", code: "farm_data[np.argsort(farm_data[:, 4])[::-1][:3]]", explanation: "Slice the descending row indices before selecting complete records." },
  ],
  filterColumns: [
    { id: "temperature", label: "Temperature", index: 1 }, { id: "humidity", label: "Humidity", index: 2 },
    { id: "moisture", label: "Soil Moisture", index: 3 }, { id: "yield", label: "Crop Yield", index: 4 },
  ],
  normalization: { code: "(temperature - temperature.min()) / (temperature.max() - temperature.min())", input: [28, 32, 35, 29, 38, 31], output: [0, 0.4, 0.7, 0.1, 1, 0.3], explanation: "Min-max normalization maps the smallest temperature to 0, the largest to 1, and keeps every other reading proportionally between them." },
  derivedMetric: { name: "Yield ÷ Moisture", code: "efficiency = farm_data[:, 4] / farm_data[:, 3]", output: [12.38, 13.71, 14.64, 11.67, 17.73, 12.75], bestField: 105 },
  quickReference: [
    { task: "Rows and columns", code: "arr.shape" }, { task: "Select feature", code: "arr[:, column]" },
    { task: "Column averages", code: "np.mean(arr, axis=0)" }, { task: "Extreme position", code: "np.argmax(arr) / np.argmin(arr)" },
    { task: "Filter rows", code: "arr[condition]" }, { task: "Find positions", code: "np.where(condition)" },
    { task: "Rank records", code: "arr[np.argsort(feature)]" }, { task: "Create status", code: "np.where(condition, yes, no)" },
  ],
  debugChallenges: [
    { title: "Element-wise AND", prompt: "Fix the multi-column filter.", code: "farm_data[farm_data[:, 1] > 30 and farm_data[:, 3] < 30]", mistakesToFind: 2, solution: "farm_data[(farm_data[:, 1] > 30) & (farm_data[:, 3] < 30)]", hiddenGuidance: "Use &, with parentheses around both array comparisons." },
    { title: "Position is not Field ID", prompt: "Why does this return 3 instead of 104?", code: "np.argmax(farm_data[:, 4])", mistakesToFind: 0, solution: "argmax returns row position 3. Use index = np.argmax(farm_data[:, 4]); farm_data[index, 0] to retrieve Field ID 104.", hiddenGuidance: "Use the returned position to index column 0." },
    { title: "Highest first", prompt: "Repair the ranking so the largest yield appears first.", code: "indices = np.argsort(farm_data[:, 4])\nfarm_data[indices]", mistakesToFind: 1, solution: "indices = np.argsort(farm_data[:, 4])[::-1]\nfarm_data[indices]", hiddenGuidance: "Reverse the ascending argsort indices." },
    { title: "Axis meaning", prompt: "Explain how many results this returns.", code: "np.mean(farm_data[:, 1:], axis=0)", mistakesToFind: 0, solution: "Four results: one mean for each selected feature column.", hiddenGuidance: "axis=0 reduces down the six field rows." },
  ],
};
