---
title: "JWT"
description: "Comienza con JWT en 5 minutos"
template: "tool"
tags: ["security", "authentication", "tokens"]
---

## TL;DR

**Qué**: JSON Web Token - medio compacto y seguro para URLs para representar claims entre dos partes.

**Por qué**: Autenticación sin estado, tokens auto-contenidos, amplio soporte, funciona entre dominios.

## Quick Start

**Estructura JWT**:
```
header.payload.signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Instalación (Node.js)**:
```bash
npm install jsonwebtoken
```

**Crear y verificar**:
```javascript
const jwt = require('jsonwebtoken');

const SECRET = 'your-secret-key';

// Crear token
const token = jwt.sign(
  { userId: 123, role: 'admin' },
  SECRET,
  { expiresIn: '1h' }
);

// Verificar token
const decoded = jwt.verify(token, SECRET);
console.log(decoded); // { userId: 123, role: 'admin', iat: ..., exp: ... }
```

## Cheatsheet

| Claim | Descripción |
|-------|-------------|
| `iss` | Emisor |
| `sub` | Sujeto (ID de usuario) |
| `aud` | Audiencia |
| `exp` | Tiempo de expiración |
| `iat` | Emitido en |
| `nbf` | No antes de |
| `jti` | ID JWT (único) |

## Gotchas

### Complete authentication flow

```javascript
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
const SECRET = process.env.JWT_SECRET;

// Endpoint de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validar credenciales
  const user = await validateCredentials(email, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generar tokens
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

  // Establecer refresh token en cookie httpOnly
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken });
});

// Middleware de autenticación
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

// Ruta protegida
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

    // Opcionalmente verificar si el token fue revocado
    if (isTokenRevoked(decoded.jti)) {
      return res.status(401).json({ error: 'Token revoked' });
    }

    // Generar nuevo access token
    const accessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      SECRET,
      { expiresIn: '15m' }
    );

    // Rotar refresh token (opcional pero recomendado)
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId, type: 'refresh', jti: generateId() },
      SECRET,
      { expiresIn: '7d' }
    );

    // Revocar antiguo refresh token
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

// Uso
app.delete('/users/:id',
  authenticate,
  authorize('admin'),
  (req, res) => {
    // Solo admins pueden eliminar usuarios
  }
);
```

### Using RS256 (asymmetric)

```javascript
const fs = require('fs');

const privateKey = fs.readFileSync('private.pem');
const publicKey = fs.readFileSync('public.pem');

// Firmar con clave privada
const token = jwt.sign(
  { userId: 123 },
  privateKey,
  { algorithm: 'RS256', expiresIn: '1h' }
);

// Verificar con clave pública
const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
```

### Frontend token handling

```javascript
// Almacenar access token en memoria (no localStorage)
let accessToken = null;

async function login(email, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include',  // Para cookies
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

  // Auto-refresh en 401
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
// Decodificar payload sin verificar (para leer claims en el cliente)
const decoded = jwt.decode(token);
console.log(decoded);

// Verificar expiración
const isExpired = decoded.exp * 1000 < Date.now();
```

## Next Steps

- [JWT.io](https://jwt.io/) - Debugger y bibliotecas
- [Introducción a JWT](https://jwt.io/introduction) - Introducción oficial
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - Especificación JWT
- [Estándares JOSE](https://jose.readthedocs.io/) - Specs JWS, JWE, JWK
