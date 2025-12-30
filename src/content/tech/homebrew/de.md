---
title: "Homebrew"
description: "macOS Paketmanager - CLI-Tools und Apps mit einem Befehl installieren, Abhangigkeiten automatisch verwalten"
template: "tool"
tags: ["macos", "package-manager", "tools"]
---

## TL;DR

**Was**: Der fehlende Paketmanager für macOS (und Linux).

**Warum**: Software mit einem Befehl installieren, Abhängigkeiten automatisch verwalten.

## Quick Start

**Homebrew installieren**:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Zum PATH hinzufügen** (Apple Silicon Mac):

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Installation überprüfen**:

```bash
brew --version
```

**Ein Paket installieren**:

```bash
brew install wget
brew install git
brew install node
```

**GUI-Apps installieren (Casks)**:

```bash
brew install --cask visual-studio-code
brew install --cask google-chrome
brew install --cask docker
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `brew install pkg` | Ein Paket installieren |
| `brew uninstall pkg` | Ein Paket entfernen |
| `brew upgrade` | Alle Pakete upgraden |
| `brew upgrade pkg` | Bestimmtes Paket upgraden |
| `brew update` | Homebrew selbst aktualisieren |
| `brew list` | Installierte Pakete auflisten |
| `brew search text` | Nach Paketen suchen |
| `brew info pkg` | Paketinformationen |
| `brew doctor` | Probleme diagnostizieren |
| `brew cleanup` | Alte Versionen entfernen |
| `brew services list` | Hintergrunddienste auflisten |
| `brew services start pkg` | Einen Dienst starten |

## Gotchas

### Command not found after install

```bash
# Zum PATH hinzufügen (überprüfen Sie Ihre Shell)
# Für zsh (Standard unter macOS):
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile

# Für bash:
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile

# Dann neu laden:
source ~/.zprofile  # oder ~/.bash_profile
```

### Permission errors

```bash
# Homebrew-Verzeichnisberechtigungen korrigieren
sudo chown -R $(whoami) /opt/homebrew

# Oder für Intel Mac:
sudo chown -R $(whoami) /usr/local/Homebrew
```

### Package conflicts

```bash
# Konfliktierendes Paket unlinken
brew unlink pkg

# Das gewünschte Paket linken
brew link pkg

# Bei Bedarf erzwungen linken
brew link --overwrite pkg
```

### Brew doctor warnings

```bash
# Diagnose ausführen
brew doctor

# Warnungen über ungelinkte Kegs sind normalerweise sicher zu ignorieren
# Beheben Sie Probleme wie in der Ausgabe vorgeschlagen
```

## Next Steps

- [Homebrew Dokumentation](https://docs.brew.sh/)
- [Homebrew Formulae](https://formulae.brew.sh/)
- [Homebrew Cask](https://formulae.brew.sh/cask/)
- [Brewfile für Dotfiles](https://github.com/Homebrew/homebrew-bundle)
