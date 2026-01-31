"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminInput, AdminTextarea } from "@/components/admin/AdminInput";

interface Experience {
  slug: string;
  order: number;
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    company: "",
    description: "",
    technologies: "",
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/experiences");
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      year: "",
      title: "",
      company: "",
      description: "",
      technologies: "",
    });
    setEditingId(null);
    setShowNewForm(false);
  };

  const handleEdit = (exp: Experience) => {
    setFormData({
      year: exp.year,
      title: exp.title,
      company: exp.company,
      description: exp.description,
      technologies: exp.technologies.join(", "),
    });
    setEditingId(exp.slug);
    setShowNewForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      year: formData.year,
      title: formData.title,
      company: formData.company,
      description: formData.description,
      technologies: formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        // Update existing
        await fetch(`/api/experiences/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new
        await fetch("/api/experiences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      resetForm();
      fetchExperiences();
      router.refresh();
    } catch (error) {
      console.error("Failed to save experience:", error);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      await fetch(`/api/experiences/${slug}`, { method: "DELETE" });
      fetchExperiences();
      router.refresh();
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            Manage your work experience timeline
          </p>
        </div>
        <AdminButton
          onClick={() => {
            resetForm();
            setShowNewForm(true);
          }}
        >
          + Add Experience
        </AdminButton>
      </div>

      {/* New/Edit Form */}
      {(showNewForm || editingId) && (
        <AdminCard>
          <h2
            className="text-lg font-medium mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            {editingId ? "Edit Experience" : "New Experience"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminInput
                label="Year"
                placeholder="e.g., 2024 - Present"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                required
              />
              <AdminInput
                label="Company"
                placeholder="Company name"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />
            </div>

            <AdminInput
              label="Job Title"
              placeholder="Your role"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />

            <AdminTextarea
              label="Description"
              placeholder="Describe your responsibilities and achievements"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <AdminInput
              label="Technologies"
              placeholder="React, TypeScript, Node.js (comma-separated)"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
            />

            <div className="flex gap-3 pt-4">
              <AdminButton type="submit">
                {editingId ? "Update" : "Create"} Experience
              </AdminButton>
              <AdminButton variant="ghost" onClick={resetForm}>
                Cancel
              </AdminButton>
            </div>
          </form>
        </AdminCard>
      )}

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
              <div className="flex gap-2">
                <AdminButton variant="ghost" onClick={() => handleEdit(exp)}>
                  Edit
                </AdminButton>
                <AdminButton
                  variant="danger"
                  onClick={() => handleDelete(exp.slug)}
                >
                  Delete
                </AdminButton>
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
              No experiences yet. Add your first one!
            </p>
          </AdminCard>
        )}
      </div>
    </div>
  );
}
