---
title: "JWT"
description: "5 分钟快速入门 JWT"
template: "tool"
tags: ["security", "authentication", "tokens"]
---

## TL;DR

**是什么**：JSON Web Token - 紧凑、URL 安全的方式在两方之间表示声明。

**为什么用**：无状态认证、自包含令牌、广泛支持、跨域工作。

## Quick Start

**JWT 结构**：
```
header.payload.signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**安装 (Node.js)**：
```bash
npm install jsonwebtoken
```

**创建和验证**：
```javascript
const jwt = require('jsonwebtoken');

const SECRET = 'your-secret-key';

// 创建令牌
const token = jwt.sign(
  { userId: 123, role: 'admin' },
  SECRET,
  { expiresIn: '1h' }
);

// 验证令牌
const decoded = jwt.verify(token, SECRET);
console.log(decoded); // { userId: 123, role: 'admin', iat: ..., exp: ... }
```

## Cheatsheet

| 声明 | 描述 |
|------|------|
| `iss` | 签发者 |
| `sub` | 主题（用户 ID） |
| `aud` | 受众 |
| `exp` | 过期时间 |
| `iat` | 签发时间 |
| `nbf` | 生效时间 |
| `jti` | JWT ID（唯一标识） |

## Gotchas

### 完整认证流程

```javascript
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
const SECRET = process.env.JWT_SECRET;

// 登录端点
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 验证凭证
  const user = await validateCredentials(email, password);
  if (!user) {
    return res.status(401).json({ error: '无效的凭证' });
  }

  // 生成令牌
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, type: 'refresh' },
    SECRET,
    { expiresIn: '7d' }
  );

  // 在 httpOnly cookie 中设置刷新令牌
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken });
});

// 认证中间件
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未提供令牌' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: '令牌已过期' });
    }
    return res.status(401).json({ error: '无效的令牌' });
  }
}

// 受保护的路由
app.get('/profile', authenticate, (req, res) => {
  res.json({ userId: req.user.userId });
});
```

### 刷新令牌轮换

```javascript
app.post('/refresh', (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: '没有刷新令牌' });
  }

  try {
    const decoded = jwt.verify(refreshToken, SECRET);

    // 可选：检查令牌是否已被撤销
    if (isTokenRevoked(decoded.jti)) {
      return res.status(401).json({ error: '令牌已撤销' });
    }

    // 生成新的访问令牌
    const accessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      SECRET,
      { expiresIn: '15m' }
    );

    // 轮换刷新令牌（可选但推荐）
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId, type: 'refresh', jti: generateId() },
      SECRET,
      { expiresIn: '7d' }
    );

    // 撤销旧的刷新令牌
    revokeToken(decoded.jti);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: '无效的刷新令牌' });
  }
});
```

### 基于角色的授权

```javascript
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: '未认证' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: '权限不足' });
    }

    next();
  };
}

// 使用
app.delete('/users/:id',
  authenticate,
  authorize('admin'),
  (req, res) => {
    // 只有管理员可以删除用户
  }
);
```

### 使用 RS256（非对称）

```javascript
const fs = require('fs');

const privateKey = fs.readFileSync('private.pem');
const publicKey = fs.readFileSync('public.pem');

// 用私钥签名
const token = jwt.sign(
  { userId: 123 },
  privateKey,
  { algorithm: 'RS256', expiresIn: '1h' }
);

// 用公钥验证
const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
```

### 前端令牌处理

```javascript
// 在内存中存储访问令牌（不要用 localStorage）
let accessToken = null;

async function login(email, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include',  // 用于 cookie
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  accessToken = data.accessToken;
}

async function fetchWithAuth(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`
    }
  });

  // 401 时自动刷新
  if (response.status === 401) {
    await refreshTokens();
    return fetchWithAuth(url, options);
  }

  return response;
}

async function refreshTokens() {
  const response = await fetch('/api/refresh', {
    method: 'POST',
    credentials: 'include'
  });

  const data = await response.json();
  accessToken = data.accessToken;
}
```

### 无验证解码

```javascript
// 解码载荷但不验证（用于客户端读取声明）
const decoded = jwt.decode(token);
console.log(decoded);

// 检查过期
const isExpired = decoded.exp * 1000 < Date.now();
```

## Next Steps

- [JWT.io](https://jwt.io/) - 调试器和库
- [JWT 介绍](https://jwt.io/introduction) - 官方介绍
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - JWT 规范
- [JOSE 标准](https://jose.readthedocs.io/) - JWS、JWE、JWK 规范
