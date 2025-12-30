---
title: "Vue.js"
description: "Progressive JavaScript framework - reactive by default, scales from simple widgets to complex SPAs"
template: "framework"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**One-liner**: Vue is the progressive JavaScript framework - starts simple, scales to complex.

**Core Strengths**:
- Gentle learning curve - easiest of the big three
- Reactive by default - data changes, UI updates automatically
- Single-File Components - HTML, JS, CSS in one .vue file
- Excellent docs - arguably the best in the ecosystem

## Core Concepts

### Concept 1: Reactivity

Vue tracks data dependencies automatically. Change the data, and the DOM updates.

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)  // Reactive reference
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

### Concept 2: Single-File Components (SFC)

Everything for a component lives in one `.vue` file:

```vue
<script setup>
// JavaScript logic
</script>

<template>
  <!-- HTML template -->
</template>

<style scoped>
/* CSS styles (scoped to this component) */
</style>
```

### Concept 3: Composition API

Vue 3's modern way to organize component logic - group related code together instead of splitting by option type.

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

// Related logic stays together
const count = ref(0)
const doubled = computed(() => count.value * 2)
onMounted(() => console.log('Ready!'))
</script>
```

## Quick Start

### Create Project

```bash
npm create vue@latest my-app
cd my-app
npm install
npm run dev
```

### Project Structure

```
my-app/
├── src/
│   ├── App.vue         # Root component
│   ├── main.js         # Entry point
│   └── components/     # Components folder
├── index.html
├── package.json
└── vite.config.js
```

### Minimal Example

```vue
<!-- src/App.vue -->
<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue!')
const count = ref(0)
</script>

<template>
  <h1>{{ message }}</h1>
  <button @click="count++">Count: {{ count }}</button>
</template>
```

### Run

```bash
npm run dev
# Open http://localhost:5173
```

## Gotchas

### ref needs .value in JS, not in template

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)

// In JS, use .value
console.log(count.value)
count.value++
</script>

<template>
  <!-- In template, NO .value needed -->
  <span>{{ count }}</span>
</template>
```

### ref vs reactive

```javascript
import { ref, reactive } from 'vue'

// ref - for primitives (or anything)
const count = ref(0)           // Access: count.value
const user = ref({ name: '' }) // Access: user.value.name

// reactive - for objects only (no .value needed)
const state = reactive({ count: 0 })  // Access: state.count
```

### Props are read-only

```vue
<script setup>
const props = defineProps(['title'])
// props.title = 'new'  // ❌ Error! Can't mutate props

// ✅ Emit event to parent instead
const emit = defineEmits(['update'])
emit('update', 'new value')
</script>
```

### v-if vs v-show

```vue
<!-- v-if: Actually removes/adds element from DOM -->
<div v-if="show">Expensive to toggle</div>

<!-- v-show: Just toggles CSS display property -->
<div v-show="show">Cheap to toggle</div>
```

## When to Use

**Best for**:
- Teams learning their first framework
- Projects that start small and may grow
- Developers who like clear, opinionated structure
- Rapid prototyping

**Not ideal for**:
- Teams already invested in React/Angular
- Need maximum job market options (React leads)
- Very large enterprise apps (Angular might fit better)

**Comparison**:
| Feature | Vue | React | Angular |
|---------|-----|-------|---------|
| Learning curve | Easy | Medium | Steep |
| Template style | HTML-based | JSX | HTML-based |
| State management | Pinia (official) | Many options | RxJS |
| Size | 30KB | 40KB | 150KB+ |

## Next Steps

- [Vue Documentation](https://vuejs.org/guide/)
- [Vue Tutorial](https://vuejs.org/tutorial/)
- [Pinia](https://pinia.vuejs.org/) - State management
- [Vue Router](https://router.vuejs.org/) - Routing
- [Nuxt](https://nuxt.com/) - Full-stack Vue framework

## Cheatsheet

| Pattern | Syntax |
|---------|--------|
| Text | `{{ message }}` |
| Attribute | `:href="url"` or `v-bind:href` |
| Event | `@click="fn"` or `v-on:click` |
| Two-way | `v-model="text"` |
| Conditional | `v-if` / `v-else-if` / `v-else` |
| Show/Hide | `v-show="bool"` |
| List | `v-for="item in items" :key="item.id"` |
| Ref | `const x = ref(0)` → `x.value` |
| Computed | `const x = computed(() => ...)` |
| Watch | `watch(source, callback)` |
