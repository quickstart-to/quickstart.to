---
title: "Hono"
description: "Starten Sie mit dem Hono Web-Framework in 5 Minuten"
template: "framework"
tags: ["backend", "javascript", "framework", "edge"]
---

## TL;DR

**Einzeiler**: Hono ist ein ultraschnelles Web-Framework basierend auf Web Standards - läuft überall von Cloudflare Workers bis Node.js.

**Kernstärken**:
- Ultraschnell - RegExpRouter mit nahezu null Allokationen
- Multi-Runtime - Cloudflare, Deno, Bun, Node, AWS Lambda
- Winzige Größe - hono/tiny Preset unter 12kB, keine Abhängigkeiten
- TypeScript-first - vollständige Typinferenz für Routen

## Core Concepts

### Concept 1: Context Object

Jeder Handler erhält einen Context mit Request/Response-Utilities:

```typescript
app.get('/users/:id', (c) => {
  const id = c.req.param('id')        // Pfad-Parameter
  const name = c.req.query('name')    // Query-String
  const token = c.req.header('Authorization')

  return c.json({ id, name })  // JSON-Antwort
})
```

### Concept 2: Middleware Stack

Middleware läuft vor/nach Handlern:

```typescript
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'

app.use('*', logger())
app.use('/api/*', cors())
app.use('/api/*', jwt({ secret: process.env.JWT_SECRET }))

// Benutzerdefinierte Middleware
app.use('*', async (c, next) => {
  const start = Date.now()
  await next()
  console.log(`${c.req.method} ${c.req.path} - ${Date.now() - start}ms`)
})
```

### Concept 3: Type-Safe Routing

Vollständige TypeScript-Inferenz von Routen bis zum Client:

```typescript
const routes = app
  .get('/users', (c) => c.json([{ id: 1, name: 'John' }]))
  .post('/users', async (c) => {
    const body = await c.req.json()
    return c.json(body, 201)
  })

// Typsicherer Client
import { hc } from 'hono/client'
const client = hc<typeof routes>('http://localhost:3000')
const res = await client.users.$get()  // Vollständig typisiert!
```

## Quick Start

### Create Project

```bash
npm create hono@latest my-app
cd my-app
```

### Create index.ts

```typescript
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json({ message: 'Hello Hono!' }))

export default app
```

### Run

```bash
npm run dev
# Öffnen Sie http://localhost:3000
```

## Gotchas

### Route groups and composition

```typescript
const api = new Hono()
api.get('/users', (c) => c.json([]))
api.post('/users', (c) => c.json({}))

const admin = new Hono()
admin.use('*', authMiddleware)
admin.get('/stats', (c) => c.json({}))

app.route('/api', api)
app.route('/admin', admin)
```

### Validation with Zod

```typescript
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

app.post('/users',
  zValidator('json', schema),
  (c) => {
    const data = c.req.valid('json')  // Typisiert!
    return c.json(data, 201)
  }
)
```

### Different response types

```typescript
// JSON
c.json({ key: 'value' })

// Text
c.text('Hello')

// HTML
c.html('<h1>Hello</h1>')

// Mit Status
c.json({ error: 'Not found' }, 404)

// Weiterleitung
c.redirect('/new-location')
```

### Deploy to different runtimes

```typescript
// Cloudflare Workers
export default app

// Node.js
import { serve } from '@hono/node-server'
serve(app)

// Bun
export default app  // Funktioniert nativ

// Deno
Deno.serve(app.fetch)
```

## When to Use

**Ideal für**:
- Edge/Serverless-APIs
- Cloudflare Workers-Projekte
- Multi-Runtime-Anwendungen
- Teams, die Express-ähnliche DX mit moderner Performance wollen

**Nicht ideal für**:
- Full-Stack-Apps mit SSR (verwenden Sie Next.js/Nuxt)
- Projekte, die schwere ORM-Integration benötigen
- Teams ohne TypeScript-Erfahrung

**Vergleich**:
| Feature | Hono | Express | Fastify |
|---------|------|---------|---------|
| Größe | ~12kB | ~200kB | ~2MB |
| Edge-Support | Nativ | Nein | Begrenzt |
| TypeScript | Erstklassig | Add-on | Gut |
| Performance | Ultraschnell | Mittel | Schnell |

## Next Steps

- [Hono Dokumentation](https://hono.dev/)
- [Hono Beispiele](https://github.com/honojs/examples)
- [Hono Middleware](https://hono.dev/docs/middleware/builtin/basic-auth)
- [HonoX](https://github.com/honojs/honox) - Meta-Framework

## Cheatsheet

| Muster | Code |
|---------|------|
| GET-Route | `app.get('/path', handler)` |
| POST-Route | `app.post('/path', handler)` |
| Pfad-Parameter | `c.req.param('id')` |
| Query-Parameter | `c.req.query('name')` |
| JSON-Body | `await c.req.json()` |
| JSON-Antwort | `c.json({ data })` |
| Routengruppe | `app.route('/api', apiRoutes)` |
| Middleware | `app.use('*', middleware)` |
| Validierung | `zValidator('json', schema)` |
