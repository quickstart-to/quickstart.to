---
title: "Astro"
description: "Framework web oriente contenu - zero JS par defaut, architecture en ilots, React/Vue/Svelte ensemble"
template: "framework"
tags: ["frontend", "static-site", "framework"]
---

## TL;DR

**En une ligne**: Astro est le framework web pour les sites orientés contenu - ne livre aucun JavaScript par défaut, hydrate uniquement ce qui doit être interactif.

**Forces principales**:
- Zéro JS par défaut - HTML statique, scores Lighthouse de 100
- Architecture en îlots - hydrate uniquement les composants interactifs
- Utilisez n'importe quel framework - React, Vue, Svelte, Solid dans le même projet
- Content Collections - Markdown/MDX type-safe avec validation

## Core Concepts

### Concept 1: Islands Architecture

Les composants sont statiques par défaut. Ajoutez l'interactivité de manière sélective:

```astro
---
import ReactCounter from './Counter.jsx';
import VueModal from './Modal.vue';
---

<!-- Statique - zéro JS livré -->
<h1>Mon Blog</h1>
<p>Ce contenu est du HTML pur</p>

<!-- Îlots - JS uniquement pour ceux-ci -->
<ReactCounter client:visible />  <!-- Hydrater quand visible -->
<VueModal client:load />         <!-- Hydrater au chargement -->
<ReactCounter client:idle />     <!-- Hydrater quand navigateur inactif -->
```

### Concept 2: .astro Components

Rendu côté serveur par défaut. Frontmatter pour la logique, template pour le balisage:

```astro
---
// S'exécute au moment du build (côté serveur)
const response = await fetch('https://api.example.com/posts');
const posts = await response.json();
---

<ul>
  {posts.map(post => (
    <li><a href={`/blog/${post.slug}`}>{post.title}</a></li>
  ))}
</ul>

<style>
  /* Scopé à ce composant */
  li { margin-bottom: 0.5rem; }
</style>
```

### Concept 3: Content Collections

Contenu type-safe avec validation Zod:

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
├── pages/          # Routage basé sur les fichiers
│   ├── index.astro     → /
│   ├── about.astro     → /about
│   └── blog/[slug].astro → /blog/:slug
├── components/     # Composants réutilisables
├── layouts/        # Layouts de page
└── content/        # Content Collections
```

### Run

```bash
npm run dev
# Ouvrez http://localhost:4321
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
<!-- Le plus courant - charger quand visible dans le viewport -->
<Component client:visible />

<!-- Interactivité critique - charger immédiatement -->
<Component client:load />

<!-- Non-critique - charger quand navigateur inactif -->
<Component client:idle />

<!-- Seulement sur une media query spécifique -->
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

**Idéal pour**:
- Blogs et sites de documentation
- Pages marketing/landing
- Sites web riches en contenu
- Sites où la performance est critique

**Pas idéal pour**:
- Apps hautement interactives (dashboards, SPAs)
- Applications temps réel
- Apps nécessitant un routage côté client

**Comparaison**:
| Fonctionnalité | Astro | Next.js | Gatsby |
|----------------|-------|---------|--------|
| JS par défaut | Zéro | React complet | React complet |
| Lock-in framework | Aucun | React | React |
| Vitesse de build | Rapide | Moyenne | Lente |
| Cas d'usage | Contenu | Apps + Contenu | Contenu |

## Next Steps

- [Documentation Astro](https://docs.astro.build/)
- [Tutoriel Astro](https://docs.astro.build/en/tutorial/)
- [Thèmes Astro](https://astro.build/themes/)
- [Intégrations Astro](https://astro.build/integrations/)

## Cheatsheet

| Modèle | Code |
|--------|------|
| Composant statique | `<Component />` |
| Hydrater quand visible | `<Component client:visible />` |
| Hydrater au chargement | `<Component client:load />` |
| Hydrater quand inactif | `<Component client:idle />` |
| Ajouter intégration | `npx astro add react` |
| Build | `npm run build` |
| Prévisualiser | `npm run preview` |
