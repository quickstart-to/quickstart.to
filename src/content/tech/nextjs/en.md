---
title: "Next.js"
description: "Get started with Next.js framework in 5 minutes"
tags: ["frontend", "react", "fullstack"]
---

## TL;DR

**What**: A React framework for production with hybrid static & server rendering.

**Why**: File-based routing, SSR/SSG, API routes, great DX, Vercel deployment.

## Quick Start

**Create new project**:
```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

Open http://localhost:3000

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npx create-next-app@latest` | Create new project |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

**File-based routing** (App Router):
```
app/
├── page.tsx          → /
├── about/page.tsx    → /about
├── blog/[slug]/page.tsx → /blog/:slug
└── api/hello/route.ts   → /api/hello
```

## Gotchas

### Server vs Client Components

```tsx
// Server Component (default)
async function ServerComponent() {
  const data = await fetch('...');
  return <div>{data}</div>;
}

// Client Component
'use client';
import { useState } from 'react';
export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c+1)}>{count}</button>;
}
```

### Dynamic routes

```tsx
// app/blog/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <h1>{params.slug}</h1>;
}
```

### API Routes

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

- [Next.js Documentation](https://nextjs.org/docs) - Official docs
- [Next.js Learn](https://nextjs.org/learn) - Interactive course
- [App Router](https://nextjs.org/docs/app) - New routing system
- [Vercel](https://vercel.com/) - Deployment platform
