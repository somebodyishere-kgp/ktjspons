'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useCallback, useEffect, useMemo, memo } from 'react';
import Image from 'next/image';

interface ImageItem {
  src: string;
  alt: string;
}

interface ParallaxMasonryGalleryProps {
  images: ImageItem[];
  onImageClick?: (imageSrc: string, alt: string, initialRect?: { x: number; y: number; width: number; height: number }) => void;
  className?: string;
  initialVisibleCount?: number;
}

// Memoized image item to prevent unnecessary re-renders
const GalleryImageItem = memo(function GalleryImageItem({
  image,
  index,
  aspect,
  isHovered,
  onHover,
  onImageClick,
  isVisible,
  isMobile,
}: {
  image: ImageItem;
  index: number;
  aspect: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  onImageClick: (imageSrc: string, alt: string, e: React.MouseEvent<HTMLDivElement>) => void;
  isVisible: boolean;
  isMobile: boolean;
}) {
  // Calculate size based on aspect ratio - responsive heights
  const imageClass = aspect > 1.2 ? 'wide' : aspect < 0.8 ? 'tall' : 'square';
  // Responsive base heights: smaller on mobile, larger on desktop
  const baseHeight = isMobile ? 180 : 280;
  
  const height = imageClass === 'tall' 
    ? baseHeight * 1.5 
    : imageClass === 'wide' 
    ? baseHeight * 0.8 
    : baseHeight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.03, 0.6),
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onHoverStart={() => onHover(index)}
      onHoverEnd={() => onHover(null)}
      style={{
        minHeight: `${height}px`,
        height: 'auto',
        zIndex: isHovered ? 20 : 1,
      }}
      whileHover={{ 
        scale: 1.03,
        transition: {
          duration: 0.25,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      className="relative group cursor-pointer overflow-hidden rounded-lg sm:rounded-xl bg-gray-900"
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => onImageClick(image.src, image.alt, e)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
          style={{ 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          quality={80}
          loading={index < 4 ? 'eager' : 'lazy'}
        />
      </motion.div>
      
      {/* Subtle gradient overlay on hover - no red */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
});

GalleryImageItem.displayName = 'GalleryImageItem';

export function ParallaxMasonryGallery({ 
  images, 
  onImageClick,
  className = '',
  initialVisibleCount = 4,
}: ParallaxMasonryGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageAspects, setImageAspects] = useState<Map<string, number>>(new Map());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile for responsive adjustments
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Adjust initial visible count based on screen size
  const adjustedInitialCount = isMobile ? 2 : initialVisibleCount;

  // Memoize visible images with responsive count
  const visibleImages = useMemo(() => {
    return isExpanded ? images : images.slice(0, adjustedInitialCount);
  }, [images, isExpanded, adjustedInitialCount]);

  // Load aspect ratios only for visible images initially
  useEffect(() => {
    const loadAspects = async () => {
      const aspects = new Map<string, number>();
      const imagesToLoad = isExpanded ? images : images.slice(0, initialVisibleCount + 4);
      
      await Promise.all(
        imagesToLoad.map((img) => {
          return new Promise<void>((resolve) => {
            if (aspects.has(img.src)) {
              resolve();
              return;
            }
            const image = new window.Image();
            image.onload = () => {
              aspects.set(img.src, image.naturalWidth / image.naturalHeight);
              resolve();
            };
            image.onerror = () => {
              aspects.set(img.src, 1);
              resolve();
            };
            image.src = img.src;
          });
        })
      );
      setImageAspects(aspects);
    };
    
    loadAspects();
  }, [images, isExpanded, initialVisibleCount]);

  const handleImageClick = useCallback((
    imageSrc: string,
    alt: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!onImageClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    onImageClick(imageSrc, alt, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    });
  }, [onImageClick]);

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
        {visibleImages.map((image, index) => {
          const aspect = imageAspects.get(image.src) ?? 1;
          
          return (
            <GalleryImageItem
              key={`${image.src}-${index}`}
              image={image}
              index={index}
              aspect={aspect}
              isHovered={hoveredIndex === index}
              onHover={setHoveredIndex}
              onImageClick={handleImageClick}
              isVisible={true}
              isMobile={isMobile}
            />
          );
        })}
      </div>

      {/* Expand Button - Responsive */}
      {!isExpanded && images.length > adjustedInitialCount && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex justify-center mt-6 sm:mt-8 md:mt-12 px-4"
        >
          <motion.button
            onClick={handleExpand}
            whileHover={{ scale: isMobile ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-lg shadow-red-500/30 transition-all duration-300 w-full max-w-xs sm:max-w-none"
          >
            <span className="block sm:inline">View All {images.length} Images</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
