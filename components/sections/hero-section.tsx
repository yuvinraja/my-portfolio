"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {  Eye, FileText } from "lucide-react";
// import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const roles = useMemo(
    () => [
      "Full Stack Developer",
      "ML Developer",
      "Software Engineer",
      "Web Developer",
      "Game Designer",
      "Systems Architect",
    ],
    []
  );

  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

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

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Gradient Blobs */}
      {/* <div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full
  mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"
      />
      <div
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full
  mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse animation-delay-2000"
      /> */}

      <div className="container mx-auto px-4 text-center relative z-10">
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
            className="text-5xl md:text-7xl font-bold mb-6"
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
            <span className="ml-2 text-primary ">{text}</span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-x mb-8 max-w-2xl mx-auto leading-relaxed "
          >
            I craft full-stack web experiences with a creative touch, blending
            cutting-edge technology with innovative design to build the future
            of digital interactions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={scrollToAbout}
              size="lg"
              className="px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FileText className="mr-2 h-5 w-5" />
              View Resume
            </Button>
            <Button
              onClick={scrollToProjects}
              variant="outline"
              size="lg"
              className="border-2 px-8 py-3 text-lg font-semibold transition-all duration-300"
            >
              <Eye className="mr-2 h-5 w-5" />
              View Projects
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {/* {showScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        )} */}
      </div>
    </section>
  );
}
