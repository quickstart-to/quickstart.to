---
title: "Nuxt"
description: "Framework Vue full-stack con auto-imports - enrutamiento basado en archivos, renderizado universal, 200+ modulos listos para usar"
template: "framework"
tags: ["frontend", "vue", "fullstack"]
---

## TL;DR

**En resumen**: Nuxt es Vue para producción - el framework full-stack que hace las apps Vue intuitivas y potentes.

**Fortalezas principales**:
- Auto-imports - no necesitas declaraciones de import
- Routing basado en archivos - crea archivos, obtén rutas
- Renderizado universal - SSR, SSG o híbrido
- Ecosistema de módulos - 200+ módulos listos para usar

## Core Concepts

### Concept 1: Auto-imports

Nuxt importa automáticamente APIs de Vue, composables y tus componentes. Solo úsalos.

```vue
<script setup>
// No imports needed!
const count = ref(0)           // Vue ref
const route = useRoute()       // Nuxt composable
const { data } = await useFetch('/api/data')  // Data fetching
</script>
```

### Concept 2: File-based Routing

Crea archivos en `pages/`, obtén rutas automáticamente:

```
pages/
├── index.vue         → /
├── about.vue         → /about
├── blog/index.vue    → /blog
├── blog/[slug].vue   → /blog/:slug (dynamic)
└── [...slug].vue     → catch-all route
```

### Concept 3: Server Engine (Nitro)

Capacidades full-stack con un potente motor de servidor:

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return { message: 'Hello from the server!' }
})
```

Accede via `$fetch('/api/hello')` o `useFetch('/api/hello')`.

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

**Ideal para**:
- Desarrolladores Vue que quieren capacidades full-stack
- Aplicaciones Vue críticas para SEO
- Equipos que prefieren convención sobre configuración
- Proyectos que necesitan estrategias de renderizado híbridas

**No ideal para**:
- Equipos React (usa Next.js)
- SPAs simples (Vue + Vite es suficiente)
- Los obsesivos del control (demasiado opinionado)

**Comparación**:
| Feature | Nuxt | Next.js | SvelteKit |
|---------|------|---------|-----------|
| Framework | Vue | React | Svelte |
| Auto-imports | Sí | No | Parcial |
| Curva de aprendizaje | Fácil | Media | Fácil |
| Ecosistema de módulos | 200+ | Limitado | Creciendo |

## Next Steps

- [Nuxt Documentation](https://nuxt.com/docs)
- [Nuxt Modules](https://nuxt.com/modules)
- [Nuxt UI](https://ui.nuxt.com/) - Biblioteca de componentes
- [Nuxt DevTools](https://devtools.nuxt.com/)

## Cheatsheet

| Patrón | Código |
|---------|------|
| Page | `pages/about.vue` → `/about` |
| Ruta dinámica | `pages/[id].vue` → `/:id` |
| Layout | `layouts/default.vue` |
| API Server | `server/api/users.ts` |
| Middleware | `middleware/auth.ts` |
| Plugin | `plugins/my-plugin.ts` |
| Obtener datos | `useFetch('/api/data')` |
| Lazy fetch | `useLazyFetch('/api/data')` |
| Params de ruta | `useRoute().params` |
| Navegar | `navigateTo('/path')` |
