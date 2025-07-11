"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-2">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="font-heading text-primary dark:text-primary">
              About Me
            </span>
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
            <div className="relative w-60 h-60 sm:w-80 sm:h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-30"></div>
              <div className="relative w-full h-full bg-primary rounded-full p-1">
                <div className="w-full h-full bg-background/90 dark:background/90 rounded-full overflow-hidden">
                  <Image
                    src="/headshot-removebg.png"
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
            <div className="space-y-4 text-justify">
              <h3 className="text-2xl font-bold text-secondary dark:text-secondary">
                Final-Year CSE Student | Builder at Heart
              </h3>
              <p className="text-lg leading-relaxed primary-600 dark:primary-400">
                I’ve been obsessed with tech since the days of writing snake
                games in batch files — and that spark hasn’t dimmed since. Now
                in my final year at VIT Vellore, I’ve grown into a developer who
                loves crafting things that are both smart and useful — whether
                it’s an AI-driven app, a full-stack product, or a robot that can
                make its way through a room.
              </p>
              <p className="text-lg leading-relaxed primary-600 dark:primary-400">
                What drives me is the thrill of solving tough problems, the joy
                of clean code, and the impact of shipping real-world solutions.
                I’m constantly learning, experimenting, and leveling up — and
                I’m now focused on building standout projects that not only
                showcase my skills but also make a difference in the real world.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
