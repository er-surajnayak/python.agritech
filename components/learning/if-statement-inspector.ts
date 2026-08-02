import type { PlaygroundExecution } from "@/components/learning/usePythonRunner";

export interface IfInspection {
  condition: string;
  conditionLine: number | null;
  bodyLines: number[];
  conditionResult: boolean | null;
  executedLines: number[];
}

export interface IfElseInspection extends IfInspection {
  elseLine: number | null;
  elseBodyLines: number[];
  selectedBranch: "if" | "else" | null;
}

export interface ConditionalTraceBranch {
  kind: "if" | "elif" | "else";
  condition: string | null;
  headerLine: number;
  bodyLines: number[];
  evaluated: boolean;
  selected: boolean;
}

export interface ConditionalChainInspection extends IfInspection {
  branches: ConditionalTraceBranch[];
  selectedBranch: number | null;
}

export interface NestedConditionLevel {
  depth: number;
  condition: string;
  headerLine: number;
  bodyLines: number[];
  elseLine: number | null;
  elseBodyLines: number[];
  evaluated: boolean;
  result: boolean | null;
}

export interface NestedIfInspection extends IfInspection {
  levels: NestedConditionLevel[];
  selectedPath: "outer-false" | "outer-true-inner-false" | "outer-true-inner-true" | null;
}

export interface MatchCaseBranch {
  pattern: string;
  headerLine: number;
  bodyLines: number[];
  evaluated: boolean;
  selected: boolean;
  isDefault: boolean;
}

export interface MatchCaseInspection extends IfInspection {
  subject: string;
  cases: MatchCaseBranch[];
  selectedCase: number | null;
}

export interface LoopIterationInspection {
  index: number;
  value: string;
  headerLine: number;
  executedLines: number[];
  output: string;
}

export interface ForLoopInspection extends IfInspection {
  variable: string;
  sequence: string;
  iterations: LoopIterationInspection[];
  completed: boolean;
}

export interface WhileIterationInspection {
  index: number;
  beforeValue: string;
  afterValue: string;
  condition: string;
  conditionResult: boolean;
  executedLines: number[];
  output: string;
}

export interface WhileLoopInspection extends IfInspection {
  variable: string;
  iterations: WhileIterationInspection[];
  finalValue: string;
  completed: boolean;
}

export interface InfiniteLoopAnalysis {
  severity: "safe" | "warning" | "danger";
  variable: string | null;
  condition: string;
  hasUpdate: boolean;
  message: string;
  hint: string;
}

export interface LoopControlIterationInspection {
  index: number;
  value: string;
  action: "none" | "break" | "continue" | "pass";
  controlLine: number | null;
  executedLines: number[];
  output: string;
}

export interface LoopControlInspection extends IfInspection {
  variable: string;
  sequence: string;
  iterations: LoopControlIterationInspection[];
  terminatedEarly: boolean;
}

export function inspectIfExecution(code: string, execution: PlaygroundExecution): IfInspection {
  const lines = code.split("\n");
  const headerIndex = lines.findIndex((line) => /^\s*if\s+.+:\s*(?:#.*)?$/.test(line));
  const conditionLine = headerIndex < 0 ? null : headerIndex + 1;
  const headerIndent = headerIndex < 0 ? 0 : lines[headerIndex].match(/^\s*/)?.[0].length ?? 0;
  const condition = headerIndex < 0 ? "No valid if condition found" : lines[headerIndex].trim().replace(/^if\s+/, "").replace(/:\s*(?:#.*)?$/, "");
  const bodyLines: number[] = [];
  if (headerIndex >= 0) {
    for (let index = headerIndex + 1; index < lines.length; index += 1) {
      if (!lines[index].trim()) continue;
      const indent = lines[index].match(/^\s*/)?.[0].length ?? 0;
      if (indent <= headerIndent) break;
      bodyLines.push(index + 1);
    }
  }
  const executedLines = [...new Set(execution.trace.map((step) => step.lineNumber))];
  const headerExecuted = conditionLine !== null && executedLines.includes(conditionLine);
  const bodyExecuted = bodyLines.some((line) => executedLines.includes(line));
  const conditionResult = execution.status !== "success" || !headerExecuted ? null : bodyExecuted;
  return { condition, conditionLine, bodyLines, conditionResult, executedLines };
}

export function inspectIfElseExecution(code: string, execution: PlaygroundExecution): IfElseInspection {
  const base = inspectIfExecution(code, execution);
  const lines = code.split("\n");
  const headerIndex = base.conditionLine === null ? -1 : base.conditionLine - 1;
  const headerIndent = headerIndex < 0 ? 0 : lines[headerIndex].match(/^\s*/)?.[0].length ?? 0;
  const elseIndex = lines.findIndex((line, index) => index > headerIndex && (line.match(/^\s*/)?.[0].length ?? 0) === headerIndent && /^\s*else\s*:/.test(line));
  const trueBodyLines = base.bodyLines.filter((line) => elseIndex < 0 || line < elseIndex + 1);
  const elseBodyLines: number[] = [];
  if (elseIndex >= 0) {
    for (let index = elseIndex + 1; index < lines.length; index += 1) {
      if (!lines[index].trim()) continue;
      const indent = lines[index].match(/^\s*/)?.[0].length ?? 0;
      if (indent <= headerIndent) break;
      elseBodyLines.push(index + 1);
    }
  }
  const trueExecuted = trueBodyLines.some((line) => base.executedLines.includes(line));
  const elseExecuted = elseBodyLines.some((line) => base.executedLines.includes(line));
  const conditionResult = execution.status !== "success" ? null : trueExecuted ? true : elseExecuted ? false : null;
  return { ...base, bodyLines: trueBodyLines, elseLine: elseIndex < 0 ? null : elseIndex + 1, elseBodyLines, conditionResult, selectedBranch: conditionResult === null ? null : conditionResult ? "if" : "else" };
}

export function inspectConditionalChain(code: string, execution: PlaygroundExecution): ConditionalChainInspection {
  const lines = code.split("\n");
  const ifIndex = lines.findIndex((line) => /^\s*if\s+.+:\s*(?:#.*)?$/.test(line));
  const headerIndent = ifIndex < 0 ? 0 : lines[ifIndex].match(/^\s*/)?.[0].length ?? 0;
  const headerIndexes: number[] = [];
  if (ifIndex >= 0) {
    for (let index = ifIndex; index < lines.length; index += 1) {
      const indent = lines[index].match(/^\s*/)?.[0].length ?? 0;
      if (indent === headerIndent && /^\s*(?:if|elif|else)\b.*:\s*(?:#.*)?$/.test(lines[index])) headerIndexes.push(index);
      if (index > ifIndex && lines[index].trim() && indent < headerIndent) break;
    }
  }
  const executedLines = [...new Set(execution.trace.map((step) => step.lineNumber))];
  const branches = headerIndexes.map((headerIndex, branchIndex): ConditionalTraceBranch => {
    const header = lines[headerIndex].trim();
    const kind = header.startsWith("elif ") ? "elif" : header.startsWith("else") ? "else" : "if";
    const nextHeader = headerIndexes[branchIndex + 1] ?? lines.length;
    const bodyLines: number[] = [];
    for (let index = headerIndex + 1; index < nextHeader; index += 1) {
      if (!lines[index].trim()) continue;
      const indent = lines[index].match(/^\s*/)?.[0].length ?? 0;
      if (indent <= headerIndent) break;
      bodyLines.push(index + 1);
    }
    const condition = kind === "else" ? null : header.replace(/^(?:if|elif)\s+/, "").replace(/:\s*(?:#.*)?$/, "");
    return { kind, condition, headerLine: headerIndex + 1, bodyLines, evaluated: kind === "else" ? bodyLines.some((line) => executedLines.includes(line)) : executedLines.includes(headerIndex + 1), selected: bodyLines.some((line) => executedLines.includes(line)) };
  });
  const selectedBranch = branches.findIndex((branch) => branch.selected);
  const selected = selectedBranch < 0 ? null : selectedBranch;
  const selectedCondition = selected === null ? branches[0]?.condition ?? "No valid conditional chain found" : branches[selected].condition ?? "default else branch";
  const conditionResult = execution.status !== "success" || selected === null ? null : branches[selected].kind !== "else";
  return { condition: selectedCondition, conditionLine: ifIndex < 0 ? null : ifIndex + 1, bodyLines: branches.flatMap((branch) => branch.bodyLines), conditionResult, executedLines, branches, selectedBranch: selected };
}

export function inspectNestedExecution(code: string, execution: PlaygroundExecution): NestedIfInspection {
  const lines = code.split("\n");
  const executedLines = [...new Set(execution.trace.map((step) => step.lineNumber))];
  const outerIndex = lines.findIndex((line) => /^\s*if\s+.+:\s*(?:#.*)?$/.test(line));
  if (outerIndex < 0) return { condition: "No valid nested if found", conditionLine: null, bodyLines: [], conditionResult: null, executedLines, levels: [], selectedPath: null };
  const outerIndent = lines[outerIndex].match(/^\s*/)?.[0].length ?? 0;
  const outerElseIndex = lines.findIndex((line, index) => index > outerIndex && (line.match(/^\s*/)?.[0].length ?? 0) === outerIndent && /^\s*else\s*:/.test(line));
  const outerEnd = outerElseIndex >= 0 ? outerElseIndex : lines.length;
  const innerIndex = lines.findIndex((line, index) => index > outerIndex && index < outerEnd && (line.match(/^\s*/)?.[0].length ?? 0) > outerIndent && /^\s*if\s+.+:\s*(?:#.*)?$/.test(line));
  const innerIndent = innerIndex < 0 ? outerIndent + 4 : lines[innerIndex].match(/^\s*/)?.[0].length ?? outerIndent + 4;
  const innerElseIndex = lines.findIndex((line, index) => index > innerIndex && index < outerEnd && (line.match(/^\s*/)?.[0].length ?? 0) === innerIndent && /^\s*else\s*:/.test(line));

  const collectBody = (start: number, end: number, indent: number) => {
    const body: number[] = [];
    for (let index = start; index < end; index += 1) {
      if (!lines[index]?.trim()) continue;
      const lineIndent = lines[index].match(/^\s*/)?.[0].length ?? 0;
      if (lineIndent <= indent) break;
      body.push(index + 1);
    }
    return body;
  };
  const outerTrueLines = collectBody(outerIndex + 1, outerEnd, outerIndent);
  const outerFalseLines = outerElseIndex < 0 ? [] : collectBody(outerElseIndex + 1, lines.length, outerIndent);
  const innerTrueLines = innerIndex < 0 ? [] : collectBody(innerIndex + 1, innerElseIndex >= 0 ? innerElseIndex : outerEnd, innerIndent);
  const innerFalseLines = innerElseIndex < 0 ? [] : collectBody(innerElseIndex + 1, outerEnd, innerIndent);
  const outerEvaluated = executedLines.includes(outerIndex + 1);
  const innerEvaluated = innerIndex >= 0 && executedLines.includes(innerIndex + 1);
  const outerTrue = outerTrueLines.some((line) => executedLines.includes(line));
  const outerFalse = outerFalseLines.some((line) => executedLines.includes(line));
  const innerTrue = innerTrueLines.some((line) => executedLines.includes(line));
  const innerFalse = innerFalseLines.some((line) => executedLines.includes(line));
  const outerResult = execution.status === "success" && outerEvaluated ? outerTrue ? true : outerFalse || outerElseIndex < 0 ? false : null : null;
  const innerResult = execution.status === "success" && innerEvaluated ? innerTrue ? true : innerFalse || innerElseIndex < 0 ? false : null : null;
  const selectedPath = execution.status !== "success" || !outerEvaluated ? null : outerResult === false ? "outer-false" : innerResult === true ? "outer-true-inner-true" : innerResult === false ? "outer-true-inner-false" : null;
  const outerCondition = lines[outerIndex].trim().replace(/^if\s+/, "").replace(/:\s*(?:#.*)?$/, "");
  const innerCondition = innerIndex < 0 ? "No inner condition found" : lines[innerIndex].trim().replace(/^if\s+/, "").replace(/:\s*(?:#.*)?$/, "");
  return {
    condition: innerEvaluated ? innerCondition : outerCondition,
    conditionLine: outerIndex + 1,
    bodyLines: [...outerTrueLines, ...outerFalseLines],
    conditionResult: innerEvaluated ? innerResult : outerResult,
    executedLines,
    levels: [
      { depth: 1, condition: outerCondition, headerLine: outerIndex + 1, bodyLines: outerTrueLines, elseLine: outerElseIndex < 0 ? null : outerElseIndex + 1, elseBodyLines: outerFalseLines, evaluated: outerEvaluated, result: outerResult },
      ...(innerIndex < 0 ? [] : [{ depth: 2, condition: innerCondition, headerLine: innerIndex + 1, bodyLines: innerTrueLines, elseLine: innerElseIndex < 0 ? null : innerElseIndex + 1, elseBodyLines: innerFalseLines, evaluated: innerEvaluated, result: innerResult }]),
    ],
    selectedPath,
  };
}

export function inspectMatchCaseExecution(code: string, execution: PlaygroundExecution): MatchCaseInspection {
  const lines = code.split("\n");
  const executedLines = [...new Set(execution.trace.map((step) => step.lineNumber))];
  const matchIndex = lines.findIndex((line) => /^\s*match\s+.+:\s*(?:#.*)?$/.test(line));
  if (matchIndex < 0) return { condition: "No valid match statement found", conditionLine: null, bodyLines: [], conditionResult: null, executedLines, subject: "", cases: [], selectedCase: null };
  const matchIndent = lines[matchIndex].match(/^\s*/)?.[0].length ?? 0;
  const caseIndexes: number[] = [];
  for (let index = matchIndex + 1; index < lines.length; index += 1) {
    if (!lines[index].trim()) continue;
    const indent = lines[index].match(/^\s*/)?.[0].length ?? 0;
    if (indent <= matchIndent) break;
    if (/^\s*case\s+.+:\s*(?:#.*)?$/.test(lines[index])) caseIndexes.push(index);
  }
  const cases = caseIndexes.map((caseIndex, index): MatchCaseBranch => {
    const nextCase = caseIndexes[index + 1] ?? lines.length;
    const caseIndent = lines[caseIndex].match(/^\s*/)?.[0].length ?? matchIndent + 4;
    const bodyLines: number[] = [];
    for (let lineIndex = caseIndex + 1; lineIndex < nextCase; lineIndex += 1) {
      if (!lines[lineIndex].trim()) continue;
      const indent = lines[lineIndex].match(/^\s*/)?.[0].length ?? 0;
      if (indent <= caseIndent) break;
      bodyLines.push(lineIndex + 1);
    }
    const pattern = lines[caseIndex].trim().replace(/^case\s+/, "").replace(/:\s*(?:#.*)?$/, "");
    return { pattern, headerLine: caseIndex + 1, bodyLines, evaluated: executedLines.includes(caseIndex + 1), selected: bodyLines.some((line) => executedLines.includes(line)), isDefault: pattern === "_" };
  });
  const selectedIndex = cases.findIndex((item) => item.selected);
  const selectedCase = selectedIndex < 0 ? null : selectedIndex;
  const subject = lines[matchIndex].trim().replace(/^match\s+/, "").replace(/:\s*(?:#.*)?$/, "");
  return { condition: `match ${subject}`, conditionLine: matchIndex + 1, bodyLines: cases.flatMap((item) => item.bodyLines), conditionResult: execution.status === "success" && selectedCase !== null ? true : null, executedLines, subject, cases, selectedCase };
}

export function inspectForLoopExecution(code: string, execution: PlaygroundExecution): ForLoopInspection {
  const lines = code.split("\n");
  const headerIndex = lines.findIndex((line) => /^\s*for\s+[A-Za-z_]\w*\s+in\s+.+:\s*(?:#.*)?$/.test(line));
  const executedLines = [...new Set(execution.trace.map((step) => step.lineNumber))];
  if (headerIndex < 0) return { condition: "No valid for loop found", conditionLine: null, bodyLines: [], conditionResult: null, executedLines, variable: "", sequence: "", iterations: [], completed: false };
  const header = lines[headerIndex].trim();
  const match = header.match(/^for\s+([A-Za-z_]\w*)\s+in\s+(.+):\s*(?:#.*)?$/);
  const variable = match?.[1] ?? "item";
  const sequence = match?.[2] ?? "sequence";
  const headerLine = headerIndex + 1;
  const headerIndent = lines[headerIndex].match(/^\s*/)?.[0].length ?? 0;
  const bodyLines: number[] = [];
  for (let index = headerIndex + 1; index < lines.length; index += 1) {
    if (!lines[index].trim()) continue;
    const indent = lines[index].match(/^\s*/)?.[0].length ?? 0;
    if (indent <= headerIndent) break;
    bodyLines.push(index + 1);
  }
  const headerTraceIndexes = execution.trace.map((step, index) => step.lineNumber === headerLine ? index : -1).filter((index) => index >= 0);
  const iterations: LoopIterationInspection[] = [];
  headerTraceIndexes.forEach((traceIndex, index) => {
    const nextHeader = headerTraceIndexes[index + 1] ?? execution.trace.length;
    const bodySteps = execution.trace.slice(traceIndex + 1, nextHeader).filter((step) => bodyLines.includes(step.lineNumber));
    if (!bodySteps.length) return;
    const headerStep = execution.trace[traceIndex];
    const value = headerStep.variables.find((item) => item.name === variable)?.value ?? "—";
    const before = headerStep.output ?? "";
    const after = bodySteps.at(-1)?.output ?? before;
    const output = after.startsWith(before) ? after.slice(before.length).trim() : after.trim();
    iterations.push({ index: iterations.length + 1, value, headerLine, executedLines: bodySteps.map((step) => step.lineNumber), output });
  });
  return { condition: `for ${variable} in ${sequence}`, conditionLine: headerLine, bodyLines, conditionResult: execution.status === "success" && iterations.length > 0 ? true : null, executedLines, variable, sequence, iterations, completed: execution.status === "success" && headerTraceIndexes.length > iterations.length };
}

export function inspectWhileLoopExecution(code: string, execution: PlaygroundExecution): WhileLoopInspection {
  const lines = code.split("\n");
  const headerIndex = lines.findIndex((line) => /^\s*while\s+.+:\s*(?:#.*)?$/.test(line));
  const executedLines = [...new Set(execution.trace.map((step) => step.lineNumber))];
  if (headerIndex < 0) return { condition: "No valid while loop found", conditionLine: null, bodyLines: [], conditionResult: null, executedLines, variable: "", iterations: [], finalValue: "—", completed: false };
  const condition = lines[headerIndex].trim().replace(/^while\s+/, "").replace(/:\s*(?:#.*)?$/, "");
  const variable = condition.match(/\b([A-Za-z_]\w*)\b/)?.[1] ?? "value";
  const headerLine = headerIndex + 1;
  const headerIndent = lines[headerIndex].match(/^\s*/)?.[0].length ?? 0;
  const bodyLines: number[] = [];
  for (let index = headerIndex + 1; index < lines.length; index += 1) {
    if (!lines[index].trim()) continue;
    const indent = lines[index].match(/^\s*/)?.[0].length ?? 0;
    if (indent <= headerIndent) break;
    bodyLines.push(index + 1);
  }
  const headerTraceIndexes = execution.trace.map((step, index) => step.lineNumber === headerLine ? index : -1).filter((index) => index >= 0);
  const iterations: WhileIterationInspection[] = [];
  headerTraceIndexes.forEach((traceIndex, index) => {
    const nextHeader = headerTraceIndexes[index + 1] ?? execution.trace.length;
    const bodySteps = execution.trace.slice(traceIndex + 1, nextHeader).filter((step) => bodyLines.includes(step.lineNumber));
    if (!bodySteps.length) return;
    const headerStep = execution.trace[traceIndex];
    const lastBodyStep = bodySteps.at(-1);
    const beforeValue = headerStep.variables.find((item) => item.name === variable)?.value ?? "—";
    const afterValue = lastBodyStep?.variables.find((item) => item.name === variable)?.value ?? beforeValue;
    const beforeOutput = headerStep.output ?? "";
    const afterOutput = lastBodyStep?.output ?? beforeOutput;
    const output = afterOutput.startsWith(beforeOutput) ? afterOutput.slice(beforeOutput.length).trim() : afterOutput.trim();
    iterations.push({ index: iterations.length + 1, beforeValue, afterValue, condition, conditionResult: true, executedLines: bodySteps.map((step) => step.lineNumber), output });
  });
  const finalHeader = headerTraceIndexes.at(-1);
  const finalValue = finalHeader === undefined ? "—" : execution.trace[finalHeader].variables.find((item) => item.name === variable)?.value ?? "—";
  const completed = execution.status === "success" && headerTraceIndexes.length > iterations.length;
  return { condition, conditionLine: headerLine, bodyLines, conditionResult: completed ? false : iterations.length ? true : null, executedLines, variable, iterations, finalValue, completed };
}

export function analyzeWhileLoopSafety(code: string): InfiniteLoopAnalysis {
  const lines = code.split("\n");
  const headerIndex = lines.findIndex((line) => /^\s*while\s+.+:\s*(?:#.*)?$/.test(line));
  if (headerIndex < 0) return { severity: "warning", variable: null, condition: "", hasUpdate: false, message: "No complete while-loop header was found.", hint: "Use while condition: and indent the repeated block." };
  const condition = lines[headerIndex].trim().replace(/^while\s+/, "").replace(/:\s*(?:#.*)?$/, "");
  const variable = condition.match(/\b([A-Za-z_]\w*)\b/)?.[1] ?? null;
  const headerIndent = lines[headerIndex].match(/^\s*/)?.[0].length ?? 0;
  const body: string[] = [];
  for (let index = headerIndex + 1; index < lines.length; index += 1) {
    if (!lines[index].trim()) continue;
    const indent = lines[index].match(/^\s*/)?.[0].length ?? 0;
    if (indent <= headerIndent) break;
    body.push(lines[index].trim());
  }
  if (/^(?:True|1)$/.test(condition) && !body.some((line) => /^break\b/.test(line))) return { severity: "danger", variable, condition, hasUpdate: false, message: "This condition is always True, so the loop has no visible exit.", hint: "Use a condition that can become False." };
  if (!variable) return { severity: "warning", variable: null, condition, hasUpdate: false, message: "The condition variable could not be identified.", hint: "Check that a named value controls the loop and changes inside it." };
  const escaped = variable.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const update = body.map((line) => {
    const compound = line.match(new RegExp(`^${escaped}\\s*([+-])=\\s*(-?\\d+(?:\\.\\d+)?)`));
    if (compound) return compound[1] === "+" ? Number(compound[2]) : -Number(compound[2]);
    const assigned = line.match(new RegExp(`^${escaped}\\s*=\\s*${escaped}\\s*([+-])\\s*(-?\\d+(?:\\.\\d+)?)`));
    if (assigned) return assigned[1] === "+" ? Number(assigned[2]) : -Number(assigned[2]);
    return null;
  }).find((value) => value !== null);
  if (update === undefined) return { severity: "danger", variable, condition, hasUpdate: false, message: `The condition variable ${variable} is not changed inside the loop.`, hint: `Update ${variable} so the condition can eventually become False.` };
  const operator = condition.match(/(?:<=|>=|<|>)/)?.[0];
  const wrongDirection = ((operator === "<" || operator === "<=") && update <= 0) || ((operator === ">" || operator === ">=") && update >= 0);
  if (wrongDirection) return { severity: "danger", variable, condition, hasUpdate: true, message: `${variable} changes away from the stopping boundary.`, hint: `Reverse the update direction so ${condition} can become False.` };
  return { severity: "safe", variable, condition, hasUpdate: true, message: "The controlling variable moves toward the stopping boundary.", hint: "Run with small values and verify the final False condition." };
}

export function inspectLoopControlExecution(code: string, execution: PlaygroundExecution): LoopControlInspection {
  const lines = code.split("\n");
  const headerIndex = lines.findIndex((line) => /^\s*for\s+[A-Za-z_]\w*\s+in\s+.+:\s*(?:#.*)?$/.test(line));
  const executedLines = [...new Set(execution.trace.map((step) => step.lineNumber))];
  if (headerIndex < 0) return { condition: "No valid for loop found", conditionLine: null, bodyLines: [], conditionResult: null, executedLines, variable: "", sequence: "", iterations: [], terminatedEarly: false };
  const header = lines[headerIndex].trim();
  const match = header.match(/^for\s+([A-Za-z_]\w*)\s+in\s+(.+):\s*(?:#.*)?$/);
  const variable = match?.[1] ?? "item";
  const sequence = match?.[2] ?? "sequence";
  const headerLine = headerIndex + 1;
  const headerIndent = lines[headerIndex].match(/^\s*/)?.[0].length ?? 0;
  const bodyLines: number[] = [];
  for (let index = headerIndex + 1; index < lines.length; index += 1) {
    if (!lines[index].trim()) continue;
    const indent = lines[index].match(/^\s*/)?.[0].length ?? 0;
    if (indent <= headerIndent) break;
    bodyLines.push(index + 1);
  }
  const controlLines = new Map<number, "break" | "continue" | "pass">();
  bodyLines.forEach((lineNumber) => {
    const statement = lines[lineNumber - 1].trim();
    if (/^(?:break|continue|pass)\b/.test(statement)) controlLines.set(lineNumber, statement.split(/\s/)[0] as "break" | "continue" | "pass");
  });
  const headerTraceIndexes = execution.trace.map((step, index) => step.lineNumber === headerLine ? index : -1).filter((index) => index >= 0);
  const iterations: LoopControlIterationInspection[] = [];
  headerTraceIndexes.forEach((traceIndex, index) => {
    const nextHeader = headerTraceIndexes[index + 1] ?? execution.trace.length;
    const bodySteps = execution.trace.slice(traceIndex + 1, nextHeader).filter((step) => bodyLines.includes(step.lineNumber));
    if (!bodySteps.length) return;
    const headerStep = execution.trace[traceIndex];
    const controlStep = bodySteps.find((step) => controlLines.has(step.lineNumber));
    const beforeOutput = headerStep.output ?? "";
    const afterOutput = bodySteps.at(-1)?.output ?? beforeOutput;
    const output = afterOutput.startsWith(beforeOutput) ? afterOutput.slice(beforeOutput.length).trim() : afterOutput.trim();
    iterations.push({ index: iterations.length + 1, value: headerStep.variables.find((item) => item.name === variable)?.value ?? "—", action: controlStep ? controlLines.get(controlStep.lineNumber)! : "none", controlLine: controlStep?.lineNumber ?? null, executedLines: bodySteps.map((step) => step.lineNumber), output });
  });
  const terminatedEarly = iterations.at(-1)?.action === "break";
  return { condition: `for ${variable} in ${sequence}`, conditionLine: headerLine, bodyLines, conditionResult: execution.status === "success" && iterations.length ? true : null, executedLines, variable, sequence, iterations, terminatedEarly };
}

export type IndentationIssueKind = "missing-indentation" | "extra-indentation" | "missing-colon";

export interface IndentationIssue {
  kind: IndentationIssueKind;
  line: number;
  message: string;
  suggestion: string;
}

export function checkIfIndentation(code: string): IndentationIssue[] {
  const lines = code.split("\n");
  const issues: IndentationIssue[] = [];
  const headerIndex = lines.findIndex((line) => /^\s*if\b/.test(line));
  if (headerIndex < 0) return issues;
  const header = lines[headerIndex];
  const headerIndent = header.match(/^\s*/)?.[0].length ?? 0;
  if (headerIndent > 0) issues.push({ kind: "extra-indentation", line: headerIndex + 1, message: "This top-level if statement begins with extra indentation.", suggestion: "Move if to the start of the line." });
  if (!header.trimEnd().endsWith(":")) issues.push({ kind: "missing-colon", line: headerIndex + 1, message: "The if header does not end with a colon.", suggestion: "Add : immediately after the condition." });
  const bodyIndex = lines.findIndex((line, index) => index > headerIndex && Boolean(line.trim()));
  if (bodyIndex >= 0) {
    const bodyIndent = lines[bodyIndex].match(/^\s*/)?.[0].length ?? 0;
    if (bodyIndent <= headerIndent) issues.push({ kind: "missing-indentation", line: bodyIndex + 1, message: "The first controlled statement is not indented.", suggestion: "Add four spaces before the statement." });
    else if (headerIndent === 0 && bodyIndent !== 4) issues.push({ kind: "extra-indentation", line: bodyIndex + 1, message: "The block uses non-standard indentation.", suggestion: "Use four spaces consistently for this block." });
  }
  return issues;
}
