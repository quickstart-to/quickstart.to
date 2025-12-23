---
title: "Express.js"
description: "5 分钟快速入门 Express.js Web 框架"
template: "framework"
tags: ["backend", "nodejs", "framework"]
---

## TL;DR

**一句话**：Express 是 Node.js 的极简 Web 框架——只用你需要的部分构建服务器。

**核心优势**：
- 极简无主见 - 架构由你决定
- 中间件生态 - 上千个插件
- 行业标准 - 最流行的 Node.js 框架
- Express 5 - 原生 Promise 支持，更好的安全性

## Core Concepts

### 概念 1：中间件

Express 中一切都是中间件——能访问请求、响应和 next 的函数。

```javascript
// 中间件按顺序执行
app.use(express.json());      // 1. 解析 JSON
app.use(logRequest);          // 2. 日志
app.get('/api', handler);     // 3. 路由处理

function logRequest(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next();  // 传给下一个中间件
}
```

### 概念 2：路由

用 HTTP 方法定义端点：

```javascript
app.get('/users', getUsers);      // GET /users
app.post('/users', createUser);   // POST /users
app.put('/users/:id', updateUser); // PUT /users/123
app.delete('/users/:id', deleteUser);
```

### 概念 3：请求 & 响应

```javascript
app.get('/users/:id', (req, res) => {
  const id = req.params.id;       // URL 参数
  const sort = req.query.sort;    // 查询字符串 ?sort=name
  const token = req.headers.authorization;

  res.status(200).json({ id, sort });
});
```

## Quick Start

### 创建项目

```bash
mkdir my-app && cd my-app
npm init -y
npm install express
```

### 创建 index.js

```javascript
import express from 'express';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello Express!' });
});

app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
```

### 运行

```bash
node index.js
# 打开 http://localhost:3000
```

## Gotchas

### 中间件别忘了 next()

```javascript
// ❌ 请求会永远挂起
app.use((req, res, next) => {
  console.log('Logging...');
  // 忘了 next()！
});

// ✅ 正确
app.use((req, res, next) => {
  console.log('Logging...');
  next();
});
```

### 错误处理需要 4 个参数

```javascript
// 必须有全部 4 个参数 Express 才能识别
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '出错了！' });
});

// 用 next(err) 触发错误
app.get('/fail', (req, res, next) => {
  next(new Error('哎呀！'));
});
```

### 路由顺序很重要

```javascript
// ❌ 错误 - /users/me 永远匹配不到
app.get('/users/:id', (req, res) => ...);
app.get('/users/me', (req, res) => ...);  // 永远到不了！

// ✅ 正确 - 具体路由放前面
app.get('/users/me', (req, res) => ...);
app.get('/users/:id', (req, res) => ...);
```

### Express 5+ 中的异步错误

```javascript
// Express 5：异步错误自动捕获
app.get('/data', async (req, res) => {
  const data = await fetchData();  // 错误会被捕获！
  res.json(data);
});

// Express 4：需要 try-catch 或包装器
app.get('/data', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
```

## When to Use

**适合**：
- REST API
- 轻量级服务器
- 想要完全控制的团队
- 有特定架构需求的项目

**不适合**：
- 需要结构的大型应用（用 NestJS）
- 实时应用（用 Fastify 或 Hono）
- TypeScript 优先的项目（用 NestJS）

**对比**：
| 特性 | Express | Fastify | NestJS |
|------|---------|---------|--------|
| 速度 | 中等 | 快 | 中等 |
| 有主见 | 否 | 否 | 是 |
| TypeScript | 附加 | 内置 | 内置 |
| 学习曲线 | 简单 | 简单 | 中等 |

## Next Steps

- [Express 文档](https://expressjs.com/)
- [Express 生成器](https://expressjs.com/en/starter/generator.html)
- [Express 中间件](https://expressjs.com/en/resources/middleware.html)
- [Express 5 迁移](https://expressjs.com/en/guide/migrating-5.html)

## Cheatsheet

| 模式 | 代码 |
|------|------|
| GET 路由 | `app.get('/path', handler)` |
| POST 路由 | `app.post('/path', handler)` |
| 中间件 | `app.use(middleware)` |
| URL 参数 | `req.params.id` |
| 查询参数 | `req.query.name` |
| 请求体 | `req.body`（需要 express.json()）|
| JSON 响应 | `res.json({ data })` |
| 状态码 | `res.status(404).json({})` |
| 路由器 | `const router = express.Router()` |
| 静态文件 | `app.use(express.static('public'))` |
