---
title: "Next.js"
description: "Comienza con el framework Next.js en 5 minutos"
template: "framework"
tags: ["frontend", "react", "fullstack"]
---

## TL;DR

**En resumen**: Next.js es React para producción - el framework full-stack que hace las apps React rápidas por defecto.

**Fortalezas principales**:
- Server Components - obtener datos en el servidor, enviar menos JS
- Routing basado en archivos - solo crea archivos, el routing ocurre automáticamente
- Turbopack - builds ultrarrápidos (2-10x más rápido)
- Nativo de Vercel - deploy sin configuración

## Core Concepts

### Concept 1: Server vs Client Components

Por defecto, los componentes se ejecutan en el servidor. Agrega `'use client'` para interactividad.

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

Routing basado en sistema de archivos con archivos `page.tsx`:

```
app/
├── page.tsx           → /
├── about/page.tsx     → /about
├── blog/[slug]/page.tsx → /blog/:slug (dynamic)
├── api/users/route.ts  → /api/users (API endpoint)
└── layout.tsx         → shared layout
```

### Concept 3: Data Fetching

Obtén datos directamente en Server Components - no necesitas useEffect.

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

**Ideal para**:
- Aplicaciones React en producción
- Sitios web críticos para SEO
- Aplicaciones full-stack con rutas API
- Equipos que quieren React con baterías incluidas

**No ideal para**:
- Sitios estáticos simples (usa Astro)
- Equipos no-React (usa Nuxt para Vue)
- Control máximo sobre bundling (usa Vite directamente)

**Comparación**:
| Feature | Next.js | Remix | Astro |
|---------|---------|-------|-------|
| Framework | React | React | Multi-framework |
| SSR | Sí | Sí | Opcional |
| Enfoque | Full-stack | Estándares web | Sitios de contenido |
| Curva de aprendizaje | Media | Media | Fácil |

## Next Steps

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn) - Curso interactivo
- [App Router Guide](https://nextjs.org/docs/app)
- [Vercel](https://vercel.com/) - Plataforma de deployment

## Cheatsheet

| Patrón | Código |
|---------|------|
| Page | `app/route/page.tsx` |
| Layout | `app/layout.tsx` |
| Ruta API | `app/api/route/route.ts` |
| Ruta dinámica | `app/[slug]/page.tsx` |
| Catch-all | `app/[...slug]/page.tsx` |
| Loading | `app/loading.tsx` |
| Error | `app/error.tsx` |
| Metadata | `export const metadata = { title: '...' }` |
| Redirect | `redirect('/path')` |
| Revalidate | `revalidatePath('/path')` |
