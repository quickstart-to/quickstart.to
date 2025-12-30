---
title: "JWT"
description: "Démarrez avec JWT en 5 minutes"
template: "tool"
tags: ["security", "authentication", "tokens"]
---

## TL;DR

**Quoi** : JSON Web Token - moyen compact et sécurisé pour les URLs de représenter des revendications entre deux parties.

**Pourquoi** : Authentification sans état, tokens auto-contenus, largement supporté, fonctionne entre domaines.

## Quick Start

**Structure JWT** :
```
header.payload.signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Installation (Node.js)** :
```bash
npm install jsonwebtoken
```

**Créer et vérifier** :
```javascript
const jwt = require('jsonwebtoken');

const SECRET = 'your-secret-key';

// Créer le token
const token = jwt.sign(
  { userId: 123, role: 'admin' },
  SECRET,
  { expiresIn: '1h' }
);

// Vérifier le token
const decoded = jwt.verify(token, SECRET);
console.log(decoded); // { userId: 123, role: 'admin', iat: ..., exp: ... }
```

## Cheatsheet

| Claim | Description |
|-------|-------------|
| `iss` | Émetteur |
| `sub` | Sujet (ID utilisateur) |
| `aud` | Audience |
| `exp` | Date d'expiration |
| `iat` | Date d'émission |
| `nbf` | Pas avant |
| `jti` | ID JWT (unique) |

## Gotchas

### Complete authentication flow

```javascript
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
const SECRET = process.env.JWT_SECRET;

// Endpoint de connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Valider les identifiants
  const user = await validateCredentials(email, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Générer les tokens
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

  // Définir le refresh token dans un cookie httpOnly
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken });
});

// Middleware d'authentification
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

// Route protégée
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

    // Vérifier optionnellement si le token est révoqué
    if (isTokenRevoked(decoded.jti)) {
      return res.status(401).json({ error: 'Token revoked' });
    }

    // Générer un nouveau access token
    const accessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      SECRET,
      { expiresIn: '15m' }
    );

    // Rotation du refresh token (optionnel mais recommandé)
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId, type: 'refresh', jti: generateId() },
      SECRET,
      { expiresIn: '7d' }
    );

    // Révoquer l'ancien refresh token
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

// Utilisation
app.delete('/users/:id',
  authenticate,
  authorize('admin'),
  (req, res) => {
    // Seuls les admins peuvent supprimer des utilisateurs
  }
);
```

### Using RS256 (asymmetric)

```javascript
const fs = require('fs');

const privateKey = fs.readFileSync('private.pem');
const publicKey = fs.readFileSync('public.pem');

// Signer avec la clé privée
const token = jwt.sign(
  { userId: 123 },
  privateKey,
  { algorithm: 'RS256', expiresIn: '1h' }
);

// Vérifier avec la clé publique
const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
```

### Frontend token handling

```javascript
// Stocker l'access token en mémoire (pas localStorage)
let accessToken = null;

async function login(email, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include',  // Pour les cookies
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

  // Auto-refresh sur 401
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
// Décoder le payload sans vérifier (pour lire les claims côté client)
const decoded = jwt.decode(token);
console.log(decoded);

// Vérifier l'expiration
const isExpired = decoded.exp * 1000 < Date.now();
```

## Next Steps

- [JWT.io](https://jwt.io/) - Débogueur et bibliothèques
- [Introduction JWT](https://jwt.io/introduction) - Introduction officielle
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - Spécification JWT
- [Standards JOSE](https://jose.readthedocs.io/) - Specs JWS, JWE, JWK
