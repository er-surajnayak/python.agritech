import type { PandasCombiningReshapingDevelopmentPack } from "@/types/content";

export const pandasCombiningReshapingDevelopmentPack: PandasCombiningReshapingDevelopmentPack = {
  kind: "pandas-combining-reshaping",
  prerequisite: "Lesson 7.6 · GroupBy, Aggregation & Summary Analysis",
  storyHook: "Farm records usually arrive in separate field, sensor, yield, and monthly files. Pandas can stack compatible records, match related records by key, and reshape observations for reporting or analysis.",
  fields: {
    columns: ["Field_ID", "Crop", "Region"],
    rows: [[101, "Rice", "North"], [102, "Wheat", "South"], [103, "Rice", "North"], [104, "Maize", "South"]],
  },
  sensor: {
    columns: ["Field_ID", "Temperature", "Moisture"],
    rows: [[101, 28, 42], [102, 31, 35], [103, 30, 40], [105, 34, 25]],
  },
  yieldData: {
    columns: ["Field_ID", "Yield"],
    rows: [[101, 520], [102, 480], [103, 500], [104, 450]],
  },
  monthlyLong: {
    columns: ["Field_ID", "Month", "Yield"],
    rows: [[101, "Jan", 500], [101, "Feb", 520], [102, "Jan", 470], [102, "Feb", 490]],
  },
  monthlyWide: {
    columns: ["Field_ID", "Jan", "Feb", "Mar"],
    rows: [[101, 500, 520, 530], [102, 470, 490, 510]],
  },
  decisions: [
    { question: "January and February files have the same columns. Stack their rows.", answer: "concat", explanation: "concat(axis=0) appends compatible records vertically." },
    { question: "Field details and sensor readings share Field_ID.", answer: "merge", explanation: "merge matches related rows using the shared key." },
    { question: "Both DataFrames already use Field_ID as their index.", answer: "join", explanation: "join is concise for index-aligned datasets." },
    { question: "Turn Month values into separate columns.", answer: "pivot", explanation: "pivot reshapes unique Field_ID and Month combinations." },
    { question: "Reshape Crop × Region and average duplicate Yield records.", answer: "pivot_table", explanation: "pivot_table reshapes and aggregates duplicates." },
    { question: "Convert Jan, Feb, and Mar columns into Month rows.", answer: "melt", explanation: "melt converts wide columns into long observations." },
  ],
  quickReference: [
    { task: "Stack rows", code: "pd.concat([a, b], ignore_index=True)" },
    { task: "Combine columns", code: "pd.concat([a, b], axis=1)" },
    { task: "Match by key", code: `pd.merge(a, b, on="Field_ID")` },
    { task: "Inner merge", code: `how="inner"` }, { task: "Left merge", code: `how="left"` },
    { task: "Right merge", code: `how="right"` }, { task: "Outer merge", code: `how="outer"` },
    { task: "Different key names", code: "left_on=..., right_on=..." },
    { task: "Index combination", code: "left.join(right)" },
    { task: "Reshape unique pairs", code: "df.pivot(...)" },
    { task: "Reshape + aggregate", code: "df.pivot_table(..., aggfunc=...)" },
    { task: "Wide to long", code: "df.melt(...)" },
  ],
  debugChallenges: [
    { title: "Horizontal concat is not a key match", prompt: "Combine fields and sensor records by Field_ID.", code: "pd.concat([fields, sensor], axis=1)", mistakesToFind: 1, solution: `pd.merge(fields, sensor, on="Field_ID", how="inner")`, hiddenGuidance: "concat aligns horizontally by index; merge matches the identifier." },
    { title: "Preserve all fields", prompt: "Keep Field_ID 104 even though no sensor row exists.", code: `pd.merge(fields, sensor, on="Field_ID", how="inner")`, mistakesToFind: 1, solution: `pd.merge(fields, sensor, on="Field_ID", how="left")`, hiddenGuidance: "A left merge preserves every key from the left DataFrame." },
    { title: "Duplicate pivot combinations", prompt: "Summarize duplicate Crop and Region combinations by mean Yield.", code: `df.pivot(index="Crop", columns="Region", values="Yield")`, mistakesToFind: 1, solution: `df.pivot_table(index="Crop", columns="Region", values="Yield", aggfunc="mean")`, hiddenGuidance: "pivot requires unique pairs; pivot_table can aggregate duplicates." },
    { title: "Keep the identifier during melt", prompt: "Convert month columns into rows without melting Field_ID.", code: `df.melt(var_name="Month", value_name="Yield")`, mistakesToFind: 1, solution: `df.melt(id_vars="Field_ID", var_name="Month", value_name="Yield")`, hiddenGuidance: "List identifier columns in id_vars." },
  ],
};
