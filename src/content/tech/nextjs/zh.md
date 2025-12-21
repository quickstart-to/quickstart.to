---
title: "Next.js"
description: "5 分钟快速入门 Next.js 框架"
tags: ["frontend", "react", "fullstack"]
---

## TL;DR

**是什么**：用于生产环境的 React 框架，支持静态和服务端混合渲染。

**为什么用**：基于文件的路由、SSR/SSG、API 路由、优秀的开发体验、Vercel 部署。

## Quick Start

**创建新项目**：
```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

打开 http://localhost:3000

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `npx create-next-app@latest` | 创建新项目 |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint |

**基于文件的路由**（App Router）：
```
app/
├── page.tsx          → /
├── about/page.tsx    → /about
├── blog/[slug]/page.tsx → /blog/:slug
└── api/hello/route.ts   → /api/hello
```

## Gotchas

### 服务端组件 vs 客户端组件

```tsx
// 服务端组件（默认）
async function ServerComponent() {
  const data = await fetch('...');
  return <div>{data}</div>;
}

// 客户端组件
'use client';
import { useState } from 'react';
export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c+1)}>{count}</button>;
}
```

### 动态路由

```tsx
// app/blog/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <h1>{params.slug}</h1>;
}
```

### API 路由

```typescript
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ received: body });
}
```

## Next Steps

- [Next.js 文档](https://nextjs.org/docs) - 官方文档
- [Next.js 学习](https://nextjs.org/learn) - 交互式课程
- [App Router](https://nextjs.org/docs/app) - 新路由系统
- [Vercel](https://vercel.com/) - 部署平台
