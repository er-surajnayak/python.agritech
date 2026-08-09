import type { PandasTransformationDevelopmentPack } from "@/types/content";

export const pandasTransformationDevelopmentPack: PandasTransformationDevelopmentPack = {
  kind: "pandas-transformation-feature-engineering",
  prerequisite: "Lesson 7.4 · Data Cleaning & Missing Data",
  storyHook: "The farm table is now trustworthy. Transformation changes how existing values are represented; feature engineering combines them into new signals that support decisions and future models.",
  dataset: {
    columns: ["Field_ID", "Temperature", "Humidity", "Soil_Moisture", "Yield", "Crop"],
    rows: [
      [101, 28, 65, 42, 520, "Rice"], [102, 32, 70, 35, 480, "Wheat"],
      [103, 35, 72, 28, 410, "Rice"], [104, 29, 68, 48, 560, "Maize"],
      [105, 38, 75, 22, 390, "Rice"], [106, 31, 66, 40, 510, "Wheat"],
    ],
  },
  operations: [
    { id: "fahrenheit", label: "Temperature → °F", column: "Temperature_F", code: `df["Temperature_F"] = df["Temperature"] * 9/5 + 32`, explanation: "A vectorized unit conversion transforms every row without an explicit loop." },
    { id: "ratio", label: "Yield / moisture", column: "Yield_per_Moisture", code: `df["Yield_per_Moisture"] = df["Yield"] / df["Soil_Moisture"]`, explanation: "A ratio feature combines two measurements into a comparable efficiency signal." },
    { id: "gap", label: "Moisture gap", column: "Moisture_Gap", code: `df["Moisture_Gap"] = 40 - df["Soil_Moisture"]`, explanation: "Positive values are below the target; negative values are above it." },
    { id: "irrigation", label: "Irrigation need", column: "Irrigation_Need", code: `df["Irrigation_Need"] = np.where(
    df["Soil_Moisture"] < 30, "Required", "Not Required"
)`, explanation: "np.where creates a two-way categorical feature from one condition." },
    { id: "moisture-status", label: "Moisture status", column: "Moisture_Status", code: `conditions = [df["Soil_Moisture"] < 25, df["Soil_Moisture"].between(25, 35), df["Soil_Moisture"] > 35]
df["Moisture_Status"] = np.select(conditions, ["Critical", "Low", "Adequate"], default="Unknown")`, explanation: "np.select expresses ordered multi-category rules; the first matching condition wins." },
    { id: "yield-category", label: "Yield category", column: "Yield_Category", code: `df["Yield_Category"] = df["Yield"].apply(classify_yield)`, explanation: "apply uses a custom function when the business rule is easier to read as Python logic." },
    { id: "risk-score", label: "Risk score", column: "Risk_Score", code: `df["Risk_Score"] = (df["Temperature"] > 34).astype(int) + (df["Soil_Moisture"] < 30).astype(int)`, explanation: "Boolean conditions become 0 or 1 and add into an explainable score." },
    { id: "risk-level", label: "Risk level", column: "Risk_Level", code: `df["Risk_Level"] = df["Risk_Score"].map({0: "Low", 1: "Moderate", 2: "High"})`, explanation: "map translates a known set of score values into labels." },
  ],
  methodExamples: [
    { title: "Map crop codes", method: "map()", code: `df["Crop_Code"] = df["Crop"].map({"Rice": "R", "Wheat": "W", "Maize": "M"})`, result: "Rice → R · Wheat → W · Maize → M", explanation: "map transforms each Series value through a dictionary or function, such as df['Crop'].map(len)." },
    { title: "Classify yield", method: "apply()", code: `def classify_yield(value):
    if value >= 500: return "High"
    if value >= 450: return "Medium"
    return "Low"

df["Yield_Category"] = df["Yield"].apply(classify_yield)`, result: "520 → High · 480 → Medium · 410 → Low", explanation: "apply supports a custom rule; a short lambda can be used when it remains readable." },
    { title: "Evaluate complete rows", method: "apply(axis=1)", code: `def irrigation_status(row):
    if row["Temperature"] > 34 and row["Soil_Moisture"] < 30:
        return "Urgent"
    return "Normal"

df["Irrigation_Status"] = df.apply(irrigation_status, axis=1)`, result: "Fields 103 and 105 → Urgent", explanation: "axis=1 passes each row to the function. Prefer vectorized conditions when they express the rule clearly." },
    { title: "Replace and standardize", method: "replace() · astype() · str", code: `df["Crop"] = df["Crop"].replace({"Rice": "Paddy"}).str.upper()
df["Field_ID"] = df["Field_ID"].astype(str)`, result: "Rice → PADDY · Field_ID → string labels", explanation: "Replacement changes known values; astype changes representation; the str accessor transforms text." },
    { title: "Sort the engineered result", method: "sort_values()", code: `ranked = df.sort_values(by=["Risk_Score", "Yield"], ascending=[False, False]).reset_index(drop=True)`, result: "Highest risk first; ties use highest yield", explanation: "Multi-column sorting keeps complete rows aligned, and reset_index(drop=True) creates a clean positional index." },
  ],
  pipeline: ["Start with clean data", "Choose a farm question", "Create a meaningful feature", "Validate units and rules", "Inspect the distribution", "Sort and interpret"],
  quickReference: [
    { task: "Derived column", code: `df["new"] = ...` }, { task: "Element mapping", code: ".map(mapping)" },
    { task: "Custom transform", code: ".apply(function)" }, { task: "Row-wise rule", code: ".apply(function, axis=1)" },
    { task: "Two-way feature", code: "np.where(condition, yes, no)" }, { task: "Multiple categories", code: "np.select(conditions, choices)" },
    { task: "Replace values", code: ".replace({...})" }, { task: "Change dtype", code: ".astype(type)" },
    { task: "String transform", code: ".str.upper() · .str.title()" }, { task: "Sort rows", code: ".sort_values(by=...)" },
    { task: "Reset index", code: ".reset_index(drop=True)" },
  ],
  debugChallenges: [
    { title: "Result not assigned", prompt: "Make the sorted order persist.", code: `df.sort_values(by="Yield", ascending=False)`, mistakesToFind: 1, solution: `df = df.sort_values(by="Yield", ascending=False)`, hiddenGuidance: "sort_values returns a new DataFrame unless assigned or used in-place." },
    { title: "Wrong apply axis", prompt: "Pass each complete record to irrigation_status.", code: `df.apply(irrigation_status)`, mistakesToFind: 1, solution: `df["Irrigation_Status"] = df.apply(irrigation_status, axis=1)`, hiddenGuidance: "axis=1 iterates across each row." },
    { title: "Unknown map label", prompt: "Explain why Soy becomes NaN and preserve it safely.", code: `df["Crop_Code"] = df["Crop"].map({"Rice": "R", "Wheat": "W"})`, mistakesToFind: 1, solution: `codes = {"Rice": "R", "Wheat": "W", "Soy": "S"}
df["Crop_Code"] = df["Crop"].map(codes)`, hiddenGuidance: "Dictionary map returns NaN for keys that are absent; validate category coverage." },
    { title: "Risk rule needs parentheses", prompt: "Create the two-condition integer score.", code: `df["Temperature"] > 34.astype(int) + df["Soil_Moisture"] < 30.astype(int)`, mistakesToFind: 2, solution: `df["Risk_Score"] = (df["Temperature"] > 34).astype(int) + (df["Soil_Moisture"] < 30).astype(int)`, hiddenGuidance: "Convert each completed Boolean Series before adding." },
  ],
};

