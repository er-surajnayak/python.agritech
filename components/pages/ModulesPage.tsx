import { Accordion, AccordionItem, Tag } from "@carbon/react";
import { ArrowRight, Time } from "@carbon/icons-react";
import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { CourseIcon } from "@/components/course/CourseIcon";
import { CourseLayout } from "@/components/course/CourseLayout";
import { Link } from "@/components/navigation/client-router";
import { agritechCourse, getDefaultLessonId, getLessonHref } from "@/content/course-framework";

export function ModulesPage() {
  const currentLessonId = getDefaultLessonId(agritechCourse);

  return (
    <CourseLayout course={agritechCourse} currentLessonId={currentLessonId}>
      <CourseBreadcrumb currentLabel="All modules" />
      <header className="page-header split-header course-modules-header">
        <div><p className="eyebrow">Curriculum architecture</p><h1>Ten modules, one continuous learning path</h1></div>
        <p>Expand a module to inspect its duration, difficulty, objectives, prerequisites and placeholder lesson structure.</p>
      </header>

      <Accordion className="course-module-catalog" align="start" size="lg">
        {agritechCourse.modules.map((module) => (
          <AccordionItem
            key={module.id}
            title={
              <div className="module-catalog-title" id={module.id}>
                <span className="module-catalog-index">{String(module.index).padStart(2, "0")}</span>
                <span className="module-catalog-icon"><CourseIcon name={module.icon} /></span>
                <span><strong>{module.title}</strong><small>{module.description}</small></span>
                <span className="module-catalog-meta"><Tag size="sm" type="green">{module.difficulty}</Tag><small><Time size={14} /> {module.estimatedDuration}</small></span>
              </div>
            }
          >
            <div className="module-catalog-details">
              <div>
                <h3>Learning objectives</h3>
                <ul>{module.learningObjectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
              </div>
              <div>
                <h3>Prerequisites</h3>
                <ul>{module.prerequisites.map((prerequisite) => <li key={prerequisite}>{prerequisite}</li>)}</ul>
              </div>
              <div className="module-placeholder-lessons">
                <h3>{module.lessons.every((lesson) => lesson.isPlaceholder) ? "Placeholder lessons" : "Lessons"}</h3>
                {module.lessons.map((lesson) => (
                  <Link key={lesson.id} href={getLessonHref(lesson.id)}>
                    <span>{lesson.title}</span><ArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </CourseLayout>
  );
}
