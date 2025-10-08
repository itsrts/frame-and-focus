'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const bookingFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function Booking() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsPending(true);

    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_EMAIL_API!);
    
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
        });

        const result = await response.json();

        if (result.success) {
            toast({
              title: 'Inquiry Sent!',
              description: 'Thank you for reaching out. We will get back to you shortly.',
            });
            form.reset();
        } else {
            console.error("Web3Forms error:", result);
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: result.message || 'There was a problem with your request.',
            });
        }
    } catch (error) {
        console.error("Submission error:", error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem submitting your form. Please try again.',
        });
    } finally {
        setIsPending(false);
    }
  });

  return (
    <motion.section 
      id="booking" 
      className="py-16 md:py-32 bg-secondary"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-headline text-3xl md:text-5xl text-primary">
            Book Your Session
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
            Ready to tell your story? Fill out the form below to get in touch.
          </p>
        </div>
        <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2">
                <div className="p-6 md:p-10">
                    <Form {...form}>
                        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jane Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="hello@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Your Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Tell us about your event, desired dates, and any questions you have."
                                    className="min-h-[120px]"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold" disabled={isPending}>
                                {isPending ? 'Sending...' : 'Send Inquiry'}
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="relative hidden md:block">
                    <Image 
                        src="/images/tuc-3.png"
                        alt="Couple holding hands"
                        data-ai-hint="couple hands"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </Card>
      </div>
    </motion.section>
  );
}
