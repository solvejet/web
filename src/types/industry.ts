// src/types/industry.ts
import type { LucideIcon } from 'lucide-react';

// Icon types
export type IconName =
  | 'Code2'
  | 'Server'
  | 'Database'
  | 'Cloud'
  | 'Globe'
  | 'Users'
  | 'Building2'
  | 'Shield'
  | 'Rocket'
  | 'BarChart'
  | 'Cpu'
  | 'Factory'
  | 'ShoppingBag'
  | 'Truck'
  | 'PlaneTakeoff'
  | 'Waypoints'
  | 'ShieldCheck'
  | 'BarChart3'
  | 'Users2';

// Base statistics interface
export interface IndustryStats {
  value: string;
  label: string;
}

// Technology category interface
export interface IndustryTechnology {
  category: string;
  items: string[];
}

// Solution interfaces
export interface IndustrySolutionBase {
  title: string;
  description: string;
  features: string[];
}

export interface IndustrySolutionInput extends IndustrySolutionBase {
  icon: IconName;
}

export interface IndustrySolutionConfig extends IndustrySolutionBase {
  icon: LucideIcon;
}

// Base industry interfaces with common properties
export interface IndustryBase {
  title: string;
  description: string;
  stats: IndustryStats[];
  technologies: IndustryTechnology[];
  gradient: string;
  caseStudyStats?: IndustryStats[];
}

// Props interface for the IndustryContent component
export interface IndustryContentProps extends IndustryBase {
  icon: IconName;
  solutions: IndustrySolutionInput[];
}

// Props interface for the industry detail components
export interface IndustryDetailProps extends IndustryBase {
  icon: LucideIcon;
  solutions: IndustrySolutionConfig[];
}

// Complete industry interface for configuration
export interface Industry {
  id: string;
  title: string;
  icon: LucideIcon;
  shortDescription: string;
  fullDescription: string;
  gradient: string;
  stats: IndustryStats[];
  solutions: IndustrySolutionConfig[];
  technologies: IndustryTechnology[];
  keyFeatures: string[];
  caseStudyStats: IndustryStats[];
  image?: string;
}

// Type for industry data mapping
export type IndustryDataMap = Record<string, Industry>;

// Type for industry section configuration
export interface IndustrySectionConfig {
  title: string;
  description: string;
  items: Industry[];
}

// Type for industry list configuration
export interface IndustryListConfig {
  featured: Industry[];
  all: Industry[];
}
