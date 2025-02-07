// src/config/company-data.ts
import { Building2, Briefcase, Handshake, BookOpen } from 'lucide-react';

export const CompanyLinks = [
  {
    title: 'About Us',
    description: 'Our story, mission, and values',
    icon: Building2,
    href: '/about',
    links: [
      { text: 'Company Overview', href: '/about' },
      { text: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Careers',
    description: 'Join our growing team',
    icon: Briefcase,
    href: '/careers',
    links: [
      { text: 'View Openings', href: '/careers' },
      { text: 'Apply Now', href: '/careers/apply' },
    ],
  },
  {
    title: 'Partnerships',
    description: 'Collaborate and grow with us',
    icon: Handshake,
    href: '/partnerships',
    links: [
      { text: 'Partner Program', href: '/partnerships' },
      { text: 'Become a Partner', href: '/partnerships#join' },
    ],
  },
  {
    title: 'Blog',
    description: 'Insights and knowledge sharing',
    icon: BookOpen,
    href: '/blog',
    links: [
      { text: 'Case Studies', href: '/case-studies' },
      { text: 'Tech Blog', href: '/blog' },
    ],
  },
] as const;
