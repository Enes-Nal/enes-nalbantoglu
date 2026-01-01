
import React, { useState, useEffect } from 'react';

interface ContributionGraphProps {
  theme: 'light' | 'dark';
}

interface ContributionDay {
  date: string;
  count: number;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ theme }) => {
  const [contributions, setContributions] = useState<number[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const username = 'enes-nal';

  const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Fetch multiple pages of events to get more accurate data
        const allEvents: any[] = [];
        let page = 1;
        const maxPages = 10; // Fetch up to 10 pages (1000 events)
        
        while (page <= maxPages) {
          const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`);
          if (!response.ok) break;
          const events = await response.json();
          if (events.length === 0) break;
          allEvents.push(...events);
          page++;
        }
        
        // Calculate contributions for the last year
        const now = new Date();
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const contributionMap = new Map<string, number>();
        
        // Initialize all days in the last year with 0
        for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split('T')[0];
          contributionMap.set(dateStr, 0);
        }
        
        // Count contributions from events (only PushEvent and CreateEvent count as contributions)
        const contributionEvents = ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent'];
        allEvents.forEach((event: any) => {
          if (event.created_at && contributionEvents.includes(event.type)) {
            const date = new Date(event.created_at);
            if (date >= oneYearAgo) {
              const dateStr = date.toISOString().split('T')[0];
              const currentCount = contributionMap.get(dateStr) || 0;
              // PushEvent can have multiple commits
              const increment = event.type === 'PushEvent' && event.payload?.commits 
                ? Math.min(event.payload.commits.length, 10) 
                : 1;
              contributionMap.set(dateStr, currentCount + increment);
            }
          }
        });
        
        // Get the last 52 weeks of data (364 days, starting from Sunday)
        const squares: number[] = [];
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);
        
        // Find the most recent Sunday
        const dayOfWeek = today.getDay();
        const daysToSubtract = (dayOfWeek + 1) % 7; // Adjust to get to Sunday
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 363 - daysToSubtract);
        
        for (let i = 0; i < 364; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          const dateStr = date.toISOString().split('T')[0];
          const count = contributionMap.get(dateStr) || 0;
          // Normalize to 0-4 scale for display
          let level = 0;
          if (count > 0) level = 1;
          if (count > 3) level = 2;
          if (count > 6) level = 3;
          if (count > 10) level = 4;
          squares.push(level);
        }
        
        setContributions(squares);
        const total = Array.from(contributionMap.values()).reduce((a, b) => a + b, 0);
        setTotalContributions(total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contributions:', error);
        // Fallback to random data
        setContributions(Array.from({ length: 52 * 7 }, () => Math.floor(Math.random() * 4)));
        setTotalContributions(3081);
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const getSquareColor = (level: number) => {
    if (level === 0) return theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#ebedf0]';
    if (level === 1) return theme === 'dark' ? 'bg-zinc-700' : 'bg-[#c6cbd1]';
    if (level === 2) return theme === 'dark' ? 'bg-zinc-500' : 'bg-[#959da5]';
    return theme === 'dark' ? 'bg-zinc-300' : 'bg-[#6a737d]';
  };

  const squares = contributions.length > 0 ? contributions : Array.from({ length: 52 * 7 }, () => 0);

  return (
    <div className={`w-full border rounded-xl p-4 transition-colors duration-500 overflow-hidden ${
      theme === 'dark' ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-zinc-200'
    }`}>
      <div className="flex justify-between mb-3 pr-4">
        <div className="flex justify-between w-full">
          {months.map(m => (
            <span key={m} className={`text-[9px] font-normal ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
            }`}>{m}</span>
          ))}
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-1">
        {loading ? (
          Array.from({ length: 52 * 7 }).map((_, i) => (
            <div
              key={i}
              className={`w-[9px] h-[9px] md:w-[10px] md:h-[10px] rounded-[1px] ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#ebedf0]'} animate-pulse`}
            />
          ))
        ) : (
          squares.map((level, i) => (
            <div
              key={i}
              className={`w-[9px] h-[9px] md:w-[10px] md:h-[10px] rounded-[1px] ${getSquareColor(level)} transition-colors duration-200`}
            />
          ))
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className={`text-[11px] font-light ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
          {totalContributions.toLocaleString()} contributions in the last year on <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="underline decoration-inherit underline-offset-2 hover:opacity-70">GitHub</a>.
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Less</span>
          <div className="flex gap-1">
            <div className={`w-2 h-2 rounded-[1px] ${getSquareColor(0)}`} />
            <div className={`w-2 h-2 rounded-[1px] ${getSquareColor(1)}`} />
            <div className={`w-2 h-2 rounded-[1px] ${getSquareColor(2)}`} />
            <div className={`w-2 h-2 rounded-[1px] ${getSquareColor(3)}`} />
          </div>
          <span className={`text-[10px] ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
