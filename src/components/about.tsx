'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src="/images/tuc-2.png"
              alt="Photographer"
              data-ai-hint="photographer portrait"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="font-headline text-3xl md:text-5xl text-primary leading-tight">
              The Ulta Camera: Crafting Memories, Celebrations & Personalized Experiences
            </h2>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground font-body leading-relaxed">
              At The Ulta Camera, we don’t just capture moments—we craft experiences. From pre-wedding shoots in Delhi and destination weddings across India, to curated invites, bespoke gift hampers, and elegant wedding accessories, we help couples celebrate love in style. Our team combines creativity, professionalism, and a personal touch to make every wedding unforgettable.
            </p>
            <Button asChild size="lg" variant="link" className="mt-4 md:mt-6 text-accent px-0 hover:text-accent/80 text-base md:text-lg">
                <a href="#services">
                    Explore Our Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
