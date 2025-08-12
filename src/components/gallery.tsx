import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const galleryImages = [
  { src: 'https://placehold.co/800x1200.png', alt: 'A smiling couple at their wedding', hint: 'wedding couple' },
  { src: 'https://placehold.co/800x600.png', alt: 'A bride looking out a window', hint: 'bride portrait' },
  { src: 'https://placehold.co/800x1000.png', alt: 'Detailed shot of wedding rings', hint: 'wedding details' },
  { src: 'https://placehold.co/800x1200.png', alt: 'A couple walking on a beach at sunset', hint: 'couple sunset' },
  { src: 'https://placehold.co/800x600.png', alt: 'Guests celebrating at a wedding reception', hint: 'wedding reception' },
  { src: 'https://placehold.co/800x1000.png', alt: 'A groom adjusting his tie', hint: 'groom portrait' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">
            Gallery Showcase
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A glimpse into the stories we've had the honor of capturing.
          </p>
        </div>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="mb-4 lg:mb-6 break-inside-avoid">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                 <Image
                  src={image.src}
                  alt={image.alt}
                  data-ai-hint={image.hint}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
