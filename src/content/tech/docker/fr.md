---
title: "Docker"
description: "Démarrez avec les conteneurs Docker en 5 minutes"
template: "tool"
tags: ["containers", "devops"]
---

## TL;DR

**En une ligne**: Docker empaquette les apps dans des conteneurs qui fonctionnent de manière identique partout - fini les problèmes "ça marche sur ma machine".

**Valeur principale**:
- Environnements cohérents - même configuration du dev à la production
- Isolation - les apps n'interfèrent pas entre elles
- Portabilité - fonctionne sur n'importe quelle machine avec Docker
- Léger - partage le kernel de l'OS hôte, pas une VM complète

## Quick Start

### Install

macOS/Windows: Télécharger [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Linux:
```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# Déconnexion puis reconnexion
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
# Ouvrez http://localhost:8080
```

## Cheatsheet

| Commande | Description |
|----------|-------------|
| `docker run IMAGE` | Exécuter un conteneur |
| `docker run -d IMAGE` | Exécuter en arrière-plan |
| `docker run -p 8080:80 IMAGE` | Mapper un port |
| `docker run -v /host:/container IMAGE` | Monter un volume |
| `docker ps` | Lister les conteneurs en cours |
| `docker ps -a` | Lister tous les conteneurs |
| `docker images` | Lister les images |
| `docker pull IMAGE` | Télécharger une image |
| `docker stop ID` | Arrêter un conteneur |
| `docker rm ID` | Supprimer un conteneur |
| `docker rmi IMAGE` | Supprimer une image |
| `docker logs ID` | Voir les logs du conteneur |
| `docker exec -it ID bash` | Shell dans le conteneur |

## Gotchas

### Permission denied on Linux

```bash
sudo usermod -aG docker $USER
# Puis déconnexion et reconnexion
```

### Port already in use

```bash
# Utiliser un autre port hôte
docker run -p 3001:80 nginx
```

### Container stops immediately

```bash
# Exécuter de manière interactive pour déboguer
docker run -it IMAGE bash

# Vérifier les logs
docker logs CONTAINER_ID
```

### Dockerfile not updating

```bash
# Construire sans cache
docker build --no-cache -t myapp .
```

### Volume permissions

```bash
# Exécuter en tant qu'utilisateur courant
docker run -u $(id -u):$(id -g) -v $(pwd):/app IMAGE
```

## Next Steps

- [Référence Dockerfile](https://docs.docker.com/reference/dockerfile/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)
- [Bonnes pratiques Docker](https://docs.docker.com/develop/develop-images/guidelines/)
