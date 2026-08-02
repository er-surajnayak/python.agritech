import { Breadcrumb, BreadcrumbItem } from "@carbon/react";
import { Link } from "@/components/navigation/client-router";
import type { CourseModule, CourseLesson } from "@/types/course";

export function CourseBreadcrumb({
  module,
  lesson,
  currentLabel,
}: {
  module?: CourseModule;
  lesson?: CourseLesson;
  currentLabel?: string;
}) {
  return (
    <Breadcrumb noTrailingSlash className="course-breadcrumb">
      <BreadcrumbItem><Link href="/course">Course</Link></BreadcrumbItem>
      <BreadcrumbItem><Link href="/modules">Modules</Link></BreadcrumbItem>
      {module && <BreadcrumbItem><Link href={`/modules#${module.id}`}>Module {module.index}</Link></BreadcrumbItem>}
      {lesson && <BreadcrumbItem isCurrentPage>{lesson.title}</BreadcrumbItem>}
      {!lesson && currentLabel && <BreadcrumbItem isCurrentPage>{currentLabel}</BreadcrumbItem>}
    </Breadcrumb>
  );
}
