---
title: "pnpm"
description: "Gestionnaire de paquets economique en espace disque - liens durs, dependances strictes, support monorepo rapide"
template: "tool"
tags: ["nodejs", "package-manager", "javascript"]
---

## TL;DR

**Quoi** : Gestionnaire de paquets rapide et économe en espace disque pour Node.js.

**Pourquoi** : 2x plus rapide que npm, économise de l'espace disque, dépendances strictes, excellent support monorepo.

## Quick Start

**Installer** :
```bash
# npm
npm install -g pnpm

# Homebrew
brew install pnpm

# Check version
pnpm --version
```

**Utilisation basique** :
```bash
pnpm init
pnpm add express
pnpm install
pnpm dev
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `pnpm add pkg` | Ajouter une dépendance |
| `pnpm add -D pkg` | Ajouter une dépendance dev |
| `pnpm remove pkg` | Supprimer un paquet |
| `pnpm install` | Installer toutes les deps |
| `pnpm update` | Mettre à jour les paquets |
| `pnpm run script` | Exécuter un script |
| `pnpm dlx pkg` | Exécuter un paquet (comme npx) |

## Gotchas

### Installer des paquets

```bash
# Production dependency
pnpm add express

# Dev dependency
pnpm add -D typescript

# Global package
pnpm add -g nodemon

# Specific version
pnpm add lodash@4.17.21

# From workspace
pnpm add @myorg/shared --filter @myorg/web
```

### Workspaces (monorepo)

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

```bash
# Install all workspace deps
pnpm install

# Run script in specific package
pnpm --filter @myorg/web dev

# Run in all packages
pnpm -r run build

# Add dep to specific package
pnpm add lodash --filter @myorg/utils

# Add workspace dependency
pnpm add @myorg/shared --filter @myorg/web --workspace
```

### Filtrage

```bash
# By package name
pnpm --filter @myorg/web dev

# By directory
pnpm --filter ./packages/web dev

# All packages
pnpm -r run test

# Packages with changes
pnpm --filter "...[origin/main]" run test

# Dependencies of package
pnpm --filter "@myorg/web..." run build
```

### Configuration (.npmrc)

```ini
# Strict mode (recommended)
strict-peer-dependencies=true
auto-install-peers=true

# Shamefully hoist (compatibility mode)
shamefully-hoist=true

# Store location
store-dir=~/.pnpm-store

# Registry
registry=https://registry.npmmirror.com
```

### Migration depuis npm/yarn

```bash
# Import from package-lock.json
pnpm import

# Or just delete and reinstall
rm -rf node_modules package-lock.json yarn.lock
pnpm install
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
pnpm dev
pnpm run build

# Run binary
pnpm exec vitest

# Execute package without installing
pnpm dlx create-react-app my-app
```

## Next Steps

- [pnpm Documentation](https://pnpm.io/) - Documentation officielle
- [Workspaces](https://pnpm.io/workspaces) - Guide monorepo
- [Filtering](https://pnpm.io/filtering) - Sélection de paquets
- [pnpm vs npm vs yarn](https://pnpm.io/benchmarks) - Benchmarks
