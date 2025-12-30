---
title: "Homebrew"
description: "Gestionnaire de paquets macOS - installer outils CLI et apps en une commande, gerer les dependances automatiquement"
template: "tool"
tags: ["macos", "package-manager", "tools"]
---

## TL;DR

**Quoi** : Le gestionnaire de paquets manquant pour macOS (et Linux).

**Pourquoi** : Installer des logiciels en une commande, gérer les dépendances automatiquement.

## Quick Start

**Installer Homebrew** :

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Ajouter au PATH** (Mac Apple Silicon) :

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Vérifier l'installation** :

```bash
brew --version
```

**Installer un paquet** :

```bash
brew install wget
brew install git
brew install node
```

**Installer des apps GUI (Casks)** :

```bash
brew install --cask visual-studio-code
brew install --cask google-chrome
brew install --cask docker
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `brew install pkg` | Installer un paquet |
| `brew uninstall pkg` | Supprimer un paquet |
| `brew upgrade` | Mettre à jour tous les paquets |
| `brew upgrade pkg` | Mettre à jour un paquet spécifique |
| `brew update` | Mettre à jour Homebrew lui-même |
| `brew list` | Lister les paquets installés |
| `brew search text` | Rechercher des paquets |
| `brew info pkg` | Informations sur un paquet |
| `brew doctor` | Diagnostiquer les problèmes |
| `brew cleanup` | Supprimer les anciennes versions |
| `brew services list` | Lister les services en arrière-plan |
| `brew services start pkg` | Démarrer un service |

## Gotchas

### Command not found after install

```bash
# Ajouter au PATH (vérifiez votre shell)
# Pour zsh (par défaut sur macOS) :
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile

# Pour bash :
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile

# Puis recharger :
source ~/.zprofile  # ou ~/.bash_profile
```

### Permission errors

```bash
# Corriger les permissions du répertoire Homebrew
sudo chown -R $(whoami) /opt/homebrew

# Ou pour Mac Intel :
sudo chown -R $(whoami) /usr/local/Homebrew
```

### Package conflicts

```bash
# Délier le paquet en conflit
brew unlink pkg

# Lier celui que vous voulez
brew link pkg

# Forcer le lien si nécessaire
brew link --overwrite pkg
```

### Brew doctor warnings

```bash
# Exécuter le diagnostic
brew doctor

# Les avertissements sur les kegs non liés sont généralement sans danger
# Corrigez les problèmes comme suggéré dans la sortie
```

## Next Steps

- [Documentation Homebrew](https://docs.brew.sh/)
- [Homebrew Formulae](https://formulae.brew.sh/)
- [Homebrew Cask](https://formulae.brew.sh/cask/)
- [Brewfile pour dotfiles](https://github.com/Homebrew/homebrew-bundle)
