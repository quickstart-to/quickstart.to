---
title: "OpenAPI"
description: "5 分钟快速入门 OpenAPI/Swagger"
tags: ["api", "documentation", "specification"]
---

## TL;DR

**是什么**：描述 RESTful API 的标准规范。

**为什么用**：交互式文档、代码生成、API 测试、语言无关的契约。

## Quick Start

**创建规范**（`openapi.yaml`）：
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

**使用 Swagger UI 查看**：
```bash
npx @redocly/cli preview-docs openapi.yaml
# 或使用 https://editor.swagger.io
```

## Cheatsheet

| 概念 | 描述 |
|---------|-------------|
| `paths` | API 端点 |
| `components` | 可复用 schema |
| `parameters` | 查询、路径、头部参数 |
| `requestBody` | 请求体 schema |
| `responses` | 响应定义 |
| `security` | 认证定义 |

## Gotchas

### 完整端点

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

### Schema

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

### 认证

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

### 代码生成

```bash
# 生成 TypeScript 客户端
npx openapi-typescript-codegen --input openapi.yaml --output ./client

# 生成服务端存根（Java）
npx @openapitools/openapi-generator-cli generate \
  -i openapi.yaml -g spring -o ./server
```

## Next Steps

- [OpenAPI 规范](https://spec.openapis.org/oas/latest.html) - 完整规范
- [Swagger Editor](https://editor.swagger.io/) - 在线编辑器
- [Swagger UI](https://swagger.io/tools/swagger-ui/) - 交互式文档
- [OpenAPI Generator](https://openapi-generator.tech/) - 代码生成
