---
title: "Zsh"
description: "Get started with Zsh shell in 5 minutes"
template: "tool"
tags: ["cli", "shell", "productivity"]
---

## TL;DR

**What**: Z shell, an extended Bourne shell with many improvements.

**Why**: Better completion, plugins, themes, spelling correction, powerful scripting.

## Quick Start

**Install**:
```bash
# macOS (default since Catalina)
# Already installed

# Ubuntu/Debian
sudo apt install zsh

# Set as default shell
chsh -s $(which zsh)
```

**Install Oh My Zsh** (recommended):
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Cheatsheet

| Feature | Description |
|---------|-------------|
| `Tab` | Auto-completion |
| `Ctrl+R` | History search |
| `cd -` | Previous directory |
| `!!` | Last command |
| `!$` | Last argument |
| `**/*.js` | Recursive glob |

## Gotchas

### Configuration (~/.zshrc)

```bash
# Theme
ZSH_THEME="robbyrussell"

# Plugins
plugins=(
    git
    docker
    npm
    zsh-autosuggestions
    zsh-syntax-highlighting
)

# Aliases
alias ll='ls -la'
alias gs='git status'
alias gc='git commit'

# Path
export PATH="$HOME/bin:$PATH"

# Editor
export EDITOR='vim'
```

### Useful plugins

```bash
# Install zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Install zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# Add to plugins in .zshrc
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

### History

```bash
# History settings in .zshrc
HISTSIZE=10000
SAVEHIST=10000
HISTFILE=~/.zsh_history

setopt SHARE_HISTORY          # Share between sessions
setopt HIST_IGNORE_DUPS       # Ignore duplicates
setopt HIST_IGNORE_SPACE      # Ignore commands starting with space

# Search history
Ctrl+R                        # Reverse search
history | grep "pattern"      # Search in history
!pattern                      # Run last command starting with pattern
```

### Glob patterns

```bash
# Recursive glob
ls **/*.js              # All .js files in subdirectories

# Qualifiers
ls *(.)                 # Files only
ls *(/)                 # Directories only
ls *(@)                 # Symlinks only
ls *(om[1,5])           # 5 most recent files

# Extended globs
ls ^*.txt               # Not .txt files
ls *.{js,ts}            # .js or .ts files
```

### Custom functions

```bash
# In .zshrc
mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Extract any archive
extract() {
    case $1 in
        *.tar.bz2) tar xjf $1 ;;
        *.tar.gz)  tar xzf $1 ;;
        *.zip)     unzip $1 ;;
        *.gz)      gunzip $1 ;;
        *)         echo "Unknown format" ;;
    esac
}

# Quick git add, commit, push
gac() {
    git add .
    git commit -m "$1"
    git push
}
```

### Powerlevel10k theme

```bash
# Install
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# Set in .zshrc
ZSH_THEME="powerlevel10k/powerlevel10k"

# Configure
p10k configure
```

## Next Steps

- [Zsh Documentation](https://zsh.sourceforge.io/Doc/) - Official docs
- [Oh My Zsh](https://ohmyz.sh/) - Framework
- [Powerlevel10k](https://github.com/romkatv/powerlevel10k) - Theme
- [Zsh Lovers](https://grml.org/zsh/zsh-lovers.html) - Tips and tricks
