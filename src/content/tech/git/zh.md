---
title: "Git"
description: "5 分钟学会 Git 版本控制基础"
tags: ["version-control", "devops"]
---

## TL;DR

**What**: 跟踪代码变更，与他人协作。

**Why**: 永不丢失代码，可以撤销错误，方便团队协作。

## Quick Start

**安装**:

macOS:
```bash
brew install git
```

Windows: 下载 [Git for Windows](https://git-scm.com/download/win)

Linux:
```bash
sudo apt install git  # Debian/Ubuntu
```

**配置**:
```bash
git config --global user.name "你的名字"
git config --global user.email "you@example.com"
```

**第一个仓库**:
```bash
git init
git add .
git commit -m "初始提交"
```

## Cheatsheet

| 命令 | 说明 |
|---------|-------------|
| `git init` | 创建新仓库 |
| `git clone URL` | 克隆仓库 |
| `git status` | 查看当前状态 |
| `git add FILE` | 暂存文件 |
| `git add .` | 暂存所有更改 |
| `git commit -m "msg"` | 提交更改 |
| `git push` | 推送到远程 |
| `git pull` | 从远程拉取 |
| `git log` | 查看历史 |
| `git diff` | 查看差异 |

## Gotchas

### 提交前忘记添加文件

```bash
git add forgotten-file
git commit --amend
```

### 提交信息写错了

```bash
git commit --amend -m "新的信息"
```

### 撤销上次提交（保留更改）

```bash
git reset --soft HEAD~1
```

### 合并冲突

编辑冲突文件后：
```bash
git add .
git commit
```

## Next Steps

- [Git 分支](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%AE%80%E4%BB%8B)
- [GitHub 快速入门](https://docs.github.com/zh/get-started/quickstart)
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)
