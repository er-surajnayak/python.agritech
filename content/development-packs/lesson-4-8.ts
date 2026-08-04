import type { ListTuplePracticeDevelopmentPack } from "@/types/content";

export const listTuplePracticeDevelopmentPack: ListTuplePracticeDevelopmentPack = {
  kind: "list-tuple-practice",
  prerequisite: "Lesson 4.7 Collection Operations & Built-in Functions",
  introduction: {
    title: "Mastering Lists & Tuples Through Solved Problems",
    body: "Welcome to Lesson 4.8. Practice is where syntax becomes intuition. In this lesson, you will work through 30 real-world agritech programming questions covering list creation, indexing, slicing, mutation, tuple immutability, and tuple unpacking."
  },
  questions: [
    // 🟢 EASY QUESTIONS (1-10)
    {
      id: "q1",
      number: 1,
      title: "Create a List of Crops",
      difficulty: "Easy",
      problem: "Create a list named `crops` containing: 'Rice', 'Wheat', 'Corn', 'Sugarcane', 'Cotton'. Print the complete list.",
      agritechScenario: "A farm management platform stores all supported crop varieties in an ordered registry.",
      hint: "Use square brackets [] to create a list in Python.",
      solution: `crops = ["Rice", "Wheat", "Corn", "Sugarcane", "Cotton"]
print(crops)`,
      dryRun: "1. Define list `crops` with 5 string elements.\n2. Pass `crops` to `print()`.\n3. Python outputs representation of the list.",
      output: "['Rice', 'Wheat', 'Corn', 'Sugarcane', 'Cotton']",
      explanation: "Lists are created using square brackets. Strings inside must be quoted.",
      commonMistake: "Using parentheses () instead of square brackets []. Parentheses create a tuple.",
      challengeExtension: "Add 'Soybean' as a 6th crop."
    },
    {
      id: "q2",
      number: 2,
      title: "Access First and Last Crop",
      difficulty: "Easy",
      problem: "Given `crops = ['Rice', 'Wheat', 'Corn', 'Sugarcane', 'Cotton']`, print the first crop using zero-based indexing and the last crop using negative indexing.",
      agritechScenario: "Extracting boundary crops for automated field display.",
      hint: "Use index 0 for the first element and -1 for the last element.",
      solution: `crops = ["Rice", "Wheat", "Corn", "Sugarcane", "Cotton"]
print("First crop:", crops[0])
print("Last crop:", crops[-1])`,
      dryRun: "1. Evaluate crops[0] -> 'Rice'.\n2. Evaluate crops[-1] -> 'Cotton'.\n3. Print both extracted strings.",
      output: "First crop: Rice\nLast crop: Cotton",
      explanation: "Python uses 0-based indexing for the front and negative indexing (-1) from the back.",
      commonMistake: "Using index 1 to access the first item.",
      challengeExtension: "Print the second crop using `crops[1]`."
    },
    {
      id: "q3",
      number: 3,
      title: "Update Soil Moisture Reading",
      difficulty: "Easy",
      problem: "Given `moisture = [22, 25, 28]`, update the second sensor reading (index 1) from 25 to 30.",
      agritechScenario: "A moisture sensor re-calibrates and sends an updated reading.",
      hint: "Assign a new value directly to index 1: `moisture[1] = 30`.",
      solution: `moisture = [22, 25, 28]
moisture[1] = 30
print("Updated moisture:", moisture)`,
      dryRun: "1. moisture initial state: [22, 25, 28].\n2. Reassign index 1 to 30.\n3. Resulting list: [22, 30, 28].",
      output: "Updated moisture: [22, 30, 28]",
      explanation: "Lists are mutable, meaning their elements can be modified in-place by assigning to an index.",
      commonMistake: "Trying to call moisture.update(30), which is a dictionary method.",
      challengeExtension: "Update the last reading (index 2) to 32."
    },
    {
      id: "q4",
      number: 4,
      title: "Add New Sensor Reading",
      difficulty: "Easy",
      problem: "Given `readings = [24, 26, 25]`, append a new reading `29` to the list.",
      agritechScenario: "A field sensor emits a new telemetry data point.",
      hint: "Use the list method `.append()`.",
      solution: `readings = [24, 26, 25]
readings.append(29)
print(readings)`,
      dryRun: "1. Initial list has 3 elements.\n2. append(29) adds 29 to the end.\n3. Final length is 4.",
      output: "[24, 26, 25, 29]",
      explanation: ".append() adds a single element to the end of the list in-place.",
      commonMistake: "Writing `readings = readings.append(29)`, which assigns None because .append() returns None.",
      challengeExtension: "Append another reading 31."
    },
    {
      id: "q5",
      number: 5,
      title: "Remove Failed Sensor Reading",
      difficulty: "Easy",
      problem: "Given `sensors = [101, 102, 999, 103]`, remove the invalid sensor ID `999`.",
      agritechScenario: "Removing error codes or dead sensor entries from the registry.",
      hint: "Use `.remove(value)` to search and delete a specific element.",
      solution: `sensors = [101, 102, 999, 103]
sensors.remove(999)
print("Active sensors:", sensors)`,
      dryRun: "1. Search list for value 999.\n2. Locate at index 2 and remove it.\n3. Remaining list: [101, 102, 103].",
      output: "Active sensors: [101, 102, 103]",
      explanation: ".remove(x) finds the first occurrence of x and deletes it.",
      commonMistake: "Passing the index to remove() instead of the actual value.",
      challengeExtension: "Remove sensor 101."
    },
    {
      id: "q6",
      number: 6,
      title: "Find Highest Soil Moisture",
      difficulty: "Easy",
      problem: "Given `moisture = [18, 34, 27, 42, 31]`, find and print the maximum moisture value.",
      agritechScenario: "Identifying the field section with peak hydration.",
      hint: "Use Python's built-in `max()` function.",
      solution: `moisture = [18, 34, 27, 42, 31]
peak = max(moisture)
print("Highest moisture:", peak)`,
      dryRun: "1. max() scans all elements [18, 34, 27, 42, 31].\n2. Identifies 42 as peak.\n3. Returns 42.",
      output: "Highest moisture: 42",
      explanation: "Built-in max() iterates over any numeric iterable and returns the largest element.",
      commonMistake: "Writing moisture.max() (max is a built-in function, not a list method).",
      challengeExtension: "Find the max of a new reading set [12, 15, 9]."
    },
    {
      id: "q7",
      number: 7,
      title: "Find Lowest Soil Moisture",
      difficulty: "Easy",
      problem: "Given `moisture = [18, 34, 27, 42, 31]`, find and print the minimum moisture value.",
      agritechScenario: "Detecting the field region that urgently requires irrigation.",
      hint: "Use Python's built-in `min()` function.",
      solution: `moisture = [18, 34, 27, 42, 31]
lowest = min(moisture)
print("Lowest moisture:", lowest)`,
      dryRun: "1. min() inspects list elements.\n2. Identifies 18 as the smallest value.\n3. Returns 18.",
      output: "Lowest moisture: 18",
      explanation: "Built-in min() returns the smallest element in a collection.",
      commonMistake: "Confusing min() with min list index.",
      challengeExtension: "Check if lowest moisture is below 20."
    },
    {
      id: "q8",
      number: 8,
      title: "Calculate Total Weekly Rainfall",
      difficulty: "Easy",
      problem: "Given daily rainfall values `rainfall = [12.5, 8.0, 0.0, 15.2, 5.5]`, calculate the total rainfall sum.",
      agritechScenario: "Summing precipitation for water budget forecasting.",
      hint: "Use Python's built-in `sum()` function.",
      solution: `rainfall = [12.5, 8.0, 0.0, 15.2, 5.5]
total = sum(rainfall)
print(f"Total rainfall: {total} mm")`,
      dryRun: "1. sum() computes 12.5 + 8.0 + 0.0 + 15.2 + 5.5.\n2. Result: 41.2.",
      output: "Total rainfall: 41.2 mm",
      explanation: "Built-in sum() computes the arithmetic total of numeric collections.",
      commonMistake: "Calling sum() on a list containing non-numeric strings.",
      challengeExtension: "Round the result to 1 decimal place using round()."
    },
    {
      id: "q9",
      number: 9,
      title: "Count Sensor Telemetry Logs",
      difficulty: "Easy",
      problem: "Given a list of sensor logs `logs = ['S1', 'S2', 'S3', 'S4', 'S5']`, count the total number of logs.",
      agritechScenario: "Verifying how many active IoT devices reported telemetry.",
      hint: "Use `len()`.",
      solution: `logs = ["S1", "S2", "S3", "S4", "S5"]
total_logs = len(logs)
print("Total logs received:", total_logs)`,
      dryRun: "1. len() counts items in `logs`.\n2. Returns integer 5.",
      output: "Total logs received: 5",
      explanation: "len() calculates collection length in O(1) constant time.",
      commonMistake: "Confusing total elements with highest index (highest index is len - 1).",
      challengeExtension: "Check if len(logs) >= 5."
    },
    {
      id: "q10",
      number: 10,
      title: "Sort Sensor Readings",
      difficulty: "Easy",
      problem: "Given `readings = [45, 12, 89, 33, 67]`, produce a sorted list using `sorted()` and compare with `.sort()`.",
      agritechScenario: "Ordering temperature data from coolest to warmest.",
      hint: "sorted(list) returns a new list; list.sort() mutates in-place.",
      solution: `readings = [45, 12, 89, 33, 67]
new_sorted = sorted(readings)
print("Original list:", readings)
print("New sorted list:", new_sorted)

# In-place sort
readings.sort()
print("Mutated original:", readings)`,
      dryRun: "1. sorted() creates new list [12, 33, 45, 67, 89], leaving original unchanged.\n2. readings.sort() mutates original list.",
      output: "Original list: [45, 12, 89, 33, 67]\nNew sorted list: [12, 33, 45, 67, 89]\nMutated original: [12, 33, 45, 67, 89]",
      explanation: "sorted() is non-destructive, whereas .sort() modifies the original list.",
      commonMistake: "Assigning `x = readings.sort()`, which sets x to None.",
      challengeExtension: "Sort in descending order using `reverse=True`."
    },

    // 🟡 MEDIUM QUESTIONS (11-20)
    {
      id: "q11",
      number: 11,
      title: "Slice Weekly Readings for Weekdays",
      difficulty: "Medium",
      problem: "Given 7 daily moisture readings `week = [22, 24, 25, 23, 28, 19, 18]` (Mon-Sun), extract Monday through Friday using list slicing.",
      agritechScenario: "Filtering weekday crop metrics from weekend observations.",
      hint: "Use slicing syntax `week[0:5]`.",
      solution: `week = [22, 24, 25, 23, 28, 19, 18]
weekdays = week[0:5]
print("Weekday readings:", weekdays)`,
      dryRun: "1. Start index 0 (Mon: 22).\n2. Stop index 5 (exclusive, up to Fri: 28).\n3. Extracted sublist: [22, 24, 25, 23, 28].",
      output: "Weekday readings: [22, 24, 25, 23, 28]",
      explanation: "Slicing `[start:stop]` includes start index up to but excluding stop index.",
      commonMistake: "Using `[0:4]`, which omits Friday (index 4).",
      challengeExtension: "Extract weekend readings using `week[5:]`."
    },
    {
      id: "q12",
      number: 12,
      title: "Reverse Reading Order",
      difficulty: "Medium",
      problem: "Given `readings = [10, 20, 30, 40]`, produce a reversed list using `reversed()` and `.reverse()`.",
      agritechScenario: "Processing telemetry logs in reverse chronological order (newest first).",
      hint: "list(reversed(l)) returns a new list; l.reverse() modifies in-place.",
      solution: `readings = [10, 20, 30, 40]
rev_new = list(reversed(readings))
print("Reversed copy:", rev_new)

readings.reverse()
print("In-place reversed:", readings)`,
      dryRun: "1. reversed() yields reverse iterator -> list() converts to [40, 30, 20, 10].\n2. readings.reverse() flips original list.",
      output: "Reversed copy: [40, 30, 20, 10]\nIn-place reversed: [40, 30, 20, 10]",
      explanation: "reversed() is a non-destructive built-in; .reverse() mutates the original list.",
      commonMistake: "Forgetting to wrap reversed() with list().",
      challengeExtension: "Reverse a string list of crop names."
    },
    {
      id: "q13",
      number: 13,
      title: "Count Specific Sensor Flag Occurrences",
      difficulty: "Medium",
      problem: "Given status logs `flags = ['NORMAL', 'DRY', 'NORMAL', 'CRITICAL', 'NORMAL']`, count occurrences of 'NORMAL'.",
      agritechScenario: "Counting operational uptime occurrences.",
      hint: "Use `.count(value)`.",
      solution: `flags = ["NORMAL", "DRY", "NORMAL", "CRITICAL", "NORMAL"]
normal_count = flags.count("NORMAL")
print("Normal occurrences:", normal_count)`,
      dryRun: "1. Iterate through flags list.\n2. Count matches for 'NORMAL': index 0, index 2, index 4.\n3. Total count: 3.",
      output: "Normal occurrences: 3",
      explanation: ".count(x) scans the entire list and returns total occurrences matching x.",
      commonMistake: "Case mismatch ('normal' vs 'NORMAL').",
      challengeExtension: "Count occurrences of 'CRITICAL'."
    },
    {
      id: "q14",
      number: 14,
      title: "Find Index of First Faulty Sensor",
      difficulty: "Medium",
      problem: "Given `status = ['OK', 'OK', 'FAULT', 'OK']`, find the index of the first 'FAULT'.",
      agritechScenario: "Locating the exact array position of a faulty hardware node.",
      hint: "Use `.index(value)`.",
      solution: `status = ["OK", "OK", "FAULT", "OK"]
fault_index = status.index("FAULT")
print("First fault found at index:", fault_index)`,
      dryRun: "1. Inspect index 0 ('OK') -> no match.\n2. Inspect index 1 ('OK') -> no match.\n3. Inspect index 2 ('FAULT') -> match! Returns 2.",
      output: "First fault found at index: 2",
      explanation: ".index(x) searches left-to-right and returns the zero-based index of the first match.",
      commonMistake: "Searching for a item that does not exist raises a ValueError.",
      challengeExtension: "Wrap in `if 'FAULT' in status:` to prevent errors."
    },
    {
      id: "q15",
      number: 15,
      title: "Merge Two Sensor Fleets",
      difficulty: "Medium",
      problem: "Given `fleet_a = [101, 102]` and `fleet_b = [103, 104]`, merge `fleet_b` into `fleet_a` using `.extend()`.",
      agritechScenario: "Combining telemetries from two farm zones.",
      hint: "Use `fleet_a.extend(fleet_b)`.",
      solution: `fleet_a = [101, 102]
fleet_b = [103, 104]
fleet_a.extend(fleet_b)
print("Merged fleet:", fleet_a)`,
      dryRun: "1. Initial fleet_a: [101, 102].\n2. extend() appends 103 and 104 to fleet_a.\n3. Combined fleet_a: [101, 102, 103, 104].",
      output: "Merged fleet: [101, 102, 103, 104]",
      explanation: ".extend(iterable) appends every item from another iterable to the list.",
      commonMistake: "Using `fleet_a.append(fleet_b)`, which nests fleet_b as a single sublist `[101, 102, [103, 104]]`.",
      challengeExtension: "Merge using concatenation `+` into a new list."
    },
    {
      id: "q16",
      number: 16,
      title: "Insert Priority Alert Sensor",
      difficulty: "Medium",
      problem: "Given `sensors = [101, 103, 104]`, insert priority sensor `102` at index 1.",
      agritechScenario: "Inserting a newly assigned sensor between existing node IDs.",
      hint: "Use `.insert(index, element)`.",
      solution: `sensors = [101, 103, 104]
sensors.insert(1, 102)
print("Reordered sensors:", sensors)`,
      dryRun: "1. Target index 1.\n2. Shift elements at index 1..end to the right.\n3. Insert 102 at index 1 -> [101, 102, 103, 104].",
      output: "Reordered sensors: [101, 102, 103, 104]",
      explanation: ".insert(i, x) places element x at specified position i, shifting subsequent items.",
      commonMistake: "Reversing parameter order `.insert(element, index)`.",
      challengeExtension: "Insert sensor 100 at index 0."
    },
    {
      id: "q17",
      number: 17,
      title: "Copy List vs Assignment",
      difficulty: "Medium",
      problem: "Given `original = [10, 20, 30]`, create a copy using `.copy()`. Modify the copy and verify `original` is unchanged.",
      agritechScenario: "Creating a sandbox copy of moisture data before applying calibration offsets.",
      hint: "Direct assignment `a = b` creates a reference; `.copy()` creates an independent shallow copy.",
      solution: `original = [10, 20, 30]
sandbox = original.copy()
sandbox[0] = 99

print("Original:", original)
print("Sandbox:", sandbox)`,
      dryRun: "1. sandbox = original.copy() creates a new list object.\n2. Mutating sandbox[0] does not alter original.",
      output: "Original: [10, 20, 30]\nSandbox: [99, 20, 30]",
      explanation: ".copy() produces an independent copy so mutations do not leak back.",
      commonMistake: "Writing `sandbox = original`, which points both variables to the same memory reference.",
      challengeExtension: "Create a copy using slice syntax `original[:]`."
    },
    {
      id: "q18",
      number: 18,
      title: "Store GPS Coordinates in a Tuple",
      difficulty: "Medium",
      problem: "Create a tuple `location = (17.385, 78.486)` representing latitude and longitude. Print latitude and longitude individually.",
      agritechScenario: "Storing fixed field GPS coordinates.",
      hint: "Use parentheses () for tuples.",
      solution: `location = (17.385, 78.486)
print("Latitude:", location[0])
print("Longitude:", location[1])`,
      dryRun: "1. Define tuple location.\n2. Access index 0 for lat, index 1 for long.\n3. Print extracted values.",
      output: "Latitude: 17.385\nLongitude: 78.486",
      explanation: "Tuples store ordered, immutable data structures. Elements are accessed via zero-based indexing.",
      commonMistake: "Attempting `location[0] = 18.0` raises TypeError (tuples are immutable).",
      challengeExtension: "Verify tuple length using `len(location)`."
    },
    {
      id: "q19",
      number: 19,
      title: "Unpack Sensor Tuple",
      difficulty: "Medium",
      problem: "Given tuple `sensor = (101, 'Rice', 28.5)`, unpack its values into variables `sensor_id`, `crop`, and `moisture`.",
      agritechScenario: "Unpacking multi-field sensor records into individual variables.",
      hint: "Assign tuple directly to 3 comma-separated variable names.",
      solution: `sensor = (101, "Rice", 28.5)
sensor_id, crop, moisture = sensor

print(f"ID: {sensor_id}, Crop: {crop}, Moisture: {moisture}%")`,
      dryRun: "1. Unpack element 0 (101) into `sensor_id`.\n2. Unpack element 1 ('Rice') into `crop`.\n3. Unpack element 2 (28.5) into `moisture`.",
      output: "ID: 101, Crop: Rice, Moisture: 28.5%",
      explanation: "Tuple unpacking assigns elements to variables in order.",
      commonMistake: "Mismatching variable count with tuple element count raises ValueError.",
      challengeExtension: "Unpack a 4-element tuple."
    },
    {
      id: "q20",
      number: 20,
      title: "Tuple Packing and Unpacking Cycle",
      difficulty: "Medium",
      problem: "Pack 3 telemetry metrics into a tuple `telemetry`, then unpack them into `temp`, `humidity`, `ph` and print.",
      agritechScenario: "Packaging multiple sensor outputs into a single payload.",
      hint: "Packing: `t = a, b, c`; Unpacking: `x, y, z = t`.",
      solution: `# Packing
temp_val = 32.4
hum_val = 65.0
ph_val = 6.8
telemetry = temp_val, hum_val, ph_val

# Unpacking
temp, humidity, ph = telemetry
print(f"Temp: {temp}°C, Humidity: {humidity}%, pH: {ph}")`,
      dryRun: "1. Pack values into tuple (32.4, 65.0, 6.8).\n2. Unpack tuple into temp, humidity, ph.",
      output: "Temp: 32.4°C, Humidity: 65.0%, pH: 6.8",
      explanation: "Python automatically packs comma-separated items into a tuple and unpacks them into matching target variables.",
      commonMistake: "Forgetting that commas define tuple packing, even without parentheses.",
      challengeExtension: "Print type(telemetry) to confirm it is a tuple."
    },

    // 🔴 ADVANCED QUESTIONS (21-30)
    {
      id: "q21",
      number: 21,
      title: "Weekly Rainfall Average Calculation",
      difficulty: "Advanced",
      problem: "Given 7 daily rainfall readings `rain = [12.0, 0.0, 5.5, 18.2, 0.0, 8.4, 3.1]`, calculate and print the average daily rainfall rounded to 2 decimal places.",
      agritechScenario: "Computing weekly water supply averages for smart irrigation control.",
      hint: "Average = sum(rain) / len(rain). Use round(val, 2).",
      solution: `rain = [12.0, 0.0, 5.5, 18.2, 0.0, 8.4, 3.1]
total = sum(rain)
count = len(rain)
average = round(total / count, 2)

print(f"Total: {total} mm, Count: {count} days")
print(f"Average Daily Rainfall: {average} mm")`,
      dryRun: "1. total = sum(...) -> 47.2.\n2. count = len(...) -> 7.\n3. average = 47.2 / 7 -> 6.74285...\n4. round(..., 2) -> 6.74.",
      output: "Total: 47.2 mm, Count: 7 days\nAverage Daily Rainfall: 6.74 mm",
      explanation: "Combining sum() and len() computes averages dynamically without manual loops.",
      commonMistake: "Dividing by a hardcoded number like 7 instead of using len(rain).",
      challengeExtension: "Check if average > 5.0 mm."
    },
    {
      id: "q22",
      number: 22,
      title: "Find Duplicate Temperature Readings",
      difficulty: "Advanced",
      problem: "Given `temps = [24, 28, 24, 30, 28, 32]`, identify and print all unique values that appear more than once.",
      agritechScenario: "Detecting repeated sensor readings across sensor logs.",
      hint: "Use `.count(val)` inside a loop and track duplicates.",
      solution: `temps = [24, 28, 24, 30, 28, 32]
duplicates = []

for t in temps:
    if temps.count(t) > 1 and t not in duplicates:
        duplicates.append(t)

print("Duplicate temperature readings:", duplicates)`,
      dryRun: "1. For 24: count=2, not in duplicates -> append 24.\n2. For 28: count=2, not in duplicates -> append 28.\n3. Output duplicates [24, 28].",
      output: "Duplicate temperature readings: [24, 28]",
      explanation: "Checking count(t) > 1 finds duplicates; `not in` prevents duplicate entries in the result list.",
      commonMistake: "Adding the duplicate number multiple times to the result list.",
      challengeExtension: "Count total duplicate occurrences."
    },
    {
      id: "q23",
      number: 23,
      title: "Maintain Top 5 Highest Temperatures",
      difficulty: "Advanced",
      problem: "Given historical temperatures `all_temps = [31, 42, 28, 39, 45, 33, 40, 29]`, find the top 5 highest temperatures sorted in descending order.",
      agritechScenario: "Filtering heatwave telemetry records for thermal safety alerts.",
      hint: "Use `sorted(all_temps, reverse=True)[:5]`.",
      solution: `all_temps = [31, 42, 28, 39, 45, 33, 40, 29]
top_5 = sorted(all_temps, reverse=True)[:5]
print("Top 5 Highest Temps:", top_5)`,
      dryRun: "1. sorted(reverse=True) -> [45, 42, 40, 39, 33, 31, 29, 28].\n2. Slice [:5] -> [45, 42, 40, 39, 33].",
      output: "Top 5 Highest Temps: [45, 42, 40, 39, 33]",
      explanation: "Sorting in reverse order puts largest numbers first, then slice `[:5]` extracts top 5.",
      commonMistake: "Using `[0:5]` on an ascending sorted list (extracts lowest 5).",
      challengeExtension: "Extract top 3 instead."
    },
    {
      id: "q24",
      number: 24,
      title: "Store Farm Metadata in Immutable Tuples",
      difficulty: "Advanced",
      problem: "Create a tuple `farm = ('Green Valley', 'Zone 4', 150.5)` containing farm name, zone, and area in acres. Print a formatted summary report.",
      agritechScenario: "Storing fixed farm registration credentials.",
      hint: "Unpack or index tuple elements inside an f-string.",
      solution: `farm = ("Green Valley", "Zone 4", 150.5)
name, zone, area = farm

print("--- FARM METADATA REPORT ---")
print(f"Farm Name : {name}")
print(f"Zone      : {zone}")
print(f"Total Area: {area} acres")`,
      dryRun: "1. Tuple initialized with 3 values.\n2. Values unpacked into name, zone, area.\n3. Formatted report printed.",
      output: "--- FARM METADATA REPORT ---\nFarm Name : Green Valley\nZone      : Zone 4\nTotal Area: 150.5 acres",
      explanation: "Tuples ensure metadata attributes remain immutable throughout program execution.",
      commonMistake: "Trying to alter farm[2] = 200.0 (raises TypeError).",
      challengeExtension: "Add owner name to tuple."
    },
    {
      id: "q25",
      number: 25,
      title: "Swap Two Variables Using Tuple Unpacking",
      difficulty: "Advanced",
      problem: "Given `sensor_a = 28` and `sensor_b = 35`, swap their values using Python's tuple packing/unpacking syntax `a, b = b, a`.",
      agritechScenario: "Swapping sensor channel data streams.",
      hint: "Use `sensor_a, sensor_b = sensor_b, sensor_a`.",
      solution: `sensor_a = 28
sensor_b = 35

print(f"Before: sensor_a={sensor_a}, sensor_b={sensor_b}")
sensor_a, sensor_b = sensor_b, sensor_a
print(f"After:  sensor_a={sensor_a}, sensor_b={sensor_b}")`,
      dryRun: "1. RHS (sensor_b, sensor_a) creates tuple (35, 28).\n2. LHS unpacks 35 to sensor_a, 28 to sensor_b.",
      output: "Before: sensor_a=28, sensor_b=35\nAfter:  sensor_a=35, sensor_b=28",
      explanation: "Python evaluates the right side into a temporary tuple before assigning to the left side, eliminating temporary variables.",
      commonMistake: "Using traditional 3-line temporary variable logic when `a, b = b, a` is shorter.",
      challengeExtension: "Swap 3 variables `a, b, c = c, a, b`."
    },
    {
      id: "q26",
      number: 26,
      title: "2D Nested List Field Moisture Grid",
      difficulty: "Advanced",
      problem: "Given a 2D matrix of field moisture readings `grid = [[24, 25], [28, 29]]`, access and print the top-right reading (row 0, col 1) and bottom-left reading (row 1, col 0).",
      agritechScenario: "Representing a 2x2 grid of field sensor nodes.",
      hint: "Use double indexing: `grid[row][col]`.",
      solution: `grid = [
    [24, 25],  # Row 0
    [28, 29]   # Row 1
]

top_right = grid[0][1]
bottom_left = grid[1][0]

print("Top-Right reading:", top_right)
print("Bottom-Left reading:", bottom_left)`,
      dryRun: "1. grid[0] -> [24, 25]; grid[0][1] -> 25.\n2. grid[1] -> [28, 29]; grid[1][0] -> 28.",
      output: "Top-Right reading: 25\nBottom-Left reading: 28",
      explanation: "Nested lists represent multi-dimensional grids. First index selects row, second index selects column.",
      commonMistake: "Writing `grid[0, 1]` (comma indexing requires NumPy).",
      challengeExtension: "Calculate sum of all 4 grid numbers."
    },
    {
      id: "q27",
      number: 27,
      title: "Iterate and Report Multi-Farm Names",
      difficulty: "Advanced",
      problem: "Given `farms = ['Green Valley', 'Sunny Acre', 'Highland Farm']`, iterate over the list with a `for` loop and print numbered farm records.",
      agritechScenario: "Generating an automated farm index report.",
      hint: "Use `enumerate(farms, start=1)` or `for i in range(len(farms))`.",
      solution: `farms = ["Green Valley", "Sunny Acre", "Highland Farm"]

for idx, farm in enumerate(farms, start=1):
    print(f"Farm #{idx}: {farm}")`,
      dryRun: "1. idx=1, farm='Green Valley' -> print Farm #1: Green Valley.\n2. idx=2, farm='Sunny Acre' -> print Farm #2: Sunny Acre.\n3. idx=3, farm='Highland Farm' -> print Farm #3: Highland Farm.",
      output: "Farm #1: Green Valley\nFarm #2: Sunny Acre\nFarm #3: Highland Farm",
      explanation: "enumerate() returns index and value pairs during iteration.",
      commonMistake: "Manually incrementing an index variable when enumerate() exists.",
      challengeExtension: "Print farm names in uppercase."
    },
    {
      id: "q28",
      number: 28,
      title: "Mini Irrigation Telemetry Summary Report",
      difficulty: "Advanced",
      problem: "Given `readings = [22.5, 31.0, 18.2, 40.5, 27.8]`, print a diagnostic report with total readings count, min moisture, max moisture, sum, and average.",
      agritechScenario: "Generating automated daily irrigation telemetry summaries.",
      hint: "Use `len()`, `min()`, `max()`, `sum()`, and calculate average.",
      solution: `readings = [22.5, 31.0, 18.2, 40.5, 27.8]

count = len(readings)
low = min(readings)
high = max(readings)
total = sum(readings)
avg = round(total / count, 2)

print("=== IRRIGATION TELEMETRY REPORT ===")
print(f"Total Readings : {count}")
print(f"Min Moisture   : {low}%")
print(f"Max Moisture   : {high}%")
print(f"Sum Moisture   : {total}")
print(f"Average        : {avg}%")`,
      dryRun: "1. Calculate metrics via built-ins.\n2. Print aligned report.",
      output: "=== IRRIGATION TELEMETRY REPORT ===\nTotal Readings : 5\nMin Moisture   : 18.2%\nMax Moisture   : 40.5%\nSum Moisture   : 140.0\nAverage        : 28.0%",
      explanation: "Aggregating built-in functions produces structured analytical reports.",
      commonMistake: "Not handling floating point rounding for average.",
      challengeExtension: "Add condition checking if average is below 25.0%."
    },
    {
      id: "q29",
      number: 29,
      title: "Simple Crop Inventory Manager",
      difficulty: "Advanced",
      problem: "Create a list `inventory = ['Rice', 'Wheat']`. Write code to append 'Corn', remove 'Rice', check if 'Wheat' is in inventory, and print total count.",
      agritechScenario: "Managing crop seeds in a smart farm warehouse inventory.",
      hint: "Use `.append()`, `.remove()`, `in` operator, and `len()`.",
      solution: `inventory = ["Rice", "Wheat"]

# 1. Add Corn
inventory.append("Corn")

# 2. Remove Rice
inventory.remove("Rice")

# 3. Search Wheat
has_wheat = "Wheat" in inventory

print("Updated Inventory:", inventory)
print("Contains Wheat?:", has_wheat)
print("Total Crop Types:", len(inventory))`,
      dryRun: "1. Start: ['Rice', 'Wheat'].\n2. Add 'Corn': ['Rice', 'Wheat', 'Corn'].\n3. Remove 'Rice': ['Wheat', 'Corn'].\n4. Search 'Wheat' -> True.\n5. Length -> 2.",
      output: "Updated Inventory: ['Wheat', 'Corn']\nContains Wheat?: True\nTotal Crop Types: 2",
      explanation: "Combines list mutation, membership testing (`in`), and built-in functions.",
      commonMistake: "Trying to remove an item that was already deleted.",
      challengeExtension: "Sort the inventory alphabetically."
    },
    {
      id: "q30",
      number: 30,
      title: "Mini-Project: Smart Farm Reading Manager",
      difficulty: "Advanced",
      problem: "Build a complete reading manager script for `readings = [30, 22, 45, 18, 38]`. Perform: add 25, update index 0 to 32, remove 18, calculate max, min, average, and display sorted list.",
      agritechScenario: "Complete telemetry cycle for a smart farm IoT controller.",
      hint: "Combine append, index update, remove, min/max/sum/len, and sorted.",
      solution: `readings = [30, 22, 45, 18, 38]

# 1. Add reading 25
readings.append(25)

# 2. Update index 0 to 32
readings[0] = 32

# 3. Remove reading 18
readings.remove(18)

# 4. Diagnostics
high = max(readings)
low = min(readings)
avg = round(sum(readings) / len(readings), 2)
sorted_readings = sorted(readings)

print("Final Readings List:", readings)
print("Sorted View        :", sorted_readings)
print(f"Max: {high}, Min: {low}, Avg: {avg}")`,
      dryRun: "1. append 25 -> [30, 22, 45, 18, 38, 25].\n2. readings[0]=32 -> [32, 22, 45, 18, 38, 25].\n3. remove 18 -> [32, 22, 45, 38, 25].\n4. Compute max=45, min=22, sum=162, avg=32.4.",
      output: "Final Readings List: [32, 22, 45, 38, 25]\nSorted View        : [22, 25, 32, 38, 45]\nMax: 45, Min: 22, Avg: 32.4",
      explanation: "Integrates list creation, index updates, mutation, built-in functions, and non-destructive sorting into a complete workflow.",
      commonMistake: "Performing operations out of sequence.",
      challengeExtension: "Filter out readings above 40."
    }
  ],
  commonMistakesSummary: [
    "Using parentheses () instead of square brackets [] when defining lists.",
    "Attempting to modify immutable tuple elements in-place.",
    "Assigning `x = my_list.append(item)`, which sets x to None.",
    "Confusing non-destructive `sorted(list)` with in-place `list.sort()`.",
    "Forgetting 0-based indexing (first item is at index 0, last at len-1 or -1).",
    "Index out of range errors when accessing elements past list bounds.",
    "Dividing sum() by a hardcoded number instead of `len(collection)`."
  ],
  capstoneChallenge: {
    title: "Farm Reading Analyzer Capstone",
    brief: "Build an automated Python analysis script that manages field moisture telemetry readings, computes key metrics, and prints a formatted report.",
    requirements: [
      "Store initial readings: [28, 34, 19, 42, 31]",
      "Append a new reading: 25",
      "Remove invalid reading: 19",
      "Calculate highest, lowest, and average moisture",
      "Display sorted readings (descending order) and total count"
    ],
    starterCode: `# Farm Reading Analyzer Capstone
readings = [28, 34, 19, 42, 31]

# 1. Append new reading 25

# 2. Remove reading 19

# 3. Compute metrics

# 4. Print summary report
`,
    expectedOutcome: `=== FARM READING ANALYZER ===
Total Readings : 5
Sorted (Desc)  : [42, 34, 31, 28, 25]
Highest        : 42%
Lowest         : 25%
Average        : 32.0%`
  }
};
