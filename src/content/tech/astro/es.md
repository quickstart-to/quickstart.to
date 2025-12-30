---
title: "Astro"
description: "Framework web enfocado en contenido - cero JS por defecto, arquitectura de islas, React/Vue/Svelte juntos"
template: "framework"
tags: ["frontend", "static-site", "framework"]
---

## TL;DR

**En una línea**: Astro es el framework web para sitios orientados al contenido - no envía JavaScript por defecto, hidrata solo lo que necesita ser interactivo.

**Fortalezas principales**:
- Cero JS por defecto - HTML estático, puntuaciones Lighthouse de 100
- Arquitectura de islas - hidrata solo componentes interactivos
- Usa cualquier framework - React, Vue, Svelte, Solid en el mismo proyecto
- Content Collections - Markdown/MDX type-safe con validación

## Core Concepts

### Concept 1: Islands Architecture

Los componentes son estáticos por defecto. Añade interactividad selectivamente:

```astro
---
import ReactCounter from './Counter.jsx';
import VueModal from './Modal.vue';
---

<!-- Estático - cero JS enviado -->
<h1>Mi Blog</h1>
<p>Este contenido es HTML puro</p>

<!-- Islas - JS solo para estos -->
<ReactCounter client:visible />  <!-- Hidratar cuando sea visible -->
<VueModal client:load />         <!-- Hidratar al cargar la página -->
<ReactCounter client:idle />     <!-- Hidratar cuando el navegador esté inactivo -->
```

### Concept 2: .astro Components

Renderizado en servidor por defecto. Frontmatter para lógica, template para marcado:

```astro
---
// Se ejecuta en tiempo de build (lado servidor)
const response = await fetch('https://api.example.com/posts');
const posts = await response.json();
---

<ul>
  {posts.map(post => (
    <li><a href={`/blog/${post.slug}`}>{post.title}</a></li>
  ))}
</ul>

<style>
  /* Alcance limitado a este componente */
  li { margin-bottom: 0.5rem; }
</style>
```

### Concept 3: Content Collections

Contenido type-safe con validación Zod:

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
├── pages/          # Enrutamiento basado en archivos
│   ├── index.astro     → /
│   ├── about.astro     → /about
│   └── blog/[slug].astro → /blog/:slug
├── components/     # Componentes reutilizables
├── layouts/        # Layouts de página
└── content/        # Content Collections
```

### Run

```bash
npm run dev
# Abre http://localhost:4321
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
<!-- Más común - cargar cuando sea visible en el viewport -->
<Component client:visible />

<!-- Interactividad crítica - cargar inmediatamente -->
<Component client:load />

<!-- No crítico - cargar cuando el navegador esté inactivo -->
<Component client:idle />

<!-- Solo en una media query específica -->
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

**Ideal para**:
- Blogs y sitios de documentación
- Páginas de marketing/landing
- Sitios web con mucho contenido
- Sitios donde el rendimiento es crítico

**No ideal para**:
- Apps altamente interactivas (dashboards, SPAs)
- Aplicaciones en tiempo real
- Apps que necesitan enrutamiento del lado del cliente

**Comparación**:
| Característica | Astro | Next.js | Gatsby |
|----------------|-------|---------|--------|
| JS por defecto | Cero | React completo | React completo |
| Lock-in de framework | Ninguno | React | React |
| Velocidad de build | Rápida | Media | Lenta |
| Caso de uso | Contenido | Apps + Contenido | Contenido |

## Next Steps

- [Documentación de Astro](https://docs.astro.build/)
- [Tutorial de Astro](https://docs.astro.build/en/tutorial/)
- [Temas de Astro](https://astro.build/themes/)
- [Integraciones de Astro](https://astro.build/integrations/)

## Cheatsheet

| Patrón | Código |
|--------|--------|
| Componente estático | `<Component />` |
| Hidratar cuando visible | `<Component client:visible />` |
| Hidratar al cargar | `<Component client:load />` |
| Hidratar cuando inactivo | `<Component client:idle />` |
| Añadir integración | `npx astro add react` |
| Build | `npm run build` |
| Previsualizar | `npm run preview` |
