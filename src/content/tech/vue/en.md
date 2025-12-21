---
title: "Vue.js"
description: "Get started with Vue.js framework in 5 minutes"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**What**: A progressive JavaScript framework for building user interfaces.

**Why**: Easy learning curve, reactive data binding, excellent documentation, flexible architecture.

## Quick Start

**Create new project**:
```bash
npm create vue@latest my-app
cd my-app
npm install
npm run dev
```

**Or use CDN** (for quick prototyping):
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<div id="app">{{ message }}</div>
<script>
  Vue.createApp({
    data() { return { message: 'Hello Vue!' } }
  }).mount('#app')
</script>
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npm create vue@latest` | Create new Vue project |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

**Template syntax**:
```vue
<template>
  <div>{{ message }}</div>           <!-- Text interpolation -->
  <div v-if="show">Conditional</div> <!-- Conditional -->
  <div v-for="item in items">Loop</div> <!-- Loop -->
  <button @click="handler">Click</button> <!-- Event -->
  <input v-model="text" />           <!-- Two-way binding -->
</template>
```

## Gotchas

### Reactivity with objects

```javascript
// Won't trigger update
this.obj.newProp = 'value'

// Use reactive assignment
this.obj = { ...this.obj, newProp: 'value' }
```

### Props are read-only

```vue
<script setup>
const props = defineProps(['title'])
// props.title = 'new' // Error! Props are read-only
</script>
```

### ref vs reactive

```javascript
import { ref, reactive } from 'vue'

const count = ref(0)        // For primitives, access with .value
const state = reactive({})   // For objects, no .value needed
```

## Next Steps

- [Vue Documentation](https://vuejs.org/guide/) - Official guide
- [Vue Tutorial](https://vuejs.org/tutorial/) - Interactive tutorial
- [Pinia](https://pinia.vuejs.org/) - State management
- [Vue Router](https://router.vuejs.org/) - Routing
