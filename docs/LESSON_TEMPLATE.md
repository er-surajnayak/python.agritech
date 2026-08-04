# Lesson Authoring Template (LESSON_TEMPLATE.md)

This template defines the structural blueprint, section order, heading hierarchies, code block formats, and testing requirements for authoring new lessons in the Digital Interactive Notes platform.

---

## 1. Standard Section Order

Every lesson workspace must layout elements in the following chronological order:

```text
1. Hero Header (LessonHero)
2. Outcomes (LearningObjectivesCard)
3. Narrative / Flow (ProblemStory & WorkflowAnimation)
4. Concept (Definition & Characteristic Cards)
5. Creation / worked examples (WorkedExampleCard / EmptyRulesCard)
6. Live Visualizer (e.g. SetOperationsVisualizer or MutabilitySimulator)
7. Playground (CodePlayground & visual supplements)
8. Guided Practice (PracticeCard / GuidedPracticeLab)
9. Assessment (QuizCard)
10. Debug Challenge (DebugChallengeCollection)
11. Key Takeaways (SummaryCard)
12. Lesson Teaser (WhatsNextCard)
```

---

## 2. Heading Hierarchy

Strictly follow this hierarchy inside lesson JSX templates:
- **`h1` (Main Title)**: Only one `h1` allowed per page, placed inside the `LessonHero` component. Sized responsively using fluid typographic clamps.
- **`h2` (Card Headers)**: Placed inside every core `.lesson-card` wrapper (e.g., `## Eliminated Duplicates`).
- **`h3` (Visualizer / Supplement Headers)**: Placed inside subsections or simulator titles.
- **`h4` / `strong` (Data Subsections)**: Sized at `1rem` for input titles or output labels.

---

## 3. Code Block Styling

- **Single expressions or inline symbols**: Always wrap inside standard `<code>` elements.
  - Example: `Use <code>set.add()</code> to insert values.`
- **Multiline code blocks**: Wrap in `@carbon/react`'s `<CodeSnippet type="multi" feedback="Copied">` or `.code-snippet` wrapper blocks.
  - Example:
    ```tsx
    <CodeSnippet type="multi" feedback="Copied">
      {`sensor_ids = {101, 205, 310}\nsensor_ids.add(410)`}
    </CodeSnippet>
    ```

---

## 4. Visualizer & Animation Placement

- **Positioning**: Visualizers must sit directly underneath the conceptual paragraphs they explain, acting as live proof.
- **Layout Alignment**:
  - Visual blocks must support side-by-side structures with their controls on wide screens (desktop grid).
  - Collapse columns into single vertical flows on mobile breakpoints (below `48rem`).
- **Interaction Rules**: Elements inside visualization arrays must be clickable button triggers to inspect properties or index offsets.

---

## 5. Practice & Quiz Layouts

### Practice Section
- **Tabs**: Sort exercises into three specific Carbon tabs: `Easy`, `Medium`, and `Challenge`.
- **Accordions**: Hints, references, and guide arrays must be wrapped inside Carbon `<Accordion align="start">` -> `<AccordionItem title="Show guidance">` elements to keep layouts compact.

### Quiz Section
- **Multiple Questions**: Render inside the `.quiz-question-list` container.
- **Form controls**: Always wrap choices inside Carbon `<RadioButtonGroup>` with unique, descriptive labels.
- **Validation feedback**: Checking choices must trigger immediate feedback banners (`.quiz-question-note`) colored green (`.is-correct`) or red (`.is-incorrect`).

---

## 6. Summary & What's Next Cards

- **SummaryCard**: Summarize three to four bullet points detailing active concepts learned (e.g., uniqueness, unordered layouts, mutability rules).
- **WhatsNextCard**: Include a brief description of the next lesson's goals and a button link routing to it.

---

## 7. Lesson Authoring Checklist

Before declaring a lesson complete, verify the implementation meets the following criteria:

- [ ] **Types Verified**: All data models have typescript declarations inside `types/content.ts` (no `any` types).
- [ ] **Curriculum Registered**: The lesson has been registered inside `content/module-X.ts` and `content/lessons.ts`.
- [ ] **Placeholder Removed**: Set `isPlaceholder: false` inside the summaries array of `content/module-X.ts` to expose the lesson router.
- [ ] **Code Validation Active**: Code playground implements block checks for unauthorized syntaxes (e.g. indexing sets).
- [ ] **Theme Modes Tested**: All text components, chips, code snippets, visual grids, and Venn overlaps scale between Light and Dark styles with high contrast.
- [ ] **Mobile Breakpoints Checked**: Textareas, playground run buttons, and venn diagram grids collapse cleanly on screens down to `35rem`.
- [ ] **Unit Tests Running**: Update expected lesson counts in `tests/rendered-html.test.mjs` and execute `npm run test` successfully.
