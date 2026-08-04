import type { DictionaryDevelopmentPack } from "@/types/content";

export const dictionaryDevelopmentPack: DictionaryDevelopmentPack = {
  kind: "dictionary",
  prerequisite: "Lessons 4.1, 4.2, 4.3, 4.4, and 4.5",
  story: {
    title: "Smart Farm Asset Management",
    body: "The Smart Farm system has expanded. Earlier, we only stored individual, sequential sensor readings as lists (e.g., moisture = [25, 30, 28]). Now, every sensor contains much more information (Sensor ID, Crop, Moisture, Temperature, Battery, and Status).",
    problem: {
      title: "The Problem: Lists Cannot Represent Objects",
      body: "A list can store these diverse measurements: sensor = [101, 'Rice', 28, 31, 82, 'Active']. But what does sensor[4] represent? Battery? Temperature? Crop? Without labels, index numbers make code extremely difficult to read, maintain, and reason about. We need key-value labels.",
      listSnippet: "sensor = [101, 'Rice', 28, 31, 82, 'Active']",
      listAccessSnippet: "sensor[4]",
    },
  },
  whatIsDict: {
    title: "What is a Dictionary?",
    body: "A Dictionary stores information as key-value pairs (Key → Value). Keys act as descriptive labels for the corresponding values, enabling structured object modeling and instantaneous lookups.",
    characteristics: [
      "Key–Value collection: every element is a pair of a unique key and its associated value.",
      "Mutable: you can change values, add new key-value pairs, or remove keys.",
      "Unique keys: a key can appear only once in a dictionary. Values, however, may repeat.",
      "Fast lookups: finding a value by its key is extremely fast, taking O(1) constant time.",
    ],
  },
  creation: {
    title: "Creating Dictionaries",
    body: "You can define a dictionary using curly braces {} with key-value pairs separated by colons, initialize an empty dictionary, or convert pairs using the dict() constructor.",
    examples: [
      {
        label: "Curly Braces",
        code: "farm = {\n    \"name\": \"Green Valley\",\n    \"location\": \"Pune\",\n    \"crop\": \"Rice\"\n}",
        note: "Standard initialization with key-value pairs.",
      },
      {
        label: "Empty Dictionary",
        code: "farm = {}",
        note: "Initializes an empty dictionary. Safe and clean.",
      },
      {
        label: "dict() Constructor",
        code: "farm = dict(name=\"Green Valley\", crop=\"Rice\", area=120)",
        note: "Alternative constructor style mapping keywords as keys.",
      },
    ],
  },
  accessing: {
    title: "Accessing Values",
    body: "Values can be retrieved by using their key inside square brackets [key], or safely using the get(key) method to prevent program crashes when keys do not exist.",
    rows: [
      {
        method: "Square Brackets",
        example: "farm[\"name\"]",
        result: "\"Green Valley\"",
        behavior: "Retrieves the value. Raises a KeyError if the key is missing.",
      },
      {
        method: ".get()",
        example: "farm.get(\"crop\")",
        result: "\"Rice\"",
        behavior: "Safely retrieves value. Returns None (no crash) if the key is missing.",
      },
      {
        method: ".get() with Default",
        example: "farm.get(\"owner\", \"Unknown\")",
        result: "\"Unknown\"",
        behavior: "Returns 'Unknown' instead of None if the key is not found.",
      },
    ],
  },
  updating: {
    title: "Updating Values",
    body: "You change an existing key's value by assigning a new value to it using square brackets.",
    code: "farm[\"crop\"] = \"Wheat\"",
    output: "{\"name\": \"Green Valley\", \"location\": \"Pune\", \"crop\": \"Wheat\"}",
  },
  adding: {
    title: "Adding New Data",
    body: "Assigning a value to a key that does not exist automatically adds the key-value pair to the dictionary. Dictionaries grow dynamically.",
    code: "farm[\"temperature\"] = 30",
    output: "{\"name\": \"Green Valley\", \"location\": \"Pune\", \"crop\": \"Wheat\", \"temperature\": 30}",
  },
  removing: {
    title: "Removing Keys",
    body: "You can remove items from a dictionary using pop() to extract a value, del to delete a pair, or clear() to empty the entire dictionary.",
    rows: [
      {
        method: "pop(key)",
        code: "crop = farm.pop(\"crop\")",
        behavior: "Removes key 'crop' and returns its value ('Wheat'). Raises KeyError if absent.",
      },
      {
        method: "del d[key]",
        code: "del farm[\"location\"]",
        behavior: "Deletes key 'location' directly in-place. Raises KeyError if absent.",
      },
      {
        method: "clear()",
        code: "farm.clear()",
        behavior: "Removes all key-value pairs, leaving the dictionary empty {}.",
      },
    ],
  },
  builtIns: {
    title: "Built-in Functions",
    body: "Python built-ins operate on dictionaries. By default, functions like sorted(), min(), and max() process the keys unless explicitly directed to dict.values() or dict.items().",
    rows: [
      {
        function: "len(d)",
        purpose: "Count key-value pairs",
        example: "len(farm)",
        output: "3",
      },
      {
        function: "sorted(d)",
        purpose: "Sort dictionary keys",
        example: "sorted(farm)",
        output: "[\"crop\", \"location\", \"name\"]",
      },
      {
        function: "max(d)",
        purpose: "Largest key by sorting order",
        example: "max(marks)",
        output: "\"C\"",
      },
      {
        function: "max(d.values())",
        purpose: "Largest value",
        example: "max(marks.values())",
        output: "90",
      },
    ],
  },
  methods: {
    title: "Dictionary Methods",
    body: "Methods belong specifically to dictionary objects and are optimized to retrieve structures or perform updates.",
    rows: [
      {
        method: "keys()",
        purpose: "Returns a view of all keys in the dictionary.",
        example: "farm.keys()",
        output: "dict_keys([\"name\", \"location\", \"crop\"])",
      },
      {
        method: "values()",
        purpose: "Returns a view of all values in the dictionary.",
        example: "farm.values()",
        output: "dict_values([\"Green Valley\", \"Pune\", \"Rice\"])",
      },
      {
        method: "items()",
        purpose: "Returns key-value tuple pairs: (key, value).",
        example: "farm.items()",
        output: "dict_items([(\"name\", \"Green Valley\"), (\"location\", \"Pune\"), (\"crop\", \"Rice\")])",
      },
      {
        method: "update(other)",
        purpose: "Updates the dictionary with pairs from another dictionary, overwriting existing keys.",
        example: "farm.update({\"crop\": \"Maize\", \"area\": 150})",
        output: "None (dictionary updated in-place)",
      },
      {
        method: "popitem()",
        purpose: "Removes and returns the last inserted key-value pair as a tuple.",
        example: "farm.popitem()",
        output: "(\"crop\", \"Rice\")",
      },
    ],
  },
  iteration: {
    title: "Iterating Through Dictionaries (Preview)",
    body: "Since loops are covered in Module 2, you can traverse dictionaries to analyze or transform asset registries.",
    examples: [
      {
        label: "Loop through keys",
        code: "for key in farm:\n    print(key)",
        output: "name\nlocation\ncrop",
      },
      {
        label: "Loop through values",
        code: "for val in farm.values():\n    print(val)",
        output: "Green Valley\nPune\nRice",
      },
      {
        label: "Loop through key-value pairs",
        code: "for k, v in farm.items():\n    print(k, v)",
        output: "name Green Valley\nlocation Pune\ncrop Rice",
      },
    ],
  },
  comparison: {
    title: "Collection Type Comparison",
    body: "Choosing the right collection type ensures code clarity, optimal lookup speeds, and safety.",
    rows: [
      {
        collection: "List",
        usage: "Ordered, duplicate-friendly sequences of values.",
        mapping: "Spreadsheet column, historical list of temperature readings (e.g. [25, 26, 25])",
      },
      {
        collection: "Tuple",
        usage: "Immutable, index-based records representing structured fixed slots.",
        mapping: "Fixed hardware specifications, GPS coordinates (e.g. (18.52, 73.85))",
      },
      {
        collection: "Set",
        usage: "Unordered collection of unique items with fast lookup.",
        mapping: "Distinct active sensor hardware IDs, registered crops list (e.g. {101, 102})",
      },
      {
        collection: "Dictionary",
        usage: "Key-value pairs offering labeled item lookups.",
        mapping: "JSON configurations, database rows, telemetry models with titles (e.g. {'id': 101, 'temp': 31})",
      },
    ],
  },
  agritech: {
    title: "Agritech Implementation",
    body: "Here is a real-world sensor record represented as a Python dictionary. We access its crop type and update its battery level.",
    code: "sensor = {\n    \"id\": 101,\n    \"crop\": \"Rice\",\n    \"moisture\": 24,\n    \"temperature\": 31,\n    \"battery\": 82,\n    \"status\": \"Active\"\n}\n\nprint(sensor[\"crop\"])\nsensor[\"battery\"] = 90\nprint(sensor)",
    output: "Rice\n{'id': 101, 'crop': 'Rice', 'moisture': 24, 'temperature': 31, 'battery': 90, 'status': 'Active'}",
  },
  debugChallenges: [
    {
      title: "Missing Key Lookup",
      prompt: "Why does looking up a key that does not exist in an empty dictionary raise a KeyError?",
      code: "farm = {}\nprint(farm[\"name\"])",
      mistakesToFind: 1,
      solution: "farm = {}\n# Safe access using get()\nprint(farm.get(\"name\")) # Returns None\n# Or initialize the key first\nfarm[\"name\"] = \"Green Valley\"\nprint(farm[\"name\"])",
      hiddenGuidance: "Accessing a missing key via square brackets farm['name'] immediately raises a KeyError. Use the safe get() method: farm.get('name') which returns None (or a default value) instead of raising an exception.",
    },
    {
      title: "Default Value Confusion",
      prompt: "Why does using get() on a missing key return None instead of raising an error?",
      code: "farm = {\"crop\": \"Rice\"}\nprint(farm.get(\"temperature\"))",
      mistakesToFind: 1,
      solution: "farm = {\"crop\": \"Rice\"}\n# Specify a default fallback value if None is not desired\ntemp = farm.get(\"temperature\", 25.0)\nprint(temp)",
      hiddenGuidance: "By design, get() returns None when a key is absent to prevent runtime crashes. If you want a default fallback value, pass it as the second argument: farm.get('temperature', 25.0).",
    },
    {
      title: "View Object Method Calls",
      prompt: "Find the syntax mistake when trying to access elements of a dictionary keys view like a list.",
      code: "farm = {\"crop\": \"Rice\"}\n# Trying to index the keys view directly\nprint(farm.keys[0])",
      mistakesToFind: 1,
      solution: "farm = {\"crop\": \"Rice\"}\n# farm.keys() is a method that must be called, and it returns a view.\n# To index it, convert it to a list first:\nkeys_list = list(farm.keys())\nprint(keys_list[0])",
      hiddenGuidance: "First, keys is a method, so you must call it with parentheses: farm.keys(). Second, keys() returns a view object (dict_keys) which is iterable but does not support index indexing. Cast it to a list first: list(farm.keys())[0].",
    },
  ],
  engineerScenario: {
    title: "Think Like an Engineer: APIs, JSON, and Structured Data",
    body: "When you query a modern weather API or read a database record, the data is returned in JSON format. JSON is structured identically to a Python dictionary: keys map to strings, integers, arrays, or other dictionaries. Understanding dictionaries is the foundational key to handling API endpoints, database queries (NoSQL), and data science schemas (pandas DataFrame rows).",
    question: "Why is accessing data via descriptive keys (e.g. sensor['battery']) much more robust than sequence positions (e.g. sensor[4]) when API responses add or reorder fields?",
  },
};
