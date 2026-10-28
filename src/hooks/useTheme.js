import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';

    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) return savedTheme;

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme === 'light' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
