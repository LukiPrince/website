// Type definitions for content

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
