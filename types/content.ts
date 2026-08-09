import type { ReactNode } from "react";

export interface LessonTextSection {
  title: string;
  body: string;
  items?: string[];
}

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface PlaygroundContent {
  title: string;
  description: string;
  starterCode: string;
  expectedOutcome: string;
}

export type PracticeLevel = "Easy" | "Medium" | "Challenge";

export interface PracticeTask {
  level: PracticeLevel;
  title: string;
  prompt: string;
  guidance: string;
  activities?: string[];
}

export interface QuizPlaceholderContent {
  title: string;
  question: string;
  options: string[];
  note: string;
  correctOptionIndex?: number;
  explanation?: string;
}

export type LessonVisualIcon =
  | "farmer"
  | "drone"
  | "python"
  | "sensor"
  | "dashboard"
  | "field"
  | "learn"
  | "visualize"
  | "experiment"
  | "practice"
  | "challenge"
  | "apply"
  | "sidebar"
  | "search"
  | "theme"
  | "progress"
  | "playground"
  | "notes"
  | "assignments"
  | "projects"
  | "resources"
  | "achievements";

export interface InteractiveFeature {
  title: string;
  description: string;
  detail: string;
  icon: LessonVisualIcon;
  href?: string;
}

export interface RoadmapModule {
  index: number;
  title: string;
  description: string;
  locked: boolean;
}

export interface WelcomeLessonDevelopmentPack {
  kind: "welcome";
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    prerequisite: string;
    visualNodes: Array<{ label: string; icon: LessonVisualIcon }>;
  };
  dataStory: {
    title: string;
    introduction: string;
    signals: string[];
    question: string;
    answer: string;
    capabilitiesTitle: string;
    capabilities: string[];
    industryTitle: string;
    industryUses: string[];
  };
  didYouKnow: LessonTextSection;
  diNotes: {
    title: string;
    introduction: string;
    notTitle: string;
    notList: string[];
    isTitle: string;
    isList: string[];
    features: InteractiveFeature[];
  };
  learningTimeline: {
    title: string;
    description: string;
    steps: WorkflowStep[];
  };
  companion: {
    title: string;
    message: string[];
    stages: Array<{ title: string; description: string }>;
  };
  roadmap: {
    title: string;
    description: string;
    modules: RoadmapModule[];
  };
  platformTour: {
    title: string;
    description: string;
    features: InteractiveFeature[];
  };
  motivation: {
    title: string;
    quote: string[];
    stages: Array<{ title: string; description: string }>;
  };
}

export interface LanguageComparisonRow {
  feature: string;
  python: number;
  c: number;
  java: number;
}

export interface EngineerScenarioOption {
  label: string;
  explanation: string;
  recommended: boolean;
}

export interface WhyPythonDevelopmentPack {
  kind: "why-python";
  prerequisite: string;
  story: {
    title: string;
    body: string;
    signals: string[];
    question: string;
    answer: string;
  };
  definition: LessonTextSection & {
    workflow: { title: string; description: string; steps: WorkflowStep[] };
  };
  didYouKnow: LessonTextSection;
  popularity: {
    title: string;
    description: string;
    features: InteractiveFeature[];
  };
  agritech: {
    title: string;
    description: string;
    applications: InteractiveFeature[];
  };
  everywhere: {
    title: string;
    description: string;
    organizations: Array<{ name: string; context: string }>;
  };
  comparison: {
    title: string;
    description: string;
    note: string;
    rows: LanguageComparisonRow[];
  };
  engineerScenario: {
    title: string;
    scenario: string;
    question: string;
    options: EngineerScenarioOption[];
  };
}

export interface CodeExampleContent {
  title: string;
  code: string;
  explanation: string;
  output?: string;
}

export interface SyntaxMistakeContent {
  title: string;
  incorrect: string;
  reason: string;
  correct: string;
}

export interface DebugChallengeContent {
  title: string;
  prompt: string;
  code: string;
  mistakesToFind: number;
  solution: string;
  hiddenGuidance: string;
}

export interface FirstProgramDevelopmentPack {
  kind: "first-program";
  prerequisite: string;
  story: LessonTextSection & { workflow: { title: string; description: string; steps: WorkflowStep[] } };
  programming: {
    title: string;
    body: string;
    humanWorkflow: { title: string; description: string; steps: WorkflowStep[] };
    computerWorkflow: { title: string; description: string; steps: WorkflowStep[] };
    industryTitle: string;
    industries: string[];
  };
  pythonCode: LessonTextSection & { example: CodeExampleContent; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  execution: {
    title: string;
    description: string;
    lines: Array<{ code: string; output: string }>;
  };
  firstProgram: CodeExampleContent;
  print: {
    title: string;
    body: string;
    examples: CodeExampleContent[];
    predictionPrompt: string;
  };
  statements: LessonTextSection & { examples: string[]; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  comments: {
    title: string;
    body: string;
    comment: string;
    executableCode: string;
  };
  indentation: {
    title: string;
    body: string;
    wrongCode: string;
    wrongExplanation: string;
    correctCode: string;
    correctExplanation: string;
    futureUses: string[];
  };
  agritechProgram: CodeExampleContent;
  playgroundActivities: string[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenge: DebugChallengeContent;
  miniActivity: LessonTextSection;
}

export interface VariableLessonDevelopmentPack {
  kind: "variables";
  prerequisite: string;
  story: LessonTextSection & { facts: string[]; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  definition: LessonTextSection & { examples: Array<{ name: string; value: string }> };
  whyVariables: {
    title: string;
    body: string;
    question: string;
    answer: string;
    withoutVariables: string;
    withVariables: string;
  };
  memory: LessonTextSection;
  creating: LessonTextSection & { syntax: string; examples: string; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  assignment: LessonTextSection & { symbol: string; example: string; reading: string; misconception: string };
  namingRules: { title: string; body: string; rules: Array<{ example: string; valid: boolean; explanation: string }> };
  namingConventions: { title: string; body: string; tiers: Array<{ label: string; examples: string[]; explanation: string }> };
  printing: CodeExampleContent[];
  dynamicTyping: CodeExampleContent;
  updating: CodeExampleContent & { workflow: WorkflowStep[] };
  multipleAssignment: CodeExampleContent;
  swapping: { title: string; body: string; traditional: string; python: string; before: Array<{ name: string; value: string }>; after: Array<{ name: string; value: string }> };
  agritechProgram: CodeExampleContent;
  playgroundActivities: string[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenge: DebugChallengeContent;
  engineerScenario: {
    title: string;
    scenario: string;
    question: string;
    options: EngineerScenarioOption[];
  };
}

export type PythonDataTypeName = "int" | "float" | "str" | "bool" | "NoneType";

export interface DataTypeLessonDevelopmentPack {
  kind: "data-types";
  prerequisite: string;
  story: LessonTextSection & { facts: Array<{ label: string; value: string; type: PythonDataTypeName }>; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  definition: LessonTextSection & { code: string; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  whyTypesMatter: {
    title: string;
    body: string;
    predictions: Array<{ title: string; code: string; options: string[]; answer: string; explanation: string }>;
  };
  types: {
    title: string;
    body: string;
    items: Array<{
      type: PythonDataTypeName;
      title: string;
      definition: string;
      examples: string;
      agritechExample: string;
      visualValues: string[];
    }>;
  };
  stringQuotes: { title: string; body: string; quotedCode: string; unquotedCode: string; success: string; error: string };
  booleanSwitch: { title: string; body: string; onName: string; offName: string };
  typeFunction: LessonTextSection & { examples: CodeExampleContent[] };
  conversions: {
    title: string;
    body: string;
    items: Array<{ from: PythonDataTypeName; to: PythonDataTypeName; code: string; input: string; output: string; explanation: string }>;
  };
  agritechProgram: CodeExampleContent;
  playgroundActivities: string[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenge: DebugChallengeContent;
  engineerScenario: {
    title: string;
    scenario: string;
    question: string;
    options: EngineerScenarioOption[];
  };
}

export type UserInputFieldType = "str" | "int" | "float";

export interface UserInputField {
  id: string;
  label: string;
  prompt: string;
  defaultValue: string;
  type: UserInputFieldType;
}

export interface OutputPredictionContent {
  title: string;
  body: string;
  predictions: Array<{ title: string; code: string; options: string[]; answer: string; explanation: string }>;
}

export interface UserInputLessonDevelopmentPack {
  kind: "user-input";
  prerequisite: string;
  story: LessonTextSection & { prompts: string[]; question: string; answer: string; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  whyInput: {
    title: string;
    body: string;
    staticCode: string;
    interactiveCode: string;
    stages: WorkflowStep[];
  };
  inputFunction: LessonTextSection & { syntax: string; example: CodeExampleContent; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  textInput: CodeExampleContent & { sampleInputs: string[] };
  multipleInputs: CodeExampleContent & { activity: string };
  numericInput: CodeExampleContent & { question: string; answer: string };
  conversion: {
    title: string;
    body: string;
    integer: CodeExampleContent;
    decimal: CodeExampleContent;
    workflow: { title: string; description: string; steps: WorkflowStep[] };
  };
  whyConversion: OutputPredictionContent;
  agritechProgram: CodeExampleContent;
  simulator: {
    title: string;
    description: string;
    fields: UserInputField[];
    code: string;
    reportTitle: string;
  };
  playgroundActivities: string[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenge: DebugChallengeContent;
  engineerScenario: {
    title: string;
    scenario: string;
    question: string;
    options: EngineerScenarioOption[];
  };
  miniProject: AssignmentContent & { outputTemplate: string };
}

export type PythonConversionFunction = "int" | "float" | "str" | "bool";

export interface ConversionExampleContent {
  title: string;
  originalValue: string;
  originalType: PythonDataTypeName;
  conversion: PythonConversionFunction;
  convertedValue: string;
  convertedType: PythonDataTypeName;
  code: string;
  explanation: string;
}

export interface TypeConversionLessonDevelopmentPack {
  kind: "type-conversion";
  prerequisite: string;
  story: LessonTextSection & { sensorValue: string; failedCode: string; answer: string; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  definition: LessonTextSection & { example: CodeExampleContent; flow: WorkflowStep[] };
  whyConversion: OutputPredictionContent;
  implicitConversion: CodeExampleContent & { before: Array<{ value: string; type: PythonDataTypeName }>; after: { value: string; type: PythonDataTypeName }; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  explicitConversion: LessonTextSection & { example: ConversionExampleContent; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  conversionFunctions: Array<{
    functionName: PythonConversionFunction;
    title: string;
    purpose: string;
    examples: ConversionExampleContent[];
    agritechExample?: string;
  }>;
  booleanPredictions: OutputPredictionContent;
  errorExplorer: {
    title: string;
    body: string;
    cases: Array<{ label: string; code: string; valid: boolean; result: string; explanation: string }>;
  };
  agritechProgram: CodeExampleContent;
  visualizerExamples: ConversionExampleContent[];
  playgroundActivities: string[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenge: DebugChallengeContent;
  engineerScenario: {
    title: string;
    scenario: string;
    question: string;
    options: EngineerScenarioOption[];
  };
  miniProject: AssignmentContent & { outputTemplate: string };
}

export type OperatorCategoryName = "arithmetic" | "comparison" | "logical" | "assignment" | "identity" | "membership" | "bitwise";

export interface OperatorRow {
  operator: string;
  meaning: string;
  example: string;
  output: string;
}

export interface ExpressionVisualizationContent {
  title: string;
  expression: string;
  steps: Array<{ expression: string; explanation: string; operator?: string }>;
  result: string;
}

export interface OperatorLessonDevelopmentPack {
  kind: "operators";
  prerequisite: string;
  story: LessonTextSection & { readings: Array<{ label: string; value: string }>; questions: string[]; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  definition: LessonTextSection & { example: CodeExampleContent; operands: string[]; operator: string; result: string };
  arithmetic: { title: string; body: string; rows: OperatorRow[]; agritechExample: CodeExampleContent };
  comparison: { title: string; body: string; rows: OperatorRow[]; example: CodeExampleContent; agritechExample: CodeExampleContent; prediction: OutputPredictionContent };
  logical: {
    title: string;
    body: string;
    rows: OperatorRow[];
    example: CodeExampleContent;
    truthTables: Array<{ operator: "and" | "or" | "not"; rows: Array<{ a: boolean; b?: boolean; result: boolean }> }>;
  };
  assignmentOperators: { title: string; body: string; rows: OperatorRow[]; example: CodeExampleContent };
  identity: { title: string; body: string; rows: OperatorRow[]; example: CodeExampleContent; note: string };
  membership: { title: string; body: string; rows: OperatorRow[]; example: CodeExampleContent; agritechExample: CodeExampleContent };
  bitwise: { title: string; body: string; rows: OperatorRow[]; example: CodeExampleContent; note: string };
  precedence: { title: string; body: string; levels: string[]; examples: ExpressionVisualizationContent[] };
  agritechProgram: CodeExampleContent;
  expressions: ExpressionVisualizationContent[];
  playgroundActivities: string[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenge: DebugChallengeContent;
  engineerScenario: {
    title: string;
    scenario: string;
    question: string;
    options: EngineerScenarioOption[];
  };
  miniProject: AssignmentContent & { outputTemplate: string };
}

export interface FormulaProblemContent {
  id: string;
  title: string;
  context: string;
  inputs: Array<{ name: string; label: string; value: number; unit?: string }>;
  formula: string;
  pythonExpression: string;
  code: string;
  outputLabel: string;
  outputUnit?: string;
  calculationSteps: string[];
}

export interface ProblemSolvingLessonDevelopmentPack {
  kind: "problem-solving";
  prerequisite: string;
  story: LessonTextSection & { request: string; insight: string; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  framework: {
    title: string;
    body: string;
    steps: Array<{ title: string; guidance: string; check: string }>;
  };
  expressionBuilding: LessonTextSection & {
    definition: string;
    examples: ExpressionVisualizationContent[];
    anatomy: Array<{ label: string; value: string }>;
  };
  workedExamples: FormulaProblemContent[];
  agritechProblems: FormulaProblemContent[];
  expressionBuilder: {
    title: string;
    body: string;
    variables: Array<{ label: string; value: string; defaultValue: number }>;
    operators: Array<{ label: string; value: string }>;
    numbers: number[];
  };
  simulatorFields: UserInputField[];
  guidedPractice: Array<{ title: string; formula: string; guidance: string }>;
  independentPractice: string[];
  challenges: Array<{ title: string; brief: string; inputs: string[]; output: string; hint: string }>;
  debugChallenges: DebugChallengeContent[];
  engineerScenario: {
    title: string;
    scenario: string;
    question: string;
    options: EngineerScenarioOption[];
  };
  miniProject: AssignmentContent & { outputTemplate: string };
}

export interface ProjectTestDataset {
  id: string;
  title: string;
  description: string;
  inputValues: Record<string, string>;
  expectedValues: Array<{ label: string; value: string }>;
  expectedOutputFragments: string[];
}

export interface ProjectWalkthroughRange {
  startLine: number;
  endLine: number;
  title: string;
  purpose: string;
  variables: string[];
  dataTypes: string[];
  expectedOutput: string;
}

export interface CapstoneProjectLessonDevelopmentPack {
  kind: "capstone-project";
  prerequisite: string;
  story: LessonTextSection & { request: string; insight: string; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  overview: {
    title: string;
    purpose: string;
    features: Array<{ title: string; description: string }>;
  };
  requirements: {
    title: string;
    body: string;
    inputs: Array<{ label: string; variable: string; type: PythonDataTypeName; unit?: string }>;
    processing: Array<{ label: string; formula: string; variable: string }>;
    outputs: string[];
  };
  algorithm: {
    title: string;
    body: string;
    steps: Array<{ title: string; description: string; phase: "start" | "input" | "process" | "output" | "end" }>;
  };
  buildSteps: Array<{ title: string; purpose: string; code: string; concepts: string[] }>;
  finalProgram: string;
  walkthrough: ProjectWalkthroughRange[];
  simulatorFields: UserInputField[];
  testDatasets: ProjectTestDataset[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  challenges: Array<{ title: string; brief: string; guidance: string; concept: string }>;
  engineerScenario: {
    title: string;
    scenario: string;
    question: string;
    options: EngineerScenarioOption[];
  };
  completion: {
    title: string;
    body: string;
    skills: string[];
    checkpoint: string;
  };
}

export type FlowchartSymbolType = "start-end" | "process" | "decision" | "input-output";

export interface FlowchartNodeContent {
  id: string;
  label: string;
  type: FlowchartSymbolType;
  branch?: "yes" | "no";
}

export interface DecisionMakingLessonDevelopmentPack {
  kind: "decision-making";
  prerequisite: string;
  story: LessonTextSection & {
    readings: Array<{ label: string; value: string }>;
    question: string;
    answer: string;
    workflow: { title: string; description: string; steps: WorkflowStep[] };
  };
  whyDecisions: {
    title: string;
    body: string;
    examples: Array<{ title: string; question: string; condition?: string; decisionRequired: boolean }>;
  };
  executionComparison: {
    title: string;
    body: string;
    sequential: WorkflowStep[];
    conditional: FlowchartNodeContent[];
  };
  conditions: {
    title: string;
    body: string;
    examples: Array<{ expression: string; explanation: string }>;
    variableDefaults: Array<{ name: string; label: string; value: number }>;
  };
  booleanReview: {
    title: string;
    body: string;
    expressions: Array<{ expression: string; result: boolean; explanation: string }>;
    workflow: { title: string; description: string; steps: WorkflowStep[] };
  };
  controlFlow: {
    title: string;
    body: string;
    sequential: WorkflowStep[];
    decisionTree: FlowchartNodeContent[];
  };
  flowcharts: {
    title: string;
    body: string;
    symbols: Array<{ type: FlowchartSymbolType; name: string; meaning: string }>;
    example: FlowchartNodeContent[];
    builderTarget: FlowchartNodeContent[];
  };
  agritechCase: {
    title: string;
    body: string;
    moisture: number;
    threshold: number;
    tree: FlowchartNodeContent[];
  };
  simulator: {
    title: string;
    body: string;
    defaults: { soilMoisture: number; temperature: number; rainfall: number };
    thresholds: { soilMoisture: number; temperature: number; rainfall: number };
  };
  realLifeScenarios: Array<{
    title: string;
    question: string;
    checks: string[];
    yesAction: string;
    noAction: string;
  }>;
  scenarioPractice: Array<{ scenario: string; requiresDecision: boolean; explanation: string }>;
  engineerScenario: {
    title: string;
    scenario: string;
    question: string;
    options: EngineerScenarioOption[];
  };
}

export interface IfStatementLessonDevelopmentPack {
  kind: "if-statement";
  prerequisite: string;
  story: LessonTextSection & {
    readings: Array<{ label: string; value: string }>;
    condition: string;
    workflow: { title: string; description: string; steps: WorkflowStep[] };
  };
  definition: LessonTextSection & { trueAction: string; falseAction: string };
  syntax: {
    title: string;
    body: string;
    template: string;
    parts: Array<{ token: string; label: string; description: string }>;
  };
  firstExample: CodeExampleContent & { variable: string; defaultValue: number; threshold: number };
  executionFlow: CodeExampleContent & { trueValue: number; falseValue: number };
  indentation: {
    title: string;
    body: string;
    correctCode: string;
    missingIndentation: string;
    extraIndentation: string;
    missingColon: string;
  };
  multipleStatements: CodeExampleContent;
  agritechExamples: Array<CodeExampleContent & { condition: string; result: boolean }>;
  simulatorFields: UserInputField[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: {
    title: string;
    scenario: string;
    question: string;
    options: EngineerScenarioOption[];
  };
  miniProject: AssignmentContent & { outputTemplate: string };
}

export interface IfElseLessonDevelopmentPack {
  kind: "if-else";
  prerequisite: string;
  story: LessonTextSection & {
    priorCode: string;
    missingValue: number;
    missingOutcome: string;
    workflow: { title: string; description: string; steps: WorkflowStep[] };
  };
  whyIfAlone: CodeExampleContent & { question: string; answer: string };
  definition: LessonTextSection & { trueAction: string; falseAction: string; guarantee: string };
  syntax: {
    title: string;
    body: string;
    template: string;
    parts: Array<{ token: string; label: string; description: string }>;
  };
  firstExample: CodeExampleContent & { variable: string; threshold: number; trueValue: number; falseValue: number; trueOutput: string; falseOutput: string };
  agritechExamples: Array<CodeExampleContent & { condition: string; trueAction: string; falseAction: string; defaultValue: number; threshold: number; operator: ">" | "<" }>;
  comparator: {
    title: string;
    body: string;
    condition: string;
    trueInput: number;
    falseInput: number;
    trueOutput: string;
    falseOutput: string;
  };
  simulatorFields: UserInputField[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: {
    title: string;
    scenario: string;
    question: string;
    options: EngineerScenarioOption[];
  };
  miniProject: AssignmentContent & { outputTemplate: string };
  comparison: {
    title: string;
    body: string;
    rows: Array<{ feature: string; ifOnly: string; ifElse: string }>;
  };
}

export interface ConditionalBranchContent {
  id: string;
  kind: "if" | "elif" | "else";
  condition?: string;
  action: string;
  label: string;
}

export interface IfElifElseLessonDevelopmentPack {
  kind: "if-elif-else";
  prerequisite: string;
  story: LessonTextSection & { priorCode: string; situations: string[]; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  whyTwoPaths: LessonTextSection & { cases: Array<{ value: number; action: string }> };
  definition: LessonTextSection & { rules: string[] };
  syntax: { title: string; body: string; template: string; parts: Array<{ token: string; label: string; description: string }> };
  firstExample: CodeExampleContent & { variable: string; branches: ConditionalBranchContent[]; defaultValue: number; min: number; max: number };
  agritechExamples: Array<CodeExampleContent & { variable: string; branches: ConditionalBranchContent[]; defaultValue: number; min: number; max: number; unit: string }>;
  treeBuilder: { title: string; body: string; variable: string; branches: ConditionalBranchContent[] };
  orderAnalyzer: { title: string; body: string; correctCode: string; incorrectCode: string };
  coverage: { title: string; body: string; variable: string; branches: ConditionalBranchContent[]; defaultInputs: string };
  simulatorFields: UserInputField[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { outputTemplate: string };
}

export interface NestedDecisionNodeContent {
  id: string;
  label: string;
  condition: string;
  trueLabel: string;
  falseLabel: string;
  description: string;
}

export interface NestedIfLessonDevelopmentPack {
  kind: "nested-if";
  prerequisite: string;
  story: LessonTextSection & { priorFlow: string[]; addedSignals: string[]; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  whyHierarchy: LessonTextSection & { cases: Array<{ soil: number; temperature: number; result: string }> };
  definition: LessonTextSection & { rules: string[]; analogy: WorkflowStep[] };
  syntax: { title: string; body: string; template: string; parts: Array<{ token: string; label: string; description: string }> };
  firstExample: CodeExampleContent & { defaultSoil: number; defaultTemperature: number };
  decisionTree: { title: string; body: string; nodes: NestedDecisionNodeContent[] };
  agritechExamples: CodeExampleContent[];
  withElse: CodeExampleContent;
  hierarchy: { title: string; body: string; levels: Array<{ title: string; condition: string; description: string }> };
  simulator: { title: string; body: string; defaultSoil: number; defaultTemperature: number; defaultRainfall: number };
  simulatorFields: UserInputField[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { outputTemplate: string };
  comparison: { title: string; body: string; rows: Array<{ feature: string; ifElse: string; ifElifElse: string; nestedIf: string }> };
  patternSelector: { title: string; body: string; scenarios: Array<{ prompt: string; answer: "if" | "if-else" | "if-elif-else" | "nested-if"; explanation: string }> };
}

export interface MatchCaseOptionContent {
  id: string;
  pattern: string;
  label: string;
  output: string;
}

export interface MatchCaseExampleContent extends CodeExampleContent {
  variable: string;
  defaultValue: string;
  options: MatchCaseOptionContent[];
}

export interface MatchCaseLessonDevelopmentPack {
  kind: "match-case";
  prerequisite: string;
  story: LessonTextSection & { operations: string[]; menu: string[]; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  whyMatch: LessonTextSection & { ifElifCode: string; scalingCases: string[] };
  definition: LessonTextSection & { rules: string[] };
  syntax: { title: string; body: string; template: string; parts: Array<{ token: string; label: string; description: string }> };
  firstExample: MatchCaseExampleContent;
  agritechExamples: MatchCaseExampleContent[];
  menuSimulator: { title: string; body: string; menus: Array<{ id: string; label: string; prompt: string; options: MatchCaseOptionContent[] }> };
  simulatorFields: UserInputField[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { outputTemplate: string };
  comparison: { title: string; body: string; rows: Array<{ situation: string; bestChoice: string; reason: string }> };
  structureAdvisor: { title: string; body: string; scenarios: Array<{ prompt: string; answer: "if" | "if-else" | "if-elif-else" | "nested-if" | "match-case"; explanation: string }> };
}

export interface RangeExampleContent extends CodeExampleContent {
  start: number;
  stop: number;
  step: number;
}

export interface ForLoopLessonDevelopmentPack {
  kind: "for-loop";
  prerequisite: string;
  story: LessonTextSection & { sensorCounts: Array<{ label: string; count: number }>; repeatedCode: string; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  whyLoops: LessonTextSection & { withoutLoop: string; withLoop: string; repeatedCount: number };
  definition: LessonTextSection & { flow: WorkflowStep[] };
  syntax: { title: string; body: string; template: string; parts: Array<{ token: string; label: string; description: string }> };
  rangeExamples: RangeExampleContent[];
  agritechExamples: CodeExampleContent[];
  stringExample: CodeExampleContent & { sequence: string[] };
  listExample: CodeExampleContent & { sequence: string[] };
  nestedPreview: CodeExampleContent;
  simulatorFields: UserInputField[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { outputTemplate: string };
  comparison: { title: string; body: string; rows: Array<{ situation: string; bestConstruct: string; reason: string }> };
}

export interface WhileLoopExampleContent extends CodeExampleContent {
  initialValue: number;
  targetValue: number;
  increment: number;
  variable: string;
}

export interface WhileLoopLessonDevelopmentPack {
  kind: "while-loop";
  prerequisite: string;
  story: LessonTextSection & { knownSequence: string[]; unknownDurations: string[]; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  whyWhile: LessonTextSection & { forCode: string; knownLabel: string; unknownLabel: string };
  definition: LessonTextSection & { flow: WorkflowStep[] };
  syntax: { title: string; body: string; template: string; parts: Array<{ token: string; label: string; description: string }> };
  firstExample: WhileLoopExampleContent;
  updateCycle: { title: string; body: string; code: string; steps: WorkflowStep[] };
  agritechExamples: WhileLoopExampleContent[];
  infiniteLoop: { title: string; body: string; dangerousCode: string; reason: string; cycle: WorkflowStep[] };
  simulatorFields: UserInputField[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { outputTemplate: string };
  forWhileComparison: { title: string; body: string; rows: Array<{ feature: string; forLoop: string; whileLoop: string }> };
  comparison: { title: string; body: string; rows: Array<{ situation: string; bestConstruct: string; reason: string }> };
}

export type LoopControlStatement = "break" | "continue" | "pass";

export interface LoopControlExampleContent extends CodeExampleContent {
  statement: LoopControlStatement;
  triggerValue: number;
  action: string;
  agritechCode: string;
  agritechExplanation: string;
}

export interface LoopControlLessonDevelopmentPack {
  kind: "loop-control";
  prerequisite: string;
  story: LessonTextSection & { incidents: string[]; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  whyControl: LessonTextSection & { normalFlow: string[]; faultFlow: string[]; emergencyFlow: string[] };
  controls: LoopControlExampleContent[];
  comparator: { title: string; body: string; rows: Array<{ statement: string; effect: string; loopContinues: string; currentIteration: string }> };
  simulator: { title: string; body: string; sensorCount: number; maintenanceSensor: number; criticalSensor: number };
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { outputTemplate: string };
  comparison: { title: string; body: string; rows: Array<{ situation: string; bestChoice: string; reason: string }> };
}

export interface CapstoneConsoleModule {
  id: string;
  option: string;
  title: string;
  concept: string;
  description: string;
  fields: UserInputField[];
  expectedOutput: string;
}

export interface CapstoneConsoleTest {
  id: string;
  title: string;
  moduleId: string;
  values: Record<string, string>;
  expectedOutput: string[];
}

export interface ControlFlowCapstoneDevelopmentPack {
  kind: "control-flow-capstone";
  prerequisite: string;
  story: LessonTextSection & { company: string; responsibilities: string[]; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  overview: { title: string; body: string; menu: string[]; features: Array<{ title: string; description: string }> };
  architecture: { title: string; body: string; steps: Array<{ title: string; description: string; phase: "start" | "input" | "process" | "output" | "end" }> };
  conceptMapping: { title: string; body: string; rows: Array<{ feature: string; concept: string; role: string }> };
  modules: CapstoneConsoleModule[];
  futureFeature: CodeExampleContent;
  buildSteps: Array<{ title: string; purpose: string; code: string; concepts: string[] }>;
  finalProgram: string;
  tests: CapstoneConsoleTest[];
  debugChallenges: DebugChallengeContent[];
  extensions: Array<{ level: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond"; title: string; brief: string; guidance: string }>;
  reflection: { title: string; body: string; prompts: string[] };
  checklist: { title: string; body: string; items: string[] };
}

export interface FunctionConceptModule {
  id: string;
  title: string;
  conceptualCall: string;
  description: string;
  process: string[];
  outcome: string;
}

export interface WhyFunctionsDevelopmentPack {
  kind: "why-functions";
  prerequisite: string;
  story: LessonTextSection & {
    locations: string[];
    repeatedCode: string[];
    quote: string;
    workflow: { title: string; description: string; steps: WorkflowStep[] };
  };
  duplication: LessonTextSection & {
    projectLines: number;
    occurrences: number;
    repeatedLocations: Array<{ title: string; lines: string[] }>;
    conceptualReplacement: string;
    risks: string[];
  };
  analogy: LessonTextSection & { trigger: string; hiddenWork: string[]; result: string };
  definition: LessonTextSection & { flow: WorkflowStep[] };
  benefits: Array<{ title: string; description: string }>;
  comparison: {
    title: string;
    body: string;
    without: string[];
    with: string[];
  };
  agritechConcept: LessonTextSection & { repeatedTask: string[]; conceptualCall: string };
  functionFlow: { title: string; body: string; steps: WorkflowStep[] };
  modules: FunctionConceptModule[];
  simulation: { title: string; body: string; modules: FunctionConceptModule[] };
  challenge: {
    title: string;
    body: string;
    tasks: Array<{ id: string; title: string; location: string; shouldBecomeFunction: boolean; explanation: string }>;
  };
}

export interface FunctionDefinitionLessonDevelopmentPack {
  kind: "function-definition";
  prerequisite: string;
  story: LessonTextSection & {
    repeatedCode: string;
    conceptualCall: string;
    consumers: string[];
    workflow: { title: string; description: string; steps: WorkflowStep[] };
  };
  definitionKeyword: LessonTextSection & { keyword: string; meaning: string; workflow: WorkflowStep[] };
  anatomy: {
    title: string;
    body: string;
    code: string;
    parts: Array<{ id: string; token: string; label: string; description: string }>;
  };
  defining: CodeExampleContent & { status: string };
  calling: CodeExampleContent & { call: string; flow: WorkflowStep[] };
  multipleCalls: CodeExampleContent & { callCount: number };
  agritechExample: CodeExampleContent & { consumers: string[] };
  functionLibrary: { title: string; body: string; functions: Array<{ id: string; name: string; output: string; description: string }> };
  execution: { title: string; body: string; code: string; steps: Array<{ lineNumber: number; frame: string; title: string; description: string; output?: string }> };
  comparison: { title: string; body: string; rows: Array<{ action: string; code: string; effect: string }> };
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { starterCode: string; functions: string[] };
}

export interface FunctionEvolutionStage {
  lesson: string;
  code: string;
  capability: string;
  active?: boolean;
}

export interface ParameterExampleContent extends CodeExampleContent {
  functionName: string;
  parameters: string[];
  calls: Array<{ arguments: string[]; output: string }>;
}

export interface FunctionParametersLessonDevelopmentPack {
  kind: "function-parameters";
  prerequisite: string;
  evolution: { title: string; body: string; stages: FunctionEvolutionStage[] };
  story: LessonTextSection & { fixedFunction: string; farms: Array<{ name: string; moisture: number }>; rejectedNames: string[]; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  hardcoded: CodeExampleContent & { problem: string; fixedValue: string; risks: string[] };
  definition: LessonTextSection & { analogy: { title: string; inputs: string[]; outcome: string }; containerLabel: string };
  firstParameter: ParameterExampleContent & { anatomy: Array<{ token: string; label: string; description: string }> };
  parameterFlow: { title: string; body: string; functionName: string; parameters: string[]; arguments: string[]; steps: WorkflowStep[] };
  agritechExamples: ParameterExampleContent[];
  mapper: { title: string; body: string; functionName: string; parameters: string[]; argumentSets: Array<{ label: string; arguments: string[] }> };
  simulator: { title: string; body: string; functionName: string; fields: Array<{ id: string; label: string; type: "number" | "text"; defaultValue: string }>; parameters: string[]; outputTemplate: string };
  explorer: { title: string; body: string; examples: Array<{ label: string; functionName: string; parameters: string[]; arguments: string[] }> };
  comparison: { title: string; body: string; rows: Array<{ feature: string; fixed: string; parameterized: string }> };
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { starterCode: string; challenge: string };
}

export interface ReturnValuesLessonDevelopmentPack {
  kind: "return-values";
  prerequisite: string;
  evolution: { title: string; body: string; stages: FunctionEvolutionStage[] };
  lifecycle: { title: string; body: string; activeStep: string; steps: WorkflowStep[] };
  story: LessonTextSection & { code: string; consumers: string[]; flow: WorkflowStep[] };
  printProblem: CodeExampleContent & { assignedVariable: string; assignedValue: string; explanation: string };
  definition: LessonTextSection & { analogy: { title: string; steps: WorkflowStep[] } };
  firstReturn: CodeExampleContent & { call: string; receivingVariable: string; returnedValue: string };
  returnFlow: { title: string; body: string; functionName: string; argument: string; receivingVariable: string; returnedValue: string; steps: WorkflowStep[] };
  comparator: { title: string; body: string; printCode: string; printConsole: string; printVariable: string; returnCode: string; returnConsole: string; returnVariable: string };
  propagation: { title: string; body: string; source: string; returnedValue: string; receivingVariable: string; consumers: Array<{ title: string; use: string }> };
  agritechExamples: CodeExampleContent[];
  returnTypes: Array<{ type: string; code: string; example: string }>;
  returnEnds: CodeExampleContent & { skippedLine: string; steps: WorkflowStep[] };
  comparison: { title: string; body: string; rows: Array<{ feature: string; print: string; returns: string }> };
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { starterCode: string; challenge: string };
}

export type ArgumentBindingSource = "positional" | "keyword" | "default";

export interface ArgumentBindingExample {
  label: string;
  call: string;
  bindings: Array<{ parameter: string; value: string; source: ArgumentBindingSource }>;
  output: string;
}

export interface FunctionArgumentsLessonDevelopmentPack {
  kind: "function-arguments";
  prerequisite: string;
  evolution: { title: string; body: string; stages: FunctionEvolutionStage[] };
  lifecycle: { title: string; body: string; activeStep: string; steps: WorkflowStep[] };
  story: LessonTextSection & { code: string; needs: string[] };
  review: LessonTextSection & { definition: string; call: string; parameters: string[]; arguments: string[] };
  positional: CodeExampleContent & { correct: ArgumentBindingExample; wrong: ArgumentBindingExample };
  keyword: CodeExampleContent & { examples: ArgumentBindingExample[] };
  defaults: CodeExampleContent & { omitted: ArgumentBindingExample; overridden: ArgumentBindingExample; decisionSteps: WorkflowStep[] };
  combined: CodeExampleContent & { binding: ArgumentBindingExample; rules: string[] };
  mapping: { title: string; body: string; examples: ArgumentBindingExample[] };
  builder: { title: string; body: string; functionName: string; parameters: Array<{ name: string; defaultValue?: string; initialValue: string; type: "text" | "number" }> };
  comparison: { title: string; body: string; rows: Array<{ feature: string; positional: string; keyword: string; defaults: string }> };
  agritechExamples: CodeExampleContent[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { starterCode: string; calls: string[]; challenge: string };
}

export interface ScopeVariableContent {
  name: string;
  value: string;
  scope: "global" | "local";
  owner: string;
  lifetime: string;
}

export interface VariableScopeLessonDevelopmentPack {
  kind: "variable-scope";
  prerequisite: string;
  evolution: { title: string; body: string; stages: FunctionEvolutionStage[] };
  lifecycle: { title: string; body: string; activeStep: string; steps: WorkflowStep[] };
  story: LessonTextSection & { globalVariable: ScopeVariableContent; localVariable: ScopeVariableContent };
  definition: LessonTextSection & { analogy: Array<{ title: string; access: string; scope: string }> };
  local: CodeExampleContent & { variable: ScopeVariableContent; outsideCode: string; outsideResult: string };
  global: CodeExampleContent & { variable: ScopeVariableContent; reader: string };
  shadowing: CodeExampleContent & { globalValue: string; localValue: string };
  lifetime: { title: string; body: string; globalSteps: WorkflowStep[]; localSteps: WorkflowStep[] };
  boundaries: { title: string; body: string; globalVariables: ScopeVariableContent[]; functions: Array<{ name: string; variables: ScopeVariableContent[] }> };
  explorer: { title: string; body: string; phases: Array<{ label: string; activeFrame: string; visible: string[]; destroyed: string[] }> };
  comparison: { title: string; body: string; rows: Array<{ feature: string; local: string; global: string }> };
  agritechExamples: CodeExampleContent[];
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { starterCode: string; challenge: string };
}

export interface LambdaExampleContent extends CodeExampleContent {
  parameters: string[];
  expression: string;
  arguments: string[];
  result: string;
}

export interface LambdaFunctionsLessonDevelopmentPack {
  kind: "lambda-functions";
  prerequisite: string;
  evolution: { title: string; body: string; stages: FunctionEvolutionStage[] };
  lifecycle: { title: string; body: string; activeStep: string; steps: WorkflowStep[] };
  story: LessonTextSection & { namedFunctions: string[]; oneTimeTask: string; workflow: { title: string; description: string; steps: WorkflowStep[] } };
  motivation: LessonTextSection & { regularCode: string; lambdaCode: string; traits: string[] };
  syntax: { title: string; body: string; template: string; parts: Array<{ token: string; label: string; description: string }> };
  comparisonExample: { title: string; body: string; regularCode: string; lambdaCode: string; call: string; result: string };
  execution: { title: string; body: string; examples: LambdaExampleContent[]; steps: WorkflowStep[] };
  agritechExamples: LambdaExampleContent[];
  builder: { title: string; body: string; presets: Array<{ label: string; parameters: string[]; expression: string; arguments: string[] }> };
  converter: { title: string; body: string; examples: Array<{ label: string; regularCode: string; lambdaCode: string; result: string }> };
  comparison: { title: string; body: string; rows: Array<{ feature: string; regular: string; lambda: string }> };
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { starterCode: string; challenge: string };
}

export interface RecursiveExampleContent extends CodeExampleContent {
  functionName: string;
  initialValue: number;
  baseValue: number;
  direction: "decrease" | "increase";
}

export interface RecursionLessonDevelopmentPack {
  kind: "recursion";
  prerequisite: string;
  evolution: { title: string; body: string; stages: FunctionEvolutionStage[] };
  lifecycle: { title: string; body: string; activeStep: string; steps: WorkflowStep[] };
  story: LessonTextSection & { hierarchy: Array<{ id: string; label: string; parentId?: string }>; insight: string };
  definition: LessonTextSection & { analogy: string[]; rule: string };
  decomposition: { title: string; body: string; problem: string; levels: Array<{ call: string; remaining: string }> };
  baseCase: { title: string; body: string; safeCode: string; unsafeCode: string; warning: string };
  recursiveCase: { title: string; body: string; currentProblem: string; smallerProblem: string; movementRule: string };
  countdown: RecursiveExampleContent;
  stack: { title: string; body: string; functionName: string; initialValue: number; baseValue: number };
  agritechExamples: RecursiveExampleContent[];
  factorial: CodeExampleContent & { input: number; expansion: string[]; result: number };
  comparison: { title: string; body: string; rows: Array<{ feature: string; loop: string; recursion: string }> };
  detector: { title: string; body: string; examples: Array<{ label: string; code: string; hasBaseCase: boolean; movesTowardBase: boolean; explanation: string }> };
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { starterCode: string; challenge: string };
}

export interface FunctionDesignLessonDevelopmentPack {
  kind: "function-design";
  prerequisite: string;
  evolution: { title: string; body: string; stages: FunctionEvolutionStage[] };
  lifecycle: { title: string; body: string; activeStep: string; steps: WorkflowStep[] };
  story: LessonTextSection & { badCode: string; questions: string[]; workflow: WorkflowStep[] };
  quality: LessonTextSection & { stages: WorkflowStep[]; benefits: string[] };
  naming: { title: string; body: string; examples: Array<{ name: string; score: number; explanation: string }> };
  srp: { title: string; body: string; beforeCode: string; responsibilities: Array<{ name: string; purpose: string }>; afterCode: string };
  size: LessonTextSection & { largeLines: number; targetFunctions: number; targetLines: number; benefits: string[] };
  parameters: { title: string; body: string; badCode: string; goodCode: string; hiddenLabel: string; explicitLabel: string };
  returns: { title: string; body: string; badCode: string; goodCode: string; consumers: string[] };
  documentation: { title: string; body: string; badCode: string; goodCode: string; rules: string[] };
  checklist: { title: string; body: string; items: string[] };
  refactoring: { title: string; body: string; stages: Array<{ label: string; code: string; improvements: string[] }> };
  agritechExamples: Array<{ title: string; before: string; after: string; explanation: string }>;
  comparison: { title: string; body: string; rows: Array<{ poor: string; professional: string; reason: string }> };
  mistakesTitle: string;
  mistakes: SyntaxMistakeContent[];
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; scenario: string; question: string; options: EngineerScenarioOption[] };
  miniProject: AssignmentContent & { starterCode: string; challenge: string };
}

export interface FunctionCapstoneDevelopmentPack {
  kind: "function-capstone";
  prerequisite: string;
  evolution: { title: string; body: string; stages: FunctionEvolutionStage[] };
  story: LessonTextSection & { responsibilities: string[] };
  architecture: { title: string; body: string; nodes: Array<{ id: string; label: string; purpose: string; phase: number }>; edges: Array<{ from: string; to: string }> };
  planning: { title: string; body: string; functions: Array<{ name: string; responsibility: string; inputs: string; output: string }> };
  phases: Array<{ id: string; title: string; concept: string; lesson: string; body: string; code: string; milestone: string }>;
  dependencies: { title: string; body: string; root: string; functions: Array<{ name: string; role: string; calls: string[] }> };
  projectFiles: Array<{ name: string; purpose: string; code: string }>;
  refactoring: { title: string; body: string; beforeCode: string; afterCode: string; suggestions: string[] };
  progress: { title: string; body: string; milestones: Array<{ id: string; label: string; requirement: string }> };
  debugChallenges: DebugChallengeContent[];
  reflection: { title: string; body: string; prompts: string[] };
  rubric: { title: string; body: string; rows: Array<{ criterion: string; marks: number; evidence: string }> };
  finalChallenge: AssignmentContent & { examples: string[]; constraint: string };
}

export interface WhyCollectionsDevelopmentPack {
  kind: "why-collections";
  prerequisite: string;
  story: LessonTextSection & { scales: string[]; sensorTypes: string[] };
  individualVariables: LessonTextSection & { code: string; question: string };
  updateProblem: LessonTextSection & { code: string; impact: string[] };
  maximumProblem: LessonTextSection & { code: string; question: string };
  repeatedPatterns: LessonTextSection & { variables: string[]; insight: string };
  analogy: LessonTextSection & { before: string[]; after: string[] };
  collectionPreview: LessonTextSection & { lessons: Array<{ number: string; title: string }> };
  agritechMotivation: LessonTextSection & { readings: Array<{ label: string; value: number }> };
  simulator: { title: string; body: string; presets: number[]; baseValues: number[] };
  growth: { title: string; body: string; effort: Array<{ maximum: number; label: string }> };
  comparator: { title: string; body: string; scatteredLabel: string; groupedLabel: string };
  scale: { title: string; body: string; minimum: number; maximum: number };
  engineerScenario: { title: string; body: string; examples: string[]; question: string };
}

export interface PythonListsDevelopmentPack {
  kind: "python-lists";
  prerequisite: string;
  story: LessonTextSection & { before: string; after: string };
  definition: LessonTextSection & { characteristics: Array<{ label: string; explanation: string }> };
  creation: LessonTextSection & { examples: Array<{ label: string; code: string; note: string }> };
  anatomy: LessonTextSection & { listName: string; values: Array<string | number | boolean> };
  indexing: LessonTextSection & { examples: Array<{ code: string; result: string; index: number }> };
  mutability: LessonTextSection & { before: number[]; index: number; replacement: number };
  comparison: { title: string; body: string; rows: Array<{ variables: string; list: string }> };
  builtIns: LessonTextSection & { functions: Array<{ name: "len" | "max" | "min"; purpose: string }>; previewBuiltIns: string[]; previewMethods: string[] };
  agritech: LessonTextSection & { variableName: string; values: number[] };
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; body: string; question: string };
}

export interface WorkingWithListsDevelopmentPack {
  kind: "working-with-lists";
  prerequisite: string;
  story: LessonTextSection & { events: string[]; code: string };
  revision: LessonTextSection & { values: number[] };
  negativeIndexing: LessonTextSection & { examples: Array<{ code: string; index: number; result: number }> };
  slicing: LessonTextSection & { syntax: string; examples: Array<{ code: string; start: number | null; stop: number | null; step: number | null; result: number[] }> };
  updating: LessonTextSection & { code: string; index: number; value: number };
  methods: Array<{ name: "append" | "insert" | "extend" | "remove" | "pop" | "clear" | "sort" | "reverse" | "copy" | "count" | "index"; category: "Add" | "Remove" | "Query" | "Reorder" | "Copy"; purpose: string; example: string }>;
  traversal: LessonTextSection & { code: string; values: number[] };
  builtIns: Array<{ name: "len" | "max" | "min" | "sum" | "sorted" | "reversed" | "any" | "all"; purpose: string; example: string }>;
  comparison: { title: string; body: string; rows: Array<{ builtIn: string; method: string; distinction: string }> };
  agritech: LessonTextSection & { code: string; values: number[] };
  debugChallenges: DebugChallengeContent[];
  miniChallenge: AssignmentContent & { starterCode: string };
  engineerScenario: { title: string; body: string; operations: string[]; question: string };
}

export interface TupleDevelopmentPack {
  kind: "tuples";
  prerequisite: string;
  story: LessonTextSection & {
    problem: { title: string; body: string; examples: string[] };
    locked: { title: string; body: string; items: string[] };
  };
  whyTuples: LessonTextSection & { bullets: string[] };
  creation: LessonTextSection & { examples: Array<{ label: string; code: string; note: string }> };
  anatomy: LessonTextSection & { tupleName: string; values: Array<string | number | boolean> };
  indexing: LessonTextSection & { examples: Array<{ code: string; index: number | string; result: string | number | boolean }>; slicing?: string };
  immutability: {
    title: string;
    body: string;
    example: {
      code: string;
      result: string;
    };
    message: string;
  };
  packing: { title: string; code: string; body: string };
  unpacking: { title: string; code: string; mapping: Array<{ variable: string; variableValue: string | number | boolean }>; body: string };
  builtIns: {
    title: string;
    body: string;
    examples: Array<{ name: "len" | "max" | "min" | "sum" | "sorted" | "any" | "all"; purpose: string; code: string; output: string }>;
  };
  methods: {
    title: string;
    body: string;
    rows: Array<{ method: "count" | "index"; purpose: string; example: string; output: string }>;
  };
  comparison: {
    title: string;
    body: string;
    rows: Array<{ feature: string; list: string; tuple: string }>;
  };
  agritech: LessonTextSection & { immutableValues: Array<string | number | boolean>; mutableValues: Array<string | number | boolean>; question: string };
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; body: string; question: string };
}

export interface SetsDevelopmentPack {
  kind: "sets";
  prerequisite: string;
  story: LessonTextSection & {
    problem: { title: string; body: string; examples: string[] };
    whyListsNotEnough: LessonTextSection & { body: string; examples: string[] };
  };
  whatIsSet: LessonTextSection & { characteristics: string[] };
  creation: LessonTextSection & {
    examples: Array<{ label: string; code: string; note: string }>;
    emptyCreation: { title: string; body: string; correct: string; incorrect: string; reason: string };
  };
  characteristics: {
    title: string;
    body: string;
    items: Array<{ name: string; description: string; check: boolean }>;
  };
  adding: LessonTextSection & { code: string; duplicateCode: string };
  removing: LessonTextSection & {
    removeCode: string;
    discardCode: string;
    clearCode: string;
    rows: Array<{ method: string; behavior: string }>;
  };
  operations: {
    title: string;
    body: string;
    farmAValues: number[];
    farmBValues: number[];
    rows: Array<{ operation: string; code: string; result: string; description: string }>;
  };
  builtIns: {
    title: string;
    body: string;
    examples: Array<{ name: "len" | "min" | "max" | "sum" | "sorted" | "any" | "all"; purpose: string; code: string; output: string }>;
  };
  methods: {
    title: string;
    body: string;
    rows: Array<{ method: string; purpose: string; example: string; output: string }>;
  };
  comparison: {
    title: string;
    body: string;
    rows: Array<{ feature: string; list: string; tuple: string; set: string }>;
  };
  agritech: LessonTextSection & {
    sensorIds: number[];
    newSensorIds: number[];
    unionResult: number[];
    explanation: string;
  };
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; body: string; question: string };
}

export interface DictionaryDevelopmentPack {
  kind: "dictionary";
  prerequisite: string;
  story: LessonTextSection & {
    problem: { title: string; body: string; listSnippet: string; listAccessSnippet: string };
  };
  whatIsDict: LessonTextSection & { characteristics: string[] };
  creation: LessonTextSection & {
    examples: Array<{ label: string; code: string; note: string }>;
  };
  accessing: LessonTextSection & {
    rows: Array<{ method: string; example: string; result: string; behavior: string }>;
  };
  updating: LessonTextSection & { code: string; output: string };
  adding: LessonTextSection & { code: string; output: string };
  removing: LessonTextSection & {
    rows: Array<{ method: string; code: string; behavior: string }>;
  };
  builtIns: {
    title: string;
    body: string;
    rows: Array<{ function: string; purpose: string; example: string; output: string }>;
  };
  methods: {
    title: string;
    body: string;
    rows: Array<{ method: string; purpose: string; example: string; output: string }>;
  };
  iteration: {
    title: string;
    body: string;
    examples: Array<{ label: string; code: string; output: string }>;
  };
  comparison: {
    title: string;
    body: string;
    rows: Array<{ collection: string; usage: string; mapping: string }>;
  };
  agritech: LessonTextSection & {
    code: string;
    output: string;
  };
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; body: string; question: string };
}

export interface CollectionOperationsDevelopmentPack {
  kind: "collection-operations";
  prerequisite: string;
  story: LessonTextSection & {
    problem: {
      title: string;
      body: string;
    };
  };
  builtIns: {
    title: string;
    body: string;
    items: Array<{
      func: string;
      description: string;
      supported: string[];
      example: string;
      dictNote?: string;
    }>;
  };
  builtInComparison: {
    title: string;
    body: string;
    rows: Array<{
      function: string;
      list: string;
      tuple: string;
      set: string;
      dict: string;
      notes: string;
    }>;
  };
  methodsSummary: {
    title: string;
    body: string;
    collections: Array<{
      name: string;
      type: string;
      methods: Array<{ name: string; signature: string; desc: string }>;
    }>;
  };
  operationsMatrix: {
    title: string;
    body: string;
    rows: Array<{
      operation: string;
      list: string;
      tuple: string;
      set: string;
      dict: string;
    }>;
  };
  agritech: LessonTextSection & {
    code: string;
    output: string;
  };
  debugChallenges: DebugChallengeContent[];
  engineerScenario: { title: string; body: string; question: string };
}

export interface SolvedQuestionItem {
  id: string;
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  problem: string;
  agritechScenario: string;
  hint: string;
  solution: string;
  dryRun: string;
  output: string;
  explanation: string;
  commonMistake: string;
  challengeExtension: string;
}

export interface ListTuplePracticeDevelopmentPack {
  kind: "list-tuple-practice";
  prerequisite: string;
  introduction: LessonTextSection;
  questions: SolvedQuestionItem[];
  commonMistakesSummary: string[];
  capstoneChallenge: {
    title: string;
    brief: string;
    requirements: string[];
    starterCode: string;
    expectedOutcome: string;
  };
}

export interface SetDictPracticeDevelopmentPack {
  kind: "set-dict-practice";
  prerequisite: string;
  introduction: LessonTextSection;
  questions: SolvedQuestionItem[];
  commonMistakesSummary: string[];
  capstoneChallenge: {
    title: string;
    brief: string;
    requirements: string[];
    starterCode: string;
    expectedOutcome: string;
  };
}

export interface AssignmentContent {
  title: string;
  brief: string;
  deliverables: string[];
}

// ─── Module 5 · OOP ──────────────────────────────────────────────────────────

export interface OopScalingStep {
  label: string;
  count: number;
  unit: string;
  highlight?: boolean;
}

export interface OopClassAttributeDef {
  name: string;
  type: string;
  isPrivate?: boolean;
}

export interface OopClassMethodDef {
  name: string;
  params: string;
  returnType: string;
}

export interface OopMemoryObject {
  instanceName: string;
  className: string;
  address: string;
  attributes: Array<{ key: string; value: string }>;
}

export interface OopWhyOopDevelopmentPack {
  kind: "oop-lesson-5-1";
  prerequisite: string;
  storyHook: string;
  growingProblem: {
    title: string;
    body: string;
    scalingSteps: OopScalingStep[];
    scalingQuestion: string;
    proceduralCode: string;
    painPoints: string[];
  };
  whyOop: {
    title: string;
    body: string;
    dataItems: string[];
    behaviourItems: string[];
    unificationNote: string;
  };
  realWorldAnalogy: {
    title: string;
    body: string;
    blueprintSide: string[];
    instanceSide: string[];
  };
  classConcept: {
    title: string;
    definition: string;
    agritechContext: string;
    attributes: OopClassAttributeDef[];
    methods: OopClassMethodDef[];
    code: string;
  };
  objectConcept: {
    title: string;
    definition: string;
    instances: Array<{ name: string; represents: string }>;
    code: string;
    output: string;
  };
  multipleObjects: {
    title: string;
    body: string;
    code: string;
    independenceNote: string;
  };
  agritechExample: {
    title: string;
    body: string;
    code: string;
    discussion: string;
  };
  memoryObjects: OopMemoryObject[];
  debugChallenges: DebugChallengeContent[];
  engineerThinkingPrompt: string;
  objectEvolutionState: {
    lessonNumber: string;
    title: string;
    code: string;
    note: string;
  };
}

export interface OopConstructorStep {
  stepNumber: number;
  label: string;
  lineHighlight: string;
  explanation: string;
  selfState: Record<string, string>;
}

export interface OopConstructorsDevelopmentPack {
  kind: "oop-lesson-5-2";
  prerequisite: string;
  storyHook: string;
  problemSection: {
    title: string;
    body: string;
    emptyObjectCode: string;
    painPoint: string;
  };
  whyConstructors: {
    title: string;
    body: string;
    analogyTitle: string;
    analogyBody: string;
  };
  initConcept: {
    title: string;
    definition: string;
    syntax: string;
    rules: string[];
    firstConstructorCode: string;
    firstConstructorOutput: string;
  };
  selfConcept: {
    title: string;
    definition: string;
    classroomAnalogy: {
      teacherPrompt: string;
      studentAction: string;
      lesson: string;
    };
    rules: string[];
  };
  instanceVariables: {
    title: string;
    body: string;
    code: string;
    output: string;
    explanation: string;
  };
  constructorFlowSteps: OopConstructorStep[];
  memoryVisualization: {
    title: string;
    body: string;
    objects: OopMemoryObject[];
  };
  agritechExample: {
    title: string;
    body: string;
    code: string;
    discussion: string;
  };
  debugChallenges: DebugChallengeContent[];
  engineerThinkingPrompt: string;
  objectEvolutionState: {
    lessonNumber: string;
    title: string;
    code: string;
    note: string;
  };
}

export interface OopMethodsAndClassVarsDevelopmentPack {
  kind: "oop-lesson-5-3";
  prerequisite: string;
  storyHook: string;
  whyObjectsNeedBehaviour: {
    title: string;
    body: string;
    proceduralVsOop: {
      procedural: string;
      oop: string;
    };
  };
  instanceMethods: {
    title: string;
    definition: string;
    syntax: string;
    code: string;
    output: string;
    explanation: string;
  };
  classVariables: {
    title: string;
    definition: string;
    problemTitle: string;
    problemBody: string;
    code: string;
    output: string;
  };
  comparisonTable: Array<{
    feature: string;
    instanceVar: string;
    classVar: string;
  }>;
  classMethods: {
    title: string;
    definition: string;
    decorator: string;
    clsExplanation: string;
    code: string;
    output: string;
  };
  completeExample: {
    title: string;
    body: string;
    code: string;
    output: string;
  };
  agritechExample: {
    title: string;
    body: string;
    code: string;
    discussion: string;
  };
  debugChallenges: DebugChallengeContent[];
  engineerThinkingPrompt: string;
  objectEvolutionState: {
    lessonNumber: string;
    title: string;
    code: string;
    note: string;
  };
}

export interface OopEncapsulationDevelopmentPack {
  kind: "oop-lesson-5-4";
  prerequisite: string;
  storyHook: string;
  securityProblem: {
    title: string;
    body: string;
    corruptCode: string;
    consequences: string[];
  };
  whatIsEncapsulation: {
    title: string;
    definition: string;
    phoneAnalogy: {
      title: string;
      body: string;
    };
  };
  accessModifiers: {
    public: { title: string; syntax: string; description: string; code: string };
    protected: { title: string; syntax: string; description: string; code: string };
    private: { title: string; syntax: string; description: string; code: string };
  };
  pythonPhilosophyNote: {
    title: string;
    body: string;
    quote: string;
  };
  gettersAndSetters: {
    title: string;
    getterDefinition: string;
    setterDefinition: string;
    validationCode: string;
    validationOutput: string;
  };
  comparisonTable: Array<{
    feature: string;
    publicCol: string;
    protectedCol: string;
    privateCol: string;
  }>;
  completeExample: {
    title: string;
    body: string;
    code: string;
    output: string;
  };
  agritechExample: {
    title: string;
    body: string;
    code: string;
    discussion: string;
  };
  debugChallenges: DebugChallengeContent[];
  engineerThinkingPrompt: string;
  objectEvolutionState: {
    lessonNumber: string;
    title: string;
    code: string;
    note: string;
  };
}

export interface OopInheritanceDevelopmentPack {
  kind: "oop-lesson-5-5";
  prerequisite: string;
  storyHook: string;
  duplicationProblem: {
    title: string;
    body: string;
    duplicatedCode: string;
    painPoints: string[];
  };
  codeSavingsCounter: {
    withoutInheritanceLines: number;
    withInheritanceLines: number;
    savedPercentage: number;
    explanation: string;
  };
  parentClass: {
    title: string;
    definition: string;
    code: string;
  };
  childClass: {
    title: string;
    definition: string;
    syntax: string;
    code: string;
    output: string;
  };
  superFunction: {
    title: string;
    definition: string;
    code: string;
    explanation: string;
  };
  methodOverriding: {
    title: string;
    definition: string;
    parentCode: string;
    childCode: string;
    output: string;
  };
  typesOfInheritance: Array<{
    name: string;
    structure: string;
    description: string;
    agritechExample: string;
  }>;
  completeExample: {
    title: string;
    body: string;
    code: string;
    output: string;
  };
  agritechExample: {
    title: string;
    body: string;
    code: string;
    discussion: string;
  };
  debugChallenges: DebugChallengeContent[];
  engineerThinkingPrompt: string;
  objectEvolutionState: {
    lessonNumber: string;
    title: string;
    code: string;
    note: string;
  };
}

export interface OopPolymorphismDevelopmentPack {
  kind: "oop-lesson-5-6";
  prerequisite: string;
  storyHook: string;
  smartFarmProblem: LessonTextSection & { readings: Array<{ className: string; output: string }> };
  meaning: LessonTextSection & { wordParts: Array<{ part: string; meaning: string }> };
  analogy: LessonTextSection & { devices: Array<{ name: string; response: string }> };
  inheritanceExample: { title: string; body: string; code: string; output: string };
  sameInterface: LessonTextSection & { specificCalls: string[]; commonCalls: string[] };
  loopExample: { title: string; body: string; code: string; output: string };
  dispatches: Array<{ className: string; method: string; output: string; inherits: boolean }>;
  duckTyping: { title: string; body: string; code: string; output: string; rules: string[] };
  comparison: Array<{ feature: string; inheritance: string; duckTyping: string }>;
  industryConnections: Array<{ title: string; interfaceName: string; examples: string[] }>;
  debugChallenges: DebugChallengeContent[];
  engineerThinkingPrompt: string;
}

// ─────────────────────────────────────────────────────────────────────────────

export interface LessonDocument {
  id: string;
  moduleId: string;
  number: string;
  title: string;
  summary: string;
  durationMinutes: number;
  level: "Beginner" | "Beginner+" | "Beginner to Intermediate" | "Orientation" | "Foundation" | "Intermediate" | "Applied";
  introduction: LessonTextSection;
  objectives: string[];
  whyThisMatters: LessonTextSection;
  industryMotivation: LessonTextSection & { signal: string };
  concept: LessonTextSection;
  workflow: { title: string; description: string; steps: WorkflowStep[] };
  agritechExample: LessonTextSection;
  playground: PlaygroundContent;
  practice: PracticeTask[];
  quiz: QuizPlaceholderContent | QuizPlaceholderContent[];
  assignment: AssignmentContent;
  summarySection: LessonTextSection;
  keyTakeaways: string[];
  whatsNext: LessonTextSection;
  developmentPack?: WelcomeLessonDevelopmentPack | WhyPythonDevelopmentPack | FirstProgramDevelopmentPack | VariableLessonDevelopmentPack | DataTypeLessonDevelopmentPack | UserInputLessonDevelopmentPack | TypeConversionLessonDevelopmentPack | OperatorLessonDevelopmentPack | ProblemSolvingLessonDevelopmentPack | CapstoneProjectLessonDevelopmentPack | DecisionMakingLessonDevelopmentPack | IfStatementLessonDevelopmentPack | IfElseLessonDevelopmentPack | IfElifElseLessonDevelopmentPack | NestedIfLessonDevelopmentPack | MatchCaseLessonDevelopmentPack | ForLoopLessonDevelopmentPack | WhileLoopLessonDevelopmentPack | LoopControlLessonDevelopmentPack | ControlFlowCapstoneDevelopmentPack | WhyFunctionsDevelopmentPack | FunctionDefinitionLessonDevelopmentPack | FunctionParametersLessonDevelopmentPack | ReturnValuesLessonDevelopmentPack | FunctionArgumentsLessonDevelopmentPack | VariableScopeLessonDevelopmentPack | LambdaFunctionsLessonDevelopmentPack | RecursionLessonDevelopmentPack | FunctionDesignLessonDevelopmentPack | FunctionCapstoneDevelopmentPack | WhyCollectionsDevelopmentPack | PythonListsDevelopmentPack | WorkingWithListsDevelopmentPack | TupleDevelopmentPack | SetsDevelopmentPack | DictionaryDevelopmentPack | CollectionOperationsDevelopmentPack | ListTuplePracticeDevelopmentPack | SetDictPracticeDevelopmentPack | OopWhyOopDevelopmentPack | OopConstructorsDevelopmentPack | OopMethodsAndClassVarsDevelopmentPack | OopEncapsulationDevelopmentPack | OopInheritanceDevelopmentPack | OopPolymorphismDevelopmentPack;
}

export interface PlaceholderPageContent {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  metric: string;
  metricLabel: string;
  cards: Array<{ title: string; description: string; icon: string }>;
}

export interface AssignmentQuestion {
  id: string;
  number: number;
  prompt: string;
  requirements?: string[];
  example?: string;
}

export interface AssignmentSection {
  id: string;
  title: string;
  description: string;
  difficulty: "Warm-up" | "Beginner" | "Intermediate" | "Applied" | "Challenge";
  questions: AssignmentQuestion[];
}

export interface AssignmentTopic {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  concepts: string[];
  sections: AssignmentSection[];
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: ReactNode;
}
