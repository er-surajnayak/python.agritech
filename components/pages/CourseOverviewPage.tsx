import { ArrowRight, Book, Catalog, Time } from "@carbon/icons-react";
import { Tag } from "@carbon/react";
import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { CourseIcon } from "@/components/course/CourseIcon";
import { CourseLayout } from "@/components/course/CourseLayout";
import { CourseProgress } from "@/components/course/CourseProgress";
import { Link } from "@/components/navigation/client-router";
import { agritechCourse, getCourseProgress, getDefaultLessonId, getLessonHref } from "@/content/course-framework";

export function CourseOverviewPage() {
  const progress = getCourseProgress(agritechCourse);
  const currentLessonId = getDefaultLessonId(agritechCourse);

  return (
    <CourseLayout course={agritechCourse} currentLessonId={currentLessonId}>
      <CourseBreadcrumb currentLabel="Overview" />
      <header className="course-overview-header">
        <div>
          <p className="eyebrow">Course framework</p>
          <h1>{agritechCourse.title}</h1>
          <p>{agritechCourse.description}</p>
          <div className="course-overview-actions">
            <Link className="primary-action" href={getLessonHref(currentLessonId)}>
              Continue course <ArrowRight size={18} />
            </Link>
            <Link className="secondary-action" href="/modules">Browse modules</Link>
          </div>
        </div>
        <div className="course-overview-facts" aria-label="Course structure">
          <div><Catalog size={20} /><strong>{progress.totalModules}</strong><span>Modules</span></div>
          <div><Book size={20} /><strong>{progress.totalLessons}</strong><span>Placeholder lessons</span></div>
          <div><Time size={20} /><strong>59h</strong><span>Estimated duration</span></div>
        </div>
      </header>

      <CourseProgress course={agritechCourse} />

      <section className="course-overview-modules" aria-labelledby="course-path-title">
        <div className="course-framework-section-heading">
          <div><p className="eyebrow">Course path</p><h2 id="course-path-title">Ten connected modules</h2></div>
          <p>Module metadata and lesson slots are ready for the future content-authoring phase.</p>
        </div>
        <div className="course-overview-module-grid">
          {agritechCourse.modules.map((module) => (
            <Link href={`/modules#${module.id}`} key={module.id}>
              <span className="course-module-index">Module {module.index}</span>
              <CourseIcon name={module.icon} />
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div><Tag size="sm" type="green">{module.difficulty}</Tag><span>{module.estimatedDuration}</span></div>
            </Link>
          ))}
        </div>
      </section>
    </CourseLayout>
  );
}
