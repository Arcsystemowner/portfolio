import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function ProjectCard({ project, index }) {
  const { title, description, techStack, metrics, github, demo, color } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card p-6 flex flex-col gap-5 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className={`inline-block w-10 h-10 rounded-xl bg-gradient-to-br ${color} mb-3 opacity-90`} />
          <h3 className="text-lg font-bold text-white group-hover:text-primary-300 transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0 mt-1">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5
                         hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              aria-label="GitHub"
            >
              <FiGithub size={15} />
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5
                         hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              aria-label="Live Demo"
            >
              <FiExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <div
            key={m}
            className="flex items-center gap-2 bg-white/3 rounded-lg px-3 py-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
            <span className="text-xs text-slate-300">{m}</span>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/5">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2.5 py-1 rounded-md bg-primary-500/10 text-primary-300
                       border border-primary-500/20 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
