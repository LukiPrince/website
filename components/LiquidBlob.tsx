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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const blobX = useTransform(smoothX, [0, dimensions.width], [-30, 30]);
  const blobY = useTransform(smoothY, [0, dimensions.height], [-30, 30]);
  const blobX2 = useTransform(smoothX, [0, dimensions.width], [20, -20]);
  const blobY2 = useTransform(smoothY, [0, dimensions.height], [15, -15]);

  if (!isMounted) {
    return <div className={`absolute inset-0 overflow-hidden ${className}`} />;
  }

  // Mobile version - ethereal gradient orbs
  if (isMobile) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Primary luminous orb */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "100vw",
            height: "100vw",
            left: "-30%",
            top: "-10%",
            background:
              "radial-gradient(circle, rgba(0, 113, 227, 0.08) 0%, rgba(191, 90, 242, 0.04) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Secondary orb */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "80vw",
            height: "80vw",
            right: "-20%",
            top: "40%",
            background:
              "radial-gradient(circle, rgba(191, 90, 242, 0.06) 0%, rgba(48, 209, 88, 0.03) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        {/* Accent warm orb */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "60vw",
            height: "60vw",
            left: "10%",
            bottom: "5%",
            background:
              "radial-gradient(circle, rgba(48, 209, 88, 0.05) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />
      </div>
    );
  }

  // Desktop version - full liquid glass effect with refraction
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* SVG Filters for liquid morphing */}
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="liquid-morph" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12"
              result="liquid"
            />
          </filter>
          {/* Glow filter */}
          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="30" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Liquid container */}
      <div
        className="absolute inset-0"
        style={{ filter: "url(#liquid-morph)" }}
      >
        {/* Primary blue orb - follows mouse */}
        <motion.div
          className="absolute"
          style={{
            width: "60vw",
            height: "60vw",
            maxWidth: "900px",
            maxHeight: "900px",
            left: "0%",
            top: "5%",
            x: blobX,
            y: blobY,
          }}
          animate={{
            scale: [1, 1.1, 0.95, 1],
            rotate: [0, 10, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              background: `
                radial-gradient(
                  circle at 30% 30%,
                  rgba(0, 113, 227, 0.12) 0%,
                  rgba(0, 113, 227, 0.06) 30%,
                  rgba(191, 90, 242, 0.04) 60%,
                  transparent 80%
                )
              `,
              filter: "blur(30px)",
            }}
            animate={{
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "40% 60% 70% 30% / 40% 50% 50% 60%",
                "30% 70% 60% 40% / 50% 40% 60% 50%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Secondary purple orb - inverse mouse movement */}
        <motion.div
          className="absolute"
          style={{
            width: "50vw",
            height: "50vw",
            maxWidth: "700px",
            maxHeight: "700px",
            right: "0%",
            top: "20%",
            x: blobX2,
            y: blobY2,
          }}
          animate={{
            scale: [1, 1.15, 1.05, 1],
            rotate: [0, -12, 6, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              background: `
                radial-gradient(
                  circle at 60% 40%,
                  rgba(191, 90, 242, 0.1) 0%,
                  rgba(191, 90, 242, 0.05) 40%,
                  rgba(0, 113, 227, 0.03) 70%,
                  transparent 85%
                )
              `,
              filter: "blur(25px)",
            }}
            animate={{
              borderRadius: [
                "40% 60% 60% 40% / 50% 40% 60% 50%",
                "50% 50% 40% 60% / 60% 50% 50% 40%",
                "60% 40% 50% 50% / 40% 60% 40% 60%",
                "40% 60% 60% 40% / 50% 40% 60% 50%",
              ],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Tertiary green orb */}
        <motion.div
          className="absolute"
          style={{
            width: "45vw",
            height: "45vw",
            maxWidth: "600px",
            maxHeight: "600px",
            left: "20%",
            bottom: "5%",
          }}
          animate={{
            scale: [1, 1.08, 0.98, 1],
            rotate: [0, 8, -4, 0],
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              background: `
                radial-gradient(
                  circle at 50% 50%,
                  rgba(48, 209, 88, 0.08) 0%,
                  rgba(48, 209, 88, 0.04) 40%,
                  rgba(0, 113, 227, 0.02) 70%,
                  transparent 85%
                )
              `,
              filter: "blur(30px)",
            }}
            animate={{
              borderRadius: [
                "50% 50% 40% 60% / 40% 60% 40% 60%",
                "45% 55% 55% 45% / 55% 45% 55% 45%",
                "55% 45% 50% 50% / 50% 50% 45% 55%",
                "50% 50% 40% 60% / 40% 60% 40% 60%",
              ],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Warm accent orb */}
        <motion.div
          className="absolute"
          style={{
            width: "30vw",
            height: "30vw",
            maxWidth: "400px",
            maxHeight: "400px",
            right: "10%",
            bottom: "15%",
          }}
          animate={{
            scale: [1, 1.2, 1.1, 1],
            rotate: [0, -15, 8, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8,
          }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              background: `
                radial-gradient(
                  circle at 40% 60%,
                  rgba(255, 159, 10, 0.05) 0%,
                  rgba(255, 55, 95, 0.03) 50%,
                  transparent 75%
                )
              `,
              filter: "blur(20px)",
            }}
            animate={{
              borderRadius: [
                "60% 40% 50% 50% / 50% 50% 40% 60%",
                "50% 50% 60% 40% / 40% 60% 50% 50%",
                "40% 60% 50% 50% / 60% 40% 60% 40%",
                "60% 40% 50% 50% / 50% 50% 40% 60%",
              ],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Ambient light overlay - creates depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 50% at 50% 0%,
              rgba(255, 255, 255, 0.3) 0%,
              transparent 50%
            )
          `,
        }}
      />

      {/* Subtle grid pattern for texture */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
