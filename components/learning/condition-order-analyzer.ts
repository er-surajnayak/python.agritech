import type { ConditionalBranchContent } from "@/types/content";

export interface ConditionOrderIssue {
  branchId: string;
  kind: "unreachable" | "redundant" | "mixed-variable" | "invalid";
  message: string;
  suggestion: string;
}

interface ParsedCondition { variable: string; operator: "<" | "<=" | ">" | ">="; threshold: number }

export function parseThresholdCondition(condition: string): ParsedCondition | null {
  const match = condition.trim().match(/^([A-Za-z_]\w*)\s*(<=|>=|<|>)\s*(-?\d+(?:\.\d+)?)$/);
  if (!match) return null;
  return { variable: match[1], operator: match[2] as ParsedCondition["operator"], threshold: Number(match[3]) };
}

export function analyzeConditionOrder(branches: ConditionalBranchContent[]): ConditionOrderIssue[] {
  const conditional = branches.filter((branch) => branch.kind !== "else");
  const parsed = conditional.map((branch) => ({ branch, parsed: parseThresholdCondition(branch.condition ?? "") }));
  const issues: ConditionOrderIssue[] = [];
  parsed.forEach(({ branch, parsed: condition }) => {
    if (!condition) issues.push({ branchId: branch.id, kind: "invalid", message: `“${branch.condition}” is not a supported threshold condition.`, suggestion: "Use one variable, <, <=, >, or >=, and one numeric threshold." });
  });
  const valid = parsed.filter((item): item is { branch: ConditionalBranchContent; parsed: ParsedCondition } => Boolean(item.parsed));
  if (!valid.length) return issues;
  const variable = valid[0].parsed.variable;
  valid.forEach(({ branch, parsed: condition }) => {
    if (condition.variable !== variable) issues.push({ branchId: branch.id, kind: "mixed-variable", message: `This chain switches from ${variable} to ${condition.variable}.`, suggestion: "Use one measurement per ordered threshold chain." });
  });
  for (let index = 1; index < valid.length; index += 1) {
    const previous = valid[index - 1];
    const current = valid[index];
    if (current.parsed.variable !== previous.parsed.variable) continue;
    if (current.parsed.operator === previous.parsed.operator && current.parsed.threshold === previous.parsed.threshold) issues.push({ branchId: current.branch.id, kind: "redundant", message: `${current.branch.condition} repeats the previous condition.`, suggestion: "Remove the duplicate or choose a distinct threshold." });
    const lessFamily = previous.parsed.operator.startsWith("<") && current.parsed.operator.startsWith("<");
    const greaterFamily = previous.parsed.operator.startsWith(">") && current.parsed.operator.startsWith(">");
    if (lessFamily && previous.parsed.threshold > current.parsed.threshold) issues.push({ branchId: current.branch.id, kind: "unreachable", message: `${current.branch.condition} is unreachable because the broader ${previous.branch.condition} appears first.`, suggestion: "Order < thresholds from smallest to largest." });
    if (greaterFamily && previous.parsed.threshold < current.parsed.threshold) issues.push({ branchId: current.branch.id, kind: "unreachable", message: `${current.branch.condition} is unreachable because the broader ${previous.branch.condition} appears first.`, suggestion: "Order > thresholds from largest to smallest." });
  }
  return issues;
}

export function selectBranchForValue(branches: ConditionalBranchContent[], value: number): number {
  for (let index = 0; index < branches.length; index += 1) {
    const branch = branches[index];
    if (branch.kind === "else") return index;
    const condition = parseThresholdCondition(branch.condition ?? "");
    if (!condition) continue;
    if (condition.operator === "<" && value < condition.threshold) return index;
    if (condition.operator === "<=" && value <= condition.threshold) return index;
    if (condition.operator === ">" && value > condition.threshold) return index;
    if (condition.operator === ">=" && value >= condition.threshold) return index;
  }
  return -1;
}
