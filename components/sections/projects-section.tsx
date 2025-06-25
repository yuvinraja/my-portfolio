"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Web", "AI/ML", "Robotics", "Games"];

  const projects = [
    {
      title: "Voltaero Landing Page",
      description:
        "Landing page for Voltaero Technologies, with custom animations and responsive design, feautuing a CMS for blog posts.",
      image: "/project-images/voltaero.png",
      category: "Web",
      tech: ["Next.js", "TypeScript", "Sanity", "Tailwind CSS"],
      github: "https://github.com/yuvinraja/ARCWebsite",
      live: "https://voltaero.vercel.app/",
      featured: true,
    },
    {
      title: "AI Image Classifier",
      description:
        "Deep learning model for image classification using TensorFlow and CNN architecture. Achieved 94% accuracy on test dataset.",
      image: "/project-images/image-forgery.png",
      category: "AI/ML",
      tech: ["Python", "TensorFlow", "OpenCV", "Streamlit", "Pandas"],
      github: "https://github.com/yuvinraja/Image-Forgery-Detection",
      live: "https://image-forgery-detector.streamlit.app/",
      featured: true,
    },
    {
      title: "Autonomous Robot Navigation",
      description:
        "ROS-based autonomous navigation system for mobile robots using SLAM and path planning algorithms with Gazebo simulation.",
      image: "/project-images/robot.png",
      category: "Robotics",
      tech: ["ROS", "Python", "C++", "OpenCV", "Gazebo"],
      github: "#",
      live: "#",
      featured: false,
    },
    {
      title: "First Person Shooter Game in Unity",
      description:
        "Unity-based 3D FPS-puzzle game with physics simulation, level progression, and immersive sound design.",
      image: "/project-images/game.png",
      category: "Games",
      tech: ["Unity", "C#", "Blender", "3D Modeling"],
      github: "#",
      live: "#",
      featured: false,
    },
    {
      title: "Events Management System",
      description:
        "Web application for managing personal events and schedule, featuring live countdown timers, event creation, and reminders.",
      image: "/project-images/event.png",
      category: "Web",
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
      github: "#",
      live: "#",
      featured: false,
    },
    {
      title: "Customer Churn Prediction and Analysis",
      description:
        "Predictive analytics project to identify customers likely to churn using machine learning algorithms and data visualization.",
      image: "/project-images/churn.png",
      category: "AI/ML",
      tech: ["Python", "Streamlit", "Scikit-learn", "Pandas", "NumPy"],
      github: "https://github.com/yuvinraja/customer-churn-prediction",
      live: "https://customer-churn-prediction-and-analysis.streamlit.app/",
      featured: false,
    },
    {
      title: "Invoice Management System",
      description:
        "Web application for managing invoices, including creation, tracking, and reporting functionalities for Entomon Solutions.",
      image: "/project-images/invoice.png",
      category: "Web",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      github: "https://github.com/yuvinraja/Tax-Invoice-Printer",
      live: "https://tax-invoice-printer.vercel.app/",
      featured: false,
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-2">
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
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-primary dark:bg-primary mx-auto rounded-full mb-8"></div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              variant={activeFilter === filter ? "default" : "outline"}
              className={`px-6 py-2 transition-all duration-300 hover:ring ${
                activeFilter === filter ? "shadow-lg" : ""
              }`}
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={project.featured ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card className="h-full backdrop-blur-sm shadow-xl hover:shadow-xl/20 transition-all duration-300 overflow-hidden group pt-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <Link href={project.github} target="_blank">
                        <Button
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm text-white border-white/30 cursor-pointer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Button>
                      </Link>

                      <Link href={project.live} target="_blank">
                        <Button
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm text-white border-white/30 cursor-pointer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-bold group-hover:text-primary/80 dark:group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    {project.featured && <Badge className="">Featured</Badge>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Link href={project.github} target="_blank">
                      <Button variant="outline" size="sm" className="flex-1 cursor-pointer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    </Link>
                    <Link href={project.live} target="_blank">
                      <Button size="sm" className="flex-1 cursor-pointer">
                        <Play className="h-4 w-4 mr-2" />
                        Demo
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="https://github.com/yuvinraja?tab=repositories"
            target="_blank"
          >
            <Button
              variant="secondary"
              size="lg"
              className="border-2 px-8 py-3 text-lg font-semibold transition-all duration-300 cursor-pointer hover:bg-primary hover:text-white hover:border-primary dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary"
            >
              View All Projects on GitHub
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
