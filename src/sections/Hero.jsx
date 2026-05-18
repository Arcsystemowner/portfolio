import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiReact, SiSpringboot, SiJavascript, SiDocker } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import React, { Suspense, lazy } from 'react';
import TypingAnimation from '../components/TypingAnimation';

const ParticleBackground = lazy(() => import('../components/ParticleBackground'));

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
      <Suspense fallback={<div className="absolute inset-0 bg-dark-900 pointer-events-none z-0" />}>
        <ParticleBackground />
      </Suspense>

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
          

            {/* Greeting */}
            <motion.p
              variants={item}
              className="text-primary-400 font-mono text-xs sm:text-sm mb-3 tracking-widest uppercase flex items-center gap-2"
            >
              <span className="w-4 h-px bg-primary-500/50"></span>
              SYS.ADMIN // IDENTIFIED
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-[1.1] mb-4"
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
              Architecting <span className="text-white font-medium">scalable distributed systems</span> and{' '}
              <span className="text-primary-400 font-medium">real-time platforms</span>. 
              Specializing in observability infrastructure, event-driven architecture, and enterprise-grade full-stack applications.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-12"
            >
              <motion.button
                onClick={() => scrollTo('#projects')}
                className="btn-primary w-full sm:w-auto justify-center group relative overflow-hidden"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                id="hero-view-projects-btn"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
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
                className="btn-outline w-full sm:w-auto justify-center group"
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
                Resume
              </motion.a>

              <motion.button
                onClick={() => scrollTo('#contact')}
                className="btn-outline w-full sm:w-auto justify-center border-transparent bg-dark-800 hover:bg-dark-700 hover:text-white group"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                id="hero-contact-btn"
              >
                Contact Me
              </motion.button>
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
            className="hidden lg:block relative"
          >
            {/* Holographic System Monitor Card */}
            <div className="relative w-80">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="glass rounded-xl p-5 border border-primary-500/20 shadow-[0_0_40px_rgba(99,102,241,0.15)] bg-dark-900/60 backdrop-blur-md overflow-hidden relative"
              >
                {/* Holographic scanning line effect */}
                <motion.div 
                  className="absolute left-0 right-0 h-1 bg-primary-500/30 blur-sm z-0"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
                />

                {/* Header */}
                <div className="flex items-center justify-between mb-6 relative z-10 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-primary-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    SYSTEM.METRICS
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">LIVE_NODE_01</span>
                </div>

                {/* Network Graph Simulation */}
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest">KAFKA CLUSTER</div>
                      <div className="text-xl font-bold text-white font-mono">24.5k<span className="text-xs text-primary-400 ml-1">msg/s</span></div>
                    </div>
                    {/* Simulated Mini Chart */}
                    <div className="flex items-end gap-1 h-8 opacity-70">
                      {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-primary-500 rounded-t-sm"
                          animate={{ height: [`${h}%`, `${h - (Math.random() * 20 - 10)}%`, `${h}%`] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase">API LATENCY</div>
                      <div className="text-lg font-bold text-emerald-400 font-mono">12ms</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase">CACHE HIT</div>
                      <div className="text-lg font-bold text-cyan-400 font-mono">98.2%</div>
                    </div>
                  </div>
                  
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />
                  
                  {/* Fake console log */}
                  <div className="font-mono text-[9px] leading-tight text-slate-500 h-10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-900/60 z-10 pointer-events-none"/>
                    <motion.div animate={{ y: [0, -20] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                      <p className="text-emerald-500/70">[OK] Shard 03 rebalanced</p>
                      <p>[INFO] TCP connection established</p>
                      <p>[INFO] WS stream active</p>
                      <p className="text-primary-500/70">[SYNC] Redis sync complete</p>
                      <p>[INFO] Heartbeat acknowledged</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Orbiting Tech Nodes */}
              {techOrbit.map(({ Icon, color, label }, i) => {
                const angle = (i / techOrbit.length) * 360 - 90;
                const rad = (angle * Math.PI) / 180;
                const radius = 175;
                const cx = Math.cos(rad) * radius;
                const cy = Math.sin(rad) * radius;
                return (
                  <motion.div
                    key={label}
                    className="absolute flex flex-col items-center gap-1 z-20"
                    style={{ left: '50%', top: '50%' }}
                    animate={{
                      x: [cx, cx + 5, cx],
                      y: [cy, cy - 5, cy],
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.3,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-dark-900/80 border border-primary-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)] backdrop-blur-md relative overflow-hidden group"
                      style={{ transform: 'translate(-50%, -50%)' }}
                    >
                      <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
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
