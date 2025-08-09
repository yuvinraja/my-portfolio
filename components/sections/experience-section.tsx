'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Calendar,
  Star,
  Briefcase,
  GraduationCap,
  // Users,
  // Code,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useRef } from 'react';
import FloatingParticles from '../floating-particles';

// Types
type EducationItem = {
  id: string;
  institution: string;
  location: string;
  degree: string;
  field: string;
  duration: string;
  gpa: string;
  highlights: string[];
  icon: string;
  color: string;
  year: number;
};

type WorkExperienceItem = {
  id: string;
  company: string;
  location: string;
  position: string;
  duration: string;
  type: string;
  achievements: string[];
  technologies: string[];
  icon: string;
  color: string;
  year: number;
};

type TechnicalTeamItem = {
  id: string;
  organization: string;
  subtitle: string;
  position: string;
  duration: string;
  type: string;
  achievements: string[];
  technologies: string[];
  icon: string;
  color: string;
  year: number;
};

type ProjectItem = {
  id: string;
  name: string;
  description: string;
  achievements: string[];
  technologies: string[];
  icon: string;
  color: string;
  year: number;
};

type ExperienceItem =
  | EducationItem
  | WorkExperienceItem
  | TechnicalTeamItem
  | ProjectItem;

// Helper functions for type-safe property access
const getTitle = (item: ExperienceItem): string => {
  if ('company' in item) return item.company;
  if ('institution' in item) return item.institution;
  if ('organization' in item) return item.organization;
  if ('name' in item) return item.name;
  return '';
};

const getSubtitle = (item: ExperienceItem): string | undefined => {
  if ('subtitle' in item) return item.subtitle;
  return undefined;
};

const getPosition = (item: ExperienceItem): string => {
  if ('position' in item) return item.position;
  if ('degree' in item) return item.degree;
  return '';
};

const getField = (item: ExperienceItem): string | undefined => {
  if ('field' in item) return item.field;
  return undefined;
};

const getType = (item: ExperienceItem): string => {
  if ('type' in item) return item.type;
  return 'Education';
};

const getDuration = (item: ExperienceItem): string | undefined => {
  if ('duration' in item) return item.duration;
  return undefined;
};

const getLocation = (item: ExperienceItem): string | undefined => {
  if ('location' in item) return item.location;
  return undefined;
};

const getGPA = (item: ExperienceItem): string | undefined => {
  if ('gpa' in item) return item.gpa;
  return undefined;
};

const getAchievements = (item: ExperienceItem): string[] => {
  if ('achievements' in item) return item.achievements;
  if ('highlights' in item) return item.highlights;
  return [];
};

const getTechnologies = (item: ExperienceItem): string[] | undefined => {
  if ('technologies' in item) return item.technologies;
  return undefined;
};

const isWorkOrProject = (item: ExperienceItem): boolean => {
  return 'company' in item || 'name' in item || 'organization' in item;
};

const isEducation = (item: ExperienceItem): boolean => {
  return 'institution' in item;
};

// Experience data
const experienceData = {
  education: [
    {
      id: 'edu-1',
      institution: 'Vellore Institute of Technology',
      location: 'Vellore, Tamil Nadu',
      degree: 'Bachelor of Technology',
      field: 'Computer Science and Engineering',
      duration: 'Sep 2022 - Present',
      gpa: '9.3/10',
      highlights: [
        'Maintaining excellent academic performance',
        'Active in technical clubs and competitions',
        'Focus on AI/ML and Full-Stack Development',
      ],
      icon: '🎓',
      color: 'from-blue-500 to-cyan-500',
      year: 2022,
    },
  ],

  workExperience: [
    {
      id: 'work-1',
      company: 'Voltaero Technologies Pvt. Ltd.',
      location: 'Vellore, Tamil Nadu',
      position: 'Web Development Intern',
      duration: 'June 2025 – Present',
      type: 'Internship',
      achievements: [
        'Launched company website showcasing drone innovations, enhancing stakeholder visibility',
        'Developed responsive UI with dynamic routing using Next.js App Router and Tailwind CSS',
        'Integrated Sanity CMS enabling non-technical staff to manage content independently',
        'Configured Resend API for real-time communication with investors and collaborators',
      ],
      technologies: ['Next.js', 'Tailwind CSS', 'Sanity CMS', 'Resend API'],
      icon: '🚀',
      color: 'from-orange-500 to-red-500',
      year: 2025,
    },
    {
      id: 'work-2',
      company: 'Fundle AI',
      location: 'New Delhi, Delhi',
      position: 'AI Chatbot Intern',
      duration: 'May 2025 – July 2025',
      type: 'Internship',
      achievements: [
        'Engineered WhatsApp chatbot features for loyalty point redemption across 3+ malls',
        'Rewrote webhook backend from PHP to Python, improving scalability and reducing latency',
        'Reduced cloud OCR costs by 60% using Oracle Document Understanding',
        'Customized chatbot logic for 5+ malls, aligning with specific loyalty programs',
      ],
      technologies: ['Python', 'WhatsApp API', 'Oracle Cloud', 'PHP'],
      icon: '🤖',
      color: 'from-purple-500 to-pink-500',
      year: 2025,
    },
  ],

  technicalTeams: [
    {
      id: 'team-1',
      organization: 'Team Ojas Racing',
      subtitle: 'VIT Formula Student Electric Team',
      position: 'Autonomous Systems Engineer',
      duration: 'April 2024 – Present',
      type: 'Technical Team',
      achievements: [
        'Led 4-member sub-team for autonomous driving software development',
        'Architected ROS2 + Gazebo simulation supporting SLAM and path planning',
        'Trained stereo vision model with 1,500+ labeled samples via Roboflow',
        'Achieved 97% cone classification accuracy optimized for Jetson Orin',
      ],
      technologies: [
        'ROS2',
        'Gazebo',
        'Computer Vision',
        'Jetson Orin',
        'Python',
      ],
      icon: '🏎️',
      color: 'from-green-500 to-emerald-500',
      year: 2024,
    },
  ],
};

const TimelineNode = ({
  year,
  isActive,
  onClick,
}: {
  year: number;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    className={`relative z-10 w-16 h-16 border-4 transition-all duration-300 cursor-pointer
      ${
        isActive
          ? 'bg-gradient-to-r from-primary to-primary border-secondary shadow-xl '
          : 'bg-background border-muted-foreground/30 hover:border-secondary/50 hover:scale-110'
      }`}
    whileHover={{ scale: isActive ? 1.1 : 1.0 }}
    whileTap={{ scale: isActive ? 1.1 : 1.0 }}
  >
    <motion.div
      className={`absolute inset-0 rounded-full transition-all duration-300
        ${isActive ? 'bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg' : ''}
      `}
    />
    <span
      className={`relative text-sm font-bold transition-colors duration-300
      ${isActive ? 'text-white' : 'text-foreground'}
    `}
    >
      {year}
    </span>
  </motion.button>
);

const ExperienceCard = ({
  item,
  side,
  index,
  isVisible,
}: {
  item: ExperienceItem;
  side: 'left' | 'right';
  index: number;
  isVisible: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -100 : 100, y: 50 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : side === 'left' ? -100 : 100,
        y: isVisible ? 0 : 50,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
      className={`relative ${side === 'left' ? 'pr-8' : 'pl-8'}`}
    >
      {/* Connection line to timeline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isVisible ? 1 : 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
        className={`absolute top-8 w-8 h-0.5 bg-gradient-to-r ${item.color} 
          ${side === 'left' ? 'right-0' : 'left-0'}
        `}
      />

      <Card
        className={`backdrop-blur-sm border-0 bg-gradient-to-br ${item.color.replace('from-', 'from-').replace('to-', 'to-')}/5 
        hover:shadow-2xl transition-all duration-500 group overflow-hidden`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <motion.div
                className={`text-2xl p-2 rounded-lg bg-gradient-to-r ${item.color} shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {item.icon}
              </motion.div>
              <div className="flex-1">
                <CardTitle
                  className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                >
                  {getTitle(item)}
                </CardTitle>
                {getSubtitle(item) && (
                  <p className="text-sm text-muted-foreground font-medium">
                    {getSubtitle(item)}
                  </p>
                )}
                <p className="text-base font-semibold text-secondary">
                  {getPosition(item)}
                </p>
                {getField(item) && (
                  <p className="text-sm text-muted-foreground">
                    {getField(item)}
                  </p>
                )}
              </div>
            </div>
            <Badge variant="outline" className="shrink-0">
              {getType(item)}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {getDuration(item)}
            </div>
            {getLocation(item) && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {getLocation(item)}
              </div>
            )}
            {getGPA(item) && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
                GPA: {getGPA(item)}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Achievements/Highlights Preview */}
          <div className="space-y-2 mb-4">
            {getAchievements(item)
              .slice(0, isExpanded ? undefined : 2)
              .map((achievement: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="flex items-start gap-2 text-sm"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color} mt-2 shrink-0`}
                  />
                  <span className="leading-relaxed">{achievement}</span>
                </motion.div>
              ))}
          </div>

          {/* Expand/Collapse for long content */}
          {getAchievements(item).length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mb-4 h-6 px-2 text-xs"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="h-3 w-3 ml-1" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="h-3 w-3 ml-1" />
                </>
              )}
            </Button>
          )}

          {/* Technologies */}
          {getTechnologies(item) && (
            <div className="flex flex-wrap gap-1.5">
              {getTechnologies(item)!.map((tech: string) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-background/60 hover:bg-background/80 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function ExperienceSection() {
  const [activeYear, setActiveYear] = useState(2025);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Combine all experiences with years for timeline
  const allExperiences = [
    ...experienceData.workExperience,
    ...experienceData.technicalTeams,
    ...experienceData.education,
  ];

  const years = [...new Set(allExperiences.map((item) => item.year))].sort(
    (a, b) => b - a
  );

  // Filter experiences by active year
  const activeExperiences = allExperiences.filter(
    (item) => item.year === activeYear
  );

  // Separate into left (work/projects) and right (education/teams)
  const leftSideItems = activeExperiences.filter((item) =>
    isWorkOrProject(item)
  );
  const rightSideItems = activeExperiences.filter((item) => isEducation(item));

  return (
    <section
      ref={ref}
      id="experience"
      className="py-20 px-2 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-secondary/10 to-transparent rounded-full blur-3xl" />
      <FloatingParticles />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="font-heading text-primary">My Journey</span>
          </h2>
          <div className="w-24 h-1 bg-primary dark:bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of technology, innovation, and learning
            through hands-on experiences
          </p>
        </motion.div>

        {/* Timeline Navigation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary" />

            {/* Year Nodes */}
            <div className="flex items-center gap-8">
              {years.map((year, index) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <TimelineNode
                    year={year}
                    isActive={year === activeYear}
                    onClick={() => setActiveYear(year)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Experience Content */}
        <div className="grid lg:grid-cols-2 gap-8 relative">
          {/* Central Timeline Indicator */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary transform -translate-x-1/2 hidden lg:block" />
          <div className="absolute left-1/2 top-8 w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full transform -translate-x-1/2 shadow-lg hidden lg:block" />

          {/* Left Side - Work Experience & Projects */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center lg:text-right mb-6"
            >
              <h3 className="text-2xl font-bold flex items-center justify-center lg:justify-end gap-2">
                <Briefcase className="h-6 w-6 text-primary" />
                Professional Experience
              </h3>
            </motion.div>

            {leftSideItems.length > 0 ? (
              leftSideItems.map((item, index) => (
                <ExperienceCard
                  key={item.id}
                  item={item}
                  side="left"
                  index={index}
                  isVisible={isInView}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center text-muted-foreground italic"
              >
                No professional experience for {activeYear}
              </motion.div>
            )}
          </div>

          {/* Right Side - Education & Teams */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center lg:text-left mb-6"
            >
              <h3 className="text-2xl font-bold flex items-center justify-center lg:justify-start gap-2">
                <GraduationCap className="h-6 w-6 text-secondary" />
                Education
              </h3>
            </motion.div>

            {rightSideItems.length > 0 ? (
              rightSideItems.map((item, index) => (
                <ExperienceCard
                  key={item.id}
                  item={item}
                  side="right"
                  index={index}
                  isVisible={isInView}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center text-muted-foreground italic"
              >
                No education/team experience for {activeYear}
              </motion.div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Briefcase,
              label: 'Work Experience',
              value: '2+',
              color: 'text-orange-500',
            },
            {
              icon: Code,
              label: 'Projects Built',
              value: '10+',
              color: 'text-blue-500',
            },
            {
              icon: Users,
              label: 'Teams Led',
              value: '3+',
              color: 'text-green-500',
            },
            {
              icon: Star,
              label: 'Current GPA',
              value: '9.3',
              color: 'text-yellow-500',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-all duration-300"
            >
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}
