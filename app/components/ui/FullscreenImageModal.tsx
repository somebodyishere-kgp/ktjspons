'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';

interface FullscreenImageModalProps {
  imageSrc: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  initialRect?: { x: number; y: number; width: number; height: number };
}

export function FullscreenImageModal({ imageSrc, alt, isOpen, onClose, initialRect }: FullscreenImageModalProps) {
  const [finalDimensions, setFinalDimensions] = useState({ width: 0, height: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsImageLoaded(false);
      // Preload image to get dimensions
      const img = new window.Image();
      img.onload = () => {
        const maxWidth = window.innerWidth * 0.85;
        const maxHeight = window.innerHeight * 0.85;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        
        let width = maxWidth;
        let height = maxWidth / aspectRatio;
        
        if (height > maxHeight) {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
        
        setFinalDimensions({ width, height });
        setIsImageLoaded(true);
      };
      img.src = imageSrc;
    }
  }, [isOpen, imageSrc]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Calculate initial animation values
  const getInitialAnimation = () => {
    if (!initialRect || !isImageLoaded) {
      return {
        x: 0,
        y: 0,
        scale: 0.9,
        opacity: 0,
      };
    }

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const finalWidth = finalDimensions.width || window.innerWidth * 0.85;
    
    const x = initialRect.x - centerX;
    const y = initialRect.y - centerY;
    const scale = initialRect.width / finalWidth;

    return {
      x,
      y,
      scale,
      opacity: 0.8,
    };
  };

  const getExitAnimation = () => {
    if (!initialRect || !isImageLoaded) {
      return {
        scale: 0.9,
        opacity: 0,
      };
    }

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const finalWidth = finalDimensions.width || window.innerWidth * 0.85;
    
    const x = initialRect.x - centerX;
    const y = initialRect.y - centerY;
    const scale = initialRect.width / finalWidth;

    return {
      x,
      y,
      scale,
      opacity: 0,
    };
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] cursor-pointer"
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          
          {/* Image Container */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
              initial={getInitialAnimation()}
              animate={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              exit={getExitAnimation()}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                width: finalDimensions.width || '90vw',
                height: finalDimensions.height || '90vh',
                maxWidth: '100vw',
                maxHeight: '100vh',
              }}
            >
              <NextImage
                src={imageSrc}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain rounded-lg shadow-2xl"
                quality={90}
                priority
                style={{
                  display: isImageLoaded ? 'block' : 'none',
                }}
              />
              
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg animate-pulse" />
              )}
              
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-3 bg-black/70 hover:bg-black/90 backdrop-blur-md rounded-full transition-all duration-200 z-10 shadow-lg border border-white/20 hover:border-white/40 hover:scale-110"
                aria-label="Close fullscreen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
