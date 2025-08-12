import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

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
      <div className="relative z-10 text-center text-white p-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl drop-shadow-lg">
          Frame & Focus
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-body drop-shadow-md">
          Capturing life's moments, one frame at a time. Authentic, emotional,
          and timeless photography.
        </p>
        <Button asChild size="lg" className="mt-8 bg-primary/80 hover:bg-primary text-primary-foreground">
          <a href="#booking">
            Book a Session
          </a>
        </Button>
      </div>
      <div className="absolute bottom-10 z-10 text-white animate-bounce">
        <a href="#about" aria-label="Scroll to about section">
          <ArrowDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
}
