import { motion } from 'framer-motion';

export default function Btn({ href, className = '', children, ...props }) {
  const Comp = href ? motion.a : motion.button;
  const isSolid = className.includes('btn-solid');
  return (
    <Comp
      href={href}
      className={`btn ${className}`}
      whileHover={{ y: -3, scale: isSolid ? 1.02 : 1 }}
      whileTap={{ y: -1, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </Comp>
  );
}
