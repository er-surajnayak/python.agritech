import { oopWhyOopDevelopmentPack } from "@/content/development-packs/lesson-5-1";
import type { LessonDocument } from "@/types/content";

export const moduleFiveLessons: LessonDocument[] = [
  {
    id: "module-5-lesson-1",
    moduleId: "module-5",
    number: "5.1",
    title: "Why Object-Oriented Programming? | Classes & Objects",
    summary:
      "Experience the scaling limits of procedural programming through the growing Smart Farm system, then discover how OOP solves those limits by introducing Classes as blueprints and Objects as independent real-world instances.",
    durationMinutes: 165,
    level: "Beginner",
    introduction: {
      title: "The moment procedural code runs out of runway",
      body: "You have written variables, functions, and collections. They work beautifully for small problems. Now the Smart Farm project is growing — thousands of farms, sensors, and readings. This lesson shows exactly where procedural programming breaks down, and introduces the programming paradigm that professional developers use to build systems that scale.",
    },
    objectives: [
      "Understand the limitations of procedural programming at scale",
      "Explain why Object-Oriented Programming (OOP) was invented",
      "Define the concepts of Class and Object",
      "Differentiate between a Class and an Object",
      "Create simple Python classes using the class keyword",
      "Create multiple independent objects from the same class",
      "Relate OOP concepts to real Agritech systems",
    ],
    whyThisMatters: {
      title: "OOP is the language of professional Python",
      body: "Every Django model, every FastAPI schema, every PyTorch neural network layer, every pandas DataFrame — all of these are objects. Understanding Classes and Objects is the prerequisite for every professional Python framework and every data science library you will encounter.",
      items: [
        "Django models are classes — every database row is an object",
        "scikit-learn models are objects — fit() and predict() are methods",
        "pandas DataFrame is an object — df.head() is a method call",
        "Every FastAPI request schema is a Pydantic class",
      ],
    },
    industryMotivation: {
      title: "Industry systems model the real world as objects",
      body: "From IoT sensor networks to enterprise farm management platforms, every real system models its domain as objects. Sensors, farms, weather stations, drones, and irrigation systems are all classes in production code. When you understand OOP, you can read, extend, and contribute to any professional Python codebase.",
      signal:
        "OOP is foundational to Django, Flask, FastAPI, PyTorch, scikit-learn, and every major Python framework.",
    },
    concept: {
      title: "Classes are blueprints; Objects are instances",
      body: "A Class is a template that defines what data an entity holds and what actions it can perform. An Object is a concrete instance created from that template. One class can create thousands of independent objects — each with its own data, each capable of the same actions.",
      items: [
        "Class = blueprint",
        "Object = real instance from the blueprint",
        "One class, unlimited objects",
        "Each object is independent",
        "Objects bundle data + behaviour together",
      ],
    },
    workflow: {
      title: "From procedural chaos to object-oriented clarity",
      description:
        "Follow how the Smart Farm moves from thousands of variables to a clean object-based design.",
      steps: [
        {
          title: "Identify the problem",
          description:
            "20 variables per farm × 1,000 farms = 20,000 variables. Procedural code collapses.",
        },
        {
          title: "Recognize the entity",
          description:
            "A Farm is a real thing. It has data (name, crop, temperature) and behaviour (display, irrigate, report).",
        },
        {
          title: "Write the blueprint",
          description: "Define class Farm: — the template for all farm objects.",
        },
        {
          title: "Create instances",
          description:
            "farm1 = Farm(), farm2 = Farm() — each is a separate object in memory.",
        },
        {
          title: "Scale freely",
          description:
            "1,000 farms? Create 1,000 objects. The class definition stays the same.",
        },
      ],
    },
    agritechExample: {
      title: "Three sensor objects from one Sensor blueprint",
      body: "A single Sensor class can represent a temperature sensor, a moisture sensor, and a humidity sensor — all independent, all from the same blueprint. As the Smart Farm grows, each sensor object will hold its own ID, location, and reading without conflicting with any other.",
    },
    playground: {
      title: "Create Your First Farm and Sensor Objects",
      description:
        "Define the Farm and Sensor classes, create multiple objects, and inspect their types. Watch the Object Panel update as each object is created.",
      starterCode: `# Step 1: Define the Farm class (blueprint)
class Farm:
    pass

# Step 2: Create Farm objects (instances)
green_valley = Farm()
sunrise_farm = Farm()
agritech_hub = Farm()

# Step 3: Inspect them
print("Type:", type(green_valley))
print("Same object?", green_valley is sunrise_farm)
print("Total farms created: 3")

# Step 4: Define the Sensor class
class Sensor:
    pass

# Step 5: Create Sensor objects
temperature_sensor = Sensor()
moisture_sensor    = Sensor()
humidity_sensor    = Sensor()

print("\\nSensor type:", type(temperature_sensor))
print("All sensors independent:", temperature_sensor is moisture_sensor is False)`,
      expectedOutcome:
        "Type: <class '__main__.Farm'>, same object: False, sensor type: <class '__main__.Sensor'>. The Object Panel shows 6 objects created from 2 classes.",
    },
    practice: [
      {
        level: "Easy",
        title: "Create a Crop class",
        prompt:
          "Define a class called Crop using the class keyword. Create two Crop objects: rice and wheat. Print the type of each object.",
        guidance:
          "Use class Crop: pass to define the blueprint. Use Crop() to create each instance.",
      },
      {
        level: "Medium",
        title: "WeatherStation objects",
        prompt:
          "Define a class called WeatherStation. Instantiate three objects: station_a, station_b, and station_c. Print their types and verify that station_a is not station_b.",
        guidance:
          "Create each object by calling WeatherStation(). Use the is operator to check if two variables point to the same object.",
      },
      {
        level: "Challenge",
        title: "Farm Ecosystem — three classes, six objects",
        prompt:
          "Define three classes: Farm, Sensor, and Farmer. Create two objects from each class. Print every object's type. Then write a short explanation (as comments) of why farm1 is farm2 returns False.",
        guidance:
          "Each call to ClassName() creates a completely new, independent object. The is operator checks identity (same memory location), not equality.",
      },
    ],
    quiz: [
      {
        title: "Class definition",
        question: "What is a Class in Python?",
        options: [
          "A function that returns a value",
          "A blueprint for creating objects",
          "A list of variables",
          "A loop structure",
        ],
        correctOptionIndex: 1,
        note: "A Class defines the structure and behaviour of a category of objects.",
        explanation:
          "A Class is a template or blueprint. It defines what data an object holds and what actions it can perform. Objects are instances created from that blueprint.",
      },
      {
        title: "Object definition",
        question: "What is an Object in Python?",
        options: [
          "A variable that holds a number",
          "A type of loop",
          "A concrete instance created from a class",
          "A Python module",
        ],
        correctOptionIndex: 2,
        note: "An Object is a real, independent instance that lives in memory.",
        explanation:
          "An Object is created from a Class using ClassName(). It exists in memory, holds data, and can perform actions defined by its Class.",
      },
      {
        title: "Creating a class",
        question: "Which keyword creates a class in Python?",
        options: ["object", "create", "class", "new"],
        correctOptionIndex: 2,
        note: "Python uses the class keyword — just as it uses def for functions.",
        explanation:
          "The class keyword followed by the class name and a colon defines a new class: class Farm: — just like def creates a function.",
      },
      {
        title: "Object independence",
        question:
          "What does farm1 is farm2 return when both are created with Farm()?",
        options: ["True", "False", "None", "TypeError"],
        correctOptionIndex: 1,
        note: "Each Farm() call creates a completely new, separate object.",
        explanation:
          "The is operator checks identity — whether two variables point to the same object in memory. Two separate Farm() calls create two separate objects, so farm1 is farm2 returns False.",
      },
    ],
    assignment: {
      title: "Smart Farm OOP Design — First Blueprint",
      brief:
        "Apply what you have learned by designing and documenting the first three classes of the Smart Farm Management System. No data or methods yet — just the class blueprints and object instances that prove the pattern works.",
      deliverables: [
        "Define class Farm, class Sensor, and class Farmer using class keyword + pass",
        "Create two objects from each class (6 objects total)",
        "Print the type of each object to confirm class membership",
        "Use the is operator to verify that all pairs of objects are independent",
        "Write 5 comment lines explaining: what a class is, what an object is, why farm1 is farm2 returns False, why OOP scales better than variables, and what __main__.Farm means in the type output",
        "Include a short explanation of how OOP will help manage 1,000 farms more cleanly than individual variables",
      ],
    },
    summarySection: {
      title: "OOP foundation established",
      body: "You identified exactly where procedural programming breaks down, understood why OOP was invented, and learned to model the Smart Farm using Classes and Objects. You created independent object instances, inspected their types, and verified their independence.",
      items: [
        "Procedural code collapses when variables multiply beyond maintenance",
        "A Class is a blueprint — written once, reused infinitely",
        "An Object is a real instance — it exists in memory, holds data, acts",
        "Farm() called twice creates two independent, separate objects",
        "OOP unifies data and behaviour inside one self-contained unit",
        "Every Python professional framework uses Classes and Objects",
      ],
    },
    keyTakeaways: [
      "Procedural programming fails when 1 entity needs 20+ variables and 1,000 entities are needed",
      "OOP bundles data and behaviour into a single self-contained Object",
      "A Class is the blueprint; an Object is the instance created from it",
      "class Farm: defines the blueprint; farm1 = Farm() creates the object",
      "Every Farm() call creates a new, independent object in memory",
      "farm1 is farm2 returns False — they are different objects despite sharing the same blueprint",
      "OOP is the foundation of every major Python framework: Django, Flask, FastAPI, PyTorch",
    ],
    whatsNext: {
      title: "Lesson 5.2 · Constructors and Instance Variables",
      body: "Our Farm class is a blueprint but it holds no data yet. In Lesson 5.2 we use __init__ — the constructor — to give every Farm object its own name, crop, temperature, and sensor list the moment it is created. You will also meet self — the reference that makes each object aware of its own data.",
    },
    developmentPack: oopWhyOopDevelopmentPack,
  },
];

export const moduleFiveLessonSummaries = [
  {
    id: "module-5-lesson-1",
    moduleId: "module-5",
    order: 1,
    title: "5.1 Why OOP? | Classes & Objects",
    estimatedMinutes: 165,
    status: "in-progress" as const,
    isPlaceholder: false,
  },
  {
    id: "module-5-lesson-2",
    moduleId: "module-5",
    order: 2,
    title: "5.2 Constructors & Instance Variables",
    estimatedMinutes: 150,
    status: "not-started" as const,
    isPlaceholder: true,
  },
  {
    id: "module-5-lesson-3",
    moduleId: "module-5",
    order: 3,
    title: "5.3 Managing Multiple Farm Records",
    estimatedMinutes: 150,
    status: "not-started" as const,
    isPlaceholder: true,
  },
  {
    id: "module-5-lesson-4",
    moduleId: "module-5",
    order: 4,
    title: "5.4 Encapsulation & Data Protection",
    estimatedMinutes: 150,
    status: "not-started" as const,
    isPlaceholder: true,
  },
  {
    id: "module-5-lesson-5",
    moduleId: "module-5",
    order: 5,
    title: "5.5 Inheritance — Different Types of Sensors",
    estimatedMinutes: 150,
    status: "not-started" as const,
    isPlaceholder: true,
  },
  {
    id: "module-5-lesson-6",
    moduleId: "module-5",
    order: 6,
    title: "5.6 Polymorphism — Different Sensor Behaviours",
    estimatedMinutes: 150,
    status: "not-started" as const,
    isPlaceholder: true,
  },
  {
    id: "module-5-lesson-7",
    moduleId: "module-5",
    order: 7,
    title: "5.7 Abstraction — The Common Sensor Blueprint",
    estimatedMinutes: 150,
    status: "not-started" as const,
    isPlaceholder: true,
  },
  {
    id: "module-5-lesson-8",
    moduleId: "module-5",
    order: 8,
    title: "5.8 Magic Methods & Readable Reports",
    estimatedMinutes: 150,
    status: "not-started" as const,
    isPlaceholder: true,
  },
  {
    id: "module-5-lesson-9",
    moduleId: "module-5",
    order: 9,
    title: "5.9 Composition — Farm HAS-A Weather Station",
    estimatedMinutes: 150,
    status: "not-started" as const,
    isPlaceholder: true,
  },
  {
    id: "module-5-lesson-10",
    moduleId: "module-5",
    order: 10,
    title: "5.10 Smart Farm Management System Capstone",
    estimatedMinutes: 240,
    status: "not-started" as const,
    isPlaceholder: true,
  },
];
