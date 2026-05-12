import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title is required'),
    content: z.string().min(10, 'Content is required'),
    isPremium: z.boolean().optional(),
  }),
});
