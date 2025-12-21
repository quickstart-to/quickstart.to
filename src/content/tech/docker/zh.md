---
title: "Docker"
description: "5 分钟快速入门 Docker 容器"
tags: ["containers", "devops"]
---

## TL;DR

**What**: 将应用打包成可移植的容器，在任何地方运行。

**Why**: "在我电脑上能跑" → 在哪都能跑。

## Quick Start

**安装**:

macOS/Windows: 下载 [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Linux:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

**第一个容器**:
```bash
docker run hello-world
```

## Cheatsheet

| 命令 | 说明 |
|---------|-------------|
| `docker run IMAGE` | 运行容器 |
| `docker ps` | 列出运行中的容器 |
| `docker ps -a` | 列出所有容器 |
| `docker images` | 列出镜像 |
| `docker pull IMAGE` | 下载镜像 |
| `docker stop ID` | 停止容器 |
| `docker rm ID` | 删除容器 |
| `docker rmi IMAGE` | 删除镜像 |

## Gotchas

### Linux 权限问题

```bash
sudo usermod -aG docker $USER
# 然后注销重新登录
```

### 端口被占用

```bash
docker run -p 3001:80 nginx  # 换一个宿主机端口
```

### 容器立即退出

```bash
docker run -it IMAGE bash  # 交互式运行
docker logs CONTAINER_ID   # 查看日志
```

## Next Steps

- [Dockerfile 指南](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)
