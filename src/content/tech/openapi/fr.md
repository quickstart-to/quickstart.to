---
title: "OpenAPI"
description: "Démarrez avec OpenAPI/Swagger en 5 minutes"
template: "tool"
tags: ["api", "documentation", "specification"]
---

## TL;DR

**Quoi** : Spécification standard pour décrire les APIs RESTful.

**Pourquoi** : Docs interactives, génération de code, tests d'API, contrat indépendant du langage.

## Quick Start

**Créer une spec** (`openapi.yaml`) :
```yaml
openapi: 3.0.3
info:
  title: My API
  version: 1.0.0
  description: A simple API

servers:
  - url: http://localhost:3000

paths:
  /users:
    get:
      summary: List users
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
```

**Visualiser avec Swagger UI** :
```bash
npx @redocly/cli preview-docs openapi.yaml
# Or use https://editor.swagger.io
```

## Cheatsheet

| Concept | Description |
|---------|-------------|
| `paths` | Endpoints API |
| `components` | Schémas réutilisables |
| `parameters` | Params query, path, header |
| `requestBody` | Schéma du corps de requête |
| `responses` | Définitions des réponses |
| `security` | Définitions d'authentification |

## Gotchas

### Complete endpoint

```yaml
paths:
  /users/{id}:
    get:
      summary: Get user by ID
      tags:
        - Users
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: User found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found

    put:
      summary: Update user
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserUpdate'
      responses:
        '200':
          description: Updated
```

### Schemas

```yaml
components:
  schemas:
    User:
      type: object
      required:
        - id
        - email
      properties:
        id:
          type: integer
          readOnly: true
        email:
          type: string
          format: email
        name:
          type: string
          minLength: 1
          maxLength: 100
        role:
          type: string
          enum: [admin, user, guest]
        createdAt:
          type: string
          format: date-time

    UserUpdate:
      type: object
      properties:
        name:
          type: string
        role:
          type: string
```

### Authentication

```yaml
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    apiKey:
      type: apiKey
      in: header
      name: X-API-Key

security:
  - bearerAuth: []

paths:
  /admin:
    get:
      security:
        - apiKey: []
      # ...
```

### Code generation

```bash
# Generate TypeScript client
npx openapi-typescript-codegen --input openapi.yaml --output ./client

# Generate server stub (Java)
npx @openapitools/openapi-generator-cli generate \
  -i openapi.yaml -g spring -o ./server
```

## Next Steps

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) - Spécification complète
- [Swagger Editor](https://editor.swagger.io/) - Éditeur en ligne
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - Docs interactives
- [OpenAPI Generator](https://openapi-generator.tech/) - Génération de code
