import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader';
import { projects } from '../data/projects';

const filters = ['All', 'React', 'Full Stack'];

function getFilter(project) {
  const stack = project.techStack.join(' ').toLowerCase();
  const tags = [];
  if (stack.includes('react')) tags.push('React');
  if (stack.includes('java') || stack.includes('spring') || stack.includes('node')) tags.push('Full Stack');
  return tags;
}

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => getFilter(p).includes(active));

  return (
    <section id="projects" className="relative">
      <div className="section-container">
        <SectionHeader number="03" label="Projects" title="Featured Projects" subtitle="Production-grade projects built with performance and scalability in mind." />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              id={`projects-filter-${f.toLowerCase().replace(' ', '-')}`}
              className={`px-5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                active === f
                  ? 'bg-primary-500/20 border-primary-500/60 text-primary-300'
                  : 'border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a href="https://github.com/Arcsystemowner" target="_blank" rel="noopener noreferrer" className="btn-outline" id="projects-github-all">
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const { title, description, techStack, metrics, github, demo, color, featured } = project;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative card p-6 flex flex-col gap-5 overflow-hidden"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ boxShadow: 'inset 0 0 60px rgba(99, 102, 241, 0.08)' }} />

      {/* Featured badge */}
      {featured && (
        <span className="absolute top-4 right-4 text-[10px] px-2 py-0.5 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-300 font-mono tracking-wider">
          Featured
        </span>
      )}

      {/* Color block + links */}
      <div className="flex items-start justify-between gap-4">
        <motion.div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} opacity-90`}
          whileHover={{ scale: 1.1, rotate: 6 }}
          transition={{ type: 'spring', stiffness: 400 }}
        />
        <div className="flex items-center gap-2 mt-1">
          {github && (
            <motion.a href={github} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} aria-label="GitHub">
              <FiGithub size={15} />
            </motion.a>
          )}
          {demo && (
            <motion.a href={demo} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} aria-label="Live Demo">
              <FiExternalLink size={15} />
            </motion.a>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-white group-hover:text-primary-300 transition-colors mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{description}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <div key={m} className="flex items-center gap-2 bg-white/3 rounded-lg px-3 py-2 hover:bg-white/5 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 animate-pulse" />
            <span className="text-xs text-slate-300 truncate">{m}</span>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5">
        {techStack.slice(0, 5).map((tech) => (
          <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-primary-500/10 text-primary-300 border border-primary-500/20 font-mono">
            {tech}
          </span>
        ))}
        {techStack.length > 5 && (
          <span className="text-xs px-2 py-1 rounded-md text-slate-500 font-mono">+{techStack.length - 5}</span>
        )}
      </div>
    </motion.article>
  );
}
