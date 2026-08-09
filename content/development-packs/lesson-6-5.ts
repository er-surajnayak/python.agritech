import type { NumpyOperationsDevelopmentPack } from "@/types/content";

export const numpyOperationsDevelopmentPack: NumpyOperationsDevelopmentPack = {
  kind: "numpy-operations-broadcasting",
  prerequisite: "Lesson 6.4 · Indexing, Slicing & Reshaping",
  storyHook: "The Smart Farm can select exact readings. Now it must calibrate every sensor, convert units, compare thresholds, and combine datasets without writing a Python loop for each value.",
  vectorization: {
    listCode: `result = []
for value in temperature:
    result.append(value + 2)`,
    numpyCode: "result = temperature + 2",
    result: "[30 32 34 31]",
    explanation: "A vectorized expression describes the operation for the complete numerical array.",
  },
  arithmetic: [
    { id: "add", operator: "+", left: [10, 20, 30], right: [1, 2, 3], output: "[11 22 33]", meaning: "Pairwise addition" },
    { id: "subtract", operator: "−", left: [30, 35, 40], right: [28, 30, 38], output: "[2 5 2]", meaning: "Difference from baseline" },
    { id: "multiply", operator: "×", left: [10, 20, 30], right: [5, 6, 4], output: "[50 120 120]", meaning: "Element-wise multiplication" },
    { id: "divide", operator: "÷", left: [100, 200, 300], right: [5, 10, 15], output: "[20. 20. 20.]", meaning: "Element-wise division" },
    { id: "power", operator: "**", left: [2, 3, 4], scalar: 2, output: "[4 9 16]", meaning: "Raise each element to a power" },
    { id: "modulo", operator: "%", left: [10, 11, 12, 13], scalar: 2, output: "[0 1 0 1]", meaning: "Element-wise remainder" },
  ],
  celsius: { code: "temperature_f = (temperature_c * 9/5) + 32", input: [20, 25, 30, 35], output: [68, 77, 86, 95], formula: "F = (C × 9/5) + 32" },
  comparisons: [
    { code: "temperature > 30", output: "[False False  True False  True]", meaning: "One Boolean result per reading." },
    { code: "actual > limit", output: "[False  True  True]", meaning: "Compare corresponding array elements." },
    { code: "temperature == 30", output: "[False  True False False False]", meaning: "Equality is also element-wise." },
  ],
  booleanSum: { code: "np.array([True, False, True, True]).sum()", output: "3", meaning: "True behaves like 1 and False like 0 in this count." },
  broadcasting: {
    matrix: [[28, 65, 40], [30, 70, 42], [31, 68, 38]],
    rowOffset: [1, 2, 3],
    rowResult: [[29, 67, 43], [31, 72, 45], [32, 70, 41]],
    columnMatrix: [[10, 20, 30], [40, 50, 60]],
    columnOffset: [[1], [2]],
    columnResult: [[11, 21, 31], [42, 52, 62]],
  },
  rules: {
    statements: ["Compare dimensions from right to left.", "Dimensions are compatible when equal or when one is 1."],
    compatible: [{ left: "(3, 3)", right: "(3,)", result: "3 = 3" }, { left: "(3, 4)", right: "(4,)", result: "4 = 4" }, { left: "(2, 3)", right: "(2, 1)", result: "3 vs 1, then 2 = 2" }],
    incompatible: [{ left: "(3, 4)", right: "(3,)", reason: "Rightmost 4 vs 3; neither is 1." }, { left: "(2, 3)", right: "(2,)", reason: "Rightmost 3 vs 2; neither is 1." }],
  },
  calibration: {
    matrix: [[28, 65, 40], [30, 70, 42], [31, 68, 38], [29, 72, 41]],
    offset: [1, -2, 3],
    result: [[29, 63, 43], [31, 68, 45], [32, 66, 41], [30, 70, 44]],
    columns: ["Temperature", "Humidity", "Moisture"],
  },
  operatorReference: [
    { operator: "+", meaning: "Addition", example: "a + b" }, { operator: "-", meaning: "Subtraction", example: "a - b" },
    { operator: "*", meaning: "Element-wise multiplication", example: "a * b" }, { operator: "/", meaning: "Division", example: "a / b" },
    { operator: "//", meaning: "Floor division", example: "a // b" }, { operator: "%", meaning: "Modulo", example: "a % 2" },
    { operator: "**", meaning: "Power", example: "a ** 2" },
  ],
  comparisonReference: [
    { operator: ">", meaning: "Greater than" }, { operator: "<", meaning: "Less than" }, { operator: ">=", meaning: "Greater than or equal" },
    { operator: "<=", meaning: "Less than or equal" }, { operator: "==", meaning: "Equal" }, { operator: "!=", meaning: "Not equal" },
  ],
  multiplyComparison: { elementWise: "a * b", elementOutput: "[4 10 18]", matrix: "a @ b", matrixOutput: "32", explanation: "* multiplies corresponding elements. @ performs matrix multiplication; linear algebra details are deferred." },
  quickReference: [
    { concept: "Add arrays", example: "a + b" }, { concept: "Scalar operation", example: "a + 5" }, { concept: "Power", example: "a ** 2" },
    { concept: "Comparison", example: "a > 10" }, { concept: "Element-wise multiply", example: "a * b" }, { concept: "Matrix multiply", example: "a @ b" },
    { concept: "Broadcasting", example: "matrix + vector" },
  ],
  debugChallenges: [
    { title: "Incompatible arrays", prompt: "Why does addition fail?", code: "a = np.array([10, 20, 30])\nb = np.array([1, 2])\nprint(a + b)", mistakesToFind: 1, solution: "Shapes (3,) and (2,) do not match, and neither dimension is 1.", hiddenGuidance: "Compare the rightmost dimensions." },
    { title: "Scalar prediction", prompt: "Predict the output.", code: "arr = np.array([10, 20, 30])\nprint(arr * 2)", mistakesToFind: 0, solution: "[20 40 60]", hiddenGuidance: "The scalar is applied to every element." },
    { title: "Two multiplication symbols", prompt: "Explain why these operations differ.", code: "print(a * b)\nprint(a @ b)", mistakesToFind: 0, solution: "* is element-wise multiplication; @ is matrix multiplication.", hiddenGuidance: "One returns pairwise products; the other combines products into a dot product for 1D arrays." },
  ],
};
