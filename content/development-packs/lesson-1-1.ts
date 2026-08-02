import type { FirstProgramDevelopmentPack } from "@/types/content";

export const firstProgramDevelopmentPack: FirstProgramDevelopmentPack = {
  kind: "first-program",
  prerequisite: "Module 0",
  story: {
    title: "Imagine a farmer preparing a daily weather display",
    body: "Instead of writing the same weather message every morning, the farmer asks a computer to display it. The computer needs clear instructions. A collection of those instructions is called a program, and Python is the language used to write them.",
    workflow: {
      title: "From a farm need to an output",
      description: "Follow the farmer's request through a simple computer program.",
      steps: [
        { title: "Farmer", description: "A person identifies a repeated task that should be completed." },
        { title: "Computer", description: "The computer waits for precise instructions." },
        { title: "Python code", description: "The instructions are written in a readable programming language." },
        { title: "Output screen", description: "The computer follows the instructions and displays the result." },
      ],
    },
  },
  programming: {
    title: "What is programming?",
    body: "Programming means giving instructions to a computer. Computers follow the instructions they receive; Python helps people express those instructions clearly.",
    humanWorkflow: { title: "A familiar instruction flow", description: "A clear request moves from one person to another and produces a result.", steps: [
      { title: "Teacher", description: "Explains a task clearly." }, { title: "Student", description: "Follows the instructions." }, { title: "Task completed", description: "Produces the requested outcome." },
    ] },
    computerWorkflow: { title: "A programming instruction flow", description: "A programmer expresses the request as instructions a computer can execute.", steps: [
      { title: "Programmer", description: "Defines the task and writes instructions." }, { title: "Computer", description: "Executes the instructions exactly." }, { title: "Task completed", description: "Produces the program output." },
    ] },
    industryTitle: "Programming works across industries",
    industries: ["Banking", "Artificial Intelligence", "Websites", "Agriculture", "Mobile applications", "Space research"],
  },
  pythonCode: {
    title: "What is Python code?",
    body: "Python code is a collection of instructions written according to Python's syntax. The instruction below asks Python to display a message on the screen.",
    example: { title: "One Python instruction", code: "print(\"Hello\")", explanation: "This instruction tells Python to display Hello on the screen.", output: "Hello" },
    workflow: { title: "How one instruction becomes output", description: "Select each stage to follow the instruction through Python.", steps: [
      { title: "Instruction", description: "The programmer writes a valid Python statement." }, { title: "Interpreter", description: "Python reads and executes the statement." }, { title: "Output", description: "The requested message appears on the screen." },
    ] },
  },
  execution: {
    title: "Python executes from top to bottom",
    description: "Run the trace to watch Python execute one line at a time. The highlighted line is the current instruction.",
    lines: [
      { code: "print(\"Field report\")", output: "Field report" },
      { code: "print(\"Crop: Rice\")", output: "Crop: Rice" },
      { code: "print(\"Status: Ready\")", output: "Status: Ready" },
    ],
  },
  firstProgram: {
    title: "Your first Python program",
    code: "print(\"Welcome to Python\")\nprint(\"Learning Python\")\nprint(\"Let's Build Something Amazing\")",
    explanation: "Each print instruction displays one line. Python starts with the first statement and continues downward.",
    output: "Welcome to Python\nLearning Python\nLet's Build Something Amazing",
  },
  print: {
    title: "Understanding print()",
    body: "The print function tells Python to display something. It can display messages and simple values.",
    examples: [
      { title: "Crop", code: "print(\"Rice\")", explanation: "Displays a crop name.", output: "Rice" },
      { title: "Label", code: "print(\"Temperature\")", explanation: "Displays a measurement label.", output: "Temperature" },
      { title: "Whole number", code: "print(25)", explanation: "Displays a whole number.", output: "25" },
      { title: "Decimal number", code: "print(34.8)", explanation: "Displays a decimal number.", output: "34.8" },
      { title: "True value", code: "print(True)", explanation: "Displays the Python value True.", output: "True" },
    ],
    predictionPrompt: "Predict the output before revealing it.",
  },
  statements: {
    title: "Statements are individual instructions",
    body: "Every instruction written in Python is called a statement. A program can contain multiple statements that Python executes in sequence.",
    examples: ["print(\"A\")", "print(\"B\")", "print(\"C\")"],
    workflow: { title: "A program contains statements", description: "Follow the program from the complete set to each individual instruction.", steps: [
      { title: "Program", description: "The complete collection of instructions." }, { title: "Statement 1", description: "The first instruction Python executes." }, { title: "Statement 2", description: "The next instruction in sequence." }, { title: "Statement 3", description: "The final instruction in this program." },
    ] },
  },
  comments: {
    title: "Comments explain code",
    body: "A comment starts with # and is ignored by Python. People use comments to explain the purpose of nearby code.",
    comment: "# Farmer Information",
    executableCode: "print(\"Rice\")",
  },
  indentation: {
    title: "Python cares about indentation",
    body: "Indentation means spaces at the beginning of a line. Unexpected indentation can produce an error. Later, if statements, loops, and functions will use indentation to group related instructions.",
    wrongCode: "print(\"Rice\")\n print(\"Wheat\")",
    wrongExplanation: "The unexpected space before the second statement causes an IndentationError.",
    correctCode: "print(\"Rice\")\nprint(\"Wheat\")",
    correctExplanation: "Both statements begin at the same level, so the program runs successfully.",
    futureUses: ["if", "for", "while", "functions"],
  },
  agritechProgram: {
    title: "Smart agriculture report",
    code: "print(\"🌾 Smart Agriculture\")\nprint(\"Farmer : Rahul\")\nprint(\"Crop : Rice\")\nprint(\"Temperature : 30°C\")\nprint(\"Rainfall : 120 mm\")",
    explanation: "A short program can format a useful agricultural status screen using one print statement per line.",
    output: "🌾 Smart Agriculture\nFarmer : Rahul\nCrop : Rice\nTemperature : 30°C\nRainfall : 120 mm",
  },
  playgroundActivities: ["Change the crop name", "Change the farmer name", "Add a village name", "Print your college", "Print your department"],
  mistakesTitle: "Recognise and repair common syntax mistakes",
  mistakes: [
    { title: "Forgetting quotation marks", incorrect: "print(Rice)", reason: "Without quotes, Python treats Rice as a name that should already exist.", correct: "print(\"Rice\")" },
    { title: "Missing a closing bracket", incorrect: "print(\"Rice\"", reason: "The opening parenthesis must have a matching closing parenthesis.", correct: "print(\"Rice\")" },
    { title: "Using Print instead of print", incorrect: "Print(\"Rice\")", reason: "Python is case-sensitive, so Print and print are different names.", correct: "print(\"Rice\")" },
    { title: "Removing parentheses", incorrect: "print \"Rice\"", reason: "Modern Python requires parentheses when calling print.", correct: "print(\"Rice\")" },
    { title: "Unexpected indentation", incorrect: " print(\"Rice\")", reason: "An unexplained leading space can produce an IndentationError.", correct: "print(\"Rice\")" },
  ],
  debugChallenge: {
    title: "Find three mistakes",
    prompt: "Inspect each line before revealing the corrected program.",
    code: "Print(\"Rice\")\nprint(\"Wheat\"\nprint(Corn)",
    mistakesToFind: 3,
    solution: "print(\"Rice\")\nprint(\"Wheat\")\nprint(\"Corn\")",
    hiddenGuidance: "Inspect capitalization, parentheses, and quotation marks before revealing the solution.",
  },
  miniActivity: {
    title: "Create your learner profile",
    body: "Create a program that displays five lines about you.",
    items: ["Name", "Department", "College", "Favourite crop", "Dream company"],
  },
};
