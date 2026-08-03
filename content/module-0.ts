import type { LessonDocument } from "@/types/content";
import { whyPythonDevelopmentPack } from "@/content/development-packs/lesson-0-2";

type ModuleZeroLessonSeed = Omit<LessonDocument, "id" | "moduleId" | "number" | "level"> & {
  order: number;
  level?: LessonDocument["level"];
};

function defineLesson(seed: ModuleZeroLessonSeed): LessonDocument {
  return {
    ...seed,
    id: `module-0-lesson-${seed.order}`,
    moduleId: "module-0",
    number: `0.${seed.order}`,
    level: seed.level ?? "Orientation",
  };
}

export const moduleZeroLessons: LessonDocument[] = [
  defineLesson({
    order: 1,
    level: "Beginner",
    title: "Welcome to Python, Agritech & DI Notes",
    summary: "Begin the journey from absolute Python basics to confident agricultural data analysis through an interactive, visual, and practice-oriented learning experience.",
    durationMinutes: 25,
    introduction: {
      title: "Welcome to Python for Agritech & Data Science",
      body: "Learn Python from absolute basics and discover how it powers modern agriculture, AI, automation, and data science.",
    },
    objectives: [
      "Understand what this course is about",
      "Understand why Python is important",
      "Understand why Agritech needs Python",
      "Understand the learning methodology",
      "Navigate the DI Notes platform",
      "Understand how the course is structured",
    ],
    whyThisMatters: {
      title: "Agriculture produces more data than one person can inspect",
      body: "Sensors, weather stations, drone images, soil reports, water records, and crop production systems generate thousands of observations. Python helps turn that volume into useful evidence.",
    },
    industryMotivation: {
      title: "Python is already part of modern agriculture",
      body: "Teams apply Python in smart irrigation, crop disease detection, satellite imaging, weather prediction, agricultural robotics, yield prediction, and precision farming.",
      signal: "Python connects raw agricultural observations with charts, insights, and better-informed farmer decisions.",
    },
    concept: {
      title: "DI Notes is a learning platform, not a digital textbook",
      body: "You will understand ideas visually, experiment with real Python, practise at increasing difficulty, and apply learning to agricultural situations.",
      items: ["Interactive", "Visual", "Practice oriented", "Industry focused"],
    },
    workflow: {
      title: "From agricultural data to a farmer decision",
      description: "Follow the role Python plays between field observations and action.",
      steps: [
        { title: "Sensors", description: "Field devices and records capture agricultural observations." },
        { title: "Python", description: "Python organises and processes the incoming information." },
        { title: "Charts", description: "Visual summaries make patterns easier to inspect." },
        { title: "Insights", description: "Agricultural expertise turns patterns into meaning." },
        { title: "Farmer decision", description: "The evidence supports a practical field decision." },
      ],
    },
    agritechExample: {
      title: "A connected farm needs an analytical partner",
      body: "Imagine a farm with 500 sensors, a weather station, drone imagery, soil reports, water-usage records, and crop-production data. Python helps combine those signals so people do not have to inspect every reading manually.",
    },
    playground: {
      title: "Say Hello to Agriculture",
      description: "Run the welcome message, then edit it with a crop name, village, temperature, or farmer name and run it again.",
      starterCode: 'print("🌾 Welcome to Python for Agritech!")\nprint("🚜 Let\'s grow with technology!")',
      expectedOutcome: "The two agricultural welcome messages should appear in the output panel.",
    },
    practice: [
      {
        level: "Easy",
        title: "Personalise the welcome",
        prompt: "Make three small edits to the starter program.",
        guidance: "Change only the message between quotation marks, then run after each edit.",
        activities: ["Modify the welcome message", "Print your favourite crop", "Print your village name"],
      },
      { level: "Medium", title: "Create a farm introduction", prompt: "Display Welcome, Crop, District, and State using four print instructions.", guidance: "Keep one clear message on each line." },
      { level: "Challenge", title: "Build a welcome banner", prompt: "Create an agricultural welcome banner using five print instructions.", guidance: "Plan the reading order before running the program." },
    ],
    quiz: [
      { title: "Question 1", question: "Python is mainly used for", options: ["Cooking", "Programming", "Painting", "Driving"], note: "Correct answer: Programming. Scoring will be enabled by the future quiz engine." },
      { title: "Question 2", question: "DI Notes focuses on", options: ["Reading only", "Practical learning", "Memorising syntax", "Exams only"], note: "Correct answer: Practical learning. Scoring will be enabled by the future quiz engine." },
      { title: "Question 3", question: "Which industry is highlighted throughout this course?", options: ["Agriculture", "Healthcare", "Gaming", "Finance"], note: "Correct answer: Agriculture. Scoring will be enabled by the future quiz engine." },
    ],
    assignment: {
      title: "Research Python in agriculture",
      brief: "Research any one company using Python in agriculture and prepare a short evidence note.",
      deliverables: ["Company name", "The agricultural problem they solve", "How Python is used"],
    },
    summarySection: {
      title: "Your journey has started",
      body: "Python is beginner friendly, powers modern agriculture, and becomes easier through gradual practice. DI Notes combines interaction, practice, and projects so each idea becomes usable knowledge.",
      items: ["Python powers modern agriculture", "DI Notes is interactive", "Practice and projects are essential", "Learning happens gradually"],
    },
    keyTakeaways: ["Learn by doing", "Practice daily", "Do not fear mistakes", "Think logically", "Build confidence"],
    whatsNext: {
      title: "Lesson 0.2 · Why Python?",
      body: "Discover why Python became one of the world's most popular languages, why researchers and AI engineers value it, and why agriculture is adopting it rapidly.",
      items: ["Why researchers love Python", "Why AI engineers use Python", "Why agriculture is adopting Python rapidly"],
    },
    developmentPack: {
      kind: "welcome",
      hero: {
        eyebrow: "Module 0 · Lesson 0.1",
        title: "Welcome to Python for Agritech & Data Science",
        subtitle: "Learn Python from absolute basics and discover how it powers modern agriculture, AI, automation and data science.",
        cta: "Start learning",
        prerequisite: "None",
        visualNodes: [
          { label: "Farmer", icon: "farmer" },
          { label: "Drone", icon: "drone" },
          { label: "Python", icon: "python" },
          { label: "Sensors", icon: "sensor" },
          { label: "Dashboard", icon: "dashboard" },
          { label: "Crop field", icon: "field" },
        ],
      },
      dataStory: {
        title: "Why this course?",
        introduction: "Imagine a modern farm generating thousands of data points every day.",
        signals: ["500 sensors", "Weather station", "Drone images", "Soil reports", "Water usage", "Crop production"],
        question: "Can a farmer manually analyse everything?",
        answer: "No. That is where Python helps.",
        capabilitiesTitle: "Python helps us",
        capabilities: ["Collect data", "Analyse data", "Visualize results", "Build smart systems", "Automate repetitive tasks"],
        industryTitle: "Python is used across modern agriculture",
        industryUses: ["Smart irrigation", "Crop disease detection", "Satellite imaging", "Weather prediction", "Agricultural robotics", "Yield prediction", "Precision farming"],
      },
      didYouKnow: {
        title: "Modern farms create a continuous stream of evidence",
        body: "A connected farm can generate thousands of sensor readings every day. Python helps transform that raw data into decisions about irrigation, fertilization, and crop health.",
      },
      diNotes: {
        title: "Meet DI Notes",
        introduction: "This experience is designed for active learning rather than passive reading.",
        notTitle: "This is not",
        notList: ["A PDF", "A textbook", "A documentation website"],
        isTitle: "This is",
        isList: ["Interactive", "Visual", "Practice oriented", "Industry focused"],
        features: [
          { title: "Learn", description: "Understand concepts easily.", detail: "Begin with a clear explanation connected to an agricultural need.", icon: "learn", href: "#objectives" },
          { title: "Visualize", description: "Watch concepts come alive.", detail: "Use workflows and meaningful motion to see how each step connects.", icon: "visualize", href: "#data-workflow" },
          { title: "Experiment", description: "Run Python instantly.", detail: "Edit safe starter code and observe real Python output in the browser.", icon: "experiment", href: "#playground" },
          { title: "Practice", description: "Solve coding problems.", detail: "Build confidence through easy, medium, and challenge activities.", icon: "practice", href: "#practice" },
          { title: "Challenge", description: "Think like an engineer.", detail: "Predict, test, observe, and improve rather than memorising answers.", icon: "challenge", href: "#practice" },
          { title: "Apply", description: "Solve agricultural problems.", detail: "Connect every technical idea to field, research, or farm decisions.", icon: "apply", href: "#assignment" },
        ],
      },
      learningTimeline: {
        title: "How you will learn",
        description: "Every lesson follows a repeatable path from understanding to application.",
        steps: [
          { title: "Understand", description: "Meet the idea in simple language." },
          { title: "See animation", description: "Watch the relationship between steps." },
          { title: "Watch example", description: "Connect the idea to agriculture." },
          { title: "Run code", description: "Experiment with a working Python example." },
          { title: "Practice", description: "Strengthen the idea through guided tasks." },
          { title: "Quiz", description: "Check the most important understanding." },
          { title: "Assignment", description: "Create a small evidence-based deliverable." },
          { title: "Mini project", description: "Combine capabilities in a meaningful outcome." },
        ],
      },
      companion: {
        title: "Meet your learning companion",
        message: [
          "Do not worry if you have never written a program.",
          "We will build your programming skills step by step.",
          "Every concept starts easy and gradually becomes more advanced.",
          "By the end of the course, you will confidently analyse agricultural datasets using Python.",
        ],
        stages: [
          { title: "Student", description: "Start with curiosity" },
          { title: "Programmer", description: "Express clear instructions" },
          { title: "Engineer", description: "Build reliable workflows" },
          { title: "Data scientist", description: "Turn agricultural data into evidence" },
        ],
      },
      roadmap: {
        title: "Course journey",
        description: "Ten connected modules move from orientation to an applied agritech data-science project.",
        modules: [
          { index: 0, title: "Introduction", description: "Python, agritech, and the learning journey", locked: false },
          { index: 1, title: "Python Fundamentals", description: "The foundational language concepts", locked: true },
          { index: 2, title: "Decision Making & Control Flow", description: "Conditions, branches, and repetition", locked: true },
          { index: 3, title: "Functions", description: "Build reusable and maintainable program behaviour", locked: true },
          { index: 4, title: "Working with Python", description: "Files, packages, and practical workflows", locked: true },
          { index: 5, title: "Object-Oriented Programming", description: "Model related data and behaviour", locked: true },
          { index: 6, title: "NumPy", description: "Scientific and numerical computing", locked: true },
          { index: 7, title: "Pandas", description: "Tabular agricultural data analysis", locked: true },
          { index: 8, title: "Matplotlib", description: "Clear visual communication", locked: true },
          { index: 9, title: "Agritech Data Science Project", description: "Apply the complete evidence workflow", locked: true },
        ],
      },
      platformTour: {
        title: "Platform tour",
        description: "Know where to find the tools that support your learning.",
        features: [
          { title: "Sidebar", description: "Move through the course.", detail: "Open modules and lessons while keeping the current lesson visible.", icon: "sidebar" },
          { title: "Search", description: "Find learning resources.", detail: "Search architecture is ready for lessons, modules, and resources.", icon: "search" },
          { title: "Theme", description: "Choose light or dark mode.", detail: "The global theme follows you throughout the platform.", icon: "theme" },
          { title: "Progress", description: "See your course journey.", detail: "Course progress is calculated from completed lesson status.", icon: "progress" },
          { title: "Playground", description: "Run Python in the browser.", detail: "Edit, run, reset, and inspect output without leaving the lesson.", icon: "playground", href: "#playground" },
          { title: "Notes", description: "Capture important ideas.", detail: "Personal note persistence is planned as a future platform capability.", icon: "notes" },
          { title: "Assignments", description: "Apply your understanding.", detail: "Each lesson concludes with a focused deliverable.", icon: "assignments", href: "#assignment" },
          { title: "Mini projects", description: "Combine course capabilities.", detail: "Projects will connect multiple lessons into meaningful outcomes.", icon: "projects" },
          { title: "Resources", description: "Revisit supporting material.", detail: "The resource library is ready for future references and downloads.", icon: "resources" },
          { title: "Achievements", description: "Recognise meaningful progress.", detail: "Achievement logic will be added with persistent learner profiles.", icon: "achievements" },
        ],
      },
      motivation: {
        title: "Your journey begins today",
        quote: ["Every expert programmer once wrote their first line of code.", "Every AI engineer started with print(\"Hello\")."],
        stages: [
          { title: "Learn", description: "Plant the first seed" },
          { title: "Practice", description: "Nurture understanding" },
          { title: "Build", description: "Grow working capability" },
          { title: "Master", description: "Harvest confident application" },
        ],
      },
    },
  }),
  defineLesson({
    order: 2,
    level: "Beginner",
    title: "Why Python?",
    summary: "Discover why Python became one of the world's most popular programming languages and why it supports AI, data science, automation, IoT, research, and modern agriculture.",
    durationMinutes: 35,
    introduction: {
      title: "A day on a smart farm",
      body: "A 500-acre farm can receive thousands of observations from sensors, weather stations, drones, irrigation systems, and fertilizer recommendations. Python becomes a digital assistant for working with that evidence.",
    },
    objectives: [
      "Explain why Python is one of the world's most popular programming languages",
      "Identify key features that make Python beginner-friendly",
      "Understand Python's role in AI, Data Science, Automation, IoT, and Agriculture",
      "Compare Python with other programming languages at a high level",
      "Write and execute simple print statements confidently",
    ],
    whyThisMatters: {
      title: "Python reduces the distance between a question and an answer",
      body: "Its readable style helps beginners start quickly, while its ecosystem lets the same language grow into automation, analytics, artificial intelligence, and research workflows.",
    },
    industryMotivation: {
      title: "One language connects many industries",
      body: "Python powers work in Artificial Intelligence, Data Science, Machine Learning, Automation, Cloud Computing, and Research. Organisations use it because readable code and a broad ecosystem support collaboration.",
      signal: "Python is approachable enough for a first program and capable enough for advanced scientific and industrial systems.",
    },
    concept: {
      title: "Python is readable, powerful, and widely supported",
      body: "Python combines simple syntax, cross-platform support, a huge community, reusable libraries, and professional adoption across technology and research.",
      items: ["Easy to learn", "Powerful", "Huge community", "Cross platform", "Large library ecosystem", "Industry standard"],
    },
    workflow: {
      title: "A day on a smart farm",
      description: "Watch agricultural observations move through Python to a farmer decision.",
      steps: [
        { title: "Sensors", description: "Soil and equipment sensors generate field observations." },
        { title: "Weather station", description: "Weather conditions update throughout the day." },
        { title: "Drone", description: "Aerial imagery adds crop-health context." },
        { title: "Python", description: "Python reads and organises the incoming information." },
        { title: "Analysis", description: "The workflow searches for patterns and useful changes." },
        { title: "Dashboard", description: "Results are presented in a form people can inspect." },
        { title: "Farmer decision", description: "The farmer combines evidence with agricultural judgement." },
      ],
    },
    agritechExample: {
      title: "Python across the farm ecosystem",
      body: "Python supports precision farming, smart irrigation, drone monitoring, weather forecasting, yield prediction, and soil analysis by connecting observations with repeatable analytical workflows.",
    },
    playground: {
      title: "Your first Python commands",
      description: "Run the four print instructions, then edit the crop name and displayed values before running the program again.",
      starterCode: 'print("🌾 Welcome to Python!")\nprint("Crop : Rice")\nprint("Temperature : 32°C")\nprint("Soil Moisture : 45%")',
      expectedOutcome: "Four agricultural messages should appear in the same order as the code.",
    },
    practice: [
      { level: "Easy", title: "Introduce yourself and your location", prompt: "Use print instructions to display three personal agricultural messages.", guidance: "Keep quotation marks around each message.", activities: ["Print your name", "Print your favourite crop", "Print your district"] },
      { level: "Medium", title: "Display a farm profile", prompt: "Display Farm Name, Crop, Village, and State using four print instructions.", guidance: "Use one print instruction for each line of the profile." },
      { level: "Challenge", title: "Create a smart-farm welcome board", prompt: "Design a clear welcome board using several print instructions and agricultural details.", guidance: "Plan the message order so it reads like a useful farm display." },
    ],
    quiz: [
      { title: "Question 1", question: "Which language is highlighted as beginner-friendly?", options: ["Python", "Assembly", "Machine code", "None"], note: "Correct answer: Python." },
      { title: "Question 2", question: "Which language is widely used in AI?", options: ["Python", "HTML only", "CSS only", "No programming language"], note: "Correct answer: Python." },
      { title: "Question 3", question: "Python is popular because it is", options: ["Readable and powerful", "Available on one computer", "Designed only for games", "Closed to the community"], note: "Correct answer: Readable and powerful." },
      { title: "Question 4", question: "Python can support agriculture by", options: ["Analysing sensor and field data", "Replacing soil", "Creating rainfall", "Removing crop expertise"], note: "Correct answer: Analysing sensor and field data." },
      { title: "Question 5", question: "Python runs on", options: ["Windows, macOS, and Linux", "Windows only", "Mobile phones only", "Weather stations only"], note: "Correct answer: Windows, macOS, and Linux." },
      { title: "Question 6", question: "Which is part of Python's library ecosystem?", options: ["NumPy", "A tractor engine", "A soil sample", "A rainfall gauge"], note: "Correct answer: NumPy." },
      { title: "Question 7", question: "What does print help a beginner do?", options: ["Display a message", "Install a sensor", "Predict weather automatically", "Create a variable"], note: "Correct answer: Display a message." },
      { title: "Question 8", question: "Which smart-farm source can Python help process?", options: ["Drone images", "Soil moisture readings", "Weather updates", "All of these"], note: "Correct answer: All of these." },
      { title: "Question 9", question: "Python should replace a farmer's judgement", options: ["False", "True", "Always", "Only without data"], note: "Correct answer: False." },
      { title: "Question 10", question: "Why does community support matter?", options: ["It provides shared tools and learning resources", "It makes code unreadable", "It limits Python to one industry", "It prevents collaboration"], note: "Correct answer: It provides shared tools and learning resources." },
    ],
    assignment: {
      title: "Research Python in industry",
      brief: "Research any two companies using Python and prepare a short comparison of their work.",
      deliverables: ["Company names", "The problem each company solves", "How Python is used by each company"],
    },
    summarySection: { title: "Python is easy, powerful, and future-ready", body: "Python is beginner-friendly, cross-platform, supported by a large community, and used as an industry standard. Agriculture increasingly depends on Python for automation and analytics.", items: ["Easy", "Powerful", "Beginner-friendly", "Industry standard", "Future-ready"] },
    keyTakeaways: ["Python solves real-world problems", "Python is a preferred language for AI and Data Science", "Python is transforming modern agriculture", "Python opens opportunities in research, automation, and analytics"],
    whatsNext: { title: "Lesson 0.3 · Python in Agritech", body: "Explore real-world agricultural applications and workflows where Python connects field evidence with action.", items: ["Smart irrigation", "Precision farming", "Drone analytics", "Crop disease detection", "Weather prediction", "IoT-based agriculture"] },
    developmentPack: whyPythonDevelopmentPack,
  }),
  defineLesson({
    order: 3,
    title: "Python in Agritech",
    summary: "Explore where Python contributes across agricultural sensing, research, operations, and decision-support workflows.",
    durationMinutes: 30,
    introduction: {
      title: "Agritech connects fields, data, and decisions",
      body: "Python often works behind the scenes, connecting observations from agricultural environments with repeatable processing and human interpretation.",
    },
    objectives: ["Identify common sources of agricultural data", "Map Python to stages of an agritech workflow", "Recognise the continuing role of agricultural expertise"],
    whyThisMatters: {
      title: "Context determines whether analysis is useful",
      body: "A technically correct result can still be misleading if field conditions, collection methods, or operational constraints are ignored. Agritech work requires code and domain knowledge to operate together.",
    },
    industryMotivation: {
      title: "Modern farms produce connected evidence",
      body: "Weather stations, soil sensors, drones, field observations, machinery, and farm records can contribute different parts of the same story. Python helps teams bring those parts into a traceable workflow.",
      signal: "The value comes from turning observations into decisions—not from collecting more data alone.",
    },
    concept: {
      title: "Four roles Python can play",
      body: "Python can help acquire or receive data, prepare it for use, analyse patterns, and communicate findings. These roles form a pipeline, but people define the question and evaluate the result.",
      items: ["Receive observations", "Prepare reliable data", "Analyse evidence", "Communicate findings"],
    },
    workflow: {
      title: "An agritech data journey",
      description: "Follow a soil-monitoring observation from the field to a faculty decision.",
      steps: [
        { title: "Sense", description: "A field sensor records a soil condition at a known location and time." },
        { title: "Prepare", description: "The team checks identity, completeness, units, and context." },
        { title: "Interpret", description: "Python supports an analysis connected to the agronomic question." },
        { title: "Decide", description: "Faculty interpret the evidence and choose an appropriate response." },
      ],
    },
    agritechExample: {
      title: "A soil sensor is one part of the evidence",
      body: "A low soil-moisture reading may prompt inspection, but its meaning depends on crop stage, recent rainfall, sensor placement, soil characteristics, and the reliability of the device.",
    },
    playground: {
      title: "Describe an agritech workflow",
      description: "Run this simple status report, then replace the sensor and decision messages with another agricultural workflow.",
      starterCode: 'print("Source: soil moisture sensor")\nprint("Context: demonstration plot")\nprint("Decision: inspect field conditions")',
      expectedOutcome: "Three workflow messages should appear from source to decision.",
    },
    practice: [
      { level: "Easy", title: "Name data sources", prompt: "List three sources of agricultural data mentioned in this lesson.", guidance: "Look beyond sensors to observations, machinery, and records." },
      { level: "Medium", title: "Map the pipeline", prompt: "Choose one farm observation and map it through sense, prepare, interpret, and decide.", guidance: "Keep each stage to one clear sentence." },
      { level: "Challenge", title: "Add context", prompt: "Explain what contextual information is needed before acting on one sensor reading.", guidance: "Consider location, time, crop stage, weather, and device reliability." },
    ],
    quiz: {
      title: "Agritech workflow check",
      question: "Who should interpret a Python-supported agricultural result?",
      options: ["The computer alone", "A domain-informed person or team", "The sensor manufacturer only", "No interpretation is necessary"],
      note: "Selection and feedback behaviour will be enabled with the future quiz engine.",
    },
    assignment: {
      title: "Sketch an agritech evidence chain",
      brief: "Choose one agricultural decision and describe the data sources, processing stages, human expertise, and expected outcome involved.",
      deliverables: ["One decision question", "At least two relevant data sources", "A four-stage workflow", "One contextual risk to check"],
    },
    summarySection: { title: "Python supports the evidence chain", body: "In agritech, Python can connect diverse observations to analysis and communication. Domain experts remain responsible for asking useful questions and interpreting results responsibly." },
    keyTakeaways: ["Agricultural data comes from many connected sources", "Python can support each stage from preparation to communication", "Context and domain expertise give results meaning"],
    whatsNext: { title: "Next: prepare a place to run Python", body: "The next lesson explains the parts of a Python setup and how to confirm that an environment is ready." },
  }),
  defineLesson({
    order: 4,
    title: "Setting Up Python",
    summary: "Understand the parts of a Python working environment and choose a setup path without being overwhelmed by tools.",
    durationMinutes: 30,
    introduction: {
      title: "An environment is simply a place to work",
      body: "To use Python, you need a Python runtime that understands instructions and an editor or notebook where you write them. This platform already provides a browser playground for the first experiments.",
    },
    objectives: ["Distinguish the Python runtime from an editor", "Recognise common environment choices", "Use a simple readiness check before beginning work"],
    whyThisMatters: {
      title: "A stable setup protects learning time",
      body: "Many beginners mistake setup problems for programming problems. Understanding the small number of moving parts makes troubleshooting calmer and more systematic.",
    },
    industryMotivation: {
      title: "Shared environments improve reproducibility",
      body: "When a team records how Python and project tools are configured, colleagues can reproduce the same workflow more reliably across teaching, research, and field projects.",
      signal: "Choose the simplest environment that supports the current task; complexity can be added later when it earns its place.",
    },
    concept: {
      title: "The three parts of a basic setup",
      body: "The runtime executes Python, the editor holds the instructions, and the project location keeps related work organised. A notebook combines editing and visible output; a code editor supports broader project workflows.",
      items: ["Runtime: understands and executes Python", "Editor or notebook: where instructions are written", "Project location: where related work is organised"],
    },
    workflow: {
      title: "A calm setup sequence",
      description: "Use the same checks whether you work in a browser, notebook, or local editor.",
      steps: [
        { title: "Choose", description: "Select the simplest environment appropriate for the learning task." },
        { title: "Open", description: "Start the editor or notebook and identify where code will be written." },
        { title: "Verify", description: "Run one small message to confirm Python responds." },
        { title: "Organise", description: "Keep course work in a clearly named project location." },
      ],
    },
    agritechExample: {
      title: "A shared teaching-lab setup",
      body: "Before a sensor-data workshop, faculty can verify every workstation with the same short program. Resolving environment issues before the activity keeps attention on the agricultural question.",
    },
    playground: {
      title: "Verify this browser environment",
      description: "Run the readiness check. If the message appears, the embedded Python runtime is working.",
      starterCode: 'print("Python environment: ready")\nprint("Project: agritech learning lab")',
      expectedOutcome: "The output should confirm that Python and the learning project are ready.",
    },
    practice: [
      { level: "Easy", title: "Match the parts", prompt: "Explain the difference between a Python runtime and an editor.", guidance: "One executes instructions; the other is where you write them." },
      { level: "Medium", title: "Choose an environment", prompt: "Select a browser playground, notebook, or code editor for a first faculty workshop and justify the choice.", guidance: "Prioritise the learning goal and setup effort." },
      { level: "Challenge", title: "Plan a lab check", prompt: "Write a short pre-workshop checklist for confirming that several computers are ready.", guidance: "Include opening, running, observing, and organising." },
    ],
    quiz: {
      title: "Environment check",
      question: "What does the Python runtime do?",
      options: ["Stores field sensors", "Executes Python instructions", "Designs the course interface", "Replaces the project folder"],
      note: "This is the final quiz-card structure only; answer evaluation is intentionally out of scope.",
    },
    assignment: {
      title: "Document your learning environment",
      brief: "Create a short setup note that another faculty member could follow before joining a Python session.",
      deliverables: ["Chosen environment", "Where code will be written", "A readiness check", "Where course files will be organised"],
    },
    summarySection: { title: "A setup has understandable parts", body: "A Python environment combines a runtime, a place to write code, and an organised project location. Begin simply and verify the environment with a small, visible result." },
    keyTakeaways: ["The runtime and editor have different responsibilities", "A browser playground is enough for early experiments", "A repeatable readiness check prevents avoidable disruption"],
    whatsNext: { title: "Next: write and run a first program", body: "With the environment understood, the next lesson focuses on creating a small sequence of Python instructions and reading its output." },
  }),
  defineLesson({
    order: 5,
    title: "Writing Your First Python Program",
    summary: "Write a small agricultural status program, run it, observe the output, and learn a dependable edit–run–observe cycle.",
    durationMinutes: 35,
    introduction: {
      title: "A program can begin with one clear instruction",
      body: "Your first program does not need calculations or complex rules. It only needs a purposeful instruction, a working runtime, and an observable result.",
    },
    objectives: ["Recognise a Python program as an ordered set of instructions", "Run a program and inspect its output", "Use the edit–run–observe cycle when experimenting"],
    whyThisMatters: {
      title: "Running code turns reading into understanding",
      body: "The moment you edit an instruction and observe a changed result, Python becomes an interactive tool rather than text on a page. That feedback loop powers every later lesson.",
    },
    industryMotivation: {
      title: "Small checks support reliable systems",
      body: "Agritech workflows often begin with simple status messages that confirm a service, sensor connection, or processing stage has started correctly before more complex work proceeds.",
      signal: "A visible result is evidence that the instruction reached the runtime and executed.",
    },
    concept: {
      title: "Meet the print instruction",
      body: "In this lesson, print asks Python to display a message in the output panel. Python reads the instructions from top to bottom, so the order of the code is reflected in the order of the messages.",
      items: ["Write a print instruction", "Place the message inside quotation marks", "Run the program", "Read the output in sequence"],
    },
    workflow: {
      title: "The edit–run–observe cycle",
      description: "Use this cycle whenever you experiment with a small program.",
      steps: [
        { title: "Read", description: "Predict what the current instructions will display." },
        { title: "Edit", description: "Change one message so the effect is easy to identify." },
        { title: "Run", description: "Send the complete program to the Python runtime." },
        { title: "Observe", description: "Compare the output with your prediction and revise if needed." },
      ],
    },
    agritechExample: {
      title: "A field-monitoring startup message",
      body: "A short program can communicate which farm workflow is starting and what should happen next. Clear status messages help people understand a process before data analysis begins.",
    },
    playground: {
      title: "Run your first agritech Python program",
      description: "Predict the output, run the program, then change one message and run it again.",
      starterCode: 'print("Farm monitoring system ready")\nprint("Sensor check scheduled for Field A")\nprint("Waiting for field observations")',
      expectedOutcome: "Three messages should appear in the same top-to-bottom order as the program.",
    },
    practice: [
      { level: "Easy", title: "Change one message", prompt: "Replace Field A with the name of a demonstration plot and run the program.", guidance: "Keep the quotation marks around the message." },
      { level: "Medium", title: "Add a status line", prompt: "Add another print instruction describing a rainfall observation step.", guidance: "Place it where you want the message to appear in the output." },
      { level: "Challenge", title: "Design a clear sequence", prompt: "Create four status messages for the start of a crop-monitoring workflow.", guidance: "Make the order meaningful from preparation to observation." },
    ],
    quiz: {
      title: "First-program check",
      question: "What should you do after editing a Python message?",
      options: ["Assume the change worked", "Run the program and observe the output", "Close the environment", "Remove the quotation marks"],
      note: "Interactive answer evaluation will be added by the future quiz engine.",
    },
    assignment: {
      title: "Create a field-workflow status program",
      brief: "Write a small program that displays a clear sequence of messages for the beginning of an agricultural observation activity.",
      deliverables: ["A descriptive first message", "At least three ordered print instructions", "Output that matches the intended sequence", "One edited and rerun version"],
    },
    summarySection: { title: "You have completed the full coding loop", body: "You wrote Python instructions, sent them to a real runtime, and used output as feedback. The same edit–run–observe cycle will support every later coding concept." },
    keyTakeaways: ["Python executes the program in sequence", "Print makes a result visible in the output panel", "Small edits and immediate feedback build dependable understanding"],
    whatsNext: { title: "Next: connect this first program to the full roadmap", body: "The final Module 0 lesson shows how foundational Python grows into scientific computing, data analysis, visualisation, and an applied agritech project." },
  }),
  defineLesson({
    order: 6,
    title: "Course Roadmap",
    summary: "Connect each stage of the course to the agricultural data journey and prepare to begin Python Fundamentals.",
    durationMinutes: 20,
    introduction: {
      title: "The course grows in deliberate layers",
      body: "Every later capability depends on a smaller idea introduced earlier. The roadmap keeps those dependencies visible so the learning path feels connected rather than fragmented.",
    },
    objectives: ["Describe the major stages of the course", "Connect each stage to an agricultural data workflow", "Identify the immediate next learning step"],
    whyThisMatters: {
      title: "A roadmap gives technical detail a purpose",
      body: "Foundational ideas are easier to learn when you can see where they lead. The course sequence moves from communicating instructions to analysing and presenting agricultural evidence.",
    },
    industryMotivation: {
      title: "Real projects combine many small capabilities",
      body: "An agritech analysis may require organised code, reliable numerical work, careful tabular preparation, and clear visual communication. The course builds these capabilities separately before combining them.",
      signal: "The final project is a synthesis of the learning path, not a disconnected activity.",
    },
    concept: {
      title: "Five stages of growth",
      body: "The ten modules form five broad stages: orientation, Python foundations, structured programming, data-science tools, and an applied agritech project.",
      items: ["Orient to the tool and domain", "Build Python foundations", "Organise programs and workflows", "Analyse and visualise data", "Apply the complete process"],
    },
    workflow: {
      title: "The course-to-project journey",
      description: "See how the learning stages combine into an applied capability.",
      steps: [
        { title: "Foundations", description: "Learn to express, organise, and reason about Python instructions." },
        { title: "Scientific tools", description: "Use purpose-built tools for numerical and tabular data." },
        { title: "Communication", description: "Turn analysis into clear visual evidence." },
        { title: "Application", description: "Combine the complete workflow in an agritech project." },
      ],
    },
    agritechExample: {
      title: "The journey of a crop-performance question",
      body: "A question about crop performance can grow from simple Python instructions into organised field records, numerical comparison, tabular analysis, visual evidence, and a documented project recommendation.",
    },
    playground: {
      title: "Print your personal roadmap",
      description: "Run the roadmap, then edit the final line to describe the agritech capability you want to build.",
      starterCode: 'print("Stage 1: Python foundations")\nprint("Stage 2: Data science tools")\nprint("Stage 3: Agritech evidence project")\nprint("My destination: confident agricultural data analysis")',
      expectedOutcome: "Four roadmap messages should appear, ending with your personal destination.",
    },
    practice: [
      { level: "Easy", title: "Order the stages", prompt: "Place foundations, scientific tools, communication, and application in course order.", guidance: "Use the visual workflow above." },
      { level: "Medium", title: "Connect a module", prompt: "Choose one future course stage and explain how it contributes to an agricultural evidence workflow.", guidance: "Describe its purpose without explaining its technical concepts." },
      { level: "Challenge", title: "Plan for transfer", prompt: "Identify how you could share one course capability with colleagues or learners after completing the pathway.", guidance: "Connect the capability to a real teaching or research context." },
    ],
    quiz: {
      title: "Roadmap check",
      question: "Why are the course capabilities introduced in layers?",
      options: ["Each stage prepares knowledge needed by later work", "The stages are unrelated", "Only the final module matters", "Agricultural context is added after the course"],
      note: "The quiz engine will later manage responses, feedback, and completion state.",
    },
    assignment: {
      title: "Create a personal course roadmap",
      brief: "Connect your agricultural data question from Lesson 0.1 to the course stages that will help you investigate it.",
      deliverables: ["Your original agricultural question", "A relevant capability from each broad stage", "A final evidence-based outcome", "One action for beginning Module 1"],
    },
    summarySection: { title: "Module 0 is complete", body: "You understand why Python was selected, where it supports agritech, what a working environment contains, how to run a first program, and how the rest of the course builds toward an applied project." },
    keyTakeaways: ["The course progresses from foundations to application", "Every technical stage connects to agricultural evidence", "Your next step is Python Fundamentals"],
    whatsNext: { title: "Next: Module 1 · Python Fundamentals", body: "The course framework is ready for the next module. Module 1 content will be implemented in a future phase." },
  }),
];

export const moduleZeroLessonSummaries = moduleZeroLessons.map((lesson, index) => ({
  id: lesson.id,
  moduleId: lesson.moduleId,
  order: index + 1,
  title: `${lesson.number} ${lesson.title}`,
  estimatedMinutes: lesson.durationMinutes,
  status: index < 2 ? "completed" as const : index === 2 ? "in-progress" as const : "not-started" as const,
  isPlaceholder: false,
}));

export function getModuleZeroLesson(lessonId: string) {
  return moduleZeroLessons.find((lesson) => lesson.id === lessonId) ?? null;
}
