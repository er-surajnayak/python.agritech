import type { TupleDevelopmentPack } from "@/types/content";

export const tuplesDevelopmentPack: TupleDevelopmentPack = {
  kind: "tuples",
  prerequisite: "Lessons 4.1, 4.2, and 4.3",
  story: {
    title: "Protect fixed farm settings",
    body: "Some Smart Farm metadata should never change by mistake. Coordinates, serial numbers, and farm registration IDs are examples of values that must remain stable during runtime.",
    problem: {
      title: "A bug with mutable values",
      body: "A new intern changed a location value by accident and the irrigation route moved toward the wrong field.",
      examples: ["Farm registration details", "Installation metadata", "GPS coordinate pairs"],
    },
    locked: {
      title: "Read-only data model",
      body: "A tuple stores values as an ordered, immutable record so accidental reassignment is prevented.",
      items: ["Tuple values are intentionally immutable", "Accidental edits should fail early", "Clear intent for fixed data contracts"],
    },
  },
  whyTuples: {
    title: "Why tuples exist",
    body: "A tuple is an ordered collection designed for fixed records. Use it when a group of values should stay stable as a unit.",
    bullets: [
      "Ordered values with stable positions",
      "Immutable after creation",
      "Useful for read-only metadata",
      "Lower overhead for fixed records",
    ],
  },
  creation: {
    title: "Creating tuples",
    body: "Use parentheses and commas. For single-item tuples, include the trailing comma.",
    examples: [
      { label: "location", code: "location = (17.3850, 78.4867)", note: "Two float values represent GPS coordinates." },
      { label: "single item (required comma)", code: 'crop = ("Rice",)', note: "The comma makes this a tuple, not a string." },
      { label: "mixed values", code: 'farm = ("Green Valley", 101, True)', note: "Different types can be stored together." },
    ],
  },
  anatomy: {
    title: "Tuple anatomy",
    body: "A tuple is one record with ordered positions and zero-based indexes.",
    tupleName: "location",
    values: [17.385, 78.4867],
  },
  indexing: {
    title: "Accessing tuple values",
    body: "Tuple indexing works like list indexing and supports positive and negative indexes.",
    examples: [
      { code: "location[0]", index: 0, result: 17.385 },
      { code: "location[1]", index: 1, result: 78.4867 },
      { code: "location[-1]", index: -1, result: 78.4867 },
    ],
    slicing: "location[:1]",
  },
  immutability: {
    title: "Tuple immutability",
    body: "Attempting to update a tuple element raises an error. This protects fixed records by design.",
    example: {
      code: "location[0] = 18",
      result: "TypeError: 'tuple' object does not support item assignment",
    },
    message: "Tuples communicate intent: this data is not meant to change in place.",
  },
  packing: {
    title: "Tuple packing",
    code: 'sensor = (101, "Moisture", 29.5)',
    body: "Packing stores several values into one tuple value at once.",
  },
  unpacking: {
    title: "Tuple unpacking",
    code: "sensor_id, sensor_type, value = sensor",
    mapping: [
      { variable: "sensor_id", variableValue: 101 },
      { variable: "sensor_type", variableValue: "Moisture" },
      { variable: "value", variableValue: 29.5 },
    ],
    body: "Unpacking distributes tuple values into individual variables in order.",
  },
  builtIns: {
    title: "Built-in functions with tuples",
    body: "These built-ins work with many iterable types, and tuples are a common one.",
    examples: [
      { name: "len", purpose: "Count elements", code: "len(sensor)", output: "3" },
      { name: "max", purpose: "Find the largest item", code: "max(readings)", output: "29.5" },
      { name: "min", purpose: "Find the smallest item", code: "min(readings)", output: "101" },
      { name: "sum", purpose: "Sum numeric values", code: "sum(readings)", output: "61.5" },
      { name: "sorted", purpose: "Return sorted copy", code: "sorted(readings)", output: "[1, 2, 4, 9]" },
      { name: "any", purpose: "Any value truthy?", code: "any(flags)", output: "True" },
      { name: "all", purpose: "All values truthy?", code: "all(flags)", output: "False" },
    ],
  },
  methods: {
    title: "Tuple methods",
    body: "Tuples have only two specific methods: count() and index().",
    rows: [
      { method: "count", purpose: "Count matching values", example: "numbers.count(2)", output: "2" },
      { method: "index", purpose: "Find first position", example: "numbers.index(3)", output: "2" },
    ],
  },
  comparison: {
    title: "List vs Tuple comparison",
    body: "Use lists for mutable data streams and tuples for fixed records with semantic safety.",
    rows: [
      { feature: "Can change elements directly?", list: "Yes", tuple: "No" },
      { feature: "Best for fixed records", list: "Sometimes, but error-prone", tuple: "Yes" },
      { feature: "Duplicates allowed", list: "Yes", tuple: "Yes" },
      { feature: "Method support", list: "Many methods", tuple: "count(), index() only" },
    ],
  },
  agritech: {
    title: "Select values that stay fixed",
    body: "Identify which values should be protected and remain unchanged during program execution.",
    immutableValues: ["Farm-101", "Green Valley", 2024],
    mutableValues: [22, 25, 27],
    question: "Which structure should each set of values use, and why?",
  },
  debugChallenges: [
    {
      title: "Tuple assignment error",
      prompt: "Why does this fail, and how do we fix it?\n\ndata = (10, 20, 30)\ndata[0] = 5",
      code: "data = (10, 20, 30)\ndata[0] = 5",
      mistakesToFind: 1,
      solution: "# Tuples are immutable; use a list for mutable values.\nreadings = [10, 20, 30]\nreadings[0] = 5\nprint(readings)",
      hiddenGuidance: "Tuple elements cannot be reassigned.",
    },
    {
      title: "Single-item tuple mistake",
      prompt: "Why is this not a tuple?\n\ncrop = (\"Rice\")\nprint(type(crop))",
      code: "crop = (\"Rice\")\nprint(type(crop))",
      mistakesToFind: 1,
      solution: "crop = (\"Rice\",)\nprint(type(crop))",
      hiddenGuidance: "Single-item tuples need a trailing comma.",
    },
    {
      title: "Tuple method misuse",
      prompt: "Why does this fail?\n\nsensor = (101, 102, 103)\nprint(sensor.append(104))",
      code: "sensor = (101, 102, 103)\nprint(sensor.append(104))",
      mistakesToFind: 1,
      solution: "sensor = [101, 102, 103]\nsensor.append(104)\nprint(sensor)",
      hiddenGuidance: "append() is a list method, not a tuple method.",
    },
  ],
  engineerScenario: {
    title: "When to choose tuples",
    body: "If a value represents a fixed contract (coordinates, registration IDs, hardware serials), tuples provide stronger safety and clearer intent.",
    question: "Which should be tuples here: immutable farm metadata, live sensor reading history, or both? Explain.",
  },
};
