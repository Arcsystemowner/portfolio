import { motion } from "framer-motion";
import { FiCode, FiZap, FiShield } from "react-icons/fi";

const strengths = [
  {
    icon: <FiCode size={20} />,
    title: "Full Stack Development",
    desc: "Expert in React.js + Java with strong understanding of REST APIs, state management, and component architecture.",
  },
  {
    icon: <FiZap size={20} />,
    title: "Performance Focused",
    desc: "Improved frontend performance by 70% through optimization techniques, delivering exceptional user experiences.",
  },
  {
    icon: <FiShield size={20} />,
    title: "Enterprise Systems",
    desc: "Built systems monitoring 100,000+ services at KFin Technologies, handling critical infrastructure and security.",
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
          <p className="text-primary-400 font-mono text-sm tracking-widest mb-2">
            01. ABOUT
          </p>
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
              I'm a{" "}
              <span className="text-white font-medium">
                Full Stack Developer
              </span>{" "}
              with{" "}
              <span className="text-primary-400 font-medium">
                2 years of experience
              </span>{" "}
              building enterprise-grade applications. Currently working as{" "}
              <span className="text-white font-medium">Software Engineer</span>{" "}
              at{" "}
              <span className="text-primary-400 font-medium">
                KFin Technologies Limited
              </span>
              , working on critical systems monitoring 100,000+ services with
              focus on performance and reliability.
            </p>
            <p>
              My expertise spans{" "}
              <span className="text-white font-medium">
                React.js, TypeScript, Java, Spring Boot
              </span>
              , <span className="text-white font-medium">REST APIs</span>, and
              modern tools like{" "}
              <span className="text-white font-medium">
                Redux Toolkit & PostgreSQL
              </span>
              . I specialize in building{" "}
              <span className="text-white font-medium">scalable frontends</span>
              , designing{" "}
              <span className="text-white font-medium">efficient backends</span>
              , and optimizing performance across the stack.
            </p>
            <p>
              Passionate about clean code, performance optimization, and
              building products that users love. Currently leading projects and
              collaborating with senior engineers at KFin Technologies.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { number: "2", label: "Years Experience" },
                { number: "100K+", label: "Services Monitored" },
                { number: "70%", label: "Perf. Improved" },
              ].map(({ number, label }) => (
                <div key={label} className="text-center p-4 card rounded-xl">
                  <div className="text-2xl font-bold gradient-text">
                    {number}
                  </div>
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
                <div
                  className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20
                               flex items-center justify-center text-primary-400 shrink-0"
                >
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
