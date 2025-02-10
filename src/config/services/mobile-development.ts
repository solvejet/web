// src/config/services/mobile-development.ts
import { Smartphone, Zap, Shield, Globe } from 'lucide-react';
import type { MobileDevelopmentContent } from '@/types/services';

export const mobileDevelopmentContent: MobileDevelopmentContent = {
  hero: {
    title: 'Mobile Development',
    subtitle: 'Native & Cross-Platform Apps',
    description: 'Build powerful mobile applications that engage users and drive business growth.',
    features: [
      {
        icon: Smartphone,
        title: 'Native Performance',
        description: 'Optimized for iOS and Android platforms',
      },
      {
        icon: Zap,
        title: 'Fast Development',
        description: 'Rapid development with modern frameworks',
      },
      {
        icon: Shield,
        title: 'Secure & Reliable',
        description: 'Built with security and stability in mind',
      },
    ],
  },
  services: [
    {
      title: 'iOS Development',
      description: 'Create native iOS applications',
      features: [
        {
          icon: Globe,
          title: 'iOS Expertise',
          description: 'Swift and SwiftUI development',
        },
      ],
      technologies: ['Swift', 'SwiftUI', 'UIKit'],
      benefits: ['Native Performance', 'App Store Optimization', 'iOS Features'],
    },
  ],
  faqs: [
    {
      question: 'Which platforms do you develop for?',
      answer:
        'We develop for both iOS and Android platforms, using either native technologies or cross-platform frameworks like React Native and Flutter.',
    },
  ],
  platforms: ['iOS', 'Android'],
  nativeTechnologies: ['Swift', 'Kotlin', 'Java'],
  crossPlatformTechnologies: ['React Native', 'Flutter'],
};
