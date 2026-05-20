import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiGithub, FiExternalLink, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  const [expandedSections, setExpandedSections] = useState({});

  if (!project) return null;

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with smooth entry */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          {/* Modal with smooth spring animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            data-lenis-prevent
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-y-auto"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="bg-gradient-to-b from-dark-800 to-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header with animated background */}
              <motion.div
                className={`relative bg-gradient-to-r ${project.color} p-0.5 overflow-hidden`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="bg-dark-900 px-8 py-6 flex items-start justify-between gap-4 relative"
                  layoutId="modal-header"
                >
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {project.title}
                    </h2>
                    <motion.p
                      className="text-slate-400 text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      {project.description}
                    </motion.p>
                  </motion.div>
                  <motion.button
                    onClick={onClose}
                    whileHover={{
                      scale: 1.15,
                      rotate: 90,
                      background: "rgba(99, 102, 241, 0.2)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 text-slate-400 hover:text-white transition-colors"
                  >
                    <FiX size={20} />
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Content with staggered animations */}
              <motion.div
                className="p-8 space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Links with smooth appearance */}
                {(project.github || project.demo) && (
                  <motion.div
                    className="flex gap-3"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          scale: 1.08,
                          boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/20 border border-primary-500/40 text-primary-300 hover:bg-primary-500/30 transition-colors"
                      >
                        <FiGithub size={16} />
                        GitHub
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                          scale: 1.08,
                          boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/20 border border-primary-500/40 text-primary-300 hover:bg-primary-500/30 transition-colors"
                      >
                        <FiExternalLink size={16} />
                        Live Demo
                      </motion.a>
                    )}
                  </motion.div>
                )}

                {/* Problem Statement - Expandable */}
                <ExpandableSection
                  title="Problem Statement"
                  icon="⚡"
                  color="red"
                  content={project.problem}
                  isExpanded={expandedSections["problem"]}
                  onToggle={() => toggleSection("problem")}
                  variants={itemVariants}
                />

                {/* Solution - Expandable */}
                <ExpandableSection
                  title="Solution & Architecture"
                  icon="✓"
                  color="emerald"
                  content={
                    <>
                      <p className="mb-4">{project.solution}</p>
                      <motion.div
                        className="bg-white/5 border border-white/10 rounded-xl p-4"
                        whileHover={{
                          borderColor: "rgba(99, 102, 241, 0.5)",
                          background: "rgba(99, 102, 241, 0.05)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-slate-300 font-mono text-sm leading-relaxed">
                          {project.architecture}
                        </p>
                      </motion.div>
                    </>
                  }
                  isExpanded={expandedSections["solution"]}
                  onToggle={() => toggleSection("solution")}
                  variants={itemVariants}
                />

                {/* Key Features - Expandable */}
                <ExpandableSection
                  title="Key Features"
                  icon="★"
                  color="blue"
                  isExpanded={expandedSections["features"]}
                  onToggle={() => toggleSection("features")}
                  variants={itemVariants}
                  content={
                    <motion.ul
                      className="grid md:grid-cols-2 gap-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {project.keyFeatures.map((feature, i) => (
                        <motion.li
                          key={i}
                          variants={itemVariants}
                          whileHover={{
                            x: 8,
                            background: "rgba(99, 102, 241, 0.1)",
                          }}
                          className="flex gap-3 text-slate-400 p-2 rounded transition-all"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-2" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  }
                />

                {/* Tech Stack - Expandable */}
                <ExpandableSection
                  title="Tech Stack"
                  icon="⚙"
                  color="violet"
                  isExpanded={expandedSections["tech"]}
                  onToggle={() => toggleSection("tech")}
                  variants={itemVariants}
                  content={
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {project.techStack.map((tech, i) => (
                        <motion.span
                          key={tech}
                          variants={itemVariants}
                          whileHover={{
                            scale: 1.1,
                            y: -4,
                            boxShadow: "0 8px 16px rgba(99, 102, 241, 0.3)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                          }}
                          className="px-3 py-1.5 rounded-lg bg-primary-500/15 text-primary-300 border border-primary-500/30 text-sm font-mono cursor-pointer"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  }
                />

                {/* Impact - Expandable */}
                <ExpandableSection
                  title="Impact & Results"
                  icon="📊"
                  color="amber"
                  isExpanded={expandedSections["impact"]}
                  onToggle={() => toggleSection("impact")}
                  variants={itemVariants}
                  content={
                    <motion.ul
                      className="space-y-2"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {project.impact.map((item, i) => (
                        <motion.li
                          key={i}
                          variants={itemVariants}
                          whileHover={{
                            x: 8,
                            boxShadow: "0 0 20px rgba(99, 102, 241, 0.2)",
                          }}
                          className="flex gap-3 text-slate-300 p-3 rounded-lg bg-white/3 border border-white/5 transition-all"
                        >
                          <span className="text-amber-400 font-bold shrink-0">
                            →
                          </span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  }
                />

                {/* Role & Contributions - Expandable */}
                <ExpandableSection
                  title="My Role & Contributions"
                  icon="👤"
                  color="cyan"
                  isExpanded={expandedSections["role"]}
                  onToggle={() => toggleSection("role")}
                  variants={itemVariants}
                  content={
                    <motion.ul
                      className="space-y-2.5"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {project.role.map((item, i) => (
                        <motion.li
                          key={i}
                          variants={itemVariants}
                          whileHover={{
                            x: 8,
                            background: "rgba(99, 102, 241, 0.1)",
                          }}
                          className="flex gap-3 text-slate-400 p-2 rounded transition-all"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  }
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* Reusable Expandable Section Component */
function ExpandableSection({
  title,
  icon,
  color,
  content,
  isExpanded,
  onToggle,
  variants,
}) {
  const colorClasses = {
    red: "bg-red-500/20 text-red-400",
    emerald: "bg-emerald-500/20 text-emerald-400",
    blue: "bg-blue-500/20 text-blue-400",
    violet: "bg-violet-500/20 text-violet-400",
    amber: "bg-amber-500/20 text-amber-400",
    cyan: "bg-cyan-500/20 text-cyan-400",
  };

  return (
    <motion.div variants={variants}>
      <motion.button
        onClick={onToggle}
        whileHover={{
          background: "rgba(99, 102, 241, 0.05)",
        }}
        className="w-full flex items-center gap-3 text-xl font-bold text-white mb-3 p-3 rounded-lg transition-all"
      >
        <span
          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${colorClasses[color]} text-sm font-bold`}
        >
          {icon}
        </span>
        <span className="flex-1 text-left">{title}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <FiChevronDown size={20} />
        </motion.div>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isExpanded ? 1 : 0,
          height: isExpanded ? "auto" : 0,
        }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <motion.div className="pl-11">{content}</motion.div>
      </motion.div>
    </motion.div>
  );
}
