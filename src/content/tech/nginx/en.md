---
title: "Nginx"
description: "Get started with Nginx web server and reverse proxy"
template: "tool"
tags: ["web-server", "reverse-proxy", "devops"]
---

## TL;DR

**What**: High-performance web server, reverse proxy, and load balancer.

**Why**: Serves static files fast, handles high concurrency, perfect for API proxying.

## Quick Start

**Install**:

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

**Config location**:
- macOS: `/usr/local/etc/nginx/nginx.conf`
- Linux: `/etc/nginx/nginx.conf`

**Serve static files**:

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
| `listen 80;` | Listen on port 80 |
| `server_name domain.com;` | Virtual host |
| `root /path;` | Document root |
| `index index.html;` | Default file |
| `location /api { }` | URL matching |
| `proxy_pass http://localhost:3000;` | Reverse proxy |
| `try_files $uri $uri/ =404;` | SPA fallback |

**Reverse proxy**:

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

- [Nginx Official Docs](https://nginx.org/en/docs/)
- [Nginx Config Generator](https://www.digitalocean.com/community/tools/nginx)
- [Let's Encrypt SSL](https://certbot.eff.org/)
- [Nginx Amplify Monitoring](https://amplify.nginx.com/)
