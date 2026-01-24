"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [hoverText, setHoverText] = useState<string | null>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const rotation = useMotionValue(0);

  const springConfig = { stiffness: 800, damping: 35, mass: 0.5 };
  const trailConfig = { stiffness: 120, damping: 20, mass: 1 };
  const morphConfig = { stiffness: 400, damping: 30 };

  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const trailXSpring = useSpring(cursorX, trailConfig);
  const trailYSpring = useSpring(cursorY, trailConfig);
  const rotationSpring = useSpring(rotation, { stiffness: 100, damping: 20 });

  const cursorSize = useSpring(8, morphConfig);
  const trailSize = useSpring(40, morphConfig);
  const trailOpacity = useSpring(0.15, morphConfig);
  const borderRadius = useSpring(50, morphConfig);

  // Transform hooks must be at top level
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
      const deltaX = e.clientX - lastX.current;
      const deltaY = e.clientY - lastY.current;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      const velocity = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (velocity > 2) {
        rotation.set(angle);
      }

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
        trailOpacity.set(0.08);

        const cursorTextAttr = interactiveElement.getAttribute("data-cursor-text");
        if (cursorTextAttr) {
          setHoverText(cursorTextAttr);
          trailSize.set(100);
        }

        if (interactiveElement.hasAttribute("data-cursor-square")) {
          borderRadius.set(12);
        }
      }
    };

    const handleHoverEnd = () => {
      setHoverText(null);
      cursorSize.set(8);
      trailSize.set(40);
      trailOpacity.set(0.15);
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
  }, [isTouchDevice, cursorX, cursorY, rotation, cursorSize, trailSize, trailOpacity, borderRadius]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
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
              background: "var(--accent)",
              boxShadow: "0 0 20px var(--accent-glow)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Trailing glass ring */}
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
            rotate: rotationSpring,
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              borderRadius: borderRadiusPercent,
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(8px)",
              opacity: trailOpacity,
            }}
          />
          {hoverText && (
            <motion.span
              className="relative z-10 text-xs font-medium tracking-wide"
              style={{ color: "var(--text-primary)" }}
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
