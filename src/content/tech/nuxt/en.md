---
title: "Nuxt"
description: "Get started with Nuxt framework in 5 minutes"
tags: ["frontend", "vue", "fullstack"]
---

## TL;DR

**What**: A Vue framework for building full-stack web applications.

**Why**: File-based routing, SSR/SSG, auto-imports, modules ecosystem, great DX.

## Quick Start

**Create new project**:
```bash
npx nuxi@latest init my-app
cd my-app
npm install
npm run dev
```

Open http://localhost:3000

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npx nuxi init` | Create new project |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview build |
| `npx nuxi add page name` | Add new page |
| `npx nuxi add component name` | Add component |

**File-based routing**:
```
pages/
├── index.vue         → /
├── about.vue         → /about
├── blog/[slug].vue   → /blog/:slug
└── [...slug].vue     → catch-all route
```

## Gotchas

### Auto-imports

```vue
<script setup>
// No imports needed for Vue APIs and composables
const count = ref(0)
const route = useRoute()
const { data } = await useFetch('/api/data')
</script>
```

### Server routes

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return { message: 'Hello from API!' }
})
```

### Data fetching

```vue
<script setup>
// useAsyncData for complex fetching
const { data, pending, error } = await useAsyncData('key', () => {
  return $fetch('/api/data')
})

// useFetch for simple API calls
const { data: posts } = await useFetch('/api/posts')
</script>
```

### Layouts

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <nav>Navigation</nav>
    <slot />
    <footer>Footer</footer>
  </div>
</template>
```

## Next Steps

- [Nuxt Documentation](https://nuxt.com/docs) - Official docs
- [Nuxt Modules](https://nuxt.com/modules) - Module ecosystem
- [Nuxt UI](https://ui.nuxt.com/) - UI component library
- [Nuxt DevTools](https://devtools.nuxt.com/) - Development tools
