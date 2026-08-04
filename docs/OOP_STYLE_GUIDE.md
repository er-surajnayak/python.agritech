# OOP Style Guide (OOP_STYLE_GUIDE.md)

This document is the **single source of truth** for every Object-Oriented Programming lesson in Module 5. Future lesson prompts must reference this file instead of repeating architectural, visual, or educational instructions.

> **Status**: Authoritative — never override without updating this file first.
> **Applies to**: Lessons 5.1 through 5.10.
> **Depends on**: `MASTER_SPEC.md`, `LESSON_TEMPLATE.md`, `COMPONENT_LIBRARY.md`, `DEVELOPMENT_RULES.md`.

---

## 1. Module Vision

### Purpose

Module 5 teaches **Object-Oriented Programming (OOP)** — the dominant paradigm of professional Python development. It is the bridge between procedural scripts and the kind of structured, maintainable code that powers real applications.

### The Transition

Students arrive in Module 5 having mastered:
- Variables, data types, operators (Module 1)
- Control flow: `if`, `for`, `while`, `match` (Module 2)
- Functions: parameters, return values, scope, recursion (Module 3)
- Collections: Lists, Tuples, Sets, Dictionaries (Module 4)

They now face a new challenge: **as programs grow, functions and variables alone become insufficient**. Real systems need to model real things — sensors, farms, drones, weather stations — as self-contained, reusable units.

OOP provides that model.

### The Central Promise

> *"Instead of writing functions that manipulate data, we will write objects that ARE the data and know how to manage themselves."*

### The Smart Farm System

Module 5 does **not** use isolated toy examples. Every lesson, every class, every object is part of a single, growing **Smart Farm Management System** that students build incrementally across all 10 lessons.

By Lesson 5.10, students will have designed and implemented a fully working Smart Farm system with:
- Sensor hierarchies (temperature, moisture, pH)
- Farm records with encapsulated data
- Polymorphic sensor behaviour
- Composition-based Weather Station assembly
- A complete reporting and monitoring system

This continuity means students see how each new OOP concept **fits into and improves** the system they are building — not just what it is in isolation.

---

## 2. Story Progression

Each lesson is one chapter in a continuous engineering story. The story must feel like building a real product, not completing homework exercises.

### Complete Story Arc

```text
Lesson 5.1  ─  Why We Need OOP
               The Smart Farm is growing. Functions and dictionaries
               can no longer model it. We need a better structure.
               → Introduces: Classes, Objects, __init__, attributes

Lesson 5.2  ─  Building the Sensor Object
               We design our first real object: a temperature sensor.
               It knows its ID, its location, and its current reading.
               → Introduces: Instance attributes, instance methods, self

Lesson 5.3  ─  Managing Multiple Farm Records
               One farm is easy. The system must handle dozens.
               We create many Farm objects from a single blueprint.
               → Introduces: Multiple instances, class vs instance scope

Lesson 5.4  ─  Protecting Farm Data
               Farmers should not set temperature directly to -999.
               We protect attributes using encapsulation and validation.
               → Introduces: Encapsulation, private attributes, getters, setters, @property

Lesson 5.5  ─  Different Types of Sensors
               Temperature sensors and moisture sensors share common
               ground but behave differently. Inheritance models this.
               → Introduces: Inheritance, super(), method overriding

Lesson 5.6  ─  Different Sensor Behaviours
               Two moisture sensors from different manufacturers behave
               differently when they alert. Polymorphism handles this.
               → Introduces: Polymorphism, method overriding, duck typing

Lesson 5.7  ─  The Common Sensor Blueprint
               All sensors share a contract: they must have read(),
               alert(), and report(). We enforce this with abstraction.
               → Introduces: Abstract Base Classes (ABC), @abstractmethod

Lesson 5.8  ─  Readable Farm Reports
               print(farm) outputs ugly memory addresses. We teach
               objects to represent themselves beautifully.
               → Introduces: Magic methods: __str__, __repr__, __len__, __eq__, __lt__

Lesson 5.9  ─  The Farm HAS-A Weather Station
               A Farm does not inherit from WeatherStation — it owns
               one. Composition models this ownership relationship.
               → Introduces: Composition, aggregation, HAS-A vs IS-A

Lesson 5.10 ─  Complete Smart Farm Management System
               Everything assembled. Students build the final system:
               sensor hierarchy, farm records, weather station, reporting.
               → Capstone: Full OOP system design and implementation
```

### Continuity Rules

1. **Every lesson's classes must extend or refine classes from previous lessons** — never throw away and start fresh.
2. **Lesson 5.2 `Sensor` class must be the ancestor of every sensor class** in Lessons 5.5 through 5.10.
3. **Lesson 5.3 `Farm` class must evolve** — gaining encapsulation in 5.4, a weather station in 5.9, and a full report in 5.10.
4. **Entity names are fixed** — see Section 8 (Naming Standards). Never rename `Farm` to `GreenValleyFarm` or `Sensor` to `Device`.

---

## 3. Standard Lesson Structure

Every OOP lesson **must** follow this section order. Omitting sections requires explicit justification in the lesson prompt.

```text
01  Hero                 (LessonHero)
    Module/lesson coordinates, title, summary, level, duration, prerequisite

02  Learning Outcomes    (LearningObjectivesCard)
    Double-digit numbered goals. Max 8 outcomes per lesson.

03  Story Hook           (custom section)
    One paragraph narrative that connects to the previous lesson.
    "Last time we built X. Now the system needs Y."

04  Real-World Problem   (custom section)
    Show the specific pain point that this lesson's concept solves.
    Always use the Smart Farm. Never use a bank or zoo example.

05  Concept Explanation  (LessonContentCard, tone="blue")
    Define the OOP concept clearly.
    Follow the sequence: Definition → Syntax → Rules → When to use.

06  Visual Explanation   (OOP-specific visualizer component)
    Interactive diagram. See Section 9 for component catalogue.
    Must render the concept on real Smart Farm objects.

07  Memory Visualization (MemoryVisualizer component)
    Show how Python allocates objects in memory.
    See Section 7 for standards.

08  Agritech Example     (LessonContentCard, tone="green")
    Complete, runnable code example using Smart Farm entities.
    Uses exact names from Section 8.

09  Industry Insight     (IndustryInsightCard)
    Map the OOP concept to real industry usage.
    See Section 11 for industry mapping.

10  Interactive Playground (CodePlayground)
    Monaco editor with starter code using Smart Farm entities.
    See Section 10 for playground standards.

11  Guided Practice      (PracticeCard)
    Easy / Medium / Challenge tabs.
    All three tasks must use the same Smart Farm context.

12  Quiz                 (QuizCard)
    4 questions minimum. Mix conceptual and code-reading.
    At least one question must trace a method call mentally.

13  Debug Challenge      (DebugChallengeCollection)
    1–2 broken Smart Farm programs.
    Mistakes must target the exact misconceptions taught in this lesson.

14  Think Like an Engineer (custom Tile)
    One reflective design question that has no single right answer.
    Example: "Should `battery_level` be public or private? Why?"

15  Key Takeaways        (SummaryCard + KeyTakeawaysCard)
    3–6 bullet points. Each takeaway is one concrete, actionable truth.

16  What's Next         (WhatsNextCard)
    Preview the next lesson within the story arc.
```

---

## 4. Visual Design Standards

### The Core Visual Language

OOP concepts are visual by nature. Every entity in the Smart Farm system has a consistent visual identity across all lessons.

#### Class Blueprint

```
┌─────────────────────────────────┐
│  CLASS  Sensor                  │  ← Class header bar (accent colour)
├─────────────────────────────────┤
│  ATTRIBUTES                     │
│  • sensor_id : str              │  ← Each attribute on its own row
│  • location  : str              │
│  • reading   : float            │
├─────────────────────────────────┤
│  METHODS                        │
│  • __init__(self, ...)          │  ← Methods listed with return hint
│  • read(self) → float           │
│  • alert(self) → str            │
└─────────────────────────────────┘
```

- Class header bar uses the **class accent colour** (see Section 5).
- Attributes section uses `var(--cds-layer-02)`.
- Methods section uses `var(--cds-layer-01)`.
- Dividers use `1px solid var(--cds-border-subtle-01)`.
- Font for attribute types: `var(--cds-code-01-font-family)`, `0.8rem`, `var(--cds-text-helper)`.

#### Object Instance

```
┌─────────────────────────────────┐
│  OBJECT  sensor_1  (Sensor)     │  ← Object header bar (object accent colour)
├─────────────────────────────────┤
│  sensor_id  │  "T-101"          │  ← Two-column key/value layout
│  location   │  "Field A"        │
│  reading    │  31.4             │
└─────────────────────────────────┘
```

- Object header is slightly lighter than the class header.
- Two-column layout: key column 35%, value column 65%.
- Values use `var(--cds-text-primary)`, keys use `var(--cds-text-secondary)`.

#### Relationships

| Relationship | Visual Representation |
|---|---|
| Inheritance (IS-A) | Solid arrow pointing from child → parent. Label: `inherits` |
| Composition (HAS-A, strong) | Filled diamond at owner → component. Label: `owns` |
| Aggregation (HAS-A, weak) | Open diamond at owner → component. Label: `uses` |
| Method call | Dashed arrow from caller → target method box |
| Assignment / reference | Dotted arrow from variable name → object box |

#### Inheritance Tree Direction

```
        Sensor               ← Parent at TOP
       /       \
TemperatureSensor  MoistureSensor  ← Children below
```

Parent classes always render **above** children. Root/abstract classes render at the **top of the tree**.

#### Visual Hierarchy Rules

1. **Class blueprints** are the largest cards — they represent the template.
2. **Object instances** are smaller and positioned below or beside their class.
3. **Relationships** are always lines/arrows, never nested boxes.
4. **Memory** is a separate panel — never mix with class/object views.
5. **Method calls** are animated sequences, not static text.

---

## 5. Colour Standards

All colours must work in both Light and Dark themes using IBM Carbon Design System tokens. The following hex values are fallbacks for custom `--oop-*` CSS variables defined in `globals.scss`.

### Primary Palette

| Concept | CSS Variable | Hex (Dark) | Hex (Light) | Usage |
|---|---|---|---|---|
| **Class** | `--oop-class` | `#8a3ffc` | `#6929c4` | Class header bars, class label tags |
| **Object** | `--oop-object` | `#33b1ff` | `#0043ce` | Object instance headers, object tags |
| **Method** | `--oop-method` | `#08bdba` | `#007d79` | Method names, call arrows, method boxes |
| **Attribute** | `--oop-attribute` | `#ff7eb6` | `#9f1853` | Attribute rows, property decorators |
| **Constructor** | `--oop-constructor` | `#f1c21b` | `#b28600` | `__init__` highlights, constructor flow steps |
| **Inheritance** | `--oop-inheritance` | `#42be65` | `#198038` | Inheritance arrows, IS-A labels |
| **Composition** | `--oop-composition` | `#ff832b` | `#ba4e00` | Composition diamonds, HAS-A labels |
| **Memory / Heap** | `--oop-memory` | `#a2191f` | `#750e13` | Memory address chips, heap region |
| **Animation flash** | `--oop-flash` | `#ffffff` | `#161616` | Object creation pulse |
| **Abstract** | `--oop-abstract` | `#be95ff` | `#491d8b` | Abstract class headers, `@abstractmethod` |

### How to Declare in SCSS

```scss
/* At the top of .oop-development-pack {} in globals.scss */
.oop-development-pack {
  --oop-class:        #8a3ffc;
  --oop-object:       #33b1ff;
  --oop-method:       #08bdba;
  --oop-attribute:    #ff7eb6;
  --oop-constructor:  #f1c21b;
  --oop-inheritance:  #42be65;
  --oop-composition:  #ff832b;
  --oop-memory:       #a2191f;
  --oop-flash:        #ffffff;
  --oop-abstract:     #be95ff;
}

[data-carbon-theme="white"] .oop-development-pack {
  --oop-class:        #6929c4;
  --oop-object:       #0043ce;
  --oop-method:       #007d79;
  --oop-attribute:    #9f1853;
  --oop-constructor:  #b28600;
  --oop-inheritance:  #198038;
  --oop-composition:  #ba4e00;
  --oop-memory:       #750e13;
  --oop-flash:        #161616;
  --oop-abstract:     #491d8b;
}
```

### Secondary Rules

- **Never use raw hex values** inside component JSX. Always use the `--oop-*` variable.
- **Tag type mapping**: Use Carbon `Tag` with `type="purple"` for classes, `type="blue"` for objects, `type="teal"` for methods, `type="magenta"` for attributes.
- **Background tints**: Use `rgba(var(--oop-class-rgb), 0.08)` for subtle card backgrounds — avoid full saturation fills.

---

## 6. Animation Standards

### Principle

> Animations must **explain concepts**, not entertain. Every animation must add cognitive value. Remove any animation that a student can understand without watching.

### Object Creation Animation

Trigger: when a new object instance card appears on screen.

```
1. Card begins at scale(0.7) and opacity: 0
2. Expands to scale(1.05) with opacity: 0.6 over 200ms (ease-out)
3. Settles to scale(1) and opacity: 1 over 150ms (ease-in)
4. Constructor highlight bar pulses with --oop-constructor colour for 400ms
```

CSS keyframe name: `@keyframes oop-object-create`

### Constructor Execution Animation

Trigger: stepping through `__init__` in the Constructor Flow Visualizer.

```
1. Highlight the __init__ method box with --oop-constructor (300ms)
2. Each parameter slides in from left with a 150ms stagger per param
3. Each attribute row in the object card flashes --oop-attribute for 300ms
4. Object panel shows "self = this object" label briefly (600ms)
```

### Method Call Animation

Trigger: user clicks a method call in the Method Call Explorer.

```
1. Dashed arrow animates from caller variable → method box (300ms)
2. Method box highlights with --oop-method background (200ms)
3. Parameters animate into the method signature (150ms per param)
4. If return value exists: return arrow animates back to caller (300ms)
5. Return value flashes at the call site (400ms)
```

### Inheritance Flow Animation

Trigger: user selects a child class in the Inheritance Tree.

```
1. Parent class pulses with --oop-inheritance border (300ms)
2. Arrow from parent → child animates (400ms, ease-in-out)
3. Inherited attributes/methods highlight in child class card (200ms stagger)
4. New (overridden) attributes/methods highlight with --oop-attribute (200ms)
```

### Composition Assembly Animation

Trigger: user clicks "Add WeatherStation to Farm" in Composition Builder.

```
1. WeatherStation card slides in from right (300ms, ease-out)
2. Composition diamond appears at the Farm card edge (200ms)
3. Line draws from diamond → WeatherStation card (400ms)
4. Farm card gains a new attribute row "weather_station" with a flash (300ms)
```

### Memory Allocation Animation

Trigger: when a new object is created in the Memory Visualizer.

```
1. New memory block appears in heap panel at scale(0.5), opacity: 0
2. Expands to full size (200ms, ease-out)
3. Memory address chip fades in above the block (150ms)
4. Variable name in stack panel draws an arrow → heap block (300ms)
```

### Timing Reference

| Event | Duration | Easing |
|---|---|---|
| Object creation | 350ms total | ease-out |
| Constructor step | 150ms per step | linear |
| Method call arrow | 300ms | ease-in-out |
| Inheritance highlight | 200ms stagger | ease-out |
| Memory allocation | 350ms | ease-out |
| Hover on class card | 200ms | linear |
| Tab/selection change | 200ms | linear |
| Complex flow (full constructor) | Max 1200ms | staged |

### Animation Principles

1. **Never auto-play** complex multi-step animations — always require a user trigger (button click or step control).
2. **Always provide a Skip/Reset button** for any animation longer than 500ms.
3. **Reduced motion**: Respect `prefers-reduced-motion` — collapse all animations to instant opacity fades.
4. **Stagger long sequences**: When showing multiple attribute assignments, stagger at 100–150ms per row, not all at once.
5. **Color + motion**: Never rely on colour alone to communicate state. Pair colour changes with movement (scale, translate) for accessibility.

---

## 7. Memory Visualization Standards

### Purpose

Memory visualizations teach students **why Python behaves the way it does** — why `sensor_2 = sensor_1` does not copy an object, why attribute changes are reflected across references, and why `None` appears before `__init__` completes.

### Layout

```
┌───────────────────┐   ┌────────────────────────────────────────────┐
│     STACK         │   │     HEAP (Conceptual)                       │
│                   │   │                                             │
│  sensor_1  ───────┼──▶│  [Sensor Object #0x1A2B]                   │
│                   │   │   sensor_id = "T-101"                       │
│  farm      ───────┼──▶│  [Farm Object #0x3C4D]                     │
│                   │   │   name = "Green Valley"                     │
│  temp = 31.4      │   │   crop = "Rice"                             │
│  (primitive)      │   │                                             │
└───────────────────┘   └─────────────────────────────────────────────┘
```

### Rules

1. **Stack panel** (left): Shows variable names and their bindings. Primitive values (int, float, str, bool) display their value directly. Object variables display a dashed arrow to the heap.
2. **Heap panel** (right): Shows object boxes with their current attribute values. Uses `--oop-memory` colour for address chips.
3. **Memory addresses**: Show stylized addresses like `#0x1A2B` — never real Python memory addresses from `id()`. These are educational labels, not debugging tools.
4. **Multiple references**: If two variables point to the same object, show two separate arrows from the stack converging to the same heap box. This is the core visual for reference vs copy.
5. **`None` state**: Before `__init__` completes, show the heap box with `(uninitialized)` in `var(--cds-text-helper)`.
6. **Attribute update**: When an attribute changes, flash the specific row in the heap box (not the whole box).
7. **Object deletion / GC**: Show the heap box fading out with a dashed border when a reference count drops to zero. Label: "No more references → garbage collected".

### What NOT to Show

- Do not show actual Python interpreter internals (CPython frame objects, `__dict__`, `__class__`, etc.).
- Do not show reference counting numbers.
- Do not show raw binary or hex memory layouts.
- Keep heap "conceptual" — the goal is mental model, not debugging.

### Interaction

- Clicking any variable in the stack panel highlights the corresponding heap box.
- Clicking any attribute row in the heap panel highlights the line of code that set it.
- Step controls (Previous / Next) advance through object lifecycle events.

---

## 8. Naming Standards

All Smart Farm entities across Module 5 must use **exactly these names**. Consistency ensures students recognise and build on familiar code across all 10 lessons.

### Core Entities

| Entity | Python Name | First Introduced |
|---|---|---|
| Base sensor | `Sensor` | Lesson 5.1 |
| Temperature sensor | `TemperatureSensor` | Lesson 5.5 |
| Moisture sensor | `MoistureSensor` | Lesson 5.5 |
| pH sensor | `PHSensor` | Lesson 5.5 |
| Abstract sensor | `AbstractSensor` | Lesson 5.7 |
| Farm record | `Farm` | Lesson 5.1 |
| Farmer / operator | `Farmer` | Lesson 5.2 (optional) |
| Weather station | `WeatherStation` | Lesson 5.9 |
| Crop record | `Crop` | Lesson 5.3 (optional) |
| Drone unit | `Drone` | Lesson 5.6 (optional) |
| Irrigation system | `IrrigationSystem` | Lesson 5.9 (optional) |
| Soil sample | `SoilSample` | Lesson 5.4 (optional) |
| Fertilizer | `Fertilizer` | Lesson 5.7 (optional) |

### Standard Attribute Names

| Entity | Attribute | Type | Notes |
|---|---|---|---|
| `Sensor` | `sensor_id` | `str` | Unique ID, e.g. `"T-101"` |
| `Sensor` | `location` | `str` | Field location, e.g. `"Field A"` |
| `Sensor` | `reading` | `float` | Latest sensor reading |
| `Sensor` | `status` | `str` | `"Active"` or `"Offline"` |
| `TemperatureSensor` | `unit` | `str` | `"Celsius"` or `"Fahrenheit"` |
| `MoistureSensor` | `depth_cm` | `int` | Probe depth in cm |
| `Farm` | `name` | `str` | e.g. `"Green Valley"` |
| `Farm` | `location` | `tuple` | `("Pune", "Maharashtra")` |
| `Farm` | `crops` | `list` | e.g. `["Rice", "Wheat"]` |
| `Farm` | `sensors` | `list` | List of `Sensor` instances |
| `Farm` | `weather_station` | `WeatherStation \| None` | Composition target |
| `WeatherStation` | `temperature` | `float` | In °C |
| `WeatherStation` | `humidity` | `float` | In % |
| `WeatherStation` | `rainfall` | `float` | In mm |
| `WeatherStation` | `wind_speed` | `float` | In km/h |

### Standard Method Names

| Entity | Method | Signature | Purpose |
|---|---|---|---|
| `Sensor` | `read` | `read(self) → float` | Return current reading |
| `Sensor` | `alert` | `alert(self) → str` | Return alert message if threshold exceeded |
| `Sensor` | `report` | `report(self) → str` | Return formatted single-line report |
| `Farm` | `add_sensor` | `add_sensor(self, sensor: Sensor) → None` | Register a sensor |
| `Farm` | `remove_sensor` | `remove_sensor(self, sensor_id: str) → None` | Deregister a sensor |
| `Farm` | `get_sensor` | `get_sensor(self, sensor_id: str) → Sensor \| None` | Find a sensor |
| `Farm` | `summary` | `summary(self) → str` | Return formatted farm report |
| `WeatherStation` | `update` | `update(self, **readings) → None` | Update one or more readings |
| `WeatherStation` | `report` | `report(self) → str` | Return formatted weather report |

### Variable Naming Rules

- **Instance variables**: `snake_case` — `sensor_1`, `green_valley_farm`, `my_station`
- **Class names**: `PascalCase` — `Sensor`, `Farm`, `TemperatureSensor`
- **Private attributes**: prefix `_` — `_battery_level`, `_last_reading`
- **Constants**: `UPPER_SNAKE_CASE` — `MAX_TEMPERATURE = 45.0`
- **Magic methods**: standard Python dunder — `__init__`, `__str__`, `__repr__`, `__eq__`

### What to Avoid

- No `my_sensor`, `s1`, `obj`, `temp_thing` — use meaningful Smart Farm names
- No `FarmObject`, `SensorClass` — the class name describes the concept, not the mechanism
- No `data`, `info`, `stuff`, `item` — use specific domain-appropriate names
- No non-farm entities (BankAccount, Car, Animal) unless explicitly teaching a contrast

---

## 9. Reusable OOP Components

### Design Rule

> **Always reuse before creating.** Check this catalogue first. Build a new component only if no existing component can be extended to meet the requirement.

### Component Catalogue

#### `OopClassVisualizer`
- **Purpose**: Renders a class blueprint card showing the class name header, attributes section, and methods section. Supports highlighting individual sections on hover or interaction. Can render in collapsed (name only) or expanded (full blueprint) modes.
- **Props**: `className: string`, `attributes: AttributeDef[]`, `methods: MethodDef[]`, `color?: string`, `collapsed?: boolean`
- **File**: `components/learning/OopClassVisualizer.tsx`
- **Lesson first introduced**: 5.1
- **Reuse in**: 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10
- **Design note**: The most-used OOP component. Build it to be extremely robust.

#### `OopObjectCreator`
- **Purpose**: Interactive panel where students define attribute values and click "Create Object". An animated object instance card appears showing all assigned attributes. Supports creating multiple instances from the same class blueprint.
- **Props**: `classDef: ClassDef`, `onObjectCreated: (obj: ObjectInstance) => void`
- **File**: `components/learning/OopObjectCreator.tsx`
- **Lesson first introduced**: 5.1
- **Reuse in**: 5.2, 5.3, 5.5, 5.10

#### `OopMemoryVisualizer`
- **Purpose**: Two-panel (Stack + Heap) diagram showing variable bindings and object state. Animates object creation, attribute updates, and reference changes step by step. Supports multi-step execution via Previous / Next controls.
- **Props**: `steps: MemoryStep[]`, `showControls?: boolean`
- **File**: `components/learning/OopMemoryVisualizer.tsx`
- **Lesson first introduced**: 5.1
- **Reuse in**: 5.2, 5.3, 5.4, 5.8
- **Design note**: See Section 7 for full memory visualization standards.

#### `OopConstructorFlowVisualizer`
- **Purpose**: Animated step-by-step walkthrough of a `__init__` execution. Shows: (1) `self` binding, (2) each parameter assigned to `self`, (3) object state after each step. Uses `--oop-constructor` highlight colour throughout.
- **Props**: `params: ConstructorParam[]`, `assignments: Assignment[]`
- **File**: `components/learning/OopConstructorFlowVisualizer.tsx`
- **Lesson first introduced**: 5.1
- **Reuse in**: 5.2, 5.5

#### `OopMethodCallExplorer`
- **Purpose**: Visual method call simulator. User selects a method, inputs arguments, and clicks "Call". Shows: dashed arrow from caller → method → execution inside method → return value arrow back. Displays local scope and `self` attributes during execution.
- **Props**: `methods: MethodDef[]`, `instances: ObjectInstance[]`
- **File**: `components/learning/OopMethodCallExplorer.tsx`
- **Lesson first introduced**: 5.2
- **Reuse in**: 5.3, 5.4, 5.5, 5.6, 5.8, 5.10

#### `OopInheritanceTree`
- **Purpose**: Visual tree diagram rendering class hierarchies. Parent at top, children below, connected by solid inheritance arrows. Clicking any node expands the class blueprint. Selecting a child highlights which attributes/methods are inherited vs new vs overridden.
- **Props**: `hierarchy: ClassHierarchy`, `selectedClass?: string`, `onSelect: (name: string) => void`
- **File**: `components/learning/OopInheritanceTree.tsx`
- **Lesson first introduced**: 5.5
- **Reuse in**: 5.6, 5.7, 5.10
- **Design note**: Arrow colour `--oop-inheritance`. Overridden methods highlighted with `--oop-attribute`.

#### `OopCompositionBuilder`
- **Purpose**: Button-based tool that assembles objects through composition. Shows a container object (e.g. `Farm`) and allows adding/removing component objects (e.g. `WeatherStation`). Displays the resulting HAS-A relationship with filled diamond arrows.
- **Props**: `owner: ClassDef`, `availableComponents: ClassDef[]`
- **File**: `components/learning/OopCompositionBuilder.tsx`
- **Lesson first introduced**: 5.9
- **Reuse in**: 5.10

#### `OopEncapsulationInspector`
- **Purpose**: Side-by-side panel showing a class with public vs private attributes. Left panel: direct access attempt (fails or succeeds). Right panel: property getter/setter access (always correct). Highlights the validation logic inside setters.
- **Props**: `publicAttrs: string[]`, `privateAttrs: string[]`, `validators: ValidatorDef[]`
- **File**: `components/learning/OopEncapsulationInspector.tsx`
- **Lesson first introduced**: 5.4
- **Reuse in**: 5.10

#### `OopObjectStateViewer`
- **Purpose**: Live attribute table for an object instance. Shows current values of all instance attributes. Supports interactive updates — user inputs a new value, clicks "Update", and the table row flashes and changes. Linked to `OopMethodCallExplorer` to show state changes after method calls.
- **Props**: `instance: ObjectInstance`, `onUpdate?: (attr: string, value: unknown) => void`
- **File**: `components/learning/OopObjectStateViewer.tsx`
- **Lesson first introduced**: 5.2
- **Reuse in**: 5.3, 5.4, 5.5, 5.8, 5.10

#### `OopMagicMethodPlayground`
- **Purpose**: Interactive panel demonstrating magic methods by showing the before (raw Python output) and after (with magic method defined) for `__str__`, `__repr__`, `__len__`, `__eq__`, and `__lt__`. User can edit the magic method body and see the output update live.
- **Props**: `methods: MagicMethodDef[]`, `sampleObject: ObjectInstance`
- **File**: `components/learning/OopMagicMethodPlayground.tsx`
- **Lesson first introduced**: 5.8
- **Reuse in**: 5.10

#### `OopRelationshipDiagram`
- **Purpose**: Full entity relationship diagram showing all Smart Farm classes and their connections (inheritance arrows, composition diamonds, aggregation diamonds). Interactive: clicking any entity highlights its relationships and shows a summary panel.
- **Props**: `classes: ClassDef[]`, `relationships: RelationshipDef[]`
- **File**: `components/learning/OopRelationshipDiagram.tsx`
- **Lesson first introduced**: 5.9
- **Reuse in**: 5.10

#### `OopObjectComparisonPanel`
- **Purpose**: Side-by-side comparison of two or more object instances from the same class. Highlights attribute differences in a table. Used to demonstrate that two objects from the same blueprint have independent state.
- **Props**: `instances: ObjectInstance[]`, `highlightDiffs?: boolean`
- **File**: `components/learning/OopObjectComparisonPanel.tsx`
- **Lesson first introduced**: 5.3
- **Reuse in**: 5.5, 5.8

#### `OopPolymorphismExplorer`
- **Purpose**: Shows a list of different child class instances (e.g. `TemperatureSensor`, `MoistureSensor`) being called with the same method name (e.g. `alert()`). Each produces different output. Cards animate in sequence to demonstrate same interface, different behaviour.
- **Props**: `instances: ObjectInstance[]`, `methodName: string`
- **File**: `components/learning/OopPolymorphismExplorer.tsx`
- **Lesson first introduced**: 5.6
- **Reuse in**: 5.10

#### `OopAbstractClassInspector`
- **Purpose**: Shows an abstract class blueprint with `@abstractmethod` markers. If user tries to "instantiate" an abstract class, shows a `TypeError` with explanation. If user creates a concrete subclass that implements all methods, shows successful instantiation.
- **Props**: `abstractClass: ClassDef`, `concreteClasses: ClassDef[]`
- **File**: `components/learning/OopAbstractClassInspector.tsx`
- **Lesson first introduced**: 5.7
- **Reuse in**: 5.10

### Component Registration Rule

Every new OOP component must be:
1. Built in `components/learning/Oop{ComponentName}.tsx`
2. Documented in `COMPONENT_LIBRARY.md` under **Section 6 — OOP Visualizers**
3. Styled under `.oop-development-pack { ... }` in `globals.scss`

---

## 10. Playground Standards

Every OOP lesson playground must meet all standards from `MASTER_SPEC.md` Section 8, plus the following OOP-specific requirements.

### OOP Playground Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│  Monaco Code Editor (left, 55% width on desktop)                    │
│  Starter code: Smart Farm class definition + usage example           │
├──────────────────────────────┬──────────────────────────────────────┤
│  Output Panel                │  Object State Panel                  │
│  Python stdout from Pyodide  │  Live object attribute table         │
│  Includes: class repr,       │  Updates after each "Run"            │
│  method return values        │  Shows: name, value, type            │
├──────────────────────────────┴──────────────────────────────────────┤
│  Memory Panel (collapsible, below output)                           │
│  Simplified stack/heap view of objects created in last run          │
└─────────────────────────────────────────────────────────────────────┘
```

### Editor Requirements

- Starter code must define at least one class using Smart Farm naming (Section 8).
- Starter code must include at least two object instantiations so students immediately see the blueprint/instance distinction.
- Comments in starter code must use `# Step N:` format to guide learners.
- The Monaco editor must have Python syntax highlighting.

### Button Controls

| Button | Kind | Action |
|---|---|---|
| Run | `kind="primary"` | Execute code via Pyodide, update all panels |
| Reset | `kind="ghost"` | Restore original starter code, clear panels |
| Step | `kind="secondary"` | Execute one line at a time (when `traceExecution` is true) |

### Object Panel (`renderSupplement`)

The playground's `renderSupplement` callback must:
1. Parse stdout for `repr()` / `__str__` output of Smart Farm objects.
2. Render a live `OopObjectStateViewer` table for each created object.
3. Show the class name as a badge above each object's attribute table.

### Code Validation (`validateCode`)

OOP playgrounds must block:
- Attempting to directly access `_private_attr` (underscore-prefixed) — show `InlineNotification` explaining encapsulation.
- Instantiating `AbstractSensor` or any class whose docstring contains `# ABSTRACT` — show TypeError explanation.
- Infinite recursion in method calls — detect `RecursionError` and show a clear explanation.

### Mobile Behaviour

- Below `62rem`: Stack editor above output panel vertically.
- Object State Panel collapses into a collapsible accordion below output.
- Memory Panel is hidden by default on mobile, accessible via "Show Memory" toggle button.

---

## 11. Industry Mapping

Every lesson's `IndustryInsightCard` must connect its OOP concept to the industry contexts below.

### Classes & Objects → Every Python Application

- **Django** (`django.db.models.Model`): Every database table is a class. Every row is an object.
- **Flask** (`flask.Flask`): The `app` object is an instance of the `Flask` class.
- **FastAPI** (`fastapi.FastAPI`): Pydantic `BaseModel` subclasses define request/response schemas as classes.
- **Machine Learning** (`sklearn.linear_model.LinearRegression`): Every scikit-learn model is a class. `fit()` and `predict()` are methods.
- **Data Science** (`pandas.DataFrame`): The most-used object in Python data science.

### Constructors → Object Initialization

- **Django model**: `__init__` populates field defaults and validators.
- **Pandas DataFrame**: `pd.DataFrame(data)` is a constructor call.
- **PyTorch**: `nn.Module.__init__()` initializes neural network layers.
- **Smart Farm**: `Sensor("T-101", "Field A")` initializes a sensor — same pattern.

### Encapsulation → Data Integrity

- **Django model fields**: `validators=[]` and `max_length=` enforce data contracts — same idea as property setters.
- **REST API payloads**: Pydantic validates that `temperature` is a float between -50 and 80 — encapsulation enforced at the schema layer.
- **Financial systems**: Account balance is always a property with validation — never a raw public attribute.

### Inheritance → Code Reuse

- **Django class-based views**: `ListView`, `DetailView`, `CreateView` all inherit from `View`.
- **PyTorch**: Custom neural network layers inherit from `nn.Module`.
- **Exceptions**: `ValueError`, `TypeError`, `KeyError` all inherit from `Exception`.
- **Smart Farm**: `TemperatureSensor` inherits from `Sensor` — same pattern.

### Polymorphism → Flexible Systems

- **Django REST Framework serializers**: `serialize(instance)` works the same way regardless of which model type is passed.
- **scikit-learn**: All estimators implement `fit()` and `predict()` — swap models without changing the calling code.
- **Logging**: `logger.info()`, `logger.warning()`, `logger.error()` — same interface, different behaviour.

### Abstraction → Contracts

- **Python ABC (`abc.ABC`)**: Defines interfaces that subclasses must implement.
- **Django storage backends**: `Storage.save()` is abstract — S3, local, and GCS storage all implement it.
- **FastAPI dependency injection**: Abstracts away database session management.

### Composition → Flexible Design

- **Django `ForeignKey`**: A `Farm` HAS-A `WeatherStation` through a foreign key — composition at the database level.
- **FastAPI middleware**: The `app` object is composed of routers, middleware, and exception handlers.
- **React**: Components compose other components — same HAS-A pattern as Python composition.

### Magic Methods → Pythonic APIs

- **Pandas `__getitem__`**: `df["column"]` uses `__getitem__`.
- **Pathlib `__truediv__`**: `Path("home") / "user"` uses `__truediv__`.
- **Context managers `__enter__`, `__exit__`**: `with open("file") as f:` uses these.
- **Comparisons `__eq__`, `__lt__`**: `sorted(sensors)` works when `__lt__` is defined.

---

## 12. Teaching Philosophy

### The Core Sequence

Every OOP lesson **must** follow this pedagogical order:

```text
1. PROBLEM
   Show a real limitation in the current Smart Farm system.
   "We have 50 sensors. Each needs its own variables. This doesn't scale."

   ↓

2. MOTIVATION
   Show why the problem matters and what it costs if unsolved.
   "If we add sensor 51, we must change code in 12 places."

   ↓

3. CONCEPT
   Introduce the OOP concept as the solution.
   "A class is a blueprint. We define it once, create as many sensors as needed."

   ↓

4. VISUALIZATION
   Show the concept visually before showing code.
   OopClassVisualizer → OopObjectCreator → OopMemoryVisualizer

   ↓

5. CODE
   Show the Python code now that students understand what it does.
   Always use exact Smart Farm entities from Section 8.

   ↓

6. REAL-WORLD EXAMPLE
   Show where this exact pattern appears in industry.
   IndustryInsightCard (see Section 11).

   ↓

7. PRACTICE
   Students reinforce through guided problems.
   PracticeCard: Easy → Medium → Challenge
```

### What NOT to Do

| Anti-Pattern | Why It Fails |
|---|---|
| Start with `class BankAccount` | Disconnects from established Smart Farm knowledge |
| Define OOP before showing the problem | Students memorize definitions without understanding motivation |
| Show code before visualization | Students copy-paste without mental model |
| Use `foo`, `bar`, `x`, `y` as names | Destroys domain immersion |
| Teach all OOP concepts in one lesson | Cognitive overload — one concept per lesson maximum |
| Skip the "why" and go straight to "how" | Students ask "when would I use this?" — answer it before they ask |
| Use jargon without grounding | "Polymorphism" means nothing without seeing two sensors behave differently |

### Memory Model First

Before any lesson introduces a new OOP mechanism (constructors, inheritance, composition), the memory visualizer must show **what Python actually creates in memory**. Students who understand the object graph understand the concept. Students who only read the code tend to copy without transferring.

### Failure is Educational

- Debug challenges must present plausible student mistakes, not contrived syntax errors.
- The "Think Like an Engineer" section must have no single right answer.
- Students should see `AttributeError`, `TypeError`, and `NotImplementedError` in context and understand why Python raises them.

---

## 13. Development Rules

These rules govern every implementation of an OOP lesson. They complement `MASTER_SPEC.md` Section 14.

### Component Rules

1. **Reuse first**: Check `COMPONENT_LIBRARY.md` before creating any new component. New OOP components belong in `components/learning/Oop{Name}.tsx`.
2. **Never redesign existing components**: `LessonHero`, `QuizCard`, `PracticeCard`, `CodePlayground`, and all cards from `LearningBlocks.tsx` must not be modified for OOP lessons.
3. **Extend, don't fork**: If an existing visualizer needs minor OOP adaptations, add props to the existing component with backwards-compatible defaults.

### Naming Rules

4. **TypeScript interface names**: `OOPBaseDevelopmentPack`, `ClassDef`, `ObjectInstance`, `MethodDef`, `AttributeDef`, `MemoryStep`, `RelationshipDef`, `MagicMethodDef`, `ValidatorDef`.
5. **Development pack kind**: `"oop-lesson-5-1"` through `"oop-lesson-5-10"`.
6. **SCSS namespace**: All OOP styles nest under `.oop-development-pack` in `globals.scss`. Lesson-specific overrides use `.oop-lesson-5-1-pack`, `.oop-lesson-5-2-pack`, etc.
7. **File names**: `OopLesson5-{N}LessonRenderer.tsx`, `Oop{ComponentName}.tsx`.

### Styling Rules

8. **Always use `--oop-*` variables** from Section 5. Never hardcode hex values.
9. **Dark/Light theme**: All OOP components must function correctly in both themes without JavaScript theme detection.
10. **Responsive**: OOP visualizers must collapse gracefully at `62rem` (tablet) and `42rem` (mobile). Complex diagrams (InheritanceTree, RelationshipDiagram) may show a simplified text-based fallback on mobile.

### Content Rules

11. **Entity names**: Always use the exact names from Section 8. Never introduce new entity names without updating Section 8 first.
12. **Story continuity**: Each lesson must reference and build on the previous lesson's code. Students must see the system evolving.
13. **Agritech context**: Every example, playground, quiz question, and debug challenge must use Smart Farm entities.
14. **Test updates**: Update `tests/rendered-html.test.mjs` match counts for every new lesson registered.

### Quality Rules

15. **No `any` types**: All TypeScript interfaces must be fully typed.
16. **No inline styles**: No `style={{ color: '#ff0000' }}` in JSX. Use CSS variables and class names exclusively.
17. **Accessibility**: All interactive OOP visualizer elements must have `aria-label`, `role`, and keyboard navigation support.

---

## 14. Acceptance Checklist

Every OOP lesson is considered complete only when **all** items below are checked.

### Content Completeness
- [ ] Story Hook connects to the previous lesson's ending state
- [ ] Real-World Problem shows a specific limitation of the current Smart Farm code
- [ ] Concept Explanation defines the OOP concept with correct Python syntax
- [ ] Agritech Example uses only entity names from Section 8
- [ ] Industry Insight maps to at least two real industry frameworks from Section 11
- [ ] 4 quiz questions minimum (mix conceptual + code-reading)
- [ ] 1–2 debug challenges with plausible student mistakes
- [ ] "Think Like an Engineer" question included with no single right answer
- [ ] What's Next connects to next lesson's story chapter

### Visual Standards
- [ ] `OopClassVisualizer` renders the class blueprint with correct colour (`--oop-class`)
- [ ] Object instances display with correct colour (`--oop-object`)
- [ ] Methods use correct colour (`--oop-method`) in all visualizers
- [ ] Constructor steps use `--oop-constructor` highlight
- [ ] All animations respect the timing specifications in Section 6
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Memory diagram rendered using Section 7 standards

### Technical Standards
- [ ] TypeScript interface defined in `types/content.ts` (no `any`)
- [ ] Development pack registered in `content/module-5.ts`
- [ ] `isPlaceholder: false` set in `moduleFiveLessonSummaries`
- [ ] Lesson renderer created in `components/learning/OopLesson5-{N}LessonRenderer.tsx`
- [ ] `kind === "oop-lesson-5-{N}"` route added in `LessonRenderer.tsx`
- [ ] All new components registered in `COMPONENT_LIBRARY.md` under Section 6
- [ ] SCSS styles nest under `.oop-development-pack` in `globals.scss`
- [ ] `--oop-*` colour variables declared and override correctly in Light theme

### Responsiveness & Accessibility
- [ ] Lesson renders correctly at `62rem` (tablet) breakpoint
- [ ] Lesson renders correctly at `42rem` (mobile) breakpoint
- [ ] All interactive elements have `aria-label` attributes
- [ ] All colour-only states have motion or text companions
- [ ] Keyboard navigation works for all visualizer interactive elements

### Testing & Deployment
- [ ] `npm run test` passes (all existing tests still pass)
- [ ] Lesson count assertion in `rendered-html.test.mjs` updated
- [ ] Production build (`vite build`) completes without TypeScript errors
- [ ] Committed and pushed to `main` branch for Vercel deployment

---

## Appendix A — Module 5 TypeScript Interface Blueprint

Base interface structure for all OOP development packs. Lesson-specific packs extend `OOPBaseDevelopmentPack`.

```typescript
// Shared structural types
export interface AttributeDef {
  name: string;
  type: string;
  defaultValue?: string;
  isPrivate?: boolean;
  description: string;
}

export interface MethodDef {
  name: string;
  params: string[];        // e.g. ["self", "sensor_id: str", "location: str"]
  returnType: string;      // e.g. "None", "float", "str"
  description: string;
  isMagic?: boolean;
  isAbstract?: boolean;
}

export interface ClassDef {
  name: string;
  parent?: string;         // Parent class name if applicable
  isAbstract?: boolean;
  attributes: AttributeDef[];
  methods: MethodDef[];
  description: string;
}

export interface ObjectInstance {
  instanceName: string;
  className: string;
  attributes: Record<string, string | number | boolean | null>;
  memoryAddress?: string;  // Stylized address e.g. "#0x1A2B"
}

export interface MemoryStep {
  label: string;
  stack: Array<{ name: string; value: string; isReference: boolean }>;
  heap: Array<ObjectInstance & { id: string }>;
  arrows: Array<{ from: string; to: string }>;
}

export interface RelationshipDef {
  from: string;
  to: string;
  type: "inheritance" | "composition" | "aggregation" | "association";
  label?: string;
}

export interface MagicMethodDef {
  name: string;            // e.g. "__str__"
  signature: string;       // e.g. "def __str__(self) -> str:"
  purpose: string;
  before: string;          // Output without the magic method
  after: string;           // Output with the magic method
}

export interface ValidatorDef {
  attribute: string;
  rule: string;            // Human-readable e.g. "Must be between 0.0 and 100.0"
  errorMessage: string;
}

// Base interface all OOP packs extend
export interface OOPBaseDevelopmentPack {
  kind: string;            // e.g. "oop-lesson-5-1"
  prerequisite: string;
  storyHook: string;       // Connecting paragraph from previous lesson
  coreConcept: {
    title: string;
    definition: string;
    syntax: string;        // Python code example as a string
    rules: string[];
    whenToUse: string;
  };
  classes: ClassDef[];
  memorySteps?: MemoryStep[];
  relationships?: RelationshipDef[];
  debugChallenges: DebugChallengeContent[];
  engineerThinkingPrompt: string;
}
```

---

## Appendix B — Quick Reference Card

```
SECTION ORDER        : Hero → Objectives → Story Hook → Problem →
                       Concept → Visual → Memory → Agritech Example →
                       Industry → Playground → Practice → Quiz →
                       Debug → Engineer → Takeaways → What's Next

CLASS COLOUR         : --oop-class       (#8a3ffc dark / #6929c4 light)
OBJECT COLOUR        : --oop-object      (#33b1ff dark / #0043ce light)
METHOD COLOUR        : --oop-method      (#08bdba dark / #007d79 light)
ATTRIBUTE COLOUR     : --oop-attribute   (#ff7eb6 dark / #9f1853 light)
CONSTRUCTOR COLOUR   : --oop-constructor (#f1c21b dark / #b28600 light)
INHERITANCE COLOUR   : --oop-inheritance (#42be65 dark / #198038 light)
COMPOSITION COLOUR   : --oop-composition (#ff832b dark / #ba4e00 light)
ABSTRACT COLOUR      : --oop-abstract    (#be95ff dark / #491d8b light)

ANIMATION TIMING     : Object create 350ms | Method call 300ms | Hover 200ms
                       Max complex flow 1200ms. Always provide Skip/Reset.

ENTITY NAMES (Fixed) : Sensor, Farm, TemperatureSensor, MoistureSensor,
                       PHSensor, AbstractSensor, WeatherStation, Farmer,
                       IrrigationSystem, Drone, Crop, Fertilizer, SoilSample

SCSS NAMESPACE       : .oop-development-pack { ... }
FILE PREFIX          : Oop{ComponentName}.tsx
RENDERER FILE        : OopLesson5-{N}LessonRenderer.tsx
TS KIND              : "oop-lesson-5-1" through "oop-lesson-5-10"

TEACHING ORDER       : Problem → Motivation → Concept → Visualization
                       → Code → Industry → Practice

COMPONENTS           : OopClassVisualizer, OopObjectCreator,
                       OopMemoryVisualizer, OopConstructorFlowVisualizer,
                       OopMethodCallExplorer, OopInheritanceTree,
                       OopCompositionBuilder, OopEncapsulationInspector,
                       OopObjectStateViewer, OopMagicMethodPlayground,
                       OopRelationshipDiagram, OopObjectComparisonPanel,
                       OopPolymorphismExplorer, OopAbstractClassInspector
```

---

*This guide is a living document. Update it whenever a new OOP pattern, component, or naming convention is established during Module 5 development. All updates must maintain backwards compatibility with lessons already implemented.*
