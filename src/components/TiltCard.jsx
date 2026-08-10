import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const springConfig = { stiffness: 300, damping: 25, mass: 0.6 };

export default function TiltCard({ children, className, liftY = -8, scaleAmt = 1.02, maxTilt = 6, ...props }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const lift = useMotionValue(0);
  const scale = useMotionValue(1);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springConfig);
  const y = useSpring(lift, springConfig);
  const s = useSpring(scale, springConfig);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function handleEnter() {
    lift.set(liftY);
    scale.set(scaleAmt);
  }
  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
    lift.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, y, scale: s, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </motion.div>
  );
}
