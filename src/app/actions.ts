'use server';

import {
  reviewReplyAssistant,
  type ReviewReplyAssistantInput,
} from '@/ai/flows/review-reply-assistant';
import { z } from 'zod';

const ReviewReplyAssistantActionSchema = z.object({
  reviewText: z.string(),
  photographerName: z.string(),
  clientName: z.string(),
});

type State = {
  suggestedReply?: string;
  error?: string;
};

export async function getReviewReply(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const validatedData = ReviewReplyAssistantActionSchema.safeParse({
      reviewText: formData.get('reviewText'),
      photographerName: formData.get('photographerName'),
      clientName: formData.get('clientName'),
    });

    if (!validatedData.success) {
      return { error: 'Invalid input.' };
    }

    const input: ReviewReplyAssistantInput = validatedData.data;

    const result = await reviewReplyAssistant(input);

    if (result.suggestedReply) {
      return { suggestedReply: result.suggestedReply };
    } else {
      return { error: 'Could not generate a suggestion. Please try again.' };
    }
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred.' };
  }
}
