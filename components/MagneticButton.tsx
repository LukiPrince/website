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
  strength = 0.35,
  variant = "primary",
  cursorText,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, mouseY } = useMousePosition();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const textXSpring = useSpring(textX, { stiffness: 350, damping: 25 });
  const textYSpring = useSpring(textY, { stiffness: 350, damping: 25 });

  const handleMouseMove = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = mouseX.get() - centerX;
    const distanceY = mouseY.get() - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = 120;

    if (distance < maxDistance) {
      const factor = 1 - distance / maxDistance;
      x.set(distanceX * strength * factor);
      y.set(distanceY * strength * factor);
      textX.set(distanceX * strength * 0.6 * factor);
      textY.set(distanceY * strength * 0.6 * factor);
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
    return 1 + absValue * 0.003;
  });

  const baseStyles = {
    primary: `
      relative overflow-hidden
      bg-[var(--text-primary)] text-[var(--bg-primary)]
      before:absolute before:inset-0 before:origin-left before:scale-x-0
      before:bg-[var(--accent)] before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)]
      hover:before:scale-x-100
    `,
    secondary: `
      relative overflow-hidden
      border border-[var(--glass-border)] bg-[var(--glass-bg)]
      text-[var(--text-primary)] backdrop-blur-xl
      before:absolute before:inset-0 before:origin-bottom before:scale-y-0
      before:bg-[var(--glass-highlight)] before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)]
      hover:before:scale-y-100 hover:border-[var(--glass-highlight)]
    `,
    ghost: `
      relative
      text-[var(--text-secondary)]
      after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-right after:scale-x-0
      after:bg-[var(--accent)] after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)]
      hover:text-[var(--text-primary)] hover:after:origin-left hover:after:scale-x-100
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
