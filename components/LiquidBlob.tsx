"use client";

import { motion, useTransform } from "framer-motion";
import { useMousePosition } from "./MouseProvider";
import { useEffect, useState } from "react";

interface LiquidBlobProps {
  className?: string;
}

export function LiquidBlob({ className = "" }: LiquidBlobProps) {
  const { smoothX, smoothY } = useMousePosition();
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });

  useEffect(() => {
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
          <linearGradient id="blob-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="blob-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--text-primary)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--text-primary)" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="blob-gradient-3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--text-muted)" stopOpacity="0.03" />
          </linearGradient>
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
              background: "url(#blob-gradient-1)",
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
