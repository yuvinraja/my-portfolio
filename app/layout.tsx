import "../styles/globals.css";
import "../styles/scrollbar.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ColorThemeProvider } from "@/lib/color-theme-provider";
import FloatingParticles from "@/components/floating-particles";

import { Oxanium } from "next/font/google";
import { Source_Code_Pro } from "next/font/google";
import { Raleway } from "next/font/google";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yuvin Raja",
  description:
    "Portfolio of Yuvin, a passionate full-stack developer, AI/ML enthusiast, and final-year B.Tech Computer Science student.",
  keywords:
    "Full Stack Developer, AI/ML, React, Next.js, Python, Portfolio, Computer Science",
  authors: [{ name: "Yuvin" }],
  openGraph: {
    title: "Yuvin - Full Stack Developer & AI Enthusiast",
    description:
      "Portfolio showcasing full-stack development, AI/ML projects, and creative solutions.",
    type: "website",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html
        lang="en"
        className={`${oxanium.variable} ${sourceCodePro.variable} ${raleway.variable}`}
        suppressHydrationWarning
      >
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ColorThemeProvider>
              <FloatingParticles />
              {children}
            </ColorThemeProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
