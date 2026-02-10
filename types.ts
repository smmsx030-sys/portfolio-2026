
export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  points: string[];
}

export interface ServiceItem {
  title: string;
  description: string[];
  icon: 'Plane' | 'Shield' | 'BarChart';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}
