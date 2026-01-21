---
title: "npm"
description: "Node.js default package manager - publish, install, and manage JavaScript dependencies with largest registry"
template: "tool"
tags: ["nodejs", "package-manager", "javascript"]
---

## TL;DR

**What**: Default package manager for Node.js.

**Why**: Largest package registry, comes with Node.js, scripts, workspaces.

## Quick Start

**Install** (comes with Node.js):
```bash
# Check version
npm --version

# Initialize project
npm init -y

# Install package
npm install lodash
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `npm init` | Create package.json |
| `npm install` | Install dependencies |
| `npm install pkg` | Add package |
| `npm install -D pkg` | Add dev dependency |
| `npm uninstall pkg` | Remove package |
| `npm update` | Update packages |
| `npm run script` | Run script |
| `npm publish` | Publish package |

## Gotchas

### Installing packages

```bash
# Production dependency
npm install express

# Dev dependency
npm install -D typescript

# Global package
npm install -g nodemon

# Specific version
npm install lodash@4.17.21

# From git
npm install git+https://github.com/user/repo.git
```

### package.json scripts

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint .",
    "pretest": "npm run lint",
    "postbuild": "npm run test"
  }
}
```

```bash
# Run scripts
npm run dev
npm start        # 'start' doesn't need 'run'
npm test         # 'test' doesn't need 'run'
```

### Version management

```bash
# View versions
npm view lodash versions

# Install latest
npm install lodash@latest

# Version ranges in package.json
"lodash": "^4.17.21"   # ^: minor updates (4.x.x)
"lodash": "~4.17.21"   # ~: patch updates (4.17.x)
"lodash": "4.17.21"    # Exact version
"lodash": "*"          # Any version
```

### Workspaces (monorepo)

```json
// package.json
{
  "workspaces": [
    "packages/*"
  ]
}
```

```bash
# Install all workspace deps
npm install

# Run script in specific workspace
npm run build -w packages/core

# Add dep to workspace
npm install lodash -w packages/utils
```

### Publishing

```bash
# Login
npm login

# Publish
npm publish

# Publish with tag
npm publish --tag beta

# Update version
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### Configuration

```bash
# View config
npm config list

# Set registry
npm config set registry https://registry.npmmirror.com

# Use .npmrc
registry=https://registry.npmmirror.com
save-exact=true
```

## Next Steps

- [npm Documentation](https://docs.npmjs.com/) - Official docs
- [npm Registry](https://www.npmjs.com/) - Package search
- [package.json Guide](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) - Config reference
- [npm CLI Reference](https://docs.npmjs.com/cli/v9/commands) - All commands
