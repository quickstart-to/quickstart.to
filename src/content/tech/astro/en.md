---
title: "Astro"
description: "Content-focused web framework - zero JS by default, islands architecture, use React/Vue/Svelte together"
template: "framework"
tags: ["frontend", "static-site", "framework"]
---

## TL;DR

**One-liner**: Astro is the web framework for content-driven sites - ships zero JavaScript by default, hydrates only what needs to be interactive.

**Core Strengths**:
- Zero JS by default - static HTML, 100 Lighthouse scores
- Island architecture - hydrate only interactive components
- Use any framework - React, Vue, Svelte, Solid in the same project
- Content collections - type-safe Markdown/MDX with validation

## Core Concepts

### Concept 1: Islands Architecture

Components are static by default. Add interactivity selectively:

```astro
---
import ReactCounter from './Counter.jsx';
import VueModal from './Modal.vue';
---

<!-- Static - zero JS shipped -->
<h1>My Blog</h1>
<p>This content is pure HTML</p>

<!-- Islands - JS only for these -->
<ReactCounter client:visible />  <!-- Hydrate when visible -->
<VueModal client:load />         <!-- Hydrate on page load -->
<ReactCounter client:idle />     <!-- Hydrate when browser idle -->
```

### Concept 2: .astro Components

Server-rendered by default. Frontmatter for logic, template for markup:

```astro
---
// Runs at build time (server-side)
const response = await fetch('https://api.example.com/posts');
const posts = await response.json();
---

<ul>
  {posts.map(post => (
    <li><a href={`/blog/${post.slug}`}>{post.title}</a></li>
  ))}
</ul>

<style>
  /* Scoped to this component */
  li { margin-bottom: 0.5rem; }
</style>
```

### Concept 3: Content Collections

Type-safe content with Zod validation:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---
```

## Quick Start

### Create Project

```bash
npm create astro@latest my-blog
cd my-blog
```

### Project Structure

```
src/
├── pages/          # File-based routing
│   ├── index.astro     → /
│   ├── about.astro     → /about
│   └── blog/[slug].astro → /blog/:slug
├── components/     # Reusable components
├── layouts/        # Page layouts
└── content/        # Content collections
```

### Run

```bash
npm run dev
# Open http://localhost:4321
```

## Gotchas

### File-based routing rules

```
src/pages/
├── index.astro           → /
├── about.astro           → /about
├── blog/index.astro      → /blog
├── blog/[slug].astro     → /blog/my-post
└── [...slug].astro       → /any/nested/path (catch-all)
```

### Choosing the right client directive

```astro
<!-- Most common - load when visible in viewport -->
<Component client:visible />

<!-- Critical interactivity - load immediately -->
<Component client:load />

<!-- Non-critical - load when browser is idle -->
<Component client:idle />

<!-- Only on specific media query -->
<Component client:media="(max-width: 768px)" />
```

### Dynamic routes need getStaticPaths

```astro
---
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
---
```

## When to Use

**Best for**:
- Blogs and documentation sites
- Marketing/landing pages
- Content-heavy websites
- Sites where performance is critical

**Not ideal for**:
- Highly interactive apps (dashboards, SPAs)
- Real-time applications
- Apps needing client-side routing

**Comparison**:
| Feature | Astro | Next.js | Gatsby |
|---------|-------|---------|--------|
| Default JS | Zero | Full React | Full React |
| Framework lock-in | None | React | React |
| Build speed | Fast | Medium | Slow |
| Use case | Content | Apps + Content | Content |

## Next Steps

- [Astro Documentation](https://docs.astro.build/)
- [Astro Tutorial](https://docs.astro.build/en/tutorial/)
- [Astro Themes](https://astro.build/themes/)
- [Astro Integrations](https://astro.build/integrations/)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Static component | `<Component />` |
| Hydrate on visible | `<Component client:visible />` |
| Hydrate on load | `<Component client:load />` |
| Hydrate on idle | `<Component client:idle />` |
| Add integration | `npx astro add react` |
| Build | `npm run build` |
| Preview | `npm run preview` |
