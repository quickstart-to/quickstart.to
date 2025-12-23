---
title: "JWT"
description: "Get started with JWT in 5 minutes"
template: "tool"
tags: ["security", "authentication", "tokens"]
---

## TL;DR

**What**: JSON Web Token - compact, URL-safe means of representing claims between two parties.

**Why**: Stateless authentication, self-contained tokens, widely supported, works across domains.

## Quick Start

**JWT Structure**:
```
header.payload.signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Install (Node.js)**:
```bash
npm install jsonwebtoken
```

**Create and verify**:
```javascript
const jwt = require('jsonwebtoken');

const SECRET = 'your-secret-key';

// Create token
const token = jwt.sign(
  { userId: 123, role: 'admin' },
  SECRET,
  { expiresIn: '1h' }
);

// Verify token
const decoded = jwt.verify(token, SECRET);
console.log(decoded); // { userId: 123, role: 'admin', iat: ..., exp: ... }
```

## Cheatsheet

| Claim | Description |
|-------|-------------|
| `iss` | Issuer |
| `sub` | Subject (user ID) |
| `aud` | Audience |
| `exp` | Expiration time |
| `iat` | Issued at |
| `nbf` | Not before |
| `jti` | JWT ID (unique) |

## Gotchas

### Complete authentication flow

```javascript
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
const SECRET = process.env.JWT_SECRET;

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate credentials
  const user = await validateCredentials(email, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate tokens
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

  // Set refresh token in httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken });
});

// Auth middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Protected route
app.get('/profile', authenticate, (req, res) => {
  res.json({ userId: req.user.userId });
});
```

### Refresh token rotation

```javascript
app.post('/refresh', (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' });
  }

  try {
    const decoded = jwt.verify(refreshToken, SECRET);

    // Optionally check if token is revoked
    if (isTokenRevoked(decoded.jti)) {
      return res.status(401).json({ error: 'Token revoked' });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      SECRET,
      { expiresIn: '15m' }
    );

    // Rotate refresh token (optional but recommended)
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId, type: 'refresh', jti: generateId() },
      SECRET,
      { expiresIn: '7d' }
    );

    // Revoke old refresh token
    revokeToken(decoded.jti);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});
```

### Role-based authorization

```javascript
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}

// Usage
app.delete('/users/:id',
  authenticate,
  authorize('admin'),
  (req, res) => {
    // Only admins can delete users
  }
);
```

### Using RS256 (asymmetric)

```javascript
const fs = require('fs');

const privateKey = fs.readFileSync('private.pem');
const publicKey = fs.readFileSync('public.pem');

// Sign with private key
const token = jwt.sign(
  { userId: 123 },
  privateKey,
  { algorithm: 'RS256', expiresIn: '1h' }
);

// Verify with public key
const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
```

### Frontend token handling

```javascript
// Store access token in memory (not localStorage)
let accessToken = null;

async function login(email, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include',  // For cookies
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

  // Auto-refresh on 401
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

### Decoding without verification

```javascript
// Decode payload without verifying (for reading claims client-side)
const decoded = jwt.decode(token);
console.log(decoded);

// Check expiration
const isExpired = decoded.exp * 1000 < Date.now();
```

## Next Steps

- [JWT.io](https://jwt.io/) - Debugger and libraries
- [JWT Introduction](https://jwt.io/introduction) - Official introduction
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - JWT specification
- [JOSE Standards](https://jose.readthedocs.io/) - JWS, JWE, JWK specs
