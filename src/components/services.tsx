
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/context/site-content-context';
import { Pencil, X } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import Link from 'next/link';

// Helper to get icon component from string
const getIcon = (name: string) => {
    const Icon = LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
    return Icon ? <Icon className="h-10 w-10 text-accent" /> : <LucideIcons.HelpCircle className="h-10 w-10 text-muted-foreground" />;
};


export default function Services() {
  const { content, isEditMode, editingSection, setEditingSection, handleContentChange } = useSiteContent();

  if (!content) return null;

  const { services } = content;
  const isCurrentlyEditing = isEditMode && editingSection === 'services';

  return (
    <section id="services" className="relative py-16 md:py-32 bg-secondary">
       {isEditMode && (
        <div className="absolute bottom-4 right-4 z-20">
          <Button
            size="sm"
            onClick={() => setEditingSection(isCurrentlyEditing ? null : 'services')}
            disabled={editingSection !== null && !isCurrentlyEditing}
          >
            {isCurrentlyEditing ? <X className="mr-2" /> : <Pencil className="mr-2" />}
            {isCurrentlyEditing ? 'Done' : 'Edit Services'}
          </Button>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {isCurrentlyEditing ? (
             <Textarea
              value={services.heading}
              onChange={(e) => handleContentChange('services.heading', e.target.value)}
              className="font-headline text-3xl md:text-5xl text-primary bg-transparent border-dashed text-center !h-auto min-h-[50px] resize-none"
            />
          ) : (
            <h2 className="font-headline text-3xl md:text-5xl text-primary">
              {services.heading}
            </h2>
          )}
        </motion.div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.list.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col text-center bg-background/70 hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                    {getIcon(service.icon)}
                  </div>
                  {isCurrentlyEditing ? (
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-1">
                          <Input 
                            value={service.icon}
                            onChange={(e) => handleContentChange(`services.list.${index}.icon`, e.target.value)}
                            className="bg-transparent border-dashed text-center text-xs w-20 mx-auto"
                            placeholder="Icon"
                          />
                       </div>
                       <Textarea 
                          value={service.title}
                          onChange={(e) => handleContentChange(`services.list.${index}.title`, e.target.value)}
                          className="font-headline text-2xl bg-transparent border-dashed text-center !h-auto min-h-[80px] resize-none"
                       />
                       <Textarea 
                          value={service.description}
                          onChange={(e) => handleContentChange(`services.list.${index}.description`, e.target.value)}
                          className="text-base text-muted-foreground/90 pt-2 bg-transparent border-dashed text-center !h-auto min-h-[100px] resize-none"
                       />
                    </div>
                  ) : (
                    <>
                      <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-base text-muted-foreground/90 pt-2">{service.description}</CardDescription>
                    </>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  {isCurrentlyEditing ? (
                     <div className="text-left space-y-2 text-muted-foreground text-sm">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <span className="text-accent mr-2 mt-1 flex-shrink-0">✓</span>
                           <Textarea 
                              value={feature}
                              onChange={(e) => handleContentChange(`services.list.${index}.features.${i}`, e.target.value)}
                              className="w-full bg-transparent border-dashed !h-auto min-h-[50px] resize-none p-1"
                           />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="text-left space-y-2 text-muted-foreground text-sm">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-accent mr-2 mt-1 flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter>
                   {isCurrentlyEditing ? (
                      <div className='flex flex-col gap-2 w-full'>
                        <Input
                          value={service.cta}
                          onChange={(e) => handleContentChange(`services.list.${index}.cta`, e.target.value)}
                          className="w-full bg-transparent border-dashed text-center"
                          placeholder='CTA Text'
                        />
                        <Input
                          value={service.ctaLink || ''}
                          onChange={(e) => handleContentChange(`services.list.${index}.ctaLink`, e.target.value)}
                          className="w-full bg-transparent border-dashed text-center text-xs"
                          placeholder='CTA Link (e.g. /service/slug or #booking)'
                        />
                      </div>
                   ) : (
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        {(service.ctaLink || '#booking').startsWith('/') ? (
                          <Link href={service.ctaLink || '#booking'}>{service.cta}</Link>
                        ) : (
                          <a href={service.ctaLink || '#booking'}>{service.cta}</a>
                        )}
                    </Button>
                   )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
