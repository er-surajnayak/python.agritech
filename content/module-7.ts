import { pandasSeriesDevelopmentPack } from "@/content/development-packs/lesson-7-1";
import { pandasDataFrameDevelopmentPack } from "@/content/development-packs/lesson-7-2";
import { pandasSelectionDevelopmentPack } from "@/content/development-packs/lesson-7-3";
import { pandasCleaningDevelopmentPack } from "@/content/development-packs/lesson-7-4";
import { pandasTransformationDevelopmentPack } from "@/content/development-packs/lesson-7-5";
import { pandasGroupByDevelopmentPack } from "@/content/development-packs/lesson-7-6";
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
}, {
  id: "module-7-lesson-3", moduleId: "module-7", number: "7.3", title: "Selecting, Filtering & Querying DataFrames", durationMinutes: 150, level: "Intermediate",
  summary: "Ask practical questions from farm data with label-based loc, position-based iloc, Boolean masks, combined conditions, isin, between, and query.",
  introduction: { title: "From seeing data to asking questions", body: "A DataFrame becomes useful when learners can request exactly the records and features needed for a decision: dry fields, high-yield fields, selected measurements, or a readable multi-condition query." },
  objectives: ["Select one or several columns", "Use loc for label-based selection", "Use iloc for position-based selection", "Explain inclusive loc slicing and exclusive iloc slicing", "Select rows and columns together", "Filter rows with Boolean conditions", "Combine conditions with &, |, and ~", "Explain why and/or do not combine Pandas Series", "Filter multiple values with isin()", "Filter inclusive ranges with between()", "Write readable expressions with query()", "Reference Python variables inside query() with @"],
  whyThisMatters: { title: "Farm decisions start with a precise question", body: "A controller rarely needs every column and every field. Precise selection reduces noise and makes the relationship between a business question, a Boolean mask, and an actionable result visible.", items: ["Identify irrigation fields", "Compare selected measurements", "Combine heat and moisture thresholds", "Keep only decision-relevant columns"] },
  industryMotivation: { title: "Analytical subsets are the foundation of every downstream workflow", body: "Cleaning, reporting, modeling, and monitoring all depend on selecting the correct records without losing alignment between columns.", items: ["Labels protect record identity", "Masks preserve complete matching rows", "Readable queries improve review", "Explicit columns reduce accidental data exposure"], signal: "The most reusable Pandas pattern is df.loc[row_condition, selected_columns]." },
  concept: { title: "Selection asks where; filtering asks whether", body: "loc speaks in labels, iloc speaks in positions, and Boolean filtering retains rows whose conditions evaluate to True.", items: ["loc → labels", "iloc → positions", "& → element-wise AND", "| → element-wise OR", "~ → invert mask", "query → readable expression"] },
  workflow: { title: "Translate a farm question into Pandas", description: "Move from a natural-language requirement to a focused result.", steps: [
    { title: "Name the question", description: "Identify the decision and threshold." }, { title: "Choose rows", description: "Use labels, positions, or a condition." },
    { title: "Choose columns", description: "Keep only relevant measurements." }, { title: "Combine safely", description: "Parenthesize Series conditions and use & or |." },
    { title: "Inspect result", description: "Confirm Field IDs and values." }, { title: "Communicate", description: "Explain the code as the original farm question." },
  ] },
  agritechExample: { title: "Find hot, dry fields", body: "Temperature above 34 and soil moisture below 30 identifies Fields 103 and 105. The result keeps their complete records aligned for an irrigation decision." },
  playground: {
    title: "Run Smart Farm Selection Queries",
    description: "Compare loc and iloc, build Boolean filters, select relevant columns, and use isin, between, query, and query variables.",
    starterCode: `import pandas as pd

data = {
    "Field_ID": [101, 102, 103, 104, 105, 106],
    "Temperature": [28, 32, 35, 29, 38, 31],
    "Humidity": [65, 70, 72, 68, 75, 66],
    "Soil_Moisture": [42, 35, 28, 48, 22, 40],
    "Yield": [520, 480, 410, 560, 390, 510]
}

df = pd.DataFrame(data)
indexed = df.set_index("Field_ID")

print("loc label 103:")
print(indexed.loc[103, ["Temperature", "Yield"]])
print("\\niloc position 2:")
print(df.iloc[2, [0, 1, 4]])

hot_and_dry = df[
    (df["Temperature"] > 34) &
    (df["Soil_Moisture"] < 30)
]
print("\\nHot and dry fields:")
print(hot_and_dry[["Field_ID", "Temperature", "Soil_Moisture"]])

print("\\nSelected IDs:")
print(df[df["Field_ID"].isin([101, 103, 106])])
print("\\nTemperature between 30 and 35:")
print(df[df["Temperature"].between(30, 35)])

min_yield = 500
print("\\nYield above variable threshold:")
print(df.query("Yield > @min_yield")[["Field_ID", "Yield"]])`,
    expectedOutcome: "The runner distinguishes label 103 from position 2, identifies Fields 103 and 105 as hot and dry, selects requested IDs, returns the inclusive temperature range, and finds yields above 500.",
  },
  practice: [
    { level: "Easy", title: "One column", prompt: "Select Temperature as a Series.", guidance: "Use one column label inside brackets." },
    { level: "Easy", title: "Three columns", prompt: "Select Temperature, Humidity, and Yield as a DataFrame.", guidance: "Pass a list of labels." },
    { level: "Medium", title: "Field labels", prompt: "After set_index, use loc to select Fields 101, 103, and 105.", guidance: "Pass the labels as a list." },
    { level: "Medium", title: "First positions", prompt: "Use iloc to return the first three rows.", guidance: "Position slicing excludes 3." },
    { level: "Medium", title: "Dry fields", prompt: "Find fields with soil moisture below 30.", guidance: "Use the comparison Series as a mask." },
    { level: "Medium", title: "Hot and productive", prompt: "Find Temperature > 30 AND Yield > 500.", guidance: "Parenthesize each condition and combine with &." },
    { level: "Challenge", title: "Extreme condition", prompt: "Find Temperature > 34 OR Soil_Moisture < 25.", guidance: "Use | between parenthesized masks." },
    { level: "Challenge", title: "Inclusive range", prompt: "Use between() for temperatures from 30 through 35.", guidance: "Both endpoints are included." },
    { level: "Challenge", title: "Readable query", prompt: "Use query() for Humidity > 68 AND Yield > 400.", guidance: "Inside query strings, use the word and." },
    { level: "Challenge", title: "Focused answer", prompt: "For temperatures above 30, return only Field_ID, Temperature, and Yield.", guidance: "Use df.loc[condition, columns]." },
  ],
  quiz: [
    { title: "loc", question: "What does loc use?", options: ["Labels", "Only integer positions", "File paths", "Dtypes"], correctOptionIndex: 0, note: "Think label.", explanation: "loc selects by row and column labels." },
    { title: "iloc", question: "What does iloc use?", options: ["Integer positions", "Field names only", "SQL strings", "Boolean words"], correctOptionIndex: 0, note: "i means integer position.", explanation: "iloc selects by zero-based position." },
    { title: "loc slice", question: "What does indexed.loc[101:104] include?", options: ["101 through 104", "101 through 103", "Only 104", "Positions 101–104"], correctOptionIndex: 0, note: "The ending label is included.", explanation: "Label slicing with loc is inclusive." },
    { title: "iloc slice", question: "What does df.iloc[:2] return?", options: ["Positions 0 and 1", "Positions 0, 1, and 2", "Label 2", "Last two rows"], correctOptionIndex: 0, note: "Normal Python slicing rules.", explanation: "The ending position is excluded." },
    { title: "AND", question: "Which operator combines two Pandas Series conditions with AND?", options: ["&", "and", "&&", "+"], correctOptionIndex: 0, note: "Parenthesize both comparisons.", explanation: "& performs element-wise Boolean AND." },
    { title: "OR", question: "Which operator combines conditions with OR?", options: ["|", "or", "||", "~"], correctOptionIndex: 0, note: "A single pipe.", explanation: "| performs element-wise Boolean OR." },
    { title: "NOT", question: "What does ~ do to a Boolean mask?", options: ["Inverts it", "Sorts it", "Groups it", "Saves it"], correctOptionIndex: 0, note: "True becomes False.", explanation: "~ performs element-wise logical inversion." },
    { title: "isin", question: "Which method matches values from a list?", options: ["isin()", "between()", "query() only", "iloc()"], correctOptionIndex: 0, note: "Is this value in the list?", explanation: "isin creates a membership mask." },
    { title: "between", question: "Is between(30, 35) inclusive by default?", options: ["Yes, both endpoints", "No endpoints", "Only 30", "Only 35"], correctOptionIndex: 0, note: "30 ≤ value ≤ 35.", explanation: "between includes both limits by default." },
    { title: "query variable", question: "How is min_yield referenced inside query()?", options: ["@min_yield", "$min_yield", "{min_yield}", "#min_yield"], correctOptionIndex: 0, note: "Use @.", explanation: "@ tells query to read a Python variable." },
  ],
  assignment: { title: "Farm Question Workbook", brief: "Answer ten farm questions using labels, positions, masks, membership, ranges, and readable queries.", deliverables: ["One-column Series selection", "Multi-column DataFrame selection", "loc row and grid selections", "iloc row and grid selections", "Single-condition mask", "AND and OR filters", "NOT filter", "isin membership filter", "between range filter", "query with @ variable"] },
  summarySection: { title: "You can now ask focused questions from DataFrames", body: "You selected identities with loc, positions with iloc, matching records with masks, and readable subsets with specialized filtering methods.", items: ["loc uses labels", "iloc uses positions", "loc label ranges include the end", "Boolean masks keep True rows", "& and | combine Series conditions", "~ inverts", "isin matches lists", "between checks ranges", "query expresses readable conditions"] },
  keyTakeaways: ["Use loc when labels carry meaning", "Use iloc when position is the requirement", "Parenthesize every Series comparison", "Use & and | outside query strings", "Use and and or inside query strings", "isin is clearer for membership", "between is clearer for inclusive ranges", "df.loc[condition, columns] produces focused analytical answers"],
  whatsNext: { title: "Lesson 7.4 · Cleaning & Preparing Data", body: "Next, detect and repair missing values, remove duplicates, convert data types, standardize labels, and prepare inconsistent farm data for reliable analysis." },
  developmentPack: pandasSelectionDevelopmentPack,
}, {
  id: "module-7-lesson-4", moduleId: "module-7", number: "7.4", title: "Data Cleaning & Missing Data", durationMinutes: 165, level: "Intermediate",
  summary: "Profile messy farm data, make context-aware decisions about missing values and duplicates, standardize names and text, repair types, and verify the cleaned result.",
  introduction: { title: "A valid DataFrame can still contain unreliable data", body: "Real sensor exports contain missing readings, repeated uploads, numeric values stored as text, inconsistent labels, and mistakes. Cleaning makes those quality problems visible and handles them intentionally." },
  objectives: ["Explain why real-world farm data needs cleaning", "Detect missing cells with isna and isnull", "Count missing values by column and in total", "Locate incomplete rows and affected columns", "Remove missing data with dropna and subset rules", "Fill values with constants, mean, median, forward fill, or backward fill", "Explain why no filling strategy is universally correct", "Detect and remove duplicate records", "Define duplicate identity with subset and keep", "Rename columns consistently", "Inspect and convert dtypes", "Use pd.to_numeric with errors='coerce'", "Standardize basic text with str methods", "Correct known values with replace", "Follow and verify a basic cleaning workflow"],
  whyThisMatters: { title: "A clean-looking result can still be wrong", body: "Replacing every missing reading with zero or deleting every incomplete row may execute without errors while changing the meaning of the farm dataset. Cleaning is a domain decision supported by Pandas tools.", items: ["Missing temperature does not mean 0°C", "Repeated IDs require an identity rule", "Invalid numeric tokens affect calculations", "Crop labels must be standardized before counting"] },
  industryMotivation: { title: "Data quality is part of analysis, not a preliminary chore", body: "Production teams profile inputs, document cleaning rules, preserve raw data, and verify outputs because every downstream dashboard and model inherits these decisions.", items: ["Connectivity gaps create missing sensor readings", "Retries can duplicate uploads", "CSV imports can infer wrong types", "Manual entry introduces text variants"], signal: "Profile → decide → transform → verify is safer than applying a universal cleaning recipe." },
  concept: { title: "Cleaning separates evidence from decisions", body: "Detection methods report what is wrong. Transformation methods change the data. The engineer must connect both with the reason for missingness, the feature meaning, and the analytical goal.", items: ["isna detects", "dropna removes", "fillna estimates or substitutes", "duplicated identifies repetition", "to_numeric exposes invalid tokens", "verification confirms the rule"] },
  workflow: { title: "A basic cleaning workflow", description: "Understand the raw table before applying and verifying changes.", steps: [
    { title: "Profile", description: "Inspect shape, labels, types, and sample rows." }, { title: "Detect", description: "Count missing cells and duplicates." },
    { title: "Decide", description: "Use domain context to choose rules." }, { title: "Standardize", description: "Normalize names, text, and types." },
    { title: "Handle", description: "Drop, fill, coerce, or deduplicate intentionally." }, { title: "Verify", description: "Recount quality indicators and inspect results." },
  ] },
  agritechExample: { title: "Repair a farm-monitoring export", body: "The lesson profiles five missing cells, one duplicate Field 105 upload, and inconsistent Rice labels. Each operation displays both its effect and the reasoning required before adopting it." },
  playground: {
    title: "Run a Context-Aware Cleaning Pipeline",
    description: "Detect quality problems, remove a repeated upload, standardize crop text, convert numeric data safely, fill selected sensor gaps, rename columns, and verify the result.",
    starterCode: `import pandas as pd
import numpy as np

data = {
    "Field_ID": [101, 102, 103, 104, 105, 105],
    "Temperature": [28, 32, np.nan, 29, 38, 38],
    "Humidity": [65, np.nan, 72, 68, 75, 75],
    "Soil_Moisture": [42, 35, 28, np.nan, 22, 22],
    "Yield": ["520", "480", "410", "560", "unknown", "unknown"],
    "Crop_Type": [" Rice ", "rice", "Wheat", "wheat", "RICE", "RICE"]
}

df = pd.DataFrame(data)
print("Missing by column:")
print(df.isna().sum())
print("Duplicate rows:", df.duplicated().sum())

clean = df.drop_duplicates(subset=["Field_ID"], keep="first").copy()
clean["Yield"] = pd.to_numeric(clean["Yield"], errors="coerce")
clean["Crop_Type"] = clean["Crop_Type"].str.strip().str.lower()
clean["Temperature"] = clean["Temperature"].fillna(clean["Temperature"].mean())
clean["Humidity"] = clean["Humidity"].ffill()
clean["Soil_Moisture"] = clean["Soil_Moisture"].fillna(clean["Soil_Moisture"].median())
clean["Yield"] = clean["Yield"].fillna(clean["Yield"].median())
clean = clean.rename(columns={"Soil_Moisture": "soil_moisture", "Crop_Type": "crop_type"})

print("\\nCleaned dataset:")
print(clean)
print("\\nRemaining missing:", clean.isna().sum().sum())
print("Remaining duplicate IDs:", clean.duplicated(subset=["Field_ID"]).sum())
print("Data types:")
print(clean.dtypes)`,
    expectedOutcome: "The runner finds missing values and one duplicate, converts 'unknown' to NaN, standardizes crop labels, applies column-specific fills, keeps one record per Field ID, and verifies zero remaining missing cells and duplicate IDs.",
  },
  practice: [
    { level: "Easy", title: "Missing mask", prompt: "Display the Boolean missing-value matrix.", guidance: "Use isna(); isnull() is equivalent." },
    { level: "Easy", title: "Missing counts", prompt: "Count missing values per column and in total.", guidance: "Chain sum once, then twice." },
    { level: "Easy", title: "Duplicate count", prompt: "Count duplicate rows.", guidance: "Call duplicated(), then sum()." },
    { level: "Medium", title: "Drop selectively", prompt: "Remove only rows whose Yield is missing.", guidance: "Use dropna with subset=[...]." },
    { level: "Medium", title: "Temperature estimate", prompt: "Fill missing Temperature with its observed mean.", guidance: "Assign the filled Series back to the column." },
    { level: "Medium", title: "Median yield", prompt: "Fill missing Yield with the median and explain why median may be useful.", guidance: "Consider sensitivity to extreme values." },
    { level: "Medium", title: "Sequential humidity", prompt: "Compare ffill and bfill for the humidity gap.", guidance: "One uses the previous valid value; the other uses the next." },
    { level: "Medium", title: "Identifier duplicates", prompt: "Keep the first record for each Field_ID.", guidance: "Use subset and keep explicitly." },
    { level: "Medium", title: "Rename features", prompt: "Rename Soil_Moisture and Crop_Type to snake_case.", guidance: "Pass a columns mapping to rename()." },
    { level: "Challenge", title: "Messy numeric text", prompt: "Convert Yield containing 'unknown' into numeric data with inspectable gaps.", guidance: "Use pd.to_numeric(errors='coerce')." },
    { level: "Challenge", title: "Crop labels", prompt: "Standardize ' Rice ', 'rice', and 'RICE'.", guidance: "Chain str.strip() and str.lower()." },
    { level: "Challenge", title: "Verified pipeline", prompt: "Build and justify a cleaning pipeline, then verify missing counts, duplicates, and dtypes.", guidance: "Keep rules column-specific and check the result." },
  ],
  quiz: [
    { title: "Alias", question: "How are isna() and isnull() related?", options: ["They are aliases", "isnull only works on Series", "isna removes rows", "They return counts directly"], correctOptionIndex: 0, note: "Teach isna primarily.", explanation: "Both produce the same missing-value mask." },
    { title: "Count", question: "What does df.isna().sum() return?", options: ["Missing count per column", "One total only", "Duplicate rows", "Cleaned data"], correctOptionIndex: 0, note: "sum operates down rows by default.", explanation: "Each column receives its own count." },
    { title: "Rows", question: "What does df.isna().any(axis=1) identify?", options: ["Rows with at least one missing cell", "Only empty columns", "Duplicate indexes", "Numeric types"], correctOptionIndex: 0, note: "axis=1 checks across columns.", explanation: "any becomes True for an incomplete row." },
    { title: "dropna", question: "Why use subset=['Yield']?", options: ["Drop rows only when Yield is missing", "Rename Yield", "Fill every value", "Convert Yield to text"], correctOptionIndex: 0, note: "Target the important feature.", explanation: "subset limits the missing-value rule." },
    { title: "Fill", question: "Is mean filling always the correct choice?", options: ["No, context determines the strategy", "Yes, for every column", "Only for text", "It removes duplicates"], correctOptionIndex: 0, note: "Cleaning is a decision.", explanation: "Missingness, feature meaning, and analytical goals matter." },
    { title: "Sequential", question: "What does ffill() use?", options: ["Previous valid value", "Next valid value", "Column mean", "Zero"], correctOptionIndex: 0, note: "Forward carries the past value.", explanation: "ffill propagates the previous observation." },
    { title: "Duplicates", question: "Which method detects duplicate records?", options: ["duplicated()", "dropna()", "isna()", "astype()"], correctOptionIndex: 0, note: "Detection before removal.", explanation: "duplicated returns a Boolean Series." },
    { title: "Identity", question: "Why specify subset=['Field_ID'] when deduplicating?", options: ["Define the identity rule", "Fill Field_ID", "Sort the table", "Rename the index"], correctOptionIndex: 0, note: "State what counts as repeated.", explanation: "subset selects the columns used to compare records." },
    { title: "Coerce", question: "What does errors='coerce' do in to_numeric()?", options: ["Invalid values become NaN", "Invalid values become zero", "Rows are deleted", "Columns are renamed"], correctOptionIndex: 0, note: "Expose the problem.", explanation: "Coercion produces missing values for invalid tokens." },
    { title: "Text", question: "What does str.strip() remove?", options: ["Leading and trailing whitespace", "Duplicate rows", "Numeric decimals", "Missing columns"], correctOptionIndex: 0, note: "Clean surrounding spaces.", explanation: "strip standardizes text boundaries." },
  ],
  assignment: { title: "Messy Farm Dataset Audit", brief: "Profile, clean, justify, and verify a deliberately inconsistent farm export.", deliverables: ["Raw-data profile", "Missing count per column and total", "Incomplete-row inspection", "Duplicate identity rule", "One drop decision", "Two justified fill strategies", "Numeric coercion", "Column renaming", "Text standardization", "Known-value replacement", "Before/after comparison", "Verification report"] },
  summarySection: { title: "You can now prepare messy farm data for trustworthy analysis", body: "You separated detection from transformation, applied column-specific missing-value strategies, defined duplicate identity, standardized schema and text, converted data safely, and verified the result.", items: ["isna and isnull detect missingness", "dropna can target subsets", "fill strategies require context", "ffill and bfill suit sequential data", "duplicates require an identity rule", "to_numeric can expose invalid tokens", "text and column names need standards", "verification is part of cleaning"] },
  keyTakeaways: ["Preserve raw data before cleaning", "Profile before modifying", "Do not equate missing with zero", "Choose drop or fill rules per feature", "Document what defines a duplicate", "Coercion reveals invalid numeric text as NaN", "Standardize crop labels before analysis", "Re-run quality checks after every cleaning pipeline"],
  whatsNext: { title: "Lesson 7.5 · Transformation & Feature Engineering", body: "Next, derive useful farm features, map and replace values, apply functions, sort records, and transform a clean dataset for analysis." },
  developmentPack: pandasCleaningDevelopmentPack,
}, {
  id: "module-7-lesson-5", moduleId: "module-7", number: "7.5", title: "Data Transformation & Feature Engineering", durationMinutes: 165, level: "Intermediate",
  summary: "Transform clean farm data with vectorized expressions, map and apply rules, create explainable derived features, then sort and validate the analytical result.",
  introduction: { title: "Clean data becomes useful information", body: "Transformation changes the representation of existing data. Feature engineering creates meaningful new variables from existing measurements so analysts and future models can answer better farm questions." },
  objectives: ["Distinguish cleaning, transformation, and feature engineering", "Create derived columns with vectorized operations", "Build ratio and difference features", "Create conditional features with np.where", "Create multi-category features with np.select", "Transform Series values with map", "Use apply with custom functions and readable lambdas", "Use apply(axis=1) for row-aware rules", "Replace values and convert simple data types", "Apply basic string transformations", "Sort by one or several columns and reset the index", "Create and validate an explainable farm risk score"],
  whyThisMatters: { title: "Raw measurements rarely answer the final question", body: "Temperature, moisture, and yield are valuable inputs. Derived units, categories, gaps, ratios, and risk indicators turn those inputs into information a farm team can interpret consistently.", items: ["Convert units without loops", "Express irrigation thresholds clearly", "Rank fields while preserving complete rows", "Prepare explainable features for later analysis and ML"] },
  industryMotivation: { title: "Feature definitions become part of the data product", body: "Production analysts document formulas, units, category coverage, thresholds, and validation checks because an engineered column can influence dashboards, alerts, and model behavior.", items: ["A threshold needs agronomic justification", "map dictionaries need complete category coverage", "Ratios need compatible units and safe denominators", "Features should remain explainable to decision makers"], signal: "Choose the farm question → define the feature → validate the result is safer than engineering columns simply because the syntax is available." },
  concept: { title: "Prefer the clearest expression of the rule", body: "Vectorized arithmetic is ideal for column formulas, map for known value-to-value mappings, np.where or np.select for categories, and apply for custom logic that cannot be stated more clearly with direct Pandas operations.", items: ["Vectorized columns", "map for Series values", "apply for custom logic", "axis=1 for row context", "sort_values for ranking", "reset_index for clean positions"] },
  workflow: { title: "An explainable feature workflow", description: "Turn a clean dataset and a real question into a validated signal.", steps: [
    { title: "Question", description: "State the farm decision the feature supports." }, { title: "Formula", description: "Define units, thresholds, and categories." },
    { title: "Transform", description: "Use the clearest vectorized or custom method." }, { title: "Inspect", description: "Compare the new values with their inputs." },
    { title: "Validate", description: "Check edge cases and category coverage." }, { title: "Interpret", description: "Sort or summarize without losing record alignment." },
  ] },
  agritechExample: { title: "Build a transparent field risk indicator", body: "One point marks temperature above 34°C and one marks soil moisture below 30. Their sum produces an explainable 0–2 score, which maps to Low, Moderate, and High risk." },
  playground: {
    title: "Run a Smart Farm Feature Pipeline",
    description: "Create vectorized, conditional, mapped, applied, and row-aware features, then rank the complete farm records by risk and yield.",
    starterCode: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "Field_ID": [101, 102, 103, 104, 105, 106],
    "Temperature": [28, 32, 35, 29, 38, 31],
    "Humidity": [65, 70, 72, 68, 75, 66],
    "Soil_Moisture": [42, 35, 28, 48, 22, 40],
    "Yield": [520, 480, 410, 560, 390, 510],
    "Crop": ["Rice", "Wheat", "Rice", "Maize", "Rice", "Wheat"]
})

df["Temperature_F"] = df["Temperature"] * 9/5 + 32
df["Yield_per_Moisture"] = (df["Yield"] / df["Soil_Moisture"]).round(2)
df["Moisture_Gap"] = 40 - df["Soil_Moisture"]
df["Irrigation_Need"] = np.where(df["Soil_Moisture"] < 30, "Required", "Not Required")

conditions = [
    df["Soil_Moisture"] < 25,
    df["Soil_Moisture"].between(25, 35),
    df["Soil_Moisture"] > 35
]
df["Moisture_Status"] = np.select(conditions, ["Critical", "Low", "Adequate"], default="Unknown")
df["Crop_Code"] = df["Crop"].map({"Rice": "R", "Wheat": "W", "Maize": "M"})

def classify_yield(value):
    if value >= 500:
        return "High"
    if value >= 450:
        return "Medium"
    return "Low"

df["Yield_Category"] = df["Yield"].apply(classify_yield)
df["Risk_Score"] = (
    (df["Temperature"] > 34).astype(int)
    + (df["Soil_Moisture"] < 30).astype(int)
)
df["Risk_Level"] = df["Risk_Score"].map({0: "Low", 1: "Moderate", 2: "High"})

ranked = df.sort_values(
    by=["Risk_Score", "Yield"],
    ascending=[False, False]
).reset_index(drop=True)

print(ranked[[
    "Field_ID", "Temperature_F", "Moisture_Status",
    "Irrigation_Need", "Yield_Category", "Risk_Score", "Risk_Level"
]])`,
    expectedOutcome: "The runner creates unit, ratio, gap, condition, category, mapping, and risk features, then ranks Fields 103 and 105 as High risk while preserving every complete farm record.",
  },
  practice: [
    { level: "Easy", title: "Convert units", prompt: "Create Temperature_F from the Celsius column.", guidance: "Use the vectorized 9/5 + 32 formula." },
    { level: "Easy", title: "Rank yields", prompt: "Sort fields from highest to lowest Yield.", guidance: "Use sort_values with ascending=False." },
    { level: "Medium", title: "Efficiency ratio", prompt: "Create Yield_per_Moisture and explain its units.", guidance: "Divide the two Series directly and validate the denominator." },
    { level: "Medium", title: "Irrigation label", prompt: "Use np.where to mark moisture below 30 as Required.", guidance: "Provide condition, true label, and false label." },
    { level: "Medium", title: "Moisture categories", prompt: "Use np.select to create Critical, Low, and Adequate categories.", guidance: "Order the conditions intentionally because first match wins." },
    { level: "Medium", title: "Crop codes", prompt: "Map Rice, Wheat, and Maize to R, W, and M.", guidance: "Validate that every crop appears in the mapping." },
    { level: "Medium", title: "Yield classifier", prompt: "Use apply with a function to return High, Medium, or Low.", guidance: "Write and test the function before applying it." },
    { level: "Challenge", title: "Row-wise urgency", prompt: "Use apply(axis=1) to mark hot and dry fields Urgent.", guidance: "The function needs both Temperature and Soil_Moisture from one row." },
    { level: "Challenge", title: "Risk feature", prompt: "Create Risk_Score from two Boolean conditions, then map Risk_Level.", guidance: "Convert each Boolean Series to int before adding." },
    { level: "Challenge", title: "Multi-column ranking", prompt: "Sort risk descending and Yield descending, then reset the index.", guidance: "Pass two labels and two ascending flags." },
    { level: "Challenge", title: "Method decision", prompt: "Choose map, apply, np.where, or vectorized arithmetic for four proposed rules and justify each choice.", guidance: "Prefer the simplest clear expression." },
    { level: "Challenge", title: "Validated pipeline", prompt: "Build, inspect, validate, and rank the complete farm risk pipeline.", guidance: "Check units, thresholds, missing mappings, and resulting categories." },
  ],
  quiz: [
    { title: "Distinction", question: "What best describes feature engineering?", options: ["Creating useful variables from existing data", "Only removing duplicates", "Loading a CSV", "Selecting one row"], correctOptionIndex: 0, note: "Create information.", explanation: "Feature engineering derives meaningful analytical signals." },
    { title: "Vectorization", question: "Why can df['Temperature'] * 9/5 + 32 avoid a loop?", options: ["Pandas applies the operation across the Series", "It changes one row only", "It loads NumPy automatically", "It sorts first"], correctOptionIndex: 0, note: "Column-wide arithmetic.", explanation: "Pandas operations are vectorized." },
    { title: "where", question: "What does np.where(condition, yes, no) create?", options: ["A two-way conditional result", "Only sorted indexes", "Duplicate rows", "A groupby"], correctOptionIndex: 0, note: "True or false branch.", explanation: "Each row receives the matching choice." },
    { title: "select", question: "When is np.select useful?", options: ["Several ordered conditions and choices", "Reading Excel", "Dropping nulls only", "Renaming one column only"], correctOptionIndex: 0, note: "Multi-category rules.", explanation: "np.select handles several conditional branches." },
    { title: "map", question: "What happens when a dictionary map has no matching key?", options: ["The result is NaN", "The original value is guaranteed", "The row is deleted", "Pandas raises every time"], correctOptionIndex: 0, note: "Validate coverage.", explanation: "Unmapped values become missing." },
    { title: "apply", question: "Which tool applies a custom classify_yield function to each Yield value?", options: ["Series.apply()", "DataFrame.shape", "read_csv()", "dropna()"], correctOptionIndex: 0, note: "Custom value logic.", explanation: "Series.apply calls the function for each value." },
    { title: "axis", question: "What does df.apply(function, axis=1) pass to the function?", options: ["Each row", "Each filename", "Only the index", "The whole project"], correctOptionIndex: 0, note: "Across columns per record.", explanation: "axis=1 performs row-wise apply." },
    { title: "Risk", question: "What Risk_Score results when both conditions are True?", options: ["2", "1", "0", "NaN"], correctOptionIndex: 0, note: "True converts to 1.", explanation: "Two true integer conditions add to 2." },
    { title: "Sort", question: "What does ascending=[True, False] mean for two sort columns?", options: ["First ascending, second descending", "Both ascending", "Both descending", "Reset the index"], correctOptionIndex: 0, note: "Flags align with labels.", explanation: "Each column receives its corresponding direction." },
    { title: "Reset", question: "Why use reset_index(drop=True) after sorting?", options: ["Create clean positions without keeping the old index", "Delete all columns", "Convert types", "Fill missing values"], correctOptionIndex: 0, note: "drop discards old labels.", explanation: "The sorted result receives a fresh RangeIndex." },
  ],
  assignment: { title: "Explainable Farm Feature Pipeline", brief: "Transform the cleaned farm table into a documented, validated, and ranked decision dataset.", deliverables: ["Celsius-to-Fahrenheit feature", "Ratio and difference features", "np.where binary category", "np.select multi-category feature", "map dictionary with coverage check", "custom apply function", "one row-wise rule", "string and dtype transformation", "Risk_Score and Risk_Level", "multi-column sort", "reset index", "validation explanation"] },
  summarySection: { title: "You can now turn clean columns into useful farm signals", body: "You used vectorized formulas, conditional functions, mappings, custom functions, row-wise rules, type and text transformations, sorting, and index resetting to build explainable features.", items: ["Transformation changes representation", "Feature engineering creates information", "Vectorization is concise and efficient", "map handles value mappings", "apply supports custom rules", "axis=1 supplies complete rows", "np.where and np.select create categories", "sort_values ranks complete records"] },
  keyTakeaways: ["Clean before transforming", "Start with a farm question", "Prefer vectorized expressions when clear", "Validate map category coverage", "Use row-wise apply only when row context is needed", "Document thresholds and units", "Keep features explainable", "Inspect and validate engineered outputs before analysis or ML"],
  whatsNext: { title: "Lesson 7.6 · GroupBy, Aggregation & Analysis", body: "Next, divide farm records into meaningful groups, calculate multiple summaries, count categories, and compare crops, regions, and sensor conditions." },
  developmentPack: pandasTransformationDevelopmentPack,
}, {
  id: "module-7-lesson-6", moduleId: "module-7", number: "7.6", title: "GroupBy, Aggregation & Summary Analysis", durationMinutes: 165, level: "Intermediate",
  summary: "Move from individual farm records to crop and region insights with groupby, common aggregations, named summaries, row-aligned transform, filtering, and ranking.",
  introduction: { title: "Many rows can answer one comparative question", body: "Grouping separates records by a meaningful category. Aggregation then calculates a statistic for each group so crops, regions, and conditions can be compared fairly." },
  objectives: ["Explain why grouping is needed", "Create grouped objects with groupby", "Calculate mean, sum, median, minimum, maximum, count, and standard deviation", "Group by one or several columns", "Use agg for several metrics", "Apply different functions to different columns", "Create named aggregations", "Distinguish count from size", "Keep or restore grouping columns", "Sort and filter aggregated results", "Use transform to align group statistics to original rows", "Answer practical Agritech questions with grouped data"],
  whyThisMatters: { title: "Averages become meaningful when the comparison group is clear", body: "A single farm-wide average can hide differences between Rice, Wheat, Maize, North, and South. Group summaries preserve those categories while reducing many rows into useful evidence.", items: ["Compare crop performance", "Identify regional patterns", "Measure within-group variation", "Benchmark each field against its crop average"] },
  industryMotivation: { title: "Grouped summaries power operational reports", body: "Analysts use grouped tables to compare sites, products, seasons, devices, and treatment groups. Clear grouping keys, missing-value rules, and output labels make those summaries auditable.", items: ["Crop reports need more than one total", "count and size answer different completeness questions", "Named aggregations produce stable output schemas", "transform supports row-level benchmarking"], signal: "Define the group → choose the metric → choose the statistic → interpret the result." },
  concept: { title: "GroupBy follows split, apply, combine", body: "Pandas splits rows by keys, applies calculations within each group, and combines the answers. A direct aggregation reduces rows; transform broadcasts one group calculation back to every original row.", items: ["Split on Crop or Region", "Apply mean, sum, or another statistic", "Combine one row per group", "Use agg for richer summaries", "Use transform for original-row alignment"] },
  workflow: { title: "A grouped analysis workflow", description: "Build summaries that preserve meaning and remain easy to inspect.", steps: [
    { title: "Question", description: "State which groups must be compared." }, { title: "Group", description: "Choose one or more category columns." },
    { title: "Metric", description: "Select the numeric or count target." }, { title: "Aggregate", description: "Choose statistics that answer the question." },
    { title: "Shape", description: "Name, reset, filter, or sort the result." }, { title: "Interpret", description: "Explain group differences and limitations." },
  ] },
  agritechExample: { title: "Benchmark each field against its crop", body: "The lesson calculates one average yield per crop, then uses transform('mean') to place that benchmark beside every field and derive Yield_vs_Crop_Avg." },
  playground: {
    title: "Run a Complete Agritech Group Analysis",
    description: "Create crop and region summaries, named aggregations, count rows, filter high-performing crops, and benchmark every field against its crop average.",
    starterCode: `import pandas as pd

df = pd.DataFrame({
    "Field_ID": [101, 102, 103, 104, 105, 106, 107, 108],
    "Crop": ["Rice", "Rice", "Wheat", "Wheat", "Rice", "Wheat", "Maize", "Maize"],
    "Region": ["North", "South", "North", "South", "North", "North", "South", "South"],
    "Temperature": [28, 32, 35, 29, 30, 31, 33, 34],
    "Soil_Moisture": [42, 35, 28, 48, 40, 39, 30, 27],
    "Yield": [520, 480, 410, 560, 500, 510, 430, 450]
})

crop_summary = df.groupby("Crop", as_index=False).agg(
    average_yield=("Yield", "mean"),
    minimum_yield=("Yield", "min"),
    maximum_yield=("Yield", "max"),
    average_moisture=("Soil_Moisture", "mean"),
    field_count=("Field_ID", "count")
)
crop_summary = crop_summary.sort_values("average_yield", ascending=False)
print("Crop summary:")
print(crop_summary.round(2))

print("\\nCrop + Region average yield:")
print(df.groupby(["Crop", "Region"])["Yield"].mean().round(2))

print("\\nHigh-performing crop groups:")
print(crop_summary[crop_summary["average_yield"] > 480])

df["Crop_Avg_Yield"] = df.groupby("Crop")["Yield"].transform("mean")
df["Yield_vs_Crop_Avg"] = df["Yield"] - df["Crop_Avg_Yield"]
print("\\nField benchmarks:")
print(df[["Field_ID", "Crop", "Yield", "Crop_Avg_Yield", "Yield_vs_Crop_Avg"]].round(2))

print("\\nRows per crop:")
print(df.groupby("Crop").size())`,
    expectedOutcome: "The runner ranks Rice highest by average yield, shows Crop + Region combinations, filters Rice and Wheat above 480, attaches each crop average to all eight records, and reveals above- or below-average fields.",
  },
  practice: [
    { level: "Easy", title: "Average by crop", prompt: "Find average Yield for each Crop.", guidance: "Group on Crop, select Yield, then call mean()." },
    { level: "Easy", title: "Regional total", prompt: "Find total Yield for each Region.", guidance: "Use groupby('Region') and sum()." },
    { level: "Easy", title: "Maximum temperature", prompt: "Find maximum Temperature for every Crop.", guidance: "Select Temperature after grouping." },
    { level: "Medium", title: "Three yield metrics", prompt: "Return minimum, maximum, and mean Yield by Crop.", guidance: "Pass a list of function names to agg()." },
    { level: "Medium", title: "Count fields", prompt: "Count all rows in each Region and explain size versus count.", guidance: "size counts rows; count ignores missing values in selected columns." },
    { level: "Medium", title: "Crop and region", prompt: "Find average Yield for every Crop + Region combination.", guidance: "Pass both grouping labels as a list." },
    { level: "Medium", title: "Rank crops", prompt: "Sort crops from highest to lowest average Yield.", guidance: "Aggregate first, then sort the calculated values." },
    { level: "Challenge", title: "Named summary", prompt: "Create average_yield, maximum_yield, minimum_yield, and average_soil_moisture by Crop.", guidance: "Use named aggregation tuples." },
    { level: "Challenge", title: "Keep Crop as a column", prompt: "Create the mean summary using as_index=False, then compare with reset_index().", guidance: "Both can produce an ordinary grouping column." },
    { level: "Challenge", title: "Row-aligned benchmark", prompt: "Attach Crop_Avg_Yield to every original field with transform.", guidance: "transform returns the same length as df." },
    { level: "Challenge", title: "Above crop average", prompt: "Create Yield_vs_Crop_Avg and keep fields with positive values.", guidance: "Subtract the transformed mean, then Boolean-filter." },
    { level: "Challenge", title: "Complete group report", prompt: "Build, filter, sort, and interpret a crop-level summary plus field benchmarks.", guidance: "Separate group-level and row-level outputs." },
  ],
  quiz: [
    { title: "Grouped object", question: "What does df.groupby('Crop') create by itself?", options: ["A grouped object awaiting an operation", "A final mean table", "A merged DataFrame", "A chart"], correctOptionIndex: 0, note: "Group first, calculate next.", explanation: "Grouping defines partitions but does not choose a metric or statistic." },
    { title: "Mean", question: "Which expression calculates average Yield per Crop?", options: [`df.groupby("Crop")["Yield"].mean()`, `df["Crop"].mean()`, `df.merge("Crop")`, `df.size`], correctOptionIndex: 0, note: "Group, select, aggregate.", explanation: "The selected Yield values are averaged within Crop groups." },
    { title: "Multiple groups", question: "How do you group by Crop and Region?", options: [`groupby(["Crop", "Region"])`, `groupby("Crop + Region")`, `groupby(2)`, `agg("Region")`], correctOptionIndex: 0, note: "Pass a label list.", explanation: "Several keys create nested combinations." },
    { title: "agg", question: "What is agg() primarily useful for?", options: ["Requesting several or column-specific calculations", "Loading files", "Removing duplicates", "Selecting one cell"], correctOptionIndex: 0, note: "Build richer summaries.", explanation: "agg accepts lists, dictionaries, and named aggregation rules." },
    { title: "Count", question: "Which method counts all rows in each group?", options: ["size()", "count() always", "mean()", "transform()"], correctOptionIndex: 0, note: "Missing metrics still count as rows.", explanation: "size measures group length." },
    { title: "Missing values", question: "What does grouped count() exclude?", options: ["Missing values in the counted column", "Every complete row", "Group labels", "Numeric values"], correctOptionIndex: 0, note: "Non-null count.", explanation: "count reports non-missing observations." },
    { title: "Index", question: "What does as_index=False do?", options: ["Keeps grouping keys as ordinary columns", "Deletes groups", "Sorts descending", "Broadcasts means"], correctOptionIndex: 0, note: "Analysis-ready table.", explanation: "The grouping keys are not moved into the index." },
    { title: "Transform", question: "How does transform('mean') differ from mean()?", options: ["It aligns group means to every original row", "It returns one value total", "It removes groups", "It counts rows"], correctOptionIndex: 0, note: "Same length as original.", explanation: "Transform broadcasts each group's result to its members." },
    { title: "Sort", question: "How should average-yield groups be ranked?", options: ["sort_values on the calculated metric", "sort_index only", "drop_duplicates", "read_csv"], correctOptionIndex: 0, note: "Sort values, not labels.", explanation: "sort_values orders groups by their summary result." },
    { title: "Benchmark", question: "What does a positive Yield_vs_Crop_Avg mean?", options: ["The field is above its crop average", "Yield is missing", "The crop has one row", "The index was reset"], correctOptionIndex: 0, note: "Individual minus benchmark.", explanation: "Positive values exceed the transformed crop mean." },
  ],
  assignment: { title: "Agritech Group Summary Report", brief: "Create crop and regional summaries, then benchmark every field against its crop group.", deliverables: ["Single-column groupby", "Seven common aggregations", "Crop + Region summary", "Multi-function agg", "Per-column agg rules", "Named aggregation table", "count versus size explanation", "as_index/reset_index comparison", "Sorted and filtered groups", "Crop_Avg_Yield transform", "Yield_vs_Crop_Avg", "Interpretation of above-average fields"] },
  summarySection: { title: "You can now turn repeated farm records into group-level insight", body: "You grouped on one and multiple keys, applied common and custom aggregations, shaped and ranked summaries, distinguished row counts from value counts, and broadcast crop benchmarks back to original rows.", items: ["groupby defines categories", "aggregation reduces groups", "agg builds richer summaries", "named aggregation labels outputs", "size counts rows", "count counts non-null values", "transform preserves original row alignment", "sorted and filtered summaries answer business questions"] },
  keyTakeaways: ["A grouped object needs a metric and operation", "Choose groups that match the question", "Use agg for analysis-ready summaries", "Use named aggregation for stable labels", "Do not confuse count with size", "Use as_index=False or reset_index intentionally", "Use transform when every row needs its group benchmark", "Interpret variation and small group sizes carefully"],
  whatsNext: { title: "Lesson 7.7 · Combining & Reshaping Data", body: "Next, connect related farm tables with merge and join, append compatible datasets with concat, and reshape summaries with pivot tables." },
  developmentPack: pandasGroupByDevelopmentPack,
}];

export const moduleSevenLessonSummaries = [
  { id: "module-7-lesson-1", moduleId: "module-7", order: 1, title: "7.1 Pandas Introduction & Series", estimatedMinutes: 135, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-7-lesson-2", moduleId: "module-7", order: 2, title: "7.2 Pandas DataFrames & Loading Real Data", estimatedMinutes: 150, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-7-lesson-3", moduleId: "module-7", order: 3, title: "7.3 Selecting, Filtering & Querying DataFrames", estimatedMinutes: 150, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-7-lesson-4", moduleId: "module-7", order: 4, title: "7.4 Data Cleaning & Missing Data", estimatedMinutes: 165, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-7-lesson-5", moduleId: "module-7", order: 5, title: "7.5 Data Transformation & Feature Engineering", estimatedMinutes: 165, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-7-lesson-6", moduleId: "module-7", order: 6, title: "7.6 GroupBy, Aggregation & Summary Analysis", estimatedMinutes: 165, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-7-lesson-7", moduleId: "module-7", order: 7, title: "7.7 Combining & Reshaping Data", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-7-lesson-8", moduleId: "module-7", order: 8, title: "7.8 Real-World Pandas Project", estimatedMinutes: 180, status: "not-started" as const, isPlaceholder: true },
];
