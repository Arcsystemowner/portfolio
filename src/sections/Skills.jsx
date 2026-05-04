import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJava, FaDatabase, FaDocker,
} from 'react-icons/fa';
import {
  SiJavascript, SiTailwindcss, SiSpringboot, SiPostgresql, SiMongodb,
  SiRedis, SiTypescript,
} from 'react-icons/si';
import { FiZap, FiLayout, FiShield, FiCloud, FiGitBranch, FiActivity } from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader';

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Concepts'];

const allSkills = [
  { name: 'React.js', level: 95, icon: <FaReact className="text-cyan-400" size={26} />, category: 'Frontend', color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30' },
  { name: 'TypeScript', level: 80, icon: <SiTypescript className="text-blue-400" size={22} />, category: 'Frontend', color: 'from-blue-500/15 to-indigo-500/15', border: 'border-blue-500/25' },
  { name: 'Tailwind CSS', level: 94, icon: <SiTailwindcss className="text-teal-400" size={22} />, category: 'Frontend', color: 'from-teal-500/15 to-cyan-500/15', border: 'border-teal-500/25' },
  { name: 'Java', level: 92, icon: <FaJava className="text-orange-400" size={26} />, category: 'Backend', color: 'from-orange-400/20 to-red-500/20', border: 'border-orange-400/30' },
  { name: 'Spring Boot', level: 90, icon: <SiSpringboot className="text-green-400" size={22} />, category: 'Backend', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
  { name: 'Kafka', level: 75, icon: <FiActivity className="text-slate-300" size={22} />, category: 'Backend', color: 'from-slate-500/15 to-slate-400/15', border: 'border-slate-500/25' },
  { name: 'Docker', level: 78, icon: <FaDocker className="text-blue-400" size={22} />, category: 'Backend', color: 'from-blue-500/15 to-cyan-500/15', border: 'border-blue-500/25' },
  { name: 'PostgreSQL', level: 89, icon: <SiPostgresql className="text-indigo-400" size={22} />, category: 'Database', color: 'from-indigo-500/20 to-violet-500/20', border: 'border-indigo-500/30' },
  { name: 'MongoDB', level: 72, icon: <SiMongodb className="text-emerald-400" size={22} />, category: 'Database', color: 'from-emerald-500/15 to-green-500/15', border: 'border-emerald-500/25' },
  { name: 'Redis', level: 75, icon: <SiRedis className="text-rose-400" size={22} />, category: 'Database', color: 'from-rose-500/15 to-red-500/15', border: 'border-rose-500/25' },
  { name: 'System Design', level: 88, icon: <FiLayout className="text-violet-400" size={22} />, category: 'Concepts', color: 'from-violet-500/20 to-purple-500/20', border: 'border-violet-500/30' },
  { name: 'Performance', level: 90, icon: <FiZap className="text-yellow-400" size={22} />, category: 'Concepts', color: 'from-yellow-500/15 to-amber-500/15', border: 'border-yellow-500/25' },
  { name: 'Security', level: 85, icon: <FiShield className="text-emerald-400" size={22} />, category: 'Concepts', color: 'from-emerald-500/15 to-teal-500/15', border: 'border-emerald-500/25' },
  { name: 'Git & CI/CD', level: 88, icon: <FiGitBranch className="text-rose-400" size={22} />, category: 'Concepts', color: 'from-rose-500/15 to-pink-500/15', border: 'border-rose-500/25' },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? allSkills : allSkills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative">
      <div className="section-container">
        <SectionHeader number="02" label="Skills" title="Technical Expertise" subtitle="Technologies and tools I use to build production-grade software." />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              id={`skills-filter-${cat.toLowerCase()}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-primary-500/20 border-primary-500/60 text-primary-300'
                  : 'border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className={`relative group p-5 rounded-2xl bg-gradient-to-br ${skill.color} border ${skill.border} cursor-default overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.15), transparent 70%)' }} />
              <div className="relative">
                <div className="mb-3">{skill.icon}</div>
                <p className="text-sm font-semibold text-white mb-2">{skill.name}</p>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.03, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-violet-500"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1.5 font-mono">{skill.level}%</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
