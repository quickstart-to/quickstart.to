import { defineCollection, z } from 'astro:content';

const quickstartSchema = z.object({
  title: z.string(),
  description: z.string().min(10).max(200),
  tags: z.array(z.string()).optional().default([]),
});

const tech = defineCollection({
  type: 'content',
  schema: quickstartSchema,
});

const life = defineCollection({
  type: 'content',
  schema: quickstartSchema,
});

export const collections = { tech, life };
