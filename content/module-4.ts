import { whyCollectionsDevelopmentPack } from "@/content/development-packs/lesson-4-1";
import type { LessonDocument } from "@/types/content";

export const moduleFourLessons: LessonDocument[] = [
  {
    id: "module-4-lesson-1",
    moduleId: "module-4",
    number: "4.1",
    title: "Why Collections?",
    summary: "Experience the limits of individual variables and discover why growing applications need related data to be organized together—before learning any collection syntax.",
    durationMinutes: 120,
    level: "Beginner",
    introduction: { title: "The problem before the solution", body: "The Smart Farm has outgrown one-variable-per-reading design. This lesson makes that scaling problem visible before introducing Python Lists in Lesson 4.2." },
    objectives: [
      "Understand the limitations of individual variables",
      "Recognize repeated data patterns",
      "Explain why collections are necessary",
      "Compare individual variables with grouped data",
      "Appreciate the motivation behind Python Lists",
    ],
    whyThisMatters: { title: "Data volume changes program design", body: "A technique that works for five readings may collapse under five thousand. Recognizing that boundary helps programmers select structures that remain understandable as systems grow." },
    industryMotivation: { title: "Every data product groups related records", body: "Agritech platforms, banks, streaming services, and search engines manage many related values as organized datasets rather than inventing a new variable name for every record.", signal: "This lesson intentionally introduces motivation only. Collection syntax, indexing, slicing, methods, and collection iteration begin later." },
    concept: { title: "A collection groups related values", body: "When many variables represent the same kind of data, treating them as one organized group makes the design easier to scale, reason about, and maintain.", items: ["Related data", "Repeated patterns", "Scale", "Organization", "Maintainability"] },
    workflow: { title: "Recognize the need for a collection", description: "Move from a small working example to a scalable data-design question.", steps: [
      { title: "Observe", description: "Notice repeated related variables." },
      { title: "Scale", description: "Imagine hundreds or thousands of values." },
      { title: "Measure", description: "Count declarations and update points." },
      { title: "Group", description: "Describe the values as one related body of data." },
      { title: "Prepare", description: "Choose a collection type in later lessons." },
    ] },
    agritechExample: { title: "Thousands of sensor readings need one data strategy", body: "Moisture, temperature, humidity, and pH readings arrive continuously. Numbered variables cannot provide a maintainable foundation for storing and analyzing them." },
    playground: {
      title: "Experience the maintenance problem",
      description: "Run and edit individual sensor variables. Add more declarations and observe that each new reading creates another name and another future maintenance point.",
      starterCode: "sensor1 = 25\nsensor2 = 30\nsensor3 = 28\nsensor4 = 29\nsensor5 = 31\n\nprint(sensor1)\nprint(sensor2)\nprint(sensor3)\nprint(sensor4)\nprint(sensor5)",
      expectedOutcome: "Python prints the five readings, while the analysis panel counts the repeated declarations and shows why this pattern cannot scale.",
    },
    practice: [
      { level: "Easy", title: "Five temperatures", prompt: "Write five separately named temperature variables and describe the naming pattern.", guidance: "Notice what remains the same and what changes." },
      { level: "Medium", title: "Twenty temperatures", prompt: "Extend the same idea to twenty readings, then count the declarations and update statements required.", guidance: "Record how repetition affects readability and review effort." },
      { level: "Challenge", title: "Design for ten thousand sensors", prompt: "Explain why separately named variables would fail as a long-term design and describe the organizational capability the program needs.", guidance: "Focus on grouping, updating, searching, and analysis without writing collection syntax." },
    ],
    quiz: [
      { title: "Question 1", question: "What commonly signals that related data should be grouped?", options: ["Repeated variable names that differ only by a number", "One clear constant", "A single print statement", "A comment"], correctOptionIndex: 0, note: "Repeated naming patterns reveal related values.", explanation: "A growing numbered family of variables is difficult to maintain individually." },
      { title: "Question 2", question: "Why do individual variables fail at large scale?", options: ["They create repetitive declarations and update points", "Python forbids numbers", "They always become strings", "They cannot be printed"], correctOptionIndex: 0, note: "The problem is design scale, not basic validity.", explanation: "Each value adds another name and another place that future changes can miss." },
      { title: "Question 3", question: "What is the central purpose of a collection?", options: ["Group related values", "Rename Python", "Replace every function", "Avoid all data"], correctOptionIndex: 0, note: "Collections organize related information.", explanation: "Grouping makes many values easier to access, update, and analyze." },
      { title: "Question 4", question: "Does Lesson 4.1 teach collection syntax?", options: ["No, it teaches the motivation first", "Yes, every syntax form", "Only advanced dictionary syntax", "Only indexing"], correctOptionIndex: 0, note: "Problem understanding comes first.", explanation: "Python Lists begin in Lesson 4.2." },
    ],
    assignment: { title: "Explain the sensor-data design problem", brief: "Model a farm with individually named readings, measure how the code grows, and recommend grouping related data without using collection syntax.", deliverables: ["Five temperature variables", "Twenty-variable growth estimate", "Ten-thousand-sensor maintenance analysis", "Repeated-pattern explanation", "Bookshelf analogy in your own words", "A short justification for grouping related values", "No collection syntax"] },
    summarySection: { title: "You now know why collections exist", body: "Individual variables are useful for small, distinct values, but repeated related data needs an organized structure. You measured code growth, found naming patterns, and described the need for grouping without learning syntax prematurely.", items: ["Scaling limits", "Repeated data patterns", "Code growth", "Maintenance risk", "Grouped data", "Collection motivation"] },
    keyTakeaways: ["Individual variables work for small amounts of distinct data", "Repeated numbered variables signal a design problem", "Large applications need related values organized together", "Collections solve different data-management problems", "Understanding the need comes before learning syntax"],
    whatsNext: { title: "Lesson 4.2 · Python Lists", body: "Now that the scaling problem is clear, learn how Python Lists create and organize the first practical group of related Smart Farm readings." },
    developmentPack: whyCollectionsDevelopmentPack,
  },
];

export const moduleFourLessonSummaries = [
  { id: "module-4-lesson-1", moduleId: "module-4", order: 1, title: "4.1 Why Collections?", estimatedMinutes: 120, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-4-lesson-2", moduleId: "module-4", order: 2, title: "4.2 Python Lists", estimatedMinutes: 120, status: "not-started" as const, isPlaceholder: true },
  { id: "module-4-lesson-3", moduleId: "module-4", order: 3, title: "4.3 Indexing & Accessing List Elements", estimatedMinutes: 100, status: "not-started" as const, isPlaceholder: true },
  { id: "module-4-lesson-4", moduleId: "module-4", order: 4, title: "4.4 Updating, Adding & Removing Elements", estimatedMinutes: 120, status: "not-started" as const, isPlaceholder: true },
  { id: "module-4-lesson-5", moduleId: "module-4", order: 5, title: "4.5 List Operations, Built-ins & Methods", estimatedMinutes: 150, status: "not-started" as const, isPlaceholder: true },
  { id: "module-4-lesson-6", moduleId: "module-4", order: 6, title: "4.6 Tuples", estimatedMinutes: 100, status: "not-started" as const, isPlaceholder: true },
  { id: "module-4-lesson-7", moduleId: "module-4", order: 7, title: "4.7 Sets", estimatedMinutes: 100, status: "not-started" as const, isPlaceholder: true },
  { id: "module-4-lesson-8", moduleId: "module-4", order: 8, title: "4.8 Dictionaries", estimatedMinutes: 150, status: "not-started" as const, isPlaceholder: true },
  { id: "module-4-lesson-9", moduleId: "module-4", order: 9, title: "4.9 Choosing the Right Collection", estimatedMinutes: 120, status: "not-started" as const, isPlaceholder: true },
  { id: "module-4-lesson-10", moduleId: "module-4", order: 10, title: "4.10 Smart Farm Data Management Capstone", estimatedMinutes: 240, status: "not-started" as const, isPlaceholder: true },
];
