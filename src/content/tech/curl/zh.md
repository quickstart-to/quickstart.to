---
title: "cURL"
description: "5 分钟快速入门 cURL"
template: "tool"
tags: ["cli", "http", "networking"]
---

## TL;DR

**是什么**：用于通过 URL 传输数据的命令行工具。

**为什么用**：普遍可用、可脚本化、支持所有协议、调试 API。

## Quick Start

**基本 GET**：
```bash
curl https://api.example.com/users
```

**POST JSON**：
```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

**带认证**：
```bash
curl -H "Authorization: Bearer TOKEN" https://api.example.com/me
```

## Cheatsheet

| 选项 | 描述 |
|--------|-------------|
| `-X METHOD` | HTTP 方法（GET, POST, PUT, DELETE）|
| `-H "Header"` | 添加头部 |
| `-d "data"` | 请求体 |
| `-o file` | 输出到文件 |
| `-O` | 使用远程文件名保存 |
| `-L` | 跟随重定向 |
| `-v` | 详细输出 |
| `-s` | 静默模式 |
| `-i` | 包含响应头 |

## Gotchas

### 常见请求

```bash
# 带查询参数的 GET
curl "https://api.example.com/users?page=1&limit=10"

# POST 表单数据
curl -X POST https://api.example.com/login \
  -d "username=john&password=secret"

# PUT 请求
curl -X PUT https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated"}'

# DELETE 请求
curl -X DELETE https://api.example.com/users/1

# PATCH 请求
curl -X PATCH https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

### 头部和认证

```bash
# 多个头部
curl https://api.example.com/data \
  -H "Accept: application/json" \
  -H "X-API-Key: your-key"

# Basic 认证
curl -u username:password https://api.example.com/secure

# Bearer token
curl -H "Authorization: Bearer eyJhbG..." https://api.example.com/me

# Cookie
curl -b "session=abc123" https://api.example.com/dashboard
```

### 文件操作

```bash
# 下载文件
curl -O https://example.com/file.zip

# 自定义文件名下载
curl -o myfile.zip https://example.com/file.zip

# 上传文件
curl -X POST https://api.example.com/upload \
  -F "file=@/path/to/file.pdf"

# 多文件上传
curl -X POST https://api.example.com/upload \
  -F "file1=@file1.jpg" \
  -F "file2=@file2.jpg"
```

### 调试

```bash
# 显示请求/响应头
curl -v https://api.example.com/users

# 仅响应头
curl -I https://api.example.com/users

# 输出中包含头部
curl -i https://api.example.com/users

# 计时请求
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://example.com

# 仅显示状态码
curl -s -o /dev/null -w "%{http_code}" https://example.com
```

### 高级用法

```bash
# 跟随重定向
curl -L https://short.url/abc

# 失败重试
curl --retry 3 --retry-delay 5 https://api.example.com

# 超时
curl --connect-timeout 5 --max-time 10 https://api.example.com

# 忽略 SSL 错误（不推荐）
curl -k https://self-signed.example.com

# 使用代理
curl -x http://proxy:8080 https://api.example.com

# 保存 cookie
curl -c cookies.txt https://example.com/login
curl -b cookies.txt https://example.com/dashboard
```

## Next Steps

- [cURL 手册](https://curl.se/docs/manual.html) - 官方文档
- [Everything cURL](https://everything.curl.dev/) - 书籍
- [cURL Cookbook](https://catonmat.net/cookbooks/curl) - 食谱
- [httpie](https://httpie.io/) - 现代替代品
