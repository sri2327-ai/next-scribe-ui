
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from "sonner";

type Theme = 'light' | 'dark';
type ThemeColor = 'blue' | 'red' | 'purple' | 'green';

interface ThemeContextType {
  theme: Theme;
  themeColor: ThemeColor;
  setTheme: (theme: Theme) => void;
  setThemeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  themeColor: 'blue',
  setTheme: () => null,
  setThemeColor: () => null,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [themeColor, setThemeColor] = useState<ThemeColor>('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedColor = localStorage.getItem('themeColor') as ThemeColor;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setThemeColor(savedColor);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  const handleColorChange = (newColor: ThemeColor) => {
    setThemeColor(newColor);
    localStorage.setItem('themeColor', newColor);
    toast.success(`Theme color changed to ${newColor}`);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        themeColor, 
        setTheme: handleThemeChange, 
        setThemeColor: handleColorChange 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
