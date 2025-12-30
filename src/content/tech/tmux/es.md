---
title: "tmux"
description: "Multiplexor de terminal para sesiones persistentes - dividir paneles, desconectar/reconectar, esencial para trabajo remoto"
template: "tool"
tags: ["cli", "terminal", "productivity"]
---

## TL;DR

**Qué**: Multiplexor de terminal para gestionar múltiples sesiones de terminal.

**Por qué**: Sesiones persistentes, paneles divididos, separar/adjuntar, esencial para trabajo remoto.

## Quick Start

**Instalar**:
```bash
# macOS
brew install tmux

# Ubuntu/Debian
sudo apt install tmux

# Start
tmux
```

**Uso básico**:
```bash
tmux new -s mysession   # New named session
tmux attach -t mysession # Attach to session
tmux ls                 # List sessions
```

## Cheatsheet

Todos los comandos usan primero el prefijo `Ctrl+b`, luego:

| Tecla | Acción |
|-----|--------|
| `c` | Nueva ventana |
| `n` / `p` | Ventana siguiente/anterior |
| `%` | Dividir vertical |
| `"` | Dividir horizontal |
| `arrow` | Moverse entre paneles |
| `d` | Separar sesión |
| `x` | Cerrar panel |
| `z` | Alternar zoom del panel |

## Gotchas

### Session management

```bash
# Create named session
tmux new -s dev

# Detach (inside tmux)
Ctrl+b d

# List sessions
tmux ls

# Attach to session
tmux attach -t dev

# Kill session
tmux kill-session -t dev

# Rename session
Ctrl+b $
```

### Windows

```bash
# New window
Ctrl+b c

# Switch windows
Ctrl+b 0   # Window 0
Ctrl+b 1   # Window 1
Ctrl+b n   # Next
Ctrl+b p   # Previous

# Rename window
Ctrl+b ,

# Kill window
Ctrl+b &

# List windows
Ctrl+b w
```

### Panes

```bash
# Split panes
Ctrl+b %   # Vertical
Ctrl+b "   # Horizontal

# Navigate panes
Ctrl+b arrow

# Resize panes
Ctrl+b Ctrl+arrow

# Zoom pane (toggle fullscreen)
Ctrl+b z

# Kill pane
Ctrl+b x

# Move pane
Ctrl+b {   # Move left
Ctrl+b }   # Move right
```

### Configuration (~/.tmux.conf)

```bash
# Enable mouse
set -g mouse on

# Start windows at 1
set -g base-index 1
setw -g pane-base-index 1

# Better prefix
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# Easy split keys
bind | split-window -h
bind - split-window -v

# Vim-style pane navigation
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# Reload config
bind r source-file ~/.tmux.conf \; display "Reloaded!"

# Status bar
set -g status-style bg=black,fg=white
set -g status-left "[#S] "
```

### Copy mode

```bash
# Enter copy mode
Ctrl+b [

# Navigate (vim keys)
hjkl, Ctrl+u, Ctrl+d

# Start selection
Space

# Copy selection
Enter

# Paste
Ctrl+b ]
```

## Next Steps

- [tmux Manual](https://man7.org/linux/man-pages/man1/tmux.1.html) - Página de manual
- [Oh My Tmux](https://github.com/gpakosz/.tmux) - Config elegante
- [tmux Plugin Manager](https://github.com/tmux-plugins/tpm) - Plugins
- [tmux Cheat Sheet](https://tmuxcheatsheet.com/) - Referencia rápida
