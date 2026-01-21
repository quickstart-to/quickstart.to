---
title: "FastAPI"
description: "Python modern API framework - type hints become docs and validation, async-native, as fast as Node/Go"
template: "framework"
tags: ["backend", "python", "api", "framework"]
---

## TL;DR

**One-liner**: FastAPI is Python's answer to building APIs fast - type hints become docs, validation, and speed.

**Core Strengths**:
- Auto-generated docs - Swagger UI and ReDoc for free
- Type-driven - Pydantic validation from type hints
- Async native - built on Starlette, as fast as Node/Go
- Developer friendly - excellent editor support and error messages

## Core Concepts

### Concept 1: Type Hints = Validation + Docs

Your type hints automatically become request validation, API documentation, and editor autocomplete.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str
    age: int | None = None

@app.post("/users/")
def create_user(user: User):  # Validated automatically
    return user  # Serialized automatically
```

### Concept 2: Path Operations

Decorators define your HTTP endpoints:

```python
@app.get("/users/{user_id}")    # GET with path param
@app.post("/users/")            # POST
@app.put("/users/{user_id}")    # PUT
@app.delete("/users/{user_id}") # DELETE
```

### Concept 3: Dependency Injection

Reusable dependencies for auth, database connections, etc.

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
    return {"message": "Hello FastAPI!"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
```

### Run

```bash
fastapi dev main.py
# Open http://localhost:8000
# Docs at http://localhost:8000/docs
```

## Gotchas

### Route order matters

```python
# ❌ Wrong - /users/me is never matched
@app.get("/users/{user_id}")
def get_user(user_id: str): ...

@app.get("/users/me")  # Never reached!
def get_me(): ...

# ✅ Correct - specific routes first
@app.get("/users/me")
def get_me(): ...

@app.get("/users/{user_id}")
def get_user(user_id: str): ...
```

### Async vs sync functions

```python
# Use async for I/O operations
@app.get("/async")
async def async_endpoint():
    data = await fetch_from_db()  # Non-blocking
    return data

# Use sync for CPU-bound or blocking calls
@app.get("/sync")
def sync_endpoint():
    return heavy_computation()  # Runs in threadpool
```

### Request body needs Pydantic model

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    description: str | None = None

@app.post("/items/")
def create_item(item: Item):  # Body is validated
    return item

# For raw body access
from fastapi import Request
@app.post("/raw")
async def raw_body(request: Request):
    body = await request.body()
```

### Query params vs path params

```python
# Path param: part of URL, required
@app.get("/users/{user_id}")  # /users/123
def get_user(user_id: int): ...

# Query param: after ?, optional by default
@app.get("/items/")  # /items/?skip=0&limit=10
def get_items(skip: int = 0, limit: int = 10): ...
```

## When to Use

**Best for**:
- REST APIs and microservices
- ML model serving
- Real-time applications (WebSockets)
- Teams that love type safety

**Not ideal for**:
- Full-stack apps with templates (use Django)
- Simple scripts (overkill)
- Legacy Python 2 projects

**Comparison**:
| Feature | FastAPI | Django | Flask |
|---------|---------|--------|-------|
| Speed | Very fast | Moderate | Moderate |
| Async | Native | Limited | Limited |
| Auto docs | Yes | No | No |
| Learning curve | Easy | Medium | Easy |

## Next Steps

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [SQLModel](https://sqlmodel.tiangolo.com/) - Database ORM
- [Full Stack Template](https://github.com/fastapi/full-stack-fastapi-template)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Path param | `@app.get("/items/{id}")` |
| Query param | `def f(skip: int = 0)` |
| Request body | `def f(item: Item)` |
| Header | `def f(token: str = Header())` |
| Cookie | `def f(session: str = Cookie())` |
| Response model | `@app.get("/", response_model=Item)` |
| Status code | `@app.post("/", status_code=201)` |
| Dependency | `def f(db = Depends(get_db))` |
| Background task | `background_tasks.add_task(fn, arg)` |
