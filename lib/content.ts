// Content utilities - works with Edge Runtime (Cloudflare)
// Content is statically embedded for Edge compatibility

import type {
  Experience,
  SkillCategory,
  SiteConfig,
} from "./content-types";

export type { Experience, SkillCategory, SiteConfig };
export type { PersonalInfo, Project, SocialLink, Skill } from "./content-types";

// Import config as JSON
import configData from "@/content/config.json";

// Pre-parsed experiences data (embedded for Edge Runtime)
const experiencesData: Experience[] = [
  {
    order: 1,
    year: "2024 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Company",
    description: "Leading the frontend architecture for a modern SaaS platform. Building scalable component libraries and implementing complex animations and interactions.",
    technologies: ["React", "TypeScript", "Next.js", "Framer Motion"],
    slug: "01-senior-developer",
  },
  {
    order: 2,
    year: "2022 - 2024",
    title: "Full Stack Developer",
    company: "Startup Inc",
    description: "Developed and maintained multiple web applications from concept to deployment. Collaborated with design teams to create pixel-perfect implementations.",
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "AWS"],
    slug: "02-fullstack-developer",
  },
  {
    order: 3,
    year: "2020 - 2022",
    title: "Junior Developer",
    company: "Agency Name",
    description: "Started my professional journey building websites for various clients. Learned the fundamentals of web development and client communication.",
    technologies: ["JavaScript", "HTML/CSS", "WordPress", "PHP"],
    slug: "03-junior-developer",
  },
  {
    order: 4,
    year: "2019",
    title: "Freelance Developer",
    company: "Self-Employed",
    description: "Took on freelance projects while completing my studies. Built small business websites and learned to manage client relationships.",
    technologies: ["React", "Firebase", "Figma"],
    slug: "04-freelance-developer",
  },
];

// Pre-parsed skills data (embedded for Edge Runtime)
const skillsData = {
  frontend: {
    category: "Frontend",
    title: "Frontend Development",
    order: 1,
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 85 },
    ],
    slug: "frontend",
  },
  backend: {
    category: "Backend",
    title: "Backend Development",
    order: 2,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 75 },
      { name: "PostgreSQL", level: 80 },
      { name: "REST APIs", level: 88 },
    ],
    slug: "backend",
  },
  tools: {
    category: "Tools",
    title: "Tools & Design",
    order: 3,
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Figma", level: 82 },
      { name: "Docker", level: 70 },
      { name: "CI/CD", level: 75 },
    ],
    slug: "tools",
  },
};

// Get all experiences
export async function getExperiences(): Promise<Experience[]> {
  return experiencesData.sort((a, b) => a.order - b.order);
}

// Get a single experience by slug
export async function getExperience(slug: string): Promise<Experience | null> {
  return experiencesData.find((exp) => exp.slug === slug) || null;
}

// Get all skill categories
export async function getSkills(): Promise<{
  frontend: SkillCategory;
  backend: SkillCategory;
  tools: SkillCategory;
}> {
  return skillsData;
}

// Get a single skill category
export async function getSkillCategory(slug: string): Promise<SkillCategory | null> {
  const key = slug as keyof typeof skillsData;
  return skillsData[key] || null;
}

// Get site config
export async function getSiteConfig(): Promise<SiteConfig> {
  return configData as SiteConfig;
}

// Utility: Generate a slug from a string
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Utility: Generate a filename with order prefix
export function generateExperienceFilename(order: number, title: string): string {
  const paddedOrder = order.toString().padStart(2, "0");
  const slug = generateSlug(title);
  return `${paddedOrder}-${slug}`;
}
