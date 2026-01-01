import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingNavProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  displayCount: number;
}

const TablerIcon = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    home: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    user: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    link: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    briefcase: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    building: (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  };
  
  return icons[name] || null;
};

const FloatingNav: React.FC<FloatingNavProps> = ({ theme, toggleTheme, displayCount }) => {
  const [activeSection, setActiveSection] = useState('header');
  const [isFloating, setIsFloating] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const initialTopRef = useRef<number>(0);

  const navItems = [
    { id: 'header', label: 'Home', icon: 'home' },
    { id: 'about', label: 'About', icon: 'user' },
    { id: 'socials', label: 'Socials', icon: 'link' },
    { id: 'contributions', label: 'Activity', icon: 'chart' },
    { id: 'projects', label: 'Projects', icon: 'briefcase' },
    { id: 'experiences', label: 'Experience', icon: 'building' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Store initial position on first render
      if (navRef.current && initialTopRef.current === 0 && !isFloating) {
        const rect = navRef.current.getBoundingClientRect();
        initialTopRef.current = rect.top + currentScrollY;
      }
      
      // Make navbar floating after scrolling past its initial position
      if (initialTopRef.current > 0 && currentScrollY > initialTopRef.current - 20) {
        setIsFloating(true);
      } else if (currentScrollY <= initialTopRef.current - 20) {
        setIsFloating(false);
      }

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = currentScrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFloating]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      ref={navRef}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`${isFloating ? 'fixed top-4 left-1/2 -translate-x-1/2 z-50' : 'relative my-4'} ${
        theme === 'dark' 
          ? isFloating 
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-white/10 shadow-lg' 
            : 'bg-transparent border-white/10'
          : isFloating
          ? 'bg-white/90 backdrop-blur-md border-zinc-200 shadow-lg'
          : 'bg-transparent border-zinc-200'
      } border rounded-full px-4 py-2 inline-block`}
    >
      <div className="flex items-center gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              activeSection === item.id
                ? theme === 'dark'
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
                : theme === 'dark'
                ? 'text-zinc-400 hover:text-white hover:bg-white/10'
                : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
            }`}
          >
            <TablerIcon name={item.icon} className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{item.label}</span>
            {activeSection === item.id && (
              <motion.div
                layoutId="activeSection"
                className="absolute inset-0 rounded-full border-2 border-current opacity-20"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
        
        {/* Divider */}
        <div className={`h-6 w-px ${theme === 'dark' ? 'bg-white/10' : 'bg-zinc-300'}`} />
        
        {/* Views Counter */}
        <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-full transition-colors duration-500 ${
          theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-white border-black/10'
        }`}>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <AnimatePresence mode="wait">
            <motion.span 
              key={displayCount}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-[10px] font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}
            >
              {displayCount} VIEWS
            </motion.span>
          </AnimatePresence>
        </div>
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className={`transition-colors p-1.5 rounded-full ${theme === 'dark' ? 'text-zinc-500 hover:text-white hover:bg-white/10' : 'text-zinc-400 hover:text-black hover:bg-zinc-100'}`}
        >
          {theme === 'dark' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      </div>
    </motion.nav>
  );
};

export default FloatingNav;

