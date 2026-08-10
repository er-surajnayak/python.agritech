import type { MatplotlibCustomizationDevelopmentPack } from "@/types/content";

export const matplotlibCustomizationDevelopmentPack: MatplotlibCustomizationDevelopmentPack = {
  kind: "matplotlib-customization-subplots",
  prerequisite: "Complete Lessons 8.1–8.3 and understand Figures, Axes, core chart types, and distributions.",
  storyHook: "Styling earns its place only when it improves identification, scale reading, comparison, or layout. The goal is not decoration; it is a chart that explains itself.",
  data: {
    days: [1, 2, 3, 4, 5, 6, 7],
    variables: [
      { id: "temperature", label: "Temperature", values: [25, 27, 28, 30, 32, 31, 29], unit: "°C", chart: "line" },
      { id: "moisture", label: "Soil Moisture", values: [60, 57, 54, 52, 48, 45, 42], unit: "%", chart: "line" },
      { id: "rainfall", label: "Rainfall", values: [5, 0, 2, 0, 0, 1, 0], unit: "mm", chart: "bar" },
      { id: "yield", label: "Crop Yield", values: [420, 435, 448, 462, 470, 468, 475], unit: "kg/acre", chart: "line" },
    ],
  },
  markers: [{ value: "o", label: "Circle" }, { value: "s", label: "Square" }, { value: "^", label: "Triangle" }, { value: "x", label: "X" }, { value: "*", label: "Star" }],
  lineStyles: [{ value: "-", label: "Solid" }, { value: "--", label: "Dashed" }, { value: ":", label: "Dotted" }, { value: "-.", label: "Dash-dot" }],
  legendPositions: ["upper left", "upper right", "lower left", "lower right", "center"],
  commonMistakes: [
    { title: "Over-customization", code: "color + five markers + heavy grid", explanation: "Every visual choice competes for attention. Style only what improves the question." },
    { title: "Missing context", code: "plt.xlabel('X'); plt.ylabel('Y')", explanation: "Use variable names and units so the chart remains understandable on its own." },
    { title: "Misleading limits", code: "plt.ylim(468, 475)", explanation: "A narrow scale can exaggerate small differences. Choose limits transparently and purposefully." },
    { title: "Too many subplots", code: "plt.subplots(8, 8)", explanation: "More panels reduce individual readability. Keep only related views needed for the analysis." },
    { title: "Overlapping layout", code: "# no tight_layout()", explanation: "Use tight_layout() when subplot titles and labels compete for space." },
    { title: "Figure vs Axes", code: "fig.set_xlabel('Day')", explanation: "Figure owns the canvas; each Axes owns its plot, title, labels, limits, and ticks." },
  ],
  quickReference: [
    { task: "Figure size", code: "plt.figure(figsize=(8, 5))", meaning: "Set canvas width and height in inches" },
    { task: "Line styling", code: "color=, marker=, linestyle=", meaning: "Distinguish and emphasize a series" },
    { task: "Weight / opacity", code: "linewidth=, alpha=", meaning: "Control emphasis and overlap" },
    { task: "Legend", code: "plt.legend(loc='upper left')", meaning: "Identify labeled artists" },
    { task: "Grid", code: "plt.grid(linestyle='--', alpha=.5)", meaning: "Support value reading without dominating" },
    { task: "Limits / ticks", code: "plt.xlim(); plt.ylim(); plt.xticks()", meaning: "Control displayed scale and labels" },
    { task: "Subplots", code: "fig, axes = plt.subplots(2, 2)", meaning: "Create multiple Axes in one Figure" },
    { task: "Layout", code: "plt.tight_layout()", meaning: "Reduce subplot overlap" },
  ],
  debugChallenges: [
    { title: "Missing legend", prompt: "Make the two line labels visible.", code: "plt.plot(days, a, label='Field A')\nplt.plot(days, b, label='Field B')", mistakesToFind: 1, solution: "plt.legend()", hiddenGuidance: "label= creates entries; legend() displays them." },
    { title: "Wrong owner", prompt: "Fix the object-oriented axis label.", code: "fig, ax = plt.subplots()\nfig.set_xlabel('Day')", mistakesToFind: 1, solution: "ax.set_xlabel('Day')", hiddenGuidance: "Labels belong to the Axes." },
    { title: "Crowded panels", prompt: "Prevent subplot labels from overlapping.", code: "fig, axes = plt.subplots(2, 2)\nplt.show()", mistakesToFind: 1, solution: "plt.tight_layout()\nplt.show()", hiddenGuidance: "Adjust spacing before display." },
  ],
};
