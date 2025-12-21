---
title: "Svelte"
description: "5 分钟快速入门 Svelte 框架"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**是什么**：一个生成最小化、无框架 JavaScript 的编译器。

**为什么用**：无虚拟 DOM、真正响应式、更小的打包体积、更少的样板代码。

## Quick Start

**创建新项目**：
```bash
npx sv create my-app
cd my-app
npm install
npm run dev
```

打开 http://localhost:5173

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npx sv create` | 创建新项目 |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建 |

**组件结构**（`App.svelte`）：
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

### 响应式基于赋值

```svelte
<script>
  let arr = [1, 2, 3];

  // 不会触发更新
  arr.push(4);

  // 会触发更新
  arr = [...arr, 4];
</script>
```

### $ 用于响应式声明

```svelte
<script>
  let count = 0;
  $: doubled = count * 2;  // 响应式声明
  $: console.log(count);   // count 变化时运行
</script>
```

### 使用 export 定义 Props

```svelte
<script>
  export let name = 'World';  // 带默认值的 Prop
</script>

<h1>Hello {name}!</h1>
```

### 双向绑定

```svelte
<script>
  let value = '';
</script>

<input bind:value>
<p>{value}</p>
```

## Next Steps

- [Svelte 文档](https://svelte.dev/docs) - 官方文档
- [Svelte 教程](https://learn.svelte.dev/) - 交互式教程
- [SvelteKit](https://kit.svelte.dev/) - 全栈框架
- [Svelte REPL](https://svelte.dev/repl) - 在线练习
