"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

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
      className="relative flex gap-6 md:gap-10"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="h-3 w-3 rounded-full"
            style={{ background: "var(--accent)" }}
            animate={{
              boxShadow: [
                "0 0 0 0 var(--accent-glow)",
                "0 0 20px 4px var(--accent-glow)",
                "0 0 0 0 var(--accent-glow)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          />
        </motion.div>
        {!isLast && (
          <div
            className="h-full w-[1px] flex-1"
            style={{
              background: `linear-gradient(to bottom, var(--glass-border), transparent)`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <motion.div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
          }}
          whileHover={{
            background: "var(--glass-highlight)",
            borderColor: "var(--accent)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-medium tracking-wider"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
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
            className="text-xl md:text-2xl font-light tracking-tight mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h3>

          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            {description}
          </p>

          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
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
