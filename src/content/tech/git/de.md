---
title: "Git"
description: "Codeänderungen verfolgen, mit Teams zusammenarbeiten und Projekthistorie mit verteilter Versionskontrolle pflegen"
template: "tool"
tags: ["version-control", "devops"]
---

## TL;DR

**Eine Zeile**: Git verfolgt jede Änderung an Ihrem Code, ermöglicht es Fehler rückgängig zu machen und macht Zusammenarbeit möglich.

**Kernwert**:
- Verlauf - jede Änderung wird aufgezeichnet
- Rückgängig - zu jedem vorherigen Zustand zurückkehren
- Branches - an Features arbeiten ohne den Hauptcode zu beschädigen
- Zusammenarbeit - Arbeit von mehreren Personen zusammenführen

## Quick Start

### Install

macOS:
```bash
brew install git
```

Windows: [Git für Windows](https://git-scm.com/download/win) herunterladen

Linux:
```bash
sudo apt install git  # Debian/Ubuntu
```

### Configure

```bash
git config --global user.name "Ihr Name"
git config --global user.email "sie@example.com"
```

### First Repo

```bash
mkdir meinprojekt && cd meinprojekt
git init
echo "# Mein Projekt" > README.md
git add .
git commit -m "Erster Commit"
```

## Cheatsheet

| Befehl | Beschreibung |
|--------|--------------|
| `git init` | Neues Repo erstellen |
| `git clone URL` | Repo klonen |
| `git status` | Aktuellen Zustand prüfen |
| `git add DATEI` | Änderungen stagen |
| `git add .` | Alle Änderungen stagen |
| `git commit -m "msg"` | Änderungen committen |
| `git push` | Zum Remote pushen |
| `git pull` | Vom Remote pullen |
| `git branch` | Branches auflisten |
| `git branch NAME` | Branch erstellen |
| `git checkout NAME` | Branch wechseln |
| `git checkout -b NAME` | Erstellen und wechseln |
| `git merge NAME` | Branch mergen |
| `git log --oneline` | Verlauf anzeigen |
| `git diff` | Ungestagete Änderungen anzeigen |
| `git stash` | Änderungen temporär speichern |
| `git stash pop` | Gespeicherte Änderungen wiederherstellen |

## Gotchas

### Forgot to add files before commit

```bash
git add vergessene-datei
git commit --amend --no-edit
```

### Wrong commit message

```bash
git commit --amend -m "Korrekte Nachricht"
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

Bearbeiten Sie die konfliktbehafteten Dateien (suchen Sie nach `<<<<<<<`), dann:
```bash
git add .
git commit -m "Konflikte lösen"
```

### Accidentally committed to wrong branch

```bash
# Commit zum richtigen Branch verschieben
git checkout richtiger-branch
git cherry-pick COMMIT_HASH
git checkout falscher-branch
git reset --hard HEAD~1
```

## Next Steps

- [Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
- [GitHub Schnellstart](https://docs.github.com/en/get-started/quickstart)
- [Pro Git Buch](https://git-scm.com/book/en/v2)
- [Oh Shit, Git!?!](https://ohshitgit.com/)
