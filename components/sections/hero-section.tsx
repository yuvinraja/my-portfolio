"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Eye,
  MessageSquare,
  Github,
  Linkedin,
  ChevronDown,
  MousePointer2,
} from "lucide-react";
import { downloadResume } from "@/lib/download-resume";

export default function HeroSection() {
  const roles = useMemo(
    () => [
      "Full Stack Developer",
      "ML Developer",
      "Software Engineer",
      "Web Developer",
      "Systems Architect",
    ],
    []
  );

  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(700);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    const fullText = current;

    const timer = setTimeout(() => {
      if (isDeleting) {
        setText((prev) => prev.slice(0, -1));
        setTypingSpeed(50); // Faster deletion
      } else {
        setText((prev) => fullText.slice(0, prev.length + 1));
        setTypingSpeed(150); // Slower typing for better readability
      }

      if (!isDeleting && text === fullText) {
        // Pause before starting to delete
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex, roles, typingSpeed]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNextSection = () => {
    // Scroll to about section or next section after hero
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    downloadResume();
    toast.success("Resume opened and downloading...");
  };

  const handleGitHubClick = () => {
    if (typeof window !== "undefined") {
      window.open("https://github.com/yuvinraja", "_blank");
    }
  };

  const handleLinkedInClick = () => {
    if (typeof window !== "undefined") {
      window.open("https://linkedin.com/in/yuvinraja", "_blank");
    }
  };

  if (!mounted) return null;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-2"
    >
      {/* Enhanced Gradient Blobs with better positioning */}
      <div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/60 to-primary/30 rounded-full
  mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"
      />
      <div
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-secondary/60 to-secondary/50 rounded-full
  mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse animation-delay-2000"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-foreground font-bold text-5xl md:text-6xl"
        >
          {/* Greeting */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold mb-6"
          >
            <span className="">Hey, I&apos;m </span>
            <span className="text-primary">Yuvin</span>
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
              className="inline-block ml-4"
            >
              👋
            </motion.span>
          </motion.h1>

          {/* Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-4xl font-semibold mb-6 h-16 flex items-center justify-center"
          >
            <span className="">I&apos;m a </span>
            <span className="ml-2 text-accent relative">
              {text}
              {/* Blinking Cursor */}
              {/* <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -right-1 top-0 text-accent"
              >
                |
              </motion.span> */}
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-lg mb-4 max-w-2xl mx-auto leading-relaxed text-muted-foreground"
          >
            I craft full-stack web experiences with a creative touch, blending
            cutting-edge technology with innovative design to build the future
            of digital interactions.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
            className="flex justify-center gap-4 mb-4"
          >
            <motion.button
              onClick={handleGitHubClick}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl hover:bg-background/90 cursor-pointer transition-colors duration-300"
              aria-label="Visit GitHub Profile"
            >
              <Github className="h-6 w-6 text-foreground hover:text-secondary transition-colors duration-300" />
            </motion.button>

            <motion.button
              onClick={handleLinkedInClick}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl hover:bg-background/90 cursor-pointer transition-colors duration-300"
              aria-label="Visit LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6 text-foreground hover:text-accent transition-colors duration-300" />
            </motion.button>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleClick}
                variant="secondary"
                size="lg"
                className="px-8 py-3 text-lg font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <Eye className="mr-2 h-5 w-5" />
                View Resume
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={scrollToContact}
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll to Explore Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 ${isScrolled ? "hidden" : "block"}`}
      >
        <motion.button
          onClick={scrollToNextSection}
          className="flex flex-col items-center gap-2 group cursor-pointer"
          whileHover={{ y: -4 }}
          aria-label="Scroll to explore more"
        >
          <div className="flex flex-col items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <MousePointer2 className="h-4 w-4" />
              <span className="hidden sm:inline">Scroll to explore</span>
              <span className="sm:hidden">Explore</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.2,
              }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </div>
        </motion.button>
      </motion.div>

      {/* Floating Particles for added visual appeal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, null],
              x: [null, Math.random() * 20 - 10, null],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.8,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
