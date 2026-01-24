"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import { MagneticButton } from "@/components/MagneticButton";
import { LiquidBlob } from "@/components/LiquidBlob";
import { FloatingParticle } from "@/components/FloatingShape";
import { GlassCard } from "@/components/GlassCard";
import { RevealText } from "@/components/RevealText";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* Background layer */}
      <div className="fixed inset-0 -z-10">
        <LiquidBlob />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none fixed inset-0 -z-5">
        <FloatingParticle x="10%" y="20%" size={6} delay={0} duration={12} opacity={0.4} />
        <FloatingParticle x="85%" y="15%" size={4} delay={0.5} duration={10} opacity={0.3} />
        <FloatingParticle x="75%" y="60%" size={8} delay={1} duration={14} opacity={0.35} />
        <FloatingParticle x="20%" y="70%" size={5} delay={0.3} duration={11} opacity={0.3} />
        <FloatingParticle x="50%" y="85%" size={3} delay={0.8} duration={9} opacity={0.25} />
        <FloatingParticle x="90%" y="45%" size={4} delay={1.2} duration={13} opacity={0.3} />
        <FloatingParticle x="5%" y="50%" size={5} delay={0.6} duration={10} opacity={0.35} />
        <FloatingParticle x="35%" y="30%" size={3} delay={1.5} duration={8} opacity={0.2} />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative flex min-h-screen flex-col items-center justify-center px-6"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Top navigation hint */}
        <motion.div
          className="absolute top-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase"
            style={{
              color: "var(--text-muted)",
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </span>
            Available for projects
          </div>
        </motion.div>

        {/* Main content */}
        <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
          {/* Eyebrow text */}
          <motion.p
            className="mb-6 text-sm tracking-[0.3em] uppercase"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Creative Developer
          </motion.p>

          {/* Main headline */}
          <AnimatedText
            text="Crafting digital experiences that feel alive"
            className="text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ color: "var(--text-primary)" }}
            parallaxStrength={0.01}
            italic={[1, 4]}
            accent={[4]}
          />

          {/* Subtitle */}
          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            I design and build interfaces that blend{" "}
            <span style={{ color: "var(--text-primary)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
              elegant aesthetics
            </span>{" "}
            with thoughtful interaction, creating moments of delight in every detail.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <MagneticButton
              href="#work"
              variant="primary"
              className="flex h-14 items-center justify-center rounded-full px-10 text-sm font-medium tracking-wide"
              cursorText="View"
            >
              Explore Work
            </MagneticButton>

            <MagneticButton
              href="#contact"
              variant="secondary"
              className="flex h-14 items-center justify-center rounded-full px-10 text-sm font-medium tracking-wide"
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
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
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

      {/* Featured section preview */}
      <section className="relative min-h-screen px-6 py-32">
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
              className="mt-4 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
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
            {[
              {
                title: "Immersive Gallery",
                category: "Web Experience",
                description: "A 3D art gallery with spatial audio and gesture controls",
              },
              {
                title: "Neural Interface",
                category: "Dashboard",
                description: "Real-time data visualization for AI model training",
              },
              {
                title: "Sonic Landscapes",
                category: "Creative Tool",
                description: "Generative music composition through visual interaction",
              },
              {
                title: "Fluid Commerce",
                category: "E-commerce",
                description: "Luxury retail experience with cinematic product reveals",
              },
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                      className="mt-6 aspect-[16/10] rounded-lg overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, var(--glass-bg) 0%, var(--glass-highlight) 100%)`,
                        border: "1px solid var(--glass-border)",
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
                        variant="ghost"
                        className="text-sm font-medium"
                        strength={0.2}
                      >
                        View Project
                      </MagneticButton>
                      <motion.div
                        className="h-8 w-8 rounded-full flex items-center justify-center"
                        style={{
                          background: "var(--glass-bg)",
                          border: "1px solid var(--glass-border)",
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
