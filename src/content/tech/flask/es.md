---
title: "Flask"
description: "Comienza con el micro framework Flask en 5 minutos"
template: "framework"
tags: ["backend", "python", "framework"]
---

## TL;DR

**En una línea**: Flask es el micro framework de Python - núcleo mínimo, añade lo que necesites.

**Fortalezas principales**:
- Mínimo y flexible - sin estructura de proyecto forzada
- Fácil de aprender - funcionando en minutos
- Extensible - enorme ecosistema de extensiones
- Werkzeug + Jinja2 - fundaciones probadas en batalla

## Core Concepts

### Concept 1: Routes = Decorators

Define rutas con decoradores:

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return '¡Hola!'

@app.route('/users/<int:user_id>')
def get_user(user_id):
    return f'Usuario {user_id}'
```

### Concept 2: Request Context

Accede a datos de request a través del objeto `request`:

```python
from flask import request

@app.route('/search')
def search():
    query = request.args.get('q')        # Parámetros de query
    page = request.args.get('page', 1)   # Con valor por defecto
    return f'Buscando: {query}'

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json                   # Cuerpo JSON
    return {'created': data}
```

### Concept 3: Extensions

Flask es intencionalmente mínimo. Añade características con extensiones:

```python
# Base de datos
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy(app)

# Autenticación
from flask_login import LoginManager
login = LoginManager(app)

# APIs REST
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
    return jsonify({'message': '¡Hola Flask!'})

if __name__ == '__main__':
    app.run(debug=True)
```

### Run

```bash
flask run --debug
# Abre http://localhost:5000
```

## Gotchas

### Debug mode is opt-in

```bash
# Desarrollo - habilita auto-reload y debugger
flask run --debug

# O en código (¡no para producción!)
app.run(debug=True)

# Producción - nunca usar debug=True
gunicorn app:app
```

### Methods must be specified

```python
# ❌ POST no funcionará
@app.route('/users')
def users():
    return 'Usuarios'

# ✅ Permitir POST explícitamente
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        return 'Creado', 201
    return 'Usuarios'
```

### Application context required

```python
# ❌ Error fuera de un request
from flask import current_app
print(current_app.config)  # RuntimeError!

# ✅ Empujar contexto manualmente
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

**Ideal para**:
- APIs pequeñas a medianas
- Prototipos y MVPs
- Equipos que quieren control total
- Microservicios

**No ideal para**:
- Apps grandes que necesitan estructura (usa Django)
- Apps con mucho async (usa FastAPI)
- APIs de producción que necesitan auto-docs (usa FastAPI)

**Comparación**:
| Característica | Flask | Django | FastAPI |
|---------|-------|--------|---------|
| Tamaño | Micro | Completo | Micro |
| Curva de aprendizaje | Fácil | Media | Fácil |
| Auto docs | No | No | Sí |
| Async | Limitado | Limitado | Nativo |

## Next Steps

- [Documentación de Flask](https://flask.palletsprojects.com/)
- [Tutorial de Flask](https://flask.palletsprojects.com/tutorial/)
- [Flask-RESTful](https://flask-restful.readthedocs.io/)
- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

## Cheatsheet

| Patrón | Código |
|---------|------|
| Ruta | `@app.route('/path')` |
| Métodos | `@app.route('/', methods=['GET', 'POST'])` |
| Parámetro URL | `@app.route('/<int:id>')` |
| Parámetro query | `request.args.get('q')` |
| Cuerpo JSON | `request.json` |
| Respuesta JSON | `jsonify({'key': 'value'})` |
| Código de estado | `return data, 201` |
| Redirección | `redirect(url_for('index'))` |
| Template | `render_template('index.html', name=name)` |
| Blueprint | `Blueprint('name', __name__)` |
