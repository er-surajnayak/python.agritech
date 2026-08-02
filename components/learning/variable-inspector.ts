export interface InspectedVariable {
  name: string;
  value: string;
  type: "str" | "int" | "float" | "bool" | "NoneType" | "reference" | "expression";
}

const pythonKeywords = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield",
]);

export function validateVariableName(name: string) {
  if (!name) return { valid: false, reason: "Enter a variable name." };
  if (pythonKeywords.has(name)) return { valid: false, reason: `${name} is a reserved Python keyword.` };
  if (/^[0-9]/.test(name)) return { valid: false, reason: "A variable name cannot begin with a digit." };
  if (/\s/.test(name)) return { valid: false, reason: "Variable names cannot contain spaces." };
  if (!/^[A-Za-z_]\w*$/.test(name)) return { valid: false, reason: "Use only letters, digits, and underscores." };
  return { valid: true, reason: "This is a valid Python variable name." };
}

function inspectValue(rawValue: string, knownVariables: Map<string, InspectedVariable>): Omit<InspectedVariable, "name"> {
  const value = rawValue.trim();
  const quoted = value.match(/^(["'])(.*)\1$/);
  if (quoted) return { value: quoted[2], type: "str" };
  if (/^-?\d+$/.test(value)) return { value, type: "int" };
  if (/^-?(?:\d+\.\d*|\d*\.\d+)$/.test(value)) return { value, type: "float" };
  if (value === "True" || value === "False") return { value, type: "bool" };
  if (value === "None") return { value, type: "NoneType" };
  const referenced = knownVariables.get(value);
  if (referenced) return { value: referenced.value, type: referenced.type };
  return { value, type: /^[A-Za-z_]\w*$/.test(value) ? "reference" : "expression" };
}

export function inspectPythonVariables(code: string): InspectedVariable[] {
  const variables = new Map<string, InspectedVariable>();
  for (const sourceLine of code.split("\n")) {
    const line = sourceLine.split("#", 1)[0].trim();
    if (!line) continue;
    const assignment = line.match(/^([A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)*)\s*=(?!=)\s*(.+)$/);
    if (!assignment) continue;
    const names = assignment[1].split(",").map((name) => name.trim());
    const rawValues = assignment[2].split(",").map((value) => value.trim());
    if (names.length !== rawValues.length) continue;
    const snapshot = new Map(variables);
    names.forEach((name, index) => {
      const inspected = inspectValue(rawValues[index], snapshot);
      variables.set(name, { name, ...inspected });
    });
  }
  return [...variables.values()];
}
