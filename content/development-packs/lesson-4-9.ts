import type { SetDictPracticeDevelopmentPack } from "@/types/content";

export const setDictPracticeDevelopmentPack: SetDictPracticeDevelopmentPack = {
  kind: "set-dict-practice",
  prerequisite: "Lesson 4.8 – Solved Programming Questions (Lists & Tuples)",
  introduction: {
    title: "Mastering Sets & Dictionaries Through Solved Problems",
    body: "Welcome to Lesson 4.9. In this lesson, you will work through 30 real-world agritech programming questions covering set operations (union, intersection, difference), dictionary creation, key-value access, dictionary methods (keys, values, items, update, get), and structured farm data modelling. Each question follows the same format: problem statement, agritech scenario, hint, solution, dry run, output, explanation, common mistake, and challenge extension."
  },
  questions: [
    // ─── 🟢 EASY QUESTIONS (1-10) ───────────────────────────────────────────

    {
      id: "sd-q1",
      number: 1,
      title: "Remove Duplicate Crop Names",
      difficulty: "Easy",
      problem: "Create a list `crops = ['Rice', 'Rice', 'Wheat', 'Corn', 'Corn', 'Wheat']` that contains duplicates. Convert it to a set to remove all duplicates and print the result.",
      agritechScenario: "A farm management system receives repeated crop entries from multiple data pipelines. A unique registry is required for downstream processing.",
      hint: "Pass the list directly to `set()`. A set stores only unique elements, so duplicates are dropped automatically.",
      solution: `crops = ["Rice", "Rice", "Wheat", "Corn", "Corn", "Wheat"]
unique_crops = set(crops)
print("Unique crops:", unique_crops)`,
      dryRun: "1. Create list `crops` with 6 elements, 3 unique values.\n2. `set(crops)` builds a set, discarding duplicates.\n3. Result: {'Rice', 'Wheat', 'Corn'} — order may vary because sets are unordered.",
      output: "Unique crops: {'Rice', 'Wheat', 'Corn'}",
      explanation: "A Python set only stores each unique value once. When you pass a list to `set()`, Python iterates the list and skips every element it has already seen.",
      commonMistake: "Expecting the set to preserve insertion order. Sets are unordered, so the printed order may differ from the original list.",
      challengeExtension: "Convert the resulting set back to a sorted list using `sorted(unique_crops)`."
    },
    {
      id: "sd-q2",
      number: 2,
      title: "Create a Set of Sensor IDs",
      difficulty: "Easy",
      problem: "Create a set named `sensor_ids` containing the integers 101, 102, 103, 104. Print the set and verify that it contains 4 elements using `len()`.",
      agritechScenario: "A field monitoring dashboard registers four active sensors. Only unique IDs should be stored in memory.",
      hint: "Use curly braces `{}` with integers to create a set literal: `{101, 102, 103, 104}`.",
      solution: `sensor_ids = {101, 102, 103, 104}
print("Sensor IDs:", sensor_ids)
print("Total sensors:", len(sensor_ids))`,
      dryRun: "1. Python evaluates the set literal `{101, 102, 103, 104}` — all 4 integers are unique.\n2. Print the set.\n3. `len(sensor_ids)` returns 4.",
      output: "Sensor IDs: {101, 102, 103, 104}\nTotal sensors: 4",
      explanation: "A set literal uses curly braces with comma-separated values. Unlike a dict literal, it contains plain values rather than key-value pairs.",
      commonMistake: "Writing `{}` without values creates an empty **dictionary**, not an empty set. Use `set()` for an empty set.",
      challengeExtension: "Add sensor 105 and verify the count increases to 5."
    },
    {
      id: "sd-q3",
      number: 3,
      title: "Add a New Sensor Using add()",
      difficulty: "Easy",
      problem: "Start with `sensor_ids = {101, 102, 103}`. Add sensor 104 using the `.add()` method, then print the updated set.",
      agritechScenario: "A newly deployed field sensor registers itself with the central monitoring hub.",
      hint: "Use `sensor_ids.add(104)`. If 104 already exists, the set is unchanged.",
      solution: `sensor_ids = {101, 102, 103}
sensor_ids.add(104)
print("Updated sensors:", sensor_ids)`,
      dryRun: "1. Set contains {101, 102, 103}.\n2. `.add(104)` inserts 104 (not already present).\n3. Set becomes {101, 102, 103, 104}.",
      output: "Updated sensors: {101, 102, 103, 104}",
      explanation: "`.add(element)` inserts a single element into a set. It is a no-op (silent, no error) if the element already exists.",
      commonMistake: "Writing `sensor_ids = sensor_ids.add(104)`, which assigns None because `.add()` is in-place and returns None.",
      challengeExtension: "Try adding 101 again and confirm the set size does not increase."
    },
    {
      id: "sd-q4",
      number: 4,
      title: "Remove a Sensor Using remove()",
      difficulty: "Easy",
      problem: "Given `sensor_ids = {101, 102, 103, 104}`, remove sensor 102 using `.remove()` and print the result.",
      agritechScenario: "Sensor 102 has been decommissioned and must be deleted from the active sensor registry.",
      hint: "Use `sensor_ids.remove(102)`. If the element does not exist, Python raises a `KeyError`.",
      solution: `sensor_ids = {101, 102, 103, 104}
sensor_ids.remove(102)
print("Remaining sensors:", sensor_ids)`,
      dryRun: "1. Set is {101, 102, 103, 104}.\n2. `.remove(102)` locates 102 and deletes it.\n3. Set becomes {101, 103, 104}.",
      output: "Remaining sensors: {101, 103, 104}",
      explanation: "`.remove(element)` deletes the element from the set. It raises a `KeyError` if the element is not found.",
      commonMistake: "Passing an ID that does not exist will crash the program with a `KeyError`. Use `.discard()` when unsure.",
      challengeExtension: "Try removing an ID that does not exist (e.g., 999) and observe the KeyError."
    },
    {
      id: "sd-q5",
      number: 5,
      title: "Safe Removal Using discard()",
      difficulty: "Easy",
      problem: "Given `sensor_ids = {101, 102, 103}`, attempt to remove sensor 999 using `.discard()`. Print the set before and after. Explain why no error is raised.",
      agritechScenario: "A deregistration request arrives for sensor 999, which was never registered. The system must handle this gracefully without crashing.",
      hint: "`.discard(element)` silently does nothing if the element is absent, unlike `.remove()` which raises a KeyError.",
      solution: `sensor_ids = {101, 102, 103}
print("Before:", sensor_ids)
sensor_ids.discard(999)   # 999 is not in the set — no error
print("After:", sensor_ids)`,
      dryRun: "1. Set is {101, 102, 103}.\n2. `.discard(999)` checks for 999 — not found.\n3. No exception raised; set unchanged.\n4. Print shows same set.",
      output: "Before: {101, 102, 103}\nAfter: {101, 102, 103}",
      explanation: "`.discard()` is the safe alternative to `.remove()`. It suppresses the KeyError when the element does not exist, making it ideal for defensive delete operations.",
      commonMistake: "Using `.remove()` when the element may not be present. Always use `.discard()` when the presence of the element is uncertain.",
      challengeExtension: "Use `.discard(101)` and verify that the existing element is removed correctly."
    },
    {
      id: "sd-q6",
      number: 6,
      title: "Count Unique Sensor IDs",
      difficulty: "Easy",
      problem: "Given `sensor_ids = {101, 102, 103, 104, 105}`, use `len()` to count the number of unique sensors and print a formatted message.",
      agritechScenario: "The farm operations dashboard displays a live count of registered sensors.",
      hint: "Pass the set to the built-in `len()` function just as you would with a list.",
      solution: `sensor_ids = {101, 102, 103, 104, 105}
count = len(sensor_ids)
print(f"Total active sensors: {count}")`,
      dryRun: "1. `len(sensor_ids)` counts 5 elements.\n2. count = 5.\n3. f-string formats output.",
      output: "Total active sensors: 5",
      explanation: "`len()` works with any iterable in Python — lists, tuples, sets, dictionaries, and strings. For a set it returns the count of unique elements.",
      commonMistake: "Expecting `len()` to return index positions. It always returns total count, starting from 1.",
      challengeExtension: "Add a duplicate ID like 101 again and verify len() still returns 5."
    },
    {
      id: "sd-q7",
      number: 7,
      title: "Create a Farm Information Dictionary",
      difficulty: "Easy",
      problem: "Create a dictionary named `farm` with the following key-value pairs: `name: 'Green Valley'`, `crop: 'Rice'`, `temperature: 31`. Print the complete dictionary.",
      agritechScenario: "A farm record is created the moment a new farm registers on the platform.",
      hint: "Use curly braces with `'key': value` pairs separated by commas.",
      solution: `farm = {
    "name": "Green Valley",
    "crop": "Rice",
    "temperature": 31
}
print(farm)`,
      dryRun: "1. Python evaluates the dict literal — 3 key-value pairs.\n2. `name` maps to 'Green Valley'.\n3. `crop` maps to 'Rice'.\n4. `temperature` maps to 31.",
      output: "{'name': 'Green Valley', 'crop': 'Rice', 'temperature': 31}",
      explanation: "A Python dictionary is an ordered (Python 3.7+) collection of unique keys mapped to their values. Keys must be immutable (strings, numbers, tuples).",
      commonMistake: "Using square brackets [] which creates a list. Dictionaries use curly braces {}.",
      challengeExtension: "Add a `humidity` key with value 68 to the farm dictionary."
    },
    {
      id: "sd-q8",
      number: 8,
      title: "Access Dictionary Values Using [] and get()",
      difficulty: "Easy",
      problem: "Given the `farm` dictionary from Question 7, access the `crop` value using square bracket notation and the `temperature` value using `.get()`. Print both and explain the difference.",
      agritechScenario: "The irrigation controller queries specific farm parameters before triggering an irrigation cycle.",
      hint: "`farm['crop']` raises a KeyError if the key is missing. `farm.get('temperature')` returns None if the key is absent.",
      solution: `farm = {"name": "Green Valley", "crop": "Rice", "temperature": 31}

crop = farm["crop"]
temperature = farm.get("temperature")
missing = farm.get("battery", "N/A")   # default value

print("Crop:", crop)
print("Temperature:", temperature)
print("Battery:", missing)`,
      dryRun: "1. `farm['crop']` returns 'Rice' directly.\n2. `farm.get('temperature')` returns 31.\n3. `farm.get('battery', 'N/A')` — 'battery' missing, returns 'N/A'.",
      output: "Crop: Rice\nTemperature: 31\nBattery: N/A",
      explanation: "`[]` is direct access — fast but raises KeyError if key missing. `.get(key, default)` is safe — returns the default (None if not specified) when the key does not exist.",
      commonMistake: "Using `farm['battery']` when battery is not registered yet. This crashes with a KeyError. Use `.get()` for optional fields.",
      challengeExtension: "Access a non-existent key `'rainfall'` with a default of 0 using `.get()`."
    },
    {
      id: "sd-q9",
      number: 9,
      title: "Update a Dictionary Value",
      difficulty: "Easy",
      problem: "Given `farm = {'name': 'Green Valley', 'crop': 'Rice', 'temperature': 31}`, update the `crop` from 'Rice' to 'Wheat'. Print the dictionary before and after the update.",
      agritechScenario: "The farm transitions to a new crop season and the registry must be updated.",
      hint: "Assign directly: `farm['crop'] = 'Wheat'`. Dictionaries are mutable.",
      solution: `farm = {"name": "Green Valley", "crop": "Rice", "temperature": 31}
print("Before:", farm)
farm["crop"] = "Wheat"
print("After:", farm)`,
      dryRun: "1. Before — crop = 'Rice'.\n2. `farm['crop'] = 'Wheat'` overwrites the value for key 'crop'.\n3. After — crop = 'Wheat', other keys unchanged.",
      output: "Before: {'name': 'Green Valley', 'crop': 'Rice', 'temperature': 31}\nAfter: {'name': 'Green Valley', 'crop': 'Wheat', 'temperature': 31}",
      explanation: "Assigning to an existing key overwrites its value in-place. The key itself is not duplicated — dictionaries enforce unique keys.",
      commonMistake: "Writing `farm['Crop'] = 'Wheat'` with capital C creates a new key 'Crop'. Dictionary keys are case-sensitive.",
      challengeExtension: "Update temperature from 31 to 35 and verify the change."
    },
    {
      id: "sd-q10",
      number: 10,
      title: "Add a New Key to a Dictionary",
      difficulty: "Easy",
      problem: "Given `farm = {'name': 'Green Valley', 'crop': 'Wheat'}`, add a new key `battery` with value 87. Print the updated dictionary.",
      agritechScenario: "A sensor battery level is reported for the first time and added to the farm record.",
      hint: "Assign to a new key using square brackets: `farm['battery'] = 87`. If the key does not exist, Python creates it.",
      solution: `farm = {"name": "Green Valley", "crop": "Wheat"}
farm["battery"] = 87
print("Updated farm:", farm)`,
      dryRun: "1. Dictionary has 2 keys.\n2. `farm['battery'] = 87` — 'battery' does not exist, so Python adds it.\n3. Dictionary now has 3 keys.",
      output: "Updated farm: {'name': 'Green Valley', 'crop': 'Wheat', 'battery': 87}",
      explanation: "Assigning to a new key extends the dictionary. Python does not raise an error — it simply inserts the new key-value pair at the end (Python 3.7+ preserves insertion order).",
      commonMistake: "Using `.add()` which is a set method, not a dictionary method. Dictionaries use direct assignment `dict[key] = value`.",
      challengeExtension: "Add a `status` key with value 'Active' and print all keys using `farm.keys()`."
    },

    // ─── 🟡 MEDIUM QUESTIONS (11-20) ────────────────────────────────────────

    {
      id: "sd-q11",
      number: 11,
      title: "Remove Duplicate Moisture Readings",
      difficulty: "Medium",
      problem: "Given `moisture = [22, 25, 22, 30, 25, 28, 30, 22]`, convert to a set to remove duplicates, then convert back to a sorted list and print both the unique set and the sorted list.",
      agritechScenario: "Multiple IoT sensors send overlapping soil moisture readings. The analytics engine needs a clean, ordered unique sequence.",
      hint: "Chain: `list(sorted(set(moisture)))` to deduplicate and sort in one expression.",
      solution: `moisture = [22, 25, 22, 30, 25, 28, 30, 22]
unique = set(moisture)
sorted_unique = sorted(unique)
print("Unique set:", unique)
print("Sorted unique:", sorted_unique)`,
      dryRun: "1. Original list has 8 elements (3 duplicates).\n2. `set(moisture)` → {22, 25, 28, 30} (4 unique values).\n3. `sorted({22, 25, 28, 30})` → [22, 25, 28, 30].",
      output: "Unique set: {28, 25, 22, 30}\nSorted unique: [22, 25, 28, 30]",
      explanation: "Converting a list to a set removes duplicates efficiently (O(n) time). Converting back to a sorted list restores a predictable order for analytics.",
      commonMistake: "Expecting the set to retain insertion order. Use `sorted()` explicitly to guarantee ordering.",
      challengeExtension: "Calculate the average of the unique sorted readings."
    },
    {
      id: "sd-q12",
      number: 12,
      title: "Find Common Sensors Between Two Farms",
      difficulty: "Medium",
      problem: "Farm A has sensors {101, 102, 103, 104} and Farm B has sensors {103, 104, 105, 106}. Use `.intersection()` to find sensors that are active in **both** farms.",
      agritechScenario: "A cross-farm comparison tool identifies shared sensing infrastructure for maintenance scheduling.",
      hint: "Use `farm_a.intersection(farm_b)` or the `&` operator.",
      solution: `farm_a = {101, 102, 103, 104}
farm_b = {103, 104, 105, 106}

common = farm_a.intersection(farm_b)
print("Common sensors:", common)

# Operator shorthand
print("Using & operator:", farm_a & farm_b)`,
      dryRun: "1. farm_a = {101, 102, 103, 104}.\n2. farm_b = {103, 104, 105, 106}.\n3. Intersection = elements in both = {103, 104}.",
      output: "Common sensors: {103, 104}\nUsing & operator: {103, 104}",
      explanation: "Set intersection returns only elements that appear in **all** operand sets. Both `.intersection()` and the `&` operator are equivalent.",
      commonMistake: "Confusing intersection (common elements) with union (all elements). Intersection always returns fewer or equal elements.",
      challengeExtension: "Find sensors common to all three farms if Farm C = {104, 105, 107}."
    },
    {
      id: "sd-q13",
      number: 13,
      title: "Combine All Sensors from Two Farms",
      difficulty: "Medium",
      problem: "Farm A has sensors {101, 102, 103} and Farm B has sensors {103, 104, 105}. Use `.union()` to get all unique sensors across both farms.",
      agritechScenario: "A central dashboard displays all unique sensor IDs across the entire farm network.",
      hint: "Use `farm_a.union(farm_b)` or the `|` operator.",
      solution: `farm_a = {101, 102, 103}
farm_b = {103, 104, 105}

all_sensors = farm_a.union(farm_b)
print("All sensors:", all_sensors)
print("Total count:", len(all_sensors))`,
      dryRun: "1. farm_a = {101, 102, 103}.\n2. farm_b = {103, 104, 105}.\n3. Union combines all unique values = {101, 102, 103, 104, 105} (103 appears once).",
      output: "All sensors: {101, 102, 103, 104, 105}\nTotal count: 5",
      explanation: "Set union combines all elements from multiple sets, keeping each unique value once. The `|` operator provides a concise shorthand.",
      commonMistake: "Adding sets with `+` — Python sets do not support the `+` operator. Use `.union()` or `|`.",
      challengeExtension: "Union three farms: {101, 102}, {102, 103}, {103, 104} and count the result."
    },
    {
      id: "sd-q14",
      number: 14,
      title: "Find Sensors Unique to Farm A",
      difficulty: "Medium",
      problem: "Farm A has sensors {101, 102, 103, 104}. Farm B has sensors {103, 104, 105, 106}. Use `.difference()` to find sensors that are **only** in Farm A.",
      agritechScenario: "The maintenance team needs to identify sensors exclusively deployed in Farm A for targeted servicing.",
      hint: "Use `farm_a.difference(farm_b)` or the `-` operator. Order matters: A - B gives elements in A not in B.",
      solution: `farm_a = {101, 102, 103, 104}
farm_b = {103, 104, 105, 106}

only_a = farm_a.difference(farm_b)
print("Only in Farm A:", only_a)

# Operator shorthand
print("Using - operator:", farm_a - farm_b)`,
      dryRun: "1. farm_a = {101, 102, 103, 104}.\n2. farm_b = {103, 104, 105, 106}.\n3. Elements in A but NOT in B = {101, 102}.",
      output: "Only in Farm A: {101, 102}\nUsing - operator: {101, 102}",
      explanation: "`.difference()` returns elements present in the first set but absent from the second. Note that `A - B ≠ B - A`.",
      commonMistake: "Confusing `farm_a - farm_b` with `farm_b - farm_a`. The result is different: B - A would give {105, 106}.",
      challengeExtension: "Also find sensors only in Farm B using `farm_b - farm_a`."
    },
    {
      id: "sd-q15",
      number: 15,
      title: "Store a Complete Farm Profile Dictionary",
      difficulty: "Medium",
      problem: "Create a dictionary `farm_profile` with keys: `name`, `crop`, `temperature`, `humidity`, `battery`, `status`. Assign realistic values. Print the full profile.",
      agritechScenario: "A complete farm asset record is submitted to the platform during onboarding.",
      hint: "Use a multi-line dictionary literal for readability.",
      solution: `farm_profile = {
    "name": "Green Valley",
    "crop": "Rice",
    "temperature": 31,
    "humidity": 68,
    "battery": 87,
    "status": "Active"
}
print("Farm Profile:")
for key, value in farm_profile.items():
    print(f"  {key}: {value}")`,
      dryRun: "1. Create dict with 6 key-value pairs.\n2. `.items()` returns each (key, value) tuple.\n3. Loop prints each field on its own line.",
      output: "Farm Profile:\n  name: Green Valley\n  crop: Rice\n  temperature: 31\n  humidity: 68\n  battery: 87\n  status: Active",
      explanation: "Dictionaries model real-world objects naturally. Each attribute becomes a key mapped to its current value. `.items()` exposes key-value pairs for clean iteration.",
      commonMistake: "Attempting to store duplicate keys such as `{'name': 'A', 'name': 'B'}` — Python silently keeps only the last value.",
      challengeExtension: "Add a nested dictionary `'location': {'district': 'Pune', 'state': 'Maharashtra'}`."
    },
    {
      id: "sd-q16",
      number: 16,
      title: "Print All Keys Using keys()",
      difficulty: "Medium",
      problem: "Given the `farm_profile` dictionary from Question 15, print all keys using `.keys()` and convert them to a list.",
      agritechScenario: "A form builder dynamically reads field names from the farm schema to render the correct input labels.",
      hint: "`farm_profile.keys()` returns a dict_keys view. Wrap in `list()` to convert it.",
      solution: `farm_profile = {
    "name": "Green Valley", "crop": "Rice",
    "temperature": 31, "humidity": 68,
    "battery": 87, "status": "Active"
}
keys_view = farm_profile.keys()
keys_list = list(keys_view)
print("Keys view:", keys_view)
print("Keys list:", keys_list)`,
      dryRun: "1. `.keys()` returns dict_keys(['name', 'crop', 'temperature', 'humidity', 'battery', 'status']).\n2. `list()` converts to a standard Python list.\n3. Both are printed.",
      output: "Keys view: dict_keys(['name', 'crop', 'temperature', 'humidity', 'battery', 'status'])\nKeys list: ['name', 'crop', 'temperature', 'humidity', 'battery', 'status']",
      explanation: "`.keys()` returns a live view of the dictionary's keys. Changes to the dictionary are reflected automatically. Convert to a list when you need indexing or when passing to APIs expecting a list.",
      commonMistake: "Assuming `dict.keys()` returns a regular list. It is a dict_keys view object. You cannot index it directly without converting to a list.",
      challengeExtension: "Print the number of keys using `len(farm_profile.keys())`."
    },
    {
      id: "sd-q17",
      number: 17,
      title: "Print All Values Using values()",
      difficulty: "Medium",
      problem: "Given the `farm_profile` dictionary from Question 15, extract and print all values using `.values()`. Check if the temperature value 31 is in the values.",
      agritechScenario: "A monitoring dashboard scans sensor values for anomalies without caring about the key names.",
      hint: "Use `farm_profile.values()` and the `in` membership operator.",
      solution: `farm_profile = {
    "name": "Green Valley", "crop": "Rice",
    "temperature": 31, "humidity": 68,
    "battery": 87, "status": "Active"
}
values = list(farm_profile.values())
print("All values:", values)
print("Is 31 a value?", 31 in farm_profile.values())`,
      dryRun: "1. `.values()` returns dict_values view of all stored values.\n2. `list()` materializes it: ['Green Valley', 'Rice', 31, 68, 87, 'Active'].\n3. `31 in farm_profile.values()` → True.",
      output: "All values: ['Green Valley', 'Rice', 31, 68, 87, 'Active']\nIs 31 a value? True",
      explanation: "`.values()` exposes the value side of the dictionary. Unlike keys, values are not required to be unique — two keys can share the same value.",
      commonMistake: "Using `31 in farm_profile` checks for 31 as a **key**, not a value. Always use `31 in farm_profile.values()` for value membership.",
      challengeExtension: "Find the maximum numeric value in the farm profile values."
    },
    {
      id: "sd-q18",
      number: 18,
      title: "Print Key-Value Pairs Using items()",
      difficulty: "Medium",
      problem: "Given `farm_profile`, iterate over `.items()` and print each key-value pair in the format `KEY → VALUE`.",
      agritechScenario: "The farm audit log prints all properties and their current values for each record inspection.",
      hint: "Use a `for key, value in farm_profile.items():` loop with f-string formatting.",
      solution: `farm_profile = {
    "name": "Green Valley", "crop": "Rice",
    "temperature": 31, "humidity": 68,
    "battery": 87, "status": "Active"
}
print("=== Farm Profile Audit ===")
for key, value in farm_profile.items():
    print(f"  {key.upper()} → {value}")`,
      dryRun: "1. `.items()` yields 6 (key, value) tuples.\n2. Each iteration unpacks the tuple into `key` and `value`.\n3. f-string formats: `KEY → VALUE`.",
      output: "=== Farm Profile Audit ===\n  NAME → Green Valley\n  CROP → Rice\n  TEMPERATURE → 31\n  HUMIDITY → 68\n  BATTERY → 87\n  STATUS → Active",
      explanation: "`.items()` is the most versatile dictionary iteration method. It simultaneously provides both keys and values, making it ideal for reporting and display.",
      commonMistake: "Iterating directly with `for item in farm_profile` only yields keys, not values. Always use `.items()` when you need both.",
      challengeExtension: "Filter the loop to only print keys whose values are integers."
    },
    {
      id: "sd-q19",
      number: 19,
      title: "Merge Two Dictionaries Using update()",
      difficulty: "Medium",
      problem: "Given `farm = {'name': 'Green Valley', 'crop': 'Rice'}` and `sensor = {'temperature': 31, 'humidity': 68, 'battery': 87}`, merge `sensor` into `farm` using `.update()` and print the result.",
      agritechScenario: "A farm record is extended with live sensor telemetry when sensors first connect to the platform.",
      hint: "Call `farm.update(sensor)`. Keys from `sensor` are added to `farm`; overlapping keys are overwritten.",
      solution: `farm = {"name": "Green Valley", "crop": "Rice"}
sensor = {"temperature": 31, "humidity": 68, "battery": 87}
print("Before update:", farm)
farm.update(sensor)
print("After update:", farm)`,
      dryRun: "1. farm has 2 keys.\n2. sensor has 3 keys — none overlap with farm.\n3. `.update()` merges sensor into farm.\n4. farm now has 5 keys.",
      output: "Before update: {'name': 'Green Valley', 'crop': 'Rice'}\nAfter update: {'name': 'Green Valley', 'crop': 'Rice', 'temperature': 31, 'humidity': 68, 'battery': 87}",
      explanation: "`.update()` is the idiomatic way to merge dictionaries in Python. If a key exists in both dicts, the value from the argument dictionary wins.",
      commonMistake: "Expecting `farm + sensor` to work. Python dicts do not support `+`. Use `.update()` or the `{**farm, **sensor}` unpacking syntax.",
      challengeExtension: "Try merging with a key conflict: `farm.update({'crop': 'Wheat'})` and verify crop is overwritten."
    },
    {
      id: "sd-q20",
      number: 20,
      title: "Copy a Dictionary and Explain Shallow Copy",
      difficulty: "Medium",
      problem: "Given `original = {'name': 'Green Valley', 'crop': 'Rice', 'readings': [31, 32, 33]}`, create a shallow copy using `.copy()`. Modify the `name` in the copy. Append 34 to `readings` in the copy. Observe which changes affect the original.",
      agritechScenario: "A data pipeline creates a working copy of a farm record to apply transformations without corrupting the master record.",
      hint: "`.copy()` creates a shallow copy. Primitive values are independent; nested objects (lists, dicts) are still shared.",
      solution: `original = {"name": "Green Valley", "crop": "Rice", "readings": [31, 32, 33]}
copy = original.copy()

copy["name"] = "Blue Horizon"      # independent — only affects copy
copy["readings"].append(34)         # shared reference — affects BOTH

print("Original:", original)
print("Copy    :", copy)`,
      dryRun: "1. `copy = original.copy()` — top-level keys are independent.\n2. `copy['name'] = 'Blue Horizon'` — creates new string binding in copy.\n3. `copy['readings'].append(34)` — both original['readings'] and copy['readings'] reference the SAME list object.\n4. Result: both have readings = [31, 32, 33, 34].",
      output: "Original: {'name': 'Green Valley', 'crop': 'Rice', 'readings': [31, 32, 33, 34]}\nCopy    : {'name': 'Blue Horizon', 'crop': 'Rice', 'readings': [31, 32, 33, 34]}",
      explanation: "A shallow copy duplicates the top-level key-value pairs. Nested mutable objects (like lists) are still shared by reference. Use `import copy; copy.deepcopy()` for full independence.",
      commonMistake: "Assuming `.copy()` produces a completely independent object. Modifying nested lists or dicts in the copy will also modify the original.",
      challengeExtension: "Use `import copy; deepcopy = copy.deepcopy(original)` and verify readings are now independent."
    },

    // ─── 🔴 ADVANCED QUESTIONS (21-30) ──────────────────────────────────────

    {
      id: "sd-q21",
      number: 21,
      title: "Merge All Sensors from Two Farms",
      difficulty: "Advanced",
      problem: "Farm A = {101, 102, 103} and Farm B = {103, 104, 105}. Merge all sensors from both farms into a single unique registry. Print total, common sensors, and sensors exclusive to each farm.",
      agritechScenario: "Two farm networks are consolidating into one platform. The engineering team needs a full registry audit report.",
      hint: "Use `.union()`, `.intersection()`, and `.difference()` to produce all three reports.",
      solution: `farm_a = {101, 102, 103}
farm_b = {103, 104, 105}

all_sensors   = farm_a | farm_b
common        = farm_a & farm_b
only_a        = farm_a - farm_b
only_b        = farm_b - farm_a

print(f"All sensors   : {sorted(all_sensors)}")
print(f"Common        : {sorted(common)}")
print(f"Only Farm A   : {sorted(only_a)}")
print(f"Only Farm B   : {sorted(only_b)}")
print(f"Total unique  : {len(all_sensors)}")`,
      dryRun: "1. Union → {101, 102, 103, 104, 105}.\n2. Intersection → {103}.\n3. A - B → {101, 102}.\n4. B - A → {104, 105}.",
      output: "All sensors   : [101, 102, 103, 104, 105]\nCommon        : [103]\nOnly Farm A   : [101, 102]\nOnly Farm B   : [104, 105]\nTotal unique  : 5",
      explanation: "This question demonstrates that Python's set algebra operators (`|`, `&`, `-`) produce clean, readable code for registry analysis problems.",
      commonMistake: "Not sorting the output for display. Sets are unordered, so always use `sorted()` when consistent output is expected.",
      challengeExtension: "Add Farm C = {105, 106} and print sensors present in all three farms."
    },
    {
      id: "sd-q22",
      number: 22,
      title: "Print Only Active Sensors from a Dictionary",
      difficulty: "Advanced",
      problem: "Create a dictionary `sensors` for sensor IDs 101–105, each with keys `location` and `status` (mix of 'Active' and 'Offline'). Filter and print only active sensors.",
      agritechScenario: "The monitoring dashboard renders only sensors with live telemetry feeds.",
      hint: "Use a for loop over `.items()` and filter by `sensor['status'] == 'Active'`.",
      solution: `sensors = {
    101: {"location": "Field A", "status": "Active"},
    102: {"location": "Field B", "status": "Offline"},
    103: {"location": "Field C", "status": "Active"},
    104: {"location": "Field D", "status": "Offline"},
    105: {"location": "Field E", "status": "Active"},
}

print("Active Sensors:")
for sensor_id, info in sensors.items():
    if info["status"] == "Active":
        print(f"  ID {sensor_id} | Location: {info['location']}")`,
      dryRun: "1. Iterate over sensors dict — 5 entries.\n2. IDs 101, 103, 105 have status 'Active' → printed.\n3. IDs 102, 104 are 'Offline' → skipped.",
      output: "Active Sensors:\n  ID 101 | Location: Field A\n  ID 103 | Location: Field C\n  ID 105 | Location: Field E",
      explanation: "Dictionaries with integer keys (sensor IDs) mapping to nested dictionaries (attributes) is a very common data pattern in IoT and data science applications.",
      commonMistake: "Using `sensors.values()` only and losing the sensor ID. Use `.items()` to keep both ID and attributes together.",
      challengeExtension: "Count the total number of Active and Offline sensors separately."
    },
    {
      id: "sd-q23",
      number: 23,
      title: "Count Crop Occurrences Using a Dictionary",
      difficulty: "Advanced",
      problem: "Given `crops = ['Rice', 'Rice', 'Corn', 'Wheat', 'Rice', 'Corn']`, build a frequency dictionary that counts how many times each crop appears. Print the result sorted by count (highest first).",
      agritechScenario: "The crop analytics engine computes cultivation frequency from logged harvest records.",
      hint: "Use `count_dict.get(crop, 0) + 1` inside a loop, or use `collections.Counter`.",
      solution: `crops = ["Rice", "Rice", "Corn", "Wheat", "Rice", "Corn"]
count = {}

for crop in crops:
    count[crop] = count.get(crop, 0) + 1

print("Crop frequency:", count)

# Print sorted by count descending
for crop, freq in sorted(count.items(), key=lambda x: x[1], reverse=True):
    print(f"  {crop}: {freq}")`,
      dryRun: "1. 'Rice' → 0+1=1, 2, 3.\n2. 'Corn' → 0+1=1, 2.\n3. 'Wheat' → 0+1=1.\n4. Final dict: {'Rice':3, 'Corn':2, 'Wheat':1}.\n5. sorted descending by value.",
      output: "Crop frequency: {'Rice': 3, 'Corn': 2, 'Wheat': 1}\n  Rice: 3\n  Corn: 2\n  Wheat: 1",
      explanation: "Using `.get(key, 0)` is the Pythonic way to increment a counter without an if-key-in-dict check. This pattern is the foundation of frequency analysis in data science.",
      commonMistake: "Writing `count[crop] += 1` directly — this crashes with a KeyError on the first occurrence. Always initialise with `.get(key, 0)`.",
      challengeExtension: "Identify which crop appears most frequently using `max(count, key=count.get)`."
    },
    {
      id: "sd-q24",
      number: 24,
      title: "Crop Inventory Management System",
      difficulty: "Advanced",
      problem: "Create an inventory dictionary mapping crop names to quantities: Rice=500, Wheat=300, Corn=200. Perform the following: sell 100 units of Rice, add Soybean=150, remove Corn. Print the final inventory.",
      agritechScenario: "A crop warehouse management system tracks real-time stock levels across commodity types.",
      hint: "Use direct key assignment for updates and the `del` keyword to remove a key.",
      solution: `inventory = {"Rice": 500, "Wheat": 300, "Corn": 200}
print("Initial:", inventory)

# Sell 100 units of Rice
inventory["Rice"] -= 100

# Add Soybean
inventory["Soybean"] = 150

# Remove Corn
del inventory["Corn"]

print("Final inventory:", inventory)
print("Total stock:", sum(inventory.values()), "units")`,
      dryRun: "1. Rice: 500 - 100 = 400.\n2. Add Soybean: 150.\n3. `del inventory['Corn']` removes the key.\n4. sum([400, 300, 150]) = 850.",
      output: "Initial: {'Rice': 500, 'Wheat': 300, 'Corn': 200}\nFinal inventory: {'Rice': 400, 'Wheat': 300, 'Soybean': 150}\nTotal stock: 850 units",
      explanation: "`del dict[key]` permanently removes a key-value pair. Use it when you are certain the key exists. Use `.pop(key, default)` for a safer alternative that also returns the removed value.",
      commonMistake: "Using `del inventory['Corn']` when 'Corn' might not exist — raises KeyError. Use `inventory.pop('Corn', None)` for safe removal.",
      challengeExtension: "Use `.pop('Wheat', 0)` instead of `del` and print the returned quantity."
    },
    {
      id: "sd-q25",
      number: 25,
      title: "Sensor Lookup by ID",
      difficulty: "Advanced",
      problem: "Build a sensor registry dictionary where each sensor ID (key) maps to a nested dict with `location`, `temperature`, and `status`. Write a lookup function that accepts a sensor ID and prints all its details, or a friendly error message if not found.",
      agritechScenario: "Field operators enter a sensor ID to retrieve live telemetry data from the central registry.",
      hint: "Use `.get(sensor_id)` to avoid KeyError. If the result is None, the sensor is not registered.",
      solution: `registry = {
    101: {"location": "Field A", "temperature": 31, "status": "Active"},
    102: {"location": "Field B", "temperature": 29, "status": "Offline"},
    103: {"location": "Field C", "temperature": 33, "status": "Active"},
}

def lookup_sensor(sensor_id):
    sensor = registry.get(sensor_id)
    if sensor is None:
        print(f"Sensor {sensor_id} not found in registry.")
    else:
        print(f"=== Sensor {sensor_id} ===")
        for key, value in sensor.items():
            print(f"  {key.capitalize()}: {value}")

lookup_sensor(101)
lookup_sensor(999)`,
      dryRun: "1. lookup_sensor(101) → registry.get(101) returns nested dict → prints 3 lines.\n2. lookup_sensor(999) → registry.get(999) returns None → prints error.",
      output: "=== Sensor 101 ===\n  Location: Field A\n  Temperature: 31\n  Status: Active\nSensor 999 not found in registry.",
      explanation: "Nested dictionaries (dict of dicts) are the standard Python data model for structured records. `.get()` provides safe lookups that won't crash on missing IDs.",
      commonMistake: "Using `registry[sensor_id]` inside the function — this crashes for unregistered IDs. Always use `.get()` for user-supplied inputs.",
      challengeExtension: "Extend the function to also update the temperature if a new reading is provided as an optional parameter."
    },
    {
      id: "sd-q26",
      number: 26,
      title: "Weather Station Dictionary",
      difficulty: "Advanced",
      problem: "Create a weather station dictionary with keys: `temperature`, `humidity`, `rainfall`, `wind_speed`. Store initial values. Update `rainfall` by adding 5 mm. Print a formatted weather report.",
      agritechScenario: "A weather monitoring station computes accumulated daily rainfall from successive sensor readings.",
      hint: "Use `station['rainfall'] += 5` to accumulate the reading.",
      solution: `station = {
    "temperature": 28,
    "humidity": 72,
    "rainfall": 12,
    "wind_speed": 14
}
print("Initial rainfall:", station["rainfall"])
station["rainfall"] += 5   # new reading arrives

print("\\n=== WEATHER STATION REPORT ===")
for key, value in station.items():
    unit = "°C" if key == "temperature" else "%" if key == "humidity" else "mm" if key == "rainfall" else "km/h"
    print(f"  {key.replace('_', ' ').title()}: {value} {unit}")`,
      dryRun: "1. rainfall starts at 12.\n2. += 5 → 17.\n3. Loop: temperature/28°C, humidity/72%, rainfall/17mm, wind_speed/14km/h.",
      output: "Initial rainfall: 12\n\n=== WEATHER STATION REPORT ===\n  Temperature: 28 °C\n  Humidity: 72 %\n  Rainfall: 17 mm\n  Wind Speed: 14 km/h",
      explanation: "Dictionaries naturally model structured telemetry data. Using `+=` on a numeric value in-place is both efficient and readable.",
      commonMistake: "Formatting keys like `wind_speed` for display without replacing underscores — `.replace('_', ' ').title()` gives clean labels.",
      challengeExtension: "Add a `'alerts'` key (empty list) and append 'High humidity' if humidity exceeds 70."
    },
    {
      id: "sd-q27",
      number: 27,
      title: "Unique Fertilizer Registry Using a Set",
      difficulty: "Advanced",
      problem: "You receive fertilizer additions: ['Urea', 'DAP', 'Urea', 'MOP', 'DAP', 'Zinc', 'Urea']. Build a set-based registry that stores only unique fertilizers. Allow new additions and ignore duplicates. Print a sorted list of all registered fertilizers.",
      agritechScenario: "A precision agriculture platform tracks approved fertilizers to prevent duplicate procurement orders.",
      hint: "Start with an empty set and loop through the additions using `.add()`. Duplicates are silently ignored.",
      solution: `additions = ["Urea", "DAP", "Urea", "MOP", "DAP", "Zinc", "Urea"]
fertilizer_registry = set()

for item in additions:
    fertilizer_registry.add(item)

print(f"Registered fertilizers ({len(fertilizer_registry)}):")
for fert in sorted(fertilizer_registry):
    print(f"  • {fert}")`,
      dryRun: "1. Start: set().\n2. Add 'Urea' → {Urea}.\n3. Add 'DAP' → {Urea, DAP}.\n4. Add 'Urea' again → no change.\n5. Add 'MOP' → {Urea, DAP, MOP}.\n6. Add 'DAP' again → no change.\n7. Add 'Zinc' → {Urea, DAP, MOP, Zinc}.\n8. Final: 4 unique fertilizers.",
      output: "Registered fertilizers (4):\n  • DAP\n  • MOP\n  • Urea\n  • Zinc",
      explanation: "Starting with `set()` and using `.add()` in a loop is the idiomatic approach when building a unique registry from a stream of inputs. Sets handle deduplication automatically.",
      commonMistake: "Using a list and manually checking for duplicates with `if item not in list` — this is O(n) per item. Sets have O(1) average membership testing.",
      challengeExtension: "Check if 'Potash' is registered using the `in` operator, then add it."
    },
    {
      id: "sd-q28",
      number: 28,
      title: "Smart Farm Dashboard Dictionary",
      difficulty: "Advanced",
      problem: "Create one comprehensive nested dictionary `farm_dashboard` representing a complete farm record: `name`, `location` (nested dict), `crops` (list), `sensor_ids` (set stored as list for display), `weather` (nested dict), `status`. Print each section of the dashboard.",
      agritechScenario: "The Smart Farm central dashboard renders a complete overview of the farm's identity, environment, and active sensors.",
      hint: "Store the set as `list(sensor_ids)` for JSON-serializable display. Use nested dicts for grouped attributes.",
      solution: `sensor_ids = {101, 102, 103}

farm_dashboard = {
    "name": "Green Valley",
    "location": {"district": "Pune", "state": "Maharashtra"},
    "crops": ["Rice", "Wheat", "Corn"],
    "sensor_ids": sorted(sensor_ids),
    "weather": {"temperature": 31, "humidity": 68, "rainfall": 12},
    "status": "Active"
}

print("=== SMART FARM DASHBOARD ===")
print(f"Farm     : {farm_dashboard['name']}")
print(f"Location : {farm_dashboard['location']['district']}, {farm_dashboard['location']['state']}")
print(f"Crops    : {', '.join(farm_dashboard['crops'])}")
print(f"Sensors  : {farm_dashboard['sensor_ids']}")
print(f"Temp     : {farm_dashboard['weather']['temperature']}°C")
print(f"Humidity : {farm_dashboard['weather']['humidity']}%")
print(f"Status   : {farm_dashboard['status']}")`,
      dryRun: "1. sensor_ids = {101, 102, 103}; sorted → [101, 102, 103].\n2. Nested dict has location sub-dict and weather sub-dict.\n3. Each print accesses values via chained keys.",
      output: "=== SMART FARM DASHBOARD ===\nFarm     : Green Valley\nLocation : Pune, Maharashtra\nCrops    : Rice, Wheat, Corn\nSensors  : [101, 102, 103]\nTemp     : 31°C\nHumidity : 68%\nStatus   : Active",
      explanation: "Combining all four collection types (list, set, nested dict, standard dict values) in one dictionary mirrors the exact structure of JSON-based APIs and database documents.",
      commonMistake: "Storing a raw set in the dict and then trying to JSON-serialize it — Python sets are not JSON-serializable. Convert to sorted list first.",
      challengeExtension: "Add a `'history'` key with a list of the last 5 temperature readings."
    },
    {
      id: "sd-q29",
      number: 29,
      title: "Duplicate Sensor Detector",
      difficulty: "Advanced",
      problem: "Given `sensor_log = [101, 102, 103, 102, 104, 101, 105]`, detect if duplicates exist by comparing the length of the list and the length of its set conversion. Print the duplicate IDs.",
      agritechScenario: "A data validation module scans incoming sensor logs for duplicate transmissions before storing in the database.",
      hint: "If `len(sensor_log) != len(set(sensor_log))`, duplicates exist. To find which ones, count occurrences.",
      solution: `sensor_log = [101, 102, 103, 102, 104, 101, 105]

unique = set(sensor_log)

if len(sensor_log) != len(unique):
    print(f"⚠️  Duplicates detected! ({len(sensor_log)} entries, {len(unique)} unique)")
    freq = {}
    for sid in sensor_log:
        freq[sid] = freq.get(sid, 0) + 1
    duplicates = [sid for sid, count in freq.items() if count > 1]
    print(f"Duplicate IDs: {duplicates}")
else:
    print("✅ No duplicates found.")`,
      dryRun: "1. len(sensor_log) = 7. len(set) = 5. 7 ≠ 5 → duplicates detected.\n2. freq: {101:2, 102:2, 103:1, 104:1, 105:1}.\n3. duplicates = [101, 102].",
      output: "⚠️  Duplicates detected! (7 entries, 5 unique)\nDuplicate IDs: [101, 102]",
      explanation: "Comparing list length to set length is an O(n) way to detect duplicates. Building a frequency dict then identifies exactly which items are duplicated.",
      commonMistake: "Only printing that duplicates exist without identifying which IDs. The frequency dict approach is needed to isolate the specific duplicate values.",
      challengeExtension: "Print how many times each duplicate ID appeared in the log."
    },
    {
      id: "sd-q30",
      number: 30,
      title: "Smart Farm Asset Manager Mini-Project",
      difficulty: "Advanced",
      problem: "Build a Smart Farm Asset Manager with the following features: (1) Register farms in a dictionary; (2) Store each farm's sensor IDs in a set; (3) Remove duplicate sensors; (4) Search for a farm by name; (5) Update battery level; (6) Print all farms with active sensors and battery levels.",
      agritechScenario: "A farm network management platform handles multiple farms, their sensor registries, and telemetry metadata.",
      hint: "Use a dict-of-dicts where each key is a farm name and each value contains a set for sensors and a dict for metadata.",
      solution: `# Smart Farm Asset Manager
farms = {}

def register_farm(name, sensor_list, battery):
    farms[name] = {
        "sensors": set(sensor_list),   # set removes duplicates automatically
        "battery": battery,
        "status": "Active"
    }

def update_battery(name, new_level):
    if name in farms:
        farms[name]["battery"] = new_level
        print(f"Battery updated for {name}: {new_level}%")
    else:
        print(f"Farm '{name}' not found.")

def search_farm(name):
    farm = farms.get(name)
    if farm:
        print(f"Farm: {name} | Sensors: {sorted(farm['sensors'])} | Battery: {farm['battery']}%")
    else:
        print(f"Farm '{name}' not registered.")

def print_all():
    print("\\n=== FARM ASSET REGISTRY ===")
    for name, data in farms.items():
        print(f"  {name}: sensors={sorted(data['sensors'])}, battery={data['battery']}%, status={data['status']}")

# Demo
register_farm("Green Valley", [101, 102, 101, 103], 87)  # 101 duplicate
register_farm("Blue Horizon", [201, 202, 203, 202], 72)  # 202 duplicate
update_battery("Green Valley", 91)
search_farm("Blue Horizon")
search_farm("Unknown Farm")
print_all()`,
      dryRun: "1. register_farm converts [101,102,101,103] → {101,102,103} (dup removed).\n2. register_farm converts [201,202,203,202] → {201,202,203}.\n3. update_battery sets Green Valley battery to 91.\n4. search_farm Blue Horizon → prints details.\n5. search_farm Unknown Farm → not found.\n6. print_all iterates farms dict.",
      output: "Battery updated for Green Valley: 91%\nFarm: Blue Horizon | Sensors: [201, 202, 203] | Battery: 72%\nFarm 'Unknown Farm' not registered.\n\n=== FARM ASSET REGISTRY ===\n  Green Valley: sensors=[101, 102, 103], battery=91%, status=Active\n  Blue Horizon: sensors=[201, 202, 203], battery=72%, status=Active",
      explanation: "This mini-project combines all four collection types: a dictionary for the farm registry, sets for automatic duplicate-free sensor storage, lists for sorted display, and nested dicts for structured metadata. This is the canonical foundation of real IoT asset management systems.",
      commonMistake: "Storing sensor lists instead of sets in the farm record — this allows duplicate sensor IDs to accumulate over time. Always use a set for unique-entity registries.",
      challengeExtension: "Add a `deregister_farm(name)` function using `del farms[name]` with a check, and a function that prints only farms with battery below 80%."
    }
  ],
  commonMistakesSummary: [
    "Writing `{}` expecting an empty set — it creates an empty dictionary. Use `set()` for an empty set.",
    "Assuming dictionaries allow duplicate keys — the last assigned value silently overwrites earlier ones.",
    "Using `.remove()` when the element may not be present — use `.discard()` for safe deletion.",
    "Using `dict['key']` for optional keys that may not exist — use `.get('key', default)` to avoid KeyError crashes.",
    "Trying to access sets by index (e.g., `my_set[0]`) — sets are unordered and do not support indexing.",
    "Using `farm_a + farm_b` on sets — Python sets only support `|` (union) and `-` (difference) operators.",
    "Storing a raw Python set inside a dictionary and then attempting JSON serialization — sets are not JSON-serializable, convert to sorted list first.",
    "Forgetting that shallow copy shares nested mutable objects — use `copy.deepcopy()` for fully independent clones."
  ],
  capstoneChallenge: {
    title: "Farm Monitoring System Capstone",
    brief: "Build a complete Farm Monitoring System that uses a Set for unique sensor registration and a Dictionary for the farm profile. The system must register sensors, ignore duplicates, store and update farm data, and display a comprehensive monitoring report.",
    requirements: [
      "Create a sensor_registry set and add sensor IDs 101, 102, 103, 102, 104 (remove duplicates automatically)",
      "Create a farm_data dictionary with keys: name, crop, temperature, humidity, battery, status",
      "Update temperature from 31 to 35 using direct key assignment",
      "Merge a readings_update dictionary {rainfall: 14, wind_speed: 18} into farm_data using .update()",
      "Print all active sensors sorted in ascending order",
      "Print the complete farm profile using .items() in a formatted report"
    ],
    starterCode: `# Farm Monitoring System Capstone

# 1. Sensor Registry (Set)
sensor_registry = set()
raw_sensors = [101, 102, 103, 102, 104]
# Add sensors here (duplicates will be ignored automatically)

# 2. Farm Profile (Dictionary)
farm_data = {}
# Add farm fields here

# 3. Update temperature

# 4. Merge readings update
readings_update = {"rainfall": 14, "wind_speed": 18}

# 5. Print active sensors (sorted)

# 6. Print farm report
`,
    expectedOutcome: `Active Sensors (4): [101, 102, 103, 104]

=== FARM MONITORING REPORT ===
  NAME        : Green Valley
  CROP        : Rice
  TEMPERATURE : 35°C
  HUMIDITY    : 68%
  BATTERY     : 87%
  STATUS      : Active
  RAINFALL    : 14mm
  WIND_SPEED  : 18km/h`
  }
};
