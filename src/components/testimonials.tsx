
'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Pencil, X, Trash2, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/context/site-content-context';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';

function Rating({ count, editable, onChange, 'data-testid': dataTestId }: { count: number; editable?: boolean; onChange?: (value: number) => void, 'data-testid'?: string }) {
  if (editable && onChange) {
    return (
        <div className="flex items-center gap-2">
            <Input 
                type="number" 
                value={count}
                onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if (isNaN(value) || value < 1) value = 1;
                    if (value > 5) value = 5;
                    onChange(value);
                }}
                className="w-16 text-center"
                min="1"
                max="5"
                data-testid={dataTestId}
            />
            <span className='text-sm text-muted-foreground'>/ 5 Stars</span>
        </div>
    );
  }

  return (
    <div className="flex gap-1 text-primary">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { content, isEditMode, editingSection, setEditingSection, handleContentChange } = useSiteContent();

  if (!content) return null;

  const { testimonials } = content;
  const isCurrentlyEditing = isEditMode && editingSection === 'testimonials';
  const duplicatedTestimonials = [...(testimonials.reviews || []), ...(testimonials.reviews || [])];

  const handleAddReview = () => {
    const newReview = {
      quote: "A new amazing review!",
      name: 'New Customer',
      rating: 5,
    };
    const newReviews = [...(content.testimonials.reviews || []), newReview];
    handleContentChange('testimonials.reviews', newReviews);
  };

  const handleRemoveReview = (index: number) => {
    const newReviews = [...content.testimonials.reviews];
    newReviews.splice(index, 1);
    handleContentChange('testimonials.reviews', newReviews);
  };

  return (
    <motion.section 
      id="testimonials" 
      className="relative py-16 md:py-32"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
       {isEditMode && (
        <div className="absolute bottom-4 right-4 z-20">
          <Button
            size="sm"
            onClick={() => setEditingSection(isCurrentlyEditing ? null : 'testimonials')}
            disabled={editingSection !== null && !isCurrentlyEditing}
          >
            {isCurrentlyEditing ? <X className="mr-2" /> : <Pencil className="mr-2" />}
            {isCurrentlyEditing ? 'Done' : 'Edit Testimonials'}
          </Button>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
            {isCurrentlyEditing ? (
                <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                    <Textarea
                        value={testimonials.heading}
                        onChange={(e) => handleContentChange('testimonials.heading', e.target.value)}
                        className="font-headline text-3xl md:text-5xl text-primary bg-transparent border-dashed text-center !h-auto min-h-[50px] resize-none"
                    />
                    <Textarea
                        value={testimonials.subheading}
                        onChange={(e) => handleContentChange('testimonials.subheading', e.target.value)}
                        className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground bg-transparent border-dashed text-center !h-auto min-h-[50px] resize-none"
                    />
                </div>
            ) : (
                <>
                    <h2 className="font-headline text-3xl md:text-5xl text-primary">
                        {testimonials.heading}
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
                        {testimonials.subheading}
                    </p>
                </>
            )}
        </div>
        <div className="relative w-full overflow-hidden">
          <motion.div 
            className="flex w-max hover:[animation-play-state:paused]"
            style={{ animation: `marquee ${testimonials.reviews.length * 5}s linear infinite`}}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={index} className="w-[300px] md:w-[350px] mx-4 flex-shrink-0">
                <Card className="h-full flex flex-col justify-between relative">
                   {isCurrentlyEditing && index < testimonials.reviews.length && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 z-10 h-7 w-7"
                        onClick={() => handleRemoveReview(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  <CardContent className="p-6 text-center flex flex-col items-center">
                    {isCurrentlyEditing && index < testimonials.reviews.length ? (
                        <div className="flex flex-col gap-2 w-full items-center">
                            <Rating 
                                count={testimonial.rating} 
                                editable 
                                onChange={(value) => handleContentChange(`testimonials.reviews.${index}.rating`, value)}
                                data-testid={`rating-input-${index}`}
                            />
                            <Textarea
                                value={testimonial.quote}
                                onChange={(e) => handleContentChange(`testimonials.reviews.${index}.quote`, e.target.value)}
                                className="mt-4 italic text-muted-foreground/90 text-sm bg-transparent border-dashed text-center !h-auto min-h-[100px] resize-none"
                            />
                            <Input
                                value={testimonial.name}
                                onChange={(e) => handleContentChange(`testimonials.reviews.${index}.name`, e.target.value)}
                                className="mt-6 font-bold font-headline text-base md:text-lg text-accent bg-transparent border-dashed text-center w-40"
                            />
                        </div>
                    ) : (
                        <>
                            <Rating count={testimonial.rating} />
                            <p className="mt-4 italic text-muted-foreground/90 text-sm">
                            "{testimonial.quote}"
                            </p>
                            <p className="mt-6 font-bold font-headline text-base md:text-lg text-accent">- {testimonial.name}</p>
                        </>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
           <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>

        {isCurrentlyEditing && (
            <div className="text-center mt-8">
                <Button onClick={handleAddReview}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Review
                </Button>
            </div>
        )}
      </div>
    </motion.section>
  );
}
