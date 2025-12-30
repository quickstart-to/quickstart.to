---
title: "cURL"
description: "Transferencia de datos desde linea de comandos - probar APIs, descargar archivos, depurar HTTP"
template: "tool"
tags: ["cli", "http", "networking"]
---

## TL;DR

**Qué**: Herramienta de línea de comandos para transferir datos con URLs.

**Por qué**: Disponibilidad universal, scriptable, soporta todos los protocolos, depuración de APIs.

## Quick Start

**GET básico**:
```bash
curl https://api.example.com/users
```

**POST con JSON**:
```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

**Con autenticación**:
```bash
curl -H "Authorization: Bearer TOKEN" https://api.example.com/me
```

## Cheatsheet

| Opción | Descripción |
|--------|-------------|
| `-X METHOD` | Método HTTP (GET, POST, PUT, DELETE) |
| `-H "Header"` | Añadir encabezado |
| `-d "data"` | Cuerpo de la petición |
| `-o file` | Guardar en archivo |
| `-O` | Guardar con nombre remoto |
| `-L` | Seguir redirecciones |
| `-v` | Salida detallada |
| `-s` | Modo silencioso |
| `-i` | Incluir encabezados de respuesta |

## Gotchas

### Common requests

```bash
# GET con parámetros de consulta
curl "https://api.example.com/users?page=1&limit=10"

# POST datos de formulario
curl -X POST https://api.example.com/login \
  -d "username=john&password=secret"

# Petición PUT
curl -X PUT https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated"}'

# Petición DELETE
curl -X DELETE https://api.example.com/users/1

# Petición PATCH
curl -X PATCH https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

### Headers and auth

```bash
# Múltiples encabezados
curl https://api.example.com/data \
  -H "Accept: application/json" \
  -H "X-API-Key: your-key"

# Auth Basic
curl -u username:password https://api.example.com/secure

# Token Bearer
curl -H "Authorization: Bearer eyJhbG..." https://api.example.com/me

# Cookie
curl -b "session=abc123" https://api.example.com/dashboard
```

### File operations

```bash
# Descargar archivo
curl -O https://example.com/file.zip

# Descargar con nombre personalizado
curl -o myfile.zip https://example.com/file.zip

# Subir archivo
curl -X POST https://api.example.com/upload \
  -F "file=@/path/to/file.pdf"

# Múltiples archivos
curl -X POST https://api.example.com/upload \
  -F "file1=@file1.jpg" \
  -F "file2=@file2.jpg"
```

### Debugging

```bash
# Mostrar encabezados de petición/respuesta
curl -v https://api.example.com/users

# Solo encabezados de respuesta
curl -I https://api.example.com/users

# Incluir encabezados en la salida
curl -i https://api.example.com/users

# Medir tiempo de la petición
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://example.com

# Mostrar solo código de estado
curl -s -o /dev/null -w "%{http_code}" https://example.com
```

### Advanced

```bash
# Seguir redirecciones
curl -L https://short.url/abc

# Reintentar en caso de fallo
curl --retry 3 --retry-delay 5 https://api.example.com

# Timeout
curl --connect-timeout 5 --max-time 10 https://api.example.com

# Ignorar errores SSL (no recomendado)
curl -k https://self-signed.example.com

# Usar proxy
curl -x http://proxy:8080 https://api.example.com

# Guardar cookies
curl -c cookies.txt https://example.com/login
curl -b cookies.txt https://example.com/dashboard
```

## Next Steps

- [Manual de cURL](https://curl.se/docs/manual.html) - Documentación oficial
- [Everything cURL](https://everything.curl.dev/) - Libro
- [cURL Cookbook](https://catonmat.net/cookbooks/curl) - Recetas
- [httpie](https://httpie.io/) - Alternativa moderna
