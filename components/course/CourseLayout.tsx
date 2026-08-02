import { CourseNavigation } from "@/components/course/CourseNavigation";
import type { CourseDefinition } from "@/types/course";

export function CourseLayout({
  course,
  currentLessonId,
  children,
}: {
  course: CourseDefinition;
  currentLessonId?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="course-framework-shell page-enter">
      <CourseNavigation course={course} currentLessonId={currentLessonId} />
      <div className="course-framework-content">{children}</div>
    </div>
  );
}
