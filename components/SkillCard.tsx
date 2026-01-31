"use client";

import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  level: number;
  icon?: string;
  category: string;
  index: number;
}

export function SkillCard({ name, level, category, index }: SkillCardProps) {
  return (
    <motion.div
      className="group relative rounded-[20px] p-5 overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(40px) saturate(160%)",
        WebkitBackdropFilter: "blur(40px) saturate(160%)",
        boxShadow: `
          0 4px 16px rgba(0, 0, 0, 0.04),
          0 1px 2px rgba(0, 0, 0, 0.02),
          inset 0 1px 0 rgba(255, 255, 255, 1)
        `,
      }}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      whileHover={{
        y: -3,
        boxShadow: `
          0 8px 32px rgba(0, 113, 227, 0.1),
          0 2px 4px rgba(0, 0, 0, 0.02),
          inset 0 1px 0 rgba(255, 255, 255, 1)
        `,
      }}
    >
      {/* Top highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)",
          borderRadius: "20px 20px 0 0",
        }}
      />

      <div className="relative flex items-start justify-between mb-4">
        <div>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.15em]"
            style={{ color: "var(--text-ghost)" }}
          >
            {category}
          </span>
          <h4
            className="text-base font-medium tracking-tight mt-1"
            style={{ color: "var(--text-primary)" }}
          >
            {name}
          </h4>
        </div>
        {/* Percentage */}
        <motion.span
          className="text-sm font-semibold tabular-nums"
          style={{ color: "var(--accent)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 + 0.6 }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Progress bar */}
      <div
        className="relative h-[6px] rounded-full overflow-hidden"
        style={{ background: "rgba(0, 0, 0, 0.05)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 60%, var(--accent-tertiary) 100%)",
            boxShadow: "0 0 16px var(--glow-accent)",
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.06 + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

interface SkillCategoryProps {
  title: string;
  skills: Array<{ name: string; level: number; icon?: string }>;
  category: string;
  startIndex: number;
}

export function SkillCategory({ title, skills, category, startIndex }: SkillCategoryProps) {
  return (
    <div>
      <motion.h3
        className="text-lg font-medium tracking-tight mb-8"
        style={{ color: "var(--text-primary)" }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h3>
      <div className="space-y-3">
        {skills.map((skill, i) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            level={skill.level}
            icon={skill.icon}
            category={category}
            index={startIndex + i}
          />
        ))}
      </div>
    </div>
  );
}
