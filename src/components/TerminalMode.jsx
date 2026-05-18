import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export default function TerminalMode({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'system', content: 'SYSTEM INITIALIZATION IN PROGRESS...' },
    { type: 'system', content: 'ESTABLISHING SECURE CONNECTION...' },
    { type: 'system', content: 'CONNECTION ESTABLISHED. TYPE "help" FOR AVAILABLE COMMANDS.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, { type: 'user', content: `guest@portfolio:~$ ${trimmed}` }]);

    let response = '';
    switch (trimmed) {
      case 'help':
        response = `AVAILABLE COMMANDS:
- about        : Display engineer profile
- projects     : List core engineering projects
- skills       : Show tech stack
- contact      : Display contact information
- resume       : Download PDF resume
- architecture : Initialize system design viewer
- kafka        : View event streaming metrics
- websocket    : Ping realtime connection
- monitoring   : Open observability dashboard
- clear        : Clear terminal
- exit         : Close terminal`;
        break;
      case 'about':
        response = 'SOFTWARE ENGINEER SPECIALIZING IN SCALABLE DISTRIBUTED SYSTEMS, REAL-TIME PLATFORMS, AND OBSERVABILITY INFRASTRUCTURE.';
        break;
      case 'projects':
        response = `1. SRE Monitoring Platform
2. Asset Management System
3. Task Tracker
4. Database Activity Monitoring Tool`;
        break;
      case 'skills':
        response = 'BACKEND | FRONTEND | MESSAGING | DISTRIBUTED SYSTEMS | DATABASES | SECURITY | DEVOPS';
        break;
      case 'contact':
        response = 'INITIATING CONTACT PROTOCOL... \nEmail: engineer@example.com\nLinkedIn: /in/engineer';
        break;
      case 'resume':
        response = 'DOWNLOADING RESUME... [✓] COMPLETE (Placeholder)';
        break;
      case 'architecture':
        response = 'LAUNCHING SYSTEM TOPOLOGY MAP... (Feature unlocking in Phase 3)';
        break;
      case 'kafka':
        response = 'CONSUMER GROUP: active\nPARTITIONS: 12\nLAG: 0.002ms';
        break;
      case 'websocket':
        response = 'PING -> PONG. LATENCY: 12ms. CONNECTION: STABLE.';
        break;
      case 'monitoring':
        response = 'ACCESSING DASHBOARD... STATUS: GREEN.';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        onClose();
        setInput('');
        return;
      default:
        response = `COMMAND NOT FOUND: ${trimmed}. TYPE "help" FOR AVAILABLE COMMANDS.`;
    }

    setHistory((prev) => [...prev, { type: 'system', content: response }]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm"
        >
          <div className="w-full max-w-4xl h-[80vh] flex flex-col bg-dark-900 border border-primary-500/30 rounded-lg shadow-2xl overflow-hidden font-mono text-sm sm:text-base">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-primary-500/30">
              <div className="flex items-center gap-2 text-primary-400">
                <TerminalIcon size={16} />
                <span className="font-semibold tracking-wider">SYSTEM_TERMINAL_v2.0</span>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#050505] text-primary-400"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((entry, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "whitespace-pre-wrap break-words leading-relaxed",
                    entry.type === 'user' ? 'text-white' : 'text-primary-400'
                  )}
                >
                  {entry.content}
                </div>
              ))}
              
              {/* Input Line */}
              <div className="flex items-center gap-2 text-white">
                <span className="text-primary-500">guest@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none border-none caret-primary-500"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
