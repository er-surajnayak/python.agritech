import type {
  CourseDefinition,
  CourseIconName,
  CourseModule,
  CourseProgress,
  LessonPosition,
  LessonStatus,
} from "@/types/course";
import { moduleZeroLessonSummaries } from "@/content/module-0";
import { moduleOneLessonSummaries } from "@/content/module-1";
import { moduleTwoLessonSummaries } from "@/content/module-2";
import { moduleThreeLessonSummaries } from "@/content/module-3";
import { moduleFourLessonSummaries } from "@/content/module-4";

interface ModuleSeed {
  title: string;
  description: string;
  estimatedDuration: string;
  difficulty: CourseModule["difficulty"];
  learningObjectives: string[];
  prerequisites: string[];
  icon: CourseIconName;
}

const moduleSeeds: ModuleSeed[] = [
  {
    title: "Python, Agritech & The Data Science Journey",
    description: "An interactive orientation to Python, its role in agriculture, the working environment, and the complete learning journey.",
    estimatedDuration: "2 hours 40 min",
    difficulty: "Orientation",
    learningObjectives: ["Explain why Python supports agritech data work", "Run a first Python program", "Navigate the complete course roadmap"],
    prerequisites: ["No prior programming experience required"],
    icon: "education",
  },
  {
    title: "Python Fundamentals",
    description: "The foundational language concepts required for every later module.",
    estimatedDuration: "5 hours",
    difficulty: "Beginner",
    learningObjectives: ["Recognise foundational Python concepts", "Follow the module's guided learning sequence"],
    prerequisites: ["Module 0 · Welcome to Python & Agritech"],
    icon: "code",
  },
  {
    title: "Decision Making & Control Flow",
    description: "An evolving Smart Farm Automation System for learning conditions, branches, pattern matching, repetition, and loop control.",
    estimatedDuration: "14 hours",
    difficulty: "Beginner",
    learningObjectives: ["Plan decision logic with conditions and flowcharts", "Choose appropriate conditional structures", "Monitor repeated sensor data with loops", "Build a Smart Irrigation Automation System"],
    prerequisites: ["Module 1 · Python Fundamentals"],
    icon: "logic",
  },
  {
    title: "Functions",
    description: "A problem-first journey from repeated code to reusable, testable and maintainable program behaviour.",
    estimatedDuration: "18 hours",
    difficulty: "Intermediate",
    learningObjectives: ["Recognise repeated responsibilities", "Create reusable functions", "Work with parameters, arguments and return values", "Understand scope, lambda functions and introductory recursion", "Refactor the Smart Farm Automation Console"],
    prerequisites: ["Module 2 · Decision Making & Control Flow"],
    icon: "collections",
  },
  {
    title: "Python Collections",
    description: "A Smart Farm Data Management journey from repeated variables to organized, scalable groups of related information.",
    estimatedDuration: "20 hours",
    difficulty: "Beginner",
    learningObjectives: ["Explain why collections exist", "Store and manage related values efficiently", "Choose the right collection type", "Build a Smart Farm data management system"],
    prerequisites: ["Module 3 · Functions"],
    icon: "collections",
  },
  {
    title: "Object-Oriented Programming",
    description: "A structured model for representing related data and behaviour.",
    estimatedDuration: "6 hours",
    difficulty: "Intermediate",
    learningObjectives: ["Recognise object-oriented design vocabulary", "Model a small domain with related responsibilities"],
    prerequisites: ["Module 4 · Python Collections"],
    icon: "objects",
  },
  {
    title: "Scientific Computing with NumPy",
    description: "The numerical computing foundation for efficient agricultural data work.",
    estimatedDuration: "7 hours",
    difficulty: "Intermediate",
    learningObjectives: ["Recognise the NumPy analysis workflow", "Prepare numerical data for efficient operations"],
    prerequisites: ["Module 5 · Object-Oriented Programming"],
    icon: "numpy",
  },
  {
    title: "Data Analysis with Pandas",
    description: "A structured workflow for inspecting, preparing and analysing tabular data.",
    estimatedDuration: "8 hours",
    difficulty: "Advanced",
    learningObjectives: ["Recognise the Pandas analysis workflow", "Plan a repeatable tabular-data process"],
    prerequisites: ["Module 6 · Scientific Computing with NumPy"],
    icon: "pandas",
  },
  {
    title: "Data Visualization with Matplotlib",
    description: "Visual communication patterns for presenting data clearly and responsibly.",
    estimatedDuration: "6 hours",
    difficulty: "Advanced",
    learningObjectives: ["Recognise the Matplotlib visualization workflow", "Select a clear visual communication structure"],
    prerequisites: ["Module 7 · Data Analysis with Pandas"],
    icon: "visualization",
  },
  {
    title: "Agritech Data Science Project",
    description: "An applied framework for combining the complete course workflow.",
    estimatedDuration: "10 hours",
    difficulty: "Applied",
    learningObjectives: ["Plan an end-to-end project workflow", "Connect course stages into one coherent process"],
    prerequisites: ["Modules 0–8"],
    icon: "agritech",
  },
];

export const agritechCourse: CourseDefinition = {
  id: "python-agritech-data-science",
  slug: "python-agritech-data-science",
  title: "Python for Agritech & Data Science",
  description:
    "A structured path from first principles to an applied agricultural data science workflow.",
  modules: moduleSeeds.map((seed, moduleIndex) => {
    const moduleId = `module-${moduleIndex}`;
    return {
      id: moduleId,
      index: moduleIndex,
      ...seed,
      lessons: moduleIndex === 0
        ? moduleZeroLessonSummaries
        : moduleIndex === 1
          ? moduleOneLessonSummaries
          : moduleIndex === 2
            ? moduleTwoLessonSummaries
            : moduleIndex === 3
              ? moduleThreeLessonSummaries
              : moduleIndex === 4
                ? moduleFourLessonSummaries
          : Array.from({ length: 3 }, (_, lessonIndex) => ({
            id: `${moduleId}-lesson-${lessonIndex + 1}`,
            moduleId,
            order: lessonIndex + 1,
            title: `Lesson ${moduleIndex}.${lessonIndex + 1} · Placeholder`,
            estimatedMinutes: 30,
            status: "not-started" as LessonStatus,
            isPlaceholder: true,
            })),
    };
  }),
};

export function getCourseProgress(course: CourseDefinition): CourseProgress {
  const lessons = course.modules.flatMap((module) => module.lessons);
  const completedLessons = lessons.filter((lesson) => lesson.status === "completed").length;
  const completedModules = course.modules.filter((module) =>
    module.lessons.every((lesson) => lesson.status === "completed"),
  ).length;

  return {
    completedLessons,
    totalLessons: lessons.length,
    completedModules,
    totalModules: course.modules.length,
    percentage: lessons.length === 0 ? 0 : Math.round((completedLessons / lessons.length) * 100),
  };
}

export function getLessonHref(lessonId: string) {
  return `/lessons/${lessonId}`;
}

export function getDefaultLessonId(course: CourseDefinition) {
  const lessons = course.modules.flatMap((module) => module.lessons);
  return lessons.find((lesson) => lesson.status === "in-progress")?.id ?? lessons[0]?.id ?? "";
}

export function getLessonPosition(
  course: CourseDefinition,
  lessonId: string,
): LessonPosition | null {
  const lessons = course.modules.flatMap((module) => module.lessons);
  const lessonIndex = lessons.findIndex((lesson) => lesson.id === lessonId);
  if (lessonIndex < 0) return null;
  const lesson = lessons[lessonIndex];
  const module = course.modules.find((candidate) => candidate.id === lesson.moduleId);
  if (!module) return null;

  return {
    module,
    lesson,
    previous: lessons[lessonIndex - 1] ?? null,
    next: lessons[lessonIndex + 1] ?? null,
  };
}
