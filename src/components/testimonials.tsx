import { Card, CardContent } from '@/components/ui/card';
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
  const duplicatedTestimonials = [...testimonials, ...testimonials];

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
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee hover:pause">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={index} className="w-[350px] mx-4 flex-shrink-0">
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
            ))}
          </div>
           <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
