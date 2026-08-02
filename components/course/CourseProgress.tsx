import { ProgressBar } from "@carbon/react";
import type { CourseDefinition } from "@/types/course";
import { getCourseProgress } from "@/content/course-framework";

export function CourseProgress({
  course,
  compact = false,
}: {
  course: CourseDefinition;
  compact?: boolean;
}) {
  const progress = getCourseProgress(course);

  return (
    <section className={compact ? "course-progress course-progress--compact" : "course-progress"} id="progress">
      <div className="course-progress-heading">
        <div>
          <span>Course progress</span>
          <strong>{progress.percentage}%</strong>
        </div>
        {!compact && <p>Calculated automatically from completed placeholder lessons.</p>}
      </div>
      <ProgressBar
        label={`${progress.completedLessons} of ${progress.totalLessons} lessons complete`}
        helperText={`${progress.completedModules} of ${progress.totalModules} modules complete`}
        value={progress.percentage}
        max={100}
        size="small"
      />
    </section>
  );
}
