"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="font-heading">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary dark:bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-30"></div>
              <div className="relative w-full h-full bg-primary rounded-full p-1">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=320&width=320"
                    alt="Yuvin - Full Stack Developer"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4 text-justify pr-20">
              <h3 className="text-2xl font-bold text-primary dark:text-primary">
                Passionate Developer & Tech Innovator
              </h3>
              <p className="text-lg leading-relaxed primary-600 dark:primary-400">
                I&apos;m a Computer Science undergraduate at VIT Vellore with strong
                expertise in full-stack development, AI/ML, and robotic systems.
                My work spans building intelligent software and simulating
                autonomous systems. Known for my focused, problem-solving
                approach, I thrive in both hands-on development and
                architectural planning.
              </p>
              <p className="text-lg leading-relaxed primary-600 dark:primary-400">
                I&apos;m driven by a passion for crafting scalable, impactful
                solutions that tackle real-world challenges and improve lives
                through technology.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
