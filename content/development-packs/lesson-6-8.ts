import type { NumpyArrayManagementDevelopmentPack } from "@/types/content";

export const numpyArrayManagementDevelopmentPack: NumpyArrayManagementDevelopmentPack = {
  kind: "numpy-combining-splitting-views",
  prerequisite: "Lesson 6.7 · Sorting, Searching & Filtering Arrays",
  storyHook: "Morning, evening, and multi-farm sensor feeds arrive separately. The engineering team must assemble them into useful datasets, divide batches for processing, and avoid accidental changes when selecting working subsets.",
  combining: {
    first: [28, 30, 31], second: [32, 29, 30],
    operations: [
      { id: "concatenate", label: "Concatenate", code: "np.concatenate((morning, evening))", result: [[28, 30, 31, 32, 29, 30]], shape: "(6,)", explanation: "Extend the existing 1D axis." },
      { id: "vstack", label: "Vertical stack", code: "np.vstack((morning, evening))", result: [[28, 30, 31], [32, 29, 30]], shape: "(2, 3)", explanation: "Place the readings in separate rows." },
      { id: "hstack", label: "Horizontal stack", code: "np.hstack((morning, evening))", result: [[28, 30, 31, 32, 29, 30]], shape: "(6,)", explanation: "For 1D arrays, place values side by side." },
      { id: "stack", label: "Stack", code: "np.stack((morning, evening))", result: [[28, 30, 31], [32, 29, 30]], shape: "(2, 3)", explanation: "Create a new axis for the two source arrays." },
      { id: "stack-axis-1", label: "Stack · axis=1", code: "np.stack((morning, evening), axis=1)", result: [[28, 32], [30, 29], [31, 30]], shape: "(3, 2)", explanation: "Create the new axis in the second position." },
    ],
  },
  twoDimensional: {
    farmA: [[28, 65], [30, 70]], farmB: [[31, 68], [29, 72]],
    axis0: [[28, 65], [30, 70], [31, 68], [29, 72]],
    axis1: [[28, 65, 31, 68], [30, 70, 29, 72]],
  },
  splitter: { evenValues: [10, 20, 30, 40, 50, 60], unevenValues: [1, 2, 3, 4, 5] },
  columnStack: {
    temperature: [28, 30, 31], humidity: [65, 70, 68], moisture: [40, 42, 38],
    result: [[28, 65, 40], [30, 70, 42], [31, 68, 38]],
  },
  copyView: {
    original: [10, 20, 30, 40], sliceStart: 1, sliceStop: 3, modifiedValue: 999,
    viewOriginal: [10, 999, 30, 40], viewSelection: [999, 30],
    copyOriginal: [10, 20, 30, 40], copySelection: [999, 30],
  },
  quickReference: [
    { name: "np.concatenate()", purpose: "Extend an existing axis", example: "np.concatenate((a, b))" },
    { name: "np.vstack()", purpose: "Stack vertically as rows", example: "np.vstack((a, b))" },
    { name: "np.hstack()", purpose: "Stack horizontally", example: "np.hstack((a, b))" },
    { name: "np.stack()", purpose: "Join along a new axis", example: "np.stack((a, b))" },
    { name: "np.split()", purpose: "Split into equal sections", example: "np.split(data, 3)" },
    { name: "np.array_split()", purpose: "Allow unequal sections", example: "np.array_split(data, 2)" },
    { name: "np.column_stack()", purpose: "Turn 1D features into columns", example: "np.column_stack((temp, humidity))" },
    { name: "arr.copy()", purpose: "Create independent data", example: "part = arr[1:3].copy()" },
  ],
  debugChallenges: [
    { title: "Unequal split", prompt: "Why does this fail, and which function should replace split?", code: "data = np.array([1, 2, 3, 4, 5])\nnp.split(data, 2)", mistakesToFind: 1, solution: "Use np.array_split(data, 2). np.split() requires equal sections; array_split() permits [1, 2, 3] and [4, 5].", hiddenGuidance: "Five values cannot be divided evenly into two integer-sized groups." },
    { title: "Vertical result", prompt: "Predict the shape and output.", code: "a = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(np.vstack((a, b)))", mistakesToFind: 0, solution: "Shape (2, 3): [[1, 2, 3], [4, 5, 6]].", hiddenGuidance: "Vertical stacking makes each 1D input a row." },
    { title: "Shared slice", prompt: "Predict a after b changes.", code: "a = np.array([10, 20, 30])\nb = a[1:3]\nb[0] = 100\nprint(a)", mistakesToFind: 0, solution: "[10, 100, 30] because the basic slice is a view of the same underlying data.", hiddenGuidance: "The selected data was not copied." },
    { title: "Protect the original", prompt: "Change one line so modifying b cannot modify a.", code: "b = a[1:3]", mistakesToFind: 1, solution: "b = a[1:3].copy()", hiddenGuidance: "Request independent storage explicitly." },
  ],
};
