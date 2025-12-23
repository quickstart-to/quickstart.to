---
title: "tmux"
description: "5 分钟快速入门 tmux 终端复用器"
template: "tool"
tags: ["cli", "terminal", "productivity"]
---

## TL;DR

**是什么**：用于管理多个终端会话的终端复用器。

**为什么用**：持久会话、分割窗格、分离/附加、远程工作必备。

## Quick Start

**安装**：
```bash
# macOS
brew install tmux

# Ubuntu/Debian
sudo apt install tmux

# 启动
tmux
```

**基本用法**：
```bash
tmux new -s mysession   # 新建命名会话
tmux attach -t mysession # 附加到会话
tmux ls                 # 列出会话
```

## Cheatsheet

所有命令先按前缀 `Ctrl+b`，然后：

| 按键 | 动作 |
|-----|--------|
| `c` | 新建窗口 |
| `n` / `p` | 下一个/上一个窗口 |
| `%` | 垂直分割 |
| `"` | 水平分割 |
| `方向键` | 在窗格间移动 |
| `d` | 分离会话 |
| `x` | 关闭窗格 |
| `z` | 切换窗格缩放 |

## Gotchas

### 会话管理

```bash
# 创建命名会话
tmux new -s dev

# 分离（在 tmux 内）
Ctrl+b d

# 列出会话
tmux ls

# 附加到会话
tmux attach -t dev

# 关闭会话
tmux kill-session -t dev

# 重命名会话
Ctrl+b $
```

### 窗口

```bash
# 新建窗口
Ctrl+b c

# 切换窗口
Ctrl+b 0   # 窗口 0
Ctrl+b 1   # 窗口 1
Ctrl+b n   # 下一个
Ctrl+b p   # 上一个

# 重命名窗口
Ctrl+b ,

# 关闭窗口
Ctrl+b &

# 列出窗口
Ctrl+b w
```

### 窗格

```bash
# 分割窗格
Ctrl+b %   # 垂直
Ctrl+b "   # 水平

# 导航窗格
Ctrl+b 方向键

# 调整窗格大小
Ctrl+b Ctrl+方向键

# 缩放窗格（切换全屏）
Ctrl+b z

# 关闭窗格
Ctrl+b x

# 移动窗格
Ctrl+b {   # 向左移动
Ctrl+b }   # 向右移动
```

### 配置（~/.tmux.conf）

```bash
# 启用鼠标
set -g mouse on

# 窗口从 1 开始
set -g base-index 1
setw -g pane-base-index 1

# 更好的前缀
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# 简单分割快捷键
bind | split-window -h
bind - split-window -v

# Vim 风格窗格导航
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# 重载配置
bind r source-file ~/.tmux.conf \; display "Reloaded!"

# 状态栏
set -g status-style bg=black,fg=white
set -g status-left "[#S] "
```

### 复制模式

```bash
# 进入复制模式
Ctrl+b [

# 导航（vim 按键）
hjkl, Ctrl+u, Ctrl+d

# 开始选择
Space

# 复制选择
Enter

# 粘贴
Ctrl+b ]
```

## Next Steps

- [tmux 手册](https://man7.org/linux/man-pages/man1/tmux.1.html) - Man 页面
- [Oh My Tmux](https://github.com/gpakosz/.tmux) - 美化配置
- [tmux 插件管理器](https://github.com/tmux-plugins/tpm) - 插件
- [tmux 速查表](https://tmuxcheatsheet.com/) - 快速参考
