import type { NumpyFilteringDevelopmentPack } from "@/types/content";

export const numpyFilteringDevelopmentPack: NumpyFilteringDevelopmentPack = {
  kind: "numpy-sorting-searching-filtering",
  prerequisite: "Lesson 6.6 · Mathematical & Statistical Functions",
  storyHook: "The Smart Farm can summarize its arrays. Now it must rank readings, locate threshold events, keep only important records, and turn Boolean conditions into irrigation and alert decisions.",
  sorting: {
    values: [42, 55, 38, 61, 47], ascending: [38, 42, 47, 55, 61], descending: [61, 55, 47, 42, 38], indices: [2, 0, 4, 1, 3],
    copyCode: "sorted_values = np.sort(moisture)", inPlaceCode: "moisture.sort()",
  },
  where: {
    values: [28, 32, 35, 29, 38, 31], condition: "temperature > 30", mask: [false, true, true, false, true, true], indices: [1, 2, 4, 5], filtered: [32, 35, 38, 31],
    replacementCode: "np.where(temperature > 35, 1, 0)", replacement: [0, 0, 0, 0, 1, 0],
  },
  conditions: [
    { id: "and", code: "temperature[(temperature >= 30) & (temperature <= 40)]", values: [25, 30, 35, 40, 45], mask: [false, true, true, true, false], result: [30, 35, 40], meaning: "Keep values satisfying both conditions." },
    { id: "or", code: "temperature[(temperature < 28) | (temperature > 40)]", values: [25, 30, 35, 40, 45], mask: [true, false, false, false, true], result: [25, 45], meaning: "Keep values satisfying either condition." },
  ],
  anyAll: [
    { function: "np.any", code: "np.any(temperature > 34)", result: true, meaning: "At least one reading is above 34." },
    { function: "np.all", code: "np.all(temperature > 20)", result: true, meaning: "Every reading is above 20." },
    { function: "np.all", code: "np.all(temperature > 30)", result: false, meaning: "Not every reading is above 30." },
  ],
  irrigation: { values: [42, 28, 35, 20, 48, 25], condition: "moisture < 30", mask: [false, true, false, true, false, true], filtered: [28, 20, 25], indices: [1, 3, 5] },
  sensorFilter: {
    matrix: [[28, 65, 40], [35, 70, 25], [31, 68, 38], [39, 75, 20]], columns: ["Temperature", "Humidity", "Moisture"],
    filters: [
      { id: "temperature", label: "Temperature > 32", code: "sensor_data[sensor_data[:, 0] > 32]", mask: [false, true, false, true], rows: [[35, 70, 25], [39, 75, 20]] },
      { id: "moisture", label: "Moisture < 30", code: "sensor_data[sensor_data[:, 2] < 30]", mask: [false, true, false, true], rows: [[35, 70, 25], [39, 75, 20]] },
      { id: "and", label: "Temperature > 32 AND moisture < 30", code: "sensor_data[(sensor_data[:, 0] > 32) & (sensor_data[:, 2] < 30)]", mask: [false, true, false, true], rows: [[35, 70, 25], [39, 75, 20]] },
      { id: "or", label: "Temperature > 32 OR moisture < 30", code: "sensor_data[(sensor_data[:, 0] > 32) | (sensor_data[:, 2] < 30)]", mask: [false, true, false, true], rows: [[35, 70, 25], [39, 75, 20]] },
    ],
  },
  quickReference: [
    { name: "np.sort(arr)", purpose: "Return an ascending sorted copy", example: "np.sort(moisture)" },
    { name: "arr.sort()", purpose: "Sort the original array in-place", example: "moisture.sort()" },
    { name: "np.argsort(arr)", purpose: "Return indices that sort the array", example: "np.argsort(moisture)" },
    { name: "np.where(condition)", purpose: "Find matching positions", example: "np.where(arr > 30)[0]" },
    { name: "arr[condition]", purpose: "Keep matching values or rows", example: "arr[arr > 30]" },
    { name: "np.any(condition)", purpose: "Check whether at least one is True", example: "np.any(arr > 50)" },
    { name: "np.all(condition)", purpose: "Check whether every value is True", example: "np.all(arr > 0)" },
  ],
  debugChallenges: [
    { title: "Python and is not element-wise", prompt: "Repair the combined NumPy condition.", code: "temperature[temperature > 30 and temperature < 40]", mistakesToFind: 2, solution: "temperature[(temperature > 30) & (temperature < 40)]", hiddenGuidance: "Use &, and wrap each comparison in parentheses." },
    { title: "Any alert?", prompt: "Predict the output.", code: "values = np.array([10, 20, 30])\nprint(np.any(values > 50))", mistakesToFind: 0, solution: "False — none of the values exceeds 50.", hiddenGuidance: "np.any() needs at least one True." },
    { title: "All safe?", prompt: "Predict the output.", code: "values = np.array([10, 20, 30])\nprint(np.all(values > 5))", mistakesToFind: 0, solution: "True — every value exceeds 5.", hiddenGuidance: "np.all() requires every mask entry to be True." },
    { title: "Values or positions", prompt: "Explain the different outputs.", code: "print(np.sort(values))\nprint(np.argsort(values))", mistakesToFind: 0, solution: "np.sort() returns sorted values; np.argsort() returns the original indices in sorted order.", hiddenGuidance: "One rearranges values; one describes the rearrangement." },
  ],
};
