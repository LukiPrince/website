"use client";

import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  level: number; // 0-100
  icon?: string;
  category: string;
  index: number;
}

export function SkillCard({ name, level, icon, category, index }: SkillCardProps) {
  return (
    <motion.div
      className="group relative rounded-2xl p-5"
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{
        y: -4,
        borderColor: "var(--accent)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span
            className="text-xs uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            {category}
          </span>
          <h4
            className="text-lg font-light tracking-tight mt-1"
            style={{ color: "var(--text-primary)" }}
          >
            {name}
          </h4>
        </div>
        {icon && (
          <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
            {icon}
          </span>
        )}
      </div>

      {/* Skill level bar */}
      <div className="relative h-1 rounded-full overflow-hidden" style={{ background: "var(--glass-border)" }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "var(--accent)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Level indicator */}
      <div className="flex justify-between mt-2">
        <span
          className="text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          Proficiency
        </span>
        <motion.span
          className="text-xs font-medium"
          style={{ color: "var(--accent)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 + 0.8 }}
        >
          {level}%
        </motion.span>
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
        className="text-lg font-light tracking-tight mb-6"
        style={{ color: "var(--text-primary)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h3>
      <div className="grid gap-4 sm:grid-cols-2">
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
