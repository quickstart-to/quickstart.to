---
title: "cURL"
description: "Starten Sie mit cURL in 5 Minuten"
template: "tool"
tags: ["cli", "http", "networking"]
---

## TL;DR

**Was**: Kommandozeilen-Tool zum Übertragen von Daten mit URLs.

**Warum**: Universelle Verfügbarkeit, skriptfähig, unterstützt alle Protokolle, API-Debugging.

## Quick Start

**Einfaches GET**:
```bash
curl https://api.example.com/users
```

**POST mit JSON**:
```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

**Mit Authentifizierung**:
```bash
curl -H "Authorization: Bearer TOKEN" https://api.example.com/me
```

## Cheatsheet

| Option | Beschreibung |
|--------|-------------|
| `-X METHOD` | HTTP-Methode (GET, POST, PUT, DELETE) |
| `-H "Header"` | Header hinzufügen |
| `-d "data"` | Request-Body |
| `-o file` | In Datei ausgeben |
| `-O` | Mit Remote-Dateinamen speichern |
| `-L` | Redirects folgen |
| `-v` | Ausführliche Ausgabe |
| `-s` | Stiller Modus |
| `-i` | Response-Header einschließen |

## Gotchas

### Common requests

```bash
# GET mit Query-Parametern
curl "https://api.example.com/users?page=1&limit=10"

# POST Formulardaten
curl -X POST https://api.example.com/login \
  -d "username=john&password=secret"

# PUT-Request
curl -X PUT https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated"}'

# DELETE-Request
curl -X DELETE https://api.example.com/users/1

# PATCH-Request
curl -X PATCH https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

### Headers and auth

```bash
# Mehrere Header
curl https://api.example.com/data \
  -H "Accept: application/json" \
  -H "X-API-Key: your-key"

# Basic Auth
curl -u username:password https://api.example.com/secure

# Bearer Token
curl -H "Authorization: Bearer eyJhbG..." https://api.example.com/me

# Cookie
curl -b "session=abc123" https://api.example.com/dashboard
```

### File operations

```bash
# Datei herunterladen
curl -O https://example.com/file.zip

# Mit eigenem Namen herunterladen
curl -o myfile.zip https://example.com/file.zip

# Datei hochladen
curl -X POST https://api.example.com/upload \
  -F "file=@/path/to/file.pdf"

# Mehrere Dateien
curl -X POST https://api.example.com/upload \
  -F "file1=@file1.jpg" \
  -F "file2=@file2.jpg"
```

### Debugging

```bash
# Request/Response-Header anzeigen
curl -v https://api.example.com/users

# Nur Response-Header
curl -I https://api.example.com/users

# Header in Ausgabe einschließen
curl -i https://api.example.com/users

# Request-Zeit messen
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://example.com

# Nur Statuscode anzeigen
curl -s -o /dev/null -w "%{http_code}" https://example.com
```

### Advanced

```bash
# Redirects folgen
curl -L https://short.url/abc

# Bei Fehler wiederholen
curl --retry 3 --retry-delay 5 https://api.example.com

# Timeout
curl --connect-timeout 5 --max-time 10 https://api.example.com

# SSL-Fehler ignorieren (nicht empfohlen)
curl -k https://self-signed.example.com

# Proxy verwenden
curl -x http://proxy:8080 https://api.example.com

# Cookies speichern
curl -c cookies.txt https://example.com/login
curl -b cookies.txt https://example.com/dashboard
```

## Next Steps

- [cURL Handbuch](https://curl.se/docs/manual.html) - Offizielle Dokumentation
- [Everything cURL](https://everything.curl.dev/) - Buch
- [cURL Cookbook](https://catonmat.net/cookbooks/curl) - Rezepte
- [httpie](https://httpie.io/) - Moderne Alternative
