---
title: "Nuxt"
description: "Starten Sie mit dem Nuxt-Framework in 5 Minuten"
template: "framework"
tags: ["frontend", "vue", "fullstack"]
---

## TL;DR

**Kurzfassung**: Nuxt ist Vue für die Produktion - das Full-Stack-Framework, das Vue-Apps intuitiv und leistungsstark macht.

**Kernstärken**:
- Auto-Imports - keine Import-Statements nötig
- Dateibasiertes Routing - Dateien erstellen, Routen erhalten
- Universelles Rendering - SSR, SSG oder hybrid
- Modul-Ökosystem - 200+ einsatzbereite Module

## Core Concepts

### Concept 1: Auto-imports

Nuxt importiert automatisch Vue-APIs, Composables und Ihre Komponenten. Einfach verwenden.

```vue
<script setup>
// No imports needed!
const count = ref(0)           // Vue ref
const route = useRoute()       // Nuxt composable
const { data } = await useFetch('/api/data')  // Data fetching
</script>
```

### Concept 2: File-based Routing

Dateien in `pages/` erstellen, Routen automatisch erhalten:

```
pages/
├── index.vue         → /
├── about.vue         → /about
├── blog/index.vue    → /blog
├── blog/[slug].vue   → /blog/:slug (dynamic)
└── [...slug].vue     → catch-all route
```

### Concept 3: Server Engine (Nitro)

Full-Stack-Fähigkeiten mit einer leistungsstarken Server-Engine:

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return { message: 'Hello from the server!' }
})
```

Zugriff via `$fetch('/api/hello')` oder `useFetch('/api/hello')`.

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

**Ideal für**:
- Vue-Entwickler, die Full-Stack-Fähigkeiten wollen
- SEO-kritische Vue-Anwendungen
- Teams, die Convention over Configuration bevorzugen
- Projekte mit hybriden Rendering-Strategien

**Weniger geeignet für**:
- React-Teams (Next.js verwenden)
- Einfache SPAs (plain Vue + Vite reicht)
- Maximale Kontrolle-Freaks (zu opinioniert)

**Vergleich**:
| Feature | Nuxt | Next.js | SvelteKit |
|---------|------|---------|-----------|
| Framework | Vue | React | Svelte |
| Auto-Imports | Ja | Nein | Teilweise |
| Lernkurve | Einfach | Mittel | Einfach |
| Modul-Ökosystem | 200+ | Begrenzt | Wachsend |

## Next Steps

- [Nuxt Documentation](https://nuxt.com/docs)
- [Nuxt Modules](https://nuxt.com/modules)
- [Nuxt UI](https://ui.nuxt.com/) - Komponentenbibliothek
- [Nuxt DevTools](https://devtools.nuxt.com/)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Page | `pages/about.vue` → `/about` |
| Dynamische Route | `pages/[id].vue` → `/:id` |
| Layout | `layouts/default.vue` |
| Server-API | `server/api/users.ts` |
| Middleware | `middleware/auth.ts` |
| Plugin | `plugins/my-plugin.ts` |
| Daten abrufen | `useFetch('/api/data')` |
| Lazy Fetch | `useLazyFetch('/api/data')` |
| Route-Parameter | `useRoute().params` |
| Navigieren | `navigateTo('/path')` |
