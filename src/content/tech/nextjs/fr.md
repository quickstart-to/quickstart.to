---
title: "Next.js"
description: "Framework React full-stack pour la production - Server Components, routage base sur fichiers, rapide par defaut"
template: "framework"
tags: ["frontend", "react", "fullstack"]
---

## TL;DR

**En bref** : Next.js est React pour la production - le framework full-stack qui rend les apps React rapides par défaut.

**Points forts** :
- Server Components - récupérer les données côté serveur, envoyer moins de JS
- Routing basé sur fichiers - créez des fichiers, le routing se fait automatiquement
- Turbopack - builds ultra-rapides (2-10x plus rapide)
- Natif Vercel - déploiement sans configuration

## Core Concepts

### Concept 1: Server vs Client Components

Par défaut, les composants s'exécutent sur le serveur. Ajoutez `'use client'` pour l'interactivité.

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

Routing basé sur le système de fichiers avec les fichiers `page.tsx` :

```
app/
├── page.tsx           → /
├── about/page.tsx     → /about
├── blog/[slug]/page.tsx → /blog/:slug (dynamic)
├── api/users/route.ts  → /api/users (API endpoint)
└── layout.tsx         → shared layout
```

### Concept 3: Data Fetching

Récupérez les données directement dans les Server Components - pas besoin de useEffect.

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

**Idéal pour** :
- Applications React en production
- Sites critiques pour le SEO
- Applications full-stack avec routes API
- Équipes voulant React avec batteries incluses

**Moins adapté pour** :
- Sites statiques simples (utilisez Astro)
- Équipes non-React (utilisez Nuxt pour Vue)
- Contrôle maximum sur le bundling (utilisez Vite directement)

**Comparaison** :
| Feature | Next.js | Remix | Astro |
|---------|---------|-------|-------|
| Framework | React | React | Multi-framework |
| SSR | Oui | Oui | Optionnel |
| Focus | Full-stack | Standards web | Sites de contenu |
| Courbe d'apprentissage | Moyenne | Moyenne | Facile |

## Next Steps

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn) - Cours interactif
- [App Router Guide](https://nextjs.org/docs/app)
- [Vercel](https://vercel.com/) - Plateforme de déploiement

## Cheatsheet

| Pattern | Code |
|---------|------|
| Page | `app/route/page.tsx` |
| Layout | `app/layout.tsx` |
| Route API | `app/api/route/route.ts` |
| Route dynamique | `app/[slug]/page.tsx` |
| Catch-all | `app/[...slug]/page.tsx` |
| Loading | `app/loading.tsx` |
| Error | `app/error.tsx` |
| Metadata | `export const metadata = { title: '...' }` |
| Redirect | `redirect('/path')` |
| Revalidate | `revalidatePath('/path')` |
