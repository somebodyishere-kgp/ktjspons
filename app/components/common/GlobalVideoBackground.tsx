'use client';

import { useRef, useEffect, memo } from 'react';

const GlobalVideoBackground = memo(function GlobalVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video properties once
    video.preload = 'auto';
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    
    // Prevent video from causing re-renders
    video.setAttribute('data-loaded', 'true');
    
    // Play video once loaded
    const handleCanPlay = () => {
      video.play().catch(() => {
        // Ignore autoplay errors
      });
    };

    const handleLoadedData = () => {
      // Ensure video plays and stays playing
      if (video.readyState >= 3) {
        video.play().catch(() => {});
      }
    };

    // Pause video when tab is not visible to save resources
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('canplay', handleCanPlay, { once: true });
    video.addEventListener('loadeddata', handleLoadedData, { once: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Try to play immediately
    video.play().catch(() => {});

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{
        contain: 'layout style paint',
        willChange: 'auto',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ 
          // Use opacity instead of filter for better performance
          opacity: 0.85,
          willChange: 'auto',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <source src="/Kshitij-Aftermovie(4).mp4" type="video/mp4" />
      </video>
      {/* Gradient overlay - static, no animations */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
        style={{
          willChange: 'auto',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
});

GlobalVideoBackground.displayName = 'GlobalVideoBackground';

export default GlobalVideoBackground;
