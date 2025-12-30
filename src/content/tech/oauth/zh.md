---
title: "OAuth 2.0"
description: "委托授权框架 - 无需共享密码的安全第三方认证"
template: "tool"
tags: ["security", "authentication", "authorization"]
---

## TL;DR

**是什么**：授权框架，允许第三方应用在不共享密码的情况下访问资源。

**为什么用**：安全的委托访问、行业标准、支持多种授权类型适应不同场景。

## Quick Start

**OAuth 2.0 流程概览**：
```
1. 用户点击"使用 Google 登录"
2. 应用重定向到 Google 授权 URL
3. 用户授予权限
4. Google 重定向回应用并带上授权码
5. 应用用授权码换取访问令牌
6. 应用使用令牌访问用户资源
```

**授权 URL 示例**：
```
https://accounts.google.com/o/oauth2/v2/auth?
  client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &scope=openid email profile
  &state=random_state_string
```

## Cheatsheet

| 授权类型 | 使用场景 |
|----------|----------|
| Authorization Code | 有后端的 Web 应用 |
| Authorization Code + PKCE | 移动端/SPA 应用 |
| Client Credentials | 机器对机器 |
| Refresh Token | 刷新过期令牌 |

## Gotchas

### 授权码流程 (Node.js)

```javascript
const express = require('express');
const axios = require('axios');

const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URI = 'http://localhost:3000/callback';

const app = express();

// 步骤 1：重定向到授权页面
app.get('/login', (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=openid email profile` +
    `&state=${generateState()}`;

  res.redirect(authUrl);
});

// 步骤 2：处理回调
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  // 验证 state 防止 CSRF
  if (!verifyState(state)) {
    return res.status(400).send('无效的 state');
  }

  // 步骤 3：用授权码换取令牌
  const tokenResponse = await axios.post(
    'https://oauth2.googleapis.com/token',
    {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    }
  );

  const { access_token, refresh_token, id_token } = tokenResponse.data;

  // 步骤 4：使用访问令牌获取用户信息
  const userInfo = await axios.get(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  res.json(userInfo.data);
});
```

### PKCE 流程（用于 SPA/移动端）

```javascript
// 生成 code verifier 和 challenge
function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(digest));
}

// 带 PKCE 的授权请求
const codeVerifier = generateCodeVerifier();
const codeChallenge = await generateCodeChallenge(codeVerifier);

const authUrl = `https://auth.example.com/authorize?` +
  `client_id=${CLIENT_ID}` +
  `&redirect_uri=${REDIRECT_URI}` +
  `&response_type=code` +
  `&scope=openid profile` +
  `&code_challenge=${codeChallenge}` +
  `&code_challenge_method=S256`;

// 令牌交换时包含 code_verifier
const tokenResponse = await fetch('https://auth.example.com/token', {
  method: 'POST',
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    code_verifier: codeVerifier  // 证明我们发起了请求
  })
});
```

### 刷新令牌

```javascript
async function refreshAccessToken(refreshToken) {
  const response = await axios.post('https://oauth2.googleapis.com/token', {
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'refresh_token'
  });

  return response.data.access_token;
}

// 遇到 401 自动刷新
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const newToken = await refreshAccessToken(storedRefreshToken);
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return axios.request(error.config);
    }
    throw error;
  }
);
```

### 客户端凭证（机器对机器）

```javascript
async function getM2MToken() {
  const response = await axios.post('https://auth.example.com/token', {
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: 'read:data write:data'
  });

  return response.data.access_token;
}
```

### 作用域和权限

```javascript
// 请求特定作用域
const scopes = [
  'openid',           // OIDC 必需
  'profile',          // 用户资料信息
  'email',            // 用户邮箱
  'offline_access',   // 获取刷新令牌
  'read:messages',    // 应用特定作用域
].join(' ');

// 检查响应中授予的作用域
const { scope } = tokenResponse.data;
const grantedScopes = scope.split(' ');

if (!grantedScopes.includes('email')) {
  console.log('未授予邮箱访问权限');
}
```

### 安全最佳实践

```javascript
// 1. 始终使用 state 参数
const state = crypto.randomBytes(32).toString('hex');
// 存储 state，在回调时验证

// 2. 公开客户端使用 PKCE
// 如上所示

// 3. 验证重定向 URI
const ALLOWED_REDIRECTS = ['https://myapp.com/callback'];
if (!ALLOWED_REDIRECTS.includes(redirectUri)) {
  throw new Error('无效的重定向 URI');
}

// 4. 安全存储令牌
// - 敏感应用不要存在 localStorage
// - 使用 httpOnly cookie 或安全存储

// 5. 使用短期访问令牌
// 通常 1 小时，按需刷新
```

## Next Steps

- [OAuth 2.0 规范](https://oauth.net/2/) - 官方规范
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground) - 交互式测试
- [Auth0 文档](https://auth0.com/docs) - 实现指南
- [PKCE RFC](https://oauth.net/2/pkce/) - PKCE 规范
