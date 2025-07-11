"use client";

import Header from "@/components/header";
import AboutSection from "@/components/sections/about-section";
import HeroSection from "@/components/sections/hero-section";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import { motion, useScroll, useSpring } from "framer-motion";
import ContactSection from "@/components/sections/contact-section";
import BackToTop from "@/components/back-to-top";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-radial from-secondary to-secondary/50 transform-gpu z-50"
        style={{ scaleX }}
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <BackToTop />
    </>
  );
}
