import React from 'react';
import { Twitter, Linkedin, Send, Mail, Phone } from 'lucide-react';
import { SocialLink, ExperienceItem, ServiceItem } from './types';

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/shaonpromx', icon: <Linkedin size={20} /> },
  { platform: 'Twitter', url: 'https://x.com/ShaonM37x', icon: <Twitter size={20} /> },
  { platform: 'Telegram', url: 'https://t.me/ShaonMSX', icon: <Send size={20} /> },
  { platform: 'Email', url: 'mailto:shaonpromx@gmail.com', icon: <Mail size={20} /> },
  { platform: 'WhatsApp', url: 'https://wa.me/8801518693126', icon: <Phone size={20} /> },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    title: 'Digital Engagement Specialist',
    company: 'The Pulselorian',
    period: '2022 – 2024',
    points: [
      'Primary point of contact for customer inquiries and complex support ticket resolution.',
      'Maintained 100% data accuracy across digital records and internal platforms.',
      'Strategically assisted sales teams by identifying potential leads through community sentiment analysis.'
    ]
  },
  {
    title: 'Operations & Community Lead',
    company: 'Tech & Digital Services',
    period: '2020 – 2022',
    points: [
      'Managed operations for communities with over 10,000+ active members.',
      'Implemented real-time fraud detection systems and platform policy enforcement protocols.',
      'Streamlined onboarding processes, reducing user setup time significantly.',
      'Produced advanced data reports using MS Excel and Google Sheets to guide executive decisions.'
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    title: 'Logistics & Travel',
    icon: 'Plane',
    description: ['B2B Air Ticketing', 'Visa Processing', 'Agency Operations Management']
  },
  {
    title: 'Digital Operations',
    icon: 'Shield',
    description: ['Community Leadership', 'Quality Control', 'Fraud Detection & Prevention']
  },
  {
    title: 'Business Analytics',
    icon: 'BarChart',
    description: ['Advanced MS Excel Reporting', 'Process Optimization', 'Data-Driven Decision Support']
  }
];