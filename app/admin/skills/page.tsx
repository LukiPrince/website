import { getSkills } from "@/lib/content";
import { AdminCard } from "@/components/admin/AdminCard";

export const runtime = "edge";

export default async function SkillsPage() {
  const skills = await getSkills();

  const categories = [
    { key: "frontend" as const, label: "Frontend", color: "#007aff", data: skills.frontend },
    { key: "backend" as const, label: "Backend", color: "#5856d6", data: skills.backend },
    { key: "tools" as const, label: "Tools", color: "#34c759", data: skills.tools },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-light tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Skills
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Your skill categories and proficiency levels
        </p>
        <p
          className="mt-1 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          To edit, modify files in <code className="px-1 py-0.5 rounded bg-[rgba(0,0,0,0.04)]">content/skills/</code> and redeploy
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {categories.map((cat) => (
          <AdminCard key={cat.key}>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: cat.color }}
              />
              <h2
                className="text-lg font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {cat.data.title}
              </h2>
            </div>

            <div className="space-y-4">
              {cat.data.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: cat.color }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(0, 0, 0, 0.06)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${cat.color} 0%, ${cat.color}aa 100%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p
              className="mt-4 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              File: {cat.key}.mdx
            </p>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
