---
title: "Django"
description: "Get started with Django web framework in 5 minutes"
template: "framework"
tags: ["backend", "python", "framework"]
---

## TL;DR

**One-liner**: Django is Python's batteries-included web framework - everything you need, ready out of the box.

**Core Strengths**:
- Admin panel - get a full CMS for free
- ORM - database operations without SQL
- Security - CSRF, XSS, SQL injection protection built-in
- Django 6.0 - template partials, background tasks, CSP support

## Core Concepts

### Concept 1: MTV Pattern

Django uses Model-Template-View (MTV), similar to MVC:

```
Model     → Database structure (Python classes)
Template  → HTML with Django template language
View      → Business logic, connects models to templates
```

### Concept 2: ORM

Define your database schema as Python classes. Django handles the SQL.

```python
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published = models.DateTimeField(auto_now_add=True)

# Usage - no SQL needed
Article.objects.all()
Article.objects.filter(title__contains='Django')
Article.objects.create(title='Hello', content='World')
```

### Concept 3: URL → View → Template

Request flows through URLs to views, which render templates:

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
│   ├── urls.py        # URL routing
│   └── wsgi.py        # WSGI entry point
├── manage.py          # CLI tool
└── db.sqlite3         # Default database
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
# Open http://localhost:8000/hello/
```

## Gotchas

### Don't forget to add apps to INSTALLED_APPS

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    ...
    'blog',  # Your app
]
```

### Migrations are required after model changes

```bash
# After changing models.py
python manage.py makemigrations  # Create migration file
python manage.py migrate         # Apply to database
```

### CSRF token required for POST forms

```html
<form method="POST">
    {% csrf_token %}
    <input type="text" name="title">
    <button type="submit">Submit</button>
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

**Best for**:
- Content-heavy websites (news, blogs)
- Admin-heavy applications
- Rapid prototyping with Python
- Teams wanting convention over configuration

**Not ideal for**:
- Microservices (use FastAPI)
- Real-time applications (use FastAPI + WebSockets)
- Simple REST APIs (Django REST Framework adds complexity)

**Comparison**:
| Feature | Django | FastAPI | Flask |
|---------|--------|---------|-------|
| Learning curve | Medium | Easy | Easy |
| Built-in features | Many | Few | Minimal |
| Admin panel | Yes | No | No |
| Async support | Partial | Full | Limited |

## Next Steps

- [Django Documentation](https://docs.djangoproject.com/)
- [Django Tutorial](https://docs.djangoproject.com/en/stable/intro/tutorial01/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Django Girls Tutorial](https://tutorial.djangogirls.org/)

## Cheatsheet

| Command | Description |
|---------|-------------|
| `django-admin startproject name` | Create project |
| `python manage.py startapp name` | Create app |
| `python manage.py runserver` | Start dev server |
| `python manage.py makemigrations` | Create migrations |
| `python manage.py migrate` | Apply migrations |
| `python manage.py createsuperuser` | Create admin user |
| `python manage.py shell` | Python shell with Django |
| `python manage.py test` | Run tests |
