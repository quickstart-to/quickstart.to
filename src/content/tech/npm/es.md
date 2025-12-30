---
title: "npm"
description: "Comienza con el gestor de paquetes npm en 5 minutos"
template: "tool"
tags: ["nodejs", "package-manager", "javascript"]
---

## TL;DR

**Qué**: Gestor de paquetes por defecto para Node.js.

**Por qué**: Registro de paquetes más grande, viene con Node.js, scripts, workspaces.

## Quick Start

**Instalación** (viene con Node.js):
```bash
# Check version
npm --version

# Initialize project
npm init -y

# Install package
npm install lodash
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `npm init` | Crear package.json |
| `npm install` | Instalar dependencias |
| `npm install pkg` | Agregar paquete |
| `npm install -D pkg` | Agregar dependencia dev |
| `npm uninstall pkg` | Eliminar paquete |
| `npm update` | Actualizar paquetes |
| `npm run script` | Ejecutar script |
| `npm publish` | Publicar paquete |

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

- [npm Documentation](https://docs.npmjs.com/) - Documentación oficial
- [npm Registry](https://www.npmjs.com/) - Búsqueda de paquetes
- [package.json Guide](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) - Referencia de configuración
- [npm CLI Reference](https://docs.npmjs.com/cli/v9/commands) - Todos los comandos
