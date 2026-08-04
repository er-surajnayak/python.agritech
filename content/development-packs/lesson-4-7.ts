import type { CollectionOperationsDevelopmentPack } from "@/types/content";

export const collectionOperationsDevelopmentPack: CollectionOperationsDevelopmentPack = {
  kind: "collection-operations",
  prerequisite: "Lesson 4.6 Dictionaries: Key-Value Collections",
  story: {
    title: "Working Efficiently with Python Collections",
    body: "The Smart Farm ecosystem is now fully online. Sensor units emit raw lists of moisture numbers, GPS hardware returns fixed tuples, unique ID registrars maintain sets, and central IoT gateways output structured telemetry dictionaries. As a smart farm software engineer, you must process diverse payloads efficiently. Which operations work universally across all collections, and how do built-in functions interact with each collection type?",
    problem: {
      title: "The Multi-API Payload Challenge",
      body: "Four different farm microservices return data using four different collection types. Rather than writing duplicate code for each collection type, professional Python developers leverage universal built-in functions and clear operation mappings."
    }
  },
  builtIns: {
    title: "Universal Python Built-in Functions",
    body: "Built-in functions belong to the Python language runtime itself rather than to a single data structure. Most built-in functions accept any iterable collection (Lists, Tuples, Sets, and Dictionaries).",
    items: [
      {
        func: "len()",
        description: "Returns the total number of items or elements inside a collection.",
        supported: ["List", "Tuple", "Set", "Dictionary"],
        example: "len([10, 20, 30]) # Output: 3\nlen({'name': 'Farm A', 'crop': 'Rice'}) # Output: 2",
        dictNote: "For dictionaries, len() counts key-value pairs (the number of top-level keys)."
      },
      {
        func: "max()",
        description: "Finds and returns the maximum item in a collection.",
        supported: ["List", "Tuple", "Set", "Dictionary"],
        example: "max([10, 20, 30]) # Output: 30\nmax({'A': 5, 'B': 9}) # Output: 'B'",
        dictNote: "For dictionaries, max() inspects keys by default. To find maximum value, use max(farm.values())."
      },
      {
        func: "min()",
        description: "Finds and returns the minimum item in a collection.",
        supported: ["List", "Tuple", "Set", "Dictionary"],
        example: "min([10, 20, 30]) # Output: 10\nmin({'A': 5, 'B': 9}) # Output: 'A'",
        dictNote: "For dictionaries, min() inspects keys by default. To find minimum value, use min(farm.values())."
      },
      {
        func: "sum()",
        description: "Calculates the total arithmetic sum of all numeric elements.",
        supported: ["List", "Tuple", "Set", "Dictionary (values)"],
        example: "sum([10, 20, 30]) # Output: 60\nsum({2, 8, 5}) # Output: 15",
        dictNote: "Calling sum(dict) tries to add keys. If keys are strings, sum(dict) raises TypeError. Use sum(dict.values())."
      },
      {
        func: "sorted()",
        description: "Returns a brand-new sorted List containing elements from any collection.",
        supported: ["List", "Tuple", "Set", "Dictionary"],
        example: "sorted({3, 1, 2}) # Output: [1, 2, 3]\nsorted({'B': 9, 'A': 5}) # Output: ['A', 'B']",
        dictNote: "Always returns a new List, leaving original sets or tuples unchanged."
      },
      {
        func: "reversed()",
        description: "Returns a reverse iterator for ordered, sequence-based collections.",
        supported: ["List", "Tuple"],
        example: "list(reversed([1, 2, 3])) # Output: [3, 2, 1]",
        dictNote: "Unordered collections (Sets and Dictionaries) do not support reversed()."
      },
      {
        func: "any()",
        description: "Returns True if at least one item evaluates to Truthy.",
        supported: ["List", "Tuple", "Set", "Dictionary"],
        example: "any([False, False, True]) # Output: True"
      },
      {
        func: "all()",
        description: "Returns True only if all items evaluate to Truthy.",
        supported: ["List", "Tuple", "Set", "Dictionary"],
        example: "all([True, True, True]) # Output: True"
      }
    ]
  },
  builtInComparison: {
    title: "Built-in Functions Compatibility Matrix",
    body: "Use this definitive reference matrix to determine which built-in function operates on each collection type.",
    rows: [
      { function: "len()", list: "✅", tuple: "✅", set: "✅", dict: "✅", notes: "Counts key-value pairs for dictionaries" },
      { function: "max()", list: "✅", tuple: "✅", set: "✅", dict: "✅ (keys)", notes: "Use max(d.values()) for value search" },
      { function: "min()", list: "✅", tuple: "✅", set: "✅", dict: "✅ (keys)", notes: "Use min(d.values()) for value search" },
      { function: "sum()", list: "✅", tuple: "✅", set: "✅", dict: "values()", notes: "Requires numeric entries; use sum(d.values())" },
      { function: "sorted()", list: "✅", tuple: "✅", set: "✅", dict: "keys", notes: "Always produces a new sorted List" },
      { function: "reversed()", list: "✅", tuple: "✅", set: "❌", dict: "❌", notes: "Requires sequence-indexed ordering" },
      { function: "any()", list: "✅", tuple: "✅", set: "✅", dict: "✅", notes: "Evaluates Truthy elements" },
      { function: "all()", list: "✅", tuple: "✅", set: "✅", dict: "✅", notes: "Requires all elements to be Truthy" }
    ]
  },
  methodsSummary: {
    title: "Collection-Specific Methods Overview",
    body: "Methods belong exclusively to specific data types and are invoked using dot notation (`collection.method()`).",
    collections: [
      {
        name: "Lists",
        type: "list",
        methods: [
          { name: "append()", signature: "l.append(x)", desc: "Appends element x to the end of the list." },
          { name: "extend()", signature: "l.extend(iterable)", desc: "Appends all items from iterable to the list." },
          { name: "insert()", signature: "l.insert(i, x)", desc: "Inserts item x at specified index i." },
          { name: "pop()", signature: "l.pop([i])", desc: "Removes and returns item at index i (default last)." },
          { name: "remove()", signature: "l.remove(x)", desc: "Removes first occurrence of value x." },
          { name: "sort()", signature: "l.sort()", desc: "Sorts the list in-place (mutates original)." },
          { name: "reverse()", signature: "l.reverse()", desc: "Reverses list elements in-place." },
          { name: "clear()", signature: "l.clear()", desc: "Removes all elements, leaving empty list []." }
        ]
      },
      {
        name: "Tuples",
        type: "tuple",
        methods: [
          { name: "count()", signature: "t.count(x)", desc: "Returns total occurrences of value x." },
          { name: "index()", signature: "t.index(x)", desc: "Returns first zero-based index of value x." }
        ]
      },
      {
        name: "Sets",
        type: "set",
        methods: [
          { name: "add()", signature: "s.add(x)", desc: "Adds element x to set (ignores if duplicate)." },
          { name: "remove()", signature: "s.remove(x)", desc: "Removes element x; raises KeyError if missing." },
          { name: "discard()", signature: "s.discard(x)", desc: "Removes element x safely without error if missing." },
          { name: "union()", signature: "s.union(other)", desc: "Returns a new set with elements from both sets." },
          { name: "intersection()", signature: "s.intersection(other)", desc: "Returns a new set with overlapping elements." },
          { name: "difference()", signature: "s.difference(other)", desc: "Returns elements in first set but not second." }
        ]
      },
      {
        name: "Dictionaries",
        type: "dict",
        methods: [
          { name: "get()", signature: "d.get(k, default)", desc: "Safely returns value for key k or default." },
          { name: "keys()", signature: "d.keys()", desc: "Returns a dynamic view of all dictionary keys." },
          { name: "values()", signature: "d.values()", desc: "Returns a dynamic view of all dictionary values." },
          { name: "items()", signature: "d.items()", desc: "Returns dynamic view of (key, value) tuple pairs." },
          { name: "update()", signature: "d.update(other)", desc: "Merges key-value pairs from another dictionary." },
          { name: "pop()", signature: "d.pop(k)", desc: "Removes key k and returns associated value." }
        ]
      }
    ]
  },
  operationsMatrix: {
    title: "Collection Operations Matrix",
    body: "Compare how common programming tasks are performed across each collection type.",
    rows: [
      { operation: "Add Element", list: "append(x)", tuple: "❌ Immutable", set: "add(x)", dict: "d[key] = val" },
      { operation: "Update Value", list: "l[index] = val", tuple: "❌ Immutable", set: "❌ Unordered", dict: "d[key] = new_val" },
      { operation: "Remove Element", list: "remove(x) / pop()", tuple: "❌ Immutable", set: "remove(x) / discard()", dict: "pop(key) / del" },
      { operation: "Search Presence", list: "val in list", tuple: "val in tuple", set: "val in set (O(1))", dict: "key in dict (keys)" },
      { operation: "Sort Elements", list: "l.sort() / sorted()", tuple: "sorted(t) -> List", set: "sorted(s) -> List", dict: "sorted(d) -> Keys List" },
      { operation: "Copy Collection", list: "l.copy() / l[:]", tuple: "tuple(t) / t", set: "s.copy()", dict: "d.copy()" }
    ]
  },
  agritech: {
    title: "Smart Farm Telemetry Manager",
    body: "This script aggregates telemetry from lists, tuples, sets, and dictionaries into a single automated diagnostic report.",
    code: `sensor_ids = {101, 102, 103}
moisture_readings = [25, 30, 28]
gps_location = (17.385, 78.486)
farm_info = {
    "name": "Green Valley",
    "crop": "Rice"
}

print(f"Total Sensors: {len(sensor_ids)}")
print(f"Max Moisture: {max(moisture_readings)}%")
print(f"Sum Moisture: {sum(moisture_readings)}")
print(f"Sorted Sensor IDs: {sorted(sensor_ids)}")
print(f"Farm Keys: {list(farm_info.keys())}")`,
    output: `Total Sensors: 3
Max Moisture: 30%
Sum Moisture: 83
Sorted Sensor IDs: [101, 102, 103]
Farm Keys: ['name', 'crop']`
  },
  debugChallenges: [
    {
      title: "Bug 1: Appending to a Tuple",
      prompt: "A developer attempted to append a new reading to a tuple.",
      code: `readings = (22, 25, 28)
readings.append(30)
print(readings)`,
      mistakesToFind: 1,
      solution: `readings = (22, 25, 28)
readings = readings + (30,)
print(readings)`,
      hiddenGuidance: "Tuples do not support in-place mutation or append(). To add elements, concatenate tuples: readings + (30,) or convert to a list."
    },
    {
      title: "Bug 2: Reversing a Set",
      prompt: "A developer tried to reverse a set of active crop IDs.",
      code: `crop_ids = {10, 20, 30}
rev_ids = list(reversed(crop_ids))
print(rev_ids)`,
      mistakesToFind: 1,
      solution: `crop_ids = {10, 20, 30}
rev_ids = list(reversed(sorted(crop_ids)))
print(rev_ids)`,
      hiddenGuidance: "Sets are unordered collections without sequence indices. Call sorted(s) first to establish an order before calling reversed()."
    },
    {
      title: "Bug 3: Summing a String-Keyed Dictionary Directly",
      prompt: "A developer tried to sum a dictionary directly to get total sensor values.",
      code: `readings = {"sensor1": 25, "sensor2": 30}
total = sum(readings)
print(total)`,
      mistakesToFind: 1,
      solution: `readings = {"sensor1": 25, "sensor2": 30}
total = sum(readings.values())
print(total)`,
      hiddenGuidance: "Passing a dictionary directly to sum(d) attempts to add its string keys. Pass readings.values() to sum values."
    }
  ],
  engineerScenario: {
    title: "Multi-API Integration Strategy",
    body: "When designing data pipelines that consume REST APIs, third-party libraries, and hardware drivers, you will receive diverse data types. How do you design clean helper functions that operate predictably regardless of whether payload parameters arrive as lists, tuples, sets, or dictionaries?",
    question: "Why is it important to use `len()`, `max()`, and `sorted()` over collection-specific custom loops, and when should you explicitly convert a collection to a `list`?"
  }
};
