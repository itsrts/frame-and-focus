'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getReviewReply } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, Copy, Check } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? 'Generating...' : <> <Wand2 className="mr-2 h-4 w-4" /> Generate Reply </>}
    </Button>
  );
}

export default function ReviewAssistant() {
  const initialState = { suggestedReply: '', error: '' };
  const [state, formAction] = useFormState(getReviewReply, initialState);
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    if (state.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state.error, toast]);
  
  useEffect(() => {
    if (state.suggestedReply) {
      formRef.current?.reset();
    }
  }, [state.suggestedReply]);

  const handleCopy = () => {
    if (state.suggestedReply) {
      navigator.clipboard.writeText(state.suggestedReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: 'Copied to clipboard!',
      });
    }
  };

  return (
    <section id="review-assistant" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">
            Review Reply Assistant
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Save time and respond thoughtfully to client reviews with our AI-powered assistant.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card>
            <CardHeader>
              <CardTitle>Generate a Reply</CardTitle>
              <CardDescription>Enter the details below to get a suggested response.</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="space-y-4">
                <div>
                  <Label htmlFor="photographerName">Your Name</Label>
                  <Input id="photographerName" name="photographerName" defaultValue="Alex" required />
                </div>
                <div>
                  <Label htmlFor="clientName">Client's Name</Label>
                  <Input id="clientName" name="clientName" placeholder="e.g., Jane & John" required />
                </div>
                <div>
                  <Label htmlFor="reviewText">Client's Review</Label>
                  <Textarea id="reviewText" name="reviewText" placeholder="Paste the client's review here..." required className="min-h-[150px]" />
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
          
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Suggested Reply</CardTitle>
              <CardDescription>Here is the AI-generated suggestion. You can edit it before using.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative min-h-[250px] bg-secondary rounded-md p-4">
                <p className="text-muted-foreground whitespace-pre-wrap">{state.suggestedReply || 'Your generated reply will appear here.'}</p>
                {state.suggestedReply && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
