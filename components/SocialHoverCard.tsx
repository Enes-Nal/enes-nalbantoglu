
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialHoverCardProps {
  isVisible: boolean;
  platform: string;
  handle: string;
  profileImage?: string;
  bio?: string;
  following?: string;
  followers?: string;
  theme: 'light' | 'dark';
}

const SocialHoverCard: React.FC<SocialHoverCardProps> = ({ 
  isVisible, 
  platform, 
  handle, 
  profileImage,
  bio = 'Software Engineer. Building cool stuff on the web. Passionate about UI/UX.',
  following = '400',
  followers = '8.9K',
  theme 
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className={`absolute z-[100] w-[260px] rounded-2xl overflow-hidden -top-[200px] left-0 pointer-events-none border ${
            theme === 'dark' 
              ? 'bg-[#121212] border-white/10' 
              : 'bg-white border-zinc-200'
          }`}
        >
          <div className="p-4">
            {/* Profile Pic */}
            <div className={`mb-3 w-14 h-14 rounded-full border-2 overflow-hidden mx-auto ${
              theme === 'dark' ? 'border-white/10 bg-zinc-800' : 'border-zinc-200 bg-zinc-100'
            }`}>
              <img 
                src={profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=Mustafa"} 
                alt="pfp" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Mustafa</h4>
              <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              </div>
            </div>
            <p className="text-[10px] text-zinc-500 mb-2">{handle}</p>
            
            <p className={`text-[11px] leading-relaxed mb-3 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {bio}
            </p>

            <div className="flex gap-4">
              <div className="flex gap-1.5 items-center">
                <span className={`text-[11px] font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{following}</span>
                <span className="text-[9px] text-zinc-500">Following</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <span className={`text-[11px] font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{followers}</span>
                <span className="text-[9px] text-zinc-500">{platform === 'LinkedIn' ? 'Connections' : 'Followers'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialHoverCard;
