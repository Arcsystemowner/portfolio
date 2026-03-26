import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJava,
  FaGithub, FaDatabase,
} from 'react-icons/fa';
import {
  SiJavascript, SiTailwindcss, SiExpress, SiMysql,
  SiPostgresql, SiSpringboot,
} from 'react-icons/si';
import { FiZap, FiLayout, FiShield, FiCloud } from 'react-icons/fi';
import { skills } from '../data/skills';

const iconMap = {
  react: <FaReact className="text-cyan-400" size={28} />,
  js: <SiJavascript className="text-yellow-400" size={24} />,
  html: <FaHtml5 className="text-orange-500" size={26} />,
  css: <FaCss3Alt className="text-blue-400" size={26} />,
  tailwind: <SiTailwindcss className="text-teal-400" size={26} />,
  node: <FaNodeJs className="text-green-500" size={26} />,
  express: <SiExpress className="text-slate-300" size={22} />,
  spring: <SiSpringboot className="text-green-400" size={24} />,
  mysql: <SiMysql className="text-blue-500" size={28} />,
  postgres: <SiPostgresql className="text-indigo-400" size={26} />,
  perf: <FiZap className="text-yellow-400" size={22} />,
  system: <FiLayout className="text-violet-400" size={22} />,
  api: <FiCloud className="text-sky-400" size={22} />,
  security: <FiShield className="text-emerald-400" size={22} />,
};

const categoryColors = {
  Frontend: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20',
  Backend: 'from-green-500/10 to-emerald-500/10 border-green-500/20',
  Database: 'from-indigo-500/10 to-violet-500/10 border-indigo-500/20',
  Concepts: 'from-yellow-500/10 to-orange-500/10 border-yellow-500/20',
};

const categoryAccent = {
  Frontend: 'bg-cyan-500',
  Backend: 'bg-green-500',
  Database: 'bg-indigo-500',
  Concepts: 'bg-yellow-500',
};

export default function Skills() {
  return (
    <section id="skills" className="relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-primary-400 font-mono text-sm tracking-widest mb-2">02. SKILLS</p>
          <h2 className="section-title">Technical Skills</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className={`card bg-gradient-to-br ${categoryColors[category]} p-5 rounded-2xl`}
            >
              <h3 className="font-bold text-white mb-5 text-sm tracking-wide uppercase">{category}</h3>
              <div className="space-y-4">
                {items.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-7 h-7 flex items-center justify-center">
                        {iconMap[skill.icon] || <FaDatabase size={20} className="text-slate-400" />}
                      </div>
                      <span className="text-sm text-slate-300 font-medium">{skill.name}</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden ml-10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: catIndex * 0.1 + i * 0.05, ease: 'easeOut' }}
                        className={`h-full rounded-full ${categoryAccent[category]}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
