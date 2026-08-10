import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 600, damping: 40, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 600, damping: 40, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 200, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 200, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add('custom-cursor-active');

    function onMove(e) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    function onOver(e) {
      const interactive = e.target.closest('a, button, .btn, input, textarea, select, [role="button"], .category-circle, .tab-btn, .filter-btn');
      setHovering(!!interactive);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="custom-cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.7 : 1 }}
        transition={{ duration: 0.25, ease: [0.16, 0.84, 0.44, 1] }}
      />
    </>
  );
}
