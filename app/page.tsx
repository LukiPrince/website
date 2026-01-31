import { getExperiences, getSkills, getSiteConfig } from "@/lib/content";
import { HomeClient } from "@/components/HomeClient";

export default async function Home() {
  const [experiences, skills, config] = await Promise.all([
    getExperiences(),
    getSkills(),
    getSiteConfig(),
  ]);

  // Transform experiences for client component
  const experiencesData = experiences.map((exp) => ({
    year: exp.year,
    title: exp.title,
    company: exp.company,
    description: exp.description,
    technologies: exp.technologies,
  }));

  // Transform skills for client component
  const skillsData = {
    frontend: {
      title: skills.frontend.title,
      category: skills.frontend.category,
      skills: skills.frontend.skills,
    },
    backend: {
      title: skills.backend.title,
      category: skills.backend.category,
      skills: skills.backend.skills,
    },
    tools: {
      title: skills.tools.title,
      category: skills.tools.category,
      skills: skills.tools.skills,
    },
  };

  return (
    <HomeClient
      personalInfo={config.personalInfo}
      experiences={experiencesData}
      skills={skillsData}
      projects={config.projects}
      socialLinks={config.socialLinks}
    />
  );
}
