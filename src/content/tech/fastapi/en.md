---
title: "FastAPI"
description: "Get started with FastAPI framework in 5 minutes"
tags: ["backend", "python", "api", "framework"]
---

## TL;DR

**What**: A modern, fast web framework for building APIs with Python 3.7+.

**Why**: Auto-generated docs, type hints, async support, extremely fast, great DX.

## Quick Start

**Install**:
```bash
pip install fastapi uvicorn
```

Create `main.py`:
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
```

**Run**:
```bash
uvicorn main:app --reload
```

Open:
- http://localhost:8000 - API
- http://localhost:8000/docs - Swagger UI
- http://localhost:8000/redoc - ReDoc

## Cheatsheet

| Feature | Syntax |
|---------|--------|
| Path parameter | `@app.get("/items/{id}")` |
| Query parameter | `def func(skip: int = 0)` |
| Request body | `def func(item: Item)` |
| Headers | `def func(x_token: str = Header())` |
| Response model | `@app.get("/", response_model=Item)` |
| Status code | `@app.post("/", status_code=201)` |

## Gotchas

### Request body with Pydantic

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = False

@app.post("/items/")
def create_item(item: Item):
    return item
```

### Async endpoints

```python
@app.get("/async-items/")
async def read_items():
    results = await some_async_operation()
    return results
```

### Dependency Injection

```python
from fastapi import Depends

def get_db():
    db = Database()
    try:
        yield db
    finally:
        db.close()

@app.get("/items/")
def read_items(db = Depends(get_db)):
    return db.query(Item).all()
```

### Path operations order matters

```python
@app.get("/users/me")    # Must be before /users/{id}
def read_user_me():
    return {"user": "current"}

@app.get("/users/{user_id}")
def read_user(user_id: int):
    return {"user_id": user_id}
```

## Next Steps

- [FastAPI Documentation](https://fastapi.tiangolo.com/) - Official docs
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/) - Step-by-step
- [SQLModel](https://sqlmodel.tiangolo.com/) - Database with FastAPI
- [Full Stack FastAPI](https://github.com/fastapi/full-stack-fastapi-template) - Template
