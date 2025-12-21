---
title: "Docker"
description: "Get started with Docker containers in 5 minutes"
tags: ["containers", "devops"]
---

## TL;DR

**What**: Package apps into portable containers that run anywhere.

**Why**: "Works on my machine" → works everywhere.

## Quick Start

**Install**:

macOS/Windows: Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Linux:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

**First container**:
```bash
docker run hello-world
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `docker run IMAGE` | Run a container |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker images` | List images |
| `docker pull IMAGE` | Download an image |
| `docker stop ID` | Stop a container |
| `docker rm ID` | Remove a container |
| `docker rmi IMAGE` | Remove an image |

## Gotchas

### Permission denied on Linux

```bash
sudo usermod -aG docker $USER
# Then logout and login again
```

### Port already in use

```bash
docker run -p 3001:80 nginx  # Use different host port
```

### Container stops immediately

```bash
docker run -it IMAGE bash  # Run interactively
docker logs CONTAINER_ID   # Check logs
```

## Next Steps

- [Dockerfile Guide](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)
