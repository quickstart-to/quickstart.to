---
title: "Nginx"
description: "Comienza con el servidor web Nginx y reverse proxy"
template: "tool"
tags: ["web-server", "reverse-proxy", "devops"]
---

## TL;DR

**Qué**: Servidor web de alto rendimiento, reverse proxy y balanceador de carga.

**Por qué**: Sirve archivos estáticos rápidamente, maneja alta concurrencia, perfecto para proxy de APIs.

## Quick Start

**Instalación**:

```bash
# macOS
brew install nginx

# Ubuntu/Debian
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

**Iniciar/Detener**:

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

**Ubicación de config**:
- macOS: `/usr/local/etc/nginx/nginx.conf`
- Linux: `/etc/nginx/nginx.conf`

**Servir archivos estáticos**:

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

| Config | Descripción |
|--------|-------------|
| `listen 80;` | Escuchar en puerto 80 |
| `server_name domain.com;` | Virtual host |
| `root /path;` | Raíz del documento |
| `index index.html;` | Archivo por defecto |
| `location /api { }` | Coincidencia de URL |
| `proxy_pass http://localhost:3000;` | Reverse proxy |
| `try_files $uri $uri/ =404;` | Fallback SPA |

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

- [Nginx Official Docs](https://nginx.org/en/docs/) - Documentación oficial
- [Nginx Config Generator](https://www.digitalocean.com/community/tools/nginx) - Generador de configuración
- [Let's Encrypt SSL](https://certbot.eff.org/) - Certificados SSL
- [Nginx Amplify Monitoring](https://amplify.nginx.com/) - Monitoreo
