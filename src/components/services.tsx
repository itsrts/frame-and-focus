import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Camera, Users, PartyPopper } from 'lucide-react';

const services = [
  {
    icon: <Camera className="h-10 w-10 text-accent" />,
    title: 'Wedding Coverage',
    description: 'Full-day coverage to capture every moment of your special day, from getting ready to the final dance.',
    price: 'Starting at $2,500',
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: 'Portrait Sessions',
    description: 'Engagement, family, or individual portraits. Tailored sessions to capture your personality and story.',
    price: 'Starting at $450',
  },
  {
    icon: <PartyPopper className="h-10 w-10 text-accent" />,
    title: 'Event Photography',
    description: 'Professional photography for corporate events, parties, and other special occasions.',
    price: 'Contact for quote',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We offer a range of photography services to meet your needs.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center bg-background/70 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground/90 mb-4">{service.description}</CardDescription>
                <p className="text-lg font-semibold text-accent">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
