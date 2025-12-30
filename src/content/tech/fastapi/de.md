---
title: "FastAPI"
description: "Starten Sie mit dem FastAPI Framework in 5 Minuten"
template: "framework"
tags: ["backend", "python", "api", "framework"]
---

## TL;DR

**Eine Zeile**: FastAPI ist Pythons Antwort auf schnelle API-Entwicklung - Type-Hints werden zu Docs, Validierung und Geschwindigkeit.

**Kernstärken**:
- Auto-generierte Docs - Swagger UI und ReDoc kostenlos
- Type-driven - Pydantic-Validierung aus Type-Hints
- Async nativ - auf Starlette gebaut, so schnell wie Node/Go
- Entwicklerfreundlich - ausgezeichnete Editor-Unterstützung und Fehlermeldungen

## Core Concepts

### Concept 1: Type Hints = Validation + Docs

Ihre Type-Hints werden automatisch zu Request-Validierung, API-Dokumentation und Editor-Autocomplete.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str
    age: int | None = None

@app.post("/users/")
def create_user(user: User):  # Automatisch validiert
    return user  # Automatisch serialisiert
```

### Concept 2: Path Operations

Dekoratoren definieren Ihre HTTP-Endpoints:

```python
@app.get("/users/{user_id}")    # GET mit Path-Parameter
@app.post("/users/")            # POST
@app.put("/users/{user_id}")    # PUT
@app.delete("/users/{user_id}") # DELETE
```

### Concept 3: Dependency Injection

Wiederverwendbare Dependencies für Auth, Datenbankverbindungen usw.

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
    return {"message": "Hallo FastAPI!"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
```

### Run

```bash
fastapi dev main.py
# Öffne http://localhost:8000
# Docs unter http://localhost:8000/docs
```

## Gotchas

### Route order matters

```python
# ❌ Falsch - /users/me wird nie erreicht
@app.get("/users/{user_id}")
def get_user(user_id: str): ...

@app.get("/users/me")  # Wird nie erreicht!
def get_me(): ...

# ✅ Korrekt - spezifische Routen zuerst
@app.get("/users/me")
def get_me(): ...

@app.get("/users/{user_id}")
def get_user(user_id: str): ...
```

### Async vs sync functions

```python
# Verwende async für I/O-Operationen
@app.get("/async")
async def async_endpoint():
    data = await fetch_from_db()  # Nicht-blockierend
    return data

# Verwende sync für CPU-gebundene oder blockierende Aufrufe
@app.get("/sync")
def sync_endpoint():
    return heavy_computation()  # Läuft im Threadpool
```

### Request body needs Pydantic model

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    description: str | None = None

@app.post("/items/")
def create_item(item: Item):  # Body wird validiert
    return item

# Für rohen Body-Zugriff
from fastapi import Request
@app.post("/raw")
async def raw_body(request: Request):
    body = await request.body()
```

### Query params vs path params

```python
# Path-Parameter: Teil der URL, erforderlich
@app.get("/users/{user_id}")  # /users/123
def get_user(user_id: int): ...

# Query-Parameter: nach ?, standardmäßig optional
@app.get("/items/")  # /items/?skip=0&limit=10
def get_items(skip: int = 0, limit: int = 10): ...
```

## When to Use

**Am besten für**:
- REST APIs und Microservices
- ML-Model-Serving
- Echtzeit-Anwendungen (WebSockets)
- Teams, die Type-Safety lieben

**Nicht ideal für**:
- Full-Stack-Apps mit Templates (Django verwenden)
- Einfache Skripte (übertrieben)
- Legacy Python 2 Projekte

**Vergleich**:
| Feature | FastAPI | Django | Flask |
|---------|---------|--------|-------|
| Geschwindigkeit | Sehr schnell | Mittel | Mittel |
| Async | Nativ | Begrenzt | Begrenzt |
| Auto-Docs | Ja | Nein | Nein |
| Lernkurve | Einfach | Mittel | Einfach |

## Next Steps

- [FastAPI Dokumentation](https://fastapi.tiangolo.com/)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [SQLModel](https://sqlmodel.tiangolo.com/) - Datenbank-ORM
- [Full Stack Template](https://github.com/fastapi/full-stack-fastapi-template)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Path-Parameter | `@app.get("/items/{id}")` |
| Query-Parameter | `def f(skip: int = 0)` |
| Request Body | `def f(item: Item)` |
| Header | `def f(token: str = Header())` |
| Cookie | `def f(session: str = Cookie())` |
| Response Model | `@app.get("/", response_model=Item)` |
| Status Code | `@app.post("/", status_code=201)` |
| Dependency | `def f(db = Depends(get_db))` |
| Background Task | `background_tasks.add_task(fn, arg)` |
