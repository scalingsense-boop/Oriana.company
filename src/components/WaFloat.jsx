import { motion, useMotionValue, useSpring } from 'framer-motion';
import { waLink } from '../constants.js';

const springConfig = { stiffness: 250, damping: 18 };

export default function WaFloat() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      className="wa-float"
      title="Chat with us on WhatsApp!"
      target="_blank"
      rel="noopener"
      href={waLink("Hello Oriana! 🌟 I'm interested in your event decoration services. Please share your packages and availability.")}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
    >
      <svg viewBox="0 0 32 32" fill="#fff"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.61 1.907 6.475L4 29l7.727-1.867A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm0 21.6a9.55 9.55 0 01-4.87-1.33l-.35-.207-4.586 1.107 1.127-4.47-.228-.362A9.56 9.56 0 016.4 15c0-5.302 4.298-9.6 9.6-9.6 5.301 0 9.6 4.298 9.6 9.6 0 5.301-4.299 9.6-9.6 9.6zm5.264-7.19c-.288-.144-1.706-.842-1.97-.938-.264-.096-.456-.144-.648.144-.192.288-.744.938-.912 1.13-.168.192-.336.216-.624.072-.288-.144-1.216-.448-2.316-1.428-.856-.763-1.434-1.706-1.602-1.994-.168-.288-.018-.444.126-.588.13-.129.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.562-.888-2.14-.234-.562-.472-.486-.648-.495l-.552-.01c-.192 0-.504.072-.768.36-.264.288-1.008.985-1.008 2.403 0 1.418 1.032 2.788 1.176 2.98.144.192 2.03 3.1 4.92 4.347.687.297 1.223.474 1.641.607.689.219 1.316.188 1.812.114.553-.083 1.706-.697 1.946-1.37.24-.673.24-1.25.168-1.37-.072-.12-.264-.192-.552-.336z" /></svg>
      <span className="wa-text">Chat Now</span>
    </motion.a>
  );
}
