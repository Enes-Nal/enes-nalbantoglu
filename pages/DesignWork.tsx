import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GridBackground from '../components/GridBackground';

const DESIGN_WORK = [
  {
    id: 'disallowed-content',
    title: 'Disallowed Content',
    description: 'A Discord bot that automatically monitors and filters messages containing disallowed words. The bot deletes messages with prohibited content and warns users, helping maintain a clean and appropriate chat environment.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Make%20your%20README-Q0jOnmLmjZyTTdNh8ENuGWHufvMQ6k.png',
    tags: ['Discord Bot', 'Social Media', 'Branding'],
    year: '2024'
  },
  {
    id: 'next-level-soccer',
    title: 'Next Level Soccer',
    description: 'Sports photography composition featuring youth soccer players with dramatic sky background and bold typography for Next Level Soccer program.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-2-Recovered.png-yUY1HMMYtNZii171UfpxLmf0La75yh.jpeg',
    tags: ['Sports', 'Photography', 'Poster Design'],
    year: '2024'
  }
];

const DesignWork: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedWork, setSelectedWork] = useState<typeof DESIGN_WORK[0] | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-[#fafafa] text-zinc-900'
    }`}>
      <GridBackground theme={theme} />
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#0a0a0a]/80 border-white/10' : 'bg-white/80 border-black/10'
      }`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Portfolio
          </Link>
          
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all ${
              theme === 'dark' 
                ? 'border-white/10 hover:bg-white/5' 
                : 'border-black/10 hover:bg-black/5'
            }`}
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Design Work</h1>
            <p className={`text-sm md:text-base leading-relaxed max-w-2xl ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              A collection of graphic design work including social media graphics, thumbnails, posters, and visual content for various clients and projects.
            </p>
          </motion.div>

          {/* Design Work Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DESIGN_WORK.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedWork(work)}
                className={`relative group cursor-pointer overflow-hidden rounded-xl border transition-all ${
                  theme === 'dark' 
                    ? 'bg-[#111111] border-white/10 hover:border-white/20' 
                    : 'bg-white border-black/10 hover:border-black/20'
                }`}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {work.title}
                    </h3>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded ${
                      theme === 'dark' ? 'bg-white/5 text-zinc-500' : 'bg-black/5 text-zinc-400'
                    }`}>
                      {work.year}
                    </span>
                  </div>
                  <p className={`text-[12px] leading-relaxed mb-4 line-clamp-2 ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'
                  }`}>
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {work.tags.map(tag => (
                      <span key={tag} className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider ${
                        theme === 'dark' 
                          ? 'bg-white/5 text-zinc-400 border border-white/10' 
                          : 'bg-black/5 text-zinc-500 border border-black/10'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State for More Work */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`mt-8 p-8 rounded-xl border border-dashed text-center ${
              theme === 'dark' ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              More design work coming soon...
            </p>
          </motion.div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedWork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedWork(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative max-w-4xl w-full max-h-[90vh] overflow-auto rounded-2xl ${
              theme === 'dark' ? 'bg-[#111111]' : 'bg-white'
            }`}
          >
            <button
              onClick={() => setSelectedWork(null)}
              className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${
                theme === 'dark' 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-black/10 hover:bg-black/20 text-black'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img 
              src={selectedWork.image} 
              alt={selectedWork.title}
              className="w-full h-auto"
            />
            
            <div className="p-6">
              <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {selectedWork.title}
              </h2>
              <p className={`text-sm leading-relaxed mb-4 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                {selectedWork.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedWork.tags.map(tag => (
                  <span key={tag} className={`px-3 py-1 rounded text-[10px] uppercase tracking-wider ${
                    theme === 'dark' 
                      ? 'bg-white/5 text-zinc-400 border border-white/10' 
                      : 'bg-black/5 text-zinc-500 border border-black/10'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DesignWork;
