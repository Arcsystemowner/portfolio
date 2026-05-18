import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowRight, FiZap, FiShield, FiActivity, FiLayers } from "react-icons/fi";
import ProjectDetailModal from "../components/ProjectDetailModal";
import { projects } from "../data/projects";

// ─── filter config ────────────────────────────────────────────────────────────
const FILTERS = ["All", "Featured", "React", "Full Stack"];

function getTagsForProject(project) {
  const stack = project.techStack.join(" ").toLowerCase();
  const tags = [];
  if (project.featured) tags.push("Featured");
  if (stack.includes("react")) tags.push("React");
  if (stack.includes("spring") || stack.includes("java") || stack.includes("node")) tags.push("Full Stack");
  return tags;
}

// ─── accent icon per project ──────────────────────────────────────────────────
const PROJECT_ICONS = {
  "sre-monitoring":       FiActivity,
  "asset-management":     FiLayers,
  "db-activity-monitoring": FiShield,
  "task-tracker":         FiZap,
};

// ─── main section ─────────────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive]         = useState("All");
  const [selected, setSelected]     = useState(null);
  const [hovered, setHovered]       = useState(null);

  const filtered = active === "All"
    ? projects
    : projects.filter(p => getTagsForProject(p).includes(active));

  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="section-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-primary-400 text-sm tracking-widest">03</span>
              <span className="h-px w-8 bg-primary-500/40" />
              <span className="font-mono text-xs text-slate-500 tracking-widest uppercase">Projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Featured Projects</h2>
            <p className="text-slate-400 max-w-xl">
              Production systems built at KFin Technologies — enterprise-scale platforms serving real teams and infrastructure.
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className={`px-5 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                active === f
                  ? "bg-primary-500/20 border-primary-500/60 text-primary-300 shadow-lg shadow-primary-500/10"
                  : "border-white/10 text-slate-500 hover:border-white/30 hover:text-slate-300"
              }`}
            >
              {f}
            </motion.button>
          ))}

          {/* live count */}
          <span className="ml-auto self-center text-xs font-mono text-slate-600">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isHovered={hovered === project.id}
                onHover={() => setHovered(project.id)}
                onUnhover={() => setHovered(null)}
                onViewDetails={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <ProjectDetailModal
          project={selected}
          isOpen={!!selected}
          onClose={() => setSelected(null)}
        />

        {/* GitHub CTA */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <motion.a
            href="https://github.com/Arcsystemowner"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub size={16} />
            View All on GitHub
          </motion.a>
        </motion.div> */}
      </div>
    </section>
  );
}

// ─── project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, isHovered, onHover, onUnhover, onViewDetails }) {
  const { title, description, techStack, metrics, github, demo, color, accentColor, featured, id } = project;
  const Icon = PROJECT_ICONS[id] || FiActivity;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.07, type: "spring", stiffness: 280, damping: 28 }}
      onHoverStart={onHover}
      onHoverEnd={onUnhover}
      whileHover={{ y: -6, boxShadow: `0 24px 48px ${accentColor}25` }}
      className="group relative card p-0 flex flex-col overflow-hidden cursor-pointer"
      onClick={onViewDetails}
      style={{ borderColor: isHovered ? `${accentColor}40` : undefined, transition: "border-color 0.3s" }}
    >
      {/* Shimmer on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          animate={{ x: ["-100%", "160%"] }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)" }}
        />
      )}

      {/* Top colour strip */}
      <div className={`h-1 w-full bg-gradient-to-r ${color} opacity-80`} />

      {/* Card body */}
      <div className="p-6 flex flex-col gap-5 flex-1">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Icon badge */}
            <motion.div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center opacity-90 shrink-0`}
              whileHover={{ scale: 1.12, rotate: 6 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon size={20} className="text-white" />
            </motion.div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-primary-300 transition-colors leading-tight">
                {title}
              </h3>
              {featured && (
                <span
                  className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded-full border font-mono tracking-wider"
                  style={{ color: accentColor, borderColor: `${accentColor}50`, background: `${accentColor}12` }}
                >
                  FEATURED
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1.5 shrink-0 mt-1">
            {/* {github && (
              <motion.a
                href={github} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} aria-label="GitHub"
              >
                <FiGithub size={14} />
              </motion.a>
            )} */}
            {demo && (
              <motion.a
                href={demo} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} aria-label="Live Demo"
              >
                <FiExternalLink size={14} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{description}</p>

        {/* Metrics — 2×2 grid with accent dots */}
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((m, i) => (
            <motion.div
              key={m}
              className="flex items-start gap-2 rounded-lg px-3 py-2.5 border transition-colors"
              style={{
                background: isHovered ? `${accentColor}0a` : "rgba(255,255,255,0.02)",
                borderColor: isHovered ? `${accentColor}25` : "rgba(255,255,255,0.05)",
                transition: "background 0.3s, border-color 0.3s",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ delay: i * 0.04 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 mt-1"
                style={{ background: accentColor, boxShadow: `0 0 5px ${accentColor}` }}
              />
              <span className="text-xs text-slate-300 leading-tight">{m}</span>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5 mt-auto">
          {techStack.slice(0, 5).map(tech => (
            <motion.span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-md font-mono border transition-colors"
              style={{
                background: `${accentColor}10`,
                color: accentColor,
                borderColor: `${accentColor}30`,
              }}
              whileHover={{ scale: 1.08, background: `${accentColor}20` }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {tech}
            </motion.span>
          ))}
          {techStack.length > 5 && (
            <span className="text-xs px-2 py-1 text-slate-500 font-mono">+{techStack.length - 5}</span>
          )}
        </div>

        {/* View details CTA */}
        <motion.button
          onClick={onViewDetails}
          className="w-full mt-1 px-4 py-2.5 rounded-lg border font-medium flex items-center justify-center gap-2 transition-all text-sm"
          style={{
            background: isHovered ? `${accentColor}18` : `${accentColor}0c`,
            borderColor: isHovered ? `${accentColor}60` : `${accentColor}30`,
            color: accentColor,
            transition: "background 0.3s, border-color 0.3s",
          }}
          whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${accentColor}30` }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          View Details
          <motion.span
            animate={{ x: isHovered ? [0, 4, 0] : 0 }}
            transition={{ duration: 0.7, repeat: Infinity }}
          >
            <FiArrowRight size={15} />
          </motion.span>
        </motion.button>
      </div>
    </motion.article>
  );
}