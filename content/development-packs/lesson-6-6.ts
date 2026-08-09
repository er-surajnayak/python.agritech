import type { NumpyMathStatisticsDevelopmentPack } from "@/types/content";

export const numpyMathStatisticsDevelopmentPack: NumpyMathStatisticsDevelopmentPack = {
  kind: "numpy-math-statistics",
  prerequisite: "Lesson 6.5 · Array Operations & Broadcasting",
  storyHook: "The Smart Farm can transform whole arrays. Now the farmer needs totals, averages, spread, extreme positions, and feature-by-feature summaries that turn sensor readings into decisions.",
  moisture: {
    values: [42, 45, 38, 50, 47, 41, 44], sorted: [38, 41, 42, 44, 45, 47, 50], range: 12,
    statistics: [
      { id: "sum", label: "Sum", code: "np.sum(moisture)", result: "307", meaning: "Total of all seven readings." },
      { id: "mean", label: "Mean", code: "np.mean(moisture)", result: "43.857", meaning: "Sum divided by the number of readings." },
      { id: "median", label: "Median", code: "np.median(moisture)", result: "44", meaning: "Middle value after sorting." },
      { id: "min", label: "Minimum", code: "np.min(moisture)", result: "38", meaning: "Lowest recorded moisture." },
      { id: "max", label: "Maximum", code: "np.max(moisture)", result: "50", meaning: "Highest recorded moisture." },
      { id: "var", label: "Variance", code: "np.var(moisture)", result: "13.551", meaning: "Average squared spread around the mean." },
      { id: "std", label: "Std dev", code: "np.std(moisture)", result: "3.681", meaning: "Typical spread in the original unit." },
      { id: "argmin", label: "Argmin", code: "np.argmin(moisture)", result: "2", meaning: "Index of the lowest reading." },
      { id: "argmax", label: "Argmax", code: "np.argmax(moisture)", result: "3", meaning: "Index of the highest reading." },
    ],
  },
  extremes: { values: [42, 45, 38, 50, 47, 41, 44], minimum: { value: 38, index: 2 }, maximum: { value: 50, index: 3 } },
  spread: { variance: "13.551", standardDeviation: "3.681", explanation: "Variance uses squared distance; standard deviation returns spread to the readings' original unit." },
  mathematical: [
    { id: "sqrt", code: "np.sqrt(values)", input: "[4, 9, 16, 25]", output: "[2. 3. 4. 5.]", meaning: "Square root of each value", focus: true },
    { id: "abs", code: "np.abs(difference)", input: "[-2, 3, -5, 1]", output: "[2 3 5 1]", meaning: "Magnitude without direction", focus: true },
    { id: "round", code: "np.round(values, 2)", input: "[2.345, 4.678, 8.912]", output: "[2.35 4.68 8.91]", meaning: "Round to two decimals", focus: true },
    { id: "power", code: "np.power(values, 2)", input: "[2, 3, 4]", output: "[4 9 16]", meaning: "Raise each value to a power", focus: true },
    { id: "exp", code: "np.exp(values)", input: "[0, 1, 2]", output: "[1. 2.718 7.389]", meaning: "Calculate e raised to each value" },
    { id: "log", code: "np.log(values)", input: "[1, e, e²]", output: "[0. 1. 2.]", meaning: "Natural logarithm" },
    { id: "sin", code: "np.sin(angles)", input: "[0, π/2, π]", output: "[0. 1. 0.]", meaning: "Scientific trigonometric function" },
    { id: "cos", code: "np.cos(angles)", input: "[0, π/2, π]", output: "[1. 0. -1.]", meaning: "Scientific trigonometric function" },
  ],
  axis: {
    matrix: [[28, 65, 40], [30, 70, 42], [31, 68, 38], [29, 72, 41]], columns: ["Temperature", "Humidity", "Soil Moisture"],
    functions: [{ id: "mean", label: "Mean" }, { id: "sum", label: "Sum" }, { id: "min", label: "Minimum" }, { id: "max", label: "Maximum" }, { id: "std", label: "Std dev" }],
    results: {
      mean: { axis0: [29.5, 68.75, 40.25], axis1: [44.33, 47.33, 45.67, 47.33] },
      sum: { axis0: [118, 275, 161], axis1: [133, 142, 137, 142] },
      min: { axis0: [28, 65, 38], axis1: [28, 30, 31, 29] },
      max: { axis0: [31, 72, 42], axis1: [65, 70, 68, 72] },
      std: { axis0: [1.12, 2.59, 1.48], axis1: [15.41, 16.76, 16.05, 18.12] },
    },
  },
  methodEquivalents: [
    { function: "np.sum(arr)", method: "arr.sum()", purpose: "Total" }, { function: "np.mean(arr)", method: "arr.mean()", purpose: "Average" },
    { function: "np.min(arr)", method: "arr.min()", purpose: "Minimum" }, { function: "np.max(arr)", method: "arr.max()", purpose: "Maximum" },
    { function: "np.var(arr)", method: "arr.var()", purpose: "Variance" }, { function: "np.std(arr)", method: "arr.std()", purpose: "Standard deviation" },
  ],
  quickReference: [
    { category: "Statistical", name: "np.sum()", purpose: "Total" }, { category: "Statistical", name: "np.mean()", purpose: "Average" }, { category: "Statistical", name: "np.median()", purpose: "Middle value" },
    { category: "Statistical", name: "np.min() / np.max()", purpose: "Extreme values" }, { category: "Statistical", name: "np.argmin() / np.argmax()", purpose: "Extreme positions" }, { category: "Statistical", name: "np.var() / np.std()", purpose: "Spread" },
    { category: "Mathematical", name: "np.sqrt()", purpose: "Square root" }, { category: "Mathematical", name: "np.abs()", purpose: "Absolute value" }, { category: "Mathematical", name: "np.round()", purpose: "Round decimals" },
    { category: "Mathematical", name: "np.power()", purpose: "Powers" }, { category: "Mathematical", name: "np.exp() / np.log()", purpose: "Exponential and logarithm" }, { category: "Mathematical", name: "np.sin() / np.cos()", purpose: "Trigonometry" },
  ],
  debugChallenges: [
    { title: "Axis does not exist", prompt: "Why does this fail?", code: "data = np.array([10, 20, 30])\nprint(np.mean(data, axis=1))", mistakesToFind: 1, solution: "The 1D array has only axis 0. It has no axis 1.", hiddenGuidance: "Inspect data.ndim and data.shape." },
    { title: "One result per column", prompt: "Predict the number of results.", code: "data = np.array([[10, 20], [30, 40]])\nprint(np.mean(data, axis=0))", mistakesToFind: 0, solution: "[20. 30.] — two results, one for each column.", hiddenGuidance: "axis=0 reduces down the rows." },
    { title: "Position, not value", prompt: "Predict the output.", code: "temperature = np.array([25, 30, 35])\nprint(np.argmax(temperature))", mistakesToFind: 0, solution: "2, because the maximum value 35 is stored at index 2.", hiddenGuidance: "argmax returns an index." },
  ],
};
