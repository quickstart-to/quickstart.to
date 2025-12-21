---
title: "Git"
description: "5 分钟学会 Git 版本控制基础"
tags: ["version-control", "devops"]
---

## 概述

Git 是一个分布式版本控制系统，用于在软件开发过程中跟踪源代码的变化。

## 前提条件

- 一台运行 macOS、Windows 或 Linux 的电脑
- 终端/命令行访问权限

## 步骤

### 第一步：安装 Git

**macOS**：
```bash
brew install git
```

**Windows**：下载 [Git for Windows](https://git-scm.com/download/win)

**Linux**：
```bash
sudo apt install git  # Debian/Ubuntu
sudo dnf install git  # Fedora
```

### 第二步：配置 Git

```bash
git config --global user.name "你的名字"
git config --global user.email "you@example.com"
```

### 第三步：创建第一个仓库

```bash
mkdir my-project && cd my-project
git init
echo "# 我的项目" > README.md
git add .
git commit -m "初始提交"
```

## 总结

现在你已经安装并配置了 Git。下一步：学习分支、远程仓库和 GitHub。
