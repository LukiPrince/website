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
import Link from "next/link";

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

// Admin FAB Icon
function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

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

  // Smooth parallax with reduced movement
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative">
      {/* Background layer */}
      <div className="fixed inset-0 -z-10">
        <LiquidBlob />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none fixed inset-0 -z-5">
        <FloatingParticle x="8%" y="15%" size={6} delay={0} duration={14} opacity={0.4} />
        <FloatingParticle x="92%" y="12%" size={4} delay={0.5} duration={12} opacity={0.35} />
        <FloatingParticle x="78%" y="55%" size={5} delay={1} duration={16} opacity={0.4} />
        <FloatingParticle x="15%" y="65%" size={4} delay={0.3} duration={13} opacity={0.35} />
        <FloatingParticle x="45%" y="80%" size={3} delay={0.8} duration={11} opacity={0.3} />
        <FloatingParticle x="88%" y="40%" size={5} delay={1.2} duration={15} opacity={0.35} />
      </div>

      {/* Admin FAB Button */}
      <Link href="/admin" className="admin-fab touch-target" title="Admin Panel">
        <SettingsIcon />
      </Link>

      {/* ==================== HERO SECTION ==================== */}
      <motion.section
        className="relative flex min-h-screen flex-col items-center justify-center px-6"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        {/* Availability badge */}
        {personalInfo.available && (
          <motion.div
            className="absolute top-8 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <div className="glass-panel-subtle flex items-center gap-2.5 px-5 py-2.5 text-xs font-medium tracking-wide">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ backgroundColor: "var(--accent-tertiary)" }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: "var(--accent-tertiary)" }}
                />
              </span>
              <span style={{ color: "var(--text-secondary)" }}>
                Available for projects
              </span>
            </div>
          </motion.div>
        )}

        {/* Main content */}
        <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.p
            className="mb-8 text-sm font-medium tracking-[0.35em] uppercase"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Main headline */}
          <AnimatedText
            text={personalInfo.headline}
            className="fluid-heading-xl font-light tracking-tight"
            style={{ color: "var(--text-primary)" }}
            parallaxStrength={0.006}
            italic={[1, 3]}
            accent={[3]}
          />

          {/* Subtitle */}
          <motion.p
            className="mt-10 max-w-2xl fluid-body-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {personalInfo.subtitle}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-14 flex flex-col gap-4 sm:flex-row sm:gap-5"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.7, duration: 0.8 }}
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
              cursorText="Hello"
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
          transition={{ delay: 2.8, duration: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              className="text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: "var(--text-ghost)" }}
            >
              Scroll
            </span>
            <div
              className="h-10 w-[1px]"
              style={{
                background: "linear-gradient(to bottom, var(--text-muted), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="relative px-6 py-32 lg:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
            {/* Left: Section title */}
            <div className="lg:sticky lg:top-32">
              <motion.span
                className="text-sm font-semibold tracking-[0.2em] uppercase text-gradient-accent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                About
              </motion.span>
              <motion.h2
                className="mt-5 fluid-heading-lg font-light tracking-tight"
                style={{ color: "var(--text-primary)" }}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                {personalInfo.aboutTitle.split(" ").slice(0, -1).join(" ")}{" "}
                <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                  {personalInfo.aboutTitle.split(" ").slice(-1)[0]}
                </span>
              </motion.h2>

              <motion.div
                className="mt-6 flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ color: "var(--accent)" }}
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                  {personalInfo.location}
                </span>
              </motion.div>
            </div>

            {/* Right: About text */}
            <div className="space-y-8">
              {personalInfo.aboutText.map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-lg leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
                >
                  {paragraph}
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="pt-4"
              >
                <MagneticButton
                  href="#experience"
                  variant="ghost"
                  className="text-sm font-medium"
                  strength={0.2}
                >
                  View my experience
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCE SECTION ==================== */}
      <section id="experience" className="relative px-6 py-32 lg:py-40">
        <div className="mx-auto max-w-4xl">
          {/* Section header */}
          <div className="mb-20 text-center">
            <motion.span
              className="text-sm font-semibold tracking-[0.2em] uppercase text-gradient-accent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Experience
            </motion.span>
            <motion.h2
              className="mt-5 fluid-heading-lg font-light tracking-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
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
      <section id="skills" className="relative px-6 py-32 lg:py-40">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-20">
            <motion.span
              className="text-sm font-semibold tracking-[0.2em] uppercase text-gradient-accent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Skills
            </motion.span>
            <motion.h2
              className="mt-5 fluid-heading-lg font-light tracking-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Technologies I{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                work with
              </span>
            </motion.h2>
          </div>

          {/* Skills grid */}
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
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
      <section id="work" className="relative px-6 py-32 lg:py-40">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <div className="mb-20">
            <motion.span
              className="text-sm font-semibold tracking-[0.2em] uppercase text-gradient-accent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Selected Work
            </motion.span>
            <motion.h2
              className="mt-5 fluid-heading-lg font-light tracking-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Projects that{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                inspire
              </span>
            </motion.h2>
          </div>

          {/* Project cards grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
              >
                <GlassCard className="group h-full interactive-lift">
                  <div className="p-8 lg:p-10">
                    <span
                      className="text-xs font-semibold tracking-[0.15em] uppercase"
                      style={{ color: "var(--accent)" }}
                    >
                      {project.category}
                    </span>
                    <h3
                      className="mt-4 text-2xl font-light tracking-tight transition-colors duration-300 group-hover:text-[var(--accent)]"
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

                    {/* Project visual placeholder */}
                    <div
                      className="mt-8 aspect-[16/9] rounded-2xl overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      <motion.div
                        className="h-full w-full"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 30%, var(--glow-accent) 0%, transparent 60%)",
                        }}
                        animate={{
                          background: [
                            "radial-gradient(circle at 30% 30%, var(--glow-accent) 0%, transparent 60%)",
                            "radial-gradient(circle at 70% 60%, var(--glow-purple) 0%, transparent 60%)",
                            "radial-gradient(circle at 30% 30%, var(--glow-accent) 0%, transparent 60%)",
                          ],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>

                    {/* View project link */}
                    <div className="mt-8 flex items-center justify-between">
                      <MagneticButton
                        href={project.link}
                        variant="ghost"
                        className="text-sm font-medium"
                        strength={0.15}
                      >
                        View Project
                      </MagneticButton>
                      <motion.div
                        className="h-10 w-10 rounded-xl flex items-center justify-center touch-target glass-panel-subtle"
                        whileHover={{ scale: 1.08, rotate: 45 }}
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
      <section id="contact" className="relative px-6 py-32 lg:py-40">
        <div className="mx-auto max-w-4xl">
          {/* Section header */}
          <div className="mb-20 text-center">
            <motion.span
              className="text-sm font-semibold tracking-[0.2em] uppercase text-gradient-accent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Contact
            </motion.span>
            <motion.h2
              className="mt-5 fluid-heading-lg font-light tracking-tight"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Let&apos;s{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                connect
              </span>
            </motion.h2>
            <motion.p
              className="mt-8 max-w-lg mx-auto text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              Have a project in mind or just want to say hello? I&apos;d love to hear from you.
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

          {/* Primary CTA */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <MagneticButton
              href="mailto:lukaswotzka@icloud.com"
              variant="primary"
              className="inline-flex h-14 items-center justify-center px-12 text-sm font-medium tracking-wide touch-target"
              cursorText="Email"
            >
              Start a Conversation
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer
        className="relative px-6 py-16"
        style={{ borderTop: "1px solid rgba(0, 0, 0, 0.04)" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <motion.p
              className="text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              &copy; {new Date().getFullYear()} {personalInfo.name}
            </motion.p>

            <motion.p
              className="text-sm"
              style={{ color: "var(--text-ghost)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Crafted with precision
            </motion.p>
          </div>
        </div>
      </footer>

      {/* Bottom gradient fade */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 h-24"
        style={{
          background: "linear-gradient(to top, var(--bg-primary), transparent)",
        }}
      />
    </div>
  );
}
