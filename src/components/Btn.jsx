import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const magneticSpring = { stiffness: 200, damping: 18, mass: 0.4 };
const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Btn({ href, className = '', children, magnetic = false, ...props }) {
  const Comp = href ? motion.a : motion.button;
  const isSolid = className.includes('btn-solid');

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, magneticSpring);
  const y = useSpring(my, magneticSpring);
  const active = magnetic && !reducedMotion;

  function handleMouseMove(e) {
    if (!active) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }
  function handleMouseLeave() {
    if (!active) return;
    mx.set(0);
    my.set(0);
  }

  return (
    <Comp
      href={href}
      className={`btn ${className}`}
      style={active ? { x, y } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: active ? undefined : -3, scale: isSolid ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </Comp>
  );
}
