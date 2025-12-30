---
title: "Svelte"
description: "Démarrez avec le framework Svelte en 5 minutes"
template: "framework"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**En bref** : Svelte est un compilateur, pas un framework - votre code devient du JS vanilla sans overhead runtime.

**Points forts** :
- Pas de DOM virtuel - compile en mises à jour DOM chirurgicales
- Vraiment réactif - assignez simplement pour déclencher les mises à jour
- Bundles les plus petits - aucun code de framework livré
- Svelte 5 runes - primitives de réactivité fine

## Core Concepts

### Concept 1: Compiler, Not Runtime

Svelte déplace le travail du navigateur au temps de build. Vos composants se compilent en JavaScript efficace qui manipule directement le DOM.

```svelte
<!-- This compiles away completely -->
<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>{count}</button>
```

### Concept 2: Runes (Svelte 5)

Les runes sont le nouveau système de réactivité. Ce sont des macros semblables à des fonctions que le compilateur comprend.

```svelte
<script>
  let count = $state(0);           // Reactive state
  let doubled = $derived(count * 2); // Computed value

  $effect(() => {
    console.log(count);  // Runs when count changes
  });
</script>
```

### Concept 3: Single-File Components

Tout dans un fichier `.svelte` - script, markup, styles (scopés par défaut).

```svelte
<script>
  let name = $state('world');
</script>

<h1>Hello {name}!</h1>

<style>
  h1 { color: purple; }  /* Only affects this component */
</style>
```

## Quick Start

### Create Project

```bash
npx sv create my-app
cd my-app
npm install
npm run dev
```

### Project Structure

```
my-app/
├── src/
│   ├── routes/        # SvelteKit pages
│   │   └── +page.svelte
│   ├── lib/           # Shared components
│   └── app.html
├── svelte.config.js
└── package.json
```

### Minimal Example

```svelte
<!-- src/routes/+page.svelte -->
<script>
  let count = $state(0);
</script>

<h1>Hello Svelte!</h1>
<button onclick={() => count++}>
  Count: {count}
</button>
```

### Run

```bash
npm run dev
# Open http://localhost:5173
```

## Gotchas

### Reactivity requires $state (Svelte 5)

```svelte
<script>
  // ❌ Not reactive
  let count = 0;

  // ✅ Reactive with runes
  let count = $state(0);
</script>
```

### Arrays/objects need reassignment or $state

```svelte
<script>
  let items = $state([1, 2, 3]);

  // ✅ Direct mutation works with $state in Svelte 5
  items.push(4);

  // Or reassign
  items = [...items, 4];
</script>
```

### Props use $props()

```svelte
<script>
  // Svelte 5 way
  let { name, count = 0 } = $props();
</script>

<h1>Hello {name}! Count: {count}</h1>
```

### Two-way binding

```svelte
<script>
  let value = $state('');
</script>

<!-- bind: creates two-way binding -->
<input bind:value>
<p>You typed: {value}</p>
```

## When to Use

**Idéal pour** :
- Applications critiques en performance
- Projets petits à moyens
- Développeurs qui n'aiment pas l'overhead des frameworks
- Apprendre les concepts de réactivité modernes

**Moins adapté pour** :
- Équipes nécessitant un maximum d'écosystème/pool d'embauche (React domine)
- Projets nécessitant des intégrations tierces extensives
- Très grandes apps enterprise (moins éprouvé à grande échelle)

**Comparaison** :
| Fonctionnalité | Svelte | React | Vue |
|---------|--------|-------|-----|
| Taille bundle | Minuscule | 40KB | 30KB |
| Runtime | Aucun | Oui | Oui |
| Courbe d'apprentissage | Facile | Moyenne | Facile |
| Réactivité | Compile-time | Hooks | Proxy-based |

## Next Steps

- [Svelte Documentation](https://svelte.dev/docs)
- [Svelte Tutorial](https://learn.svelte.dev/)
- [SvelteKit](https://svelte.dev/docs/kit/) - Framework full-stack
- [Svelte Playground](https://svelte.dev/playground)

## Cheatsheet

| Pattern | Syntaxe Svelte 5 |
|---------|-----------------|
| State | `let x = $state(0)` |
| Derived | `let y = $derived(x * 2)` |
| Effect | `$effect(() => { ... })` |
| Props | `let { prop } = $props()` |
| Bind | `<input bind:value>` |
| Événement | `onclick={handler}` |
| Condition | `{#if x}...{/if}` |
| Boucle | `{#each items as item}...{/each}` |
| Await | `{#await promise}...{/await}` |
