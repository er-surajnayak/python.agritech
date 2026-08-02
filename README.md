# DI Notes — Python Programming for Agritech

DI Notes is a component-driven learning platform for Agritech faculty. It combines responsive navigation, global theme support, structured lesson content, reusable learning blocks, and browser-based Python execution.

## Technology

- React 19 + TypeScript
- Vite
- IBM Carbon Design System and Carbon icons
- Lightweight History API router with accessible native links
- Vercel SPA deployment configuration

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm test
```

## Architecture

```text
src/
  App.tsx                  Route composition and page metadata
  main.tsx                 Browser entry point
  styles/globals.scss      Carbon foundation and DI Notes layout system
components/
  course/                  Course navigation, progress and sequence framework
  learning/                Content block renderer and lesson layout
  navigation/              Global header, side navigation, search, progress
  pages/                   Route-level presentation components
  providers/               Global theme state and persistence
content/
  course-framework.ts      Typed 10-module course and placeholder lessons
  course.ts                Structured course shell and placeholder data
types/
  content.ts               Content-engine contracts
public/
  og.png                   Site-specific social sharing card
```

`LessonDocument` is the stable content boundary. A lesson is structured data for the shared educational sections; `LessonRenderer` maps that data into reusable Carbon-aligned learning components. New content can therefore be introduced without creating or changing lesson page components.

Module 0 is published as six structured `LessonDocument` records in `content/module-0.ts`. The shared renderer composes introduction, objectives, industry context, workflow, agritech example, playground, practice, quiz placeholder, assignment, summary, takeaways, and next-step sections without page-specific lesson components.

Module 1 includes published development packs for Lessons 1.1–1.8. The shared published-lesson registry resolves content across modules. Lesson 1.1 adds reusable execution tracing, comment and indentation exploration, syntax debugging, output prediction, and scored quiz feedback. Lesson 1.2 adds a safe assignment inspector, live memory model, naming validation, reassignment and swapping visualizations. Lesson 1.3 adds type badges, type prediction, type comparison, conversion visualization, and `NoneType` inspection. Lessons 1.2 and 1.3 share a live Variable Explorer that combines current value, detected type, and memory representation with the Python playground. Lesson 1.4 adds synchronized form and console input modes, queued browser-runtime responses, form-to-code mapping, typed user-data cards, and a farm registration mini project. Lesson 1.5 adds implicit and explicit conversion flows, a live conversion inspector, conversion-error prediction, and a reusable line-level Code Trace Panel. Lesson 1.6 adds interactive operator exploration, truth-table controls, assignment updates, identity and membership checks, binary inspection, stepwise expression evaluation, and a precedence visualizer. Its playground reuses the Variable Explorer and Code Trace Panel so learners can connect expressions to live program state. Lesson 1.7 introduces a reusable seven-stage problem-solving framework, live formula cards, stepwise calculations, a visual expression builder, simulated console inputs, guided exercises, and Agritech challenges that combine every earlier Module 1 skill. Lesson 1.8 completes the module with a requirements-driven Smart Farm Information System, interactive algorithm and flowchart views, a local project checklist, clickable code walkthrough, synchronized nine-field playground, predefined validation datasets, extension challenges, and a Module 1 completion checkpoint.

Module 2 is published as a complete ten-lesson Decision Making & Control Flow journey. Lessons 2.1–2.9 evolve one Smart Farm system through conditions, branching, pattern matching, collection iteration, condition-controlled loops, and fault-aware loop control. Lesson 2.10 completes the module with the Smart Farm Automation Console capstone: a menu-driven application with five operational modules, interactive console simulation, application-flow visualization, live execution dashboard, scenario testing, debugging, extension challenges, reflection, and a local completion checklist.

The Assignments area is a structured, topic-wise practice hub rather than a placeholder. It currently contains two 30-question banks covering progressive if–else decision making and integrated loop control. A shared Carbon interface provides topic navigation, search, expandable levels, responsive question cards, and session-based completion tracking.

Lessons 0.1 and 0.2 establish the optional, discriminated Development Pack extension. A pack can add structured hero storytelling, system visuals, interactive feature grids, learning timelines, platform tours, roadmaps, scenario decisions, comparisons, and contextual knowledge cards while continuing to reuse the shared objectives, workflow, playground, practice, quiz, assignment, summary, and navigation components. Dedicated pack data lives in `content/development-packs`; typed renderers select the correct reusable composition without embedding lesson prose in React.

The code playground executes Python in an isolated web worker using a self-hosted Pyodide core runtime. Execution is time-limited, output is announced accessibly, and lesson code resets without storing progress. The runner can optionally supply a deterministic queue of simulated responses to real `input()` calls, allowing form-based beginner experiences and console code to use the same execution boundary. It can also collect bounded execution traces containing the executed source line, post-line variables and types, cumulative console output, and concise errors. Later scientific packages can use this boundary while loading package artifacts on demand.

`CourseDefinition` is the course-navigation boundary. It owns modules, metadata, lesson sequencing and progress status. `CourseNavigation`, `CourseProgress`, `CourseBreadcrumb`, `CourseLayout`, and `PreviousNextNavigation` consume that definition without embedding course data in components. Future content can replace placeholder lesson records while preserving routes and navigation behavior.

## Routes

- `/` — Home
- `/course` — Course overview
- `/modules` — Module map
- `/lessons` — Current interactive lesson
- `/lessons/:lessonId` — Published lesson or reserved future lesson slot
- `/practice`
- `/quizzes`
- `/assignments`
- `/mini-projects`
- `/resources`
- `/about`

## Deployment

`vercel.json` configures the project as a Vite application and rewrites deep links to the client-side router. Import the repository into Vercel and use the detected `npm run build` command with `dist` as the output directory.
