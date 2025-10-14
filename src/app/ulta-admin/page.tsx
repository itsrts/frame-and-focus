'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { siteContent } from '@/app/lib/content';
import { uploadImage } from '@/app/lib/cloudinary';
import Image from 'next/image';

const adminSchema = z.object({
  password: z.string().min(1, 'Password is required.'),
});

const contentSchema = z.object({
  hero: z.object({
    heading: z.string().min(1, 'Heading is required.'),
    subheading: z.string().min(1, 'Subheading is required.'),
    ctaText: z.string().min(1, 'CTA text is required.'),
    ctaLink: z.string().min(1, 'CTA link is required.'),
    backgroundImage: z.string().min(1, 'Background image is required.'),
  }),
});

type ContentFormValues = z.infer<typeof contentSchema>;

export default function UltaAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialContent, setInitialContent] = useState<ContentFormValues>(siteContent);
  const [isUploading, setIsUploading] = useState(false);

  const { toast } = useToast();

  const passwordForm = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: { password: '' },
  });

  const contentForm = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: initialContent,
  });

  useEffect(() => {
    const authStatus = localStorage.getItem('ulta-admin-authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const storedContent = localStorage.getItem('siteContent');
    if (storedContent) {
      const parsedContent = JSON.parse(storedContent);
      setInitialContent(parsedContent);
      contentForm.reset(parsedContent);
    } else {
      contentForm.reset(siteContent);
    }

    setLoading(false);
  }, [contentForm]);

  const handlePasswordSubmit = (values: z.infer<typeof adminSchema>) => {
    if (values.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem('ulta-admin-authenticated', 'true');
      setIsAuthenticated(true);
      toast({ title: 'Authentication successful!' });
    } else {
      toast({ variant: 'destructive', title: 'Invalid password.' });
    }
  };

  const handleContentSubmit = (values: ContentFormValues) => {
    try {
      localStorage.setItem('siteContent', JSON.stringify(values));
      toast({ title: 'Content updated successfully!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Failed to update content.' });
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      contentForm.setValue('hero.backgroundImage', imageUrl);
      toast({ title: 'Image uploaded successfully!' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Image upload failed.' });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('ulta-admin-authenticated');
    setIsAuthenticated(false);
    toast({ title: 'Logged out.' });
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">Admin Login</h1>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </div>

      <Form {...contentForm}>
        <form onSubmit={contentForm.handleSubmit(handleContentSubmit)} className="space-y-8">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Hero Section</h2>
            <div className="space-y-4">
              <FormField
                control={contentForm.control}
                name="hero.heading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={contentForm.control}
                name="hero.subheading"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subheading</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={contentForm.control}
                name="hero.ctaText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTA Button Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={contentForm.control}
                name="hero.ctaLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTA Button Link</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                    <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                </FormControl>
                {isUploading && <p>Uploading...</p>}
                <FormField
                    control={contentForm.control}
                    name="hero.backgroundImage"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input type="hidden" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 {contentForm.watch('hero.backgroundImage') && (
                    <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Image Preview:</p>
                        <Image src={contentForm.watch('hero.backgroundImage')} alt="Background Preview" width={200} height={100} className="rounded-md object-cover"/>
                    </div>
                 )}
              </FormItem>
            </div>
          </div>

          {/* Other sections will go here */}

          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
    </div>
  );
}
