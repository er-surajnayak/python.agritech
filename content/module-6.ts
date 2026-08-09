import { numpyIntroductionDevelopmentPack } from "@/content/development-packs/lesson-6-1";
import { numpyArrayCreationDevelopmentPack } from "@/content/development-packs/lesson-6-2";
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
  {
    id: "module-6-lesson-2",
    moduleId: "module-6",
    number: "6.2",
    title: "Creating NumPy Arrays: Building Smart Farm Data Structures",
    summary: "Choose the right NumPy creation tool for existing readings, initialized grids, numerical sequences, identity matrices, and reproducible simulated sensor data.",
    durationMinutes: 135,
    level: "Intermediate",
    introduction: { title: "Build the right starting structure", body: "Lesson 6.1 introduced ndarray. Now the Smart Farm needs a practical creation toolbox for known readings, future storage, calibration sequences, special matrices, and simulated datasets." },
    objectives: [
      "Create arrays from Python data with np.array()",
      "Choose between zeros(), ones(), full(), and empty()",
      "Generate step-controlled sequences with arange()",
      "Generate count-controlled sequences with linspace()",
      "Recognize an identity matrix created by eye()",
      "Generate random floats, integers, measurements, and categories",
      "Use random.seed() for reproducible results",
      "Specify dtype and explain possible conversion data loss",
    ],
    whyThisMatters: { title: "Initialization communicates intent", body: "The creation function tells future readers whether an array contains real observations, reserved storage, defaults, time points, calibration values, or simulated data.", items: ["Predictable defaults reduce setup mistakes", "Purpose-built sequences avoid manual value entry", "Seeds make experiments repeatable", "Explicit dtype controls storage behavior"] },
    industryMotivation: { title: "Data workflows start by allocating the right shape and values", body: "Scientific simulations, machine-learning experiments, image processing, and IoT pipelines repeatedly create initialized, ranged, and random arrays before any analysis begins.", items: ["Sensor buffers begin as allocated grids", "Model experiments need reproducible random data", "Calibration schedules use even numerical sequences", "Identity matrices support later transformations"], signal: "Choosing an array factory is a data-design decision, not just a syntax choice." },
    concept: { title: "Array creation is a toolbox", body: "Each factory answers a different question: do values already exist, should every position start the same, do we need a sequence, or are we simulating observations?", items: ["Existing values → array()", "Known default → zeros(), ones(), or full()", "Step or count → arange() or linspace()", "Simulation → random functions plus a seed"] },
    workflow: { title: "Choose an array creator by intent", description: "Identify the source and initialization rule before choosing syntax.", steps: [
      { title: "Identify the data source", description: "Existing observations, generated sequence, reserved storage, or simulation?" },
      { title: "Choose shape", description: "Decide whether one sequence or a field-by-sensor grid is required." },
      { title: "Choose initialization", description: "Use known values, a constant fill, a range rule, or random generation." },
      { title: "Choose dtype", description: "Accept inference or explicitly request a compatible type." },
      { title: "Verify", description: "Print the result and confirm shape, values, and reproducibility." },
    ] },
    agritechExample: { title: "Simulate a repeatable sensor batch", body: "A fixed seed produces the same synthetic temperature and soil-moisture readings, helping every learner inspect and discuss identical results." },
    playground: {
      title: "Run a Reproducible Smart Farm Simulation",
      description: "Change the seed, ranges, and sample count, then run the same NumPy random workflow in the existing browser runtime.",
      starterCode: `import numpy as np

np.random.seed(42)

temperature = np.random.randint(20, 40, 10)
moisture = np.random.uniform(30, 60, 10)

print("Temperature:", temperature)
print("Moisture:", np.round(moisture, 2))`,
      expectedOutcome: "Seed 42 produces the same 10 temperature integers and 10 rounded moisture values each time.",
    },
    practice: [
      { level: "Easy", title: "Zero and one buffers", prompt: "Create np.zeros(10) and np.ones(10), then explain one suitable use for each.", guidance: "Both default to floating-point output unless dtype is specified." },
      { level: "Easy", title: "Default temperature grid", prompt: "Create a 3 × 3 array where every value is 25 using np.full().", guidance: "Pass the shape tuple first and the fill value second." },
      { level: "Medium", title: "Two-hour schedule", prompt: "Generate 6, 8, 10, 12, 14, 16, 18 using np.arange().", guidance: "Use stop 19 because arange excludes the stop value." },
      { level: "Medium", title: "Calibration points", prompt: "Generate seven evenly spaced temperature values between 20°C and 35°C.", guidance: "linspace receives start, stop, and number of values." },
      { level: "Challenge", title: "Random moisture simulation", prompt: "Generate 10 floating-point soil-moisture readings between 25 and 70 with a reproducible seed.", guidance: "Set seed first, then call np.random.uniform(25, 70, 10)." },
      { level: "Challenge", title: "Analyze 20 temperatures", prompt: "Simulate 20 integer temperatures from 18°C through 40°C and calculate minimum, maximum, and average.", guidance: "randint excludes the upper bound, so use 41 to allow 40." },
    ],
    quiz: [
      { title: "Zero fill", question: "Which function creates an array filled with zeros?", options: ["np.empty()", "np.zeros()", "np.full()", "np.eye()"], correctOptionIndex: 1, note: "The name describes the fill value.", explanation: "np.zeros() initializes every position to zero." },
      { title: "Chosen fill", question: "Which function fills an array with a chosen value?", options: ["np.full()", "np.ones()", "np.arange()", "np.array()"], correctOptionIndex: 0, note: "full receives a shape and fill value.", explanation: "np.full((3, 3), 25) creates a 3 × 3 grid of 25." },
      { title: "Uninitialized storage", question: "Why should np.empty() be used carefully?", options: ["It creates strings", "Its initial values are not predictable", "It cannot create 2D arrays", "It always raises an error"], correctOptionIndex: 1, note: "Empty describes initialization, not size.", explanation: "Allocated memory contents should not be assumed to be zero." },
      { title: "Sequence rule", question: "What controls np.arange()?", options: ["Number of values", "Step size", "Random seed", "dtype only"], correctOptionIndex: 1, note: "Think: how large is each step?", explanation: "arange generates values by repeatedly adding the specified step." },
      { title: "Even count", question: "Does np.linspace() include both endpoints by default?", options: ["Yes", "No", "Only for integers", "Only with a seed"], correctOptionIndex: 0, note: "This differs from arange's excluded stop.", explanation: "linspace includes start and stop by default." },
      { title: "Identity", question: "What does np.eye(3) create?", options: ["Three random values", "A 3 × 3 identity matrix", "Three ones", "An empty matrix"], correctOptionIndex: 1, note: "Ones lie on the main diagonal.", explanation: "An identity matrix has diagonal ones and zeros elsewhere." },
      { title: "Random integers", question: "Which function generates random integers?", options: ["np.random.rand()", "np.random.uniform()", "np.random.randint()", "np.random.choice()"], correctOptionIndex: 2, note: "The name ends in int.", explanation: "randint generates integers over a specified interval." },
      { title: "Reproducibility", question: "Why set np.random.seed()?", options: ["To make arrays larger", "To repeat the same pseudo-random sequence", "To convert floats", "To sort values"], correctOptionIndex: 1, note: "A seed controls repeatability.", explanation: "Using the same seed recreates the same pseudo-random sequence." },
    ],
    assignment: { title: "Smart Farm Array Creation Toolkit", brief: "Create a short program demonstrating the main array factories in a realistic farm-data setup.", deliverables: ["Create a 3 × 4 zero-filled sensor buffer", "Create a 3 × 3 default-temperature grid with full()", "Generate measurement hours with arange()", "Generate calibration points with linspace()", "Create a 4 × 4 identity matrix", "Simulate temperature, moisture, and categorical statuses", "Set and explain a random seed", "Demonstrate float dtype and explain float-to-int data loss"] },
    summarySection: { title: "You can now manufacture the right array", body: "You created arrays from known values, constants, numerical rules, identity structure, and reproducible simulations while choosing functions by purpose rather than memorization.", items: ["array() converts existing data", "zeros(), ones(), and full() create predictable defaults", "empty() is uninitialized", "arange() uses a step; linspace() uses a value count", "eye() creates an identity matrix", "random functions and seed support repeatable simulation"] },
    keyTakeaways: ["Choose the factory that communicates the array's purpose", "Do not assume empty() contains zeros", "arange usually excludes stop; linspace includes both endpoints by default", "Use a seed when results must be reproducible", "Specify dtype only when its conversion behavior is acceptable"],
    whatsNext: { title: "Lesson 6.3 · Array Attributes & Data Types", body: "Next, inspect what an array contains and how it is structured with ndim, shape, size, dtype, itemsize, and astype()." },
    developmentPack: numpyArrayCreationDevelopmentPack,
  },
];

export const moduleSixLessonSummaries = [
  { id: "module-6-lesson-1", moduleId: "module-6", order: 1, title: "6.1 Introduction to NumPy", estimatedMinutes: 120, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-6-lesson-2", moduleId: "module-6", order: 2, title: "6.2 Creating NumPy Arrays", estimatedMinutes: 135, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-6-lesson-3", moduleId: "module-6", order: 3, title: "6.3 Array Attributes & Data Types", estimatedMinutes: 120, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-4", moduleId: "module-6", order: 4, title: "6.4 Indexing, Slicing & Reshaping", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-5", moduleId: "module-6", order: 5, title: "6.5 Array Operations & Broadcasting", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-6", moduleId: "module-6", order: 6, title: "6.6 Mathematical & Statistical Functions", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-7", moduleId: "module-6", order: 7, title: "6.7 Filtering, Sorting & Searching", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-8", moduleId: "module-6", order: 8, title: "6.8 Combining & Splitting Arrays", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-9", moduleId: "module-6", order: 9, title: "6.9 Random Numbers & Practical NumPy", estimatedMinutes: 135, status: "not-started" as const, isPlaceholder: true },
  { id: "module-6-lesson-10", moduleId: "module-6", order: 10, title: "6.10 Smart Farm Numerical Analysis", estimatedMinutes: 180, status: "not-started" as const, isPlaceholder: true },
];
