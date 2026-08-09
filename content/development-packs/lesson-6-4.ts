import type { NumpyIndexingDevelopmentPack } from "@/types/content";

export const numpyIndexingDevelopmentPack: NumpyIndexingDevelopmentPack = {
  kind: "numpy-indexing-reshaping",
  prerequisite: "Lesson 6.3 · Array Attributes & Data Types",
  storyHook: "The Smart Farm has complete arrays, but engineers rarely need every reading at once. They must select one sensor, extract field regions, correct values, and rearrange data without changing the underlying element count.",
  oneDimensional: {
    values: [28, 30, 31, 29, 32],
    examples: [
      { code: "temperature[0]", output: "28", meaning: "First element; indexing starts at zero." },
      { code: "temperature[2]", output: "31", meaning: "Third element lives at index 2." },
      { code: "temperature[-1]", output: "32", meaning: "Last element from the end." },
      { code: "temperature[-2]", output: "29", meaning: "Second-last element." },
    ],
  },
  matrix: {
    name: "sensor_data",
    values: [[28, 65, 40], [30, 70, 42], [31, 68, 38], [29, 72, 41]],
    columns: ["Temperature", "Humidity", "Soil Moisture"],
    examples: [
      { code: "sensor_data[1, 2]", output: "42", meaning: "Row 1, column 2." },
      { code: "sensor_data[0]", output: "[28 65 40]", meaning: "Select the first row." },
      { code: "sensor_data[:, 1]", output: "[65 70 68 72]", meaning: "All rows from humidity column 1." },
      { code: "sensor_data[:, 2]", output: "[40 42 38 41]", meaning: "All soil-moisture readings." },
    ],
  },
  slices: [
    { code: "temperature[1:4]", output: "[30 31 29]", meaning: "Start included; stop excluded." },
    { code: "temperature[:3]", output: "[28 30 31]", meaning: "From the beginning through index 2." },
    { code: "temperature[2:]", output: "[31 29 32]", meaning: "From index 2 to the end." },
    { code: "temperature[::2]", output: "[28 31 32]", meaning: "Every second value." },
    { code: "temperature[::-1]", output: "[32 29 31 30 28]", meaning: "A step of -1 moves backward." },
    { code: "sensor_data[:2, :2]", output: "[[28 65]\n [30 70]]", meaning: "First two rows and first two columns." },
  ],
  modification: [
    { code: "temperature[2] = 35", before: "[28 30 31 29 32]", after: "[28 30 35 29 32]", meaning: "Replace one selected value." },
    { code: "temperature[1:3] = 99", before: "[28 30 31 29 32]", after: "[28 99 99 29 32]", meaning: "Broadcast one value across a selected slice." },
    { code: "soil[1, 2] = 50", before: "41", after: "50", meaning: "Correct one row-column reading." },
  ],
  booleanIndexing: {
    values: [28, 30, 35, 29, 38],
    condition: "temperature > 30",
    mask: "[False False  True False  True]",
    code: "temperature[temperature > 30]",
    output: "[35 38]",
    note: "This is only a bridge to filtering; Lesson 6.7 explores masks and searching deeply.",
  },
  reshape: {
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    validShapes: ["(3, 4)", "(2, 6)", "(1, 12)", "(12, 1)"],
    invalidShape: "(5, 3)",
    autoExamples: [
      { code: "data.reshape(3, -1)", shape: "(3, 4)" },
      { code: "data.reshape(-1, 2)", shape: "(6, 2)" },
    ],
  },
  flattening: [
    { name: "flatten", code: "matrix.flatten()", output: "[1 2 3 4 5 6]", behavior: "Returns a new 1D copy." },
    { name: "ravel", code: "matrix.ravel()", output: "[1 2 3 4 5 6]", behavior: "Usually returns a view when possible, so it is often more memory-efficient." },
  ],
  transpose: {
    values: [[1, 2, 3], [4, 5, 6]],
    code: "matrix.T",
    output: "[[1 4]\n [2 5]\n [3 6]]",
    fromShape: "(2, 3)",
    toShape: "(3, 2)",
  },
  quickReference: [
    { operation: "First element", example: "arr[0]", purpose: "Access" },
    { operation: "Last element", example: "arr[-1]", purpose: "Access from end" },
    { operation: "2D element", example: "arr[1, 2]", purpose: "Row-column access" },
    { operation: "Row", example: "arr[0]", purpose: "Select one row" },
    { operation: "Column", example: "arr[:, 1]", purpose: "Select one column" },
    { operation: "Slice", example: "arr[1:4]", purpose: "Select a range" },
    { operation: "Step", example: "arr[::2]", purpose: "Every second value" },
    { operation: "Reverse", example: "arr[::-1]", purpose: "Reverse order" },
    { operation: "Reshape", example: "arr.reshape(3, 4)", purpose: "Change structure" },
    { operation: "Flatten", example: "arr.flatten()", purpose: "Create a 1D copy" },
    { operation: "Ravel", example: "arr.ravel()", purpose: "Get a 1D representation" },
    { operation: "Transpose", example: "arr.T", purpose: "Swap rows and columns" },
  ],
  debugChallenges: [
    { title: "Index out of range", prompt: "Why does this fail?", code: "arr = np.array([10, 20, 30])\nprint(arr[3])", mistakesToFind: 1, solution: "Use arr[0], arr[1], or arr[2]. The last valid index is 2.", hiddenGuidance: "Three values have indices 0 through 2." },
    { title: "Invalid reshape", prompt: "Why can twelve values not use this shape?", code: "arr = np.arange(12)\narr.reshape(5, 3)", mistakesToFind: 1, solution: "5 × 3 = 15, but arr contains 12 elements. Use a shape whose product is 12.", hiddenGuidance: "Multiply the requested rows and columns." },
    { title: "Missing column", prompt: "Find the invalid coordinate.", code: "arr = np.array([[10, 20], [30, 40]])\nprint(arr[1, 2])", mistakesToFind: 1, solution: "Column 2 does not exist; valid column indices are 0 and 1.", hiddenGuidance: "The array has only two columns." },
  ],
};
