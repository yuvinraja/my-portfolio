"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  // Moon,
  // Sun,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
// import { useTheme } from "next-themes";
import { AnimatedThemeToggle } from "@/components/animated-theme-toggle";
import { downloadResume } from "@/lib/download-resume";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  if (!mounted) return null;

  const handleClick = () => {
    downloadResume();
    toast.success("Resume opened and downloading...");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 dark:bg-background/80 backdrop-filter backdrop-blur-sm bg-opacity-30 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 relative flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => scrollToSection("hero")}
          className="text-2xl font-bold font-heading text-primary dark:text-primary cursor-pointer"
        >
          Yuvin.dev
        </div>

        {/* Centered Desktop Navigation */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-medium font-body text-foreground hover:text-primary transition-colors"
              style={{ fontSize: "clamp(0.85rem, 1vw + 0.4rem, 1.125rem)" }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Switcher */}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
          </Button> */}

           {/* Animated Theme Toggle  */}
          <AnimatedThemeToggle />

          <Button
            className="font-heading text-lg px-6 py-3"
            onClick={handleClick}
          >
            <Download className="h-4 w-4 mr-2" />
            Resume
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Theme Switcher */}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
          </Button> */}

          {/* Animated Theme Toggle  */}
          <AnimatedThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed inset-x-0 top-16 mx-4 p-4 rounded-lg
                     bg-background/70 backdrop-filter backdrop-blur-lg border border-border/50 shadow-xl"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left font-medium py-2 text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center space-x-2">
                <Link href="https://github.com/yuvinraja" target="_blank">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:text-primary"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/yuvinraja/"
                  target="_blank"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:text-primary"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="mailto:yuvinrajav@gmail.com" target="_blank">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:text-primary"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <Button
                size="sm"
                onClick={handleClick}
                className="font-heading text-base"
              >
                <Download className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
