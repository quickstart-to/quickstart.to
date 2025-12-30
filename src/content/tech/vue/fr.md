---
title: "Vue.js"
description: "Framework JavaScript progressif - réactif par défaut, s'adapte des widgets simples aux SPAs complexes"
template: "framework"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**En bref** : Vue est le framework JavaScript progressif - commence simple, monte en complexité.

**Points forts** :
- Courbe d'apprentissage douce - le plus facile des trois grands
- Réactif par défaut - les données changent, l'UI se met à jour automatiquement
- Single-File Components - HTML, JS, CSS dans un fichier .vue
- Excellente documentation - probablement la meilleure de l'écosystème

## Core Concepts

### Concept 1: Reactivity

Vue suit les dépendances des données automatiquement. Changez les données, et le DOM se met à jour.

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

Tout pour un composant vit dans un fichier `.vue` :

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

La façon moderne de Vue 3 pour organiser la logique des composants - grouper le code associé au lieu de séparer par type d'option.

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

**Idéal pour** :
- Équipes apprenant leur premier framework
- Projets qui commencent petit et peuvent grandir
- Développeurs qui aiment une structure claire et opinionée
- Prototypage rapide

**Moins adapté pour** :
- Équipes déjà investies dans React/Angular
- Besoin de maximum d'options sur le marché du travail (React domine)
- Très grandes apps enterprise (Angular pourrait mieux convenir)

**Comparaison** :
| Fonctionnalité | Vue | React | Angular |
|---------|-----|-------|---------|
| Courbe d'apprentissage | Facile | Moyenne | Raide |
| Style de template | Basé HTML | JSX | Basé HTML |
| Gestion d'état | Pinia (officiel) | Nombreuses options | RxJS |
| Taille | 30KB | 40KB | 150KB+ |

## Next Steps

- [Vue Documentation](https://vuejs.org/guide/)
- [Vue Tutorial](https://vuejs.org/tutorial/)
- [Pinia](https://pinia.vuejs.org/) - Gestion d'état
- [Vue Router](https://router.vuejs.org/) - Routage
- [Nuxt](https://nuxt.com/) - Framework Vue full-stack

## Cheatsheet

| Pattern | Syntaxe |
|---------|--------|
| Texte | `{{ message }}` |
| Attribut | `:href="url"` ou `v-bind:href` |
| Événement | `@click="fn"` ou `v-on:click` |
| Bidirectionnel | `v-model="text"` |
| Conditionnel | `v-if` / `v-else-if` / `v-else` |
| Afficher/Cacher | `v-show="bool"` |
| Liste | `v-for="item in items" :key="item.id"` |
| Ref | `const x = ref(0)` → `x.value` |
| Computed | `const x = computed(() => ...)` |
| Watch | `watch(source, callback)` |
