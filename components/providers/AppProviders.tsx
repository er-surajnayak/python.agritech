"use client";

import { Theme } from "@carbon/react";
import { useEffect, useMemo, useState } from "react";
import { ThemeContext, type ThemeMode } from "@/components/providers/theme-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("white");

  useEffect(() => {
    const saved = window.localStorage.getItem("di-notes-theme") as ThemeMode | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "g100" : "white";
    // Theme preferences are browser-only; this is the intentional post-hydration sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(saved === "white" || saved === "g100" ? saved : preferred);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode === "g100" ? "dark" : "light";
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggleTheme: () =>
        setMode((current) => {
          const next = current === "white" ? "g100" : "white";
          window.localStorage.setItem("di-notes-theme", next);
          return next;
        }),
    }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <Theme theme={mode} className="app-theme-root">
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
}
