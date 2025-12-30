---
title: "FastAPI"
description: "Comienza con el framework FastAPI en 5 minutos"
template: "framework"
tags: ["backend", "python", "api", "framework"]
---

## TL;DR

**En una línea**: FastAPI es la respuesta de Python para crear APIs rápido - los type hints se convierten en docs, validación y velocidad.

**Fortalezas principales**:
- Docs auto-generadas - Swagger UI y ReDoc gratis
- Orientado a tipos - validación Pydantic desde type hints
- Async nativo - construido sobre Starlette, tan rápido como Node/Go
- Amigable para desarrolladores - excelente soporte de editor y mensajes de error

## Core Concepts

### Concept 1: Type Hints = Validation + Docs

Tus type hints se convierten automáticamente en validación de requests, documentación de API y autocompletado del editor.

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str
    age: int | None = None

@app.post("/users/")
def create_user(user: User):  # Validado automáticamente
    return user  # Serializado automáticamente
```

### Concept 2: Path Operations

Los decoradores definen tus endpoints HTTP:

```python
@app.get("/users/{user_id}")    # GET con parámetro de ruta
@app.post("/users/")            # POST
@app.put("/users/{user_id}")    # PUT
@app.delete("/users/{user_id}") # DELETE
```

### Concept 3: Dependency Injection

Dependencias reutilizables para auth, conexiones de base de datos, etc.

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
    return {"message": "¡Hola FastAPI!"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
```

### Run

```bash
fastapi dev main.py
# Abre http://localhost:8000
# Docs en http://localhost:8000/docs
```

## Gotchas

### Route order matters

```python
# ❌ Mal - /users/me nunca se alcanza
@app.get("/users/{user_id}")
def get_user(user_id: str): ...

@app.get("/users/me")  # ¡Nunca se alcanza!
def get_me(): ...

# ✅ Correcto - rutas específicas primero
@app.get("/users/me")
def get_me(): ...

@app.get("/users/{user_id}")
def get_user(user_id: str): ...
```

### Async vs sync functions

```python
# Usa async para operaciones I/O
@app.get("/async")
async def async_endpoint():
    data = await fetch_from_db()  # No bloqueante
    return data

# Usa sync para llamadas CPU-bound o bloqueantes
@app.get("/sync")
def sync_endpoint():
    return heavy_computation()  # Se ejecuta en threadpool
```

### Request body needs Pydantic model

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    description: str | None = None

@app.post("/items/")
def create_item(item: Item):  # El body se valida
    return item

# Para acceso al body crudo
from fastapi import Request
@app.post("/raw")
async def raw_body(request: Request):
    body = await request.body()
```

### Query params vs path params

```python
# Parámetro de ruta: parte de la URL, requerido
@app.get("/users/{user_id}")  # /users/123
def get_user(user_id: int): ...

# Parámetro de query: después de ?, opcional por defecto
@app.get("/items/")  # /items/?skip=0&limit=10
def get_items(skip: int = 0, limit: int = 10): ...
```

## When to Use

**Ideal para**:
- APIs REST y microservicios
- Serving de modelos ML
- Aplicaciones en tiempo real (WebSockets)
- Equipos que aman la seguridad de tipos

**No ideal para**:
- Apps full-stack con templates (usa Django)
- Scripts simples (excesivo)
- Proyectos Python 2 legacy

**Comparación**:
| Característica | FastAPI | Django | Flask |
|---------|---------|--------|-------|
| Velocidad | Muy rápida | Media | Media |
| Async | Nativo | Limitado | Limitado |
| Auto docs | Sí | No | No |
| Curva de aprendizaje | Fácil | Media | Fácil |

## Next Steps

- [Documentación de FastAPI](https://fastapi.tiangolo.com/)
- [Tutorial de FastAPI](https://fastapi.tiangolo.com/tutorial/)
- [SQLModel](https://sqlmodel.tiangolo.com/) - ORM de Base de datos
- [Template Full Stack](https://github.com/fastapi/full-stack-fastapi-template)

## Cheatsheet

| Patrón | Código |
|---------|------|
| Parámetro de ruta | `@app.get("/items/{id}")` |
| Parámetro de query | `def f(skip: int = 0)` |
| Cuerpo de request | `def f(item: Item)` |
| Header | `def f(token: str = Header())` |
| Cookie | `def f(session: str = Cookie())` |
| Modelo de respuesta | `@app.get("/", response_model=Item)` |
| Código de estado | `@app.post("/", status_code=201)` |
| Dependencia | `def f(db = Depends(get_db))` |
| Tarea en segundo plano | `background_tasks.add_task(fn, arg)` |
