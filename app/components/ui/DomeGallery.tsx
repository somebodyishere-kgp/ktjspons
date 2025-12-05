'use client';

import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import './DomeGallery.css';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number): number => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool: Array<{ src: string; alt: string }>, seg: number) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map(c => ({ ...c, src: '', alt: '' }));
  }
  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`
    );
  }

  const normalizedImages = pool.map(image => {
    if (typeof image === 'string') {
      return { src: image, alt: '' };
    }
    return { src: image.src || '', alt: image.alt || '' };
  });

  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt
  }));
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

interface DomeGalleryProps {
  images?: Array<{ src: string; alt: string }>;
  fit?: number;
  fitBasis?: string;
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  segments?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  onImageClick?: (imageSrc: string, alt: string, initialRect?: { x: number; y: number; width: number; height: number }) => void;
}

export default function DomeGallery({
  images = [],
  fit = 0.5,
  segments = 35,
  overlayBlurColor = '#060010',
  enlargeTransitionMs = 300,
  imageBorderRadius = '30px',
  openedImageBorderRadius = '30px',
  grayscale = true,
  minRadius,
  onImageClick
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLDivElement | null>(null);
  const originalTilePositionRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);
  const isHoveringRef = useRef(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef(0);
  const lastMovePosRef = useRef<{ x: number; y: number } | null>(null);

  const scrollLockedRef = useRef(false);
  const lockScroll = () => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add('dg-scroll-lock');
  };
  const unlockScroll = () => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
    scrollLockedRef.current = false;
    document.body.classList.remove('dg-scroll-lock');
  };

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    if (!sphereRef.current) return;
    // GPU-accelerated transform with translate3d
    sphereRef.current.style.transform = `translate3d(0, 0, calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    sphereRef.current.style.willChange = 'transform';
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    
    // Initial setup
    const setupRadius = () => {
      const rect = root.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const minDim = Math.min(w, h);
      const aspect = w / h;
      const basis = aspect >= 1.3 ? w : minDim;
      // Calculate radius based on fit, but don't force minRadius if it makes it too large
      let radius = basis * fit;
      // Only apply minRadius if the calculated radius is smaller than minRadius
      if (minRadius && radius < minRadius) {
        radius = minRadius;
      }

      root.style.setProperty('--radius', `${radius}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    };
    
    // Initial setup - try immediately, then retry with delay if needed
    setupRadius();
    const timeoutId = setTimeout(() => {
      setupRadius();
    }, 100);
    
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const aspect = w / h;
      const basis = aspect >= 1.3 ? w : minDim;
      // Calculate radius based on fit, but don't force minRadius if it makes it too large
      let radius = basis * fit;
      // Only apply minRadius if the calculated radius is smaller than minRadius
      if (minRadius && radius < minRadius) {
        radius = minRadius;
      }

      root.style.setProperty('--radius', `${radius}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });

    ro.observe(root);
    return () => {
      clearTimeout(timeoutId);
      ro.disconnect();
    };
  }, [fit, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius, minRadius, applyTransform]);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [dragDirection, setDragDirection] = useState<'horizontal' | 'vertical' | null>(null);

  // Limit vertical rotation to where images exist (based on Y range -4 to 5 in buildItems)
  // With segments=40, unit = 360/40/2 = 4.5 degrees per unit
  // So max rotation is approximately -25 to 25 degrees for X-axis
  const MAX_X_ROTATION = 25;
  const MIN_X_ROTATION = -25;

  const handleStart = (x: number, y: number) => {
    setIsDragging(true);
    draggingRef.current = true;
    setDragStart({ x, y });
    setHasMoved(false);
    setDragDirection(null);
    velocityRef.current = { x: 0, y: 0 };
    lastMoveTimeRef.current = performance.now();
    lastMovePosRef.current = { x, y };
    startRotRef.current = { ...rotationRef.current };
    
    // Stop any existing inertia animation
    if (inertiaRAF.current !== null) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  };

  const handleMove = (x: number, y: number) => {
    if (!isDragging || !dragStart || !mainRef.current) return;
    
    const now = performance.now();
    const dt = Math.max(1, now - lastMoveTimeRef.current) / 1000; // seconds
    
    const dx = x - dragStart.x;
    const dy = y - dragStart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate velocity for inertia
    if (lastMovePosRef.current && dt > 0) {
      const vx = (x - lastMovePosRef.current.x) / dt;
      const vy = (y - lastMovePosRef.current.y) / dt;
      const smoothingFactor = 0.3; // Smooth velocity changes
      velocityRef.current = {
        x: velocityRef.current.x * (1 - smoothingFactor) + vx * smoothingFactor,
        y: velocityRef.current.y * (1 - smoothingFactor) + vy * smoothingFactor,
      };
    }
    
    lastMovePosRef.current = { x, y };
    lastMoveTimeRef.current = now;
    
    if (distance > 3) {
      setHasMoved(true);
      
      // Determine drag direction based on initial movement
      if (!dragDirection) {
        if (Math.abs(dx) > Math.abs(dy)) {
          setDragDirection('horizontal');
        } else {
          setDragDirection('vertical');
        }
      }
    }
    
    // Smoother dragging with higher divisor
    const smoothnessFactor = 50;
    
    let nextX = rotationRef.current.x;
    let nextY = rotationRef.current.y;
    
    // Apply rotation based on detected direction
    if (dragDirection === 'horizontal') {
      // Left/Right rotation (Y-axis) only
      nextY = wrapAngleSigned(rotationRef.current.y + dx / smoothnessFactor);
    } else if (dragDirection === 'vertical') {
      // Up/Down rotation (X-axis) with limits - only where images exist
      nextX = clamp(rotationRef.current.x - dy / smoothnessFactor, MIN_X_ROTATION, MAX_X_ROTATION);
    } else {
      // While determining direction, apply both but favor the stronger movement
      if (Math.abs(dx) > Math.abs(dy)) {
        nextY = wrapAngleSigned(rotationRef.current.y + dx / smoothnessFactor);
      } else {
        nextX = clamp(rotationRef.current.x - dy / smoothnessFactor, MIN_X_ROTATION, MAX_X_ROTATION);
      }
    }
    
    rotationRef.current = { x: nextX, y: nextY };
    applyTransform(nextX, nextY);
  };

  const handleEnd = () => {
    setIsDragging(false);
    draggingRef.current = false;
    const endTime = performance.now();
    
    // Apply inertia physics if there's significant velocity
    const minVelocity = 5; // Minimum velocity threshold for inertia
    const friction = 0.92; // Friction coefficient (0.92 = 8% reduction per frame)
    
    const applyInertia = () => {
      const speedX = Math.abs(velocityRef.current.x);
      const speedY = Math.abs(velocityRef.current.y);
      
      if (speedX < minVelocity && speedY < minVelocity) {
        velocityRef.current = { x: 0, y: 0 };
        inertiaRAF.current = null;
        return;
      }
      
      // Apply friction
      velocityRef.current.x *= friction;
      velocityRef.current.y *= friction;
      
      // Convert velocity to rotation (with direction constraints)
      const smoothnessFactor = 2000; // Higher for slower inertia
      let nextX = rotationRef.current.x;
      let nextY = rotationRef.current.y;
      
      // Apply rotation based on drag direction or velocity
      if (dragDirection === 'horizontal') {
        nextY = wrapAngleSigned(rotationRef.current.y + velocityRef.current.x / smoothnessFactor);
      } else if (dragDirection === 'vertical') {
        nextX = clamp(rotationRef.current.x - velocityRef.current.y / smoothnessFactor, MIN_X_ROTATION, MAX_X_ROTATION);
        // Stop Y velocity if vertical
        velocityRef.current.x = 0;
      } else {
        // Apply both if no clear direction
        if (speedX > speedY) {
          nextY = wrapAngleSigned(rotationRef.current.y + velocityRef.current.x / smoothnessFactor);
          velocityRef.current.y = 0;
        } else {
          nextX = clamp(rotationRef.current.x - velocityRef.current.y / smoothnessFactor, MIN_X_ROTATION, MAX_X_ROTATION);
          velocityRef.current.x = 0;
        }
      }
      
      rotationRef.current = { x: nextX, y: nextY };
      applyTransform(nextX, nextY);
      
      inertiaRAF.current = requestAnimationFrame(applyInertia);
    };
    
    // Start inertia animation if velocity is significant
    if (Math.abs(velocityRef.current.x) > minVelocity || Math.abs(velocityRef.current.y) > minVelocity) {
      inertiaRAF.current = requestAnimationFrame(applyInertia);
    }
    
    setDragStart(null);
    setHasMoved(false);
    setDragDirection(null);
    lastMovePosRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleImageClick = (e: React.MouseEvent, src: string, alt: string) => {
    e.stopPropagation();
    if (!hasMoved && onImageClick) {
      // Get the clicked image element's position
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const imageRect = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      };
      onImageClick(src, alt, imageRect);
    }
  };

  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  };

  // Preload first visible images (front of dome)
  useEffect(() => {
    if (items.length === 0) return;
    
    // Preload first 15-20 images that are likely visible
    const preloadCount = Math.min(20, items.length);
    const preloadImages = items.slice(0, preloadCount).map(item => item.src).filter(Boolean);
    
    preloadImages.forEach((src, index) => {
      const img = new window.Image();
      img.src = src;
      // Set higher priority for first few images
      if (index < 8) {
        (img as any).fetchPriority = 'high';
      }
    });
  }, [items]);

  // Scroll to rotate functionality
  useEffect(() => {
    if (!mainRef.current) return;
    
    const mainElement = mainRef.current;
    
    // Track mouse enter/leave to know when we're hovering
    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };
    const handleMouseLeave = () => {
      isHoveringRef.current = false;
    };
    
    const handleWheel = (e: WheelEvent) => {
      // Always allow vertical scrolling - never prevent it
      // Only handle horizontal scroll for rotation
      if (isDragging || draggingRef.current || !isHoveringRef.current) {
        // Allow normal page scrolling
        return;
      }
      
      // Only rotate on horizontal scroll (touchpad left/right swipe)
      // Must be clearly horizontal (deltaX significantly larger than deltaY)
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 2 && Math.abs(e.deltaX) > 5;
      
      if (isHorizontal) {
        // Only prevent default for horizontal scroll
        e.preventDefault();
        e.stopPropagation();
        
        const scrollSensitivity = 50; // Higher = less sensitive (smoother)
        const scrollDelta = e.deltaX / scrollSensitivity;
        
        // Apply rotation to Y-axis (horizontal rotation)
        const nextY = wrapAngleSigned(rotationRef.current.y + scrollDelta);
        rotationRef.current = { 
          x: rotationRef.current.x, 
          y: nextY 
        };
        applyTransform(rotationRef.current.x, rotationRef.current.y);
      }
      // If vertical scroll, do nothing - let it pass through to page scroll
    };

    mainElement.addEventListener('mouseenter', handleMouseEnter);
    mainElement.addEventListener('mouseleave', handleMouseLeave);
    // Use capture phase to intercept before Lenis
    mainElement.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    
    return () => {
      mainElement.removeEventListener('mouseenter', handleMouseEnter);
      mainElement.removeEventListener('mouseleave', handleMouseLeave);
      mainElement.removeEventListener('wheel', handleWheel, { capture: true } as any);
    };
  }, [isDragging]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('dg-scroll-lock');
      // Cancel any running inertia animation
      if (inertiaRAF.current !== null) {
        cancelAnimationFrame(inertiaRAF.current);
        inertiaRAF.current = null;
      }
    };
  }, []);

  if (images.length === 0) {
    return <div className="text-white/60 text-center py-32">No images provided</div>;
  }

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={{
        ['--segments-x']: segments,
        ['--segments-y']: segments,
        ['--overlay-blur-color']: overlayBlurColor,
        ['--tile-radius']: imageBorderRadius,
        ['--enlarge-radius']: openedImageBorderRadius,
        ['--image-filter']: grayscale ? 'grayscale(1)' : 'none',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'block'
      } as React.CSSProperties}
    >
      <main 
        ref={mainRef} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="sphere-main"
      >
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="item"
                data-src={it.src}
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                style={{
                  ['--offset-x']: it.x,
                  ['--offset-y']: it.y,
                  ['--item-size-x']: it.sizeX,
                  ['--item-size-y']: it.sizeY
                } as React.CSSProperties}
              >
                <div 
                  className="item__image group" 
                  role="button" 
                  tabIndex={0} 
                  aria-label={it.alt || 'Open image'}
                  onClick={(e) => handleImageClick(e, it.src, it.alt)}
                >
                  {/* Loading skeleton */}
                  {!loadedImages.has(it.src) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black animate-pulse" style={{ borderRadius: 'inherit' }} />
                  )}
                  
                  <img 
                    src={it.src} 
                    draggable={false} 
                    alt={it.alt}
                    loading={i < 20 ? "eager" : "lazy"}
                    fetchPriority={i < 8 ? "high" : i < 20 ? "auto" : "low"}
                    decoding="async"
                    onLoad={(e) => {
                      handleImageLoad(it.src);
                      // Adapt tile size to image aspect ratio
                      const img = e.currentTarget;
                      const itemEl = img.closest('.item__image') as HTMLElement;
                      if (itemEl && img.naturalWidth && img.naturalHeight) {
                        const aspectRatio = img.naturalWidth / img.naturalHeight;
                        // Adjust tile dimensions based on aspect ratio
                        if (aspectRatio > 1.3) {
                          // Wide/landscape - make wider
                          itemEl.style.width = 'calc(100% + 15px)';
                          itemEl.style.height = 'auto';
                        } else if (aspectRatio < 0.8) {
                          // Tall/portrait - make taller
                          itemEl.style.width = 'auto';
                          itemEl.style.height = 'calc(100% + 15px)';
                        } else {
                          // Square - keep default
                          itemEl.style.width = '100%';
                          itemEl.style.height = '100%';
                        }
                      }
                    }}
                    className={`transition-all duration-300 ${
                      loadedImages.has(it.src) 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95'
                    } group-hover:scale-105`}
                    decoding="async"
                    fetchPriority={i < 8 ? "high" : i < 20 ? "auto" : "low"}
                    style={{ 
                      willChange: loadedImages.has(it.src) ? 'auto' : 'transform, opacity',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      imageRendering: 'auto',
                    }}
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ borderRadius: 'inherit' }} />
                  
                  {/* Click indicator */}
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-all duration-300 pointer-events-none" style={{ borderRadius: 'inherit' }} />
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="viewer" ref={viewerRef}>
          <div ref={scrimRef} className="scrim" />
          <div ref={frameRef} className="frame" />
        </div>
      </main>
    </div>
  );
}