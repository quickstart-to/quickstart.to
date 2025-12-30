---
title: "Flask"
description: "Démarrez avec le micro framework Flask en 5 minutes"
template: "framework"
tags: ["backend", "python", "framework"]
---

## TL;DR

**En une ligne** : Flask est le micro framework de Python - noyau minimal, ajoutez ce dont vous avez besoin.

**Forces principales** :
- Minimal et flexible - pas de structure de projet imposée
- Facile à apprendre - opérationnel en minutes
- Extensible - énorme écosystème d'extensions
- Werkzeug + Jinja2 - fondations éprouvées

## Core Concepts

### Concept 1: Routes = Decorators

Définir les routes avec des décorateurs :

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Bonjour!'

@app.route('/users/<int:user_id>')
def get_user(user_id):
    return f'Utilisateur {user_id}'
```

### Concept 2: Request Context

Accéder aux données de requête via l'objet `request` :

```python
from flask import request

@app.route('/search')
def search():
    query = request.args.get('q')        # Paramètres de requête
    page = request.args.get('page', 1)   # Avec défaut
    return f'Recherche: {query}'

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json                   # Corps JSON
    return {'created': data}
```

### Concept 3: Extensions

Flask est intentionnellement minimal. Ajoutez des fonctionnalités avec des extensions :

```python
# Base de données
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy(app)

# Authentification
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
    return jsonify({'message': 'Bonjour Flask!'})

if __name__ == '__main__':
    app.run(debug=True)
```

### Run

```bash
flask run --debug
# Ouvrez http://localhost:5000
```

## Gotchas

### Debug mode is opt-in

```bash
# Développement - active l'auto-reload et le débogueur
flask run --debug

# Ou dans le code (pas pour la production !)
app.run(debug=True)

# Production - ne jamais utiliser debug=True
gunicorn app:app
```

### Methods must be specified

```python
# ❌ POST ne fonctionnera pas
@app.route('/users')
def users():
    return 'Utilisateurs'

# ✅ Autoriser explicitement POST
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        return 'Créé', 201
    return 'Utilisateurs'
```

### Application context required

```python
# ❌ Erreur en dehors d'une requête
from flask import current_app
print(current_app.config)  # RuntimeError!

# ✅ Pousser le contexte manuellement
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

**Idéal pour** :
- APIs petites à moyennes
- Prototypes et MVPs
- Équipes voulant un contrôle total
- Microservices

**Pas idéal pour** :
- Grandes apps nécessitant de la structure (utilisez Django)
- Apps fortement async (utilisez FastAPI)
- APIs de production nécessitant des auto-docs (utilisez FastAPI)

**Comparaison** :
| Fonctionnalité | Flask | Django | FastAPI |
|---------|-------|--------|---------|
| Taille | Micro | Complet | Micro |
| Courbe d'apprentissage | Facile | Moyenne | Facile |
| Auto docs | Non | Non | Oui |
| Async | Limité | Limité | Natif |

## Next Steps

- [Documentation Flask](https://flask.palletsprojects.com/)
- [Tutoriel Flask](https://flask.palletsprojects.com/tutorial/)
- [Flask-RESTful](https://flask-restful.readthedocs.io/)
- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

## Cheatsheet

| Pattern | Code |
|---------|------|
| Route | `@app.route('/path')` |
| Méthodes | `@app.route('/', methods=['GET', 'POST'])` |
| Paramètre URL | `@app.route('/<int:id>')` |
| Paramètre query | `request.args.get('q')` |
| Corps JSON | `request.json` |
| Réponse JSON | `jsonify({'key': 'value'})` |
| Code de statut | `return data, 201` |
| Redirection | `redirect(url_for('index'))` |
| Template | `render_template('index.html', name=name)` |
| Blueprint | `Blueprint('name', __name__)` |
