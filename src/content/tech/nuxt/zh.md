---
title: "Nuxt"
description: "5 分钟快速入门 Nuxt 框架"
template: "framework"
tags: ["frontend", "vue", "fullstack"]
---

## TL;DR

**一句话**：Nuxt 是生产级 Vue——让 Vue 应用直观且强大的全栈框架。

**核心优势**：
- 自动导入 - 不需要 import 语句
- 文件路由 - 创建文件就有路由
- 通用渲染 - SSR、SSG 或混合模式
- 模块生态 - 200+ 即用模块

## Core Concepts

### 概念 1：自动导入

Nuxt 自动导入 Vue API、composables 和你的组件。直接用就行。

```vue
<script setup>
// 不需要导入！
const count = ref(0)           // Vue ref
const route = useRoute()       // Nuxt composable
const { data } = await useFetch('/api/data')  // 数据获取
</script>
```

### 概念 2：文件路由

在 `pages/` 中创建文件，自动生成路由：

```
pages/
├── index.vue         → /
├── about.vue         → /about
├── blog/index.vue    → /blog
├── blog/[slug].vue   → /blog/:slug（动态）
└── [...slug].vue     → 通配路由
```

### 概念 3：服务端引擎（Nitro）

强大的服务端引擎提供全栈能力：

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return { message: 'Hello from the server!' }
})
```

通过 `$fetch('/api/hello')` 或 `useFetch('/api/hello')` 访问。

## Quick Start

### 创建项目

```bash
npx nuxi@latest init my-app
cd my-app
npm install
npm run dev
```

### 项目结构

```
my-app/
├── pages/            # 文件路由
├── components/       # 自动导入的组件
├── composables/      # 自动导入的 composables
├── server/           # 服务端路由和中间件
│   └── api/
├── layouts/          # 页面布局
├── nuxt.config.ts    # Nuxt 配置
└── package.json
```

### 最小示例

```vue
<!-- pages/index.vue -->
<script setup>
const count = ref(0)
</script>

<template>
  <div>
    <h1>Hello Nuxt!</h1>
    <button @click="count++">计数: {{ count }}</button>
  </div>
</template>
```

### 运行

```bash
npm run dev
# 打开 http://localhost:3000
```

## Gotchas

### useFetch vs $fetch

```vue
<script setup>
// useFetch - 用于组件，处理 SSR 水合
const { data, pending, error } = await useFetch('/api/data')

// $fetch - 用于事件处理器、服务端路由
async function submit() {
  const result = await $fetch('/api/submit', { method: 'POST', body: formData })
}
</script>
```

### 布局需要 NuxtPage

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <nav>导航</nav>
    <slot />  <!-- 页面内容在这里 -->
  </div>
</template>

<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### 用 .server 限制服务端代码

```typescript
// composables/useDb.server.ts - 只在服务端运行
export function useDb() {
  // 这里可以安全使用数据库连接
  return db.query(...)
}
```

### 动态路由需要正确的类型

```vue
<!-- pages/users/[id].vue -->
<script setup>
const route = useRoute()
// route.params.id 可用
const { data: user } = await useFetch(`/api/users/${route.params.id}`)
</script>
```

## When to Use

**适合**：
- 想要全栈能力的 Vue 开发者
- SEO 关键的 Vue 应用
- 喜欢约定大于配置的团队
- 需要混合渲染策略的项目

**不适合**：
- React 团队（用 Next.js）
- 简单 SPA（Vue + Vite 就够了）
- 极度追求控制的人（太有主见）

**对比**：
| 特性 | Nuxt | Next.js | SvelteKit |
|------|------|---------|-----------|
| 框架 | Vue | React | Svelte |
| 自动导入 | 是 | 否 | 部分 |
| 学习曲线 | 简单 | 中等 | 简单 |
| 模块生态 | 200+ | 有限 | 成长中 |

## Next Steps

- [Nuxt 文档](https://nuxt.com/docs)
- [Nuxt 模块](https://nuxt.com/modules)
- [Nuxt UI](https://ui.nuxt.com/) - 组件库
- [Nuxt DevTools](https://devtools.nuxt.com/)

## Cheatsheet

| 模式 | 代码 |
|------|------|
| 页面 | `pages/about.vue` → `/about` |
| 动态路由 | `pages/[id].vue` → `/:id` |
| 布局 | `layouts/default.vue` |
| 服务端 API | `server/api/users.ts` |
| 中间件 | `middleware/auth.ts` |
| 插件 | `plugins/my-plugin.ts` |
| 获取数据 | `useFetch('/api/data')` |
| 懒加载获取 | `useLazyFetch('/api/data')` |
| 路由参数 | `useRoute().params` |
| 导航 | `navigateTo('/path')` |
