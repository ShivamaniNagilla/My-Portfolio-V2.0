export type SkillStatus = 'known' | 'learning' | 'exploring';

export interface SkillItem {
  name: string;
  category: 'Programming' | 'Frontend' | 'Tools' | 'Core' | 'AI & ML';
  status: SkillStatus;
  note?: string;
  iconName?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  technologies: string[];
  status: 'In Progress' | 'Concept' | 'Live' | 'Completed';
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  aspectRatio?: string;
  highlights: string[];
  role: string;
  timeline: string;
}

export interface MilestoneItem {
  id: string;
  year: string;
  title: string;
  category: 'Academic' | 'Project' | 'Certification' | 'Hackathon';
  institution: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
