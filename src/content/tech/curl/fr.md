---
title: "cURL"
description: "Démarrez avec cURL en 5 minutes"
template: "tool"
tags: ["cli", "http", "networking"]
---

## TL;DR

**Quoi** : Outil en ligne de commande pour transférer des données avec des URLs.

**Pourquoi** : Disponibilité universelle, scriptable, supporte tous les protocoles, débogage d'APIs.

## Quick Start

**GET simple** :
```bash
curl https://api.example.com/users
```

**POST avec JSON** :
```bash
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
```

**Avec authentification** :
```bash
curl -H "Authorization: Bearer TOKEN" https://api.example.com/me
```

## Cheatsheet

| Option | Description |
|--------|-------------|
| `-X METHOD` | Méthode HTTP (GET, POST, PUT, DELETE) |
| `-H "Header"` | Ajouter un en-tête |
| `-d "data"` | Corps de la requête |
| `-o file` | Sortie vers fichier |
| `-O` | Sauvegarder avec le nom distant |
| `-L` | Suivre les redirections |
| `-v` | Sortie détaillée |
| `-s` | Mode silencieux |
| `-i` | Inclure les en-têtes de réponse |

## Gotchas

### Common requests

```bash
# GET avec paramètres de requête
curl "https://api.example.com/users?page=1&limit=10"

# POST données de formulaire
curl -X POST https://api.example.com/login \
  -d "username=john&password=secret"

# Requête PUT
curl -X PUT https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated"}'

# Requête DELETE
curl -X DELETE https://api.example.com/users/1

# Requête PATCH
curl -X PATCH https://api.example.com/users/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

### Headers and auth

```bash
# Plusieurs en-têtes
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
# Télécharger un fichier
curl -O https://example.com/file.zip

# Télécharger avec nom personnalisé
curl -o myfile.zip https://example.com/file.zip

# Uploader un fichier
curl -X POST https://api.example.com/upload \
  -F "file=@/path/to/file.pdf"

# Plusieurs fichiers
curl -X POST https://api.example.com/upload \
  -F "file1=@file1.jpg" \
  -F "file2=@file2.jpg"
```

### Debugging

```bash
# Afficher les en-têtes requête/réponse
curl -v https://api.example.com/users

# Uniquement les en-têtes de réponse
curl -I https://api.example.com/users

# Inclure les en-têtes dans la sortie
curl -i https://api.example.com/users

# Mesurer le temps de la requête
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://example.com

# Afficher uniquement le code de statut
curl -s -o /dev/null -w "%{http_code}" https://example.com
```

### Advanced

```bash
# Suivre les redirections
curl -L https://short.url/abc

# Réessayer en cas d'échec
curl --retry 3 --retry-delay 5 https://api.example.com

# Timeout
curl --connect-timeout 5 --max-time 10 https://api.example.com

# Ignorer les erreurs SSL (non recommandé)
curl -k https://self-signed.example.com

# Utiliser un proxy
curl -x http://proxy:8080 https://api.example.com

# Sauvegarder les cookies
curl -c cookies.txt https://example.com/login
curl -b cookies.txt https://example.com/dashboard
```

## Next Steps

- [Manuel cURL](https://curl.se/docs/manual.html) - Documentation officielle
- [Everything cURL](https://everything.curl.dev/) - Livre
- [cURL Cookbook](https://catonmat.net/cookbooks/curl) - Recettes
- [httpie](https://httpie.io/) - Alternative moderne
