import type { PandasSelectionDevelopmentPack } from "@/types/content";

export const pandasSelectionDevelopmentPack: PandasSelectionDevelopmentPack = {
  kind: "pandas-selection-filtering",
  prerequisite: "Lesson 7.2 · Pandas DataFrames & Loading Real Data",
  storyHook: "Inspection tells us what a dataset contains. Selection and filtering let us ask which fields, measurements, and conditions matter to the next farm decision.",
  dataset: {
    columns: ["Field_ID", "Temperature", "Humidity", "Soil_Moisture", "Yield"],
    rows: [[101, 28, 65, 42, 520], [102, 32, 70, 35, 480], [103, 35, 72, 28, 410], [104, 29, 68, 48, 560], [105, 38, 75, 22, 390], [106, 31, 66, 40, 510]],
  },
  selectionExamples: [
    { id: "columns", label: "Columns", code: `df[["Field_ID", "Temperature", "Yield"]]`, explanation: "A list of column labels keeps a DataFrame." },
    { id: "loc-row", label: "loc row", code: "indexed.loc[103]", explanation: "loc asks for the row whose index label is 103." },
    { id: "loc-range", label: "loc range", code: "indexed.loc[101:104]", explanation: "Label slicing includes both 101 and the ending label 104." },
    { id: "loc-grid", label: "loc cells", code: `indexed.loc[[101, 103, 105], ["Temperature", "Yield"]]`, explanation: "Choose row labels and column labels together." },
    { id: "iloc-row", label: "iloc row", code: "df.iloc[2]", explanation: "iloc asks for position 2: the third row." },
    { id: "iloc-grid", label: "iloc cells", code: "df.iloc[0:3, [0, 2, 4]]", explanation: "Choose row positions 0–2 and column positions 0, 2, and 4." },
  ],
  filterColumns: [
    { id: "Temperature", label: "Temperature" }, { id: "Humidity", label: "Humidity" },
    { id: "Soil_Moisture", label: "Soil Moisture" }, { id: "Yield", label: "Yield" },
  ],
  operators: [">", ">=", "<", "<=", "=="],
  queryExamples: [
    { title: "Boolean mask", code: `df[df["Soil_Moisture"] < 30]`, result: "Fields 103 and 105", explanation: "True rows stay in the result." },
    { title: "isin()", code: `df[df["Field_ID"].isin([101, 103, 106])]`, result: "Fields 101, 103, and 106", explanation: "Match any value from a list." },
    { title: "between()", code: `df[df["Temperature"].between(30, 35)]`, result: "Fields 102, 103, and 106", explanation: "Both endpoints are included by default." },
    { title: "query()", code: `df.query("Temperature > 30 and Soil_Moisture < 35")`, result: "Fields 103 and 105", explanation: "Write a readable condition string." },
    { title: "query() variable", code: `min_yield = 500
df.query("Yield > @min_yield")`, result: "Fields 101, 104, and 106", explanation: "@ reads a Python variable inside the query." },
    { title: "NOT", code: `df[~df["Field_ID"].isin([103, 105])]`, result: "All fields except 103 and 105", explanation: "~ inverts a Boolean Series." },
  ],
  quickReference: [
    { task: "One column", code: `df["col"]` }, { task: "Many columns", code: `df[["a", "b"]]` },
    { task: "Labels", code: "df.loc[rows, columns]" }, { task: "Positions", code: "df.iloc[rows, columns]" },
    { task: "Filter", code: "df[condition]" }, { task: "AND / OR / NOT", code: "& · | · ~" },
    { task: "Multiple values", code: ".isin([...])" }, { task: "Inclusive range", code: ".between(low, high)" },
    { task: "Readable filter", code: `df.query("...")` }, { task: "Query variable", code: "@variable" },
    { task: "Filter + columns", code: "df.loc[condition, columns]" },
  ],
  debugChallenges: [
    { title: "Python and on a Series", prompt: "Combine the two element-wise conditions.", code: `df[df["Temperature"] > 30 and df["Yield"] > 500]`, mistakesToFind: 3, solution: `df[(df["Temperature"] > 30) & (df["Yield"] > 500)]`, hiddenGuidance: "Use &, and wrap each comparison in parentheses." },
    { title: "Label 0 is missing", prompt: "Select the first row after Field_ID becomes the index.", code: `indexed = df.set_index("Field_ID")
indexed.loc[0]`, mistakesToFind: 1, solution: `indexed.loc[101]
# or indexed.iloc[0]`, hiddenGuidance: "loc needs an existing label; iloc accepts a position." },
    { title: "Position slice prediction", prompt: "Predict the rows returned.", code: "df.iloc[:2]", mistakesToFind: 0, solution: "Positions 0 and 1: Fields 101 and 102.", hiddenGuidance: "iloc slicing excludes the ending position, like normal Python slicing." },
    { title: "Missing parentheses", prompt: "Fix the moisture range filter.", code: `df[df["Soil_Moisture"] >= 25 & df["Soil_Moisture"] <= 40]`, mistakesToFind: 2, solution: `df[(df["Soil_Moisture"] >= 25) & (df["Soil_Moisture"] <= 40)]`, hiddenGuidance: "Parenthesize each comparison before combining masks." },
  ],
};
