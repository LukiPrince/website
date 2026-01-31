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
      className="relative flex gap-6 md:gap-10"
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.72)",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
          }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="h-3 w-3 rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
            }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(0, 122, 255, 0)",
                "0 0 16px 4px rgba(0, 122, 255, 0.2)",
                "0 0 0 0 rgba(0, 122, 255, 0)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
          />
        </motion.div>
        {!isLast && (
          <div
            className="h-full w-[1px] flex-1"
            style={{
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.08), transparent)`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <motion.div
          className="rounded-3xl p-6 md:p-8"
          style={{
            background: "rgba(255, 255, 255, 0.72)",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            backdropFilter: "blur(40px) saturate(150%)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
          }}
          whileHover={{
            boxShadow: "0 8px 32px rgba(0, 122, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
            borderColor: "rgba(0, 122, 255, 0.2)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {/* Tinted badge for year */}
            <span
              className="px-3 py-1.5 rounded-full text-xs font-medium tracking-wider"
              style={{
                background: "linear-gradient(135deg, rgba(0, 122, 255, 0.12) 0%, rgba(88, 86, 214, 0.08) 100%)",
                color: "var(--accent)",
                border: "1px solid rgba(0, 122, 255, 0.15)",
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
                    background: "rgba(255, 255, 255, 0.6)",
                    border: "1px solid rgba(0, 0, 0, 0.04)",
                    color: "var(--text-muted)",
                    backdropFilter: "blur(10px)",
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
