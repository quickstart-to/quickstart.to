---
title: "Postman"
description: "API-Entwicklungsplattform - visuelles Testen, Collections, Environments, automatisierte Tests"
template: "tool"
tags: ["api", "testing", "development"]
---

## TL;DR

**Was**: API-Entwicklungsplattform zum Erstellen, Testen und Dokumentieren von APIs.

**Warum**: Visuelle Oberfläche, Collections, Environments, automatisierte Tests, Team-Zusammenarbeit.

## Quick Start

**Installieren**: Download von [postman.com/downloads](https://www.postman.com/downloads/)

**Erste Anfrage**:
1. Klicken Sie auf **New → Request**
2. URL eingeben: `https://jsonplaceholder.typicode.com/posts/1`
3. Klicken Sie auf **Send**
4. Antwort im unteren Panel ansehen

**Collection erstellen**:
1. Klicken Sie auf **Collections → Create Collection**
2. Benennen Sie sie "My API"
3. Anfragen zur Organisation hinzufügen

## Cheatsheet

| Funktion | Beschreibung |
|---------|-------------|
| Collections | Anfragen organisieren |
| Environments | Variablensets (dev/prod) |
| Variables | `{{variable}}` Syntax |
| Pre-request Script | Vor Anfrage ausführen |
| Tests | Antworten validieren |
| Runner | Batch-Ausführung |

## Gotchas

### Umgebungsvariablen

```javascript
// Set in environment
// BASE_URL: https://api.example.com
// TOKEN: your-auth-token

// Use in request URL
// {{BASE_URL}}/users

// Use in headers
// Authorization: Bearer {{TOKEN}}
```

### Pre-Request Script

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

### Test-Scripts

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

- [Postman Learning Center](https://learning.postman.com/) - Tutorials
- [Postman API](https://www.postman.com/postman/workspace/postman-public-workspace/) - Postman API
- [Newman](https://github.com/postmanlabs/newman) - CLI Runner
- [Postman Flows](https://www.postman.com/product/flows/) - Visuelle Workflows
