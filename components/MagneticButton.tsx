"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMousePosition } from "./MouseProvider";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  variant?: "primary" | "secondary" | "ghost";
  cursorText?: string;
}

export function MagneticButton({
  children,
  className = "",
  href,
  strength = 0.3,
  variant = "primary",
  cursorText,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, mouseY } = useMousePosition();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);

  // Softer spring config for iOS feel
  const springConfig = { stiffness: 400, damping: 25, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const textXSpring = useSpring(textX, { stiffness: 500, damping: 30 });
  const textYSpring = useSpring(textY, { stiffness: 500, damping: 30 });

  const handleMouseMove = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = mouseX.get() - centerX;
    const distanceY = mouseY.get() - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const factor = 1 - distance / maxDistance;
      x.set(distanceX * strength * factor);
      y.set(distanceY * strength * factor);
      textX.set(distanceX * strength * 0.5 * factor);
      textY.set(distanceY * strength * 0.5 * factor);
    } else {
      x.set(0);
      y.set(0);
      textX.set(0);
      textY.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    textX.set(0);
    textY.set(0);
  };

  const scale = useTransform(xSpring, (value) => {
    const absValue = Math.abs(value);
    return 1 + absValue * 0.002;
  });

  // iOS-inspired button styles
  const baseStyles = {
    primary: `
      relative overflow-hidden
      bg-gradient-to-b from-[#007aff] to-[#0066d6]
      text-white font-medium
      shadow-[0_2px_8px_rgba(0,122,255,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]
      hover:shadow-[0_4px_16px_rgba(0,122,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
      active:shadow-[0_1px_4px_rgba(0,122,255,0.3)]
      transition-shadow duration-200
    `,
    secondary: `
      relative overflow-hidden
      bg-[rgba(255,255,255,0.72)]
      border border-[rgba(0,0,0,0.06)]
      text-[var(--accent)] font-medium
      backdrop-blur-xl
      shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)]
      hover:bg-[rgba(255,255,255,0.9)]
      hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]
      transition-all duration-200
    `,
    ghost: `
      relative
      text-[var(--text-secondary)] font-medium
      after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-right after:scale-x-0
      after:bg-gradient-to-r after:from-[var(--accent)] after:to-[var(--accent-secondary)]
      after:transition-transform after:duration-300 after:ease-out
      hover:text-[var(--accent)] hover:after:origin-left hover:after:scale-x-100
    `,
  };

  const content = (
    <motion.div
      ref={ref}
      className={`${baseStyles[variant]} ${className}`}
      style={{
        x: xSpring,
        y: ySpring,
        scale,
        borderRadius: variant === "ghost" ? undefined : "980px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      data-magnetic
      data-cursor-text={cursorText}
    >
      <motion.span
        className="relative z-10 block"
        style={{
          x: textXSpring,
          y: textYSpring,
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("//");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return content;
}
