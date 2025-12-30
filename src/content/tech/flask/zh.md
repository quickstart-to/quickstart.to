---
title: "Flask"
description: "Python 微框架 - 核心极简，架构灵活，按需添加功能"
template: "framework"
tags: ["backend", "python", "framework"]
---

## TL;DR

**一句话**：Flask 是 Python 的微框架——核心极简，按需添加。

**核心优势**：
- 极简灵活 - 不强制项目结构
- 易学 - 几分钟就能跑起来
- 可扩展 - 庞大的扩展生态
- Werkzeug + Jinja2 - 久经考验的基础

## Core Concepts

### 概念 1：路由 = 装饰器

用装饰器定义路由：

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello!'

@app.route('/users/<int:user_id>')
def get_user(user_id):
    return f'User {user_id}'
```

### 概念 2：请求上下文

通过 `request` 对象访问请求数据：

```python
from flask import request

@app.route('/search')
def search():
    query = request.args.get('q')        # 查询参数
    page = request.args.get('page', 1)   # 带默认值
    return f'Searching: {query}'

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json                   # JSON 请求体
    return {'created': data}
```

### 概念 3：扩展

Flask 故意设计得很小。用扩展添加功能：

```python
# 数据库
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy(app)

# 认证
from flask_login import LoginManager
login = LoginManager(app)

# REST API
from flask_restful import Api
api = Api(app)
```

## Quick Start

### 安装

```bash
pip install flask
```

### 创建 app.py

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({'message': 'Hello Flask!'})

if __name__ == '__main__':
    app.run(debug=True)
```

### 运行

```bash
flask run --debug
# 打开 http://localhost:5000
```

## Gotchas

### 调试模式需要手动开启

```bash
# 开发环境 - 启用自动重载和调试器
flask run --debug

# 或在代码中（生产环境不要用！）
app.run(debug=True)

# 生产环境 - 永远不要用 debug=True
gunicorn app:app
```

### 必须指定 HTTP 方法

```python
# ❌ POST 不会工作
@app.route('/users')
def users():
    return 'Users'

# ✅ 显式允许 POST
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        return 'Created', 201
    return 'Users'
```

### 需要应用上下文

```python
# ❌ 请求外报错
from flask import current_app
print(current_app.config)  # RuntimeError!

# ✅ 手动推送上下文
with app.app_context():
    print(current_app.config)
```

### 大型应用用蓝图

```python
# users.py
from flask import Blueprint, jsonify

users_bp = Blueprint('users', __name__)

@users_bp.route('/')
def list_users():
    return jsonify([])

# app.py
from users import users_bp
app.register_blueprint(users_bp, url_prefix='/users')
```

## When to Use

**适合**：
- 中小型 API
- 原型和 MVP
- 想要完全控制的团队
- 微服务

**不适合**：
- 需要结构的大型应用（用 Django）
- 异步密集型应用（用 FastAPI）
- 需要自动文档的生产 API（用 FastAPI）

**对比**：
| 特性 | Flask | Django | FastAPI |
|------|-------|--------|---------|
| 体积 | 微型 | 全功能 | 微型 |
| 学习曲线 | 简单 | 中等 | 简单 |
| 自动文档 | 无 | 无 | 有 |
| 异步 | 有限 | 有限 | 原生 |

## Next Steps

- [Flask 文档](https://flask.palletsprojects.com/)
- [Flask 教程](https://flask.palletsprojects.com/tutorial/)
- [Flask-RESTful](https://flask-restful.readthedocs.io/)
- [Flask 超级教程](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

## Cheatsheet

| 模式 | 代码 |
|------|------|
| 路由 | `@app.route('/path')` |
| 方法 | `@app.route('/', methods=['GET', 'POST'])` |
| URL 参数 | `@app.route('/<int:id>')` |
| 查询参数 | `request.args.get('q')` |
| JSON 请求体 | `request.json` |
| JSON 响应 | `jsonify({'key': 'value'})` |
| 状态码 | `return data, 201` |
| 重定向 | `redirect(url_for('index'))` |
| 模板 | `render_template('index.html', name=name)` |
| 蓝图 | `Blueprint('name', __name__)` |
