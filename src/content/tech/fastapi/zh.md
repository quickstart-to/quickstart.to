---
title: "FastAPI"
description: "5 分钟快速入门 FastAPI 框架"
tags: ["backend", "python", "api", "framework"]
---

## TL;DR

**是什么**：用 Python 3.7+ 构建 API 的现代、高速 Web 框架。

**为什么用**：自动生成文档、类型提示、异步支持、极快、优秀的开发体验。

## Quick Start

**安装**：
```bash
pip install fastapi uvicorn
```

创建 `main.py`：
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

**运行**：
```bash
uvicorn main:app --reload
```

打开：
- http://localhost:8000 - API
- http://localhost:8000/docs - Swagger UI
- http://localhost:8000/redoc - ReDoc

## Cheatsheet

| 功能 | 语法 |
|---------|--------|
| 路径参数 | `@app.get("/items/{id}")` |
| 查询参数 | `def func(skip: int = 0)` |
| 请求体 | `def func(item: Item)` |
| 请求头 | `def func(x_token: str = Header())` |
| 响应模型 | `@app.get("/", response_model=Item)` |
| 状态码 | `@app.post("/", status_code=201)` |

## Gotchas

### Pydantic 请求体

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

### 异步端点

```python
@app.get("/async-items/")
async def read_items():
    results = await some_async_operation()
    return results
```

### 依赖注入

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

### 路径操作顺序很重要

```python
@app.get("/users/me")    # 必须在 /users/{id} 之前
def read_user_me():
    return {"user": "current"}

@app.get("/users/{user_id}")
def read_user(user_id: int):
    return {"user_id": user_id}
```

## Next Steps

- [FastAPI 文档](https://fastapi.tiangolo.com/zh/) - 官方文档
- [FastAPI 教程](https://fastapi.tiangolo.com/zh/tutorial/) - 分步教程
- [SQLModel](https://sqlmodel.tiangolo.com/) - FastAPI 数据库
- [全栈 FastAPI 模板](https://github.com/fastapi/full-stack-fastapi-template) - 模板
