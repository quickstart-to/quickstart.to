---
title: "Homebrew"
description: "macOS package manager - install CLI tools and apps with one command, manage dependencies automatically"
template: "tool"
tags: ["macos", "package-manager", "tools"]
---

## TL;DR

**What**: The missing package manager for macOS (and Linux).

**Why**: Install software with one command, manage dependencies automatically.

## Quick Start

**Install Homebrew**:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Add to PATH** (Apple Silicon Mac):

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Verify installation**:

```bash
brew --version
```

**Install a package**:

```bash
brew install wget
brew install git
brew install node
```

**Install GUI apps (Casks)**:

```bash
brew install --cask visual-studio-code
brew install --cask google-chrome
brew install --cask docker
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `brew install pkg` | Install a package |
| `brew uninstall pkg` | Remove a package |
| `brew upgrade` | Upgrade all packages |
| `brew upgrade pkg` | Upgrade specific package |
| `brew update` | Update Homebrew itself |
| `brew list` | List installed packages |
| `brew search text` | Search for packages |
| `brew info pkg` | Package information |
| `brew doctor` | Diagnose issues |
| `brew cleanup` | Remove old versions |
| `brew services list` | List background services |
| `brew services start pkg` | Start a service |

## Gotchas

### Command not found after install

```bash
# Add to PATH (check your shell)
# For zsh (default on macOS):
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile

# For bash:
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile

# Then reload:
source ~/.zprofile  # or ~/.bash_profile
```

### Permission errors

```bash
# Fix Homebrew directory permissions
sudo chown -R $(whoami) /opt/homebrew

# Or for Intel Mac:
sudo chown -R $(whoami) /usr/local/Homebrew
```

### Package conflicts

```bash
# Unlink conflicting package
brew unlink pkg

# Link the one you want
brew link pkg

# Force link if needed
brew link --overwrite pkg
```

### Brew doctor warnings

```bash
# Run diagnostics
brew doctor

# Usually safe to ignore warning about unlinked kegs
# Fix issues as suggested by the output
```

## Next Steps

- [Homebrew Documentation](https://docs.brew.sh/)
- [Homebrew Formulae](https://formulae.brew.sh/)
- [Homebrew Cask](https://formulae.brew.sh/cask/)
- [Brewfile for dotfiles](https://github.com/Homebrew/homebrew-bundle)
