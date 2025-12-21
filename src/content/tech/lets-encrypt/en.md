---
title: "Let's Encrypt"
description: "Get started with Let's Encrypt in 5 minutes"
tags: ["security", "ssl", "certificates"]
---

## TL;DR

**What**: Free, automated certificate authority providing SSL/TLS certificates.

**Why**: Free HTTPS, automated renewal, widely trusted, easy to set up.

## Quick Start

**Using Certbot (recommended)**:
```bash
# Install Certbot
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# macOS
brew install certbot

# Get certificate for Nginx
sudo certbot --nginx -d example.com -d www.example.com

# Get certificate for Apache
sudo certbot --apache -d example.com
```

**Manual certificate (standalone)**:
```bash
sudo certbot certonly --standalone -d example.com
```

**Certificates location**:
```
/etc/letsencrypt/live/example.com/
├── fullchain.pem  # Certificate + intermediate
├── privkey.pem    # Private key
├── cert.pem       # Certificate only
└── chain.pem      # Intermediate certificate
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `certbot certificates` | List certificates |
| `certbot renew` | Renew all certificates |
| `certbot renew --dry-run` | Test renewal |
| `certbot delete --cert-name domain` | Delete certificate |
| `certbot revoke --cert-path /path` | Revoke certificate |

## Gotchas

### Nginx configuration

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000" always;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

### Apache configuration

```apache
<VirtualHost *:80>
    ServerName example.com
    Redirect permanent / https://example.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName example.com

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/example.com/privkey.pem

    # Modern SSL config
    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256

    DocumentRoot /var/www/html
</VirtualHost>
```

### Automatic renewal

```bash
# Certbot installs a systemd timer or cron job automatically
# Check timer status
sudo systemctl status certbot.timer

# Manual cron (if needed)
# /etc/cron.d/certbot
0 0,12 * * * root certbot renew --quiet

# Renewal with hooks
sudo certbot renew --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx"
```

### Wildcard certificates

```bash
# Requires DNS challenge
sudo certbot certonly \
  --manual \
  --preferred-challenges dns \
  -d example.com \
  -d *.example.com

# With DNS plugin (Cloudflare example)
sudo apt install python3-certbot-dns-cloudflare

# Create credentials file
# /etc/letsencrypt/cloudflare.ini
dns_cloudflare_api_token = your-api-token

sudo certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini \
  -d example.com \
  -d *.example.com
```

### Docker with Traefik

```yaml
# docker-compose.yml
version: '3'
services:
  traefik:
    image: traefik:v2.10
    command:
      - --providers.docker=true
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.letsencrypt.acme.email=you@example.com
      - --certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json
      - --certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./letsencrypt:/letsencrypt

  app:
    image: myapp
    labels:
      - traefik.enable=true
      - traefik.http.routers.app.rule=Host(`example.com`)
      - traefik.http.routers.app.tls.certresolver=letsencrypt
```

### Node.js with HTTPS

```javascript
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/example.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/example.com/fullchain.pem')
};

// HTTP redirect
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80);

// HTTPS server
https.createServer(options, app).listen(443);
```

### Verify certificate

```bash
# Check certificate expiry
sudo certbot certificates

# OpenSSL check
openssl x509 -in /etc/letsencrypt/live/example.com/cert.pem -noout -dates

# Test HTTPS
curl -vI https://example.com

# SSL Labs test
# Visit: https://www.ssllabs.com/ssltest/
```

### Rate limits

```
Certificates per Registered Domain: 50 per week
Duplicate Certificate: 5 per week
Failed Validation: 5 per hour
New Orders: 300 per 3 hours

Use staging for testing:
sudo certbot --staging -d example.com
```

## Next Steps

- [Let's Encrypt Documentation](https://letsencrypt.org/docs/) - Official docs
- [Certbot Instructions](https://certbot.eff.org/instructions) - Setup guide
- [SSL Best Practices](https://ssl-config.mozilla.org/) - Mozilla SSL config generator
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Test your SSL setup
