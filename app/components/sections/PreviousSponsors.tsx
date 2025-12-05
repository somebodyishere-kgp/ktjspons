'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// Sponsor logos from Sponsers Logo folder
const sponsors = [
  { name: 'Acer', tier: 'Platinum', logo: '/Sponsers Logo/acer.png', color: 'from-blue-500 to-cyan-500' },
  { name: 'Airbus', tier: 'Platinum', logo: '/Sponsers Logo/airbus.png', color: 'from-blue-500 to-green-500' },
  { name: 'AlgoBulls', tier: 'Gold', logo: '/Sponsers Logo/algobulls.png', color: 'from-orange-500 to-yellow-500' },
  { name: 'Analog Devices', tier: 'Gold', logo: '/Sponsers Logo/analog devices .png', color: 'from-blue-600 to-purple-600' },
  { name: 'Bajaj Motorcycle', tier: 'Gold', logo: '/Sponsers Logo/Bajaj Motorcycle.png', color: 'from-blue-300 to-blue-600' },
  { name: 'Bikaji', tier: 'Silver', logo: '/Sponsers Logo/bikaji.png', color: 'from-red-500 to-orange-500' },
  { name: 'Boeing', tier: 'Platinum', logo: '/Sponsers Logo/boeing.jpg', color: 'from-red-600 to-red-800' },
  { name: 'ConfirmTkt', tier: 'Silver', logo: '/Sponsers Logo/confirm tkt.png', color: 'from-blue-700 to-blue-900' },
  { name: 'Digital India', tier: 'Bronze', logo: '/Sponsers Logo/digital india.png', color: 'from-blue-400 to-cyan-400' },
  { name: 'Envision', tier: 'Bronze', logo: '/Sponsers Logo/Envision.png', color: 'from-blue-500 to-blue-700' },
  { name: 'Genpact', tier: 'Gold', logo: '/Sponsers Logo/Genpact (1).png', color: 'from-blue-400 to-indigo-600' },
  { name: 'Gigabyte', tier: 'Silver', logo: '/Sponsers Logo/gigabyte .png', color: 'from-blue-500 to-blue-800' },
  { name: 'ITC', tier: 'Platinum', logo: '/Sponsers Logo/itc .png', color: 'from-gray-400 to-gray-600' },
  { name: 'KLA', tier: 'Gold', logo: '/Sponsers Logo/kla.png', color: 'from-green-500 to-green-700' },
  { name: 'Larsen & Toubro', tier: 'Gold', logo: '/Sponsers Logo/larsen-toubro-lt-seeklogo.png', color: 'from-red-500 to-red-700' },
  { name: 'LivePerson', tier: 'Silver', logo: '/Sponsers Logo/liveperson .png', color: 'from-black to-gray-800' },
  { name: 'Log9', tier: 'Silver', logo: '/Sponsers Logo/log9.png', color: 'from-orange-500 to-red-500' },
  { name: 'MCPI', tier: 'Bronze', logo: '/Sponsers Logo/mcpi.png', color: 'from-red-600 to-black' },
  { name: 'MediaTek', tier: 'Gold', logo: '/Sponsers Logo/mediatek.png', color: 'from-red-600 to-red-900' },
  { name: 'MongoDB', tier: 'Silver', logo: '/Sponsers Logo/mongo DB.png', color: 'from-green-500 to-black' },
  { name: 'Mphasis', tier: 'Gold', logo: '/Sponsers Logo/mphasis.png', color: 'from-black to-gray-700' },
  { name: 'NEGD', tier: 'Bronze', logo: '/Sponsers Logo/negd.png', color: 'from-pink-500 to-red-500' },
  { name: 'NetApp', tier: 'Silver', logo: '/Sponsers Logo/netapp.png', color: 'from-blue-400 to-blue-700' },
  { name: 'Noise', tier: 'Bronze', logo: '/Sponsers Logo/noise.jpg', color: 'from-blue-600 to-blue-900' },
  { name: 'NPCI', tier: 'Silver', logo: '/Sponsers Logo/npci.png', color: 'from-orange-500 to-red-500' },
  { name: 'Nucleus Software', tier: 'Gold', logo: '/Sponsers Logo/Nucleus-Software.webp', color: 'from-yellow-600 to-black' },
  { name: 'Odisha', tier: 'Bronze', logo: '/Sponsers Logo/odisha.png', color: 'from-blue-800 to-blue-900' },
  { name: 'Siemens', tier: 'Platinum', logo: '/Sponsers Logo/siemens.png', color: 'from-pink-600 to-purple-600' },
  { name: 'Siemens Healthineers', tier: 'Gold', logo: '/Sponsers Logo/siemens healthneers .png', color: 'from-blue-500 to-cyan-500' },
  { name: 'SMT', tier: 'Silver', logo: '/Sponsers Logo/smt.png', color: 'from-blue-500 to-green-500' },
  { name: 'Strategic Plans', tier: 'Bronze', logo: '/Sponsers Logo/strategic plans  (1).png', color: 'from-orange-500 to-yellow-500' },
  { name: 'Tata Projects', tier: 'Gold', logo: '/Sponsers Logo/tata projects .png', color: 'from-blue-600 to-purple-600' },
  { name: 'Unicorn India', tier: 'Silver', logo: '/Sponsers Logo/unicorn-india-venture-.png', color: 'from-blue-300 to-blue-600' },
  { name: 'V Trans', tier: 'Bronze', logo: '/Sponsers Logo/v trans .png', color: 'from-red-500 to-orange-500' },
  { name: 'WBS', tier: 'Silver', logo: '/Sponsers Logo/wbs.png', color: 'from-red-600 to-red-800' },
  { name: 'Workwise', tier: 'Bronze', logo: '/Sponsers Logo/workwise.jpeg', color: 'from-blue-700 to-blue-900' },
  { name: 'Zombie', tier: 'Bronze', logo: '/Sponsers Logo/zombie.png', color: 'from-blue-400 to-cyan-400' },
];

const tierColors = {
  Platinum: 'from-yellow-400 via-yellow-500 to-yellow-600',
  Gold: 'from-yellow-600 via-yellow-500 to-amber-500',
  Silver: 'from-gray-400 via-gray-300 to-gray-200',
  Bronze: 'from-amber-700 via-amber-600 to-amber-800',
};

// Group sponsors by tier
const platinumSponsors = sponsors.filter(s => s.tier === 'Platinum');
const goldSponsors = sponsors.filter(s => s.tier === 'Gold');
const silverSponsors = sponsors.filter(s => s.tier === 'Silver');
const bronzeSponsors = sponsors.filter(s => s.tier === 'Bronze');

export default function PreviousSponsors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Optimized parallax effects - reduced range to prevent excessive movement
  const row1Speed = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const row2Speed = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const row3Speed = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const row4Speed = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section 
      ref={sectionRef}
      id="previous-sponsors" 
      className="relative min-h-screen py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      
      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 md:px-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-white mb-4 sm:mb-6 tracking-tight px-4">
            OUR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              SPONSORS
            </span>
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Trusted by industry leaders worldwide
          </p>
        </motion.div>

        {/* Platinum Tier */}
        {platinumSponsors.length > 0 && (
          <div className="mb-12 sm:mb-16">
            
            <div className="relative overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <motion.div 
                style={{ x: row1Speed }}
                className="flex gap-8 px-8 animate-scroll-left"
              >
                {[...platinumSponsors, ...platinumSponsors, ...platinumSponsors].map((sponsor, index) => (
                  <SponsorCard key={`platinum-${sponsor.name}-${index}`} sponsor={sponsor} size="large" />
                ))}
              </motion.div>
            </div>
          </div>
        )}

        {/* Gold Tier */}
        {goldSponsors.length > 0 && (
          <div className="mb-12 sm:mb-16">
            
            <div className="relative overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <motion.div 
                style={{ x: row2Speed }}
                className="flex gap-6 px-8 animate-scroll-right"
              >
                {[...goldSponsors, ...goldSponsors, ...goldSponsors, ...goldSponsors].map((sponsor, index) => (
                  <SponsorCard key={`gold-${sponsor.name}-${index}`} sponsor={sponsor} size="medium" />
                ))}
              </motion.div>
            </div>
          </div>
        )}

        {/* Silver & Bronze Combined */}
        <div className="mb-12 sm:mb-16">
          
          {/* Silver Row */}
          {silverSponsors.length > 0 && (
            <div className="relative overflow-x-auto overflow-y-hidden mb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <motion.div 
                style={{ x: row3Speed }}
                className="flex gap-5 px-8 animate-scroll-left"
              >
                {[...silverSponsors, ...silverSponsors, ...silverSponsors, ...silverSponsors, ...silverSponsors].map((sponsor, index) => (
                  <SponsorCard key={`silver-${sponsor.name}-${index}`} sponsor={sponsor} size="small" />
                ))}
              </motion.div>
            </div>
          )}

          {/* Bronze Row */}
          {bronzeSponsors.length > 0 && (
            <div className="relative overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <motion.div 
                style={{ x: row4Speed }}
                className="flex gap-5 px-8 animate-scroll-right"
              >
                {[...bronzeSponsors, ...bronzeSponsors, ...bronzeSponsors, ...bronzeSponsors, ...bronzeSponsors].map((sponsor, index) => (
                  <SponsorCard key={`bronze-${sponsor.name}-${index}`} sponsor={sponsor} size="small" />
                ))}
              </motion.div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-8"
        >
          {[
            { label: 'Total Sponsors', value: '35+', icon: '🏢' },
            { label: 'Countries', value: '15+', icon: '🌍' },
            { label: 'Years of Partnership', value: '10+', icon: '🤝' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-8 bg-gradient-to-br from-red-900/30 via-red-800/20 to-red-900/30 rounded-2xl border border-red-500/40 backdrop-blur-md hover:border-red-500/60 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 mb-3">
                {stat.value}
              </div>
              <div className="text-white/70 text-base font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
          will-change: transform;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
          will-change: transform;
        }
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// Enhanced Sponsor Card Component - Logo as Background Tile
function SponsorCard({ sponsor, size = 'medium' }: { sponsor: typeof sponsors[0], size?: 'large' | 'medium' | 'small' }) {
  const sizeClasses = {
    large: 'h-64 w-96',
    medium: 'h-56 w-80',
    small: 'h-48 w-72',
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="flex-shrink-0 group cursor-pointer"
    >
      <div className={`relative ${sizeClasses[size]} rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-300 overflow-hidden shadow-lg group-hover:shadow-xl bg-white`}>
        {/* Logo as Main Visual - Large and Centered */}
        <div className="absolute inset-0 p-6 sm:p-8 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              fill
              sizes="(max-width: 768px) 288px, 384px"
              className="object-contain"
              loading="lazy"
              quality={85}
              style={{ 
                willChange: 'auto',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
