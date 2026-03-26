import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi';
import { experience } from '../data/experience';

export default function Experience() {
  const exp = experience[0];
  return (
    <section id="experience" className="relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-primary-400 font-mono text-sm tracking-widest mb-2">04. EXPERIENCE</p>
          <h2 className="section-title">Work Experience</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full" />
        </motion.div>

        <div className="relative max-w-3xl">
          {/* Timeline line */}
          <div className="absolute left-5 top-8 bottom-0 w-px bg-gradient-to-b from-primary-500 to-transparent hidden sm:block" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:pl-16 relative"
          >
            {/* Timeline dot */}
            <div className="absolute left-3.5 top-8 w-3 h-3 rounded-full bg-primary-500 border-2 border-dark-900 shadow-lg shadow-primary-500/50 hidden sm:block" />

            <div className="card p-7">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-primary-400 font-semibold mt-0.5">{exp.company}</p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  {exp.type}
                </span>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <FiCalendar size={13} />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMapPin size={13} />
                  {exp.location}
                </span>
              </div>

              <p className="text-slate-400 leading-relaxed mb-6">{exp.description}</p>

              {/* Responsibilities */}
              <ul className="space-y-3">
                {exp.responsibilities.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="flex gap-3 text-sm text-slate-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-1.5" />
                    {r}
                  </motion.li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/5">
                {exp.techStack.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-primary-500/10 text-primary-300 border border-primary-500/20 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
