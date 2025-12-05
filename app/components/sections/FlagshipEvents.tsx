'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// Event poster images from Events Poster_KTJ_25 folder
const eventPosterFiles = [
  'relic hunter.jpeg',      // Genesis (Relic Hunter)
  'tech quiz.jpeg',         // Quizzard (Tech Quiz)
  'bplan.jpeg',             // B-Plan
  'overnitee.jpeg',         // Overnite
  'source code.jpeg',       // Code Conclave
  'robowaar.jpeg',          // RoboWars
  'sand rover.jpeg',        // Mechanize (Sand Rover)
  'anadix.jpeg',            // Anadigix
  'green ai.jpeg',          // Biocraft
  'nlp challenge.jpeg',     // Data Analytics
  'mascotmakingcompetition.jpeg', // CAD Challenge
  'enigma-biz quiz.jpeg',   // Workshops
  'zerotrusthackathon.jpeg', // Crypto Quest
  'droid-blitz.jpeg',       // Startup Pitch
  'Racing-Championship.jpeg', // Racing Championship
  'maths olympiad.jpeg',    // Guest Lectures
  'line follower.jpeg',     // Expo
  'ai hackathon.jpeg',      // AI Realm
  'laws of motion.jpeg',    // Kascades
  'quantquest.jpeg',        // CodeForces
];

const events = [
  { 
    name: 'Genesis', 
    category: 'Online Events', 
    icon: '🔍',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[0]}`,
    description: 'Online treasure hunt and stock market simulation events starting 4 months before the fest, providing extended branding and visibility.',
    details: [
      'Relic Hunter - Online treasure hunt with cryptic clues',
      'Quant Quest - Stock market simulation game',
      'Eureka - Scientific advances showcase',
      'Extended branding for 4 months'
    ]
  },
  { 
    name: 'Quizzard', 
    category: 'Quiz Events', 
    icon: '🧠',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[1]}`,
    description: 'Test your knowledge with Math Challenge (5000+ participation), Bix Quiz for managerial acumen, and Tech Quiz in our largest auditorium.',
    details: [
      'Math Challenge - One of the most anticipated events',
      'Bix Quiz - Tests managerial acumen',
      'Tech Quiz - Conducted in largest auditorium',
      '5000+ participation nationwide'
    ]
  },
  { 
    name: 'B-Plan', 
    category: 'Business', 
    icon: '💼',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[2]}`,
    description: 'IIT Kharagpur Business Plan competition - a platform for creative geniuses with participation from major management and engineering colleges.',
    details: [
      'Platform for creative business ideas',
      'Mentorship from established industry names',
      'Participation from top colleges',
      'Ideal branding among future thinkers'
    ]
  },
  { 
    name: 'Overnite', 
    category: 'Hackathon', 
    icon: '🌙',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[3]}`,
    description: 'A night-long hacking competition with preliminary rounds across the country and finals at IIT Kharagpur - one of the largest hackathons for students.',
    details: [
      'Night-long hacking competition',
      'Reverse coding challenges',
      'Preliminary rounds nationwide',
      'Finals at IIT Kharagpur'
    ]
  },
  { 
    name: 'Code Conclave', 
    category: 'Programming', 
    icon: '💻',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[4]}`,
    description: 'Coding events including Code-o-Soccer (strategic bot programming), Code-o-Shuffle (team coordination), and Convo-bot (intelligent chatbot development).',
    details: [
      'Code-o-Soccer - Strategic bot programming',
      'Code-o-Shuffle - Team coordination challenges',
      'Convo-bot - Intelligent chatbot development',
      'Real-world business use cases'
    ]
  },
  { 
    name: 'RoboWars', 
    category: 'Robotics', 
    icon: '⚔️',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[5]}`,
    description: 'Combat robots from across the country battle it out! Young builders construct fighting machines - a humongous branding avenue.',
    details: [
      'Combat robot competition',
      'Robots from across the country',
      'Metal, power tools, remote control',
      'Ultimate fighting machines'
    ]
  },
  { 
    name: 'Mechanize', 
    category: 'Mechanical', 
    icon: '⚙️',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[6]}`,
    description: 'Mechanical engineering events including Arm of Achelous (hydraulics), Sand Rover (rough terrain), and Night Shift (10-hour design challenge).',
    details: [
      'Arm of Achelous - Hydraulic arm design',
      'Sand Rover - Rough terrain robot',
      'Night Shift - 10-hour design challenge',
      'Certified by IMechE'
    ]
  },
  { 
    name: 'Anadigix', 
    category: 'Electronics', 
    icon: '⚡',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[7]}`,
    description: 'The heaven for budding electronics engineers - extensive circuit knowledge required with hardware implementation in finals.',
    details: [
      'Extensive circuit knowledge',
      'Three rounds of competition',
      'Hardware implementation in finals',
      'Best Circuit Designer title'
    ]
  },
  { 
    name: 'Biocraft', 
    category: 'Healthcare', 
    icon: '❤️',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[8]}`,
    description: 'Revolutionizing healthcare focusing on cardiac care through innovative solutions in transcatheter mitral valve replacement.',
    details: [
      'Focus on cardiac care innovation',
      'Transcatheter mitral valve replacement',
      'Revolutionize healthcare solutions',
      'Make hearts beat stronger'
    ]
  },
  { 
    name: 'Data Analytics', 
    category: 'Analytics', 
    icon: '📊',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[9]}`,
    description: 'Exclusive data analytics event conducted online with real-world problems and business situations - training and test sets provided.',
    details: [
      'Real-world business problems',
      'Training and test sets provided',
      'Online event on Kshitij website',
      'Demonstrate DA knowledge'
    ]
  },
  { 
    name: 'CAD Challenge', 
    category: 'Design', 
    icon: '🎨',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[10]}`,
    description: 'Computer-aided design event using industry-standard software like SolidWorks or Autodesk Inventor for innovative designs.',
    details: [
      'Mechanical design and prototyping',
      'Industry-standard software',
      'Innovative design solutions',
      'Improve efficiency of human life'
    ]
  },
  { 
    name: 'Workshops', 
    category: 'Learning', 
    icon: '📚',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[11]}`,
    description: 'Bridge the divide between thinking and doing. Workshops on Graphics Processing Units, AI & HPC, Digital Forensics, Machine Learning, Cloud Computing, and more.',
    details: [
      'Graphics Processing Units, AI & HPC',
      'Digital Forensics, Patenting & Security',
      'Machine Learning and Deep Learning',
      'Cloud Computing, DevOps, Rocketry'
    ]
  },
  { 
    name: 'Crypto Quest', 
    category: 'Security', 
    icon: '🔐',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[12]}`,
    description: 'Navigate through cryptography challenges and cybersecurity scenarios.',
    details: [
      'Cryptography puzzles',
      'Security challenges',
      'CTF-style competitions',
      'Cybersecurity awareness'
    ]
  },
  { 
    name: 'Startup Pitch', 
    category: 'Entrepreneurship', 
    icon: '🚀',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[13]}`,
    description: 'Pitch your innovative ideas to industry veterans and investors for funding and mentorship.',
    details: [
      'Startup idea pitching',
      'Investor panel presentations',
      'Mentorship opportunities',
      'Funding and incubation support'
    ]
  },
  { 
    name: 'Racing Championship', 
    category: 'Automotive', 
    icon: '🏎️',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[14]}`,
    description: 'Build high-performance racing vehicles and compete in speed and endurance challenges.',
    details: [
      'Vehicle design and build',
      'Racing competitions',
      'Performance testing',
      'Engineering excellence awards'
    ]
  },
  { 
    name: 'Guest Lectures', 
    category: 'Knowledge', 
    icon: '🎓',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[15]}`,
    description: 'Learn from industry leaders and academic experts through engaging talks and interactive sessions.',
    details: [
      'Industry expert insights',
      'Academic excellence talks',
      'Interactive Q&A sessions',
      'Networking opportunities'
    ]
  },
  { 
    name: 'Expo', 
    category: 'Exhibition', 
    icon: '🏛️',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[16]}`,
    description: 'Showcase of innovative projects, technologies, and research from students and industry partners.',
    details: [
      'Student project displays',
      'Industry technology showcases',
      'Interactive demonstrations',
      'Innovation gallery'
    ]
  },
  { 
    name: 'AI Realm', 
    category: 'AI/ML', 
    icon: '🤖',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[17]}`,
    description: 'Explore the frontiers of artificial intelligence and machine learning through competitions and showcases.',
    details: [
      'AI/ML competitions',
      'Deep learning challenges',
      'Neural network showcases',
      'Future of AI discussions'
    ]
  },
  { 
    name: 'Kascades', 
    category: 'Technical', 
    icon: '⚡',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[18]}`,
    description: 'Premier technical event featuring innovative engineering solutions and cutting-edge technology demonstrations.',
    details: [
      'Technical innovation showcase',
      'Engineering excellence',
      'Cutting-edge technology',
      'Industry partnerships'
    ]
  },
  { 
    name: 'CodeForces', 
    category: 'Programming', 
    icon: '💻',
    image: `/Events Poster_KTJ_25/${eventPosterFiles[19]}`,
    description: 'Competitive programming contest featuring algorithmic challenges and coding battles.',
    details: [
      'Algorithmic challenges',
      'Competitive programming',
      'Real-time coding battles',
      'Problem-solving excellence'
    ]
  },
];

export default function FlagshipEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
    layoutEffect: false, // Use effect instead of layoutEffect for better performance
  });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLearnMore = (event: typeof events[0], e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedEvent(event);
  };

  const closeOverlay = () => {
    setSelectedEvent(null);
  };

  // Force section visibility - ensure component is always visible
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

  // Prevent body scroll when overlay is open and focus scroll container
  useEffect(() => {
    if (selectedEvent) {
      // Store original styles
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyPosition = document.body.style.position;
      const originalBodyTop = document.body.style.top;
      const originalBodyWidth = document.body.style.width;
      const originalBodyHeight = document.body.style.height;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      
      // Lock body scroll - use fixed positioning to completely prevent scroll
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      
      // Also lock html element
      document.documentElement.style.overflow = 'hidden';
      
      // Prevent scroll on backdrop and modal - more aggressive approach
      const preventScroll = (e: WheelEvent | TouchEvent) => {
        // Check if the event is coming from the scroll container
        const target = e.target as Node;
        const isInsideScrollContainer = scrollContainerRef.current && scrollContainerRef.current.contains(target);
        
        // If not inside scroll container, always prevent
        if (!isInsideScrollContainer) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        
        // If inside scroll container, check if we can scroll
        if (scrollContainerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
          const isAtTop = scrollTop === 0;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
          
          // Prevent scroll if trying to scroll beyond boundaries
          if (e instanceof WheelEvent) {
            if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
              e.preventDefault();
              e.stopPropagation();
            }
          }
        }
      };
      
      // Store scroll prevention handler for cleanup
      const scrollHandler = (e: Event) => {
        // Prevent any scroll events from propagating outside overlay
        if (!scrollContainerRef.current?.contains(e.target as Node)) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      
      // Add event listeners with capture phase to catch all events
      window.addEventListener('wheel', preventScroll, { passive: false, capture: true });
      window.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
      window.addEventListener('scroll', scrollHandler, { passive: false, capture: true });
      
      // Focus the scroll container so it can receive wheel events
      const timeout1 = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.focus({ preventScroll: true });
        }
      }, 150);
      
      const timeout2 = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.focus({ preventScroll: true });
        }
      }, 500);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        
        // Remove event listeners (with same options as added)
        window.removeEventListener('wheel', preventScroll, { capture: true } as EventListenerOptions);
        window.removeEventListener('touchmove', preventScroll, { capture: true } as EventListenerOptions);
        window.removeEventListener('scroll', scrollHandler, { capture: true } as EventListenerOptions);
        
        // Restore body and html styles
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.position = originalBodyPosition;
        document.body.style.top = originalBodyTop;
        document.body.style.width = originalBodyWidth;
        document.body.style.height = originalBodyHeight;
        document.documentElement.style.overflow = originalHtmlOverflow;
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [selectedEvent]);

  return (
    <section 
      id="events" 
      ref={sectionRef} 
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden" 
      style={{ 
        minHeight: '200vh', 
        zIndex: 1,
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto',
        position: 'relative'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black" />
        
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-500/20 rounded-full blur-sm"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} />
      
      <div className="relative z-10 max-w-7xl mx-auto" style={{ position: 'sticky', top: 0 }}>
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent max-w-2xl mx-auto mb-8"
          />
          
          {/* Title with Animated Gradient */}
          <div className="relative inline-block">
            <motion.h2 
              className="text-title font-bold text-white mb-2 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              FLAGSHIP
            </motion.h2>
            <motion.h2 
              className="text-title font-bold relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 animate-gradient">
                  EVENTS
                </span>
                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
            </motion.h2>
            
            {/* Glow effect behind text */}
            <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-red-500/50 via-red-400/50 to-red-500/50 -z-10" />
          </div>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-white/60 mt-6 max-w-2xl mx-auto"
          >
            Explore our premier events showcasing innovation, creativity, and excellence
          </motion.p>
          
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent max-w-2xl mx-auto mt-8"
          />
        </motion.div>

        {/* Clean Grid Layout - 5×4 grid with improved parallax */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6" style={{ 
          position: 'sticky', 
          top: '10vh',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          overflow: 'visible',
        }}>
          {events.map((event, index) => {
            // Calculate row (0, 1, 2, or 3 for 4 rows)
            const rowIndex = Math.floor(index / 5);
            const colIndex = index % 5;
            
            // Reduced parallax speeds to prevent stacking
            const parallaxSpeed = [-25, 30, -20, 28, -30];
            const rowMultiplier = [1, 1.2, 0.9, 1.1];
            
            // Smoother parallax y-offset with row variation
            const yOffset = useTransform(
              scrollYProgress, 
              [0, 0.5, 1], 
              [
                0, 
                parallaxSpeed[colIndex] * rowMultiplier[rowIndex], 
                parallaxSpeed[colIndex] * rowMultiplier[rowIndex] * 1.3
              ]
            );
            
            // Subtle scale effect for depth - prevent too much shrinking
            const scale = useTransform(
              scrollYProgress, 
              [0, 0.5, 1], 
              [
                1, 
                1 - (rowIndex * 0.03), 
                1 - (rowIndex * 0.05)
              ]
            );
            
            // Remove horizontal parallax to prevent overlapping
            // Using very minimal horizontal movement only for depth perception
            const xOffset = useTransform(
              scrollYProgress,
              [0, 1],
              [0, 0] // No horizontal parallax to prevent overlap
            );
            
            // Variants for hover animations - all controlled by parent
            const cardVariants = {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
            };

            // Image variants removed - using whileHover directly

            // Removed variants - using whileHover directly for better type safety

            const isHovered = hoveredCard === index;

            return (
            <motion.div
              key={event.name}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              style={{ 
                x: xOffset,
                y: yOffset,
                scale: isHovered ? 1.03 : scale,
                height: isMobile ? '350px' : '400px',
                willChange: isHovered ? 'transform' : 'auto',
                zIndex: isHovered ? 50 : (10 - rowIndex),
                position: 'relative',
                isolation: 'isolate',
                contain: 'layout style paint',
              }}
              transition={{ 
                delay: index * 0.06,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: 'tween',
              }}
              className="relative cursor-pointer group"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={(e) => handleLearnMore(event, e)}
            >
              {/* Card Container */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl" style={{
                boxShadow: isHovered 
                  ? '0 15px 40px rgba(220, 38, 38, 0.3)' 
                  : '0 8px 20px rgba(0, 0, 0, 0.4)',
                transition: 'box-shadow 0.3s ease',
              }}>
                

                {/* Image Background */}
                <div className="absolute inset-0 bg-black">
                  <div className="w-full h-full relative">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={85}
                      priority={index < 5}
                      loading={index < 5 ? 'eager' : 'lazy'}
                    />
                    {/* Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 group-hover:from-black/85 group-hover:via-black/60 group-hover:to-black/30 transition-all duration-300" />
                  </div>
                </div>
                
                {/* Content - Bottom aligned */}
                <div 
                  className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none overflow-hidden"
                  style={{ 
                    transform: 'translateZ(20px)',
                    maxHeight: '80%',
                  }}
                >
                  {/* Category Badge */}
                  <motion.div 
                    className="mb-3 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 via-red-500/15 to-red-500/20 border border-red-500/40 backdrop-blur-md rounded-full shadow-lg"
                    initial={{ scale: 0.9, backgroundColor: 'rgba(220, 38, 38, 0.2)', y: 0 }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(220, 38, 38, 0.35)',
                      y: -2,
                      boxShadow: '0 8px 24px rgba(220, 38, 38, 0.5)',
                      borderColor: 'rgba(220, 38, 38, 0.6)',
                      transition: { duration: 0.4 }
                    }}
                  >
                    <span className="text-xs font-bold text-red-300 uppercase tracking-wider">{event.category}</span>
                  </motion.div>
                  
                  {/* Event Name */}
                  <motion.h3 
                    className="text-lg sm:text-xl md:text-2xl font-black text-white mb-3 leading-tight drop-shadow-2xl line-clamp-2"
                    style={{ 
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {event.name}
                  </motion.h3>
                  
                  {/* Description and Details - shows on hover with smooth animation */}
                  <motion.div
                    className="overflow-hidden pointer-events-none"
                    style={{ 
                      maxHeight: isHovered ? '200px' : '0px',
                    }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      height: isHovered ? 'auto' : 0,
                    }}
                    transition={{
                      opacity: { duration: 0.3 },
                      height: { duration: 0.4, ease: 'easeInOut' }
                    }}
                  >
                    <div className="pr-1 overflow-y-auto max-h-[200px]">
                      <p className="text-xs text-white/90 leading-relaxed mt-2 mb-2 line-clamp-3">
                        {event.description}
                      </p>
                      
                      {/* Event Details - Bullet Points */}
                      {event.details && event.details.length > 0 && (
                        <div className="space-y-1 mb-2">
                          {event.details.slice(0, 3).map((detail, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-1.5"
                            >
                              <span className="text-red-400 mt-0.5 flex-shrink-0 text-[10px]">▸</span>
                              <span className="text-[10px] text-white/80 leading-relaxed line-clamp-1">{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Arrow indicator - appears on hover - clickable */}
                      <button
                        onClick={(e) => handleLearnMore(event, e)}
                        className="mt-2 flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors pointer-events-auto"
                      >
                        <span className="text-xs font-bold">Learn More</span>
                        <svg 
                          className="w-3 h-3" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Simple border on hover */}
                <div className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none group-hover:border-red-500/50 transition-all duration-300" />
              </div>
            </motion.div>
          )})}
        </div>
      </div>

      {/* Detailed Overlay Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200]"
              onClick={closeOverlay}
              onWheel={(e) => {
                // Prevent backdrop from scrolling
                if (!scrollContainerRef.current?.contains(e.target as Node)) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              onTouchMove={(e) => {
                // Prevent backdrop from scrolling on touch
                if (!scrollContainerRef.current?.contains(e.target as Node)) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              style={{ touchAction: 'none', overscrollBehavior: 'none' }}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              data-modal-content
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-4xl h-[calc(100vh-2rem)] md:h-[90vh] z-[201] bg-gradient-to-br from-gray-950 via-black to-gray-950 rounded-3xl border border-red-500/30 overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => {
                // Prevent modal container from scrolling, but allow scroll container to handle it
                if (!scrollContainerRef.current?.contains(e.target as Node)) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              style={{ maxHeight: '100vh', touchAction: 'none', overscrollBehavior: 'none' }}
            >
              {/* Close Button */}
              <motion.button
                onClick={closeOverlay}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-xl bg-black/60 hover:bg-red-500/30 backdrop-blur-md border border-red-500/40 hover:border-red-500/60 flex items-center justify-center transition-all shadow-xl hover:shadow-red-500/20"
              >
                <svg className="w-6 h-6 text-red-400 hover:text-red-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Scrollable Content */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto overflow-x-hidden outline-none min-h-0"
                tabIndex={0}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(220, 38, 38, 0.5) transparent',
                  touchAction: 'pan-y',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                  maxHeight: '100%',
                  position: 'relative'
                }}
                onMouseDown={() => {
                  // Ensure container receives focus when clicked for wheel events
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.focus({ preventScroll: true });
                  }
                }}
                onWheel={(e) => {
                  // Handle scroll within container - stop propagation to prevent page scroll
                  const target = e.currentTarget;
                  const { scrollTop, scrollHeight, clientHeight } = target;
                  const isAtTop = scrollTop === 0 && e.deltaY < 0;
                  const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
                  
                  // If we can scroll within container, prevent it from bubbling
                  if (scrollHeight > clientHeight && !isAtTop && !isAtBottom) {
                    e.stopPropagation();
                  }
                }}
                onTouchMove={(e) => {
                  // Allow touch scrolling within container
                  e.stopPropagation();
                }}
              >
                {/* Hero Image Section */}
                <div className="relative h-72 md:h-96 overflow-hidden">
                  {/* Background Image with Parallax Effect */}
                  <motion.div
                    className="w-full h-full"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={selectedEvent.image}
                      alt={selectedEvent.name}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      quality={85}
                      priority
                    />
                  </motion.div>
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                  
                  {/* Decorative Pattern Overlay */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(220,38,38,0.3) 1px, transparent 0)',
                      backgroundSize: '32px 32px'
                    }}
                  />
                  
                  {/* Hero Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
                    <div className="max-w-4xl mx-auto">
                      {/* Category Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="inline-flex items-center gap-2 mb-6"
                      >
                        <div className="px-4 py-1.5 bg-red-500/20 border border-red-500/50 backdrop-blur-md rounded-full shadow-lg">
                          <span className="text-xs md:text-sm font-bold text-red-300 uppercase tracking-widest">
                            {selectedEvent.category}
                          </span>
                        </div>
                        {/* Icon Badge */}
                        <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/50 backdrop-blur-md flex items-center justify-center text-2xl shadow-lg">
                          {selectedEvent.icon}
                        </div>
                      </motion.div>
                      
                      {/* Event Title */}
                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight"
                        style={{
                          textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(220, 38, 38, 0.3)'
                        }}
                      >
                        {selectedEvent.name}
                      </motion.h1>
                      
                      {/* Decorative Line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                        className="h-1 bg-gradient-to-r from-red-500 via-red-400 to-transparent rounded-full max-w-32"
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Main Content Section */}
                <div className="bg-gradient-to-b from-gray-950 via-black to-gray-950">
                  {/* About Section */}
                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="px-8 md:px-12 py-10 md:py-14"
                  >
                    <div className="max-w-4xl mx-auto">
                      {/* Section Header */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                        <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 uppercase tracking-wider">
                          About
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                      </div>
                      
                      {/* Description Content */}
                      <div className="relative pl-6 border-l-2 border-red-500/30">
                        <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-red-500/50" />
                        <p className="text-base md:text-lg text-white/90 leading-relaxed font-light">
                          {selectedEvent.description}
                        </p>
                      </div>
                    </div>
                  </motion.section>

                  {/* Features Section */}
                  {selectedEvent.details && selectedEvent.details.length > 0 && (
                    <motion.section
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="px-8 md:px-12 py-10 md:py-14 bg-gradient-to-b from-black/50 via-red-950/10 to-black/50"
                    >
                      <div className="max-w-4xl mx-auto">
                        {/* Section Header */}
                        <div className="flex items-center gap-4 mb-10">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                          <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 uppercase tracking-wider">
                            Key Features
                          </h2>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                        </div>
                        
                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          {selectedEvent.details.map((detail, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -30, y: 20 }}
                              animate={{ opacity: 1, x: 0, y: 0 }}
                              transition={{ 
                                delay: 0.5 + (idx * 0.08),
                                duration: 0.5,
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                              className="group relative p-5 md:p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 via-red-950/20 to-gray-900/50 border border-red-500/20 hover:border-red-500/40 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1"
                            >
                              {/* Subtle Glow on Hover */}
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:via-red-500/10 group-hover:to-red-500/5 transition-all duration-300" />
                              
                              {/* Content */}
                              <div className="relative flex items-start gap-4">
                                {/* Icon Bullet */}
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center mt-0.5 group-hover:bg-red-500/30 group-hover:scale-110 transition-all duration-300">
                                  <span className="text-red-400 text-lg font-bold">▸</span>
                                </div>
                                
                                {/* Text */}
                                <p className="flex-1 text-sm md:text-base text-white/85 leading-relaxed font-normal group-hover:text-white transition-colors">
                                  {detail}
                                </p>
                              </div>
                              
                              {/* Bottom Accent Line */}
                              <div className="absolute bottom-0 left-5 md:left-6 right-5 md:right-6 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.section>
                  )}

                  {/* Action Buttons Section */}
                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="px-8 md:px-12 py-12 md:py-16"
                  >
                    <div className="max-w-4xl mx-auto">
                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mb-12" />
                      
                      {/* Buttons Container */}
                      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                        {/* Primary CTA */}
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 group relative px-8 py-5 bg-gradient-to-r from-red-500 via-red-600 to-red-500 hover:from-red-600 hover:via-red-700 hover:to-red-600 text-white font-bold text-base md:text-lg rounded-2xl transition-all duration-300 shadow-xl shadow-red-500/25 hover:shadow-2xl hover:shadow-red-500/40 overflow-hidden"
                        >
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          
                          {/* Button Content */}
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Register Now
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        </motion.button>
                        
                        {/* Secondary CTA */}
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 group relative px-8 py-5 bg-transparent border-2 border-red-500/50 hover:border-red-500 text-red-400 hover:text-red-300 font-bold text-base md:text-lg rounded-2xl transition-all duration-300 hover:bg-red-500/10 backdrop-blur-sm overflow-hidden"
                        >
                          {/* Hover Background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Button Content */}
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            View Schedule
                          </span>
                        </motion.button>
                      </div>
                      
                      {/* Decorative Bottom Line */}
                      <div className="h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mt-12" />
                    </div>
                  </motion.section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
