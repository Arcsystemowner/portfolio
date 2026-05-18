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
import SkillsNetwork from '../components/SkillsNetwork';

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
  return (
    <section id="skills" className="relative">
      <div className="section-container">
        <SectionHeader 
          number="02" 
          label="Skills & Expertise" 
          title="Technology Constellation" 
          subtitle="An interactive map of my technical proficiencies across distributed systems, backend engineering, and frontend development." 
        />
        
        <div className="mt-8">
          <SkillsNetwork />
        </div>
      </div>
    </section>
  );
}
