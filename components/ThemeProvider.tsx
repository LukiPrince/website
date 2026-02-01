"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { themes, applyTheme, getSavedTheme, type Theme } from "@/lib/themes";

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.light);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = getSavedTheme();
    const theme = themes[savedTheme] || themes.light;
    setCurrentTheme(theme);
    applyTheme(theme);
    setMounted(true);
  }, []);

  const handleSetTheme = (themeId: string) => {
    const theme = themes[themeId] || themes.light;
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  if (!mounted) {
    return children;
  }

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme: handleSetTheme,
        availableThemes: Object.values(themes),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
