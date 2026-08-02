import type { TypeConversionLessonDevelopmentPack } from "@/types/content";

export const typeConversionDevelopmentPack: TypeConversionLessonDevelopmentPack = {
  kind: "type-conversion",
  prerequisite: "Lessons 1.1–1.4",
  story: {
    title: "A weather station sends a number as text",
    body: "The station reports Temperature = \"32\". It looks numeric to a person, but quotation marks make it a string in Python. A calculation needs a numeric value first.",
    sensorValue: "Temperature = \"32\"",
    failedCode: "temperature = \"32\"\nprint(temperature + 10)",
    answer: "Python cannot add a string and an integer. Convert the sensor text before calculating.",
    workflow: {
      title: "Prepare a sensor reading for calculation",
      description: "Watch the same information change representation while preserving its meaning.",
      steps: [
        { title: "Sensor", description: "The weather station sends a reading." },
        { title: "\"32\"", description: "The transmitted characters arrive as text." },
        { title: "String", description: "Python identifies the quoted value as str." },
        { title: "Convert", description: "int() creates a compatible whole number." },
        { title: "32", description: "The converted value is numeric." },
        { title: "Integer", description: "Python identifies the new value as int." },
        { title: "Calculation", description: "The program can now perform arithmetic." },
      ],
    },
  },
  definition: {
    title: "What is type conversion?",
    body: "Type conversion changes a value from one data type into another representation. The original meaning should remain compatible with the requested destination type.",
    items: ["Original value", "Original type", "Conversion function", "Converted value", "New type"],
    example: {
      title: "Convert age text into an integer",
      code: "age = \"24\"\nage = int(age)\nprint(age)",
      explanation: "int() creates the integer 24 from compatible digit text.",
      output: "24",
    },
    flow: [
      { title: "String", description: "The starting value is text." },
      { title: "Integer", description: "int() creates a whole-number representation." },
      { title: "Float", description: "float() can create a decimal representation." },
      { title: "Boolean", description: "bool() applies Python truth-value rules." },
    ],
  },
  whyConversion: {
    title: "Conversion changes how a value behaves",
    body: "Predict whether Python will join text or add numbers.",
    predictions: [
      { title: "Without conversion", code: "age = \"20\"\nprint(age + age)", options: ["40", "2020", "Error"], answer: "2020", explanation: "Both values are strings, so + joins their text." },
      { title: "With conversion", code: "age = int(\"20\")\nprint(age + age)", options: ["40", "2020", "Error"], answer: "40", explanation: "int() creates a number, so + performs numeric addition." },
    ],
  },
  implicitConversion: {
    title: "Implicit conversion happens automatically when it is safe",
    code: "a = 10\nb = 2.5\nprint(a + b)",
    explanation: "Python promotes the integer 10 to the float representation 10.0 so it can produce a float result without losing the decimal part.",
    output: "12.5",
    before: [{ value: "10", type: "int" }, { value: "2.5", type: "float" }],
    after: { value: "12.5", type: "float" },
    workflow: {
      title: "Python promotes a mixed numeric expression",
      description: "The integer is safely represented as a float before the result is produced.",
      steps: [
        { title: "Integer", description: "The expression begins with 10 as int." },
        { title: "Python", description: "Python detects a mixed int and float calculation." },
        { title: "Float", description: "10 can be represented safely as 10.0." },
        { title: "Result", description: "The result 12.5 remains a float." },
      ],
    },
  },
  explicitConversion: {
    title: "Explicit conversion is requested by the programmer",
    body: "Use a conversion function when the program knows which representation it needs. The source value must be compatible with that request.",
    example: {
      title: "String to integer",
      originalValue: "\"24\"",
      originalType: "str",
      conversion: "int",
      convertedValue: "24",
      convertedType: "int",
      code: "age = \"24\"\nage = int(age)",
      explanation: "The programmer explicitly asks int() to convert compatible digit text.",
    },
    workflow: {
      title: "Explicit string-to-integer flow",
      description: "The conversion function makes the programmer's intention visible.",
      steps: [
        { title: "String", description: "The original value is \"24\"." },
        { title: "int()", description: "The programmer requests an integer." },
        { title: "Integer", description: "Python returns the numeric value 24." },
      ],
    },
  },
  conversionFunctions: [
    {
      functionName: "int",
      title: "int() creates whole numbers",
      purpose: "Convert compatible strings, floats, and Boolean values into integers.",
      examples: [
        { title: "Digit text", originalValue: "\"50\"", originalType: "str", conversion: "int", convertedValue: "50", convertedType: "int", code: "print(int(\"50\"))", explanation: "Whole-number digit text converts directly." },
        { title: "Decimal truncation", originalValue: "45.9", originalType: "float", conversion: "int", convertedValue: "45", convertedType: "int", code: "print(int(45.9))", explanation: "int() truncates the fractional part; it does not round." },
        { title: "Boolean one", originalValue: "True", originalType: "bool", conversion: "int", convertedValue: "1", convertedType: "int", code: "print(int(True))", explanation: "True converts to the integer 1." },
      ],
    },
    {
      functionName: "float",
      title: "float() creates decimal numbers",
      purpose: "Convert compatible integers and numeric strings into floating-point values.",
      examples: [
        { title: "Integer to float", originalValue: "20", originalType: "int", conversion: "float", convertedValue: "20.0", convertedType: "float", code: "print(float(20))", explanation: "The whole number gains a decimal representation." },
        { title: "Decimal text", originalValue: "\"34.6\"", originalType: "str", conversion: "float", convertedValue: "34.6", convertedType: "float", code: "print(float(\"34.6\"))", explanation: "Compatible decimal text becomes a float." },
      ],
      agritechExample: "rainfall = float(input(\"Rainfall : \"))",
    },
    {
      functionName: "str",
      title: "str() creates text",
      purpose: "Create a readable text representation of a Python value.",
      examples: [
        { title: "Integer to text", originalValue: "98", originalType: "int", conversion: "str", convertedValue: "\"98\"", convertedType: "str", code: "marks = 98\nprint(str(marks))", explanation: "The numeric value becomes text that can be joined into a message." },
        { title: "Build a message", originalValue: "25", originalType: "int", conversion: "str", convertedValue: "\"25\"", convertedType: "str", code: "name = \"Rahul\"\nage = 25\nprint(name + \" is \" + str(age) + \" years old.\")", explanation: "str(age) makes every part of the concatenated message text." },
      ],
    },
    {
      functionName: "bool",
      title: "bool() applies truth-value rules",
      purpose: "Convert values into True or False. Zero and empty text are false; non-zero numbers and non-empty text are true.",
      examples: [
        { title: "One", originalValue: "1", originalType: "int", conversion: "bool", convertedValue: "True", convertedType: "bool", code: "print(bool(1))", explanation: "A non-zero integer is truthy." },
        { title: "Zero", originalValue: "0", originalType: "int", conversion: "bool", convertedValue: "False", convertedType: "bool", code: "print(bool(0))", explanation: "Numeric zero is falsy." },
        { title: "Empty string", originalValue: "\"\"", originalType: "str", conversion: "bool", convertedValue: "False", convertedType: "bool", code: "print(bool(\"\"))", explanation: "An empty string is falsy." },
        { title: "Non-empty string", originalValue: "\"Rice\"", originalType: "str", conversion: "bool", convertedValue: "True", convertedType: "bool", code: "print(bool(\"Rice\"))", explanation: "A non-empty string is truthy, regardless of its word content." },
      ],
    },
  ],
  booleanPredictions: {
    title: "Predict Python's truth-value conversion",
    body: "Choose True or False before revealing how bool() treats each value.",
    predictions: [
      { title: "bool(0)", code: "print(bool(0))", options: ["True", "False"], answer: "False", explanation: "Zero is falsy." },
      { title: "bool(\"Rice\")", code: "print(bool(\"Rice\"))", options: ["True", "False"], answer: "True", explanation: "A non-empty string is truthy." },
    ],
  },
  errorExplorer: {
    title: "Which conversions are valid?",
    body: "A conversion succeeds only when Python can interpret the source value in the requested form.",
    cases: [
      { label: "Whole-number text", code: "int(\"50\")", valid: true, result: "50", explanation: "The string contains valid whole-number digits." },
      { label: "Crop text to integer", code: "int(\"Rice\")", valid: false, result: "ValueError", explanation: "Rice is not a valid integer representation." },
      { label: "Decimal text to float", code: "float(\"120.5\")", valid: true, result: "120.5", explanation: "The string contains a valid decimal representation." },
      { label: "Greeting text to float", code: "float(\"Hello\")", valid: false, result: "ValueError", explanation: "Hello is not a numeric representation." },
      { label: "Decimal text directly to int", code: "int(\"45.9\")", valid: false, result: "ValueError", explanation: "int() cannot parse a decimal-point string directly." },
      { label: "Number to text", code: "str(250)", valid: true, result: "\"250\"", explanation: "str() can create text from the integer." },
    ],
  },
  agritechProgram: {
    title: "Convert interactive farm observations",
    code: "farmer = input(\"Farmer Name : \" )\ntemperature = float(input(\"Temperature : \"))\nplants = int(input(\"Number of Plants : \"))\nmotor = bool(int(input(\"Motor Status (1/0): \")))\n\nprint(farmer)\nprint(temperature)\nprint(plants)\nprint(motor)",
    explanation: "The farmer name remains text, measurements and counts become numeric, and a 1/0 motor status is converted through int before bool.",
    output: "Farmer Name : Rahul\nTemperature : 31.5\nNumber of Plants : 250\nMotor Status (1/0): 1\nRahul\n31.5\n250\nTrue",
  },
  visualizerExamples: [
    { title: "Temperature", originalValue: "\"31.5\"", originalType: "str", conversion: "float", convertedValue: "31.5", convertedType: "float", code: "temperature = float(\"31.5\")", explanation: "Decimal sensor text becomes a float measurement." },
    { title: "Plant count", originalValue: "\"250\"", originalType: "str", conversion: "int", convertedValue: "250", convertedType: "int", code: "plants = int(\"250\")", explanation: "Whole-number text becomes an integer count." },
    { title: "Motor status", originalValue: "1", originalType: "int", conversion: "bool", convertedValue: "True", convertedType: "bool", code: "motor = bool(1)", explanation: "The non-zero status becomes True." },
    { title: "Report value", originalValue: "120.5", originalType: "float", conversion: "str", convertedValue: "\"120.5\"", convertedType: "str", code: "rainfall_text = str(120.5)", explanation: "The measurement becomes text for a report label." },
  ],
  playgroundActivities: ["Change the temperature text", "Try a different plant count", "Convert the temperature to int and observe truncation", "Add a bool conversion", "Introduce an invalid conversion and inspect the error trace"],
  mistakesTitle: "Repair common conversion mistakes",
  mistakes: [
    { title: "Non-numeric text to int", incorrect: "plants = int(\"Rice\")", reason: "Rice is not a valid whole-number representation.", correct: "plants = int(\"250\")" },
    { title: "Non-numeric text to float", incorrect: "temperature = float(\"Hello\")", reason: "Hello cannot be interpreted as a decimal number.", correct: "temperature = float(\"31.5\")" },
    { title: "String and integer calculation", incorrect: "plants = \"20\"\nprint(plants + 10)", reason: "The plant count is still text when the calculation starts.", correct: "plants = int(\"20\")\nprint(plants + 10)" },
  ],
  debugChallenge: {
    title: "Fix every conversion error",
    prompt: "Inspect which strings can become numbers and choose a destination type that matches the agricultural information.",
    code: "temperature = \"32\"\nprint(temperature + 5)\nrainfall = \"120.5\"\nprint(int(rainfall))\ncrop = \"Rice\"\nprint(float(crop))",
    mistakesToFind: 3,
    solution: "temperature = float(\"32\")\nprint(temperature + 5)\nrainfall = float(\"120.5\")\nprint(rainfall)\ncrop = \"Rice\"\nprint(crop)",
    hiddenGuidance: "Convert temperature before calculating, preserve rainfall's decimal part, and keep the crop name as text.",
  },
  engineerScenario: {
    title: "Convert a weather-station payload",
    scenario: "The station sends Temperature = \"31.5\", Humidity = \"82\", Rainfall = \"120\", and Motor = \"1\".",
    question: "Which conversion plan best matches those values?",
    options: [
      { label: "float, float, float, bool(int(...))", explanation: "Measurements become numeric and the encoded 1/0 motor status is converted through int before bool.", recommended: true },
      { label: "int for every value", explanation: "The temperature may contain a decimal, and direct bool intent would remain unclear." , recommended: false },
      { label: "str for every value", explanation: "The payload already contains strings, so this would not prepare measurements for calculations.", recommended: false },
      { label: "bool for every value", explanation: "Non-empty measurement strings would all become True and their numeric information would be lost.", recommended: false },
    ],
  },
  miniProject: {
    title: "Mini project · Smart Weather Converter",
    brief: "Collect a farmer name and weather readings, convert each response to the appropriate type, and display a formatted report.",
    deliverables: ["Farmer name as text", "Temperature as float", "Rainfall as float", "Humidity as float", "A readable report", "type() checks for the converted measurements"],
    outputTemplate: "SMART WEATHER REPORT\n------------------------\nFarmer :\nTemperature :\nRainfall :\nHumidity :\n------------------------",
  },
};
