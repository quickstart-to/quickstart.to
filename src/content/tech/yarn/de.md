---
title: "Yarn"
description: "Schneller JavaScript-Paketmanager - Workspaces, Caching und Plug'n'Play fur effiziente Abhangigkeitsverwaltung"
template: "tool"
tags: ["nodejs", "package-manager", "javascript"]
---

## TL;DR

**Was**: Schneller, zuverlässiger und sicherer JavaScript-Paketmanager.

**Warum**: Deterministische Installationen, Workspaces, Plug'n'Play, Offline-Cache.

## Quick Start

**Installieren**:
```bash
# npm
npm install -g yarn

# Homebrew
brew install yarn

# Check version
yarn --version
```

**Grundlegende Verwendung**:
```bash
yarn init
yarn add express
yarn install
yarn dev
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `yarn add pkg` | Abhängigkeit hinzufügen |
| `yarn add -D pkg` | Dev-Abhängigkeit hinzufügen |
| `yarn remove pkg` | Paket entfernen |
| `yarn install` | Alle Deps installieren |
| `yarn upgrade` | Pakete aktualisieren |
| `yarn run script` | Skript ausführen |
| `yarn dlx pkg` | Paket ausführen |

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

- [Yarn Documentation](https://yarnpkg.com/) - Offizielle Dokumentation
- [Yarn Berry](https://yarnpkg.com/getting-started) - v2+ Anleitung
- [Workspaces](https://yarnpkg.com/features/workspaces) - Monorepo
- [Plug'n'Play](https://yarnpkg.com/features/pnp) - Zero-Install
