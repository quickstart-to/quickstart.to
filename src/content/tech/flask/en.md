---
title: "Flask"
description: "Get started with Flask micro framework in 5 minutes"
tags: ["backend", "python", "framework"]
---

## TL;DR

**What**: A lightweight WSGI web application framework in Python.

**Why**: Minimal, flexible, easy to learn, great for APIs and small apps.

## Quick Start

**Install and create app**:
```bash
pip install flask
```

Create `app.py`:
```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
```

**Run**:
```bash
python app.py
# Or
flask run
```

Open http://localhost:5000

## Cheatsheet

| Command | Description |
|---------|-------------|
| `flask run` | Start dev server |
| `flask run --debug` | Start with debug mode |
| `flask shell` | Interactive shell |
| `flask routes` | Show all routes |

**Common patterns**:
```python
@app.route('/path')           # GET route
@app.route('/path', methods=['POST'])  # POST route
@app.route('/user/<id>')      # URL parameter
@app.route('/user/<int:id>')  # Typed parameter
```

## Gotchas

### Request and Response

```python
from flask import request, jsonify

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json  # Get JSON body
    name = request.args.get('name')  # Query param
    return jsonify({'user': data}), 201
```

### URL parameters

```python
@app.route('/users/<int:user_id>')
def get_user(user_id):
    return jsonify({'id': user_id})

@app.route('/files/<path:filename>')
def get_file(filename):
    return f'File: {filename}'
```

### Templates (Jinja2)

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

### Blueprints for modular apps

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

- [Flask Documentation](https://flask.palletsprojects.com/) - Official docs
- [Flask Tutorial](https://flask.palletsprojects.com/tutorial/) - Official tutorial
- [Flask-RESTful](https://flask-restful.readthedocs.io/) - REST extensions
- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) - Comprehensive guide
