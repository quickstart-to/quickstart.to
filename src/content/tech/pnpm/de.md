---
title: "pnpm"
description: "Starten Sie mit dem pnpm Paketmanager in 5 Minuten"
template: "tool"
tags: ["nodejs", "package-manager", "javascript"]
---

## TL;DR

**Was**: Schneller, speicherplatzeffizienter Paketmanager für Node.js.

**Warum**: 2x schneller als npm, spart Speicherplatz, strikte Abhängigkeiten, hervorragende Monorepo-Unterstützung.

## Quick Start

**Installieren**:
```bash
# npm
npm install -g pnpm

# Homebrew
brew install pnpm

# Check version
pnpm --version
```

**Grundlegende Verwendung**:
```bash
pnpm init
pnpm add express
pnpm install
pnpm dev
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `pnpm add pkg` | Abhängigkeit hinzufügen |
| `pnpm add -D pkg` | Dev-Abhängigkeit hinzufügen |
| `pnpm remove pkg` | Paket entfernen |
| `pnpm install` | Alle Abhängigkeiten installieren |
| `pnpm update` | Pakete aktualisieren |
| `pnpm run script` | Skript ausführen |
| `pnpm dlx pkg` | Paket ausführen (wie npx) |

## Gotchas

### Pakete installieren

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

### Workspaces (Monorepo)

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

### Filterung

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

### Konfiguration (.npmrc)

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

### Migration von npm/yarn

```bash
# Import from package-lock.json
pnpm import

# Or just delete and reinstall
rm -rf node_modules package-lock.json yarn.lock
pnpm install
```

### Skripte

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

- [pnpm Documentation](https://pnpm.io/) - Offizielle Dokumentation
- [Workspaces](https://pnpm.io/workspaces) - Monorepo-Anleitung
- [Filtering](https://pnpm.io/filtering) - Paketauswahl
- [pnpm vs npm vs yarn](https://pnpm.io/benchmarks) - Benchmarks
