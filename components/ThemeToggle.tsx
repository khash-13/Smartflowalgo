import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  id?: string;
  onThemeChange?: (theme: "light" | "dark") => void;
}

export default function ThemeToggle({ id = "theme-toggle-btn", onThemeChange }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  const updateThemeClass = (currentTheme: "light" | "dark") => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    if (currentTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      const initialTheme = savedTheme || "dark";
      setTheme(initialTheme);
      updateThemeClass(initialTheme);
      if (onThemeChange) {
        onThemeChange(initialTheme);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [onThemeChange]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeClass(newTheme);
    if (onThemeChange) onThemeChange(newTheme);
  };

  if (!mounted) {
    return (
      <button
        id={id}
        type="button"
        className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle visual theme"
      >
        <Sun className="h-4 w-4 text-amber-500" id="sun-icon" />
      </button>
    );
  }

  return (
    <button
      id={id}
      onClick={toggleTheme}
      type="button"
      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle visual theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-500" id="sun-icon" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-600" id="moon-icon" />
      )}
    </button>
  );
}
