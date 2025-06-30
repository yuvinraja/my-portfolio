import "../styles/globals.css";
import "../styles/scrollbar.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ColorThemeProvider } from "@/lib/color-theme-provider";
import FloatingParticles from "@/components/floating-particles";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Oxanium } from "next/font/google";
import { Source_Code_Pro } from "next/font/google";
import { Raleway } from "next/font/google";
// import { Toaster } from "sonner";
import { ThemedToaster } from "@/components/themed-toaster";

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
  generator: "v0.dev",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Yuvin - Full Stack Developer & AI Enthusiast",
    description:
      "Portfolio showcasing full-stack development, AI/ML projects, and creative solutions.",
    url: "https://yuvinraja.vercel.app/", // replace with actual domain
    siteName: "Yuvin.dev",
    images: [
      {
        url: "/android-chrome-512x512.png", // Open Graph image
        width: 512,
        height: 512,
        alt: "Yuvin.dev Logo",
        type: "image/png",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuvin - Full Stack Developer & AI Enthusiast",
    description:
      "Explore Yuvin's portfolio of full-stack web development, AI/ML projects, and digital creativity.",
    images: ["/android-chrome-512x512.png"],
  },
  metadataBase: new URL("https://yuvinraja.vercel.app/"), // replace with actual domain
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
        <head>
          <meta
            name="google-site-verification"
            content="SxYouvwUFiRn6CSHKbkm7V2m4vSlNTRqRP2uqUIcvD8"
          />
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ColorThemeProvider>
              <FloatingParticles />
              < ThemedToaster />
              {/* <Toaster richColors position="top-center" /> */}
              {children}
              <Analytics />
              <SpeedInsights />
            </ColorThemeProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
