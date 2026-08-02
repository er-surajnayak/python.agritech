export type CourseDifficulty =
  | "Orientation"
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Applied";

export type LessonStatus = "not-started" | "in-progress" | "completed";

export type CourseIconName =
  | "education"
  | "code"
  | "logic"
  | "collections"
  | "terminal"
  | "objects"
  | "numpy"
  | "pandas"
  | "visualization"
  | "agritech";

export interface CourseLesson {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  estimatedMinutes: number;
  status: LessonStatus;
  isPlaceholder: boolean;
}

export interface CourseModule {
  id: string;
  index: number;
  title: string;
  description: string;
  estimatedDuration: string;
  difficulty: CourseDifficulty;
  learningObjectives: string[];
  prerequisites: string[];
  icon: CourseIconName;
  lessons: CourseLesson[];
}

export interface CourseDefinition {
  id: string;
  slug: string;
  title: string;
  description: string;
  modules: CourseModule[];
}

export interface CourseProgress {
  completedLessons: number;
  totalLessons: number;
  completedModules: number;
  totalModules: number;
  percentage: number;
}

export interface LessonPosition {
  module: CourseModule;
  lesson: CourseLesson;
  previous: CourseLesson | null;
  next: CourseLesson | null;
}
