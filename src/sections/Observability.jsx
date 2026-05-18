import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader';

// Fake Sparkline Component
function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / max) * 100}`).join(' ');
  return (
    <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Observability() {
  const [latency, setLatency] = useState(Array.from({ length: 20 }, () => Math.random() * 20 + 10));
  const [throughput, setThroughput] = useState(Array.from({ length: 20 }, () => Math.random() * 500 + 2000));
  const [logs, setLogs] = useState([
    "[INFO] Initializing worker node-04",
    "[OK] Database connection pool established",
    "[INFO] Kafka consumer group 'analytics' started"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => [...prev.slice(1), Math.random() * 30 + 10]);
      setThroughput(prev => [...prev.slice(1), Math.random() * 800 + 1800]);
      
      const newLogs = [
        "[INFO] Processed batch of 500 events",
        "[OK] Redis cache synchronized",
        "[WARN] High memory usage detected on node-02",
        "[INFO] WebSocket client connected: " + Math.random().toString(36).substring(7),
        "[OK] Health check passed for API Gateway"
      ];
      setLogs(prev => {
        const next = [...prev, newLogs[Math.floor(Math.random() * newLogs.length)]];
        if (next.length > 6) return next.slice(next.length - 6);
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="observability" className="relative py-24">
      <div className="section-container">
        <SectionHeader 
          number="06" 
          label="Monitoring" 
          title="Live Observability" 
          subtitle="Enterprise-grade dashboard simulation for real-time telemetry and metrics." 
        />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-sm">
          
          {/* API Latency */}
          <div className="glass bg-dark-800/50 rounded-xl p-5 border-white/5 shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 uppercase tracking-widest text-[10px]">P99 API Latency</span>
              <span className="text-emerald-400 font-bold text-lg">{Math.round(latency[latency.length-1])}ms</span>
            </div>
            <Sparkline data={latency} color="#10b981" />
          </div>

          {/* Request Throughput */}
          <div className="glass bg-dark-800/50 rounded-xl p-5 border-white/5 shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 uppercase tracking-widest text-[10px]">Request Throughput</span>
              <span className="text-cyan-400 font-bold text-lg">{Math.round(throughput[throughput.length-1])} req/s</span>
            </div>
            <Sparkline data={throughput} color="#22d3ee" />
          </div>

          {/* Cache Hit Ratio */}
          <div className="glass bg-dark-800/50 rounded-xl p-5 border-white/5 shadow-lg flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 uppercase tracking-widest text-[10px]">Redis Cache Hit Ratio</span>
              <span className="text-primary-400 font-bold text-lg">98.4%</span>
            </div>
            <div className="w-full bg-dark-900 rounded-full h-3 mb-2 overflow-hidden border border-white/5">
              <div className="bg-primary-500 h-3 rounded-full" style={{ width: '98.4%' }}></div>
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest flex justify-between">
              <span>Evictions: 0</span>
              <span>Memory: 1.2GB</span>
            </div>
          </div>

          {/* System Health */}
          <div className="glass bg-dark-800/50 rounded-xl p-5 border-white/5 shadow-lg md:col-span-1">
            <h3 className="text-slate-400 uppercase tracking-widest text-[10px] mb-4">System Health</h3>
            <div className="space-y-3">
              {[
                { name: 'API Gateway', status: 'OK' },
                { name: 'Auth Service', status: 'OK' },
                { name: 'Core Engine', status: 'OK' },
                { name: 'Kafka Cluster', status: 'OK' },
              ].map(s => (
                <div key={s.name} className="flex justify-between items-center">
                  <span className="text-slate-300 text-xs">{s.name}</span>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
                    <FiCheckCircle /> {s.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Log Stream */}
          <div className="glass bg-[#050505] rounded-xl p-5 border-white/10 shadow-lg md:col-span-2 relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-slate-400 uppercase tracking-widest text-[10px] flex items-center gap-2">
                <FiActivity className="text-rose-500 animate-pulse" />
                Live Log Stream
              </h3>
              <span className="text-[9px] text-slate-500 uppercase">tail -f /var/log/sys.log</span>
            </div>
            <div className="flex-1 space-y-1 relative">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-[10px] font-mono leading-relaxed ${
                    log.includes('[WARN]') ? 'text-amber-400' :
                    log.includes('[OK]') ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {new Date().toISOString().split('T')[1].split('Z')[0]} {log}
                </motion.div>
              ))}
              {/* Fade out top logs */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
