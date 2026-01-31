"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", exact: true },
    { href: "/admin/experiences", label: "Experiences" },
    { href: "/admin/skills", label: "Skills" },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="flex items-center justify-between px-6 py-4 mb-8"
      style={{
        background: "rgba(255, 255, 255, 0.72)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        borderRadius: "16px",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-sm font-medium"
          style={{ color: "var(--accent)" }}
        >
          ← Back to Site
        </Link>

        <div className="h-4 w-px bg-[rgba(0,0,0,0.1)]" />

        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors px-3 py-1.5 rounded-full"
              style={{
                color: isActive(item.href, item.exact)
                  ? "var(--accent)"
                  : "var(--text-secondary)",
                background: isActive(item.href, item.exact)
                  ? "rgba(0, 122, 255, 0.1)"
                  : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="text-sm font-medium px-4 py-2 rounded-full transition-colors"
        style={{
          color: "var(--text-secondary)",
          background: "rgba(0, 0, 0, 0.04)",
        }}
      >
        Logout
      </button>
    </nav>
  );
}
