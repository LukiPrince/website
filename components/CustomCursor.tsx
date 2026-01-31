"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [hoverText, setHoverText] = useState<string | null>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Ultra-smooth spring configs
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const trailConfig = { stiffness: 120, damping: 22, mass: 1 };
  const morphConfig = { stiffness: 350, damping: 28 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const trailXSpring = useSpring(cursorX, trailConfig);
  const trailYSpring = useSpring(cursorY, trailConfig);

  const cursorSize = useSpring(8, morphConfig);
  const trailSize = useSpring(40, morphConfig);
  const trailOpacity = useSpring(0.5, morphConfig);
  const borderRadius = useSpring(50, morphConfig);

  const cursorMarginLeft = useTransform(cursorSize, (s) => -s / 2);
  const cursorMarginTop = useTransform(cursorSize, (s) => -s / 2);
  const trailMarginLeft = useTransform(trailSize, (s) => -s / 2);
  const trailMarginTop = useTransform(trailSize, (s) => -s / 2);
  const borderRadiusPercent = useTransform(borderRadius, (r) => `${r}%`);

  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      lastX.current = e.clientX;
      lastY.current = e.clientY;

      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = target.closest("a, button, [data-magnetic], [data-cursor-text]");

      if (interactiveElement) {
        cursorSize.set(4);
        trailSize.set(80);
        trailOpacity.set(0.25);

        const cursorTextAttr = interactiveElement.getAttribute("data-cursor-text");
        if (cursorTextAttr) {
          setHoverText(cursorTextAttr);
          trailSize.set(100);
        }

        if (interactiveElement.hasAttribute("data-cursor-square")) {
          borderRadius.set(20);
        }
      }
    };

    const handleHoverEnd = () => {
      setHoverText(null);
      cursorSize.set(8);
      trailSize.set(40);
      trailOpacity.set(0.5);
      borderRadius.set(50);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, [isTouchDevice, cursorX, cursorY, cursorSize, trailSize, trailOpacity, borderRadius]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot - glowing accent */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            width: cursorSize,
            height: cursorSize,
            marginLeft: cursorMarginLeft,
            marginTop: cursorMarginTop,
            opacity: isVisible ? 1 : 0,
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
              boxShadow: `
                0 0 16px var(--glow-accent),
                0 0 32px var(--glow-purple)
              `,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Trailing liquid glass ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            width: trailSize,
            height: trailSize,
            marginLeft: trailMarginLeft,
            marginTop: trailMarginTop,
            opacity: isVisible ? 1 : 0,
            borderRadius: borderRadiusPercent,
          }}
        >
          {/* Glass background */}
          <motion.div
            className="absolute inset-0"
            style={{
              borderRadius: borderRadiusPercent,
              background: "rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              boxShadow: `
                0 4px 20px rgba(0, 0, 0, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 1),
                inset 0 -1px 0 rgba(0, 0, 0, 0.02)
              `,
              opacity: trailOpacity,
            }}
          />
          {/* Top highlight */}
          <motion.div
            className="absolute inset-x-[1px] top-[1px] h-1/2 pointer-events-none"
            style={{
              borderRadius: borderRadiusPercent,
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, transparent 100%)",
              opacity: trailOpacity,
            }}
          />
          {/* Hover text */}
          {hoverText && (
            <motion.span
              className="relative z-10 text-xs font-semibold tracking-wide"
              style={{ color: "var(--accent)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {hoverText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
