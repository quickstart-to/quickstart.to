---
title: "Flask"
description: "5 分钟快速入门 Flask 微框架"
tags: ["backend", "python", "framework"]
---

## TL;DR

**是什么**：轻量级的 Python WSGI Web 应用框架。

**为什么用**：精简、灵活、易学、适合 API 和小型应用。

## Quick Start

**安装并创建应用**：
```bash
pip install flask
```

创建 `app.py`：
```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
```

**运行**：
```bash
python app.py
# 或
flask run
```

打开 http://localhost:5000

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `flask run` | 启动开发服务器 |
| `flask run --debug` | 调试模式启动 |
| `flask shell` | 交互式 shell |
| `flask routes` | 显示所有路由 |

**常用模式**：
```python
@app.route('/path')           # GET 路由
@app.route('/path', methods=['POST'])  # POST 路由
@app.route('/user/<id>')      # URL 参数
@app.route('/user/<int:id>')  # 类型化参数
```

## Gotchas

### 请求和响应

```python
from flask import request, jsonify

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json  # 获取 JSON 请求体
    name = request.args.get('name')  # 查询参数
    return jsonify({'user': data}), 201
```

### URL 参数

```python
@app.route('/users/<int:user_id>')
def get_user(user_id):
    return jsonify({'id': user_id})

@app.route('/files/<path:filename>')
def get_file(filename):
    return f'File: {filename}'
```

### 模板（Jinja2）

```python
from flask import render_template

@app.route('/hello/<name>')
def hello(name):
    return render_template('hello.html', name=name)
```

```html
<!-- templates/hello.html -->
<h1>Hello, {{ name }}!</h1>
```

### 蓝图实现模块化

```python
# users.py
from flask import Blueprint

users_bp = Blueprint('users', __name__)

@users_bp.route('/users')
def list_users():
    return jsonify([])

# app.py
from users import users_bp
app.register_blueprint(users_bp, url_prefix='/api')
```

## Next Steps

- [Flask 文档](https://flask.palletsprojects.com/) - 官方文档
- [Flask 教程](https://flask.palletsprojects.com/tutorial/) - 官方教程
- [Flask-RESTful](https://flask-restful.readthedocs.io/) - REST 扩展
- [Flask 超级教程](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) - 全面指南
