---
title: "Node.js"
description: "Runtime JavaScript pour le développement serveur - applications réseau évolutives avec I/O non bloquant"
template: "tool"
tags: ["javascript", "runtime", "backend"]
---

## TL;DR

**Quoi** : Runtime JavaScript construit sur le moteur V8 de Chrome pour le développement côté serveur.

**Pourquoi** : Exécuter JavaScript en dehors du navigateur, construire des applications réseau rapides et évolutives.

## Quick Start

**Installation (recommandée via nvm)** :

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Install latest LTS
nvm install --lts

# Verify installation
node -v  # v24.12.0
npm -v
```

**Installations alternatives** :

macOS : `brew install node`

Windows : `choco install nodejs` ou télécharger depuis [nodejs.org](https://nodejs.org)

**Premier programme** :

```javascript
// hello.js
console.log('Hello, Node.js!');
```

```bash
node hello.js
```

**Créer un serveur web** :

```javascript
// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

```bash
node server.js
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `node file.js` | Exécuter un fichier JavaScript |
| `node -e "code"` | Exécuter du code inline |
| `node --version` | Afficher la version Node.js |
| `npm init -y` | Initialiser un nouveau projet |
| `npm install pkg` | Installer un package |
| `npm install -g pkg` | Installer globalement |
| `npm run script` | Exécuter un script package.json |
| `npx command` | Exécuter un package sans l'installer |

## Gotchas

### 'node' command not found after install

```bash
# Reload shell config
source ~/.bashrc  # or ~/.zshrc
# Or restart terminal
```

### EACCES permission errors with npm

```bash
# Use nvm instead of system install
# Or fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Callback hell

```javascript
// Use async/await instead
async function getData() {
  const result = await fetch('https://api.example.com');
  return result.json();
}
```

### ES Modules vs CommonJS

```javascript
// CommonJS (default)
const fs = require('fs');

// ES Modules (use .mjs or set "type": "module" in package.json)
import fs from 'fs';
```

## Next Steps

- [Node.js Official Docs](https://nodejs.org/docs/latest/api/) - Documentation officielle
- [npm Documentation](https://docs.npmjs.com/) - Documentation npm
- [Express.js Framework](https://expressjs.com/) - Framework Express
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices) - Bonnes pratiques
