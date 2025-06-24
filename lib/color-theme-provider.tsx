"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type ColorTheme = 'neutral' | 'portfolio' | 'ocean';

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
};

export const ColorThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('portfolio'); // Default to your new theme

  useEffect(() => {
    // Get stored theme from localStorage
    const stored = localStorage.getItem('color-theme') as ColorTheme;
    if (stored && ['neutral', 'portfolio', 'ocean'].includes(stored)) {
      setColorTheme(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing color theme attributes
    root.removeAttribute('data-color-theme');
    
    // Set new color theme (only if not neutral, since neutral is the default CSS)
    if (colorTheme !== 'neutral') {
      root.setAttribute('data-color-theme', colorTheme);
    }
    
    // Store in localStorage
    localStorage.setItem('color-theme', colorTheme);
  }, [colorTheme]);

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};