import type { ProblemSolvingLessonDevelopmentPack } from "@/types/content";

export const problemSolvingDevelopmentPack: ProblemSolvingLessonDevelopmentPack = {
  kind: "problem-solving",
  prerequisite: "Lessons 1.1–1.6 · Programs, variables, data types, input, conversion, and operators",
  story: {
    title: "A client asks for a solution—not Python syntax",
    body: "Imagine you are developing software for a farm. Your client does not ask for variables or operators. They need to know how much fertilizer the farm requires. Software engineering begins by translating that real need into precise steps a computer can execute.",
    request: "I don't care about Python. I just want software that tells me how much fertilizer I need.",
    insight: "Programming is the process of converting a real problem into understandable inputs, formulas, code, and a verified result.",
    workflow: {
      title: "From real problem to useful solution",
      description: "Each stage removes uncertainty until the computer has an exact calculation to perform.",
      steps: [
        { title: "Real problem", description: "Start with the farmer's need." },
        { title: "Understand", description: "Clarify what the request really means." },
        { title: "Break into steps", description: "Separate inputs, formula, and output." },
        { title: "Python code", description: "Translate the steps into expressions." },
        { title: "Solution", description: "Run, verify, and communicate the result." },
      ],
    },
  },
  framework: {
    title: "A framework for every programming problem",
    body: "Use these seven stages before and during every future exercise. Open each stage to see the question that keeps your solution on track.",
    steps: [
      { title: "Understand Problem", guidance: "Restate the request in one clear sentence without mentioning code.", check: "What real result does the user need?" },
      { title: "Identify Inputs", guidance: "List every value the program must receive or already knows.", check: "What information is required to solve it?" },
      { title: "Identify Outputs", guidance: "Define the result, label, and unit the user should see.", check: "What should the program communicate?" },
      { title: "Choose Formula", guidance: "Write the mathematical relationship using meaningful names.", check: "How do the inputs produce the output?" },
      { title: "Write Code", guidance: "Convert inputs, calculate in named steps, and print a meaningful result.", check: "Can another learner read each step?" },
      { title: "Run", guidance: "Execute the program with realistic sample values.", check: "Does Python complete without errors?" },
      { title: "Verify Output", guidance: "Estimate or calculate the answer independently and compare it with Python.", check: "Is the result reasonable and correctly labelled?" },
    ],
  },
  expressionBuilding: {
    title: "Expressions turn known values into new information",
    body: "An expression combines values, variables, and operators. Python evaluates the expression and produces a result that can be stored or displayed.",
    definition: "Expression = values + variables + operators",
    anatomy: [
      { label: "Result name", value: "area" },
      { label: "Assignment", value: "=" },
      { label: "Input variable", value: "length" },
      { label: "Operator", value: "*" },
      { label: "Input variable", value: "width" },
    ],
    examples: [
      { title: "Rectangle area", expression: "area = length * width", steps: [{ expression: "area = 8 * 5", explanation: "Replace each variable with its current value." }, { expression: "area = 40", explanation: "Multiply the two measurements." }], result: "40" },
      { title: "Average", expression: "average = (a + b + c) / 3", steps: [{ expression: "average = (18 + 24 + 30) / 3", explanation: "Substitute the three observations." }, { expression: "average = 72 / 3", explanation: "Evaluate the parentheses first." }, { expression: "average = 24", explanation: "Divide the total by the number of observations." }], result: "24" },
    ],
  },
  workedExamples: [
    {
      id: "temperature-converter", title: "Worked Example 1 · Temperature Converter", context: "Convert a Celsius field reading into Fahrenheit.",
      inputs: [{ name: "celsius", label: "Temperature", value: 32, unit: "°C" }], formula: "F = (C × 9 ÷ 5) + 32", pythonExpression: "fahrenheit = (celsius * 9 / 5) + 32", outputLabel: "Temperature in Fahrenheit", outputUnit: "°F",
      code: "celsius = float(input(\"Enter Temperature (°C): \"))\nfahrenheit = (celsius * 9 / 5) + 32\nprint(\"Temperature in Fahrenheit:\", fahrenheit)",
      calculationSteps: ["Receive Celsius and convert it to float", "Multiply Celsius by 9", "Divide by 5", "Add 32", "Display the Fahrenheit result"],
    },
    {
      id: "rectangle-area", title: "Worked Example 2 · Rectangle Area", context: "Calculate the area of a rectangular plot.",
      inputs: [{ name: "length", label: "Length", value: 8, unit: "m" }, { name: "width", label: "Width", value: 5, unit: "m" }], formula: "Area = Length × Width", pythonExpression: "area = length * width", outputLabel: "Area", outputUnit: "m²",
      code: "length = float(input(\"Length: \"))\nwidth = float(input(\"Width: \"))\narea = length * width\nprint(\"Area:\", area)",
      calculationSteps: ["Receive length", "Receive width", "Multiply length by width", "Display the area with a square-unit label"],
    },
    {
      id: "percentage", title: "Worked Example 3 · Percentage Calculator", context: "Combine five subject marks into one percentage.",
      inputs: [{ name: "m1", label: "Subject 1", value: 78 }, { name: "m2", label: "Subject 2", value: 82 }, { name: "m3", label: "Subject 3", value: 74 }, { name: "m4", label: "Subject 4", value: 88 }, { name: "m5", label: "Subject 5", value: 80 }], formula: "Percentage = Total ÷ 500 × 100", pythonExpression: "percentage = total / 500 * 100", outputLabel: "Percentage", outputUnit: "%",
      code: "m1 = float(input(\"Subject 1: \"))\nm2 = float(input(\"Subject 2: \"))\nm3 = float(input(\"Subject 3: \"))\nm4 = float(input(\"Subject 4: \"))\nm5 = float(input(\"Subject 5: \"))\ntotal = m1 + m2 + m3 + m4 + m5\npercentage = total / 500 * 100\nprint(\"Percentage:\", percentage)",
      calculationSteps: ["Receive five marks", "Add the marks", "Divide the total by 500", "Multiply by 100", "Display the percentage"],
    },
    {
      id: "simple-interest", title: "Worked Example 4 · Simple Interest", context: "Calculate interest from principal, annual rate, and time.",
      inputs: [{ name: "principal", label: "Principal", value: 50000, unit: "₹" }, { name: "rate", label: "Rate", value: 7, unit: "%" }, { name: "time", label: "Time", value: 2, unit: "years" }], formula: "SI = (P × R × T) ÷ 100", pythonExpression: "interest = (principal * rate * time) / 100", outputLabel: "Simple Interest", outputUnit: "₹",
      code: "principal = float(input(\"Principal: \"))\nrate = float(input(\"Rate (%): \"))\ntime = float(input(\"Time (years): \"))\ninterest = (principal * rate * time) / 100\nprint(\"Simple Interest:\", interest)",
      calculationSteps: ["Receive principal, rate, and time", "Multiply all three inputs", "Divide by 100", "Display the interest"],
    },
  ],
  agritechProblems: [
    { id: "crop-yield", title: "Agritech Problem 1 · Crop Yield", context: "Estimate total harvested mass from land area and yield per acre.", inputs: [{ name: "area", label: "Land Area", value: 5, unit: "acres" }, { name: "yield_per_acre", label: "Yield per Acre", value: 750, unit: "kg" }], formula: "Total Yield = Area × Yield per Acre", pythonExpression: "total_yield = area * yield_per_acre", code: "area = float(input(\"Land Area (acres): \"))\nyield_per_acre = float(input(\"Yield per Acre (kg): \"))\ntotal_yield = area * yield_per_acre\nprint(\"Total Yield:\", total_yield, \"kg\")", outputLabel: "Total Yield", outputUnit: "kg", calculationSteps: ["Identify area", "Identify yield rate", "Multiply the values", "Label the result in kilograms"] },
    { id: "fertilizer", title: "Agritech Problem 2 · Fertilizer Requirement", context: "Calculate fertilizer needed for the complete farm.", inputs: [{ name: "area", label: "Land Area", value: 5, unit: "acres" }, { name: "fertilizer_per_acre", label: "Fertilizer per Acre", value: 42, unit: "kg" }], formula: "Required Fertilizer = Area × Fertilizer per Acre", pythonExpression: "fertilizer = area * fertilizer_per_acre", code: "area = float(input(\"Land Area: \"))\nfertilizer_per_acre = float(input(\"Fertilizer per Acre: \"))\nfertilizer = area * fertilizer_per_acre\nprint(\"Required Fertilizer:\", fertilizer, \"kg\")", outputLabel: "Required Fertilizer", outputUnit: "kg", calculationSteps: ["Receive area", "Receive application rate", "Multiply", "Display kilograms required"] },
    { id: "water", title: "Agritech Problem 3 · Water Requirement", context: "Estimate total irrigation water from an area-based rate.", inputs: [{ name: "area", label: "Land Area", value: 5, unit: "acres" }, { name: "water_per_acre", label: "Water per Acre", value: 1200, unit: "L" }], formula: "Total Water = Area × Water per Acre", pythonExpression: "total_water = area * water_per_acre", code: "area = float(input(\"Land Area: \"))\nwater_per_acre = float(input(\"Water per Acre: \"))\ntotal_water = area * water_per_acre\nprint(\"Total Water:\", total_water, \"L\")", outputLabel: "Total Water", outputUnit: "L", calculationSteps: ["Receive area", "Receive water rate", "Multiply", "Display litres required"] },
    { id: "seed", title: "Agritech Problem 4 · Seed Requirement", context: "Estimate total seed from land area and seed rate.", inputs: [{ name: "area", label: "Land Area", value: 5, unit: "acres" }, { name: "seeds_per_acre", label: "Seeds per Acre", value: 18, unit: "kg" }], formula: "Total Seeds = Area × Seeds per Acre", pythonExpression: "total_seeds = area * seeds_per_acre", code: "area = float(input(\"Land Area: \"))\nseeds_per_acre = float(input(\"Seeds per Acre: \"))\ntotal_seeds = area * seeds_per_acre\nprint(\"Total Seeds:\", total_seeds, \"kg\")", outputLabel: "Total Seeds", outputUnit: "kg", calculationSteps: ["Receive area", "Receive seed rate", "Multiply", "Display kilograms required"] },
  ],
  expressionBuilder: {
    title: "Build an expression one decision at a time",
    body: "Choose two known values and an operator. The builder generates valid Python and previews the result immediately.",
    variables: [{ label: "Temperature", value: "temperature", defaultValue: 32 }, { label: "Rainfall", value: "rainfall", defaultValue: 20 }, { label: "Area", value: "area", defaultValue: 5 }, { label: "Yield per acre", value: "yield_per_acre", defaultValue: 750 }, { label: "Soil moisture", value: "soil_moisture", defaultValue: 28 }],
    operators: [{ label: "+ · add", value: "+" }, { label: "− · subtract", value: "-" }, { label: "× · multiply", value: "*" }, { label: "÷ · divide", value: "/" }, { label: "> · greater than", value: ">" }, { label: "< · less than", value: "<" }, { label: "== · equal", value: "==" }],
    numbers: [5, 10, 30, 50, 100, 750],
  },
  simulatorFields: [
    { id: "area", label: "Land Area", prompt: "Land Area (acres): ", type: "float", defaultValue: "5" },
    { id: "yield_per_acre", label: "Yield per Acre", prompt: "Yield per Acre (kg): ", type: "float", defaultValue: "750" },
  ],
  guidedPractice: [
    { title: "Circle Area", formula: "area = 3.14159 * radius ** 2", guidance: "Identify radius as the input and square it before multiplying by pi." },
    { title: "BMI", formula: "bmi = weight / (height ** 2)", guidance: "Use weight in kilograms and height in metres." },
    { title: "Electricity Bill", formula: "bill = units * rate_per_unit", guidance: "Keep the unit rate separate so the expression stays readable." },
    { title: "Salary Calculator", formula: "net_salary = basic_salary + allowance - deduction", guidance: "Name additions and deductions before combining them." },
    { title: "GST Calculator", formula: "total = price + (price * gst_rate / 100)", guidance: "Calculate the tax amount, then add it to the original price." },
  ],
  independentPractice: ["Average of four numbers", "Difference between two measurements", "Profit calculation", "Discount calculation", "Petrol consumption"],
  challenges: [
    { title: "Farm Expense Calculator", brief: "Combine seed, fertilizer, labour, and transport costs.", inputs: ["Seed cost", "Fertilizer cost", "Labour cost", "Transport cost"], output: "Total farm expense", hint: "Add every category exactly once." },
    { title: "Crop Profit Calculator", brief: "Compare crop revenue with the complete production expense.", inputs: ["Quantity sold", "Price per unit", "Total expense"], output: "Crop profit", hint: "Calculate revenue first, then subtract expense." },
    { title: "Rainwater Harvest Estimator", brief: "Estimate captured water using roof area, rainfall, and an efficiency factor.", inputs: ["Collection area", "Rainfall", "Efficiency factor"], output: "Estimated captured water", hint: "Keep every unit consistent before multiplying." },
    { title: "Smart Greenhouse Calculator", brief: "Calculate daily water and energy requirements for all greenhouse zones.", inputs: ["Number of zones", "Water per zone", "Energy per zone"], output: "Total daily water and energy", hint: "Create one expression for each output." },
  ],
  debugChallenges: [
    { title: "Debug the rectangle calculator", prompt: "Explain why the calculation fails and repair the program.", code: "length = input(\"Length: \")\nwidth = input(\"Width: \")\narea = length * width\nprint(area)", mistakesToFind: 2, solution: "length = float(input(\"Length: \"))\nwidth = float(input(\"Width: \"))\narea = length * width\nprint(\"Area:\", area)", hiddenGuidance: "Inspect the type returned by each input() call before reviewing the expression." },
    { title: "Debug the temperature report", prompt: "Find the incompatible values in the output statement.", code: "temperature = float(input(\"Temperature: \"))\nfahrenheit = temperature * 9 / 5 + 32\nprint(\"Temperature\" + fahrenheit)", mistakesToFind: 1, solution: "temperature = float(input(\"Temperature: \"))\nfahrenheit = temperature * 9 / 5 + 32\nprint(\"Temperature:\", fahrenheit)", hiddenGuidance: "Check whether + is receiving two compatible values." },
  ],
  engineerScenario: {
    title: "Think before writing crop-yield software",
    scenario: "A company asks you to build crop-yield prediction software. The request is still too broad to code safely.",
    question: "What should you identify before writing Python?",
    options: [
      { label: "Inputs → Outputs → Formula → Algorithm → Code", explanation: "This sequence turns an unclear request into a testable solution.", recommended: true },
      { label: "Start typing code immediately", explanation: "Without a defined problem and inputs, the program may solve the wrong problem.", recommended: false },
      { label: "Choose variable names only", explanation: "Readable names help, but they do not define the required calculation.", recommended: false },
    ],
  },
  miniProject: {
    title: "Mini project · Smart Farm Calculator",
    brief: "Build one interactive calculator that combines land area with separate rates for yield, water, and fertilizer, then displays a useful farm-resource report.",
    deliverables: ["Land-area input", "Crop input", "Yield-per-acre input", "Water-per-acre input", "Fertilizer-per-acre input", "Numeric conversions", "Three named calculations", "A clearly labelled output report"],
    outputTemplate: "SMART FARM CALCULATOR\n---------------------\nCrop: Rice\nTotal Yield: 3750 kg\nTotal Water: 6000 L\nTotal Fertilizer: 210 kg",
  },
};
