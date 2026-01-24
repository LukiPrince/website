"use client";

import { motion, useTransform } from "framer-motion";
import { useMousePosition } from "./MouseProvider";
import { useEffect, useState } from "react";

interface LiquidBlobProps {
  className?: string;
}

export function LiquidBlob({ className = "" }: LiquidBlobProps) {
  const { smoothX, smoothY } = useMousePosition();
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const blobX = useTransform(smoothX, [0, dimensions.width], [-50, 50]);
  const blobY = useTransform(smoothY, [0, dimensions.height], [-50, 50]);

  const blob2X = useTransform(smoothX, [0, dimensions.width], [30, -30]);
  const blob2Y = useTransform(smoothY, [0, dimensions.height], [40, -40]);

  const blob3X = useTransform(smoothX, [0, dimensions.width], [-20, 40]);
  const blob3Y = useTransform(smoothY, [0, dimensions.height], [-30, 30]);

  if (!isMounted) {
    return <div className={`absolute inset-0 overflow-hidden ${className}`} />;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* SVG Filter for liquid effect */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
              result="liquid"
            />
            <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Liquid blob container */}
      <div
        className="absolute inset-0"
        style={{ filter: "url(#liquid)" }}
      >
        {/* Primary blob */}
        <motion.div
          className="absolute"
          style={{
            width: "60vw",
            height: "60vw",
            maxWidth: "800px",
            maxHeight: "800px",
            left: "10%",
            top: "10%",
            x: blobX,
            y: blobY,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              backgroundColor: "var(--accent)",
              opacity: 0.12,
            }}
            animate={{
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 60% 70% 40% / 50% 60% 30% 60%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Secondary blob */}
        <motion.div
          className="absolute"
          style={{
            width: "50vw",
            height: "50vw",
            maxWidth: "600px",
            maxHeight: "600px",
            right: "5%",
            top: "30%",
            x: blob2X,
            y: blob2Y,
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              backgroundColor: "var(--text-primary)",
              opacity: 0.04,
            }}
            animate={{
              borderRadius: [
                "40% 60% 60% 40% / 60% 30% 70% 40%",
                "60% 40% 30% 70% / 40% 60% 40% 60%",
                "40% 60% 60% 40% / 60% 30% 70% 40%",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Tertiary blob */}
        <motion.div
          className="absolute"
          style={{
            width: "40vw",
            height: "40vw",
            maxWidth: "500px",
            maxHeight: "500px",
            left: "30%",
            bottom: "5%",
            x: blob3X,
            y: blob3Y,
          }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              backgroundColor: "var(--accent)",
              opacity: 0.06,
            }}
            animate={{
              borderRadius: [
                "50% 50% 40% 60% / 40% 60% 40% 60%",
                "40% 60% 50% 50% / 60% 40% 60% 40%",
                "50% 50% 40% 60% / 40% 60% 40% 60%",
              ],
            }}
            transition={{
              duration: 17,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--text-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
