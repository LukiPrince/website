"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

type MouseContextType = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  velocityX: MotionValue<number>;
  velocityY: MotionValue<number>;
  isMoving: boolean;
};

const MouseContext = createContext<MouseContextType | null>(null);

export function useMousePosition() {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useMousePosition must be used within MouseProvider");
  }
  return context;
}

export function MouseProvider({ children }: { children: ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const [isMoving, setIsMoving] = useState(false);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    // Initialize to center of screen
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    let lastX = mouseX.get();
    let lastY = mouseY.get();
    let lastTime = Date.now();
    let moveTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(now - lastTime, 1);

      const vx = (e.clientX - lastX) / dt * 16;
      const vy = (e.clientY - lastY) / dt * 16;

      velocityX.set(vx);
      velocityY.set(vy);

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      setIsMoving(true);
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
        velocityX.set(0);
        velocityY.set(0);
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(moveTimeout);
    };
  }, [mouseX, mouseY, velocityX, velocityY]);

  return (
    <MouseContext.Provider value={{ mouseX, mouseY, smoothX, smoothY, velocityX, velocityY, isMoving }}>
      {children}
    </MouseContext.Provider>
  );
}
