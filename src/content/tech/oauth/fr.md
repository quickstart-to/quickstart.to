---
title: "OAuth 2.0"
description: "Framework d'autorisation pour acces delegue - Authorization Code, PKCE, Client Credentials"
template: "tool"
tags: ["security", "authentication", "authorization"]
---

## TL;DR

**Quoi** : Framework d'autorisation permettant aux apps tierces d'accéder aux ressources sans partager les mots de passe.

**Pourquoi** : Accès délégué sécurisé, standard de l'industrie, supporte différents types de grant pour divers scénarios.

## Quick Start

**Aperçu du flux OAuth 2.0** :
```
1. User clicks "Login with Google"
2. App redirects to Google authorization URL
3. User grants permission
4. Google redirects back with authorization code
5. App exchanges code for access token
6. App uses token to access user resources
```

**Exemple d'URL d'autorisation** :
```
https://accounts.google.com/o/oauth2/v2/auth?
  client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &scope=openid email profile
  &state=random_state_string
```

## Cheatsheet

| Type de Grant | Cas d'usage |
|------------|----------|
| Authorization Code | Apps web avec backend |
| Authorization Code + PKCE | Apps Mobile/SPA |
| Client Credentials | Machine-to-machine |
| Refresh Token | Renouveler les tokens expirés |

## Gotchas

### Authorization Code Flow (Node.js)

```javascript
const express = require('express');
const axios = require('axios');

const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URI = 'http://localhost:3000/callback';

const app = express();

// Step 1: Redirect to authorization
app.get('/login', (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=openid email profile` +
    `&state=${generateState()}`;

  res.redirect(authUrl);
});

// Step 2: Handle callback
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  // Verify state to prevent CSRF
  if (!verifyState(state)) {
    return res.status(400).send('Invalid state');
  }

  // Step 3: Exchange code for tokens
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

  // Step 4: Use access token to get user info
  const userInfo = await axios.get(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  res.json(userInfo.data);
});
```

### PKCE Flow (for SPAs/Mobile)

```javascript
// Generate code verifier and challenge
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

// Authorization request with PKCE
const codeVerifier = generateCodeVerifier();
const codeChallenge = await generateCodeChallenge(codeVerifier);

const authUrl = `https://auth.example.com/authorize?` +
  `client_id=${CLIENT_ID}` +
  `&redirect_uri=${REDIRECT_URI}` +
  `&response_type=code` +
  `&scope=openid profile` +
  `&code_challenge=${codeChallenge}` +
  `&code_challenge_method=S256`;

// Token exchange includes code_verifier
const tokenResponse = await fetch('https://auth.example.com/token', {
  method: 'POST',
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    code_verifier: codeVerifier  // Proves we initiated the request
  })
});
```

### Refresh tokens

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

// Auto-refresh on 401
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

### Client Credentials (machine-to-machine)

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

### Scopes and permissions

```javascript
// Request specific scopes
const scopes = [
  'openid',           // Required for OIDC
  'profile',          // User profile info
  'email',            // User email
  'offline_access',   // Get refresh token
  'read:messages',    // App-specific scope
].join(' ');

// Check granted scopes in response
const { scope } = tokenResponse.data;
const grantedScopes = scope.split(' ');

if (!grantedScopes.includes('email')) {
  console.log('Email access not granted');
}
```

### Security best practices

```javascript
// 1. Always use state parameter
const state = crypto.randomBytes(32).toString('hex');
// Store state, verify on callback

// 2. Use PKCE for public clients
// Already shown above

// 3. Validate redirect URI
const ALLOWED_REDIRECTS = ['https://myapp.com/callback'];
if (!ALLOWED_REDIRECTS.includes(redirectUri)) {
  throw new Error('Invalid redirect URI');
}

// 4. Store tokens securely
// - Never in localStorage for sensitive apps
// - Use httpOnly cookies or secure storage

// 5. Use short-lived access tokens
// Typically 1 hour, refresh as needed
```

## Next Steps

- [OAuth 2.0 Specification](https://oauth.net/2/) - Spécification officielle
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground) - Tests interactifs
- [Auth0 Documentation](https://auth0.com/docs) - Guides d'implémentation
- [PKCE RFC](https://oauth.net/2/pkce/) - Spécification PKCE
