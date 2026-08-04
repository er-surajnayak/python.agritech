import { oopWhyOopDevelopmentPack } from "@/content/development-packs/lesson-5-1";
import { oopConstructorsDevelopmentPack } from "@/content/development-packs/lesson-5-2";
import { oopMethodsAndClassVarsDevelopmentPack } from "@/content/development-packs/lesson-5-3";
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
  {
    id: "module-5-lesson-2",
    moduleId: "module-5",
    number: "5.2",
    title: "Constructors (__init__) & self",
    summary:
      "Understand why empty objects are insufficient, master __init__() for automatic object initialization, demystify the self keyword, and create Farm and Sensor objects that carry their own independent state.",
    durationMinutes: 165,
    level: "Beginner",
    introduction: {
      title: "Giving every object its own identity",
      body: "In Lesson 5.1, we created Farm objects, but they were empty. Green Valley Farm and Sunrise Farm looked identical. This lesson teaches constructors (__init__) and the self keyword — the mechanisms Python uses to configure every new object with its own unique data the moment it is born.",
    },
    objectives: [
      "Understand why constructors are needed for reliable object creation",
      "Explain the exact role and execution flow of __init__()",
      "Demystify the self parameter using real-world analogies",
      "Create objects configured with distinct instance variables",
      "Differentiate between local variables and instance variables (self.attribute)",
      "Visualize object initialization and state in memory",
    ],
    whyThisMatters: {
      title: "Constructors guarantee valid objects in production",
      body: "In production software, creating an uninitialized object leads to crashes and NullPointer/AttributeError bugs. Constructors guarantee that every object starts life fully configured with all required fields — like a database record or REST API resource.",
      items: [
        "Django models use __init__ to set field defaults",
        "FastAPI Pydantic schemas validate field values during initialization",
        "scikit-learn models configure hyperparameters in __init__()",
        "Smart Farm sensors set sensor_id and default status in __init__()",
      ],
    },
    industryMotivation: {
      title: "The factory setup script for every Python object",
      body: "Whether initializing a PyTorch model, a database connection pool, or an IoT sensor node, constructors are the universal gateway for setting initial state. Every professional Python class relies on __init__.",
      signal:
        "__init__() is used in 100% of non-trivial Python classes in production.",
    },
    concept: {
      title: "__init__() sets up the object; self refers to IT",
      body: "When you call Farm('Green Valley', 'Rice'), Python creates a blank object, passes it as self to __init__(), and assigns self.name = 'Green Valley' and self.crop = 'Rice'. The instance variables live on THAT specific object in memory.",
      items: [
        "__init__() runs automatically on creation",
        "self is passed automatically by Python — don't pass it yourself",
        "self.name creates an instance variable on THAT object",
        "Without self., a variable inside __init__ vanishes when __init__ finishes",
        "Default parameter values (e.g. status='Active') simplify initialization",
      ],
    },
    workflow: {
      title: "The 4-step constructor execution flow",
      description: "Trace what happens when farm = Farm('Green Valley', 'Rice') runs.",
      steps: [
        {
          title: "Memory allocation",
          description: "Python allocates a blank memory box for the new Farm object.",
        },
        {
          title: "Pass to __init__",
          description: "Python passes the new object as self, along with 'Green Valley' and 'Rice'.",
        },
        {
          title: "Attach instance variables",
          description: "self.name = name and self.crop = crop write data onto the memory box.",
        },
        {
          title: "Return object reference",
          description: "The fully initialized object reference is assigned to variable farm.",
        },
      ],
    },
    agritechExample: {
      title: "Smart Farm Sensors with Unique Identities",
      body: "Every sensor on the farm has a unique ID, location, and initial reading. Using a constructor ensures no sensor can be created without these critical parameters.",
    },
    playground: {
      title: "Initialize Farm and Sensor Objects with __init__",
      description:
        "Modify the constructor arguments, create multiple Farm and Sensor instances, and inspect their instance variables.",
      starterCode: `# Step 1: Define Farm class with __init__
class Farm:
    def __init__(self, name, crop, temperature):
        self.name = name
        self.crop = crop
        self.temperature = temperature
        print(f"⚡ Initialized farm: {self.name}")

# Step 2: Create initialized farm objects
green_valley = Farm("Green Valley", "Rice", 31.5)
sunrise_farm = Farm("Sunrise Farm", "Wheat", 28.0)

# Step 3: Access instance variables using dot notation
print("\\n--- Farm Summary ---")
print(f"Farm 1: {green_valley.name} | Crop: {green_valley.crop} | Temp: {green_valley.temperature}°C")
print(f"Farm 2: {sunrise_farm.name} | Crop: {sunrise_farm.crop} | Temp: {sunrise_farm.temperature}°C")

# Step 4: Define Sensor class with default status
class Sensor:
    def __init__(self, sensor_id, location, reading):
        self.sensor_id = sensor_id
        self.location = location
        self.reading = reading
        self.status = "Active"  # Default value

temp_sensor = Sensor("T-101", "Field A", 31.4)
soil_sensor = Sensor("M-202", "Greenhouse B", 45.0)

print(f"\\nSensor [{temp_sensor.sensor_id}] at {temp_sensor.location}: {temp_sensor.reading}°C ({temp_sensor.status})")`,
      expectedOutcome:
        "Prints initialization messages for both farms, then displays farm summaries and sensor details. The Object Panel displays instance variables for all 4 objects.",
    },
    practice: [
      {
        level: "Easy",
        title: "Crop class constructor",
        prompt:
          "Create a Crop class whose __init__ takes crop_name and growth_days. Create two Crop objects ('Rice', 120) and ('Wheat', 90) and print their attributes.",
        guidance:
          "Use def __init__(self, crop_name, growth_days): and assign self.crop_name = crop_name.",
      },
      {
        level: "Medium",
        title: "Farmer profile class",
        prompt:
          "Create a Farmer class storing name, village, and acres_managed. Include a default status='Active'. Instantiate three farmers and print a summary line for each.",
        guidance:
          "Add status='Active' inside __init__ (self.status = 'Active') so it doesn't need to be passed as an argument.",
      },
      {
        level: "Challenge",
        title: "WeatherStation registration system",
        prompt:
          "Create a WeatherStation class with station_id, temperature, and humidity. Create two station objects. Print both. Then modify station1's temperature directly (station1.temperature = 34.0) and verify station2 remains unchanged.",
        guidance:
          "This proves that changing an attribute on station1 mutates only station1's memory box.",
      },
    ],
    quiz: [
      {
        title: "Constructor method name",
        question: "Which method is called automatically when an object is created?",
        options: ["__start__()", "__init__()", "__create__()", "__setup__()"],
        correctOptionIndex: 1,
        note: "__init__() is Python's standard constructor method.",
        explanation:
          "__init__() (double underscores before and after) is automatically invoked when ClassName() is called.",
      },
      {
        title: "The self parameter",
        question: "What does self refer to inside a class method?",
        options: [
          "The Python interpreter",
          "The Class blueprint",
          "The current object instance being created or accessed",
          "The global scope",
        ],
        correctOptionIndex: 2,
        note: "self refers to THAT specific object instance.",
        explanation:
          "self is a reference to the specific object instance currently executing the method.",
      },
      {
        title: "Instance variable syntax",
        question: "Which line correctly creates an instance variable attached to the object?",
        options: [
          "name = name",
          "self.name = name",
          "object.name = name",
          "var name = name",
        ],
        correctOptionIndex: 1,
        note: "self. establishes an attribute on the instance.",
        explanation:
          "Writing self.name = name attaches the value to the object as an instance variable. Writing name = name creates a local variable that vanishes.",
      },
      {
        title: "Passing arguments",
        question: "If def __init__(self, name, crop): takes 3 parameters in code, how many arguments do you pass when calling Farm(...)?",
        options: [
          "3 (self, name, crop)",
          "2 (name, crop)",
          "1 (name)",
          "0",
        ],
        correctOptionIndex: 1,
        note: "Python passes self automatically behind the scenes.",
        explanation:
          "You pass only 2 arguments (name, crop). Python supplies the new object instance as self automatically.",
      },
    ],
    assignment: {
      title: "Smart Farm Domain Setup — Constructors & Identity",
      brief:
        "Implement constructors for the three core Smart Farm classes: Farm, Sensor, and Farmer. Ensure each class accepts required parameters, sets sensible defaults, and provides formatted summaries.",
      deliverables: [
        "Implement class Farm: __init__(self, name, crop, temperature, humidity=65.0)",
        "Implement class Sensor: __init__(self, sensor_id, location, reading, sensor_type='Temperature')",
        "Implement class Farmer: __init__(self, farmer_id, name, location, experience_years)",
        "Instantiate 2 Farm objects, 3 Sensor objects, and 2 Farmer objects with realistic agritech data",
        "Print formatted multi-line summaries for each object using dot notation (e.g. farm1.name)",
        "Mutate one attribute on farm1 (e.g. farm1.temperature = 33.0) and print both farms to demonstrate independent state",
        "Write 5 lines of comments explaining: why constructors are needed, what self represents, why self.attribute is required, how default arguments work, and why changing farm1 does not affect farm2",
      ],
    },
    summarySection: {
      title: "Constructors and self mastered",
      body: "You moved from empty objects to fully initialized entities with unique identity and state. You mastered __init__(), demystified self, learned to create instance variables, and verified that every object maintains its own data in memory.",
      items: [
        "__init__() runs automatically on object creation to initialize state",
        "self represents the current object instance (like 'YOUR' paper in school)",
        "self.attribute creates an instance variable that persists on the object",
        "Without self., variables are local and vanish when __init__() finishes",
        "Python passes self automatically — you pass only the remaining arguments",
        "Constructors ensure objects are never born in an invalid or empty state",
      ],
    },
    keyTakeaways: [
      "__init__() is Python's constructor — it runs automatically when an object is instantiated",
      "self refers to the current object instance being initialized or accessed",
      "self.name = name creates an instance variable attached to THAT object",
      "Every object created from a class gets its own independent set of instance variables",
      "Python automatically passes the object as self — you pass only the extra parameters",
      "Constructors can set both passed arguments and default values (e.g. self.status = 'Active')",
    ],
    whatsNext: {
      title: "Lesson 5.3 · Instance Methods, Class Variables & Class Methods",
      body: "Now that objects carry their own data, they need to perform actions! In Lesson 5.3 we add instance methods like display_info() and update_temperature(). We will also introduce class variables (like total_farms) to track data across all farms, and class methods (@classmethod) to operate on the blueprint itself.",
    },
    developmentPack: oopConstructorsDevelopmentPack,
  },
  {
    id: "module-5-lesson-3",
    moduleId: "module-5",
    number: "5.3",
    title: "Instance Methods, Class Variables & Class Methods",
    summary:
      "Teach Smart Farm objects how to perform actions with instance methods, track shared data across all objects using class variables, and implement class-wide operations with @classmethod.",
    durationMinutes: 180,
    level: "Beginner",
    introduction: {
      title: "Making Smart Farm Objects Intelligent",
      body: "In Lesson 5.2, our Farm objects gained identity and data. Now it is time to give them intelligence! This lesson teaches instance methods (actions an object performs), class variables (shared counters across all objects), and class methods (@classmethod) to operate on the blueprint itself.",
    },
    objectives: [
      "Understand and define instance methods that operate on object state",
      "Differentiate between instance variables and shared class variables",
      "Understand and implement class methods using @classmethod and cls",
      "Explain the memory layout differences between instance and class variables",
      "Know when to use instance methods vs class methods",
      "Build intelligent, self-reporting Smart Farm objects",
    ],
    whyThisMatters: {
      title: "Object behaviour and shared state drive real applications",
      body: "Methods and shared state are what turn simple data containers into active software components. In production systems, instance methods process business logic on specific records, while class variables and methods manage shared registry state, counters, and factory methods.",
      items: [
        "Django models use instance methods like save() and delete()",
        "scikit-learn models use fit() and predict() as instance methods",
        "Pydantic and SQLAlchemy use @classmethod for custom factory creators",
        "Smart Farm IoT registries track total connected sensors with class variables",
      ],
    },
    industryMotivation: {
      title: "The foundation of object behaviour and fleet tracking",
      body: "Whether managing an active IoT fleet or an e-commerce order system, software needs both individual object actions and shared system-level tracking. Combining instance methods with class methods provides clean, professional architecture.",
      signal:
        "Instance methods, class variables, and @classmethod are core patterns across Django, FastAPI, PyTorch, and SQLAlchemy.",
    },
    concept: {
      title: "Instance methods use self; Class methods use cls",
      body: "Instance methods receive self and operate on THAT object's data (self.name). Class variables (Farm.total_farms) belong to the Class blueprint and are shared by all instances. Class methods receive cls and operate on the Class itself (@classmethod).",
      items: [
        "Instance method: def display_info(self) — accesses self.name",
        "Class variable: total_farms = 0 — shared across all instances",
        "Class method: @classmethod def show_total(cls) — accesses cls.total_farms",
        "Instance variables are unique per object; Class variables are stored once",
        "Call instance methods on objects (farm1.display_info()); call class methods on the Class (Farm.show_total())",
      ],
    },
    workflow: {
      title: "Connecting instance behaviour and class-level tracking",
      description: "Trace how instance operations and class-level tracking work together.",
      steps: [
        {
          title: "Instantiate object",
          description: "Farm('Green Valley', 'Rice', 31.5) increments Farm.total_farms by 1.",
        },
        {
          title: "Invoke instance method",
          description: "farm1.display_info() passes farm1 as self to format and print its own data.",
        },
        {
          title: "Update instance state",
          description: "farm1.update_temperature(33.0) mutates self.temperature for farm1 only.",
        },
        {
          title: "Invoke class method",
          description: "Farm.show_total_farms() uses cls.total_farms to report network-wide statistics.",
        },
      ],
    },
    agritechExample: {
      title: "IoT Sensor Fleet — Telemetry & Network Health",
      body: "Every sensor instance tracks its own battery level and telemetry reading. At the fleet level, a class variable total_sensors tracks active network scale, and a @classmethod provides network health audits.",
    },
    playground: {
      title: "Practice Instance Methods, Class Variables & Class Methods",
      description:
        "Run the code to create farms, call instance methods, observe the class variable counter, and execute the class method.",
      starterCode: `class Farm:
    total_farms = 0  # Class variable: shared counter

    def __init__(self, name, crop, temperature):
        self.name = name
        self.crop = crop
        self.temperature = temperature
        Farm.total_farms += 1  # Increment shared counter

    # Instance Method 1: Display farm report
    def display_info(self):
        print(f"🌾 [{self.name}] Crop: {self.crop} | Temp: {self.temperature}°C")

    # Instance Method 2: Update temperature
    def update_temperature(self, new_temp):
        print(f"🌡 Updating {self.name} temp: {self.temperature}°C -> {new_temp}°C")
        self.temperature = new_temp

    # Class Method: Report total farms across system
    @classmethod
    def show_total_farms(cls):
        print(f"🏢 System Overview: {cls.total_farms} farms registered online.")

# Create farm instances
farm1 = Farm("Green Valley", "Rice", 31.5)
farm2 = Farm("Sunrise Farm", "Wheat", 28.0)

# Call instance methods
print("--- Instance Methods ---")
farm1.display_info()
farm2.display_info()

# Update temperature on farm1
farm1.update_temperature(33.0)
farm1.display_info()

# Call class method on the Class
print("\\n--- Class Method ---")
Farm.show_total_farms()`,
      expectedOutcome:
        "Prints instance details for farm1 and farm2, demonstrates temperature mutation on farm1, and outputs 'System Overview: 2 farms registered online.' from the class method.",
    },
    practice: [
      {
        level: "Easy",
        title: "Crop growth tracking method",
        prompt:
          "Create a Crop class with __init__(self, crop_name, days=0). Add an instance method grow(self, days) that adds days to self.days and prints an update message. Test it with 'Rice'.",
        guidance:
          "In grow(self, days), write self.days += days and print the updated days.",
      },
      {
        level: "Medium",
        title: "WeatherStation fleet counter",
        prompt:
          "Create a WeatherStation class with station_id and temperature. Add a class variable total_stations = 0. Add a @classmethod get_station_count(cls) returning total stations. Create 3 stations and test the class method.",
        guidance:
          "Increment WeatherStation.total_stations += 1 inside __init__. Decorate get_station_count with @classmethod.",
      },
      {
        level: "Challenge",
        title: "Drone fleet management system",
        prompt:
          "Create a Drone class with drone_id and battery. Add class variable active_drones = 0 and max_fleet_size = 10. Add instance method fly(self, mins) that reduces battery by 1% per min. Add class method fleet_capacity(cls) that prints remaining capacity (max_fleet_size - active_drones). Create 3 drones and test both methods.",
        guidance:
          "Combine instance variable mutation (self.battery -= mins) with class method calculation (cls.max_fleet_size - cls.active_drones).",
      },
    ],
    quiz: [
      {
        title: "Instance method parameter",
        question: "What parameter must every instance method receive as its first argument?",
        options: ["cls", "self", "this", "object"],
        correctOptionIndex: 1,
        note: "self represents the calling instance.",
        explanation:
          "Instance methods always take self as their first parameter so they can access THAT object's instance variables.",
      },
      {
        title: "Class variable ownership",
        question: "Where is a class variable stored in Python?",
        options: [
          "In every individual object box in memory",
          "Once on the Class blueprint itself, shared by all instances",
          "In global module variables",
          "Inside local method scope",
        ],
        correctOptionIndex: 1,
        note: "Class variables belong to the Class object and are shared.",
        explanation:
          "Class variables are defined inside the class body but outside methods. They are stored once on the Class object and shared by all instances.",
      },
      {
        title: "Class method decorator",
        question: "Which decorator is required to define a class method in Python?",
        options: ["@staticmethod", "@classmethod", "@instancemethod", "@property"],
        correctOptionIndex: 1,
        note: "@classmethod tells Python to pass the Class as cls.",
        explanation:
          "@classmethod informs Python that the method operates on the Class itself and automatically passes cls as the first argument.",
      },
      {
        title: "Modifying class variables inside __init__",
        question: "How should you correctly increment a class variable total_farms inside __init__?",
        options: [
          "self.total_farms += 1",
          "Farm.total_farms += 1",
          "total_farms = total_farms + 1",
          "var.total_farms += 1",
        ],
        correctOptionIndex: 1,
        note: "Use Farm.total_farms to update the shared class variable.",
        explanation:
          "Writing self.total_farms += 1 creates a new instance variable on self. To update the shared class variable, use Farm.total_farms += 1.",
      },
    ],
    assignment: {
      title: "Smart Farm Fleet Management — Methods & Class Counters",
      brief:
        "Build a fleet management module for the Smart Farm incorporating instance methods, class variables, and class methods across Farm and Sensor classes.",
      deliverables: [
        "Extend class Farm: include total_farms class variable, __init__, display_info(), update_temperature(new_temp), and @classmethod show_total_farms(cls)",
        "Implement class Sensor: include total_sensors class variable, __init__(sensor_id, type, battery=100), read_data(value), recharge(), and @classmethod show_fleet_status(cls)",
        "Instantiate 3 Farm objects and 4 Sensor objects with realistic agritech telemetry",
        "Call display_info() on all farms and read_data() on all sensors",
        "Execute update_temperature() on farm1 and recharge() on sensor1, demonstrating state mutation",
        "Call Farm.show_total_farms() and Sensor.show_fleet_status() to verify class-wide counting",
        "Write 6 comment lines comparing: instance variables vs class variables, instance methods vs class methods, self vs cls, and memory efficiency when storing shared metrics",
      ],
    },
    summarySection: {
      title: "Methods and Class Variables mastered",
      body: "You taught Smart Farm objects how to perform actions, mastered instance methods, learned to share class-wide counters with class variables, and implemented class methods using @classmethod and cls.",
      items: [
        "Instance methods operate on individual objects using self",
        "Instance variables (self.attribute) store object-specific data",
        "Class variables (Farm.total_farms) are defined on the class body and shared by all instances",
        "@classmethod defines methods bound to the Class that receive cls as their first argument",
        "Class methods are called directly on the Class (Farm.show_total_farms())",
        "Combining instance behaviour with class tracking provides a complete object-oriented foundation",
      ],
    },
    keyTakeaways: [
      "Instance methods take self and operate on specific object instances",
      "Class variables are defined on the class body and shared across all instances",
      "Class methods use @classmethod, take cls, and operate on class-level data",
      "Use Farm.total_farms += 1 (not self.total_farms) to update a shared counter",
      "Instance variables store unique state; Class variables store shared state",
      "Class methods can be called on the class directly without creating an object instance",
    ],
    whatsNext: {
      title: "Lesson 5.4 · Encapsulation & Data Protection",
      body: "Now that our objects can perform actions and update state, we need to protect their data! What prevents a user from setting farm.temperature = -999°C? In Lesson 5.4 we learn Encapsulation — using private attributes (_temperature), getter/setter methods, and Python's @property decorator to enforce validation rules.",
    },
    developmentPack: oopMethodsAndClassVarsDevelopmentPack,
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
    estimatedMinutes: 165,
    status: "in-progress" as const,
    isPlaceholder: false,
  },
  {
    id: "module-5-lesson-3",
    moduleId: "module-5",
    order: 3,
    title: "5.3 Managing Multiple Farm Records",
    estimatedMinutes: 180,
    status: "in-progress" as const,
    isPlaceholder: false,
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
