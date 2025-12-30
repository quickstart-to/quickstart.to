---
title: "Node.js"
description: "Comienza con el runtime Node.js en 5 minutos"
template: "tool"
tags: ["javascript", "runtime", "backend"]
---

## TL;DR

**Qué**: Runtime de JavaScript construido sobre el motor V8 de Chrome para desarrollo del lado del servidor.

**Por qué**: Ejecutar JavaScript fuera del navegador, construir aplicaciones de red rápidas y escalables.

## Quick Start

**Instalación (recomendado via nvm)**:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Install latest LTS
nvm install --lts

# Verify installation
node -v  # v24.12.0
npm -v
```

**Instalaciones alternativas**:

macOS: `brew install node`

Windows: `choco install nodejs` o descargar de [nodejs.org](https://nodejs.org)

**Primer programa**:

```javascript
// hello.js
console.log('Hello, Node.js!');
```

```bash
node hello.js
```

**Crear un servidor web**:

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

| Comando | Descripción |
|---------|-------------|
| `node file.js` | Ejecutar archivo JavaScript |
| `node -e "code"` | Ejecutar código inline |
| `node --version` | Mostrar versión de Node.js |
| `npm init -y` | Inicializar nuevo proyecto |
| `npm install pkg` | Instalar paquete |
| `npm install -g pkg` | Instalar globalmente |
| `npm run script` | Ejecutar script de package.json |
| `npx command` | Ejecutar paquete sin instalar |

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

- [Node.js Official Docs](https://nodejs.org/docs/latest/api/) - Documentación oficial
- [npm Documentation](https://docs.npmjs.com/) - Documentación de npm
- [Express.js Framework](https://expressjs.com/) - Framework Express
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices) - Mejores prácticas
