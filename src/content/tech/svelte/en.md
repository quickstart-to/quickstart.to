---
title: "Svelte"
description: "Get started with Svelte framework in 5 minutes"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**What**: A compiler that generates minimal, framework-less JavaScript.

**Why**: No virtual DOM, truly reactive, smaller bundles, less boilerplate.

## Quick Start

**Create new project**:
```bash
npx sv create my-app
cd my-app
npm install
npm run dev
```

Open http://localhost:5173

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npx sv create` | Create new project |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview build |

**Component structure** (`App.svelte`):
```svelte
<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  Clicked {count} times
</button>

<style>
  button { color: blue; }
</style>
```

## Gotchas

### Reactivity is based on assignments

```svelte
<script>
  let arr = [1, 2, 3];

  // Won't trigger update
  arr.push(4);

  // Will trigger update
  arr = [...arr, 4];
</script>
```

### $ for reactive declarations

```svelte
<script>
  let count = 0;
  $: doubled = count * 2;  // Reactive statement
  $: console.log(count);   // Runs when count changes
</script>
```

### Props with export

```svelte
<script>
  export let name = 'World';  // Prop with default
</script>

<h1>Hello {name}!</h1>
```

### Two-way binding

```svelte
<script>
  let value = '';
</script>

<input bind:value>
<p>{value}</p>
```

## Next Steps

- [Svelte Documentation](https://svelte.dev/docs) - Official docs
- [Svelte Tutorial](https://learn.svelte.dev/) - Interactive tutorial
- [SvelteKit](https://kit.svelte.dev/) - Full-stack framework
- [Svelte REPL](https://svelte.dev/repl) - Online playground
