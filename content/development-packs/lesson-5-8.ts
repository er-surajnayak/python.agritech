import type { OopMagicMethodsDevelopmentPack } from "@/types/content";

export const oopMagicMethodsDevelopmentPack: OopMagicMethodsDevelopmentPack = {
  kind: "oop-lesson-5-8",
  prerequisite: "Lesson 5.7 · Abstraction: The Common Sensor Blueprint",
  storyHook:
    "Our Smart Farm objects now have inheritance, polymorphic behaviour, and abstract contracts. Yet printing a Sensor still exposes an unreadable memory-style representation, and familiar Python operations do not know what our domain objects mean.",
  objectProblem: {
    title: "Python does not yet know how a Sensor should look",
    body: "The object contains meaningful farm data, but print(sensor) cannot invent a farmer-friendly representation. We need to teach the class how familiar Python operations should behave.",
    code: `class Sensor:
    def __init__(self, sensor_id, location):
        self.sensor_id = sensor_id
        self.location = location

sensor = Sensor(101, "Field A")
print(sensor)`,
    defaultOutput: "<__main__.Sensor object at 0x...>",
    desiredOutput: "Sensor 101 - Field A",
  },
  definition: {
    title: "Magic methods connect custom objects to Python operations",
    body: "Magic methods are special methods whose names begin and end with double underscores. Python invokes them automatically for operations such as object initialization, printing, length, equality, and ordering.",
    items: ["They are also called dunder methods", "Python invokes them in response to familiar syntax", "They let domain objects behave naturally", "Each method has a precise return-value contract"],
    wordParts: [{ part: "Double", meaning: "Two underscores before and after" }, { part: "Under", meaning: "Underscore" }],
    examples: ["__init__()", "__str__()", "__len__()", "__eq__()", "__lt__()"],
  },
  automaticInvocation: {
    title: "Why do they feel like magic?",
    body: "The programmer writes normal Python syntax. Python looks for the corresponding special method, calls the class's implementation, and uses its result.",
    steps: [
      { title: "Write a familiar operation", description: "For example, print(sensor) or len(farm)." },
      { title: "Python resolves the hook", description: "Python looks for __str__() or __len__() on the object." },
      { title: "Your class supplies behaviour", description: "The special method returns the domain-specific result." },
      { title: "Python completes the operation", description: "Readable sensor text or a sensor count appears naturally." },
    ],
  },
  methods: [
    {
      id: "init", name: "__init__()", operation: "Sensor(101, 'Field A')", title: "Initialize an already-created object",
      body: "__init__() does not create the object itself. Python creates the instance first, then calls __init__() to initialize its state.",
      implementation: `def __init__(self, sensor_id, location):
    self.sensor_id = sensor_id
    self.location = location`, output: "sensor_id = 101, location = 'Field A'", rule: "Initialize required instance state; do not return the object.",
    },
    {
      id: "str", name: "__str__()", operation: "print(sensor)", title: "Make Sensor objects readable",
      body: "print() asks the object for a human-readable string. __str__() should return that string rather than printing it itself.",
      implementation: `def __str__(self):
    return f"Sensor {self.sensor_id} - {self.location}"`, output: "Sensor 101 - Field A", rule: "__str__() must return a string.",
    },
    {
      id: "len", name: "__len__()", operation: "len(farm)", title: "Define what length means for a Farm",
      body: "A Farm can define its length as the number of registered sensors, making len(farm) a concise domain operation.",
      implementation: `def __len__(self):
    return len(self.sensors)`, output: "3", rule: "__len__() must return a non-negative integer.",
    },
    {
      id: "eq", name: "__eq__()", operation: "sensor1 == sensor2", title: "Define meaningful Sensor equality",
      body: "Two separate Python objects can represent the same physical sensor. __eq__() can compare their sensor IDs instead of their memory identities.",
      implementation: `def __eq__(self, other):
    return self.sensor_id == other.sensor_id`, output: "True when both sensor IDs match", rule: "Return a Boolean comparison result; use ==, not assignment =.",
    },
    {
      id: "lt", name: "__lt__()", operation: "sensor1 < sensor2", title: "Order sensors by battery level",
      body: "__lt__() defines the less-than relationship. Here a Sensor is considered smaller when its battery percentage is lower.",
      implementation: `def __lt__(self, other):
    return self.battery < other.battery`, output: "True when sensor1 has less battery", rule: "Compare one consistent domain attribute and return a Boolean.",
    },
  ],
  referenceMethods: [
    { operation: "obj1 > obj2", method: "__gt__()", purpose: "Greater-than comparison" },
    { operation: "obj1 + obj2", method: "__add__()", purpose: "Custom addition" },
    { operation: "obj()", method: "__call__()", purpose: "Make an instance callable" },
  ],
  completeExample: {
    title: "Complete readable and comparable Sensor",
    body: "One Sensor class now initializes its state, prints clearly, compares physical identity by sensor_id, and orders objects by battery level.",
    code: `class Sensor:
    def __init__(self, sensor_id, battery):
        self.sensor_id = sensor_id
        self.battery = battery

    def __str__(self):
        return f"Sensor {self.sensor_id} | Battery: {self.battery}%"

    def __eq__(self, other):
        return self.sensor_id == other.sensor_id

    def __lt__(self, other):
        return self.battery < other.battery

sensor1 = Sensor(101, 40)
sensor2 = Sensor(102, 80)

print(sensor1)
print(sensor1 == sensor2)
print(sensor1 < sensor2)`,
    output: "Sensor 101 | Battery: 40%\nFalse\nTrue",
  },
  agritechComparison: [
    { utility: "display_sensor(sensor)", natural: "print(sensor)", benefit: "Readable output through __str__()" },
    { utility: "count_sensors(farm)", natural: "len(farm)", benefit: "Domain length through __len__()" },
    { utility: "same_sensor(a, b)", natural: "a == b", benefit: "Meaningful equality through __eq__()" },
    { utility: "lower_battery(a, b)", natural: "a < b", benefit: "Natural ordering through __lt__()" },
  ],
  debugChallenges: [
    {
      title: "__str__() prints instead of returning", prompt: "Why does print(sensor) raise TypeError after displaying Sensor once?",
      code: `def __str__(self):
    print("Sensor")`, mistakesToFind: 1,
      solution: `def __str__(self):
    return "Sensor"`, hiddenGuidance: "Python expects __str__() to hand a string back to print().",
    },
    {
      title: "__len__() returns the wrong type", prompt: "Why does len(farm) reject the string '5'?",
      code: `def __len__(self):
    return "5"`, mistakesToFind: 1,
      solution: `def __len__(self):
    return 5`, hiddenGuidance: "Length is a numeric protocol. Return a non-negative integer.",
    },
    {
      title: "Assignment inside __eq__()", prompt: "Why is this invalid Python, and which operator performs comparison?",
      code: `def __eq__(self, other):
    return self.sensor_id = other.sensor_id`, mistakesToFind: 1,
      solution: `def __eq__(self, other):
    return self.sensor_id == other.sensor_id`, hiddenGuidance: "A single equals sign assigns; a double equals sign compares.",
    },
    {
      title: "Missing other parameter", prompt: "Why can't Python pass the right-hand Sensor into this equality method?",
      code: `def __eq__(self):
    return self.sensor_id == other.sensor_id`, mistakesToFind: 1,
      solution: `def __eq__(self, other):
    return self.sensor_id == other.sensor_id`, hiddenGuidance: "Binary operations need access to both operands: self and other.",
    },
  ],
  engineerThinkingPrompt:
    "A dashboard repeatedly displays sensors, counts farm devices, checks duplicate IDs, and sorts low-battery sensors. Which behaviours belong naturally on the domain objects through Python protocols, and where would an explicit service function still be clearer?",
};
