---
title: "Vim"
description: "Get started with Vim text editor essentials"
tags: ["editor", "terminal", "productivity"]
---

## TL;DR

**What**: Modal text editor - fast, efficient, available everywhere.

**Why**: Edit files on any server, powerful keyboard-driven workflow.

## Quick Start

**Open Vim**:

```bash
vim filename.txt    # Open/create file
vim                 # Open empty buffer
```

**The three essential modes**:

- **Normal mode** (default): Navigate and run commands
- **Insert mode**: Type text (press `i` to enter)
- **Command mode**: Run commands (press `:` to enter)

**Survival basics**:

```
i          → Enter insert mode (start typing)
Esc        → Return to normal mode
:w         → Save file
:q         → Quit (fails if unsaved changes)
:wq        → Save and quit
:q!        → Quit without saving
```

**First edit**:

```bash
vim hello.txt      # Open file
i                  # Enter insert mode
Hello, Vim!        # Type your text
Esc                # Return to normal mode
:wq                # Save and quit
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `h j k l` | Move left/down/up/right |
| `w` / `b` | Move word forward/back |
| `0` / `$` | Move to line start/end |
| `gg` / `G` | Go to first/last line |
| `x` | Delete character |
| `dd` | Delete line |
| `yy` | Copy (yank) line |
| `p` | Paste after cursor |
| `u` | Undo |
| `Ctrl+r` | Redo |
| `/pattern` | Search forward |
| `n` / `N` | Next/previous match |

**Insert mode shortcuts**:

| Command | Description |
|---------|-------------|
| `i` | Insert before cursor |
| `a` | Insert after cursor |
| `o` | New line below |
| `O` | New line above |
| `A` | Insert at end of line |

## Gotchas

### Stuck in Vim (can't exit)

```
Esc        → Make sure you're in normal mode
:q!        → Force quit without saving
```

### Accidentally in replace mode

```
Esc        → Return to normal mode
u          → Undo changes
```

### Can't type anything

```
# You're probably in normal mode
i          → Enter insert mode to type
```

### Search and replace

```vim
:%s/old/new/g     " Replace all in file
:%s/old/new/gc    " Replace with confirmation
:s/old/new/g      " Replace in current line
```

### Enable line numbers

```vim
:set number       " Show line numbers
:set relativenumber " Relative line numbers

" Add to ~/.vimrc to make permanent
set number
```

## Next Steps

- [Vim Adventures (Game)](https://vim-adventures.com/)
- [OpenVim Tutorial](https://www.openvim.com/)
- [Vim Cheat Sheet](https://vim.rtorr.com/)
- [Neovim (Modern Fork)](https://neovim.io/)
