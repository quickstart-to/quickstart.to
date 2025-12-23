---
title: "Postman"
description: "Get started with Postman API testing in 5 minutes"
template: "tool"
tags: ["api", "testing", "development"]
---

## TL;DR

**What**: API development platform for building, testing, and documenting APIs.

**Why**: Visual interface, collections, environments, automated testing, team collaboration.

## Quick Start

**Install**: Download from [postman.com/downloads](https://www.postman.com/downloads/)

**First request**:
1. Click **New → Request**
2. Enter URL: `https://jsonplaceholder.typicode.com/posts/1`
3. Click **Send**
4. View response in bottom panel

**Create collection**:
1. Click **Collections → Create Collection**
2. Name it "My API"
3. Add requests to organize

## Cheatsheet

| Feature | Description |
|---------|-------------|
| Collections | Organize requests |
| Environments | Variable sets (dev/prod) |
| Variables | `{{variable}}` syntax |
| Pre-request Script | Run before request |
| Tests | Validate responses |
| Runner | Batch execute |

## Gotchas

### Environment variables

```javascript
// Set in environment
// BASE_URL: https://api.example.com
// TOKEN: your-auth-token

// Use in request URL
// {{BASE_URL}}/users

// Use in headers
// Authorization: Bearer {{TOKEN}}
```

### Pre-request script

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

### Test scripts

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

### Collection runner

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
- [Newman](https://github.com/postmanlabs/newman) - CLI runner
- [Postman Flows](https://www.postman.com/product/flows/) - Visual workflows
