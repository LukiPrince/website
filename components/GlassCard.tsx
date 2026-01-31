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
  tiltStrength = 6,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  // Silky smooth spring
  const springConfig = { stiffness: 300, damping: 30 };
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

    glareX.set(50 + percentX * 30);
    glareY.set(50 + percentY * 30);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  // Dynamic glare that follows mouse
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(ellipse 60% 40% at ${x}% ${y}%, rgba(255, 255, 255, 0.35) 0%, transparent 50%)`
  );

  // Edge highlight
  const edgeHighlight = useTransform(
    [glareX, glareY],
    ([x, y]) => {
      const angle = Math.atan2((y as number) - 50, (x as number) - 50) * (180 / Math.PI);
      return `linear-gradient(${angle + 90}deg, rgba(255, 255, 255, 0.4) 0%, transparent 30%, transparent 70%, rgba(255, 255, 255, 0.1) 100%)`;
    }
  );

  // Mobile version - simplified glass
  if (isMobile) {
    return (
      <div className={`relative ${className}`}>
        <div
          className="absolute inset-0 rounded-[28px]"
          style={{
            background: "rgba(255, 255, 255, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(40px) saturate(160%)",
            WebkitBackdropFilter: "blur(40px) saturate(160%)",
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.08),
              0 4px 8px rgba(0, 0, 0, 0.04),
              inset 0 1px 0 rgba(255, 255, 255, 1)
            `,
          }}
        />
        {/* Top highlight */}
        <div
          className="absolute inset-x-[1px] top-[1px] h-1/3 rounded-t-[27px] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, transparent 100%)",
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
      {/* Main glass layer */}
      <div
        className="absolute inset-0 rounded-[28px]"
        style={{
          background: "rgba(255, 255, 255, 0.65)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(80px) saturate(200%)",
          WebkitBackdropFilter: "blur(80px) saturate(200%)",
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 4px 8px rgba(0, 0, 0, 0.04),
            0 1px 2px rgba(0, 0, 0, 0.02),
            inset 0 1px 0 rgba(255, 255, 255, 1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.02)
          `,
        }}
      />

      {/* Top refraction highlight */}
      <div
        className="pointer-events-none absolute inset-x-[1px] top-[1px] h-2/5 rounded-t-[27px]"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.6) 0%,
              rgba(255, 255, 255, 0.2) 40%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Edge highlight layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{ background: edgeHighlight, opacity: 0.5 }}
      />

      {/* Dynamic glare */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{ background: glareBackground }}
      />

      {/* Subtle inner shadow for depth */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        style={{
          boxShadow: `
            inset 0 0 60px rgba(255, 255, 255, 0.1),
            inset 0 0 20px rgba(255, 255, 255, 0.05)
          `,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
