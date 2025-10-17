
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Pencil, Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/context/site-content-context';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/app/lib/cloudinary';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export default function About() {
  const { content, isEditMode, editingSection, setEditingSection, handleContentChange } = useSiteContent();
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  if (!content) return null;

  const { about } = content;
  const isCurrentlyEditing = isEditMode && editingSection === 'about';

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      handleContentChange('about.image', imageUrl);
      toast({ title: 'Image uploaded successfully!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Image upload failed.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="about" className="relative py-16 md:py-32 bg-secondary">
       {isEditMode && (
        <div className="absolute top-4 right-4 z-20">
          <Button
            size="sm"
            onClick={() => setEditingSection(isCurrentlyEditing ? null : 'about')}
            disabled={editingSection !== null && !isCurrentlyEditing}
          >
            {isCurrentlyEditing ? <X className="mr-2" /> : <Pencil className="mr-2" />}
            {isCurrentlyEditing ? 'Done' : 'Edit About'}
          </Button>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          <motion.div
            className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Image
              src={about.image}
              alt="Photographer"
              data-ai-hint={about.imageHint}
              fill
              className="object-cover"
            />
            {isCurrentlyEditing && (
              <div className="absolute bottom-4 right-4 z-20">
                <Label
                  htmlFor="about-image-upload"
                  className="cursor-pointer bg-background text-foreground p-2 rounded-md shadow-lg flex items-center gap-2 text-sm"
                >
                  <Upload className="h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Change Image'}
                </Label>
                <Input
                  id="about-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </div>
            )}
          </motion.div>
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {isCurrentlyEditing ? (
              <Textarea
                value={about.heading}
                onChange={(e) => handleContentChange('about.heading', e.target.value)}
                className="font-headline text-3xl md:text-5xl text-primary leading-tight bg-transparent border-dashed !h-auto min-h-[100px] resize-none"
              />
            ) : (
              <h2 className="font-headline text-3xl md:text-5xl text-primary leading-tight">
                {about.heading}
              </h2>
            )}

            {isCurrentlyEditing ? (
              <Textarea
                value={about.paragraph}
                onChange={(e) => handleContentChange('about.paragraph', e.target.value)}
                className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground font-body leading-relaxed bg-transparent border-dashed !h-auto min-h-[150px] resize-none"
              />
            ) : (
              <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground font-body leading-relaxed">
                {about.paragraph}
              </p>
            )}

            {isCurrentlyEditing ? (
              <div className="flex items-center gap-2 mt-4 md:mt-6">
                 <Input
                    value={about.ctaText}
                    onChange={(e) => handleContentChange('about.ctaText', e.target.value)}
                    className="bg-transparent border-dashed text-accent w-auto text-base md:text-lg"
                  />
                  <Input
                    value={about.ctaLink}
                    onChange={(e) => handleContentChange('about.ctaLink', e.target.value)}
                    className="bg-transparent border-dashed text-accent w-auto text-sm"
                    placeholder="CTA Link"
                  />
              </div>
            ) : (
              <Button asChild size="lg" variant="link" className="mt-4 md:mt-6 text-accent px-0 hover:text-accent/80 text-base md:text-lg">
                  <a href={about.ctaLink}>
                      {about.ctaText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
