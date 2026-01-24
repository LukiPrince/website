"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
}

export function GlassCard({
  children,
  className = "",
  tiltStrength = 10,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const percentX = mouseX / (rect.width / 2);
    const percentY = mouseY / (rect.height / 2);

    rotateX.set(-percentY * tiltStrength);
    rotateY.set(percentX * tiltStrength);

    glareX.set(50 + percentX * 30);
    glareY.set(50 + percentY * 30);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, var(--glass-highlight) 0%, transparent 60%)`
  );

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glass surface */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-50"
        style={{ background: glareBackground }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
