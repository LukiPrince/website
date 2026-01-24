"use client";

import { motion, useTransform, useInView } from "framer-motion";
import { useMousePosition } from "./MouseProvider";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  parallaxStrength?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  italic?: number[];
  accent?: number[];
  style?: React.CSSProperties;
}

export function AnimatedText({
  text,
  className = "",
  parallaxStrength = 0.015,
  as: Component = "h1",
  italic = [],
  accent = [],
  style: customStyle,
}: AnimatedTextProps) {
  const { smoothX, smoothY } = useMousePosition();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateX: -40,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        mass: 1,
      },
    },
  };

  const x = useTransform(smoothX, (value) => {
    if (typeof window === "undefined") return 0;
    const center = window.innerWidth / 2;
    return (value - center) * -parallaxStrength;
  });

  const y = useTransform(smoothY, (value) => {
    if (typeof window === "undefined") return 0;
    const center = window.innerHeight / 2;
    return (value - center) * -parallaxStrength;
  });

  const MotionComponent = motion[Component] as typeof motion.h1;

  return (
    <MotionComponent
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ x, y, perspective: 1000, ...customStyle }}
    >
      {words.map((word, i) => {
        const isItalic = italic.includes(i);
        const isAccent = accent.includes(i);

        return (
          <motion.span
            key={i}
            variants={wordVariants}
            className="relative inline-block"
            style={{
              marginRight: "0.25em",
              fontStyle: isItalic ? "italic" : "normal",
              fontFamily: isItalic ? "var(--font-serif)" : "inherit",
              color: isAccent ? "var(--accent)" : "inherit",
            }}
          >
            {word}
            {isAccent && (
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left"
                style={{ backgroundColor: "var(--accent)" }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
}
