import { pandasSeriesDevelopmentPack } from "@/content/development-packs/lesson-7-1";
import type { LessonDocument } from "@/types/content";

export const moduleSevenLessons: LessonDocument[] = [{
  id: "module-7-lesson-1", moduleId: "module-7", number: "7.1", title: "Pandas Introduction & Series", durationMinutes: 135, level: "Intermediate",
  summary: "Transition from positional NumPy arrays to labeled Pandas Series, then inspect, access, calculate, and filter Smart Farm sensor data.",
  introduction: { title: "Numerical data gains labels", body: "Pandas builds on the numerical foundation from NumPy and adds indexes that make structured data easier to identify, filter, align, and explain." },
  objectives: ["Explain what Pandas is used for", "Import Pandas with the pd alias", "Describe a Series as one-dimensional labeled data", "Create Series from lists, dictionaries, and NumPy arrays", "Create and interpret custom indexes", "Distinguish loc from iloc", "Inspect shape, size, dtype, index, and values", "Use common statistical Series methods", "Apply vectorized arithmetic", "Filter a Series with a Boolean condition"],
  whyThisMatters: { title: "Labels connect values to the real world", body: "A raw 28 needs surrounding meaning. A Series can preserve that 28 belongs to Farm A or Field 103 while still supporting efficient numerical operations.", items: ["Identify values by farm or sensor label", "Keep labels after filtering", "Summarize readings with direct methods", "Prepare for DataFrames and real files"] },
  industryMotivation: { title: "Pandas is the working surface for structured Python data", body: "Analysts use Pandas to inspect, clean, transform, group, merge, and export tables before visualization or machine learning.", items: ["IoT readings carry timestamps and sensor IDs", "Agricultural trials require labeled observations", "Cleaning workflows preserve record identity", "Models need reliable feature tables"], signal: "Series introduces the labeled axis that powers every later DataFrame workflow." },
  concept: { title: "A Series has values and an index", body: "Values hold the observations. The index labels each observation. loc speaks the language of labels; iloc speaks the language of integer positions.", items: ["One-dimensional", "Labeled index", "Compatible dtype", "Vectorized operations", "Boolean filtering"] },
  workflow: { title: "The first Pandas workflow", description: "Move from raw sensor values to a labeled farm decision.", steps: [
    { title: "Import", description: "Use import pandas as pd." }, { title: "Create", description: "Build a Series from values and labels." },
    { title: "Inspect", description: "Check index, values, size, shape, and dtype." }, { title: "Access", description: "Use loc for labels and iloc for positions." },
    { title: "Analyze", description: "Calculate statistics or filter with a condition." }, { title: "Interpret", description: "Read matching labels as farm identifiers." },
  ] },
  agritechExample: { title: "Find fields requiring irrigation", body: "A soil-moisture Series indexed by Field ID keeps labels 103 and 105 attached when a below-30 condition filters the values." },
  playground: {
    title: "Run a Labeled Smart Farm Series",
    description: "Create a custom-index Series, inspect its structure, access by label and position, calculate statistics, and filter irrigation fields.",
    starterCode: `import pandas as pd

temperature = pd.Series(
    [28, 32, 35, 29],
    index=["Farm A", "Farm B", "Farm C", "Farm D"],
    name="Temperature"
)

soil_moisture = pd.Series(
    [42, 35, 28, 48, 22, 40],
    index=[101, 102, 103, 104, 105, 106],
    name="Soil Moisture"
)

print("Temperature Series:")
print(temperature)
print("\\nFarm A with loc:", temperature.loc["Farm A"])
print("First value with iloc:", temperature.iloc[0])
print("Mean:", temperature.mean())
print("Above 30:")
print(temperature[temperature > 30])
print("\\nIrrigation fields:")
print(soil_moisture[soil_moisture < 30])`,
    expectedOutcome: "The runner prints a labeled temperature Series, returns 28 through both loc and iloc, calculates mean 31, keeps Farms B and C above 30, and identifies Fields 103 and 105 for irrigation.",
  },
  practice: [
    { level: "Easy", title: "Create a basic Series", prompt: "Create a Series from [10, 20, 30, 40].", guidance: "Pass the list to pd.Series()." },
    { level: "Easy", title: "Add farm labels", prompt: "Use Farm A through Farm D as the index for four values.", guidance: "Pass index=[...] during creation." },
    { level: "Medium", title: "Label and position", prompt: "Select Farm A using loc and the first value using iloc.", guidance: "loc receives the label; iloc receives 0." },
    { level: "Medium", title: "Summarize temperatures", prompt: "Calculate mean, minimum, maximum, median, and standard deviation.", guidance: "Call the matching Series methods." },
    { level: "Medium", title: "Filter warm farms", prompt: "Keep temperatures greater than 30.", guidance: "Place the Boolean Series inside square brackets." },
    { level: "Medium", title: "Dictionary labels", prompt: "Create a Series from a farm-to-temperature dictionary.", guidance: "Dictionary keys automatically become the index." },
    { level: "Challenge", title: "NumPy to Series", prompt: "Convert a NumPy array to a named Pandas Series.", guidance: "Pass the ndarray to pd.Series(), then provide name=." },
    { level: "Challenge", title: "Irrigation fields", prompt: "Return Field IDs whose soil moisture is below 30.", guidance: "The filtered Series index already contains the IDs." },
  ],
  quiz: [
    { title: "Alias", question: "What is the standard Pandas alias?", options: ["pd", "np", "ps", "pan"], correctOptionIndex: 0, note: "Use import pandas as pd.", explanation: "pd is the community convention." },
    { title: "Series", question: "What distinguishes a Series from a basic 1D ndarray?", options: ["A labeled index", "It cannot contain numbers", "It is always 2D", "It cannot be filtered"], correctOptionIndex: 0, note: "Labels add meaning.", explanation: "A Series pairs values with an index." },
    { title: "Label access", question: "Which accessor selects Farm A by label?", options: [".loc['Farm A']", ".iloc['Farm A']", ".values['Farm A']", ".shape['Farm A']"], correctOptionIndex: 0, note: "loc is label-based.", explanation: "loc accepts index labels." },
    { title: "Position access", question: "Which expression selects the first position?", options: ["series.iloc[0]", "series.loc[0] always", "series.index[1]", "series.shape[0]"], correctOptionIndex: 0, note: "Positions begin at zero.", explanation: "iloc performs integer-position selection." },
    { title: "Index property", question: "Which property exposes Series labels?", options: [".index", ".values", ".dtype", ".mean()"], correctOptionIndex: 0, note: "The index is the label axis.", explanation: ".index returns the Series index." },
    { title: "Values property", question: "Which property exposes underlying values?", options: [".values", ".index", ".loc", ".describe"], correctOptionIndex: 0, note: "No parentheses.", explanation: ".values exposes the value array." },
    { title: "Average", question: "Which method calculates the Series average?", options: [".mean()", ".shape", ".index", ".loc[]"], correctOptionIndex: 0, note: "Methods use parentheses.", explanation: ".mean() returns the arithmetic average." },
    { title: "Filter", question: "What does temperature[temperature > 30] retain?", options: ["Matching values and labels", "Only positions", "Every value", "Only the dtype"], correctOptionIndex: 0, note: "Labels stay attached.", explanation: "Boolean Series filtering preserves the matching index." },
    { title: "Dictionary", question: "What becomes the index when creating a Series from a dictionary?", options: ["Dictionary keys", "Dictionary values", "Only integer positions", "The dtype"], correctOptionIndex: 0, note: "Keys label values.", explanation: "Pandas uses dictionary keys as Series labels." },
    { title: "Describe", question: "What does Series.describe() provide?", options: ["Descriptive statistics", "A DataFrame merge", "CSV loading", "A new index only"], correctOptionIndex: 0, note: "Count, mean, spread, and range.", explanation: "describe summarizes the distribution." },
  ],
  assignment: { title: "Labeled Farm Sensor Report", brief: "Create and analyze two labeled Series for temperature and moisture.", deliverables: ["Custom indexes", "loc and iloc examples", "Five inspected properties", "Five statistical methods", "One arithmetic transformation", "One Boolean filter", "Dictionary-to-Series example", "Irrigation Field IDs"] },
  summarySection: { title: "You can now analyze one-dimensional labeled data", body: "You created Series from several sources, separated labels from values, used loc and iloc correctly, calculated statistics, and preserved Field IDs through filtering.", items: ["pd is the Pandas alias", "Series is 1D labeled data", "loc selects labels", "iloc selects positions", "properties inspect structure", "methods calculate results", "Boolean filtering preserves labels"] },
  keyTakeaways: ["A Series combines values with an index", "Labels make filtered results actionable", "Use loc for labels and iloc for positions", "Properties do not use parentheses", "Statistical methods do use parentheses", "NumPy arrays can become Pandas Series"],
  whatsNext: { title: "Lesson 7.2 · DataFrames & Data Loading", body: "Next, combine multiple Series-like columns into DataFrames and introduce practical CSV and Excel loading workflows." },
  developmentPack: pandasSeriesDevelopmentPack,
}];

export const moduleSevenLessonSummaries = [
  { id: "module-7-lesson-1", moduleId: "module-7", order: 1, title: "7.1 Pandas Introduction & Series", estimatedMinutes: 135, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-7-lesson-2", moduleId: "module-7", order: 2, title: "7.2 DataFrames & Data Loading", estimatedMinutes: 150, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-3", moduleId: "module-7", order: 3, title: "7.3 Selecting, Filtering & Querying", estimatedMinutes: 150, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-4", moduleId: "module-7", order: 4, title: "7.4 Cleaning & Preparing Data", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-5", moduleId: "module-7", order: 5, title: "7.5 Transformation & Feature Engineering", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-6", moduleId: "module-7", order: 6, title: "7.6 GroupBy, Aggregation & Analysis", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-7", moduleId: "module-7", order: 7, title: "7.7 Combining & Reshaping Data", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-8", moduleId: "module-7", order: 8, title: "7.8 Real-World Pandas Project", estimatedMinutes: 180, status: "not-started" as const, isPlaceholder: true },
];
