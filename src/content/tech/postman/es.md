---
title: "Postman"
description: "Comienza con pruebas de API en Postman en 5 minutos"
template: "tool"
tags: ["api", "testing", "development"]
---

## TL;DR

**Qué**: Plataforma de desarrollo de API para construir, probar y documentar APIs.

**Por qué**: Interfaz visual, colecciones, entornos, pruebas automatizadas, colaboración en equipo.

## Quick Start

**Instalar**: Descargar desde [postman.com/downloads](https://www.postman.com/downloads/)

**Primera solicitud**:
1. Haz clic en **New → Request**
2. Ingresa la URL: `https://jsonplaceholder.typicode.com/posts/1`
3. Haz clic en **Send**
4. Ver la respuesta en el panel inferior

**Crear colección**:
1. Haz clic en **Collections → Create Collection**
2. Nómbrala "My API"
3. Añade solicitudes para organizar

## Cheatsheet

| Característica | Descripción |
|---------|-------------|
| Collections | Organizar solicitudes |
| Environments | Conjuntos de variables (dev/prod) |
| Variables | Sintaxis `{{variable}}` |
| Pre-request Script | Ejecutar antes de la solicitud |
| Tests | Validar respuestas |
| Runner | Ejecución por lotes |

## Gotchas

### Variables de entorno

```javascript
// Set in environment
// BASE_URL: https://api.example.com
// TOKEN: your-auth-token

// Use in request URL
// {{BASE_URL}}/users

// Use in headers
// Authorization: Bearer {{TOKEN}}
```

### Script de pre-solicitud

```javascript
// Generate timestamp
pm.environment.set("timestamp", Date.now());

// Generate random data
pm.environment.set("randomEmail", `user${Math.random().toString(36).slice(2)}@test.com`);

// Get data from previous request
const token = pm.environment.get("authToken");
pm.request.headers.add({
    key: "Authorization",
    value: `Bearer ${token}`
});
```

### Scripts de prueba

```javascript
// Check status
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Check response time
pm.test("Response time < 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Check response body
pm.test("Has user id", function () {
    const json = pm.response.json();
    pm.expect(json).to.have.property("id");
    pm.expect(json.id).to.be.a("number");
});

// Save to environment
const json = pm.response.json();
pm.environment.set("userId", json.id);

// Check array
pm.test("Returns array of users", function () {
    const json = pm.response.json();
    pm.expect(json).to.be.an("array");
    pm.expect(json.length).to.be.greaterThan(0);
});
```

### Collection Runner

```javascript
// Run collection with data file (CSV/JSON)
// data.json:
[
    { "email": "user1@test.com", "name": "User 1" },
    { "email": "user2@test.com", "name": "User 2" }
]

// In request body
{
    "email": "{{email}}",
    "name": "{{name}}"
}

// Access iteration data in tests
pm.test("User created", function () {
    const json = pm.response.json();
    pm.expect(json.email).to.eql(pm.iterationData.get("email"));
});
```

### Newman CLI

```bash
# Install
npm install -g newman

# Run collection
newman run collection.json

# With environment
newman run collection.json -e environment.json

# Generate report
newman run collection.json -r html
```

## Next Steps

- [Postman Learning Center](https://learning.postman.com/) - Tutoriales
- [Postman API](https://www.postman.com/postman/workspace/postman-public-workspace/) - API Postman
- [Newman](https://github.com/postmanlabs/newman) - CLI Runner
- [Postman Flows](https://www.postman.com/product/flows/) - Flujos visuales
