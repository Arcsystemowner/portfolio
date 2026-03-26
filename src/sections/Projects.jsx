import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-primary-400 font-mono text-sm tracking-widest mb-2">03. PROJECTS</p>
          <h2 className="section-title">Featured Projects</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full mb-4" />
          <p className="section-subtitle">
            Production-grade projects built with performance and scalability in mind.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/archityadav"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
