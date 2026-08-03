import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const execFileAsync = promisify(execFile);

test("production shell carries DI Notes metadata and sharing asset", async () => {
  const [html, ogImage] = await Promise.all([
    readFile(new URL("dist/index.html", projectRoot), "utf8"),
    readFile(new URL("dist/og.png", projectRoot)),
  ]);

  assert.match(html, /<title>DI Notes — Python Programming for Agritech<\/title>/i);
  assert.match(html, /property="og:image" content="\/og\.png"/i);
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
  assert.ok(ogImage.byteLength > 100_000, "social card should be a real production asset");
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|vinext/i);
});

test("route registry covers every primary learning area", async () => {
  const source = await readFile(new URL("src/App.tsx", projectRoot), "utf8");
  const requiredPaths = [
    "/course",
    "/modules",
    "/lessons",
    "/practice",
    "/quizzes",
    "/assignments",
    "/mini-projects",
    "/resources",
    "/about",
  ];

  for (const path of requiredPaths) assert.match(source, new RegExp(path.replace("/", "\\/")));
  assert.match(source, /return content \? <PlaceholderPage content=\{content\} \/> : <NotFoundPage \/>/);
});

test("assignment hub publishes two topic-wise 30-question practice banks", async () => {
  const [appSource, shellSource, pageSource, contentSource, stylesSource] = await Promise.all([
    readFile(new URL("src/App.tsx", projectRoot), "utf8"),
    readFile(new URL("components/navigation/AppShell.tsx", projectRoot), "utf8"),
    readFile(new URL("components/pages/AssignmentsPage.tsx", projectRoot), "utf8"),
    readFile(new URL("content/assignments.ts", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);

  assert.match(appSource, /pathname === "\/assignments"/);
  assert.match(shellSource, /label: "Assignments", href: "\/assignments"/);
  assert.match(pageSource, /<Accordion/);
  assert.match(pageSource, /<Search/);
  assert.match(pageSource, /<ProgressBar/);
  assert.match(pageSource, /<Checkbox/);
  assert.match(contentSource, /Python If–Else Practice Assignment/);
  assert.match(contentSource, /If–Else, Loops & Loop Control Practice/);
  assert.equal((contentSource.match(/\{ prompt:/g) ?? []).length, 60);
  assert.match(stylesSource, /Topic-wise assignment hub/);
  assert.match(stylesSource, /@media \(max-width: 30rem\).*\.assignments-page/s);
});

test("course framework defines all modules and reusable progress rules", async () => {
  const [courseSource, navigationSource, shellSource] = await Promise.all([
    readFile(new URL("content/course-framework.ts", projectRoot), "utf8"),
    readFile(new URL("components/course/CourseNavigation.tsx", projectRoot), "utf8"),
    readFile(new URL("components/navigation/AppShell.tsx", projectRoot), "utf8"),
  ]);
  const moduleTitles = [
    "Python, Agritech & The Data Science Journey",
    "Python Fundamentals",
    "Decision Making & Control Flow",
    "Functions",
    "Python Collections",
    "Object-Oriented Programming",
    "Scientific Computing with NumPy",
    "Data Analysis with Pandas",
    "Data Visualization with Matplotlib",
    "Agritech Data Science Project",
  ];

  for (const title of moduleTitles) assert.match(courseSource, new RegExp(title.replace(/[&]/g, "&")));
  assert.match(courseSource, /export function getCourseProgress/);
  assert.match(courseSource, /Math\.round\(\(completedLessons \/ lessons\.length\) \* 100\)/);
  assert.match(navigationSource, /<Accordion/);
  assert.match(navigationSource, /aria-current=\{lesson\.id === currentLessonId \? "page"/);
  assert.match(shellSource, /\(!isCourseFrameworkRoute \|\| navigationOpen\)/);
  assert.match(shellSource, /app-content app-content--course/);
  assert.match(shellSource, /A product by/);
  assert.match(shellSource, /https:\/\/www\.nayaklabs\.xyz/);
});

test("Module 3 begins with a conceptual, data-driven functions lesson", async () => {
  const [moduleSource, packSource, registrySource, rendererRegistrySource, rendererSource, blocksSource, frameworkSource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-3-1.ts", projectRoot), "utf8"),
    readFile(new URL("content/lessons.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/WhyFunctionsLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/WhyFunctionsLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("content/course-framework.ts", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);

  assert.match(packSource, /kind: "why-functions"/);
  assert.match(packSource, /checkIrrigation\(\)/);
  assert.doesNotMatch(packSource, /\bdef\s+\w+\s*\(/);
  assert.equal((moduleSource.match(/id:\s*"module-3-lesson-/g) ?? []).length, 20, "ten published lessons plus ten navigation summaries should exist");
  assert.match(moduleSource, /3\.10 Capstone · Smart Farm Automation System/);
  assert.match(registrySource, /\.\.\.moduleThreeLessons/);
  assert.match(rendererRegistrySource, /lesson\.developmentPack\?\.kind === "why-functions"/);
  assert.match(rendererSource, /<CodeDuplicationDetector/);
  assert.match(rendererSource, /<FunctionFlowVisualizer/);
  assert.match(rendererSource, /<ModularDesignExplorer/);
  assert.match(rendererSource, /<ConceptualFunctionPlayground/);
  assert.match(blocksSource, /export function FunctionCallAnimation/);
  assert.match(blocksSource, /aria-current=\{index === activePhase \? "step"/);
  assert.match(blocksSource, /aria-live="polite"/);
  assert.doesNotMatch(rendererSource, /<CodePlayground/);
  assert.match(frameworkSource, /moduleIndex === 3\s*\? moduleThreeLessonSummaries/);
  assert.match(stylesSource, /Module 3 · Lesson 3\.1 development pack/);
  assert.match(stylesSource, /@media \(max-width:30rem\).*\.function-story-locations/s);
});

test("Lesson 3.2 publishes function creation tools and a persistent call-stack preview", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, registrySource, runnerSource, workerSource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-3-2.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/FunctionDefinitionLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/FunctionDefinitionLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/usePythonRunner.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);

  assert.match(moduleSource, /title: "Creating Functions with def"/);
  assert.match(moduleSource, /isPlaceholder: false/);
  assert.match(packSource, /kind: "function-definition"/);
  assert.match(packSource, /Repeated code/);
  assert.match(packSource, /check_farm_status\(\)/);
  assert.match(rendererSource, /<FunctionAnatomyExplorer/);
  assert.match(rendererSource, /<FunctionExecutionVisualizer/);
  assert.match(rendererSource, /<FunctionLibraryPanel/);
  assert.match(rendererSource, /<DefinitionCallComparator/);
  assert.match(rendererSource, /traceExecution/);
  assert.match(rendererSource, /Function parameters begin in Lesson 3\.3/);
  assert.match(blocksSource, /export function CallStackPreview/);
  assert.match(blocksSource, /export function FunctionPlaygroundSupplement/);
  assert.match(blocksSource, /aria-live="polite"/);
  assert.match(registrySource, /developmentPack\?\.kind === "function-definition"/);
  assert.match(runnerSource, /callStack\?: string\[\]/);
  assert.match(workerSource, /"frameName"/);
  assert.match(workerSource, /"callStack"/);
  assert.match(stylesSource, /Module 3 · Lesson 3\.2 development pack/);
  assert.match(stylesSource, /@media \(max-width:30rem\).*\.function-library-list/s);
  assert.doesNotMatch(packSource, /^\s*return\s+/m);
  assert.doesNotMatch(packSource, /\blambda\b/);
});

test("Lesson 3.2 Python trace records function frames and returns to the main program", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'def check_farm_status():\n    print("Checking Soil Moisture...")\n    print("Checking Temperature...")\n    print("Checking Rainfall...")\n\ncheck_farm_status()';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', false);
    const answers = runtime.toPy([]);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.error, null);
  assert.match(result.output, /Checking Rainfall/);
  assert.ok(result.trace.some((step) => step.frameName === "check_farm_status()"));
  assert.ok(result.trace.some((step) => step.callStack.join(" > ") === "Main Program > check_farm_status()"));
  assert.equal(result.trace.at(-1).frameName, "Main Program");
});

test("Lesson 3.3 begins at learning objectives and publishes parameter mapping tools", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, registrySource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-3-3.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/FunctionParametersLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/FunctionParameterLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);

  assert.match(moduleSource, /title: "Function Parameters"/);
  assert.match(packSource, /kind: "function-parameters"/);
  assert.match(packSource, /check_soil\(moisture\)/);
  assert.match(packSource, /Flexible Function Calls/);
  assert.doesNotMatch(rendererSource, /<FunctionEvolutionPanel/);
  assert.match(rendererSource, /<ParameterFlowVisualizer/);
  assert.match(rendererSource, /<ArgumentParameterMapper/);
  assert.match(rendererSource, /<FunctionInputSimulator/);
  assert.match(rendererSource, /<MultiParameterExplorer/);
  assert.match(rendererSource, /<ParameterPlaygroundSupplement/);
  assert.match(rendererSource, /Return values begin in Lesson 3\.4/);
  assert.match(rendererSource, /Keyword arguments begin in Lesson 3\.5/);
  assert.match(blocksSource, /export function ParameterInspector/);
  assert.match(blocksSource, /aria-live="polite"/);
  assert.match(registrySource, /developmentPack\?\.kind === "function-parameters"/);
  assert.match(stylesSource, /Module 3 · Lesson 3\.3 development pack/);
  assert.match(stylesSource, /@media \(max-width:30rem\).*\.parameter-project-checklist/s);
});

test("Lesson 3.3 Python trace exposes each positional parameter value inside the function frame", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'def inspect_sensor(sensor_id, location):\n    print("Checking Sensor", sensor_id, "at", location)\n\ninspect_sensor(205, "East Field")';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', false);
    const answers = runtime.toPy([]);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  const functionStep = result.trace.find((step) => step.frameName === "inspect_sensor()");
  assert.equal(result.error, null);
  assert.match(result.output, /Checking Sensor 205 at East Field/);
  assert.ok(functionStep, "function frame should be traced");
  assert.deepEqual(Object.fromEntries(functionStep.variables.map((variable) => [variable.name, variable.value])), { sensor_id: "205", location: "'East Field'" });
  assert.deepEqual(functionStep.callStack, ["Main Program", "inspect_sensor()"]);
});

test("Lesson 3.4 publishes return-flow tools and the persistent Function Lifecycle", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, registrySource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-3-4.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/ReturnValuesLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/ReturnValueLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);

  assert.match(moduleSource, /title: "Return Values"/);
  assert.match(moduleSource, /id: "module-3-lesson-4"[\s\S]*isPlaceholder: false/);
  assert.match(packSource, /kind: "return-values"/);
  assert.match(packSource, /Print Screen/);
  assert.match(packSource, /Return Value/);
  assert.doesNotMatch(rendererSource, /<FunctionLifecyclePanel/);
  assert.match(rendererSource, /<ReturnFlowVisualizer/);
  assert.match(rendererSource, /<PrintReturnComparator/);
  assert.match(rendererSource, /<ValuePropagationExplorer/);
  assert.match(rendererSource, /<ReturnTypesPanel/);
  assert.match(rendererSource, /<ReturnPlaygroundSupplement/);
  assert.match(rendererSource, /Keyword arguments begin in Lesson 3\.5/);
  assert.match(blocksSource, /export function ReturnOutputInspector/);
  assert.match(blocksSource, /aria-live="polite"/);
  assert.match(registrySource, /developmentPack\?\.kind === "return-values"/);
  assert.match(stylesSource, /Module 3 · Lesson 3\.4 development pack/);
  assert.match(stylesSource, /@media \(max-width:30rem\).*\.return-project-checklist/s);
});

test("Lesson 3.4 Python trace exposes the returned value in the receiving main-program variable", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'def calculate_water(moisture):\n    if moisture < 20:\n        return 100\n    return 50\n\nwater = calculate_water(18)\nprint("Water Required:", water)';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', false);
    const answers = runtime.toPy([]);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  const receivingStep = [...result.trace].reverse().find((step) => step.frameName === "Main Program" && step.variables.some((variable) => variable.name === "water"));
  assert.equal(result.error, null);
  assert.match(result.output, /Water Required: 100/);
  assert.ok(result.trace.some((step) => step.frameName === "calculate_water()"));
  assert.ok(receivingStep, "main frame should capture the returned value");
  assert.deepEqual(receivingStep.variables.find((variable) => variable.name === "water"), { name: "water", value: "100", type: "int" });
});

test("Lesson 3.5 combines positional, keyword, and default arguments in one data-driven lesson", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, registrySource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-3-5.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/FunctionArgumentsLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/FunctionArgumentLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);

  assert.match(moduleSource, /title:"Ways to Pass Arguments"/);
  assert.match(moduleSource, /3\.6 Variable Scope \(Local vs Global\)/);
  assert.match(moduleSource, /3\.9 Function Design Best Practices/);
  assert.match(packSource, /kind: "function-arguments"/);
  assert.match(packSource, /source:"positional"/);
  assert.match(packSource, /source:"keyword"/);
  assert.match(packSource, /source:"default"/);
  assert.match(packSource, /Flexible Function Calls/);
  assert.match(packSource, /Best Practices/);
  assert.match(rendererSource, /<ArgumentMappingVisualizer/);
  assert.match(rendererSource, /<FunctionCallBuilder/);
  assert.match(rendererSource, /<DefaultValueSimulator/);
  assert.match(rendererSource, /<ArgumentPlaygroundSupplement/);
  assert.match(rendererSource, /\*args and \*\*kwargs/);
  assert.match(blocksSource, /export function ParameterReview/);
  assert.match(blocksSource, /aria-live="polite"/);
  assert.match(registrySource, /developmentPack\?\.kind === "function-arguments"/);
  assert.match(stylesSource, /Module 3 · Lesson 3\.5 development pack/);
  assert.match(stylesSource, /@media \(max-width:30rem\).*\.argument-project-checklist/s);
});

test("Lesson 3.5 Python trace binds positional, keyword, and default values inside function frames", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'def farm_report(crop, moisture, unit="Percent"):\n    print(crop, moisture, unit)\n\nfarm_report("Rice", 25)\nfarm_report(moisture=18, crop="Cotton")\nfarm_report("Wheat", 30, "kPa")';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', false);
    const answers = runtime.toPy([]);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  const frames = result.trace.filter((step) => step.frameName === "farm_report()");
  assert.equal(result.error, null);
  assert.match(result.output, /Rice 25 Percent/);
  assert.match(result.output, /Cotton 18 Percent/);
  assert.match(result.output, /Wheat 30 kPa/);
  const bindings = frames.map((step) => Object.fromEntries(step.variables.map((variable) => [variable.name, variable.value])));
  assert.ok(bindings.some((item) => item.crop === "'Rice'" && item.unit === "'Percent'"));
  assert.ok(bindings.some((item) => item.crop === "'Cotton'" && item.moisture === "18"));
  assert.ok(bindings.some((item) => item.crop === "'Wheat'" && item.unit === "'kPa'"));
});

test("Lesson 3.6 publishes visual scope boundaries, lifetime, shadowing, and visibility tools", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, registrySource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-3-6.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/VariableScopeLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/VariableScopeLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);
  assert.match(moduleSource, /title:"Variable Scope"/);
  assert.match(moduleSource, /module-3-lesson-6[\s\S]*isPlaceholder: false/);
  assert.match(packSource, /kind:"variable-scope"/);
  assert.match(packSource, /Function entry → function exit/);
  assert.match(packSource, /Local Farm/);
  assert.match(rendererSource, /<ScopeBoundaryVisualizer/);
  assert.match(rendererSource, /<VariableLifetimeTimeline/);
  assert.match(rendererSource, /<ShadowingSimulator/);
  assert.match(rendererSource, /<ScopeExplorer/);
  assert.match(rendererSource, /<ScopePlaygroundSupplement/);
  assert.match(rendererSource, /global keyword is intentionally deferred/);
  assert.match(blocksSource, /export function ScopeVisibilityInspector/);
  assert.match(blocksSource, /aria-live="polite"/);
  assert.match(registrySource, /developmentPack\?\.kind === "variable-scope"/);
  assert.match(stylesSource, /Module 3 · Lesson 3\.6 development pack/);
  assert.match(stylesSource, /@media \(max-width:30rem\).*\.scope-project-checklist/s);
});

test("Lesson 3.6 Python trace keeps local water inside irrigation while global farm_name remains in main", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'farm_name = "Green Valley"\n\ndef irrigation():\n    water = 100\n    print(farm_name)\n    print(water)\n\nirrigation()';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', false);
    const answers = runtime.toPy([]);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  const functionStep = result.trace.find((step) => step.frameName === "irrigation()" && step.variables.some((variable) => variable.name === "water"));
  const finalMain = [...result.trace].reverse().find((step) => step.frameName === "Main Program");
  assert.equal(result.error, null);
  assert.match(result.output, /Green Valley\n100/);
  assert.ok(functionStep, "local water should appear inside irrigation frame");
  assert.equal(functionStep.variables.find((variable) => variable.name === "water")?.value, "100");
  assert.equal(finalMain.variables.find((variable) => variable.name === "farm_name")?.value, "'Green Valley'");
  assert.equal(finalMain.variables.some((variable) => variable.name === "water"), false);
});

test("Lesson 3.7 publishes a focused, data-driven lambda learning lab", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, registrySource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-3-7.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/LambdaFunctionsLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LambdaFunctionLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);
  assert.match(moduleSource, /id:"module-3-lesson-7"[\s\S]*title:"Lambda Functions"/);
  assert.match(moduleSource, /module-3-lesson-7[\s\S]*isPlaceholder: false/);
  assert.match(packSource, /kind: "lambda-functions"/);
  assert.match(packSource, /lambda parameters: expression/);
  assert.match(rendererSource, /<LambdaBuilder/);
  assert.match(rendererSource, /<DefToLambdaConverter/);
  assert.match(rendererSource, /<FunctionStyleComparator/);
  assert.match(rendererSource, /map\(\), filter\(\), and reduce\(\) are intentionally deferred/);
  assert.match(blocksSource, /export function LambdaExecutionVisualizer/);
  assert.match(blocksSource, /aria-live="polite"/);
  assert.match(registrySource, /developmentPack\?\.kind === "lambda-functions"/);
  assert.match(stylesSource, /Module 3 · Lesson 3\.7 development pack/);
  assert.match(stylesSource, /@media \(max-width:30rem\).*\.lambda-project-checklist/s);
  assert.doesNotMatch(packSource, /\bmap\s*\(|\bfilter\s*\(|\breduce\s*\(|sorted\s*\([^)]*key\s*=/);
});

test("Lesson 3.7 Python trace executes one- and two-parameter lambdas with returned values", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = "square = lambda x: x * x\nprint(square(5))\nmultiply = lambda a, b: a * b\nprint(multiply(4, 5))";
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', false);
    const answers = runtime.toPy([]);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  const lambdaFrames = result.trace.filter((step) => step.frameName === "<lambda>()");
  assert.equal(result.error, null);
  assert.match(result.output, /25\n20/);
  assert.ok(lambdaFrames.some((step) => step.variables.some((variable) => variable.name === "x" && variable.value === "5")));
  assert.ok(lambdaFrames.some((step) => step.variables.some((variable) => variable.name === "a" && variable.value === "4")));
  assert.ok(lambdaFrames.some((step) => step.variables.some((variable) => variable.name === "b" && variable.value === "5")));
});

test("Lesson 3.8 teaches conceptual recursion before countdown and factorial", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, registrySource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-3-8.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/RecursionLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/RecursionLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);
  assert.match(moduleSource, /id:"module-3-lesson-8"[\s\S]*title:"Recursion"/);
  assert.match(moduleSource, /module-3-lesson-8[\s\S]*isPlaceholder: false/);
  assert.match(packSource, /kind: "recursion"/);
  assert.ok(packSource.indexOf("definition:") < packSource.indexOf("countdown:"), "concept must precede countdown");
  assert.ok(packSource.indexOf("countdown:") < packSource.indexOf("factorial:"), "countdown must precede factorial");
  assert.match(rendererSource, /<RecursionTreeExplorer/);
  assert.match(rendererSource, /<CallStackAnimator/);
  assert.match(rendererSource, /<BaseCaseDetector/);
  assert.match(rendererSource, /<LoopRecursionComparator/);
  assert.match(rendererSource, /Advanced recursion techniques are intentionally deferred/);
  assert.match(blocksSource, /export function RecursivePlaygroundSupplement/);
  assert.match(blocksSource, /aria-live="polite"/);
  assert.match(registrySource, /developmentPack\?\.kind === "recursion"/);
  assert.match(stylesSource, /Module 3 · Lesson 3\.8 development pack/);
  assert.match(stylesSource, /@media \(max-width:30rem\).*\.recursion-project-checklist/s);
  assert.doesNotMatch(packSource, /\blru_cache\b|\bdynamic programming\b|\btail recursion\b|\bmutual recursion\b/i);
});

test("Lesson 3.8 Python trace grows recursive countdown frames and reaches the base case", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'def countdown(n):\n    if n == 0:\n        print("Done")\n        return\n    print(n)\n    countdown(n - 1)\n\ncountdown(3)';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', false);
    const answers = runtime.toPy([]);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  const countdownSteps = result.trace.filter((step) => step.frameName === "countdown()");
  const deepest = countdownSteps.reduce((best, step) => step.callStack.length > best.callStack.length ? step : best, countdownSteps[0]);
  assert.equal(result.error, null);
  assert.match(result.output, /3\n2\n1\nDone/);
  assert.ok(countdownSteps.some((step) => step.variables.some((variable) => variable.name === "n" && variable.value === "0")), "base-case frame should be traced");
  assert.ok(deepest.callStack.filter((frame) => frame === "countdown()").length >= 4, "recursive stack should contain four countdown frames");
});

test("Lesson 3.9 publishes professional function-design and refactoring tools", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, registrySource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-3-9.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/FunctionDesignLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/FunctionDesignLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);
  assert.match(moduleSource, /id:"module-3-lesson-9"[\s\S]*title:"Function Design Best Practices"/);
  assert.match(moduleSource, /module-3-lesson-9[\s\S]*isPlaceholder: false/);
  assert.match(packSource, /kind:"function-design"/);
  assert.match(packSource, /Single Responsibility Principle/);
  assert.match(rendererSource, /<NamingQualityMeter/);
  assert.match(rendererSource, /<SRPVisualizer/);
  assert.match(rendererSource, /<FunctionHealthReport/);
  assert.match(rendererSource, /<RefactoringWorkspace/);
  assert.match(rendererSource, /<DesignPlaygroundSupplement/);
  assert.match(rendererSource, /Type hints are intentionally deferred/);
  assert.match(blocksSource, /export function FunctionQualityAnalyzer/);
  assert.match(blocksSource, /aria-live="polite"/);
  assert.match(registrySource, /developmentPack\?\.kind === "function-design"/);
  assert.match(stylesSource, /Module 3 · Lesson 3\.9 development pack/);
  assert.match(stylesSource, /@media \(max-width:30rem\).*\.design-project-checklist/s);
});

test("Lesson 3.9 refactored functions return reusable data through explicit parameters", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'def calculate_water(moisture):\n    """Return water required for a moisture reading."""\n    return moisture * 5\n\ndef generate_report(moisture, water):\n    return f"Moisture {moisture}; Water {water}"\n\nwater = calculate_water(20)\nreport = generate_report(20, water)\nprint(report)';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', false);
    const answers = runtime.toPy([]);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  const finalMain = [...result.trace].reverse().find((step) => step.frameName === "Main Program");
  assert.equal(result.error, null);
  assert.match(result.output, /Moisture 20; Water 100/);
  assert.equal(finalMain.variables.find((variable) => variable.name === "water")?.value, "100");
  assert.equal(finalMain.variables.find((variable) => variable.name === "report")?.value, "'Moisture 20; Water 100'");
});

test("Lesson 3.10 publishes the cumulative Smart Farm function capstone", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, registrySource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-3-10.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/FunctionCapstoneLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/FunctionCapstoneLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);
  assert.match(moduleSource, /id:"module-3-lesson-10"[\s\S]*title:"Capstone Project: Smart Farm Automation System"/);
  assert.match(moduleSource, /module-3-lesson-10[\s\S]*isPlaceholder: false/);
  assert.match(packSource, /kind:"function-capstone"/);
  assert.match(packSource, /Smart Farm Automation Architecture/);
  assert.match(packSource, /Function Dependency Graph/);
  assert.match(rendererSource, /<ProjectArchitectureViewer/);
  assert.match(rendererSource, /<FunctionDependencyGraph/);
  assert.match(rendererSource, /<IntegrationConsole/);
  assert.match(rendererSource, /<CapstoneProgressTracker/);
  assert.match(rendererSource, /<EngineeringReflectionPanel/);
  assert.match(rendererSource, /<RecursionTreeExplorer/);
  assert.match(blocksSource, /localStorage\.setItem/);
  assert.match(blocksSource, /aria-live="polite"/);
  assert.match(registrySource, /developmentPack\?\.kind === "function-capstone"/);
  assert.match(stylesSource, /Module 3 · Lesson 3\.10 development pack/);
  assert.match(stylesSource, /@media\(max-width:30rem\).*\.integration-dashboard/s);
});

test("Module 3 lessons start at learning objectives without evolution or mental-model panels", async () => {
  const rendererFiles = [
    "WhyFunctionsLessonRenderer.tsx",
    "FunctionDefinitionLessonRenderer.tsx",
    "FunctionParametersLessonRenderer.tsx",
    "ReturnValuesLessonRenderer.tsx",
    "FunctionArgumentsLessonRenderer.tsx",
    "VariableScopeLessonRenderer.tsx",
    "LambdaFunctionsLessonRenderer.tsx",
    "RecursionLessonRenderer.tsx",
    "FunctionDesignLessonRenderer.tsx",
    "FunctionCapstoneLessonRenderer.tsx",
  ];
  const renderers = await Promise.all(rendererFiles.map((file) => readFile(new URL(`components/learning/${file}`, projectRoot), "utf8")));
  for (const source of renderers) {
    assert.doesNotMatch(source, /<FunctionEvolutionPanel/);
    assert.doesNotMatch(source, /<FunctionLifecyclePanel/);
    assert.doesNotMatch(source, /\["function-evolution"|\["function-lifecycle"/);
    assert.match(source, /<LearningObjectivesCard[\s\S]*?id="objectives"/);
  }
});

test("Lesson 3.10 integrated project returns results and completes recursive inspection", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'def calculate_water_requirement(moisture):\n    if moisture < 30:\n        return 100\n    return 40\n\ndef calculate_fertilizer(area, rate=2):\n    return area * rate\n\ndef inspect_zone(level):\n    if level == 0:\n        print("Inspection Complete")\n        return\n    print("Inspecting Level", level)\n    inspect_zone(level - 1)\n\nwater = calculate_water_requirement(25)\nfertilizer = calculate_fertilizer(area=40)\nprint("Water:", water, "Fertilizer:", fertilizer)\ninspect_zone(3)';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', false);
    const answers = runtime.toPy([]);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.error, null);
  assert.match(result.output, /Water: 100 Fertilizer: 80/);
  assert.match(result.output, /Inspecting Level 3[\s\S]*Inspection Complete/);
  assert.ok(result.trace.some((step) => step.frameName === "inspect_zone()" && step.variables.some((variable) => variable.name === "level" && variable.value === "0")));
});

test("Module 0 publishes six structured interactive lessons", async () => {
  const [contentSource, rendererSource, welcomeRendererSource, welcomeBlocksSource, whyPythonPackSource, whyPythonRendererSource, whyPythonBlocksSource, playgroundSource, workflowSource] = await Promise.all([
    readFile(new URL("content/module-0.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/WelcomeLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/WelcomeLessonBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-0-2.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/WhyPythonLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/WhyPythonLessonBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/CodePlayground.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/WorkflowAnimation.tsx", projectRoot), "utf8"),
  ]);

  const lessons = [
    "Welcome to Python, Agritech & DI Notes",
    "Why Python?",
    "Python in Agritech",
    "Setting Up Python",
    "Writing Your First Python Program",
    "Course Roadmap",
  ];
  for (const lesson of lessons) assert.match(contentSource, new RegExp(lesson.replace("?", "\\?")));
  assert.equal((contentSource.match(/defineLesson\(\{/g) ?? []).length, 6);
  assert.match(rendererSource, /<LearningObjectivesCard/);
  assert.match(rendererSource, /<IndustryInsightCard/);
  assert.match(rendererSource, /<PracticeCard/);
  assert.match(rendererSource, /<QuizCard/);
  assert.match(rendererSource, /lesson\.developmentPack\?\.kind === "welcome"/);
  assert.match(rendererSource, /lesson\.developmentPack\?\.kind === "why-python"/);
  assert.match(welcomeRendererSource, /<WelcomeLessonHero/);
  assert.match(welcomeRendererSource, /<CourseJourneyRoadmap/);
  assert.match(welcomeRendererSource, /<InteractiveFeatureGrid id="platform-tour"/);
  assert.match(welcomeBlocksSource, /Did you know\?/i);
  assert.match(contentSource, /print\(\"🌾 Welcome to Python for Agritech!\"\)/);
  assert.match(whyPythonPackSource, /kind: "why-python"/);
  assert.match(whyPythonPackSource, /Imagine managing a 500-acre smart farm/);
  assert.match(whyPythonRendererSource, /<AgritechEcosystemMap/);
  assert.match(whyPythonRendererSource, /<LanguageComparison/);
  assert.match(whyPythonRendererSource, /<EngineerScenario/);
  assert.match(whyPythonBlocksSource, /<Slider/);
  assert.match(whyPythonBlocksSource, /aria-live="polite"/);
  assert.match(contentSource, /print\(\"🌾 Welcome to Python!\"\)/);
  assert.match(contentSource, /title: \"Question 10\"/);
  assert.match(playgroundSource, /Run code/);
  assert.match(playgroundSource, /aria-live="polite"/);
  assert.match(workflowSource, /aria-current=\{index === activeStep \? "step"/);
});

test("Module 1 publishes structured first-program, variables, and data-types lessons", async () => {
  const [moduleSource, packSource, variablesPackSource, dataTypesPackSource, registrySource, rendererSource, variablesRendererSource, dataTypesRendererSource, blocksSource, variableBlocksSource, dataTypeBlocksSource, quizSource, frameworkSource] = await Promise.all([
    readFile(new URL("content/module-1.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-1-1.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-1-2.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-1-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/lessons.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/FirstProgramLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/VariablesLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/DataTypesLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/FirstProgramLessonBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/VariableLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/DataTypeLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("content/course-framework.ts", projectRoot), "utf8"),
  ]);

  assert.match(moduleSource, /Writing Your First Python Program/);
  assert.match(moduleSource, /Variables: Storing Information in Python/);
  assert.match(moduleSource, /Data Types in Python/);
  assert.match(moduleSource, /Welcome to Python/);
  assert.match(moduleSource, /correctOptionIndex: 1/);
  assert.match(packSource, /kind: "first-program"/);
  assert.match(packSource, /mistakesToFind: 3/);
  assert.match(variablesPackSource, /kind: "variables"/);
  assert.match(variablesPackSource, /mistakesToFind: 4/);
  assert.match(dataTypesPackSource, /kind: "data-types"/);
  assert.match(dataTypesPackSource, /Convert values between compatible data types/);
  assert.match(packSource, /wrongCode:/);
  assert.match(registrySource, /\.\.\.moduleOneLessons/);
  assert.match(frameworkSource, /moduleIndex === 1/);
  assert.match(rendererSource, /<ExecutionTracer/);
  assert.match(rendererSource, /<DebugChallengeCard/);
  assert.match(rendererSource, /<CodePlayground/);
  assert.match(blocksSource, /Run execution/);
  assert.match(blocksSource, /Show solution/);
  assert.match(variablesRendererSource, /<VariablePlayground/);
  assert.match(variablesRendererSource, /<NamingRuleValidator/);
  assert.match(variableBlocksSource, /<MemoryVisualizer/);
  assert.match(variableBlocksSource, /function VariableInspector/);
  assert.match(variableBlocksSource, /function VariableExplorer/);
  assert.match(dataTypesRendererSource, /<TypeConversionVisualizer/);
  assert.match(dataTypesRendererSource, /<DataTypePlayground/);
  assert.match(dataTypeBlocksSource, /function PredictOutputCard/);
  assert.match(dataTypeBlocksSource, /<VariableExplorer/);
  assert.match(quizSource, /Score: \$\{score\} of \$\{questions\.length\}/);
});

test("variable inspector handles assignment, reassignment, swapping, and naming rules", async () => {
  const script = `
    import { inspectPythonVariables, validateVariableName } from './components/learning/variable-inspector.ts';
    const variables = inspectPythonVariables('a = 10\\nb = 20\\na, b = b, a\\ncrop = "Rice"\\nreading = 31\\nreading = 31.5\\nsensor_data = None');
    console.log(JSON.stringify({ variables, keyword: validateVariableName('class'), farmName: validateVariableName('soil_moisture') }));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.deepEqual(result.variables, [
    { name: "a", value: "20", type: "int" },
    { name: "b", value: "10", type: "int" },
    { name: "crop", value: "Rice", type: "str" },
    { name: "reading", value: "31.5", type: "float" },
    { name: "sensor_data", value: "None", type: "NoneType" },
  ]);
  assert.equal(result.keyword.valid, false);
  assert.equal(result.farmName.valid, true);
});

test("Lesson 1.4 publishes a data-driven synchronized user-input lab", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, playgroundSource, runnerSource, workerSource] = await Promise.all([
    readFile(new URL("content/module-1.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-1-4.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/UserInputLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/UserInputLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/CodePlayground.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/usePythonRunner.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8"),
  ]);

  assert.match(moduleSource, /title: "User Input in Python"/);
  assert.match(moduleSource, /isPlaceholder: false/);
  assert.match(packSource, /kind: "user-input"/);
  assert.match(packSource, /Smart farm input simulator/);
  assert.match(packSource, /Mini project · Farm Registration System/);
  assert.match(rendererSource, /<UserInputPlayground/);
  assert.match(rendererSource, /<PredictionCard/);
  assert.match(blocksSource, /function InputSimulator/);
  assert.match(blocksSource, /function ConsoleEmulator/);
  assert.match(blocksSource, /function FormToCodeVisualizer/);
  assert.match(blocksSource, /Interactive form mode/);
  assert.match(blocksSource, /Console mode/);
  assert.match(playgroundSource, /inputValues/);
  assert.match(runnerSource, /inputs\?: string\[\]/);
  assert.match(workerSource, /builtins\.input = __di_input/);
  assert.match(workerSource, /No simulated response remains/);
});

test("Lesson 1.5 publishes data-driven conversion tools and a shared code trace panel", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, traceSource, inspectorSource, playgroundSource, runnerSource, workerSource] = await Promise.all([
    readFile(new URL("content/module-1.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-1-5.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/TypeConversionLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/TypeConversionLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/CodeTracePanel.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/conversion-inspector.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/CodePlayground.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/usePythonRunner.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8"),
  ]);

  assert.match(moduleSource, /title: "Type Conversion in Python"/);
  assert.match(moduleSource, /module-1-lesson-6/);
  assert.match(packSource, /kind: "type-conversion"/);
  assert.match(packSource, /Mini project · Smart Weather Converter/);
  assert.match(rendererSource, /<ConversionPlayground/);
  assert.match(rendererSource, /<ErrorExplorer/);
  assert.match(blocksSource, /function ConversionVisualizer/);
  assert.match(blocksSource, /function TypeFlowDiagram/);
  assert.match(blocksSource, /<CodeTracePanel/);
  assert.match(traceSource, /Variables after this line/);
  assert.match(traceSource, /Console output at this step/);
  assert.match(inspectorSource, /inspectPythonConversions/);
  assert.match(playgroundSource, /traceExecution/);
  assert.match(runnerSource, /PythonTraceStep/);
  assert.match(workerSource, /sys\.settrace\(__di_tracer\)/);
  assert.match(workerSource, /__di_trace_limit = 250/);
});

test("Lesson 1.6 publishes a data-driven operators lab with reusable explorers", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, lessonRendererSource, typesSource] = await Promise.all([
    readFile(new URL("content/module-1.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-1-6.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/OperatorsLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/OperatorLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("types/content.ts", projectRoot), "utf8"),
  ]);

  assert.match(moduleSource, /title: "Operators in Python"/);
  assert.match(moduleSource, /module-1-lesson-7/);
  assert.match(moduleSource, /print\(temperature > 30 and rainfall < 50\)/);
  assert.match(packSource, /kind: "operators"/);
  assert.match(packSource, /Smart Irrigation Decision System/);
  assert.match(packSource, /should_start_irrigation/);
  assert.match(rendererSource, /<OperatorPlayground/);
  assert.match(rendererSource, /<TruthTableExplorer/);
  assert.match(rendererSource, /<OperatorPrecedenceVisualizer/);
  assert.match(blocksSource, /function OperatorExplorer/);
  assert.match(blocksSource, /function ExpressionVisualizer/);
  assert.match(blocksSource, /function OperatorComparisonTable/);
  assert.match(blocksSource, /<CodeTracePanel/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "operators"/);
  assert.match(typesSource, /kind: "operators"/);
});

test("Lesson 1.7 publishes a data-driven problem-solving lab and complete practice sequence", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, lessonRendererSource, typesSource] = await Promise.all([
    readFile(new URL("content/module-1.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-1-7.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/ProblemSolvingLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/ProblemSolvingLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("types/content.ts", projectRoot), "utf8"),
  ]);

  assert.match(moduleSource, /title: "Expressions & Problem Solving"/);
  assert.match(moduleSource, /module-1-lesson-8/);
  assert.match(moduleSource, /total_yield = area \* yield_per_acre/);
  assert.match(packSource, /kind: "problem-solving"/);
  assert.match(packSource, /Understand Problem/);
  assert.match(packSource, /Mini project · Smart Farm Calculator/);
  assert.match(packSource, /Rainwater Harvest Estimator/);
  assert.match(rendererSource, /<ProblemSolvingFrameworkCard/);
  assert.match(rendererSource, /<ProblemSolvingPlayground/);
  assert.match(rendererSource, /<ChallengeCard/);
  assert.match(blocksSource, /function ExpressionBuilder/);
  assert.match(blocksSource, /function FormulaCard/);
  assert.match(blocksSource, /function CalculationStepsPanel/);
  assert.match(blocksSource, /<CodeTracePanel/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "problem-solving"/);
  assert.match(typesSource, /kind: "problem-solving"/);
});

test("Lesson 1.8 publishes a data-driven capstone with walkthrough and testing tools", async () => {
  const [moduleSource, packSource, rendererSource, blocksSource, lessonRendererSource, typesSource] = await Promise.all([
    readFile(new URL("content/module-1.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-1-8.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/CapstoneProjectLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/CapstoneProjectLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("types/content.ts", projectRoot), "utf8"),
  ]);

  assert.match(moduleSource, /title: "Mini Project: Smart Farm Information System"/);
  assert.match(moduleSource, /Module 2 · Decision Making & Control Flow/);
  assert.match(packSource, /kind: "capstone-project"/);
  assert.match(packSource, /SMART FARM INFORMATION/);
  assert.match(packSource, /Water Required     : 15000\.0 litres/);
  assert.match(packSource, /Module 1 complete · Python foundations/);
  assert.match(rendererSource, /<ProjectProgressChecklist/);
  assert.match(rendererSource, /<CodeWalkthroughPanel/);
  assert.match(rendererSource, /<ProjectPlayground/);
  assert.match(rendererSource, /<ModuleCompletionCard/);
  assert.match(blocksSource, /function RequirementAnalysisPanel/);
  assert.match(blocksSource, /function AlgorithmViewer/);
  assert.match(blocksSource, /function FlowchartViewer/);
  assert.match(blocksSource, /function TestingPanel/);
  assert.match(blocksSource, /expectedOutputFragments\.every/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "capstone-project"/);
  assert.match(typesSource, /kind: "capstone-project"/);
});

test("Lesson 1.8 reference dataset produces the expected farm-resource report", async () => {
  const [packSource, workerSource] = await Promise.all([
    readFile(new URL("content/development-packs/lesson-1-8.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8"),
  ]);
  const rawProgram = packSource.match(/finalProgram: "((?:[^"\\]|\\.)*)",\n\s*walkthrough:/)?.[1];
  assert.ok(rawProgram, "capstone final program should be present");
  const program = JSON.parse(`"${rawProgram}"`);
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const inputs = ["Rahul", "Panvel", "Rice", "10", "32", "110", "40", "1500", "25"];
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', true);
    const answers = runtime.toPy(${JSON.stringify(inputs)});
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.error, null);
  assert.match(result.output, /Water Required\s+: 15000\.0 litres/);
  assert.match(result.output, /Fertilizer Needed\s+: 250\.0 kg/);
});

test("Module 2 publishes a complete ten-lesson control-flow journey and capstone", async () => {
  const [courseSource, moduleSource, packSource, ifPackSource, ifElsePackSource, elifPackSource, nestedPackSource, matchPackSource, forPackSource, whilePackSource, controlPackSource, capstonePackSource, rendererSource, ifRendererSource, ifElseRendererSource, elifRendererSource, nestedRendererSource, matchRendererSource, forRendererSource, whileRendererSource, controlRendererSource, capstoneRendererSource, blocksSource, ifBlocksSource, ifElseBlocksSource, elifBlocksSource, nestedBlocksSource, matchBlocksSource, forBlocksSource, whileBlocksSource, controlBlocksSource, capstoneBlocksSource, inspectorSource, analyzerSource, registrySource, lessonRendererSource, typesSource] = await Promise.all([
    readFile(new URL("content/course-framework.ts", projectRoot), "utf8"),
    readFile(new URL("content/module-2.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-2-1.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-2-2.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-2-3.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-2-4.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-2-5.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-2-6.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-2-7.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-2-8.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-2-9.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-2-10.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/DecisionMakingLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/IfStatementLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/IfElseLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/IfElifElseLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/NestedIfLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/MatchCaseLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/ForLoopLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/WhileLoopLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LoopControlLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/ControlFlowCapstoneLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/DecisionMakingLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/IfStatementLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/IfElseLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/IfElifElseLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/NestedIfLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/MatchCaseLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/ForLoopLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/WhileLoopLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/LoopControlLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/ControlFlowCapstoneLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/if-statement-inspector.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/condition-order-analyzer.ts", projectRoot), "utf8"),
    readFile(new URL("content/lessons.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/LessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("types/content.ts", projectRoot), "utf8"),
  ]);

  assert.match(courseSource, /title: "Decision Making & Control Flow"/);
  assert.match(courseSource, /moduleIndex === 2/);
  assert.match(moduleSource, /title: "Decision Making in Python"/);
  assert.match(moduleSource, /title: "The if Statement"/);
  assert.match(moduleSource, /title: "The if-else Statement"/);
  assert.match(moduleSource, /title: "The if-elif-else Statement"/);
  assert.match(moduleSource, /title: "Nested if Statements"/);
  assert.match(moduleSource, /title: "The match-case Statement"/);
  assert.match(moduleSource, /title: "The for Loop"/);
  assert.match(moduleSource, /title: "The while Loop"/);
  assert.match(moduleSource, /title: "Loop Control Statements \(break, continue, pass\)"/);
  assert.match(moduleSource, /title: "Capstone Project: Smart Farm Automation Console"/);
  assert.equal((moduleSource.match(/id: "module-2-lesson-/g) ?? []).length, 20);
  assert.match(packSource, /kind: "decision-making"/);
  assert.match(packSource, /Smart Farm Decision Simulator/);
  assert.match(packSource, /Water Level < 25%\?/);
  assert.match(ifPackSource, /kind: "if-statement"/);
  assert.match(ifPackSource, /Weather Alert System/);
  assert.match(ifElsePackSource, /kind: "if-else"/);
  assert.match(ifElsePackSource, /Smart Irrigation Controller v2/);
  assert.match(elifPackSource, /kind: "if-elif-else"/);
  assert.match(elifPackSource, /Smart Irrigation Controller v3/);
  assert.match(nestedPackSource, /kind: "nested-if"/);
  assert.match(nestedPackSource, /Smart Irrigation Controller v4/);
  assert.match(matchPackSource, /kind: "match-case"/);
  assert.match(matchPackSource, /Smart Farm Menu System/);
  assert.match(forPackSource, /kind: "for-loop"/);
  assert.match(forPackSource, /Smart Farm Sensor Monitor/);
  assert.match(whilePackSource, /kind: "while-loop"/);
  assert.match(whilePackSource, /Smart Irrigation Controller v5/);
  assert.match(controlPackSource, /kind: "loop-control"/);
  assert.match(controlPackSource, /Smart Sensor Monitoring System/);
  assert.match(capstonePackSource, /kind: "control-flow-capstone"/);
  assert.match(capstonePackSource, /SMART FARM AUTOMATION/);
  assert.match(capstonePackSource, /case "5"/);
  assert.match(rendererSource, /<ConditionEvaluator/);
  assert.match(rendererSource, /<FlowchartBuilder/);
  assert.match(rendererSource, /<InteractiveFlowSimulator/);
  assert.match(ifRendererSource, /<IfStatementVisualizer/);
  assert.match(ifRendererSource, /<IndentationChecker/);
  assert.match(ifRendererSource, /<IfPlayground/);
  assert.match(ifElseRendererSource, /<IfElseVisualizer/);
  assert.match(ifElseRendererSource, /<ExecutionComparator/);
  assert.match(ifElseRendererSource, /<CompareChooseCard/);
  assert.match(elifRendererSource, /<DecisionTreeBuilder/);
  assert.match(elifRendererSource, /<ConditionCoverageTester/);
  assert.match(nestedRendererSource, /<ExecutionTreeViewer/);
  assert.match(nestedRendererSource, /<LogicPathSimulator/);
  assert.match(nestedRendererSource, /<DecisionPatternSelector/);
  assert.match(matchRendererSource, /<MatchCaseVisualizer/);
  assert.match(matchRendererSource, /<MenuSimulator/);
  assert.match(matchRendererSource, /<StructureAdvisor/);
  assert.match(forRendererSource, /<RangeExplorer/);
  assert.match(forRendererSource, /<SequenceExplorer/);
  assert.match(forRendererSource, /<ForLoopPlayground/);
  assert.match(whileRendererSource, /<WhileLoopVisualizer/);
  assert.match(whileRendererSource, /<InfiniteLoopDetector/);
  assert.match(whileRendererSource, /<WhileLoopPlayground/);
  assert.match(controlRendererSource, /<LoopControlVisualizer/);
  assert.match(controlRendererSource, /<ControlStatementComparator/);
  assert.match(controlRendererSource, /<SensorFaultSimulator/);
  assert.match(controlRendererSource, /<LoopControlPlayground/);
  assert.match(capstoneRendererSource, /<ApplicationFlowVisualizer/);
  assert.match(capstoneRendererSource, /<InteractiveConsoleSimulator/);
  assert.match(capstoneRendererSource, /<CapstoneChecklist/);
  assert.match(blocksSource, /function ControlFlowAnimator/);
  assert.match(blocksSource, /function DecisionTreeViewer/);
  assert.match(blocksSource, /function FlowchartViewer/);
  assert.match(blocksSource, /draggable/);
  assert.match(blocksSource, /Supported operators: >, <, >=, <=, ==, !=/);
  assert.match(ifBlocksSource, /function CodeStepRunner/);
  assert.match(ifBlocksSource, /function DecisionTimeline/);
  assert.match(ifBlocksSource, /Replay timeline/);
  assert.match(ifBlocksSource, /traceExecution/);
  assert.match(ifElseBlocksSource, /function DualPathAnimation/);
  assert.match(ifElseBlocksSource, /mode="if-else"/);
  assert.match(ifElseBlocksSource, /function ExecutionComparator/);
  assert.match(elifBlocksSource, /function IfElifElseVisualizer/);
  assert.match(elifBlocksSource, /function BranchExecutionTimeline/);
  assert.match(elifBlocksSource, /function ConditionOrderAnalyzer/);
  assert.match(elifBlocksSource, /function ConditionCoverageTester/);
  assert.match(elifBlocksSource, /function MultiBranchExecutionComparator/);
  assert.match(elifBlocksSource, /mode="if-elif-else"/);
  assert.match(nestedBlocksSource, /function NestedDecisionTree/);
  assert.match(nestedBlocksSource, /function ExecutionTreeViewer/);
  assert.match(nestedBlocksSource, /function NestedBlockHighlighter/);
  assert.match(nestedBlocksSource, /function HierarchyExplorer/);
  assert.match(nestedBlocksSource, /function LogicPathSimulator/);
  assert.match(nestedBlocksSource, /mode="nested-if"/);
  assert.match(matchBlocksSource, /function PatternMatchingTimeline/);
  assert.match(matchBlocksSource, /function MatchCaseVisualizer/);
  assert.match(matchBlocksSource, /function CaseSelector/);
  assert.match(matchBlocksSource, /function MenuSimulator/);
  assert.match(matchBlocksSource, /function MatchTraceTimeline/);
  assert.match(matchBlocksSource, /mode="match-case"/);
  assert.match(forBlocksSource, /function LoopVisualizer/);
  assert.match(forBlocksSource, /function RangeExplorer/);
  assert.match(forBlocksSource, /function IterationTimeline/);
  assert.match(forBlocksSource, /function SequenceExplorer/);
  assert.match(forBlocksSource, /function LoopCounter/);
  assert.match(forBlocksSource, /mode="for-loop"/);
  assert.match(whileBlocksSource, /function ConditionMonitor/);
  assert.match(whileBlocksSource, /function WhileLoopTimeline/);
  assert.match(whileBlocksSource, /function InfiniteLoopDetector/);
  assert.match(whileBlocksSource, /mode="while-loop"/);
  assert.match(controlBlocksSource, /function IterationFlowAnimator/);
  assert.match(controlBlocksSource, /function LoopControlExecutionTimeline/);
  assert.match(controlBlocksSource, /mode="loop-control"/);
  assert.match(capstoneBlocksSource, /function ModuleNavigator/);
  assert.match(capstoneBlocksSource, /function ProjectProgressTracker/);
  assert.match(capstoneBlocksSource, /function ExecutionDashboard/);
  assert.match(capstoneBlocksSource, /function ConceptMappingCard/);
  assert.match(inspectorSource, /function inspectIfExecution/);
  assert.match(inspectorSource, /function inspectIfElseExecution/);
  assert.match(inspectorSource, /function inspectConditionalChain/);
  assert.match(inspectorSource, /function inspectNestedExecution/);
  assert.match(inspectorSource, /function inspectMatchCaseExecution/);
  assert.match(inspectorSource, /function inspectForLoopExecution/);
  assert.match(inspectorSource, /function inspectWhileLoopExecution/);
  assert.match(inspectorSource, /function analyzeWhileLoopSafety/);
  assert.match(inspectorSource, /function inspectLoopControlExecution/);
  assert.match(analyzerSource, /function analyzeConditionOrder/);
  assert.match(analyzerSource, /function selectBranchForValue/);
  assert.match(inspectorSource, /function checkIfIndentation/);
  assert.match(registrySource, /\.\.\.moduleTwoLessons/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "decision-making"/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "if-statement"/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "if-else"/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "if-elif-else"/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "nested-if"/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "match-case"/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "for-loop"/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "while-loop"/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "loop-control"/);
  assert.match(lessonRendererSource, /developmentPack\?\.kind === "control-flow-capstone"/);
  assert.match(typesSource, /kind: "decision-making"/);
  assert.match(typesSource, /kind: "if-statement"/);
  assert.match(typesSource, /kind: "if-else"/);
  assert.match(typesSource, /kind: "if-elif-else"/);
  assert.match(typesSource, /kind: "nested-if"/);
  assert.match(typesSource, /kind: "match-case"/);
  assert.match(typesSource, /kind: "for-loop"/);
  assert.match(typesSource, /kind: "while-loop"/);
  assert.match(typesSource, /kind: "loop-control"/);
  assert.match(typesSource, /kind: "control-flow-capstone"/);
});

test("condition order analysis detects unreachable branches and selects complete coverage inputs", async () => {
  const script = `
    import { analyzeConditionOrder, selectBranchForValue } from './components/learning/condition-order-analyzer.ts';
    const correct = [
      { id: 'critical', kind: 'if', condition: 'soil < 15', action: 'Emergency', label: 'Critical' },
      { id: 'low', kind: 'elif', condition: 'soil < 30', action: 'Start', label: 'Low' },
      { id: 'normal', kind: 'elif', condition: 'soil < 50', action: 'Monitor', label: 'Normal' },
      { id: 'high', kind: 'else', action: 'Stop', label: 'High' },
    ];
    const wrong = [correct[2], correct[1], correct[0], correct[3]];
    console.log(JSON.stringify({ correct: analyzeConditionOrder(correct), wrong: analyzeConditionOrder(wrong), selected: [10, 22, 40, 70].map((value) => selectBranchForValue(correct, value)) }));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.deepEqual(result.correct, []);
  assert.equal(result.wrong[0].kind, "unreachable");
  assert.deepEqual(result.selected, [0, 1, 2, 3]);
});

test("nested execution inspection distinguishes every hierarchical path", async () => {
  const script = `
    import { inspectNestedExecution } from './components/learning/if-statement-inspector.ts';
    const code = 'soil = 25\\ntemperature = 38\\n\\nif soil < 30:\\n    if temperature > 35:\\n        print("Immediate Irrigation")\\n    else:\\n        print("Schedule Evening Irrigation")\\nelse:\\n    print("No Irrigation Required")';
    const execution = (lines) => ({ status: 'success', output: '', error: null, trace: lines.map((lineNumber) => ({ lineNumber })) });
    console.log(JSON.stringify([
      inspectNestedExecution(code, execution([1, 2, 4, 5, 6])),
      inspectNestedExecution(code, execution([1, 2, 4, 5, 8])),
      inspectNestedExecution(code, execution([1, 2, 4, 10])),
    ]));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", script], { cwd: projectRoot });
  const [immediate, evening, sufficient] = JSON.parse(stdout);
  assert.equal(immediate.selectedPath, "outer-true-inner-true");
  assert.equal(immediate.levels[1].result, true);
  assert.equal(evening.selectedPath, "outer-true-inner-false");
  assert.equal(evening.levels[1].result, false);
  assert.equal(sufficient.selectedPath, "outer-false");
  assert.equal(sufficient.levels[1].evaluated, false);
});

test("Lesson 2.5 playground executes all three nested irrigation outcomes", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'soil = float(input("Enter Soil Moisture (%): "))\ntemperature = float(input("Enter Temperature (°C): "))\n\nif soil < 30:\n    if temperature > 35:\n        print("Immediate Irrigation")\n    else:\n        print("Schedule Evening Irrigation")\nelse:\n    print("No Irrigation Required")';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const results = [];
    for (const inputs of [['20', '38'], ['20', '22'], ['45', '38']]) {
      const globals = runtime.toPy({});
      globals.set('__di_user_code', ${JSON.stringify(program)});
      globals.set('__di_has_inputs', true);
      const answers = runtime.toPy(inputs);
      globals.set('__di_input_values', answers);
      answers.destroy();
      results.push(JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals }))));
      globals.destroy();
    }
    console.log(JSON.stringify(results));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const results = JSON.parse(stdout);
  assert.deepEqual(results.map((result) => result.output.split("\n").at(-1)), ["Immediate Irrigation", "Schedule Evening Irrigation", "No Irrigation Required"]);
  assert.deepEqual(results.map((result) => result.trace.map((step) => step.lineNumber)), [[1, 2, 4, 5, 6], [1, 2, 4, 5, 8], [1, 2, 4, 10]]);
});

test("match-case inspection identifies compared, selected, and skipped cases", async () => {
  const script = `
    import { inspectMatchCaseExecution } from './components/learning/if-statement-inspector.ts';
    const code = 'crop = input("Enter Crop: ")\\n\\nmatch crop:\\n    case "Rice":\\n        print("Maintain standing water.")\\n    case "Wheat":\\n        print("Moderate irrigation.")\\n    case "Cotton":\\n        print("Avoid overwatering.")\\n    case _:\\n        print("Unknown Crop")';
    const execution = (lines) => ({ status: 'success', output: '', error: null, trace: lines.map((lineNumber) => ({ lineNumber })) });
    console.log(JSON.stringify([
      inspectMatchCaseExecution(code, execution([1, 3, 4, 5])),
      inspectMatchCaseExecution(code, execution([1, 3, 4, 6, 8, 9])),
      inspectMatchCaseExecution(code, execution([1, 3, 4, 6, 8, 10, 11])),
    ]));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", script], { cwd: projectRoot });
  const [rice, cotton, unknown] = JSON.parse(stdout);
  assert.equal(rice.selectedCase, 0);
  assert.deepEqual(rice.cases.map((item) => item.evaluated), [true, false, false, false]);
  assert.equal(cotton.selectedCase, 2);
  assert.deepEqual(cotton.cases.map((item) => item.evaluated), [true, true, true, false]);
  assert.equal(unknown.selectedCase, 3);
  assert.equal(unknown.cases[3].isDefault, true);
});

test("Lesson 2.6 playground executes named and default match-case paths", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'crop = input("Enter Crop: ")\n\nmatch crop:\n    case "Rice":\n        print("Maintain standing water.")\n    case "Wheat":\n        print("Moderate irrigation.")\n    case "Cotton":\n        print("Avoid overwatering.")\n    case _:\n        print("Unknown Crop")';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const results = [];
    for (const value of ['Rice', 'Cotton', 'Millet']) {
      const globals = runtime.toPy({});
      globals.set('__di_user_code', ${JSON.stringify(program)});
      globals.set('__di_has_inputs', true);
      const answers = runtime.toPy([value]);
      globals.set('__di_input_values', answers);
      answers.destroy();
      results.push(JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals }))));
      globals.destroy();
    }
    console.log(JSON.stringify(results));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const results = JSON.parse(stdout);
  assert.deepEqual(results.map((result) => result.output.split("\n").at(-1)), ["Maintain standing water.", "Avoid overwatering.", "Unknown Crop"]);
  assert.deepEqual(results.map((result) => result.trace.map((step) => step.lineNumber)), [[1, 3, 4, 5], [1, 3, 4, 6, 8, 9], [1, 3, 4, 6, 8, 10, 11]]);
});

test("for-loop inspection groups repeated trace lines into iterations", async () => {
  const script = `
    import { inspectForLoopExecution } from './components/learning/if-statement-inspector.ts';
    const code = 'count = 3\\n\\nfor sensor in range(1, count + 1):\\n    print("Checking Sensor", sensor)';
    const variable = (name, value) => ({ name, value: String(value), type: 'int' });
    const trace = [
      { lineNumber: 1, variables: [variable('count', 3)], output: '' },
      { lineNumber: 3, variables: [variable('count', 3), variable('sensor', 1)], output: '' },
      { lineNumber: 4, variables: [variable('count', 3), variable('sensor', 1)], output: 'Checking Sensor 1' },
      { lineNumber: 3, variables: [variable('count', 3), variable('sensor', 2)], output: 'Checking Sensor 1' },
      { lineNumber: 4, variables: [variable('count', 3), variable('sensor', 2)], output: 'Checking Sensor 1\\nChecking Sensor 2' },
      { lineNumber: 3, variables: [variable('count', 3), variable('sensor', 3)], output: 'Checking Sensor 1\\nChecking Sensor 2' },
      { lineNumber: 4, variables: [variable('count', 3), variable('sensor', 3)], output: 'Checking Sensor 1\\nChecking Sensor 2\\nChecking Sensor 3' },
      { lineNumber: 3, variables: [variable('count', 3), variable('sensor', 3)], output: 'Checking Sensor 1\\nChecking Sensor 2\\nChecking Sensor 3' },
    ];
    console.log(JSON.stringify(inspectForLoopExecution(code, { status: 'success', output: trace.at(-1).output, error: null, trace })));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.variable, "sensor");
  assert.equal(result.sequence, "range(1, count + 1)");
  assert.deepEqual(result.iterations.map((item) => item.value), ["1", "2", "3"]);
  assert.deepEqual(result.iterations.map((item) => item.output), ["Checking Sensor 1", "Checking Sensor 2", "Checking Sensor 3"]);
  assert.equal(result.completed, true);
});

test("Lesson 2.7 playground executes and traces every requested sensor", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'count = int(input("Enter Number of Sensors: "))\n\nfor sensor in range(1, count + 1):\n    print("Checking Sensor", sensor)';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', true);
    const answers = runtime.toPy(['3']);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.error, null);
  assert.match(result.output, /Checking Sensor 1\nChecking Sensor 2\nChecking Sensor 3$/);
  assert.deepEqual(result.trace.map((step) => step.lineNumber), [1, 3, 4, 3, 4, 3, 4, 3]);
});

test("while-loop inspection groups state updates and detects unsafe termination", async () => {
  const script = `
    import { analyzeWhileLoopSafety, inspectWhileLoopExecution } from './components/learning/if-statement-inspector.ts';
    const code = 'soil = 26\\n\\nwhile soil < 30:\\n    print("Motor Running...")\\n    soil += 2\\n    print("Current Moisture:", soil)\\n\\nprint("Motor OFF")';
    const variable = (name, value) => ({ name, value: String(value), type: 'int' });
    const trace = [
      { lineNumber: 1, variables: [variable('soil', 26)], output: '' },
      { lineNumber: 3, variables: [variable('soil', 26)], output: '' },
      { lineNumber: 4, variables: [variable('soil', 26)], output: 'Motor Running...' },
      { lineNumber: 5, variables: [variable('soil', 28)], output: 'Motor Running...' },
      { lineNumber: 6, variables: [variable('soil', 28)], output: 'Motor Running...\\nCurrent Moisture: 28' },
      { lineNumber: 3, variables: [variable('soil', 28)], output: 'Motor Running...\\nCurrent Moisture: 28' },
      { lineNumber: 4, variables: [variable('soil', 28)], output: 'Motor Running...\\nCurrent Moisture: 28\\nMotor Running...' },
      { lineNumber: 5, variables: [variable('soil', 30)], output: 'Motor Running...\\nCurrent Moisture: 28\\nMotor Running...' },
      { lineNumber: 6, variables: [variable('soil', 30)], output: 'Motor Running...\\nCurrent Moisture: 28\\nMotor Running...\\nCurrent Moisture: 30' },
      { lineNumber: 3, variables: [variable('soil', 30)], output: 'Motor Running...\\nCurrent Moisture: 28\\nMotor Running...\\nCurrent Moisture: 30' },
      { lineNumber: 8, variables: [variable('soil', 30)], output: 'Motor Running...\\nCurrent Moisture: 28\\nMotor Running...\\nCurrent Moisture: 30\\nMotor OFF' },
    ];
    const inspection = inspectWhileLoopExecution(code, { status: 'success', output: trace.at(-1).output, error: null, trace });
    const safe = analyzeWhileLoopSafety(code);
    const missing = analyzeWhileLoopSafety('count = 1\\nwhile count <= 5:\\n    print(count)');
    const ineffective = analyzeWhileLoopSafety('soil = 20\\nwhile soil < 30:\\n    soil = soil');
    const wrongDirection = analyzeWhileLoopSafety('soil = 20\\nwhile soil < 30:\\n    soil -= 2');
    console.log(JSON.stringify({ inspection, safe, missing, ineffective, wrongDirection }));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.inspection.variable, "soil");
  assert.deepEqual(result.inspection.iterations.map((item) => [item.beforeValue, item.afterValue]), [["26", "28"], ["28", "30"]]);
  assert.equal(result.inspection.completed, true);
  assert.equal(result.inspection.finalValue, "30");
  assert.equal(result.safe.severity, "safe");
  assert.equal(result.missing.severity, "danger");
  assert.equal(result.ineffective.severity, "danger");
  assert.equal(result.wrongDirection.severity, "danger");
});

test("Lesson 2.8 playground stops at target moisture and exposes every condition check", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'soil = int(input("Enter Soil Moisture (%): "))\n\nwhile soil < 30:\n    print("Motor Running...")\n    soil += 2\n    print("Current Moisture:", soil)\n\nprint("Target Moisture Reached")\nprint("Motor OFF")';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', true);
    const answers = runtime.toPy(['26']);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.error, null);
  assert.match(result.output, /Current Moisture: 28[\s\S]*Current Moisture: 30[\s\S]*Target Moisture Reached[\s\S]*Motor OFF$/);
  assert.deepEqual(result.trace.map((step) => step.lineNumber), [1, 3, 4, 5, 6, 3, 4, 5, 6, 3, 8, 9]);
});

test("loop-control inspection distinguishes normal, continue, and break iterations", async () => {
  const script = `
    import { inspectLoopControlExecution } from './components/learning/if-statement-inspector.ts';
    const code = 'for sensor in range(1, 21):\\n    if sensor == 7:\\n        continue\\n    if sensor == 15:\\n        print("Critical Fault")\\n        break\\n    print("Checking Sensor", sensor)';
    const variable = (value) => ({ name: 'sensor', value: String(value), type: 'int' });
    const trace = [
      { lineNumber: 1, variables: [variable(1)], output: '' },
      { lineNumber: 2, variables: [variable(1)], output: '' },
      { lineNumber: 4, variables: [variable(1)], output: '' },
      { lineNumber: 7, variables: [variable(1)], output: 'Checking Sensor 1' },
      { lineNumber: 1, variables: [variable(7)], output: 'Checking Sensor 1' },
      { lineNumber: 2, variables: [variable(7)], output: 'Checking Sensor 1' },
      { lineNumber: 3, variables: [variable(7)], output: 'Checking Sensor 1' },
      { lineNumber: 1, variables: [variable(15)], output: 'Checking Sensor 1' },
      { lineNumber: 2, variables: [variable(15)], output: 'Checking Sensor 1' },
      { lineNumber: 4, variables: [variable(15)], output: 'Checking Sensor 1' },
      { lineNumber: 5, variables: [variable(15)], output: 'Checking Sensor 1\\nCritical Fault' },
      { lineNumber: 6, variables: [variable(15)], output: 'Checking Sensor 1\\nCritical Fault' },
    ];
    console.log(JSON.stringify(inspectLoopControlExecution(code, { status: 'success', output: trace.at(-1).output, error: null, trace })));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--experimental-strip-types", "--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.variable, "sensor");
  assert.deepEqual(result.iterations.map((item) => item.action), ["none", "continue", "break"]);
  assert.deepEqual(result.iterations.map((item) => item.value), ["1", "7", "15"]);
  assert.equal(result.terminatedEarly, true);
});

test("Lesson 2.9 playground skips maintenance and stops at the critical sensor", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const program = 'for sensor in range(1, 21):\n    if sensor == 7:\n        continue\n    if sensor == 15:\n        print("Critical Fault")\n        break\n    print("Checking Sensor", sensor)';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', false);
    const answers = runtime.toPy([]);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.error, null);
  assert.doesNotMatch(result.output, /Checking Sensor 7/);
  assert.match(result.output, /Checking Sensor 14\nCritical Fault$/);
  assert.doesNotMatch(result.output, /Checking Sensor 16/);
  assert.equal(result.trace.filter((step) => step.lineNumber === 3).length, 1);
  assert.equal(result.trace.filter((step) => step.lineNumber === 6).length, 1);
});

test("Module 2 capstone executes every farm module and exits cleanly", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const packSource = await readFile(new URL("content/development-packs/lesson-2-10.ts", projectRoot), "utf8");
  const rawProgram = packSource.match(/export const smartFarmConsoleProgram = `([\s\S]*?)`;\n/)?.[1];
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawProgram, "capstone program should be present");
  assert.ok(rawWrapper, "trace wrapper should be present");
  const program = Function(`return \`${rawProgram}\`;`)();
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const inputs = ["1", "10", "2", "38", "20", "3", "Rice", "4", "10", "5", "8", "5", "20", "6"];
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', ${JSON.stringify(program)});
    globals.set('__di_has_inputs', true);
    const answers = runtime.toPy(${JSON.stringify(inputs)});
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.error, null);
  assert.match(result.output, /Emergency Irrigation/);
  assert.match(result.output, /Immediate Irrigation/);
  assert.match(result.output, /Water: Standing water \| Fertilizer: Nitrogen/);
  assert.match(result.output, /Skipping Faulty Sensor 5/);
  assert.match(result.output, /Critical Fault at Sensor 8/);
  assert.match(result.output, /Motor OFF at 30\.0/);
  assert.match(result.output, /Exiting Smart Farm Automation$/);
  assert.ok(result.trace.length < 250);
});

test("Module 2 capstone navigation stays within responsive grid tracks", async () => {
  const [blocksSource, stylesSource] = await Promise.all([
    readFile(new URL("components/learning/ControlFlowCapstoneLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);

  assert.match(blocksSource, /className="module-nav-number"/);
  assert.match(blocksSource, /className="module-nav-label"/);
  assert.match(stylesSource, /\.capstone-module-navigator \.cds--btn \{[^}]*width: 100%;[^}]*min-width: 0;[^}]*overflow: hidden;/s);
  assert.match(stylesSource, /\.console-field-grid \{[^}]*repeat\(auto-fit,minmax\(min\(14rem,100%\),1fr\)\)/s);
});

test("Python trace runtime captures post-line variables, output, and errors", async () => {
  const workerSource = await readFile(new URL("components/learning/python.worker.ts", projectRoot), "utf8");
  const rawWrapper = workerSource.match(/if \(data\.trace\)[\s\S]*?code = `([\s\S]*?)`;\n\s*} else if/)?.[1];
  assert.ok(rawWrapper, "trace wrapper should be present");
  const wrapper = Function(`return \`${rawWrapper}\`;`)();
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    const globals = runtime.toPy({});
    globals.set('__di_user_code', 'temperature = "31.5"\\ntemperature = float(temperature)\\nprint(temperature)');
    globals.set('__di_has_inputs', false);
    const answers = runtime.toPy([]);
    globals.set('__di_input_values', answers);
    answers.destroy();
    const result = JSON.parse(String(await runtime.runPythonAsync(${JSON.stringify(wrapper)}, { globals })));
    globals.destroy();
    console.log(JSON.stringify(result));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  const result = JSON.parse(stdout);
  assert.equal(result.error, null);
  assert.equal(result.output, "31.5");
  assert.equal(result.trace.length, 3);
  assert.deepEqual(result.trace[0].variables, [{ name: "temperature", value: "'31.5'", type: "str" }]);
  assert.deepEqual(result.trace[1].variables, [{ name: "temperature", value: "31.5", type: "float" }]);
  assert.equal(result.trace[2].output, "31.5");
});

test("production build includes the self-hosted Python runtime", async () => {
  const runtimeAssets = ["pyodide-lock.json", "pyodide.mjs", "pyodide.asm.mjs", "pyodide.asm.wasm", "python_stdlib.zip"];
  for (const asset of runtimeAssets) {
    const file = await readFile(new URL(`dist/pyodide/${asset}`, projectRoot));
    assert.ok(file.byteLength > 1_000, `${asset} should be included in the production build`);
  }
});

test("Module 4 publishes Why Collections and exposes the complete collection roadmap", async () => {
  const [moduleSource, courseSource, lessonsSource] = await Promise.all([
    readFile(new URL("content/module-4.ts", projectRoot), "utf8"),
    readFile(new URL("content/course-framework.ts", projectRoot), "utf8"),
    readFile(new URL("content/lessons.ts", projectRoot), "utf8"),
  ]);
  assert.match(moduleSource, /id: "module-4-lesson-1"[\s\S]*isPlaceholder: false/);
  assert.equal((moduleSource.match(/id: "module-4-lesson-/g) ?? []).length, 13);
  assert.match(moduleSource, /4\.10 Smart Farm Data Management Capstone/);
  assert.match(courseSource, /title: "Python Collections"/);
  assert.match(courseSource, /moduleIndex === 4[\s\S]*moduleFourLessonSummaries/);
  assert.match(lessonsSource, /\.\.\.moduleFourLessons/);
});

test("Lesson 4.1 remains concept-only while providing all required interactive tools", async () => {
  const [packSource, moduleSource, blocksSource, rendererSource, stylesSource] = await Promise.all([
    readFile(new URL("content/development-packs/lesson-4-1.ts", projectRoot), "utf8"),
    readFile(new URL("content/module-4.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/WhyCollectionsLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/WhyCollectionsLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);
  assert.match(packSource, /kind: "why-collections"/);
  assert.match(blocksSource, /VariableExplosionSimulator/);
  assert.match(blocksSource, /DataOrganizationComparator/);
  assert.match(blocksSource, /ScaleSimulator/);
  assert.match(blocksSource, /CollectionPreviewTimeline/);
  assert.match(rendererSource, /validateConceptOnlyCode/);
  assert.match(rendererSource, /collection syntax and iteration begin in later lessons/);
  assert.doesNotMatch(moduleSource.match(/starterCode: "([\s\S]*?)",\n\s*expectedOutcome/)?.[1] ?? "", /\[|\]|\{|\}|for |while /);
  assert.match(stylesSource, /@media \(max-width: 42rem\)[\s\S]*why-collections-development-pack/);
});

test("Lesson 4.2 publishes focused List fundamentals and separates built-ins from methods", async () => {
  const [moduleSource, packSource, blocksSource, rendererSource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-4.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-4-2.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/PythonListsLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/PythonListsLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);
  assert.match(moduleSource, /id: "module-4-lesson-2"[\s\S]*developmentPack: pythonListsDevelopmentPack/);
  assert.match(moduleSource, /id: "module-4-lesson-2"[\s\S]*isPlaceholder: false/);
  assert.match(packSource, /kind: "python-lists"/);
  assert.match(blocksSource, /function ListVisualizer/);
  assert.match(blocksSource, /function ListAnatomyExplorer/);
  assert.match(blocksSource, /function MutabilitySimulator/);
  assert.match(blocksSource, /function BuiltInFunctionExplorer/);
  assert.match(blocksSource, /Python built-in functions/);
  assert.match(blocksSource, /List methods/);
  assert.match(rendererSource, /Negative indexing begins in Lesson 4\.3/);
  assert.match(rendererSource, /List methods are preview-only/);
  assert.match(rendererSource, /This built-in is preview-only/);
  assert.match(stylesSource, /@media \(max-width: 42rem\)[\s\S]*python-lists-development-pack/);
});

test("Lesson 4.2 default List program produces the expected fundamentals", async () => {
  const program = 'moisture = [25, 30, 28, 29, 31]\nprint(moisture)\nprint(moisture[0])\nprint(len(moisture))\nprint(max(moisture))\nprint(min(moisture))';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    await runtime.runPythonAsync('import io, sys\\n__out = io.StringIO()\\nsys.stdout = __out');
    await runtime.runPythonAsync(${JSON.stringify(program)});
    console.log(JSON.stringify(String(runtime.runPython('__out.getvalue()'))));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  assert.equal(JSON.parse(stdout), "[25, 30, 28, 29, 31]\n25\n5\n31\n25\n");
});

test("Lesson 4.3 completes essential List operations and restructures the Module 4 roadmap", async () => {
  const [moduleSource, packSource, blocksSource, rendererSource, stylesSource] = await Promise.all([
    readFile(new URL("content/module-4.ts", projectRoot), "utf8"),
    readFile(new URL("content/development-packs/lesson-4-3.ts", projectRoot), "utf8"),
    readFile(new URL("components/learning/WorkingWithListsLearningBlocks.tsx", projectRoot), "utf8"),
    readFile(new URL("components/learning/WorkingWithListsLessonRenderer.tsx", projectRoot), "utf8"),
    readFile(new URL("src/styles/globals.scss", projectRoot), "utf8"),
  ]);
  assert.match(moduleSource, /id: "module-4-lesson-3"[\s\S]*developmentPack: workingWithListsDevelopmentPack/);
  assert.match(moduleSource, /4\.4 Tuples/);
  assert.match(moduleSource, /4\.5 Sets/);
  assert.match(moduleSource, /4\.6 Dictionaries/);
  assert.match(moduleSource, /4\.9 Collections in Real-World Applications/);
  assert.match(packSource, /kind: "working-with-lists"/);
  for (const method of ["append", "insert", "extend", "remove", "pop", "clear", "index", "count", "sort", "reverse", "copy"]) assert.match(packSource, new RegExp(`name: "${method}"`));
  for (const builtIn of ["len", "max", "min", "sum", "sorted", "reversed", "any", "all"]) assert.match(packSource, new RegExp(`name: "${builtIn}"`));
  assert.match(blocksSource, /function AdvancedListVisualizer/);
  assert.match(blocksSource, /function SliceExplorer/);
  assert.match(blocksSource, /function MethodPlayground/);
  assert.match(blocksSource, /function BuiltInFunctionDashboard/);
  assert.match(blocksSource, /draggable=\{Boolean\(onReorder\)\}/);
  assert.match(blocksSource, /Operation Timeline/);
  assert.match(rendererSource, /List comprehensions are outside Lesson 4\.3/);
  assert.match(rendererSource, /Nested Lists and 2D matrices are outside Lesson 4\.3/);
  assert.match(rendererSource, /Advanced sorting with key begins later/);
  assert.match(stylesSource, /@media \(max-width: 42rem\)[\s\S]*working-with-lists-development-pack/);
});

test("Lesson 4.3 default program manages and summarizes the moisture List", async () => {
  const program = 'moisture = [25, 30, 28, 29, 31]\nprint(moisture[-1])\nprint(moisture[1:4])\nmoisture.append(40)\nmoisture.remove(28)\nprint(sorted(moisture))\nprint(sum(moisture))';
  const script = `
    import { loadPyodide } from 'pyodide';
    const runtime = await loadPyodide();
    await runtime.runPythonAsync('import io, sys\\n__out = io.StringIO()\\nsys.stdout = __out');
    await runtime.runPythonAsync(${JSON.stringify(program)});
    console.log(JSON.stringify(String(runtime.runPython('__out.getvalue()'))));
  `;
  const { stdout } = await execFileAsync(process.execPath, ["--input-type=module", "-e", script], { cwd: projectRoot });
  assert.equal(JSON.parse(stdout), "31\n[30, 28, 29]\n[25, 29, 30, 31, 40]\n155\n");
});

test("Vercel serves client routes through the Vite application shell", async () => {
  const config = JSON.parse(await readFile(new URL("vercel.json", projectRoot), "utf8"));
  assert.equal(config.framework, "vite");
  assert.deepEqual(config.rewrites, [{ source: "/(.*)", destination: "/index.html" }]);
});
