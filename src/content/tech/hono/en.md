---
title: "Hono"
description: "Get started with Hono web framework in 5 minutes"
tags: ["backend", "javascript", "framework", "edge"]
---

## TL;DR

**What**: A small, fast web framework for the Edge, built on Web Standards.

**Why**: Works everywhere (Cloudflare, Deno, Bun, Node), ultrafast, tiny size, TypeScript-first.

## Quick Start

**With Bun**:
```bash
bun create hono my-app
cd my-app
bun run dev
```

**With Node.js**:
```bash
npm create hono@latest my-app
cd my-app
npm install
npm run dev
```

Open http://localhost:3000

## Cheatsheet

| Feature | Code |
|---------|------|
| GET route | `app.get('/path', handler)` |
| POST route | `app.post('/path', handler)` |
| Path param | `app.get('/users/:id', c => c.req.param('id'))` |
| Query param | `c.req.query('name')` |
| JSON response | `c.json({ data: 'value' })` |
| HTML response | `c.html('<h1>Hello</h1>')` |
| Status code | `c.json(data, 201)` |

## Gotchas

### Basic routing

```typescript
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

app.get('/users/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ id })
})

app.post('/users', async (c) => {
  const body = await c.req.json()
  return c.json(body, 201)
})

export default app
```

### Middleware

```typescript
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'

app.use('*', logger())
app.use('/api/*', cors())
app.use('/api/*', jwt({ secret: 'your-secret' }))

// Custom middleware
app.use('*', async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  await next()
})
```

### Route groups

```typescript
const api = new Hono()

api.get('/users', (c) => c.json([]))
api.post('/users', (c) => c.json({}))

app.route('/api', api)
```

### Validation with Zod

```typescript
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
})

app.post('/users', zValidator('json', schema), (c) => {
  const data = c.req.valid('json')
  return c.json(data)
})
```

## Next Steps

- [Hono Documentation](https://hono.dev/) - Official docs
- [Hono Examples](https://github.com/honojs/examples) - Code examples
- [Hono Middleware](https://hono.dev/docs/middleware/builtin/basic-auth) - Built-in middleware
- [Deploy to Cloudflare](https://hono.dev/docs/getting-started/cloudflare-workers) - Edge deployment
