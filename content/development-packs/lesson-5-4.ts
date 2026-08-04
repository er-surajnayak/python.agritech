import type { OopEncapsulationDevelopmentPack } from "@/types/content";

export const oopEncapsulationDevelopmentPack: OopEncapsulationDevelopmentPack = {
  kind: "oop-lesson-5-4",
  prerequisite: "Lesson 5.3 · Instance Methods, Class Variables & Class Methods",
  storyHook:
    "Our Smart Farm software is now live across hundreds of farms. But yesterday, a major incident occurred: a new developer accidentally wrote farm.temperature = 999.0 and sensor.battery = -500. The automated irrigation system triggered dangerously, and dashboard meters broke. In this lesson, we learn Encapsulation — the art of bundling data with methods while protecting attributes from invalid direct modifications.",

  // ── Security Problem ───────────────────────────────────────────────────────
  securityProblem: {
    title: "The Security Risk of Direct Attribute Access",
    body: "When object attributes are completely public, any script or team member can modify them directly without validation. This creates corrupted object states, breaks system invariants, and leads to dangerous failures in production.",
    corruptCode: `# Corrupting object state via direct access
farm.temperature = 999.0     # Extreme invalid temperature!
sensor.battery = -500        # Negative battery percentage!
farm.crop = ""               # Empty invalid crop string!`,
    consequences: [
      "Irrigation systems trigger unnecessarily due to bogus 999°C temperature readings",
      "Telemetry dashboards crash when parsing -500% battery percentages",
      "Database sync fails when mandatory fields like crop are wiped to empty strings",
      "No centralized place to put validation rules or audit logs",
    ],
  },

  // ── What is Encapsulation ──────────────────────────────────────────────────
  whatIsEncapsulation: {
    title: "What is Encapsulation?",
    definition:
      "Encapsulation is the OOP principle of bundling data (attributes) and methods (behaviours) together inside a class while restricting direct access to internal components.",
    phoneAnalogy: {
      title: "The Smartphone Analogy",
      body: "Think of your smartphone. You use public buttons and touch screens to interact with it. You cannot directly solder wires on the motherboard to change the battery voltage. The phone encapsulates its complex internal hardware and exposes a safe, controlled interface. Objects should work the exact same way!",
    },
  },

  // ── Access Modifiers ───────────────────────────────────────────────────────
  accessModifiers: {
    public: {
      title: "Public Members (default)",
      syntax: "self.name",
      description: "Accessible from anywhere — both inside the class and from external code.",
      code: `class Farm:
    def __init__(self, name):
        self.name = name  # Public attribute

farm = Farm("Green Valley")
print(farm.name)  # Freely accessible from outside`,
    },
    protected: {
      title: "Protected Members (convention)",
      syntax: "self._location",
      description: "Prefix with a single underscore (_). Indicates that external code should NOT modify it directly, though Python still technical allows it. It is a developer convention.",
      code: `class Farm:
    def __init__(self, location):
        self._location = location  # Protected by convention

farm = Farm("Field A")
print(farm._location)  # Python allows it, but convention says "don't do this!"`,
    },
    private: {
      title: "Private Members (name mangling)",
      syntax: "self.__temperature",
      description: "Prefix with double underscores (__). Python performs name mangling (_ClassName__attribute) to prevent accidental direct external access.",
      code: `class Farm:
    def __init__(self, temperature):
        self.__temperature = temperature  # Private attribute

farm = Farm(31.5)
# print(farm.__temperature)  # Raises AttributeError!
# Must access via getter method!`,
    },
  },

  // ── Python Philosophy Note ─────────────────────────────────────────────────
  pythonPhilosophyNote: {
    title: "Python Encapsulation Philosophy",
    body: "Unlike languages like Java or C++ that strictly block private access at compile time, Python uses name mangling (_Farm__temperature) to prevent accidental overwrites rather than enforce absolute secrecy.",
    quote: "We are all consenting adults here. Python trusts developers to respect underscores (_protected and __private) while giving them control when needed.",
  },

  // ── Getters and Setters ────────────────────────────────────────────────────
  gettersAndSetters: {
    title: "Controlled Access with Getters & Setters",
    getterDefinition:
      "A Getter method (get_attribute()) retrieves the value of a private attribute safely.",
    setterDefinition:
      "A Setter method (set_attribute(value)) validates the new value BEFORE applying it to the private attribute.",
    validationCode: `class Farm:
    def __init__(self, name, temperature):
        self.name = name
        self.__temperature = temperature  # Private!

    # Getter: Safely retrieve private temperature
    def get_temperature(self):
        return self.__temperature

    # Setter: Validate temperature before setting!
    def set_temperature(self, value):
        if -10.0 <= value <= 60.0:
            print(f"✅ Updating temperature for {self.name}: {value}°C")
            self.__temperature = value
        else:
            print(f"❌ INVALID TEMPERATURE: {value}°C! Rejected (must be -10.0°C to 60.0°C).")

farm = Farm("Green Valley", 31.5)

# Safe reading
print("Current temp:", farm.get_temperature())

# Safe valid update
farm.set_temperature(35.0)
print("Updated temp:", farm.get_temperature())

# Rejected invalid update!
farm.set_temperature(999.0)  # Rejected!
print("Temp after invalid attempt:", farm.get_temperature())  # Still 35.0!`,
    validationOutput: `Current temp: 31.5
✅ Updating temperature for Green Valley: 35.0°C
Updated temp: 35.0
❌ INVALID TEMPERATURE: 999.0°C! Rejected (must be -10.0°C to 60.0°C).
Temp after invalid attempt: 35.0`,
  },

  // ── Comparison Table ───────────────────────────────────────────────────────
  comparisonTable: [
    {
      feature: "Syntax Pattern",
      publicCol: "self.name",
      protectedCol: "self._location",
      privateCol: "self.__temperature",
    },
    {
      feature: "External Visibility",
      publicCol: "Freely accessible everywhere",
      protectedCol: "Accessible, but convention warns against it",
      privateCol: "Name mangled (_Class__attr); raises AttributeError",
    },
    {
      feature: "Access Mechanism",
      publicCol: "Direct access (farm.name)",
      protectedCol: "Direct access (use inside class/subclasses)",
      privateCol: "Getter & Setter methods (get_temp / set_temp)",
    },
    {
      feature: "Data Protection Level",
      publicCol: "No protection (open)",
      protectedCol: "Contractual protection (convention)",
      privateCol: "Enforced structural protection (mangled)",
    },
  ],

  // ── Complete Example ───────────────────────────────────────────────────────
  completeExample: {
    title: "Complete Encapsulated Sensor Class",
    body: "Here is a complete Sensor class protecting its battery percentage and telemetry reading using getters and setters with validation rules.",
    code: `class Sensor:
    def __init__(self, sensor_id, battery):
        self.sensor_id = sensor_id     # Public
        self.__battery = 0             # Private
        self.set_battery(battery)      # Validate initial battery!

    def get_battery(self):
        return self.__battery

    def set_battery(self, value):
        if 0 <= value <= 100:
            self.__battery = value
        else:
            print(f"⚠ [{self.sensor_id}] Invalid battery value {value}%. Set rejected.")

sensor = Sensor("T-101", 95)
print(f"Sensor {sensor.sensor_id} battery: {sensor.get_battery()}%")

sensor.set_battery(80)   # Valid update
sensor.set_battery(-50)  # Rejected!
print(f"Final battery: {sensor.get_battery()}%")`,
    output: `Sensor T-101 battery: 95%
⚠ [T-101] Invalid battery value -50%. Set rejected.
Final battery: 80%`,
  },

  // ── Agritech Example ───────────────────────────────────────────────────────
  agritechExample: {
    title: "IrrigationController — Water Level Safeguards",
    body: "An automated irrigation reservoir controller encapsulates its water level. Refilling and dispensing must pass through validated methods so water levels never drop below 0 or overflow reservoir capacity.",
    code: `class IrrigationController:
    def __init__(self, capacity_litres):
        self.capacity = capacity_litres
        self.__water_level = 0  # Private

    def get_water_level(self):
        return self.__water_level

    def refill(self, litres):
        if litres <= 0:
            print("⚠ Refill amount must be positive.")
            return
        if self.__water_level + litres > self.capacity:
            print(f"⚠ Overflow risk! Reservoir capacity is {self.capacity}L.")
            return
        self.__water_level += litres
        print(f"💧 Refilled {litres}L. Current water level: {self.__water_level}L.")

    def dispense(self, litres):
        if litres <= 0 or litres > self.__water_level:
            print("⚠ Insufficient water level for irrigation.")
            return
        self.__water_level -= litres
        print(f"🌱 Dispensed {litres}L for crops. Remaining water: {self.__water_level}L.")

controller = IrrigationController(1000)
controller.refill(600)
controller.dispense(200)
controller.refill(800)  # Overflow warning!`,
    discussion:
      "Because __water_level is private, no external code can set controller.__water_level = -5000. All changes pass through refill() and dispense(), enforcing physical reservoir bounds.",
  },

  // ── Debug Challenges ───────────────────────────────────────────────────────
  debugChallenges: [
    {
      title: "AttributeError on Private Attribute Access",
      prompt: "print(farm.__temperature) causes AttributeError: 'Farm' object has no attribute '__temperature'. Why?",
      code: `class Farm:
    def __init__(self, temp):
        self.__temperature = temp

farm = Farm(31.5)
print(farm.__temperature)  # Crashes!`,
      mistakesToFind: 1,
      solution: `class Farm:
    def __init__(self, temp):
        self.__temperature = temp

    def get_temperature(self):  # Define getter!
        return self.__temperature

farm = Farm(31.5)
print(farm.get_temperature())  # Access via getter!`,
      hiddenGuidance:
        "Double underscores (__temperature) trigger name mangling. External code cannot read __temperature directly — you must provide a getter method like get_temperature().",
    },
    {
      title: "Setter Fails to Assign to Private Attribute",
      prompt: "Calling farm.set_temp(35) runs without error, but get_temp() still returns 31.5. Why?",
      code: `class Farm:
    def __init__(self, temp):
        self.__temperature = temp

    def get_temperature(self):
        return self.__temperature

    def set_temperature(self, temp):
        temp = temp  # Oops! Missing self.__ !

farm = Farm(31.5)
farm.set_temperature(35.0)
print(farm.get_temperature())`,
      mistakesToFind: 1,
      solution: `class Farm:
    def __init__(self, temp):
        self.__temperature = temp

    def get_temperature(self):
        return self.__temperature

    def set_temperature(self, temp):
        if -10.0 <= temp <= 60.0:
            self.__temperature = temp  # Correct: assign to self.__temperature!

farm = Farm(31.5)
farm.set_temperature(35.0)
print(farm.get_temperature())`,
      hiddenGuidance:
        "Writing temp = temp creates a local variable named temp inside set_temperature(). You MUST assign to self.__temperature = temp to update the private instance variable.",
    },
    {
      title: "Direct Assignment Bypasses Validation",
      prompt: "A developer wrote sensor._battery = -50 and corrupted the object state. Why did this happen?",
      code: `class Sensor:
    def __init__(self, battery):
        self._battery = battery  # Single underscore protected, NOT private!

sensor = Sensor(90)
sensor._battery = -50  # Bypassed validation!`,
      mistakesToFind: 1,
      solution: `class Sensor:
    def __init__(self, battery):
        self.__battery = battery  # Double underscore private!

    def get_battery(self):
        return self.__battery

    def set_battery(self, val):
        if 0 <= val <= 100:
            self.__battery = val

sensor = Sensor(90)
sensor.set_battery(-50)  # Properly rejected by setter validation!`,
      hiddenGuidance:
        "A single underscore (_battery) is only a visual convention — Python allows direct mutation. To trigger name mangling and enforce getter/setter usage, use double underscores (__battery).",
    },
  ],

  // ── Engineer Thinking ──────────────────────────────────────────────────────
  engineerThinkingPrompt:
    "In languages like Java, every attribute is made private by default with boilerplate getters and setters. In Python, developers often keep attributes public until validation is needed, then refactor using @property. Discuss the trade-offs between 'defensive default privacy' vs 'Pythonic pragmatic access'.",

  // ── Object Evolution State ─────────────────────────────────────────────────
  objectEvolutionState: {
    lessonNumber: "5.4",
    title: "Our Farm class — Lesson 5.4 (Encapsulation & Validation)",
    code: `class Farm:
    total_farms = 0

    def __init__(self, name, crop, temperature=25.0):
        self.name = name                 # Public
        self.crop = crop                 # Public
        self.__temperature = 0.0         # Private
        self.set_temperature(temperature)# Validated initialization
        self.sensors = []
        Farm.total_farms += 1

    def get_temperature(self):          # Getter
        return self.__temperature

    def set_temperature(self, value):    # Setter with validation
        if -10.0 <= value <= 60.0:
            self.__temperature = value
        else:
            print(f"⚠ Rejected invalid temperature: {value}°C")

    def display_info(self):
        print(f"🌾 [{self.name}] Crop: {self.crop} | Temp: {self.__temperature}°C")`,
    note: "Our Farm class now protects its temperature data from corruption! In Lesson 5.5, we will introduce Inheritance to create specific sensor types (TemperatureSensor, MoistureSensor) inheriting from a base Sensor class.",
  },
};
