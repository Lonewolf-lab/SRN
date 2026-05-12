import { z } from 'zod';

export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 chars'),
    location: z.string().min(2, 'Location is required'),
    date: z.string().datetime(),
  }),
});
