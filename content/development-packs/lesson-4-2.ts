import type { PythonListsDevelopmentPack } from "@/types/content";

export const pythonListsDevelopmentPack: PythonListsDevelopmentPack = {
  kind: "python-lists",
  prerequisite: "Module 3 completed · Lesson 4.1 Why Collections?",
  story: {
    title: "Five variables become one organized collection",
    body: "The lead engineer asks for every moisture reading to be stored in one place. A Python List gives the related values one name while preserving their order.",
    before: "sensor1 = 25\nsensor2 = 30\nsensor3 = 28\nsensor4 = 29\nsensor5 = 31",
    after: "moisture = [25, 30, 28, 29, 31]",
  },
  definition: {
    title: "A List stores multiple values in one variable",
    body: "A List is an ordered, mutable collection. It keeps element positions, permits repeated values, and can technically hold mixed types—although consistent types are often clearer for sensor datasets.",
    characteristics: [
      { label: "Ordered", explanation: "Every element has a stable position." },
      { label: "Mutable", explanation: "An element can be replaced after creation." },
      { label: "Duplicates allowed", explanation: "The same reading may appear more than once." },
      { label: "Flexible values", explanation: "Different data types are allowed, though consistent data is easier to analyze." },
    ],
  },
  creation: {
    title: "Create a List with square brackets",
    body: "Place comma-separated elements between square brackets and assign the complete List to one meaningful variable name.",
    examples: [
      { label: "Related numbers", code: "moisture = [25, 30, 28, 29, 31]", note: "A clear sensor dataset." },
      { label: "Mixed values", code: "farm = [\"Green Valley\", 25, True]", note: "Valid, but use mixed data deliberately." },
      { label: "Empty List", code: "sensors = []", note: "Ready to receive values in a later lesson." },
    ],
  },
  anatomy: {
    title: "One name, five elements",
    body: "The variable names the complete List. Each value is an element with its own position and zero-based index.",
    listName: "moisture",
    values: [25, 30, 28, 29, 31],
  },
  indexing: {
    title: "Access an element by its positive index",
    body: "Python begins counting List positions at zero, so index 0 selects the first element and index 2 selects the third.",
    examples: [
      { code: "moisture[0]", result: "25", index: 0 },
      { code: "moisture[2]", result: "28", index: 2 },
      { code: "moisture[4]", result: "31", index: 4 },
    ],
  },
  mutability: {
    title: "Lists can change in place",
    body: "Select an existing index and assign a replacement. The List keeps its identity and position while the chosen element changes.",
    before: [25, 30, 28],
    index: 1,
    replacement: 35,
  },
  comparison: {
    title: "List versus individual variables",
    body: "Both designs can hold five values, but the List gives the related readings one scalable structure.",
    rows: [
      { variables: "sensor1, sensor2, sensor3", list: "sensors" },
      { variables: "Many names", list: "One meaningful name" },
      { variables: "Repetitive", list: "Compact" },
      { variables: "Difficult to scale", list: "Designed for related values" },
    ],
  },
  builtIns: {
    title: "Inspect Lists with Python built-in functions",
    body: "These functions receive the complete List. They are Python-wide tools—not methods belonging only to Lists.",
    functions: [
      { name: "len", purpose: "Count the elements" },
      { name: "max", purpose: "Find the highest comparable value" },
      { name: "min", purpose: "Find the lowest comparable value" },
    ],
    previewBuiltIns: ["sum()", "sorted()", "reversed()", "enumerate()", "zip()", "any()", "all()"],
    previewMethods: ["append()", "extend()", "insert()", "remove()", "pop()", "clear()", "sort()", "reverse()", "copy()", "count()", "index()"],
  },
  agritech: {
    title: "A dashboard can summarize related temperatures",
    body: "Once readings share one List, the dashboard can count them and identify the highest and lowest values without naming every sensor separately.",
    variableName: "temperatures",
    values: [28, 30, 31, 29],
  },
  debugChallenges: [
    { title: "Index outside the List", prompt: "Why does this produce IndexError?", code: "moisture = [25, 30, 28]\nprint(moisture[5])", mistakesToFind: 1, solution: "moisture = [25, 30, 28]\nprint(moisture[2])", hiddenGuidance: "Map the three elements to indexes 0, 1, and 2." },
    { title: "Maximum of an empty List", prompt: "Why does this produce ValueError?", code: "farm = []\nprint(max(farm))", mistakesToFind: 1, solution: "farm = [25]\nprint(max(farm))", hiddenGuidance: "max() needs at least one comparable element." },
  ],
  engineerScenario: {
    title: "Design for fifty thousand sensors",
    body: "A collection keeps related readings under one name and provides a predictable structure for later access, updates, analysis, and iteration.",
    question: "Which design would you rather maintain: 50,000 numbered variables or one ordered List of sensor readings—and why?",
  },
};
