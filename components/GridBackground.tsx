
import React from 'react';

interface GridBackgroundProps {
  theme: 'light' | 'dark';
}

const GridBackground: React.FC<GridBackgroundProps> = ({ theme }) => {
  const dotColor = theme === 'dark' ? '#27272a' : '#e4e4e7';

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Drafting Dot Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Subtle Noise for texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GridBackground;
