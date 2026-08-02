import type { DecisionMakingLessonDevelopmentPack } from "@/types/content";

export const decisionMakingDevelopmentPack: DecisionMakingLessonDevelopmentPack = {
  kind: "decision-making",
  prerequisite: "Module 1 completed · Python fundamentals and problem solving",
  story: {
    title: "A smart irrigation system must choose an action",
    body: "A sensor report alone is not enough. The system must interpret current conditions and choose whether the irrigation motor should start or remain off. The correct action depends on the data.",
    readings: [
      { label: "Temperature", value: "33°C" },
      { label: "Soil Moisture", value: "25%" },
      { label: "Rainfall", value: "15 mm" },
    ],
    question: "Should the irrigation motor start?",
    answer: "It depends. The program must evaluate a condition before selecting an action.",
    workflow: {
      title: "From sensor reading to farm action",
      description: "Decision making turns observed data into different possible actions.",
      steps: [
        { title: "Sensor Data", description: "Receive temperature, soil-moisture, and rainfall observations." },
        { title: "Decision", description: "Evaluate whether the readings satisfy an irrigation condition." },
        { title: "Action", description: "Follow the matching motor path." },
      ],
    },
  },
  whyDecisions: {
    title: "Real applications cannot always follow one fixed path",
    body: "A calculation such as 2 + 3 has one direct result. Applications involving permissions, eligibility, safety, or farm automation must evaluate current information before acting.",
    examples: [
      { title: "Calculator", question: "Calculate 2 + 3", decisionRequired: false },
      { title: "ATM Machine", question: "Should money be withdrawn?", condition: "balance >= withdrawal_amount", decisionRequired: true },
      { title: "College Portal", question: "Should the student pass?", condition: "marks >= 40", decisionRequired: true },
      { title: "Smart Irrigation", question: "Should the motor start?", condition: "soil_moisture < 30", decisionRequired: true },
    ],
  },
  executionComparison: {
    title: "Sequential execution versus conditional execution",
    body: "Sequential programs always follow the same ordered path. Conditional programs evaluate a question and continue along one of several paths.",
    sequential: [
      { title: "Start", description: "Begin the program." },
      { title: "Input", description: "Receive the required value." },
      { title: "Calculation", description: "Perform the planned expression." },
      { title: "Output", description: "Display the result." },
      { title: "End", description: "Finish the program." },
    ],
    conditional: [
      { id: "conditional-start", label: "Start", type: "start-end" },
      { id: "conditional-condition", label: "Condition?", type: "decision" },
      { id: "conditional-yes", label: "Action A", type: "process", branch: "yes" },
      { id: "conditional-no", label: "Action B", type: "process", branch: "no" },
      { id: "conditional-end", label: "End", type: "start-end" },
    ],
  },
  conditions: {
    title: "A condition is an expression with a Boolean result",
    body: "Conditions compare current values and evaluate to either True or False. This lesson reads and tests conditions without introducing decision-statement syntax.",
    examples: [
      { expression: "temperature > 30", explanation: "Is the temperature above 30?" },
      { expression: "marks >= 40", explanation: "Did the learner reach the pass mark?" },
      { expression: "balance >= amount", explanation: "Is enough money available?" },
      { expression: "soil_moisture < 25", explanation: "Is the soil reading below 25%?" },
    ],
    variableDefaults: [
      { name: "temperature", label: "Temperature", value: 33 },
      { name: "marks", label: "Marks", value: 62 },
      { name: "balance", label: "Balance", value: 5000 },
      { name: "amount", label: "Withdrawal amount", value: 1200 },
      { name: "soil_moisture", label: "Soil moisture", value: 25 },
    ],
  },
  booleanReview: {
    title: "Conditions produce Boolean values",
    body: "True and False are the two possible answers to a condition. Predict each answer before revealing it.",
    expressions: [
      { expression: "10 > 5", result: true, explanation: "Ten is greater than five." },
      { expression: "10 < 5", result: false, explanation: "Ten is not less than five." },
      { expression: "33 > 30", result: true, explanation: "The current temperature exceeds the threshold." },
      { expression: "25 < 25", result: false, explanation: "Equal values do not satisfy a strict less-than comparison." },
    ],
    workflow: {
      title: "How a condition becomes a Boolean result",
      description: "Python evaluates the comparison before a decision can use it.",
      steps: [
        { title: "Expression", description: "Read the variables, values, and comparison operator." },
        { title: "Evaluation", description: "Compare the two operands according to the operator." },
        { title: "True / False", description: "Produce one Boolean result." },
      ],
    },
  },
  controlFlow: {
    title: "Control flow describes the order of execution",
    body: "Simple programs move from top to bottom. A decision introduces a branch: one result follows the Yes path and the other follows the No path.",
    sequential: [
      { title: "Top", description: "Begin with the first instruction." },
      { title: "Middle", description: "Continue to the next instruction." },
      { title: "Bottom", description: "Finish with the final instruction." },
    ],
    decisionTree: [
      { id: "flow-start", label: "Start", type: "start-end" },
      { id: "flow-condition", label: "Condition", type: "decision" },
      { id: "flow-yes", label: "Perform Action", type: "process", branch: "yes" },
      { id: "flow-no", label: "Skip Action", type: "process", branch: "no" },
      { id: "flow-end", label: "End", type: "start-end" },
    ],
  },
  flowcharts: {
    title: "Flowcharts make program logic visible before coding",
    body: "Standard shapes communicate the role of each step. Arrows show execution order and decisions introduce labelled Yes and No branches.",
    symbols: [
      { type: "start-end", name: "Oval", meaning: "Start / End" },
      { type: "process", name: "Rectangle", meaning: "Process" },
      { type: "decision", name: "Diamond", meaning: "Decision" },
      { type: "input-output", name: "Parallelogram", meaning: "Input / Output" },
    ],
    example: [
      { id: "marks-start", label: "Start", type: "start-end" },
      { id: "marks-input", label: "Input Marks", type: "input-output" },
      { id: "marks-condition", label: "Marks >= 40?", type: "decision" },
      { id: "marks-pass", label: "Pass", type: "process", branch: "yes" },
      { id: "marks-fail", label: "Fail", type: "process", branch: "no" },
      { id: "marks-end", label: "End", type: "start-end" },
    ],
    builderTarget: [
      { id: "builder-start", label: "Start", type: "start-end" },
      { id: "builder-input", label: "Read Water Level", type: "input-output" },
      { id: "builder-decision", label: "Water Level < 25%?", type: "decision" },
      { id: "builder-process", label: "Choose Motor Action", type: "process" },
      { id: "builder-output", label: "Display Action", type: "input-output" },
      { id: "builder-end", label: "End", type: "start-end" },
    ],
  },
  agritechCase: {
    title: "Should irrigation start?",
    body: "A soil-moisture reading of 22% is below the 30% threshold. The Yes path starts irrigation; the No path keeps the motor off. No Python decision syntax is needed yet—only the logic.",
    moisture: 22,
    threshold: 30,
    tree: [
      { id: "irrigation-start", label: "Start", type: "start-end" },
      { id: "irrigation-input", label: "Read Soil Moisture", type: "input-output" },
      { id: "irrigation-condition", label: "Moisture < 30%?", type: "decision" },
      { id: "irrigation-on", label: "Start Motor", type: "process", branch: "yes" },
      { id: "irrigation-off", label: "Keep Motor Off", type: "process", branch: "no" },
      { id: "irrigation-end", label: "End", type: "start-end" },
    ],
  },
  simulator: {
    title: "Smart Farm Decision Simulator",
    body: "Move the three readings and observe how the condition, Boolean result, path, and motor action change together.",
    defaults: { soilMoisture: 20, temperature: 33, rainfall: 15 },
    thresholds: { soilMoisture: 30, temperature: 30, rainfall: 50 },
  },
  realLifeScenarios: [
    { title: "Airport Security", question: "Is the passenger eligible to board?", checks: ["Ticket valid?", "Identity verified?"], yesAction: "Board", noAction: "Stop boarding" },
    { title: "Streaming Service", question: "Can this profile view the movie?", checks: ["Age >= 18?"], yesAction: "Show movie", noAction: "Hide movie" },
    { title: "UPI Payment", question: "Can the payment complete?", checks: ["Balance available?", "Payment details valid?"], yesAction: "Payment success", noAction: "Payment failed" },
  ],
  scenarioPractice: [
    { scenario: "Printing a farmer's name", requiresDecision: false, explanation: "The program displays the provided value without choosing a path." },
    { scenario: "Checking voting eligibility", requiresDecision: true, explanation: "Eligibility depends on whether age satisfies a threshold." },
    { scenario: "Calculating rectangular farm area", requiresDecision: false, explanation: "The same multiplication runs for every valid pair of measurements." },
    { scenario: "Approving an ATM withdrawal", requiresDecision: true, explanation: "Approval depends on the available balance and requested amount." },
    { scenario: "Verifying a login", requiresDecision: true, explanation: "Access depends on whether the supplied credentials are valid." },
  ],
  engineerScenario: {
    title: "Plan decisions for a Smart Greenhouse",
    scenario: "A greenhouse monitors temperature, humidity, soil moisture, and light intensity. The software must protect crops and manage resources.",
    question: "Which set describes five useful software decisions?",
    options: [
      { label: "Irrigation on/off, ventilation open/close, and warning notification", explanation: "These five actions respond directly to the monitored environment and form a strong first decision map.", recommended: true },
      { label: "Print every sensor value five times", explanation: "Repeated output does not change the greenhouse behaviour or protect crops.", recommended: false },
      { label: "Rename all sensor variables", explanation: "Readable names help implementation, but they are not operational decisions.", recommended: false },
    ],
  },
};
