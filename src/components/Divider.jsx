import { motion } from 'framer-motion';

export default function Divider() {
  return (
    <motion.div
      className="divider"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.16, 0.84, 0.44, 1], delay: 0.15 }}
    />
  );
}
