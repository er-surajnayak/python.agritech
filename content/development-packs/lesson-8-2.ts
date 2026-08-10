import type { MatplotlibChartTypesDevelopmentPack } from "@/types/content";

export const matplotlibChartTypesDevelopmentPack: MatplotlibChartTypesDevelopmentPack = {
  kind: "matplotlib-core-chart-types",
  prerequisite: "Complete Lesson 8.1 and be comfortable with plot(), labels, grids, legends, Figure, and Axes.",
  storyHook: "A farm analyst does not begin with a favorite chart. They begin with a question: trend, category comparison, numerical relationship, or magnitude over time.",
  timeSeries: {
    days: [1, 2, 3, 4, 5, 6, 7],
    variables: [
      { id: "temperature", label: "Temperature", values: [25, 27, 28, 30, 32, 31, 29], unit: "°C" },
      { id: "moisture", label: "Soil Moisture", values: [60, 57, 54, 52, 48, 45, 42], unit: "%" },
      { id: "rainfall", label: "Rainfall", values: [5, 0, 2, 0, 0, 1, 0], unit: "mm" },
    ],
    yieldValues: [520, 515, 510, 500, 480, 450, 420],
  },
  cropYield: { crops: ["Rice", "Wheat", "Maize", "Cotton"], values: [520, 480, 450, 390], unit: "kg/acre" },
  decisions: [
    { question: "Show temperature changes over seven days.", answer: "line", explanation: "Days form an ordered sequence, so a line reveals the trend." },
    { question: "Compare yield among Rice, Wheat, and Maize.", answer: "bar", explanation: "Crops are discrete categories, so bar length makes comparison direct." },
    { question: "Investigate temperature versus crop yield.", answer: "scatter", explanation: "Both variables are numerical; each point pairs one temperature with one yield." },
    { question: "Emphasize soil-moisture magnitude over time.", answer: "area", explanation: "A filled area emphasizes magnitude while retaining the time trend." },
  ],
  commonMistakes: [
    { title: "Connecting unrelated categories", code: "plt.plot(crops, yield_data)", explanation: "The connecting line implies continuity. Use bar() for independent crop categories." },
    { title: "Hiding a time trend in bars", code: "plt.bar(days, temperature)", explanation: "Bars can work, but a line usually communicates direction and change over many ordered observations more efficiently." },
    { title: "Claiming causation", code: "plt.scatter(temperature, yield_data)", explanation: "A visible association is evidence of relationship, not proof that temperature caused the yield change." },
    { title: "Overloading categories", code: "plt.bar(all_field_names, yields)", explanation: "Dozens of bars and labels become hard to scan. Filter, group, or choose a focused comparison." },
  ],
  quickReference: [
    { task: "Trend", code: "plt.plot(x, y)", use: "Ordered or continuous progression" },
    { task: "Category comparison", code: "plt.bar(categories, values)", use: "Discrete groups" },
    { task: "Long category labels", code: "plt.barh(categories, values)", use: "Horizontal comparison" },
    { task: "Relationship", code: "plt.scatter(x, y)", use: "Two numerical variables" },
    { task: "Magnitude over time", code: "plt.fill_between(x, y, 0)", use: "Filled continuous trend" },
  ],
  debugChallenges: [
    { title: "Wrong question, wrong chart", prompt: "Replace the misleading connected line with a categorical comparison.", code: "plt.plot(crops, yield_data)", mistakesToFind: 1, solution: "plt.bar(crops, yield_data)", hiddenGuidance: "The categories do not form a continuous path." },
    { title: "Missing relationship pairs", prompt: "Give every scatter x value a matching y observation.", code: "plt.scatter([24, 26, 28], [520, 510])", mistakesToFind: 1, solution: "plt.scatter([24, 26, 28], [520, 510, 500])", hiddenGuidance: "Every point needs both coordinates." },
    { title: "Correlation is not causation", prompt: "Add a responsible interpretation of this relationship.", code: "plt.scatter(temperature, yield_data)\nprint(\"Temperature caused the yield decline\")", mistakesToFind: 1, solution: "plt.scatter(temperature, yield_data)\nprint(\"The variables are associated; other causes require investigation\")", hiddenGuidance: "A scatter pattern cannot isolate rainfall, irrigation, soil, pests, or fertilizer." },
  ],
};
