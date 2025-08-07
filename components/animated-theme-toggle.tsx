// components/ui/animated-theme-toggle.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function AnimatedThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createRippleAnimation = (x: number, y: number, isDarkMode: boolean) => {
    // Remove any existing ripple
    const existingRipple = document.querySelector('.theme-ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    // Create ripple element
    const ripple = document.createElement('div');
    ripple.className = 'theme-ripple';
    ripple.style.cssText = `
      position: fixed;
      top: ${y}px;
      left: ${x}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: ${isDarkMode 
        ? 'radial-gradient(circle, oklch(0.2178 0 0) 0%, oklch(0.285 0 0) 70%, oklch(0.4091 0 0) 100%)'
        : 'radial-gradient(circle, oklch(0.8452 0 0) 0%, oklch(0.7572 0 0) 70%, oklch(0.4313 0 0) 100%)'
      };
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      mix-blend-mode: ${isDarkMode ? 'multiply' : 'screen'};
    `;

    document.body.appendChild(ripple);

    // Calculate maximum radius needed to cover entire viewport
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    ) * 2;

    // Animate the ripple
    const animation = ripple.animate([
      { 
        width: '0px', 
        height: '0px',
        opacity: 0.8
      },
      { 
        width: `${maxRadius}px`, 
        height: `${maxRadius}px`,
        opacity: 0.6
      },
      { 
        width: `${maxRadius * 1.1}px`, 
        height: `${maxRadius * 1.1}px`,
        opacity: 0
      }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fill: 'forwards'
    });

    // Cleanup after animation
    animation.addEventListener('finish', () => {
      ripple.remove();
    });
  };

  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!mounted) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const isDarkMode = theme !== 'dark';
    
    // Create ripple animation
    createRippleAnimation(x, y, isDarkMode);
    
    // Small delay to let ripple start before theme change
    setTimeout(() => {
      setTheme(isDarkMode ? 'dark' : 'light');
    }, 50);
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      className="relative overflow-hidden transition-all duration-300 hover:scale-110 hover:bg-primary/10"
    >
      <div className="relative transition-all duration-500 ease-in-out">
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-foreground transition-transform duration-500 rotate-0 hover:rotate-180" />
        ) : (
          <Moon className="h-5 w-5 text-foreground transition-transform duration-500 rotate-0 hover:rotate-12" />
        )}
      </div>
    </Button>
  );
}