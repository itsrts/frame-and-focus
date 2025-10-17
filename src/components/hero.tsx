
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown, Upload, Pencil, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/context/site-content-context';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useState } from 'react';
import { uploadImage } from '@/app/lib/cloudinary';
import { useToast } from '@/hooks/use-toast';

export default function Hero() {
  const { content, isEditMode, editingSection, setEditingSection, handleContentChange } = useSiteContent();
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  if (!content) return null;

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      handleContentChange('hero.backgroundImage', imageUrl);
      toast({ title: 'Image uploaded successfully!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Image upload failed.' });
    } finally {
      setIsUploading(false);
    }
  };

  const isCurrentlyEditing = isEditMode && editingSection === 'hero';
  const { hero } = content;

  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen group"
    >
      <Image
        src={hero.backgroundImage}
        alt="Wedding photography"
        data-ai-hint="wedding photography"
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        className="relative z-10 text-center text-white p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {isCurrentlyEditing ? (
          <Textarea
            value={hero.heading}
            onChange={(e) => handleContentChange('hero.heading', e.target.value)}
            className="text-4xl md:text-6xl lg:text-7xl bg-transparent border-dashed text-white text-center font-headline !h-auto min-h-[100px] resize-none"
          />
        ) : (
          <motion.h1
            className="font-headline text-4xl md:text-6xl lg:text-7xl drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {hero.heading}
          </motion.h1>
        )}

        {isCurrentlyEditing ? (
          <Textarea
            value={hero.subheading}
            onChange={(e) => handleContentChange('hero.subheading', e.target.value)}
            className="mt-4 max-w-2xl mx-auto text-lg md:text-xl bg-transparent border-dashed text-white text-center font-body !h-auto min-h-[100px] resize-none"
          />
        ) : (
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-body drop-shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {hero.subheading}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {isCurrentlyEditing ? (
            <div className='flex items-center gap-2 mt-8 justify-center'>
              <Input
                value={hero.ctaText}
                onChange={(e) => handleContentChange('hero.ctaText', e.target.value)}
                className="bg-transparent border-dashed text-white text-lg md:text-xl font-bold w-auto"
              />
               <Input
                value={hero.ctaLink}
                onChange={(e) => handleContentChange('hero.ctaLink', e.target.value)}
                className="bg-transparent border-dashed text-white text-sm w-auto"
                placeholder='CTA Link'
              />
            </div>
          ) : (
            <Button asChild size="lg" className="mt-8 bg-primary/80 hover:bg-primary text-primary-foreground text-lg md:text-xl font-bold">
              <a href={hero.ctaLink}>
                {hero.ctaText}
              </a>
            </Button>
          )}
        </motion.div>
      </motion.div>
      
      {isEditMode && (
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          <Button
            size="sm"
            onClick={() => setEditingSection(isCurrentlyEditing ? null : 'hero')}
            disabled={editingSection !== null && !isCurrentlyEditing}
            className="bg-background/80 hover:bg-background text-foreground backdrop-blur-sm"
          >
            {isCurrentlyEditing ? <X className="mr-2" /> : <Pencil className="mr-2" />}
            {isCurrentlyEditing ? 'Done' : 'Edit Hero'}
          </Button>
          {isCurrentlyEditing && (
            <div>
              <Label
                htmlFor="hero-bg-upload"
                className="cursor-pointer bg-background text-foreground p-2 rounded-md shadow-lg flex items-center gap-2 text-sm h-9"
              >
                <Upload className="h-4 w-4" />
                {isUploading ? 'Uploading...' : 'Change Background'}
              </Label>
              <Input
                id="hero-bg-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </div>
          )}
        </div>
      )}

      <div className="absolute bottom-10 z-10 text-white animate-bounce">
        <a href="#about" aria-label="Scroll to about section">
          <ArrowDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
}
