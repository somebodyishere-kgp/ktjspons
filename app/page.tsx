'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';

// Import lightweight components immediately
import NavigationMenu from '@/components/common/NavigationMenu';
import StickyNavbar from '@/components/common/StickyNavbar';
import GlobalVideoBackground from '@/components/common/GlobalVideoBackground';
import ScrollProgress from '@/components/common/ScrollProgress';
import SVGCurveLoader from '@/components/animations/SVGCurveLoader';
import PerspectiveTransition from '@/components/animations/PerspectiveTransition';

// Lazy load heavy sections
const Hero = dynamic(() => import('@/components/sections/Hero'), { 
  ssr: true,
  loading: () => <div className="min-h-screen" />,
});
const WhoAreWe = dynamic(() => import('@/components/sections/WhoAreWe'), { 
  ssr: false,
});
const WhyAssociate = dynamic(() => import('@/components/sections/WhyAssociate'), { 
  ssr: false,
});
const SeventyFiveYears = dynamic(() => import('@/components/sections/SeventyFiveYears'), { 
  ssr: false,
});
const Events = dynamic(() => import('@/components/sections/FlagshipEvents'), { 
  ssr: false,
});
const Graphs = dynamic(() => import('@/components/sections/Graphs'), { 
  ssr: false,
});
const PreviousSponsors = dynamic(() => import('@/components/sections/PreviousSponsors'), { 
  ssr: false,
});
const Glimpses = dynamic(() => import('@/components/sections/Glimpses'), { 
  ssr: false,
});
const SponsorUs = dynamic(() => import('@/components/sections/SponsorUs'), { 
  ssr: false,
});
const Footer = dynamic(() => import('@/components/sections/Footer'), { 
  ssr: false,
});

export default function Home() {
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Debounce resize to prevent excessive re-renders
    let timeoutId: NodeJS.Timeout;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 1024);
      }, 150);
    };
    
    // Set initial value
    setIsMobile(window.innerWidth < 1024);
    
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Optimized Lenis with performance settings
    const lenis = new Lenis({
      duration: 1.0, // Reduced from 1.2
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for less aggressive scrolling
      touchMultiplier: 1.5, // Reduced from 2
      infinite: false,
      syncTouch: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative">
      <GlobalVideoBackground />
      <ScrollProgress />
      <SVGCurveLoader duration={600} delay={500} />
      
      {/* Mobile: Side navbar, Desktop: Sticky navbar */}
      {isMobile ? (
        <NavigationMenu />
      ) : (
        <StickyNavbar heroTitleRef={heroTitleRef} />
      )}
      
      <Hero titleRef={heroTitleRef} navbarTitleSlotRef={heroTitleRef} />
      
      <PerspectiveTransition>
        <WhoAreWe />
      </PerspectiveTransition>
      
      <PerspectiveTransition>
        <WhyAssociate />
      </PerspectiveTransition>
      
      <PerspectiveTransition>
        <SeventyFiveYears />
      </PerspectiveTransition>
      
      <PerspectiveTransition>
        <Events />
      </PerspectiveTransition>
      
      <PerspectiveTransition>
        <Graphs />
      </PerspectiveTransition>
      
      <PerspectiveTransition>
        <PreviousSponsors />
      </PerspectiveTransition>
      
      <PerspectiveTransition>
        <Glimpses />
      </PerspectiveTransition>
      
      <PerspectiveTransition>
        <SponsorUs />
      </PerspectiveTransition>
      
      <Footer />
    </main>
  );
}
