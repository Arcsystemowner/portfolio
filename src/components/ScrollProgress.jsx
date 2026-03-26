import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-violet-500 to-cyan-400 z-[100] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
