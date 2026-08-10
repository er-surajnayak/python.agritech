import type { MatplotlibDistributionDevelopmentPack } from "@/types/content";

export const matplotlibDistributionDevelopmentPack: MatplotlibDistributionDevelopmentPack = {
  kind: "matplotlib-distribution-analysis",
  prerequisite: "Complete Lessons 8.1–8.2 and understand axes, labels, chart choice, and numerical sensor data.",
  storyHook: "A trend asks how readings change in order. Distribution analysis asks where readings concentrate, how widely they spread, what shape they form, and which observations deserve investigation.",
  datasets: [
    { id: "temperature", label: "Temperature", values: [24, 25, 25, 26, 27, 27, 28, 28, 29, 30, 31, 32, 35, 36], unit: "°C", interpretation: "Most readings cluster in the mid-to-high 20s, with fewer observations above 32°C." },
    { id: "moisture", label: "Soil Moisture", values: [42, 45, 47, 48, 49, 50, 51, 51, 52, 53, 54, 55, 56, 60, 72], unit: "%", interpretation: "Most readings concentrate between the high 40s and mid 50s; 72% deserves investigation." },
    { id: "rainfall", label: "Rainfall", values: [0, 0, 0, 1, 1, 2, 2, 3, 4, 5, 8, 12, 18, 25], unit: "mm", interpretation: "Many readings are low while a small number of rainy periods create a long right tail." },
    { id: "humidity", label: "Humidity", values: [58, 60, 61, 62, 63, 64, 65, 65, 66, 67, 68, 70, 72, 74], unit: "%", interpretation: "Humidity is fairly concentrated around the mid 60s with a moderate spread." },
  ],
  fieldGroups: [{ label: "Field A", values: [24, 25, 26, 27, 28, 29, 30] }, { label: "Field B", values: [27, 28, 29, 30, 31, 32, 33] }, { label: "Field C", values: [23, 24, 25, 26, 27, 28, 40] }],
  outlierData: [45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 90],
  commonMistakes: [
    { title: "Treating bins as categories", code: "plt.hist(temperature, bins=5)", explanation: "Each bar represents a numerical interval, not a named category." },
    { title: "Histogram for crop names", code: "plt.hist([\"Rice\", \"Wheat\"])", explanation: "Histograms summarize numerical ranges. Use a bar chart for categorical counts or values." },
    { title: "Assuming outlier means error", code: "data.remove(90)", explanation: "Investigate rainfall, irrigation, field conditions, sensor health, and data entry before deleting." },
    { title: "Too many bins", code: "plt.hist(temperature, bins=100)", explanation: "Excessive bins make a small dataset sparse and noisy." },
    { title: "Deleting without context", code: "clean = data[data < upper_bound]", explanation: "A statistical flag is a prompt for investigation, not an automatic cleaning rule." },
  ],
  quickReference: [
    { task: "Histogram", code: "plt.hist(data, bins=5)", meaning: "Frequency across numerical ranges" },
    { task: "Box plot", code: "plt.boxplot(data)", meaning: "Compact center, spread, and outlier summary" },
    { task: "Group boxes", code: "plt.boxplot([a, b, c])", meaning: "Compare several distributions" },
    { task: "IQR", code: "IQR = Q3 - Q1", meaning: "Spread of the middle 50%" },
    { task: "Lower fence", code: "Q1 - 1.5 * IQR", meaning: "Potential low-outlier boundary" },
    { task: "Upper fence", code: "Q3 + 1.5 * IQR", meaning: "Potential high-outlier boundary" },
  ],
  debugChallenges: [
    { title: "Categorical histogram", prompt: "Choose the correct chart for crop yield categories.", code: "plt.hist(crops, yield_data)", mistakesToFind: 1, solution: "plt.bar(crops, yield_data)", hiddenGuidance: "Histogram bins represent numerical intervals." },
    { title: "No bin judgment", prompt: "Replace the noisy setting with a reasonable starting point for 14 readings.", code: "plt.hist(temperature, bins=100)", mistakesToFind: 1, solution: "plt.hist(temperature, bins=5)", hiddenGuidance: "Compare several reasonable bin counts before interpreting shape." },
    { title: "Automatic deletion", prompt: "Replace the unsupported deletion with an investigation step.", code: "data.remove(90)", mistakesToFind: 1, solution: "print(\"Investigate 90: rainfall, irrigation, field condition, sensor, or entry error\")", hiddenGuidance: "Potential outliers can be real and operationally important." },
  ],
};
