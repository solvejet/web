// src/components/Footer/ContactCTASection/index.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const ContactCTASection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    // Handle form submission
    try {
      // Add your form submission logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: 'Quick Contact Form',
        });
      }
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-accent text-accent-foreground">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent/95 to-accent/90" />

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.857 8.485 15.272 9.9l9.9-9.9h-2.83zM32 0l-3.486 3.485-1.414 1.414L40.97 0H32zM0 5.373l.828-.83L2.243 5.96 0 8.2V5.374zm0 5.656l.828-.829 5.657 5.657-1.414 1.414L0 11.03v2.828l8.485 8.485L7.07 23.757 0 16.686v2.83l13.757 13.757L12.343 34.687 0 22.343v2.83L18.343 43.657 16.93 45.07 0 28.142v2.828L24.485 55.485 23.07 56.9 0 33.83v2.83L30.627 60l-1.414-1.415L0 39.5v2.827l36.284 36.284-1.414-1.414L0 45.172v2.828L42.627 60l-1.414-1.415L0 50.858v2.83l48.97 48.968-1.414-1.414L0 56.657v3.343h60L48.97 48.97l1.415-1.415 8.485 8.486h-2.827l-14.85-14.85 1.414-1.415 15.85 15.85h-2.828L42.627 42.627l1.414-1.414 15.85 15.85h-2.828l-21.92-21.92 1.414-1.415 22.92 22.92h-2.827L32 32l1.414-1.414 26.364 26.364h-2.83L32 32l1.414-1.414 31.778 31.778h-2.83L32 32l1.414-1.414 37.192 37.193h-2.83L32 32l1.414-1.414 42.607 42.607h-3.343L32 32l1.414-1.414 48.02 48.022h-3.343L32 32l1.414-1.414L60 57.173v-2.83L32 32l1.414-1.414L60 51.758v-2.83L32 32l1.414-1.414L60 46.343v-2.83L32 32l1.414-1.414L60 40.93v-2.83L32 32l1.414-1.414L60 35.515v-2.83L32 32l1.414-1.414L60 30.1v-2.83L32 32l1.414-1.414L60 24.687v-2.83L32 32l1.414-1.414L60 19.272v-2.83L32 32l1.414-1.414L60 13.858V11.03L32 32l1.414-1.414L60 8.444V5.6L32 32l1.414-1.414L60 3.03V0L32 32 33.414 30.586 60-2.828V0L32 32l1.414-1.414L60-8.242V0h-2.83L32 32l1.414-1.414L56.97 0h-2.828L32 32l1.414-1.414L51.557 0h-2.83L32 32l1.414-1.414L46.142 0h-2.83L32 32l1.414-1.414L40.728 0h-2.83L32 32l1.414-1.414L35.314 0h-2.83L32 32l1.414-1.414L29.9 0h-2.83L32 32l1.414-1.414L24.485 0h-2.83L32 32l1.414-1.414L19.07 0h-2.83L32 32l1.414-1.414L13.657 0h-2.83L32 32l1.414-1.414L8.243 0H5.414L32 32l1.414-1.414L2.83 0H0l32 32-1.414 1.414L0 5.657V8.5l32 32-1.414 1.414L0 11.072v2.828l32 32-1.414 1.414L0 16.486v2.83l32 32-1.414 1.414L0 21.9v2.83l32 32-1.414 1.414L0 27.314v2.83l32 32-1.414 1.414L0 32.73v2.828l32 32-1.414 1.414L0 38.142v2.83l32 32-1.414 1.414L0 43.557v2.83l32 32-1.414 1.414L0 48.97v2.83l32 32-1.414 1.414L0 54.385v2.83l32 32-1.414 1.414L0 59.8v.2h60L32 32l1.414-1.414L60 57.172v-2.83L32 32l1.414-1.414L60 51.757v-2.83L32 32l1.414-1.414L60 46.343v-2.83L32 32l1.414-1.414L60 40.93v-2.83L32 32l1.414-1.414L60 35.515v-2.83L32 32l1.414-1.414L60 30.1v-2.83L32 32l1.414-1.414L60 24.687v-2.83L32 32l1.414-1.414L60 19.272v-2.83L32 32l1.414-1.414L60 13.858V11.03L32 32l1.414-1.414L60 8.444V5.6L32 32l1.414-1.414L60 3.03V0zm0 60v-1.2l-1.202 1.2h2.402z' fill='%23fff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundSize: '30px 30px',
        }}
      />

      <div className="container relative mx-auto px-4 py-24 lg:py-32">
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-2">
          {/* Left Column - Main CTA */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Let&apos;s Build Something
                <span className="block">Amazing Together</span>
              </h2>
              <p className="mt-6 text-lg text-accent-foreground/80">
                Ready to transform your ideas into reality? Get in touch with our experts and
                let&apos;s discuss how we can help your business grow.
              </p>

              {/* Quick Contact Form */}
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Get Started
                  </Button>
                </div>
              </form>

              {/* Contact Options */}
              <div className="mt-12 flex flex-col gap-4">
                <a
                  href="mailto:contact@solvejet.com"
                  className="inline-flex items-center gap-2 text-accent-foreground/80 hover:text-accent-foreground"
                >
                  <Mail className="h-5 w-5" />
                  contact@solvejet.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center gap-2 text-accent-foreground/80 hover:text-accent-foreground"
                >
                  <Phone className="h-5 w-5" />
                  +1 (234) 567-890
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Cards */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-8"
            >
              {/* Schedule a Call Card */}
              <a
                href="/schedule"
                className={cn(
                  'group relative overflow-hidden rounded-2xl bg-white/10 p-8',
                  'transition-all duration-300 hover:bg-white/20'
                )}
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-flex rounded-lg bg-white/10 p-3">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Schedule a Call</h3>
                  <p className="mt-2 text-accent-foreground/80">
                    Book a free consultation with our experts
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2">
                    <span>Choose your slot</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </a>

              {/* Project Inquiry Card */}
              <a
                href="/start-project"
                className={cn(
                  'group relative overflow-hidden rounded-2xl bg-white/10 p-8',
                  'transition-all duration-300 hover:bg-white/20'
                )}
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-flex rounded-lg bg-white/10 p-3">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Start Your Project</h3>
                  <p className="mt-2 text-accent-foreground/80">Fill out our project brief form</p>
                  <div className="mt-4 inline-flex items-center gap-2">
                    <span>Get started now</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;
