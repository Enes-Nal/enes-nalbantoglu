
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HoverPreviewProps {
  isVisible: boolean;
  position: { x: number; y: number };
  content: { title: string; url: string };
}

const HoverPreview: React.FC<HoverPreviewProps> = ({ isVisible, position, content }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15, rotateX: 20 }}
          transition={{ 
            type: 'spring', 
            damping: 25, 
            stiffness: 400,
            mass: 0.8
          }}
          className="fixed z-[100] pointer-events-none perspective-1000"
          style={{ 
            left: position.x, 
            top: position.y - 110,
            transform: 'translateX(-50%)' 
          }}
        >
          <div className="bg-[#0f0f0f]/90 backdrop-blur-2xl border border-white/10 rounded-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] min-w-[220px] max-w-[280px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <span className="text-[9px] font-medium text-white/30 uppercase tracking-[0.2em]">Source Preview</span>
              </div>
              <div className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[8px] text-white/40 uppercase">
                HTTPS
              </div>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-[12px] font-medium text-white/90 truncate">{content.title}</h4>
              <p className="text-[10px] text-white/40 font-light break-all leading-tight">
                {content.url}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center gap-2">
               <div className="w-full h-1 bg-white/[0.02] rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ x: '-100%' }}
                   animate={{ x: '0%' }}
                   transition={{ duration: 1 }}
                   className="w-full h-full bg-blue-500/20"
                 />
               </div>
               <span className="text-[8px] text-white/20 whitespace-nowrap uppercase tracking-widest">Verified</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HoverPreview;
