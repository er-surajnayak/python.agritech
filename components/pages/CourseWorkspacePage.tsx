import { Information, Time } from "@carbon/icons-react";
import { Tag } from "@carbon/react";
import { CourseBreadcrumb } from "@/components/course/CourseBreadcrumb";
import { CourseIcon } from "@/components/course/CourseIcon";
import { CourseLayout } from "@/components/course/CourseLayout";
import { LessonRenderer } from "@/components/learning/LessonRenderer";
import { PreviousNextNavigation } from "@/components/course/PreviousNextNavigation";
import { agritechCourse, getLessonPosition } from "@/content/course-framework";
import { getPublishedLesson } from "@/content/lessons";

export function CourseWorkspacePage({ lessonId }: { lessonId: string }) {
  const position = getLessonPosition(agritechCourse, lessonId);
  if (!position) return null;
  const { module, lesson, previous, next } = position;
  const publishedLesson = getPublishedLesson(lesson.id);

  return (
    <CourseLayout course={agritechCourse} currentLessonId={lesson.id}>
      {publishedLesson ? (
        <LessonRenderer
          key={publishedLesson.id}
          lesson={publishedLesson}
          courseLesson={lesson}
          module={module}
          previous={previous}
          next={next}
        />
      ) : (
        <>
          <CourseBreadcrumb module={module} lesson={lesson} />
          <header className="course-workspace-header">
            <div className="course-workspace-module-icon"><CourseIcon name={module.icon} size={24} /></div>
            <div>
              <p className="eyebrow">Module {module.index} · Lesson framework</p>
              <h1>{lesson.title}</h1>
              <div className="course-workspace-meta">
                <Tag type={lesson.status === "completed" ? "green" : lesson.status === "in-progress" ? "blue" : "gray"}>
                  {lesson.status.replace("-", " ")}
                </Tag>
                <span><Time size={16} /> {lesson.estimatedMinutes} min placeholder</span>
                <span>{module.difficulty}</span>
              </div>
            </div>
          </header>

          <section className="lesson-framework-placeholder" aria-labelledby="placeholder-title">
            <Information size={24} />
            <div>
              <p className="eyebrow">Content slot reserved</p>
              <h2 id="placeholder-title">Lesson content will be authored in a later phase.</h2>
              <p>The route, course context, progress state and sequence navigation are ready. No educational content is included here.</p>
            </div>
          </section>

          <section className="module-context-grid" aria-label="Module context">
            <article>
              <p className="eyebrow">Learning objectives</p>
              <h2>Module outcomes</h2>
              <ul>{module.learningObjectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
            </article>
            <article>
              <p className="eyebrow">Prerequisites</p>
              <h2>Before this module</h2>
              <ul>{module.prerequisites.map((prerequisite) => <li key={prerequisite}>{prerequisite}</li>)}</ul>
            </article>
          </section>

          <PreviousNextNavigation previous={previous} next={next} />
        </>
      )}
    </CourseLayout>
  );
}
