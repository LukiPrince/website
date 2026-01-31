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

  const blobX = useTransform(smoothX, [0, dimensions.width], [-20, 20]);
  const blobY = useTransform(smoothY, [0, dimensions.height], [-20, 20]);

  if (!isMounted) {
    return <div className={`absolute inset-0 overflow-hidden ${className}`} />;
  }

  // Simplified version for mobile - soft pastel gradients
  if (isMobile) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Blue blob */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "80vw",
            height: "80vw",
            left: "-10%",
            top: "5%",
            background: "radial-gradient(circle, rgba(0, 122, 255, 0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Purple blob */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "60vw",
            height: "60vw",
            right: "-5%",
            top: "30%",
            background: "radial-gradient(circle, rgba(88, 86, 214, 0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        {/* Green blob */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "50vw",
            height: "50vw",
            left: "20%",
            bottom: "10%",
            background: "radial-gradient(circle, rgba(52, 199, 89, 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>
    );
  }

  // Desktop version with full effects - pastel iOS colors
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12"
              result="liquid"
            />
            <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0" style={{ filter: "url(#liquid)" }}>
        {/* Primary blue blob - iOS blue */}
        <motion.div
          className="absolute"
          style={{
            width: "55vw",
            height: "55vw",
            maxWidth: "700px",
            maxHeight: "700px",
            left: "5%",
            top: "8%",
            x: blobX,
            y: blobY,
          }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 8, 0],
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
              background: "linear-gradient(135deg, rgba(0, 122, 255, 0.15) 0%, rgba(88, 86, 214, 0.08) 100%)",
              filter: "blur(20px)",
            }}
            animate={{
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 60% 70% 40% / 50% 60% 30% 60%",
                "60% 40% 30% 70% / 60% 30% 70% 40%",
              ],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Secondary purple blob */}
        <motion.div
          className="absolute"
          style={{
            width: "45vw",
            height: "45vw",
            maxWidth: "550px",
            maxHeight: "550px",
            right: "5%",
            top: "25%",
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(88, 86, 214, 0.12) 0%, rgba(175, 82, 222, 0.06) 100%)",
              filter: "blur(20px)",
            }}
            animate={{
              borderRadius: [
                "40% 60% 60% 40% / 60% 30% 70% 40%",
                "60% 40% 30% 70% / 40% 60% 40% 60%",
                "40% 60% 60% 40% / 60% 30% 70% 40%",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Tertiary green blob */}
        <motion.div
          className="absolute"
          style={{
            width: "40vw",
            height: "40vw",
            maxWidth: "480px",
            maxHeight: "480px",
            left: "25%",
            bottom: "8%",
          }}
          animate={{
            scale: [1, 1.06, 1],
            rotate: [0, 12, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(48, 209, 88, 0.05) 100%)",
              filter: "blur(20px)",
            }}
            animate={{
              borderRadius: [
                "50% 50% 40% 60% / 40% 60% 40% 60%",
                "40% 60% 50% 50% / 60% 40% 60% 40%",
                "50% 50% 40% 60% / 40% 60% 40% 60%",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Small accent blob - pink/coral */}
        <motion.div
          className="absolute"
          style={{
            width: "25vw",
            height: "25vw",
            maxWidth: "300px",
            maxHeight: "300px",
            right: "15%",
            bottom: "20%",
          }}
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(255, 45, 85, 0.06) 0%, rgba(255, 149, 0, 0.04) 100%)",
              filter: "blur(15px)",
            }}
            animate={{
              borderRadius: [
                "60% 40% 50% 50% / 50% 50% 40% 60%",
                "50% 50% 60% 40% / 40% 60% 50% 50%",
                "60% 40% 50% 50% / 50% 50% 40% 60%",
              ],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
