---
title: "Homebrew"
description: "Comienza con el gestor de paquetes Homebrew para macOS"
template: "tool"
tags: ["macos", "package-manager", "tools"]
---

## TL;DR

**Qué**: El gestor de paquetes que faltaba para macOS (y Linux).

**Por qué**: Instala software con un comando, gestiona dependencias automáticamente.

## Quick Start

**Instalar Homebrew**:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Añadir al PATH** (Mac Apple Silicon):

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Verificar instalación**:

```bash
brew --version
```

**Instalar un paquete**:

```bash
brew install wget
brew install git
brew install node
```

**Instalar apps GUI (Casks)**:

```bash
brew install --cask visual-studio-code
brew install --cask google-chrome
brew install --cask docker
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `brew install pkg` | Instalar un paquete |
| `brew uninstall pkg` | Eliminar un paquete |
| `brew upgrade` | Actualizar todos los paquetes |
| `brew upgrade pkg` | Actualizar paquete específico |
| `brew update` | Actualizar Homebrew mismo |
| `brew list` | Listar paquetes instalados |
| `brew search text` | Buscar paquetes |
| `brew info pkg` | Información del paquete |
| `brew doctor` | Diagnosticar problemas |
| `brew cleanup` | Eliminar versiones antiguas |
| `brew services list` | Listar servicios en segundo plano |
| `brew services start pkg` | Iniciar un servicio |

## Gotchas

### Command not found after install

```bash
# Añadir al PATH (comprueba tu shell)
# Para zsh (por defecto en macOS):
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile

# Para bash:
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile

# Luego recargar:
source ~/.zprofile  # o ~/.bash_profile
```

### Permission errors

```bash
# Corregir permisos del directorio Homebrew
sudo chown -R $(whoami) /opt/homebrew

# O para Mac Intel:
sudo chown -R $(whoami) /usr/local/Homebrew
```

### Package conflicts

```bash
# Desvincular paquete en conflicto
brew unlink pkg

# Vincular el que quieres
brew link pkg

# Forzar vinculación si es necesario
brew link --overwrite pkg
```

### Brew doctor warnings

```bash
# Ejecutar diagnóstico
brew doctor

# Las advertencias sobre kegs no vinculados son generalmente seguras de ignorar
# Corrige los problemas como se sugiere en la salida
```

## Next Steps

- [Documentación de Homebrew](https://docs.brew.sh/)
- [Homebrew Formulae](https://formulae.brew.sh/)
- [Homebrew Cask](https://formulae.brew.sh/cask/)
- [Brewfile para dotfiles](https://github.com/Homebrew/homebrew-bundle)
