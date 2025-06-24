import "../styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

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
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
