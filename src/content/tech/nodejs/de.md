---
title: "Node.js"
description: "JavaScript-Runtime für serverseitige Entwicklung - skalierbare Netzwerkanwendungen mit non-blocking I/O"
template: "tool"
tags: ["javascript", "runtime", "backend"]
---

## TL;DR

**Was**: JavaScript-Runtime basierend auf Chromes V8-Engine für serverseitige Entwicklung.

**Warum**: JavaScript außerhalb des Browsers ausführen, schnelle und skalierbare Netzwerkanwendungen bauen.

## Quick Start

**Installation (empfohlen via nvm)**:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Install latest LTS
nvm install --lts

# Verify installation
node -v  # v24.12.0
npm -v
```

**Alternative Installationen**:

macOS: `brew install node`

Windows: `choco install nodejs` oder von [nodejs.org](https://nodejs.org) herunterladen

**Erstes Programm**:

```javascript
// hello.js
console.log('Hello, Node.js!');
```

```bash
node hello.js
```

**Webserver erstellen**:

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

| Befehl | Beschreibung |
|---------|-------------|
| `node file.js` | JavaScript-Datei ausführen |
| `node -e "code"` | Inline-Code ausführen |
| `node --version` | Node.js-Version anzeigen |
| `npm init -y` | Neues Projekt initialisieren |
| `npm install pkg` | Paket installieren |
| `npm install -g pkg` | Global installieren |
| `npm run script` | package.json-Script ausführen |
| `npx command` | Paket ohne Installation ausführen |

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

- [Node.js Official Docs](https://nodejs.org/docs/latest/api/) - Offizielle Dokumentation
- [npm Documentation](https://docs.npmjs.com/) - npm-Dokumentation
- [Express.js Framework](https://expressjs.com/) - Express-Framework
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices) - Best Practices
