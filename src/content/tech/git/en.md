---
title: "Git"
description: "Track code changes, collaborate with teams, and maintain project history with distributed version control"
template: "tool"
tags: ["version-control", "devops"]
---

## TL;DR

**One-liner**: Git tracks every change to your code, lets you undo mistakes, and makes collaboration possible.

**Core Value**:
- History - every change is recorded
- Undo - go back to any previous state
- Branches - work on features without breaking main code
- Collaboration - merge work from multiple people

## Quick Start

### Install

macOS:
```bash
brew install git
```

Windows: Download [Git for Windows](https://git-scm.com/download/win)

Linux:
```bash
sudo apt install git  # Debian/Ubuntu
```

### Configure

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### First Repo

```bash
mkdir myproject && cd myproject
git init
echo "# My Project" > README.md
git add .
git commit -m "Initial commit"
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `git init` | Create new repo |
| `git clone URL` | Clone a repo |
| `git status` | Check current state |
| `git add FILE` | Stage changes |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit changes |
| `git push` | Push to remote |
| `git pull` | Pull from remote |
| `git branch` | List branches |
| `git branch NAME` | Create branch |
| `git checkout NAME` | Switch branch |
| `git checkout -b NAME` | Create and switch |
| `git merge NAME` | Merge branch |
| `git log --oneline` | View history |
| `git diff` | View unstaged changes |
| `git stash` | Save changes temporarily |
| `git stash pop` | Restore stashed changes |

## Gotchas

### Forgot to add files before commit

```bash
git add forgotten-file
git commit --amend --no-edit
```

### Wrong commit message

```bash
git commit --amend -m "Correct message"
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

Edit the conflicting files (look for `<<<<<<<`), then:
```bash
git add .
git commit -m "Resolve conflicts"
```

### Accidentally committed to wrong branch

```bash
# Move commit to correct branch
git checkout correct-branch
git cherry-pick COMMIT_HASH
git checkout wrong-branch
git reset --hard HEAD~1
```

## Next Steps

- [Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
- [GitHub Quickstart](https://docs.github.com/en/get-started/quickstart)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [Oh Shit, Git!?!](https://ohshitgit.com/)
