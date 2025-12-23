---
title: "Docker"
description: "Get started with Docker containers in 5 minutes"
template: "tool"
tags: ["containers", "devops"]
---

## TL;DR

**One-liner**: Docker packages apps into containers that run identically everywhere - no more "works on my machine" problems.

**Core Value**:
- Consistent environments - same setup from dev to production
- Isolation - apps don't interfere with each other
- Portability - runs on any machine with Docker installed
- Lightweight - shares host OS kernel, not a full VM

## Quick Start

### Install

macOS/Windows: Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Linux:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Logout and login again
```

### Verify

```bash
docker --version
```

### First Container

```bash
docker run hello-world
```

### Run a Web Server

```bash
docker run -d -p 8080:80 nginx
# Open http://localhost:8080
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `docker run IMAGE` | Run a container |
| `docker run -d IMAGE` | Run in background |
| `docker run -p 8080:80 IMAGE` | Map port |
| `docker run -v /host:/container IMAGE` | Mount volume |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker images` | List images |
| `docker pull IMAGE` | Download an image |
| `docker stop ID` | Stop a container |
| `docker rm ID` | Remove a container |
| `docker rmi IMAGE` | Remove an image |
| `docker logs ID` | View container logs |
| `docker exec -it ID bash` | Shell into container |

## Gotchas

### Permission denied on Linux

```bash
sudo usermod -aG docker $USER
# Then logout and login again
```

### Port already in use

```bash
# Use a different host port
docker run -p 3001:80 nginx
```

### Container stops immediately

```bash
# Run interactively to debug
docker run -it IMAGE bash

# Check logs
docker logs CONTAINER_ID
```

### Dockerfile not updating

```bash
# Build without cache
docker build --no-cache -t myapp .
```

### Volume permissions

```bash
# Run as current user
docker run -u $(id -u):$(id -g) -v $(pwd):/app IMAGE
```

## Next Steps

- [Dockerfile Reference](https://docs.docker.com/reference/dockerfile/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Best Practices](https://docs.docker.com/develop/develop-images/guidelines/)
