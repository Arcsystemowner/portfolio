import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, animate } from 'framer-motion';
import { FiCalendar, FiMapPin, FiChevronRight, FiActivity, FiServer } from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader';
import { experience } from '../data/experience';

// Animated Counter Component
function AnimatedCounter({ from, to, suffix, text }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    
    // Intersection Observer to trigger when in view
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const controls = animate(from, to, {
          duration: 2,
          ease: "easeOut",
          onUpdate(value) {
            node.textContent = Math.round(value) + suffix;
          }
        });
        return () => controls.stop();
      }
    }, { threshold: 0.5 });
    
    observer.observe(node);
    return () => observer.disconnect();
  }, [from, to, suffix]);

  return (
    <div className="flex flex-col items-center bg-dark-900/60 border border-white/5 rounded-xl p-3 backdrop-blur-sm">
      <span ref={nodeRef} className="text-2xl font-bold font-mono text-emerald-400">
        {from}{suffix}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-slate-500 mt-1 text-center">{text}</span>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Line progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [expandedId, setExpandedId] = useState(experience[0].id);

  return (
    <section id="experience" className="relative py-24" ref={containerRef}>
      <div className="section-container">
        <SectionHeader 
          number="03" 
          label="Experience" 
          title="Career Timeline" 
          subtitle="My professional journey engineering scalable platforms and high-throughput systems." 
        />

        <div className="relative max-w-4xl mx-auto mt-16">
          {/* Main animated vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-dark-800 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 right-0 w-full bg-gradient-to-b from-primary-500 via-cyan-400 to-emerald-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-24">
            {experience.map((exp, i) => {
              const isEven = i % 2 === 0;
              const isExpanded = expandedId === exp.id;
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node center dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dark-900 border-2 border-primary-500 z-10 flex items-center justify-center">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-cyan-400"
                      animate={{ scale: isExpanded ? [1, 1.5, 1] : 1 }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content */}
                  <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <motion.div 
                      layout
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                      className="cursor-pointer group glass bg-dark-800/40 hover:bg-dark-800/60 border-white/5 rounded-2xl p-6 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-primary-300 transition-colors">{exp.role}</h3>
                          <div className="text-primary-500 font-mono text-sm tracking-wide mt-1">{exp.company}</div>
                        </div>
                        <span className="text-slate-500 text-xs font-mono px-2 py-1 bg-white/5 rounded border border-white/5 uppercase">
                          {exp.type}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5"><FiCalendar /> {exp.period}</span>
                        <span className="flex items-center gap-1.5"><FiMapPin /> {exp.location}</span>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed mb-4">{exp.description}</p>
                      
                      {/* Interactive Expanding Area */}
                      <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        className="overflow-hidden"
                      >
                        {/* Dynamic Metrics if Full-time */}
                        {exp.type === 'Full-time' && (
                          <div className="grid grid-cols-2 gap-3 mb-6 mt-4">
                            <AnimatedCounter from={0} to={100} suffix="k+" text="Services Monitored" />
                            <AnimatedCounter from={22} to={3} suffix="m" text="MTTD Reduced To" />
                          </div>
                        )}

                        <div className="space-y-3 mb-6">
                          <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-2">
                            <FiServer size={12} /> Key Architecture Contributions
                          </h4>
                          {exp.responsibilities.map((r, idx) => (
                            <div key={idx} className="flex gap-3 text-sm text-slate-400">
                              <FiChevronRight className="text-primary-500 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                          {exp.techStack.map(t => (
                            <span key={t} className="px-2 py-1 text-[10px] rounded font-mono uppercase bg-dark-900 border border-white/10 text-primary-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Expand Toggle */}
                      <div className="mt-4 flex items-center gap-2 text-xs font-mono text-primary-500 uppercase tracking-widest">
                        <span>{isExpanded ? 'Collapse' : 'Expand Metrics & Details'}</span>
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                          <FiChevronRight />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
