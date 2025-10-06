'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Mail, Gift, Gem, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Camera className="h-10 w-10 text-accent" />,
    title: 'Wedding & Pre-Wedding Photography',
    description: 'Capture your love story with authentic, candid, and timeless photography.',
    features: [
      'Wedding Photography: Full-day coverage for your wedding celebrations. Expertise in candid, luxury, and destination weddings.',
      'Pre-Wedding Shoots: Personalized sessions in Delhi, Jaipur, or any destination of your choice.',
      'Event Photography: Corporate or private events captured with precision and style.'
    ],
    cta: 'Book Your Photographer',
  },
  {
    icon: <Mail className="h-10 w-10 text-accent" />,
    title: 'Wedding Invitations',
    description: 'Set the perfect first impression with elegant and customized wedding invites.',
    features: [
      'Printed Invitations: Luxurious, tailored designs.',
      'Digital Invitations: Shareable, modern, and eco-friendly options.',
      'Custom Themes: Match your wedding vibe perfectly.'
    ],
    cta: 'Design Your Invitation',
  },
  {
    icon: <Gift className="h-10 w-10 text-accent" />,
    title: 'Gift Hampers',
    description: 'Delight your guests with thoughtfully curated wedding hampers.',
    features: [
      'Personalized Hampers: Include treats, keepsakes, and essentials for guests.',
      'Luxury Hampers: Perfect for VIP guests or destination wedding stays.',
      'Eco-Friendly Options: Sustainable and stylish gifting solutions.'
    ],
    cta: 'Order Your Gift Hampers',
  },
  {
    icon: <Gem className="h-10 w-10 text-accent" />,
    title: 'Wedding Accessories',
    description: 'Add elegance and charm to your wedding celebrations.',
    features: [
      'Decor Items: Personalized signage, table settings, and thematic décor.',
      'Bridal Accessories: Jewelry, props, and style elements for pre-wedding shoots and ceremonies.',
      'Event Essentials: Coordinated accessories to enhance every function.'
    ],
    cta: 'Shop Wedding Accessories',
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: 'Full Wedding Planning & Coordination',
    description: 'We handle every detail so you can enjoy the celebration.',
    features: [
      'One-Day Wedding Planner: Complete coordination for a stress-free wedding day.',
      'Vendor Management: Access trusted photographers, decorators, and entertainers.',
      'Destination Weddings: Plan, organize, and execute weddings anywhere in India.'
    ],
    cta: 'Plan Your Wedding With Us',
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-headline text-4xl md:text-5xl text-primary">
            Complete Wedding Solutions Under One Roof
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col text-center bg-background/70 hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground/90 pt-2">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="text-left space-y-2 text-muted-foreground">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-accent mr-2 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                   <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <a href="#booking">{service.cta}</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
