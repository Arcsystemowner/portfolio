import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Single spring config — one trailing element instead of two independent springs
const SPRING = { damping: 40, stiffness: 300, mass: 0.5 };

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  const isHovering = useRef(false);
  const ringRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e) => {
      const el = e.target.closest('a, button, [role="button"], input, textarea');
      const hovering = !!el;
      if (hovering === isHovering.current) return;
      isHovering.current = hovering;
      if (ringRef.current) {
        ringRef.current.style.width = hovering ? '40px' : '20px';
        ringRef.current.style.height = hovering ? '40px' : '20px';
        ringRef.current.style.opacity = hovering ? '0.7' : '0.4';
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <motion.div
      ref={ringRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-primary-400 transition-[width,height,opacity] duration-150"
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        width: '20px',
        height: '20px',
        opacity: 0.4,
      }}
    />
  );
}
