---
title: "JWT"
description: "Starten Sie mit JWT in 5 Minuten"
template: "tool"
tags: ["security", "authentication", "tokens"]
---

## TL;DR

**Was**: JSON Web Token - kompakte, URL-sichere Methode zur Darstellung von Ansprüchen zwischen zwei Parteien.

**Warum**: Zustandslose Authentifizierung, selbstenthaltende Token, weit verbreitet, funktioniert domänenübergreifend.

## Quick Start

**JWT-Struktur**:
```
header.payload.signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Installation (Node.js)**:
```bash
npm install jsonwebtoken
```

**Erstellen und verifizieren**:
```javascript
const jwt = require('jsonwebtoken');

const SECRET = 'your-secret-key';

// Token erstellen
const token = jwt.sign(
  { userId: 123, role: 'admin' },
  SECRET,
  { expiresIn: '1h' }
);

// Token verifizieren
const decoded = jwt.verify(token, SECRET);
console.log(decoded); // { userId: 123, role: 'admin', iat: ..., exp: ... }
```

## Cheatsheet

| Claim | Beschreibung |
|-------|-------------|
| `iss` | Aussteller |
| `sub` | Betreff (Benutzer-ID) |
| `aud` | Zielgruppe |
| `exp` | Ablaufzeit |
| `iat` | Ausstellungszeitpunkt |
| `nbf` | Nicht vor |
| `jti` | JWT-ID (eindeutig) |

## Gotchas

### Complete authentication flow

```javascript
const jwt = require('jsonwebtoken');
const express = require('express');

const app = express();
const SECRET = process.env.JWT_SECRET;

// Login-Endpunkt
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Anmeldedaten validieren
  const user = await validateCredentials(email, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Tokens generieren
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

  // Refresh-Token in httpOnly-Cookie setzen
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({ accessToken });
});

// Auth-Middleware
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

// Geschützte Route
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

    // Optional prüfen, ob Token widerrufen wurde
    if (isTokenRevoked(decoded.jti)) {
      return res.status(401).json({ error: 'Token revoked' });
    }

    // Neuen Access-Token generieren
    const accessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      SECRET,
      { expiresIn: '15m' }
    );

    // Refresh-Token rotieren (optional aber empfohlen)
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId, type: 'refresh', jti: generateId() },
      SECRET,
      { expiresIn: '7d' }
    );

    // Alten Refresh-Token widerrufen
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

// Verwendung
app.delete('/users/:id',
  authenticate,
  authorize('admin'),
  (req, res) => {
    // Nur Admins können Benutzer löschen
  }
);
```

### Using RS256 (asymmetric)

```javascript
const fs = require('fs');

const privateKey = fs.readFileSync('private.pem');
const publicKey = fs.readFileSync('public.pem');

// Mit privatem Schlüssel signieren
const token = jwt.sign(
  { userId: 123 },
  privateKey,
  { algorithm: 'RS256', expiresIn: '1h' }
);

// Mit öffentlichem Schlüssel verifizieren
const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
```

### Frontend token handling

```javascript
// Access-Token im Speicher (nicht localStorage)
let accessToken = null;

async function login(email, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    credentials: 'include',  // Für Cookies
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

  // Auto-Refresh bei 401
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
// Payload dekodieren ohne Verifizierung (zum Lesen von Claims clientseitig)
const decoded = jwt.decode(token);
console.log(decoded);

// Ablauf prüfen
const isExpired = decoded.exp * 1000 < Date.now();
```

## Next Steps

- [JWT.io](https://jwt.io/) - Debugger und Bibliotheken
- [JWT Einführung](https://jwt.io/introduction) - Offizielle Einführung
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - JWT-Spezifikation
- [JOSE Standards](https://jose.readthedocs.io/) - JWS, JWE, JWK Specs
