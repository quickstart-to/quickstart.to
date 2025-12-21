---
title: "VS Code"
description: "Get started with Visual Studio Code editor in 5 minutes"
tags: ["editor", "ide", "development"]
---

## TL;DR

**What**: A free, powerful, and extensible code editor from Microsoft.

**Why**: Fast, cross-platform, excellent extensions, built-in Git, and integrated terminal.

## Quick Start

**Install**:

macOS: `brew install --cask visual-studio-code`

Windows: `winget install Microsoft.VisualStudioCode`

Linux: Download from [code.visualstudio.com](https://code.visualstudio.com/)

**Open a folder**:
```bash
code .           # Open current directory
code myproject   # Open specific folder
```

**Essential extensions** (search in Extensions panel: Cmd/Ctrl+Shift+X):
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
// settings.json
{
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.defaultProfile.windows": "PowerShell"
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
