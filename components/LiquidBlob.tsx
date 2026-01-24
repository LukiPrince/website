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
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const blobX = useTransform(smoothX, [0, dimensions.width], [-30, 30]);
  const blobY = useTransform(smoothY, [0, dimensions.height], [-30, 30]);

  if (!isMounted) {
    return <div className={`absolute inset-0 overflow-hidden ${className}`} />;
  }

  // Simplified version for mobile - no filters, fewer animations
  if (isMobile) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Simple gradient blobs without filter */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "70vw",
            height: "70vw",
            left: "5%",
            top: "10%",
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            opacity: 0.08,
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "50vw",
            height: "50vw",
            right: "0%",
            top: "40%",
            background: "radial-gradient(circle, var(--text-primary) 0%, transparent 70%)",
            opacity: 0.04,
          }}
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    );
  }

  // Desktop version with full effects
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
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

      <div className="absolute inset-0" style={{ filter: "url(#liquid)" }}>
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

        <motion.div
          className="absolute"
          style={{
            width: "50vw",
            height: "50vw",
            maxWidth: "600px",
            maxHeight: "600px",
            right: "5%",
            top: "30%",
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

        <motion.div
          className="absolute"
          style={{
            width: "40vw",
            height: "40vw",
            maxWidth: "500px",
            maxHeight: "500px",
            left: "30%",
            bottom: "5%",
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
