"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminInput } from "@/components/admin/AdminInput";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  title: string;
  order: number;
  skills: Skill[];
  slug: string;
}

interface Skills {
  frontend: SkillCategory;
  backend: SkillCategory;
  tools: SkillCategory;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skills | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState<keyof Skills>("frontend");
  const router = useRouter();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills");
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillChange = (
    category: keyof Skills,
    index: number,
    field: "name" | "level",
    value: string | number
  ) => {
    if (!skills) return;

    const updatedSkills = { ...skills };
    updatedSkills[category].skills[index] = {
      ...updatedSkills[category].skills[index],
      [field]: field === "level" ? Number(value) : value,
    };
    setSkills(updatedSkills);
  };

  const handleAddSkill = (category: keyof Skills) => {
    if (!skills) return;

    const updatedSkills = { ...skills };
    updatedSkills[category].skills.push({ name: "", level: 50 });
    setSkills(updatedSkills);
  };

  const handleRemoveSkill = (category: keyof Skills, index: number) => {
    if (!skills) return;

    const updatedSkills = { ...skills };
    updatedSkills[category].skills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleSave = async () => {
    if (!skills) return;
    setSaving(true);

    try {
      // Save each category
      for (const category of ["frontend", "backend", "tools"] as const) {
        await fetch("/api/skills", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            data: skills[category],
          }),
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to save skills:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !skills) {
    return (
      <div className="flex items-center justify-center py-20">
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      </div>
    );
  }

  const categories: { key: keyof Skills; label: string; color: string }[] = [
    { key: "frontend", label: "Frontend", color: "#007aff" },
    { key: "backend", label: "Backend", color: "#5856d6" },
    { key: "tools", label: "Tools", color: "#34c759" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            Manage your skill categories and proficiency levels
          </p>
        </div>
        <AdminButton onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </AdminButton>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background:
                activeCategory === cat.key
                  ? `${cat.color}15`
                  : "transparent",
              color:
                activeCategory === cat.key
                  ? cat.color
                  : "var(--text-secondary)",
              border: `1px solid ${activeCategory === cat.key ? `${cat.color}30` : "transparent"}`,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Editor */}
      <AdminCard>
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-lg font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {skills[activeCategory].title}
          </h2>
          <AdminButton
            variant="secondary"
            onClick={() => handleAddSkill(activeCategory)}
          >
            + Add Skill
          </AdminButton>
        </div>

        <div className="space-y-4">
          {skills[activeCategory].skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: "rgba(0, 0, 0, 0.02)" }}
            >
              <div className="flex-1">
                <AdminInput
                  placeholder="Skill name"
                  value={skill.name}
                  onChange={(e) =>
                    handleSkillChange(
                      activeCategory,
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="w-32">
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) =>
                      handleSkillChange(
                        activeCategory,
                        index,
                        "level",
                        e.target.value
                      )
                    }
                    className="flex-1 accent-[var(--accent)]"
                  />
                  <span
                    className="text-sm font-medium w-10 text-right"
                    style={{ color: "var(--accent)" }}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>

              <AdminButton
                variant="ghost"
                onClick={() => handleRemoveSkill(activeCategory, index)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </AdminButton>
            </div>
          ))}

          {skills[activeCategory].skills.length === 0 && (
            <p
              className="text-center py-8"
              style={{ color: "var(--text-muted)" }}
            >
              No skills in this category. Add your first one!
            </p>
          )}
        </div>
      </AdminCard>

      {/* Preview */}
      <AdminCard>
        <h2
          className="text-lg font-medium mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Preview
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills[activeCategory].skills.map((skill, index) => (
            <div
              key={index}
              className="p-4 rounded-xl"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                border: "1px solid rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {skill.name || "Unnamed Skill"}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  {skill.level}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(0, 0, 0, 0.06)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${skill.level}%`,
                    background:
                      "linear-gradient(90deg, #007aff 0%, #5856d6 50%, #34c759 100%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
