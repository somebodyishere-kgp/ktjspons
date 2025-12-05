'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const benefits = [
  {
    number: 70000,
    suffix: '+',
    title: 'Annual Student Participation',
    description: 'Students engaged across all events',
    comparison: 'Unmatched participation nationwide',
    context: ['70,000+ annual participation', 'Preliminary rounds 4 months prior', 'Huge international participation'],
    color: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-500/30',
  },
  {
    number: 1200,
    suffix: '+',
    title: 'Campus Ambassador Network',
    description: 'Ambassadors publicizing the fest in their region throughout the country',
    comparison: 'Strong network across India',
    context: ['Nationwide reach', '1200+ active members', 'Year-round activation'],
    color: 'from-red-600/20 to-red-700/20',
    borderColor: 'border-red-600/30',
  },
  {
    number: 12,
    suffix: 'M+',
    title: 'Website Traffic',
    description: 'Website hits for KSHITIJ 2025',
    comparison: 'Massive digital reach',
    context: ['12M+ hits', '350+ event pages', 'Online events from September'],
    color: 'from-red-700/20 to-red-800/20',
    borderColor: 'border-red-700/30',
  },
  {
    number: 1200,
    suffix: '+',
    title: 'Educational Institutions',
    description: 'Reached through publicity campaigns twice a year',
    comparison: 'Extensive nationwide coverage',
    context: ['Oct-Nov campaigns', 'Personal visits twice yearly', 'Posters, T-shirts, souvenirs distributed'],
    color: 'from-red-800/20 to-red-900/20',
    borderColor: 'border-red-800/30',
  },
  {
    number: 500,
    suffix: '+',
    title: 'Workshops & Events',
    description: 'Pre-fest and during-fest engagement activities',
    comparison: 'Year-round programming',
    context: ['Workshops prior and during fest', 'Varied technical and managerial topics', 'Intellectual rewarding experiences'],
    color: 'from-red-900/20 to-black/20',
    borderColor: 'border-red-900/30',
  },
  {
    number: 6,
    suffix: ' Months',
    title: 'Extended Visibility',
    description: 'Online events starting September onwards',
    comparison: 'Longest engagement period',
    context: ['Sept - Feb timeline', 'Continuous presence', 'Multi-platform reach'],
    color: 'from-black/20 to-red-900/20',
    borderColor: 'border-red-500/30',
  },
];

interface BenefitCardProps {
  benefit: typeof benefits[0];
  index: number;
}

function AnimatedCounter({ targetValue, suffix, start }: { targetValue: number, suffix: string, start: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    const duration = 1500;
    const steps = 40;
    const increment = targetValue / steps;
    let current = 0;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      current += increment;
      if (frame >= steps) {
        setValue(targetValue);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [start, targetValue]);

  return <span>{value.toLocaleString()}{suffix}</span>;
}

function BenefitCard({ benefit, index }: BenefitCardProps) {
  const [startCounter, setStartCounter] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounter(true);
          if (cardRef.current) observer.unobserve(cardRef.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const currentRef = cardRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2, margin: '0px 0px -50px 0px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="h-full"
    >
      <motion.div 
        className={`relative rounded-2xl p-6 md:p-8 border-2 ${benefit.borderColor} bg-black/60 backdrop-blur-md shadow-xl bg-gradient-to-br ${benefit.color} h-full flex flex-col`} 
        style={{ boxShadow: '0 20px 40px -12px rgba(220, 38, 38, 0.3)' }}
        whileHover={{ scale: 1.03, boxShadow: '0 25px 50px -12px rgba(220, 38, 38, 0.4)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
          {/* Main Content - Vertical Layout */}
          <div className="flex flex-col flex-grow">
            {/* Big Number */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 + 0.2, type: 'spring', stiffness: 120 }}
            >
              <motion.p 
                className="text-[10px] md:text-xs tracking-widest text-red-400/80 uppercase mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 + 0.15 }}
              >
                Impact Metric
              </motion.p>
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight mb-3">
                <AnimatedCounter targetValue={benefit.number} suffix={benefit.suffix} start={startCounter} />
              </div>
              <motion.div 
                className="inline-block px-2 py-1 md:px-3 md:py-1.5 bg-red-500/15 border border-red-500/40 rounded-full mb-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 + 0.3 }}
              >
                <span className="text-[9px] md:text-[10px] font-semibold text-red-300 uppercase tracking-widest">{benefit.title}</span>
              </motion.div>

              {/* Comparison */}
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 + 0.4 }}
              >
                <span className="inline-flex items-center gap-2 text-sm md:text-base lg:text-lg font-bold text-red-300">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 10l4 4 6-8" /></svg>
                  {benefit.comparison}
                </span>
              </motion.div>
            </motion.div>

            {/* Description and Context */}
            <div className="flex-grow flex flex-col">
              <motion.h3 
                className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight mb-3"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 + 0.5 }}
              >
                {benefit.description}
              </motion.h3>
              <motion.p 
                className="text-white/70 text-xs md:text-sm mb-4 flex-grow leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 + 0.6 }}
              >
                Partner with us to leverage a <span className="text-red-400 font-semibold">high-engagement platform</span> built over <span className="text-red-400 font-semibold">years of trust</span>, <span className="text-red-400 font-semibold">scale</span>, and <span className="text-red-400 font-semibold">consistent delivery</span>.
              </motion.p>

              {/* Context bullets */}
              <motion.div 
                className="grid grid-cols-1 gap-2 text-xs text-white/70"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 + 0.7 }}
              >
                {benefit.context.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 + 0.8 + i * 0.08 }}
                  >
                    <div className="w-1 h-1 rounded-full bg-red-400"></div>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden rounded-2xl">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(220,38,38,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>
        </motion.div>
    </motion.div>
  );
}

export default function WhyAssociate() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Force section visibility
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.opacity = '1';
      sectionRef.current.style.pointerEvents = 'auto';
      sectionRef.current.style.visibility = 'visible';
      
      const parent = sectionRef.current.parentElement;
      if (parent) {
        parent.style.opacity = '1';
        parent.style.pointerEvents = 'auto';
        parent.style.visibility = 'visible';
      }
    }
  }, []);

  return (
    <section 
      id="why-associate" 
      ref={sectionRef}
      className="relative w-full bg-black py-16 md:py-20" 
      style={{ 
        zIndex: 10, 
        position: 'relative',
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" style={{ zIndex: 0 }} />
      
      <div className="relative w-full" style={{ zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-8 sm:py-12 md:py-16 px-4 sm:px-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 px-4">
            WHY ASSOCIATE
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto px-4">
            Six data-driven reasons to partner with India&apos;s premier techno-management festival
          </p>
        </motion.div>

        {/* 3x2 Grid Layout */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                benefit={benefit}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
