import { Tag } from "@carbon/react";
import { Time } from "@carbon/icons-react";
import { CourseIcon } from "@/components/course/CourseIcon";
import type { CourseIconName } from "@/types/course";

export function LessonHero({
  eyebrow,
  title,
  summary,
  icon,
  level,
  durationMinutes,
  prerequisite,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  icon: CourseIconName;
  level: string;
  durationMinutes: number;
  prerequisite: string;
}) {
  return (
    <header className="course-workspace-header published-lesson-header reusable-lesson-hero">
      <div className="course-workspace-module-icon"><CourseIcon name={icon} size={24} /></div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="published-lesson-summary">{summary}</p>
        <div className="course-workspace-meta">
          <Tag type="green">{level}</Tag>
          <span><Time size={16} /> {durationMinutes} min</span>
          <span>Prerequisite: {prerequisite}</span>
        </div>
      </div>
    </header>
  );
}
