import { matplotlibBasicsDevelopmentPack } from "@/content/development-packs/lesson-8-1";
import { matplotlibChartTypesDevelopmentPack } from "@/content/development-packs/lesson-8-2";
import { matplotlibDistributionDevelopmentPack } from "@/content/development-packs/lesson-8-3";
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
}, {
  id: "module-8-lesson-2", moduleId: "module-8", number: "8.2", title: "Line, Bar, Scatter & Area Charts", durationMinutes: 165, level: "Intermediate",
  summary: "Choose and build Matplotlib charts that communicate ordered trends, category comparisons, numerical relationships, and magnitude over time using Smart Farm data.",
  introduction: { title: "The question determines the chart", body: "Line, bar, scatter, and area charts encode different relationships. Choosing deliberately prevents a technically valid plot from implying the wrong structure." },
  objectives: ["Choose a chart from the analytical question", "Create line charts with plt.plot()", "Compare groups with multiple lines", "Create vertical bars with plt.bar()", "Create horizontal bars with plt.barh()", "Create scatter plots with plt.scatter()", "Create area charts with plt.fill_between()", "Compare categories and numerical variables", "Interpret Agritech charts responsibly", "Distinguish correlation from causation"],
  whyThisMatters: { title: "Chart choice changes the message", body: "Connecting crop categories with a line implies continuity that does not exist. Treating a time sequence only as separate bars can hide its direction. The visual form is part of the analysis.", items: ["Line reveals ordered change", "Bar compares discrete groups", "Scatter pairs numerical observations", "Area emphasizes continuous magnitude"] },
  industryMotivation: { title: "Farm decisions depend on faithful visual comparisons", body: "Agronomists compare crop performance, track sensor trends, investigate relationships, and monitor resource levels. A well-chosen chart makes each question faster to inspect without overstating the evidence.", items: ["Temperature trends use lines", "Crop yields use bars", "Temperature–yield relationships use scatter", "Moisture magnitude can use area"], signal: "Question → relationship in the data → chart type → labeled evidence → cautious interpretation." },
  concept: { title: "Visual marks encode different relationships", body: "A line connects ordered observations, bar length compares categories, point position pairs two numerical variables, and a filled area emphasizes magnitude against a baseline.", items: ["plot(): ordered trend", "bar()/barh(): category magnitude", "scatter(): paired numerical values", "fill_between(): filled continuous trend", "Chart choice precedes styling"] },
  workflow: { title: "Choose before you draw", description: "Map the question to the structure of the data.", steps: [{ title: "Ask", description: "State the farm question precisely." }, { title: "Classify", description: "Identify trend, categories, relationship, or magnitude." }, { title: "Choose", description: "Select line, bar, scatter, or area." }, { title: "Encode", description: "Map variables to x, y, and marks." }, { title: "Label", description: "Preserve names, units, and groups." }, { title: "Interpret", description: "Describe evidence without overstating causation." }] },
  agritechExample: { title: "One farm, four questions", body: "Daily temperature becomes a line, crop yield becomes bars, temperature versus yield becomes a scatter plot, and soil moisture over days becomes a filled area. The dataset may overlap, but the analytical relationship changes." },
  playground: {
    title: "Run the Four Core Matplotlib Chart Types",
    description: "Create independent line, bar, horizontal-bar, scatter, and area Figures, inspect their artist types, save one PNG in memory, and close every Figure without using subplots.",
    starterCode: `import io
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

days = [1, 2, 3, 4, 5, 6, 7]
temperature = [25, 27, 28, 30, 32, 31, 29]
moisture = [60, 57, 54, 52, 48, 45, 42]
crops = ["Rice", "Wheat", "Maize", "Cotton"]
yield_data = [520, 480, 450, 390]
scatter_temp = [24, 26, 28, 30, 32, 34, 36]
scatter_yield = [520, 515, 510, 500, 480, 450, 420]

figures = []
for name in ["line", "bar", "barh", "scatter", "area"]:
    fig, ax = plt.subplots()
    if name == "line": ax.plot(days, temperature, marker="o")
    elif name == "bar": ax.bar(crops, yield_data)
    elif name == "barh": ax.barh(crops, yield_data)
    elif name == "scatter": ax.scatter(scatter_temp, scatter_yield)
    else: ax.fill_between(days, moisture, 0)
    ax.set_title(name.title() + " Chart")
    figures.append(fig)
    print(name, "artists:", len(ax.lines) + len(ax.patches) + len(ax.collections))

png = io.BytesIO()
figures[0].savefig(png, format="png", dpi=150, bbox_inches="tight")
print("Chart types:", len(figures))
print("Saved PNG bytes:", len(png.getvalue()))
for fig in figures: plt.close(fig)
print("Open figures:", plt.get_fignums())`,
    expectedOutcome: "The runner reports an artist for every chart type, creates five independent Figures, saves a non-empty PNG, and closes all Figures.",
  },
  practice: [
    { level: "Easy", title: "Temperature line", prompt: "Plot seven daily temperatures as a labeled line chart.", guidance: "Use plot(days, temperature) with markers." },
    { level: "Easy", title: "Crop yield bars", prompt: "Compare Rice, Wheat, Maize, and Cotton yield.", guidance: "Use bar because crops are categories." },
    { level: "Easy", title: "Horizontal comparison", prompt: "Recreate the crop comparison with horizontal bars.", guidance: "Use barh and swap the axis-label roles." },
    { level: "Medium", title: "Temperature and yield", prompt: "Create a scatter plot for paired temperature and yield observations.", guidance: "Use one point per paired observation." },
    { level: "Medium", title: "Moisture area", prompt: "Show soil-moisture magnitude over seven days.", guidance: "Use fill_between(days, moisture, 0)." },
    { level: "Medium", title: "Two fields", prompt: "Compare two fields' temperature trends with separate lines.", guidance: "Give both lines labels and call legend()." },
    { level: "Medium", title: "Same data, new question", prompt: "Use two chart types on one dataset and explain what different question each answers.", guidance: "Focus on the data relationship, not styling." },
    { level: "Challenge", title: "Farm visualization chooser", prompt: "Accept x, y, and a chart choice, then generate the matching Matplotlib call and justify it.", guidance: "Validate compatible lengths and categorical versus numerical structure." },
  ],
  quiz: [
    { title: "Trend", question: "Which chart best shows temperature over seven ordered days?", options: ["Line", "Bar", "Scatter", "Pie"], correctOptionIndex: 0, note: "Ordered progression.", explanation: "A line makes direction and change visible." },
    { title: "Categories", question: "Which chart best compares yield across crops?", options: ["Bar", "Scatter", "Area", "Line"], correctOptionIndex: 0, note: "Discrete groups.", explanation: "Bar length supports direct category comparison." },
    { title: "Horizontal", question: "Which function is useful when category labels are long?", options: ["plt.barh()", "plt.plot()", "plt.scatter()", "plt.grid()"], correctOptionIndex: 0, note: "Horizontal bars.", explanation: "barh gives labels more horizontal space." },
    { title: "Relationship", question: "Which chart pairs two numerical variables?", options: ["Scatter", "Bar", "Area", "Horizontal bar"], correctOptionIndex: 0, note: "One point per pair.", explanation: "Scatter position encodes x and y together." },
    { title: "Area", question: "What does fill_between() emphasize?", options: ["Magnitude across a continuous axis", "Category names only", "File resolution", "Legend order"], correctOptionIndex: 0, note: "Filled baseline.", explanation: "The filled region emphasizes magnitude while preserving a trend." },
    { title: "Multiple lines", question: "What distinguishes two field lines?", options: ["Labels and a legend", "A second plt.show import", "Different list lengths", "Removing units"], correctOptionIndex: 0, note: "Identify groups.", explanation: "Each series needs a label and the chart needs a legend." },
    { title: "Causation", question: "A downward scatter pattern proves temperature caused yield loss. True?", options: ["No", "Yes", "Only with a grid", "Only with markers"], correctOptionIndex: 0, note: "Association is not proof.", explanation: "Other variables may explain the relationship." },
    { title: "Output", question: "What does plt.scatter([24,26,28], [520,510]) do?", options: ["Raises a length mismatch error", "Draws three points", "Creates bars", "Fills an area"], correctOptionIndex: 0, note: "Pairs must align.", explanation: "There are three x values but only two y values." },
    { title: "Categories", question: "Why can a line be misleading across Rice, Wheat, and Maize?", options: ["It implies continuity between categories", "Lines cannot have labels", "Crops must be numbers", "Matplotlib forbids strings"], correctOptionIndex: 0, note: "Visual implication.", explanation: "Independent categories do not form a continuous path." },
    { title: "Decision", question: "What should determine chart choice first?", options: ["The analytical question", "The brightest color", "The shortest function name", "The largest marker"], correctOptionIndex: 0, note: "Meaning before styling.", explanation: "Choose the encoding that matches the data relationship." },
  ],
  assignment: { title: "Smart Farm Chart Selection Study", brief: "Answer four farm questions with four appropriately chosen Matplotlib charts and explain each choice.", deliverables: ["One labeled line chart", "One bar or horizontal-bar chart", "One scatter plot", "One area chart", "Compatible x/y pairs", "Units on axes", "Chart-choice justification", "Correlation caution", "Readable output", "Executable code"] },
  summarySection: { title: "You can now match foundational charts to farm questions", body: "You created and interpreted lines, vertical and horizontal bars, scatter plots, and filled areas while separating trends, categories, relationships, and magnitude.", items: ["Line: ordered trend", "Bar: category comparison", "barh: long labels", "Scatter: numerical relationship", "Area: continuous magnitude", "Correlation is not causation"] },
  keyTakeaways: ["Choose from the question", "Use line for trends", "Use bar for categories", "Use barh for long labels", "Use scatter for paired numerical variables", "Use area to emphasize magnitude", "Keep x/y observations aligned", "Label groups and units", "Do not infer causation from scatter alone", "Advanced styling comes later"],
  whatsNext: { title: "Lesson 8.3 · Histograms, Box Plots & Distribution Analysis", body: "Next, move from individual trends and comparisons to distributions, spread, center, and potential outliers." },
  developmentPack: matplotlibChartTypesDevelopmentPack,
}, {
  id: "module-8-lesson-3", moduleId: "module-8", number: "8.3", title: "Histograms, Box Plots & Distribution Analysis", durationMinutes: 165, level: "Intermediate",
  summary: "Analyze Smart Farm sensor distributions with histogram bins, box-plot quartiles, IQR fences, group comparisons, and context-aware investigation of unusual readings.",
  introduction: { title: "A distribution describes all observations together", body: "Rather than reading values one at a time, distribution analysis reveals concentration, spread, shape, and observations separated from most of the data." },
  objectives: ["Explain what a distribution represents", "Create histograms with plt.hist()", "Explain histogram frequency and bins", "Judge the effect of changing bin counts", "Interpret center, spread, shape, and unusual values", "Create box plots with plt.boxplot()", "Explain Q1, median, Q3, whiskers, and IQR", "Apply the 1.5 × IQR rule", "Compare distributions across fields", "Choose histogram versus box plot", "Investigate outliers without automatically deleting them"],
  whyThisMatters: { title: "Sensor quality is a distribution question", body: "Thousands of readings can hide clusters, broad variation, skew, and rare extremes. Histograms and box plots turn those patterns into evidence for monitoring and investigation.", items: ["Find common ranges", "Measure typical spread", "Compare fields compactly", "Flag unusual readings responsibly"] },
  industryMotivation: { title: "Rare farm observations may be warnings or real events", body: "A high moisture value could indicate rainfall, recent irrigation, an extreme field condition, sensor malfunction, or entry error. Distribution tools flag what deserves attention; domain investigation decides what it means.", items: ["Histogram: frequency and shape", "Box plot: robust summary", "IQR: middle-half spread", "Outlier: investigate before action"], signal: "Readings → distribution view → statistical flag → domain investigation → justified decision." },
  concept: { title: "Histogram and box plot summarize different properties", body: "Histograms count readings inside numerical intervals. Box plots compress a distribution into quartiles, median, whiskers, and potential outliers.", items: ["Bins are numerical ranges", "Frequency counts observations", "Q1–Q3 contain the middle 50%", "IQR = Q3 − Q1", "Fences flag potential outliers", "Flags are not automatic errors"] },
  workflow: { title: "Analyze a farm distribution", description: "Use both statistical structure and field context.", steps: [{ title: "Inspect", description: "Confirm the data is numerical and meaningful." }, { title: "Histogram", description: "Compare several reasonable bin counts." }, { title: "Box plot", description: "Inspect median, IQR, whiskers, and flags." }, { title: "Compare", description: "Examine center and spread across groups." }, { title: "Investigate", description: "Check operational causes for unusual readings." }, { title: "Report", description: "Describe evidence without labeling rarity as error." }] },
  agritechExample: { title: "Soil moisture at 90%", body: "A box plot may place 90% beyond the upper IQR fence. That makes it statistically unusual, but only rainfall records, irrigation logs, field inspection, and sensor diagnostics can establish why." },
  playground: {
    title: "Run a Complete Distribution Analysis",
    description: "Create histogram and box-plot Figures, calculate quartiles and IQR fences, identify potential outliers, compare three fields, and close every Figure.",
    starterCode: `import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

temperature = [24, 25, 25, 26, 27, 27, 28, 28, 29, 30, 31, 32, 35, 36]
moisture = [45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 90]
field_a = [24, 25, 26, 27, 28, 29, 30]
field_b = [27, 28, 29, 30, 31, 32, 33]
field_c = [23, 24, 25, 26, 27, 28, 40]

fig_hist, ax_hist = plt.subplots()
counts, edges, _ = ax_hist.hist(temperature, bins=5)
fig_box, ax_box = plt.subplots()
ax_box.boxplot(moisture)
fig_groups, ax_groups = plt.subplots()
ax_groups.boxplot([field_a, field_b, field_c], tick_labels=["Field A", "Field B", "Field C"])

q1, median, q3 = np.percentile(moisture, [25, 50, 75])
iqr = q3 - q1
lower = q1 - 1.5 * iqr
upper = q3 + 1.5 * iqr
outliers = [value for value in moisture if value < lower or value > upper]

print("Histogram frequencies:", counts.astype(int).tolist())
print("Bin edges:", np.round(edges, 1).tolist())
print("Q1 / Median / Q3:", q1, median, q3)
print("IQR:", iqr)
print("Fences:", lower, upper)
print("Potential outliers:", outliers)
print("Group boxes:", len(ax_groups.artists) + len(ax_groups.lines) > 0)
for fig in [fig_hist, fig_box, fig_groups]: plt.close(fig)
print("Open figures:", plt.get_fignums())`,
    expectedOutcome: "The runner prints five histogram frequencies, quartiles, an IQR of 5, fences from 41 to 61, identifies 90 as a potential outlier, confirms group box artists, and closes all Figures.",
  },
  practice: [
    { level: "Easy", title: "Temperature histogram", prompt: "Create a labeled histogram for the temperature readings.", guidance: "Begin with five bins and label frequency." },
    { level: "Easy", title: "Compare bins", prompt: "Render the same histogram with 5 and 10 bins.", guidance: "Describe what detail appears or disappears." },
    { level: "Medium", title: "Moisture box plot", prompt: "Create a soil-moisture box plot and identify its median.", guidance: "A box plot summarizes rather than shows frequency shape." },
    { level: "Medium", title: "Potential outlier", prompt: "Use the IQR rule to investigate 90 in the moisture dataset.", guidance: "Calculate Q1, Q3, IQR, and both fences." },
    { level: "Medium", title: "Three fields", prompt: "Compare temperature distributions for Fields A, B, and C.", guidance: "Use one box per field and label each group." },
    { level: "Medium", title: "Quartile language", prompt: "Explain Q1, median, Q3, and IQR in plain language.", guidance: "Connect each statistic to a proportion or spread." },
    { level: "Challenge", title: "Manual IQR", prompt: "Calculate the IQR for a small sorted sensor dataset.", guidance: "Use Q3 − Q1, then calculate both 1.5 × IQR fences." },
    { level: "Challenge", title: "Two-view analysis", prompt: "Analyze one sensor dataset with both a histogram and box plot, then write three evidence-based observations.", guidance: "Discuss shape, concentration, median/spread, and flags separately." },
  ],
  quiz: [
    { title: "Distribution", question: "What does distribution analysis examine?", options: ["How all values are arranged and concentrated", "Only the largest value", "Only category names", "Image resolution"], correctOptionIndex: 0, note: "All observations together.", explanation: "Distribution includes center, spread, shape, and unusual values." },
    { title: "Histogram", question: "What does a histogram's y-axis usually show?", options: ["Frequency", "Quartile name", "Crop label", "IQR fence"], correctOptionIndex: 0, note: "Count in each range.", explanation: "Bar height records how many observations fall in a bin." },
    { title: "Bins", question: "What is a histogram bin?", options: ["A numerical interval", "A named crop", "An outlier deletion", "A legend"], correctOptionIndex: 0, note: "Range, not category.", explanation: "Bins group continuous values into intervals." },
    { title: "Bin choice", question: "Why compare several bin counts?", options: ["The apparent shape can change", "Bins change the raw data", "More bins always prove accuracy", "Box plots require bins"], correctOptionIndex: 0, note: "Avoid over-interpretation.", explanation: "Too few oversimplify; too many can look noisy." },
    { title: "Median", question: "What percentile is the median?", options: ["50th", "25th", "75th", "100th"], correctOptionIndex: 0, note: "Middle position.", explanation: "Half the ordered observations lie on either side." },
    { title: "IQR", question: "How is IQR calculated?", options: ["Q3 − Q1", "Maximum − minimum", "Median ÷ 2", "Q1 + Q3"], correctOptionIndex: 0, note: "Middle-half spread.", explanation: "IQR spans the middle 50% of observations." },
    { title: "Fence", question: "What is the common upper potential-outlier fence?", options: ["Q3 + 1.5 × IQR", "Q3 + IQR", "Median + Q1", "Maximum × 2"], correctOptionIndex: 0, note: "Statistical flag.", explanation: "Values beyond the fence may be displayed individually." },
    { title: "Outlier", question: "What should happen first when a sensor value is flagged?", options: ["Investigate context", "Delete it", "Replace it with zero", "Ignore all data"], correctOptionIndex: 0, note: "Rarity is not invalidity.", explanation: "Check weather, irrigation, conditions, sensor health, and entry history." },
    { title: "Comparison", question: "Which plot compactly compares several field distributions?", options: ["Side-by-side box plots", "One pie chart", "One line without labels", "A categorical histogram"], correctOptionIndex: 0, note: "Group summary.", explanation: "Boxes align medians, IQRs, whiskers, and flags across groups." },
    { title: "Choice", question: "Which plot best reveals distribution shape?", options: ["Histogram", "Box plot only", "Bar chart of crops", "Area chart"], correctOptionIndex: 0, note: "Frequency pattern.", explanation: "A histogram shows concentration, gaps, and skew across ranges." },
  ],
  assignment: { title: "Smart Farm Distribution Report", brief: "Use a histogram and box plot to assess one sensor dataset and compare distributions across three fields.", deliverables: ["Histogram with justified bins", "Box plot", "Q1, median, Q3", "IQR and fences", "Potential-outlier list", "Three-field comparison", "Contextual investigation plan", "No automatic deletion", "Readable labels and units", "Three evidence-based observations"] },
  summarySection: { title: "You can now inspect the shape and robust summary of farm distributions", body: "You used histogram bins to examine frequency and shape, box plots to compare center and spread, and IQR fences to identify observations requiring investigation.", items: ["Histogram: shape and frequency", "Box plot: compact summary", "IQR: middle 50% spread", "Fences: potential outlier flags", "Context decides meaning"] },
  keyTakeaways: ["Distribution describes all readings together", "Bins are numerical intervals", "Bin choice affects appearance", "Histograms reveal shape", "Box plots reveal quartiles", "IQR resists extreme values", "Outliers are investigation prompts", "Compare groups with aligned boxes", "Use numerical data for histograms", "Preserve field context"],
  whatsNext: { title: "Lesson 8.4 · Customization, Labels, Legends, Subplots & Styling", body: "Next, improve chart communication with purposeful styling, annotations, legends, layouts, and multiple Axes." },
  developmentPack: matplotlibDistributionDevelopmentPack,
}];

export const moduleEightLessonSummaries = [
  { id: "module-8-lesson-1", moduleId: "module-8", order: 1, title: "8.1 Introduction to Data Visualization + Matplotlib Basics", estimatedMinutes: 150, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-8-lesson-2", moduleId: "module-8", order: 2, title: "8.2 Line, Bar, Scatter & Area Charts", estimatedMinutes: 165, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-8-lesson-3", moduleId: "module-8", order: 3, title: "8.3 Histograms, Box Plots & Distribution Analysis", estimatedMinutes: 165, status: "in-progress" as const, isPlaceholder: false },
  { id: "module-8-lesson-4", moduleId: "module-8", order: 4, title: "8.4 Customization, Labels, Legends, Subplots & Styling", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-5", moduleId: "module-8", order: 5, title: "8.5 Plotly Fundamentals + Interactive Charts", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-6", moduleId: "module-8", order: 6, title: "8.6 Plotly Bar, Line, Scatter, Histogram & Box Charts", estimatedMinutes: 165, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-7", moduleId: "module-8", order: 7, title: "8.7 Interactive Agritech Dashboards & Advanced Plotly", estimatedMinutes: 180, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-8", moduleId: "module-8", order: 8, title: "8.8 Matplotlib vs Plotly + Choosing the Right Visualization", estimatedMinutes: 150, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-9", moduleId: "module-8", order: 9, title: "8.9 Solved Visualization Problems — Easy → Advanced", estimatedMinutes: 180, status: "not-started" as const, isPlaceholder: true },
  { id: "module-8-lesson-10", moduleId: "module-8", order: 10, title: "8.10 Mini Project · Smart Farm Visualization Dashboard", estimatedMinutes: 210, status: "not-started" as const, isPlaceholder: true },
];
