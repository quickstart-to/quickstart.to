---
title: "Vim"
description: "Modal text editor for lightning-fast editing - keyboard-only workflow available on every server"
template: "tool"
tags: ["editor", "terminal", "productivity"]
---

## TL;DR

**One-liner**: Vim is a modal text editor that's fast, efficient, and available on every Unix system - mastering it makes you faster at editing text forever.

**Core Value**:
- Speed - keyboard-only workflow, no mouse needed
- Ubiquity - installed on virtually every server
- Composability - commands combine like a language
- Efficiency - do complex edits with few keystrokes

## Quick Start

### Open Vim

```bash
vim filename.txt    # Open/create file
vim                 # Open empty buffer
```

### Three Essential Modes

- **Normal mode** (default): Navigate and run commands
- **Insert mode**: Type text (press `i` to enter)
- **Command mode**: Run commands (press `:` to enter)

### Survival Basics

```
i          → Enter insert mode (start typing)
Esc        → Return to normal mode
:w         → Save file
:q         → Quit (fails if unsaved changes)
:wq        → Save and quit
:q!        → Quit without saving
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
| `ciw` | Change inner word |
| `diw` | Delete inner word |
| `.` | Repeat last command |

**Insert mode shortcuts**:

| Command | Description |
|---------|-------------|
| `i` | Insert before cursor |
| `a` | Insert after cursor |
| `o` | New line below |
| `O` | New line above |
| `A` | Insert at end of line |
| `I` | Insert at start of line |

## Gotchas

### Stuck in Vim (can't exit)

```
Esc        → Make sure you're in normal mode
:q!        → Force quit without saving
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

- [Vim Adventures (Game)](https://vim-adventures.com/)
- [OpenVim Tutorial](https://www.openvim.com/)
- [Vim Cheat Sheet](https://vim.rtorr.com/)
- [Neovim](https://neovim.io/)
