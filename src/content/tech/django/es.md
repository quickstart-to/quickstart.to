---
title: "Django"
description: "Comienza con el framework web Django en 5 minutos"
template: "framework"
tags: ["backend", "python", "framework"]
---

## TL;DR

**En una línea**: Django es el framework web de Python con baterías incluidas - todo lo que necesitas, listo para usar.

**Fortalezas principales**:
- Panel de administración - un CMS completo gratis
- ORM - operaciones de base de datos sin SQL
- Seguridad - protección CSRF, XSS, inyección SQL incluida
- Django 6.0 - partials de plantillas, tareas en segundo plano, soporte CSP

## Core Concepts

### Concept 1: MTV Pattern

Django usa Model-Template-View (MTV), similar a MVC:

```
Model     → Estructura de base de datos (clases Python)
Template  → HTML con lenguaje de plantillas Django
View      → Lógica de negocio, conecta models con templates
```

### Concept 2: ORM

Define tu esquema de base de datos como clases Python. Django maneja el SQL.

```python
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published = models.DateTimeField(auto_now_add=True)

# Uso - no se necesita SQL
Article.objects.all()
Article.objects.filter(title__contains='Django')
Article.objects.create(title='Hello', content='World')
```

### Concept 3: URL → View → Template

Las peticiones fluyen a través de URLs hacia views, que renderizan templates:

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
│   ├── settings.py    # Configuración
│   ├── urls.py        # Enrutamiento URL
│   └── wsgi.py        # Punto de entrada WSGI
├── manage.py          # Herramienta CLI
└── db.sqlite3         # Base de datos por defecto
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
# Abre http://localhost:8000/hello/
```

## Gotchas

### Don't forget to add apps to INSTALLED_APPS

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    ...
    'blog',  # Tu app
]
```

### Migrations are required after model changes

```bash
# Después de cambiar models.py
python manage.py makemigrations  # Crear archivo de migración
python manage.py migrate         # Aplicar a la base de datos
```

### CSRF token required for POST forms

```html
<form method="POST">
    {% csrf_token %}
    <input type="text" name="title">
    <button type="submit">Enviar</button>
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

**Ideal para**:
- Sitios web con mucho contenido (noticias, blogs)
- Aplicaciones con mucha administración
- Prototipado rápido con Python
- Equipos que prefieren convención sobre configuración

**No ideal para**:
- Microservicios (usa FastAPI)
- Aplicaciones en tiempo real (usa FastAPI + WebSockets)
- APIs REST simples (Django REST Framework añade complejidad)

**Comparación**:
| Característica | Django | FastAPI | Flask |
|---------|--------|---------|-------|
| Curva de aprendizaje | Media | Fácil | Fácil |
| Características incluidas | Muchas | Pocas | Mínimas |
| Panel admin | Sí | No | No |
| Soporte async | Parcial | Completo | Limitado |

## Next Steps

- [Documentación de Django](https://docs.djangoproject.com/)
- [Tutorial de Django](https://docs.djangoproject.com/en/stable/intro/tutorial01/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Tutorial Django Girls](https://tutorial.djangogirls.org/)

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `django-admin startproject name` | Crear proyecto |
| `python manage.py startapp name` | Crear app |
| `python manage.py runserver` | Iniciar servidor de dev |
| `python manage.py makemigrations` | Crear migraciones |
| `python manage.py migrate` | Aplicar migraciones |
| `python manage.py createsuperuser` | Crear usuario admin |
| `python manage.py shell` | Shell Python con Django |
| `python manage.py test` | Ejecutar tests |
