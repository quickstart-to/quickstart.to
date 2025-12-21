---
title: "Docker"
description: "5 分钟快速入门 Docker 容器"
tags: ["containers", "devops"]
---

## 概述

Docker 可以将应用程序打包到容器中——这是一种标准化的可执行组件，将源代码与操作系统库和依赖项组合在一起。

## 前提条件

- 一台运行 macOS、Windows 或 Linux 的电脑
- 管理员/sudo 权限

## 步骤

### 第一步：安装 Docker

**macOS/Windows**：下载 [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**Linux**：
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

### 第二步：验证安装

```bash
docker --version
docker run hello-world
```

### 第三步：运行第一个容器

```bash
docker run -it ubuntu bash
```

## 总结

现在你已经安装了 Docker，可以运行容器了。下一步：学习 Dockerfile 和 docker-compose。
