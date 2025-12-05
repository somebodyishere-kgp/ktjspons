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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
      }}
      style={{ 
        contain: 'layout style paint',
        minHeight: '1px', // Ensure element has height for viewport detection
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

export default PerspectiveTransition;
