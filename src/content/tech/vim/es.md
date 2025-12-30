---
title: "Vim"
description: "Editor de texto modal para edicion ultrarapida - flujo de trabajo solo teclado, disponible en todo servidor"
template: "tool"
tags: ["editor", "terminal", "productivity"]
---

## TL;DR

**En resumen**: Vim es un editor de texto modal que es rápido, eficiente y está disponible en todos los sistemas Unix - dominarlo te hace más rápido editando texto para siempre.

**Valor principal**:
- Velocidad - flujo de trabajo solo con teclado, sin ratón necesario
- Ubicuidad - instalado en prácticamente todos los servidores
- Componibilidad - los comandos se combinan como un lenguaje
- Eficiencia - ediciones complejas con pocas pulsaciones

## Quick Start

### Open Vim

```bash
vim filename.txt    # Open/create file
vim                 # Open empty buffer
```

### Three Essential Modes

- **Modo normal** (por defecto): Navegar y ejecutar comandos
- **Modo inserción**: Escribir texto (presiona `i` para entrar)
- **Modo comando**: Ejecutar comandos (presiona `:` para entrar)

### Survival Basics

```
i          → Entrar en modo inserción (empezar a escribir)
Esc        → Volver al modo normal
:w         → Guardar archivo
:q         → Salir (falla si hay cambios sin guardar)
:wq        → Guardar y salir
:q!        → Salir sin guardar
```

### First Edit

```bash
vim hello.txt      # Open file
i                  # Enter insert mode
Hello, Vim!        # Type your text
Esc                # Return to normal mode
:wq                # Save and quit
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `h j k l` | Mover izquierda/abajo/arriba/derecha |
| `w` / `b` | Palabra siguiente/anterior |
| `0` / `$` | Inicio/fin de línea |
| `gg` / `G` | Ir a primera/última línea |
| `x` | Borrar carácter |
| `dd` | Borrar línea |
| `yy` | Copiar (yank) línea |
| `p` | Pegar después del cursor |
| `u` | Deshacer |
| `Ctrl+r` | Rehacer |
| `/pattern` | Buscar hacia adelante |
| `n` / `N` | Siguiente/anterior coincidencia |
| `ciw` | Cambiar palabra interior |
| `diw` | Borrar palabra interior |
| `.` | Repetir último comando |

**Atajos modo inserción**:

| Comando | Descripción |
|---------|-------------|
| `i` | Insertar antes del cursor |
| `a` | Insertar después del cursor |
| `o` | Nueva línea abajo |
| `O` | Nueva línea arriba |
| `A` | Insertar al final de línea |
| `I` | Insertar al inicio de línea |

## Gotchas

### Stuck in Vim (can't exit)

```
Esc        → Asegúrate de estar en modo normal
:q!        → Forzar salida sin guardar
```

### Can't type anything

```
# Probablemente estás en modo normal
i          → Entrar en modo inserción para escribir
```

### Search and replace

```vim
:%s/old/new/g     " Replace all in file
:%s/old/new/gc    " Replace with confirmation
:s/old/new/g      " Replace in current line
```

### Enable line numbers

```vim
:set number           " Show line numbers
:set relativenumber   " Relative line numbers

" Add to ~/.vimrc to make permanent
set number
```

### Paste from clipboard

```vim
" Before pasting external text:
:set paste
" Paste your text
:set nopaste
```

## Next Steps

- [Vim Adventures (Juego)](https://vim-adventures.com/)
- [OpenVim Tutorial](https://www.openvim.com/)
- [Vim Cheat Sheet](https://vim.rtorr.com/)
- [Neovim](https://neovim.io/)
