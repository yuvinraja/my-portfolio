"use client";

import { useTheme } from "next-themes";
import { useColorTheme } from "@/lib/color-theme-provider";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, PaletteIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();

  const colorThemes = [
    {
      id: "neutral",
      name: "Neutral",
      colors: ["#000000", "#ffffff", "#f5f5f5"],
      description: "Classic black & white",
    },
    {
      id: "portfolio",
      name: "Portfolio",
      colors: ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"],
      description: "Your custom palette",
    },
    {
      id: "ocean",
      name: "Ocean",
      colors: ["#006d77", "#83c5be", "#ffddd2"],
      description: "Calm ocean vibes",
    },
  ] as const;

  return (
    <div className="flex items-center gap-2">
      {/* Light/Dark Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Color Theme Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <PaletteIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Select color theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5 text-sm font-semibold">Color Themes</div>
          <DropdownMenuSeparator />
          {colorThemes.map((t) => (
            <DropdownMenuItem
              key={t.id}
              onClick={() => setColorTheme(t.id)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="flex gap-1">
                {t.colors.slice(0, 3).map((color, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{t.name}</span>
                <span className="text-xs text-muted-foreground">
                  {t.description}
                </span>
              </div>
              {colorTheme === t.id && (
                <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
