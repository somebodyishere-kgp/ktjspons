'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageItem {
  src: string;
  alt: string;
}

interface MouseScaleGalleryProps {
  images: ImageItem[];
  className?: string;
}

export default function MouseScaleGallery({ images, className = '' }: MouseScaleGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!galleryRef.current) return;
    const rect = galleryRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={galleryRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`grid grid-cols-3 gap-4 ${className}`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          style={{
            rotateX,
            rotateY,
            z: index * 5,
          }}
          whileHover={{ scale: 1.1, zIndex: 10 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="relative group cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md aspect-square">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 33vw, 300px"
                className="object-cover"
                quality={75}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white font-medium">{image.alt}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
