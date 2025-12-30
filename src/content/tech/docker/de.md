---
title: "Docker"
description: "Anwendungen in isolierten Containern verpacken und ausführen - konsistente Umgebungen von Entwicklung bis Produktion"
template: "tool"
tags: ["containers", "devops"]
---

## TL;DR

**Eine Zeile**: Docker verpackt Apps in Container, die überall identisch laufen - keine "funktioniert auf meinem Rechner"-Probleme mehr.

**Kernwert**:
- Konsistente Umgebungen - gleiche Einrichtung von Entwicklung bis Produktion
- Isolation - Apps beeinflussen sich nicht gegenseitig
- Portabilität - läuft auf jedem Rechner mit Docker
- Leichtgewichtig - teilt Host-OS-Kernel, keine vollständige VM

## Quick Start

### Install

macOS/Windows: [Docker Desktop](https://www.docker.com/products/docker-desktop/) herunterladen

Linux:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Abmelden und erneut anmelden
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
# Öffnen Sie http://localhost:8080
```

## Cheatsheet

| Befehl | Beschreibung |
|--------|--------------|
| `docker run IMAGE` | Container ausführen |
| `docker run -d IMAGE` | Im Hintergrund ausführen |
| `docker run -p 8080:80 IMAGE` | Port zuordnen |
| `docker run -v /host:/container IMAGE` | Volume einbinden |
| `docker ps` | Laufende Container auflisten |
| `docker ps -a` | Alle Container auflisten |
| `docker images` | Images auflisten |
| `docker pull IMAGE` | Image herunterladen |
| `docker stop ID` | Container stoppen |
| `docker rm ID` | Container entfernen |
| `docker rmi IMAGE` | Image entfernen |
| `docker logs ID` | Container-Logs anzeigen |
| `docker exec -it ID bash` | Shell im Container öffnen |

## Gotchas

### Permission denied on Linux

```bash
sudo usermod -aG docker $USER
# Dann abmelden und erneut anmelden
```

### Port already in use

```bash
# Anderen Host-Port verwenden
docker run -p 3001:80 nginx
```

### Container stops immediately

```bash
# Interaktiv ausführen zum Debuggen
docker run -it IMAGE bash

# Logs prüfen
docker logs CONTAINER_ID
```

### Dockerfile not updating

```bash
# Ohne Cache bauen
docker build --no-cache -t myapp .
```

### Volume permissions

```bash
# Als aktueller Benutzer ausführen
docker run -u $(id -u):$(id -g) -v $(pwd):/app IMAGE
```

## Next Steps

- [Dockerfile-Referenz](https://docs.docker.com/reference/dockerfile/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Best Practices](https://docs.docker.com/develop/develop-images/guidelines/)
