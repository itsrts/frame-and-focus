'use server';

/**
 * @fileOverview AI-powered assistant for generating thoughtful responses to client reviews.
 *
 * - reviewReplyAssistant - A function that generates a suggested reply to a client review.
 * - ReviewReplyAssistantInput - The input type for the reviewReplyAssistant function.
 * - ReviewReplyAssistantOutput - The return type for the reviewReplyAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReviewReplyAssistantInputSchema = z.object({
  reviewText: z.string().describe('The text content of the client review.'),
  photographerName: z.string().describe('The name of the photographer.'),
  clientName: z.string().describe('The name of the client who wrote the review.'),
});
export type ReviewReplyAssistantInput = z.infer<typeof ReviewReplyAssistantInputSchema>;

const ReviewReplyAssistantOutputSchema = z.object({
  suggestedReply: z.string().describe('A suggested reply to the client review.'),
});
export type ReviewReplyAssistantOutput = z.infer<typeof ReviewReplyAssistantOutputSchema>;

export async function reviewReplyAssistant(input: ReviewReplyAssistantInput): Promise<ReviewReplyAssistantOutput> {
  return reviewReplyAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reviewReplyAssistantPrompt',
  input: {schema: ReviewReplyAssistantInputSchema},
  output: {schema: ReviewReplyAssistantOutputSchema},
  prompt: `You are a helpful assistant to photographers. Your job is to help them respond to client reviews in a thoughtful and professional manner.

  Here is the review text:
  {{reviewText}}

  The review was written by {{clientName}}. The photographer's name is {{photographerName}}.

  Please generate a suggested reply that acknowledges the client's feedback and expresses gratitude. Keep the reply concise and sincere.
  `,
});

const reviewReplyAssistantFlow = ai.defineFlow(
  {
    name: 'reviewReplyAssistantFlow',
    inputSchema: ReviewReplyAssistantInputSchema,
    outputSchema: ReviewReplyAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
