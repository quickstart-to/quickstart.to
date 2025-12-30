---
title: "Nginx"
description: "Hochleistungs-Webserver und Reverse-Proxy - Load Balancing, SSL-Terminierung und statische Dateibereitstellung"
template: "tool"
tags: ["web-server", "reverse-proxy", "devops"]
---

## TL;DR

**Was**: Hochleistungs-Webserver, Reverse-Proxy und Load-Balancer.

**Warum**: Serviert statische Dateien schnell, bewältigt hohe Parallelität, perfekt für API-Proxying.

## Quick Start

**Installation**:

```bash
# macOS
brew install nginx

# Ubuntu/Debian
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

**Start/Stop**:

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

**Config-Speicherort**:
- macOS: `/usr/local/etc/nginx/nginx.conf`
- Linux: `/etc/nginx/nginx.conf`

**Statische Dateien servieren**:

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

| Config | Beschreibung |
|--------|-------------|
| `listen 80;` | Auf Port 80 lauschen |
| `server_name domain.com;` | Virtual Host |
| `root /path;` | Document Root |
| `index index.html;` | Standarddatei |
| `location /api { }` | URL-Matching |
| `proxy_pass http://localhost:3000;` | Reverse Proxy |
| `try_files $uri $uri/ =404;` | SPA-Fallback |

**Reverse Proxy**:

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

- [Nginx Official Docs](https://nginx.org/en/docs/) - Offizielle Dokumentation
- [Nginx Config Generator](https://www.digitalocean.com/community/tools/nginx) - Konfigurationsgenerator
- [Let's Encrypt SSL](https://certbot.eff.org/) - SSL-Zertifikate
- [Nginx Amplify Monitoring](https://amplify.nginx.com/) - Überwachung
