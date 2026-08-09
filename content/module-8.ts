import { matplotlibBasicsDevelopmentPack } from "@/content/development-packs/lesson-8-1";
import type { LessonDocument } from "@/types/content";

export const moduleEightLessons: LessonDocument[] = [{
  id: "module-8-lesson-1", moduleId: "module-8", number: "8.1", title: "Introduction to Data Visualization + Matplotlib Basics", durationMinutes: 150, level: "Intermediate",
  summary: "Turn Smart Farm measurements into readable line charts while learning pyplot, Figure and Axes, labels, legends, grids, markers, saving, and the basic plotting workflow.",
  introduction: { title: "A chart makes a pattern inspectable", body: "Tables preserve exact values, but a chart lets position and direction reveal a trend quickly. Visualization helps analysts notice patterns, compare behavior, and communicate evidence without replacing careful reasoning." },
  objectives: ["Explain why data visualization matters", "Describe the role of Matplotlib", "Import matplotlib.pyplot as plt", "Create a basic line plot", "Map x and y data correctly", "Add a title and axis labels", "Use grids, markers, and line styles", "Create labels and a legend", "Distinguish Figure from Axes", "Compare pyplot and object-oriented styles", "Save a high-quality chart", "Close a completed Figure", "Follow a repeatable plotting workflow"],
  whyThisMatters: { title: "Visual patterns guide better analytical questions", body: "A temperature sequence may look like a list of measurements. A line chart makes the peak, decline, and rate of change visible, helping a farm analyst ask what environmental or operational event caused the pattern.", items: ["Reveal trends over time", "Compare repeated measurements", "Spot unusual changes", "Communicate evidence clearly"] },
  industryMotivation: { title: "Clear charts shorten the path from measurement to action", body: "Farm teams use visual trends to monitor climate, moisture, irrigation, energy, and yield. Responsible charts preserve units, label context, and choose a form that matches the question.", items: ["Titles state the analytical subject", "Axes establish variables and units", "Legends identify multiple series", "Saved figures support reports and presentations"], signal: "Question → data → chart form → labels and units → inspect → communicate." },
  concept: { title: "Matplotlib separates the canvas from the plotting area", body: "The Figure is the overall canvas. An Axes is the plotting area that owns its x-axis, y-axis, title, and plotted marks. pyplot offers a concise stateful interface; the object-oriented API makes that structure explicit.", items: ["Figure: complete visual canvas", "Axes: one plotting region", "plot(): line from x/y pairs", "show(): display the completed chart", "savefig(): export the Figure", "close(): release it"] },
  workflow: { title: "A basic Matplotlib workflow", description: "Build meaning before decoration.", steps: [
    { title: "Question", description: "Decide which trend or comparison matters." }, { title: "Data", description: "Prepare compatible x and y values with clear units." },
    { title: "Plot", description: "Create a Figure/Axes and draw the line." }, { title: "Context", description: "Add a title, labels, legend, and useful grid." },
    { title: "Inspect", description: "Check scale, readability, and interpretation." }, { title: "Output", description: "Show or save, then close when appropriate." },
  ] },
  agritechExample: { title: "Weekly farm temperature", body: "Seven daily readings rise from 25°C to a peak of 32°C on Day 5, then decline. The line chart makes the peak immediately visible while the labeled axes preserve its meaning." },
  playground: {
    title: "Run a Complete Matplotlib Figure Workflow",
    description: "Create a labeled Figure and Axes, style the weekly temperature line, save a high-resolution PNG in memory, inspect the chart structure, and close the Figure.",
    starterCode: `import io
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

days = [1, 2, 3, 4, 5, 6, 7]
temperature = [25, 27, 28, 30, 32, 31, 29]

fig, ax = plt.subplots()
ax.plot(
    days,
    temperature,
    marker="o",
    linestyle="-",
    label="Temperature"
)
ax.set_title("Weekly Farm Temperature")
ax.set_xlabel("Day")
ax.set_ylabel("Temperature (°C)")
ax.grid(True)
ax.legend()

png = io.BytesIO()
fig.savefig(png, format="png", dpi=300, bbox_inches="tight")

print("Title:", ax.get_title())
print("X label:", ax.get_xlabel())
print("Y label:", ax.get_ylabel())
print("Lines:", len(ax.lines))
print("Points:", len(ax.lines[0].get_xdata()))
print("Peak day:", days[temperature.index(max(temperature))])
print("Saved PNG bytes:", len(png.getvalue()))

plt.close(fig)
print("Figure closed:", not plt.fignum_exists(fig.number))`,
    expectedOutcome: "The runner loads Matplotlib, confirms the title and axes labels, reports one seven-point line, identifies Day 5 as the peak, creates a non-empty PNG, and closes the Figure.",
  },
  practice: [
    { level: "Easy", title: "First temperature line", prompt: "Plot daily temperature against day and display the chart.", guidance: "Import pyplot, call plot(days, temperature), then show()." },
    { level: "Easy", title: "Add context", prompt: "Add a title, x label, y label, and grid.", guidance: "Include units in the y-axis label." },
    { level: "Medium", title: "Moisture markers", prompt: "Plot seven soil-moisture readings with circle markers.", guidance: "Use marker='o' and label the percentage unit." },
    { level: "Medium", title: "Compare two fields", prompt: "Plot temperature for Field A and Field B with distinct labels and markers.", guidance: "Call plot twice and add legend()." },
    { level: "Medium", title: "Line styling", prompt: "Create a dashed line with square markers and a readable grid.", guidance: "Use linestyle='--' and marker='s'." },
    { level: "Medium", title: "Object-oriented rewrite", prompt: "Rewrite a pyplot chart using fig, ax = plt.subplots().", guidance: "Move title and label calls onto ax." },
    { level: "Challenge", title: "High-quality export", prompt: "Save the weekly temperature Figure as a 300-DPI PNG without excess whitespace.", guidance: "Use savefig before close()." },
    { level: "Challenge", title: "Environmental visual", prompt: "Create a clearly labeled weekly chart demonstrating temperature and soil-moisture series, then explain the unit limitation.", guidance: "Use a legend, but do not treat °C and % as directly comparable." },
  ],
  quiz: [
    { title: "Import", question: "What is the standard pyplot import?", options: ["import matplotlib.pyplot as plt", "import matplotlib as pd", "from plotly import plt", "import pyplot as np"], correctOptionIndex: 0, note: "pyplot is conventionally plt.", explanation: "Most introductory plotting functions are accessed through plt." },
    { title: "Line", question: "Which call plots y against x?", options: ["plt.plot(x, y)", "plt.grid(x, y)", "plt.title(x, y)", "plt.close(x, y)"], correctOptionIndex: 0, note: "x comes first.", explanation: "plot receives compatible x and y sequences." },
    { title: "Lengths", question: "What must be true of simple x and y lists?", options: ["They need matching lengths", "They must use different units", "They must be strings", "They must be sorted descending"], correctOptionIndex: 0, note: "One x for every y.", explanation: "Each point needs both coordinates." },
    { title: "Grid", question: "Why add a grid?", options: ["To estimate values more easily", "To load Matplotlib", "To create a legend", "To close a Figure"], correctOptionIndex: 0, note: "Reading aid.", explanation: "Grid lines help relate marks to axis values." },
    { title: "Legend", question: "What enables a useful legend entry?", options: ["label= on the plotted series", "dpi=300", "plt.close()", "bbox_inches"], correctOptionIndex: 0, note: "Name each series.", explanation: "legend displays labels supplied by plotted artists." },
    { title: "Figure", question: "What is the Figure?", options: ["The overall canvas", "Only the x-axis", "A line marker", "The dataset"], correctOptionIndex: 0, note: "Container for Axes.", explanation: "A Figure can contain one or more Axes." },
    { title: "Axes", question: "Which object owns set_title and set_xlabel?", options: ["Axes", "Python list", "Legend label", "PNG file"], correctOptionIndex: 0, note: "Object-oriented API.", explanation: "Axes methods configure one plotting area." },
    { title: "Save", question: "What does dpi primarily influence?", options: ["Output resolution", "Data values", "Legend labels", "List length"], correctOptionIndex: 0, note: "Image quality.", explanation: "Higher DPI writes more pixels per inch." },
    { title: "Close", question: "Why call plt.close() in repeated generation workflows?", options: ["Release completed Figures", "Add a title", "Change the marker", "Display the chart"], correctOptionIndex: 0, note: "Lifecycle management.", explanation: "Closing prevents unused Figures from accumulating." },
    { title: "Units", question: "What is the main caution when plotting temperature and moisture together?", options: ["Their different units are not directly comparable", "A legend cannot have two items", "Lines cannot use markers", "Matplotlib supports one list only"], correctOptionIndex: 0, note: "Interpret scales responsibly.", explanation: "Multiple series syntax does not solve unit compatibility." },
  ],
  assignment: { title: "Weekly Smart Farm Trend Figure", brief: "Build a readable Matplotlib Figure that communicates one weekly farm trend and can be exported for a report.", deliverables: ["Seven compatible x/y values", "Figure and Axes", "Line and markers", "Descriptive title", "Axis labels with units", "Grid", "Legend", "Peak interpretation", "300-DPI export", "Figure close", "One chart-choice justification"] },
  summarySection: { title: "You can now turn farm measurements into a complete Matplotlib line chart", body: "You mapped compatible x and y values, created pyplot and object-oriented plots, added communication context, explored markers and line styles, exported a Figure, and recognized common chart mistakes.", items: ["Data precedes the chart", "Figure contains Axes", "plot maps x to y", "Titles and labels preserve meaning", "Legends identify series", "Grid lines aid reading", "savefig exports", "close manages completed Figures"] },
  keyTakeaways: ["Visualization supports questions, not automatic conclusions", "Use line charts for ordered trends", "Match x and y lengths", "Always label variables and units", "A Figure can contain several Axes", "The object-oriented API scales well", "Legends require series labels", "Do not compare unlike units casually", "Save before closing", "Choose the chart from the analytical question"],
  whatsNext: { title: "Lesson 8.2 · Line, Bar, Scatter & Area Charts", body: "Next, choose among four foundational chart types to communicate trends, categories, relationships, and cumulative change." },
  developmentPack: matplotlibBasicsDevelopmentPack,
}];

export const moduleEightLessonSummaries = [
  { id: "module-8-lesson-1", moduleId: "module-8", order: 1, title: "8.1 Introduction to Data Visualization + Matplotlib Basics", estimatedMinutes: 150, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-8-lesson-2", moduleId: "module-8", order: 2, title: "8.2 Line, Bar, Scatter & Area Charts", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-3", moduleId: "module-8", order: 3, title: "8.3 Histograms, Box Plots & Distribution Analysis", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-4", moduleId: "module-8", order: 4, title: "8.4 Customization, Labels, Legends, Subplots & Styling", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-5", moduleId: "module-8", order: 5, title: "8.5 Plotly Fundamentals + Interactive Charts", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-6", moduleId: "module-8", order: 6, title: "8.6 Plotly Bar, Line, Scatter, Histogram & Box Charts", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-7", moduleId: "module-8", order: 7, title: "8.7 Interactive Agritech Dashboards & Advanced Plotly", estimatedMinutes: 180, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-8", moduleId: "module-8", order: 8, title: "8.8 Matplotlib vs Plotly + Choosing the Right Visualization", estimatedMinutes: 150, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-9", moduleId: "module-8", order: 9, title: "8.9 Solved Visualization Problems — Easy → Advanced", estimatedMinutes: 180, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-10", moduleId: "module-8", order: 10, title: "8.10 Mini Project · Smart Farm Visualization Dashboard", estimatedMinutes: 210, status: "not-started" as const, isPlaceholder: true },
];
