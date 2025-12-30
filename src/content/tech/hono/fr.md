---
title: "Hono"
description: "Framework web ultrarapide sur Web Standards - fonctionne sur Cloudflare Workers, Deno, Bun, Node.js et AWS Lambda"
template: "framework"
tags: ["backend", "javascript", "framework", "edge"]
---

## TL;DR

**En bref** : Hono est un framework web ultrarapide basé sur les Web Standards - fonctionne partout, de Cloudflare Workers à Node.js.

**Points forts** :
- Ultrarapide - RegExpRouter avec allocation quasi nulle
- Multi-runtime - Cloudflare, Deno, Bun, Node, AWS Lambda
- Taille minuscule - preset hono/tiny sous 12kB, zéro dépendance
- TypeScript-first - inférence de type complète pour les routes

## Core Concepts

### Concept 1: Context Object

Chaque handler reçoit un Context avec des utilitaires request/response :

```typescript
app.get('/users/:id', (c) => {
  const id = c.req.param('id')        // Paramètre de chemin
  const name = c.req.query('name')    // Query string
  const token = c.req.header('Authorization')

  return c.json({ id, name })  // Réponse JSON
})
```

### Concept 2: Middleware Stack

Le middleware s'exécute avant/après les handlers :

```typescript
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'

app.use('*', logger())
app.use('/api/*', cors())
app.use('/api/*', jwt({ secret: process.env.JWT_SECRET }))

// Middleware personnalisé
app.use('*', async (c, next) => {
  const start = Date.now()
  await next()
  console.log(`${c.req.method} ${c.req.path} - ${Date.now() - start}ms`)
})
```

### Concept 3: Type-Safe Routing

Inférence TypeScript complète des routes jusqu'au client :

```typescript
const routes = app
  .get('/users', (c) => c.json([{ id: 1, name: 'John' }]))
  .post('/users', async (c) => {
    const body = await c.req.json()
    return c.json(body, 201)
  })

// Client typé
import { hc } from 'hono/client'
const client = hc<typeof routes>('http://localhost:3000')
const res = await client.users.$get()  // Entièrement typé !
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
# Ouvrez http://localhost:3000
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
    const data = c.req.valid('json')  // Typé !
    return c.json(data, 201)
  }
)
```

### Different response types

```typescript
// JSON
c.json({ key: 'value' })

// Texte
c.text('Hello')

// HTML
c.html('<h1>Hello</h1>')

// Avec statut
c.json({ error: 'Not found' }, 404)

// Redirection
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
export default app  // Fonctionne nativement

// Deno
Deno.serve(app.fetch)
```

## When to Use

**Idéal pour** :
- APIs Edge/serverless
- Projets Cloudflare Workers
- Applications multi-runtime
- Équipes voulant une DX type Express avec des performances modernes

**Moins adapté pour** :
- Apps full-stack avec SSR (utilisez Next.js/Nuxt)
- Projets nécessitant une intégration ORM lourde
- Équipes non familières avec TypeScript

**Comparaison** :
| Feature | Hono | Express | Fastify |
|---------|------|---------|---------|
| Taille | ~12kB | ~200kB | ~2MB |
| Support Edge | Natif | Non | Limité |
| TypeScript | Première classe | Add-on | Bon |
| Performance | Ultrarapide | Modéré | Rapide |

## Next Steps

- [Documentation Hono](https://hono.dev/)
- [Exemples Hono](https://github.com/honojs/examples)
- [Middleware Hono](https://hono.dev/docs/middleware/builtin/basic-auth)
- [HonoX](https://github.com/honojs/honox) - Meta framework

## Cheatsheet

| Pattern | Code |
|---------|------|
| Route GET | `app.get('/path', handler)` |
| Route POST | `app.post('/path', handler)` |
| Paramètre de chemin | `c.req.param('id')` |
| Paramètre query | `c.req.query('name')` |
| Corps JSON | `await c.req.json()` |
| Réponse JSON | `c.json({ data })` |
| Groupe de routes | `app.route('/api', apiRoutes)` |
| Middleware | `app.use('*', middleware)` |
| Validation | `zValidator('json', schema)` |
