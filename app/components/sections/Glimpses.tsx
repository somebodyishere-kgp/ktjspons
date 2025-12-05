'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ParallaxMasonryGallery } from '@/components/ui/ParallaxMasonryGallery';
import { FullscreenImageModal } from '@/components/ui/FullscreenImageModal';
import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';

// Gallery images from local photos directory - all available photos
const photoFiles = [
  // New numbered photos
  '1 (1).jpg', '1 (2).jpg', '1 (3).jpg', '1 (4).jpg', '1 (5).jpg',
  '1 (6).jpg', '1 (7).jpg', '1 (8).jpg', '1 (9).jpg', '1 (10).jpg',
  '1 (11).jpg', '1 (12).jpg', '1 (13).jpg', '1 (14).jpg', '1 (15).jpg',
  '1 (16).jpg', '1 (17).jpg', '1 (18).jpg', '1 (19).jpg', '1 (20).jpg',
  '1 (21).jpg', '1 (22).jpg', '1 (23).jpg', '1 (24).jpg', '1 (25).jpg',
  '1 (26).jpg', '1 (27).jpg', '1 (28).jpg', '1 (29).jpg', '1 (30).jpg',
  '1 (31).jpg', '1 (32).jpg', '1 (33).jpg',
  // DSC photos
  'DSC00502.jpg', 'DSC00512.jpg', 'DSC00518.jpg', 'DSC00530.jpg', 'DSC00539.jpg',
  'DSC00557.jpg', 'DSC00562.jpg', 'DSC00587.jpg', 'DSC00766.jpg', 'DSC00767.jpg',
  'DSC00795.jpg', 'DSC00882.jpg', 'DSC00892.jpg', 'DSC00893.jpg', 'DSC00900.jpg',
  'DSC00913.jpg', 'DSC00920.jpg', 'DSC00921.jpg', 'DSC00923.jpg',
  'DSC01072.jpg', 'DSC01075.jpg', 'DSC01079.jpg', 'DSC01082.jpg', 'DSC01085.jpg',
  'DSC01093.jpg', 'DSC01112.jpg', 'DSC01142.jpg', 'DSC01144.jpg', 'DSC01186.jpg',
  'DSC01235.jpg', 'DSC01269.jpg',
  // UTK photos
  'UTK09915.jpg'
];

// Use all available photos
const galleryImages: Array<{ src: string; alt: string }> = photoFiles.map((photoName, i) => ({
  src: `/photos/${photoName}`,
  alt: `KSHITIJ Event Photo ${i + 1}`
}));

export default function Glimpses() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ 
    src: string; 
    alt: string;
    initialRect?: { x: number; y: number; width: number; height: number };
  } | null>(null);

  // Simplified scroll tracking - disabled parallax for better performance
  // const { scrollYProgress } = useScroll({
  //   target: sectionRef,
  //   offset: ["start end", "end start"]
  // });
  
  // Removed fade effect for better performance
  // const sectionOpacity = useTransform(
  //   scrollYProgress,
  //   [0, 0.1, 0.9, 1],
  //   [0, 1, 1, 0]
  // );

  // Preload images and set loading state
  useEffect(() => {
    const preloadImages = galleryImages.slice(0, 15);
    preloadImages.forEach((img, index) => {
      const image = new window.Image();
      image.src = img.src;
      if (index < 8) {
        (image as any).fetchPriority = 'high';
      }
    });
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);

  // Ensure section is visible
  useEffect(() => {
    if (sectionRef.current) {
      const section = sectionRef.current;
      section.style.opacity = '1';
      section.style.visibility = 'visible';
      section.style.pointerEvents = 'auto';
      section.style.position = 'relative';
    }
  }, []);

  const handleImageClick = useCallback((
    imageSrc: string, 
    alt: string, 
    initialRect?: { x: number; y: number; width: number; height: number }
  ) => {
    setSelectedImage({ src: imageSrc, alt, initialRect });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        id="glimpses" 
        className="relative w-full min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-black via-gray-950/50 to-black overflow-hidden"
        style={{ 
          position: 'relative',
        }}
      >
        <div className="absolute inset-0 bg-black/20 z-0" />
        
        {/* Sticky Header */}
        <motion.div
          className="sticky top-0 z-30 pb-6 sm:pb-8 md:pb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto pt-8 sm:pt-12 md:pt-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 text-center px-4"
            >
              GLIMPSES
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-lg sm:text-xl text-white/80 mb-2">
                A visual journey through KSHITIJ&apos;s moments of innovation, collaboration, and excellence.
              </p>
              <p className="text-xs sm:text-sm text-white/60 px-4">
                Hover to explore • Click any image to view in fullscreen
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Parallax Masonry Gallery */}
        <div 
          ref={galleryRef}
          className="relative z-20 max-w-7xl mx-auto"
          style={{
            minHeight: 'calc(100vh - 200px)',
            paddingBottom: '4rem',
          }}
        >
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="bg-gray-900 rounded-xl animate-pulse"
                  style={{ 
                    aspectRatio: Math.random() > 0.5 ? '4/5' : '3/4',
                    minHeight: '250px'
                  }}
                />
              ))}
            </div>
          ) : (
            <ParallaxMasonryGallery 
              images={galleryImages}
              onImageClick={handleImageClick}
              initialVisibleCount={4}
            />
          )}
        </div>
      </section>

      {selectedImage && (
        <FullscreenImageModal
          imageSrc={selectedImage.src}
          alt={selectedImage.alt}
          isOpen={!!selectedImage}
          onClose={handleCloseModal}
          initialRect={selectedImage.initialRect}
        />
      )}
    </>
  );
}
