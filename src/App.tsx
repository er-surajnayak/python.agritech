import { useEffect } from "react";
import { AppShell } from "@/components/navigation/AppShell";
import { Link } from "@/components/navigation/client-router";
import { usePathname } from "@/components/navigation/usePathname";
import { AppProviders } from "@/components/providers/AppProviders";
import { CourseOverviewPage } from "@/components/pages/CourseOverviewPage";
import { CourseWorkspacePage } from "@/components/pages/CourseWorkspacePage";
import { HomePage } from "@/components/pages/HomePage";
import { ModulesPage } from "@/components/pages/ModulesPage";
import { PlaceholderPage } from "@/components/pages/PlaceholderPage";
import { routeContent } from "@/content/course";
import { agritechCourse, getDefaultLessonId, getLessonPosition } from "@/content/course-framework";
import { getPublishedLesson } from "@/content/lessons";

const routeTitles: Record<string, string> = {
  "/": "DI Notes — Python Programming for Agritech",
  "/course": "Course overview · DI Notes",
  "/modules": "Modules · DI Notes",
  "/lessons": "Lessons · DI Notes",
  "/practice": "Practice studio · DI Notes",
  "/quizzes": "Knowledge checks · DI Notes",
  "/assignments": "Assignments · DI Notes",
  "/mini-projects": "Mini projects · DI Notes",
  "/resources": "Resource library · DI Notes",
  "/about": "About DI Notes · DI Notes",
};

function NotFoundPage() {
  return (
    <div className="standard-page page-enter not-found-page">
      <p className="eyebrow">404 · Page not found</p>
      <h1>This learning path does not exist.</h1>
      <p>The link may have changed, or the content has not been published yet.</p>
      <Link className="primary-action" href="/">Return home</Link>
    </div>
  );
}

function CurrentPage({ pathname }: { pathname: string }) {
  if (pathname === "/") return <HomePage />;
  if (pathname === "/course") return <CourseOverviewPage />;
  if (pathname === "/modules") return <ModulesPage />;
  if (pathname === "/lessons") {
    return <CourseWorkspacePage lessonId={getDefaultLessonId(agritechCourse)} />;
  }
  if (pathname.startsWith("/lessons/")) {
    const lessonId = pathname.slice("/lessons/".length);
    return getLessonPosition(agritechCourse, lessonId)
      ? <CourseWorkspacePage lessonId={lessonId} />
      : <NotFoundPage />;
  }
  const content = routeContent[pathname.slice(1)];
  return content ? <PlaceholderPage content={content} /> : <NotFoundPage />;
}

export function App() {
  const pathname = usePathname();

  useEffect(() => {
    const lessonId = pathname.startsWith("/lessons/") ? pathname.slice("/lessons/".length) : "";
    const publishedLesson = lessonId ? getPublishedLesson(lessonId) : null;
    document.title = publishedLesson
      ? `${publishedLesson.number} ${publishedLesson.title} · DI Notes`
      : pathname.startsWith("/lessons/")
        ? "Lesson framework · DI Notes"
        : routeTitles[pathname] ?? "Page not found · DI Notes";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <AppProviders>
      <AppShell>
        <CurrentPage pathname={pathname} />
      </AppShell>
    </AppProviders>
  );
}
