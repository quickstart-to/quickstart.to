---
title: "Astro"
description: "5 分钟快速入门 Astro Web 框架"
tags: ["frontend", "static-site", "framework"]
---

## TL;DR

**是什么**：面向内容驱动网站的 Web 框架，JavaScript 极少。

**为什么用**：默认零 JS、孤岛架构、可用任何 UI 框架、适合博客/文档。

## Quick Start

**创建新项目**：
```bash
npm create astro@latest my-app
cd my-app
npm run dev
```

打开 http://localhost:4321

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建 |
| `npx astro add react` | 添加 React 集成 |
| `npx astro add tailwind` | 添加 Tailwind CSS |

**基于文件的路由**：
```
src/pages/
├── index.astro       → /
├── about.astro       → /about
├── blog/[slug].astro → /blog/:slug
└── [...slug].astro   → 通配路由
```

## Gotchas

### Astro 组件结构

```astro
---
// 组件脚本（构建时运行）
const name = "World";
const items = ["a", "b", "c"];
---

<!-- 组件模板 -->
<html>
  <body>
    <h1>Hello {name}!</h1>
    <ul>
      {items.map(item => <li>{item}</li>)}
    </ul>
  </body>
</html>

<style>
  /* 默认作用域隔离 */
  h1 { color: blue; }
</style>
```

### 孤岛架构

```astro
---
import ReactCounter from './Counter.jsx';
---

<!-- 默认静态 -->
<h1>静态内容</h1>

<!-- 可见时交互 -->
<ReactCounter client:visible />

<!-- 页面加载时交互 -->
<ReactCounter client:load />

<!-- 空闲时交互 -->
<ReactCounter client:idle />
```

### 内容集合

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
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

## Next Steps

- [Astro 文档](https://docs.astro.build/) - 官方文档
- [Astro 教程](https://docs.astro.build/en/tutorial/0-introduction/) - 学习 Astro
- [Astro 主题](https://astro.build/themes/) - 起始模板
- [Astro 集成](https://astro.build/integrations/) - 插件
