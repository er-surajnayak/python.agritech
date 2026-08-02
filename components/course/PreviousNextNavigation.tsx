import { ArrowLeft, ArrowRight } from "@carbon/icons-react";
import { Link } from "@/components/navigation/client-router";
import { getLessonHref } from "@/content/course-framework";
import type { CourseLesson } from "@/types/course";

export function PreviousNextNavigation({
  previous,
  next,
}: {
  previous: CourseLesson | null;
  next: CourseLesson | null;
}) {
  return (
    <nav className="course-previous-next" aria-label="Lesson navigation">
      {previous ? (
        <Link href={getLessonHref(previous.id)} className="course-sequence-link course-sequence-link--previous">
          <ArrowLeft size={20} />
          <span><small>Previous lesson</small><strong>{previous.title}</strong></span>
        </Link>
      ) : <span className="course-sequence-empty">Beginning of course</span>}
      {next ? (
        <Link href={getLessonHref(next.id)} className="course-sequence-link course-sequence-link--next">
          <span><small>Next lesson</small><strong>{next.title}</strong></span>
          <ArrowRight size={20} />
        </Link>
      ) : <span className="course-sequence-empty course-sequence-empty--next">End of course</span>}
    </nav>
  );
}
