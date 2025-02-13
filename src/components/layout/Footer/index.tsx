// src/components/layout/Footer/index.tsx
'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { CompanyLinks } from '@/config/company-data';
import { whatWeDoItems } from '@/config/menu-data';
import { industries } from '@/config/industry-data';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Logo from '@/components/ui/Logo';
import {
  footerVariants,
  staggerContainer,
  itemFadeIn,
  socialIconVariants,
} from '@/animations/footer';
import type { SocialLink, ContactInfo } from '@/types/footer';
import { useNewsletter } from '@/hooks/use-newsletter';

const footerLinks = {
  services: whatWeDoItems.slice(0, 6),
  industries: industries.slice(0, 6).map((industry) => ({
    title: industry.title,
    href: `/industries/${industry.id}`,
  })),
  company: CompanyLinks,
};

const socialLinks: SocialLink[] = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/solvejet' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/solvejet' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/solvejet' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/solvejet' },
];

const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    text: '123 Innovation Drive, Tech Valley, CA 94043',
    href: 'https://maps.google.com',
  },
  {
    icon: Phone,
    text: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: Mail,
    text: 'contact@solvejet.com',
    href: 'mailto:contact@solvejet.com',
  },
];

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const AnimatedLink = ({ href, children, className }: AnimatedLinkProps) => (
  <Link
    href={href}
    className={cn(
      'group relative inline-flex items-center gap-1',
      'text-muted-foreground hover:text-accent',
      'transition-colors duration-200',
      className
    )}
  >
    <span className="relative">
      {children}
      <span className="absolute left-0 right-0 bottom-0 h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </span>
    <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
  </Link>
);

interface AnimatedSectionProps {
  title: string;
  children: React.ReactNode;
}

const AnimatedSection = ({ title, children }: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      <motion.h3 variants={itemFadeIn} className="text-sm font-semibold text-foreground mb-4">
        {title}
      </motion.h3>
      {children}
    </motion.div>
  );
};

const SocialIcon = ({ name, icon: Icon, href }: SocialLink) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variants={socialIconVariants}
    whileHover="hover"
    whileTap="tap"
    className={cn(
      'relative p-3 rounded-full overflow-hidden group',
      'bg-accent/10 hover:bg-accent',
      'transition-colors duration-300'
    )}
    aria-label={`Follow us on ${name}`}
  >
    <Icon className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
  </motion.a>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const { status, message, subscribe } = useNewsletter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    const success = await subscribe(trimmedEmail);
    if (success) {
      setEmail('');
    }
  };

  return (
    <motion.footer
      ref={footerRef}
      style={{ opacity, y }}
      className="relative border-t border-border/50"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <div
          className="absolute -left-1/4 top-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(var(--accent) / 0.1) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -right-1/4 bottom-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(var(--accent) / 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={footerVariants}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
        >
          {/* Company Info Section */}
          <div className="lg:col-span-4">
            <motion.div variants={itemFadeIn}>
              <Logo className="h-12 w-auto mb-6" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Transform your business with our innovative software solutions. ISO certified custom
                development and digital transformation services.
              </p>
            </motion.div>

            {/* Contact Information */}
            <AnimatedSection title="Contact Us">
              <motion.div className="space-y-4" variants={staggerContainer}>
                {contactInfo.map(({ icon: Icon, text, href }) => (
                  <motion.div
                    key={text}
                    variants={itemFadeIn}
                    className="group flex items-start gap-3"
                  >
                    <Icon className="w-5 h-5 text-accent mt-1" />
                    {href ? (
                      <AnimatedLink href={href} className="text-sm">
                        {text}
                      </AnimatedLink>
                    ) : (
                      <span className="text-sm text-muted-foreground">{text}</span>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>

            {/* Social Links */}
            <motion.div
              className="mt-6 flex items-center gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {socialLinks.map((social) => (
                <SocialIcon key={social.name} {...social} />
              ))}
            </motion.div>
          </div>

          {/* Quick Links Sections */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {/* Services */}
              <AnimatedSection title="Services">
                <motion.ul className="space-y-3" variants={staggerContainer}>
                  {footerLinks.services.map((service) => (
                    <motion.li key={service.href} variants={itemFadeIn}>
                      <AnimatedLink href={service.href}>{service.title}</AnimatedLink>
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatedSection>

              {/* Industries */}
              <AnimatedSection title="Industries">
                <motion.ul className="space-y-3" variants={staggerContainer}>
                  {footerLinks.industries.map((industry) => (
                    <motion.li key={industry.href} variants={itemFadeIn}>
                      <AnimatedLink href={industry.href}>{industry.title}</AnimatedLink>
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatedSection>

              {/* Company */}
              <AnimatedSection title="Company">
                <motion.ul className="space-y-3" variants={staggerContainer}>
                  {footerLinks.company.map((item) => (
                    <motion.li key={item.href} variants={itemFadeIn}>
                      <AnimatedLink href={item.href}>{item.title}</AnimatedLink>
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatedSection>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-3">
            <AnimatedSection title="Stay Updated">
              <motion.div variants={itemFadeIn}>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to our newsletter for the latest updates and insights.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    aria-label="Newsletter subscription email"
                    className="focus:scale-102 transition-transform"
                  />
                  <Button
                    type="submit"
                    className="w-full group"
                    loading={status === 'loading'}
                    disabled={status === 'loading'}
                    icon={
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    }
                  >
                    Subscribe
                  </Button>
                  {message && (status === 'success' || status === 'error') && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'text-sm flex items-center gap-2',
                        status === 'success' ? 'text-green-500' : 'text-red-500'
                      )}
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex-shrink-0"
                      >
                        {status === 'success' ? '✓' : '⚠'}
                      </motion.span>
                      {message}
                    </motion.p>
                  )}
                </form>
              </motion.div>
            </AnimatedSection>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="relative border-t border-border/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SolveJet. All rights reserved.
            </p>
            <motion.div
              className="flex items-center gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {['Privacy Policy', 'Terms of Service'].map((text) => (
                <motion.div key={text} variants={itemFadeIn}>
                  <Link
                    href={`/${text.toLowerCase().replace(/\s+/g, '-')}`}
                    className={cn(
                      'text-sm text-muted-foreground relative group',
                      'hover:text-accent transition-colors duration-200'
                    )}
                  >
                    <span className="relative">
                      {text}
                      <span className="absolute left-0 right-0 bottom-0 h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </span>
                    <ExternalLink className="inline-block w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
