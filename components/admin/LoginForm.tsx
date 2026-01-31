"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminCard } from "./AdminCard";
import { AdminButton } from "./AdminButton";
import { AdminInput } from "./AdminInput";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Authentication failed");
        return;
      }

      // Refresh to show authenticated content
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <AdminCard className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-light tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Admin Panel
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Enter your password to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AdminInput
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            required
            autoFocus
          />

          <AdminButton
            type="submit"
            disabled={loading || !password}
            className="w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </AdminButton>
        </form>

        <p
          className="mt-6 text-xs text-center"
          style={{ color: "var(--text-muted)" }}
        >
          Forgot your password? Update ADMIN_PASSWORD_HASH in .env.local
        </p>
      </AdminCard>
    </div>
  );
}
