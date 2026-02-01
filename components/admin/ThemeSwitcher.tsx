"use client";

import { useTheme } from "@/components/ThemeProvider";
import { AdminCard } from "./AdminCard";

export function ThemeSwitcher() {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
    <AdminCard>
      <h2
        className="text-lg font-medium mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Theme Settings
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {availableThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className="p-4 rounded-xl transition-all border-2"
            style={{
              background:
                currentTheme.id === theme.id
                  ? "var(--accent)"
                  : "rgba(0, 0, 0, 0.02)",
              borderColor:
                currentTheme.id === theme.id
                  ? "var(--accent)"
                  : "rgba(0, 0, 0, 0.1)",
              color:
                currentTheme.id === theme.id ? "white" : "var(--text-primary)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  background: theme.colors.accent,
                }}
              />
              <span className="font-medium">{theme.name}</span>
            </div>
          </button>
        ))}
      </div>
      <p
        className="mt-4 text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        Your theme preference is automatically saved. It will persist across sessions.
      </p>
    </AdminCard>
  );
}
