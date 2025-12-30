---
title: "Git"
description: "追踪代码变更、团队协作、维护项目历史的分布式版本控制系统"
template: "tool"
tags: ["version-control", "devops"]
---

## TL;DR

**一句话**：Git 记录代码的每次变更，让你能撤销错误，实现多人协作。

**核心价值**：
- 历史记录 - 每次变更都被记录
- 可撤销 - 随时回到之前的状态
- 分支 - 在不影响主代码的情况下开发功能
- 协作 - 合并多人的工作

## Quick Start

### 安装

macOS:
```bash
brew install git
```

Windows: 下载 [Git for Windows](https://git-scm.com/download/win)

Linux:
```bash
sudo apt install git  # Debian/Ubuntu
```

### 配置

```bash
git config --global user.name "你的名字"
git config --global user.email "you@example.com"
```

### 第一个仓库

```bash
mkdir myproject && cd myproject
git init
echo "# My Project" > README.md
git add .
git commit -m "初始提交"
```

## Cheatsheet

| 命令 | 说明 |
|------|------|
| `git init` | 创建新仓库 |
| `git clone URL` | 克隆仓库 |
| `git status` | 查看当前状态 |
| `git add FILE` | 暂存文件 |
| `git add .` | 暂存所有更改 |
| `git commit -m "msg"` | 提交更改 |
| `git push` | 推送到远程 |
| `git pull` | 从远程拉取 |
| `git branch` | 列出分支 |
| `git branch NAME` | 创建分支 |
| `git checkout NAME` | 切换分支 |
| `git checkout -b NAME` | 创建并切换 |
| `git merge NAME` | 合并分支 |
| `git log --oneline` | 查看历史 |
| `git diff` | 查看未暂存更改 |
| `git stash` | 临时保存更改 |
| `git stash pop` | 恢复暂存的更改 |

## Gotchas

### 提交前忘记添加文件

```bash
git add forgotten-file
git commit --amend --no-edit
```

### 提交信息写错了

```bash
git commit --amend -m "正确的信息"
```

### 撤销上次提交（保留更改）

```bash
git reset --soft HEAD~1
```

### 撤销上次提交（丢弃更改）

```bash
git reset --hard HEAD~1
```

### 合并冲突

编辑冲突文件（找 `<<<<<<<` 标记），然后：
```bash
git add .
git commit -m "解决冲突"
```

### 不小心提交到了错误的分支

```bash
# 把提交移到正确的分支
git checkout correct-branch
git cherry-pick COMMIT_HASH
git checkout wrong-branch
git reset --hard HEAD~1
```

## Next Steps

- [Git 分支](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%AE%80%E4%BB%8B)
- [GitHub 快速入门](https://docs.github.com/zh/get-started/quickstart)
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)
- [Oh Shit, Git!?!](https://ohshitgit.com/)
