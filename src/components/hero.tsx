'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen"
    >
      <Image
        src="/images/tuc-1.png"
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
          className="font-headline text-5xl md:text-6xl lg:text-7xl drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your One-Stop Destination for Weddings, Pre-Weddings & More in India
        </motion.h1>
        <motion.p
          className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-body drop-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          From photography to personalized invites, luxury gift hampers, and wedding accessories, The Ulta Camera turns your wedding dreams into reality.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
        <Button asChild size="lg" className="mt-8 bg-primary/80 hover:bg-primary text-primary-foreground text-xl font-bold">
          <a href="#booking">
            Plan Your Perfect Wedding Today
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
