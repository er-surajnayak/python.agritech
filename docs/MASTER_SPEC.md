# Project Master Specification (MASTER_SPEC.md)

This document serves as the permanent project specification for the **Digital Interactive Notes** platform. Future prompts and agents can reference this specification to ensure architectural, styling, and design consistency across all module additions and lesson creations without repeating instructions.

---

## 1. Project Overview

### Purpose
The platform delivers high-fidelity, interactive, and data-driven educational content for learning programming. It combines structured textbook narrative, diagnostic sandboxes, and visual simulations.

### Educational Philosophy
- **Concept-First**: Concrete problem stories precede code syntax.
- **Active Learning**: Students learn through modification, real-time code executions, and interactive visual supplements.
- **Diagnostic Feedback**: Immediate, clean errors guide correction rather than silent failures.
- **Immediate Contextualization**: Lessons conclude with industry relevance, think-like-an-engineer prompts, and guided practice.

### Target Audience
Beginner programmers, agricultural technology professionals, and students looking for hands-on programming experience.

### Agritech Context
All lessons are situated in a **Smart Farm** context. Examples, story problems, datasets, and visualizations model real-world farming telemetry:
- Telemetry readings (soil moisture, temperature, pH levels, humidity, air quality).
- Automated systems (irrigation controllers, gateway routers, drone inspection logs).
- Data grouping (barn sensor registries, crop rotations, field coordinate maps).

---

## 2. Technology Stack

- **Core**: React 19 (`react`, `react-dom`) and TypeScript (`typescript`).
- **Build Tool**: Vite 8 (`vite`).
- **CSS Preprocessor**: Sass (`sass`).
- **UI Components**: IBM Carbon Design System (`@carbon/react` for UI widgets, forms, accordions, number inputs, tabs).
- **Icons**: IBM Carbon Icons (`@carbon/icons-react`).
- **Python Execution Engine**: Self-hosted [Pyodide](https://pyodide.org/) (v314.0.3) running inside a background Web Worker (`python.worker.ts`). Captures program stdout, stderr, execution traces, simulated inputs, and code exceptions in real time.
- **Animations**: Highly optimized, hardware-accelerated pure CSS transitions and keyframes (`@keyframes`) for maximum rendering performance, minimizing bundle size and execution latency.

---

## 3. Project Architecture

### Folder Structure
The repository strictly adheres to the following organization:

```text
├── components/                     # React UI Components
│   ├── course/                     # Navigation sidebar, course layouts, progress indicators
│   ├── learning/                   # Educational cards, playgrounds, visualizers, decision tree
│   ├── navigation/                 # AppShell header, client-side custom router
│   ├── pages/                      # Page containers (Overview, Workspace, Assignments, Modules)
│   └── providers/                  # Context providers (Pathname, Pyodide runtimes)
├── content/                        # Curriculum Database & Data Configs
│   ├── development-packs/          # Data parameters, debug logs, exercises, and examples
│   ├── course-framework.ts         # Course framework declaration (modules, lessons, progress)
│   ├── course.ts                   # Page route definition mappings
│   ├── lessons.ts                  # Published lessons list resolver
│   └── module-X.ts                 # Module curriculum data containing quiz and practices
├── docs/                           # Platform Documentation
│   └── MASTER_SPEC.md              # This Master Specification file
├── public/                         # Static Assets (Pyodide source files, Web Worker assets)
├── src/                            # Entry points & Global styles
│   ├── App.tsx                     # Top-level client router and route manager
│   ├── main.tsx                    # React mount declaration
│   └── styles/
│       └── globals.scss            # Global style sheet containing all lesson-specific rules
├── tests/                          # Integration testing suites
│   └── rendered-html.test.mjs      # Playwright/Pyodide node runner validation script
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies & Script definitions
```

### Routing & Client Router
- A custom, lightweight router handles rendering based on path names (`App.tsx`).
- `<Link>` (`components/navigation/client-router.tsx`) overrides standard anchor tags, triggers `PopStateEvent`, pushes history state, and performs smooth scrolling when navigating to page hashes.
- Pathname state is consumed via `usePathname` (`components/navigation/usePathname.ts`).

### Lesson Architecture
- Each lesson is defined as a structured metadata object (`LessonDocument`) in the curriculum database (`content/module-X.ts`).
- Lessons are linked to a **Development Pack** (inside `content/development-packs/`) containing structured story narratives, creation examples, methods, comparisons, agritech telemetry arrays, and interactive debug code solutions.
- Renders via `LessonRenderer.tsx` which dispatches to lesson-specific components (`SetsLessonRenderer`, `TupleLessonRenderer`, etc.) when custom visualizations are defined.

---

## 4. Reusable Educational Components

The following core components in `components/learning/` must be reused to maintain continuity:

| Component | Purpose / Design |
| --- | --- |
| `LessonHero` | Header section showing module coordinates, lesson title, description, tags (Difficulty, Duration), and prerequisites. |
| `LearningObjectivesCard` | Shows numerical, double-digit numbered checklist items (e.g. `01`, `02`) of the learning outcomes. |
| `IndustryInsightCard` | Tile card with a lightbulb icon highlighting why developers care about this concept in the industry. |
| `CodePlayground` | Contains code text area, run/reset buttons, live console output box, and hooks into `renderSupplement` for live visualizers. |
| `PracticeCard` | Carbon tabs sorting Easy, Medium, and Challenge tasks. Each task expands to show guidance hints using an accordion. |
| `QuizCard` | Interactive radio buttons assessing learning retention. Shows immediate green/red success states upon submit. |
| `AssignmentCard` | Structured bullet lists outlining concrete deliverables students must submit. |
| `SummaryCard` | Concluding takeaways, outlining items learned. |
| `WhatsNextCard` | Teasers explaining the next lesson. |
| `CollectionDecisionTree` | Interactive quiz wizard mapping the decision-making flow to help users choose between Variables, Lists, Tuples, Sets, and Dictionaries. |

---

## 5. Design System & Styling (globals.scss)

All components align to the **IBM Carbon Design System** using custom classes under their respective lesson namespace (e.g., `.sets-development-pack`):

### Color System & Themes
- Built-in support for **Dark** and **Light** modes. Standard variables:
  - Background layers: `var(--cds-layer-01)`, `var(--cds-layer-02)`.
  - Selected elements: `var(--cds-layer-selected-01)`, `var(--cds-layer-active-01)`.
  - Borders: `var(--cds-border-subtle-01)`, `var(--cds-border-strong-01)`.
  - Colors: Info (`var(--cds-support-info)`), Success (`var(--cds-support-success)`), Danger (`var(--cds-support-error)`).
  - Custom Lesson Accent variables (e.g. `--sets-accent: #8a3ffc`).

### Typography
- Headings: Bold, clean sans-serif hierarchy matching IBM Plex Sans.
- Code blocks and expressions: Monospace (`var(--cds-code-01-font-family)`).
- Variable chips: Rendered as rounded badges with styled code fonts.

### Spacing & Grid
- Standard spacing hierarchy (`1rem`, `1.5rem`, `2rem`).
- Visual blocks lay out in responsive multi-column formats on wide screens, folding cleanly into single columns on smaller mobile viewports.

### Responsive Breakpoints
- **`78rem`**: Sidebar shifts/hides to optimize outline navigation.
- **`62rem`**: Dual columns (e.g. sidebar selectors, flowchart trees) stack vertically.
- **`48rem`**: Tab headers and playground controls adjust for touch.
- **`42rem`**: Pipeline animations and 3-column rows fold into single-column flows.
- **`35rem`**: Compact spacing, buttons wrap to 100% width, and complex diagrams collapse.

---

## 6. Playground Standard

Interactive playgrounds must follow this baseline blueprint:
1. **Interactive Text Area**: Custom text area displaying starter code. Blocks execution if validation tests fail (e.g., trying to modify immutable tuples).
2. **Standard Console Output**: Displays standard output or trace messages. Reflects runner state (loading, running, success, error) via status tags.
3. **Synchronized Visualization Supplement**: Updates in real time under the code box.
   - For lists/tuples: displays horizontal arrays indexing every slot.
   - For sets: displays curly brace containers with active chips.
   - For dictionaries: displays table structures of keys and values.
4. **Step-by-step Trace Panel** (optional): Renders chronological execution lines, tracing how local variable values mutate over time.

---

## 7. Educational Animations & Timing

Custom visualizers use animations to make programmatic logic visible:
- **Duplicate Insertion Bounce**: Duplicate items added to sets trigger `animate-bounce-error` (`scale(1.15)` combined with a background error red highlight) to show rejection.
- **Set Insertion Slide**: Adding new unique elements triggers an `animate-added` fade and zoom-in, illustrating placement.
- **Pipeline Step Flow**: Values sliding through duplicate eliminator lanes use `animate-flow` (`translateY` transitions) timed with queue progression.
- **Error Feedback Shake**: Wrong choices or lookup failures trigger `animate-shake` (`translateX` offsets) to visually alert users.
- **Timing Standards**:
  - Micro-interactions (hovers, selections): `200ms` or `300ms` ease.
  - Interactive transitions (Venn updates, pipeline flows): `500ms` to `1200ms`.

---

## 8. Coding Standards

- **TypeScript Strictness**: Interfaces must explicitly define properties (e.g. `SetsDevelopmentPack`, `TupleDevelopmentPack`). Never use `any`.
- **Absolute / Alias Imports**: Always import using `@/` path prefixes (e.g. `import { Link } from "@/components/navigation/client-router"`).
- **Naming Conventions**:
  - React components: PascalCase (e.g. `SetsLessonRenderer.tsx`, `DuplicateEliminator`).
  - Blocks and utilities: camelCase (e.g. `usePythonRunner.ts`, `validateSetsCode`).
  - Styles: kebab-case (e.g. `.sets-comparison`, `.set-operations-layout`).
- **Encapsulated Styles**: Keep lesson-specific styles nested under their root container class in `globals.scss` (e.g. `.sets-development-pack { ... }`) to avoid leakage.
- **Unit Test Integrity**: Make sure to update match counts in `tests/rendered-html.test.mjs` as new lessons are appended to avoid breaking build gates.
- **Documentation Preservation**: Maintain docstrings, inline code comments, and annotations in files being modified.
