import { whyFunctionsDevelopmentPack } from "@/content/development-packs/lesson-3-1";
import type { LessonDocument } from "@/types/content";

export const moduleThreeLessons: LessonDocument[] = [
  {
    id: "module-3-lesson-1",
    moduleId: "module-3",
    number: "3.1",
    title: "Why Functions?",
    summary: "Feel the cost of repeated code, discover reusable responsibilities, and build a conceptual mental model of function calls before learning any function-creation syntax.",
    durationMinutes: 120,
    level: "Beginner+",
    introduction: {
      title: "Start with the maintenance problem, not new syntax",
      body: "The Module 2 Smart Farm Console works, but important logic is copied across several features. This lesson investigates that design problem and introduces functions as reusable, focused tools.",
    },
    objectives: [
      "Understand why functions are needed",
      "Identify repeated code and duplicated responsibilities",
      "Explain code reusability in plain language",
      "Recognize modular programming",
      "Think of functions as reusable tools",
      "Follow a function call and the return of control conceptually",
      "Identify Smart Farm tasks that should become reusable",
      "Prepare for creating functions in the next lesson",
    ],
    whyThisMatters: {
      title: "Repeated logic makes working software expensive to change",
      body: "A copied irrigation rule may work today, but every later improvement must be applied consistently in every location. Functions help one focused responsibility serve many features.",
    },
    industryMotivation: {
      title: "Modular design is how teams keep growing software understandable",
      body: "Production applications separate domain responsibilities so developers can improve, test, and discuss one capability without searching an entire codebase for copied logic.",
      signal: "This lesson is intentionally conceptual. Function-creation syntax, parameters, arguments, and produced values begin in later lessons.",
    },
    concept: {
      title: "A function gives one specific task a reusable name and boundary",
      body: "The main program can request that task whenever it is needed. The focused work completes, control returns, and the program continues.",
      items: ["Focused responsibility", "Reusable behaviour", "Clear name", "Modular design", "Function call concept", "Return of control"],
    },
    workflow: {
      title: "A conceptual function call",
      description: "Responsibility moves from the main program to a focused task and then back.",
      steps: whyFunctionsDevelopmentPack.functionFlow.steps,
    },
    agritechExample: {
      title: "One farm-status check can support several experiences",
      body: "A dashboard, report, and mobile experience can all request the same dependable farm-status capability instead of maintaining separate copies of the soil, temperature, and rainfall checks.",
    },
    playground: {
      title: "Conceptual module simulator",
      description: "Choose a Smart Farm responsibility and watch the function-call mental model without writing function syntax.",
      starterCode: "Main Program → checkIrrigation() → Task → Main Program",
      expectedOutcome: "The selected module performs one focused responsibility and then gives control back to the main program.",
    },
    practice: [
      {
        level: "Easy",
        title: "Spot repeated work",
        prompt: "Review a dashboard, report, and mobile experience that each contain the same irrigation rule. Identify the repeated responsibility.",
        guidance: "Describe the task in one short verb-and-object phrase.",
        activities: ["Find the repeated soil check", "Find the repeated irrigation message", "Propose one clear task name"],
      },
      {
        level: "Medium",
        title: "Divide the Smart Farm into modules",
        prompt: "Group irrigation, temperature, crop recommendation, sensor inspection, and reporting into focused reusable responsibilities.",
        guidance: "Each group should have one reason to change and one clear purpose.",
        activities: ["Name each responsibility", "Describe its purpose", "Identify the features that need it"],
      },
      {
        level: "Challenge",
        title: "Explain the maintenance impact",
        prompt: "Compare changing one shared irrigation responsibility with changing eighteen copied versions. Explain the likely effect on bugs, testing, and teamwork.",
        guidance: "Focus on consistency and source of truth rather than only counting lines.",
      },
    ],
    quiz: [
      { title: "Question 1", question: "Why do programmers use functions?", options: ["To organize and reuse focused tasks", "To make every file longer", "Only to display text", "To avoid planning"], correctOptionIndex: 0, note: "Functions create reusable responsibilities.", explanation: "A focused block can support every feature that needs the same task." },
      { title: "Question 2", question: "What problem do functions help solve?", options: ["Repeated logic and unclear organization", "The need for more copied code", "Screen brightness", "Keyboard layout"], correctOptionIndex: 0, note: "Duplication increases maintenance risk.", explanation: "One authoritative responsibility is easier to change consistently." },
      { title: "Question 3", question: "Can one function be used many times?", options: ["Yes", "No", "Only once per project", "Only in data science"], correctOptionIndex: 0, note: "Reusability is a central benefit.", explanation: "Several parts of a program can request the same focused task." },
      { title: "Question 4", question: "Does modular design improve maintainability?", options: ["Yes", "No", "Only for very short scripts", "Only when no testing exists"], correctOptionIndex: 0, note: "Clear boundaries make change safer.", explanation: "Developers can locate, test, and improve a responsibility in one place." },
      { title: "Question 5", question: "What happens conceptually after a function finishes its task?", options: ["Control returns and the main program continues", "The computer always shuts down", "All variables disappear immediately", "Every task repeats forever"], correctOptionIndex: 0, note: "Follow the call-and-return mental model.", explanation: "The focused task completes, then execution continues in the calling program." },
    ],
    assignment: {
      title: "Refactor the Module 2 Capstone on paper",
      brief: "Review the Smart Farm Automation Console and identify reusable responsibilities. No coding or function syntax is required.",
      deliverables: [
        "Highlight at least five repeated or specialized code blocks",
        "Give each proposed responsibility a clear conceptual name",
        "Explain the single task each responsibility performs",
        "List every application feature that would use it",
        "Explain how centralizing it would reduce maintenance risk",
        "Draw one call-and-return flow from the main program",
      ],
    },
    summarySection: {
      title: "You now understand the problem functions are designed to solve",
      body: "You found duplication, compared copied and reusable designs, separated a Smart Farm into modules, followed the function-call mental model, and selected responsibilities that deserve a reusable boundary.",
      items: ["Repeated code", "Reusability", "Focused responsibilities", "Modular programming", "Maintainability", "Function-call concept", "Return of control"],
    },
    keyTakeaways: [
      "Functions solve the problem of repeated code",
      "A function should perform one specific task",
      "One reusable responsibility reduces inconsistent updates",
      "Modular software is easier to understand, test, and extend",
      "The main program can request a focused task and continue after it finishes",
      "Understanding why functions exist matters more than memorizing syntax",
    ],
    whatsNext: {
      title: "Lesson 3.2 · Creating Functions",
      body: "Next, turn these conceptual responsibilities into real reusable Python functions using the def keyword, then call them from different parts of the Smart Farm application.",
    },
    developmentPack: whyFunctionsDevelopmentPack,
  },
];

export const moduleThreeLessonSummaries = [
  { id: "module-3-lesson-1", moduleId: "module-3", order: 1, title: "3.1 Why Functions?", estimatedMinutes: 120, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-3-lesson-2", moduleId: "module-3", order: 2, title: "3.2 Creating Functions", estimatedMinutes: 90, status: "not-started" as const, isPlaceholder: true },
  { id: "module-3-lesson-3", moduleId: "module-3", order: 3, title: "3.3 Function Parameters", estimatedMinutes: 100, status: "not-started" as const, isPlaceholder: true },
  { id: "module-3-lesson-4", moduleId: "module-3", order: 4, title: "3.4 Return Values", estimatedMinutes: 100, status: "not-started" as const, isPlaceholder: true },
  { id: "module-3-lesson-5", moduleId: "module-3", order: 5, title: "3.5 Positional vs Keyword Arguments", estimatedMinutes: 90, status: "not-started" as const, isPlaceholder: true },
  { id: "module-3-lesson-6", moduleId: "module-3", order: 6, title: "3.6 Default Arguments", estimatedMinutes: 90, status: "not-started" as const, isPlaceholder: true },
  { id: "module-3-lesson-7", moduleId: "module-3", order: 7, title: "3.7 Variable Scope (Local vs Global)", estimatedMinutes: 110, status: "not-started" as const, isPlaceholder: true },
  { id: "module-3-lesson-8", moduleId: "module-3", order: 8, title: "3.8 Lambda Functions", estimatedMinutes: 90, status: "not-started" as const, isPlaceholder: true },
  { id: "module-3-lesson-9", moduleId: "module-3", order: 9, title: "3.9 Recursion (Introduction)", estimatedMinutes: 110, status: "not-started" as const, isPlaceholder: true },
  { id: "module-3-lesson-10", moduleId: "module-3", order: 10, title: "3.10 Capstone · Smart Farm Automation v2", estimatedMinutes: 180, status: "not-started" as const, isPlaceholder: true },
];
