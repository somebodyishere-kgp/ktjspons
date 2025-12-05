'use client';

import { motion } from 'framer-motion';
import { forwardRef, useRef, useEffect, useState } from 'react';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';

interface HeroProps {
  titleRef?: React.RefObject<HTMLDivElement | null>;
  navbarTitleSlotRef?: React.RefObject<HTMLDivElement | null>;
}

const Hero = forwardRef<HTMLDivElement, HeroProps>(({ titleRef }, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const localTitleRef = useRef<HTMLDivElement>(null);
  const kshitijTextRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(120);

  // Use forwarded ref or local ref
  const mergedSectionRef = (ref as React.RefObject<HTMLDivElement>) || sectionRef;
  const mergedTitleRef = titleRef || localTitleRef;

  // Calculate responsive font size
  useEffect(() => {
    const updateFontSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setFontSize(60);
      } else if (width < 1024) {
        setFontSize(80);
      } else {
        setFontSize(120);
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  return (
    <section ref={mergedSectionRef} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Text Effect Background */}
      <ParticleTextEffect 
        words={["KSHITIJ", "2026", "INNOVATION", "TECHNOLOGY", "CREATIVITY", "EXCELLENCE", "THINK", "CREATE", "ENJOY"]}
        className="z-0"
        fontSize={fontSize}
        fontFamily="Arial, sans-serif"
        autoResize={true}
        backgroundColor="rgba(0, 0, 0, 0.05)"
        motionBlurOpacity={0.05}
        onChangeInterval={300}
      />
      
      {/* Subtle backdrop for better particle visibility */}
      <div className="absolute inset-0 bg-black/20 z-[5]" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white cursor-pointer"
          onClick={() => {
            document.getElementById('who-are-we')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
            <path d="M12 0v40M0 28l12 12 12-12" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
