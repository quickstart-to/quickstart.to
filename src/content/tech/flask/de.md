---
title: "Flask"
description: "Python Micro-Framework - minimaler Kern, flexible Architektur, fuegen Sie nur hinzu was Sie brauchen"
template: "framework"
tags: ["backend", "python", "framework"]
---

## TL;DR

**Eine Zeile**: Flask ist Pythons Micro-Framework - minimaler Kern, fügen Sie hinzu, was Sie brauchen.

**Kernstärken**:
- Minimal und flexibel - keine erzwungene Projektstruktur
- Leicht zu lernen - in Minuten einsatzbereit
- Erweiterbar - riesiges Ökosystem von Extensions
- Werkzeug + Jinja2 - kampferprobte Grundlagen

## Core Concepts

### Concept 1: Routes = Decorators

Routen mit Dekoratoren definieren:

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hallo!'

@app.route('/users/<int:user_id>')
def get_user(user_id):
    return f'Benutzer {user_id}'
```

### Concept 2: Request Context

Auf Request-Daten über das `request`-Objekt zugreifen:

```python
from flask import request

@app.route('/search')
def search():
    query = request.args.get('q')        # Query-Parameter
    page = request.args.get('page', 1)   # Mit Standard
    return f'Suche: {query}'

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json                   # JSON-Body
    return {'created': data}
```

### Concept 3: Extensions

Flask ist absichtlich minimal. Features mit Extensions hinzufügen:

```python
# Datenbank
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy(app)

# Authentifizierung
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
    return jsonify({'message': 'Hallo Flask!'})

if __name__ == '__main__':
    app.run(debug=True)
```

### Run

```bash
flask run --debug
# Öffne http://localhost:5000
```

## Gotchas

### Debug mode is opt-in

```bash
# Entwicklung - aktiviert Auto-Reload und Debugger
flask run --debug

# Oder im Code (nicht für Produktion!)
app.run(debug=True)

# Produktion - niemals debug=True verwenden
gunicorn app:app
```

### Methods must be specified

```python
# ❌ POST funktioniert nicht
@app.route('/users')
def users():
    return 'Benutzer'

# ✅ POST explizit erlauben
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        return 'Erstellt', 201
    return 'Benutzer'
```

### Application context required

```python
# ❌ Fehler außerhalb eines Requests
from flask import current_app
print(current_app.config)  # RuntimeError!

# ✅ Kontext manuell pushen
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

**Am besten für**:
- Kleine bis mittlere APIs
- Prototypen und MVPs
- Teams, die volle Kontrolle wollen
- Microservices

**Nicht ideal für**:
- Große Apps, die Struktur brauchen (Django verwenden)
- Async-lastige Apps (FastAPI verwenden)
- Produktions-APIs, die Auto-Docs brauchen (FastAPI verwenden)

**Vergleich**:
| Feature | Flask | Django | FastAPI |
|---------|-------|--------|---------|
| Größe | Micro | Voll | Micro |
| Lernkurve | Einfach | Mittel | Einfach |
| Auto-Docs | Nein | Nein | Ja |
| Async | Begrenzt | Begrenzt | Nativ |

## Next Steps

- [Flask Dokumentation](https://flask.palletsprojects.com/)
- [Flask Tutorial](https://flask.palletsprojects.com/tutorial/)
- [Flask-RESTful](https://flask-restful.readthedocs.io/)
- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Route | `@app.route('/path')` |
| Methoden | `@app.route('/', methods=['GET', 'POST'])` |
| URL-Parameter | `@app.route('/<int:id>')` |
| Query-Parameter | `request.args.get('q')` |
| JSON-Body | `request.json` |
| JSON-Antwort | `jsonify({'key': 'value'})` |
| Status-Code | `return data, 201` |
| Redirect | `redirect(url_for('index'))` |
| Template | `render_template('index.html', name=name)` |
| Blueprint | `Blueprint('name', __name__)` |
