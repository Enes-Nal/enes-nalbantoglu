
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

// Normalize GitHub language names to match tech skill names
const normalizeTechName = (lang: string): string => {
  const normalizationMap: Record<string, string> = {
    'JavaScript': 'Javascript',
    'TypeScript': 'TypeScript',
    'CSS': 'HTML/CSS',
    'HTML': 'HTML/CSS',
    'HTML/CSS': 'HTML/CSS',
    'Tailwind CSS': 'Tailwindcss',
    'Next.js': 'Next-js',
    'NextJS': 'Next-js',
    'React': 'React',
    'Python': 'Python',
    'C++': 'C++',
    'C': 'C',
    'Figma': 'Figma',
    'AI': 'AI', // Explicitly include AI
  };
  return normalizationMap[lang] || lang;
};

const getTechColors = (skill: string, theme: 'light' | 'dark') => {
  const normalizedSkill = normalizeTechName(skill);
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

  return colorMap[normalizedSkill] || {
    bg: theme === 'dark' ? 'bg-zinc-900/50' : 'bg-zinc-50',
    border: theme === 'dark' ? 'border-zinc-700' : 'border-zinc-300',
    text: theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600',
    icon: theme === 'dark' ? '#a1a1aa' : '#52525b'
  };
};

const TechIcon = ({ skill, color }: { skill: string, color?: string }) => {
  const normalizedSkill = normalizeTechName(skill);
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
    'TypeScript': (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill={iconColor}>
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 7.488 7.488 0 0 0-1.007-.436c-.411-.174-.77-.367-1.076-.578-.307-.212-.563-.444-.77-.697-.204-.253-.357-.527-.457-.823-.101-.295-.15-.613-.15-.951 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 5.684 5.684 0 0 1 1.77-.272zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    ),
    'AI': (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
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

  return iconMap[normalizedSkill] || null;
};

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
                {project.stack.map(s => {
                  const colors = getTechColors(s, theme);
                  return (
                    <span key={s} className={`inline-flex items-center gap-1 px-2 py-0.5 border rounded text-[8px] font-medium transition-colors ${colors.bg} ${colors.border} ${colors.text} hover:opacity-80`}>
                      <TechIcon skill={s} color={colors.icon} />
                      {s}
                    </span>
                  );
                })}
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
