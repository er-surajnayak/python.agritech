import { numpyIntroductionDevelopmentPack } from "@/content/development-packs/lesson-6-1";
import type { LessonDocument } from "@/types/content";

export const moduleSixLessons: LessonDocument[] = [
  {
    id: "module-6-lesson-1",
    moduleId: "module-6",
    number: "6.1",
    title: "Introduction to NumPy: Numerical Computing for Smart Agriculture",
    summary:
      "Discover why numerical datasets need NumPy, create 1D and 2D arrays, inspect their core attributes, and perform a first whole-array Smart Farm analysis.",
    durationMinutes: 120,
    level: "Intermediate",
    introduction: {
      title: "From Python collections to numerical datasets",
      body: "The Smart Farm has moved beyond dozens of values. Thousands of sensor readings now arrive every minute, and numerical work needs a structure designed for fast, consistent array operations.",
    },
    objectives: [
      "Explain what NumPy is and why numerical computing needs it",
      "Compare Python Lists with NumPy arrays",
      "Import NumPy using the standard np alias",
      "Create basic 1D and 2D ndarray objects",
      "Use array(), zeros(), ones(), arange(), and linspace()",
      "Distinguish arange() from linspace()",
      "Inspect ndim, shape, size, and dtype",
      "Calculate mean, minimum, and maximum sensor readings",
    ],
    whyThisMatters: {
      title: "Numerical data should be processed as data, not one value at a time",
      body: "NumPy expresses transformations over entire arrays. That makes sensor analysis shorter, clearer, and generally far more efficient than repeated Python-level operations.",
      items: [
        "Transform complete telemetry arrays with one expression",
        "Represent field-by-sensor grids naturally",
        "Use a rich library of numerical functions",
        "Prepare data for Pandas and machine-learning tools",
      ],
    },
    industryMotivation: {
      title: "NumPy is the common numerical language of Python data tools",
      body: "Pandas, scikit-learn, computer vision, scientific libraries, and many machine-learning workflows build on or exchange data through array-shaped numerical structures.",
      items: [
        "IoT systems batch telemetry into numerical arrays",
        "Data pipelines clean and transform array values",
        "ML models consume matrices of numerical features",
        "Scientific code uses vectorized mathematics instead of Python loops",
      ],
      signal: "Learning ndarray now prepares you for Pandas, model training, image data, and larger scientific workflows.",
    },
    concept: {
      title: "ndarray means N-dimensional array",
      body: "A NumPy ndarray stores compatible values in one or more dimensions. One dimension looks like a sequence, two dimensions form a row-column grid, and higher dimensions stack those structures.",
      items: ["Ordered numerical values", "One or more dimensions", "A consistent compatible dtype", "Direct element-wise operations"],
    },
    workflow: {
      title: "The first NumPy analysis workflow",
      description: "Move from raw farm readings to a useful numerical result.",
      steps: [
        { title: "Import", description: "Use import numpy as np, the standard community alias." },
        { title: "Create", description: "Convert sensor readings with np.array()." },
        { title: "Inspect", description: "Check ndim, shape, size, and dtype before analysis." },
        { title: "Calculate", description: "Apply np.mean(), np.min(), or np.max() to the entire array." },
        { title: "Interpret", description: "Connect the numerical result back to farm conditions." },
      ],
    },
    agritechExample: {
      title: "One array, five temperature readings",
      body: "A dashboard can store five readings in one ndarray, calculate their average, find the highest temperature, and detect the lowest reading without manually processing each value.",
    },
    playground: {
      title: "Run Your First NumPy Sensor Analysis",
      description: "Edit the readings, run NumPy in the browser, and inspect the detected array structure below the console.",
      starterCode: `import numpy as np

temperature = np.array([28, 30, 31, 29, 32])

print("Temperature:", temperature)
print("Average:", np.mean(temperature))
print("Maximum:", np.max(temperature))
print("Minimum:", np.min(temperature))`,
      expectedOutcome: "The array prints with an average of 30.0, a maximum of 32, and a minimum of 28.",
    },
    practice: [
      {
        level: "Easy",
        title: "Inspect a rainfall array",
        prompt: "Create rainfall = np.array([12, 8, 15, 20, 5]) and print its ndim, shape, size, and dtype.",
        guidance: "Access each property directly from rainfall; do not add parentheses.",
      },
      {
        level: "Medium",
        title: "Generate irrigation settings",
        prompt: "Use np.arange() to create 10, 20, 30, 40, 50, then use np.linspace() to create five values from 20 to 40.",
        guidance: "arange is controlled by step; linspace is controlled by the requested count.",
      },
      {
        level: "Challenge",
        title: "Create a field matrix",
        prompt: "Create a 3 × 3 soil-moisture array and print its shape, mean, minimum, and maximum.",
        guidance: "Use three nested rows inside np.array(), then apply the functions to the full array.",
      },
    ],
    quiz: [
      { title: "Library name", question: "What does NumPy stand for?", options: ["Number Python", "Numerical Python", "New Python", "Normalized Python"], correctOptionIndex: 1, note: "NumPy focuses on numerical computing.", explanation: "The name is short for Numerical Python." },
      { title: "Standard alias", question: "Which alias is conventionally used for NumPy?", options: ["num", "numpy", "np", "ny"], correctOptionIndex: 2, note: "Community conventions improve readability.", explanation: "NumPy is conventionally imported with import numpy as np." },
      { title: "Core object", question: "What is NumPy's main array object?", options: ["numlist", "ndarray", "datatable", "matrixlist"], correctOptionIndex: 1, note: "N means any number of dimensions.", explanation: "ndarray means N-dimensional array." },
      { title: "Dimensions", question: "Which attribute reports the number of dimensions?", options: ["shape", "size", "ndim", "dtype"], correctOptionIndex: 2, note: "ndim is short for number of dimensions.", explanation: "array.ndim reports the dimension count." },
      { title: "Rows and columns", question: "Which attribute describes rows and columns?", options: ["shape", "size", "dtype", "ndim"], correctOptionIndex: 0, note: "Shape is a tuple.", explanation: "A 2 × 3 array has shape (2, 3)." },
      { title: "Element count", question: "Which attribute reports the total number of elements?", options: ["count", "length", "size", "shape"], correctOptionIndex: 2, note: "Size combines every dimension.", explanation: "array.size is the total number of stored elements." },
      { title: "Even spacing", question: "Which function creates a requested number of evenly spaced values?", options: ["np.arange()", "np.linspace()", "np.ones()", "np.array()"], correctOptionIndex: 1, note: "The requested count controls linspace.", explanation: "np.linspace(start, stop, count) includes evenly spaced values across the interval." },
      { title: "Storage type", question: "Which attribute reports the array's element data type?", options: ["kind", "type", "dtype", "format"], correctOptionIndex: 2, note: "dtype means data type.", explanation: "array.dtype reports the compatible storage type chosen for the array." },
    ],
    assignment: {
      title: "Smart Field NumPy Snapshot",
      brief: "Build a compact numerical snapshot for temperature, rainfall, and soil-moisture sensor data.",
      deliverables: [
        "Import NumPy with the np alias",
        "Create one 1D temperature array",
        "Create one 3 × 3 soil-moisture array",
        "Print ndim, shape, size, and dtype for both arrays",
        "Calculate mean, minimum, and maximum temperature",
        "Create irrigation target values with arange()",
        "Create five evenly spaced calibration values with linspace()",
        "Explain one reason the ndarray is preferable to separate variables",
      ],
    },
    summarySection: {
      title: "Your Smart Farm data is now array-shaped",
      body: "You replaced value-by-value numerical work with NumPy arrays, learned the ndarray structure, inspected its four core attributes, and performed your first complete-array statistics.",
      items: ["NumPy means Numerical Python", "ndarray supports N-dimensional data", "Vectorized expressions operate across complete arrays", "ndim, shape, size, and dtype describe array structure", "mean, min, and max summarize sensor readings"],
    },
    keyTakeaways: [
      "Use import numpy as np",
      "Use np.array() to convert related numerical values into an ndarray",
      "Use arange() when step matters and linspace() when the number of values matters",
      "Inspect array structure before performing analysis",
      "NumPy arrays connect Python fundamentals to data science and machine learning",
    ],
    whatsNext: {
      title: "Lesson 6.2 · Creating NumPy Arrays",
      body: "Next, create arrays intentionally with array(), zeros(), ones(), full(), eye(), arange(), linspace(), and NumPy's random-generation tools.",
    },
    developmentPack: numpyIntroductionDevelopmentPack,
  },
];

export const moduleSixLessonSummaries = [
  { id: "module-6-lesson-1", moduleId: "module-6", order: 1, title: "6.1 Introduction to NumPy", estimatedMinutes: 120, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-6-lesson-2", moduleId: "module-6", order: 2, title: "6.2 Creating NumPy Arrays", estimatedMinutes: 120, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-3", moduleId: "module-6", order: 3, title: "6.3 Array Attributes & Data Types", estimatedMinutes: 120, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-4", moduleId: "module-6", order: 4, title: "6.4 Indexing, Slicing & Reshaping", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-5", moduleId: "module-6", order: 5, title: "6.5 Array Operations & Broadcasting", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-6", moduleId: "module-6", order: 6, title: "6.6 Mathematical & Statistical Functions", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-7", moduleId: "module-6", order: 7, title: "6.7 Filtering, Sorting & Searching", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-8", moduleId: "module-6", order: 8, title: "6.8 Combining & Splitting Arrays", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-9", moduleId: "module-6", order: 9, title: "6.9 Random Numbers & Practical NumPy", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-10", moduleId: "module-6", order: 10, title: "6.10 Smart Farm Numerical Analysis", estimatedMinutes: 180, status: "not-started" as const, isPlaceholder: true },
];
