'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useMemo, memo } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, PieChart, Pie, XAxis, YAxis, Tooltip } from 'recharts';
import { MagicBento, MagicBentoItem } from '@/components/ui/magic-bento';

const barChartData1 = [
  { name: '2022', value: 11 },
  { name: '2023', value: 21 },
  { name: '2024', value: 19 },
  { name: '2025', value: 35 },
];

const barChartData2 = [
  { name: 'Jan', followers: 14000 },
  { name: 'Jun', followers: 16000 },
  { name: 'Dec', followers: 19000 },
];

const barChartData3 = [
  { category: 'Tech', participants: 450 },
  { category: 'AI/ML', participants: 320 },
  { category: 'Hardware', participants: 280 },
  { category: 'Other', participants: 150 },
];

const barChartData4 = [
  { region: 'West Bengal', colleges: 21 },
  { region: 'Delhi-NCR', colleges: 15 },
  { region: 'Mumbai', colleges: 12 },
  { region: 'Bangalore', colleges: 10 },
  { region: 'Others', colleges: 42 },
];

const donutData1 = [
  { name: 'Robotics', value: 14.3, color: '#dc2626' },
  { name: 'AI Realm', value: 14.3, color: '#ef4444' },
  { name: 'Tech', value: 21, color: '#f87171' },
  { name: 'Other', value: 50.4, color: '#991b1b' },
];

const donutData2 = [
  { name: 'West Bengal', value: 21, color: '#dc2626' },
  { name: 'Delhi-NCR', value: 15, color: '#ef4444' },
  { name: 'Mumbai', value: 12, color: '#f87171' },
  { name: 'Others', value: 52, color: '#991b1b' },
];

// Memoized custom tooltip to prevent re-renders
const CustomTooltip = memo(({ active, payload }: { active?: boolean, payload?: Array<{ value: number }> }) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="bg-black/95 border border-red-500/50 rounded-lg p-3 shadow-2xl shadow-red-500/20 pointer-events-none"
        style={{ 
          backdropFilter: 'none',
          transform: 'translateZ(0)',
          willChange: 'auto',
        }}
      >
        <p className="text-red-400 font-bold">{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
});

CustomTooltip.displayName = 'CustomTooltip';

export default function Graphs() {
  // Hover states for interactive charts - using single object to reduce re-renders
  const [hoverStates, setHoverStates] = useState<{
    donut1: number | null;
    donut2: number | null;
    bar1: number | null;
    bar2: number | null;
    bar3: number | null;
    bar4: number | null;
  }>({
    donut1: null,
    donut2: null,
    bar1: null,
    bar2: null,
    bar3: null,
    bar4: null,
  });

  // Memoized hover handlers to prevent re-renders
  const handleDonut1Hover = useCallback((index: number | null) => {
    setHoverStates(prev => ({ ...prev, donut1: index }));
  }, []);

  const handleDonut2Hover = useCallback((index: number | null) => {
    setHoverStates(prev => ({ ...prev, donut2: index }));
  }, []);

  const handleBar1Hover = useCallback((index: number | null) => {
    setHoverStates(prev => ({ ...prev, bar1: index }));
  }, []);

  const handleBar2Hover = useCallback((index: number | null) => {
    setHoverStates(prev => ({ ...prev, bar2: index }));
  }, []);

  const handleBar3Hover = useCallback((index: number | null) => {
    setHoverStates(prev => ({ ...prev, bar3: index }));
  }, []);

  const handleBar4Hover = useCallback((index: number | null) => {
    setHoverStates(prev => ({ ...prev, bar4: index }));
  }, []);

  return (
    <motion.section
      id="graphs"
      className="relative min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
      style={{ 
        position: 'relative' as const, 
        zIndex: 10, 
        backgroundColor: '#000000'
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 text-center px-4"
        >
          STATISTICS & DATA
        </motion.h2>

        {/* Single Card Container for All Graphs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/20 overflow-hidden hover:shadow-red-500/30 transition-all duration-500"
          style={{ 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'auto',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent rounded-2xl" />
          
          {/* Static border glow - removed infinite animation for better performance */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-30"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.15), transparent)',
              transform: 'translateZ(0)',
              willChange: 'auto',
              pointerEvents: 'none',
            }}
          />
          
          {/* Subtle animated shine effect - CSS animation instead of JS */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'linear-gradient(110deg, transparent 40%, rgba(220, 38, 38, 0.2) 50%, transparent 60%)',
              transform: 'translateZ(0)',
              pointerEvents: 'none',
            }}
          />
          
          {/* Bento Grid Layout using Magic Bento Component */}
          <MagicBento className="relative z-10">
          {/* Donut Chart 1 - Events Distribution - Responsive span */}
          <MagicBentoItem span={2} rowSpan={1} className="sm:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0, ease: "easeOut" }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
              className="relative p-2 sm:p-3 md:p-4 flex flex-col h-full border-r border-b border-red-500/20 hover:border-red-500/40 transition-all duration-200 group overflow-hidden"
              style={{ transform: 'translateZ(0)' }}
            >
              {/* Enhanced glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Decorative accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="text-xs sm:text-sm font-bold text-white mb-1 text-center relative z-10">
                <span className="text-red-500">Events</span> Distribution
              </h3>
              <div className="relative flex-1 flex items-center justify-center" style={{ transform: 'translateZ(0)' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={150}>
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Pie
                      data={donutData1}
                      cx="50%"
                      cy="50%"
                      innerRadius="40%"
                      outerRadius="70%"
                      paddingAngle={3}
                      dataKey="value"
                      isAnimationActive={false}
                    >
                      {donutData1.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          onMouseEnter={() => handleDonut1Hover(index)}
                          onMouseLeave={() => handleDonut1Hover(null)}
                          className="transition-all duration-200"
                          style={{ 
                            transform: 'translateZ(0)',
                            cursor: 'pointer',
                          }} 
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </MagicBentoItem>

          {/* Donut Chart 2 - Regional Participation - Span 1 col */}
          <MagicBentoItem span={1} className="sm:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
              className="relative p-2 sm:p-3 md:p-4 flex flex-col h-full border-r border-b border-red-500/20 hover:border-red-500/40 transition-all duration-200 group"
              style={{ transform: 'translateZ(0)' }}
            >
              <h3 className="text-xs font-bold text-white mb-1 text-center relative z-10">
                <span className="text-red-500">Regional</span> Participation
              </h3>
              <div className="relative flex-1 flex items-center justify-center" style={{ transform: 'translateZ(0)' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={150}>
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Pie
                      data={donutData2}
                      cx="50%"
                      cy="50%"
                      innerRadius="40%"
                      outerRadius="70%"
                      paddingAngle={3}
                      dataKey="value"
                      isAnimationActive={false}
                    >
                      {donutData2.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="transition-all duration-200"
                          style={{ 
                            transform: 'translateZ(0)',
                            cursor: 'pointer',
                          }} 
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </MagicBentoItem>

          {/* Bar Chart 1 - Kascades Growth - Span 1 col */}
          <MagicBentoItem span={1} className="sm:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
              className="relative p-2 sm:p-3 md:p-4 flex flex-col h-full border-b border-red-500/20 hover:border-red-500/40 transition-all duration-200 group"
              style={{ transform: 'translateZ(0)' }}
            >
              <h3 className="text-xs font-bold text-white mb-1 text-center relative z-10">
                <span className="text-red-500">Kascades</span> Growth
              </h3>
              <div className="relative flex-1" style={{ transform: 'translateZ(0)' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={150}>
                  <BarChart data={barChartData1}>
                    <XAxis 
                      dataKey="name" 
                      stroke="#666"
                      tick={{ fill: '#999', fontSize: 10 }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <YAxis 
                      stroke="#666"
                      tick={{ fill: '#999', fontSize: 10 }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Bar 
                      dataKey="value" 
                      fill="url(#redGradient)"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive={false}
                    >
                      <defs>
                        <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#dc2626" />
                          <stop offset="100%" stopColor="#991b1b" />
                        </linearGradient>
                      </defs>
                      {barChartData1.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          className="transition-all duration-200"
                          style={{ 
                            transform: 'translateZ(0)',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </MagicBentoItem>

          {/* Bar Chart 2 - Instagram Growth - Span full width on mobile, 4 cols on desktop */}
          <MagicBentoItem span={4} className="sm:col-span-2 md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
              className="relative p-2 sm:p-3 md:p-4 flex flex-col h-full border-b border-red-500/20 hover:border-red-500/40 transition-all duration-200 group"
              style={{ transform: 'translateZ(0)' }}
            >
              <h3 className="text-xs sm:text-sm font-bold text-white mb-1 text-center relative z-10">
                <span className="text-red-500">Instagram</span> Growth
              </h3>
              <div className="relative flex-1 flex items-center" style={{ transform: 'translateZ(0)' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={150}>
                  <BarChart data={barChartData2}>
                    <XAxis 
                      dataKey="name" 
                      stroke="#666"
                      tick={{ fill: '#999', fontSize: 10 }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <YAxis 
                      stroke="#666"
                      tick={{ fill: '#999', fontSize: 10 }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Bar 
                      dataKey="followers" 
                      fill="url(#pinkGradient)"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive={false}
                    >
                      <defs>
                        <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#dc2626" />
                        </linearGradient>
                      </defs>
                      {barChartData2.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          className="transition-all duration-200"
                          style={{ 
                            transform: 'translateZ(0)',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </MagicBentoItem>

          {/* Bar Chart 3 - Participants by Category - Span 1 col */}
          <MagicBentoItem span={1} className="sm:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
              className="relative p-2 sm:p-3 md:p-4 flex flex-col h-full border-r border-b border-red-500/20 hover:border-red-500/40 transition-all duration-200 group"
              style={{ transform: 'translateZ(0)' }}
            >
              <h3 className="text-xs font-bold text-white mb-1 text-center relative z-10">
                <span className="text-red-500">Participants</span> by Category
              </h3>
              <div className="relative flex-1" style={{ transform: 'translateZ(0)' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={150}>
                  <BarChart data={barChartData3}>
                    <XAxis 
                      dataKey="category" 
                      stroke="#666"
                      tick={{ fill: '#999', fontSize: 10 }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <YAxis 
                      stroke="#666"
                      tick={{ fill: '#999', fontSize: 10 }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Bar 
                      dataKey="participants" 
                      fill="url(#lightRedGradient)"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive={false}
                    >
                      <defs>
                        <linearGradient id="lightRedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f87171" />
                          <stop offset="100%" stopColor="#dc2626" />
                        </linearGradient>
                      </defs>
                      {barChartData3.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          className="transition-all duration-200"
                          style={{ 
                            transform: 'translateZ(0)',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </MagicBentoItem>

          {/* Bar Chart 4 - Regional Distribution - Span 3 cols to fill remaining space */}
          <MagicBentoItem span={3} className="sm:col-span-2 md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
              whileHover={{ scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
              className="relative p-2 sm:p-3 md:p-4 flex flex-col h-full border-red-500/20 hover:border-red-500/40 transition-all duration-200 group"
              style={{ transform: 'translateZ(0)' }}
            >
              <h3 className="text-xs sm:text-sm font-bold text-white mb-1 text-center relative z-10">
                <span className="text-red-500">Regional</span> Distribution
              </h3>
              <div className="relative flex-1" style={{ transform: 'translateZ(0)' }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={150}>
                  <BarChart data={barChartData4}>
                    <XAxis 
                      dataKey="region" 
                      stroke="#666"
                      tick={{ fill: '#999', fontSize: 10 }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <YAxis 
                      stroke="#666"
                      tick={{ fill: '#999', fontSize: 10 }}
                      axisLine={{ stroke: '#333' }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Bar 
                      dataKey="colleges" 
                      fill="url(#darkRedGradient)"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive={false}
                    >
                      <defs>
                        <linearGradient id="darkRedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#dc2626" />
                          <stop offset="100%" stopColor="#991b1b" />
                        </linearGradient>
                      </defs>
                      {barChartData4.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          className="transition-all duration-200"
                          style={{ 
                            transform: 'translateZ(0)',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </MagicBentoItem>
          </MagicBento>
        </motion.div>
      </div>
    </motion.section>
  );
}
