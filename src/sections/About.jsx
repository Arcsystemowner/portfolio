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
              I’m a <span className="text-white font-medium">Java Full Stack Developer</span> with
              <span className="text-primary-400 font-medium"> 2+ years</span> of hands-on experience building secure,
              high-scale enterprise systems. I work as a <span className="text-white font-medium">Software Engineer</span>{" "}
              at <span className="text-primary-400 font-medium">KFin Technologies</span>, where I help design monitoring,
              alerting, and health-check platforms for <span className="text-white font-medium">100,000+ services</span>.
            </p>
            <p>
              My stack spans <span className="text-white font-medium">Java 17, Spring Boot, React.js, Redux, PostgreSQL,
              Kafka, Redis, Docker, and AWS</span>. I enjoy the full lifecycle of product delivery: shaping architecture,
              building resilient backend APIs, crafting user-friendly interfaces, and optimizing performance with real-world
              constraints in mind.
            </p>
            <p>
              I’m especially interested in <span className="text-white font-medium">event-driven systems</span>,
              <span className="text-white font-medium"> observability</span>, and <span className="text-white font-medium">AI-assisted engineering</span>.
              I lead with ownership, enjoy mentoring teammates, and focus on software that is reliable, secure, and easy to trust.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { number: "2+", label: "Years" },
                { number: "100K+", label: "Services" },
                { number: "300+", label: "LeetCode" },
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
