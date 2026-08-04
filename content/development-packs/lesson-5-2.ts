import type { OopConstructorsDevelopmentPack } from "@/types/content";

export const oopConstructorsDevelopmentPack: OopConstructorsDevelopmentPack = {
  kind: "oop-lesson-5-2",
  prerequisite: "Lesson 5.1 · Why Object-Oriented Programming?",
  storyHook:
    "In Lesson 5.1, we created our first Farm objects. But they were completely empty — like blank index cards without any text written on them. Every farm looked identical. In this lesson, we give every Farm object its own identity by mastering constructors and the self keyword.",

  // ── Problem Section ────────────────────────────────────────────────────────
  problemSection: {
    title: "Why Empty Objects Are Not Enough",
    body: "Creating empty objects with `farm1 = Farm()` creates instances in memory, but they carry no data. How do we distinguish Green Valley Farm (growing Rice at 31°C) from Sunrise Farm (growing Wheat at 28°C)? Without an initialization mechanism, we would have to manually attach variables to every object after creation — which is error-prone and defeats the purpose of OOP.",
    emptyObjectCode: `# Empty objects from Lesson 5.1
farm1 = Farm()
farm2 = Farm()

# How do we give farm1 and farm2 their own name and crop?
# We need an automatic setup method!`,
    painPoint:
      "Without automatic initialization, every object creation requires manual assignment, leading to inconsistent objects missing required data.",
  },

  // ── Why Constructors ───────────────────────────────────────────────────────
  whyConstructors: {
    title: "Introducing Constructors",
    body: "A constructor is a special method inside a class that executes automatically every single time a new object is created. In Python, the constructor is named __init__() (short for 'initialize'). Think of it as the factory setup procedure for your object.",
    analogyTitle: "The Factory Setup Checklist",
    analogyBody:
      "When a new Smart Sensor comes off the assembly line, factory technicians don't leave it blank. They configure its device ID, sensor type, and calibration settings before shipping. __init__() is that factory setup script — guaranteeing every object is fully configured the moment it is born.",
  },

  // ── init Concept ───────────────────────────────────────────────────────────
  initConcept: {
    title: "Understanding __init__()",
    definition:
      "__init__() is a built-in Python method that is automatically invoked whenever a class is instantiated (e.g., Farm()). Its job is to set up the initial state of the new object.",
    syntax: `class ClassName:
    def __init__(self, param1, param2):
        self.attribute1 = param1
        self.attribute2 = param2`,
    rules: [
      "Always named exactly __init__ with double underscores on both sides (dunder init)",
      "The first parameter MUST always be self",
      "Executes automatically when ClassName() is called — you never call __init__() manually",
      "Should not return any value (returns None implicitly)",
    ],
    firstConstructorCode: `class Farm:
    def __init__(self):
        print("⚡ A new Farm object has been created!")

# Creating objects triggers __init__ automatically
farm1 = Farm()
farm2 = Farm()`,
    firstConstructorOutput: `⚡ A new Farm object has been created!
⚡ A new Farm object has been created!`,
  },

  // ── self Concept ───────────────────────────────────────────────────────────
  selfConcept: {
    title: "Understanding self",
    definition:
      "self represents the specific object currently being created or operated on. It allows instance variables and methods to belong to THAT specific object, rather than all objects or local variables.",
    classroomAnalogy: {
      teacherPrompt:
        "Imagine a teacher tells a classroom of 30 students: 'Write YOUR name on YOUR paper.'",
      studentAction:
        "Student A writes 'Rahul'. Student B writes 'Priya'. Neither student writes their classmate's name.",
      lesson:
        "In Python, 'YOUR' is self. When farm1 calls __init__, self means farm1. When farm2 calls __init__, self means farm2.",
    },
    rules: [
      "self is automatically passed by Python when you create an object — you do NOT pass it manually",
      "self.name creates an instance variable attached to the object",
      "Without self., a variable inside __init__ is a temporary local variable that disappears when __init__ finishes",
    ],
  },

  // ── Instance Variables ─────────────────────────────────────────────────────
  instanceVariables: {
    title: "Adding Data with Instance Variables",
    body: "An instance variable is a variable attached to an object using self.attribute_name. Every object gets its own separate copy of instance variables.",
    code: `class Farm:
    def __init__(self, name, crop, temperature):
        self.name = name            # instance variable
        self.crop = crop            # instance variable
        self.temperature = temperature  # instance variable

# Pass arguments directly to Farm()
farm1 = Farm("Green Valley", "Rice", 31.5)
farm2 = Farm("Sunrise Farm", "Wheat", 28.0)

print(farm1.name, "->", farm1.crop, f"({farm1.temperature}°C)")
print(farm2.name, "->", farm2.crop, f"({farm2.temperature}°C)")`,
    output: `Green Valley -> Rice (31.5°C)
Sunrise Farm -> Wheat (28.0°C)`,
    explanation:
      "Notice how Farm('Green Valley', 'Rice', 31.5) passes 3 arguments. Python automatically supplies farm1 as self behind the scenes!",
  },

  // ── Constructor Flow Steps (for visualizer) ───────────────────────────────
  constructorFlowSteps: [
    {
      stepNumber: 1,
      label: "Call Farm('Green Valley', 'Rice')",
      lineHighlight: "farm1 = Farm('Green Valley', 'Rice')",
      explanation:
        "Python allocates a blank object in memory (#0x1A2B) and calls Farm.__init__(#0x1A2B, 'Green Valley', 'Rice').",
      selfState: { id: "#0x1A2B", name: "(unassigned)", crop: "(unassigned)" },
    },
    {
      stepNumber: 2,
      label: "Execute self.name = name",
      lineHighlight: "self.name = name",
      explanation:
        "Assigns 'Green Valley' to the instance variable self.name on object #0x1A2B.",
      selfState: { id: "#0x1A2B", name: "Green Valley", crop: "(unassigned)" },
    },
    {
      stepNumber: 3,
      label: "Execute self.crop = crop",
      lineHighlight: "self.crop = crop",
      explanation:
        "Assigns 'Rice' to the instance variable self.crop on object #0x1A2B.",
      selfState: { id: "#0x1A2B", name: "Green Valley", crop: "Rice" },
    },
    {
      stepNumber: 4,
      label: "Return object reference",
      lineHighlight: "farm1 ready",
      explanation:
        "Initialization complete! Variable farm1 now points to fully initialized Farm object #0x1A2B.",
      selfState: { id: "#0x1A2B", name: "Green Valley", crop: "Rice" },
    },
  ],

  // ── Memory Visualization ───────────────────────────────────────────────────
  memoryVisualization: {
    title: "Objects in Memory with State",
    body: "Unlike Lesson 5.1 where objects were empty, now each object box in the heap holds its own key-value pairs assigned during constructor execution.",
    objects: [
      {
        instanceName: "farm1",
        className: "Farm",
        address: "#0x1A2B",
        attributes: [
          { key: "name", value: '"Green Valley"' },
          { key: "crop", value: '"Rice"' },
          { key: "temperature", value: "31.5" },
        ],
      },
      {
        instanceName: "farm2",
        className: "Farm",
        address: "#0x3C4D",
        attributes: [
          { key: "name", value: '"Sunrise Farm"' },
          { key: "crop", value: '"Wheat"' },
          { key: "temperature", value: "28.0" },
        ],
      },
    ],
  },

  // ── Agritech Example ───────────────────────────────────────────────────────
  agritechExample: {
    title: "Smart Farm Sensors with Unique Identities",
    body: "Every sensor on the farm has a unique ID, location, and initial reading. Using a constructor ensures no sensor can be created without these critical parameters.",
    code: `class Sensor:
    def __init__(self, sensor_id, location, reading):
        self.sensor_id = sensor_id
        self.location = location
        self.reading = reading
        self.status = "Active"  # Default value!

temp_sensor = Sensor("T-101", "Field A", 31.4)
soil_sensor = Sensor("M-202", "Greenhouse B", 45.0)

print(f"[{temp_sensor.sensor_id}] {temp_sensor.location}: {temp_sensor.reading}°C ({temp_sensor.status})")
print(f"[{soil_sensor.sensor_id}] {soil_sensor.location}: {soil_sensor.reading}% ({soil_sensor.status})")`,
    discussion:
      "Notice how self.status = 'Active' sets a default value without requiring a parameter during creation. Constructors can initialize both passed arguments and default attributes!",
  },

  // ── Debug Challenges ───────────────────────────────────────────────────────
  debugChallenges: [
    {
      title: "Missing self in __init__ Signature",
      prompt: "This class definition crashes when Farm('Green Valley') is executed. Why?",
      code: `class Farm:
    def __init__(name):  # Oops!
        self.name = name

farm = Farm("Green Valley")`,
      mistakesToFind: 1,
      solution: `class Farm:
    def __init__(self, name):  # Correct! self must be 1st parameter
        self.name = name

farm = Farm("Green Valley")`,
      hiddenGuidance:
        "Python passes the instance as the 1st parameter automatically. If you write def __init__(name), Python passes the object as 'name' and gets confused when you pass 'Green Valley' as a 2nd argument!",
    },
    {
      title: "Local Variable instead of Instance Variable",
      prompt: "print(farm.name) causes an AttributeError: 'Farm' object has no attribute 'name'. Why?",
      code: `class Farm:
    def __init__(self, name):
        name = name  # Missing self.!

farm = Farm("Green Valley")
print(farm.name)`,
      mistakesToFind: 1,
      solution: `class Farm:
    def __init__(self, name):
        self.name = name  # self. creates the instance variable!

farm = Farm("Green Valley")
print(farm.name)`,
      hiddenGuidance:
        "Writing name = name creates a local variable named 'name' inside __init__() that vanishes when __init__() finishes. You MUST use self.name = name to save it on the object.",
    },
    {
      title: "Typo in Dunder Init",
      prompt: "The print statement in __init__ never runs when farm = Farm() is called. What is wrong?",
      code: `class Farm:
    def _init_(self):  # Single underscore!
        print("Farm created!")

farm = Farm()`,
      mistakesToFind: 1,
      solution: `class Farm:
    def __init__(self):  # DOUBLE underscores on both sides!
        print("Farm created!")

farm = Farm()`,
      hiddenGuidance:
        "Python constructors require DOUBLE underscores on both sides: __init__. A single underscore _init_ defines a normal method that is never run automatically.",
    },
  ],

  // ── Engineer Thinking ──────────────────────────────────────────────────────
  engineerThinkingPrompt:
    "Suppose a junior developer proposes making all constructor parameters optional by assigning default values (e.g. name='Unnamed', crop='Unknown'). When is this a good practice in software engineering, and when could it lead to dangerous 'partially initialized' objects in an Agritech monitoring system?",

  // ── Object Evolution State ─────────────────────────────────────────────────
  objectEvolutionState: {
    lessonNumber: "5.2",
    title: "Our Farm class — Lesson 5.2 (Constructors & Identity)",
    code: `class Farm:
    def __init__(self, name, crop, temperature=25.0):
        self.name = name
        self.crop = crop
        self.temperature = temperature
        self.sensors = []  # Ready for future sensor objects!

# Every Farm now starts with real, independent data!
farm1 = Farm("Green Valley", "Rice", 31.5)
farm2 = Farm("Sunrise Farm", "Wheat", 28.0)`,
    note: "Our Farm class now has identity and attributes! In Lesson 5.3, we will add instance methods and class-level tracking.",
  },
};
