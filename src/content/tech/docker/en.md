---
title: "Docker"
description: "Get started with Docker containers in 5 minutes"
tags: ["containers", "devops"]
---

## Overview

Docker lets you package applications into containers—standardized executable components combining source code with OS libraries and dependencies.

## Prerequisites

- A computer with macOS, Windows, or Linux
- Admin/sudo access

## Steps

### Step 1: Install Docker

**macOS/Windows**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**Linux**:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

### Step 2: Verify Installation

```bash
docker --version
docker run hello-world
```

### Step 3: Run Your First Container

```bash
docker run -it ubuntu bash
```

## Summary

You now have Docker installed and can run containers. Next steps: learn about Dockerfiles and docker-compose.
