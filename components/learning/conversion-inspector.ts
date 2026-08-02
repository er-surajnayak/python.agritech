import type { InspectedVariable } from "@/components/learning/variable-inspector";
import type { PythonConversionFunction, PythonDataTypeName } from "@/types/content";

interface ParsedValue {
  value: string | number | boolean | null;
  display: string;
  type: PythonDataTypeName;
}

export interface ConversionInspection {
  variable: string;
  originalValue: string;
  originalType: PythonDataTypeName;
  conversion: PythonConversionFunction;
  convertedValue: string;
  convertedType: PythonDataTypeName;
  error?: string;
}

export interface ConversionInspectionResult {
  conversions: ConversionInspection[];
  variables: InspectedVariable[];
}

function parseValue(source: string, variables: Map<string, ParsedValue>): ParsedValue | null {
  const value = source.trim();
  const quoted = value.match(/^(["'])(.*)\1$/);
  if (quoted) return { value: quoted[2], display: `"${quoted[2]}"`, type: "str" };
  if (/^[-+]?\d+$/.test(value)) return { value: Number(value), display: String(Number(value)), type: "int" };
  if (/^[-+]?(?:\d+\.\d*|\d*\.\d+)$/.test(value)) return { value: Number(value), display: String(Number(value)), type: "float" };
  if (value === "True" || value === "False") return { value: value === "True", display: value, type: "bool" };
  if (value === "None") return { value: null, display: "None", type: "NoneType" };
  return variables.get(value) ?? null;
}

function convertValue(source: ParsedValue, conversion: PythonConversionFunction): ParsedValue | { error: string } {
  if (conversion === "str") {
    const text = source.type === "bool" ? source.value ? "True" : "False" : source.type === "NoneType" ? "None" : String(source.value);
    return { value: text, display: `"${text}"`, type: "str" };
  }
  if (conversion === "bool") {
    const converted = source.type === "NoneType" ? false : source.type === "str" ? String(source.value).length > 0 : Boolean(source.value);
    return { value: converted, display: converted ? "True" : "False", type: "bool" };
  }
  if (conversion === "int") {
    if (source.type === "str" && !/^[-+]?\d+$/.test(String(source.value).trim())) return { error: `ValueError: ${source.display} is not valid whole-number text.` };
    if (source.type === "NoneType") return { error: "TypeError: None cannot be converted to int." };
    const converted = Math.trunc(Number(source.value));
    if (!Number.isFinite(converted)) return { error: `ValueError: ${source.display} cannot be converted to int.` };
    return { value: converted, display: String(converted), type: "int" };
  }
  if (source.type === "str" && (!String(source.value).trim() || !Number.isFinite(Number(source.value)))) return { error: `ValueError: ${source.display} is not valid numeric text.` };
  if (source.type === "NoneType") return { error: "TypeError: None cannot be converted to float." };
  const converted = Number(source.value);
  if (!Number.isFinite(converted)) return { error: `ValueError: ${source.display} cannot be converted to float.` };
  return { value: converted, display: Number.isInteger(converted) ? converted.toFixed(1) : String(converted), type: "float" };
}

function evaluate(source: string, variables: Map<string, ParsedValue>, conversions: ConversionInspection[], variable: string): ParsedValue | null {
  const call = source.trim().match(/^(int|float|str|bool)\((.*)\)$/);
  if (!call) return parseValue(source, variables);
  const conversion = call[1] as PythonConversionFunction;
  const original = evaluate(call[2], variables, conversions, variable);
  if (!original) return null;
  const converted = convertValue(original, conversion);
  if ("error" in converted) {
    conversions.push({ variable, originalValue: original.display, originalType: original.type, conversion, convertedValue: "—", convertedType: original.type, error: converted.error });
    return original;
  }
  conversions.push({ variable, originalValue: original.display, originalType: original.type, conversion, convertedValue: converted.display, convertedType: converted.type });
  return converted;
}

export function inspectPythonConversions(code: string): ConversionInspectionResult {
  const variables = new Map<string, ParsedValue>();
  const conversions: ConversionInspection[] = [];
  for (const sourceLine of code.split("\n")) {
    const line = sourceLine.split("#", 1)[0].trim();
    const assignment = line.match(/^([A-Za-z_]\w*)\s*=(?!=)\s*(.+)$/);
    if (!assignment) continue;
    const [, name, expression] = assignment;
    const value = evaluate(expression, variables, conversions, name);
    if (value) variables.set(name, value);
  }
  return {
    conversions,
    variables: [...variables].map(([name, value]) => ({ name, value: value.display, type: value.type })),
  };
}
