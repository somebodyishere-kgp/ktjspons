'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactElement } from 'react';

interface SocialLink {
  name: string;
  href: string;
  icon: ReactElement;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/kshitij-iit-kharagpur/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
      </svg>
    ),
    color: 'from-blue-600 to-blue-700',
  },
  {
    name: 'Twitter/X',
    href: 'https://x.com/ktj_iitkgp?s=21',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: 'from-gray-800 to-gray-900',
  },
  {
    name: 'WhatsApp',
    href: 'https://whatsapp.com/channel/0029VakSSuO9WtC2nNK05n0P',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    ),
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/g/1JeTzpNJKx/?mibextid=wwXIfr',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
    color: 'from-blue-600 to-blue-800',
  },
  {
    name: 'Threads',
    href: 'https://www.threads.com/@ktj.iitkgp?igshid=NTc4MTIwNjQ2YQ==',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.186 0C8.74 0 5.313.028 1.872.09c-.25.002-.4.126-.5.38-.09.24-.1.5-.1.76v5.31c0 .8.3 1.52.9 2.11.6.6 1.33.9 2.13.9h.38c.24 0 .48-.1.66-.28.18-.18.28-.42.28-.66v-3.9c2.46-.06 4.91-.08 7.36-.08 2.46 0 4.91.02 7.36.08v3.9c0 .24.1.48.28.66.18.18.42.28.66.28h.38c.8 0 1.53-.3 2.13-.9.6-.59.9-1.31.9-2.11V1.23c0-.26-.01-.52-.1-.76-.1-.254-.25-.378-.5-.38C18.687.028 15.26 0 11.814 0h.372zm-.37 4.98c-2.48 0-4.94.1-7.38.3v11.44c0 .8.3 1.52.9 2.11.6.6 1.33.9 2.13.9h13.44c.8 0 1.53-.3 2.13-.9.6-.59.9-1.31.9-2.11V5.28c-2.44-.2-4.9-.3-7.38-.3h-.74zm.37 3.9c.24 0 .48.1.66.28.18.18.28.42.28.66v5.54c0 .24-.1.48-.28.66-.18.18-.42.28-.66.28-.24 0-.48-.1-.66-.28-.18-.18-.28-.42-.28-.66V9.82c0-.24.1-.48.28-.66.18-.18.42-.28.66-.28z" />
      </svg>
    ),
    color: 'from-gray-800 to-gray-900',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/ktj.iitkgp?igsh=MWI5NDIxdTE1Nnpweg==',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.143-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.143-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.467.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
    color: 'from-purple-600 via-pink-500 to-orange-500',
  },
];

const quickLinks = [
  { name: 'About Us', href: '#who-are-we' },
  { name: 'Why Associate', href: '#why-associate' },
  { name: 'Events', href: '#events' },
  { name: 'Sponsors', href: '#previous-sponsors' },
  { name: 'Glimpses', href: '#glimpses' },
  { name: 'Contact', href: '#sponsor-us' },
];

const resources = [
  { name: 'Seventy Five Years', href: '#seventy-five-years' },
  { name: 'Graphs', href: '#graphs' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-red-500/20">
      {/* Opaque background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black backdrop-blur-xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                KSHITIJ
              </span>
            </h3>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Asia&apos;s Largest Techno-Management Symposium. Connecting innovation, technology, and excellence at IIT Kharagpur.
            </p>
            
            {/* Social Media Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${social.color} flex items-center justify-center text-white hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300`}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-red-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="text-white font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <motion.li
                  key={resource.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={resource.href}
                    className="text-white/70 hover:text-red-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {resource.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">📧</span>
                <a
                  href="mailto:kshitij@iitkgp.ac.in"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  kshitij@iitkgp.ac.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">📍</span>
                <span>IIT Kharagpur, West Bengal, India</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">🏛️</span>
                <span>Indian Institute of Technology Kharagpur</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-500/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/60 text-sm text-center md:text-left"
            >
              © {currentYear} KSHITIJ, IIT Kharagpur. All rights reserved.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-6 text-white/60 text-sm"
            >
              <Link
                href="#"
                className="hover:text-red-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                href="#"
                className="hover:text-red-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <span>•</span>
              <Link
                href="#"
                className="hover:text-red-400 transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </motion.div>
          </div>

          {/* Made with love */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-white/50 text-xs">
              Made with <span className="text-red-500">❤️</span> by the KSHITIJ Team
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

