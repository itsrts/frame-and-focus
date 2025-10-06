import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "From our pre-wedding shoot to the invites and gift hampers, The Ulta Camera made everything perfect. Truly a one-stop solution!",
    name: 'Preksha & Ritik',
    rating: 5,
  },
  {
    quote: "The wedding accessories and personalized gifts impressed every guest. Photography was stunning too!",
    name: 'Ananya & Rohan',
    rating: 5,
  },
  {
    quote: "Absolutely breathtaking photos! They captured our day perfectly. We couldn't be happier with the results and the experience.",
    name: 'Emily & James',
    rating: 5,
  },
  {
    quote: "The team was so professional and made us feel comfortable throughout the entire process. The photos are a treasure we'll cherish forever.",
    name: 'Sarah L.',
    rating: 5,
  },
];

function Rating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-primary">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">
            Couples and Guests Love Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Hear from couples and clients who trusted us with their memories.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="h-full flex flex-col justify-between">
                    <CardContent className="p-6 text-center flex flex-col items-center">
                        <Rating count={testimonial.rating} />
                        <p className="mt-4 italic text-muted-foreground/90">
                            "{testimonial.quote}"
                        </p>
                        <p className="mt-6 font-bold font-headline text-lg text-accent">- {testimonial.name}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex"/>
          <CarouselNext className="hidden sm:flex"/>
        </Carousel>
      </div>
    </section>
  );
}
