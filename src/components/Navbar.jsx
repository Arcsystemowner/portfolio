import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    setActive(href.replace('#', ''));
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/90 dark:bg-dark-900/90 backdrop-blur-lg border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
          className="font-mono text-xl font-bold gradient-text tracking-tight"
        >
          &lt;AY /&gt;
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => handleNav(href)}
              className={`nav-link text-sm ${
                active === href.replace('#', '')
                  ? 'text-white after:w-full'
                  : ''
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-lg flex items-center justify-center
                       bg-white/5 hover:bg-white/10 border border-white/10
                       text-slate-400 hover:text-white transition-all duration-200"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center
                       bg-white/5 hover:bg-white/10 border border-white/10
                       text-slate-400 hover:text-white transition-all duration-200"
            aria-label="Menu"
          >
            {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800/95 backdrop-blur-lg border-b border-white/5"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => handleNav(href)}
                  className="text-left py-3 text-slate-400 hover:text-white font-medium
                             border-b border-white/5 last:border-0 transition-colors"
                >
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
