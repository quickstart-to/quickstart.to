---
title: "Node.js"
description: "JavaScript runtime for server-side development - build scalable network applications with non-blocking I/O"
template: "tool"
tags: ["javascript", "runtime", "backend"]
---

## TL;DR

**What**: JavaScript runtime built on Chrome's V8 engine for server-side development.

**Why**: Run JavaScript outside the browser, build fast and scalable network applications.

## Quick Start

**Install (recommended via nvm)**:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Install latest LTS
nvm install --lts

# Verify installation
node -v  # v24.12.0
npm -v
```

**Alternative installs**:

macOS: `brew install node`

Windows: `choco install nodejs` or download from [nodejs.org](https://nodejs.org)

**First program**:

```javascript
// hello.js
console.log('Hello, Node.js!');
```

```bash
node hello.js
```

**Create a web server**:

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

| Command | Description |
|---------|-------------|
| `node file.js` | Run a JavaScript file |
| `node -e "code"` | Execute inline code |
| `node --version` | Show Node.js version |
| `npm init -y` | Initialize a new project |
| `npm install pkg` | Install a package |
| `npm install -g pkg` | Install globally |
| `npm run script` | Run a package.json script |
| `npx command` | Run a package without installing |

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

- [Node.js Official Docs](https://nodejs.org/docs/latest/api/)
- [npm Documentation](https://docs.npmjs.com/)
- [Express.js Framework](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
