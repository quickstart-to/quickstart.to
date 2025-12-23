---
title: "Hono"
description: "Get started with Hono web framework in 5 minutes"
template: "framework"
tags: ["backend", "javascript", "framework", "edge"]
---

## TL;DR

**One-liner**: Hono is an ultrafast web framework built on Web Standards - runs everywhere from Cloudflare Workers to Node.js.

**Core Strengths**:
- Ultrafast - RegExpRouter with near-zero allocation
- Multi-runtime - Cloudflare, Deno, Bun, Node, AWS Lambda
- Tiny size - hono/tiny preset under 12kB, zero dependencies
- TypeScript-first - full type inference for routes

## Core Concepts

### Concept 1: Context Object

Every handler receives a Context with request/response utilities:

```typescript
app.get('/users/:id', (c) => {
  const id = c.req.param('id')        // Path param
  const name = c.req.query('name')    // Query string
  const token = c.req.header('Authorization')

  return c.json({ id, name })  // JSON response
})
```

### Concept 2: Middleware Stack

Middleware runs before/after handlers:

```typescript
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'

app.use('*', logger())
app.use('/api/*', cors())
app.use('/api/*', jwt({ secret: process.env.JWT_SECRET }))

// Custom middleware
app.use('*', async (c, next) => {
  const start = Date.now()
  await next()
  console.log(`${c.req.method} ${c.req.path} - ${Date.now() - start}ms`)
})
```

### Concept 3: Type-Safe Routing

Full TypeScript inference from routes to client:

```typescript
const routes = app
  .get('/users', (c) => c.json([{ id: 1, name: 'John' }]))
  .post('/users', async (c) => {
    const body = await c.req.json()
    return c.json(body, 201)
  })

// Type-safe client
import { hc } from 'hono/client'
const client = hc<typeof routes>('http://localhost:3000')
const res = await client.users.$get()  // Fully typed!
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
# Open http://localhost:3000
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
    const data = c.req.valid('json')  // Typed!
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

// With status
c.json({ error: 'Not found' }, 404)

// Redirect
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
export default app  // Works natively

// Deno
Deno.serve(app.fetch)
```

## When to Use

**Best for**:
- Edge/serverless APIs
- Cloudflare Workers projects
- Multi-runtime applications
- Teams wanting Express-like DX with modern performance

**Not ideal for**:
- Full-stack apps with SSR (use Next.js/Nuxt)
- Projects needing heavy ORM integration
- Teams unfamiliar with TypeScript

**Comparison**:
| Feature | Hono | Express | Fastify |
|---------|------|---------|---------|
| Size | ~12kB | ~200kB | ~2MB |
| Edge support | Native | No | Limited |
| TypeScript | First-class | Add-on | Good |
| Performance | Ultrafast | Moderate | Fast |

## Next Steps

- [Hono Documentation](https://hono.dev/)
- [Hono Examples](https://github.com/honojs/examples)
- [Hono Middleware](https://hono.dev/docs/middleware/builtin/basic-auth)
- [HonoX](https://github.com/honojs/honox) - Meta framework

## Cheatsheet

| Pattern | Code |
|---------|------|
| GET route | `app.get('/path', handler)` |
| POST route | `app.post('/path', handler)` |
| Path param | `c.req.param('id')` |
| Query param | `c.req.query('name')` |
| JSON body | `await c.req.json()` |
| JSON response | `c.json({ data })` |
| Route group | `app.route('/api', apiRoutes)` |
| Middleware | `app.use('*', middleware)` |
| Validation | `zValidator('json', schema)` |
