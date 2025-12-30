---
title: "Git"
description: "Rastrea cambios en el código, colabora en equipo y mantén el historial del proyecto con control de versiones distribuido"
template: "tool"
tags: ["version-control", "devops"]
---

## TL;DR

**En una línea**: Git rastrea cada cambio en tu código, permite deshacer errores y hace posible la colaboración.

**Valor principal**:
- Historial - cada cambio queda registrado
- Deshacer - volver a cualquier estado anterior
- Ramas - trabajar en funcionalidades sin romper el código principal
- Colaboración - fusionar trabajo de múltiples personas

## Quick Start

### Install

macOS:
```bash
brew install git
```

Windows: Descargar [Git para Windows](https://git-scm.com/download/win)

Linux:
```bash
sudo apt install git  # Debian/Ubuntu
```

### Configure

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@example.com"
```

### First Repo

```bash
mkdir miproyecto && cd miproyecto
git init
echo "# Mi Proyecto" > README.md
git add .
git commit -m "Commit inicial"
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `git init` | Crear nuevo repo |
| `git clone URL` | Clonar un repo |
| `git status` | Verificar estado actual |
| `git add ARCHIVO` | Preparar cambios |
| `git add .` | Preparar todos los cambios |
| `git commit -m "msg"` | Confirmar cambios |
| `git push` | Enviar al remoto |
| `git pull` | Traer del remoto |
| `git branch` | Listar ramas |
| `git branch NOMBRE` | Crear rama |
| `git checkout NOMBRE` | Cambiar de rama |
| `git checkout -b NOMBRE` | Crear y cambiar |
| `git merge NOMBRE` | Fusionar rama |
| `git log --oneline` | Ver historial |
| `git diff` | Ver cambios no preparados |
| `git stash` | Guardar cambios temporalmente |
| `git stash pop` | Restaurar cambios guardados |

## Gotchas

### Forgot to add files before commit

```bash
git add archivo-olvidado
git commit --amend --no-edit
```

### Wrong commit message

```bash
git commit --amend -m "Mensaje correcto"
```

### Undo last commit (keep changes)

```bash
git reset --soft HEAD~1
```

### Undo last commit (discard changes)

```bash
git reset --hard HEAD~1
```

### Merge conflicts

Edita los archivos en conflicto (busca `<<<<<<<`), luego:
```bash
git add .
git commit -m "Resolver conflictos"
```

### Accidentally committed to wrong branch

```bash
# Mover commit a la rama correcta
git checkout rama-correcta
git cherry-pick COMMIT_HASH
git checkout rama-incorrecta
git reset --hard HEAD~1
```

## Next Steps

- [Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
- [Inicio rápido de GitHub](https://docs.github.com/en/get-started/quickstart)
- [Libro Pro Git](https://git-scm.com/book/en/v2)
- [Oh Shit, Git!?!](https://ohshitgit.com/)
