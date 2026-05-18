import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiX } from 'react-icons/fi';
import { cn } from '../lib/utils';

const THEMES = [
  { id: 'neon-blue', name: 'Neon Blue', color: '#6366f1' },
  { id: 'cyberpunk', name: 'Cyberpunk Purple', color: '#8b5cf6' },
  { id: 'emerald', name: 'Emerald Enterprise', color: '#10b981' },
  { id: 'orange', name: 'Orange Hacker', color: '#f97316' },
  { id: 'monochrome', name: 'Monochrome', color: '#94a3b8' },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('neon-blue');

  const handleThemeChange = (theme) => {
    setActiveTheme(theme.id);
    document.documentElement.setAttribute('data-theme', theme.id);
    // Overriding the primary color variable (Requires CSS setup in index.css)
    // We will just use the data-theme attribute in Tailwind.
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-dark-800/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl w-48 mb-2"
          >
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
              <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">Select Theme</span>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">
                <FiX size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme)}
                  className={cn(
                    "w-full flex items-center gap-3 px-2 py-1.5 rounded-md text-xs font-medium transition-colors",
                    activeTheme === theme.id ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.color }} />
                  {theme.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-dark-800 border border-white/10 shadow-lg flex items-center justify-center text-slate-300 hover:text-white hover:border-primary-500/50 transition-colors"
      >
        <FiSettings size={20} className={isOpen ? "animate-spin-slow" : ""} />
      </motion.button>
    </div>
  );
}
