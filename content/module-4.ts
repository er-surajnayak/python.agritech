import { whyCollectionsDevelopmentPack } from "@/content/development-packs/lesson-4-1";
import { pythonListsDevelopmentPack } from "@/content/development-packs/lesson-4-2";
import { workingWithListsDevelopmentPack } from "@/content/development-packs/lesson-4-3";
import { tuplesDevelopmentPack } from "@/content/development-packs/lesson-4-4";
import { setsDevelopmentPack } from "@/content/development-packs/lesson-4-5";
import { dictionaryDevelopmentPack } from "@/content/development-packs/lesson-4-6";
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
  {
    id: "module-4-lesson-2",
    moduleId: "module-4",
    number: "4.2",
    title: "Python Lists: Storing Related Data Together",
    summary: "Create ordered, mutable Lists, access elements with positive indexes, replace values, and inspect sensor data with len(), max(), and min().",
    durationMinutes: 150,
    level: "Beginner",
    introduction: { title: "Store related readings together", body: "Lesson 4.1 exposed the cost of separately named variables. This lesson introduces Python Lists as the first practical structure for one ordered body of related Smart Farm data." },
    objectives: [
      "Understand what a List is",
      "Create Lists",
      "Store multiple values in a single variable",
      "Access List elements using positive indexing",
      "Explain why Lists are ordered and mutable",
      "Use len(), max(), and min() with Lists",
      "Recognize when a List is the appropriate collection",
    ],
    whyThisMatters: { title: "Lists turn repeated values into manageable data", body: "One collection name makes related readings easier to access, update, summarize, and pass between the focused functions learners built in Module 3." },
    industryMotivation: { title: "Ordered datasets power monitoring dashboards", body: "A farm dashboard needs a predictable series of readings that can change as sensors report new values. Lists provide that beginner-friendly model.", signal: "This lesson teaches creation, positive indexing, element replacement, len(), max(), and min(). Negative indexing, slicing, list methods, sorting, and loops are intentionally deferred." },
    concept: { title: "A List is ordered, mutable, and permits duplicates", body: "Square brackets hold multiple elements under one variable name. Each element has a zero-based position, and an existing position can receive a new value.", items: ["Single variable", "Multiple elements", "Order", "Positive index", "Mutability", "Duplicates"] },
    workflow: { title: "Create, inspect, access, and replace", description: "Use the smallest complete workflow for learning List fundamentals.", steps: [
      { title: "Create", description: "Place related elements inside square brackets." },
      { title: "Visualize", description: "Map every element to a zero-based position." },
      { title: "Access", description: "Select one existing positive index." },
      { title: "Replace", description: "Assign a new value to an existing position." },
      { title: "Inspect", description: "Use len(), max(), and min()." },
    ] },
    agritechExample: { title: "One temperature List supports three immediate insights", body: "A dashboard can count four readings, identify 31 as the maximum, and identify 28 as the minimum while retaining the original sensor order." },
    playground: {
      title: "Explore a real moisture List",
      description: "Edit the List, access a positive index, replace an element, and run len(), max(), or min(). The synchronized panels visualize the current elements and selected index.",
      starterCode: "moisture = [25, 30, 28, 29, 31]\n\nprint(moisture)\nprint(moisture[0])\nprint(len(moisture))\nprint(max(moisture))\nprint(min(moisture))",
      expectedOutcome: "Python prints the complete List, its first element, the count 5, the maximum 31, and the minimum 25.",
    },
    practice: [
      { level: "Easy", title: "Create a crop List", prompt: "Create a List containing five crop names and print the complete List.", guidance: "Use one descriptive variable name and five quoted elements." },
      { level: "Medium", title: "Inspect temperature readings", prompt: "Create a temperature List and display its first element, last element using its positive index, and number of readings.", guidance: "Count the positions from zero; negative indexing begins in Lesson 4.3." },
      { level: "Challenge", title: "Summarize rainfall", prompt: "Create a List of rainfall values and display the highest and lowest readings.", guidance: "Use only max() and min(); sorting begins later." },
    ],
    quiz: [
      { title: "Question 1", question: "What does a Python List store?", options: ["Multiple values under one variable name", "Only one character", "Only functions", "No data"], correctOptionIndex: 0, note: "Lists group related elements.", explanation: "One List variable can refer to many ordered values." },
      { title: "Question 2", question: "What is the index of the first List element?", options: ["0", "1", "-1 only", "10"], correctOptionIndex: 0, note: "Python uses zero-based indexing.", explanation: "The first position is index 0." },
      { title: "Question 3", question: "What does mutable mean?", options: ["Elements can be replaced after creation", "The List has no order", "Duplicates are forbidden", "The List cannot change"], correctOptionIndex: 0, note: "Mutability permits in-place change.", explanation: "Assigning to an existing index replaces that element." },
      { title: "Question 4", question: "Which function counts List elements?", options: ["len()", "max()", "min()", "print()"], correctOptionIndex: 0, note: "len() reports collection size.", explanation: "It returns the number of elements." },
      { title: "Question 5", question: "Can a List contain duplicate values?", options: ["Yes", "No", "Only empty Lists", "Only strings"], correctOptionIndex: 0, note: "Duplicates preserve real repeated readings.", explanation: "Lists do not require unique elements." },
    ],
    assignment: { title: "Build a Farm Reading Snapshot", brief: "Create separate Lists for crops, temperatures, and rainfall, then demonstrate creation, positive indexing, mutability, and the three essential built-ins.", deliverables: ["A five-crop List", "A temperature List", "A rainfall List", "First and final elements using positive indexes", "One element replacement", "len() result", "max() result", "min() result", "A short explanation of order and mutability", "No negative indexing or slicing", "No list methods or loops"] },
    summarySection: { title: "You can now store and inspect related data with Lists", body: "You created Lists, mapped values to zero-based positions, accessed positive indexes, replaced elements, and used three essential Python built-ins without moving into later List techniques.", items: ["List creation", "Elements", "Order", "Positive indexing", "Mutability", "Duplicates", "len()", "max()", "min()"] },
    keyTakeaways: ["A List stores multiple related values in one variable", "Lists preserve element order", "Positive indexing begins at zero", "Lists are mutable and allow duplicates", "len(), max(), and min() inspect List contents", "Built-in functions and List methods are different categories"],
    whatsNext: { title: "Lesson 4.3 · Working with Lists", body: "Next, manage changing data through negative indexing, slicing, updates, additions, removals, traversal, built-ins, and List methods." },
    developmentPack: pythonListsDevelopmentPack,
  },
  {
    id: "module-4-lesson-3", moduleId: "module-4", number: "4.3", title: "Working with Lists", summary: "Manage changing Smart Farm data with negative indexing, slicing, updates, traversal, common built-ins, and the essential List methods.", durationMinutes: 180, level: "Beginner",
    introduction: { title: "A useful List must support change", body: "Sensor datasets grow, contain errors, and serve different reporting windows. This lesson completes the essential List toolkit before Module 4 moves to Tuples." },
    objectives: ["Access List elements using positive and negative indexing", "Extract portions of a List using slicing", "Update existing elements", "Add and remove elements", "Traverse a List", "Apply commonly used Python built-in functions and List methods", "Distinguish operations that return new results from methods that mutate a List", "Choose the appropriate List operation for a data-management task"],
    whyThisMatters: { title: "Real datasets evolve", body: "Farm monitoring software must correct faulty readings, incorporate new data, extract reporting windows, compute summaries, and preserve an understandable history." },
    industryMotivation: { title: "Operation semantics prevent data mistakes", body: "Professional developers care whether an operation changes live data or returns a separate result. The difference between sorted(readings) and readings.sort() is small in syntax but large in system behavior.", signal: "This lesson completes essential one-dimensional List operations. List comprehensions, nested Lists, matrices, and advanced sorting with key are intentionally deferred." },
    concept: { title: "List work combines access, mutation, traversal, and analysis", body: "Indexes and slices select data; assignments and methods modify it; traversal processes each element; built-ins compute or derive results.", items: ["Negative index", "Slice boundary", "Mutation", "Add", "Remove", "Traversal", "Built-in function", "List method", "Returned copy", "In-place change"] },
    workflow: { title: "Manage a sensor-data batch", description: "Move from selection to safe transformation and analysis.", steps: [{ title: "Select", description: "Use an index or slice." }, { title: "Correct", description: "Replace an incorrect element." }, { title: "Grow", description: "Append, insert, or extend." }, { title: "Clean", description: "Remove, pop, or clear." }, { title: "Traverse", description: "Process elements in order." }, { title: "Analyze", description: "Apply an appropriate built-in." }, { title: "Verify", description: "Inspect mutation versus returned results." }] },
    agritechExample: { title: "From raw readings to a managed snapshot", body: "The farm adds a reading, removes a fault, extracts a reporting window, traverses the clean batch, and computes count, total, minimum, and maximum." },
    playground: { title: "List Operations Laboratory", description: "Edit and run Python while the visualizer maps positive and negative indexes, highlights slices, records mutations, and calculates built-in results.", starterCode: "moisture = [25, 30, 28, 29, 31]\n\n# Explore indexing\nprint(moisture[-1])\nprint(moisture[1:4])\n\n# Modify\nmoisture.append(40)\nmoisture.remove(28)\n\nprint(sorted(moisture))\nprint(sum(moisture))", expectedOutcome: "Python prints 31, the slice [30, 28, 29], the sorted managed List, and the total 155." },
    practice: [{ level: "Easy", title: "Add a crop", prompt: "Append a new crop to an existing crop List and print the updated List.", guidance: "Use append() for one value at the end." }, { level: "Medium", title: "Clean and sort readings", prompt: "Remove one failed reading, preserve the original List, and display a sorted copy.", guidance: "Use remove() for the known fault and sorted() for a separate result." }, { level: "Challenge", title: "Calculate average moisture", prompt: "Clean a numeric List and calculate its average with sum(readings) / len(readings).", guidance: "Make sure the List is not empty before dividing." }],
    quiz: [{ title: "Question 1", question: "Which index selects the final element?", options: ["-1", "0", "1", "len(readings)"], correctOptionIndex: 0, note: "Negative indexes count from the end.", explanation: "-1 is the final element." }, { title: "Question 2", question: "In readings[1:4], is index 4 included?", options: ["No", "Yes", "Only for strings", "Only after sorting"], correctOptionIndex: 0, note: "Slice stop is exclusive.", explanation: "Indexes 1, 2, and 3 are selected." }, { title: "Question 3", question: "Which adds one element at the end?", options: ["append()", "extend()", "remove()", "clear()"], correctOptionIndex: 0, note: "append() receives one new element.", explanation: "extend() adds multiple elements from another iterable." }, { title: "Question 4", question: "What is the key difference between sorted(readings) and readings.sort()?", options: ["sorted() returns a new List; sort() mutates the List", "They are identical", "sort() returns a string", "sorted() clears the List"], correctOptionIndex: 0, note: "Returned copy versus in-place mutation matters.", explanation: "The original remains unchanged when only sorted() is called." }, { title: "Question 5", question: "What does traversal mean?", options: ["Visiting elements one at a time", "Deleting the List", "Creating a Tuple", "Renaming Python"], correctOptionIndex: 0, note: "A for loop can process every element.", explanation: "Traversal follows the collection in order." }],
    assignment: { title: "Create a Sensor Batch Manager", brief: "Build one program demonstrating safe access, slicing, updates, additions, removals, traversal, built-ins, and methods on a one-dimensional numeric List.", deliverables: ["Positive and negative access", "At least three slices", "One correction", "append(), insert(), and extend()", "remove() and pop()", "for-loop traversal", "len(), min(), max(), and sum()", "sorted() compared with sort()", "copy() demonstration", "Average calculation", "No comprehensions, nested Lists, matrices, or key sorting"] },
    summarySection: { title: "The essential List toolkit is complete", body: "You selected values from either end, extracted slices, corrected and reordered data, added and removed elements, traversed readings, compared built-ins with methods, and reasoned about returned results versus mutation.", items: ["Negative indexing", "Slicing", "Updating", "append / insert / extend", "remove / pop / clear", "Traversal", "Built-ins", "List methods", "Copy versus mutation"] },
    keyTakeaways: ["Positive and negative indexes provide flexible access", "A slice includes its start and excludes its stop", "Lists are ordered and mutable", "Built-ins work across many collection types", "List methods belong to List objects", "Some operations mutate while others return new results", "Lists suit ordered collections that change over time"],
    whatsNext: { title: "Lesson 4.4 · Tuples", body: "Next, explore immutable ordered collections, understand why fixed data benefits from protection, and compare Tuples directly with Lists." },
    developmentPack: workingWithListsDevelopmentPack,
  },
  {
    id: "module-4-lesson-4",
    moduleId: "module-4",
    number: "4.4",
    title: "Tuples: Immutable Collections",
    summary: "Protect fixed farm metadata with ordered, immutable Tuples, practice packing and unpacking, and compare tuple behavior with list behavior before moving to sets and dictionaries.",
    durationMinutes: 120,
    level: "Beginner",
    introduction: {
      title: "Protect fixed records from accidental edits",
      body: "By now you can store and process changing List data. This lesson teaches when you should not use mutability: important configuration values that should remain stable across execution.",
    },
    objectives: [
      "Understand why tuples exist",
      "Create tuples, including single-item tuple syntax",
      "Access tuple elements using indexes",
      "Recognize and use tuple immutability",
      "Use tuple packing and unpacking",
      "Use built-in functions with tuples",
      "Understand tuple methods",
      "Decide when tuple is safer than list",
    ],
    whyThisMatters: {
      title: "Fixed data should communicate its intent",
      body: "When a record should not change during execution, immutability reduces accidental corruption and makes intent explicit for teammates and future maintainers.",
    },
    industryMotivation: {
      title: "Every codebase protects identity fields",
      body: "IDs, coordinates, and registration metadata often need stronger constraints than ordinary sensor history lists.",
      signal: "This lesson keeps indexing and tuple operations focused, and avoids collection mixing with sets or dictionaries.",
    },
    concept: {
      title: "A Tuple is an ordered, immutable collection",
      body: "A tuple stores related values under one variable like a List, but writes are restricted after creation.",
      items: ["Ordered values", "Immutable records", "Single-item syntax", "Packing", "Unpacking", "count(), index()"],
    },
    workflow: {
      title: "Protect read-only data with intent",
      description: "When data is fixed by design, represent it as a Tuple and pass it explicitly to functions and modules.",
      steps: [
        { title: "Identify fixed data", description: "Find fields that should not change." },
        { title: "Create tuple", description: "Use parentheses and commas for grouping." },
        { title: "Read by index", description: "Inspect data with tuple positions." },
        { title: "Avoid mutation", description: "Do not reassign tuple element slots." },
      ],
    },
    agritechExample: { title: "Tuple-suitable farm metadata", body: "Keep Farm ID, registration year, and GPS coordinates as immutable tuples so accidental updates are caught immediately." },
    playground: {
      title: "Tuple syntax and behavior",
      description: "Experiment with tuple creation, indexing examples, immutability checks, and small packed tuple operations.",
      starterCode: "location = (17.3850, 78.4867)\n\nsensor = (101, \"Moisture\", 29.5)\n\nprint(location[0])\nprint(len(sensor))\nsensor_id, sensor_type, value = sensor\nprint(sensor_type)\n\n# location[0] = 18  # uncomment to see tuple immutability error\n",
      expectedOutcome: "Python prints the first coordinate, tuple length, and unpacked sensor_type. The assignment is commented because it would raise a TypeError in this lesson.",
    },
    practice: [
      { level: "Easy", title: "Create one tuple", prompt: "Create a tuple for one farm registration entry and print its first value.", guidance: "Use parentheses and commas correctly." },
      { level: "Medium", title: "Packing and unpacking", prompt: "Create (farm_id, farm_name, year) and unpack into variables.", guidance: "Print each variable after unpacking." },
      { level: "Challenge", title: "Tuple vs list decision", prompt: "Given three values for fixed metadata and two for live readings, decide where tuples and where lists belong.", guidance: "Explain your decision briefly." },
    ],
    quiz: [
      { title: "Question 1", question: "What makes a single-item tuple from a single value?", options: ["(value)", "(value,)", "[value]", "{value}"], correctOptionIndex: 1, note: "The trailing comma makes tuple syntax explicit.", explanation: "Without a comma, parentheses are treated as grouping." },
      { title: "Question 2", question: "What happens if you assign to tuple[0]?", options: ["Tuple changes in place", "A new tuple is returned", "TypeError", "Nothing, assignment is ignored"], correctOptionIndex: 2, note: "Tuples are immutable.", explanation: "Python prevents direct item assignment." },
      { title: "Question 3", question: "Which tuple methods are available?", options: ["append(), pop()", "count(), index()", "add(), remove()", "sort(), reverse()"], correctOptionIndex: 1, note: "Tuples are sequence objects with limited methods.", explanation: "count() and index() are tuple methods." },
    ],
    assignment: {
      title: "Protect fixed Smart Farm settings",
      brief: "Refactor fixed parts of a demo program to tuples and write comments explaining why each tuple should stay immutable.",
      deliverables: [
        "farm_info tuple",
        "sensor_location tuple",
        "single-item tuple correction example",
        "at least one tuple unpacking example",
        "notes comparing tuple and list behavior",
      ],
    },
    summarySection: {
      title: "Tuples are simple, clear, and protective",
      body: "You now use Tuples for fixed records, know why lists are not always safe for all data, and can choose tuple-specific operations confidently.",
      items: ["Tuple creation", "Indexing", "Packing", "Unpacking", "Immutability", "Tuple methods", "Tuple/list trade-off"],
    },
    keyTakeaways: [
      "Tuples are ordered and can hold mixed values",
      "Tuple immutability protects fixed records",
      "Single-item tuples need a trailing comma",
      "Unpacking distributes tuple values into readable variables",
      "Built-in functions inspect tuples like other iterable collections",
      "count() and index() are tuple-specific methods",
    ],
    whatsNext: { title: "Lesson 4.5 · Sets", body: "After immutability, move to unordered collections and uniqueness-focused workflows in Sets." },
    developmentPack: tuplesDevelopmentPack,
  },
  {
    id: "module-4-lesson-5",
    moduleId: "module-4",
    number: "4.5",
    title: "Sets: Unique Collections",
    summary: "Eliminate duplicate sensor logs automatically, explore unordered collections, perform mathematical union/intersection checks, and choose the correct collection for your data.",
    durationMinutes: 120,
    level: "Beginner",
    introduction: {
      title: "Eliminate duplicate sensor logs",
      body: "By now you can store sequence streams in Lists and protect configuration records in Tuples. This lesson introduces Sets as a structure designed to enforce uniqueness and optimize lookups automatically."
    },
    objectives: [
      "Understand why sets exist and why lists aren't always enough",
      "Create sets using curly braces {} and the set() constructor",
      "Understand set uniqueness and why duplicates are ignored",
      "Understand unordered collections and why indexing is unsupported",
      "Add elements using add() and remove elements using remove(), discard(), and clear()",
      "Perform union (|), intersection (&), difference (-), and symmetric difference (^)",
      "Apply built-in functions len(), min(), max(), sum(), sorted(), any(), and all()",
      "Apply set methods like issubset(), issuperset(), isdisjoint()",
      "Choose when to use a set instead of a list or tuple using a decision tree"
    ],
    whyThisMatters: {
      title: "Clean records prevent wrong statistics",
      body: "Telemetry duplicates skew metrics like averages or totals. A collection that handles deduplication at insertion reduces clean-up logic and guarantees data validity."
    },
    industryMotivation: {
      title: "Hardware IDs must register exactly once",
      body: "Central dashboards register device configurations. If a device has multiple redundant gateways, registering them under a Set ensures no duplicate registrations occur.",
      signal: "This lesson focuses on unique set collections, O(1) membership testing, and mathematical relationships. Frozen sets, hashing details, and set comprehensions are out of scope."
    },
    concept: {
      title: "A Set is unordered, mutable, and enforces uniqueness",
      body: "Values are stored without indexes or positions. If a value is added twice, the second addition is ignored. Sets are excellent for filtering data and finding intersections.",
      items: ["Unique values only", "Mutable insertions", "Unordered elements", "O(1) hash lookup speed", "Mathematical set operators"]
    },
    workflow: {
      title: "Initialize, modify, and check sets",
      description: "Perform common operations to filter duplicate sensor registries.",
      steps: [
        { title: "Initialize Set", description: "Use curly braces {101, 205} or set(list_of_ids)." },
        { title: "Add Element", description: "Use add() to append new elements." },
        { title: "Remove Element", description: "Use discard() to remove safely without errors." },
        { title: "Perform Union", description: "Use | operator to merge two sets into a unique registry." }
      ]
    },
    agritechExample: {
      title: "Registering unique hardware across networks",
      body: "Combining registered sensors from Barn A and Barn B using sets ensures no device is counted twice even if both barns share some sensors."
    },
    playground: {
      title: "Explore unique sensor set behavior",
      description: "Edit the code to add duplicate sensor IDs, compute unions/intersections, and witness indexing errors.",
      starterCode: `sensor_ids = {101, 101, 205, 310}\n\nfarm_a = {101, 102, 103}\nfarm_b = {103, 104, 105}\n\nprint("Unique sensor_ids:", sensor_ids)\nprint("Union of Farm A & B:", farm_a | farm_b)\nprint("Intersection of Farm A & B:", farm_a & farm_b)`,
      expectedOutcome: "Python prints unique sensor_ids {101, 205, 310}, their union {101, 102, 103, 104, 105}, and their intersection {103}."
    },
    practice: [
      {
        level: "Easy",
        title: "Create a crop set",
        prompt: "Create a set of crop names containing 'Rice', 'Wheat', and 'Corn', print the set, and observe its unordered state.",
        guidance: "Use curly braces {} for initialization."
      },
      {
        level: "Medium",
        title: "Deduplicate a list",
        prompt: "Given a list containing duplicates, convert it to a unique set using the set() constructor and print it.",
        guidance: "Pass the list directly into set()."
      },
      {
        level: "Challenge",
        title: "Find overlapping sensors",
        prompt: "Write a program that takes two sets of sensors and prints the overlapping sensors (intersection) and exclusive sensors (symmetric difference).",
        guidance: "Use the & and ^ operators."
      }
    ],
    quiz: [
      {
        title: "Question 1",
        question: "What happens if you add a duplicate value to a Python set?",
        options: ["An error is raised", "The duplicate is silently ignored and the set is unchanged", "The duplicate replaces the existing item", "The set becomes a dictionary"],
        correctOptionIndex: 1,
        note: "Sets enforce uniqueness.",
        explanation: "Adding a value that is already present in a set has no effect."
      },
      {
        title: "Question 2",
        question: "How do you create a set that is initially empty?",
        options: ["empty = {}", "empty = set()", "empty = []", "empty = set([])"],
        correctOptionIndex: 1,
        note: "Empty braces default to dictionaries.",
        explanation: "empty = {} creates an empty dictionary. Use set() for an empty set."
      },
      {
        title: "Question 3",
        question: "Which index selects the first element of set A?",
        options: ["A[0]", "A[1]", "A[-1]", "Indexing is not supported on sets"],
        correctOptionIndex: 3,
        note: "Sets are unordered.",
        explanation: "Sets are unordered collections and do not support indexing or subscripting."
      },
      {
        title: "Question 4",
        question: "What is the difference between remove() and discard() in sets?",
        options: [
          "remove() deletes a random element, while discard() deletes a specific one",
          "remove() raises an error if the item is missing, while discard() fails silently",
          "remove() changes the set in-place, while discard() returns a new set",
          "They are completely identical"
        ],
        correctOptionIndex: 1,
        note: "discard() is a safe deletion method.",
        explanation: "remove() raises a KeyError if the element is not found, while discard() does not raise any error."
      },
      {
        title: "Question 5",
        question: "Which set operator calculates intersection?",
        options: ["|", "&", "-", "^"],
        correctOptionIndex: 1,
        note: "Ampersand is used for intersection.",
        explanation: "& performs mathematical intersection; | performs union; - performs difference; ^ performs symmetric difference."
      }
    ],
    assignment: {
      title: "Build unique sensor telemetry registry",
      brief: "Create and manage a telemetry registry using sets to deduplicate incoming data, merge active sensor batches, and verify registrations using membership testing.",
      deliverables: [
        "Create empty set for registrations",
        "Add sensor IDs to the set including duplicates",
        "Remove sensor IDs using remove() and discard()",
        "Perform mathematical operations: union and intersection with incoming gateway sets",
        "Verify existence with 'in' operator",
        "Document list vs tuple vs set decisions"
      ]
    },
    summarySection: {
      title: "Sets automate uniqueness and set relations",
      body: "You now know how to construct sets, filter redundant records, use set operators like union and intersection, check membership in O(1) time, and select the correct collection using the decision tree.",
      items: ["Set creation", "Uniqueness", "Unordered characteristics", "add, remove, discard", "Union & Intersection", "O(1) lookups"]
    },
    keyTakeaways: [
      "Sets automatically delete duplicate values",
      "Sets are mutable but unordered, and do not support indexing",
      "empty_set = set() initializes an empty set; {} initializes a dictionary",
      "discard() removes elements safely without raising KeyErrors",
      "Operators like | and & support mathematical union and intersection",
      "Sets offer fast, constant-time lookups for membership checking"
    ],
    whatsNext: {
      title: "Lesson 4.6 · Dictionaries",
      body: "Next, explore key-value mappings in Python dictionaries to represent complex structured objects like sensor metadata."
    },
    developmentPack: setsDevelopmentPack,
  },
  {
    id: "module-4-lesson-6",
    moduleId: "module-4",
    number: "4.6",
    title: "Dictionaries: Key-Value Collections",
    summary: "Store labeled information as key-value pairs, access values safely using get() to avoid crashes, update and add data dynamically, apply key-value methods, and map collections to real-world schemas.",
    durationMinutes: 150,
    level: "Beginner",
    introduction: {
      title: "Introduce labeled structures for complex objects",
      body: "By now you can manipulate lists, tuples, and sets. This lesson introduces Dictionaries, enabling you to organize measurements using clear descriptive labels instead of numeric index positions."
    },
    objectives: [
      "Understand why dictionaries exist and why lists are not enough for objects",
      "Create dictionaries using curly braces {} and dict()",
      "Access values using square brackets [] and the safe get() method",
      "Update existing values and add new key-value pairs",
      "Remove key-value pairs using pop(), del, and clear()",
      "Apply built-in functions len(), sorted(), min(), max(), any(), and all()",
      "Apply dictionary methods like keys(), values(), items(), and update()",
      "Iterate through keys, values, and items",
      "Explain dictionaries relevance to JSON, APIs, and Data Science",
      "Identify the best collection structure using the real-world mapping matrix"
    ],
    whyThisMatters: {
      title: "Clear labels make robust programs",
      body: "When code refers to sensor['battery'] instead of sensor[4], it is self-documenting and resilient. Changes in layout or additions of API elements do not break index references."
    },
    industryMotivation: {
      title: "Dictionaries are the structure of APIs and databases",
      body: "Every JSON response from an API, every MongoDB record, and every spreadsheet row parsed in pandas matches a dictionary structure. Knowing dictionaries is vital for data exchange.",
      signal: "This lesson teaches core key-value operations, safe get(), view methods, iteration preview, and mapping. Dictionary nesting, default dicts, and counter libraries are deferred."
    },
    concept: {
      title: "A Dictionary is a mutable collection of labeled values",
      body: "Keys map to values. Keys must be unique and immutable, while values can repeat and mutate. Lookups operate on keys in O(1) constant time.",
      items: ["Key-value mapping", "Mutable updates", "Unique keys", "Constant lookup speed", "JSON resemblance"]
    },
    workflow: {
      title: "Create, query, update, and manage asset records",
      description: "Perform CRUD operations on weather stations and sensor nodes.",
      steps: [
        { title: "Define Dictionary", description: "Use curly braces to map keys to values: {'id': 101, 'crop': 'Rice'}." },
        { title: "Query Safely", description: "Use get('key', default) to retrieve values without raising KeyError." },
        { title: "Mutate Data", description: "Assign new values directly to modify or insert key-value pairs." },
        { title: "Extract Views", description: "Retrieve dict.keys(), dict.values(), or dict.items() views." }
      ]
    },
    agritechExample: {
      title: "Modeling a smart crop sensor node",
      body: "Representing crop, moisture level, temperature, and battery telemetry as a single structured dictionary that can update its metrics dynamically."
    },
    playground: {
      title: "Smart Farm Asset Laboratory",
      description: "Edit dictionary parameters, access values, add fields, and call keys() or values(). The supplement panel visualizes the dictionary as active key-value cards and JSON blocks.",
      starterCode: "sensor = {\n    \"id\": 101,\n    \"crop\": \"Rice\",\n    \"moisture\": 24,\n    \"temperature\": 31,\n    \"battery\": 82,\n    \"status\": \"Active\"\n}\n\n# Access crop name\nprint(\"Crop:\", sensor[\"crop\"])\n\n# Safely access battery\nprint(\"Battery:\", sensor.get(\"battery\"))\n\n# Update status\nsensor[\"status\"] = \"Maintenance\"\n\n# Add new coordinate\nsensor[\"lat_lng\"] = (18.52, 73.85)\n\nprint(\"Keys:\", list(sensor.keys()))\nprint(\"Updated:\", sensor)",
      expectedOutcome: "Python prints the crop name 'Rice', battery 82, updates status to 'Maintenance', appends the location tuple, and lists the dictionary keys."
    },
    practice: [
      {
        level: "Easy",
        title: "Create a crop info card",
        prompt: "Create a dictionary containing crop name, sowing month, and watering days. Print the complete dictionary.",
        guidance: "Use descriptive strings as keys: e.g. 'name', 'sowed', 'watering_cycle'."
      },
      {
        level: "Medium",
        title: "Model a weather station",
        prompt: "Define a weather station dictionary. Safely query the humidity and battery levels. Supply a default battery level of 100 if missing.",
        guidance: "Use station.get('battery', 100) to supply the default value."
      },
      {
        level: "Challenge",
        title: "Manage farm registry updates",
        prompt: "Create a farm dictionary, update its crop type, add a temperature reading, and delete the location coordinate using pop().",
        guidance: "Apply farm['crop'] = 'Wheat' for updating, and farm.pop('location') for removing."
      }
    ],
    quiz: [
      {
        title: "Question 1",
        question: "What does a Python dictionary store?",
        options: ["Unordered elements without labels", "Ordered values indexed only by integers", "Key-value pairs where keys map to values", "Unique items only, with no values"],
        correctOptionIndex: 2,
        note: "Dictionaries map descriptive keys to values.",
        explanation: "Every element in a dictionary is a pair: key and value."
      },
      {
        title: "Question 2",
        question: "Why is dict.get('key') preferred over dict['key'] for lookup?",
        options: [
          "It is faster",
          "It returns None instead of raising a KeyError if the key is missing",
          "It automatically creates the key in the dictionary",
          "It returns a list of keys"
        ],
        correctOptionIndex: 1,
        note: ".get() prevents program crashes on missing keys.",
        explanation: "Square bracket lookups raise a KeyError if a key is not found, while get() handles it safely."
      },
      {
        title: "Question 3",
        question: "What happens if you assign a value to a key that does not exist in the dictionary?",
        options: [
          "A KeyError is raised",
          "The dictionary is not modified",
          "The new key-value pair is automatically added to the dictionary",
          "The entire dictionary is cleared"
        ],
        correctOptionIndex: 2,
        note: "Dictionaries grow dynamically.",
        explanation: "Assigning to a new key creates the key-value mapping."
      },
      {
        title: "Question 4",
        question: "What does the clear() method do to a dictionary?",
        options: [
          "Removes only the last element",
          "Removes all elements, leaving it empty",
          "Sorts the keys alphabetically",
          "Creates a backup copy"
        ],
        correctOptionIndex: 1,
        note: "clear() resets the dictionary.",
        explanation: "clear() removes all key-value pairs, resulting in an empty dictionary {}."
      },
      {
        title: "Question 5",
        question: "By default, what do max() and min() inspect in a dictionary?",
        options: ["The values", "The keys", "Both keys and values", "They raise an error"],
        correctOptionIndex: 1,
        note: "Built-ins default to dictionary keys.",
        explanation: "Built-in functions operate on keys unless applied to dict.values() or dict.items() explicitly."
      }
    ],
    assignment: {
      title: "Implement a Smart Weather Registry",
      brief: "Write a program that initializes a weather station asset dictionary, demonstrates square brackets vs get() access, updates readings, adds dynamic features, pop() tags, and compares collection types in a markdown report.",
      deliverables: [
        "Initialize weather station dictionary",
        "Retrieve data using square brackets and get()",
        "Add rain telemetry and update battery levels",
        "Remove a field using pop()",
        "sorted() keys and values list outputs",
        "A comparison matrix outlining Lists, Tuples, Sets, and Dictionaries"
      ]
    },
    summarySection: {
      title: "Dictionaries bridge program logic to real-world data structures",
      body: "You now map labeled keys to values, perform safe lookups, mutate fields, delete keys, sort views, and understand how dictionaries represent API outputs and database records.",
      items: ["Key-value mapping", "Safe get() access", "Dynamic additions", "pop and del", "Keys/Values/Items views", "JSON mapping"]
    },
    keyTakeaways: [
      "Dictionaries store data as key-value pairs, providing descriptive labels",
      "Keys must be unique; values can repeat and can be of any type",
      "Square brackets retrieve values but raise a KeyError if the key is missing",
      "get() safe lookups prevent program crashes, returning None or custom defaults",
      "Assigning to a new key automatically grows the dictionary",
      "pop() and del remove keys, while clear() empties the dictionary",
      "max(), min(), and sorted() operate on keys by default",
      "Dictionaries are the Python equivalent of JSON objects and database records"
    ],
    whatsNext: {
      title: "Lesson 4.7 · Collection Operations & Built-ins",
      body: "Next, combine lists, tuples, sets, and dictionaries in advanced scenarios and explore built-in functions that work across all collections."
    },
    developmentPack: dictionaryDevelopmentPack
  }
];

export const moduleFourLessonSummaries = [
  { id: "module-4-lesson-1", moduleId: "module-4", order: 1, title: "4.1 Why Collections?", estimatedMinutes: 120, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-4-lesson-2", moduleId: "module-4", order: 2, title: "4.2 Python Lists", estimatedMinutes: 150, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-4-lesson-3", moduleId: "module-4", order: 3, title: "4.3 Working with Lists", estimatedMinutes: 180, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-4-lesson-4", moduleId: "module-4", order: 4, title: "4.4 Tuples", estimatedMinutes: 120, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-4-lesson-5", moduleId: "module-4", order: 5, title: "4.5 Sets", estimatedMinutes: 120, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-4-lesson-6", moduleId: "module-4", order: 6, title: "4.6 Dictionaries", estimatedMinutes: 150, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-4-lesson-7", moduleId: "module-4", order: 7, title: "4.7 Collection Operations & Built-ins", estimatedMinutes: 150, status: "not-started" as const, isPlaceholder: true },
  { id: "module-4-lesson-8", moduleId: "module-4", order: 8, title: "4.8 Choosing the Right Collection", estimatedMinutes: 120, status: "not-started" as const, isPlaceholder: true },
  { id: "module-4-lesson-9", moduleId: "module-4", order: 9, title: "4.9 Collections in Real-World Applications", estimatedMinutes: 150, status: "not-started" as const, isPlaceholder: true },
  { id: "module-4-lesson-10", moduleId: "module-4", order: 10, title: "4.10 Smart Farm Data Management Capstone", estimatedMinutes: 240, status: "not-started" as const, isPlaceholder: true },
];
