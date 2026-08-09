import type { PandasCleaningDevelopmentPack } from "@/types/content";

export const pandasCleaningDevelopmentPack: PandasCleaningDevelopmentPack = {
  kind: "pandas-cleaning-missing-data",
  prerequisite: "Lesson 7.3 · Selecting, Filtering & Querying DataFrames",
  storyHook: "A filter can answer a question only when the underlying readings, identifiers, types, and labels are trustworthy. Cleaning is the bridge between receiving data and relying on it.",
  dataset: {
    columns: ["Field_ID", "Temperature", "Humidity", "Soil_Moisture", "Yield", "Crop_Type"],
    rows: [
      [101, 28, 65, 42, 520, " Rice "], [102, 32, null, 35, 480, "rice"],
      [103, null, 72, 28, 410, "Wheat"], [104, 29, 68, null, 560, "wheat"],
      [105, 38, 75, 22, null, "RICE"], [105, 38, 75, 22, null, "RICE"],
    ],
  },
  operations: [
    { id: "detect", label: "Detect missing", code: "df.isna()\n# df.isnull() is equivalent", explanation: "True marks a missing cell; isna and isnull are aliases." },
    { id: "count", label: "Count missing", code: "df.isna().sum()\ndf.isna().sum().sum()", explanation: "Count by column, then across the entire table." },
    { id: "drop", label: "Drop missing", code: `df.dropna()
df.dropna(subset=["Yield"])`, explanation: "Remove incomplete rows, optionally only when important columns are missing." },
    { id: "mean", label: "Fill mean", code: `df["Temperature"] = df["Temperature"].fillna(
    df["Temperature"].mean()
)`, explanation: "Estimate the missing temperature with 33.0 when domain context supports it." },
    { id: "median", label: "Fill median", code: `df["Yield"] = df["Yield"].fillna(
    df["Yield"].median()
)`, explanation: "Use the middle observed yield, 500, which is less sensitive to extremes." },
    { id: "ffill", label: "Forward fill", code: `df["Humidity"] = df["Humidity"].ffill()`, explanation: "Carry the previous valid sequential reading forward: 65 fills Field 102." },
    { id: "bfill", label: "Backward fill", code: `df["Humidity"] = df["Humidity"].bfill()`, explanation: "Use the next valid sequential reading: 72 fills Field 102." },
    { id: "duplicates", label: "Detect duplicates", code: `df.duplicated()
df.duplicated(subset=["Field_ID"]).sum()`, explanation: "The final upload repeats Field 105." },
    { id: "dedupe", label: "Remove duplicates", code: `df.drop_duplicates(
    subset=["Field_ID"], keep="first"
)`, explanation: "Keep the first Field 105 record and remove the repeated upload." },
    { id: "text", label: "Clean text", code: `df["Crop_Type"] = (
    df["Crop_Type"].str.strip().str.lower()
)`, explanation: "Whitespace and capitalization no longer split the same crop into several labels." },
  ],
  workflow: ["Check shape", "Check dtypes", "Count missing", "Check duplicates", "Standardize names", "Fix types", "Handle missing", "Verify clean data"],
  decisions: [
    { question: "One temperature is missing. What should the engineer do?", options: ["Always replace it with 0", "Delete the whole dataset", "Investigate context, then fill or drop appropriately", "Ignore it"], correctIndex: 2, explanation: "The choice depends on why the reading is missing, how much data is affected, and whether an estimate is valid for this analysis." },
    { question: "Humidity is a time-ordered sensor stream with one short gap. Which option may preserve continuity?", options: ["Forward fill after validating the gap", "Convert every value to text", "Delete all humidity data", "Rename the column only"], correctIndex: 0, explanation: "ffill can be reasonable for a short sequential gap, but only when the sensor and sampling context justify carrying the last value forward." },
    { question: "The same Field_ID was uploaded twice. What should happen first?", options: ["Drop both immediately", "Confirm the identifier and duplicate rule", "Fill all missing values with zero", "Sort alphabetically"], correctIndex: 1, explanation: "A duplicate identifier may be a repeated upload or a legitimate later reading. Confirm the record definition before removal." },
  ],
  typeExamples: [
    { title: "Rename columns", code: `df = df.rename(columns={
    "Soil_Moisture": "soil_moisture",
    "Crop_Type": "crop_type"
})`, result: "Consistent snake_case labels", explanation: "Standard names make later selections predictable." },
    { title: "Convert known numeric data", code: `df["Temperature"] = df["Temperature"].astype(float)`, result: "Temperature → float", explanation: "astype works when every non-missing value is already convertible." },
    { title: "Coerce messy numeric text", code: `df["Yield"] = pd.to_numeric(
    df["Yield"], errors="coerce"
)`, result: "'unknown' → NaN", explanation: "Invalid tokens become missing values that can be inspected and handled." },
    { title: "Replace incorrect labels", code: `df["Crop_Type"] = df["Crop_Type"].replace(
    {"Rce": "Rice"}
)`, result: "Rce → Rice", explanation: "Use a documented mapping for known mistakes." },
  ],
  quickReference: [
    { task: "Detect missing", code: "df.isna() · df.isnull()" }, { task: "Count missing", code: "df.isna().sum()" },
    { task: "Total missing", code: "df.isna().sum().sum()" }, { task: "Incomplete rows", code: "df[df.isna().any(axis=1)]" },
    { task: "Drop missing", code: "df.dropna(subset=[...])" }, { task: "Fill value", code: "df.fillna(value)" },
    { task: "Mean / median", code: ".fillna(series.mean())" }, { task: "Sequential fill", code: ".ffill() · .bfill()" },
    { task: "Find duplicates", code: "df.duplicated()" }, { task: "Remove duplicates", code: "df.drop_duplicates()" },
    { task: "Rename", code: "df.rename(columns={...})" }, { task: "Convert type", code: ".astype(type)" },
    { task: "Safe numeric", code: `pd.to_numeric(..., errors="coerce")` }, { task: "Clean text", code: ".str.strip().str.lower()" },
    { task: "Replace labels", code: ".replace({...})" },
  ],
  debugChallenges: [
    { title: "Missing result ignored", prompt: "Make the mean-filled temperature persist.", code: `df["Temperature"].fillna(df["Temperature"].mean())`, mistakesToFind: 1, solution: `df["Temperature"] = df["Temperature"].fillna(df["Temperature"].mean())`, hiddenGuidance: "fillna returns a new Series unless assigned or used in-place." },
    { title: "Blind zero filling", prompt: "Explain why this is risky.", code: "df.fillna(0)", mistakesToFind: 0, solution: "Choose a strategy per column and domain. Missing temperature, crop text, and yield do not all mean zero.", hiddenGuidance: "A syntactically valid operation can still damage meaning." },
    { title: "Unsafe numeric conversion", prompt: "Convert messy Yield values without crashing on 'unknown'.", code: `df["Yield"].astype(float)`, mistakesToFind: 1, solution: `df["Yield"] = pd.to_numeric(df["Yield"], errors="coerce")`, hiddenGuidance: "Coercion turns invalid tokens into inspectable NaN values." },
    { title: "Duplicate assumption", prompt: "Remove repeated Field_ID records intentionally.", code: "df.drop_duplicates()", mistakesToFind: 1, solution: `df.drop_duplicates(subset=["Field_ID"], keep="first")`, hiddenGuidance: "State which columns define identity and which occurrence should remain." },
  ],
};
