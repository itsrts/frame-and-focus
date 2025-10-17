
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/context/site-content-context';
import { Button } from './ui/button';
import { Pencil, Upload, X } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/app/lib/cloudinary';

export default function Gallery() {
  const { content, isEditMode, editingSection, setEditingSection, handleContentChange } = useSiteContent();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const { toast } = useToast();

  if (!content) return null;

  const { gallery } = content;
  const isCurrentlyEditing = isEditMode && editingSection === 'gallery';

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingIndex(index);
    try {
      const imageUrl = await uploadImage(file);
      handleContentChange(`gallery.images.${index}.src`, imageUrl);
      toast({ title: 'Image uploaded successfully!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Image upload failed.' });
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-32 relative">
       {isEditMode && (
        <div className="absolute top-4 right-4 z-20">
          <Button
            size="sm"
            onClick={() => setEditingSection(isCurrentlyEditing ? null : 'gallery')}
            disabled={editingSection !== null && !isCurrentlyEditing}
          >
            {isCurrentlyEditing ? <X className="mr-2" /> : <Pencil className="mr-2" />}
            {isCurrentlyEditing ? 'Done' : 'Edit Gallery'}
          </Button>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
            {isCurrentlyEditing ? (
              <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                <Textarea
                  value={gallery.heading}
                  onChange={(e) => handleContentChange('gallery.heading', e.target.value)}
                  className="font-headline text-3xl md:text-5xl text-primary leading-tight bg-transparent border-dashed text-center !h-auto min-h-[50px] resize-none"
                />
                <Textarea
                  value={gallery.subheading}
                  onChange={(e) => handleContentChange('gallery.subheading', e.target.value)}
                  className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground bg-transparent border-dashed text-center !h-auto min-h-[50px] resize-none"
                />
              </div>
            ) : (
              <>
                <h2 className="font-headline text-3xl md:text-5xl text-primary">
                  {gallery.heading}
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
                  {gallery.subheading}
                </p>
              </>
            )}
        </div>
        <motion.div
          className="columns-1 sm:columns-2 md:columns-3 gap-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          {gallery.images.map((image, index) => (
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
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl group">
                 <Image
                  src={image.src}
                  alt={image.alt}
                  data-ai-hint={image.hint}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
                {isCurrentlyEditing && (
                  <div className="absolute bottom-2 right-2 z-20">
                    <Label
                      htmlFor={`gallery-image-upload-${index}`}
                      className="cursor-pointer bg-background text-foreground p-2 rounded-md shadow-lg flex items-center gap-2 text-xs"
                    >
                      <Upload className="h-3 w-3" />
                      {uploadingIndex === index ? 'Uploading...' : 'Change'}
                    </Label>
                    <Input
                      id={`gallery-image-upload-${index}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, index)}
                      disabled={uploadingIndex !== null}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

