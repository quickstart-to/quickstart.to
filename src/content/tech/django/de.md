---
title: "Django"
description: "Starten Sie mit dem Django Web-Framework in 5 Minuten"
template: "framework"
tags: ["backend", "python", "framework"]
---

## TL;DR

**Eine Zeile**: Django ist Pythons Batteries-Included Web-Framework - alles was Sie brauchen, sofort einsatzbereit.

**Kernstärken**:
- Admin-Panel - ein vollständiges CMS kostenlos
- ORM - Datenbankoperationen ohne SQL
- Sicherheit - CSRF, XSS, SQL-Injection-Schutz eingebaut
- Django 6.0 - Template-Partials, Hintergrund-Tasks, CSP-Unterstützung

## Core Concepts

### Concept 1: MTV Pattern

Django verwendet Model-Template-View (MTV), ähnlich wie MVC:

```
Model     → Datenbankstruktur (Python-Klassen)
Template  → HTML mit Django-Template-Sprache
View      → Geschäftslogik, verbindet Models mit Templates
```

### Concept 2: ORM

Definieren Sie Ihr Datenbankschema als Python-Klassen. Django kümmert sich um das SQL.

```python
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published = models.DateTimeField(auto_now_add=True)

# Verwendung - kein SQL nötig
Article.objects.all()
Article.objects.filter(title__contains='Django')
Article.objects.create(title='Hello', content='World')
```

### Concept 3: URL → View → Template

Anfragen fließen durch URLs zu Views, die Templates rendern:

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
│   ├── settings.py    # Konfiguration
│   ├── urls.py        # URL-Routing
│   └── wsgi.py        # WSGI-Einstiegspunkt
├── manage.py          # CLI-Tool
└── db.sqlite3         # Standard-Datenbank
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
# Öffne http://localhost:8000/hello/
```

## Gotchas

### Don't forget to add apps to INSTALLED_APPS

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    ...
    'blog',  # Ihre App
]
```

### Migrations are required after model changes

```bash
# Nach Änderungen an models.py
python manage.py makemigrations  # Migrationsdatei erstellen
python manage.py migrate         # Auf Datenbank anwenden
```

### CSRF token required for POST forms

```html
<form method="POST">
    {% csrf_token %}
    <input type="text" name="title">
    <button type="submit">Absenden</button>
</form>
```

### Static files need configuration

```python
# settings.py
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']

# Template
{% load static %}
<img src="{% static 'logo.png' %}">
```

## When to Use

**Am besten für**:
- Inhaltsreiche Websites (Nachrichten, Blogs)
- Admin-lastige Anwendungen
- Schnelles Prototyping mit Python
- Teams, die Konvention über Konfiguration bevorzugen

**Nicht ideal für**:
- Microservices (FastAPI verwenden)
- Echtzeit-Anwendungen (FastAPI + WebSockets verwenden)
- Einfache REST-APIs (Django REST Framework erhöht Komplexität)

**Vergleich**:
| Feature | Django | FastAPI | Flask |
|---------|--------|---------|-------|
| Lernkurve | Mittel | Einfach | Einfach |
| Eingebaute Features | Viele | Wenige | Minimal |
| Admin-Panel | Ja | Nein | Nein |
| Async-Unterstützung | Teilweise | Vollständig | Begrenzt |

## Next Steps

- [Django Dokumentation](https://docs.djangoproject.com/)
- [Django Tutorial](https://docs.djangoproject.com/en/stable/intro/tutorial01/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Django Girls Tutorial](https://tutorial.djangogirls.org/)

## Cheatsheet

| Befehl | Beschreibung |
|---------|-------------|
| `django-admin startproject name` | Projekt erstellen |
| `python manage.py startapp name` | App erstellen |
| `python manage.py runserver` | Dev-Server starten |
| `python manage.py makemigrations` | Migrationen erstellen |
| `python manage.py migrate` | Migrationen anwenden |
| `python manage.py createsuperuser` | Admin-Benutzer erstellen |
| `python manage.py shell` | Python-Shell mit Django |
| `python manage.py test` | Tests ausführen |
