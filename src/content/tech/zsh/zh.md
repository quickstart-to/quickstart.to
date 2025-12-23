---
title: "Zsh"
description: "5 分钟快速入门 Zsh shell"
template: "tool"
tags: ["cli", "shell", "productivity"]
---

## TL;DR

**是什么**：Z shell，一个扩展的 Bourne shell，有很多改进。

**为什么用**：更好的补全、插件、主题、拼写纠正、强大的脚本。

## Quick Start

**安装**：
```bash
# macOS（Catalina 起默认）
# 已安装

# Ubuntu/Debian
sudo apt install zsh

# 设为默认 shell
chsh -s $(which zsh)
```

**安装 Oh My Zsh**（推荐）：
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Cheatsheet

| 功能 | 描述 |
|---------|-------------|
| `Tab` | 自动补全 |
| `Ctrl+R` | 历史搜索 |
| `cd -` | 上一个目录 |
| `!!` | 上一条命令 |
| `!$` | 上一个参数 |
| `**/*.js` | 递归通配 |

## Gotchas

### 配置（~/.zshrc）

```bash
# 主题
ZSH_THEME="robbyrussell"

# 插件
plugins=(
    git
    docker
    npm
    zsh-autosuggestions
    zsh-syntax-highlighting
)

# 别名
alias ll='ls -la'
alias gs='git status'
alias gc='git commit'

# 路径
export PATH="$HOME/bin:$PATH"

# 编辑器
export EDITOR='vim'
```

### 有用的插件

```bash
# 安装 zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# 安装 zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 在 .zshrc 中添加到 plugins
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

### 历史记录

```bash
# .zshrc 中的历史设置
HISTSIZE=10000
SAVEHIST=10000
HISTFILE=~/.zsh_history

setopt SHARE_HISTORY          # 会话间共享
setopt HIST_IGNORE_DUPS       # 忽略重复
setopt HIST_IGNORE_SPACE      # 忽略空格开头的命令

# 搜索历史
Ctrl+R                        # 反向搜索
history | grep "pattern"      # 在历史中搜索
!pattern                      # 运行以 pattern 开头的上一条命令
```

### 通配符模式

```bash
# 递归通配
ls **/*.js              # 子目录中所有 .js 文件

# 限定符
ls *(.)                 # 仅文件
ls *(/)                 # 仅目录
ls *(@)                 # 仅符号链接
ls *(om[1,5])           # 最近 5 个文件

# 扩展通配
ls ^*.txt               # 非 .txt 文件
ls *.{js,ts}            # .js 或 .ts 文件
```

### 自定义函数

```bash
# 在 .zshrc 中
mkcd() {
    mkdir -p "$1" && cd "$1"
}

# 解压任何压缩包
extract() {
    case $1 in
        *.tar.bz2) tar xjf $1 ;;
        *.tar.gz)  tar xzf $1 ;;
        *.zip)     unzip $1 ;;
        *.gz)      gunzip $1 ;;
        *)         echo "Unknown format" ;;
    esac
}

# 快速 git add, commit, push
gac() {
    git add .
    git commit -m "$1"
    git push
}
```

### Powerlevel10k 主题

```bash
# 安装
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# 在 .zshrc 中设置
ZSH_THEME="powerlevel10k/powerlevel10k"

# 配置
p10k configure
```

## Next Steps

- [Zsh 文档](https://zsh.sourceforge.io/Doc/) - 官方文档
- [Oh My Zsh](https://ohmyz.sh/) - 框架
- [Powerlevel10k](https://github.com/romkatv/powerlevel10k) - 主题
- [Zsh Lovers](https://grml.org/zsh/zsh-lovers.html) - 技巧
