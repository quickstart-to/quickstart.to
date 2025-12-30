---
title: "Astro"
description: "内容优先的 Web 框架 - 默认零 JS，岛屿架构，React/Vue/Svelte 可混用"
template: "framework"
tags: ["frontend", "static-site", "framework"]
---

## TL;DR

**一句话**：Astro 是内容驱动网站的框架——默认零 JavaScript，只对需要交互的部分注水。

**核心优势**：
- 默认零 JS - 纯静态 HTML，100 分 Lighthouse
- 孤岛架构 - 只注水交互组件
- 用任何框架 - React、Vue、Svelte、Solid 共存
- 内容集合 - 类型安全的 Markdown/MDX

## Core Concepts

### 概念 1：孤岛架构

组件默认是静态的。选择性地添加交互：

```astro
---
import ReactCounter from './Counter.jsx';
import VueModal from './Modal.vue';
---

<!-- 静态 - 不发送 JS -->
<h1>我的博客</h1>
<p>这段内容是纯 HTML</p>

<!-- 孤岛 - 只有这些有 JS -->
<ReactCounter client:visible />  <!-- 可见时注水 -->
<VueModal client:load />         <!-- 页面加载时注水 -->
<ReactCounter client:idle />     <!-- 浏览器空闲时注水 -->
```

### 概念 2：.astro 组件

默认服务端渲染。frontmatter 写逻辑，模板写标记：

```astro
---
// 构建时运行（服务端）
const response = await fetch('https://api.example.com/posts');
const posts = await response.json();
---

<ul>
  {posts.map(post => (
    <li><a href={`/blog/${post.slug}`}>{post.title}</a></li>
  ))}
</ul>

<style>
  /* 作用域隔离到此组件 */
  li { margin-bottom: 0.5rem; }
</style>
```

### 概念 3：内容集合

用 Zod 验证的类型安全内容：

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---
```

## Quick Start

### 创建项目

```bash
npm create astro@latest my-blog
cd my-blog
```

### 项目结构

```
src/
├── pages/          # 基于文件的路由
│   ├── index.astro     → /
│   ├── about.astro     → /about
│   └── blog/[slug].astro → /blog/:slug
├── components/     # 可复用组件
├── layouts/        # 页面布局
└── content/        # 内容集合
```

### 运行

```bash
npm run dev
# 打开 http://localhost:4321
```

## Gotchas

### 文件路由规则

```
src/pages/
├── index.astro           → /
├── about.astro           → /about
├── blog/index.astro      → /blog
├── blog/[slug].astro     → /blog/my-post
└── [...slug].astro       → /any/nested/path（通配）
```

### 选择正确的 client 指令

```astro
<!-- 最常用 - 进入视口时加载 -->
<Component client:visible />

<!-- 关键交互 - 立即加载 -->
<Component client:load />

<!-- 非关键 - 浏览器空闲时加载 -->
<Component client:idle />

<!-- 仅特定媒体查询 -->
<Component client:media="(max-width: 768px)" />
```

### 动态路由需要 getStaticPaths

```astro
---
// src/pages/blog/[slug].astro
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
---
```

## When to Use

**适合**：
- 博客和文档站点
- 营销/落地页
- 内容为主的网站
- 对性能要求高的站点

**不适合**：
- 高交互应用（仪表盘、SPA）
- 实时应用
- 需要客户端路由的应用

**对比**：
| 特性 | Astro | Next.js | Gatsby |
|------|-------|---------|--------|
| 默认 JS | 零 | 完整 React | 完整 React |
| 框架锁定 | 无 | React | React |
| 构建速度 | 快 | 中等 | 慢 |
| 适用场景 | 内容 | 应用+内容 | 内容 |

## Next Steps

- [Astro 文档](https://docs.astro.build/)
- [Astro 教程](https://docs.astro.build/en/tutorial/)
- [Astro 主题](https://astro.build/themes/)
- [Astro 集成](https://astro.build/integrations/)

## Cheatsheet

| 模式 | 代码 |
|------|------|
| 静态组件 | `<Component />` |
| 可见时注水 | `<Component client:visible />` |
| 加载时注水 | `<Component client:load />` |
| 空闲时注水 | `<Component client:idle />` |
| 添加集成 | `npx astro add react` |
| 构建 | `npm run build` |
| 预览 | `npm run preview` |
