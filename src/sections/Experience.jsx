import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader';
import { experience } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="relative">
      <div className="section-container">
        <SectionHeader number="04" label="Experience" title="Work Experience" subtitle="My professional journey building enterprise software." />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/60 via-violet-500/30 to-transparent hidden sm:block" />

          <div className="space-y-10">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="sm:pl-20 relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-7 hidden sm:flex">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, type: 'spring' }}
                    className="w-5 h-5 rounded-full border-2 border-primary-500 bg-dark-900 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                  </motion.div>
                </div>

                <div className="card p-6 sm:p-7">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className="text-primary-400 font-semibold mt-0.5">{exp.company}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium border ${
                      exp.type === 'Full-time'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-5 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar size={13} />{exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiMapPin size={13} />{exp.location}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{exp.description}</p>

                  {/* Responsibilities */}
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((r, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: j * 0.06 }}
                        className="flex gap-3 text-sm text-slate-400"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0 mt-[7px]" />
                        {r}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/5">
                    {exp.techStack.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-primary-500/10 text-primary-300 border border-primary-500/20 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
