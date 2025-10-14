'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

type HeroProps = {
  content: {
    heading: string;
    subheading: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
  }
};

export default function Hero({ content }: HeroProps) {
  if (!content) return null;

  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen"
    >
      <Image
        src={content.backgroundImage}
        alt="Wedding photography"
        data-ai-hint="wedding photography"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        className="relative z-10 text-center text-white p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <motion.h1
          className="font-headline text-4xl md:text-6xl lg:text-7xl drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {content.heading}
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-body drop-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {content.subheading}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
        <Button asChild size="lg" className="mt-8 bg-primary/80 hover:bg-primary text-primary-foreground text-lg md:text-xl font-bold">
          <a href={content.ctaLink}>
            {content.ctaText}
          </a>
        </Button>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-10 z-10 text-white animate-bounce">
        <a href="#about" aria-label="Scroll to about section">
          <ArrowDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
}
