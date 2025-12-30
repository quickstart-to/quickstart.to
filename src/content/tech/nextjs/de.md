---
title: "Next.js"
description: "Starten Sie mit dem Next.js-Framework in 5 Minuten"
template: "framework"
tags: ["frontend", "react", "fullstack"]
---

## TL;DR

**Kurzfassung**: Next.js ist React für die Produktion - das Full-Stack-Framework, das React-Apps standardmäßig schnell macht.

**Kernstärken**:
- Server Components - Daten auf dem Server abrufen, weniger JS ausliefern
- Dateibasiertes Routing - Dateien erstellen, Routing passiert automatisch
- Turbopack - blitzschnelle Builds (2-10x schneller)
- Vercel-nativ - Deployment ohne Konfiguration

## Core Concepts

### Concept 1: Server vs Client Components

Standardmäßig laufen Komponenten auf dem Server. `'use client'` für Interaktivität hinzufügen.

```tsx
// Server Component (default) - can fetch data directly
async function ProductList() {
  const products = await db.query('SELECT * FROM products');
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// Client Component - for interactivity
'use client';
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Concept 2: App Router

Dateisystem-basiertes Routing mit `page.tsx`-Dateien:

```
app/
├── page.tsx           → /
├── about/page.tsx     → /about
├── blog/[slug]/page.tsx → /blog/:slug (dynamic)
├── api/users/route.ts  → /api/users (API endpoint)
└── layout.tsx         → shared layout
```

### Concept 3: Data Fetching

Daten direkt in Server Components abrufen - kein useEffect nötig.

```tsx
// Just async/await in your component
async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data.title}</div>;
}
```

## Quick Start

### Create Project

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### Project Structure

```
my-app/
├── app/
│   ├── page.tsx        # Homepage
│   ├── layout.tsx      # Root layout
│   └── globals.css
├── public/             # Static files
├── next.config.js
└── package.json
```

### Minimal Example

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

### Run

```bash
npm run dev
# Open http://localhost:3000
```

## Gotchas

### 'use client' is contagious downward

```tsx
// If parent is Server Component, children can be either
// If parent is Client Component, children must be Client too

// ✅ Server Component using Client Component
import ClientButton from './ClientButton';
async function ServerPage() {
  const data = await fetchData();
  return <div>{data}<ClientButton /></div>;
}
```

### Dynamic route params are async in Next.js 15+

```tsx
// app/blog/[slug]/page.tsx
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  return <h1>Post: {slug}</h1>;
}
```

### Caching changed in Next.js 15+

```tsx
// fetch() no longer caches by default
const data = await fetch(url);  // No caching

// Opt-in to caching
const data = await fetch(url, { cache: 'force-cache' });

// Or use unstable_cache for non-fetch data
import { unstable_cache } from 'next/cache';
const getCachedData = unstable_cache(async () => db.query(...));
```

### API Routes with Route Handlers

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

**Ideal für**:
- Produktions-React-Anwendungen
- SEO-kritische Websites
- Full-Stack-Anwendungen mit API-Routes
- Teams, die React mit Batterien inklusive wollen

**Weniger geeignet für**:
- Einfache statische Seiten (Astro verwenden)
- Nicht-React-Teams (Nuxt für Vue verwenden)
- Maximale Kontrolle über Bundling (Vite direkt verwenden)

**Vergleich**:
| Feature | Next.js | Remix | Astro |
|---------|---------|-------|-------|
| Framework | React | React | Multi-Framework |
| SSR | Ja | Ja | Optional |
| Fokus | Full-Stack | Web-Standards | Content-Sites |
| Lernkurve | Mittel | Mittel | Einfach |

## Next Steps

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn) - Interaktiver Kurs
- [App Router Guide](https://nextjs.org/docs/app)
- [Vercel](https://vercel.com/) - Deployment-Plattform

## Cheatsheet

| Pattern | Code |
|---------|------|
| Page | `app/route/page.tsx` |
| Layout | `app/layout.tsx` |
| API-Route | `app/api/route/route.ts` |
| Dynamische Route | `app/[slug]/page.tsx` |
| Catch-all | `app/[...slug]/page.tsx` |
| Loading | `app/loading.tsx` |
| Error | `app/error.tsx` |
| Metadata | `export const metadata = { title: '...' }` |
| Redirect | `redirect('/path')` |
| Revalidate | `revalidatePath('/path')` |
