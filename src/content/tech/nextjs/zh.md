---
title: "Next.js"
description: "React 生产级全栈框架 - Server Components，基于文件的路由，默认高性能"
template: "framework"
tags: ["frontend", "react", "fullstack"]
---

## TL;DR

**一句话**：Next.js 是生产级 React——让 React 应用默认就很快的全栈框架。

**核心优势**：
- Server Components - 服务端获取数据，减少 JS 体积
- 文件路由 - 创建文件就有路由，自动配置
- Turbopack - 极快的构建（快 2-10 倍）
- Vercel 原生 - 零配置部署

## Core Concepts

### 概念 1：服务端 vs 客户端组件

默认组件在服务端运行。需要交互时加 `'use client'`。

```tsx
// 服务端组件（默认）- 可以直接获取数据
async function ProductList() {
  const products = await db.query('SELECT * FROM products');
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// 客户端组件 - 用于交互
'use client';
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 概念 2：App Router

基于文件系统的路由，使用 `page.tsx` 文件：

```
app/
├── page.tsx           → /
├── about/page.tsx     → /about
├── blog/[slug]/page.tsx → /blog/:slug（动态）
├── api/users/route.ts  → /api/users（API 端点）
└── layout.tsx         → 共享布局
```

### 概念 3：数据获取

直接在服务端组件中获取数据——不需要 useEffect。

```tsx
// 在组件里直接 async/await
async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data.title}</div>;
}
```

## Quick Start

### 创建项目

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### 项目结构

```
my-app/
├── app/
│   ├── page.tsx        # 首页
│   ├── layout.tsx      # 根布局
│   └── globals.css
├── public/             # 静态文件
├── next.config.js
└── package.json
```

### 最小示例

```tsx
// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Hello Next.js!</h1>
    </main>
  );
}
```

### 运行

```bash
npm run dev
# 打开 http://localhost:3000
```

## Gotchas

### 'use client' 向下传染

```tsx
// 如果父组件是服务端组件，子组件可以是任意类型
// 如果父组件是客户端组件，子组件也必须是客户端的

// ✅ 服务端组件使用客户端组件
import ClientButton from './ClientButton';
async function ServerPage() {
  const data = await fetchData();
  return <div>{data}<ClientButton /></div>;
}
```

### 动态路由参数在 Next.js 15+ 中是异步的

```tsx
// app/blog/[slug]/page.tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  return <h1>文章: {slug}</h1>;
}
```

### Next.js 15+ 中缓存行为改变

```tsx
// fetch() 默认不再缓存
const data = await fetch(url);  // 不缓存

// 手动开启缓存
const data = await fetch(url, { cache: 'force-cache' });

// 或使用 unstable_cache 缓存非 fetch 数据
import { unstable_cache } from 'next/cache';
const getCachedData = unstable_cache(async () => db.query(...));
```

### API 路由和 Route Handlers

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ users: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ created: body });
}
```

## When to Use

**适合**：
- 生产级 React 应用
- SEO 关键的网站
- 带 API 路由的全栈应用
- 想要开箱即用 React 的团队

**不适合**：
- 简单静态站点（用 Astro）
- 非 React 团队（Vue 用 Nuxt）
- 需要完全控制打包的项目（直接用 Vite）

**对比**：
| 特性 | Next.js | Remix | Astro |
|------|---------|-------|-------|
| 框架 | React | React | 多框架 |
| SSR | 是 | 是 | 可选 |
| 侧重 | 全栈 | Web 标准 | 内容站点 |
| 学习曲线 | 中等 | 中等 | 简单 |

## Next Steps

- [Next.js 文档](https://nextjs.org/docs)
- [Next.js 学习](https://nextjs.org/learn) - 交互式课程
- [App Router 指南](https://nextjs.org/docs/app)
- [Vercel](https://vercel.com/) - 部署平台

## Cheatsheet

| 模式 | 代码 |
|------|------|
| 页面 | `app/route/page.tsx` |
| 布局 | `app/layout.tsx` |
| API 路由 | `app/api/route/route.ts` |
| 动态路由 | `app/[slug]/page.tsx` |
| 通配路由 | `app/[...slug]/page.tsx` |
| 加载状态 | `app/loading.tsx` |
| 错误处理 | `app/error.tsx` |
| 元数据 | `export const metadata = { title: '...' }` |
| 重定向 | `redirect('/path')` |
| 重验证 | `revalidatePath('/path')` |
