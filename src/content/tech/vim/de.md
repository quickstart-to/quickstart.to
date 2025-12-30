---
title: "Vim"
description: "Starten Sie mit dem Vim-Texteditor Grundlagen"
template: "tool"
tags: ["editor", "terminal", "productivity"]
---

## TL;DR

**Kurzfassung**: Vim ist ein modaler Texteditor, der schnell, effizient und auf jedem Unix-System verfügbar ist - ihn zu beherrschen macht Sie beim Textbearbeiten für immer schneller.

**Kernwert**:
- Geschwindigkeit - nur Tastatur-Workflow, keine Maus nötig
- Allgegenwärtigkeit - auf praktisch jedem Server installiert
- Kombinierbarkeit - Befehle kombinieren sich wie eine Sprache
- Effizienz - komplexe Bearbeitungen mit wenigen Tastenanschlägen

## Quick Start

### Open Vim

```bash
vim filename.txt    # Open/create file
vim                 # Open empty buffer
```

### Three Essential Modes

- **Normal-Modus** (Standard): Navigieren und Befehle ausführen
- **Insert-Modus**: Text eingeben (drücken Sie `i` zum Betreten)
- **Befehlsmodus**: Befehle ausführen (drücken Sie `:` zum Betreten)

### Survival Basics

```
i          → Insert-Modus betreten (tippen starten)
Esc        → Zurück zum Normal-Modus
:w         → Datei speichern
:q         → Beenden (schlägt bei ungespeicherten Änderungen fehl)
:wq        → Speichern und beenden
:q!        → Beenden ohne zu speichern
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

| Befehl | Beschreibung |
|---------|-------------|
| `h j k l` | Nach links/unten/oben/rechts bewegen |
| `w` / `b` | Wort vorwärts/rückwärts |
| `0` / `$` | Zum Zeilenanfang/-ende |
| `gg` / `G` | Zur ersten/letzten Zeile |
| `x` | Zeichen löschen |
| `dd` | Zeile löschen |
| `yy` | Zeile kopieren (yank) |
| `p` | Nach Cursor einfügen |
| `u` | Rückgängig |
| `Ctrl+r` | Wiederholen |
| `/pattern` | Vorwärts suchen |
| `n` / `N` | Nächster/vorheriger Treffer |
| `ciw` | Inneres Wort ändern |
| `diw` | Inneres Wort löschen |
| `.` | Letzten Befehl wiederholen |

**Insert-Modus Shortcuts**:

| Befehl | Beschreibung |
|---------|-------------|
| `i` | Vor Cursor einfügen |
| `a` | Nach Cursor einfügen |
| `o` | Neue Zeile unten |
| `O` | Neue Zeile oben |
| `A` | Am Zeilenende einfügen |
| `I` | Am Zeilenanfang einfügen |

## Gotchas

### Stuck in Vim (can't exit)

```
Esc        → Sicherstellen, dass Sie im Normal-Modus sind
:q!        → Erzwungenes Beenden ohne Speichern
```

### Can't type anything

```
# Sie sind wahrscheinlich im Normal-Modus
i          → Insert-Modus betreten zum Tippen
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

- [Vim Adventures (Spiel)](https://vim-adventures.com/)
- [OpenVim Tutorial](https://www.openvim.com/)
- [Vim Cheat Sheet](https://vim.rtorr.com/)
- [Neovim](https://neovim.io/)
