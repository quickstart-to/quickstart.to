---
title: "Let's Encrypt"
description: "Autorite de certification SSL/TLS gratuite - renouvellement auto, Certbot, HTTPS pour tous"
template: "tool"
tags: ["security", "ssl", "certificates"]
---

## TL;DR

**Quoi** : Autorité de certification gratuite et automatisée fournissant des certificats SSL/TLS.

**Pourquoi** : HTTPS gratuit, renouvellement automatique, largement approuvé, facile à configurer.

## Quick Start

**Avec Certbot (recommandé)** :
```bash
# Installer Certbot
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# macOS
brew install certbot

# Obtenir un certificat pour Nginx
sudo certbot --nginx -d example.com -d www.example.com

# Obtenir un certificat pour Apache
sudo certbot --apache -d example.com
```

**Certificat manuel (standalone)** :
```bash
sudo certbot certonly --standalone -d example.com
```

**Emplacement des certificats** :
```
/etc/letsencrypt/live/example.com/
├── fullchain.pem  # Certificat + intermédiaire
├── privkey.pem    # Clé privée
├── cert.pem       # Certificat seul
└── chain.pem      # Certificat intermédiaire
```

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `certbot certificates` | Lister les certificats |
| `certbot renew` | Renouveler tous les certificats |
| `certbot renew --dry-run` | Tester le renouvellement |
| `certbot delete --cert-name domain` | Supprimer un certificat |
| `certbot revoke --cert-path /path` | Révoquer un certificat |

## Gotchas

### Nginx configuration

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # Rediriger HTTP vers HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Paramètres SSL
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

    # Config SSL moderne
    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256

    DocumentRoot /var/www/html
</VirtualHost>
```

### Automatic renewal

```bash
# Certbot installe automatiquement un timer systemd ou une tâche cron
# Vérifier le statut du timer
sudo systemctl status certbot.timer

# Cron manuel (si nécessaire)
# /etc/cron.d/certbot
0 0,12 * * * root certbot renew --quiet

# Renouvellement avec hooks
sudo certbot renew --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx"
```

### Wildcard certificates

```bash
# Nécessite un challenge DNS
sudo certbot certonly \
  --manual \
  --preferred-challenges dns \
  -d example.com \
  -d *.example.com

# Avec plugin DNS (exemple Cloudflare)
sudo apt install python3-certbot-dns-cloudflare

# Créer le fichier d'identifiants
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

// Redirection HTTP
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80);

// Serveur HTTPS
https.createServer(options, app).listen(443);
```

### Verify certificate

```bash
# Vérifier l'expiration du certificat
sudo certbot certificates

# Vérification OpenSSL
openssl x509 -in /etc/letsencrypt/live/example.com/cert.pem -noout -dates

# Tester HTTPS
curl -vI https://example.com

# Test SSL Labs
# Visitez : https://www.ssllabs.com/ssltest/
```

### Rate limits

```
Certificats par domaine enregistré : 50 par semaine
Certificat dupliqué : 5 par semaine
Validation échouée : 5 par heure
Nouvelles commandes : 300 par 3 heures

Utiliser staging pour les tests :
sudo certbot --staging -d example.com
```

## Next Steps

- [Documentation Let's Encrypt](https://letsencrypt.org/docs/) - Docs officielles
- [Instructions Certbot](https://certbot.eff.org/instructions) - Guide de configuration
- [Bonnes pratiques SSL](https://ssl-config.mozilla.org/) - Générateur de config SSL Mozilla
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Tester votre configuration SSL
