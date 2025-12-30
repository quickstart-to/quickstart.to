---
title: "Astro"
description: "Starten Sie mit dem Astro Web-Framework in 5 Minuten"
template: "framework"
tags: ["frontend", "static-site", "framework"]
---

## TL;DR

**Eine Zeile**: Astro ist das Web-Framework für inhaltsorientierte Websites - liefert standardmäßig null JavaScript, hydratisiert nur was interaktiv sein muss.

**Kernstärken**:
- Null JS standardmäßig - statisches HTML, 100 Lighthouse-Scores
- Insel-Architektur - nur interaktive Komponenten hydratisieren
- Jedes Framework verwenden - React, Vue, Svelte, Solid im selben Projekt
- Content Collections - typsichere Markdown/MDX mit Validierung

## Core Concepts

### Concept 1: Islands Architecture

Komponenten sind standardmäßig statisch. Interaktivität selektiv hinzufügen:

```astro
---
import ReactCounter from './Counter.jsx';
import VueModal from './Modal.vue';
---

<!-- Statisch - null JS ausgeliefert -->
<h1>Mein Blog</h1>
<p>Dieser Inhalt ist reines HTML</p>

<!-- Inseln - JS nur für diese -->
<ReactCounter client:visible />  <!-- Hydratisieren wenn sichtbar -->
<VueModal client:load />         <!-- Hydratisieren beim Laden -->
<ReactCounter client:idle />     <!-- Hydratisieren wenn Browser idle -->
```

### Concept 2: .astro Components

Standardmäßig serverseitig gerendert. Frontmatter für Logik, Template für Markup:

```astro
---
// Läuft zur Build-Zeit (serverseitig)
const response = await fetch('https://api.example.com/posts');
const posts = await response.json();
---

<ul>
  {posts.map(post => (
    <li><a href={`/blog/${post.slug}`}>{post.title}</a></li>
  ))}
</ul>

<style>
  /* Scoped auf diese Komponente */
  li { margin-bottom: 0.5rem; }
</style>
```

### Concept 3: Content Collections

Typsicherer Inhalt mit Zod-Validierung:

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
├── pages/          # Dateibasiertes Routing
│   ├── index.astro     → /
│   ├── about.astro     → /about
│   └── blog/[slug].astro → /blog/:slug
├── components/     # Wiederverwendbare Komponenten
├── layouts/        # Seitenlayouts
└── content/        # Content Collections
```

### Run

```bash
npm run dev
# Öffnen Sie http://localhost:4321
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
<!-- Am häufigsten - laden wenn im Viewport sichtbar -->
<Component client:visible />

<!-- Kritische Interaktivität - sofort laden -->
<Component client:load />

<!-- Nicht-kritisch - laden wenn Browser idle -->
<Component client:idle />

<!-- Nur bei bestimmter Media Query -->
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

**Am besten für**:
- Blogs und Dokumentationsseiten
- Marketing-/Landingpages
- Inhaltsintensive Websites
- Seiten wo Performance kritisch ist

**Nicht ideal für**:
- Hochinteraktive Apps (Dashboards, SPAs)
- Echtzeit-Anwendungen
- Apps die clientseitiges Routing benötigen

**Vergleich**:
| Feature | Astro | Next.js | Gatsby |
|---------|-------|---------|--------|
| Standard-JS | Null | Volles React | Volles React |
| Framework-Lock-in | Keins | React | React |
| Build-Geschwindigkeit | Schnell | Mittel | Langsam |
| Anwendungsfall | Inhalt | Apps + Inhalt | Inhalt |

## Next Steps

- [Astro-Dokumentation](https://docs.astro.build/)
- [Astro-Tutorial](https://docs.astro.build/en/tutorial/)
- [Astro-Themes](https://astro.build/themes/)
- [Astro-Integrationen](https://astro.build/integrations/)

## Cheatsheet

| Muster | Code |
|--------|------|
| Statische Komponente | `<Component />` |
| Hydratisieren bei sichtbar | `<Component client:visible />` |
| Hydratisieren beim Laden | `<Component client:load />` |
| Hydratisieren bei idle | `<Component client:idle />` |
| Integration hinzufügen | `npx astro add react` |
| Build | `npm run build` |
| Vorschau | `npm run preview` |
