---
title: "Svelte"
description: "Comienza con el framework Svelte en 5 minutos"
template: "framework"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**En resumen**: Svelte es un compilador, no un framework - tu código se convierte en JS vanilla sin overhead de runtime.

**Fortalezas principales**:
- Sin DOM virtual - compila a actualizaciones DOM quirúrgicas
- Verdaderamente reactivo - solo asigna para disparar actualizaciones
- Bundles más pequeños - no se envía código del framework
- Svelte 5 runes - primitivas de reactividad de grano fino

## Core Concepts

### Concept 1: Compiler, Not Runtime

Svelte mueve el trabajo del navegador al tiempo de build. Tus componentes compilan a JavaScript eficiente que manipula el DOM directamente.

```svelte
<!-- This compiles away completely -->
<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>{count}</button>
```

### Concept 2: Runes (Svelte 5)

Los runes son el nuevo sistema de reactividad. Son macros similares a funciones que el compilador entiende.

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

Todo en un archivo `.svelte` - script, markup, estilos (con scope por defecto).

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

**Ideal para**:
- Aplicaciones críticas en rendimiento
- Proyectos pequeños a medianos
- Desarrolladores que no les gusta el overhead de frameworks
- Aprender conceptos de reactividad modernos

**No ideal para**:
- Equipos que necesitan máximo ecosistema/pool de contratación (React lidera)
- Proyectos que requieren integraciones extensivas de terceros
- Apps enterprise muy grandes (menos probado a escala)

**Comparación**:
| Característica | Svelte | React | Vue |
|---------|--------|-------|-----|
| Tamaño bundle | Diminuto | 40KB | 30KB |
| Runtime | Ninguno | Sí | Sí |
| Curva de aprendizaje | Fácil | Media | Fácil |
| Reactividad | Compile-time | Hooks | Proxy-based |

## Next Steps

- [Svelte Documentation](https://svelte.dev/docs)
- [Svelte Tutorial](https://learn.svelte.dev/)
- [SvelteKit](https://svelte.dev/docs/kit/) - Framework full-stack
- [Svelte Playground](https://svelte.dev/playground)

## Cheatsheet

| Patrón | Sintaxis Svelte 5 |
|---------|-----------------|
| Estado | `let x = $state(0)` |
| Derivado | `let y = $derived(x * 2)` |
| Efecto | `$effect(() => { ... })` |
| Props | `let { prop } = $props()` |
| Bind | `<input bind:value>` |
| Evento | `onclick={handler}` |
| Condición | `{#if x}...{/if}` |
| Bucle | `{#each items as item}...{/each}` |
| Await | `{#await promise}...{/await}` |
