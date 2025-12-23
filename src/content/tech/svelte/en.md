---
title: "Svelte"
description: "Get started with Svelte framework in 5 minutes"
template: "framework"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**One-liner**: Svelte is a compiler, not a framework - your code becomes vanilla JS with zero runtime overhead.

**Core Strengths**:
- No virtual DOM - compiles to surgical DOM updates
- Truly reactive - just assign to trigger updates
- Smallest bundles - no framework code shipped
- Svelte 5 runes - fine-grained reactivity primitives

## Core Concepts

### Concept 1: Compiler, Not Runtime

Svelte shifts work from browser to build time. Your components compile to efficient JavaScript that directly manipulates the DOM.

```svelte
<!-- This compiles away completely -->
<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>{count}</button>
```

### Concept 2: Runes (Svelte 5)

Runes are the new reactivity system. They're function-like macros that the compiler understands.

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

Everything in one `.svelte` file - script, markup, styles (scoped by default).

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

**Best for**:
- Performance-critical applications
- Small to medium projects
- Developers who dislike framework overhead
- Learning modern reactivity concepts

**Not ideal for**:
- Teams needing maximum ecosystem/hiring pool (React leads)
- Projects requiring extensive third-party integrations
- Very large enterprise apps (less battle-tested at scale)

**Comparison**:
| Feature | Svelte | React | Vue |
|---------|--------|-------|-----|
| Bundle size | Tiny | 40KB | 30KB |
| Runtime | None | Yes | Yes |
| Learning curve | Easy | Medium | Easy |
| Reactivity | Compile-time | Hooks | Proxy-based |

## Next Steps

- [Svelte Documentation](https://svelte.dev/docs)
- [Svelte Tutorial](https://learn.svelte.dev/)
- [SvelteKit](https://svelte.dev/docs/kit/) - Full-stack framework
- [Svelte Playground](https://svelte.dev/playground)

## Cheatsheet

| Pattern | Svelte 5 Syntax |
|---------|-----------------|
| State | `let x = $state(0)` |
| Derived | `let y = $derived(x * 2)` |
| Effect | `$effect(() => { ... })` |
| Props | `let { prop } = $props()` |
| Bind | `<input bind:value>` |
| Event | `onclick={handler}` |
| Condition | `{#if x}...{/if}` |
| Loop | `{#each items as item}...{/each}` |
| Await | `{#await promise}...{/await}` |
