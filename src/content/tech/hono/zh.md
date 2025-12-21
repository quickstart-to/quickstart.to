---
title: "Hono"
description: "5 分钟快速入门 Hono Web 框架"
tags: ["backend", "javascript", "framework", "edge"]
---

## TL;DR

**是什么**：基于 Web 标准构建的小型、快速 Edge Web 框架。

**为什么用**：到处运行（Cloudflare、Deno、Bun、Node）、超快、体积极小、TypeScript 优先。

## Quick Start

**使用 Bun**：
```bash
bun create hono my-app
cd my-app
bun run dev
```

**使用 Node.js**：
```bash
npm create hono@latest my-app
cd my-app
npm install
npm run dev
```

打开 http://localhost:3000

## Cheatsheet

| 功能 | 代码 |
|---------|------|
| GET 路由 | `app.get('/path', handler)` |
| POST 路由 | `app.post('/path', handler)` |
| 路径参数 | `app.get('/users/:id', c => c.req.param('id'))` |
| 查询参数 | `c.req.query('name')` |
| JSON 响应 | `c.json({ data: 'value' })` |
| HTML 响应 | `c.html('<h1>Hello</h1>')` |
| 状态码 | `c.json(data, 201)` |

## Gotchas

### 基础路由

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

### 中间件

```typescript
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'

app.use('*', logger())
app.use('/api/*', cors())
app.use('/api/*', jwt({ secret: 'your-secret' }))

// 自定义中间件
app.use('*', async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`)
  await next()
})
```

### 路由组

```typescript
const api = new Hono()

api.get('/users', (c) => c.json([]))
api.post('/users', (c) => c.json({}))

app.route('/api', api)
```

### Zod 验证

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

- [Hono 文档](https://hono.dev/) - 官方文档
- [Hono 示例](https://github.com/honojs/examples) - 代码示例
- [Hono 中间件](https://hono.dev/docs/middleware/builtin/basic-auth) - 内置中间件
- [部署到 Cloudflare](https://hono.dev/docs/getting-started/cloudflare-workers) - Edge 部署
