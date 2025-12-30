---
title: "Nginx"
description: "Serveur web haute performance et reverse proxy - load balancing, terminaison SSL et service de fichiers statiques"
template: "tool"
tags: ["web-server", "reverse-proxy", "devops"]
---

## TL;DR

**Quoi** : Serveur web haute performance, reverse proxy et load balancer.

**Pourquoi** : Sert les fichiers statiques rapidement, gère une haute concurrence, parfait pour le proxying d'API.

## Quick Start

**Installation** :

```bash
# macOS
brew install nginx

# Ubuntu/Debian
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

**Démarrer/Arrêter** :

```bash
# Start
sudo nginx

# Stop
sudo nginx -s stop

# Reload config (no downtime)
sudo nginx -s reload

# Test config
sudo nginx -t
```

**Emplacement de la config** :
- macOS : `/usr/local/etc/nginx/nginx.conf`
- Linux : `/etc/nginx/nginx.conf`

**Servir des fichiers statiques** :

```nginx
# /etc/nginx/sites-available/mysite
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    index index.html;
}
```

## Cheatsheet

| Config | Description |
|--------|-------------|
| `listen 80;` | Écouter sur le port 80 |
| `server_name domain.com;` | Virtual host |
| `root /path;` | Racine des documents |
| `index index.html;` | Fichier par défaut |
| `location /api { }` | Correspondance d'URL |
| `proxy_pass http://localhost:3000;` | Reverse proxy |
| `try_files $uri $uri/ =404;` | Fallback SPA |

**Reverse Proxy** :

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Gotchas

### 403 Forbidden

```bash
# Check file permissions
ls -la /var/www/html

# Fix ownership
sudo chown -R www-data:www-data /var/www/html

# Check SELinux (CentOS)
sudo setenforce 0  # Temporary disable
```

### Config syntax error

```bash
# Always test before reload
sudo nginx -t

# Check error log
tail -f /var/log/nginx/error.log
```

### Port 80 already in use

```bash
# Find what's using port 80
sudo lsof -i :80

# Kill the process or use different port
listen 8080;
```

### Enable site config

```bash
# Linux: Create symlink
sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/
sudo nginx -s reload
```

## Next Steps

- [Nginx Official Docs](https://nginx.org/en/docs/) - Documentation officielle
- [Nginx Config Generator](https://www.digitalocean.com/community/tools/nginx) - Générateur de configuration
- [Let's Encrypt SSL](https://certbot.eff.org/) - Certificats SSL
- [Nginx Amplify Monitoring](https://amplify.nginx.com/) - Surveillance
