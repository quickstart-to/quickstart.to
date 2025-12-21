---
title: "Git"
description: "Learn Git version control basics in 5 minutes"
tags: ["version-control", "devops"]
---

## Overview

Git is a distributed version control system that tracks changes in source code during software development.

## Prerequisites

- A computer with macOS, Windows, or Linux
- Terminal/command line access

## Steps

### Step 1: Install Git

**macOS**:
```bash
brew install git
```

**Windows**: Download [Git for Windows](https://git-scm.com/download/win)

**Linux**:
```bash
sudo apt install git  # Debian/Ubuntu
sudo dnf install git  # Fedora
```

### Step 2: Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### Step 3: Create Your First Repository

```bash
mkdir my-project && cd my-project
git init
echo "# My Project" > README.md
git add .
git commit -m "Initial commit"
```

## Summary

You now have Git installed and configured. Next steps: learn about branches, remotes, and GitHub.
