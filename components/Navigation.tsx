
import React from 'react';
import { motion } from 'framer-motion';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = Object.values(TabType);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[80]">
      <div className="flex items-center gap-1 p-1 bg-[#121212]/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-5 py-2 text-xs font-medium transition-colors duration-300 focus:outline-none"
          >
            {activeTab === tab && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={`relative z-10 ${activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/60'}`}>
              {tab}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
