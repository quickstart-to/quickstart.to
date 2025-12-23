---
title: "Hono"
description: "5 分钟快速入门 Hono Web 框架"
template: "framework"
tags: ["backend", "javascript", "framework", "edge"]
---

## TL;DR

**一句话**：Hono 是基于 Web 标准的超快框架——从 Cloudflare Workers 到 Node.js 到处运行。

**核心优势**：
- 超快 - RegExpRouter 几乎零内存分配
- 多运行时 - Cloudflare、Deno、Bun、Node、AWS Lambda
- 极小体积 - hono/tiny 仅 12kB，零依赖
- TypeScript 优先 - 路由完整类型推断

## Core Concepts

### 概念 1：Context 对象

每个处理函数接收 Context，包含请求/响应工具：

```typescript
app.get('/users/:id', (c) => {
  const id = c.req.param('id')        // 路径参数
  const name = c.req.query('name')    // 查询字符串
  const token = c.req.header('Authorization')

  return c.json({ id, name })  // JSON 响应
})
```

### 概念 2：中间件栈

中间件在处理函数前/后运行：

```typescript
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'

app.use('*', logger())
app.use('/api/*', cors())
app.use('/api/*', jwt({ secret: process.env.JWT_SECRET }))

// 自定义中间件
app.use('*', async (c, next) => {
  const start = Date.now()
  await next()
  console.log(`${c.req.method} ${c.req.path} - ${Date.now() - start}ms`)
})
```

### 概念 3：类型安全路由

从路由到客户端的完整 TypeScript 推断：

```typescript
const routes = app
  .get('/users', (c) => c.json([{ id: 1, name: 'John' }]))
  .post('/users', async (c) => {
    const body = await c.req.json()
    return c.json(body, 201)
  })

// 类型安全客户端
import { hc } from 'hono/client'
const client = hc<typeof routes>('http://localhost:3000')
const res = await client.users.$get()  // 完全类型化！
```

## Quick Start

### 创建项目

```bash
npm create hono@latest my-app
cd my-app
```

### 创建 index.ts

```typescript
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json({ message: 'Hello Hono!' }))

export default app
```

### 运行

```bash
npm run dev
# 打开 http://localhost:3000
```

## Gotchas

### 路由组和组合

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

### Zod 验证

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
    const data = c.req.valid('json')  // 有类型！
    return c.json(data, 201)
  }
)
```

### 不同响应类型

```typescript
// JSON
c.json({ key: 'value' })

// 文本
c.text('Hello')

// HTML
c.html('<h1>Hello</h1>')

// 带状态码
c.json({ error: 'Not found' }, 404)

// 重定向
c.redirect('/new-location')
```

### 部署到不同运行时

```typescript
// Cloudflare Workers
export default app

// Node.js
import { serve } from '@hono/node-server'
serve(app)

// Bun
export default app  // 原生支持

// Deno
Deno.serve(app.fetch)
```

## When to Use

**适合**：
- Edge/Serverless API
- Cloudflare Workers 项目
- 多运行时应用
- 想要 Express 式 DX 加现代性能的团队

**不适合**：
- 带 SSR 的全栈应用（用 Next.js/Nuxt）
- 需要重度 ORM 集成的项目
- 不熟悉 TypeScript 的团队

**对比**：
| 特性 | Hono | Express | Fastify |
|------|------|---------|---------|
| 体积 | ~12kB | ~200kB | ~2MB |
| Edge 支持 | 原生 | 无 | 有限 |
| TypeScript | 一流 | 附加 | 良好 |
| 性能 | 超快 | 中等 | 快 |

## Next Steps

- [Hono 文档](https://hono.dev/)
- [Hono 示例](https://github.com/honojs/examples)
- [Hono 中间件](https://hono.dev/docs/middleware/builtin/basic-auth)
- [HonoX](https://github.com/honojs/honox) - 元框架

## Cheatsheet

| 模式 | 代码 |
|------|------|
| GET 路由 | `app.get('/path', handler)` |
| POST 路由 | `app.post('/path', handler)` |
| 路径参数 | `c.req.param('id')` |
| 查询参数 | `c.req.query('name')` |
| JSON 请求体 | `await c.req.json()` |
| JSON 响应 | `c.json({ data })` |
| 路由组 | `app.route('/api', apiRoutes)` |
| 中间件 | `app.use('*', middleware)` |
| 验证 | `zValidator('json', schema)` |
