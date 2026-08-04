import type { OopMethodsAndClassVarsDevelopmentPack } from "@/types/content";

export const oopMethodsAndClassVarsDevelopmentPack: OopMethodsAndClassVarsDevelopmentPack = {
  kind: "oop-lesson-5-3",
  prerequisite: "Lesson 5.2 · Constructors (__init__) & self",
  storyHook:
    "Our Farm objects now carry individual data like name, crop, and temperature. But currently, whenever management asks for a farm report or total farm count, we have to write repetitive print statements manually. In this lesson, we teach our objects how to perform actions with instance methods, share class-level counters with class variables, and execute class-wide operations with class methods.",

  // ── Why Objects Need Behaviour ─────────────────────────────────────────────
  whyObjectsNeedBehaviour: {
    title: "Why Do Objects Need Behaviour?",
    body: "Real-world entities do not just hold static values — they perform actions! A farm displays reports, updates telemetry, and triggers irrigation. In OOP, an object combines state (instance variables) with behaviour (methods) in a single self-contained unit.",
    proceduralVsOop: {
      procedural: `# Procedural: Data and functions are separate
def print_farm_report(name, crop, temp):
    print(f"Farm: {name} | Crop: {crop} | Temp: {temp}°C")

print_farm_report(farm1_name, farm1_crop, farm1_temp)`,
      oop: `# OOP: Object carries its own report behaviour
farm1 = Farm("Green Valley", "Rice", 31.5)
farm1.display_info()  # Object prints its own data!`,
    },
  },

  // ── Instance Methods ───────────────────────────────────────────────────────
  instanceMethods: {
    title: "Instance Methods — Actions for Individual Objects",
    definition:
      "An instance method is a function defined inside a class that accepts self as its first parameter. It can access and modify the specific object's instance variables.",
    syntax: `class Farm:
    def display_info(self):
        print(f"Farm: {self.name} | Crop: {self.crop}")`,
    code: `class Farm:
    def __init__(self, name, crop, temperature):
        self.name = name
        self.crop = crop
        self.temperature = temperature

    def display_info(self):
        print(f"🌾 [{self.name}] Crop: {self.crop} | Temp: {self.temperature}°C")

    def update_temperature(self, new_temp):
        print(f"🌡 Updating {self.name} temp: {self.temperature}°C -> {new_temp}°C")
        self.temperature = new_temp

farm1 = Farm("Green Valley", "Rice", 31.5)
farm2 = Farm("Sunrise Farm", "Wheat", 28.0)

farm1.display_info()
farm2.display_info()

farm1.update_temperature(33.0)
farm1.display_info()`,
    output: `🌾 [Green Valley] Crop: Rice | Temp: 31.5°C
🌾 [Sunrise Farm] Crop: Wheat | Temp: 28.0°C
🌡 Updating Green Valley temp: 31.5°C -> 33.0°C
🌾 [Green Valley] Crop: Rice | Temp: 33.0°C`,
    explanation:
      "Calling farm1.display_info() passes farm1 as self. Calling farm2.display_info() passes farm2 as self. Same method code — operating on completely different object data!",
  },

  // ── Class Variables ────────────────────────────────────────────────────────
  classVariables: {
    title: "Class Variables — Shared Across All Instances",
    definition:
      "A class variable is defined inside the class body (outside any method). It belongs to the Class itself and is shared by every instance created from that blueprint.",
    problemTitle: "The Next Problem: Tracking Total Registered Farms",
    problemBody:
      "How do we know how many farms have been created across the entire system? Storing farm1.total_farms or farm2.total_farms on individual objects would duplicate data. The total count belongs to the Farm class as a whole!",
    code: `class Farm:
    total_farms = 0  # Class variable — shared by ALL farms

    def __init__(self, name, crop):
        self.name = name
        self.crop = crop
        Farm.total_farms += 1  # Increment shared counter on creation

farm1 = Farm("Green Valley", "Rice")
print("Total farms after 1st creation:", Farm.total_farms)

farm2 = Farm("Sunrise Farm", "Wheat")
print("Total farms after 2nd creation:", Farm.total_farms)

farm3 = Farm("AgriTech Hub", "Corn")
print("Total farms after 3rd creation:", Farm.total_farms)`,
    output: `Total farms after 1st creation: 1
Total farms after 2nd creation: 2
Total farms after 3rd creation: 3`,
  },

  // ── Comparison Table ───────────────────────────────────────────────────────
  comparisonTable: [
    {
      feature: "Scope & Ownership",
      instanceVar: "Belongs to an individual object instance",
      classVar: "Belongs to the Class blueprint itself",
    },
    {
      feature: "Storage in Memory",
      instanceVar: "Stored separately in each object's heap box",
      classVar: "Stored once on the Class object",
    },
    {
      feature: "Access Syntax",
      instanceVar: "self.name (inside) / farm1.name (outside)",
      classVar: "Farm.total_farms or cls.total_farms",
    },
    {
      feature: "Value Identity",
      instanceVar: "Unique for every instance ('Rice', 'Wheat')",
      classVar: "Shared identical value across all instances (3)",
    },
    {
      feature: "Typical Use Cases",
      instanceVar: "Object attributes (name, temperature, battery)",
      classVar: "Global counters, constants, company names",
    },
  ],

  // ── Class Methods ──────────────────────────────────────────────────────────
  classMethods: {
    title: "Class Methods — Operations on the Blueprint",
    definition:
      "A class method is bound to the Class rather than an object instance. It is decorated with @classmethod and receives cls (the Class object) as its first parameter instead of self.",
    decorator: "@classmethod",
    clsExplanation:
      "cls refers to the Farm class itself (just as self refers to the current farm instance).",
    code: `class Farm:
    total_farms = 0
    company_name = "Smart Farm Global"

    def __init__(self, name, crop):
        self.name = name
        self.crop = crop
        Farm.total_farms += 1

    @classmethod
    def get_total_farms(cls):
        return f"📊 Total registered farms in {cls.company_name}: {cls.total_farms}"

farm1 = Farm("Green Valley", "Rice")
farm2 = Farm("Sunrise Farm", "Wheat")

# Call class method directly on the class!
print(Farm.get_total_farms())`,
    output: "📊 Total registered farms in Smart Farm Global: 2",
  },

  // ── Complete Example ───────────────────────────────────────────────────────
  completeExample: {
    title: "Putting Everything Together — Unified Farm Class",
    body: "Our Farm class now combines instance variables (self.name, self.crop), instance methods (display_info(), update_temperature()), class variables (total_farms), and class methods (get_total_farms()).",
    code: `class Farm:
    total_farms = 0

    def __init__(self, name, crop, temperature):
        self.name = name
        self.crop = crop
        self.temperature = temperature
        Farm.total_farms += 1

    def display_info(self):
        print(f"🌾 [{self.name}] Crop: {self.crop} | Temp: {self.temperature}°C")

    def update_temperature(self, new_temp):
        self.temperature = new_temp

    @classmethod
    def show_total_farms(cls):
        print(f"🏢 System Overview: {cls.total_farms} farms online.")

# Create farms
farm1 = Farm("Green Valley", "Rice", 31.5)
farm2 = Farm("Sunrise Farm", "Wheat", 28.0)

# Instance method calls
farm1.display_info()
farm2.display_info()

# Class method call
Farm.show_total_farms()`,
    output: `🌾 [Green Valley] Crop: Rice | Temp: 31.5°C
🌾 [Sunrise Farm] Crop: Wheat | Temp: 28.0°C
🏢 System Overview: 2 farms online.`,
  },

  // ── Agritech Example ───────────────────────────────────────────────────────
  agritechExample: {
    title: "IoT Sensor Fleet — Instance vs Class Tracking",
    body: "In an IoT sensor network, every sensor instance tracks its own battery level and telemetry reading. At the fleet level, a class variable total_sensors tracks active network scale, and a @classmethod provides network health audits.",
    code: `class Sensor:
    total_sensors = 0

    def __init__(self, sensor_id, sensor_type, battery=100):
        self.sensor_id = sensor_id
        self.sensor_type = sensor_type
        self.battery = battery
        Sensor.total_sensors += 1

    def read_data(self, value):
        print(f"📡 Sensor {self.sensor_id} ({self.sensor_type}) broadcast: {value} [Battery: {self.battery}%]")

    @classmethod
    def get_fleet_status(cls):
        return f"🌐 Active IoT Fleet Scale: {cls.total_sensors} connected sensors."

s1 = Sensor("T-101", "Temperature", 92)
s2 = Sensor("M-202", "Moisture", 87)

s1.read_data(31.4)
s2.read_data(45.0)

print(Sensor.get_fleet_status())`,
    discussion:
      "Each sensor instance runs read_data() independently with its own battery percentage, while Sensor.get_fleet_status() provides an aggregated view of the entire fleet without needing a specific sensor instance.",
  },

  // ── Debug Challenges ───────────────────────────────────────────────────────
  debugChallenges: [
    {
      title: "Missing self Parameter in Instance Method",
      prompt: "Calling farm1.display_info() causes a TypeError: display_info() takes 0 positional arguments but 1 was given. Why?",
      code: `class Farm:
    def __init__(self, name):
        self.name = name

    def display_info():  # Missing self!
        print(name)

farm1 = Farm("Green Valley")
farm1.display_info()`,
      mistakesToFind: 1,
      solution: `class Farm:
    def __init__(self, name):
        self.name = name

    def display_info(self):  # Must take self!
        print(self.name)     # Access attribute via self.name

farm1 = Farm("Green Valley")
farm1.display_info()`,
      hiddenGuidance:
        "When you call farm1.display_info(), Python passes farm1 as the first argument automatically. The method MUST accept self as its first parameter.",
    },
    {
      title: "Accidental Instance Override of Class Variable",
      prompt: "Why did Farm.total_farms stay at 1 even after creating farm2?",
      code: `class Farm:
    total_farms = 0

    def __init__(self, name):
        self.name = name
        self.total_farms += 1  # Created an instance attribute instead of updating class var!

farm1 = Farm("Green Valley")
farm2 = Farm("Sunrise Farm")
print(Farm.total_farms)`,
      mistakesToFind: 1,
      solution: `class Farm:
    total_farms = 0

    def __init__(self, name):
        self.name = name
        Farm.total_farms += 1  # Explicitly modify class variable on Farm!

farm1 = Farm("Green Valley")
farm2 = Farm("Sunrise Farm")
print(Farm.total_farms)`,
      hiddenGuidance:
        "Writing self.total_farms += 1 creates a NEW instance variable on self. To update the shared class variable, use Farm.total_farms += 1 or type(self).total_farms += 1.",
    },
    {
      title: "Missing @classmethod Decorator",
      prompt: "Calling Farm.show_total() raises a TypeError: show_total() missing 1 required positional argument: 'cls'. Why?",
      code: `class Farm:
    total_farms = 0

    def show_total(cls):  # Missing @classmethod!
        print(cls.total_farms)

Farm.show_total()`,
      mistakesToFind: 1,
      solution: `class Farm:
    total_farms = 0

    @classmethod  # Decorator tells Python this is a class method!
    def show_total(cls):
        print(cls.total_farms)

Farm.show_total()`,
      hiddenGuidance:
        "Without @classmethod, Python treats show_total(cls) as a regular instance method. You must add @classmethod so Python automatically passes the Class as cls when called on the Class.",
    },
  ],

  // ── Engineer Thinking ──────────────────────────────────────────────────────
  engineerThinkingPrompt:
    "Suppose an enterprise Smart Farm platform manages 100,000 sensors. A developer asks: 'Should the company name and server API endpoint URL be stored as instance variables in every Sensor object, or as class variables on the Sensor class?' Explain the memory, efficiency, and maintenance implications of this design decision.",

  // ── Object Evolution State ─────────────────────────────────────────────────
  objectEvolutionState: {
    lessonNumber: "5.3",
    title: "Our Farm class — Lesson 5.3 (Methods & Class Variables)",
    code: `class Farm:
    total_farms = 0  # Class variable: shared counter

    def __init__(self, name, crop, temperature=25.0):
        self.name = name
        self.crop = crop
        self.temperature = temperature
        self.sensors = []
        Farm.total_farms += 1

    def display_info(self):  # Instance method
        print(f"🌾 [{self.name}] Crop: {self.crop} | Temp: {self.temperature}°C")

    def update_temperature(self, new_temp):  # Instance method
        self.temperature = new_temp

    @classmethod
    def show_total_farms(cls):  # Class method
        print(f"🏢 System Total: {cls.total_farms} registered farms online.")`,
    note: "Our Farm class now has methods, state updates, and class-level tracking! In Lesson 5.4, we will add encapsulation to protect temperature from invalid values like -999°C.",
  },
};
