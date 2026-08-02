import type { NestedIfLessonDevelopmentPack } from "@/types/content";

export const nestedIfDevelopmentPack: NestedIfLessonDevelopmentPack = {
  kind: "nested-if",
  prerequisite: "Lessons 2.1–2.4 · Decision Making, if, if-else, and if-elif-else",
  story: {
    title: "The Smart Farm now needs decisions that depend on earlier decisions",
    body: "Low soil moisture is no longer enough to select an irrigation action. The controller must first confirm that the soil is dry, then examine temperature and rainfall before choosing the safest response.",
    priorFlow: ["Read soil moisture", "Classify the level", "Choose one action"],
    addedSignals: ["Temperature", "Rainfall"],
    workflow: { title: "From one decision to a decision hierarchy", description: "The second question is relevant only after the first answer opens that path.", steps: [{ title: "Check soil", description: "Is moisture below the irrigation threshold?" }, { title: "Enter dry-soil branch", description: "Only a True answer continues into the nested decision." }, { title: "Check temperature", description: "Hot conditions increase urgency." }, { title: "Choose timing", description: "Irrigate immediately or schedule evening irrigation." }] },
  },
  whyHierarchy: {
    title: "The same dry soil can require different actions",
    body: "A flat classification answers which range contains a value. A hierarchy answers a different question: after one condition is satisfied, what additional evidence should influence the action?",
    cases: [{ soil: 20, temperature: 38, result: "Immediate Irrigation" }, { soil: 20, temperature: 22, result: "Irrigate in Evening" }],
  },
  definition: {
    title: "Nested if expresses dependent, multi-stage decisions",
    body: "A nested if is an if statement inside another controlled block. Python evaluates the inner condition only when execution enters the outer True branch.",
    rules: ["Evaluate the outer condition first", "Enter its indented block only when True", "Evaluate the inner condition only after entering", "Skip the complete inner structure when the outer condition is False"],
    analogy: [{ title: "Has ticket?", description: "The airport begins identity checks only for a passenger with a valid ticket." }, { title: "Identity verified?", description: "This second check depends on passing the first checkpoint." }, { title: "Board flight", description: "The final action happens only after both decisions succeed." }],
  },
  syntax: {
    title: "Indentation makes the hierarchy visible",
    body: "The inner if begins one indentation level inside the outer block. Its controlled statement begins another level deeper.",
    template: "if condition1:\n    if condition2:\n        statement",
    parts: [{ token: "if condition1:", label: "Outer decision", description: "Python always evaluates this condition first." }, { token: "    if condition2:", label: "Inner decision", description: "Python reaches this condition only when the outer condition is True." }, { token: "        statement", label: "Nested action", description: "Eight leading spaces place this action inside both decisions." }],
  },
  firstExample: {
    title: "First nested irrigation decision",
    code: "soil = 20\ntemperature = 38\n\nif soil < 30:\n    if temperature > 35:\n        print(\"Start Irrigation Immediately\")",
    explanation: "The soil check opens the dry-field branch. Only then does Python evaluate temperature and select the immediate action.",
    output: "Start Irrigation Immediately",
    defaultSoil: 20,
    defaultTemperature: 38,
  },
  decisionTree: {
    title: "Follow the dependency, not just the indentation",
    body: "The outer branch controls whether the inner question is even available. Highlighting the selected route makes skipped decisions explicit.",
    nodes: [{ id: "soil", label: "Level 1 · Field state", condition: "soil < 30", trueLabel: "Check temperature", falseLabel: "No Irrigation Needed", description: "The soil threshold is the gateway decision." }, { id: "temperature", label: "Level 2 · Urgency", condition: "temperature > 35", trueLabel: "Immediate Irrigation", falseLabel: "Irrigate in Evening", description: "Temperature matters only inside the dry-soil branch." }],
  },
  agritechExamples: [
    { title: "Rain prediction", code: "humidity = 90\ntemperature = 28\n\nif humidity > 80:\n    if temperature < 30:\n        print(\"Rain Likely\")", explanation: "Temperature is evaluated only after humidity passes its threshold.", output: "Rain Likely" },
    { title: "Greenhouse cooling", code: "temperature = 40\nhumidity = 35\n\nif temperature > 35:\n    if humidity < 40:\n        print(\"Activate Cooling System\")", explanation: "Humidity refines the response only after high temperature creates a cooling concern.", output: "Activate Cooling System" },
  ],
  withElse: { title: "Nested if with complete alternatives", code: "soil = 25\ntemperature = 22\n\nif soil < 30:\n    if temperature > 35:\n        print(\"Immediate Irrigation\")\n    else:\n        print(\"Irrigate in Evening\")\nelse:\n    print(\"No Irrigation Needed\")", explanation: "The inner else belongs to the temperature check; the outer else belongs to the soil check. Alignment reveals each relationship.", output: "Irrigate in Evening" },
  hierarchy: { title: "Explore the hierarchy one level at a time", body: "Expand each level to see why it exists and when Python reaches it.", levels: [{ title: "Level 1 · Soil gate", condition: "soil < 30", description: "Rejects fields that already have sufficient moisture." }, { title: "Level 2 · Temperature urgency", condition: "temperature > 35", description: "Distinguishes immediate irrigation from a cooler evening schedule." }, { title: "Optional Level 3 · Rain safety", condition: "rainfall > 100", description: "Can cancel irrigation when recent rainfall makes watering unnecessary." }] },
  simulator: { title: "Trace a three-signal irrigation path", body: "Move the sensor values. The tree highlights only the questions reached by the current scenario.", defaultSoil: 25, defaultTemperature: 38, defaultRainfall: 0 },
  simulatorFields: [{ id: "soil", label: "Soil Moisture (%)", prompt: "Enter Soil Moisture (%): ", type: "float", defaultValue: "25" }, { id: "temperature", label: "Temperature (°C)", prompt: "Enter Temperature (°C): ", type: "float", defaultValue: "38" }],
  mistakesTitle: "Common nested-decision mistakes",
  mistakes: [
    { title: "Inner decision is not indented", incorrect: "if soil < 30:\nif temperature > 35:\n    print(\"Start\")", reason: "The second if is not inside the soil branch.", correct: "if soil < 30:\n    if temperature > 35:\n        print(\"Start\")" },
    { title: "Independent conditions mistaken for nesting", incorrect: "if soil < 30:\n    print(\"Dry\")\n\nif temperature > 35:\n    print(\"Hot\")", reason: "Both top-level if statements are evaluated independently.", correct: "if soil < 30:\n    if temperature > 35:\n        print(\"Dry and hot\")" },
    { title: "Impossible inner condition", incorrect: "if soil < 30:\n    if soil > 40:\n        print(\"Impossible\")", reason: "One value cannot be below 30 and above 40 on the same path.", correct: "if soil < 30:\n    if temperature > 35:\n        print(\"Dry and hot\")" },
  ],
  debugChallenges: [
    { title: "Repair the missing outer colon", prompt: "Find the syntax error that prevents the hierarchy from running.", code: "soil = 25\ntemperature = 38\n\nif soil < 30\n    if temperature > 35:\n        print(\"Immediate Irrigation\")", mistakesToFind: 1, solution: "if soil < 30:\n    if temperature > 35:\n        print(\"Immediate Irrigation\")", hiddenGuidance: "Every if header must end with a colon." },
    { title: "Restore the nested action", prompt: "Fix the indentation so the output belongs to the inner condition.", code: "soil = 20\ntemperature = 38\n\nif soil < 30:\n    if temperature > 35:\n    print(\"Motor ON\")", mistakesToFind: 1, solution: "if soil < 30:\n    if temperature > 35:\n        print(\"Motor ON\")", hiddenGuidance: "The print statement needs one indentation level beyond the inner if." },
  ],
  engineerScenario: { title: "Choose the first greenhouse checkpoint", scenario: "A controller observes temperature, humidity, and light intensity. The checks are dependent, but sensor reads and actuator changes have different costs.", question: "Which principle should determine the first condition?", options: [{ label: "Start with the safest, cheapest gate", explanation: "A high-value early check can skip unnecessary downstream work while preserving safety and clarity.", recommended: true }, { label: "Always start with humidity", explanation: "No single sensor should always be first; the system requirements determine the hierarchy.", recommended: false }, { label: "Choose a random order", explanation: "Random ordering makes behaviour harder to explain, test, and maintain.", recommended: false }] },
  miniProject: { title: "Smart Irrigation Controller v4", brief: "Use soil moisture as the outer gate, then temperature to choose immediate or evening irrigation. Extend the dry-soil branch with a rainfall safety check and explain its placement.", deliverables: ["Read soil moisture, temperature, and rainfall", "Use soil moisture as the outer decision", "Cancel irrigation when rainfall exceeds 100 mm", "Choose immediate irrigation above 35°C", "Otherwise schedule evening irrigation", "Report no irrigation for sufficient soil moisture", "Test every path"], outputTemplate: "SMART IRRIGATION CONTROLLER V4\n--------------------------------\nSelected path: [path]\nRecommended action: [action]" },
  comparison: { title: "Compare and choose the right decision pattern", body: "Choose a structure based on the relationship between decisions, not the number of lines in the program.", rows: [{ feature: "Purpose", ifElse: "Two possible outcomes", ifElifElse: "Multiple alternative outcomes", nestedIf: "Dependent, multi-stage decisions" }, { feature: "Conditions checked", ifElse: "One", ifElifElse: "Many, top to bottom", nestedIf: "One only after another" }, { feature: "Typical use", ifElse: "Pass or fail", ifElifElse: "Grade selection", nestedIf: "Security or workflow validation" }, { feature: "Multiple levels", ifElse: "No", ifElifElse: "No", nestedIf: "Yes" }, { feature: "Agritech example", ifElse: "Irrigation on or off", ifElifElse: "Irrigation level", nestedIf: "Soil gate, then temperature" }] },
  patternSelector: { title: "Decision Pattern Selector", body: "Read the relationship in each requirement, choose a pattern, then reveal the engineering reason.", scenarios: [{ prompt: "Send an alert only when temperature is above 40°C.", answer: "if", explanation: "There is one guarded action and no required alternative." }, { prompt: "Show Pump ON or Pump OFF from one moisture threshold.", answer: "if-else", explanation: "One condition has exactly two explicit outcomes." }, { prompt: "Classify rainfall as low, normal, heavy, or flood.", answer: "if-elif-else", explanation: "Several alternatives compete in one ordered classification." }, { prompt: "Check whether soil is dry, then check temperature only for dry soil.", answer: "nested-if", explanation: "The temperature decision depends on passing the soil decision first." }] },
};
