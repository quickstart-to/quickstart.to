---
title: "Express.js"
description: "5 分钟快速入门 Express.js Web 框架"
tags: ["backend", "nodejs", "framework"]
---

## TL;DR

**是什么**：最小且灵活的 Node.js Web 应用框架。

**为什么用**：简单、无主见、庞大的生态系统、中间件架构、行业标准。

## Quick Start

**创建项目**：
```bash
mkdir my-app && cd my-app
npm init -y
npm install express
```

**创建服务器**（`index.js`）：
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
```

**运行**：
```bash
node index.js
```

## Cheatsheet

| 方法 | 描述 |
|--------|-------------|
| `app.get(path, handler)` | 处理 GET 请求 |
| `app.post(path, handler)` | 处理 POST 请求 |
| `app.put(path, handler)` | 处理 PUT 请求 |
| `app.delete(path, handler)` | 处理 DELETE 请求 |
| `app.use(middleware)` | 使用中间件 |
| `app.listen(port)` | 启动服务器 |
| `res.send(data)` | 发送响应 |
| `res.json(obj)` | 发送 JSON 响应 |

## Gotchas

### 中间件

```javascript
// 内置中间件
app.use(express.json());        // 解析 JSON 请求体
app.use(express.static('public')); // 提供静态文件

// 自定义中间件
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();  // 别忘了 next()！
});
```

### 路由参数

```javascript
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId });
});

// 查询字符串：/search?q=term
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.json({ query });
});
```

### 错误处理

```javascript
// 错误处理器必须有 4 个参数
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('出错了！');
});
```

### 路由器实现模块化路由

```javascript
// routes/users.js
const router = express.Router();
router.get('/', (req, res) => res.json([]));
router.get('/:id', (req, res) => res.json({}));
module.exports = router;

// index.js
app.use('/users', require('./routes/users'));
```

## Next Steps

- [Express 文档](https://expressjs.com/) - 官方文档
- [Express 生成器](https://expressjs.com/en/starter/generator.html) - 应用生成器
- [Express 中间件](https://expressjs.com/en/resources/middleware.html) - 中间件列表
- [最佳实践](https://expressjs.com/en/advanced/best-practice-security.html) - 安全
