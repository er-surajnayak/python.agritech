import type { OopPolymorphismDevelopmentPack } from "@/types/content";

export const oopPolymorphismDevelopmentPack: OopPolymorphismDevelopmentPack = {
  kind: "oop-lesson-5-6",
  prerequisite: "Lesson 5.5 · Inheritance: Reusing Code Efficiently",
  storyHook:
    "Our Sensor hierarchy now contains temperature, soil-moisture, humidity, and rainfall sensors. The dashboard should not need four different commands. It should send read() to every sensor and let each object choose the correct response.",
  smartFarmProblem: {
    title: "One dashboard command, four sensor responses",
    body: "Every device measures something different, yet the controller wants one predictable interface: sensor.read(). The object receiving that call decides which implementation runs.",
    readings: [
      { className: "TemperatureSensor", output: "31°C" },
      { className: "MoistureSensor", output: "42%" },
      { className: "HumiditySensor", output: "68%" },
      { className: "RainfallSensor", output: "12 mm" },
    ],
  },
  meaning: {
    title: "Polymorphism means many forms",
    body: "The same method name can produce different behaviour depending on the object that receives the call. The interface stays stable while each class owns its implementation.",
    items: [
      "One common interface: read()",
      "Many object types: temperature, moisture, humidity, rainfall",
      "Different implementations and outputs",
      "The caller does not need type-specific instructions",
    ],
    wordParts: [
      { part: "Poly", meaning: "Many" },
      { part: "Morph", meaning: "Forms" },
    ],
  },
  analogy: {
    title: "The same Start command",
    body: "A farmer says Start to several machines. Each machine understands the shared command through its own behaviour.",
    devices: [
      { name: "Tractor", response: "Engine starts" },
      { name: "Irrigation Pump", response: "Water begins flowing" },
      { name: "Drone", response: "Propellers begin spinning" },
    ],
  },
  inheritanceExample: {
    title: "Polymorphism through inheritance and overriding",
    body: "Every child inherits from Sensor and overrides read(). Python dispatches the call to the most specific implementation on the actual object.",
    code: `class Sensor:
    def read(self):
        print("Reading sensor data")

class TemperatureSensor(Sensor):
    def read(self):
        print("Temperature: 31°C")

class MoistureSensor(Sensor):
    def read(self):
        print("Soil Moisture: 42%")

class HumiditySensor(Sensor):
    def read(self):
        print("Humidity: 68%")

temperature = TemperatureSensor()
moisture = MoistureSensor()
humidity = HumiditySensor()

temperature.read()
moisture.read()
humidity.read()`,
    output: "Temperature: 31°C\nSoil Moisture: 42%\nHumidity: 68%",
  },
  sameInterface: {
    title: "Depend on the common behaviour",
    body: "Type-specific method names force the controller to know every device type. A common read() method keeps the controller simple and extensible.",
    specificCalls: ["read_temperature()", "read_moisture()", "read_humidity()"],
    commonCalls: ["temperature.read()", "moisture.read()", "humidity.read()"],
  },
  loopExample: {
    title: "Polymorphism becomes powerful inside a loop",
    body: "The loop does not ask which class each object belongs to. It only expects the current object to support read(). Adding RainfallSensor does not change the loop.",
    code: `sensors = [
    TemperatureSensor(),
    MoistureSensor(),
    HumiditySensor()
]

for sensor in sensors:
    sensor.read()`,
    output: "Temperature: 31°C\nSoil Moisture: 42%\nHumidity: 68%",
  },
  dispatches: [
    { className: "TemperatureSensor", method: "read()", output: "Temperature: 31°C", inherits: true },
    { className: "MoistureSensor", method: "read()", output: "Soil Moisture: 42%", inherits: true },
    { className: "HumiditySensor", method: "read()", output: "Humidity: 68%", inherits: true },
    { className: "RainfallSensor", method: "read()", output: "Rainfall: 12 mm", inherits: true },
  ],
  duckTyping: {
    title: "Duck typing: behaviour matters more than ancestry",
    body: "WeatherStation and Drone do not inherit from Sensor. The loop still works because both provide the read() behaviour it expects.",
    code: `class WeatherStation:
    def read(self):
        print("Weather data collected")

class Drone:
    def read(self):
        print("Drone camera data collected")

devices = [WeatherStation(), Drone()]

for device in devices:
    device.read()`,
    output: "Weather data collected\nDrone camera data collected",
    rules: [
      "A common parent class is not required",
      "Every object must provide the method the caller expects",
      "A missing read() raises AttributeError when the call is reached",
    ],
  },
  comparison: [
    { feature: "Common parent", inheritance: "Usually required", duckTyping: "Not required" },
    { feature: "Shared method", inheritance: "Yes", duckTyping: "Yes" },
    { feature: "Relationship", inheritance: "Explicit IS-A", duckTyping: "Behaviour-based" },
    { feature: "Flexibility", inheritance: "High", duckTyping: "Very high" },
  ],
  industryConnections: [
    { title: "IoT fleets", interfaceName: "read()", examples: ["Sensors", "Weather stations", "Drones"] },
    { title: "Machine learning", interfaceName: "predict()", examples: ["Decision Tree", "Random Forest", "Neural Network"] },
    { title: "Payments", interfaceName: "pay()", examples: ["Card", "UPI", "Wallet"] },
  ],
  debugChallenges: [
    {
      title: "The expected read() method is missing",
      prompt: "Why does sensor.read() raise AttributeError even though the class can read temperature?",
      code: `class TemperatureSensor:
    def read_temperature(self):
        print("31°C")

sensor = TemperatureSensor()
sensor.read()`,
      mistakesToFind: 1,
      solution: `class TemperatureSensor:
    def read(self):
        print("31°C")

sensor = TemperatureSensor()
sensor.read()`,
      hiddenGuidance: "The controller expects the common interface read(). Rename the type-specific method to satisfy that contract.",
    },
    {
      title: "Which override executes?",
      prompt: "Predict the output, then explain why the parent implementation is not selected.",
      code: `class Sensor:
    def read(self):
        print("Generic reading")

class TemperatureSensor(Sensor):
    def read(self):
        print("31°C")

TemperatureSensor().read()`,
      mistakesToFind: 0,
      solution: `# Output:
31°C

# Python dispatches to TemperatureSensor.read(),
# the most specific implementation on the object.`,
      hiddenGuidance: "Look at the actual object's class, then find the closest read() implementation.",
    },
    {
      title: "One incompatible object breaks the loop",
      prompt: "The first device works. Why does the second iteration fail?",
      code: `class WeatherStation:
    def read(self):
        print("Weather collected")

class IrrigationPump:
    def start(self):
        print("Pump started")

for device in [WeatherStation(), IrrigationPump()]:
    device.read()`,
      mistakesToFind: 1,
      solution: `class IrrigationPump:
    def read(self):
        print("Pump telemetry collected")

for device in [WeatherStation(), IrrigationPump()]:
    device.read()`,
      hiddenGuidance: "Duck typing is flexible, but every object must still provide the behaviour the loop calls.",
    },
  ],
  engineerThinkingPrompt:
    "Your controller supports 10 sensor types today and 50 next year. How does depending on read() instead of concrete class names reduce coupling, and what safeguards would you add so an incompatible device is caught early?",
};
