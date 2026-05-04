import { motion } from 'framer-motion';
import { FiCode, FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';
import { SiReact } from 'react-icons/si';
import { SiTailwindcss } from 'react-icons/si';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary-600/5 blur-[80px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <a href="#home" className="font-mono text-lg font-bold gradient-text tracking-tight">
              &lt;AY /&gt;
            </a>
            <p className="text-xs text-slate-600 mt-1 font-mono">Archit Yadav — Full Stack Dev</p>
          </div>

          {/* Built with */}
          <p className="flex items-center gap-2 text-sm text-slate-600 flex-wrap justify-center">
            Built with{' '}
            <span className="inline-flex items-center gap-1 text-cyan-400">
              <SiReact size={14} /> React
            </span>
            {' '}+{' '}
            <span className="inline-flex items-center gap-1 text-teal-400">
              <SiTailwindcss size={14} /> Tailwind
            </span>
            {' '}+{' '}
            <span className="inline-flex items-center gap-1 text-slate-400">
              <FiCode size={14} /> Framer Motion
            </span>
          </p>

          {/* Social */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/Arcsystemowner"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, color: '#fff' }}
              className="text-slate-600 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/archit-yadav-bb0a47187"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="text-slate-600 hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-700">
          <p>© {year} Archit Yadav. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <FiHeart size={11} className="text-rose-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
