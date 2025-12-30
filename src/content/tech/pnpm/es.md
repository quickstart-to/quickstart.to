---
title: "pnpm"
description: "Gestor de paquetes eficiente en disco - enlaces duros, dependencias estrictas, soporte monorepo rapido"
template: "tool"
tags: ["nodejs", "package-manager", "javascript"]
---

## TL;DR

**Qué**: Gestor de paquetes rápido y eficiente en espacio de disco para Node.js.

**Por qué**: 2x más rápido que npm, ahorra espacio en disco, dependencias estrictas, excelente soporte monorepo.

## Quick Start

**Instalar**:
```bash
# npm
npm install -g pnpm

# Homebrew
brew install pnpm

# Check version
pnpm --version
```

**Uso básico**:
```bash
pnpm init
pnpm add express
pnpm install
pnpm dev
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `pnpm add pkg` | Añadir dependencia |
| `pnpm add -D pkg` | Añadir dependencia dev |
| `pnpm remove pkg` | Eliminar paquete |
| `pnpm install` | Instalar todas las deps |
| `pnpm update` | Actualizar paquetes |
| `pnpm run script` | Ejecutar script |
| `pnpm dlx pkg` | Ejecutar paquete (como npx) |

## Gotchas

### Instalar paquetes

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

### Filtrado

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

### Configuración (.npmrc)

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

### Migración desde npm/yarn

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

- [pnpm Documentation](https://pnpm.io/) - Documentación oficial
- [Workspaces](https://pnpm.io/workspaces) - Guía monorepo
- [Filtering](https://pnpm.io/filtering) - Selección de paquetes
- [pnpm vs npm vs yarn](https://pnpm.io/benchmarks) - Benchmarks
