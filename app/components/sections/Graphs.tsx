'use client';

import { motion } from 'framer-motion';
import { memo, useState, useEffect } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, PieChart, Pie, XAxis, YAxis, Tooltip, LabelList } from 'recharts';
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
  { name: 'Creative Corner', value: 4.8, color: '#dc2626' },
  { name: 'Other', value: 9.5, color: '#991b1b' },
  { name: 'Mechanized', value: 9.5, color: '#b91c1c' },
  { name: 'Robotics', value: 14.3, color: '#ef4444' },
  { name: 'Quizzard', value: 14.3, color: '#f87171' },
  { name: 'Genesis', value: 4.8, color: '#7f1d1d' },
  { name: 'AI Realm', value: 14.3, color: '#fca5a5' },
  { name: 'Conceptualize', value: 9.5, color: '#dc2626' },
  { name: 'Code Enclave', value: 9.5, color: '#991b1b' },
  { name: 'Technology', value: 9.5, color: '#b91c1c' },
];

const donutData2 = [
  { name: 'North & Central', value: 9.3, color: '#dc2626' },
  { name: 'West Bengal', value: 21, color: '#ef4444' },
  { name: 'North East', value: 7, color: '#f87171' },
  { name: 'South India', value: 14, color: '#fca5a5' },
  { name: 'Odisha', value: 9.3, color: '#b91c1c' },
  { name: 'Bihar', value: 10.3, color: '#991b1b' },
  { name: 'Delhi-NCR', value: 15, color: '#7f1d1d' },
  { name: 'Mumbai + West India', value: 14, color: '#dc2626' },
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
        }}
      >
        <p className="text-red-400 font-bold">{`${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
});

CustomTooltip.displayName = 'CustomTooltip';

// Individual Chart Card Component for Mobile
function MobileChartCard({ 
  children, 
  title, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  title: string; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="relative bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl border border-red-500/30 shadow-xl shadow-red-500/20 overflow-hidden p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent rounded-2xl pointer-events-none" />
      <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 text-center relative z-10">
        <span className="text-red-500">{title.split(' ')[0]}</span> {title.split(' ').slice(1).join(' ')}
      </h3>
      <div className="relative z-10" style={{ minHeight: '250px', height: '100%', width: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Graphs() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.section
      id="graphs"
      className="relative min-h-screen py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
      style={{ 
        position: 'relative' as const, 
        zIndex: 10, 
        backgroundColor: '#000000'
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-8 sm:mb-12 md:mb-16 text-center px-4"
        >
          STATISTICS & DATA
        </motion.h2>

        {/* Mobile: Stacked Layout */}
        {isMobile ? (
          <div className="space-y-6 sm:space-y-8 md:hidden">
            {/* Row 1: Two Donut Charts Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <MobileChartCard title="Events Distribution" delay={0}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-black/95 border border-red-500/50 rounded-lg p-3 shadow-2xl shadow-red-500/20 pointer-events-none">
                              <p className="text-red-400 font-bold">{`${payload[0].name}: ${payload[0].value}%`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Pie
                      data={donutData1}
                      cx="50%"
                      cy="50%"
                      innerRadius="35%"
                      outerRadius="65%"
                      paddingAngle={3}
                      dataKey="value"
                      isAnimationActive={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {donutData1.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          style={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </MobileChartCard>

              <MobileChartCard title="Regional Participation" delay={0.05}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-black/95 border border-red-500/50 rounded-lg p-3 shadow-2xl shadow-red-500/20 pointer-events-none">
                              <p className="text-red-400 font-bold">{`${payload[0].name}: ${payload[0].value}%`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Pie
                      data={donutData2}
                      cx="50%"
                      cy="50%"
                      innerRadius="35%"
                      outerRadius="65%"
                      paddingAngle={3}
                      dataKey="value"
                      isAnimationActive={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      labelLine={false}
                    >
                      {donutData2.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          style={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </MobileChartCard>
            </div>

            <MobileChartCard title="Kascades Growth" delay={0.1}>
              <ResponsiveContainer width="100%" height={250}>
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
                    radius={[6, 6, 0, 0]}
                    isAnimationActive={false}
                  >
                    <defs>
                      <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#dc2626" />
                        <stop offset="100%" stopColor="#991b1b" />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </MobileChartCard>

            <MobileChartCard title="Instagram Growth" delay={0.15}>
              <ResponsiveContainer width="100%" height={250}>
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
                    radius={[6, 6, 0, 0]}
                    isAnimationActive={false}
                  >
                    <defs>
                      <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#dc2626" />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </MobileChartCard>

            <MobileChartCard title="Participants by Category" delay={0.2}>
              <ResponsiveContainer width="100%" height={250}>
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
                    radius={[6, 6, 0, 0]}
                    isAnimationActive={false}
                  >
                    <defs>
                      <linearGradient id="lightRedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f87171" />
                        <stop offset="100%" stopColor="#dc2626" />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </MobileChartCard>

            <MobileChartCard title="Regional Distribution" delay={0.25}>
              <ResponsiveContainer width="100%" height={250}>
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
                    radius={[6, 6, 0, 0]}
                    isAnimationActive={false}
                  >
                    <defs>
                      <linearGradient id="darkRedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#dc2626" />
                        <stop offset="100%" stopColor="#991b1b" />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </MobileChartCard>
          </div>
        ) : (
          /* Desktop: Bento Grid Layout */
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/20 overflow-hidden"
            style={{ 
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              minHeight: '600px', // Ensure container has minimum height for charts
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent rounded-2xl pointer-events-none" />
            
            <MagicBento className="relative z-10">
              {/* Donut Chart 1 - Events Distribution - Span 2 cols, 1 row */}
              <MagicBentoItem span={2} rowSpan={1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0, ease: "easeOut" }}
                  className="relative p-4 flex flex-col h-full border-r border-b border-red-500/20 overflow-hidden"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <h3 className="text-sm font-bold text-white mb-2 text-center relative z-10">
                    <span className="text-red-500">Events</span> Distribution
                  </h3>
                  <div className="relative flex-1 flex items-center justify-center" style={{ transform: 'translateZ(0)', minHeight: '200px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%" minHeight={200} minWidth={200}>
                      <PieChart>
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-black/95 border border-red-500/50 rounded-lg p-3 shadow-2xl shadow-red-500/20 pointer-events-none">
                                  <p className="text-red-400 font-bold text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Pie
                          data={donutData1}
                          cx="50%"
                          cy="50%"
                          innerRadius="40%"
                          outerRadius="70%"
                          paddingAngle={3}
                          dataKey="value"
                          isAnimationActive={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          labelLine={false}
                        >
                          {donutData1.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color}
                              style={{ cursor: 'pointer' }}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </MagicBentoItem>

              {/* Donut Chart 2 - Regional Participation - Span 1 col */}
              <MagicBentoItem span={1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
                  className="relative p-4 flex flex-col h-full border-r border-b border-red-500/20 overflow-hidden"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <h3 className="text-xs font-bold text-white mb-2 text-center relative z-10">
                    <span className="text-red-500">Regional</span> Participation
                  </h3>
                  <div className="relative flex-1 flex items-center justify-center" style={{ transform: 'translateZ(0)', minHeight: '200px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%" minHeight={200} minWidth={200}>
                      <PieChart>
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-black/95 border border-red-500/50 rounded-lg p-3 shadow-2xl shadow-red-500/20 pointer-events-none">
                                  <p className="text-red-400 font-bold text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Pie
                          data={donutData2}
                          cx="50%"
                          cy="50%"
                          innerRadius="40%"
                          outerRadius="70%"
                          paddingAngle={3}
                          dataKey="value"
                          isAnimationActive={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          labelLine={false}
                        >
                          {donutData2.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color}
                              style={{ cursor: 'pointer' }}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </MagicBentoItem>

              {/* Bar Chart 1 - Kascades Growth - Span 1 col */}
              <MagicBentoItem span={1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                  className="relative p-4 flex flex-col h-full border-b border-red-500/20 overflow-hidden"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <h3 className="text-xs font-bold text-white mb-2 text-center relative z-10">
                    <span className="text-red-500">Kascades</span> Growth
                  </h3>
                  <div className="relative flex-1" style={{ transform: 'translateZ(0)', minHeight: '200px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%" minHeight={200} minWidth={200}>
                      <BarChart data={barChartData1}>
                        <XAxis 
                          dataKey="name" 
                          stroke="#666"
                          tick={{ fill: '#999', fontSize: 11 }}
                          axisLine={{ stroke: '#333' }}
                        />
                        <YAxis 
                          stroke="#666"
                          tick={{ fill: '#999', fontSize: 11 }}
                          axisLine={{ stroke: '#333' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Bar 
                          dataKey="value" 
                          fill="url(#redGradient)"
                          radius={[6, 6, 0, 0]}
                          isAnimationActive={false}
                        >
                          <defs>
                            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#dc2626" />
                              <stop offset="100%" stopColor="#991b1b" />
                            </linearGradient>
                          </defs>
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </MagicBentoItem>

              {/* Bar Chart 2 - Instagram Growth - Span 4 cols to fill entire row */}
              <MagicBentoItem span={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                  className="relative p-4 flex flex-col h-full border-b border-red-500/20 overflow-hidden"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <h3 className="text-sm font-bold text-white mb-2 text-center relative z-10">
                    <span className="text-red-500">Instagram</span> Growth
                  </h3>
                  <div className="relative flex-1 flex items-center" style={{ transform: 'translateZ(0)', minHeight: '200px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%" minHeight={200} minWidth={200}>
                      <BarChart data={barChartData2}>
                        <XAxis 
                          dataKey="name" 
                          stroke="#666"
                          tick={{ fill: '#999', fontSize: 11 }}
                          axisLine={{ stroke: '#333' }}
                        />
                        <YAxis 
                          stroke="#666"
                          tick={{ fill: '#999', fontSize: 11 }}
                          axisLine={{ stroke: '#333' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Bar 
                          dataKey="followers" 
                          fill="url(#pinkGradient)"
                          radius={[6, 6, 0, 0]}
                          isAnimationActive={false}
                        >
                          <defs>
                            <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="100%" stopColor="#dc2626" />
                            </linearGradient>
                          </defs>
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </MagicBentoItem>

              {/* Bar Chart 3 - Participants by Category - Span 1 col */}
              <MagicBentoItem span={1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                  className="relative p-4 flex flex-col h-full border-r border-b border-red-500/20 overflow-hidden"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <h3 className="text-xs font-bold text-white mb-2 text-center relative z-10">
                    <span className="text-red-500">Participants</span> by Category
                  </h3>
                  <div className="relative flex-1" style={{ transform: 'translateZ(0)', minHeight: '200px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%" minHeight={200} minWidth={200}>
                      <BarChart data={barChartData3}>
                        <XAxis 
                          dataKey="category" 
                          stroke="#666"
                          tick={{ fill: '#999', fontSize: 11 }}
                          axisLine={{ stroke: '#333' }}
                        />
                        <YAxis 
                          stroke="#666"
                          tick={{ fill: '#999', fontSize: 11 }}
                          axisLine={{ stroke: '#333' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Bar 
                          dataKey="participants" 
                          fill="url(#lightRedGradient)"
                          radius={[6, 6, 0, 0]}
                          isAnimationActive={false}
                        >
                          <defs>
                            <linearGradient id="lightRedGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#f87171" />
                              <stop offset="100%" stopColor="#dc2626" />
                            </linearGradient>
                          </defs>
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </MagicBentoItem>

              {/* Bar Chart 4 - Regional Distribution - Span 3 cols to fill remaining space */}
              <MagicBentoItem span={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
                  className="relative p-4 flex flex-col h-full border-red-500/20 overflow-hidden"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <h3 className="text-sm font-bold text-white mb-2 text-center relative z-10">
                    <span className="text-red-500">Regional</span> Distribution
                  </h3>
                  <div className="relative flex-1" style={{ transform: 'translateZ(0)', minHeight: '200px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%" minHeight={200} minWidth={200}>
                      <BarChart data={barChartData4}>
                        <XAxis 
                          dataKey="region" 
                          stroke="#666"
                          tick={{ fill: '#999', fontSize: 11 }}
                          axisLine={{ stroke: '#333' }}
                        />
                        <YAxis 
                          stroke="#666"
                          tick={{ fill: '#999', fontSize: 11 }}
                          axisLine={{ stroke: '#333' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Bar 
                          dataKey="colleges" 
                          fill="url(#darkRedGradient)"
                          radius={[6, 6, 0, 0]}
                          isAnimationActive={false}
                        >
                          <defs>
                            <linearGradient id="darkRedGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#dc2626" />
                              <stop offset="100%" stopColor="#991b1b" />
                            </linearGradient>
                          </defs>
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </MagicBentoItem>
            </MagicBento>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
