import type { NumpyArrayAttributesDevelopmentPack } from "@/types/content";

export const numpyArrayAttributesDevelopmentPack: NumpyArrayAttributesDevelopmentPack = {
  kind: "numpy-array-attributes",
  prerequisite: "Lesson 6.2 · Creating NumPy Arrays",
  storyHook: "The Smart Farm can create arrays, but an engineer must inspect their structure, storage type, and memory footprint before trusting them in a calculation or model.",
  sensorDataset: {
    code: `sensor_data = np.array([
    [28, 65, 40],
    [30, 70, 42],
    [31, 68, 38],
    [29, 72, 41]
])`,
    values: [[28, 65, 40], [30, 70, 42], [31, 68, 38], [29, 72, 41]],
    columns: ["Temperature", "Humidity", "Moisture"],
    questions: ["How many axes?", "How large is each axis?", "How many readings?", "Which dtype?", "How much element memory?"],
  },
  attributes: [
    { id: "ndim", name: "arr.ndim", question: "How many axes?", value: "2", meaning: "Two axes: rows and columns.", code: "print(sensor_data.ndim)" },
    { id: "shape", name: "arr.shape", question: "How large is each axis?", value: "(4, 3)", meaning: "Four field rows and three sensor columns.", code: "print(sensor_data.shape)" },
    { id: "size", name: "arr.size", question: "How many values?", value: "12", meaning: "4 × 3 gives twelve total readings.", code: "print(sensor_data.size)" },
    { id: "dtype", name: "arr.dtype", question: "What storage type?", value: "integer dtype", meaning: "NumPy stores every value using one compatible integer type.", code: "print(sensor_data.dtype)" },
    { id: "itemsize", name: "arr.itemsize", question: "Bytes per value?", value: "platform dependent", meaning: "Memory occupied by one array element.", code: "print(sensor_data.itemsize)" },
    { id: "nbytes", name: "arr.nbytes", question: "Total element memory?", value: "size × itemsize", meaning: "Total bytes occupied by the array elements.", code: "print(sensor_data.nbytes)" },
  ],
  dimensions: [
    { id: "1D", description: "One axis", values: [[[10, 20, 30, 40]]], ndim: 1, shape: "(4,)", size: 4, farmMeaning: "Readings from one sensor" },
    { id: "2D", description: "Rows and columns", values: [[[10, 20], [30, 40]]], ndim: 2, shape: "(2, 2)", size: 4, farmMeaning: "Fields × sensor readings" },
    { id: "3D", description: "Multiple 2D layers", values: [[[10, 20], [30, 40]], [[50, 60], [70, 80]]], ndim: 3, shape: "(2, 2, 2)", size: 8, farmMeaning: "Farms × fields × sensors" },
  ],
  dataTypes: [
    { name: "int", meaning: "Whole numbers", example: "25", focus: true },
    { name: "float", meaning: "Decimal values", example: "25.5", focus: true },
    { name: "bool", meaning: "True or False", example: "True", focus: true },
    { name: "complex", meaning: "Complex numbers", example: "2+3j" },
    { name: "str", meaning: "Text values", example: "Healthy" },
  ],
  conversion: {
    creationCode: "temperature = np.array([28, 30, 31], dtype=float)",
    creationOutput: "[28. 30. 31.]",
    existingCode: `values = np.array([10.5, 20.8, 30.2])
integers = values.astype(int)`,
    existingOutput: "[10 20 30]",
    warning: "float → int removes the fractional portion; it does not perform normal rounding.",
  },
  memory: {
    formula: "nbytes = size × itemsize",
    platformNote: "Exact dtype, itemsize, and nbytes can vary with the dtype and platform. Inspect the array instead of assuming a fixed byte count.",
    example: "3 elements × 8 bytes = 24 bytes (when dtype is int64)",
  },
  reshapePreview: {
    code: `arr = np.arange(12)
matrix = arr.reshape(3, 4)`,
    fromShape: "(12,)",
    toShape: "(3, 4)",
    rule: "The element count must stay equal: 3 × 4 = 12. Reshaping is taught fully in Lesson 6.4.",
  },
  quickReference: [
    { name: "arr.ndim", purpose: "Number of dimensions", kind: "attribute" },
    { name: "arr.shape", purpose: "Size of each dimension", kind: "attribute" },
    { name: "arr.size", purpose: "Total number of elements", kind: "attribute" },
    { name: "arr.dtype", purpose: "Element storage type", kind: "attribute" },
    { name: "arr.itemsize", purpose: "Bytes per element", kind: "attribute" },
    { name: "arr.nbytes", purpose: "Total element bytes", kind: "attribute" },
    { name: "arr.astype()", purpose: "Convert an existing array", kind: "method" },
    { name: "arr.reshape()", purpose: "Change shape without changing data", kind: "preview" },
  ],
  debugChallenges: [
    { title: "Attribute or method?", prompt: "Why does this fail?", code: "print(arr.shape())", mistakesToFind: 1, solution: "print(arr.shape)", hiddenGuidance: "shape is stored information, so access it without parentheses." },
    { title: "Conversion result", prompt: "Predict the result and explain the missing decimals.", code: "np.array([10.5, 20.8, 30.2]).astype(int)", mistakesToFind: 0, solution: "array([10, 20, 30])", hiddenGuidance: "Integer conversion truncates the fractional part." },
    { title: "Inspect a zero grid", prompt: "Predict shape, ndim, and size.", code: "arr = np.zeros((4, 5))", mistakesToFind: 0, solution: "shape=(4, 5), ndim=2, size=20", hiddenGuidance: "Multiply the two shape values to find size." },
  ],
};
