---
title: "pnpm"
description: "Get started with pnpm package manager in 5 minutes"
template: "tool"
tags: ["nodejs", "package-manager", "javascript"]
---

## TL;DR

**What**: Fast, disk space efficient package manager for Node.js.

**Why**: 2x faster than npm, saves disk space, strict dependencies, great monorepo support.

## Quick Start

**Install**:
```bash
# npm
npm install -g pnpm

# Homebrew
brew install pnpm

# Check version
pnpm --version
```

**Basic usage**:
```bash
pnpm init
pnpm add express
pnpm install
pnpm dev
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `pnpm add pkg` | Add dependency |
| `pnpm add -D pkg` | Add dev dependency |
| `pnpm remove pkg` | Remove package |
| `pnpm install` | Install all deps |
| `pnpm update` | Update packages |
| `pnpm run script` | Run script |
| `pnpm dlx pkg` | Execute package (like npx) |

## Gotchas

### Installing packages

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

### Filtering

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

### Migration from npm/yarn

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

- [pnpm Documentation](https://pnpm.io/) - Official docs
- [Workspaces](https://pnpm.io/workspaces) - Monorepo guide
- [Filtering](https://pnpm.io/filtering) - Package selection
- [pnpm vs npm vs yarn](https://pnpm.io/benchmarks) - Benchmarks
