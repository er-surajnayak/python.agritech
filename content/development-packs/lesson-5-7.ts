import type { OopAbstractionDevelopmentPack } from "@/types/content";

export const oopAbstractionDevelopmentPack: OopAbstractionDevelopmentPack = {
  kind: "oop-lesson-5-7",
  prerequisite: "Lesson 5.6 · Polymorphism: One Interface, Different Behaviors",
  storyHook:
    "Polymorphism lets every sensor respond to read(), but ordinary inheritance does not guarantee that a new sensor developer will actually provide that method. The platform now needs a formal Sensor contract.",
  smartFarmProblem: {
    title: "A sensor class that cannot be read",
    body: "The engineering team requires every platform sensor to expose read(). A class with no read() method may look like a sensor, yet it cannot participate safely in the monitoring system.",
    incompleteClass: `class SoilSensor:
    pass`,
    requirements: ["Every sensor must provide read()", "Each sensor may implement read() differently", "Incomplete sensor classes must be caught before use"],
  },
  analogy: {
    title: "Required fields on an examination form",
    body: "Every student submits different information, but the university defines a compulsory application contract. Missing a required field means the application is incomplete.",
    requiredFields: ["Name", "Roll number", "Course", "Signature"],
  },
  definition: {
    title: "Expose the promise; hide the machinery",
    body: "Abstraction exposes the essential operations an object promises to provide while hiding unnecessary implementation details. The Smart Farm controller needs read(); it does not need the voltage conversion, calibration, or network logic behind that reading.",
    items: ["Define what clients can depend on", "Hide implementation complexity behind a stable interface", "Allow specialized classes to choose their implementation", "Reject incomplete concrete classes"],
    visibleInterface: ["read()", "sensor_id", "show_id()"],
    hiddenDetails: ["Voltage conversion", "Calibration formula", "Radio protocol", "Vendor-specific parsing"],
  },
  encapsulationComparison: [
    { feature: "Primary question", encapsulation: "Who may access or change the data?", abstraction: "What must the object provide?" },
    { feature: "Purpose", encapsulation: "Protect and validate state", abstraction: "Simplify use and enforce a contract" },
    { feature: "Focus", encapsulation: "How data is accessed", abstraction: "Which essential behaviour is exposed" },
    { feature: "Python tools", encapsulation: "Private attributes and properties", abstraction: "ABC and @abstractmethod" },
    { feature: "Smart Farm example", encapsulation: "Protect battery percentage", abstraction: "Require every Sensor.read()" },
  ],
  abstractClass: {
    title: "Create an abstract Sensor blueprint",
    body: "ABC marks Sensor as an abstract base class. The @abstractmethod decorator marks read() as a required operation that concrete subclasses must implement.",
    code: `from abc import ABC, abstractmethod

class Sensor(ABC):
    @abstractmethod
    def read(self):
        pass`,
    rules: ["Import ABC and abstractmethod from abc", "Inherit the blueprint from ABC", "Decorate required methods with @abstractmethod", "Concrete child classes must implement every abstract method"],
  },
  contract: {
    title: "@abstractmethod turns intention into a contract",
    body: "A normal pass method is only a convention. Decorating it with @abstractmethod tells Python that the class is incomplete until a concrete subclass supplies an implementation.",
    method: "read()",
    explanation: "Every concrete Sensor subclass MUST implement read().",
  },
  instantiationError: {
    title: "The abstract blueprint is not a finished sensor",
    code: `sensor = Sensor()`,
    error: "TypeError: Can't instantiate abstract class Sensor with abstract method read",
    explanation: "Sensor describes the common contract, but it has no concrete reading behaviour. Instantiate a complete child class instead.",
  },
  concreteClass: {
    title: "Satisfy the contract in a concrete child",
    body: "TemperatureSensor becomes concrete when it implements the required read() method without decorating that implementation as abstract.",
    code: `class TemperatureSensor(Sensor):
    def read(self):
        return 31

sensor = TemperatureSensor()
print(sensor.read())`,
    output: "31",
  },
  completeExample: {
    title: "Complete abstract Smart Farm sensor family",
    body: "The abstract parent establishes read(). Every concrete child fulfills that same contract, which preserves the polymorphic loop from Lesson 5.6.",
    code: `from abc import ABC, abstractmethod

class Sensor(ABC):
    @abstractmethod
    def read(self):
        pass

class TemperatureSensor(Sensor):
    def read(self):
        return "Temperature: 31°C"

class MoistureSensor(Sensor):
    def read(self):
        return "Soil Moisture: 42%"

class HumiditySensor(Sensor):
    def read(self):
        return "Humidity: 68%"

sensors = [TemperatureSensor(), MoistureSensor(), HumiditySensor()]

for sensor in sensors:
    print(sensor.read())`,
    output: "Temperature: 31°C\nSoil Moisture: 42%\nHumidity: 68%",
  },
  continuity: {
    polymorphism: "These different objects can all do read().",
    abstraction: "Every concrete Sensor must provide read().",
  },
  commonFunctionality: {
    title: "Abstract classes can also share finished functionality",
    body: "An abstract class may contain constructors, common data, and normal methods alongside abstract requirements. Children inherit the finished parts and implement only the missing contract.",
    code: `from abc import ABC, abstractmethod

class Sensor(ABC):
    def __init__(self, sensor_id):
        self.sensor_id = sensor_id

    @abstractmethod
    def read(self):
        pass

    def show_id(self):
        print("Sensor ID:", self.sensor_id)

class TemperatureSensor(Sensor):
    def read(self):
        return "31°C"

sensor = TemperatureSensor(101)
sensor.show_id()
print(sensor.read())`,
    output: "Sensor ID: 101\n31°C",
  },
  machineExample: {
    title: "FarmMachine contract beyond sensors",
    body: "A FarmMachine blueprint can require both start() and stop(). Tractor, IrrigationPump, and Drone retain their different internal mechanics while satisfying the same operational contract.",
    contract: ["start()", "stop()"],
    implementations: ["Tractor", "IrrigationPump", "Drone"],
    code: `class FarmMachine(ABC):
    @abstractmethod
    def start(self):
        pass

    @abstractmethod
    def stop(self):
        pass

class Tractor(FarmMachine):
    def start(self):
        return "Tractor engine started"

    def stop(self):
        return "Tractor engine stopped"`,
  },
  sensors: [
    { className: "TemperatureSensor", output: "31°C", implemented: true },
    { className: "MoistureSensor", output: "42%", implemented: true },
    { className: "HumiditySensor", output: "68%", implemented: true },
    { className: "RainfallSensor", output: "12 mm", implemented: false },
  ],
  debugChallenges: [
    {
      title: "Missing @abstractmethod decorator",
      prompt: "Is read() abstract here? Explain why Sensor() can still be instantiated.",
      code: `from abc import ABC

class Sensor(ABC):
    def read(self):
        pass`,
      mistakesToFind: 1,
      solution: `from abc import ABC, abstractmethod

class Sensor(ABC):
    @abstractmethod
    def read(self):
        pass`,
      hiddenGuidance: "Inheriting ABC alone does not make every method abstract. The required method needs its decorator.",
    },
    {
      title: "Incomplete child class",
      prompt: "Why does creating MoistureSensor fail even though it inherits from Sensor?",
      code: `class MoistureSensor(Sensor):
    pass

sensor = MoistureSensor()`,
      mistakesToFind: 1,
      solution: `class MoistureSensor(Sensor):
    def read(self):
        return "Soil Moisture: 42%"

sensor = MoistureSensor()`,
      hiddenGuidance: "Inheritance also carries the parent's unfinished abstract requirements. Implement read() to make the child concrete.",
    },
    {
      title: "The child remains abstract",
      prompt: "Why is TemperatureSensor still abstract after redefining read()?",
      code: `class TemperatureSensor(Sensor):
    @abstractmethod
    def read(self):
        return 31`,
      mistakesToFind: 1,
      solution: `class TemperatureSensor(Sensor):
    def read(self):
        return 31`,
      hiddenGuidance: "The child redeclared read() as an abstract requirement. Remove @abstractmethod from the concrete implementation.",
    },
    {
      title: "Instantiating the abstract blueprint",
      prompt: "Why should the application create TemperatureSensor rather than Sensor?",
      code: `sensor = Sensor()`,
      mistakesToFind: 1,
      solution: `sensor = TemperatureSensor()
print(sensor.read())`,
      hiddenGuidance: "Sensor defines the promise; a concrete subclass supplies the usable implementation.",
    },
  ],
  engineerThinkingPrompt:
    "Your company publishes a Sensor API for third-party hardware vendors. How does requiring read() through an abstract base class keep the monitoring platform stable while vendors remain free to implement calibration, networking, and hardware access differently?",
};
