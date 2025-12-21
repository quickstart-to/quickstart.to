---
title: "Nuxt"
description: "5 分钟快速入门 Nuxt 框架"
tags: ["frontend", "vue", "fullstack"]
---

## TL;DR

**是什么**：用于构建全栈 Web 应用的 Vue 框架。

**为什么用**：基于文件的路由、SSR/SSG、自动导入、模块生态系统、优秀的开发体验。

## Quick Start

**创建新项目**：
```bash
npx nuxi@latest init my-app
cd my-app
npm install
npm run dev
```

打开 http://localhost:3000

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npx nuxi init` | 创建新项目 |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建 |
| `npx nuxi add page name` | 添加新页面 |
| `npx nuxi add component name` | 添加组件 |

**基于文件的路由**：
```
pages/
├── index.vue         → /
├── about.vue         → /about
├── blog/[slug].vue   → /blog/:slug
└── [...slug].vue     → 通配路由
```

## Gotchas

### 自动导入

```vue
<script setup>
// 不需要导入 Vue API 和组合式函数
const count = ref(0)
const route = useRoute()
const { data } = await useFetch('/api/data')
</script>
```

### 服务端路由

```typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return { message: 'Hello from API!' }
})
```

### 数据获取

```vue
<script setup>
// useAsyncData 用于复杂获取
const { data, pending, error } = await useAsyncData('key', () => {
  return $fetch('/api/data')
})

// useFetch 用于简单 API 调用
const { data: posts } = await useFetch('/api/posts')
</script>
```

### 布局

```vue
<!-- layouts/default.vue -->
<template>
  <div>
    <nav>导航</nav>
    <slot />
    <footer>页脚</footer>
  </div>
</template>
```

## Next Steps

- [Nuxt 文档](https://nuxt.com/docs) - 官方文档
- [Nuxt 模块](https://nuxt.com/modules) - 模块生态
- [Nuxt UI](https://ui.nuxt.com/) - UI 组件库
- [Nuxt DevTools](https://devtools.nuxt.com/) - 开发工具
