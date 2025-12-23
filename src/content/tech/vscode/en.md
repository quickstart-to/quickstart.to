---
title: "VS Code"
description: "Get started with Visual Studio Code editor in 5 minutes"
template: "tool"
tags: ["editor", "ide", "development"]
---

## TL;DR

**One-liner**: VS Code is a free, fast, and extensible code editor from Microsoft - the most popular editor for web development.

**Core Value**:
- Speed - opens instantly, handles large projects
- Extensions - 40,000+ extensions for any language
- IntelliSense - smart code completion
- Built-in Git - version control without leaving the editor

## Quick Start

### Install

macOS:
```bash
brew install --cask visual-studio-code
```

Windows:
```bash
winget install Microsoft.VisualStudioCode
```

Linux: Download from [code.visualstudio.com](https://code.visualstudio.com/)

### Open a Folder

```bash
code .           # Open current directory
code myproject   # Open specific folder
```

### Essential Extensions

Search in Extensions panel (Cmd/Ctrl+Shift+X):
- Prettier - Code formatter
- ESLint - JavaScript linting
- GitLens - Git supercharged
- Auto Rename Tag - HTML/JSX tag renaming

## Cheatsheet

| Shortcut (Mac / Win) | Action |
|---------------------|--------|
| `Cmd+P` / `Ctrl+P` | Quick Open file |
| `Cmd+Shift+P` / `Ctrl+Shift+P` | Command Palette |
| `Cmd+Shift+F` / `Ctrl+Shift+F` | Search in files |
| `Cmd+D` / `Ctrl+D` | Select next occurrence |
| `Cmd+/` / `Ctrl+/` | Toggle comment |
| `Alt+Up/Down` | Move line up/down |
| `Cmd+Shift+K` / `Ctrl+Shift+K` | Delete line |
| `Cmd+B` / `Ctrl+B` | Toggle sidebar |
| `` Ctrl+` `` | Toggle terminal |
| `Cmd+,` / `Ctrl+,` | Open settings |
| `F12` | Go to definition |
| `Shift+F12` | Find all references |
| `Cmd+Shift+L` / `Ctrl+Shift+L` | Select all occurrences |

## Gotchas

### Command 'code' not found

```bash
# Open VS Code, then:
# Cmd+Shift+P → "Shell Command: Install 'code' command in PATH"
```

### Sync settings across devices

```
1. Sign in with GitHub/Microsoft account
2. Settings → Turn on Settings Sync
```

### Change default terminal

```json
// settings.json (Cmd+, → click icon in top right)
{
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.defaultProfile.windows": "PowerShell"
}
```

### Format on save

```json
// settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### Disable telemetry

```json
// settings.json
{
  "telemetry.telemetryLevel": "off"
}
```

## Next Steps

- [VS Code Tips and Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- [Keyboard Shortcuts Reference](https://code.visualstudio.com/docs/getstarted/keybindings)
- [Extension Marketplace](https://marketplace.visualstudio.com/vscode)
- [VS Code Can Do That](https://vscodecandothat.com/)
