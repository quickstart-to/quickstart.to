---
title: "Let's Encrypt"
description: "Comienza con Let's Encrypt en 5 minutos"
template: "tool"
tags: ["security", "ssl", "certificates"]
---

## TL;DR

**Qué**: Autoridad de certificación gratuita y automatizada que proporciona certificados SSL/TLS.

**Por qué**: HTTPS gratis, renovación automática, ampliamente confiable, fácil de configurar.

## Quick Start

**Usando Certbot (recomendado)**:
```bash
# Instalar Certbot
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# macOS
brew install certbot

# Obtener certificado para Nginx
sudo certbot --nginx -d example.com -d www.example.com

# Obtener certificado para Apache
sudo certbot --apache -d example.com
```

**Certificado manual (standalone)**:
```bash
sudo certbot certonly --standalone -d example.com
```

**Ubicación de certificados**:
```
/etc/letsencrypt/live/example.com/
├── fullchain.pem  # Certificado + intermedio
├── privkey.pem    # Clave privada
├── cert.pem       # Solo certificado
└── chain.pem      # Certificado intermedio
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `certbot certificates` | Listar certificados |
| `certbot renew` | Renovar todos los certificados |
| `certbot renew --dry-run` | Probar renovación |
| `certbot delete --cert-name domain` | Eliminar certificado |
| `certbot revoke --cert-path /path` | Revocar certificado |

## Gotchas

### Nginx configuration

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # Redirigir HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Configuración SSL
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

    # Config SSL moderna
    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256

    DocumentRoot /var/www/html
</VirtualHost>
```

### Automatic renewal

```bash
# Certbot instala automáticamente un timer systemd o tarea cron
# Verificar estado del timer
sudo systemctl status certbot.timer

# Cron manual (si es necesario)
# /etc/cron.d/certbot
0 0,12 * * * root certbot renew --quiet

# Renovación con hooks
sudo certbot renew --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx"
```

### Wildcard certificates

```bash
# Requiere challenge DNS
sudo certbot certonly \
  --manual \
  --preferred-challenges dns \
  -d example.com \
  -d *.example.com

# Con plugin DNS (ejemplo Cloudflare)
sudo apt install python3-certbot-dns-cloudflare

# Crear archivo de credenciales
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

// Redirección HTTP
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80);

// Servidor HTTPS
https.createServer(options, app).listen(443);
```

### Verify certificate

```bash
# Verificar expiración del certificado
sudo certbot certificates

# Verificación OpenSSL
openssl x509 -in /etc/letsencrypt/live/example.com/cert.pem -noout -dates

# Probar HTTPS
curl -vI https://example.com

# Test SSL Labs
# Visita: https://www.ssllabs.com/ssltest/
```

### Rate limits

```
Certificados por dominio registrado: 50 por semana
Certificado duplicado: 5 por semana
Validación fallida: 5 por hora
Nuevos pedidos: 300 por 3 horas

Usar staging para pruebas:
sudo certbot --staging -d example.com
```

## Next Steps

- [Documentación de Let's Encrypt](https://letsencrypt.org/docs/) - Docs oficiales
- [Instrucciones de Certbot](https://certbot.eff.org/instructions) - Guía de configuración
- [Mejores prácticas SSL](https://ssl-config.mozilla.org/) - Generador de config SSL de Mozilla
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Probar tu configuración SSL
