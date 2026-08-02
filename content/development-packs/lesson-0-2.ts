import type { WhyPythonDevelopmentPack } from "@/types/content";

export const whyPythonDevelopmentPack: WhyPythonDevelopmentPack = {
  kind: "why-python",
  prerequisite: "Lesson 0.1",
  story: {
    title: "Imagine managing a 500-acre smart farm",
    body: "Every morning, information arrives from across the farm. Together, those observations create thousands of data points that would be impractical to calculate manually.",
    signals: [
      "Soil moisture from 500 sensors",
      "Weather updates every 15 minutes",
      "Drone images of crop health",
      "Irrigation tank levels",
      "Daily fertilizer recommendations",
    ],
    question: "Would you calculate all of this manually?",
    answer: "No. Python becomes your digital assistant—reading data, processing information, finding patterns, creating graphs, and supporting better farming decisions.",
  },
  definition: {
    title: "What is Python?",
    body: "Python is a high-level, easy-to-read programming language used to build software, automate repetitive work, analyze data, create Artificial Intelligence applications, develop websites, and solve real-world problems.",
    items: ["Build software", "Automate work", "Analyze data", "Create AI applications", "Solve real-world problems"],
    workflow: {
      title: "From instruction to outcome",
      description: "Select a step to see how a Python instruction moves from an idea to a useful result.",
      steps: [
        { title: "Python", description: "A readable way for people to express instructions." },
        { title: "Programming language", description: "A structured language with rules the runtime can interpret." },
        { title: "Computer understands", description: "The Python runtime translates the instructions into work." },
        { title: "Problem solved", description: "The program produces a useful result for a real need." },
      ],
    },
  },
  didYouKnow: {
    title: "Python began more than three decades ago",
    body: "Python was created by Guido van Rossum and first released in 1991. Its emphasis on readable code helped it grow across education, research, software, automation, and data science.",
  },
  popularity: {
    title: "Why is Python so popular?",
    description: "Select each feature to see why Python works well for beginners and professional teams.",
    features: [
      { title: "Easy to learn", description: "Simple, readable syntax.", detail: "Python code often reads like clear English, allowing beginners to concentrate on the problem rather than visual complexity.", icon: "learn" },
      { title: "Powerful", description: "Build many kinds of systems.", detail: "Python supports AI, robots, websites, games, dashboards, automation, and scientific research.", icon: "challenge" },
      { title: "Huge community", description: "Millions of developers.", detail: "A global open-source community creates tutorials, answers questions, and maintains reusable tools.", icon: "farmer" },
      { title: "Cross platform", description: "Works across major systems.", detail: "Python runs on Windows, macOS, and Linux, making workflows easier to share across teams.", icon: "dashboard" },
      { title: "Library ecosystem", description: "Purpose-built open tools.", detail: "Libraries such as NumPy, Pandas, Matplotlib, TensorFlow, and OpenCV extend Python for specialised work.", icon: "resources" },
      { title: "Industry standard", description: "Used across major organisations.", detail: "Technology, research, cloud, AI, and engineering teams use Python because it is capable and widely supported.", icon: "achievements" },
    ],
  },
  agritech: {
    title: "Why Agritech loves Python",
    description: "Explore the farm system to see where Python contributes.",
    applications: [
      { title: "Precision farming", description: "Connect field observations.", detail: "Python receives information from IoT sensors and helps combine it with field context.", icon: "sensor" },
      { title: "Smart irrigation", description: "Support water decisions.", detail: "Python can process soil and weather observations to support decisions about when irrigation should start.", icon: "field" },
      { title: "Drone monitoring", description: "Inspect crop imagery.", detail: "Python-based image workflows can help teams identify crop-health patterns in drone observations.", icon: "drone" },
      { title: "Weather forecasting", description: "Explore rainfall trends.", detail: "Python helps organise historical and current weather observations for forecasting workflows.", icon: "dashboard" },
      { title: "Yield prediction", description: "Estimate crop production.", detail: "Python can connect historical field evidence with analytical models that estimate production.", icon: "apply" },
      { title: "Soil analysis", description: "Understand field conditions.", detail: "Python helps analyse soil pH, moisture, and nutrient observations in one repeatable workflow.", icon: "learn" },
    ],
  },
  everywhere: {
    title: "Python everywhere",
    description: "Python connects global technology, research, media, cloud, AI, and agriculture communities.",
    organizations: [
      { name: "Google", context: "Software, automation, and AI" },
      { name: "NASA", context: "Scientific and research workflows" },
      { name: "Netflix", context: "Data and platform automation" },
      { name: "IBM", context: "Enterprise AI and cloud computing" },
      { name: "OpenAI", context: "Artificial intelligence research" },
      { name: "Agriculture", context: "Sensors, analytics, automation, and decisions" },
    ],
  },
  comparison: {
    title: "Python vs other languages",
    description: "Use the minimum-fit slider to reveal which language remains a strong match as your priority increases.",
    note: "This comparison is an orientation aid, not a universal ranking. The best language depends on the problem and environment.",
    rows: [
      { feature: "Easy to learn", python: 5, c: 2, java: 3 },
      { feature: "Readability", python: 5, c: 2, java: 3 },
      { feature: "AI", python: 5, c: 1, java: 3 },
      { feature: "Data science", python: 5, c: 1, java: 2 },
      { feature: "Agriculture", python: 5, c: 1, java: 3 },
    ],
  },
  engineerScenario: {
    title: "Think like an engineer",
    scenario: "A farmer receives updated weather information every hour and needs a reliable way to review changes before making field decisions.",
    question: "How can Python help?",
    options: [
      { label: "Ignore most updates and check once a month", explanation: "This loses the timely evidence needed for weather-sensitive decisions.", recommended: false },
      { label: "Read, organise, and summarise each update automatically", explanation: "This creates a repeatable workflow while keeping the farmer responsible for the final decision.", recommended: true },
      { label: "Replace the farmer's judgement completely", explanation: "Python supports decisions; it does not replace agricultural context or human responsibility.", recommended: false },
      { label: "Print every update without organising it", explanation: "Displaying raw information alone does not make it easier to interpret patterns or changes.", recommended: false },
    ],
  },
};
