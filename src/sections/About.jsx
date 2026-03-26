import { motion } from 'framer-motion';
import { FiCode, FiZap, FiShield } from 'react-icons/fi';

const strengths = [
  {
    icon: <FiCode size={20} />,
    title: 'React.js Expertise',
    desc: 'Deep knowledge of React patterns — hooks, context, performance memoization, and code splitting.',
  },
  {
    icon: <FiZap size={20} />,
    title: 'Performance First',
    desc: 'Achieved 70% performance improvements in production through profiling and optimization techniques.',
  },
  {
    icon: <FiShield size={20} />,
    title: 'Production Experience',
    desc: 'Real-world experience at KFin Technologies building enterprise-grade financial applications.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-primary-400 font-mono text-sm tracking-widest mb-2">01. ABOUT</p>
          <h2 className="section-title">About Me</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-slate-400 leading-relaxed"
          >
            <p>
              I'm a{' '}
              <span className="text-white font-medium">Frontend Developer</span>{' '}
              and MERN Stack engineer currently working at{' '}
              <span className="text-primary-400 font-medium">KFin Technologies Limited</span>,
              one of India's leading financial technology companies. I design and build
              scalable, production-grade web applications that handle high traffic and
              critical data reliably.
            </p>
            <p>
              My work spans building{' '}
              <span className="text-white font-medium">real-time SRE monitoring dashboards</span>,
              optimizing frontend performance by up to{' '}
              <span className="text-white font-medium">70%</span>, and implementing
              secure, encrypted data pipelines. I have a strong focus on{' '}
              <span className="text-white font-medium">system reliability</span>,{' '}
              developer experience, and clean code architecture.
            </p>
            <p>
              When I'm not building UIs, I'm exploring system design patterns, contributing
              to open-source, or working on side projects that solve real-world problems.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { number: '2+', label: 'Years Experience' },
                { number: '100K+', label: 'Services Monitored' },
                { number: '70%', label: 'Perf Improvement' },
              ].map(({ number, label }) => (
                <div key={label} className="text-center p-4 card rounded-xl">
                  <div className="text-2xl font-bold gradient-text">{number}</div>
                  <div className="text-xs text-slate-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            {strengths.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card p-5 flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20
                               flex items-center justify-center text-primary-400 shrink-0">
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
