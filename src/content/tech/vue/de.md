---
title: "Vue.js"
description: "Progressives JavaScript-Framework - reaktiv by default, skaliert von einfachen Widgets zu komplexen SPAs"
template: "framework"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**Kurzfassung**: Vue ist das progressive JavaScript-Framework - startet einfach, skaliert zu komplex.

**Kernstärken**:
- Sanfte Lernkurve - das einfachste der großen drei
- Standardmäßig reaktiv - Daten ändern sich, UI aktualisiert automatisch
- Single-File Components - HTML, JS, CSS in einer .vue Datei
- Ausgezeichnete Dokumentation - wohl die beste im Ökosystem

## Core Concepts

### Concept 1: Reactivity

Vue verfolgt Datenabhängigkeiten automatisch. Ändern Sie die Daten, und das DOM aktualisiert sich.

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

Alles für eine Komponente lebt in einer `.vue` Datei:

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

Vue 3's moderner Weg zur Organisation von Komponentenlogik - verwandten Code zusammenhalten anstatt nach Optionstyp zu trennen.

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

**Ideal für**:
- Teams die ihr erstes Framework lernen
- Projekte die klein starten und wachsen können
- Entwickler die klare, meinungsstarke Struktur mögen
- Schnelles Prototyping

**Weniger geeignet für**:
- Teams bereits in React/Angular investiert
- Maximale Arbeitsmarkt-Optionen benötigt (React führt)
- Sehr große Enterprise-Apps (Angular passt möglicherweise besser)

**Vergleich**:
| Feature | Vue | React | Angular |
|---------|-----|-------|---------|
| Lernkurve | Einfach | Mittel | Steil |
| Template-Stil | HTML-basiert | JSX | HTML-basiert |
| State Management | Pinia (offiziell) | Viele Optionen | RxJS |
| Größe | 30KB | 40KB | 150KB+ |

## Next Steps

- [Vue Documentation](https://vuejs.org/guide/)
- [Vue Tutorial](https://vuejs.org/tutorial/)
- [Pinia](https://pinia.vuejs.org/) - State Management
- [Vue Router](https://router.vuejs.org/) - Routing
- [Nuxt](https://nuxt.com/) - Full-Stack Vue Framework

## Cheatsheet

| Muster | Syntax |
|---------|--------|
| Text | `{{ message }}` |
| Attribut | `:href="url"` oder `v-bind:href` |
| Event | `@click="fn"` oder `v-on:click` |
| Zwei-Wege | `v-model="text"` |
| Bedingt | `v-if` / `v-else-if` / `v-else` |
| Zeigen/Verstecken | `v-show="bool"` |
| Liste | `v-for="item in items" :key="item.id"` |
| Ref | `const x = ref(0)` → `x.value` |
| Computed | `const x = computed(() => ...)` |
| Watch | `watch(source, callback)` |
