---
title: "Docker"
description: "5 分钟快速入门 Docker 容器"
template: "tool"
tags: ["containers", "devops"]
---

## TL;DR

**一句话**：Docker 把应用打包成容器，在任何地方都能一致运行——告别"在我电脑上能跑"问题。

**核心价值**：
- 环境一致性 - 开发和生产环境完全相同
- 隔离性 - 应用互不干扰
- 可移植 - 任何装了 Docker 的机器都能跑
- 轻量级 - 共享宿主机内核，不是完整虚拟机

## Quick Start

### 安装

macOS/Windows: 下载 [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Linux:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# 注销后重新登录
```

### 验证

```bash
docker --version
```

### 第一个容器

```bash
docker run hello-world
```

### 运行 Web 服务器

```bash
docker run -d -p 8080:80 nginx
# 打开 http://localhost:8080
```

## Cheatsheet

| 命令 | 说明 |
|------|------|
| `docker run IMAGE` | 运行容器 |
| `docker run -d IMAGE` | 后台运行 |
| `docker run -p 8080:80 IMAGE` | 端口映射 |
| `docker run -v /host:/container IMAGE` | 挂载卷 |
| `docker ps` | 列出运行中的容器 |
| `docker ps -a` | 列出所有容器 |
| `docker images` | 列出镜像 |
| `docker pull IMAGE` | 下载镜像 |
| `docker stop ID` | 停止容器 |
| `docker rm ID` | 删除容器 |
| `docker rmi IMAGE` | 删除镜像 |
| `docker logs ID` | 查看容器日志 |
| `docker exec -it ID bash` | 进入容器终端 |

## Gotchas

### Linux 权限问题

```bash
sudo usermod -aG docker $USER
# 然后注销重新登录
```

### 端口被占用

```bash
# 换一个宿主机端口
docker run -p 3001:80 nginx
```

### 容器立即退出

```bash
# 交互式运行来调试
docker run -it IMAGE bash

# 查看日志
docker logs CONTAINER_ID
```

### Dockerfile 改了没生效

```bash
# 不用缓存重新构建
docker build --no-cache -t myapp .
```

### 卷权限问题

```bash
# 以当前用户身份运行
docker run -u $(id -u):$(id -g) -v $(pwd):/app IMAGE
```

## Next Steps

- [Dockerfile 参考](https://docs.docker.com/reference/dockerfile/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)
- [Docker 最佳实践](https://docs.docker.com/develop/develop-images/guidelines/)
