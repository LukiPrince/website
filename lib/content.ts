import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface Experience {
  order: number;
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  slug: string;
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  title: string;
  order: number;
  skills: Skill[];
  slug: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  headline: string;
  subtitle: string;
  aboutTitle: string;
  aboutText: string[];
  location: string;
  available: boolean;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  link: string;
}

export interface SocialLink {
  label: string;
  href: string;
  iconType: "github" | "linkedin" | "twitter" | "email";
}

export interface SiteConfig {
  personalInfo: PersonalInfo;
  projects: Project[];
  socialLinks: SocialLink[];
}

// Get all experience files
export async function getExperiences(): Promise<Experience[]> {
  const experiencesDir = path.join(contentDirectory, "experiences");

  if (!fs.existsSync(experiencesDir)) {
    return [];
  }

  const files = fs.readdirSync(experiencesDir).filter((file) => file.endsWith(".mdx"));

  const experiences = files.map((filename) => {
    const filePath = path.join(experiencesDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      order: data.order || 0,
      year: data.year || "",
      title: data.title || "",
      company: data.company || "",
      description: content.trim() || data.description || "",
      technologies: data.technologies || [],
      slug: filename.replace(".mdx", ""),
    };
  });

  return experiences.sort((a, b) => a.order - b.order);
}

// Get a single experience by slug
export async function getExperience(slug: string): Promise<Experience | null> {
  const filePath = path.join(contentDirectory, "experiences", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    order: data.order || 0,
    year: data.year || "",
    title: data.title || "",
    company: data.company || "",
    description: content.trim() || data.description || "",
    technologies: data.technologies || [],
    slug,
  };
}

// Save an experience
export async function saveExperience(slug: string, experience: Omit<Experience, "slug">): Promise<void> {
  const filePath = path.join(contentDirectory, "experiences", `${slug}.mdx`);
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const { description, ...frontmatter } = experience;
  const content = matter.stringify(description, frontmatter);
  fs.writeFileSync(filePath, content, "utf8");
}

// Delete an experience
export async function deleteExperience(slug: string): Promise<void> {
  const filePath = path.join(contentDirectory, "experiences", `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

// Get all skill categories
export async function getSkills(): Promise<{
  frontend: SkillCategory;
  backend: SkillCategory;
  tools: SkillCategory;
}> {
  const skillsDir = path.join(contentDirectory, "skills");

  const defaultCategory = (category: string, title: string): SkillCategory => ({
    category,
    title,
    order: 0,
    skills: [],
    slug: category.toLowerCase(),
  });

  if (!fs.existsSync(skillsDir)) {
    return {
      frontend: defaultCategory("Frontend", "Frontend Development"),
      backend: defaultCategory("Backend", "Backend Development"),
      tools: defaultCategory("Tools", "Tools & Design"),
    };
  }

  const files = fs.readdirSync(skillsDir).filter((file) => file.endsWith(".mdx"));

  const categories: Record<string, SkillCategory> = {};

  for (const filename of files) {
    const filePath = path.join(skillsDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    const slug = filename.replace(".mdx", "");
    categories[slug] = {
      category: data.category || slug,
      title: data.title || slug,
      order: data.order || 0,
      skills: data.skills || [],
      slug,
    };
  }

  return {
    frontend: categories.frontend || defaultCategory("Frontend", "Frontend Development"),
    backend: categories.backend || defaultCategory("Backend", "Backend Development"),
    tools: categories.tools || defaultCategory("Tools", "Tools & Design"),
  };
}

// Get a single skill category
export async function getSkillCategory(slug: string): Promise<SkillCategory | null> {
  const filePath = path.join(contentDirectory, "skills", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    category: data.category || slug,
    title: data.title || slug,
    order: data.order || 0,
    skills: data.skills || [],
    slug,
  };
}

// Save a skill category
export async function saveSkillCategory(slug: string, category: Omit<SkillCategory, "slug">): Promise<void> {
  const filePath = path.join(contentDirectory, "skills", `${slug}.mdx`);
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = matter.stringify("", category);
  fs.writeFileSync(filePath, content, "utf8");
}

// Get site config (personal info, projects, social links)
export async function getSiteConfig(): Promise<SiteConfig> {
  const configPath = path.join(contentDirectory, "config.json");

  if (!fs.existsSync(configPath)) {
    return {
      personalInfo: {
        name: "Your Name",
        tagline: "Creative Developer",
        headline: "Crafting digital experiences that feel alive",
        subtitle: "I design and build interfaces that blend elegant aesthetics with thoughtful interaction.",
        aboutTitle: "A bit about myself",
        aboutText: ["Add your about text here."],
        location: "Based in Your City",
        available: true,
      },
      projects: [],
      socialLinks: [],
    };
  }

  const fileContents = fs.readFileSync(configPath, "utf8");
  return JSON.parse(fileContents);
}

// Save site config
export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  const configPath = path.join(contentDirectory, "config.json");
  const dir = path.dirname(configPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
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
