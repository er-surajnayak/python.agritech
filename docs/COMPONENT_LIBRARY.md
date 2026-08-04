# Component Library (COMPONENT_LIBRARY.md)

This library catalogs the reusable React components in the Digital Interactive Notes platform. Developers should refer to this library before creating new UI controls or visualizers.

---

## 1. Layout & Navigation Components

### `AppShell`
- **Purpose**: Top-level page container providing common shell structures (app header, logo, theme toggle button, responsive menu handles, page content container).
- **Props**:
  - `children`: `ReactNode` (active page component).
- **Reusability**: Wrapped globally in `App.tsx` around all routes.
- **Future Reuse**: Automatically applies to all future page additions.

### `Link`
- **Purpose**: Intercepts standard anchor click events, updates window pathname state using `window.history.pushState`, and scrolls smoothly to target elements when hashes are supplied.
- **Props**: Extends `AnchorHTMLAttributes<HTMLAnchorElement>`.
- **Reusability**: Shared globally for all internal navigation, sidebar nodes, and buttons.
- **Future Reuse**: Standard router element for any new page links.

### `CourseLayout`
- **Purpose**: Lesson workspace container wrapping the course navigation sidebar and page contents side-by-side.
- **Props**:
  - `course`: `CourseDefinition` (metadata, modules structure).
  - `currentLessonId`: `string` (currently active lesson).
  - `children`: `ReactNode`.
- **Reusability**: Wrapped around `CourseWorkspacePage` and `LessonRenderer` pages.
- **Future Reuse**: Standard shell for all future lessons (Module 4 through Module 10).

### `CourseNavigation`
- **Purpose**: Sidebar list displaying module chapters, expandable lesson menus inside accordions, progress tags, and overall statistics.
- **Props**:
  - `course`: `CourseDefinition`.
  - `currentLessonId`: `string` (optional).
- **Reusability**: Shared across all course page sidebars.
- **Future Reuse**: Renders future modules and lessons automatically as they are registered in the framework.

### `CourseProgress`
- **Purpose**: Renders visual indicator bars displaying lesson completion ratios.
- **Props**:
  - `course`: `CourseDefinition`.
  - `compact`: `boolean` (optional, compact format for sidebar).
- **Reusability**: Embedded inside `CourseNavigation` and overview dashboards.
- **Future Reuse**: Reused globally to display course-wide and module-specific progress percentages.

### `CourseBreadcrumb`
- **Purpose**: Renders Carbon breadcrumb controls mapping current module and lesson paths.
- **Props**:
  - `module`: `CourseModule` (parent module details).
  - `lesson`: `CourseLesson` (current lesson details).
- **Reusability**: Standard header in `CourseWorkspacePage` and custom lesson renderers.
- **Future Reuse**: Place at the top of every new lesson workspace.

### `CourseIcon`
- **Purpose**: Maps icon identifier names to their corresponding `@carbon/icons-react` components.
- **Props**:
  - `name`: `LessonVisualIcon` (e.g. `"farmer"`, `"drone"`, `"sensor"`, `"visualize"`).
  - `size`: `number` (pixel size).
- **Reusability**: Utilized globally in module headings and navigations.
- **Future Reuse**: Standard mapper for assigning visual cues to new modules.

### `PreviousNextNavigation`
- **Purpose**: Standard bottom page footer displaying navigation arrows to adjacent pages.
- **Props**:
  - `previous`: `CourseLesson | null` (previous lesson link).
  - `next`: `CourseLesson | null` (next lesson link).
- **Reusability**: Mounts at the footer of all lesson views.
- **Future Reuse**: Place at the bottom of every new lesson layout.

---

## 2. Core Educational Cards (`LearningBlocks.tsx`)

### `LessonContentCard`
- **Purpose**: Displays text sections with descriptive helper labels, titles, content paragraphs, and bullet points.
- **Props**:
  - `id`: `string`.
  - `label`: `string` (top caption).
  - `section`: `LessonTextSection` (wrapping title, body, and optional list items).
  - `tone`: `"blue" | "green" | "purple" | "teal" | "gray"` (determines layout colors).
  - `icon`: `typeof Education` (icon header).
- **Reusability**: Default content builder across all lessons.
- **Future Reuse**: General block for text instruction.

### `LearningObjectivesCard`
- **Purpose**: Renders the double-digit numbered checklist items containing outcomes.
- **Props**:
  - `id`: `string`.
  - `objectives`: `string[]` (list of goals).
- **Reusability**: Appears first in all lessons.
- **Future Reuse**: Required block for all future lessons.

### `IndustryInsightCard`
- **Purpose**: Renders developer insights with Carbon bulb indicators.
- **Props**:
  - `id`: `string`.
  - `section`: `LessonTextSection & { signal: string }` (explanations and alerts).
- **Reusability**: Common industry section in all renderers.
- **Future Reuse**: Explains real-world applications of programming concepts.

### `PracticeCard`
- **Purpose**: Renders level tabs (Easy, Medium, Challenge) detailing practice prompts, and hides hints inside collapsible guidance accordions.
- **Props**:
  - `id`: `string`.
  - `tasks`: `PracticeTask[]` (levels, prompts, guidance text).
- **Reusability**: Included in all standard lessons.
- **Future Reuse**: Standard practice engine for coding tasks.

### `QuizCard`
- **Purpose**: Displays interactive multiple-choice questions, validates choices dynamically, and reports scoring outcomes.
- **Props**:
  - `id`: `string`.
  - `quiz`: `QuizPlaceholderContent | QuizPlaceholderContent[]` (questions, options, correct answers, explanations).
- **Reusability**: Placed at the end of lessons to review concepts.
- **Future Reuse**: General assessment module for checking retention.

### `AssignmentCard`
- **Purpose**: Outlines concrete checklist deliverables for homework tasks.
- **Props**:
  - `id`: `string`.
  - `assignment`: `AssignmentContent` (title, brief description, deliverables).
- **Reusability**: Capstone and review assignments card.
- **Future Reuse**: Direct deliverable checklists.

---

## 3. Playgrounds & Code Tracers

### `CodePlayground`
- **Purpose**: Sandboxed playground executing Python inside web worker runtimes. Supports code blocking hooks (`validateCode`), and allows visual supplements to hook in below via `renderSupplement`.
- **Props**:
  - `id`: `string`.
  - `content`: `PlaygroundContent` (starter code, expectations).
  - `className`: `string` (optional).
  - `renderSupplement`: `(code: string, execution: PlaygroundExecution) => ReactNode` (optional supplement callback).
  - `inputValues`: `string[]` (optional predefined simulated inputs).
  - `outputLabel`: `string` (defaults to "Output").
  - `traceExecution`: `boolean` (optional tracer flag).
  - `validateCode`: `(code: string) => string | null` (optional block handler).
- **Reusability**: Interactive playground across the platform.
- **Future Reuse**: Embedded in all programming lessons (Lists, Tuples, Sets, Dictionaries).

### `CodeTracePanel`
- **Purpose**: Interactive debugger stepping line-by-line through Python executions, showing variable updates, local stack frames, type tags, and console stdout snapshots.
- **Props**:
  - `execution`: `PlaygroundExecution` (trace steps array, execution status).
- **Reusability**: Used in operators, problem-solving, and loop control lessons.
- **Future Reuse**: Highly valuable debugging block for tracing control flows, functions, recursions, and dictionary keys lookups.

---

## 4. Visualizers & Simulators

### `ListVisualizer`
- **Purpose**: Displays arrays horizontally inside scrollable blocks. Elements render as styled buttons displaying both zero-based indexes and physical count positions.
- **Props**:
  - `name`: `string` (list name).
  - `values`: `ListValue[]` (elements).
  - `selectedIndex`: `number | null` (active highlighted item).
  - `onSelect`: `(index: number) => void` (optional selection handler).
- **Reusability**: Lists and tuples lessons.
- **Future Reuse**: Can render dictionary values arrays, stacks, queues, or 2D matrix rows.

### `ListAnatomyExplorer`
- **Purpose**: Interactive explorer displaying zero-based indices. Toggling item indices prints the matching evaluation expression (e.g. `location[index]`).
- **Props**:
  - `anatomy`: `Pack["anatomy"]` (values, list name).
  - `indexing`: `Pack["indexing"]` (examples list).
- **Reusability**: First lists lesson (4.2).
- **Future Reuse**: Can map tuple elements and set elements conversions.

### `MutabilitySimulator`
- **Purpose**: Visualizes mutability. Lets users select indices, input new values, and run replacements. Changes flash in-place inside the array representation.
- **Props**:
  - `content`: `Pack["mutability"]` (before values, initial index, replacement).
- **Reusability**: Used to demonstrate mutability in Lists (4.2).
- **Future Reuse**: Can demonstrate in-place additions and updates in sets and dictionaries.

### `SliceExplorer`
- **Purpose**: Lets users input start/stop range indexes to isolate subsets of lists, displaying boundaries and highlighting matching slices.
- **Props**:
  - `content`: `Pack["indexing"]` (slicing examples).
- **Reusability**: Used in Working with Lists (4.3).
- **Future Reuse**: Applicable to any sequence type supporting slice syntax (tuples, string buffers).

### `SetVisualizer`
- **Purpose**: Renders elements inside set braces `{ ... }` as chips. Rejects duplicate inputs by triggering error bounce animations.
- **Props**: None (maintains local element states).
- **Reusability**: Unique collections lesson (4.5).
- **Future Reuse**: Visualizing unique records, filtered data, or set method targets (add, remove).

### `DuplicateEliminator`
- **Purpose**: Flow animation simulating values sorting through a queue pipeline (Incoming value -> Uniqueness checks -> Accept/Reject bins).
- **Props**: None.
- **Reusability**: Sets lesson (4.5).
- **Future Reuse**: Visualizing filtering pipelines, queue mechanics, or unique transaction registries.

### `SetOperationsVisualizer`
- **Purpose**: Real-time Venn Diagram (Circles A and B with overlap) highlighting union (`A | B`), intersection (`A & B`), difference (`A - B`), and symmetric difference (`A ^ B`).
- **Props**:
  - `farmA`: `number[]`.
  - `farmB`: `number[]`.
  - `rows`: `Pack["operations"]["rows"]` (code examples, outputs, descriptions).
- **Reusability**: Sets operations (4.5).
- **Future Reuse**: Demonstrating joining queries, overlapping metadata filters, or database key unions.

### `MembershipExplorer`
- **Purpose**: Displays lookups using the `in` operator. Highlights positive/negative lookup steps on sets with flash or shake effects.
- **Props**: None.
- **Reusability**: Sets lesson (4.5).
- **Future Reuse**: Demonstrating dictionary keys lookups, tuple scans, and O(1) versus O(N) search comparisons.

### `CollectionDecisionTree`
- **Purpose**: Step-by-step interactive questionnaire helping developers select the correct collection: Variables, Lists, Tuples, Sets, or Dictionaries.
- **Props**: None.
- **Reusability**: Added in Sets (4.5).
- **Future Reuse**: Essential helper component in Lessons 4.5 through 4.10, showing side-by-side data design solutions.

### `WorkflowAnimation`
- **Purpose**: Manages and animates step-by-step logic workflows (e.g. how lists are resized, variables swapped).
- **Props**:
  - `id`: `string`.
  - `title`: `string`.
  - `description`: `string`.
  - `steps`: `WorkflowStep[]` (titles, descriptions).
- **Reusability**: Built-ins, algorithms, and logical lessons.
- **Future Reuse**: Visualizing list resizing, dictionary hash indexing, or database transactions.

### `DictionaryVisualizer`
- **Purpose**: Interactive dictionary visualizer showing active key-value mappings. Supports selector rows, type inspections, dynamic key additions/updates, and key deletion.
- **Props**: None (maintains internal telemetry state).
- **Reusability**: Dictionaries lesson (4.6).
- **Future Reuse**: Demonstrating object modeling, database record modifications, and API telemetry mapping.

### `FunctionExplorer` (Collection Operations Edition)
- **Purpose**: Interactive tool executing Python built-in functions (`len()`, `max()`, `min()`, `sum()`, `sorted()`, `reversed()`, `any()`, `all()`) simultaneously across List, Tuple, Set, and Dictionary parallel cards.
- **Props**: `builtIns: Pack["builtIns"]`.
- **Reusability**: Collection Operations lesson (4.7).
- **Future Reuse**: Demonstrating polymorphic built-in functions across data structures, NumPy arrays, and pandas Series.

### `MethodExplorer` (Collection Operations Edition)
- **Purpose**: Dynamic method inspector allowing learners to select a collection type (List, Tuple, Set, Dictionary) and method, displaying signatures and behavioral breakdowns.
- **Props**: `methodsSummary: Pack["methodsSummary"]`.
- **Reusability**: Collection Operations lesson (4.7).
- **Future Reuse**: General type methods reference dashboard.

---

## 5. Summary and Future Guidelines
When creating new lessons (e.g. Lesson 4.8 Solved Programming Questions: List + Tuple), developers should prioritize **reusing existing blocks** from section 2, mapping coding workspaces to **`CodePlayground`** (section 3), and building custom visualizers by subclassing or modeling components from **section 4**.
