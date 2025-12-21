---
title: "Git"
description: "Learn Git version control basics in 5 minutes"
tags: ["version-control", "devops"]
---

## TL;DR

**What**: Track code changes and collaborate with others.

**Why**: Never lose work, undo mistakes, work with a team.

## Quick Start

**Install**:

macOS:
```bash
brew install git
```

Windows: Download [Git for Windows](https://git-scm.com/download/win)

Linux:
```bash
sudo apt install git  # Debian/Ubuntu
```

**Configure**:
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

**First repo**:
```bash
git init
git add .
git commit -m "Initial commit"
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `git init` | Create a new repo |
| `git clone URL` | Clone a repo |
| `git status` | Check current state |
| `git add FILE` | Stage changes |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit changes |
| `git push` | Push to remote |
| `git pull` | Pull from remote |
| `git log` | View history |
| `git diff` | View changes |

## Gotchas

### Forgot to add files before commit

```bash
git add forgotten-file
git commit --amend
```

### Wrong commit message

```bash
git commit --amend -m "New message"
```

### Undo last commit (keep changes)

```bash
git reset --soft HEAD~1
```

### Merge conflicts

Edit the conflicting files, then:
```bash
git add .
git commit
```

## Next Steps

- [Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
- [GitHub Quickstart](https://docs.github.com/en/get-started/quickstart)
- [Pro Git Book](https://git-scm.com/book/en/v2)
