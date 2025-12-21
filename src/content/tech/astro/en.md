---
title: "Astro"
description: "Get started with Astro web framework in 5 minutes"
tags: ["frontend", "static-site", "framework"]
---

## TL;DR

**What**: A web framework for content-driven websites with minimal JavaScript.

**Why**: Zero JS by default, island architecture, use any UI framework, great for blogs/docs.

## Quick Start

**Create new project**:
```bash
npm create astro@latest my-app
cd my-app
npm run dev
```

Open http://localhost:4321

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview build |
| `npx astro add react` | Add React integration |
| `npx astro add tailwind` | Add Tailwind CSS |

**File-based routing**:
```
src/pages/
├── index.astro       → /
├── about.astro       → /about
├── blog/[slug].astro → /blog/:slug
└── [...slug].astro   → catch-all
```

## Gotchas

### Astro component structure

```astro
---
// Component Script (runs at build time)
const name = "World";
const items = ["a", "b", "c"];
---

<!-- Component Template -->
<html>
  <body>
    <h1>Hello {name}!</h1>
    <ul>
      {items.map(item => <li>{item}</li>)}
    </ul>
  </body>
</html>

<style>
  /* Scoped by default */
  h1 { color: blue; }
</style>
```

### Island architecture

```astro
---
import ReactCounter from './Counter.jsx';
---

<!-- Static by default -->
<h1>Static content</h1>

<!-- Interactive when visible -->
<ReactCounter client:visible />

<!-- Interactive on page load -->
<ReactCounter client:load />

<!-- Interactive on idle -->
<ReactCounter client:idle />
```

### Content collections

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
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

## Next Steps

- [Astro Documentation](https://docs.astro.build/) - Official docs
- [Astro Tutorial](https://docs.astro.build/en/tutorial/0-introduction/) - Learn Astro
- [Astro Themes](https://astro.build/themes/) - Starter templates
- [Astro Integrations](https://astro.build/integrations/) - Plugins
