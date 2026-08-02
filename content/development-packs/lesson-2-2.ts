import type { IfStatementLessonDevelopmentPack } from "@/types/content";

export const ifStatementDevelopmentPack: IfStatementLessonDevelopmentPack = {
  kind: "if-statement",
  prerequisite: "Module 1 · Lesson 2.1 Decision Making & Flowcharts",
  story: {
    title: "A Smart Irrigation System must choose when to act",
    body: "Every minute, field sensors report the current conditions. The motor should not start every time; it should start only when the soil is dry enough to require irrigation.",
    readings: [{ label: "Temperature", value: "33°C" }, { label: "Soil moisture", value: "24%" }],
    condition: "soil_moisture < 30",
    workflow: { title: "From sensor reading to action", description: "The condition guards the action. Only the True path reaches the motor instruction.", steps: [{ title: "Sensor Data", description: "Read the current field value." }, { title: "Condition", description: "Compare moisture with the threshold." }, { title: "True?", description: "The comparison produces a Boolean answer." }, { title: "Execute Code", description: "Run the indented block only for True." }, { title: "Motor ON", description: "Perform the selected farm action." }] },
  },
  definition: { title: "What is an if statement?", body: "An if statement checks a condition and controls one indented block of code.", trueAction: "When the condition is True, Python executes the indented block.", falseAction: "When the condition is False, Python skips the indented block and continues after it." },
  syntax: {
    title: "Read the syntax as a decision sentence",
    body: "Every symbol has a job. Together they tell Python which instruction belongs to the decision.",
    template: "if condition:\n    statement",
    parts: [
      { token: "if", label: "Decision keyword", description: "Starts a one-way decision." },
      { token: "condition", label: "Boolean condition", description: "Must evaluate to True or False." },
      { token: ":", label: "Block opener", description: "The colon announces an indented block." },
      { token: "    statement", label: "Indented block", description: "Runs only when the condition is True." },
    ],
  },
  firstExample: { title: "First if statement", code: "temperature = 35\n\nif temperature > 30:\n    print(\"Hot Weather\")", explanation: "Change the temperature from 35 to 25. The condition changes from True to False, so the message is skipped.", output: "Hot Weather", variable: "temperature", defaultValue: 35, threshold: 30 },
  executionFlow: { title: "Follow the path, line by line", code: "print(\"Start\")\n\ntemperature = 25\n\nif temperature > 30:\n    print(\"Motor ON\")\n\nprint(\"End\")", explanation: "Start and End always execute. Motor ON executes only when temperature > 30 is True.", output: "Start\nEnd", trueValue: 35, falseValue: 25 },
  indentation: { title: "Indentation defines the controlled block", body: "Python uses whitespace as structure. The statement under if must be indented consistently, while the next unconditional statement returns to the previous level.", correctCode: "if temperature > 30:\n    print(\"Motor ON\")", missingIndentation: "if temperature > 30:\nprint(\"Motor ON\")", extraIndentation: "    if temperature > 30:\n        print(\"Motor ON\")", missingColon: "if temperature > 30\n    print(\"Motor ON\")" },
  multipleStatements: { title: "One True condition can unlock several statements", code: "temperature = 34\n\nif temperature > 30:\n    print(\"Hot Weather\")\n    print(\"Drink Water\")\n    print(\"Stay Safe\")", explanation: "All three print statements use the same four-space indentation, so they belong to one if block.", output: "Hot Weather\nDrink Water\nStay Safe" },
  agritechExamples: [
    { title: "Start irrigation", code: "soil_moisture = 22\n\nif soil_moisture < 30:\n    print(\"Start Irrigation\")", explanation: "Low moisture activates an irrigation alert.", output: "Start Irrigation", condition: "soil_moisture < 30", result: true },
    { title: "Open greenhouse ventilation", code: "temperature = 38\n\nif temperature > 35:\n    print(\"Open Greenhouse Ventilation\")", explanation: "High temperature activates ventilation guidance.", output: "Open Greenhouse Ventilation", condition: "temperature > 35", result: true },
    { title: "Warn about flooding", code: "rainfall = 180\n\nif rainfall > 150:\n    print(\"Flood Warning\")", explanation: "Heavy rainfall activates a flood warning.", output: "Flood Warning", condition: "rainfall > 150", result: true },
  ],
  simulatorFields: [{ id: "temperature", label: "Temperature (°C)", prompt: "Enter Temperature: ", defaultValue: "35", type: "float" }],
  mistakesTitle: "Small syntax details control the entire decision",
  mistakes: [
    { title: "Missing colon", incorrect: "if temperature > 30\n    print(\"Hot\")", reason: "Python needs a colon after the condition to open the block.", correct: "if temperature > 30:\n    print(\"Hot\")" },
    { title: "Missing indentation", incorrect: "if temperature > 30:\nprint(\"Hot\")", reason: "Without indentation, Python cannot identify the controlled block.", correct: "if temperature > 30:\n    print(\"Hot\")" },
    { title: "Assignment instead of comparison", incorrect: "if temperature = 30:\n    print(\"Exactly 30\")", reason: "A condition compares values with ==; a single = assigns a value.", correct: "if temperature == 30:\n    print(\"Exactly 30\")" },
  ],
  debugChallenges: [
    { title: "Repair the temperature alert", prompt: "Find the wrong operator, missing colon, and missing indentation.", code: "temperature = 35\n\nif temperature = 35\nprint(\"High Temperature\")\n\nprint(\"Done\")", mistakesToFind: 3, solution: "temperature = 35\n\nif temperature == 35:\n    print(\"High Temperature\")\n\nprint(\"Done\")", hiddenGuidance: "Inspect the comparison, the end of the if header, and the statement controlled by it." },
    { title: "Repair the soil alert", prompt: "Make the motor message part of the if block.", code: "soil = 25\n\nif soil < 30:\n\nprint(\"Start Motor\")", mistakesToFind: 1, solution: "soil = 25\n\nif soil < 30:\n    print(\"Start Motor\")", hiddenGuidance: "The action needs four spaces because it is controlled by the condition." },
  ],
  engineerScenario: { title: "Think like a Smart Farm engineer", scenario: "A dashboard receives temperature, humidity, rainfall, soil moisture, and wind speed.", question: "Which useful decisions could each single condition trigger?", options: [{ label: "Map readings to focused alerts", explanation: "Start irrigation, send a heat alert, open ventilation, trigger a frost warning, and display a low-rainfall notice are clear one-condition actions.", recommended: true }, { label: "Print every alert every time", explanation: "This ignores the sensor values and creates a static program.", recommended: false }, { label: "Combine every rule immediately", explanation: "Begin with one testable decision at a time before composing more complex control flow.", recommended: false }] },
  miniProject: { title: "Mini Project · Weather Alert System", brief: "Read temperature, rainfall, and wind speed, then use three independent if statements to display only the alerts whose thresholds are crossed.", deliverables: ["Temperature input converted with float()", "Rainfall input converted with float()", "Wind-speed input converted with float()", "HIGH TEMPERATURE ALERT above 35°C", "HEAVY RAIN ALERT above 150 mm", "HIGH WIND ALERT above 60 km/h", "Only independent if statements"], outputTemplate: "WEATHER ALERTS\n----------------\nHIGH TEMPERATURE ALERT\nHEAVY RAIN ALERT\nHIGH WIND ALERT" },
};
