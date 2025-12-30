---
title: "Vim"
description: "模式化文本编辑器 - 纯键盘操作、极速编辑，每台服务器都有"
template: "tool"
tags: ["editor", "terminal", "productivity"]
---

## TL;DR

**一句话**：Vim 是模式化文本编辑器，快速高效，在每台 Unix 系统上都有——掌握它让你永久提升编辑效率。

**核心价值**：
- 速度 - 纯键盘操作，不需要鼠标
- 无处不在 - 几乎所有服务器都有安装
- 可组合 - 命令像语言一样组合
- 高效 - 用很少的按键完成复杂编辑

## Quick Start

### 打开 Vim

```bash
vim filename.txt    # 打开/创建文件
vim                 # 打开空缓冲区
```

### 三个核心模式

- **普通模式**（默认）：导航和执行命令
- **插入模式**：输入文本（按 `i` 进入）
- **命令模式**：执行命令（按 `:` 进入）

### 生存必备

```
i          → 进入插入模式（开始输入）
Esc        → 返回普通模式
:w         → 保存文件
:q         → 退出（有未保存更改会失败）
:wq        → 保存并退出
:q!        → 不保存退出
```

### 第一次编辑

```bash
vim hello.txt      # 打开文件
i                  # 进入插入模式
Hello, Vim!        # 输入文本
Esc                # 返回普通模式
:wq                # 保存并退出
```

## Cheatsheet

| 命令 | 描述 |
|------|------|
| `h j k l` | 左/下/上/右移动 |
| `w` / `b` | 向前/向后移动一个单词 |
| `0` / `$` | 移动到行首/行尾 |
| `gg` / `G` | 跳到第一行/最后一行 |
| `x` | 删除字符 |
| `dd` | 删除行 |
| `yy` | 复制行 |
| `p` | 粘贴到光标后 |
| `u` | 撤销 |
| `Ctrl+r` | 重做 |
| `/pattern` | 向前搜索 |
| `n` / `N` | 下一个/上一个匹配 |
| `ciw` | 修改当前单词 |
| `diw` | 删除当前单词 |
| `.` | 重复上一个命令 |

**插入模式快捷键**：

| 命令 | 描述 |
|------|------|
| `i` | 在光标前插入 |
| `a` | 在光标后插入 |
| `o` | 在下方新建行 |
| `O` | 在上方新建行 |
| `A` | 在行尾插入 |
| `I` | 在行首插入 |

## Gotchas

### 卡在 Vim 里（无法退出）

```
Esc        → 确保在普通模式
:q!        → 强制退出不保存
```

### 无法输入任何内容

```
# 你可能在普通模式
i          → 进入插入模式开始输入
```

### 查找和替换

```vim
:%s/old/new/g     " 替换文件中所有
:%s/old/new/gc    " 带确认替换
:s/old/new/g      " 替换当前行
```

### 启用行号

```vim
:set number           " 显示行号
:set relativenumber   " 相对行号

" 添加到 ~/.vimrc 永久生效
set number
```

### 从剪贴板粘贴

```vim
" 粘贴外部文本前：
:set paste
" 粘贴你的文本
:set nopaste
```

## Next Steps

- [Vim Adventures（游戏）](https://vim-adventures.com/)
- [OpenVim 教程](https://www.openvim.com/)
- [Vim 速查表](https://vim.rtorr.com/)
- [Neovim](https://neovim.io/)
