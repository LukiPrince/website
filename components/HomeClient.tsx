"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import { MagneticButton } from "@/components/MagneticButton";
import { LiquidBlob } from "@/components/LiquidBlob";
import { FloatingParticle } from "@/components/FloatingShape";
import { GlassCard } from "@/components/GlassCard";
import { TimelineItem } from "@/components/TimelineItem";
import { SkillCategory } from "@/components/SkillCard";
import {
  SocialLink,
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
  EmailIcon,
} from "@/components/SocialLink";
import { useRef } from "react";

// Types for data
export interface Experience {
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategoryData {
  title: string;
  category: string;
  skills: Skill[];
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

export interface SocialLinkData {
  label: string;
  href: string;
  iconType: "github" | "linkedin" | "twitter" | "email";
}

interface HomeClientProps {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  skills: {
    frontend: SkillCategoryData;
    backend: SkillCategoryData;
    tools: SkillCategoryData;
  };
  projects: Project[];
  socialLinks: SocialLinkData[];
}

const iconComponents = {
  github: <GithubIcon />,
  linkedin: <LinkedInIcon />,
  twitter: <TwitterIcon />,
  email: <EmailIcon />,
};

export function HomeClient({
  personalInfo,
  experiences,
  skills,
  projects,
  socialLinks,
}: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Reduced parallax movement (150px instead of 300px)
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  // Faster scroll fade (0.25 threshold instead of 0.3)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Softer spring configs
  const softSpring = {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Background layer */}
      <div className="fixed inset-0 -z-10">
        <LiquidBlob />
      </div>

      {/* Floating particles - iOS blue */}
      <div className="pointer-events-none fixed inset-0 -z-5">
        <FloatingParticle x="10%" y="20%" size={5} delay={0} duration={12} opacity={0.5} />
        <FloatingParticle x="85%" y="15%" size={4} delay={0.5} duration={10} opacity={0.4} />
        <FloatingParticle x="75%" y="60%" size={6} delay={1} duration={14} opacity={0.45} />
        <FloatingParticle x="20%" y="70%" size={4} delay={0.3} duration={11} opacity={0.4} />
        <FloatingParticle x="50%" y="85%" size={3} delay={0.8} duration={9} opacity={0.35} />
        <FloatingParticle x="90%" y="45%" size={4} delay={1.2} duration={13} opacity={0.4} />
        <FloatingParticle x="5%" y="50%" size={5} delay={0.6} duration={10} opacity={0.45} />
        <FloatingParticle x="35%" y="30%" size={3} delay={1.5} duration={8} opacity={0.3} />
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <motion.section
        className="relative flex min-h-screen flex-col items-center justify-center px-6"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Top navigation hint */}
        {personalInfo.available && (
          <motion.div
            className="absolute top-8 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 2, duration: 0.8, ...softSpring }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase touch-target"
              style={{
                color: "var(--text-muted)",
                background: "rgba(255, 255, 255, 0.72)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: "#34c759" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: "#34c759" }}
                />
              </span>
              Available for projects
            </div>
          </motion.div>
        )}

        {/* Main content */}
        <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
          {/* Eyebrow text */}
          <motion.p
            className="mb-6 text-sm tracking-[0.3em] uppercase"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Main headline - using fluid typography */}
          <AnimatedText
            text={personalInfo.headline}
            className="fluid-heading-xl font-light tracking-tight"
            style={{ color: "var(--text-primary)" }}
            parallaxStrength={0.008}
            italic={[1, 4]}
            accent={[4]}
          />

          {/* Subtitle */}
          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {personalInfo.subtitle}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-6"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <MagneticButton
              href="#work"
              variant="primary"
              className="flex h-14 items-center justify-center px-10 text-sm font-medium tracking-wide touch-target"
              cursorText="View"
            >
              Explore Work
            </MagneticButton>

            <MagneticButton
              href="#contact"
              variant="secondary"
              className="flex h-14 items-center justify-center px-10 text-sm font-medium tracking-wide touch-target"
              cursorText="Say hi"
            >
              Get in Touch
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              Scroll
            </span>
            <div
              className="h-12 w-[1px]"
              style={{
                background: `linear-gradient(to bottom, var(--text-muted), transparent)`,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            {/* Left: Section title */}
            <div>
              <motion.span
                className="text-sm tracking-[0.3em] uppercase"
                style={{ color: "var(--accent)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                About
              </motion.span>
              <motion.h2
                className="mt-4 fluid-heading-lg font-light tracking-tight"
                style={{ color: "var(--text-primary)" }}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {personalInfo.aboutTitle.split(" ").map((word, i) =>
                  i === personalInfo.aboutTitle.split(" ").length - 1 ? (
                    <span key={i} style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                      {word}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </motion.h2>

              <motion.p
                className="mt-4 text-sm"
                style={{ color: "var(--text-muted)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {personalInfo.location}
              </motion.p>
            </div>

            {/* Right: About text */}
            <div className="space-y-6">
              {personalInfo.aboutText.map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <MagneticButton
                  href="#experience"
                  variant="ghost"
                  className="text-sm font-medium mt-4"
                  strength={0.2}
                >
                  View my experience →
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCE SECTION ==================== */}
      <section id="experience" className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <motion.span
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Experience
            </motion.span>
            <motion.h2
              className="mt-4 fluid-heading-lg font-light tracking-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              My{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                journey
              </span>{" "}
              so far
            </motion.h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {experiences.map((exp, i) => (
              <TimelineItem
                key={exp.year}
                year={exp.year}
                title={exp.title}
                company={exp.company}
                description={exp.description}
                technologies={exp.technologies}
                index={i}
                isLast={i === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section id="skills" className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-16">
            <motion.span
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Skills
            </motion.span>
            <motion.h2
              className="mt-4 fluid-heading-lg font-light tracking-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Technologies I{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                work with
              </span>
            </motion.h2>
          </div>

          {/* Skills grid */}
          <div className="grid gap-12 md:grid-cols-3">
            <SkillCategory
              title={skills.frontend.title}
              skills={skills.frontend.skills}
              category={skills.frontend.category}
              startIndex={0}
            />
            <SkillCategory
              title={skills.backend.title}
              skills={skills.backend.skills}
              category={skills.backend.category}
              startIndex={4}
            />
            <SkillCategory
              title={skills.tools.title}
              skills={skills.tools.skills}
              category={skills.tools.category}
              startIndex={8}
            />
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS SECTION ==================== */}
      <section id="work" className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-20">
            <motion.span
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Selected Work
            </motion.span>
            <motion.h2
              className="mt-4 fluid-heading-lg font-light tracking-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Projects that{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                push boundaries
              </span>
            </motion.h2>
          </div>

          {/* Project cards grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <GlassCard className="group h-full">
                  <div className="p-8">
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{ color: "var(--accent)" }}
                    >
                      {project.category}
                    </span>
                    <h3
                      className="mt-3 text-2xl font-light tracking-tight transition-colors duration-300 group-hover:text-[var(--accent)]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.description}
                    </p>

                    {/* Placeholder for project image */}
                    <div
                      className="mt-6 aspect-[16/10] rounded-2xl overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 100%)`,
                        border: "1px solid rgba(0, 0, 0, 0.04)",
                      }}
                    >
                      <motion.div
                        className="h-full w-full"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, var(--accent-glow) 0%, transparent 50%)`,
                        }}
                        animate={{
                          background: [
                            `radial-gradient(circle at 30% 30%, var(--accent-glow) 0%, transparent 50%)`,
                            `radial-gradient(circle at 70% 70%, var(--accent-glow) 0%, transparent 50%)`,
                            `radial-gradient(circle at 30% 30%, var(--accent-glow) 0%, transparent 50%)`,
                          ],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>

                    {/* View project link */}
                    <div className="mt-6 flex items-center justify-between">
                      <MagneticButton
                        href={project.link}
                        variant="ghost"
                        className="text-sm font-medium"
                        strength={0.2}
                      >
                        View Project
                      </MagneticButton>
                      <motion.div
                        className="h-8 w-8 rounded-full flex items-center justify-center touch-target"
                        style={{
                          background: "rgba(255, 255, 255, 0.72)",
                          border: "1px solid rgba(0, 0, 0, 0.06)",
                        }}
                        whileHover={{ scale: 1.1, rotate: 45 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          style={{ color: "var(--text-primary)" }}
                        >
                          <path
                            d="M1 13L13 1M13 1H5M13 1V9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <motion.span
              className="text-sm tracking-[0.3em] uppercase"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Contact
            </motion.span>
            <motion.h2
              className="mt-4 fluid-heading-lg font-light tracking-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let&apos;s{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                connect
              </span>
            </motion.h2>
            <motion.p
              className="mt-6 max-w-lg mx-auto text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
              Feel free to reach out through any of the channels below.
            </motion.p>
          </div>

          {/* Social links grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {socialLinks.map((link, i) => (
              <SocialLink
                key={link.label}
                href={link.href}
                label={link.label}
                icon={iconComponents[link.iconType]}
                index={i}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <MagneticButton
              href={`mailto:${socialLinks.find(l => l.iconType === 'email')?.href.replace('mailto:', '') || 'your@email.com'}`}
              variant="primary"
              className="inline-flex h-14 items-center justify-center px-10 text-sm font-medium tracking-wide touch-target"
              cursorText="Email"
            >
              Start a Conversation
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer
        className="relative px-6 py-12 border-t"
        style={{ borderColor: "rgba(0, 0, 0, 0.06)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <motion.p
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </motion.p>

            <motion.p
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Crafted with{" "}
              <span style={{ color: "var(--accent)" }}>♥</span> using Next.js & Framer Motion
            </motion.p>
          </div>
        </div>
      </footer>

      {/* Bottom gradient fade */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 h-32"
        style={{
          background: `linear-gradient(to top, var(--bg-primary), transparent)`,
        }}
      />
    </div>
  );
}
