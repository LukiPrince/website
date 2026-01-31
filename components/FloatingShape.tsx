"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  opacity = 0.4,
}: FloatingParticleProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  // Don't render on mobile or until mounted
  if (!isMounted || isMobile) {
    return null;
  }

  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: opacity,
        scale: 1,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.6, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      {/* iOS blue glow particle */}
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, rgba(0, 122, 255, 0.6) 0%, rgba(88, 86, 214, 0.4) 100%)`,
          boxShadow: `
            0 0 ${size * 2}px rgba(0, 122, 255, 0.3),
            0 0 ${size * 4}px rgba(0, 122, 255, 0.15)
          `,
        }}
      />
    </motion.div>
  );
}

// Re-export for backwards compatibility
export function FloatingShape(props: FloatingParticleProps & { type?: string; cursorReaction?: number }) {
  return <FloatingParticle {...props} />;
}
