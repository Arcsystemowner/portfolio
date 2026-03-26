import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="section-container relative z-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Status badge */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to new opportunities
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={item} className="text-slate-400 font-mono text-sm mb-2 tracking-wider">
            Hi, I'm
          </motion.p>

          {/* Name */}
          <motion.h1 variants={item} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-3">
            Archit{' '}
            <span className="gradient-text">Yadav</span>
          </motion.h1>

          {/* Role */}
          <motion.h2 variants={item} className="text-xl sm:text-2xl font-semibold text-slate-300 mb-4">
            Frontend Developer{' '}
            <span className="text-primary-400">|</span>{' '}
            MERN Stack Developer
          </motion.h2>

          {/* Tagline */}
          <motion.p variants={item} className="text-slate-400 text-lg max-w-xl leading-relaxed mb-10">
            Building{' '}
            <span className="text-white font-medium">scalable</span> and{' '}
            <span className="text-white font-medium">high-performance</span> web
            applications. Currently at{' '}
            <span className="text-primary-400 font-medium">KFin Technologies</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-12">
            <button onClick={() => scrollTo('#projects')} className="btn-primary">
              View Projects
              <FiArrowDown size={16} />
            </button>
            <a
              href="/resume.pdf"
              download
              className="btn-outline"
              onClick={() => console.log('Resume downloaded')}
            >
              <FiDownload size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-4">
            <a
              href="https://github.com/archityadav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://linkedin.com/in/archityadav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-primary-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={22} />
            </a>
            <div className="h-px w-16 bg-white/10" />
            <span className="text-slate-500 text-sm font-mono">archityadav.dev</span>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-600 text-xs font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-primary-500/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
