---
title: "FastAPI"
description: "Framework API Python moderne - les type hints deviennent docs et validation, async-natif, aussi rapide que Node/Go"
template: "framework"
tags: ["backend", "python", "api", "framework"]
---

## TL;DR

**En une ligne** : FastAPI est la réponse de Python pour créer des APIs rapidement - les type hints deviennent docs, validation et vitesse.

**Forces principales** :
- Docs auto-générées - Swagger UI et ReDoc gratuits
- Orienté types - validation Pydantic à partir des type hints
- Async natif - construit sur Starlette, aussi rapide que Node/Go
- Convivial pour les développeurs - excellent support éditeur et messages d'erreur

## Core Concepts

### Concept 1: Type Hints = Validation + Docs

Vos type hints deviennent automatiquement validation de requête, documentation API et autocomplétion éditeur.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str
    age: int | None = None

@app.post("/users/")
def create_user(user: User):  # Validé automatiquement
    return user  # Sérialisé automatiquement
```

### Concept 2: Path Operations

Les décorateurs définissent vos endpoints HTTP :

```python
@app.get("/users/{user_id}")    # GET avec paramètre de chemin
@app.post("/users/")            # POST
@app.put("/users/{user_id}")    # PUT
@app.delete("/users/{user_id}") # DELETE
```

### Concept 3: Dependency Injection

Dépendances réutilisables pour auth, connexions base de données, etc.

```python
from fastapi import Depends

def get_current_user(token: str = Header()):
    return decode_token(token)

@app.get("/me")
def read_me(user = Depends(get_current_user)):
    return user
```

## Quick Start

### Install

```bash
pip install "fastapi[standard]"
```

### Create main.py

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Bonjour FastAPI!"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
```

### Run

```bash
fastapi dev main.py
# Ouvrez http://localhost:8000
# Docs sur http://localhost:8000/docs
```

## Gotchas

### Route order matters

```python
# ❌ Faux - /users/me n'est jamais atteint
@app.get("/users/{user_id}")
def get_user(user_id: str): ...

@app.get("/users/me")  # Jamais atteint !
def get_me(): ...

# ✅ Correct - routes spécifiques en premier
@app.get("/users/me")
def get_me(): ...

@app.get("/users/{user_id}")
def get_user(user_id: str): ...
```

### Async vs sync functions

```python
# Utilisez async pour les opérations I/O
@app.get("/async")
async def async_endpoint():
    data = await fetch_from_db()  # Non-bloquant
    return data

# Utilisez sync pour les appels CPU-bound ou bloquants
@app.get("/sync")
def sync_endpoint():
    return heavy_computation()  # S'exécute dans un threadpool
```

### Request body needs Pydantic model

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    description: str | None = None

@app.post("/items/")
def create_item(item: Item):  # Le body est validé
    return item

# Pour l'accès au body brut
from fastapi import Request
@app.post("/raw")
async def raw_body(request: Request):
    body = await request.body()
```

### Query params vs path params

```python
# Paramètre de chemin : partie de l'URL, requis
@app.get("/users/{user_id}")  # /users/123
def get_user(user_id: int): ...

# Paramètre de requête : après ?, optionnel par défaut
@app.get("/items/")  # /items/?skip=0&limit=10
def get_items(skip: int = 0, limit: int = 10): ...
```

## When to Use

**Idéal pour** :
- APIs REST et microservices
- Serving de modèles ML
- Applications temps réel (WebSockets)
- Équipes qui aiment la sécurité des types

**Pas idéal pour** :
- Apps full-stack avec templates (utilisez Django)
- Scripts simples (excessif)
- Projets Python 2 legacy

**Comparaison** :
| Fonctionnalité | FastAPI | Django | Flask |
|---------|---------|--------|-------|
| Vitesse | Très rapide | Moyenne | Moyenne |
| Async | Natif | Limité | Limité |
| Auto docs | Oui | Non | Non |
| Courbe d'apprentissage | Facile | Moyenne | Facile |

## Next Steps

- [Documentation FastAPI](https://fastapi.tiangolo.com/)
- [Tutoriel FastAPI](https://fastapi.tiangolo.com/tutorial/)
- [SQLModel](https://sqlmodel.tiangolo.com/) - ORM Base de données
- [Template Full Stack](https://github.com/fastapi/full-stack-fastapi-template)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Paramètre de chemin | `@app.get("/items/{id}")` |
| Paramètre de requête | `def f(skip: int = 0)` |
| Corps de requête | `def f(item: Item)` |
| Header | `def f(token: str = Header())` |
| Cookie | `def f(session: str = Cookie())` |
| Modèle de réponse | `@app.get("/", response_model=Item)` |
| Code de statut | `@app.post("/", status_code=201)` |
| Dépendance | `def f(db = Depends(get_db))` |
| Tâche en arrière-plan | `background_tasks.add_task(fn, arg)` |
