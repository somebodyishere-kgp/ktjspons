'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'who-are-we' },
  { label: 'Why Associate', id: 'why-associate' },
  { label: '75 Years', id: 'seventy-five-years' },
  { label: 'Events', id: 'events' },
  { label: 'Stats', id: 'graphs' },
  { label: 'Gallery', id: 'glimpses' },
  { label: 'Sponsors', id: 'previous-sponsors' },
  { label: 'Contact', id: 'sponsor-us' },
];

interface StickyNavbarProps {
  heroTitleRef: React.RefObject<HTMLDivElement | null>;
}

export default function StickyNavbar({}: StickyNavbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll direction and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsScrolled(true);

        if (currentScrollY > lastScrollY.current && currentScrollY > 200 && !isHovering) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current || currentScrollY < 200 || isHovering) {
          setIsVisible(true);
        }
      } else {
        setIsScrolled(false);
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHovering]);

  // Handle mouse hover at top
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100 && isScrolled) {
        setIsHovering(true);
        setIsVisible(true);
      } else if (e.clientY > 150) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isScrolled]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isMobile) {
    return null; // Mobile uses side navbar
  }

  return (
    <>
      {/* Sticky Navbar */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            ref={navbarRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 via-black/90 to-black/85 backdrop-blur-2xl border-b border-red-500/30 shadow-2xl"
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-red-600/5"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(220,38,38,0.15) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }} />

            <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              {/* Logo/Title - Static */}
              <div
                className="flex items-center gap-2 md:gap-4 min-w-[180px] md:min-w-[200px]"
                style={{
                  height: '32px',
                  position: 'relative',
                }}
              >
                <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 whitespace-nowrap">
                  KSHITIJ
                </span>
                <div className="h-5 md:h-6 w-px bg-gradient-to-b from-transparent via-red-500/50 to-transparent" />
                <span className="text-base md:text-lg font-black text-white/90">
                  2026
                </span>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-1 md:gap-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.03 }}
                    whileHover={{ 
                      y: -2,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className="relative px-3 md:px-4 py-2 text-sm md:text-base font-medium text-white/70 hover:text-white transition-colors duration-300 rounded-lg group overflow-hidden"
                  >
                    {/* Hover background with gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ originX: 0 }}
                    />
                    
                    {/* Text with glow on hover */}
                    <motion.span 
                      className="relative z-10 flex items-center gap-1"
                      whileHover={{
                        textShadow: '0 0 10px rgba(220, 38, 38, 0.5)',
                      }}
                    >
                      {item.label}
                      {item.label === 'Contact' && (
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-red-500"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.span>
                    
                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                    
                    {/* Corner accents */}
                    <motion.div
                      className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent rounded-tl-lg"
                      whileHover={{ 
                        borderTopColor: 'rgba(220, 38, 38, 0.5)',
                        borderLeftColor: 'rgba(220, 38, 38, 0.5)'
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div
                      className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent rounded-tr-lg"
                      whileHover={{ 
                        borderTopColor: 'rgba(220, 38, 38, 0.5)',
                        borderRightColor: 'rgba(220, 38, 38, 0.5)'
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Animated glow line at bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
