---
title: "Hono"
description: "Framework web ultrarapido sobre Web Standards - funciona en Cloudflare Workers, Deno, Bun, Node.js y AWS Lambda"
template: "framework"
tags: ["backend", "javascript", "framework", "edge"]
---

## TL;DR

**En resumen**: Hono es un framework web ultrarrápido construido sobre Web Standards - funciona en todas partes, desde Cloudflare Workers hasta Node.js.

**Fortalezas principales**:
- Ultrarrápido - RegExpRouter con casi cero asignaciones
- Multi-runtime - Cloudflare, Deno, Bun, Node, AWS Lambda
- Tamaño diminuto - preset hono/tiny bajo 12kB, cero dependencias
- TypeScript-first - inferencia de tipos completa para rutas

## Core Concepts

### Concept 1: Context Object

Cada handler recibe un Context con utilidades de request/response:

```typescript
app.get('/users/:id', (c) => {
  const id = c.req.param('id')        // Parámetro de ruta
  const name = c.req.query('name')    // Query string
  const token = c.req.header('Authorization')

  return c.json({ id, name })  // Respuesta JSON
})
```

### Concept 2: Middleware Stack

El middleware se ejecuta antes/después de los handlers:

```typescript
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'

app.use('*', logger())
app.use('/api/*', cors())
app.use('/api/*', jwt({ secret: process.env.JWT_SECRET }))

// Middleware personalizado
app.use('*', async (c, next) => {
  const start = Date.now()
  await next()
  console.log(`${c.req.method} ${c.req.path} - ${Date.now() - start}ms`)
})
```

### Concept 3: Type-Safe Routing

Inferencia TypeScript completa desde rutas hasta el cliente:

```typescript
const routes = app
  .get('/users', (c) => c.json([{ id: 1, name: 'John' }]))
  .post('/users', async (c) => {
    const body = await c.req.json()
    return c.json(body, 201)
  })

// Cliente con tipos seguros
import { hc } from 'hono/client'
const client = hc<typeof routes>('http://localhost:3000')
const res = await client.users.$get()  // ¡Completamente tipado!
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
# Abre http://localhost:3000
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
    const data = c.req.valid('json')  // ¡Tipado!
    return c.json(data, 201)
  }
)
```

### Different response types

```typescript
// JSON
c.json({ key: 'value' })

// Texto
c.text('Hello')

// HTML
c.html('<h1>Hello</h1>')

// Con estado
c.json({ error: 'Not found' }, 404)

// Redirección
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
export default app  // Funciona nativamente

// Deno
Deno.serve(app.fetch)
```

## When to Use

**Ideal para**:
- APIs Edge/serverless
- Proyectos de Cloudflare Workers
- Aplicaciones multi-runtime
- Equipos que quieren DX tipo Express con rendimiento moderno

**No ideal para**:
- Apps full-stack con SSR (usa Next.js/Nuxt)
- Proyectos que necesitan integración pesada de ORM
- Equipos sin experiencia en TypeScript

**Comparación**:
| Feature | Hono | Express | Fastify |
|---------|------|---------|---------|
| Tamaño | ~12kB | ~200kB | ~2MB |
| Soporte Edge | Nativo | No | Limitado |
| TypeScript | Primera clase | Add-on | Bueno |
| Rendimiento | Ultrarrápido | Moderado | Rápido |

## Next Steps

- [Documentación de Hono](https://hono.dev/)
- [Ejemplos de Hono](https://github.com/honojs/examples)
- [Middleware de Hono](https://hono.dev/docs/middleware/builtin/basic-auth)
- [HonoX](https://github.com/honojs/honox) - Meta framework

## Cheatsheet

| Patrón | Código |
|---------|------|
| Ruta GET | `app.get('/path', handler)` |
| Ruta POST | `app.post('/path', handler)` |
| Parámetro de ruta | `c.req.param('id')` |
| Parámetro query | `c.req.query('name')` |
| Cuerpo JSON | `await c.req.json()` |
| Respuesta JSON | `c.json({ data })` |
| Grupo de rutas | `app.route('/api', apiRoutes)` |
| Middleware | `app.use('*', middleware)` |
| Validación | `zValidator('json', schema)` |
