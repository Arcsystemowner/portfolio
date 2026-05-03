import { motion } from "framer-motion";

export const AnimatedText = ({
  text,
  className = "",
  stagger = 0.05,
  delay = 0,
}) => {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: i * stagger + delay,
      },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const GradientBorder = ({ children, className = "" }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-px bg-gradient-to-r from-primary-600 via-violet-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500" />
      <div className="relative bg-dark-800 rounded-2xl">{children}</div>
    </div>
  );
};

export const HoverGlow = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className={`relative cursor-pointer group ${className}`}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-violet-600 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
      <div className="relative">{children}</div>
    </motion.div>
  );
};

export const FloatingCard = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay,
      }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Badge = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                       bg-primary-500/10 text-primary-400 border border-primary-500/20
                       hover:bg-primary-500/20 transition-colors ${className}`}
    >
      {children}
    </span>
  );
};
