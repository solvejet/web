// src/config/industry-data.ts
import {
  Building2,
  Factory,
  ShoppingBag,
  Truck,
  PlaneTakeoff,
  Waypoints,
  ShieldCheck,
  BarChart3,
  Globe,
  Cloud,
  Users2,
} from 'lucide-react';
import type { Industry } from '@/types/industry';

const TECH_CATEGORIES = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DATABASE: 'Database',
  CLOUD: 'Cloud',
  DEVOPS: 'DevOps',
  MOBILE: 'Mobile',
} as const;

export const industries: Industry[] = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    icon: Building2,
    shortDescription:
      'Digital solutions for property management, smart buildings, and real estate operations.',
    fullDescription:
      'Transform property management and real estate operations with innovative digital solutions designed for modern real estate businesses. From property management systems to smart building integration, we help real estate companies embrace digital transformation.',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    stats: [
      { value: '500+', label: 'Properties Managed' },
      { value: '35%', label: 'Cost Reduction' },
      { value: '98%', label: 'Client Satisfaction' },
    ],
    solutions: [
      {
        title: 'Property Management Systems',
        description:
          'End-to-end digital solutions for property listing, tenant management, and maintenance',
        icon: Building2,
        features: [
          'Automated rent collection',
          'Maintenance request tracking',
          'Tenant portal access',
          'Document management',
        ],
      },
      {
        title: 'Smart Building Integration',
        description: 'IoT-enabled systems for building automation and energy management',
        icon: Waypoints,
        features: [
          'Energy monitoring',
          'Access control',
          'Environmental sensors',
          'Predictive maintenance',
        ],
      },
      {
        title: 'Real Estate Analytics',
        description: 'Data-driven insights for market analysis and investment decisions',
        icon: BarChart3,
        features: [
          'Market trend analysis',
          'Investment forecasting',
          'Performance metrics',
          'Portfolio management',
        ],
      },
    ],
    technologies: [
      {
        category: TECH_CATEGORIES.FRONTEND,
        items: ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript'],
      },
      {
        category: TECH_CATEGORIES.BACKEND,
        items: ['Node.js', 'Python', 'Java', 'Spring Boot'],
      },
      {
        category: TECH_CATEGORIES.DATABASE,
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
      },
      {
        category: TECH_CATEGORIES.CLOUD,
        items: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes'],
      },
    ],
    keyFeatures: [
      'Automated property management',
      'Smart building systems',
      'Real-time analytics',
      'Document automation',
      'Tenant management',
    ],
    caseStudyStats: [
      { value: '45%', label: 'Operational Efficiency' },
      { value: '60%', label: 'Faster Leasing' },
      { value: '30%', label: 'Energy Savings' },
    ],
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Industry 4.0',
    icon: Factory,
    shortDescription:
      'Smart manufacturing solutions with IoT integration and automation capabilities.',
    fullDescription:
      'Revolutionize manufacturing operations with Industry 4.0 technologies. Our solutions integrate IoT, AI, and automation to create smart factories that are more efficient, productive, and sustainable.',
    gradient: 'from-green-500/20 to-emerald-500/20',
    stats: [
      { value: '40%', label: 'Efficiency Gain' },
      { value: '65%', label: 'Defect Reduction' },
      { value: '25%', label: 'Cost Savings' },
    ],
    solutions: [
      {
        title: 'Smart Manufacturing',
        description: 'IoT-enabled production monitoring and control systems',
        icon: Waypoints,
        features: [
          'Real-time monitoring',
          'Production optimization',
          'Quality control',
          'Resource management',
        ],
      },
      {
        title: 'Supply Chain Optimization',
        description: 'End-to-end supply chain visibility and management',
        icon: Truck,
        features: [
          'Inventory tracking',
          'Supplier management',
          'Demand forecasting',
          'Logistics optimization',
        ],
      },
      {
        title: 'Quality Assurance',
        description: 'AI-powered quality control and testing solutions',
        icon: ShieldCheck,
        features: [
          'Automated inspection',
          'Defect detection',
          'Quality analytics',
          'Compliance management',
        ],
      },
    ],
    technologies: [
      {
        category: TECH_CATEGORIES.FRONTEND,
        items: ['React', 'Vue.js', 'Angular', 'D3.js'],
      },
      {
        category: TECH_CATEGORIES.BACKEND,
        items: ['Python', 'Java', 'C++', 'Go'],
      },
      {
        category: TECH_CATEGORIES.DATABASE,
        items: ['TimescaleDB', 'InfluxDB', 'MongoDB', 'Redis'],
      },
      {
        category: TECH_CATEGORIES.CLOUD,
        items: ['AWS IoT', 'Azure IoT', 'Google Cloud IoT'],
      },
    ],
    keyFeatures: [
      'Real-time monitoring',
      'Predictive maintenance',
      'Quality control',
      'Resource optimization',
      'Supply chain visibility',
    ],
    caseStudyStats: [
      { value: '40%', label: 'Production Increase' },
      { value: '65%', label: 'Quality Improvement' },
      { value: '35%', label: 'Maintenance Cost Reduction' },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Retail',
    icon: ShoppingBag,
    shortDescription: 'Scalable e-commerce solutions for modern retail businesses.',
    fullDescription:
      'Build powerful e-commerce platforms that drive growth and enhance customer experience. Our solutions help retailers create seamless shopping experiences across all channels.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    stats: [
      { value: '1M+', label: 'Orders Processed' },
      { value: '99.9%', label: 'Uptime' },
      { value: '45%', label: 'Revenue Growth' },
    ],
    solutions: [
      {
        title: 'E-commerce Platforms',
        description: 'Custom B2B and B2C marketplace solutions',
        icon: Globe,
        features: [
          'Product management',
          'Order processing',
          'Payment integration',
          'Inventory management',
        ],
      },
      {
        title: 'Omnichannel Retail',
        description: 'Unified retail experience across all channels',
        icon: ShoppingBag,
        features: [
          'Inventory sync',
          'Order management',
          'Customer profiles',
          'Analytics dashboard',
        ],
      },
      {
        title: 'Analytics & Insights',
        description: 'Data-driven retail analytics and insights',
        icon: BarChart3,
        features: [
          'Sales analytics',
          'Customer behavior',
          'Inventory optimization',
          'Performance metrics',
        ],
      },
    ],
    technologies: [
      {
        category: TECH_CATEGORIES.FRONTEND,
        items: ['React', 'Next.js', 'Vue.js', 'PWA'],
      },
      {
        category: TECH_CATEGORIES.BACKEND,
        items: ['Node.js', 'Python', 'Java', 'PHP'],
      },
      {
        category: TECH_CATEGORIES.DATABASE,
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
      },
      {
        category: TECH_CATEGORIES.CLOUD,
        items: ['AWS', 'Azure', 'CloudFlare', 'Vercel'],
      },
    ],
    keyFeatures: [
      'Seamless checkout',
      'Inventory management',
      'Multi-channel integration',
      'Customer analytics',
      'Payment processing',
    ],
    caseStudyStats: [
      { value: '200%', label: 'Online Sales Growth' },
      { value: '45%', label: 'Customer Retention' },
      { value: '60%', label: 'Mobile Conversion' },
    ],
  },
  {
    id: 'logistics',
    title: 'Logistics & Transportation',
    icon: Truck,
    shortDescription: 'Intelligent logistics solutions for modern supply chains.',
    fullDescription:
      'Optimize logistics operations with intelligent supply chain solutions. Our technology helps streamline transportation, warehousing, and delivery processes.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    stats: [
      { value: '50M+', label: 'Miles Tracked' },
      { value: '99.9%', label: 'Delivery Success' },
      { value: '28%', label: 'Cost Reduction' },
    ],
    solutions: [
      {
        title: 'Fleet Management',
        description: 'Real-time fleet tracking and optimization',
        icon: Truck,
        features: [
          'Vehicle tracking',
          'Route optimization',
          'Maintenance scheduling',
          'Driver management',
        ],
      },
      {
        title: 'Warehouse Management',
        description: 'Smart warehouse operations and automation',
        icon: Building2,
        features: [
          'Inventory tracking',
          'Order fulfillment',
          'Space optimization',
          'Worker safety',
        ],
      },
      {
        title: 'Supply Chain Visibility',
        description: 'End-to-end supply chain tracking',
        icon: Globe,
        features: [
          'Real-time tracking',
          'Performance analytics',
          'Risk management',
          'Compliance monitoring',
        ],
      },
    ],
    technologies: [
      {
        category: TECH_CATEGORIES.FRONTEND,
        items: ['React', 'Next.js', 'TypeScript', 'Mapbox GL', 'Leaflet', 'D3.js'],
      },
      {
        category: TECH_CATEGORIES.BACKEND,
        items: ['Node.js', 'Python', 'Java', 'Go', 'Spring Boot'],
      },
      {
        category: TECH_CATEGORIES.DATABASE,
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'TimescaleDB', 'Apache Cassandra'],
      },
      {
        category: TECH_CATEGORIES.CLOUD,
        items: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker'],
      },
    ],
    keyFeatures: [
      'Real-time tracking',
      'Route optimization',
      'Warehouse automation',
      'Inventory management',
      'Delivery optimization',
    ],
    caseStudyStats: [
      { value: '30%', label: 'Fuel Savings' },
      { value: '40%', label: 'Faster Delivery' },
      { value: '25%', label: 'Operating Costs' },
    ],
  },
  {
    id: 'travel-tourism',
    title: 'Travel & Tourism',
    icon: PlaneTakeoff,
    shortDescription: 'Digital solutions for modern travel and tourism businesses.',
    fullDescription:
      'Transform travel experiences with innovative digital solutions. Our technology helps travel businesses create seamless, personalized experiences for their customers.',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    stats: [
      { value: '10M+', label: 'Bookings' },
      { value: '95%', label: 'Customer Rating' },
      { value: '30%', label: 'Efficiency Boost' },
    ],
    solutions: [
      {
        title: 'Booking Platforms',
        description: 'Comprehensive travel booking systems',
        icon: Globe,
        features: [
          'Flight booking',
          'Hotel reservations',
          'Activity management',
          'Payment processing',
        ],
      },
      {
        title: 'Travel CRM',
        description: 'Customer relationship management for travel',
        icon: Users2,
        features: [
          'Customer profiles',
          'Booking history',
          'Communication tools',
          'Analytics dashboard',
        ],
      },
      {
        title: 'Travel Operations',
        description: 'Cloud-based operations management',
        icon: Cloud,
        features: [
          'Resource scheduling',
          'Inventory management',
          'Partner integration',
          'Revenue management',
        ],
      },
    ],
    technologies: [
      {
        category: TECH_CATEGORIES.FRONTEND,
        items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'WebGL', 'Three.js'],
      },
      {
        category: TECH_CATEGORIES.BACKEND,
        items: ['Node.js', 'Python', 'Java', 'GraphQL', 'RESTful APIs'],
      },
      {
        category: TECH_CATEGORIES.DATABASE,
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Neo4j'],
      },
      {
        category: TECH_CATEGORIES.CLOUD,
        items: ['AWS', 'Azure', 'CloudFlare', 'Vercel', 'Netlify'],
      },
    ],
    keyFeatures: [
      'Online booking',
      'Itinerary management',
      'Customer service',
      'Partner integration',
      'Analytics dashboard',
    ],
    caseStudyStats: [
      { value: '45%', label: 'Booking Increase' },
      { value: '35%', label: 'Customer Satisfaction' },
      { value: '25%', label: 'Operational Costs' },
    ],
  },
];

// Helper functions to manipulate the industry data
export const getIndustryById = (id: string): Industry | undefined =>
  industries.find((industry) => industry.id === id);

export const getFeaturedIndustries = (): Industry[] => industries.slice(0, 3);

export const getIndustryDataMap = (): Record<string, Industry> =>
  industries.reduce(
    (acc, industry) => ({
      ...acc,
      [industry.id]: industry,
    }),
    {}
  );

// Export individual industries for direct access
export const industryMap = getIndustryDataMap();

// Export configuration for sections
export const industrySections = {
  featured: {
    title: 'Featured Industries',
    description: 'Explore our industry-specific solutions',
    items: getFeaturedIndustries(),
  },
  all: {
    title: 'All Industries',
    description: 'Complete list of industries we serve',
    items: industries,
  },
};
