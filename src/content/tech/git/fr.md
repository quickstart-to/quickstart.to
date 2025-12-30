---
title: "Git"
description: "Apprenez les bases du contrôle de version Git en 5 minutes"
template: "tool"
tags: ["version-control", "devops"]
---

## TL;DR

**En une ligne**: Git suit chaque modification de votre code, permet d'annuler les erreurs et rend la collaboration possible.

**Valeur principale**:
- Historique - chaque changement est enregistré
- Annuler - revenir à n'importe quel état précédent
- Branches - travailler sur des fonctionnalités sans casser le code principal
- Collaboration - fusionner le travail de plusieurs personnes

## Quick Start

### Install

macOS:
```bash
brew install git
```

Windows: Télécharger [Git pour Windows](https://git-scm.com/download/win)

Linux:
```bash
sudo apt install git  # Debian/Ubuntu
```

### Configure

```bash
git config --global user.name "Votre Nom"
git config --global user.email "vous@example.com"
```

### First Repo

```bash
mkdir monprojet && cd monprojet
git init
echo "# Mon Projet" > README.md
git add .
git commit -m "Commit initial"
```

## Cheatsheet

| Commande | Description |
|----------|-------------|
| `git init` | Créer un nouveau repo |
| `git clone URL` | Cloner un repo |
| `git status` | Vérifier l'état actuel |
| `git add FICHIER` | Stager les changements |
| `git add .` | Stager tous les changements |
| `git commit -m "msg"` | Commiter les changements |
| `git push` | Pousser vers le remote |
| `git pull` | Tirer depuis le remote |
| `git branch` | Lister les branches |
| `git branch NOM` | Créer une branche |
| `git checkout NOM` | Changer de branche |
| `git checkout -b NOM` | Créer et changer |
| `git merge NOM` | Fusionner une branche |
| `git log --oneline` | Voir l'historique |
| `git diff` | Voir les changements non stagés |
| `git stash` | Sauvegarder temporairement |
| `git stash pop` | Restaurer les changements sauvegardés |

## Gotchas

### Forgot to add files before commit

```bash
git add fichier-oublié
git commit --amend --no-edit
```

### Wrong commit message

```bash
git commit --amend -m "Message correct"
```

### Undo last commit (keep changes)

```bash
git reset --soft HEAD~1
```

### Undo last commit (discard changes)

```bash
git reset --hard HEAD~1
```

### Merge conflicts

Éditez les fichiers en conflit (cherchez `<<<<<<<`), puis:
```bash
git add .
git commit -m "Résoudre les conflits"
```

### Accidentally committed to wrong branch

```bash
# Déplacer le commit vers la bonne branche
git checkout bonne-branche
git cherry-pick COMMIT_HASH
git checkout mauvaise-branche
git reset --hard HEAD~1
```

## Next Steps

- [Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
- [Démarrage rapide GitHub](https://docs.github.com/en/get-started/quickstart)
- [Livre Pro Git](https://git-scm.com/book/en/v2)
- [Oh Shit, Git!?!](https://ohshitgit.com/)
