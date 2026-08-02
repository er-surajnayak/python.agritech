import type { ControlFlowCapstoneDevelopmentPack } from "@/types/content";

export const smartFarmConsoleProgram = `print("==============================")
print("SMART FARM AUTOMATION")
print("==============================")

while True:
    print("\\n1. Soil Moisture Analysis")
    print("2. Temperature Analysis")
    print("3. Crop Recommendation")
    print("4. Sensor Inspection")
    print("5. Irrigation Simulation")
    print("6. Exit")

    option = input("Choose Option: ")

    match option:
        case "1":
            soil = float(input("Enter Soil Moisture (%): "))
            if soil < 15:
                print("Emergency Irrigation")
            elif soil < 30:
                print("Start Irrigation")
            elif soil < 50:
                print("Monitor Soil")
            else:
                print("No Irrigation Required")

        case "2":
            temperature = float(input("Enter Temperature (°C): "))
            soil = float(input("Enter Soil Moisture (%): "))
            if temperature > 35:
                if soil < 30:
                    print("Immediate Irrigation")
                else:
                    print("Open Ventilation")
            else:
                print("Temperature Normal")

        case "3":
            crop = input("Enter Crop: ")
            match crop:
                case "Rice":
                    print("Water: Standing water | Fertilizer: Nitrogen | Tip: Harvest when grains mature")
                case "Wheat":
                    print("Water: Moderate | Fertilizer: Balanced NPK | Tip: Harvest when crop turns golden")
                case "Cotton":
                    print("Water: Avoid overwatering | Fertilizer: Potassium | Tip: Pick dry bolls")
                case "Sugarcane":
                    print("Water: High | Fertilizer: Nitrogen-rich | Tip: Harvest at peak sugar content")
                case _:
                    print("Crop recommendation unavailable")

        case "4":
            sensor_count = int(input("Number of Sensors: "))
            faulty_sensor = int(input("Faulty Sensor ID (0 for none): "))
            critical_sensor = int(input("Critical Sensor ID (0 for none): "))
            for sensor in range(1, sensor_count + 1):
                if sensor == faulty_sensor:
                    print("Skipping Faulty Sensor", sensor)
                    continue
                if sensor == critical_sensor:
                    print("Critical Fault at Sensor", sensor)
                    break
                print("Checking Sensor", sensor)

        case "5":
            moisture = float(input("Current Moisture (%): "))
            while moisture < 30:
                print("Motor Running...", moisture)
                moisture += 2
            print("Motor OFF at", moisture)

        case "6":
            print("Exiting Smart Farm Automation")
            break

        case _:
            print("Invalid option. Choose 1 to 6.")

    ai_prediction = False
    if ai_prediction:
        pass
`;

export const controlFlowCapstoneDevelopmentPack: ControlFlowCapstoneDevelopmentPack = {
  kind: "control-flow-capstone",
  prerequisite: "Module 1 and Lessons 2.1–2.9",
  story: { title: "Your first control-flow software assignment", body: "Congratulations—you have joined an Agritech company that needs one console application to monitor fields, recommend actions, inspect sensors, and keep operating until the farmer chooses to exit.", items: ["Monitor", "Recommend", "Inspect", "Simulate"], company: "AgriTech Solutions Pvt. Ltd.", responsibilities: ["Monitor soil moisture", "Monitor temperature", "Recommend irrigation", "Recommend crop actions", "Inspect sensors", "Run until exit"], workflow: { title: "Turn a field requirement into an application", description: "The capstone integrates every control-flow pattern into one menu-driven workflow.", steps: [{ title: "Project brief", description: "Understand the farm operations." }, { title: "Design", description: "Map requirements to Python constructs." }, { title: "Build", description: "Integrate five application modules." }, { title: "Test", description: "Exercise normal, faulty, and critical paths." }, { title: "Reflect", description: "Evaluate the software architecture." }] } },
  overview: { title: "Smart Farm Automation Console", body: "The main menu keeps the application active, routes each choice to a focused farm operation, displays the result, and returns to the menu until Exit is selected.", menu: ["1. Soil Moisture Analysis", "2. Temperature Analysis", "3. Crop Recommendation", "4. Sensor Inspection", "5. Irrigation Simulation", "6. Exit"], features: [{ title: "Field monitoring", description: "Analyze current moisture and temperature." }, { title: "Crop guidance", description: "Map crop choices to practical recommendations." }, { title: "Sensor operations", description: "Inspect many devices while handling faults." }, { title: "Irrigation simulation", description: "Run the motor until moisture reaches its target." }, { title: "Persistent menu", description: "Return after every task and exit deliberately." }] },
  architecture: { title: "Application control-flow architecture", body: "One outer while loop owns the application lifecycle. match-case routes the menu selection, each case performs one task, and break exits the console.", steps: [{ title: "Start", description: "Initialize the console.", phase: "start" }, { title: "Display menu", description: "Present six supported choices.", phase: "output" }, { title: "Read choice", description: "Accept the farmer's selection.", phase: "input" }, { title: "Match module", description: "Route to the selected operation.", phase: "process" }, { title: "Execute", description: "Run decisions or loops for that module.", phase: "process" }, { title: "Return or exit", description: "Repeat the menu or stop the application.", phase: "end" }] },
  conceptMapping: { title: "Every Module 2 concept has a job", body: "The project uses each construct where its problem shape is strongest.", rows: [{ feature: "Application menu", concept: "while + match-case", role: "Repeat and route choices" }, { feature: "Irrigation decision", concept: "if-elif-else", role: "Choose a moisture category" }, { feature: "Temperature check", concept: "Nested if", role: "Make a dependent decision" }, { feature: "Sensor inspection", concept: "for", role: "Process a known device range" }, { feature: "Irrigation simulation", concept: "while", role: "Repeat until moisture changes" }, { feature: "Emergency stop", concept: "break", role: "Terminate immediately" }, { feature: "Faulty sensor", concept: "continue", role: "Skip isolated bad data" }, { feature: "Future AI", concept: "pass", role: "Reserve unfinished logic" }] },
  modules: [
    { id: "soil", option: "1", title: "Soil Moisture Analysis", concept: "if-elif-else", description: "Classify moisture as emergency, low, monitoring, or sufficient.", fields: [{ id: "soil", label: "Soil Moisture (%)", prompt: "Enter Soil Moisture (%): ", defaultValue: "10", type: "float" }], expectedOutput: "Emergency Irrigation" },
    { id: "temperature", option: "2", title: "Temperature Analysis", concept: "Nested if", description: "Check heat first, then inspect soil only inside the hot-weather path.", fields: [{ id: "temperature", label: "Temperature (°C)", prompt: "Enter Temperature (°C): ", defaultValue: "38", type: "float" }, { id: "temperature_soil", label: "Soil Moisture (%)", prompt: "Enter Soil Moisture (%): ", defaultValue: "20", type: "float" }], expectedOutput: "Immediate Irrigation" },
    { id: "crop", option: "3", title: "Crop Recommendation", concept: "match-case", description: "Select fixed crop-specific water, fertilizer, and harvest guidance.", fields: [{ id: "crop", label: "Crop", prompt: "Enter Crop: ", defaultValue: "Rice", type: "str" }], expectedOutput: "Water: Standing water" },
    { id: "sensors", option: "4", title: "Sensor Inspection", concept: "for + continue + break", description: "Inspect a known sensor range, skip maintenance, and stop at a critical fault.", fields: [{ id: "sensor_count", label: "Number of Sensors", prompt: "Number of Sensors: ", defaultValue: "10", type: "int" }, { id: "faulty_sensor", label: "Faulty Sensor ID", prompt: "Faulty Sensor ID (0 for none): ", defaultValue: "5", type: "int" }, { id: "critical_sensor", label: "Critical Sensor ID", prompt: "Critical Sensor ID (0 for none): ", defaultValue: "8", type: "int" }], expectedOutput: "Critical Fault at Sensor 8" },
    { id: "irrigation", option: "5", title: "Irrigation Simulation", concept: "while", description: "Increase moisture in measured steps until the safe target is reached.", fields: [{ id: "moisture", label: "Current Moisture (%)", prompt: "Current Moisture (%): ", defaultValue: "20", type: "float" }], expectedOutput: "Motor OFF at 30.0" },
  ],
  futureFeature: { title: "Future AI prediction placeholder", code: "ai_prediction = False\n\nif ai_prediction:\n    pass", explanation: "The branch is intentionally valid but empty. A later module can replace pass with a real prediction workflow without changing the surrounding application structure.", output: "No output" },
  buildSteps: [{ title: "Create the application loop", purpose: "Keep the menu active until Exit.", code: "while True:\n    # display menu", concepts: ["while"] }, { title: "Route menu choices", purpose: "Connect one selected option to one operation.", code: "match option:\n    case \"1\":\n        # soil analysis", concepts: ["input", "match-case"] }, { title: "Implement field decisions", purpose: "Classify moisture and handle dependent heat logic.", code: "if soil < 15:\n    print(\"Emergency Irrigation\")", concepts: ["if-elif-else", "nested if"] }, { title: "Add sensor inspection", purpose: "Process devices and respond to two fault severities.", code: "for sensor in range(1, sensor_count + 1):\n    # continue or break", concepts: ["for", "continue", "break"] }, { title: "Add irrigation simulation", purpose: "Run until measured moisture becomes safe.", code: "while moisture < 30:\n    moisture += 2", concepts: ["while", "update"] }, { title: "Test and complete", purpose: "Exercise every module and exit path.", code: "case \"6\":\n    break", concepts: ["testing", "break", "pass"] }],
  finalProgram: smartFarmConsoleProgram,
  tests: [{ id: "soil-emergency", title: "Emergency soil", moduleId: "soil", values: { soil: "10" }, expectedOutput: ["Emergency Irrigation"] }, { id: "soil-monitor", title: "Monitor soil", moduleId: "soil", values: { soil: "40" }, expectedOutput: ["Monitor Soil"] }, { id: "hot-dry", title: "Hot and dry", moduleId: "temperature", values: { temperature: "38", temperature_soil: "20" }, expectedOutput: ["Immediate Irrigation"] }, { id: "rice", title: "Rice guidance", moduleId: "crop", values: { crop: "Rice" }, expectedOutput: ["Water: Standing water", "Fertilizer: Nitrogen"] }, { id: "sensor-faults", title: "Sensor control", moduleId: "sensors", values: { sensor_count: "10", faulty_sensor: "5", critical_sensor: "8" }, expectedOutput: ["Skipping Faulty Sensor 5", "Critical Fault at Sensor 8"] }, { id: "irrigation-target", title: "Irrigation target", moduleId: "irrigation", values: { moisture: "20" }, expectedOutput: ["Motor Running... 20.0", "Motor OFF at 30.0"] }],
  debugChallenges: [{ title: "Repair the control-flow skeleton", prompt: "Find the missing colons, invalid match syntax, wrong indentation, misplaced break, and non-terminating while update.", code: "while True\nprint(\"Menu\")\nmatch option\ncase \"1\":\nprint(\"Soil\")\nif soil < 30:\n    break\nwhile moisture < 30:\n    moisture = moisture", mistakesToFind: 7, solution: "while True:\n    print(\"Menu\")\n    match option:\n        case \"1\":\n            print(\"Soil\")\n        case \"6\":\n            break\n\nwhile moisture < 30:\n    moisture += 2", hiddenGuidance: "Check every block header, indentation level, loop context, and state update." }, { title: "Predict the sensor path", prompt: "Identify processed, skipped, and unvisited sensors.", code: "for sensor in range(1, 11):\n    if sensor == 5:\n        continue\n    if sensor == 8:\n        break\n    print(sensor)", mistakesToFind: 0, solution: "Processed: 1, 2, 3, 4, 6, 7\nSkipped: 5\nBreak: 8\nUnvisited: 9, 10", hiddenGuidance: "continue changes one iteration; break changes the entire remaining loop." }],
  extensions: [{ level: "Bronze", title: "Humidity monitoring", brief: "Add a menu option that classifies humidity.", guidance: "Reuse an ordered if-elif-else chain." }, { level: "Silver", title: "Rainfall analysis", brief: "Add drought, normal, heavy, and flood levels.", guidance: "Design non-overlapping thresholds before coding." }, { level: "Gold", title: "Fertilizer recommendations", brief: "Expand crop-specific advice.", guidance: "Keep fixed crop choices in match-case." }, { level: "Platinum", title: "Farm health report", brief: "Display a combined summary before exit.", guidance: "Store the latest results in clearly named variables." }, { level: "Diamond", title: "Inspection history preview", brief: "Design where file-based history will connect later.", guidance: "Describe the planned workflow only; file handling is not required yet." }],
  reflection: { title: "Think like a software engineer", body: "Move beyond whether the program runs. Evaluate why each construct was selected and how the architecture would evolve.", prompts: ["Which module was easiest to build, and why?", "Which Python construct appears most often?", "Could match-case be replaced with if-elif-else? What changes?", "How should inspection change for 5,000 sensors?", "Which logic could be reused if this became a web application?"] },
  checklist: { title: "Module 2 Capstone Checklist", body: "Mark each capability after implementing and testing it in the complete console.", items: ["Variables used", "User input accepted", "if-elif-else", "Nested if", "match-case", "for loop", "while loop", "break", "continue", "pass", "Menu driven", "User friendly", "Tested"] },
};
