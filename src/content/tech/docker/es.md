---
title: "Docker"
description: "Empaqueta y ejecuta aplicaciones en contenedores aislados - entornos consistentes del desarrollo a producción"
template: "tool"
tags: ["containers", "devops"]
---

## TL;DR

**En una línea**: Docker empaqueta apps en contenedores que funcionan idénticamente en todas partes - se acabaron los problemas de "funciona en mi máquina".

**Valor principal**:
- Entornos consistentes - misma configuración desde desarrollo hasta producción
- Aislamiento - las apps no interfieren entre sí
- Portabilidad - funciona en cualquier máquina con Docker
- Ligero - comparte el kernel del OS host, no es una VM completa

## Quick Start

### Install

macOS/Windows: Descargar [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Linux:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Cerrar sesión y volver a iniciar
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
# Abre http://localhost:8080
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `docker run IMAGE` | Ejecutar contenedor |
| `docker run -d IMAGE` | Ejecutar en segundo plano |
| `docker run -p 8080:80 IMAGE` | Mapear puerto |
| `docker run -v /host:/container IMAGE` | Montar volumen |
| `docker ps` | Listar contenedores en ejecución |
| `docker ps -a` | Listar todos los contenedores |
| `docker images` | Listar imágenes |
| `docker pull IMAGE` | Descargar imagen |
| `docker stop ID` | Detener contenedor |
| `docker rm ID` | Eliminar contenedor |
| `docker rmi IMAGE` | Eliminar imagen |
| `docker logs ID` | Ver logs del contenedor |
| `docker exec -it ID bash` | Shell en el contenedor |

## Gotchas

### Permission denied on Linux

```bash
sudo usermod -aG docker $USER
# Luego cerrar sesión y volver a iniciar
```

### Port already in use

```bash
# Usar un puerto de host diferente
docker run -p 3001:80 nginx
```

### Container stops immediately

```bash
# Ejecutar interactivamente para depurar
docker run -it IMAGE bash

# Revisar logs
docker logs CONTAINER_ID
```

### Dockerfile not updating

```bash
# Construir sin caché
docker build --no-cache -t myapp .
```

### Volume permissions

```bash
# Ejecutar como usuario actual
docker run -u $(id -u):$(id -g) -v $(pwd):/app IMAGE
```

## Next Steps

- [Referencia de Dockerfile](https://docs.docker.com/reference/dockerfile/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)
- [Mejores prácticas de Docker](https://docs.docker.com/develop/develop-images/guidelines/)
