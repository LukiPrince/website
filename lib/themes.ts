export interface Theme {
  id: string;
  name: string;
  colors: {
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accent: string;
    accentHover: string;
    accentSecondary: string;
    glassBlur: string;
    glassBg: string;
    shadowColor: string;
  };
}

export const themes: Record<string, Theme> = {
  light: {
    id: "light",
    name: "Light",
    colors: {
      bgPrimary: "#fafafa",
      bgSecondary: "#ffffff",
      textPrimary: "#1a1a1a",
      textSecondary: "#555555",
      textMuted: "#888888",
      accent: "#0071e3",
      accentHover: "#0077ed",
      accentSecondary: "#bf5af2",
      glassBlur: "80px",
      glassBg: "rgba(255, 255, 255, 0.65)",
      shadowColor: "rgba(0, 0, 0, 0.08)",
    },
  },
  dark: {
    id: "dark",
    name: "Dark",
    colors: {
      bgPrimary: "#0a0a0a",
      bgSecondary: "#1a1a1a",
      textPrimary: "#f5f5f5",
      textSecondary: "#a0a0a0",
      textMuted: "#707070",
      accent: "#0071e3",
      accentHover: "#0077ed",
      accentSecondary: "#bf5af2",
      glassBlur: "80px",
      glassBg: "rgba(30, 30, 30, 0.65)",
      shadowColor: "rgba(0, 0, 0, 0.5)",
    },
  },
  minimal: {
    id: "minimal",
    name: "Minimal",
    colors: {
      bgPrimary: "#ffffff",
      bgSecondary: "#f8f8f8",
      textPrimary: "#000000",
      textSecondary: "#666666",
      textMuted: "#999999",
      accent: "#000000",
      accentHover: "#333333",
      accentSecondary: "#666666",
      glassBlur: "40px",
      glassBg: "rgba(255, 255, 255, 0.5)",
      shadowColor: "rgba(0, 0, 0, 0.05)",
    },
  },
  gradient: {
    id: "gradient",
    name: "Gradient",
    colors: {
      bgPrimary: "#1a1a2e",
      bgSecondary: "#16213e",
      textPrimary: "#eaeaea",
      textSecondary: "#b0b0b0",
      textMuted: "#808080",
      accent: "#e94560",
      accentHover: "#f55a7a",
      accentSecondary: "#a166ff",
      glassBlur: "80px",
      glassBg: "rgba(26, 26, 46, 0.65)",
      shadowColor: "rgba(233, 69, 96, 0.2)",
    },
  },
};

export function getTheme(themeId: string = "light"): Theme {
  return themes[themeId] || themes.light;
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const colors = theme.colors;

  root.style.setProperty("--bg-primary", colors.bgPrimary);
  root.style.setProperty("--bg-secondary", colors.bgSecondary);
  root.style.setProperty("--text-primary", colors.textPrimary);
  root.style.setProperty("--text-secondary", colors.textSecondary);
  root.style.setProperty("--text-muted", colors.textMuted);
  root.style.setProperty("--accent", colors.accent);
  root.style.setProperty("--accent-hover", colors.accentHover);
  root.style.setProperty("--accent-secondary", colors.accentSecondary);
  root.style.setProperty("--refraction-blur", colors.glassBlur);
  root.style.setProperty("--glass-bg", colors.glassBg);
  root.style.setProperty("--glass-shadow", colors.shadowColor);

  // Store theme preference
  localStorage.setItem("theme-preference", theme.id);
}

export function getSavedTheme(): string {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme-preference") || "light";
}
