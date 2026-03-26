import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="w-16 h-16 relative">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-t-primary-500 border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-primary-500 font-bold font-mono text-lg">A</span>
          </div>
        </div>
        <motion.p
          className="text-slate-400 text-sm font-mono tracking-widest"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          LOADING...
        </motion.p>
      </motion.div>
    </div>
  );
}
