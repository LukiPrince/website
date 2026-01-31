"use client";

import { motion } from "framer-motion";

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  technologies?: string[];
  index: number;
  isLast?: boolean;
}

export function TimelineItem({
  year,
  title,
  company,
  description,
  technologies = [],
  index,
  isLast = false,
}: TimelineItemProps) {
  return (
    <motion.div
      className="relative flex gap-6 lg:gap-12"
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            boxShadow: `
              0 4px 16px rgba(0, 0, 0, 0.06),
              0 1px 2px rgba(0, 0, 0, 0.02),
              inset 0 1px 0 rgba(255, 255, 255, 1)
            `,
          }}
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Glowing dot */}
          <motion.div
            className="h-3.5 w-3.5 rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
              boxShadow: "0 0 12px var(--glow-accent)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 12px var(--glow-accent)",
                "0 0 24px var(--glow-accent), 0 0 40px var(--glow-purple)",
                "0 0 12px var(--glow-accent)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
          />
        </motion.div>
        {/* Vertical line */}
        {!isLast && (
          <div
            className="h-full w-[1px] flex-1 mt-2"
            style={{
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.06), transparent)",
            }}
          />
        )}
      </div>

      {/* Content card */}
      <div className="flex-1 pb-16">
        <motion.div
          className="relative rounded-[24px] p-7 lg:p-9 overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(60px) saturate(180%)",
            WebkitBackdropFilter: "blur(60px) saturate(180%)",
            boxShadow: `
              0 4px 20px rgba(0, 0, 0, 0.05),
              0 1px 2px rgba(0, 0, 0, 0.02),
              inset 0 1px 0 rgba(255, 255, 255, 1)
            `,
          }}
          whileHover={{
            boxShadow: `
              0 8px 40px rgba(0, 113, 227, 0.1),
              0 2px 4px rgba(0, 0, 0, 0.02),
              inset 0 1px 0 rgba(255, 255, 255, 1)
            `,
            y: -2,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Top highlight */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
            style={{
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)",
              borderRadius: "24px 24px 0 0",
            }}
          />

          {/* Header */}
          <div className="relative flex flex-wrap items-center gap-3 mb-4">
            <span
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
              style={{
                background: "linear-gradient(135deg, rgba(0, 113, 227, 0.12) 0%, rgba(191, 90, 242, 0.08) 100%)",
                color: "var(--accent)",
                border: "1px solid rgba(0, 113, 227, 0.15)",
              }}
            >
              {year}
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--accent)" }}
            >
              {company}
            </span>
          </div>

          <h3
            className="relative text-xl lg:text-2xl font-light tracking-tight mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h3>

          <p
            className="relative text-sm leading-relaxed mb-5"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>

          {/* Technology tags */}
          {technologies.length > 0 && (
            <div className="relative flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: "rgba(255, 255, 255, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.8)",
                    color: "var(--text-muted)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
