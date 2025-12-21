---
title: "Django"
description: "5 分钟快速入门 Django Web 框架"
tags: ["backend", "python", "framework"]
---

## TL;DR

**是什么**：鼓励快速开发的高级 Python Web 框架。

**为什么用**：功能齐全、自带管理面板、ORM、安全特性、优秀的文档。

## Quick Start

**安装并创建项目**：
```bash
pip install django
django-admin startproject mysite
cd mysite
python manage.py runserver
```

打开 http://localhost:8000

**创建应用**：
```bash
python manage.py startapp myapp
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `django-admin startproject name` | 创建项目 |
| `python manage.py startapp name` | 创建应用 |
| `python manage.py runserver` | 启动开发服务器 |
| `python manage.py makemigrations` | 创建迁移 |
| `python manage.py migrate` | 应用迁移 |
| `python manage.py createsuperuser` | 创建管理员用户 |
| `python manage.py shell` | 交互式 shell |

## Gotchas

### URL 路由

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

### 视图

```python
# 函数视图
from django.http import JsonResponse

def index(request):
    return JsonResponse({'message': 'Hello!'})

# 类视图
from django.views import View

class UserView(View):
    def get(self, request):
        return JsonResponse({'users': []})
```

### 模型和 ORM

```python
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

# 使用
User.objects.all()
User.objects.filter(name='John')
User.objects.create(name='John', email='john@example.com')
```

### 设置

```python
# 添加应用到 INSTALLED_APPS
INSTALLED_APPS = [
    ...
    'myapp',
]

# 数据库（默认 SQLite）
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

## Next Steps

- [Django 文档](https://docs.djangoproject.com/zh-hans/) - 官方文档
- [Django 教程](https://docs.djangoproject.com/zh-hans/stable/intro/tutorial01/) - 官方教程
- [Django REST Framework](https://www.django-rest-framework.org/) - REST API
- [Django Girls 教程](https://tutorial.djangogirls.org/zh/) - 新手友好
