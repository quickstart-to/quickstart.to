---
title: "cURL"
description: "Get started with cURL in 5 minutes"
template: "tool"
tags: ["cli", "http", "networking"]
---

## TL;DR

**What**: Command-line tool for transferring data with URLs.

**Why**: Universal availability, scriptable, supports all protocols, debugging APIs.

## Quick Start

**Basic GET**:
```bash
curl https://api.example.com/users
```

**POST with JSON**:
```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

**With authentication**:
```bash
curl -H "Authorization: Bearer TOKEN" https://api.example.com/me
```

## Cheatsheet

| Option | Description |
|--------|-------------|
| `-X METHOD` | HTTP method (GET, POST, PUT, DELETE) |
| `-H "Header"` | Add header |
| `-d "data"` | Request body |
| `-o file` | Output to file |
| `-O` | Save with remote filename |
| `-L` | Follow redirects |
| `-v` | Verbose output |
| `-s` | Silent mode |
| `-i` | Include response headers |

## Gotchas

### Common requests

```bash
# GET with query params
curl "https://api.example.com/users?page=1&limit=10"

# POST form data
curl -X POST https://api.example.com/login \
  -d "username=john&password=secret"

# PUT request
curl -X PUT https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated"}'

# DELETE request
curl -X DELETE https://api.example.com/users/1

# PATCH request
curl -X PATCH https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

### Headers and auth

```bash
# Multiple headers
curl https://api.example.com/data \
  -H "Accept: application/json" \
  -H "X-API-Key: your-key"

# Basic auth
curl -u username:password https://api.example.com/secure

# Bearer token
curl -H "Authorization: Bearer eyJhbG..." https://api.example.com/me

# Cookie
curl -b "session=abc123" https://api.example.com/dashboard
```

### File operations

```bash
# Download file
curl -O https://example.com/file.zip

# Download with custom name
curl -o myfile.zip https://example.com/file.zip

# Upload file
curl -X POST https://api.example.com/upload \
  -F "file=@/path/to/file.pdf"

# Multiple files
curl -X POST https://api.example.com/upload \
  -F "file1=@file1.jpg" \
  -F "file2=@file2.jpg"
```

### Debugging

```bash
# Show request/response headers
curl -v https://api.example.com/users

# Only response headers
curl -I https://api.example.com/users

# Include headers in output
curl -i https://api.example.com/users

# Time the request
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://example.com

# Show only status code
curl -s -o /dev/null -w "%{http_code}" https://example.com
```

### Advanced

```bash
# Follow redirects
curl -L https://short.url/abc

# Retry on failure
curl --retry 3 --retry-delay 5 https://api.example.com

# Timeout
curl --connect-timeout 5 --max-time 10 https://api.example.com

# Ignore SSL errors (not recommended)
curl -k https://self-signed.example.com

# Use proxy
curl -x http://proxy:8080 https://api.example.com

# Save cookies
curl -c cookies.txt https://example.com/login
curl -b cookies.txt https://example.com/dashboard
```

## Next Steps

- [cURL Manual](https://curl.se/docs/manual.html) - Official docs
- [Everything cURL](https://everything.curl.dev/) - Book
- [cURL Cookbook](https://catonmat.net/cookbooks/curl) - Recipes
- [httpie](https://httpie.io/) - Modern alternative
