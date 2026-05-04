import { motion } from 'framer-motion';

export default function Loader() {
  const letters = ['A', 'r', 'c', 'h', 'i', 't'];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-900">
      {/* Animated logo */}
      <div className="relative mb-8">
        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-6 rounded-full border border-primary-500/20 border-t-primary-500"
          style={{ borderWidth: '1.5px' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-10 rounded-full border border-violet-500/10 border-b-violet-500/40"
          style={{ borderWidth: '1px' }}
        />

        {/* Center logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-primary-600/30"
        >
          <span className="font-mono font-bold text-white text-xl">AY</span>
        </motion.div>
      </div>

      {/* Letter stagger animation */}
      <div className="flex items-center gap-1">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
            className="font-display font-bold text-2xl text-white"
          >
            {letter}
          </motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + letters.length * 0.08, duration: 0.4 }}
          className="font-display font-bold text-2xl gradient-text ml-1"
        >
          Yadav
        </motion.span>
      </div>

      {/* Progress bar */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '120px', opacity: 1 }}
        transition={{ delay: 0.8, duration: 1, ease: 'easeInOut' }}
        className="mt-6 h-0.5 bg-gradient-to-r from-primary-500 via-violet-500 to-cyan-500 rounded-full"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 text-xs font-mono text-slate-600 tracking-widest"
      >
        Loading portfolio...
      </motion.p>
    </div>
  );
}
