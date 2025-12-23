---
title: "Nuxt"
description: "Get started with Nuxt framework in 5 minutes"
template: "framework"
tags: ["frontend", "vue", "fullstack"]
---

## TL;DR

**One-liner**: Nuxt is Vue for production - the full-stack framework that makes Vue apps intuitive and powerful.

**Core Strengths**:
- Auto-imports - no import statements needed
- File-based routing - create files, get routes
- Universal rendering - SSR, SSG, or hybrid
- Module ecosystem - 200+ ready-to-use modules

## Core Concepts

### Concept 1: Auto-imports

Nuxt automatically imports Vue APIs, composables, and your components. Just use them.

```vue
<script setup>
// No imports needed!
const count = ref(0)           // Vue ref
const route = useRoute()       // Nuxt composable
const { data } = await useFetch('/api/data')  // Data fetching
</script>
```

### Concept 2: File-based Routing

Create files in `pages/`, get routes automatically:

```
pages/
├── index.vue         → /
├── about.vue         → /about
├── blog/index.vue    → /blog
├── blog/[slug].vue   → /blog/:slug (dynamic)
└── [...slug].vue     → catch-all route
```

### Concept 3: Server Engine (Nitro)

Full-stack capabilities with a powerful server engine:

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return { message: 'Hello from the server!' }
})
```

Access it via `$fetch('/api/hello')` or `useFetch('/api/hello')`.

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

**Best for**:
- Vue developers wanting full-stack capabilities
- SEO-critical Vue applications
- Teams wanting convention over configuration
- Projects needing hybrid rendering strategies

**Not ideal for**:
- React teams (use Next.js)
- Simple SPAs (plain Vue + Vite is enough)
- Maximum control freaks (too opinionated)

**Comparison**:
| Feature | Nuxt | Next.js | SvelteKit |
|---------|------|---------|-----------|
| Framework | Vue | React | Svelte |
| Auto-imports | Yes | No | Partial |
| Learning curve | Easy | Medium | Easy |
| Module ecosystem | 200+ | Limited | Growing |

## Next Steps

- [Nuxt Documentation](https://nuxt.com/docs)
- [Nuxt Modules](https://nuxt.com/modules)
- [Nuxt UI](https://ui.nuxt.com/) - Component library
- [Nuxt DevTools](https://devtools.nuxt.com/)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Page | `pages/about.vue` → `/about` |
| Dynamic route | `pages/[id].vue` → `/:id` |
| Layout | `layouts/default.vue` |
| Server API | `server/api/users.ts` |
| Middleware | `middleware/auth.ts` |
| Plugin | `plugins/my-plugin.ts` |
| Fetch data | `useFetch('/api/data')` |
| Lazy fetch | `useLazyFetch('/api/data')` |
| Route params | `useRoute().params` |
| Navigate | `navigateTo('/path')` |
