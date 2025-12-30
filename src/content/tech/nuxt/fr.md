---
title: "Nuxt"
description: "Framework Vue full-stack avec auto-imports - routage base sur les fichiers, rendu universel, 200+ modules prets a l'emploi"
template: "framework"
tags: ["frontend", "vue", "fullstack"]
---

## TL;DR

**En bref** : Nuxt est Vue pour la production - le framework full-stack qui rend les apps Vue intuitives et puissantes.

**Points forts** :
- Auto-imports - pas besoin de déclarations d'import
- Routing basé sur fichiers - créez des fichiers, obtenez des routes
- Rendu universel - SSR, SSG ou hybride
- Écosystème de modules - 200+ modules prêts à l'emploi

## Core Concepts

### Concept 1: Auto-imports

Nuxt importe automatiquement les APIs Vue, les composables et vos composants. Utilisez-les simplement.

```vue
<script setup>
// No imports needed!
const count = ref(0)           // Vue ref
const route = useRoute()       // Nuxt composable
const { data } = await useFetch('/api/data')  // Data fetching
</script>
```

### Concept 2: File-based Routing

Créez des fichiers dans `pages/`, obtenez des routes automatiquement :

```
pages/
├── index.vue         → /
├── about.vue         → /about
├── blog/index.vue    → /blog
├── blog/[slug].vue   → /blog/:slug (dynamic)
└── [...slug].vue     → catch-all route
```

### Concept 3: Server Engine (Nitro)

Capacités full-stack avec un moteur serveur puissant :

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return { message: 'Hello from the server!' }
})
```

Accédez via `$fetch('/api/hello')` ou `useFetch('/api/hello')`.

## Quick Start

### Create Project

```bash
npx nuxi@latest init my-app
cd my-app
npm install
npm run dev
```

### Project Structure

```
my-app/
├── pages/            # File-based routes
├── components/       # Auto-imported components
├── composables/      # Auto-imported composables
├── server/           # Server routes & middleware
│   └── api/
├── layouts/          # Page layouts
├── nuxt.config.ts    # Nuxt configuration
└── package.json
```

### Minimal Example

```vue
<!-- pages/index.vue -->
<script setup>
const count = ref(0)
</script>

<template>
  <div>
    <h1>Hello Nuxt!</h1>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>
```

### Run

```bash
npm run dev
# Open http://localhost:3000
```

## Gotchas

### useFetch vs $fetch

```vue
<script setup>
// useFetch - for components, handles SSR hydration
const { data, pending, error } = await useFetch('/api/data')

// $fetch - for event handlers, server routes
async function submit() {
  const result = await $fetch('/api/submit', { method: 'POST', body: formData })
}
</script>
```

### Layouts need NuxtPage

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <nav>Navigation</nav>
    <slot />  <!-- Page content goes here -->
  </div>
</template>

<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### Server-only code with .server

```typescript
// composables/useDb.server.ts - only runs on server
export function useDb() {
  // Safe to use database connections here
  return db.query(...)
}
```

### Dynamic routes need proper typing

```vue
<!-- pages/users/[id].vue -->
<script setup>
const route = useRoute()
// route.params.id is available
const { data: user } = await useFetch(`/api/users/${route.params.id}`)
</script>
```

## When to Use

**Idéal pour** :
- Développeurs Vue voulant des capacités full-stack
- Applications Vue critiques pour le SEO
- Équipes préférant convention over configuration
- Projets nécessitant des stratégies de rendu hybrides

**Moins adapté pour** :
- Équipes React (utilisez Next.js)
- SPAs simples (Vue + Vite suffit)
- Les maniaques du contrôle (trop opinioné)

**Comparaison** :
| Feature | Nuxt | Next.js | SvelteKit |
|---------|------|---------|-----------|
| Framework | Vue | React | Svelte |
| Auto-imports | Oui | Non | Partiel |
| Courbe d'apprentissage | Facile | Moyenne | Facile |
| Écosystème de modules | 200+ | Limité | En croissance |

## Next Steps

- [Nuxt Documentation](https://nuxt.com/docs)
- [Nuxt Modules](https://nuxt.com/modules)
- [Nuxt UI](https://ui.nuxt.com/) - Bibliothèque de composants
- [Nuxt DevTools](https://devtools.nuxt.com/)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Page | `pages/about.vue` → `/about` |
| Route dynamique | `pages/[id].vue` → `/:id` |
| Layout | `layouts/default.vue` |
| API Serveur | `server/api/users.ts` |
| Middleware | `middleware/auth.ts` |
| Plugin | `plugins/my-plugin.ts` |
| Récupérer données | `useFetch('/api/data')` |
| Lazy fetch | `useLazyFetch('/api/data')` |
| Params de route | `useRoute().params` |
| Naviguer | `navigateTo('/path')` |
