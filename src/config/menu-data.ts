// src/config/menu-data.ts
import {
  Lightbulb,
  Globe,
  Cloud,
  Building2,
  Building,
  Factory,
  PlaneTakeoff,
  Truck,
  Trophy,
  Users2,
  BarChart3,
  Briefcase,
  ShieldCheck,
  Waypoints,
  Blocks,
  Brain,
  ChevronRight,
  Code,
  Smartphone,
  Users,
} from 'lucide-react';

// Existing MenuItem interface
export interface MenuItem {
  title: string;
  description: string;
  icon: typeof Lightbulb;
  href: string;
  color?: string;
}

// New interfaces for industries
export interface IndustryFeature {
  icon: typeof Trophy;
  title: string;
  description: string;
}

export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  icon: typeof Building2;
  description: string;
  features: IndustryFeature[];
  stats: IndustryStat[];
  image: string;
  solutions?: string[];
}

// Existing whatWeDoItems array
export const whatWeDoItems: MenuItem[] = [
  {
    title: 'Technology Consulting',
    description: 'Strategic guidance to transform your business with cutting-edge technology',
    icon: Lightbulb,
    href: '/services/consulting',
    color: 'var(--consulting)',
  },
  {
    title: 'Custom Software Development',
    description: 'Tailored solutions built to address your unique business challenges',
    icon: Code,
    href: '/services/custom-software',
    color: 'var(--software)',
  },
  {
    title: 'MVP Development',
    description: 'Rapid development of viable products to test your market',
    icon: ChevronRight,
    href: '/services/mvp',
    color: 'var(--mvp)',
  },
  {
    title: 'IT Staff Augmentation',
    description: 'Expert tech talent to strengthen your development team',
    icon: Users,
    href: '/services/staff-augmentation',
    color: 'var(--staff)',
  },
  {
    title: 'Web Development',
    description: 'Modern web applications built with cutting-edge technologies',
    icon: Globe,
    href: '/services/web-development',
    color: 'var(--web)',
  },
  {
    title: 'AI/ML Solutions',
    description: 'Intelligent solutions powered by advanced AI and machine learning',
    icon: Brain,
    href: '/services/ai-ml',
    color: 'var(--ai)',
  },
  {
    title: 'Cloud Services',
    description: 'Scalable cloud solutions for modern business needs',
    icon: Cloud,
    href: '/services/cloud',
    color: 'var(--cloud)',
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications',
    icon: Smartphone,
    href: '/services/mobile',
    color: 'var(--mobile)',
  },
  {
    title: 'Blockchain Development',
    description: 'Secure and innovative blockchain solutions',
    icon: Blocks,
    href: '/services/blockchain',
    color: 'var(--blockchain)',
  },
];

// New industries data
export const industriesItems: IndustryItem[] = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    icon: Building2,
    description:
      'Transform property management and real estate operations with innovative digital solutions',
    features: [
      {
        icon: Trophy,
        title: 'Property Management Systems',
        description:
          'End-to-end digital solutions for property listing, tenant management, and maintenance',
      },
      {
        icon: Users2,
        title: 'Smart Building Integration',
        description: 'IoT-enabled systems for modern building automation and energy management',
      },
      {
        icon: BarChart3,
        title: 'Real Estate Analytics',
        description: 'Data-driven insights for market analysis and investment decisions',
      },
    ],
    stats: [
      { value: '500+', label: 'Properties Managed' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '35%', label: 'Cost Reduction' },
    ],
    image: '/images/industries/real-estate.webp',
    solutions: ['Property Management', 'Tenant Portal', 'Smart Buildings', 'Market Analytics'],
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    icon: Building,
    description:
      'Build scalable and secure ecommerce platforms that drive growth and enhance customer experience',
    features: [
      {
        icon: Briefcase,
        title: 'Marketplace Solutions',
        description: 'Custom B2B and B2C marketplace platforms with advanced features',
      },
      {
        icon: ShieldCheck,
        title: 'Secure Payments',
        description: 'Multi-gateway payment integration with fraud protection',
      },
      {
        icon: BarChart3,
        title: 'Commerce Analytics',
        description: 'Advanced analytics for sales, inventory, and customer insights',
      },
    ],
    stats: [
      { value: '1M+', label: 'Orders Processed' },
      { value: '99.9%', label: 'Platform Uptime' },
      { value: '45%', label: 'Revenue Growth' },
    ],
    image: '/images/industries/ecommerce.webp',
    solutions: ['Custom Marketplaces', 'Inventory Management', 'Payment Solutions', 'Analytics'],
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    icon: Factory,
    description:
      'Optimize manufacturing processes with Industry 4.0 technologies and smart automation',
    features: [
      {
        icon: Waypoints,
        title: 'Smart Manufacturing',
        description: 'IoT-enabled production monitoring and control systems',
      },
      {
        icon: ShieldCheck,
        title: 'Quality Assurance',
        description: 'Automated quality control and testing solutions',
      },
      {
        icon: BarChart3,
        title: 'Production Analytics',
        description: 'Real-time analytics for production optimization',
      },
    ],
    stats: [
      { value: '40%', label: 'Efficiency Gain' },
      { value: '65%', label: 'Defect Reduction' },
      { value: '25%', label: 'Cost Savings' },
    ],
    image: '/images/industries/manufacturing.webp',
    solutions: ['Smart Factory', 'Quality Control', 'Supply Chain', 'Production Planning'],
  },
  {
    id: 'travel-tourism',
    title: 'Travel & Tourism',
    icon: PlaneTakeoff,
    description: 'Create seamless travel experiences with innovative digital solutions',
    features: [
      {
        icon: Globe,
        title: 'Booking Platforms',
        description: 'Comprehensive travel booking and management systems',
      },
      {
        icon: Users2,
        title: 'Customer Experience',
        description: 'AI-powered personalization and recommendation engines',
      },
      {
        icon: Cloud,
        title: 'Travel Operations',
        description: 'Cloud-based operations management solutions',
      },
    ],
    stats: [
      { value: '10M+', label: 'Bookings' },
      { value: '95%', label: 'Customer Rating' },
      { value: '30%', label: 'Efficiency Boost' },
    ],
    image: '/images/industries/travel.webp',
    solutions: ['Booking Engine', 'Travel CRM', 'Tour Management', 'Travel Analytics'],
  },
  {
    id: 'logistics',
    title: 'Logistics',
    icon: Truck,
    description: 'Streamline logistics operations with intelligent supply chain solutions',
    features: [
      {
        icon: Waypoints,
        title: 'Route Optimization',
        description: 'AI-powered route planning and optimization',
      },
      {
        icon: ShieldCheck,
        title: 'Fleet Management',
        description: 'Real-time fleet tracking and maintenance systems',
      },
      {
        icon: BarChart3,
        title: 'Logistics Analytics',
        description: 'Supply chain visibility and performance analytics',
      },
    ],
    stats: [
      { value: '50M+', label: 'Miles Tracked' },
      { value: '99.9%', label: 'Delivery Success' },
      { value: '28%', label: 'Cost Reduction' },
    ],
    image: '/images/industries/logistics.webp',
    solutions: ['Fleet Management', 'Route Planning', 'Warehouse Management', 'Supply Chain'],
  },
] as const;
