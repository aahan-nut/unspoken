"use client";

import { useClientValue } from "@/lib/useClientValue";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "day" | "night";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "unspoken-theme";

function readStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  return stored === "night" ? "night" : "day";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "night");
  document.documentElement.style.colorScheme = theme === "night" ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const storedTheme = useClientValue(readStoredTheme, "day");
  const [override, setOverride] = useState<Theme | null>(null);
  const theme = override ?? storedTheme;

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setOverride(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "day" ? "night" : "day");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
