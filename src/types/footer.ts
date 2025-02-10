// src/types/footer.ts
import type { LucideIcon } from 'lucide-react';

export interface SocialLink {
  name: string;
  icon: LucideIcon;
  href: string;
}

export interface ContactInfo {
  icon: LucideIcon;
  text: string;
  href?: string;
}

export type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error';
