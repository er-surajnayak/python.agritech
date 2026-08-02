"use client";

import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  Search,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
} from "@carbon/react";
import {
  AgricultureAnalytics,
  Book,
  Catalog,
  ChartLine,
  Close,
  Code,
  Education,
  Information,
  Light,
  Moon,
  Search as SearchIcon,
  Task,
  TaskComplete,
} from "@carbon/icons-react";
import { useState } from "react";
import { Link } from "@/components/navigation/client-router";
import { usePathname } from "@/components/navigation/usePathname";
import { useAppTheme } from "@/components/providers/theme-context";
import { agritechCourse, getCourseProgress } from "@/content/course-framework";

const primaryNavigation = [
  { label: "Home", href: "/", icon: Education },
  { label: "Course overview", href: "/course", icon: Catalog },
  { label: "Modules", href: "/modules", icon: Book },
  { label: "Lessons", href: "/lessons", icon: Code },
];

const activityNavigation = [
  { label: "Practice", href: "/practice", icon: Task },
  { label: "Quizzes", href: "/quizzes", icon: ChartLine },
  { label: "Assignments", href: "/assignments", icon: TaskComplete },
  { label: "Mini projects", href: "/mini-projects", icon: AgricultureAnalytics },
];

const supportNavigation = [
  { label: "Resources", href: "/resources", icon: Catalog },
  { label: "About", href: "/about", icon: Information },
];

function NavigationGroup({
  label,
  items,
  pathname,
  onNavigate,
}: {
  label: string;
  items: typeof primaryNavigation;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="side-nav-group">
      <p className="side-nav-label">{label}</p>
      {items.map(({ label: itemLabel, href, icon: Icon }) => (
        <SideNavLink
          key={href}
          as={Link}
          href={href}
          isActive={pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))}
          renderIcon={Icon}
          onClick={onNavigate}
        >
          {itemLabel}
        </SideNavLink>
      ))}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCourseFrameworkRoute = pathname === "/course" || pathname === "/modules" || pathname.startsWith("/lessons");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { mode, toggleTheme } = useAppTheme();
  const courseProgress = getCourseProgress(agritechCourse);

  return (
    <div className={isCourseFrameworkRoute ? "app-shell app-shell--course" : "app-shell"}>
      <Header aria-label="DI Notes">
        <SkipToContent />
        <HeaderMenuButton
          aria-label={navigationOpen ? "Close navigation" : "Open navigation"}
          isActive={navigationOpen}
          onClick={() => setNavigationOpen((open) => !open)}
          isCollapsible
        />
        <HeaderName as={Link} href="/" prefix="DI" onClick={() => setNavigationOpen(false)}>
          Notes
        </HeaderName>
        <div className="header-course-name">
          <span className="header-course-divider" />
          <span>Python Programming for Agritech</span>
        </div>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label={searchOpen ? "Close search" : "Search DI Notes"}
            tooltipAlignment="end"
            onClick={() => setSearchOpen((open) => !open)}
          >
            {searchOpen ? <Close size={20} /> : <SearchIcon size={20} />}
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label={mode === "g100" ? "Switch to light theme" : "Switch to dark theme"}
            tooltipAlignment="end"
            onClick={toggleTheme}
          >
            {mode === "g100" ? <Light size={20} /> : <Moon size={20} />}
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      {searchOpen && (
        <div className="global-search-panel" role="search">
          <Search
            size="lg"
            labelText="Search lessons, modules and resources"
            placeholder="Search the learning platform"
            closeButtonLabelText="Clear search input"
            autoFocus
          />
          <p>Search architecture is ready. Results will become available as course content is published.</p>
        </div>
      )}

      {(!isCourseFrameworkRoute || navigationOpen) && (
        <SideNav
          aria-label="Platform navigation"
          expanded={navigationOpen}
          isPersistent={false}
          className="course-side-nav"
        >
          <SideNavItems>
            <div className="course-identity">
              <div className="course-mark" aria-hidden="true">
                <AgricultureAnalytics size={20} />
              </div>
              <div>
                <span className="course-kicker">DI Notes</span>
                <strong>Python for Agritech</strong>
              </div>
            </div>
            <NavigationGroup label="Learn" items={primaryNavigation} pathname={pathname} onNavigate={() => setNavigationOpen(false)} />
            <NavigationGroup label="Apply" items={activityNavigation} pathname={pathname} onNavigate={() => setNavigationOpen(false)} />
            <NavigationGroup label="Support" items={supportNavigation} pathname={pathname} onNavigate={() => setNavigationOpen(false)} />
            <div className="sidebar-progress">
              <div className="sidebar-progress-heading">
                <span>Course progress</span>
                <strong>{courseProgress.percentage}%</strong>
              </div>
              <div className="progress-track" aria-label={`Course progress: ${courseProgress.percentage} percent`}>
                <span style={{ width: `${courseProgress.percentage}%` }} />
              </div>
              <p>{courseProgress.completedLessons} of {courseProgress.totalLessons} lessons complete.</p>
            </div>
            <a className="sidebar-product-attribution" href="https://www.nayaklabs.xyz" target="_blank" rel="noreferrer" aria-label="Visit NayakLabs website">
              <span>A product by</span>
              <strong>NayakLabs</strong>
            </a>
          </SideNavItems>
        </SideNav>
      )}

      {navigationOpen && (
        <button
          className="nav-backdrop"
          aria-label="Close navigation"
          onClick={() => setNavigationOpen(false)}
        />
      )}

      <main id="main-content" className={isCourseFrameworkRoute ? "app-content app-content--course" : "app-content"}>
        {children}
      </main>
    </div>
  );
}
