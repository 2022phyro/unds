"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div className="w-9 h-9 shrink-0" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-9 h-9 shrink-0 flex items-center justify-center rounded-md border border-border bg-surface text-text-primary hover:bg-surface-muted transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Sun
        size={16}
        className="absolute transition-all duration-400 ease-out"
        style={{
          transform: isDark ? "rotate(90deg) scale(0)" : "rotate(0deg) scale(1)",
          opacity: isDark ? 0 : 1,
        }}
      />
      <Moon
        size={16}
        className="absolute transition-all duration-400 ease-out"
        style={{
          transform: isDark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
          opacity: isDark ? 1 : 0,
        }}
      />
    </button>
  );
}