import type { WhyCollectionsDevelopmentPack } from "@/types/content";

export const whyCollectionsDevelopmentPack: WhyCollectionsDevelopmentPack = {
  kind: "why-collections",
  prerequisite: "Module 3 completed",
  story: {
    title: "The farm grew faster than its data model",
    body: "The Smart Farm now operates across many farms. Every field produces moisture, temperature, humidity, and pH readings every minute. Individual variables can no longer keep that information understandable.",
    scales: ["1 farm", "5 farms", "100 farms", "10,000 readings"],
    sensorTypes: ["Moisture", "Temperature", "Humidity", "pH"],
  },
  individualVariables: {
    title: "Individual variables look harmless at first",
    body: "Five readings are manageable. Five hundred declarations create a naming, editing, and verification problem.",
    code: "sensor1 = 25\nsensor2 = 30\nsensor3 = 28\nsensor4 = 29\nsensor5 = 31",
    question: "Would you want to create, rename, and maintain 500 separate variables?",
  },
  updateProblem: {
    title: "One update becomes thousands of edits",
    body: "If every reading must increase by one, each independent variable needs its own statement. Repetition makes omissions and inconsistent changes more likely.",
    code: "sensor1 += 1\nsensor2 += 1\nsensor3 += 1\nsensor4 += 1\nsensor5 += 1",
    impact: ["Thousands of statements", "Easy to miss a sensor", "Slow to review", "Expensive to maintain"],
  },
  maximumProblem: {
    title: "Even simple questions stop scaling",
    body: "Finding the highest reading is easy for five named values, but the call grows with every new sensor.",
    code: "maximum = max(\n    sensor1,\n    sensor2,\n    sensor3,\n    sensor4,\n    sensor5\n)",
    question: "How many arguments would this need for 500 sensors?",
  },
  repeatedPatterns: {
    title: "Repeated names reveal a design problem",
    body: "These variables describe the same kind of information. Only their number changes.",
    variables: ["temperature1", "temperature2", "temperature3", "temperature4", "temperature5"],
    insight: "When related variable names differ only by a number, the data probably belongs together.",
  },
  analogy: {
    title: "Collections are the bookshelf, not another book",
    body: "A library does not leave every book scattered on the floor with a numbered label. It groups related books on shelves so people can find, maintain, and work with them as an organized body of information.",
    before: ["Book 1 on floor", "Book 2 on floor", "Book 3 on floor"],
    after: ["One organized shelf", "Related books together", "Room to grow"],
  },
  collectionPreview: {
    title: "The collection journey ahead",
    body: "Python provides several collection types because different data-management problems need different behavior. This roadmap names them without teaching their syntax yet.",
    lessons: [
      { number: "4.2", title: "Lists" },
      { number: "4.3", title: "Indexing & Accessing Elements" },
      { number: "4.4", title: "Updating, Adding & Removing Elements" },
      { number: "4.5", title: "Operations, Built-ins & Methods" },
      { number: "4.6", title: "Tuples" },
      { number: "4.7", title: "Sets" },
      { number: "4.8", title: "Dictionaries" },
    ],
  },
  agritechMotivation: {
    title: "Moisture readings belong to one problem",
    body: "Four separate moisture variables still represent one related dataset. The next lesson will show how Python stores those readings together; this lesson focuses only on why grouping is necessary.",
    readings: [
      { label: "Moisture 1", value: 21 },
      { label: "Moisture 2", value: 18 },
      { label: "Moisture 3", value: 24 },
      { label: "Moisture 4", value: 20 },
    ],
  },
  simulator: {
    title: "Variable Explosion Simulator",
    body: "Choose a farm scale and watch repetitive declarations multiply. The preview stays bounded, but the totals reveal the real maintenance burden.",
    presets: [5, 50, 500, 5000],
    baseValues: [25, 30, 28, 29, 31],
  },
  growth: {
    title: "Code Growth Visualizer",
    body: "Every additional individually named sensor adds declarations and future update points.",
    effort: [
      { maximum: 10, label: "Manageable" },
      { maximum: 100, label: "Repetitive" },
      { maximum: 1000, label: "Error-prone" },
      { maximum: 10000, label: "Unmanageable" },
    ],
  },
  comparator: {
    title: "Scattered values versus grouped information",
    body: "Organization changes the mental model from many unrelated names to one clearly identified body of related data.",
    scatteredLabel: "Individual variables",
    groupedLabel: "Grouped sensor readings",
  },
  scale: {
    title: "Scale Simulator",
    body: "Move from one sensor to ten thousand and compare the declarations, update points, and review burden.",
    minimum: 1,
    maximum: 10000,
  },
  engineerScenario: {
    title: "Think like a data engineer",
    body: "Professional systems organize enormous bodies of related information so they can be searched, updated, validated, and analyzed consistently.",
    examples: ["Google records", "Netflix movies", "Bank transactions", "Smart Farm readings"],
    question: "Why would numbered variables fail when the system grows to millions of records?",
  },
};
