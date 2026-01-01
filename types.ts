
export interface ResumeItem {
  id: string;
  title: string;
  subtitle: string;
  duration?: string;
  location?: string;
  description?: string[];
  techStack?: string[];
  links?: { label: string; url: string }[];
  metadata?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: ResumeItem[];
}

export enum TabType {
  RESUME = 'Resume',
  ABOUT = 'About',
  HONORS = 'Honors'
}
