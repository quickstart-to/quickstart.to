---
title: "Vue.js"
description: "Comienza con el framework Vue.js en 5 minutos"
template: "framework"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**En resumen**: Vue es el framework JavaScript progresivo - empieza simple, escala a complejo.

**Fortalezas principales**:
- Curva de aprendizaje suave - el más fácil de los tres grandes
- Reactivo por defecto - los datos cambian, la UI se actualiza automáticamente
- Single-File Components - HTML, JS, CSS en un archivo .vue
- Excelente documentación - posiblemente la mejor del ecosistema

## Core Concepts

### Concept 1: Reactivity

Vue rastrea las dependencias de datos automáticamente. Cambia los datos, y el DOM se actualiza.

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

Todo para un componente vive en un archivo `.vue`:

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

La forma moderna de Vue 3 para organizar la lógica de componentes - agrupar código relacionado en lugar de separar por tipo de opción.

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

**Ideal para**:
- Equipos aprendiendo su primer framework
- Proyectos que empiezan pequeños y pueden crecer
- Desarrolladores que les gusta estructura clara y opinada
- Prototipado rápido

**No ideal para**:
- Equipos ya invertidos en React/Angular
- Necesidad de máximas opciones en el mercado laboral (React lidera)
- Apps enterprise muy grandes (Angular podría encajar mejor)

**Comparación**:
| Característica | Vue | React | Angular |
|---------|-----|-------|---------|
| Curva de aprendizaje | Fácil | Media | Pronunciada |
| Estilo de template | Basado en HTML | JSX | Basado en HTML |
| Gestión de estado | Pinia (oficial) | Muchas opciones | RxJS |
| Tamaño | 30KB | 40KB | 150KB+ |

## Next Steps

- [Vue Documentation](https://vuejs.org/guide/)
- [Vue Tutorial](https://vuejs.org/tutorial/)
- [Pinia](https://pinia.vuejs.org/) - Gestión de estado
- [Vue Router](https://router.vuejs.org/) - Routing
- [Nuxt](https://nuxt.com/) - Framework Vue full-stack

## Cheatsheet

| Patrón | Sintaxis |
|---------|--------|
| Texto | `{{ message }}` |
| Atributo | `:href="url"` o `v-bind:href` |
| Evento | `@click="fn"` o `v-on:click` |
| Bidireccional | `v-model="text"` |
| Condicional | `v-if` / `v-else-if` / `v-else` |
| Mostrar/Ocultar | `v-show="bool"` |
| Lista | `v-for="item in items" :key="item.id"` |
| Ref | `const x = ref(0)` → `x.value` |
| Computed | `const x = computed(() => ...)` |
| Watch | `watch(source, callback)` |
