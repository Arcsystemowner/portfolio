import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import SectionHeader from "../components/SectionHeader";
import ProjectDetailModal from "../components/ProjectDetailModal";
import { projects } from "../data/projects";

const filters = ["All", "React", "Full Stack"];

function getFilter(project) {
  const stack = project.techStack.join(" ").toLowerCase();
  const tags = [];
  if (stack.includes("react")) tags.push("React");
  if (
    stack.includes("java") ||
    stack.includes("spring") ||
    stack.includes("node")
  )
    tags.push("Full Stack");
  return tags;
}

export default function Projects() {
  const [active, setActive] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => getFilter(p).includes(active));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const filterVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
  };

  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            number="03"
            label="Projects"
            title="Featured Projects"
            subtitle="Production-grade projects built with performance and scalability in mind."
          />
        </motion.div>

        {/* Filter tabs with smooth transitions */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileHover={{
                scale: 1.08,
                boxShadow:
                  active === f
                    ? "0 0 20px rgba(99, 102, 241, 0.4)"
                    : "0 0 10px rgba(99, 102, 241, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              id={`projects-filter-${f.toLowerCase().replace(" ", "-")}`}
              className={`px-5 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                active === f
                  ? "bg-primary-500/20 border-primary-500/60 text-primary-300 shadow-lg"
                  : "border-white/10 text-slate-500 hover:border-white/30 hover:text-slate-300"
              }`}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid with enhanced animations */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onViewDetails={() => setSelectedProject(project)}
              isHovered={hoveredCard === project.id}
              onHover={(id) => setHoveredCard(id)}
              onUnhover={() => setHoveredCard(null)}
            />
          ))}
        </motion.div>

        {/* Modal */}
        <ProjectDetailModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <motion.a
            href="https://github.com/Arcsystemowner"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-block"
            id="projects-github-all"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onViewDetails,
  isHovered,
  onHover,
  onUnhover,
}) {
  const {
    title,
    description,
    techStack,
    metrics,
    github,
    demo,
    color,
    featured,
  } = project;

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      drag
      dragElastic={0.2}
      dragTransition={{ power: 0.3, restDamping: 0.8 }}
      onHoverStart={() => onHover(project.id)}
      onHoverEnd={onUnhover}
      whileHover={{
        y: -12,
        boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group relative card p-6 flex flex-col gap-5 overflow-hidden cursor-grab active:cursor-grabbing"
      onClick={onViewDetails}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{
          boxShadow: "inset 0 0 60px rgba(99, 102, 241, 0.08)",
        }}
        animate={{
          boxShadow: isHovered
            ? "inset 0 0 80px rgba(99, 102, 241, 0.15)"
            : "inset 0 0 60px rgba(99, 102, 241, 0.08)",
        }}
      />

      {/* Shimmer effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none rounded-2xl"
          animate={{
            opacity: [0, 0.3, 0],
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
          }}
        />
      )}

      {/* Featured badge with animation */}
      {featured && (
        <motion.span
          className="absolute top-4 right-4 text-[10px] px-2 py-0.5 rounded-full bg-primary-500/20 border border-primary-500/40 text-primary-300 font-mono tracking-wider"
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            boxShadow: isHovered ? "0 0 15px rgba(99, 102, 241, 0.5)" : "none",
          }}
          transition={{ duration: 0.5 }}
        >
          Featured
        </motion.span>
      )}

      {/* Color block + links */}
      <div className="flex items-start justify-between gap-4">
        <motion.div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} opacity-90`}
          whileHover={{
            scale: 1.15,
            rotate: 8,
            boxShadow: `0 10px 30px rgba(99, 102, 241, 0.3)`,
          }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        <motion.div
          className="flex items-center gap-2 mt-1"
          animate={{
            opacity: isHovered ? 1 : 0.7,
          }}
        >
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              whileHover={{
                scale: 1.2,
                rotate: 10,
                background: "rgba(99, 102, 241, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub"
            >
              <FiGithub size={15} />
            </motion.a>
          )}
          {demo && (
            <motion.a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
              whileHover={{
                scale: 1.2,
                rotate: -10,
                background: "rgba(99, 102, 241, 0.2)",
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="Live Demo"
            >
              <FiExternalLink size={15} />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Title and description */}
      <motion.div
        animate={{
          color: isHovered ? "rgb(196, 181, 253)" : "rgb(255, 255, 255)",
        }}
      >
        <h3 className="text-base font-bold group-hover:text-primary-300 transition-colors mb-2">
          {title}
        </h3>
        <motion.p
          className="text-slate-400 text-sm leading-relaxed line-clamp-3"
          animate={{
            color: isHovered ? "rgb(148, 163, 184)" : "rgb(100, 116, 139)",
          }}
        >
          {description}
        </motion.p>
      </motion.div>

      {/* Metrics with hover animation */}
      <motion.div
        className="grid grid-cols-2 gap-2"
        animate={{ opacity: isHovered ? 1 : 0.8 }}
      >
        {metrics.map((m, i) => (
          <motion.div
            key={m}
            className="flex items-center gap-2 bg-white/3 rounded-lg px-3 py-2 hover:bg-white/5 transition-colors"
            whileHover={{
              scale: 1.05,
              background: "rgba(255, 255, 255, 0.08)",
            }}
            transition={{ delay: i * 0.05 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0"
              animate={{
                scale: isHovered ? [1, 1.5, 1] : 1,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            <span className="text-xs text-slate-300 truncate">{m}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Tech stack */}
      <motion.div
        className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/5"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        {techStack.slice(0, 5).map((tech, i) => (
          <motion.span
            key={tech}
            className="text-xs px-2.5 py-1 rounded-md bg-primary-500/10 text-primary-300 border border-primary-500/20 font-mono"
            whileHover={{
              scale: 1.1,
              background: "rgba(99, 102, 241, 0.2)",
              borderColor: "rgba(99, 102, 241, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {tech}
          </motion.span>
        ))}
        {techStack.length > 5 && (
          <span className="text-xs px-2 py-1 rounded-md text-slate-500 font-mono">
            +{techStack.length - 5}
          </span>
        )}
      </motion.div>

      {/* View Details Button with enhanced animation */}
      <motion.button
        onClick={onViewDetails}
        className="w-full mt-4 px-4 py-2.5 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/30 text-primary-300 font-medium flex items-center justify-center gap-2 transition-all group/btn"
        whileHover={{
          scale: 1.05,
          background: "rgba(99, 102, 241, 0.2)",
          boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        View Details
        <motion.span
          className="group-hover/btn:translate-x-1 transition-transform inline-block"
          animate={{
            x: isHovered ? [0, 4, 0] : 0,
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
          }}
        >
          <FiArrowRight size={16} />
        </motion.span>
      </motion.button>
    </motion.article>
  );
}
