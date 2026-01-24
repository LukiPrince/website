"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SplitRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SplitReveal({ children, className = "", delay = 0 }: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Top reveal */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: "var(--bg-primary)" }}
        initial={{ scaleY: 1, originY: 0 }}
        animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.6,
          delay: delay + 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
