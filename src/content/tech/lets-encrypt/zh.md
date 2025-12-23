---
title: "Let's Encrypt"
description: "5 分钟快速入门 Let's Encrypt"
template: "tool"
tags: ["security", "ssl", "certificates"]
---

## TL;DR

**是什么**：免费、自动化的证书颁发机构，提供 SSL/TLS 证书。

**为什么用**：免费 HTTPS、自动续期、广泛信任、易于设置。

## Quick Start

**使用 Certbot（推荐）**：
```bash
# 安装 Certbot
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# macOS
brew install certbot

# 为 Nginx 获取证书
sudo certbot --nginx -d example.com -d www.example.com

# 为 Apache 获取证书
sudo certbot --apache -d example.com
```

**手动获取证书（standalone）**：
```bash
sudo certbot certonly --standalone -d example.com
```

**证书位置**：
```
/etc/letsencrypt/live/example.com/
├── fullchain.pem  # 证书 + 中间证书
├── privkey.pem    # 私钥
├── cert.pem       # 仅证书
└── chain.pem      # 中间证书
```

## Cheatsheet

| 命令 | 描述 |
|------|------|
| `certbot certificates` | 列出证书 |
| `certbot renew` | 续期所有证书 |
| `certbot renew --dry-run` | 测试续期 |
| `certbot delete --cert-name domain` | 删除证书 |
| `certbot revoke --cert-path /path` | 吊销证书 |

## Gotchas

### Nginx 配置

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # 将 HTTP 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # SSL 设置
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

### Apache 配置

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

    # 现代 SSL 配置
    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256

    DocumentRoot /var/www/html
</VirtualHost>
```

### 自动续期

```bash
# Certbot 自动安装 systemd 定时器或 cron 任务
# 检查定时器状态
sudo systemctl status certbot.timer

# 手动 cron（如需要）
# /etc/cron.d/certbot
0 0,12 * * * root certbot renew --quiet

# 带钩子的续期
sudo certbot renew --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx"
```

### 通配符证书

```bash
# 需要 DNS 验证
sudo certbot certonly \
  --manual \
  --preferred-challenges dns \
  -d example.com \
  -d *.example.com

# 使用 DNS 插件（Cloudflare 示例）
sudo apt install python3-certbot-dns-cloudflare

# 创建凭证文件
# /etc/letsencrypt/cloudflare.ini
dns_cloudflare_api_token = your-api-token

sudo certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini \
  -d example.com \
  -d *.example.com
```

### Docker 配合 Traefik

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

### Node.js 使用 HTTPS

```javascript
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/example.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/example.com/fullchain.pem')
};

// HTTP 重定向
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(80);

// HTTPS 服务器
https.createServer(options, app).listen(443);
```

### 验证证书

```bash
# 检查证书到期时间
sudo certbot certificates

# OpenSSL 检查
openssl x509 -in /etc/letsencrypt/live/example.com/cert.pem -noout -dates

# 测试 HTTPS
curl -vI https://example.com

# SSL Labs 测试
# 访问：https://www.ssllabs.com/ssltest/
```

### 速率限制

```
每个注册域名的证书：每周 50 个
重复证书：每周 5 个
验证失败：每小时 5 次
新订单：每 3 小时 300 个

使用测试环境进行测试：
sudo certbot --staging -d example.com
```

## Next Steps

- [Let's Encrypt 文档](https://letsencrypt.org/docs/) - 官方文档
- [Certbot 指南](https://certbot.eff.org/instructions) - 安装指南
- [SSL 最佳实践](https://ssl-config.mozilla.org/) - Mozilla SSL 配置生成器
- [SSL Labs](https://www.ssllabs.com/ssltest/) - 测试 SSL 配置
