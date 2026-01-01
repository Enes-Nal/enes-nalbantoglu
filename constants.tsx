
import { KanbanColumn } from './types';

export const RESUME_DATA: KanbanColumn[] = [
  {
    id: 'education',
    title: 'Education',
    items: [
      {
        id: 'edu-1',
        title: 'Arizona State University',
        subtitle: 'Computer Science; Software Engineer',
        duration: 'Expected 2027',
        location: 'Tempe, AZ',
        metadata: 'GPA: 3.99'
      }
    ]
  },
  {
    id: 'work',
    title: 'Experience',
    items: [
      {
        id: 'work-1',
        title: 'Black Smith Trade Inc.',
        subtitle: 'Information Technician',
        duration: 'Jun 2022 – May 2024',
        location: 'Gilbert, AZ',
        description: [
          'Developed custom pricing scripts to automate Amazon book listings using real-time market averages.',
          'Built a digitized database tool to track book conditions and inventory levels.',
          'Designed a logical sorting system for inventory logistics improving speed and accuracy.',
          'Automated shipping label workflows integrating inventory data with delivery templates.'
        ]
      },
      {
        id: 'work-2',
        title: 'Borderless Tutors',
        subtitle: 'Full-Stack Intern',
        duration: 'Jun 2021 – Sep 2021',
        location: 'Remote (Irvine, CA)',
        description: [
          'Co-led launch of educational initiative for free tutoring in underserved communities.',
          'Played key role in strategic planning, branding, and operational framework design.',
          'Created scalable documentation and workflows for program expansion.'
        ]
      },
      {
        id: 'work-3',
        title: 'White Tulip Health Foundation',
        subtitle: 'Full-Stack Intern',
        duration: 'Jun 2020 – Sep 2021',
        location: 'Remote (Fairfield, NJ)',
        description: [
          'Created new web pages and developed content related to health webinars.',
          'Conducted website audits to identify and resolve bugs, improving UX.'
        ]
      }
    ]
  },
  {
    id: 'projects',
    title: 'Projects',
    items: [
      {
        id: 'proj-1',
        title: 'Resume Analyzer AI',
        subtitle: 'Python, NLP, Cosine Similarity',
        description: [
          'Automated Resume Screening tool using NLP techniques to quantify alignment.',
          'Implemented Cosine Similarity and TF-IDF for precise match scores.',
          'Streamlined data extraction from PDF/DOCX for recruiter efficiency.'
        ],
        links: [
          { label: 'GitHub', url: 'https://github.com/Enes-Nal/Resume-Match' },
          { label: 'Live Demo', url: 'https://resume-match-ruddy.vercel.app/' }
        ]
      },
      {
        id: 'proj-2',
        title: 'Personal Website',
        subtitle: 'Next.js, Tailwind CSS, Framer Motion',
        description: [
          'Designed and developed a centralized digital hub with clean aesthetics.',
          'Prioritized responsive UX principles and visual consistency.',
          'Minimalist layout highlighting key project metrics and skills.'
        ],
        links: [
          { label: 'GitHub', url: 'https://github.com/Enes-Nal/Portfolio-Hub' },
          { label: 'Live Demo', url: 'https://portfolio-hub-indol.vercel.app/' }
        ]
      }
    ]
  },
  {
    id: 'community',
    title: 'Community',
    items: [
      {
        id: 'comm-1',
        title: 'Sema Foundation Non-Profit',
        subtitle: 'Secretary of Youth Council',
        duration: 'Sep 2021 – Present',
        location: 'Chandler, AZ',
        description: [
          'Created event schedules and planning documents for Youth Council.',
          'Tracked volunteer responsibilities and progress for all members.'
        ]
      }
    ]
  }
];

export const TECHNICAL_SKILLS = [
  'Javascript', 'HTML/CSS', 'Next-js', 'Tailwindcss', 'React', 'Python', 'C++', 'C'
];

export const AWARDS = [
  {
    title: 'The Congressional Award Gold Medal',
    detail: 'Achieved by only 300 out of 46,000 participants'
  }
];

export const LANGUAGES = [
  { name: 'Turkish', level: 'Fluent' },
  { name: 'English', level: 'Fluent' },
  { name: 'Azerbaijani', level: 'Conversational' }
];
