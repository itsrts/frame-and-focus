
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/context/site-content-context';
import { Button } from './ui/button';
import { Pencil, Upload, X, Trash2, PlusCircle } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/app/lib/cloudinary';
import { ServicePageContent } from '@/app/lib/content';

export default function Products() {
  const { content, isEditMode, editingSection, setEditingSection, handleContentChange } = useSiteContent();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const { toast } = useToast();

  if (!content) return null;

  const typedContent = content as ServicePageContent;
  const { products } = typedContent;
  const isCurrentlyEditing = isEditMode && editingSection === 'products';

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingIndex(index);
    try {
      const imageUrl = await uploadImage(file);
      handleContentChange(`products.items.${index}.image`, imageUrl);
      toast({ title: 'Image uploaded successfully!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Image upload failed.' });
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      name: "New Product",
      description: "A description for the new product.",
      image: "https://placehold.co/600x400/E2E8F0/A0AEC0?text=New%20Product",
      imageHint: "product placeholder"
    };
    const newItems = [...(products.items || []), newProduct];
    handleContentChange('products.items', newItems);
  };

  const handleRemoveProduct = (index: number) => {
    const newItems = [...products.items];
    newItems.splice(index, 1);
    handleContentChange('products.items', newItems);
  };

  return (
    <section id="products" className="py-16 md:py-32 relative bg-secondary">
       {isEditMode && (
        <div className="absolute bottom-4 right-4 z-20">
          <Button
            size="sm"
            onClick={() => setEditingSection(isCurrentlyEditing ? null : 'products')}
            disabled={editingSection !== null && !isCurrentlyEditing}
          >
            {isCurrentlyEditing ? <X className="mr-2" /> : <Pencil className="mr-2" />}
            {isCurrentlyEditing ? 'Done' : 'Edit Products'}
          </Button>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
            {isCurrentlyEditing ? (
              <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                <Textarea
                  value={products.heading}
                  onChange={(e) => handleContentChange('products.heading', e.target.value)}
                  className="font-headline text-3xl md:text-5xl text-primary leading-tight bg-transparent border-dashed text-center !h-auto min-h-[50px] resize-none"
                />
                <Textarea
                  value={products.subheading}
                  onChange={(e) => handleContentChange('products.subheading', e.target.value)}
                  className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground bg-transparent border-dashed text-center !h-auto min-h-[50px] resize-none"
                />
              </div>
            ) : (
              <>
                <h2 className="font-headline text-3xl md:text-5xl text-primary">
                  {products.heading}
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
                  {products.subheading}
                </p>
              </>
            )}
        </div>
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.items.map((item, index) => (
            <motion.div
              key={index}
              className="mb-4 break-inside-avoid"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl group bg-background">
                 <div className="relative aspect-[4/3]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      data-ai-hint={item.imageHint}
                      fill
                      className="object-cover"
                    />
                    {isCurrentlyEditing && (
                      <div className="absolute bottom-2 right-2 z-20">
                        <Label
                          htmlFor={`product-image-upload-${index}`}
                          className="cursor-pointer bg-background text-foreground p-2 rounded-md shadow-lg flex items-center gap-2 text-xs"
                        >
                          <Upload className="h-3 w-3" />
                          {uploadingIndex === index ? 'Uploading...' : 'Change'}
                        </Label>
                        <Input
                          id={`product-image-upload-${index}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, index)}
                          disabled={uploadingIndex !== null}
                        />
                      </div>
                    )}
                 </div>
                 <div className='p-4'>
                    {isCurrentlyEditing ? (
                        <div className="flex flex-col gap-2">
                             <Input
                                value={item.name}
                                onChange={(e) => handleContentChange(`products.items.${index}.name`, e.target.value)}
                                className="font-headline text-xl bg-transparent border-dashed p-1"
                            />
                            <Textarea
                                value={item.description}
                                onChange={(e) => handleContentChange(`products.items.${index}.description`, e.target.value)}
                                className="text-sm text-muted-foreground bg-transparent border-dashed !h-auto min-h-[50px] resize-none p-1"
                            />
                        </div>
                    ) : (
                        <>
                            <h3 className="font-headline text-xl text-primary">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                        </>
                    )}
                 </div>
                 {isCurrentlyEditing && (
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 z-10 h-7 w-7"
                        onClick={() => handleRemoveProduct(index)}
                        >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                 )}
              </div>
            </motion.div>
          ))}
        </div>
        {isCurrentlyEditing && (
            <div className="text-center mt-8">
                <Button onClick={handleAddProduct}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>
        )}
      </div>
    </section>
  );
}
