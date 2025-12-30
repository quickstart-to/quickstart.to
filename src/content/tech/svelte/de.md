---
title: "Svelte"
description: "Compile-time UI-Framework - kein Virtual DOM, chirurgisch praezise Updates, kleinste Bundle-Groessen"
template: "framework"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**Kurzfassung**: Svelte ist ein Compiler, kein Framework - Ihr Code wird zu Vanilla JS ohne Runtime-Overhead.

**Kernstärken**:
- Kein virtuelles DOM - kompiliert zu chirurgischen DOM-Updates
- Wirklich reaktiv - einfach zuweisen um Updates auszulösen
- Kleinste Bundles - kein Framework-Code wird ausgeliefert
- Svelte 5 Runes - feinkörnige Reaktivitäts-Primitives

## Core Concepts

### Concept 1: Compiler, Not Runtime

Svelte verlagert Arbeit vom Browser in die Build-Zeit. Ihre Komponenten kompilieren zu effizientem JavaScript, das das DOM direkt manipuliert.

```svelte
<!-- This compiles away completely -->
<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>{count}</button>
```

### Concept 2: Runes (Svelte 5)

Runes sind das neue Reaktivitätssystem. Sie sind funktionsähnliche Makros, die der Compiler versteht.

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

Alles in einer `.svelte` Datei - Script, Markup, Styles (standardmäßig gekapselt).

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

**Ideal für**:
- Performance-kritische Anwendungen
- Kleine bis mittlere Projekte
- Entwickler, die Framework-Overhead ablehnen
- Lernen moderner Reaktivitätskonzepte

**Weniger geeignet für**:
- Teams, die maximales Ökosystem/Arbeitskräftepool brauchen (React führt)
- Projekte, die umfangreiche Drittanbieter-Integrationen benötigen
- Sehr große Enterprise-Apps (weniger kampferprobt im großen Maßstab)

**Vergleich**:
| Feature | Svelte | React | Vue |
|---------|--------|-------|-----|
| Bundle-Größe | Winzig | 40KB | 30KB |
| Runtime | Keine | Ja | Ja |
| Lernkurve | Einfach | Mittel | Einfach |
| Reaktivität | Compile-Zeit | Hooks | Proxy-basiert |

## Next Steps

- [Svelte Documentation](https://svelte.dev/docs)
- [Svelte Tutorial](https://learn.svelte.dev/)
- [SvelteKit](https://svelte.dev/docs/kit/) - Full-Stack Framework
- [Svelte Playground](https://svelte.dev/playground)

## Cheatsheet

| Muster | Svelte 5 Syntax |
|---------|-----------------|
| State | `let x = $state(0)` |
| Derived | `let y = $derived(x * 2)` |
| Effect | `$effect(() => { ... })` |
| Props | `let { prop } = $props()` |
| Bind | `<input bind:value>` |
| Event | `onclick={handler}` |
| Bedingung | `{#if x}...{/if}` |
| Schleife | `{#each items as item}...{/each}` |
| Await | `{#await promise}...{/await}` |
