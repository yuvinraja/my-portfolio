"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useColorTheme } from "@/lib/color-theme-provider";

export default function FloatingParticles() {
  const [dots, setDots] = useState<{ left: number; top: number }[]>([]);
  const { colorTheme } = useColorTheme();

  useEffect(() => {
    const randomDots = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setDots(randomDots);
  }, []);

  // Get particle class based on color theme
  const getParticleClass = () => {
    switch (colorTheme) {
      case 'portfolio':
        return "bg-gradient-to-br from-primary/20 to-accent/15";
      
      case 'ocean':
        return "bg-gradient-to-br from-primary/20 to-secondary/15";
      
      case 'neutral':
      default:
        return "bg-gradient-to-br from-foreground/10 to-muted-foreground/5";
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {dots.map((dot, i) => (
        <motion.div
          key={`${colorTheme}-${i}`} // Key includes theme to force re-render
          className={`absolute w-2 h-2 rounded-full ${getParticleClass()}`}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
          }}
        />
      ))}
    </div>
  );
}