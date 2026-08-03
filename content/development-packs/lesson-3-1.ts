import type { WhyFunctionsDevelopmentPack } from "@/types/content";

const smartFarmModules = [
  {
    id: "irrigation",
    title: "Irrigation",
    conceptualCall: "checkIrrigation()",
    description: "Evaluate the field condition and choose an irrigation recommendation.",
    process: ["Read field status", "Apply the irrigation rule", "Prepare the recommendation"],
    outcome: "Irrigation recommendation ready",
  },
  {
    id: "temperature",
    title: "Temperature",
    conceptualCall: "analyzeTemperature()",
    description: "Interpret the latest greenhouse temperature reading.",
    process: ["Read temperature", "Compare the operating range", "Prepare the status"],
    outcome: "Temperature status ready",
  },
  {
    id: "crop",
    title: "Crop Recommendation",
    conceptualCall: "recommendCropAction()",
    description: "Select useful crop guidance from the current farm context.",
    process: ["Read crop context", "Select the matching guidance", "Prepare the recommendation"],
    outcome: "Crop recommendation ready",
  },
  {
    id: "sensors",
    title: "Sensor Monitoring",
    conceptualCall: "inspectSensors()",
    description: "Coordinate the repeated checks required for field sensors.",
    process: ["Open the sensor list", "Check each sensor", "Summarize the inspection"],
    outcome: "Sensor inspection complete",
  },
  {
    id: "reports",
    title: "Reports",
    conceptualCall: "generateFarmReport()",
    description: "Bring field observations together in one readable report.",
    process: ["Collect current results", "Organize the information", "Present the report"],
    outcome: "Farm report generated",
  },
] satisfies WhyFunctionsDevelopmentPack["modules"];

export const whyFunctionsDevelopmentPack: WhyFunctionsDevelopmentPack = {
  kind: "why-functions",
  prerequisite: "Module 1 · Python Fundamentals and Module 2 Capstone Project",
  story: {
    title: "The Smart Farm Console works—but its logic is repeated",
    body: "The irrigation rule now appears in the dashboard, daily report, mobile experience, and recommendation module. Every improvement requires the developer to find and update the same idea in several places.",
    locations: ["Dashboard", "Daily Report", "Mobile App", "AI Recommendation Module"],
    repeatedCode: ["Check whether soil moisture is critical", "Show the appropriate irrigation action"],
    quote: "Every time I change this logic, I have to update it in four places.",
    workflow: {
      title: "How repeated logic spreads",
      description: "One useful rule becomes four maintenance responsibilities when it is copied.",
      steps: [
        { title: "Dashboard", description: "Contains its own copy of the irrigation rule." },
        { title: "Mobile App", description: "Contains another copy of the same rule." },
        { title: "Daily Report", description: "Repeats the rule again for reporting." },
        { title: "Recommendation Module", description: "Adds a fourth copy to maintain." },
      ],
    },
  },
  duplication: {
    title: "A small change should not require eighteen edits",
    body: "If a 1,500-line project repeats one rule eighteen times, every copy becomes a chance for inconsistency. Reusable boundaries keep one responsibility in one dependable place.",
    projectLines: 1500,
    occurrences: 18,
    repeatedLocations: [
      { title: "Dashboard", lines: ["Check critical soil level", "Display irrigation action"] },
      { title: "Daily Report", lines: ["Check critical soil level", "Display irrigation action"] },
      { title: "Mobile App", lines: ["Check critical soil level", "Display irrigation action"] },
    ],
    conceptualReplacement: "checkIrrigation()",
    risks: ["Harder maintenance", "Inconsistent behaviour", "More bugs", "Higher delivery cost"],
  },
  analogy: {
    title: "A function is like a dependable remote-control button",
    body: "You press one clearly labelled button and trust it to perform a focused task. You use the capability without repeating or understanding every internal electronic step.",
    trigger: "Press Power",
    hiddenWork: ["Receive the signal", "Activate the television system", "Complete the startup sequence"],
    result: "Television turns on",
  },
  definition: {
    title: "A function is a reusable block that performs a specific task",
    body: "A program can ask that focused block to work whenever the task is needed. The task runs, finishes, and gives control back so the main program can continue.",
    flow: [
      { title: "Program", description: "Reaches a point where a focused task is needed." },
      { title: "Function", description: "Receives responsibility for that task." },
      { title: "Task", description: "Performs the reusable behaviour in one place." },
      { title: "Continue", description: "Control returns to the main program." },
    ],
  },
  benefits: [
    { title: "Reusable", description: "One trusted task can support many parts of the application." },
    { title: "Organized", description: "Each responsibility has a clear name and boundary." },
    { title: "Debuggable", description: "A problem can be investigated in one focused place." },
    { title: "Testable", description: "Each task can be checked independently." },
    { title: "Maintainable", description: "One improvement updates every place that uses the task." },
    { title: "Collaborative", description: "Teams can discuss and own clearly separated responsibilities." },
  ],
  comparison: {
    title: "From copied instructions to reusable responsibilities",
    body: "The goal is not fewer lines at any cost. The goal is one clear source of truth for each stable task.",
    without: ["Repeated code", "Longer program", "Several edit locations", "Inconsistent fixes", "Harder testing"],
    with: ["Single reusable block", "Clear task name", "One maintenance location", "Consistent behaviour", "Focused testing"],
  },
  agritechConcept: {
    title: "Turn a repeated farm-status check into one named capability",
    body: "The console repeatedly checks soil moisture, temperature, and rainfall. Conceptually, the program should request that complete task through one meaningful name instead of copying its steps.",
    repeatedTask: ["Check soil moisture", "Check temperature", "Check rainfall"],
    conceptualCall: "checkFarmStatus()",
  },
  functionFlow: {
    title: "Follow a conceptual function call",
    body: "Step through the hand-off from the main program to a focused task and back. This is a mental model only; function-creation syntax begins in Lesson 3.2.",
    steps: [
      { title: "Main program", description: "The Smart Farm Console reaches the irrigation feature." },
      { title: "Call function", description: "The program requests checkIrrigation()." },
      { title: "Function executes", description: "The reusable irrigation responsibility performs its work." },
      { title: "Return control", description: "The focused task finishes and control goes back." },
      { title: "Program continues", description: "The console proceeds to its next responsibility." },
    ],
  },
  modules: smartFarmModules,
  simulation: {
    title: "Explore the Smart Farm as reusable tools",
    body: "Choose a module to simulate a conceptual function call. Watch responsibility move into that module and return to the main program without introducing function syntax yet.",
    modules: smartFarmModules.filter((module) => module.id !== "crop"),
  },
  challenge: {
    title: "Find the reusable responsibilities",
    body: "Decide which Smart Farm tasks deserve a clear reusable boundary. Then reveal the engineering rationale.",
    tasks: [
      { id: "irrigation-rule", title: "Irrigation logic", location: "Used by dashboard, report, and mobile app", shouldBecomeFunction: true, explanation: "It is a focused, repeated responsibility with one stable purpose." },
      { id: "sensor-check", title: "Sensor inspection", location: "Used by daily and emergency monitoring", shouldBecomeFunction: true, explanation: "The inspection is repeated and can be named as one coherent task." },
      { id: "crop-recommendation", title: "Crop recommendation", location: "Used by console and advisory report", shouldBecomeFunction: true, explanation: "It represents a distinct domain capability that several features need." },
      { id: "temperature-analysis", title: "Temperature analysis", location: "Used by ventilation and reporting", shouldBecomeFunction: true, explanation: "One authoritative analysis avoids inconsistent thresholds." },
      { id: "single-heading", title: "One report heading", location: "Displayed once at application startup", shouldBecomeFunction: false, explanation: "A one-time, tiny presentation detail does not yet justify its own reusable boundary." },
    ],
  },
};
