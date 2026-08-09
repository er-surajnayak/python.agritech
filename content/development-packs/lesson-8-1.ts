import type { MatplotlibBasicsDevelopmentPack } from "@/types/content";

export const matplotlibBasicsDevelopmentPack: MatplotlibBasicsDevelopmentPack = {
  kind: "matplotlib-introduction-basics",
  prerequisite: "Module 7 · Pandas data analysis foundations",
  storyHook: "Rows of farm measurements become easier to interpret when position, direction, and shape reveal trends. A chart does not replace analysis—it gives the analyst a faster way to notice patterns and ask better questions.",
  dataset: {
    days: [1, 2, 3, 4, 5, 6, 7],
    variables: [
      { id: "temperature", label: "Temperature", values: [25, 27, 28, 30, 32, 31, 29], unit: "°C", chartTitle: "Weekly Farm Temperature" },
      { id: "moisture", label: "Soil Moisture", values: [55, 52, 50, 47, 44, 42, 40], unit: "%", chartTitle: "Weekly Soil Moisture" },
      { id: "rainfall", label: "Rainfall", values: [2, 0, 4, 8, 1, 0, 3], unit: "mm", chartTitle: "Weekly Farm Rainfall" },
    ],
  },
  markers: [{ value: "o", label: "Circle" }, { value: "s", label: "Square" }, { value: "^", label: "Triangle" }],
  lineStyles: [{ value: "-", label: "Solid" }, { value: "--", label: "Dashed" }, { value: ":", label: "Dotted" }],
  workflow: ["Prepare data", "Import pyplot", "Create Figure and Axes", "Plot x and y", "Add title and labels", "Add legend and grid", "Show or save", "Close when finished"],
  commonMistakes: [
    { title: "Chart never appears", code: "plt.plot(days, temperature)", explanation: "In a script, call plt.show() after constructing the chart." },
    { title: "Lengths do not match", code: "days = [1, 2, 3]\ntemperature = [25, 27]", explanation: "Each x position needs a corresponding y value." },
    { title: "The chart lacks context", code: "plt.plot(days, temperature)\nplt.show()", explanation: "A technically valid plot still needs a title and axis labels to communicate clearly." },
    { title: "The chart answers the wrong question", code: "plt.plot([\"Rice\", \"Wheat\"], [520, 480])", explanation: "A categorical comparison is usually clearer as a bar chart, introduced in Lesson 8.2." },
  ],
  quickReference: [
    { task: "Import", code: "import matplotlib.pyplot as plt" }, { task: "Line plot", code: "plt.plot(x, y)" },
    { task: "Display", code: "plt.show()" }, { task: "Title", code: "plt.title(...)" },
    { task: "X label", code: "plt.xlabel(...)" }, { task: "Y label", code: "plt.ylabel(...)" },
    { task: "Grid", code: "plt.grid()" }, { task: "Legend", code: "plt.legend()" },
    { task: "Save", code: "plt.savefig(..., dpi=300, bbox_inches=\"tight\")" }, { task: "Close", code: "plt.close()" },
    { task: "Figure + Axes", code: "fig, ax = plt.subplots()" }, { task: "Axes line", code: "ax.plot(x, y)" },
    { task: "Axes title", code: "ax.set_title(...)" }, { task: "Axes labels", code: "ax.set_xlabel(...) · ax.set_ylabel(...)" },
  ],
  debugChallenges: [
    { title: "Missing display step", prompt: "Make the completed chart appear in a Python script.", code: "plt.plot(days, temperature)", mistakesToFind: 1, solution: "plt.plot(days, temperature)\nplt.show()", hiddenGuidance: "Finish the pyplot workflow with show()." },
    { title: "Incompatible x and y", prompt: "Give every day one temperature value.", code: "days = [1, 2, 3]\ntemperature = [25, 27]\nplt.plot(days, temperature)", mistakesToFind: 1, solution: "days = [1, 2, 3]\ntemperature = [25, 27, 29]\nplt.plot(days, temperature)", hiddenGuidance: "x and y must have matching lengths." },
    { title: "Legend has nothing to identify", prompt: "Create a useful legend entry.", code: "plt.plot(days, temperature)\nplt.legend()", mistakesToFind: 1, solution: "plt.plot(days, temperature, label=\"Temperature\")\nplt.legend()", hiddenGuidance: "Give the plotted series a label before calling legend()." },
    { title: "Save before closing", prompt: "Save the finished chart at high quality, then release it.", code: "plt.close()\nplt.savefig(\"farm.png\")", mistakesToFind: 1, solution: "plt.savefig(\"farm.png\", dpi=300, bbox_inches=\"tight\")\nplt.close()", hiddenGuidance: "Closing first removes the active figure." },
  ],
};
