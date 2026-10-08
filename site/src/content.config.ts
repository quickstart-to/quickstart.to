import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// All content lives outside the site in <repo>/topics/<slug>/ (one self-contained directory per topic).
// Absolute URL so resolution does not depend on the process cwd.
const TOPICS_BASE = new URL('../../topics/', import.meta.url);

const topics = defineCollection({
  loader: glob({
    pattern: '*/topic.yaml',
    base: TOPICS_BASE,
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    lang: z.string(),
    title: z.string(),
    title_en: z.string().optional(),
    summary: z.string().optional(),
    audience: z.string(),
    status: z.enum(['draft', 'beta', 'stable']),
    aliases: z.array(z.string()).default([]),
    disclaimer: z.string().optional(),
    review: z.record(z.string(), z.string()).optional(),
  }),
});

const isoDate = z.coerce.date().transform((d) => d.toISOString().slice(0, 10));

// quickstart.md + chapters/*.md. id = "<topic>/quickstart" | "<topic>/chapters/<file>"
const pages = defineCollection({
  loader: glob({
    pattern: ['*/quickstart.md', '*/chapters/*.md'],
    base: TOPICS_BASE,
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),
    order: z.number().optional(),
    volatility: z.enum(['high', 'medium', 'low']).optional(),
    last_verified: isoDate.optional(),
  }),
});

const changelogs = defineCollection({
  loader: glob({
    pattern: '*/CHANGELOG.md',
    base: TOPICS_BASE,
    generateId: ({ entry }) => entry.split('/')[0],
  }),
});

export const collections = { topics, pages, changelogs };
