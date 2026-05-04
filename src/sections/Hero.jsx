import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiReact, SiSpringboot, SiJavascript, SiDocker } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import ParticleBackground from '../components/ParticleBackground';
import TypingAnimation from '../components/TypingAnimation';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const techOrbit = [
  { Icon: SiReact, color: '#61dafb', label: 'React' },
  { Icon: FaJava, color: '#f89820', label: 'Java' },
  { Icon: SiSpringboot, color: '#6db33f', label: 'Spring' },
  { Icon: SiJavascript, color: '#f7df1e', label: 'JS' },
  { Icon: SiDocker, color: '#2496ed', label: 'Docker' },
];

export default function Hero() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Particle canvas */}
      <ParticleBackground />

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary-600/15 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] bg-violet-600/12 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-cyan-600/8 rounded-full blur-[80px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left — main content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            {/* Status badge */}
            <motion.div variants={item} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm font-medium backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to new opportunities
                <span className="text-emerald-600">•</span>
                <span className="text-emerald-600 text-xs">Available now</span>
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={item}
              className="text-slate-400 font-mono text-sm mb-3 tracking-widest uppercase"
            >
              Hi there, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-[1.05] mb-4"
            >
              Archit{' '}
              <span className="relative">
                <span className="gradient-text">Yadav</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-500 via-violet-500 to-cyan-500 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
                />
              </span>
            </motion.h1>

            {/* Role with typing */}
            <motion.div
              variants={item}
              className="text-xl sm:text-2xl font-semibold text-slate-300 mb-6 h-9 flex items-center gap-2"
            >
              <span className="text-slate-500">/</span>
              <TypingAnimation />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10"
            >
              Building{' '}
              <span className="text-white font-medium">scalable, high-performance</span>{' '}
              web applications with{' '}
              <span className="text-primary-400 font-medium">React.js</span> and{' '}
              <span className="text-primary-400 font-medium">Java Spring Boot</span>.
              Specialized in enterprise systems, real-time dashboards, and performance optimization.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <motion.button
                onClick={() => scrollTo('#projects')}
                className="btn-primary group relative overflow-hidden"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                id="hero-view-projects-btn"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    <FiArrowDown size={16} />
                  </motion.span>
                </span>
                {/* Shimmer */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                className="btn-outline group"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                id="hero-download-resume-btn"
              >
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <FiDownload size={16} />
                </motion.span>
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-5">
              <motion.a
                href="https://github.com/Arcsystemowner"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group"
                whileHover={{ y: -2 }}
                aria-label="GitHub"
                id="hero-github-link"
              >
                <FaGithub size={20} />
                <span className="text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  GitHub
                </span>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/archit-yadav-bb0a47187"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-primary-400 transition-colors group"
                whileHover={{ y: -2 }}
                aria-label="LinkedIn"
                id="hero-linkedin-link"
              >
                <FaLinkedin size={20} />
                <span className="text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  LinkedIn
                </span>
              </motion.a>
              <div className="h-px w-14 bg-white/10" />
              <span className="text-slate-600 text-xs font-mono">archityadav.dev</span>
            </motion.div>
          </motion.div>

          {/* Right — decorative floating card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            {/* Code card */}
            <div className="relative w-72">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="glass rounded-2xl p-5 border border-white/10 shadow-2xl"
              >
                {/* Editor chrome */}
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-auto font-mono text-xs text-slate-600">App.java</span>
                </div>
                <pre className="font-mono text-xs leading-6 text-left overflow-hidden">
                  <code>
                    <span className="text-violet-400">@RestController</span>{'\n'}
                    <span className="text-sky-400">public class</span>{' '}
                    <span className="text-emerald-300">ArchitController</span>{' {'}{'\n'}
                    {'\n'}
                    {'  '}<span className="text-violet-400">@GetMapping</span>
                    <span className="text-slate-500">("/skills")</span>{'\n'}
                    {'  '}<span className="text-sky-400">public</span>{' '}
                    <span className="text-amber-300">List</span>
                    <span className="text-slate-400">{'<String>'}</span>{' '}
                    <span className="text-emerald-400">getSkills</span>
                    <span className="text-slate-400">() {'{'}</span>{'\n'}
                    {'    '}<span className="text-sky-400">return</span>{' '}
                    <span className="text-slate-300">List.of(</span>{'\n'}
                    {'      '}<span className="text-amber-300">"React.js"</span>
                    <span className="text-slate-500">,</span>{'\n'}
                    {'      '}<span className="text-amber-300">"Spring Boot"</span>
                    <span className="text-slate-500">,</span>{'\n'}
                    {'      '}<span className="text-amber-300">"PostgreSQL"</span>{'\n'}
                    {'    '}<span className="text-slate-300">);</span>{'\n'}
                    {'  '}<span className="text-slate-400">{'}'}</span>{'\n'}
                    <span className="text-slate-400">{'}'}</span>
                  </code>
                </pre>
              </motion.div>

              {/* Tech badges orbiting */}
              {techOrbit.map(({ Icon, color, label }, i) => {
                const angle = (i / techOrbit.length) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const radius = 145;
                const cx = Math.cos(rad) * radius;
                const cy = Math.sin(rad) * radius;
                return (
                  <motion.div
                    key={label}
                    className="absolute flex flex-col items-center gap-1"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [cx, cx + 4, cx],
                      y: [cy, cy - 5, cy],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.3,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center bg-dark-800/90 border border-white/10 shadow-lg backdrop-blur-sm"
                      style={{ transform: 'translate(-50%, -50%)' }}
                    >
                      <Icon size={18} color={color} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-700 text-xs font-mono tracking-widest">scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-primary-500/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
