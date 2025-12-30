---
title: "Let's Encrypt"
description: "Kostenlose SSL/TLS-Zertifizierungsstelle - automatische Erneuerung, Certbot, HTTPS fuer alle"
template: "tool"
tags: ["security", "ssl", "certificates"]
---

## TL;DR

**Was**: Kostenlose, automatisierte Zertifizierungsstelle für SSL/TLS-Zertifikate.

**Warum**: Kostenloses HTTPS, automatische Erneuerung, weitverbreitet vertraut, einfach einzurichten.

## Quick Start

**Mit Certbot (empfohlen)**:
```bash
# Certbot installieren
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# macOS
brew install certbot

# Zertifikat für Nginx erhalten
sudo certbot --nginx -d example.com -d www.example.com

# Zertifikat für Apache erhalten
sudo certbot --apache -d example.com
```

**Manuelles Zertifikat (standalone)**:
```bash
sudo certbot certonly --standalone -d example.com
```

**Zertifikate-Speicherort**:
```
/etc/letsencrypt/live/example.com/
├── fullchain.pem  # Zertifikat + Intermediate
├── privkey.pem    # Privater Schlüssel
├── cert.pem       # Nur Zertifikat
└── chain.pem      # Intermediate-Zertifikat
```

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `certbot certificates` | Zertifikate auflisten |
| `certbot renew` | Alle Zertifikate erneuern |
| `certbot renew --dry-run` | Erneuerung testen |
| `certbot delete --cert-name domain` | Zertifikat löschen |
| `certbot revoke --cert-path /path` | Zertifikat widerrufen |

## Gotchas

### Nginx configuration

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # HTTP zu HTTPS umleiten
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # SSL-Einstellungen
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

    # Moderne SSL-Konfiguration
    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256

    DocumentRoot /var/www/html
</VirtualHost>
```

### Automatic renewal

```bash
# Certbot installiert automatisch einen systemd-Timer oder Cron-Job
# Timer-Status prüfen
sudo systemctl status certbot.timer

# Manueller Cron (falls nötig)
# /etc/cron.d/certbot
0 0,12 * * * root certbot renew --quiet

# Erneuerung mit Hooks
sudo certbot renew --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx"
```

### Wildcard certificates

```bash
# Erfordert DNS-Challenge
sudo certbot certonly \
  --manual \
  --preferred-challenges dns \
  -d example.com \
  -d *.example.com

# Mit DNS-Plugin (Cloudflare-Beispiel)
sudo apt install python3-certbot-dns-cloudflare

# Anmeldedaten-Datei erstellen
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

// HTTP-Umleitung
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80);

// HTTPS-Server
https.createServer(options, app).listen(443);
```

### Verify certificate

```bash
# Zertifikatsablauf prüfen
sudo certbot certificates

# OpenSSL-Prüfung
openssl x509 -in /etc/letsencrypt/live/example.com/cert.pem -noout -dates

# HTTPS testen
curl -vI https://example.com

# SSL Labs-Test
# Besuchen Sie: https://www.ssllabs.com/ssltest/
```

### Rate limits

```
Zertifikate pro registrierter Domain: 50 pro Woche
Doppeltes Zertifikat: 5 pro Woche
Fehlgeschlagene Validierung: 5 pro Stunde
Neue Bestellungen: 300 pro 3 Stunden

Staging für Tests verwenden:
sudo certbot --staging -d example.com
```

## Next Steps

- [Let's Encrypt Dokumentation](https://letsencrypt.org/docs/) - Offizielle Docs
- [Certbot Anleitung](https://certbot.eff.org/instructions) - Einrichtungsanleitung
- [SSL Best Practices](https://ssl-config.mozilla.org/) - Mozilla SSL-Konfigurationsgenerator
- [SSL Labs](https://www.ssllabs.com/ssltest/) - SSL-Setup testen
