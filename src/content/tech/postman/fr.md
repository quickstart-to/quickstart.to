---
title: "Postman"
description: "Démarrez avec les tests d'API Postman en 5 minutes"
template: "tool"
tags: ["api", "testing", "development"]
---

## TL;DR

**Quoi** : Plateforme de développement d'API pour construire, tester et documenter les APIs.

**Pourquoi** : Interface visuelle, collections, environnements, tests automatisés, collaboration d'équipe.

## Quick Start

**Installer** : Télécharger depuis [postman.com/downloads](https://www.postman.com/downloads/)

**Première requête** :
1. Cliquez sur **New → Request**
2. Entrez l'URL : `https://jsonplaceholder.typicode.com/posts/1`
3. Cliquez sur **Send**
4. Voir la réponse dans le panneau inférieur

**Créer une collection** :
1. Cliquez sur **Collections → Create Collection**
2. Nommez-la "My API"
3. Ajoutez des requêtes pour organiser

## Cheatsheet

| Fonctionnalité | Description |
|---------|-------------|
| Collections | Organiser les requêtes |
| Environments | Ensembles de variables (dev/prod) |
| Variables | Syntaxe `{{variable}}` |
| Pre-request Script | Exécuter avant la requête |
| Tests | Valider les réponses |
| Runner | Exécution par lots |

## Gotchas

### Variables d'environnement

```javascript
// Set in environment
// BASE_URL: https://api.example.com
// TOKEN: your-auth-token

// Use in request URL
// {{BASE_URL}}/users

// Use in headers
// Authorization: Bearer {{TOKEN}}
```

### Script de pré-requête

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

### Scripts de test

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

- [Postman Learning Center](https://learning.postman.com/) - Tutoriels
- [Postman API](https://www.postman.com/postman/workspace/postman-public-workspace/) - API Postman
- [Newman](https://github.com/postmanlabs/newman) - CLI Runner
- [Postman Flows](https://www.postman.com/product/flows/) - Workflows visuels
