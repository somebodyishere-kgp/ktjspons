'use client';

import { motion } from 'framer-motion';
import TiltedCard from '@/components/ui/TiltedCard';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Tech Lead',
    image: '/photos/DSC00512.JPG',
    description: 'Leading innovation and technical excellence',
    social: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    }
  },
  {
    name: 'Jane Smith',
    role: 'Design Director',
    image: '/photos/DSC00512.JPG',
    description: 'Crafting exceptional user experiences',
    social: {
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith',
    }
  },
  {
    name: 'Mike Johnson',
    role: 'Event Coordinator',
    image: '/photos/DSC00518.JPG',
    description: 'Organizing world-class events',
    social: {
      linkedin: 'https://linkedin.com/in/mikejohnson',
      github: 'https://github.com/mikejohnson',
    }
  },
  {
    name: 'Sarah Williams',
    role: 'Marketing Head',
    image: '/photos/DSC00530.JPG',
    description: 'Building brand presence and engagement',
    social: {
      linkedin: 'https://linkedin.com/in/sarahwilliams',
      github: 'https://github.com/sarahwilliams',
    }
  },
];

export default function Team() {
  return (
    <section id="team" className="relative min-h-screen py-32 px-8 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">TEAM</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            Meet the passionate individuals driving KSHITIJ 2026 forward
          </p>
        </motion.div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-gray-950 via-black to-gray-950 rounded-2xl p-6 border border-red-500/20 hover:border-red-500/50 transition-all duration-500 overflow-hidden group">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Tilted Card */}
                <div className="relative mb-6">
                  <TiltedCard
                    imageSrc={member.image}
                    altText={member.name}
                    captionText={member.name}
                    containerHeight="280px"
                    containerWidth="100%"
                    imageHeight="280px"
                    imageWidth="100%"
                    scaleOnHover={1.03}
                    rotateAmplitude={4}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={false}
                  />
                </div>

                {/* Member Info */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-red-400/80 text-sm font-medium mb-3 uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 hover:border-blue-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-700/20 hover:bg-gray-700/40 border border-gray-500/30 hover:border-gray-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

