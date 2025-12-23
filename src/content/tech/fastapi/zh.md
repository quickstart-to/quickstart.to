---
title: "FastAPI"
description: "5 分钟快速入门 FastAPI 框架"
template: "framework"
tags: ["backend", "python", "api", "framework"]
---

## TL;DR

**一句话**：FastAPI 是 Python 构建 API 的利器——类型提示变成文档、验证和速度。

**核心优势**：
- 自动生成文档 - Swagger UI 和 ReDoc 免费送
- 类型驱动 - Pydantic 从类型提示自动验证
- 原生异步 - 基于 Starlette，快如 Node/Go
- 开发友好 - 极佳的编辑器支持和错误提示

## Core Concepts

### 概念 1：类型提示 = 验证 + 文档

类型提示自动变成请求验证、API 文档和编辑器自动补全。

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str
    age: int | None = None

@app.post("/users/")
def create_user(user: User):  # 自动验证
    return user  # 自动序列化
```

### 概念 2：路径操作

装饰器定义 HTTP 端点：

```python
@app.get("/users/{user_id}")    # GET 带路径参数
@app.post("/users/")            # POST
@app.put("/users/{user_id}")    # PUT
@app.delete("/users/{user_id}") # DELETE
```

### 概念 3：依赖注入

可复用的依赖，用于认证、数据库连接等。

```python
from fastapi import Depends

def get_current_user(token: str = Header()):
    return decode_token(token)

@app.get("/me")
def read_me(user = Depends(get_current_user)):
    return user
```

## Quick Start

### 安装

```bash
pip install "fastapi[standard]"
```

### 创建 main.py

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

### 运行

```bash
fastapi dev main.py
# 打开 http://localhost:8000
# 文档在 http://localhost:8000/docs
```

## Gotchas

### 路由顺序很重要

```python
# ❌ 错误 - /users/me 永远匹配不到
@app.get("/users/{user_id}")
def get_user(user_id: str): ...

@app.get("/users/me")  # 永远到不了！
def get_me(): ...

# ✅ 正确 - 具体路由放前面
@app.get("/users/me")
def get_me(): ...

@app.get("/users/{user_id}")
def get_user(user_id: str): ...
```

### async vs sync 函数

```python
# I/O 操作用 async
@app.get("/async")
async def async_endpoint():
    data = await fetch_from_db()  # 非阻塞
    return data

# CPU 密集或阻塞调用用 sync
@app.get("/sync")
def sync_endpoint():
    return heavy_computation()  # 在线程池运行
```

### 请求体需要 Pydantic 模型

```python
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    description: str | None = None

@app.post("/items/")
def create_item(item: Item):  # 请求体自动验证
    return item

# 获取原始 body
from fastapi import Request
@app.post("/raw")
async def raw_body(request: Request):
    body = await request.body()
```

### 查询参数 vs 路径参数

```python
# 路径参数：URL 的一部分，必需
@app.get("/users/{user_id}")  # /users/123
def get_user(user_id: int): ...

# 查询参数：? 后面，默认可选
@app.get("/items/")  # /items/?skip=0&limit=10
def get_items(skip: int = 0, limit: int = 10): ...
```

## When to Use

**适合**：
- REST API 和微服务
- ML 模型服务
- 实时应用（WebSockets）
- 喜欢类型安全的团队

**不适合**：
- 带模板的全栈应用（用 Django）
- 简单脚本（杀鸡用牛刀）
- Python 2 遗留项目

**对比**：
| 特性 | FastAPI | Django | Flask |
|------|---------|--------|-------|
| 速度 | 非常快 | 中等 | 中等 |
| 异步 | 原生 | 有限 | 有限 |
| 自动文档 | 是 | 否 | 否 |
| 学习曲线 | 简单 | 中等 | 简单 |

## Next Steps

- [FastAPI 文档](https://fastapi.tiangolo.com/zh/)
- [FastAPI 教程](https://fastapi.tiangolo.com/zh/tutorial/)
- [SQLModel](https://sqlmodel.tiangolo.com/) - 数据库 ORM
- [全栈模板](https://github.com/fastapi/full-stack-fastapi-template)

## Cheatsheet

| 模式 | 代码 |
|------|------|
| 路径参数 | `@app.get("/items/{id}")` |
| 查询参数 | `def f(skip: int = 0)` |
| 请求体 | `def f(item: Item)` |
| 请求头 | `def f(token: str = Header())` |
| Cookie | `def f(session: str = Cookie())` |
| 响应模型 | `@app.get("/", response_model=Item)` |
| 状态码 | `@app.post("/", status_code=201)` |
| 依赖 | `def f(db = Depends(get_db))` |
| 后台任务 | `background_tasks.add_task(fn, arg)` |
