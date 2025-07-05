# Modern Portfolio Website

A sleek, interactive portfolio website built with Next.js 15, featuring smooth animations, dark/light theme support, and a fully functional contact form. This project showcases modern web development practices with a focus on performance, accessibility, and user experience.

## ✨ Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Theme**: Smooth theme switching with system preference detection
- **Interactive Animations**: Powered by Framer Motion for engaging user interactions
- **Dynamic Content**: Real-time typing animation and smooth scrolling effects
- **Contact Form**: Functional email integration with Resend API
- **Performance Optimized**: Built with Next.js 15 and Turbopack for lightning-fast development
- **Modern UI Components**: Built with Radix UI primitives and Tailwind CSS

## 🛠️ Technology Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features with concurrent rendering
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Production-ready motion library

### Additional Libraries
- **Resend** - Modern email API for contact form
- **next-themes** - Theme management system
- **Sonner** - Toast notifications
- **Iconify** - Comprehensive icon framework

## 📋 Project Requirements

### System Requirements
- **Node.js** 18.17 or later
- **Package Manager**: npm, yarn, pnpm, or bun

### Environment Variables
Create a `.env.local` file in the root directory:

```bash
RESEND_API_KEY=your_resend_api_key_here
```

## 🚀 Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see requirements above)

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

```bash
# Development with Turbopack (recommended)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🎯 How to Run the Application

### Development Mode
The development server supports hot reloading and real-time updates:

```bash
npm run dev
```

Features in development:
- Turbopack for faster builds
- Real-time component updates
- Error overlay for debugging

### Production Mode
For production deployment:

```bash
npm run build
npm run start
```

This creates an optimized build with:
- Static generation for better performance
- Optimized asset bundling
- Production-ready error handling

## 💻 Code Examples

### Dynamic Typing Animation
The hero section features a typewriter effect for role titles:

```typescript
const roles = [
  "Full Stack Developer",
  "ML Developer", 
  "Software Engineer"
];

const [text, setText] = useState("");
const [roleIndex, setRoleIndex] = useState(0);
const [isDeleting, setIsDeleting] = useState(false);

useEffect(() => {
  const timeout = setTimeout(() => {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      setText(currentRole.substring(0, text.length - 1));
    } else {
      setText(currentRole.substring(0, text.length + 1));
    }
    
    // Switch to next role when complete
    if (!isDeleting && text === currentRole) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
  }, typingSpeed);
  
  return () => clearTimeout(timeout);
}, [text, isDeleting, roleIndex, roles, typingSpeed]);
```

### Theme-Aware Component
Components automatically adapt to the current theme:

```typescript
"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

### Contact Form with Email Integration
The contact form sends emails through the Resend API:

```typescript
export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  
  const data = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "yuvinrajav@gmail.com",
    subject: `New message from ${name}`,
    replyTo: email,
    html: `
      <h2>📬 New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div>${message.replace(/\n/g, "<br />")}</div>
    `
  });
  
  return NextResponse.json({ success: true, data });
}
```

### Smooth Scroll Progress Indicator
Visual feedback for page scroll progress:

```typescript
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
      style={{ scaleX }}
    />
  );
}
```

## 🏗️ Project Structure

```
my-portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── sections/          # Page sections
│   ├── ui/               # UI primitives
│   └── theme-provider.tsx # Theme context
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🎨 Customization

### Adding New Sections
Create a new component in `components/sections/`:

```typescript
export default function NewSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">New Section</h2>
        {/* Your content here */}
      </div>
    </section>
  );
}
```

### Modifying Skills
Update the skills array in `components/sections/skills-section.tsx`:

```typescript
const skillCategories = [
  {
    title: "Your Category",
    skills: [
      { name: "Skill Name", expertise: "advanced", icon: "icon-name" }
    ],
    color: "from-blue-500 to-cyan-500"
  }
];
```

## 🚀 Deployment

This portfolio is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

Alternative deployment options:
- **Netlify**: Full support for Next.js
- **Digital Ocean**: App Platform deployment
- **AWS**: Amplify or EC2 deployment

## 🤝 Contributing

This portfolio serves as both a personal showcase and a learning resource. Feel free to:

- Fork the repository for your own portfolio
- Submit issues for bugs or suggestions
- Create pull requests for improvements
- Star the project if you find it helpful


---

**Built with ❤️ using Next.js 15, TypeScript, and modern web technologies.**
