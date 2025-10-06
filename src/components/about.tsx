import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/tuc-2.png"
              alt="Photographer"
              data-ai-hint="photographer portrait"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-headline text-4xl md:text-5xl text-primary leading-tight">
              The Ulta Camera: Crafting Memories, Celebrations & Personalized Experiences
            </h2>
            <p className="mt-6 text-lg text-muted-foreground font-body leading-relaxed">
              At The Ulta Camera, we don’t just capture moments—we craft experiences. From pre-wedding shoots in Delhi and destination weddings across India, to curated invites, bespoke gift hampers, and elegant wedding accessories, we help couples celebrate love in style. Our team combines creativity, professionalism, and a personal touch to make every wedding unforgettable.
            </p>
            <Button asChild size="lg" variant="link" className="mt-6 text-accent px-0 hover:text-accent/80">
                <a href="#services">
                    Explore Our Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}