import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="https://placehold.co/800x1000.png"
              alt="Photographer"
              data-ai-hint="photographer portrait"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-headline text-4xl md:text-5xl text-primary">
              About Me
            </h2>
            <p className="mt-6 text-lg text-muted-foreground font-body leading-relaxed">
              At Frame & Focus, we believe every couple has a unique story — and
              we’re here to frame it with creativity, detail, and real
              emotions.
            </p>
            <p className="mt-4 text-muted-foreground font-body leading-relaxed">
              With years of experience and a passion for candid storytelling, we
              capture weddings just the way they’re meant to be remembered —
              raw, beautiful, and timeless. Our approach is to blend into your
              day, capturing the genuine smiles, happy tears, and all the
              unscripted moments in between.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
