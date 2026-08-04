import type { OopInheritanceDevelopmentPack } from "@/types/content";

export const oopInheritanceDevelopmentPack: OopInheritanceDevelopmentPack = {
  kind: "oop-lesson-5-5",
  prerequisite: "Lesson 5.4 · Encapsulation: Protecting Object Data",
  storyHook:
    "Our Smart Farm system now manufactures four specialized sensor types: TemperatureSensor, MoistureSensor, HumiditySensor, and RainfallSensor. At first, developers wrote four completely separate classes, duplicating id, battery, location, and status code 4 times. In this lesson, we learn Inheritance — creating a common parent Sensor class that child classes extend without duplicating code.",

  // ── Code Duplication Problem ───────────────────────────────────────────────
  duplicationProblem: {
    title: "The Code Duplication Crisis",
    body: "Without inheritance, every new sensor type requires re-writing id, battery, location, and display methods. When a bug in battery tracking is fixed, developers must update 4 separate files!",
    duplicatedCode: `# Four separate classes repeating identical sensor_id and battery code!
class TemperatureSensor:
    def __init__(self, sensor_id, battery, temp):
        self.sensor_id = sensor_id
        self.battery = battery
        self.temp = temp

class MoistureSensor:
    def __init__(self, sensor_id, battery, moisture):
        self.sensor_id = sensor_id
        self.battery = battery
        self.moisture = moisture

class HumiditySensor:
    def __init__(self, sensor_id, battery, humidity):
        self.sensor_id = sensor_id
        self.battery = battery
        self.humidity = humidity`,
    painPoints: [
      "Updating battery management requires editing 4 separate classes",
      "Bug fixes must be copied manually across all sensor codebases",
      "Adding a new sensor type requires 40+ lines of duplicate boilerplate code",
      "No unified baseline interface for Smart Farm sensor collections",
    ],
  },

  // ── Code Savings Counter Data ──────────────────────────────────────────────
  codeSavingsCounter: {
    withoutInheritanceLines: 160,
    withInheritanceLines: 62,
    savedPercentage: 61,
    explanation:
      "By creating a single base Sensor class (30 lines) and extending it into 4 child classes (8 lines each), we reduce total codebase size from 160 lines to 62 lines — a 61% reduction in maintenance burden!",
  },

  // ── Parent Class ───────────────────────────────────────────────────────────
  parentClass: {
    title: "The Parent (Base) Class",
    definition:
      "A Parent class (or Superclass / Base class) contains attributes and methods common to a family of related entities.",
    code: `class Sensor:
    def __init__(self, sensor_id, battery=100):
        self.sensor_id = sensor_id
        self.battery = battery

    def display(self):
        print(f"📡 [{self.sensor_id}] Battery: {self.battery}%")`,
  },

  // ── Child Class ────────────────────────────────────────────────────────────
  childClass: {
    title: "The Child (Subclass) Class",
    definition:
      "A Child class (or Subclass / Derived class) inherits all public and protected attributes and methods from its parent class using ClassName(ParentClass).",
    syntax: "class ChildClass(ParentClass):",
    code: `class TemperatureSensor(Sensor):
    pass  # Inherits __init__ and display() automatically!

# Instantiate child object using parent constructor!
temp_sensor = TemperatureSensor("T-101", 95)
temp_sensor.display()  # Inherited method call!`,
    output: "📡 [T-101] Battery: 95%",
  },

  // ── super() Function ───────────────────────────────────────────────────────
  superFunction: {
    title: "Extending Initialization with super()",
    definition:
      "super().__init__(args) delegates parent attribute initialization to the Parent constructor, allowing the child class to add its own specific attributes without re-writing parent logic.",
    code: `class Sensor:
    def __init__(self, sensor_id, battery=100):
        self.sensor_id = sensor_id
        self.battery = battery

class TemperatureSensor(Sensor):
    def __init__(self, sensor_id, battery, temperature):
        super().__init__(sensor_id, battery)  # Call parent constructor!
        self.temperature = temperature       # Add child attribute!

temp = TemperatureSensor("T-101", 95, 31.5)
print(f"[{temp.sensor_id}] Battery: {temp.battery}% | Temp: {temp.temperature}°C")`,
    explanation:
      "super().__init__(sensor_id, battery) runs the Sensor parent constructor first. Then self.temperature = temperature sets the child's unique property.",
  },

  // ── Method Overriding ──────────────────────────────────────────────────────
  methodOverriding: {
    title: "Customizing Behaviour with Method Overriding",
    definition:
      "Method Overriding occurs when a Child class redefines a method that already exists in its Parent class. When called, the child's implementation replaces the parent's default behaviour.",
    parentCode: `class Sensor:
    def display(self):
        print("📡 Generic Sensor Telemetry")`,
    childCode: `class TemperatureSensor(Sensor):
    def display(self):
        print(f"🌡 Temperature Sensor [{self.sensor_id}]: {self.temperature}°C")`,
    output: "🌡 Temperature Sensor [T-101]: 31.5°C",
  },

  // ── Types of Inheritance ───────────────────────────────────────────────────
  typesOfInheritance: [
    {
      name: "Single Inheritance",
      structure: "Parent ➔ Child",
      description: "One child class inherits from one parent class.",
      agritechExample: "Sensor ➔ TemperatureSensor",
    },
    {
      name: "Multilevel Inheritance",
      structure: "Grandparent ➔ Parent ➔ Child",
      description: "A child class inherits from a parent that is itself a child of another class.",
      agritechExample: "Sensor ➔ WirelessSensor ➔ TemperatureSensor",
    },
    {
      name: "Hierarchical Inheritance",
      structure: "Parent ➔ [ChildA, ChildB, ChildC]",
      description: "Multiple child classes inherit from a single parent class.",
      agritechExample: "Sensor ➔ TemperatureSensor, MoistureSensor, HumiditySensor",
    },
    {
      name: "Multiple Inheritance",
      structure: "[ParentA, ParentB] ➔ Child",
      description: "One child class inherits from multiple parent classes (use with care!).",
      agritechExample: "GPSReceiver + BatteryModule ➔ SmartDroneSensor",
    },
  ],

  // ── Complete Example ───────────────────────────────────────────────────────
  completeExample: {
    title: "Complete Sensor Hierarchy with super() and Overriding",
    body: "Here is our production-ready Sensor hierarchy powering the Smart Farm sensor network.",
    code: `class Sensor:
    def __init__(self, sensor_id, battery=100):
        self.sensor_id = sensor_id
        self.battery = battery

    def display(self):
        print(f"📡 [{self.sensor_id}] Battery: {self.battery}%")

class TemperatureSensor(Sensor):
    def __init__(self, sensor_id, battery, temperature):
        super().__init__(sensor_id, battery)
        self.temperature = temperature

    def display(self):  # Overridden!
        print(f"🌡 Temp Sensor [{self.sensor_id}] | Temp: {self.temperature}°C | Battery: {self.battery}%")

class MoistureSensor(Sensor):
    def __init__(self, sensor_id, battery, moisture):
        super().__init__(sensor_id, battery)
        self.moisture = moisture

    def display(self):  # Overridden!
        print(f"💧 Moisture Sensor [{self.sensor_id}] | Soil Moisture: {self.moisture}% | Battery: {self.battery}%")

t_sensor = TemperatureSensor("T-101", 95, 31.5)
m_sensor = MoistureSensor("M-202", 88, 42.0)

t_sensor.display()
m_sensor.display()`,
    output: `🌡 Temp Sensor [T-101] | Temp: 31.5°C | Battery: 95%
💧 Moisture Sensor [M-202] | Soil Moisture: 42.0% | Battery: 88%`,
  },

  // ── Agritech Example ───────────────────────────────────────────────────────
  agritechExample: {
    title: "Smart Farm Machine Hierarchy — Tractor extends Machine",
    body: "Inheritance applies across the entire Smart Farm ecosystem. Agricultural machinery shares machine_id and fuel_level, while specialized tractors add hitch_capacity and plow_status.",
    code: `class Machine:
    def __init__(self, machine_id, fuel_level):
        self.machine_id = machine_id
        self.fuel_level = fuel_level

    def status(self):
        print(f"🚜 Machine [{self.machine_id}] Fuel: {self.fuel_level}%")

class Tractor(Machine):
    def __init__(self, machine_id, fuel_level, model, hitch_capacity_kg):
        super().__init__(machine_id, fuel_level)
        self.model = model
        self.hitch_capacity_kg = hitch_capacity_kg

    def status(self):  # Overridden with tractor specs
        super().status()  # Reuses parent status print!
        print(f"   Model: {self.model} | Towing Capacity: {self.hitch_capacity_kg} kg")

tractor = Tractor("TR-500", 78, "Mahindra 575 DI", 1600)
tractor.status()`,
    discussion:
      "Notice how super().status() inside Tractor's status() calls the parent method first, then appends tractor-specific specs! Combining super() with overriding allows extending rather than destroying parent behaviour.",
  },

  // ── Debug Challenges ───────────────────────────────────────────────────────
  debugChallenges: [
    {
      title: "Missing super() Call in Child Constructor",
      prompt: "print(temp.sensor_id) causes AttributeError: 'TemperatureSensor' object has no attribute 'sensor_id'. Why?",
      code: `class Sensor:
    def __init__(self, sensor_id):
        self.sensor_id = sensor_id

class TemperatureSensor(Sensor):
    def __init__(self, sensor_id, temp):
        # Forgot super().__init__(sensor_id) !
        self.temp = temp

temp = TemperatureSensor("T-101", 31.5)
print(temp.sensor_id)`,
      mistakesToFind: 1,
      solution: `class Sensor:
    def __init__(self, sensor_id):
        self.sensor_id = sensor_id

class TemperatureSensor(Sensor):
    def __init__(self, sensor_id, temp):
        super().__init__(sensor_id)  # Call parent constructor!
        self.temp = temp

temp = TemperatureSensor("T-101", 31.5)
print(temp.sensor_id)`,
      hiddenGuidance:
        "If a child class defines its own __init__, it overrides the parent's __init__. You MUST call super().__init__(sensor_id) to execute the parent constructor and initialize self.sensor_id.",
    },
    {
      title: "Incorrect super() Syntax",
      prompt: "Python raises a TypeError: super() takes no keyword arguments or AttributeError. What is wrong with super(self).__init__()?",
      code: `class TemperatureSensor(Sensor):
    def __init__(self, sensor_id, temp):
        super(self).__init__(sensor_id)  # Incorrect arguments in super()!
        self.temp = temp`,
      mistakesToFind: 1,
      solution: `class TemperatureSensor(Sensor):
    def __init__(self, sensor_id, temp):
        super().__init__(sensor_id)  # Correct zero-argument super()!
        self.temp = temp`,
      hiddenGuidance:
        "In Python 3, super() takes NO arguments inside class methods: write super().__init__(sensor_id). Passing super(self) is invalid syntax.",
    },
    {
      title: "Parent Class Missing in Class Definition Header",
      prompt: "TemperatureSensor fails to inherit display() from Sensor. Why?",
      code: `class Sensor:
    def display(self):
        print("Sensor Telemetry")

class TemperatureSensor:  # Missing (Sensor)!
    pass

temp = TemperatureSensor()
temp.display()`,
      mistakesToFind: 1,
      solution: `class Sensor:
    def display(self):
        print("Sensor Telemetry")

class TemperatureSensor(Sensor):  # Add (Sensor) to inherit!
    pass

temp = TemperatureSensor()
temp.display()`,
      hiddenGuidance:
        "To establish an inheritance relationship, you MUST specify the parent class name in parentheses after the child class name: class TemperatureSensor(Sensor):.",
    },
  ],

  // ── Engineer Thinking ──────────────────────────────────────────────────────
  engineerThinkingPrompt:
    "Suppose an engineer creates a deep 6-level inheritance hierarchy: Device ➔ ElectronicDevice ➔ ConnectedDevice ➔ WirelessDevice ➔ FieldSensor ➔ TemperatureSensor. Discuss why deep inheritance trees create tight coupling and 'brittle base class' bugs, and why modern software architecture prefers shallow inheritance (1–2 levels max).",

  // ── Object Evolution State ─────────────────────────────────────────────────
  objectEvolutionState: {
    lessonNumber: "5.5",
    title: "Our Farm class — Lesson 5.5 (Inheritance Hierarchy)",
    code: `class FarmSensor:  # Parent base sensor class
    def __init__(self, sensor_id, battery=100):
        self.sensor_id = sensor_id
        self.battery = battery

    def read(self):
        return "Generic sensor telemetry"

class TemperatureSensor(FarmSensor):  # Child subclass
    def __init__(self, sensor_id, battery, temperature):
        super().__init__(sensor_id, battery)
        self.__temperature = temperature

    def read(self):  # Overridden method
        return f"🌡 {self.__temperature}°C"

# Farm class now accepts any FarmSensor subclass!
farm1 = Farm("Green Valley", "Rice", 31.5)
farm1.sensors.append(TemperatureSensor("T-101", 95, 31.5))`,
    note: "Our Smart Farm now uses an elegant inheritance hierarchy! In Lesson 5.6, we will use Polymorphism to iterate through all sensors and call read() uniformly.",
  },
};
