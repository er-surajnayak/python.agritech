import type { PandasDataFrameDevelopmentPack } from "@/types/content";

export const pandasDataFrameDevelopmentPack: PandasDataFrameDevelopmentPack = {
  kind: "pandas-dataframes-loading",
  prerequisite: "Lesson 7.1 · Pandas Series",
  storyHook: "A Series can label one sensor variable. A DataFrame puts several labeled Series side by side, so every field remains connected to its temperature, humidity, moisture, and yield.",
  dataset: {
    columns: ["Field_ID", "Temperature", "Humidity", "Soil_Moisture", "Yield"],
    rows: [
      [101, 28, 65, 42, 520], [102, 32, 70, 35, 480], [103, 35, 72, 28, 410],
      [104, 29, 68, 48, 560], [105, 38, 75, 22, 390], [106, 31, 66, 40, 510],
    ],
  },
  creation: [
    { id: "dictionary", label: "Dictionary", explanation: "Dictionary keys become column names and equally sized lists become column values.", code: `data = {
    "Field_ID": [101, 102, 103, 104],
    "Temperature": [28, 32, 35, 29],
    "Humidity": [65, 70, 72, 68],
    "Soil_Moisture": [42, 35, 28, 48],
    "Yield": [520, 480, 410, 560]
}
df = pd.DataFrame(data)` },
    { id: "lists", label: "List of lists", explanation: "Each inner list becomes one row; columns= supplies the missing labels.", code: `rows = [
    [101, 28, 65, 42, 520],
    [102, 32, 70, 35, 480],
    [103, 35, 72, 28, 410]
]
df = pd.DataFrame(rows, columns=[
    "Field_ID", "Temperature", "Humidity",
    "Soil_Moisture", "Yield"
])` },
    { id: "numpy", label: "NumPy array", explanation: "A numerical 2D ndarray becomes a labeled table when passed to pd.DataFrame().", code: `values = np.array([
    [101, 28, 65, 42, 520],
    [102, 32, 70, 35, 480],
    [103, 35, 72, 28, 410]
])
df = pd.DataFrame(values, columns=[
    "Field_ID", "Temperature", "Humidity",
    "Soil_Moisture", "Yield"
])` },
  ],
  explorer: [
    { id: "head", label: "head()", code: "df.head(2)", explanation: "Preview the first two records before analysis." },
    { id: "tail", label: "tail()", code: "df.tail(2)", explanation: "Preview the final two records." },
    { id: "sample", label: "sample()", code: "df.sample(2, random_state=7)", explanation: "Inspect two reproducible sample records." },
    { id: "info", label: "info()", code: "df.info()", explanation: "Check rows, columns, non-null counts, dtypes, and memory usage." },
    { id: "describe", label: "describe()", code: "df.describe()", explanation: "Summarize count, mean, spread, and range for numeric columns." },
    { id: "columns", label: "Columns", code: "df.columns.tolist()", explanation: "Discover the available column names." },
    { id: "shape", label: "Shape", code: "df.shape", explanation: "Read rows first, then columns: (6, 5)." },
    { id: "select", label: "Select", code: `df["Temperature"]
df[["Temperature", "Humidity"]]`, explanation: "One bracketed name returns a Series; a list of names returns a DataFrame." },
  ],
  properties: [
    { name: "df.shape", result: "(6, 5)", purpose: "Rows and columns" },
    { name: "df.ndim", result: "2", purpose: "Number of axes" },
    { name: "df.size", result: "30", purpose: "Total cells" },
    { name: "df.columns", result: "5 labels", purpose: "Column names" },
    { name: "df.index", result: "RangeIndex(0, 6)", purpose: "Row labels" },
    { name: "df.dtypes", result: "int64 columns*", purpose: "Type per column" },
  ],
  columnOperations: [
    { title: "Select columns", code: `df["Temperature"]
df[["Temperature", "Humidity"]]`, result: "Series → one column · DataFrame → multiple columns", note: "The outer brackets select; the inner list requests several labels." },
    { title: "Add derived data", code: `df["Yield_per_Moisture"] = (
    df["Yield"] / df["Soil_Moisture"]
)`, result: "A sixth analytical column", note: "Pandas aligns and calculates the columns row by row." },
    { title: "Convert temperature", code: `df["Temperature_F"] = (
    df["Temperature"] * 9/5 + 32
)`, result: "82.4, 89.6, 95.0, …", note: "Vectorized Series arithmetic creates the new column." },
    { title: "Remove a column", code: `df.drop(columns=["Temperature_F"], inplace=True)

# Or keep the original
new_df = df.drop(columns=["Temperature_F"])`, result: "Column removed in-place or from a returned copy", note: "Without inplace=True or assignment, df remains unchanged." },
    { title: "Use Field ID as index", code: `df = df.set_index("Field_ID")`, result: "Row labels become 101–106", note: "A stable unique identifier can make records easier to recognize." },
  ],
  fileOperations: [
    { title: "Read CSV", code: `df = pd.read_csv("farm_data.csv")`, purpose: "Load a comma-separated dataset." },
    { title: "Read Excel", code: `df = pd.read_excel("farm_data.xlsx", sheet_name="Farm Data")`, purpose: "Load a named worksheet." },
    { title: "Save CSV", code: `df.to_csv("cleaned_farm_data.csv", index=False)`, purpose: "Export without an extra Pandas index column." },
    { title: "Save Excel", code: `df.to_excel("cleaned_farm_data.xlsx", index=False)`, purpose: "Export a spreadsheet-ready dataset." },
  ],
  quickReference: [
    { task: "Create DataFrame", code: "pd.DataFrame(data)" }, { task: "Read CSV", code: "pd.read_csv(path)" },
    { task: "Read Excel", code: "pd.read_excel(path)" }, { task: "First / last", code: "df.head() · df.tail()" },
    { task: "Structure", code: "df.info()" }, { task: "Statistics", code: "df.describe()" },
    { task: "Shape / types", code: "df.shape · df.dtypes" }, { task: "One column", code: `df["col"]` },
    { task: "Many columns", code: `df[["a", "b"]]` }, { task: "Add column", code: `df["new"] = ...` },
    { task: "Remove column", code: "df.drop(columns=[...])" }, { task: "Set index", code: `df.set_index("Field_ID")` },
    { task: "Save files", code: "df.to_csv() · df.to_excel()" },
  ],
  debugChallenges: [
    { title: "Mismatched dictionary lengths", prompt: "Make the raw dictionary rectangular.", code: `pd.DataFrame({"Field": [101, 102], "Yield": [520]})`, mistakesToFind: 1, solution: `pd.DataFrame({"Field": [101, 102], "Yield": [520, 480]})`, hiddenGuidance: "Every dictionary column must contain the same number of rows." },
    { title: "Series instead of DataFrame", prompt: "Keep Temperature as a two-dimensional DataFrame.", code: `result = df["Temperature"]`, mistakesToFind: 1, solution: `result = df[["Temperature"]]`, hiddenGuidance: "A list of labels returns a DataFrame; one label returns a Series." },
    { title: "Drop result ignored", prompt: "Remove Temperature_F from df.", code: `df.drop(columns=["Temperature_F"])
print(df.columns)`, mistakesToFind: 1, solution: `df = df.drop(columns=["Temperature_F"])`, hiddenGuidance: "Assign the returned DataFrame or use inplace=True." },
    { title: "Unexpected CSV index", prompt: "Save without adding the internal row index to the file.", code: `df.to_csv("farm_data.csv")`, mistakesToFind: 1, solution: `df.to_csv("farm_data.csv", index=False)`, hiddenGuidance: "The row index is useful inside Pandas but is optional file data." },
  ],
};
