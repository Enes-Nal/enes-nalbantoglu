
import React from 'react';
import { motion } from 'framer-motion';
import { ResumeItem } from '../types';

interface GlassCardProps {
  item: ResumeItem;
  onLinkHover: (e: React.MouseEvent, title: string, url: string) => void;
  onLinkLeave: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ item, onLinkHover, onLinkLeave }) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className="group relative bg-[#ffffff]/[0.02] hover:bg-[#ffffff]/[0.04] backdrop-blur-md border border-white/[0.06] rounded-xl p-5 transition-all duration-500 mb-4 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] overflow-hidden cursor-grab active:cursor-grabbing"
    >
      {/* Hover Highlight/Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2.5">
          <h3 className="text-[13px] font-medium text-white/90 leading-tight tracking-tight">
            {item.title}
          </h3>
          <div className="flex flex-col items-end gap-1">
            {item.duration && (
              <span className="text-[10px] text-white/30 font-light whitespace-nowrap">
                {item.duration}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <p className="text-[11px] text-white/40 font-light truncate max-w-[80%]">
            {item.subtitle}
          </p>
          {item.location && (
            <>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span className="text-[11px] text-white/40 font-light">{item.location}</span>
            </>
          )}
        </div>

        {item.metadata && (
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-[9px] text-white/50 mb-4 font-medium tracking-wide uppercase">
            {item.metadata}
          </div>
        )}

        {item.description && (
          <ul className="space-y-2 mb-5">
            {item.description.map((bullet, idx) => (
              <li key={idx} className="flex gap-2.5 text-[12px] leading-[1.6] text-white/50 font-light">
                <span className="text-white/20 mt-1 flex-shrink-0">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {item.links && (
          <div className="flex items-center gap-4 pt-4 border-t border-white/[0.04]">
            {item.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => onLinkHover(e, link.label, link.url)}
                onMouseLeave={onLinkLeave}
                className="flex items-center gap-1.5 text-[10px] text-white/40 hover:text-white transition-all duration-300 group/link"
              >
                <span className="w-1 h-1 rounded-full bg-white/20 group-hover/link:bg-white group-hover/link:shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Subtle Drag Handle Indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-20 transition-opacity flex gap-0.5">
        <div className="grid grid-cols-2 gap-0.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-0.5 h-0.5 rounded-full bg-white" />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GlassCard;
