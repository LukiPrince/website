import Link from "next/link";
import { getExperiences, getSkills, getSiteConfig } from "@/lib/content";
import { AdminCard } from "@/components/admin/AdminCard";

export const runtime = "edge";

export default async function AdminDashboard() {
  const [experiences, skills, config] = await Promise.all([
    getExperiences(),
    getSkills(),
    getSiteConfig(),
  ]);

  const totalSkills =
    skills.frontend.skills.length +
    skills.backend.skills.length +
    skills.tools.skills.length;

  const stats = [
    {
      label: "Experiences",
      value: experiences.length,
      href: "/admin/experiences",
    },
    {
      label: "Skills",
      value: totalSkills,
      href: "/admin/skills",
    },
    {
      label: "Projects",
      value: config.projects.length,
      href: "#",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-light tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Dashboard
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Welcome to your portfolio admin panel. View your content here.
        </p>
        <p
          className="mt-1 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          Note: On Cloudflare, editing is disabled. Update source files and redeploy to make changes.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <AdminCard className="hover:shadow-[0_8px_32px_rgba(0,122,255,0.1)] transition-shadow cursor-pointer">
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </p>
              <p
                className="mt-2 text-4xl font-light"
                style={{ color: "var(--text-primary)" }}
              >
                {stat.value}
              </p>
            </AdminCard>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <AdminCard>
        <h2
          className="text-lg font-medium mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Quick Actions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/experiences"
            className="flex items-center gap-4 p-4 rounded-xl transition-colors"
            style={{
              background: "rgba(0, 122, 255, 0.05)",
              border: "1px solid rgba(0, 122, 255, 0.1)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "var(--accent)", color: "white" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div>
              <p
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                View Experiences
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                See your work history
              </p>
            </div>
          </Link>

          <Link
            href="/admin/skills"
            className="flex items-center gap-4 p-4 rounded-xl transition-colors"
            style={{
              background: "rgba(88, 86, 214, 0.05)",
              border: "1px solid rgba(88, 86, 214, 0.1)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "#5856d6", color: "white" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <p
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                View Skills
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                See skill levels
              </p>
            </div>
          </Link>
        </div>
      </AdminCard>

      {/* Recent Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Experiences */}
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              Recent Experiences
            </h2>
            <Link
              href="/admin/experiences"
              className="text-sm"
              style={{ color: "var(--accent)" }}
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {experiences.slice(0, 3).map((exp) => (
              <div
                key={exp.slug}
                className="p-3 rounded-xl"
                style={{ background: "rgba(0, 0, 0, 0.02)" }}
              >
                <p
                  className="font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {exp.title}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {exp.company} • {exp.year}
                </p>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Site Info */}
        <AdminCard>
          <h2
            className="text-lg font-medium mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Site Configuration
          </h2>
          <div className="space-y-3">
            <div
              className="p-3 rounded-xl"
              style={{ background: "rgba(0, 0, 0, 0.02)" }}
            >
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Name
              </p>
              <p
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {config.personalInfo.name}
              </p>
            </div>
            <div
              className="p-3 rounded-xl"
              style={{ background: "rgba(0, 0, 0, 0.02)" }}
            >
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Tagline
              </p>
              <p
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {config.personalInfo.tagline}
              </p>
            </div>
            <div
              className="p-3 rounded-xl"
              style={{ background: "rgba(0, 0, 0, 0.02)" }}
            >
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Status
              </p>
              <p
                className="font-medium"
                style={{ color: config.personalInfo.available ? "#34c759" : "var(--text-secondary)" }}
              >
                {config.personalInfo.available ? "Available for projects" : "Not available"}
              </p>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
