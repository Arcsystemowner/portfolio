import { motion } from 'framer-motion';

export default function SectionHeader({ number, label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="mb-16"
    >
      <p className="text-primary-400 font-mono text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
        <span className="text-primary-600">{number}.</span>
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-5 leading-tight">
        {title}
      </h2>
      <div className="flex items-center gap-3">
        <div className="w-10 h-0.5 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full" />
        <div className="w-2 h-2 rounded-full bg-violet-500/50" />
      </div>
      {subtitle && (
        <p className="section-subtitle mt-5">{subtitle}</p>
      )}
    </motion.div>
  );
}
