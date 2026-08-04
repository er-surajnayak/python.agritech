import type { OopWhyOopDevelopmentPack } from "@/types/content";

export const oopWhyOopDevelopmentPack: OopWhyOopDevelopmentPack = {
  kind: "oop-lesson-5-1",
  prerequisite: "Module 4 · Python Collections",
  storyHook:
    "You have mastered variables, control flow, functions, and all four Python collections. The Smart Farm system you have been building works — but it is about to hit a wall. In this lesson we discover why, and we meet the concept that professional developers use to build systems that scale.",

  // ── Section 1: The Growing Problem ─────────────────────────────────────────
  growingProblem: {
    title: "The Smart Farm is Growing",
    body: "When the Smart Farm tracked just one or two sensors, simple variables were enough. Now each farm carries dozens of properties — name, crop, temperature, humidity, battery level, irrigation status, fertilizer schedule, and farmer info. Multiply that by 1,000 farms and we have a maintenance crisis.",
    scalingSteps: [
      { label: "1 Farm", count: 20, unit: "variables", highlight: false },
      { label: "10 Farms", count: 200, unit: "variables", highlight: false },
      { label: "100 Farms", count: 2000, unit: "variables", highlight: false },
      { label: "1,000 Farms", count: 20000, unit: "variables", highlight: true },
    ],
    scalingQuestion: "Would you really write 20,000 variables by hand?",
    proceduralCode: `# Three farms — already hard to manage
farm1_name = "Green Valley"
farm1_crop = "Rice"
farm1_temperature = 31
farm1_humidity = 65

farm2_name = "Sunrise Farm"
farm2_crop = "Wheat"
farm2_temperature = 28
farm2_humidity = 70

farm3_name = "AgriTech Hub"
farm3_crop = "Corn"
farm3_temperature = 33
farm3_humidity = 60

# Now imagine farm4, farm5 ... farm1000`,
    painPoints: [
      "Every new farm adds 20+ new variable names",
      "Functions need dozens of parameters to operate on one farm",
      "Updating a property means finding all related variables",
      "No way to group a farm's data and behaviour together",
      "Code becomes unreadable and impossible to maintain",
    ],
  },

  // ── Section 2: Why OOP ─────────────────────────────────────────────────────
  whyOop: {
    title: "Why Object-Oriented Programming Exists",
    body: "A real farm is not just a list of values. It IS something — an entity with its own data and its own behaviours. Object-Oriented Programming lets us model that directly in code by keeping data and the functions that operate on it together in one unit called an Object.",
    dataItems: [
      "Farm name",
      "Crop type",
      "Temperature reading",
      "Humidity reading",
      "Battery level",
      "Sensor list",
    ],
    behaviourItems: [
      "Display farm report",
      "Update sensor reading",
      "Trigger irrigation",
      "Generate alert",
      "Calculate average temperature",
    ],
    unificationNote:
      "Instead of separate variables and functions, OOP unifies them into a single Farm object that knows its own data and knows what to do with it.",
  },

  // ── Section 3: Real World Analogy ──────────────────────────────────────────
  realWorldAnalogy: {
    title: "Blueprint and Building",
    body: "An architect draws one blueprint for a house. That blueprint can produce hundreds of identical — yet independent — houses. In Python, a Class is the blueprint. An Object is the building. You write the Class once and create as many Objects as the system needs.",
    blueprintSide: [
      "One Class definition",
      "Written once",
      "Describes structure",
      "Describes behaviour",
      "Reusable forever",
    ],
    instanceSide: [
      "Many Object instances",
      "Each created with one call",
      "Each stores its own data",
      "Each can call its own methods",
      "All independent",
    ],
  },

  // ── Section 4: Class Concept ───────────────────────────────────────────────
  classConcept: {
    title: "What is a Class?",
    definition:
      "A Class is a blueprint that describes the structure and behaviour of a category of objects. It defines what data every object will hold and what actions every object will be able to perform.",
    agritechContext:
      "A Farm class defines that every farm will have a name, a crop, and temperature data — and that every farm can display itself, update readings, and trigger irrigation. Individual farms are created from this blueprint.",
    attributes: [
      { name: "name", type: "str" },
      { name: "crop", type: "str" },
      { name: "temperature", type: "float" },
      { name: "humidity", type: "float" },
      { name: "status", type: "str" },
    ],
    methods: [
      { name: "__init__", params: "self, name, crop", returnType: "None" },
      { name: "display", params: "self", returnType: "str" },
      { name: "update", params: "self, temperature", returnType: "None" },
    ],
    code: `class Farm:
    pass  # Blueprint exists — but is empty for now`,
  },

  // ── Section 5: Object Concept ──────────────────────────────────────────────
  objectConcept: {
    title: "What is an Object?",
    definition:
      "An Object is a concrete instance created from a Class. Where a Class is the blueprint, an Object is the real thing — it exists in memory, holds actual data, and can perform actions.",
    instances: [
      { name: "green_valley", represents: "Green Valley Farm — Rice, 31°C" },
      { name: "sunrise_farm", represents: "Sunrise Farm — Wheat, 28°C" },
      { name: "agritech_hub", represents: "AgriTech Hub — Corn, 33°C" },
    ],
    code: `class Farm:
    pass

# Creating objects from the Farm blueprint
green_valley  = Farm()
sunrise_farm  = Farm()
agritech_hub  = Farm()

print(type(green_valley))`,
    output: "<class '__main__.Farm'>",
  },

  // ── Section 6: Multiple Objects ────────────────────────────────────────────
  multipleObjects: {
    title: "One Blueprint, Many Independent Objects",
    body: "Every call to Farm() creates a brand new, completely independent object. Changing data on one object has no effect on any other object — they share the same blueprint but live their own independent lives.",
    code: `class Farm:
    pass

farm1 = Farm()
farm2 = Farm()
farm3 = Farm()

print(farm1 is farm2)  # False — they are different objects
print(type(farm3))     # <class '__main__.Farm'>`,
    independenceNote:
      "farm1, farm2, and farm3 are three separate objects in memory. They all came from the same Farm blueprint, but each is completely independent.",
  },

  // ── Section 7: Agritech Example ───────────────────────────────────────────
  agritechExample: {
    title: "Sensor Objects — Same Blueprint, Different Purposes",
    body: "Just as farms share a Farm blueprint, all sensors share a Sensor blueprint. Although they are the same type, each can later hold different data — temperature, moisture, humidity — and behave differently.",
    code: `class Sensor:
    pass

# Three sensors — all from the same blueprint
temperature_sensor = Sensor()
moisture_sensor    = Sensor()
humidity_sensor    = Sensor()

print(type(temperature_sensor))
print(type(moisture_sensor))
print(type(humidity_sensor))`,
    discussion:
      "Right now all three are empty. In Lesson 5.2 we will give each sensor its own data using __init__ — and each one will hold its own sensor_id, location, and reading independently.",
  },

  // ── Section 8: Memory Objects (for MemoryBasicViewer) ─────────────────────
  memoryObjects: [
    {
      instanceName: "farm1",
      className: "Farm",
      address: "#0x1A2B",
      attributes: [],
    },
    {
      instanceName: "farm2",
      className: "Farm",
      address: "#0x3C4D",
      attributes: [],
    },
    {
      instanceName: "farm3",
      className: "Farm",
      address: "#0x5E6F",
      attributes: [],
    },
  ],

  // ── Section 9: Debug Challenges ───────────────────────────────────────────
  debugChallenges: [
    {
      title: "Missing Colon — Class Definition",
      prompt:
        "This class definition fails to run. Find and fix the syntax error.",
      code: `class Farm
    pass`,
      mistakesToFind: 1,
      solution: `class Farm:
    pass`,
      hiddenGuidance:
        "Every class definition in Python ends with a colon (:) after the class name — the same rule that applies to if statements, for loops, and function definitions.",
    },
    {
      title: "Missing Parentheses — Object Creation",
      prompt:
        "A farm object was created but its type is wrong. What happened?",
      code: `class Farm:
    pass

farm = Farm   # No parentheses!
print(type(farm))`,
      mistakesToFind: 1,
      solution: `class Farm:
    pass

farm = Farm()  # Parentheses call the constructor
print(type(farm))`,
      hiddenGuidance:
        "Writing Farm without () assigns the Class itself to the variable — not an instance. You must call Farm() with parentheses to create an object.",
    },
    {
      title: "Reference vs Copy",
      prompt:
        "Two variables are created. Are they two different objects or the same one? Discuss.",
      code: `class Farm:
    pass

farm1 = Farm()
farm2 = farm1   # What does this do?

print(farm1 is farm2)`,
      mistakesToFind: 0,
      solution: `class Farm:
    pass

farm1 = Farm()
farm2 = Farm()  # This creates a NEW independent object

print(farm1 is farm2)  # False — two different objects`,
      hiddenGuidance:
        "farm2 = farm1 does NOT copy the object — it makes farm2 point to the exact same object in memory. To get two independent Farm objects, call Farm() twice.",
    },
  ],

  // ── Section 10: Engineer Thinking ─────────────────────────────────────────
  engineerThinkingPrompt:
    "Imagine you are designing software to manage 5,000 farms, 50,000 sensors, and 20,000 farmers across India. Would you rather manage everything using hundreds of separate variables and functions — or using objects that represent real-world entities? Explain how OOP makes software scalable, maintainable, and easier to extend as requirements change.",

  // ── Object Evolution Panel ─────────────────────────────────────────────────
  objectEvolutionState: {
    lessonNumber: "5.1",
    title: "Our Farm class — Lesson 5.1",
    code: `class Farm:
    pass

# Blueprint exists.
# No data. No methods. Not yet.
# We will build it lesson by lesson.`,
    note: "This class starts empty. In Lesson 5.2 we give it data using __init__. By Lesson 5.10 it will be a complete production system.",
  },
};
