---
title: "Flask"
description: "Get started with Flask micro framework in 5 minutes"
template: "framework"
tags: ["backend", "python", "framework"]
---

## TL;DR

**One-liner**: Flask is Python's micro framework - minimal core, add what you need.

**Core Strengths**:
- Minimal and flexible - no forced project structure
- Easy to learn - get running in minutes
- Extensible - huge ecosystem of extensions
- Werkzeug + Jinja2 - battle-tested foundations

## Core Concepts

### Concept 1: Routes = Decorators

Define routes with decorators:

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

### Concept 2: Request Context

Access request data through the `request` object:

```python
from flask import request

@app.route('/search')
def search():
    query = request.args.get('q')        # Query params
    page = request.args.get('page', 1)   # With default
    return f'Searching: {query}'

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json                   # JSON body
    return {'created': data}
```

### Concept 3: Extensions

Flask is intentionally minimal. Add features with extensions:

```python
# Database
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy(app)

# Authentication
from flask_login import LoginManager
login = LoginManager(app)

# REST APIs
from flask_restful import Api
api = Api(app)
```

## Quick Start

### Install

```bash
pip install flask
```

### Create app.py

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({'message': 'Hello Flask!'})

if __name__ == '__main__':
    app.run(debug=True)
```

### Run

```bash
flask run --debug
# Open http://localhost:5000
```

## Gotchas

### Debug mode is opt-in

```bash
# Development - enables auto-reload and debugger
flask run --debug

# Or in code (not for production!)
app.run(debug=True)

# Production - never use debug=True
gunicorn app:app
```

### Methods must be specified

```python
# ❌ POST won't work
@app.route('/users')
def users():
    return 'Users'

# ✅ Explicitly allow POST
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        return 'Created', 201
    return 'Users'
```

### Application context required

```python
# ❌ Error outside request
from flask import current_app
print(current_app.config)  # RuntimeError!

# ✅ Push context manually
with app.app_context():
    print(current_app.config)
```

### Blueprints for larger apps

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

**Best for**:
- Small to medium APIs
- Prototypes and MVPs
- Teams wanting full control
- Microservices

**Not ideal for**:
- Large apps needing structure (use Django)
- Async-heavy apps (use FastAPI)
- Production APIs needing auto-docs (use FastAPI)

**Comparison**:
| Feature | Flask | Django | FastAPI |
|---------|-------|--------|---------|
| Size | Micro | Full | Micro |
| Learning curve | Easy | Medium | Easy |
| Auto docs | No | No | Yes |
| Async | Limited | Limited | Native |

## Next Steps

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Flask Tutorial](https://flask.palletsprojects.com/tutorial/)
- [Flask-RESTful](https://flask-restful.readthedocs.io/)
- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Route | `@app.route('/path')` |
| Methods | `@app.route('/', methods=['GET', 'POST'])` |
| URL param | `@app.route('/<int:id>')` |
| Query param | `request.args.get('q')` |
| JSON body | `request.json` |
| JSON response | `jsonify({'key': 'value'})` |
| Status code | `return data, 201` |
| Redirect | `redirect(url_for('index'))` |
| Template | `render_template('index.html', name=name)` |
| Blueprint | `Blueprint('name', __name__)` |
