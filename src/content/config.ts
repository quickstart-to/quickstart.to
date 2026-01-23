import { defineCollection, z } from 'astro:content';

const quickstartSchema = z.object({
  title: z.string(),
  description: z.string().min(10).max(200),
  tags: z.array(z.string()).optional().default([]),
});

const peopleSchema = z.object({
  owner_id: z.number().optional(),
  display_name: z.string(),
  tagline: z.string().min(10).max(160).optional(),
});

const tech = defineCollection({
  type: 'content',
  schema: quickstartSchema,
});

const life = defineCollection({
  type: 'content',
  schema: quickstartSchema,
});

const people = defineCollection({
  type: 'content',
  schema: peopleSchema,
});

export const collections = { tech, life, people };
