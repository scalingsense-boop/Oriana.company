import { motion } from 'framer-motion';

export default function ScrollTop({ show }) {
  return (
    <motion.button
      className="scroll-top"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={false}
      animate={{ opacity: show ? 1 : 0, visibility: show ? 'visible' : 'hidden', y: show ? 0 : 10 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.35 }}
    >
      ↑
    </motion.button>
  );
}
