---
title: "Django"
description: "5 分钟快速入门 Django Web 框架"
template: "framework"
tags: ["backend", "python", "framework"]
---

## TL;DR

**一句话**：Django 是 Python 的全能 Web 框架——开箱即用，应有尽有。

**核心优势**：
- 管理后台 - 免费获得一个完整 CMS
- ORM - 不用写 SQL 操作数据库
- 安全性 - CSRF、XSS、SQL 注入防护内置
- Django 6.0 - 模板片段、后台任务、CSP 支持

## Core Concepts

### 概念 1：MTV 模式

Django 使用 Model-Template-View（MTV），类似 MVC：

```
Model     → 数据库结构（Python 类）
Template  → 带 Django 模板语言的 HTML
View      → 业务逻辑，连接模型和模板
```

### 概念 2：ORM

用 Python 类定义数据库结构。Django 处理 SQL。

```python
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published = models.DateTimeField(auto_now_add=True)

# 使用 - 不需要 SQL
Article.objects.all()
Article.objects.filter(title__contains='Django')
Article.objects.create(title='Hello', content='World')
```

### 概念 3：URL → View → Template

请求通过 URL 到视图，视图渲染模板：

```python
# urls.py
urlpatterns = [path('articles/', views.article_list)]

# views.py
def article_list(request):
    articles = Article.objects.all()
    return render(request, 'articles.html', {'articles': articles})
```

## Quick Start

### 安装并创建项目

```bash
pip install django
django-admin startproject mysite
cd mysite
python manage.py runserver
```

### 项目结构

```
mysite/
├── mysite/
│   ├── settings.py    # 配置
│   ├── urls.py        # URL 路由
│   └── wsgi.py        # WSGI 入口
├── manage.py          # CLI 工具
└── db.sqlite3         # 默认数据库
```

### 创建应用

```bash
python manage.py startapp blog
```

### 最小示例

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

### 运行

```bash
python manage.py runserver
# 打开 http://localhost:8000/hello/
```

## Gotchas

### 别忘了把应用加到 INSTALLED_APPS

```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    ...
    'blog',  # 你的应用
]
```

### 模型改动后必须迁移

```bash
# 修改 models.py 后
python manage.py makemigrations  # 创建迁移文件
python manage.py migrate         # 应用到数据库
```

### POST 表单需要 CSRF token

```html
<form method="POST">
    {% csrf_token %}
    <input type="text" name="title">
    <button type="submit">提交</button>
</form>
```

### 静态文件需要配置

```python
# settings.py
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']

# 模板中
{% load static %}
<img src="{% static 'logo.png' %}">
```

## When to Use

**适合**：
- 内容丰富的网站（新闻、博客）
- 后台管理为主的应用
- Python 快速原型开发
- 喜欢约定大于配置的团队

**不适合**：
- 微服务（用 FastAPI）
- 实时应用（用 FastAPI + WebSockets）
- 简单 REST API（Django REST Framework 增加复杂度）

**对比**：
| 特性 | Django | FastAPI | Flask |
|------|--------|---------|-------|
| 学习曲线 | 中等 | 简单 | 简单 |
| 内置功能 | 很多 | 很少 | 最少 |
| 管理后台 | 有 | 无 | 无 |
| 异步支持 | 部分 | 完全 | 有限 |

## Next Steps

- [Django 文档](https://docs.djangoproject.com/zh-hans/)
- [Django 教程](https://docs.djangoproject.com/zh-hans/stable/intro/tutorial01/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Django Girls 教程](https://tutorial.djangogirls.org/zh/)

## Cheatsheet

| 命令 | 描述 |
|------|------|
| `django-admin startproject name` | 创建项目 |
| `python manage.py startapp name` | 创建应用 |
| `python manage.py runserver` | 启动开发服务器 |
| `python manage.py makemigrations` | 创建迁移 |
| `python manage.py migrate` | 应用迁移 |
| `python manage.py createsuperuser` | 创建管理员 |
| `python manage.py shell` | 带 Django 的 Python shell |
| `python manage.py test` | 运行测试 |
