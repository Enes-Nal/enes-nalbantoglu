
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  lastUpdated: string;
  link: string;
}

interface ProjectExplorerProps {
  theme: 'light' | 'dark';
  projects: Project[];
  onLinkHover: (name: string) => void;
  onLinkLeave: () => void;
}

const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ theme, projects, onLinkHover, onLinkLeave }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Project Explorer</h2>
        </div>
        
        <div className="relative group">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
            theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
          }`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-9 pr-3 py-1.5 text-[11px] rounded-lg border outline-none transition-all w-full md:w-52 ${
              theme === 'dark' 
                ? 'bg-[#0f0f0f] border-white/10 text-white focus:bg-[#141414] focus:border-white/20' 
                : 'bg-white border-black/10 text-black focus:bg-zinc-50 focus:border-black/20'
            }`}
          />
        </div>
      </div>

      <div className={`border rounded-xl overflow-hidden transition-colors ${
        theme === 'dark' ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-black/5'
      }`}>
        {/* Table Header */}
        <div className={`grid grid-cols-12 px-4 py-2 border-b text-[8px] font-bold uppercase tracking-widest ${
          theme === 'dark' ? 'border-white/5 text-zinc-600 bg-[#111111]' : 'border-black/5 text-zinc-400 bg-zinc-50'
        }`}>
          <div className="col-span-12 md:col-span-5">Name</div>
          <div className="hidden md:block md:col-span-4">Stack</div>
          <div className="hidden md:block md:col-span-2">Last Updated</div>
          <div className="hidden md:block md:col-span-1 text-right">Link</div>
        </div>

        {/* Rows */}
        <div className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-black/5'}`}>
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className={`grid grid-cols-12 px-4 py-3 items-center gap-3 transition-colors group ${
                theme === 'dark' ? 'hover:bg-[#121212]' : 'hover:bg-zinc-50'
              }`}
            >
              <div className="col-span-12 md:col-span-5 flex items-start gap-2.5">
                <div className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
                  theme === 'dark' ? 'bg-[#141414] border-white/10 text-zinc-500' : 'bg-white border-black/10 text-zinc-400'
                }`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className={`text-[13px] font-semibold mb-0 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{project.name}</h4>
                  <p className={`text-[11px] font-light line-clamp-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>{project.description}</p>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-wrap gap-1.5">
                {project.stack.map(s => (
                  <span key={s} className={`px-2 py-0.5 border rounded text-[8px] font-medium transition-colors ${
                    theme === 'dark' 
                      ? 'bg-[#111111] border-white/5 text-zinc-500 group-hover:text-zinc-300' 
                      : 'bg-white border-black/5 text-zinc-400 group-hover:text-zinc-600'
                  }`}>
                    {s}
                  </span>
                ))}
              </div>

              <div className="col-span-6 md:col-span-2 flex items-center gap-2">
                <svg className="w-3 h-3 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className={`text-[10px] ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>{project.lastUpdated}</span>
              </div>

              <div className="col-span-6 md:col-span-1 text-right">
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => onLinkHover(project.name)}
                  onMouseLeave={onLinkLeave}
                  className={`inline-block transition-transform hover:scale-110 ${
                    theme === 'dark' ? 'text-zinc-600 hover:text-white' : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="p-6 text-center text-zinc-500 text-[10px]">No projects found.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectExplorer;
