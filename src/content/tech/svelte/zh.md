---
title: "Svelte"
description: "编译时 UI 框架 - 无虚拟 DOM，精准更新，打包体积最小"
template: "framework"
tags: ["frontend", "javascript", "framework"]
---

## TL;DR

**一句话**：Svelte 是编译器，不是框架——代码编译成原生 JS，零运行时开销。

**核心优势**：
- 没有虚拟 DOM - 编译成精确的 DOM 操作
- 真正响应式 - 赋值就触发更新
- 最小打包体积 - 不发送框架代码
- Svelte 5 runes - 细粒度响应式原语

## Core Concepts

### 概念 1：编译器，不是运行时

Svelte 把工作从浏览器转移到构建时。组件编译成高效的 JavaScript，直接操作 DOM。

```svelte
<!-- 这会被完全编译掉 -->
<script>
  let count = $state(0);
</script>

<button onclick={() => count++}>{count}</button>
```

### 概念 2：Runes（Svelte 5）

Runes 是新的响应式系统。它们是编译器能理解的类函数宏。

```svelte
<script>
  let count = $state(0);           // 响应式状态
  let doubled = $derived(count * 2); // 计算值

  $effect(() => {
    console.log(count);  // count 变化时运行
  });
</script>
```

### 概念 3：单文件组件

一切都在一个 `.svelte` 文件里——脚本、标记、样式（默认作用域隔离）。

```svelte
<script>
  let name = $state('world');
</script>

<h1>Hello {name}!</h1>

<style>
  h1 { color: purple; }  /* 只影响这个组件 */
</style>
```

## Quick Start

### 创建项目

```bash
npx sv create my-app
cd my-app
npm install
npm run dev
```

### 项目结构

```
my-app/
├── src/
│   ├── routes/        # SvelteKit 页面
│   │   └── +page.svelte
│   ├── lib/           # 共享组件
│   └── app.html
├── svelte.config.js
└── package.json
```

### 最小示例

```svelte
<!-- src/routes/+page.svelte -->
<script>
  let count = $state(0);
</script>

<h1>Hello Svelte!</h1>
<button onclick={() => count++}>
  计数: {count}
</button>
```

### 运行

```bash
npm run dev
# 打开 http://localhost:5173
```

## Gotchas

### 响应式需要 $state（Svelte 5）

```svelte
<script>
  // ❌ 不是响应式的
  let count = 0;

  // ✅ 用 runes 才是响应式的
  let count = $state(0);
</script>
```

### 数组/对象需要重新赋值或使用 $state

```svelte
<script>
  let items = $state([1, 2, 3]);

  // ✅ Svelte 5 中直接修改 $state 可以工作
  items.push(4);

  // 或者重新赋值
  items = [...items, 4];
</script>
```

### Props 使用 $props()

```svelte
<script>
  // Svelte 5 的方式
  let { name, count = 0 } = $props();
</script>

<h1>Hello {name}! 计数: {count}</h1>
```

### 双向绑定

```svelte
<script>
  let value = $state('');
</script>

<!-- bind: 创建双向绑定 -->
<input bind:value>
<p>你输入了: {value}</p>
```

## When to Use

**适合**：
- 性能关键的应用
- 中小型项目
- 不喜欢框架开销的开发者
- 学习现代响应式概念

**不适合**：
- 需要最大生态/招聘池的团队（React 领先）
- 需要大量第三方集成的项目
- 非常大的企业应用（大规模实战经验较少）

**对比**：
| 特性 | Svelte | React | Vue |
|------|--------|-------|-----|
| 打包体积 | 极小 | 40KB | 30KB |
| 运行时 | 无 | 有 | 有 |
| 学习曲线 | 简单 | 中等 | 简单 |
| 响应式 | 编译时 | Hooks | 基于 Proxy |

## Next Steps

- [Svelte 文档](https://svelte.dev/docs)
- [Svelte 教程](https://learn.svelte.dev/)
- [SvelteKit](https://svelte.dev/docs/kit/) - 全栈框架
- [Svelte Playground](https://svelte.dev/playground)

## Cheatsheet

| 模式 | Svelte 5 语法 |
|------|---------------|
| 状态 | `let x = $state(0)` |
| 派生 | `let y = $derived(x * 2)` |
| 副作用 | `$effect(() => { ... })` |
| Props | `let { prop } = $props()` |
| 绑定 | `<input bind:value>` |
| 事件 | `onclick={handler}` |
| 条件 | `{#if x}...{/if}` |
| 循环 | `{#each items as item}...{/each}` |
| 异步 | `{#await promise}...{/await}` |
