
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GridBackground from './components/GridBackground';
import ContributionGraph from './components/ContributionGraph';
import SocialHoverCard from './components/SocialHoverCard';
import ProjectExplorer from './components/ProjectExplorer';
import FloatingNav from './components/FloatingNav';
import { RESUME_DATA, TECHNICAL_SKILLS } from './constants';
import profileImage from './assets/image0.jpg';
import turkishFlag from './assets/turkey-square-national-flag-vector.jpg';
import linkedinProfileImage from './assets/1754877573002.jpg';
import githubProfileImage from './assets/77180172.jpg';
import resumePdf from './assets/Mustafa Enes Nalbantoglu Resume Real.pdf?url';

const PlusSymbol = ({ className }: { className?: string }) => (
  <div className={`absolute w-5 h-5 flex items-center justify-center font-bold z-20 pointer-events-none ${className}`}>
    <span className="text-[18px] leading-none select-none">+</span>
  </div>
);

const HatchedDivider = ({ theme }: { theme: 'light' | 'dark' }) => {
  const stripeColor = theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
  const borderColor = theme === 'dark' ? 'border-zinc-800' : 'border-zinc-300';
  
  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className={`absolute left-0 right-0 h-8 border-b border-dashed ${borderColor}`}
        style={{
          backgroundImage: `linear-gradient(45deg, ${stripeColor} 25%, transparent 25%, transparent 50%, ${stripeColor} 50%, ${stripeColor} 75%, transparent 75%, transparent)`,
          backgroundSize: '10px 10px',
          width: '100vw',
          left: '50%',
          marginLeft: '-50vw'
        }}
      />
    </div>
  );
};

const DraftingSection = ({ 
  children, 
  theme, 
  last = false,
  isHeader = false,
  id
}: { 
  children?: React.ReactNode; 
  theme: 'light' | 'dark';
  last?: boolean;
  isHeader?: boolean;
  id?: string;
}) => {
  const borderColor = theme === 'dark' ? 'border-zinc-800' : 'border-zinc-300';

  return (
    <>
      {isHeader && <HatchedDivider theme={theme} />}
      <div id={id} className={`relative px-6 md:px-10 py-5 border-b border-dashed ${borderColor} ${last ? 'border-b-0' : ''} scroll-mt-20`}>
        {children}
      </div>
      {!last && <HatchedDivider theme={theme} />}
    </>
  );
};

const InfoIcon = ({ icon, theme }: { icon: React.ReactNode, theme: 'light' | 'dark' }) => {
  return (
    <div className={`relative flex items-center justify-center w-9 h-9 shrink-0 transition-colors duration-500 ${
      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
    }`}>
      <div className={`absolute inset-0 border rounded-xl transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#111111] border-white/5' : 'bg-zinc-50 border-zinc-200'
      }`} />
      <div className="relative z-10 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
};

const ASUTrident = () => (
  <a 
    href="https://asu.edu" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="inline-flex items-center align-middle mr-1"
  >
    <motion.img 
      src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Arizona_State_Sun_Devils_logo.svg/1200px-Arizona_State_Sun_Devils_logo.svg.png" 
      alt="ASU Trident" 
      className="h-[1.5em] w-auto"
      whileHover={{ rotate: 15, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    />
  </a>
);

const InfoRow = ({ icon, text, theme, secondaryText, secondaryIcon }: { icon: React.ReactNode, text: string, theme: 'light' | 'dark', secondaryText?: string, secondaryIcon?: React.ReactNode }) => {
  const parts = text.split('Arizona State University');
  const renderedText = parts.length > 1 ? (
    <>
      {parts[0]} <ASUTrident /><span className="text-[#f6ad55]">Arizona State University</span> {parts[1]}
    </>
  ) : text;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 w-full group">
      <div className="flex items-center gap-3 flex-1">
        <InfoIcon theme={theme} icon={icon} />
        <span className={`text-[13px] font-normal tracking-tight ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-800'}`}>
          {renderedText}
        </span>
      </div>
      {secondaryText && (
        <div className="flex items-center gap-3 flex-1 md:justify-start">
          <InfoIcon theme={theme} icon={secondaryIcon} />
          <div className="flex items-center gap-2">
             <span className={`text-[13px] font-normal tracking-tight ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-800'}`}>
                {secondaryText.split(' // ')[0]}
             </span>
             {secondaryText.includes(' // ') && (
               <span className={`text-[10px] font-light ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                 // {secondaryText.split(' // ')[1]}
               </span>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [viewCount, setViewCount] = useState(124);
  const [displayCount, setDisplayCount] = useState(124);
  const [isLoadingViews, setIsLoadingViews] = useState(true);
  
  // Real view counter using CountAPI
  useEffect(() => {
    const counterKey = 'mustafa-enes-portfolio-views';
    
    const fetchAndIncrementViews = async () => {
      try {
        // Get current count
        const getResponse = await fetch(`https://api.countapi.xyz/get/portfolio/${counterKey}`);
        const getData = await getResponse.json();
        const currentCount = getData.value || 124;
        
        // Check if we've already incremented this session
        const sessionKey = `viewed_${counterKey}`;
        const hasViewed = sessionStorage.getItem(sessionKey);
        
        if (!hasViewed) {
          // Increment the count
          const hitResponse = await fetch(`https://api.countapi.xyz/hit/portfolio/${counterKey}`);
          const hitData = await hitResponse.json();
          const newCount = hitData.value || currentCount + 1;
          
          // Mark as viewed for this session
          sessionStorage.setItem(sessionKey, 'true');
          
          setViewCount(newCount);
          setDisplayCount(currentCount);
          
          // Animate to new count
          const duration = 1000;
          const startTime = Date.now();
          const startValue = currentCount;
          const endValue = newCount;
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
            setDisplayCount(current);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayCount(endValue);
            }
          };
          
          requestAnimationFrame(animate);
        } else {
          // Already viewed this session, just display current count
          setViewCount(currentCount);
          setDisplayCount(currentCount);
        }
        
        setIsLoadingViews(false);
      } catch (error) {
        console.error('Error fetching view count:', error);
        // Fallback to localStorage
        const storedCount = localStorage.getItem('viewCount');
        const initialCount = storedCount ? parseInt(storedCount, 10) : 124;
        const newCount = initialCount + 1;
        setViewCount(newCount);
        setDisplayCount(initialCount);
        localStorage.setItem('viewCount', newCount.toString());
        
        // Animate to new count
        const duration = 1000;
        const startTime = Date.now();
        const startValue = initialCount;
        const endValue = newCount;
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
          setDisplayCount(current);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplayCount(endValue);
          }
        };
        
        requestAnimationFrame(animate);
        setIsLoadingViews(false);
      }
    };
    
    fetchAndIncrementViews();
  }, []);
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Mustafa Enes Nalbantoglu Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const workExp = RESUME_DATA.find(c => c.id === 'work')?.items || [];
  
  const projectsData = [
    {
      id: 'p1',
      name: 'Resume Analyzer AI',
      description: 'Developed an automated Resume Screening tool using NLP techniques to quantify alignment...',
      stack: ['Python', 'NLP', 'TF-IDF', 'Cosine Similarity'],
      lastUpdated: 'Dec 27, 2025',
      link: '#'
    },
    {
      id: 'p2',
      name: 'Personal Portfolio Hub',
      description: 'A high-aesthetic, utility-focused professional dashboard with clean animations...',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      lastUpdated: 'Dec 21, 2025',
      link: '#'
    },
    {
      id: 'p3',
      name: 'topaz.tools',
      description: 'Internal utility tools for design and performance auditing...',
      stack: ['TypeScript'],
      lastUpdated: 'Dec 21, 2025',
      link: '#'
    }
  ];

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#0a0a0a' : '#fafafa';
    document.body.style.color = theme === 'dark' ? '#e5e7eb' : '#18181b';
  }, [theme]);

  const [socialData, setSocialData] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Enes-Nal');
        if (response.ok) {
          const data = await response.json();
          setSocialData(prev => ({
            ...prev,
            GitHub: {
              bio: data.bio || 'Software Engineer. Building cool stuff on the web. Passionate about UI/UX.',
              followers: data.followers || 0,
              following: data.following || 0,
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchGitHubData();
  }, []);

  const socialLinks = useMemo(() => [
    { 
      name: 'GitHub', 
      icon: 'GITHUB', 
      handle: '@Enes-Nal',
      url: 'https://github.com/Enes-Nal',
      profileImage: githubProfileImage,
      bio: socialData.GitHub?.bio || 'Software Engineer. Building cool stuff on the web. Passionate about UI/UX.',
      following: socialData.GitHub?.following?.toString() || '0',
      followers: socialData.GitHub?.followers?.toString() || '0',
      bannerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
    },
    { 
      name: 'LinkedIn', 
      icon: 'LINKEDIN', 
      handle: '@mustafa-enes',
      url: 'https://www.linkedin.com/in/mustafa-enes-nalbantoglu/',
      profileImage: linkedinProfileImage,
      bio: 'Computer Science student at Arizona State University. Software Engineer passionate about building innovative solutions.',
      following: '500+',
      followers: '1.2K+',
      bannerImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800'
    },
    { 
      name: 'LeetCode', 
      icon: 'LEETCODE', 
      handle: '@Enes-Nal',
      url: 'https://leetcode.com/u/Enes-Nal/',
      profileImage: profileImage,
      bio: 'Solving algorithmic challenges and improving problem-solving skills. Competitive programming enthusiast.',
      following: '—',
      followers: '—',
      bannerImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800'
    },
  ], [socialData, githubProfileImage, linkedinProfileImage, profileImage]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'GitHub': return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>;
      case 'Twitter': return <span className="font-bold text-xs">𝕏</span>;
      case 'LinkedIn': return <span className="font-bold text-xs">in</span>;
      default: return <span className="w-4 h-4 rounded-full bg-current opacity-20" />;
    }
  };

  const borderColor = theme === 'dark' ? 'border-zinc-800' : 'border-zinc-300';
  const crosshairColor = theme === 'dark' ? 'text-zinc-700' : 'text-zinc-400';

  return (
    <div className={`relative min-h-screen font-sans transition-colors duration-700 overflow-x-hidden pb-12 ${
      theme === 'dark' ? 'bg-[#0a0a0a] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'
    }`}>

      <main className={`relative z-10 max-w-4xl mx-auto border-l border-r border-dashed mb-12 ${borderColor}`}>
        
        {/* Intersection Crosshairs */}
        <PlusSymbol className={`-top-[10px] -left-[10px] ${crosshairColor}`} />
        <PlusSymbol className={`-top-[10px] -right-[10px] ${crosshairColor}`} />

        {/* 1. Header Section */}
        <DraftingSection theme={theme} isHeader id="header">
          <div className="w-full text-center">
            <FloatingNav theme={theme} toggleTheme={toggleTheme} displayCount={displayCount} />
          </div>
          <div className="flex flex-col md:flex-row items-start justify-between gap-3 mt-4">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <div className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border shrink-0 transition-colors duration-500 ${
                  theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-white border-zinc-200'
                }`}>
                   <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 select-none">
                  <img src={turkishFlag} alt="Turkey flag" className="w-full h-full object-cover rounded-sm" style={{ transform: 'translateX(-2px)' }} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-0.5 text-inherit">Mustafa Enes Nalbantoglu</h1>
                <p className={`text-sm md:text-base font-light italic ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Software Engineer & CS Student</p>
              </div>
            </div>
          </div>
        </DraftingSection>

        {/* 2. Bio & Personal Info Section */}
        <DraftingSection theme={theme} id="about">
          <div className="max-w-2xl space-y-3 mb-6">
            <p className={`text-sm md:text-[15px] leading-relaxed font-light ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              I am a Computer Science student at <span className="font-medium whitespace-nowrap"><ASUTrident /><span className="text-[#f6ad55]">Arizona State University</span></span> dedicated to building precision-engineered software.
            </p>
            
            <div className={`text-sm md:text-[15px] leading-relaxed font-light ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <p className="mb-3 flex flex-wrap items-center gap-1">
                I build interactive web apps using{' '}
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-700' : 'bg-zinc-50 border-zinc-300'}`}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
                    <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />
                    <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
                    <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />
                    <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
                    <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />
                    <path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z" />
                  </svg>
                  <span className="text-xs">React</span>
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-700' : 'bg-zinc-50 border-zinc-300'}`}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993" />
                    <path d="M15 12v-3" />
                  </svg>
                  <span className="text-xs">Next.js</span>
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-700' : 'bg-zinc-50 border-zinc-300'}`}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 9h-7a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h3" />
                    <path d="M12 15h7a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-3" />
                    <path d="M8 9v-4a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-4a2 2 0 0 0 -2 2v5a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4" />
                    <path d="M11 6l0 .01" />
                    <path d="M13 18l0 .01" />
                  </svg>
                  <span className="text-xs">Python</span>
                </span>
                {' '}and{' '}
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-700' : 'bg-zinc-50 border-zinc-300'}`}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M6 3m0 3a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v0a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3z" />
                    <path d="M9 9a3 3 0 0 0 0 6h3m-3 0a3 3 0 1 0 3 3v-15" />
                  </svg>
                  <span className="text-xs">Figma</span>
                </span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={handleDownloadResume}
              className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all ${
                theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              Download resume
            </button>
            <button className={`px-5 py-2 border text-xs font-medium rounded-xl transition-all ${
              theme === 'dark' 
                ? 'bg-[#111111] border-white/10 text-white hover:bg-[#181818]' 
                : 'bg-white border-black/10 text-black hover:bg-zinc-50'
            }`}>
              Send an email
            </button>
          </div>
        </DraftingSection>

        {/* 3. Socials Section */}
        <DraftingSection theme={theme} id="socials">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {socialLinks.map((social) => (
              <div key={social.name} className="relative group">
                <a 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className={`flex items-center gap-2 transition-all text-[13px] font-medium border-b border-transparent pb-0.5 ${
                    theme === 'dark' ? 'text-zinc-400 hover:text-white hover:border-white/20' : 'text-zinc-500 hover:text-black hover:border-black/20'
                  }`}
                >
                  <span className="opacity-70 group-hover:opacity-100">{getIcon(social.name)}</span>
                  {social.name}
                  <svg className="w-3 h-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <SocialHoverCard 
                  isVisible={hoveredSocial === social.name} 
                  platform={social.name} 
                  handle={social.handle}
                  profileImage={social.profileImage}
                  bio={social.bio}
                  following={social.following}
                  followers={social.followers}
                  theme={theme} 
                />
              </div>
            ))}
          </div>
        </DraftingSection>

        {/* 4. Contribution Section */}
        <DraftingSection theme={theme} id="contributions">
          <ContributionGraph theme={theme} />
        </DraftingSection>

        {/* 5. Project Explorer Section */}
        <DraftingSection theme={theme} id="projects">
          <ProjectExplorer 
            theme={theme} 
            projects={projectsData} 
            onLinkHover={(name) => setHoveredSocial(name)}
            onLinkLeave={() => setHoveredSocial(null)}
          />
        </DraftingSection>

        {/* 6. Experiences Section */}
        <DraftingSection theme={theme} last id="experiences">
          <h2 className="text-xl font-semibold mb-8 tracking-tight text-inherit">Experiences.</h2>
          <div className="space-y-10">
            {workExp.map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="flex flex-col md:flex-row gap-5 items-start">
                   <div className={`w-10 h-10 border rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 overflow-hidden ${
                     theme === 'dark' 
                      ? 'bg-[#121212] border-white/10 text-zinc-500 group-hover:text-white group-hover:bg-[#1a1a1a]' 
                      : 'bg-white border-black/10 text-zinc-400 group-hover:text-black group-hover:bg-zinc-100'
                   }`}>
                      {exp.title[0]}
                   </div>
                   
                   <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                        <div>
                          <h4 className="text-base font-medium tracking-tight text-inherit">{exp.title}</h4>
                          <p className={`text-[11px] ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>{exp.subtitle}</p>
                        </div>
                        <div className="md:text-right flex flex-col md:items-end">
                           <span className={`text-[11px] font-medium tracking-wide ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{exp.duration}</span>
                           <span className={`text-[9px] uppercase tracking-[0.2em] mt-0.5 ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>{exp.location}</span>
                        </div>
                      </div>
                      
                      <ul className="space-y-1.5 mb-3">
                        {exp.description?.map((bullet, i) => (
                          <li key={i} className={`text-[13px] leading-relaxed font-light flex gap-2 italic ${
                            theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
                          }`}>
                             <span className="opacity-20 flex-shrink-0 mt-1.5">—</span>
                             {bullet}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-2">
                        {TECHNICAL_SKILLS.slice(0, 5).map(skill => (
                          <span key={skill} className={`px-2 py-0.5 border rounded text-[8px] uppercase tracking-tighter transition-colors ${
                            theme === 'dark' 
                              ? 'bg-[#111111] border-white/5 text-zinc-500 hover:text-zinc-300' 
                              : 'bg-white border-black/5 text-zinc-400 hover:text-zinc-600'
                          }`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </DraftingSection>

        {/* Footer intersection crosshairs */}
        <PlusSymbol className={`-bottom-[10px] -left-[10px] ${crosshairColor}`} />
        <PlusSymbol className={`-bottom-[10px] -right-[10px] ${crosshairColor}`} />
      </main>
    </div>
  );
};

export default App;
