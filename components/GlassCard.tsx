"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect, type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
}

export function GlassCard({
  children,
  className = "",
  tiltStrength = 8,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  // Softer spring config for iOS feel
  const springConfig = { stiffness: 400, damping: 25 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const percentX = mouseX / (rect.width / 2);
    const percentY = mouseY / (rect.height / 2);

    rotateX.set(-percentY * tiltStrength);
    rotateY.set(percentX * tiltStrength);

    glareX.set(50 + percentX * 25);
    glareY.set(50 + percentY * 25);
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
      `radial-gradient(ellipse at ${x}% ${y}%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)`
  );

  // Simplified card for mobile - reduced blur for performance
  if (isMobile) {
    return (
      <div className={`relative ${className}`}>
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(30px) saturate(150%)",
            WebkitBackdropFilter: "blur(30px) saturate(150%)",
            boxShadow: "var(--shadow-lg), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glass layer */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          backdropFilter: "blur(60px) saturate(180%)",
          WebkitBackdropFilter: "blur(60px) saturate(180%)",
          boxShadow: `
            var(--shadow-lg),
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 rgba(0, 0, 0, 0.03)
          `,
        }}
      />

      {/* Inner highlight for depth */}
      <div
        className="pointer-events-none absolute inset-[1px] rounded-3xl"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 40%)",
          opacity: 0.6,
        }}
      />

      {/* Dynamic glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-60"
        style={{ background: glareBackground }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
