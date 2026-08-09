import type { NumpyIntroductionDevelopmentPack } from "@/types/content";

export const numpyIntroductionDevelopmentPack: NumpyIntroductionDevelopmentPack = {
  kind: "numpy-introduction",
  prerequisite: "Module 5 · Object-Oriented Programming fundamentals",
  storyHook:
    "The Smart Farm now receives thousands of temperature, moisture, humidity, and rainfall readings. Processing each number through a Python loop works, but numerical analysis needs a structure designed to transform whole datasets at once.",
  definition: {
    title: "NumPy is Numerical Python",
    body:
      "NumPy is the foundational Python library for efficient numerical and scientific computing. Its central object is ndarray: an N-dimensional array built for consistent numerical data and fast array operations.",
    expansion: "Numerical Python",
    applications: ["Numerical computing", "Data science", "Machine learning", "Matrix operations", "Scientific analysis", "Data preprocessing"],
  },
  vectorization: {
    title: "Operate on the entire sensor array",
    body:
      "A Python List needs an explicit loop to update every reading. A NumPy array expresses the same transformation once and applies it element by element. This is called vectorized computation.",
    listCode: `moisture = [20, 25, 30, 35, 40]
updated = []

for value in moisture:
    updated.append(value * 1.05)`,
    numpyCode: `import numpy as np

moisture = np.array([20, 25, 30, 35, 40])
updated = moisture * 1.05`,
    output: "[21.   26.25 31.5  36.75 42.  ]",
  },
  comparison: [
    { feature: "Primary purpose", pythonList: "General-purpose data", numpyArray: "Numerical data" },
    { feature: "Element-wise maths", pythonList: "Requires iteration", numpyArray: "Direct array operations" },
    { feature: "Multiple dimensions", pythonList: "Possible but awkward", numpyArray: "Designed for N dimensions" },
    { feature: "Numerical functions", pythonList: "Limited built-ins", numpyArray: "Extensive scientific API" },
    { feature: "Numerical performance", pythonList: "Higher Python overhead", numpyArray: "Generally much faster" },
    { feature: "Data science and ML", pythonList: "Useful for small inputs", numpyArray: "Foundational structure" },
  ],
  sensorExamples: [
    { label: "Temperature", values: [28, 30, 31, 29, 32], unit: "°C" },
    { label: "Soil moisture", values: [35, 42, 38, 45, 40], unit: "%" },
    { label: "Humidity", values: [65, 70, 72, 68, 75], unit: "%" },
  ],
  dimensions: [
    {
      dimension: "1D",
      title: "One sequence of readings",
      description: "A single row represents temperature readings collected over five periods.",
      code: "temperature = np.array([28, 30, 31, 29, 32])",
    },
    {
      dimension: "2D",
      title: "Rows and columns",
      description: "Each row represents a field and each column represents a sensor position.",
      code: `soil = np.array([
    [35, 40, 42],
    [45, 38, 41],
    [30, 36, 39]
])`,
    },
    {
      dimension: "3D",
      title: "A stack of 2D datasets",
      description: "Conceptually, multiple farms can contain multiple fields, and each field can contain multiple sensor readings. Detailed 3D work comes later.",
      code: "farms → fields → sensor readings",
    },
  ],
  creationFunctions: [
    { name: "np.array()", code: "np.array([10, 20, 30])", output: "[10 20 30]", purpose: "Convert existing values into an ndarray" },
    { name: "np.zeros()", code: "np.zeros(5)", output: "[0. 0. 0. 0. 0.]", purpose: "Create a zero-filled array" },
    { name: "np.ones()", code: "np.ones(5)", output: "[1. 1. 1. 1. 1.]", purpose: "Create a one-filled array" },
    { name: "np.arange()", code: "np.arange(1, 10)", output: "[1 2 3 4 5 6 7 8 9]", purpose: "Create values using start, stop, and step" },
    { name: "np.linspace()", code: "np.linspace(0, 100, 5)", output: "[  0.  25.  50.  75. 100.]", purpose: "Create a requested count of evenly spaced values" },
  ],
  spacingComparison: [
    { name: "arange", mentalModel: "Choose the step", code: "np.arange(0, 10, 2)", output: "[0 2 4 6 8]" },
    { name: "linspace", mentalModel: "Choose the number of values", code: "np.linspace(0, 10, 5)", output: "[ 0.   2.5  5.   7.5 10. ]" },
  ],
  dataTypes: [
    { name: "int", example: "np.array([28, 30, 31])", description: "Whole-number readings" },
    { name: "float", example: "np.array([28.5, 30.2])", description: "Decimal measurements" },
    { name: "bool", example: "np.array([True, False])", description: "Sensor state flags" },
    { name: "complex", example: "np.array([1 + 2j])", description: "Specialized scientific calculations" },
  ],
  attributeExample: {
    code: `arr = np.array([
    [28, 30, 31],
    [29, 32, 30]
])`,
    values: [[28, 30, 31], [29, 32, 30]],
    attributes: [
      { name: "ndim", value: "2", meaning: "Number of dimensions" },
      { name: "shape", value: "(2, 3)", meaning: "Two rows and three columns" },
      { name: "size", value: "6", meaning: "Total number of elements" },
      { name: "dtype", value: "int64*", meaning: "Compatible integer storage (*platform-dependent width)" },
    ],
  },
  firstCalculation: {
    readings: [28, 30, 31, 29, 32],
    code: `temperature = np.array([28, 30, 31, 29, 32])

print(np.mean(temperature))
print(np.max(temperature))
print(np.min(temperature))`,
    output: "30.0\n32\n28",
  },
  mlPipeline: ["Raw sensor data", "NumPy arrays", "Cleaning and transformation", "Feature engineering", "Machine-learning model"],
  practicePrompts: [
    { title: "Inspect rainfall", prompt: "Create rainfall = np.array([12, 8, 15, 20, 5]) and inspect ndim, shape, size, and dtype." },
    { title: "Predict arange", prompt: "Create values from 10 through 50 in steps of 10, then predict the output before running it.", code: "np.arange(10, 51, 10)" },
    { title: "Create equal intervals", prompt: "Create five equally spaced values between 20 and 40 using np.linspace()." },
    { title: "Model three fields", prompt: "Create a 3 × 3 array representing soil-moisture readings for three fields." },
  ],
};
