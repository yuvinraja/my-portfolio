"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Java", expertise: "advanced", icon: "☕" },
        { name: "Python", expertise: "advanced", icon: "🐍" },
        { name: "JavaScript", expertise: "advanced", icon: "⚡" },
        { name: "TypeScript", expertise: "intermediate", icon: "📘" },
        { name: "C++", expertise: "intermediate", icon: "🔧" },
      ],
      color: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
    },
    {
      title: "Web Development",
      skills: [
        { name: "Next.js", expertise: "advanced", icon: "▲" },
        { name: "Node.js", expertise: "advanced", icon: "🟢" },
        { name: "Express.js", expertise: "intermediate", icon: "🚀" },
        { name: "Tailwind CSS", expertise: "advanced", icon: "🎨" },
        { name: "Framer Motion", expertise: "intermediate", icon: "🎭" },
      ],
      color: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "Database & Backend",
      skills: [
        { name: "MySQL", expertise: "intermediate", icon: "🗄️" },
        { name: "PostgreSQL", expertise: "intermediate", icon: "🐘" },
        { name: "MongoDB", expertise: "beginner", icon: "🍃" },
        { name: "Prisma", expertise: "intermediate", icon: "💎" },
        { name: "Postman", expertise: "intermediate", icon: "📮" },
      ],
      color: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", expertise: "advanced", icon: "📦" },
        { name: "Docker", expertise: "intermediate", icon: "🐳" },
        { name: "Vercel", expertise: "intermediate", icon: "🔺" },
        { name: "Unity", expertise: "beginner", icon: "🎮" },
        { name: "Figma", expertise: "intermediate", icon: "🎨" },
      ],
      color: "from-orange-500 to-yellow-500",
      bgGradient: "from-orange-500/10 to-yellow-500/10",
    },
  ];

  const getExpertiseStyle = (expertise: string) => {
    switch (expertise) {
      // case "expert":
      //   return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "advanced":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "intermediate":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "beginner":
        return "bg-gradient-to-r from-orange-500 to-yellow-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getExpertiseText = (expertise: string) => {
    switch (expertise) {
      // case "expert":
      //   return "Expert";
      case "advanced":
        return "Advanced";
      case "intermediate":
        return "Intermediate";
      case "beginner":
        return "Learning";
      default:
        return "Familiar";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 20,
      },
    },
  };

  return (
    <section id="skills" className="py-20 px-2 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="font-heading text-primary dark:text-primary">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-24 h-1 bg-primary dark:bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Technologies I&apos;ve mastered and tools I use to bring ideas to
            life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 25 },
              }}
            >
              <Card
                className={`h-full backdrop-blur-sm border-0 bg-gradient-to-br ${category.bgGradient} hover:shadow-2xl transition-all duration-500 group`}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color} group-hover:animate-pulse`}
                    />
                    <span
                      className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                    >
                      {category.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={skillVariants}
                      className="group/skill"
                    >
                      <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 dark:bg-background/30 hover:bg-background/80 dark:hover:bg-background/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-lg group-hover/skill:scale-110 transition-transform duration-200">
                            {skill.icon}
                          </span>
                          <span className="font-medium text-foreground group-hover/skill:text-primary transition-colors duration-200">
                            {skill.name}
                          </span>
                        </div>
                        <Badge
                          className={`${getExpertiseStyle(skill.expertise)} border-0 font-medium text-xs px-2 py-1 shadow-sm`}
                        >
                          {getExpertiseText(skill.expertise)}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Expertise Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {/* <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 dark:bg-background/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <span className="text-sm text-muted-foreground">Expert</span>
          </div> */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 dark:bg-background/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
            <span className="text-sm text-muted-foreground">Advanced</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 dark:bg-background/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
            <span className="text-sm text-muted-foreground">Intermediate</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 dark:bg-background/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500" />
            <span className="text-sm text-muted-foreground">Learning</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
