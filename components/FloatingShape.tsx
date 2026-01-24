"use client";

import { motion, useTransform, useInView } from "framer-motion";
import { useMousePosition } from "./MouseProvider";
import { useRef } from "react";

interface FloatingParticleProps {
  x: string;
  y: string;
  size?: number;
  delay?: number;
  duration?: number;
  opacity?: number;
}

export function FloatingParticle({
  x,
  y,
  size = 4,
  delay = 0,
  duration = 8,
  opacity = 0.3,
}: FloatingParticleProps) {
  const { smoothX, smoothY } = useMousePosition();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  const offsetX = useTransform(smoothX, (mouseX) => {
    if (typeof window === "undefined") return 0;
    const particleX = (parseFloat(x) / 100) * window.innerWidth;
    const distance = mouseX - particleX;
    const maxDistance = 400;
    if (Math.abs(distance) > maxDistance) return 0;
    const strength = 1 - Math.abs(distance) / maxDistance;
    return -distance * strength * 0.15;
  });

  const offsetY = useTransform(smoothY, (mouseY) => {
    if (typeof window === "undefined") return 0;
    const particleY = (parseFloat(y) / 100) * window.innerHeight;
    const distance = mouseY - particleY;
    const maxDistance = 400;
    if (Math.abs(distance) > maxDistance) return 0;
    const strength = 1 - Math.abs(distance) / maxDistance;
    return -distance * strength * 0.15;
  });

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        left: x,
        top: y,
        x: offsetX,
        y: offsetY,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? {
        opacity: opacity,
        scale: 1,
        y: [0, -15, 0],
      } : {
        opacity: 0,
        scale: 0,
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 0.8, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
          boxShadow: `0 0 ${size * 2}px var(--accent-glow)`,
        }}
      />
    </motion.div>
  );
}

// Re-export for backwards compatibility
export function FloatingShape(props: FloatingParticleProps & { type?: string; cursorReaction?: number }) {
  return <FloatingParticle {...props} />;
}
