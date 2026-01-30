
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GridBackground from './components/GridBackground';
import ContributionGraph from './components/ContributionGraph';
import SocialHoverCard from './components/SocialHoverCard';
import ProjectExplorer from './components/ProjectExplorer';
import FloatingNav from './components/FloatingNav';
import ResumeView from './components/ResumeView';
import CertificateView from './components/CertificateView';
import { RESUME_DATA, TECHNICAL_SKILLS, CERTIFICATES } from './constants';
import profileImage from './assets/image0.jpg';
import turkishFlag from './assets/turkey-square-national-flag-vector.jpg';
import linkedinProfileImage from './assets/1754877573002.jpg';
import githubProfileImage from './assets/77180172.jpg';
import resumePdf from './assets/Mustafa Enes Nalbantoglu Resume Real.pdf?url';
import ibmCertificatePdf from './assets/IBM DA0101EN Certificate _ Cognitive Class.pdf?url';
import whiteTulipLogo from './assets/logo-whitetulip-health-sq-logo.png';
import borderlessTutorsLogo from './assets/PeNBj3wn_400x400.jpg';

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

const ASUTrident = ({ inGroup = false }: { inGroup?: boolean }) => {
  if (inGroup) {
    return (
      <img
        src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Arizona_State_Sun_Devils_logo.svg/1200px-Arizona_State_Sun_Devils_logo.svg.png"
        alt="ASU Trident"
        className="h-[1.5em] w-auto mr-1 transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110 self-center"
      />
    );
  }
  return (
    <motion.img
      src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Arizona_State_Sun_Devils_logo.svg/1200px-Arizona_State_Sun_Devils_logo.svg.png"
      alt="ASU Trident"
      className="h-[1.5em] w-auto"
      whileHover={{ rotate: 15, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    />
  );
};

const getTechColors = (skill: string, theme: 'light' | 'dark') => {
  const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    'React': {
      bg: theme === 'dark' ? 'bg-[#61DAFB]/20' : 'bg-[#61DAFB]/15',
      border: 'border-[#61DAFB]/40',
      text: theme === 'dark' ? 'text-[#61DAFB]' : 'text-[#0284C7]',
      icon: theme === 'dark' ? '#61DAFB' : '#0284C7'
    },
    'Next-js': {
      bg: theme === 'dark' ? 'bg-white/10' : 'bg-black/10',
      border: theme === 'dark' ? 'border-white/30' : 'border-black/30',
      text: theme === 'dark' ? 'text-white' : 'text-black',
      icon: theme === 'dark' ? '#ffffff' : '#000000'
    },
    'Python': {
      bg: theme === 'dark' ? 'bg-[#3776AB]/20' : 'bg-[#3776AB]/15',
      border: 'border-[#3776AB]/40',
      text: 'text-[#3776AB]',
      icon: '#3776AB'
    },
    'Figma': {
      bg: theme === 'dark' ? 'bg-[#F24E1E]/20' : 'bg-[#F24E1E]/15',
      border: 'border-[#F24E1E]/40',
      text: 'text-[#F24E1E]',
      icon: '#F24E1E'
    },
    'Javascript': {
      bg: theme === 'dark' ? 'bg-[#F7DF1E]/20' : 'bg-[#F7DF1E]/20',
      border: 'border-[#F7DF1E]/40',
      text: theme === 'dark' ? 'text-[#F7DF1E]' : 'text-[#B45309]',
      icon: theme === 'dark' ? '#F7DF1E' : '#B45309'
    },
    'HTML/CSS': {
      bg: theme === 'dark' ? 'bg-[#E34F26]/20' : 'bg-[#E34F26]/15',
      border: 'border-[#E34F26]/40',
      text: 'text-[#E34F26]',
      icon: '#E34F26'
    },
    'Tailwindcss': {
      bg: theme === 'dark' ? 'bg-[#06B6D4]/20' : 'bg-[#06B6D4]/15',
      border: 'border-[#06B6D4]/40',
      text: theme === 'dark' ? 'text-[#06B6D4]' : 'text-[#0891B2]',
      icon: theme === 'dark' ? '#06B6D4' : '#0891B2'
    },
    'TypeScript': {
      bg: theme === 'dark' ? 'bg-[#3178C6]/20' : 'bg-[#3178C6]/15',
      border: 'border-[#3178C6]/40',
      text: 'text-[#3178C6]',
      icon: '#3178C6'
    },
    'AI': {
      bg: theme === 'dark' ? 'bg-[#9333EA]/20' : 'bg-[#9333EA]/15',
      border: 'border-[#9333EA]/40',
      text: 'text-[#9333EA]',
      icon: theme === 'dark' ? '#A855F7' : '#9333EA'
    },
  };

  return colorMap[skill] || {
    bg: theme === 'dark' ? 'bg-zinc-900/50' : 'bg-zinc-50',
    border: theme === 'dark' ? 'border-zinc-700' : 'border-zinc-300',
    text: theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600',
    icon: theme === 'dark' ? '#a1a1aa' : '#52525b'
  };
};

const TechIcon = ({ skill, color }: { skill: string, color?: string }) => {
  const iconColor = color || 'currentColor';
  const iconMap: Record<string, React.ReactNode> = {
    'Javascript': (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill={iconColor}>
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 7.001-.84.028-.09.24-.705.315-1.365.063-.606.025-1.14-.198-1.615z"/>
      </svg>
    ),
    'HTML/CSS': (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill={iconColor}>
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.955-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
      </svg>
    ),
    'Next-js': (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993" />
        <path d="M15 12v-3" />
      </svg>
    ),
    'Tailwindcss': (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill={iconColor}>
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z"/>
      </svg>
    ),
    'React': (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none"/>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" transform="rotate(120 12 12)"/>
        <circle cx="12" cy="12" r="2" fill={iconColor}/>
      </svg>
    ),
    'Python': (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill={iconColor}>
        <path d="M14.5 2.5c1.5 0 3 1.5 3 3v2.5h-2.5v-2.5c0-.5-.5-1-1-1h-2.5c-1.5 0-3 1.5-3 3v2.5H5.5v-2.5c0-1.5 1.5-3 3-3h6zm-9 9c-1.5 0-3 1.5-3 3v2.5c0 1.5 1.5 3 3 3h2.5v-2.5c0-.5.5-1 1-1h2.5c1.5 0 3-1.5 3-3v-2.5h2.5v2.5c0 1.5-1.5 3-3 3h-6c-1.5 0-3-1.5-3-3v-2.5h2.5z"/>
      </svg>
    ),
    'C++': (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill={iconColor}>
        <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L1.26 5.31c-.509.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.509.293 1.34.293 1.848 0l8.816-5.09c.509-.293.923-1.013.923-1.6V7.21c0-.294-.104-.62-.271-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11S8.08 4.89 12 4.89c.424 0 .841.041 1.247.115v1.658c-.406-.051-.82-.077-1.247.077-2.99 0-5.418 2.433-5.418 5.42 0 2.99 2.428 5.42 5.418 5.42 2.99 0 5.418-2.43 5.418-5.42 0-.504-.069-.99-.2-1.458l1.558-.359c.16.57.242 1.163.242 1.817 0 3.92-3.189 7.11-7.109 7.11zm5.33-8.232l-1.335 1.335-1.335-1.335-1.132 1.133 1.335 1.334-1.335 1.335 1.132 1.132 1.335-1.335 1.335 1.335 1.133-1.132-1.336-1.335 1.336-1.334-1.133-1.133z"/>
      </svg>
    ),
    'C': (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill={iconColor}>
        <path d="M16.592 9.196s-.354 3.854-3.547 3.854c-3.194 0-3.194-3.854-3.194-3.854 0-3.854 3.194-3.854 3.194-3.854 3.193 0 3.547 3.854 3.547 3.854zm-5.592 0s0-2.714 2.382-2.714c2.383 0 2.383 2.714 2.383 2.714 0 2.714-2.383 2.714-2.383 2.714-2.382 0-2.382-2.714-2.382-2.714z"/>
      </svg>
    ),
  };

  return iconMap[skill] || null;
};

const InfoRow = ({ icon, text, theme, secondaryText, secondaryIcon }: { icon: React.ReactNode, text: string, theme: 'light' | 'dark', secondaryText?: string, secondaryIcon?: React.ReactNode }) => {
  const parts = text.split('Arizona State University');
  const renderedText = parts.length > 1 ? (
    <>
      {parts[0]} <a href="https://asu.edu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center align-middle group"><ASUTrident inGroup={true} /><span className="text-[#f6ad55]">Arizona State University</span></a> {parts[1]}
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
  const [isResumeViewOpen, setIsResumeViewOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<{ url: string; title: string } | null>(null);

  // Rotating subtitle text
  const subtitleTexts = [
    'Software Engineer & CS Student',
    'Creating with code. Small details matter.',
    'Open Source Contributor',
    'Design Engineer',
    'Full-Stack Developer',
    'Problem Solver'
  ];
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

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

  // Rotate subtitle text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitleIndex((prev) => (prev + 1) % subtitleTexts.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [subtitleTexts.length]);

  const handleViewResume = () => {
    setIsResumeViewOpen(true);
  };

  const workExp = RESUME_DATA.find(c => c.id === 'work')?.items || [];

  const [projectsData, setProjectsData] = useState<Array<{
    id: string;
    name: string;
    description: string;
    stack: string[];
    lastUpdated: string;
    link: string;
  }>>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  // Fetch starred repositories from GitHub
  useEffect(() => {
    const fetchStarredRepos = async () => {
      try {
        setIsLoadingProjects(true);
        // Fetch user's starred repositories
        const starredResponse = await fetch('https://api.github.com/users/Enes-Nal/starred?per_page=100');
        if (!starredResponse.ok) throw new Error('Failed to fetch starred repos');

        const starredRepos = await starredResponse.json();

        // Filter: only repos that are starred AND owned by Enes-Nal
        const filteredRepos = starredRepos.filter((repo: any) =>
          repo.owner.login === 'Enes-Nal'
        );

        // Fetch languages for each repo in parallel
        const projectsWithLanguages = await Promise.all(
          filteredRepos.map(async (repo: any) => {
            try {
              const languagesResponse = await fetch(repo.languages_url);
              const languages = languagesResponse.ok ? await languagesResponse.json() : {};
              let stack = Object.keys(languages).slice(0, 4);

              // Add AI to Resume-Match project stack (take up to 3 languages + AI to ensure AI is shown)
              const repoNameLower = repo.name.toLowerCase();
              const repoUrlLower = repo.html_url?.toLowerCase() || '';
              const isResumeMatch = repoNameLower === 'resume-match' ||
                                   repoNameLower.includes('resume-match') ||
                                   repoNameLower.includes('resumematch') ||
                                   repoUrlLower.includes('resume-match');

              if (isResumeMatch) {
                const languageKeys = Object.keys(languages);
                stack = [...languageKeys.slice(0, 3), 'AI'];
              }

              const updatedDate = new Date(repo.updated_at);
              const lastUpdated = updatedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

              return {
                id: repo.id.toString(),
                name: repo.name,
                description: repo.description || 'No description available',
                stack: stack.length > 0 ? stack : ['Other'],
                lastUpdated,
                link: repo.html_url
              };
            } catch (error) {
              const updatedDate = new Date(repo.updated_at);
              const lastUpdated = updatedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

              return {
                id: repo.id.toString(),
                name: repo.name,
                description: repo.description || 'No description available',
                stack: ['Other'],
                lastUpdated,
                link: repo.html_url
              };
            }
          })
        );

        setProjectsData(projectsWithLanguages);
      } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        setProjectsData([]);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchStarredRepos();
  }, []);

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
    {
      name: 'Instagram',
      icon: 'INSTAGRAM',
      handle: '@enesss_z',
      url: 'https://www.instagram.com/enesss_z/',
      profileImage: profileImage,
      bio: 'Sharing moments, code, and life updates. Follow for behind-the-scenes content and daily inspiration.',
      following: '—',
      followers: '—',
      bannerImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800'
    },
  ], [socialData, githubProfileImage, linkedinProfileImage, profileImage]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'GitHub': return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>;
      case 'Twitter': return <span className="font-bold text-xs">𝕏</span>;
      case 'LinkedIn': return <span className="font-bold text-xs">in</span>;
      case 'Instagram': return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
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
          {/* Navbar is fixed at top, no need for wrapper */}
          <FloatingNav theme={theme} toggleTheme={toggleTheme} displayCount={displayCount} />
          <div className="mt-20">
            <div className="flex flex-col md:flex-row items-start justify-between gap-3">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <div className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden border shrink-0 transition-colors duration-500 ${
                  theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-white border-zinc-200'
                }`}>
                   <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 select-none">
                  <img src={turkishFlag} alt="Turkey flag" className="w-full h-full object-cover rounded-md" style={{ transform: 'translateX(-2px)' }} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-0.5 text-inherit" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>Mustafa Enes Nalbantoglu</h1>
                <p className={`text-sm md:text-base font-light ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'} min-h-[1.5rem] flex items-center`} style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSubtitleIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {subtitleTexts[currentSubtitleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>
            </div>
          </div>
          </div>
        </DraftingSection>

        {/* 2. Bio & Personal Info Section */}
        <DraftingSection theme={theme} id="about">
          <div className="max-w-2xl space-y-3 mb-6">
            <p className={`text-sm md:text-[15px] leading-relaxed font-light ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              I am a Computer Science student at <span className="font-medium whitespace-nowrap"><a href="https://asu.edu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center align-middle group"><ASUTrident inGroup={true} /><span className="text-[#f6ad55]">Arizona State University</span></a></span> dedicated to building precision-engineered software.
            </p>

            <div className={`text-sm md:text-[15px] leading-relaxed font-light ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <p className="mb-3 flex flex-wrap items-center gap-1">
                I build interactive web apps using{' '}
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed ${getTechColors('React', theme).bg} ${getTechColors('React', theme).border}`}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={getTechColors('React', theme).icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
                    <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />
                    <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
                    <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />
                    <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
                    <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />
                    <path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z" />
                  </svg>
                  <span className={`text-xs ${getTechColors('React', theme).text}`}>React</span>
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed ${getTechColors('Next-js', theme).bg} ${getTechColors('Next-js', theme).border}`}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={getTechColors('Next-js', theme).icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993" />
                    <path d="M15 12v-3" />
                  </svg>
                  <span className={`text-xs ${getTechColors('Next-js', theme).text}`}>Next.js</span>
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed ${getTechColors('Python', theme).bg} ${getTechColors('Python', theme).border}`}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={getTechColors('Python', theme).icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 9h-7a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h3" />
                    <path d="M12 15h7a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-3" />
                    <path d="M8 9v-4a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-4a2 2 0 0 0 -2 2v5a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4" />
                    <path d="M11 6l0 .01" />
                    <path d="M13 18l0 .01" />
                  </svg>
                  <span className={`text-xs ${getTechColors('Python', theme).text}`}>Python</span>
                </span>
                {' '}and{' '}
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed ${getTechColors('Figma', theme).bg} ${getTechColors('Figma', theme).border}`}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={getTechColors('Figma', theme).icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M6 3m0 3a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v0a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3z" />
                    <path d="M9 9a3 3 0 0 0 0 6h3m-3 0a3 3 0 1 0 3 3v-15" />
                  </svg>
                  <span className={`text-xs ${getTechColors('Figma', theme).text}`}>Figma</span>
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleViewResume}
              className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all ${
                theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              View resume
            </button>
            <a
              href="mailto:mustafaenwork@gmail.com"
              className={`px-5 py-2 border text-xs font-medium rounded-xl transition-all inline-block ${
                theme === 'dark'
                  ? 'bg-[#111111] border-white/10 text-white hover:bg-[#181818]'
                  : 'bg-white border-black/10 text-black hover:bg-zinc-50'
              }`}
            >
              Send an email
            </a>
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
          {isLoadingProjects ? (
            <div className={`text-center py-8 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              <div className="text-sm">Loading projects from GitHub...</div>
            </div>
          ) : (
            <ProjectExplorer
              theme={theme}
              projects={projectsData}
              onLinkHover={(name) => setHoveredSocial(name)}
              onLinkLeave={() => setHoveredSocial(null)}
            />
          )}
        </DraftingSection>

        {/* 6. Experiences Section */}
        <DraftingSection theme={theme} id="experiences">
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
                      {exp.id === 'work-3' ? (
                        <img src={whiteTulipLogo} alt="White Tulip Health Foundation" className="w-7 h-7 object-contain" />
                      ) : exp.id === 'work-2' ? (
                        <img src={borderlessTutorsLogo} alt="Borderless Tutors" className="w-7 h-7 object-contain" />
                      ) : (
                        exp.title[0]
                      )}
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
                        {(exp.techStack || TECHNICAL_SKILLS.slice(0, 5)).map(skill => {
                          const colors = getTechColors(skill, theme);
                          return (
                            <span key={skill} className={`inline-flex items-center gap-1 px-2 py-0.5 border rounded text-[8px] uppercase tracking-tighter transition-colors ${colors.bg} ${colors.border} ${colors.text} hover:opacity-80`}>
                              <TechIcon skill={skill} color={colors.icon} />
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </DraftingSection>

        {/* 7. Certificates Section */}
        <DraftingSection theme={theme} last id="certificates">
          <h2 className="text-xl font-semibold mb-8 tracking-tight text-inherit">Certificates.</h2>
          <div className="space-y-6">
            {CERTIFICATES.map((cert) => (
              <div key={cert.id} className="relative group">
                <div className="flex flex-col md:flex-row gap-5 items-start">
                  <div className={`w-10 h-10 border rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 overflow-hidden shrink-0 ${
                    theme === 'dark'
                      ? 'bg-[#121212] border-white/10 text-zinc-500 group-hover:text-white group-hover:bg-[#1a1a1a]'
                      : 'bg-white border-black/10 text-zinc-400 group-hover:text-black group-hover:bg-zinc-100'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                      <div>
                        <h4 className="text-base font-medium tracking-tight text-inherit">{cert.title}</h4>
                        <p className={`text-[11px] ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>{cert.issuer}</p>
                      </div>
                      <div className="md:text-right flex flex-col md:items-end">
                        <span className={`text-[11px] font-medium tracking-wide ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{cert.issueDate}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <button
                        onClick={() => setSelectedCertificate({
                          url: cert.id === 'cert-1' ? ibmCertificatePdf : cert.pdfUrl,
                          title: cert.title
                        })}
                        className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                          theme === 'dark'
                            ? 'bg-[#111111] border-white/10 text-white hover:bg-[#181818] hover:border-white/20'
                            : 'bg-white border-black/10 text-black hover:bg-zinc-50 hover:border-black/20'
                        }`}
                      >
                        View Certificate
                      </button>
                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                            theme === 'dark'
                              ? 'bg-[#111111] border-white/10 text-white hover:bg-[#181818] hover:border-white/20'
                              : 'bg-white border-black/10 text-black hover:bg-zinc-50 hover:border-black/20'
                          }`}
                        >
                          Verify
                          <svg className="w-3 h-3 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </a>
                      )}
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

      {/* Resume View Modal */}
      <ResumeView
        isOpen={isResumeViewOpen}
        onClose={() => setIsResumeViewOpen(false)}
        resumeUrl={resumePdf}
        theme={theme}
      />

      {/* Certificate View Modal */}
      <CertificateView
        isOpen={selectedCertificate !== null}
        onClose={() => setSelectedCertificate(null)}
        certificateUrl={selectedCertificate?.url || ''}
        certificateTitle={selectedCertificate?.title || ''}
        theme={theme}
      />
    </div>
  );
};

export default App;
