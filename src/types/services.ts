// src/types/services.ts
import { type LucideIcon } from 'lucide-react';

// Base types
export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceHeroContent {
  title: string;
  subtitle: string;
  description: string;
  features: ServiceFeature[];
}

export interface ServiceDetails {
  title: string;
  description: string;
  features: ServiceFeature[];
  technologies: string[];
  benefits: string[];
}

// Base service content interface
export interface ServicePageContent {
  hero: ServiceHeroContent;
  services: ServiceDetails[];
  faqs: ServiceFAQ[];
}

// Web Development
export interface WebDevelopmentContent extends ServicePageContent {
  frameworks: string[];
  frontendTechnologies: string[];
  backendTechnologies: string[];
}

// Mobile Development
export interface MobileDevelopmentContent extends ServicePageContent {
  platforms: string[];
  nativeTechnologies: string[];
  crossPlatformTechnologies: string[];
}

// Cloud Services
export interface CloudServicesContent extends ServicePageContent {
  cloudPlatforms: string[];
  securityFeatures: string[];
  scalabilityOptions: string[];
}

// AI/ML Development
export interface AIMLContent extends ServicePageContent {
  aiModels: string[];
  mlFrameworks: string[];
  dataProcessingTools: string[];
}

// MVP Development
export interface MVPContent extends ServicePageContent {
  methodologies: string[];
  timeframes: string[];
  deliverables: string[];
}

// Staff Augmentation
export interface StaffAugmentationContent extends ServicePageContent {
  roles: string[];
  skills: string[];
  engagementModels: string[];
}

// IT Consulting
export interface ConsultingContent extends ServicePageContent {
  services: ServiceDetails[] &
    {
      consultingAreas: string[];
      deliverables: string[];
    }[];
}

// Blockchain Development
export interface BlockchainContent extends ServicePageContent {
  platforms: string[];
  smartContracts: string[];
  protocols: string[];
}

// Digital Transformation
export interface DigitalTransformationContent extends ServicePageContent {
  transformationAreas: string[];
  technologies: string[];
  methodologies: string[];
}

// Service Type Union
export type ServiceContent =
  | WebDevelopmentContent
  | MobileDevelopmentContent
  | CloudServicesContent
  | AIMLContent
  | MVPContent
  | StaffAugmentationContent
  | ConsultingContent
  | BlockchainContent
  | DigitalTransformationContent;

// Service Identifiers
export type ServiceIdentifier =
  | 'web-development'
  | 'mobile-development'
  | 'cloud-services'
  | 'ai-ml'
  | 'mvp'
  | 'staff-augmentation'
  | 'consulting'
  | 'blockchain'
  | 'digital-transformation';

// Service Gradients
export const serviceGradients: Record<ServiceIdentifier, string> = {
  'web-development': 'from-blue-500/20 to-indigo-500/20',
  'mobile-development': 'from-purple-500/20 to-pink-500/20',
  'cloud-services': 'from-cyan-500/20 to-blue-500/20',
  'ai-ml': 'from-emerald-500/20 to-teal-500/20',
  mvp: 'from-orange-500/20 to-red-500/20',
  'staff-augmentation': 'from-violet-500/20 to-purple-500/20',
  consulting: 'from-amber-500/20 to-yellow-500/20',
  blockchain: 'from-blue-500/20 to-purple-500/20',
  'digital-transformation': 'from-green-500/20 to-emerald-500/20',
} as const;
