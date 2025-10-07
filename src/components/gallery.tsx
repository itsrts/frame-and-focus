'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const galleryImages = [
  { src: '/images/asd-1.png', alt: 'Luxury wedding photography Delhi', hint: 'luxury wedding' },
  { src: '/images/asd-2.png', alt: 'Pre-wedding shoot Jaipur palace', hint: 'pre-wedding Jaipur' },
  { src: '/images/asd-3.png', alt: 'Customized wedding invitation design', hint: 'wedding invitation' },
  { src: '/images/asd-4.png', alt: 'Elegant wedding gift hamper for guests', hint: 'wedding gift' },
  { src: '/images/asd-5.png', alt: 'Wedding décor and accessories setup', hint: 'wedding decor' },
  { src: '/images/asd-6.png', alt: 'A groom adjusting his tie', hint: 'groom portrait' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-headline text-3xl md:text-5xl text-primary">
            Captured Moments & Styled Celebrations
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
            A glimpse into the stories we've had the honor of capturing.
          </p>
        </div>
        <motion.div
          className="columns-1 sm:columns-2 md:columns-3 gap-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="mb-4 break-inside-avoid"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
