import type { IfElseLessonDevelopmentPack } from "@/types/content";

export const ifElseDevelopmentPack: IfElseLessonDevelopmentPack = {
  kind: "if-else",
  prerequisite: "Lesson 2.1 Decision Making · Lesson 2.2 The if Statement",
  story: {
    title: "The Smart Irrigation System needs an answer for both outcomes",
    body: "The first controller starts irrigation when soil is dry, but remains silent when the reading is healthy. Reliable software should communicate the selected action in either situation.",
    priorCode: "if soil_moisture < 30:\n    print(\"Start Irrigation\")",
    missingValue: 45,
    missingOutcome: "No irrigation required",
    workflow: { title: "A complete two-way irrigation decision", description: "One condition selects exactly one action path.", steps: [{ title: "Soil Moisture", description: "Read the current sensor value." }, { title: "Condition", description: "Compare the reading with 30%." }, { title: "True or False", description: "Choose one branch from the Boolean result." }, { title: "if Block", description: "Start irrigation when the condition is True." }, { title: "else Block", description: "Keep the motor off when the condition is False." }] },
  },
  whyIfAlone: { title: "Why if alone is not enough", code: "soil = 45\n\nif soil < 30:\n    print(\"Start Irrigation\")", explanation: "At 45%, the condition is False and the program produces no message. The farmer cannot tell whether the system checked the field successfully.", output: "(no output)", question: "How does the farmer know everything is okay?", answer: "They do not. A second path must explain the False outcome." },
  definition: { title: "What is else?", body: "The else block runs only when the paired if condition is False.", trueAction: "The if block handles the True case.", falseAction: "The else block handles the False case.", guarantee: "Exactly one of the two blocks executes." },
  syntax: {
    title: "Read both branches as one complete decision",
    body: "The else keyword aligns with its if. Each branch owns one consistently indented block.",
    template: "if condition:\n    statement_1\nelse:\n    statement_2",
    parts: [
      { token: "if condition:", label: "Condition", description: "Evaluate one Boolean question." },
      { token: "    statement_1", label: "True branch", description: "Run this indented block when the answer is True." },
      { token: "else:", label: "Alternative", description: "Align else with if and end it with a colon." },
      { token: "    statement_2", label: "False branch", description: "Run this indented block when the answer is False." },
    ],
  },
  firstExample: { title: "Temperature chooses one of two messages", code: "temperature = 38\n\nif temperature > 35:\n    print(\"High Temperature\")\nelse:\n    print(\"Temperature Normal\")", explanation: "Move the temperature across 35°C and observe that exactly one message remains active.", output: "High Temperature", variable: "temperature", threshold: 35, trueValue: 38, falseValue: 30, trueOutput: "High Temperature", falseOutput: "Temperature Normal" },
  agritechExamples: [
    { title: "Irrigation controller", code: "soil_moisture = 24\n\nif soil_moisture < 30:\n    print(\"Start Irrigation\")\nelse:\n    print(\"Soil Moisture Sufficient\")", explanation: "Dry soil starts irrigation; sufficient moisture produces an explicit healthy-state message.", output: "Start Irrigation", condition: "soil_moisture < 30", trueAction: "Start Irrigation", falseAction: "Soil Moisture Sufficient", defaultValue: 24, threshold: 30, operator: "<" },
    { title: "Greenhouse ventilation", code: "temperature = 37\n\nif temperature > 35:\n    print(\"Open Ventilation\")\nelse:\n    print(\"Ventilation Not Required\")", explanation: "The controller communicates whether ventilation should open or remain closed.", output: "Open Ventilation", condition: "temperature > 35", trueAction: "Open Ventilation", falseAction: "Ventilation Not Required", defaultValue: 37, threshold: 35, operator: ">" },
    { title: "Rainfall monitoring", code: "rainfall = 120\n\nif rainfall > 150:\n    print(\"Flood Warning\")\nelse:\n    print(\"Rainfall Normal\")", explanation: "The system always reports either a warning or a normal reading.", output: "Rainfall Normal", condition: "rainfall > 150", trueAction: "Flood Warning", falseAction: "Rainfall Normal", defaultValue: 120, threshold: 150, operator: ">" },
  ],
  comparator: { title: "Compare both executions side by side", body: "The program is identical. Only the sensor input changes, selecting a different branch and output.", condition: "soil_moisture < 30", trueInput: 24, falseInput: 45, trueOutput: "Start Irrigation", falseOutput: "No Irrigation Required" },
  simulatorFields: [{ id: "soil_moisture", label: "Soil Moisture (%)", prompt: "Enter Soil Moisture (%): ", defaultValue: "24", type: "float" }],
  mistakesTitle: "Both branches must form one aligned structure",
  mistakes: [
    { title: "Missing indentation", incorrect: "if soil < 30:\nprint(\"Motor ON\")\nelse:\nprint(\"Motor OFF\")", reason: "Each branch needs its own indented block.", correct: "if soil < 30:\n    print(\"Motor ON\")\nelse:\n    print(\"Motor OFF\")" },
    { title: "Assignment instead of comparison", incorrect: "if soil = 30:\n    print(\"Exactly 30\")", reason: "A condition compares with ==; a single = assigns.", correct: "if soil == 30:\n    print(\"Exactly 30\")" },
    { title: "Misaligned else", incorrect: "if soil < 30:\n    print(\"Motor ON\")\n\n    else:\n        print(\"Motor OFF\")", reason: "else must align with the if it belongs to.", correct: "if soil < 30:\n    print(\"Motor ON\")\nelse:\n    print(\"Motor OFF\")" },
  ],
  debugChallenges: [
    { title: "Repair both block headers", prompt: "Add the missing colon after if and after else.", code: "soil = 20\n\nif soil < 30\n    print(\"Motor ON\")\nelse\n    print(\"Motor OFF\")", mistakesToFind: 2, solution: "soil = 20\n\nif soil < 30:\n    print(\"Motor ON\")\nelse:\n    print(\"Motor OFF\")", hiddenGuidance: "Every block header ends with the same punctuation." },
    { title: "Repair the True branch", prompt: "Make Hot part of the if block without changing the else branch.", code: "temperature = 40\n\nif temperature > 35:\nprint(\"Hot\")\nelse:\n    print(\"Normal\")", mistakesToFind: 1, solution: "temperature = 40\n\nif temperature > 35:\n    print(\"Hot\")\nelse:\n    print(\"Normal\")", hiddenGuidance: "The first print statement needs the same block indentation as the second." },
  ],
  engineerScenario: { title: "Design both greenhouse outcomes", scenario: "A greenhouse controller receives temperature, soil moisture, and rainfall.", question: "What useful True and False action should each sensor decision communicate?", options: [{ label: "Define both operational states", explanation: "Temperature can open or close ventilation, soil moisture can start or stop irrigation, and rainfall can show warning or normal status.", recommended: true }, { label: "Define only warning states", explanation: "Silence on False leaves operators unsure whether the system evaluated the sensor.", recommended: false }, { label: "Run both actions", explanation: "A single if-else selects exactly one mutually exclusive branch.", recommended: false }] },
  miniProject: { title: "Mini Project · Smart Irrigation Controller v2", brief: "Read soil moisture and temperature, then use two independent if-else decisions to report irrigation and ventilation states.", deliverables: ["Soil-moisture input converted with float()", "Start Irrigation below 30%", "No Irrigation Required otherwise", "Temperature input converted with float()", "Open Ventilation above 35°C", "Ventilation Closed otherwise", "Test low/high combinations"], outputTemplate: "SMART CONTROLLER STATUS\n-----------------------\nStart Irrigation\nOpen Ventilation" },
  comparison: { title: "Compare & Choose · if or if-else?", body: "Choose the structure from the number of outcomes your requirement must handle.", rows: [{ feature: "Executes when condition is True", ifOnly: "Yes", ifElse: "Yes" }, { feature: "Handles the False case", ifOnly: "No", ifElse: "Yes" }, { feature: "May produce no output", ifOnly: "Yes", ifElse: "No, when both branches print" }, { feature: "Execution paths", ifOnly: "One or zero blocks", ifElse: "Exactly one of two blocks" }] },
};
