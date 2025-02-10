// src/config/services/web-development.ts
import { Code, Globe, Rocket, Server, Shield } from 'lucide-react';
import type { WebDevelopmentContent } from '@/types/services';

export const webDevelopmentContent: WebDevelopmentContent = {
  hero: {
    title: 'Web Development',
    subtitle: 'Transform Your Digital Presence',
    description:
      'Create powerful, scalable web applications with cutting-edge technologies and best practices.',
    features: [
      {
        icon: Globe,
        title: 'Modern Web Apps',
        description: 'Built with the latest technologies and frameworks',
      },
      {
        icon: Rocket,
        title: 'Performance First',
        description: 'Optimized for speed and user experience',
      },
      {
        icon: Shield,
        title: 'Secure by Design',
        description: 'Built with security best practices',
      },
    ],
  },
  services: [
    {
      title: 'Frontend Development',
      description: 'Create responsive and engaging user interfaces',
      features: [
        {
          icon: Code,
          title: 'Modern Frameworks',
          description: 'React, Vue, Angular implementations',
        },
      ],
      technologies: ['React', 'Next.js', 'TypeScript'],
      benefits: ['Improved UX', 'Better Performance', 'SEO Friendly'],
    },
    {
      title: 'Backend Development',
      description: 'Build robust and scalable server-side solutions',
      features: [
        {
          icon: Server,
          title: 'API Development',
          description: 'RESTful and GraphQL APIs',
        },
      ],
      technologies: ['Node.js', 'Python', 'PostgreSQL'],
      benefits: ['Scalable', 'Secure', 'Maintainable'],
    },
  ],
  faqs: [
    {
      question: 'What technologies do you use for web development?',
      answer:
        'We primarily use React, Next.js, and TypeScript for frontend development, along with Node.js and Python for backend services.',
    },
    {
      question: 'How long does it typically take to develop a web application?',
      answer:
        'Development timelines vary based on project complexity, but typically range from 2-6 months for a full-featured web application.',
    },
  ],
  frameworks: ['React', 'Next.js', 'Vue.js', 'Angular'],
  frontendTechnologies: ['TypeScript', 'Tailwind CSS', 'GSAP'],
  backendTechnologies: ['Node.js', 'Python', 'PostgreSQL'],
};
