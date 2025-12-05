'use client';

import { ReactNode, memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface PerspectiveTransitionProps {
  children: ReactNode;
  className?: string;
}

const PerspectiveTransition = memo(function PerspectiveTransition({ children, className = '' }: PerspectiveTransitionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px', amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ 
        willChange: isInView ? 'auto' : 'opacity',
        contain: 'layout style paint',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

export default PerspectiveTransition;
