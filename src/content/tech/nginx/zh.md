---
title: "Nginx"
description: "高性能 Web 服务器和反向代理 - 负载均衡、SSL 终结和静态文件服务"
template: "tool"
tags: ["web-server", "reverse-proxy", "devops"]
---

## TL;DR

**是什么**：高性能 Web 服务器、反向代理和负载均衡器。

**为什么**：静态文件服务快、高并发处理能力强、适合 API 代理。

## Quick Start

**安装**：

```bash
# macOS
brew install nginx

# Ubuntu/Debian
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

**启动/停止**：

```bash
# 启动
sudo nginx

# 停止
sudo nginx -s stop

# 重载配置（无停机）
sudo nginx -s reload

# 测试配置
sudo nginx -t
```

**配置文件位置**：
- macOS: `/usr/local/etc/nginx/nginx.conf`
- Linux: `/etc/nginx/nginx.conf`

**静态文件服务**：

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

| 配置 | 描述 |
|------|------|
| `listen 80;` | 监听 80 端口 |
| `server_name domain.com;` | 虚拟主机 |
| `root /path;` | 文档根目录 |
| `index index.html;` | 默认文件 |
| `location /api { }` | URL 匹配 |
| `proxy_pass http://localhost:3000;` | 反向代理 |
| `try_files $uri $uri/ =404;` | SPA 回退 |

**反向代理**：

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
# 检查文件权限
ls -la /var/www/html

# 修复所有权
sudo chown -R www-data:www-data /var/www/html

# 检查 SELinux（CentOS）
sudo setenforce 0  # 临时禁用
```

### 配置语法错误

```bash
# 重载前务必测试
sudo nginx -t

# 查看错误日志
tail -f /var/log/nginx/error.log
```

### 80 端口被占用

```bash
# 查找占用 80 端口的进程
sudo lsof -i :80

# 终止进程或使用其他端口
listen 8080;
```

### 启用站点配置

```bash
# Linux：创建符号链接
sudo ln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/
sudo nginx -s reload
```

## Next Steps

- [Nginx 官方文档](https://nginx.org/en/docs/)
- [Nginx 配置生成器](https://www.digitalocean.com/community/tools/nginx)
- [Let's Encrypt SSL](https://certbot.eff.org/)
- [Nginx Amplify 监控](https://amplify.nginx.com/)
