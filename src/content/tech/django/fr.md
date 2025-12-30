---
title: "Django"
description: "Démarrez avec le framework web Django en 5 minutes"
template: "framework"
tags: ["backend", "python", "framework"]
---

## TL;DR

**En une ligne** : Django est le framework web Python batteries incluses - tout ce dont vous avez besoin, prêt à l'emploi.

**Forces principales** :
- Panneau d'administration - un CMS complet gratuit
- ORM - opérations de base de données sans SQL
- Sécurité - protection CSRF, XSS, injection SQL intégrée
- Django 6.0 - partials de template, tâches en arrière-plan, support CSP

## Core Concepts

### Concept 1: MTV Pattern

Django utilise Model-Template-View (MTV), similaire à MVC :

```
Model     → Structure de base de données (classes Python)
Template  → HTML avec le langage de template Django
View      → Logique métier, connecte les models aux templates
```

### Concept 2: ORM

Définissez votre schéma de base de données en classes Python. Django gère le SQL.

```python
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published = models.DateTimeField(auto_now_add=True)

# Utilisation - pas de SQL nécessaire
Article.objects.all()
Article.objects.filter(title__contains='Django')
Article.objects.create(title='Hello', content='World')
```

### Concept 3: URL → View → Template

Les requêtes passent par les URLs vers les views, qui rendent les templates :

```python
# urls.py
urlpatterns = [path('articles/', views.article_list)]

# views.py
def article_list(request):
    articles = Article.objects.all()
    return render(request, 'articles.html', {'articles': articles})
```

## Quick Start

### Install and Create Project

```bash
pip install django
django-admin startproject mysite
cd mysite
python manage.py runserver
```

### Project Structure

```
mysite/
├── mysite/
│   ├── settings.py    # Configuration
│   ├── urls.py        # Routage URL
│   └── wsgi.py        # Point d'entrée WSGI
├── manage.py          # Outil CLI
└── db.sqlite3         # Base de données par défaut
```

### Create an App

```bash
python manage.py startapp blog
```

### Minimal Example

```python
# blog/views.py
from django.http import JsonResponse

def hello(request):
    return JsonResponse({'message': 'Hello Django!'})

# mysite/urls.py
from django.urls import path
from blog import views

urlpatterns = [
    path('hello/', views.hello),
]
```

### Run

```bash
python manage.py runserver
# Ouvrez http://localhost:8000/hello/
```

## Gotchas

### Don't forget to add apps to INSTALLED_APPS

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    ...
    'blog',  # Votre app
]
```

### Migrations are required after model changes

```bash
# Après avoir modifié models.py
python manage.py makemigrations  # Créer le fichier de migration
python manage.py migrate         # Appliquer à la base de données
```

### CSRF token required for POST forms

```html
<form method="POST">
    {% csrf_token %}
    <input type="text" name="title">
    <button type="submit">Soumettre</button>
</form>
```

### Static files need configuration

```python
# settings.py
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']

# template
{% load static %}
<img src="{% static 'logo.png' %}">
```

## When to Use

**Idéal pour** :
- Sites web riches en contenu (actualités, blogs)
- Applications nécessitant beaucoup d'administration
- Prototypage rapide avec Python
- Équipes préférant la convention à la configuration

**Pas idéal pour** :
- Microservices (utilisez FastAPI)
- Applications temps réel (utilisez FastAPI + WebSockets)
- APIs REST simples (Django REST Framework ajoute de la complexité)

**Comparaison** :
| Fonctionnalité | Django | FastAPI | Flask |
|---------|--------|---------|-------|
| Courbe d'apprentissage | Moyenne | Facile | Facile |
| Fonctionnalités intégrées | Nombreuses | Peu | Minimales |
| Panneau admin | Oui | Non | Non |
| Support async | Partiel | Complet | Limité |

## Next Steps

- [Documentation Django](https://docs.djangoproject.com/)
- [Tutoriel Django](https://docs.djangoproject.com/en/stable/intro/tutorial01/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Tutoriel Django Girls](https://tutorial.djangogirls.org/)

## Cheatsheet

| Commande | Description |
|---------|-------------|
| `django-admin startproject name` | Créer un projet |
| `python manage.py startapp name` | Créer une app |
| `python manage.py runserver` | Démarrer le serveur de dev |
| `python manage.py makemigrations` | Créer les migrations |
| `python manage.py migrate` | Appliquer les migrations |
| `python manage.py createsuperuser` | Créer un admin |
| `python manage.py shell` | Shell Python avec Django |
| `python manage.py test` | Exécuter les tests |
