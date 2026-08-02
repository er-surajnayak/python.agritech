import { Accordion, AccordionItem } from "@carbon/react";
import {
  Book,
  Catalog,
  CheckmarkFilled,
  CircleDash,
  Course,
  InProgress,
  ProgressBarRound,
} from "@carbon/icons-react";
import { Link } from "@/components/navigation/client-router";
import { CourseIcon } from "@/components/course/CourseIcon";
import { CourseProgress } from "@/components/course/CourseProgress";
import { getLessonHref } from "@/content/course-framework";
import type { CourseDefinition, CourseLesson } from "@/types/course";

function LessonStatusIcon({ lesson }: { lesson: CourseLesson }) {
  if (lesson.status === "completed") return <CheckmarkFilled size={16} aria-label="Completed" />;
  if (lesson.status === "in-progress") return <InProgress size={16} aria-label="In progress" />;
  return <CircleDash size={16} aria-label="Not started" />;
}

export function CourseNavigation({
  course,
  currentLessonId,
}: {
  course: CourseDefinition;
  currentLessonId?: string;
}) {
  return (
    <aside className="course-navigation" aria-label="Course navigation">
      <div className="course-navigation-title">
        <span>Course framework</span>
        <strong>{course.title}</strong>
      </div>

      <nav className="course-section-links" aria-label="Course sections">
        <Link href="/course"><Course size={18} /> <span>Course</span></Link>
        <Link href="/modules"><Catalog size={18} /> <span>Modules</span></Link>
        <Link href="/lessons"><Book size={18} /> <span>Lessons</span></Link>
        <Link href="/course#progress"><ProgressBarRound size={18} /> <span>Progress</span></Link>
      </nav>

      <div className="course-module-navigation">
        <p className="course-navigation-label">Modules & lessons</p>
        <Accordion align="start" size="sm">
          {course.modules.map((module) => {
            const isCurrentModule = module.lessons.some((lesson) => lesson.id === currentLessonId);
            return (
              <AccordionItem
                key={module.id}
                open={isCurrentModule}
                title={
                  <span className="course-accordion-title">
                    <CourseIcon name={module.icon} size={16} />
                    <span>Module {module.index}</span>
                    <strong>{module.title}</strong>
                  </span>
                }
              >
                <div className="course-lesson-links">
                  {module.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={getLessonHref(lesson.id)}
                      aria-current={lesson.id === currentLessonId ? "page" : undefined}
                      className={lesson.id === currentLessonId ? "course-lesson-link is-current" : "course-lesson-link"}
                    >
                      <LessonStatusIcon lesson={lesson} />
                      <span>{lesson.title}</span>
                    </Link>
                  ))}
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <CourseProgress course={course} compact />
    </aside>
  );
}
