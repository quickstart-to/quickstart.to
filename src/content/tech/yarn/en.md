---
title: "Yarn"
description: "Get started with Yarn package manager in 5 minutes"
tags: ["nodejs", "package-manager", "javascript"]
---

## TL;DR

**What**: Fast, reliable, and secure JavaScript package manager.

**Why**: Deterministic installs, workspaces, plug'n'play, offline cache.

## Quick Start

**Install**:
```bash
# npm
npm install -g yarn

# Homebrew
brew install yarn

# Check version
yarn --version
```

**Basic usage**:
```bash
yarn init
yarn add express
yarn install
yarn dev
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `yarn add pkg` | Add dependency |
| `yarn add -D pkg` | Add dev dependency |
| `yarn remove pkg` | Remove package |
| `yarn install` | Install all deps |
| `yarn upgrade` | Upgrade packages |
| `yarn run script` | Run script |
| `yarn dlx pkg` | Execute package |

## Gotchas

### Installing packages

```bash
# Production dependency
yarn add express

# Dev dependency
yarn add -D typescript

# Global package (Yarn 1)
yarn global add nodemon

# Specific version
yarn add lodash@4.17.21

# From git
yarn add git+https://github.com/user/repo.git
```

### Workspaces

```json
// package.json
{
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

```bash
# Install all workspace deps
yarn install

# Run script in specific workspace
yarn workspace @myorg/web dev

# Add dep to workspace
yarn workspace @myorg/utils add lodash

# Run in all workspaces
yarn workspaces foreach run build
```

### Yarn Berry (v2+)

```bash
# Enable Yarn Berry
yarn set version berry

# Enable Plug'n'Play
yarn config set nodeLinker pnp

# Or use node_modules
yarn config set nodeLinker node-modules

# Install
yarn install
```

### Configuration (.yarnrc.yml)

```yaml
# Yarn Berry config
nodeLinker: node-modules

# Registry
npmRegistryServer: "https://registry.npmmirror.com"

# Plugins
plugins:
  - path: .yarn/plugins/@yarnpkg/plugin-workspace-tools.cjs
    spec: "@yarnpkg/plugin-workspace-tools"
```

### Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest"
  }
}
```

```bash
# Run script
yarn dev
yarn run build

# Execute binary
yarn exec vitest

# Execute without installing
yarn dlx create-react-app my-app
```

### Useful commands

```bash
# Check why package is installed
yarn why lodash

# Upgrade interactive
yarn upgrade-interactive

# Check outdated
yarn outdated

# Clean cache
yarn cache clean

# List packages
yarn list --depth=0
```

## Next Steps

- [Yarn Documentation](https://yarnpkg.com/) - Official docs
- [Yarn Berry](https://yarnpkg.com/getting-started) - v2+ guide
- [Workspaces](https://yarnpkg.com/features/workspaces) - Monorepo
- [Plug'n'Play](https://yarnpkg.com/features/pnp) - Zero-install
