
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from "sonner";

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme | null;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => null,
  systemTheme: null
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [systemTheme, setSystemTheme] = useState<Theme | null>(null);
  const [mounted, setMounted] = useState(false);

  // Detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const preferredTheme = savedTheme || systemTheme || 'light';
    
    setTheme(preferredTheme);
    applyTheme(preferredTheme);
    setMounted(true);
  }, [systemTheme]);

  const applyTheme = (newTheme: Theme) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    toast.success(`Theme changed to ${newTheme} mode`, {
      position: 'bottom-right'
    });
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme: handleThemeChange,
        systemTheme
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
