import { getExperiences } from "@/lib/content";
import { AdminCard } from "@/components/admin/AdminCard";

export const runtime = "edge";

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-light tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Experiences
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Your work experience timeline
        </p>
        <p
          className="mt-1 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          To edit, modify files in <code className="px-1 py-0.5 rounded bg-[rgba(0,0,0,0.04)]">content/experiences/</code> and redeploy
        </p>
      </div>

      {/* Experiences List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <AdminCard key={exp.slug}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(0, 122, 255, 0.1)",
                      color: "var(--accent)",
                    }}
                  >
                    {exp.year}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {exp.company}
                  </span>
                </div>
                <h3
                  className="text-lg font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {exp.title}
                </h3>
                <p
                  className="mt-2 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {exp.description}
                </p>
                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: "rgba(0, 0, 0, 0.04)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {exp.slug}.mdx
              </div>
            </div>
          </AdminCard>
        ))}

        {experiences.length === 0 && (
          <AdminCard>
            <p
              className="text-center py-8"
              style={{ color: "var(--text-muted)" }}
            >
              No experiences found. Add MDX files to content/experiences/
            </p>
          </AdminCard>
        )}
      </div>
    </div>
  );
}
