import { pandasSeriesDevelopmentPack } from "@/content/development-packs/lesson-7-1";
import { pandasDataFrameDevelopmentPack } from "@/content/development-packs/lesson-7-2";
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
}, {
  id: "module-7-lesson-2", moduleId: "module-7", number: "7.2", title: "Pandas DataFrames & Loading Real Data", durationMinutes: 150, level: "Intermediate",
  summary: "Move from one labeled Series to complete DataFrames, inspect their structure, manage columns, and practice loading and saving real farm datasets.",
  introduction: { title: "From one variable to complete records", body: "A DataFrame places several labeled columns together. Each row can represent a field, while columns preserve temperature, humidity, soil moisture, yield, and other measured features." },
  objectives: ["Explain a DataFrame as a two-dimensional labeled structure", "Connect Series to DataFrame columns", "Create DataFrames from dictionaries, row lists, and NumPy arrays", "Identify rows, columns, and the index", "Inspect shape, dimensions, size, columns, index, and dtypes", "Use head, tail, sample, info, and describe", "Distinguish one-column Series selection from multi-column DataFrame selection", "Add, modify, and remove columns", "Set a meaningful DataFrame index", "Read and save CSV and Excel files", "Follow a safe first-inspection workflow for real datasets"],
  whyThisMatters: { title: "Real farm data arrives as tables", body: "Sensor exports, trial records, yield reports, and spreadsheets contain many related variables. DataFrames keep complete records aligned while providing direct tools for inspection and transformation.", items: ["Keep each field's measurements together", "Discover structure before analysis", "Create derived agronomic metrics", "Move between Python and common data files"] },
  industryMotivation: { title: "DataFrame inspection prevents expensive assumptions", body: "Analysts inspect shape, labels, types, missingness, and distributions immediately after loading a file. This small habit catches schema surprises before decisions or models depend on them.", items: ["CSV sensor exports can change column names", "Excel workbooks can contain several sheets", "Data types affect calculations", "Indexes and identifiers should not be confused"], signal: "Load → head → info → describe is a practical first-response workflow for unfamiliar tabular data." },
  concept: { title: "A DataFrame has two labeled axes", body: "The index labels rows and columns label variables. Selecting one column returns a Series; selecting a list of columns keeps the two-dimensional DataFrame structure.", items: ["Rows represent observations", "Columns represent features", "Index identifies rows", "Each column has a dtype", "Operations align by labels"] },
  workflow: { title: "Inspect before analysis", description: "Turn a raw file into a trustworthy first understanding.", steps: [
    { title: "Load", description: "Use read_csv() or read_excel()." }, { title: "Preview", description: "Use head(), tail(), or sample()." },
    { title: "Inspect", description: "Check shape, columns, info(), and dtypes." }, { title: "Summarize", description: "Use describe() for numeric distributions." },
    { title: "Transform", description: "Add or remove well-defined columns." }, { title: "Save", description: "Export clean data with an intentional index choice." },
  ] },
  agritechExample: { title: "Build a labeled six-field dataset", body: "The lesson uses six Field IDs with temperature, humidity, soil moisture, and yield. Learners inspect the table, derive yield per moisture, convert temperature, and simulate loading the same data from CSV." },
  playground: {
    title: "Run a Smart Farm DataFrame Workflow",
    description: "Create, inspect, select, derive, drop, and index a farm DataFrame using executable Pandas code.",
    starterCode: `import pandas as pd

data = {
    "Field_ID": [101, 102, 103, 104, 105, 106],
    "Temperature": [28, 32, 35, 29, 38, 31],
    "Humidity": [65, 70, 72, 68, 75, 66],
    "Soil_Moisture": [42, 35, 28, 48, 22, 40],
    "Yield": [520, 480, 410, 560, 390, 510]
}

df = pd.DataFrame(data)
print("Shape:", df.shape)
print("Columns:", df.columns.tolist())
print("\\nFirst 3 rows:")
print(df.head(3))
print("\\nTemperature Series:")
print(df["Temperature"])

df["Yield_per_Moisture"] = (
    df["Yield"] / df["Soil_Moisture"]
).round(2)
df["Temperature_F"] = df["Temperature"] * 9/5 + 32
print("\\nWith derived columns:")
print(df.head())

df = df.drop(columns=["Temperature_F"])
indexed = df.set_index("Field_ID")
print("\\nIndexed by Field ID:")
print(indexed)`,
    expectedOutcome: "The runner reports shape (6, 5), lists five original columns, previews records, returns a Temperature Series, creates two derived columns, drops Temperature_F, and displays Field_ID as the index.",
  },
  practice: [
    { level: "Easy", title: "Crop DataFrame", prompt: "Create a DataFrame with Crop and Yield columns for Rice, Wheat, and Maize.", guidance: "Use a dictionary of equally sized lists." },
    { level: "Easy", title: "Inspect structure", prompt: "Display shape, columns, and dtypes for the farm DataFrame.", guidance: "These are properties, so omit parentheses." },
    { level: "Medium", title: "Preview records", prompt: "Display the first three and final two records.", guidance: "Pass counts to head() and tail()." },
    { level: "Medium", title: "Select features", prompt: "Return Temperature as a Series, then Temperature and Humidity as a DataFrame.", guidance: "Compare single and double square-bracket syntax." },
    { level: "Medium", title: "Derived efficiency", prompt: "Add Yield_per_Moisture from two existing columns.", guidance: "Divide the two Series directly." },
    { level: "Medium", title: "Load a CSV", prompt: "Write the Pandas statement that loads farm_data.csv, then inspect its first rows.", guidance: "Use pd.read_csv(), followed by head()." },
    { level: "Challenge", title: "Meaningful index", prompt: "Set Field_ID as the DataFrame index and explain what changed.", guidance: "Assign the result of set_index()." },
    { level: "Challenge", title: "Complete file workflow", prompt: "Load, preview, inspect, derive one column, and save a cleaned CSV without the Pandas index.", guidance: "Finish with to_csv(..., index=False)." },
  ],
  quiz: [
    { title: "Dimensions", question: "What best describes a DataFrame?", options: ["A 2D labeled data structure", "A single scalar", "An unlabeled function", "A Python loop"], correctOptionIndex: 0, note: "Rows and columns both have labels.", explanation: "A DataFrame represents a labeled table." },
    { title: "Dictionary", question: "What do dictionary keys become in pd.DataFrame(data)?", options: ["Column names", "Only row values", "File names", "Indexes automatically"], correctOptionIndex: 0, note: "Keys describe variables.", explanation: "Each key names a DataFrame column." },
    { title: "Shape", question: "What does shape (6, 5) mean?", options: ["6 rows and 5 columns", "6 columns and 5 rows", "30 dimensions", "5 files"], correctOptionIndex: 0, note: "Rows come first.", explanation: "DataFrame shape is (rows, columns)." },
    { title: "Preview", question: "Which method previews the first records?", options: ["head()", "tail()", "drop()", "to_csv()"], correctOptionIndex: 0, note: "head begins at the top.", explanation: "df.head() returns the first rows." },
    { title: "Structure", question: "Which method reports non-null counts and dtypes?", options: ["info()", "describe()", "sample()", "set_index()"], correctOptionIndex: 0, note: "Structural, not statistical.", explanation: "df.info() summarizes schema and completeness." },
    { title: "Statistics", question: "Which method provides a numeric statistical summary?", options: ["describe()", "columns", "index", "read_excel()"], correctOptionIndex: 0, note: "Count, mean, quartiles, and range.", explanation: "df.describe() summarizes numeric columns." },
    { title: "Selection", question: `What does df["Temperature"] return?`, options: ["A Series", "A two-column DataFrame", "A CSV file", "A Boolean only"], correctOptionIndex: 0, note: "One selected column is 1D.", explanation: "Single-column selection returns a Series." },
    { title: "Multiple selection", question: `Which expression keeps a DataFrame?`, options: [`df[["Temperature", "Humidity"]]`, `df["Temperature"]`, `df.shape`, `df.index`], correctOptionIndex: 0, note: "Pass a list of column labels.", explanation: "A list of labels returns a DataFrame." },
    { title: "Drop", question: "Without inplace=True, what does drop() do?", options: ["Returns a new DataFrame", "Always changes df", "Loads a file", "Sets the index"], correctOptionIndex: 0, note: "Assign the result if needed.", explanation: "drop() is non-mutating by default." },
    { title: "Export", question: "Why use index=False when saving?", options: ["Avoid an extra index column", "Delete every identifier", "Remove all headers", "Force Excel format"], correctOptionIndex: 0, note: "The internal index is optional file data.", explanation: "index=False prevents exporting the row index as another column." },
  ],
  assignment: { title: "First Inspection of a Farm Dataset", brief: "Create or load a farm DataFrame, inspect its structure, make one derived feature, and export an intentional result.", deliverables: ["DataFrame created from a dictionary or file", "head and tail previews", "shape, columns, index, and dtypes", "info and describe interpretation", "one Series selection", "one multi-column DataFrame selection", "one derived column", "one removed column", "Field_ID index example", "CSV export with index choice explained"] },
  summarySection: { title: "You can now turn tabular farm data into an inspectable DataFrame", body: "You connected Series to DataFrames, created tables from three Python sources, inspected their axes and types, manipulated columns, and practiced the real-file load and save workflow.", items: ["DataFrame is 2D labeled data", "Rows are observations", "Columns are variables", "Index labels rows", "head and info come before analysis", "One column returns Series", "Several columns return DataFrame", "File exports need an intentional index choice"] },
  keyTakeaways: ["Inspect a new dataset before calculating", "DataFrame shape is rows then columns", "Use info() for structure and describe() for statistics", "Single and multiple column selection return different dimensionality", "Column arithmetic is vectorized", "drop() returns a new DataFrame unless told otherwise", "read_csv() and read_excel() bring real files into Pandas", "index=False avoids saving an unwanted row-index column"],
  whatsNext: { title: "Lesson 7.3 · Selecting, Filtering & Querying", body: "Next, select specific rows and cells with loc and iloc, build Boolean filters, combine conditions, and express readable filters with query()." },
  developmentPack: pandasDataFrameDevelopmentPack,
}];

export const moduleSevenLessonSummaries = [
  { id: "module-7-lesson-1", moduleId: "module-7", order: 1, title: "7.1 Pandas Introduction & Series", estimatedMinutes: 135, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-7-lesson-2", moduleId: "module-7", order: 2, title: "7.2 Pandas DataFrames & Loading Real Data", estimatedMinutes: 150, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-7-lesson-3", moduleId: "module-7", order: 3, title: "7.3 Selecting, Filtering & Querying", estimatedMinutes: 150, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-4", moduleId: "module-7", order: 4, title: "7.4 Cleaning & Preparing Data", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-5", moduleId: "module-7", order: 5, title: "7.5 Transformation & Feature Engineering", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-6", moduleId: "module-7", order: 6, title: "7.6 GroupBy, Aggregation & Analysis", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-7", moduleId: "module-7", order: 7, title: "7.7 Combining & Reshaping Data", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-8", moduleId: "module-7", order: 8, title: "7.8 Real-World Pandas Project", estimatedMinutes: 180, status: "not-started" as const, isPlaceholder: true },
];
