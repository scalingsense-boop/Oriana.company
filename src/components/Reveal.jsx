import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 46, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const Reveal = forwardRef(function Reveal({ children, className, delay = 0, as = 'div', ...props }, ref) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 0.84, 0.44, 1], delay }}
      {...props}
    >
      {children}
    </Comp>
  );
});

export default Reveal;
