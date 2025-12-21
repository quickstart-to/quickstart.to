---
title: "Django"
description: "Get started with Django web framework in 5 minutes"
tags: ["backend", "python", "framework"]
---

## TL;DR

**What**: A high-level Python web framework that encourages rapid development.

**Why**: Batteries included, admin panel, ORM, security features, great documentation.

## Quick Start

**Install and create project**:
```bash
pip install django
django-admin startproject mysite
cd mysite
python manage.py runserver
```

Open http://localhost:8000

**Create an app**:
```bash
python manage.py startapp myapp
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `django-admin startproject name` | Create project |
| `python manage.py startapp name` | Create app |
| `python manage.py runserver` | Start dev server |
| `python manage.py makemigrations` | Create migrations |
| `python manage.py migrate` | Apply migrations |
| `python manage.py createsuperuser` | Create admin user |
| `python manage.py shell` | Interactive shell |

## Gotchas

### URL routing

```python
# mysite/urls.py
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapp.urls')),
]

# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('users/<int:id>/', views.user_detail),
]
```

### Views

```python
# Function-based view
from django.http import JsonResponse

def index(request):
    return JsonResponse({'message': 'Hello!'})

# Class-based view
from django.views import View

class UserView(View):
    def get(self, request):
        return JsonResponse({'users': []})
```

### Models and ORM

```python
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

# Usage
User.objects.all()
User.objects.filter(name='John')
User.objects.create(name='John', email='john@example.com')
```

### Settings

```python
# Add app to INSTALLED_APPS
INSTALLED_APPS = [
    ...
    'myapp',
]

# Database (default SQLite)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

## Next Steps

- [Django Documentation](https://docs.djangoproject.com/) - Official docs
- [Django Tutorial](https://docs.djangoproject.com/en/stable/intro/tutorial01/) - Official tutorial
- [Django REST Framework](https://www.django-rest-framework.org/) - REST APIs
- [Django Girls Tutorial](https://tutorial.djangogirls.org/) - Beginner friendly
