'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface FormErrors {
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}

const stats = [
  { label: 'Years of Excellence', value: '20+', icon: '📅' },
  { label: 'Sponsor Partners', value: '50+', icon: '🤝' },
  { label: 'Student Reach', value: '70K+', icon: '👥' },
  { label: 'Media Coverage', value: '100+', icon: '📰' },
];

export default function SponsorUs() {
  const [activeField, setActiveField] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ email: '', phone: '', company: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      setErrors({ 
        ...errors, 
        message: 'Failed to send message. Please try again later.' 
      });
    }
  };

  const messageLength = formData.message.length;
  const maxMessageLength = 500;

  return (
    <section id="sponsor-us" className="relative min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="text-white">SPONSOR </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              US
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto px-4"
          >
            Join us in creating the most memorable tech festival experience.
            Partner with excellence and reach thousands of future innovators.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-red-900/20 via-red-800/10 to-red-900/20 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-red-500/30 shadow-2xl shadow-red-500/20">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-red-500">📧</span>
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                {[
                  {
                    icon: '📧',
                    label: 'Email',
                    value: 'kshitij@iitkgp.ac.in',
                    href: 'mailto:kshitij@iitkgp.ac.in',
                    gradient: 'from-red-600 to-red-700',
                  },
                  {
                    icon: '📞',
                    label: 'Phone',
                    value: '+91-XXX-XXX-XXXX',
                    href: 'tel:+91XXXXXXX',
                    gradient: 'from-red-700 to-red-800',
                  },
                  {
                    icon: '📍',
                    label: 'Location',
                    value: 'IIT Kharagpur, India',
                    href: '#',
                    gradient: 'from-red-800 to-red-900',
                  },
                ].map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 transition-all duration-300 group"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{contact.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-sm mb-1">{contact.label}</p>
                      <p className="text-white font-medium group-hover:text-red-400 transition-colors duration-300">
                        {contact.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-red-500/20">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-red-400">✨</span>
                  Why Partner With Us?
                </h4>
                <ul className="space-y-3 text-white/70">
                  {[
                    'Reach 70,000+ engaged students annually',
                    '35+ participating colleges across India',
                    'Premier IIT brand association',
                    'High-impact visibility and engagement',
                    'Year-round publicity campaigns',
                  ].map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-red-400 mt-1 flex-shrink-0">✓</span>
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-red-500/30 shadow-2xl shadow-red-500/20"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-red-500">✉️</span>
              Send Us a Message
            </h3>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                    className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-4xl"
                  >
                    ✓
                  </motion.div>
                  <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-white/70">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    {
                      name: 'email',
                      label: 'Email Address',
                      type: 'email',
                      placeholder: 'your.email@company.com',
                      icon: '📧',
                    },
                    {
                      name: 'phone',
                      label: 'Phone Number',
                      type: 'tel',
                      placeholder: '+91-1234-567-890',
                      icon: '📞',
                    },
                    {
                      name: 'company',
                      label: 'Company Name',
                      type: 'text',
                      placeholder: 'Your Company Name',
                      icon: '🏢',
                    },
                  ].map((field) => (
                    <motion.div
                      key={field.name}
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      <label className="block text-white/80 mb-2 text-sm font-medium flex items-center gap-2">
                        <span>{field.icon}</span>
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          onFocus={() => setActiveField(field.name)}
                          onBlur={() => setActiveField('')}
                          className={`w-full px-4 py-3.5 bg-white/10 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-all text-sm md:text-base ${
                            errors[field.name as keyof FormErrors]
                              ? 'border-red-500 focus:ring-2 focus:ring-red-500/50'
                              : activeField === field.name
                              ? 'border-red-500 focus:ring-2 focus:ring-red-500/50'
                              : 'border-white/20 hover:border-white/30'
                          }`}
                        />
                        {activeField === field.name && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                          />
                        )}
                      </div>
                      <AnimatePresence>
                        {errors[field.name as keyof FormErrors] && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-400 text-xs mt-1 flex items-center gap-1"
                          >
                            <span>⚠️</span>
                            {errors[field.name as keyof FormErrors]}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <label className="block text-white/80 mb-2 text-sm font-medium flex items-center gap-2">
                      <span>💬</span>
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell us about your interest in sponsoring KSHITIJ 2026..."
                        onFocus={() => setActiveField('message')}
                        onBlur={() => setActiveField('')}
                        maxLength={maxMessageLength}
                        className={`w-full px-4 py-3.5 bg-white/10 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-all resize-none text-sm md:text-base ${
                          errors.message
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/50'
                            : activeField === 'message'
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/50'
                            : 'border-white/20 hover:border-white/30'
                        }`}
                      />
                      {activeField === 'message' && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-400 text-xs flex items-center gap-1"
                          >
                            <span>⚠️</span>
                            {errors.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <p className={`text-xs ml-auto ${
                        messageLength > maxMessageLength * 0.9
                          ? 'text-red-400'
                          : 'text-white/50'
                      }`}>
                        {messageLength} / {maxMessageLength}
                      </p>
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 0 40px rgba(220, 38, 38, 0.6)' } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`w-full py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-bold text-lg rounded-xl transition-all relative overflow-hidden group ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-red-700 hover:via-red-800 hover:to-red-900'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </>
                      )}
                    </span>
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-800 to-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
}
