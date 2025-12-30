---
title: "Vim"
description: "Démarrez avec les essentiels de l'éditeur de texte Vim"
template: "tool"
tags: ["editor", "terminal", "productivity"]
---

## TL;DR

**En bref** : Vim est un éditeur de texte modal, rapide, efficace et disponible sur tous les systèmes Unix - le maîtriser vous rend plus rapide pour éditer du texte pour toujours.

**Valeur principale** :
- Vitesse - workflow clavier uniquement, pas de souris nécessaire
- Ubiquité - installé sur pratiquement tous les serveurs
- Composabilité - les commandes se combinent comme un langage
- Efficacité - éditions complexes avec peu de frappes

## Quick Start

### Open Vim

```bash
vim filename.txt    # Open/create file
vim                 # Open empty buffer
```

### Three Essential Modes

- **Mode normal** (par défaut) : Naviguer et exécuter des commandes
- **Mode insertion** : Taper du texte (appuyez sur `i` pour entrer)
- **Mode commande** : Exécuter des commandes (appuyez sur `:` pour entrer)

### Survival Basics

```
i          → Entrer en mode insertion (commencer à taper)
Esc        → Retourner en mode normal
:w         → Sauvegarder le fichier
:q         → Quitter (échoue si changements non sauvegardés)
:wq        → Sauvegarder et quitter
:q!        → Quitter sans sauvegarder
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

| Commande | Description |
|---------|-------------|
| `h j k l` | Déplacer gauche/bas/haut/droite |
| `w` / `b` | Mot suivant/précédent |
| `0` / `$` | Début/fin de ligne |
| `gg` / `G` | Aller à la première/dernière ligne |
| `x` | Supprimer caractère |
| `dd` | Supprimer ligne |
| `yy` | Copier (yank) ligne |
| `p` | Coller après le curseur |
| `u` | Annuler |
| `Ctrl+r` | Refaire |
| `/pattern` | Rechercher vers l'avant |
| `n` / `N` | Correspondance suivante/précédente |
| `ciw` | Changer le mot intérieur |
| `diw` | Supprimer le mot intérieur |
| `.` | Répéter la dernière commande |

**Raccourcis mode insertion** :

| Commande | Description |
|---------|-------------|
| `i` | Insérer avant le curseur |
| `a` | Insérer après le curseur |
| `o` | Nouvelle ligne en dessous |
| `O` | Nouvelle ligne au-dessus |
| `A` | Insérer en fin de ligne |
| `I` | Insérer en début de ligne |

## Gotchas

### Stuck in Vim (can't exit)

```
Esc        → Assurez-vous d'être en mode normal
:q!        → Forcer la sortie sans sauvegarder
```

### Can't type anything

```
# Vous êtes probablement en mode normal
i          → Entrer en mode insertion pour taper
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

- [Vim Adventures (Jeu)](https://vim-adventures.com/)
- [OpenVim Tutorial](https://www.openvim.com/)
- [Vim Cheat Sheet](https://vim.rtorr.com/)
- [Neovim](https://neovim.io/)
