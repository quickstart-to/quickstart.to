---
title: "Celery"
description: "5 分钟快速入门 Celery 任务队列"
template: "tool"
tags: ["python", "queue", "async"]
---

## TL;DR

**是什么**：Python 的分布式任务队列，支持实时处理。

**为什么用**：异步任务执行、调度、重试、多代理支持、监控。

## Quick Start

**安装**：
```bash
pip install celery redis
```

**创建任务**（`tasks.py`）：
```python
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0')

@app.task
def add(x, y):
    return x + y
```

**启动 worker**：
```bash
celery -A tasks worker --loglevel=info
```

**调用任务**：
```python
from tasks import add

# 异步调用
result = add.delay(4, 4)
print(result.get())  # 8

# 或使用 apply_async
result = add.apply_async((4, 4), countdown=10)  # 10 秒后执行
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `celery -A app worker` | 启动 worker |
| `celery -A app beat` | 启动调度器 |
| `celery -A app flower` | 启动监控 UI |
| `celery -A app inspect active` | 显示活动任务 |
| `celery -A app purge` | 清除所有消息 |
| `celery -A app status` | 显示 worker 状态 |

## Gotchas

### 项目结构

```python
# proj/celery.py
from celery import Celery

app = Celery('proj')
app.config_from_object('proj.celeryconfig')
app.autodiscover_tasks(['proj.tasks'])

# proj/celeryconfig.py
broker_url = 'redis://localhost:6379/0'
result_backend = 'redis://localhost:6379/0'
task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']
timezone = 'UTC'
enable_utc = True
```

### 任务选项

```python
@app.task(bind=True, max_retries=3, default_retry_delay=60)
def process_data(self, data):
    try:
        # 处理数据
        return result
    except Exception as exc:
        raise self.retry(exc=exc)

@app.task(rate_limit='10/m')  # 每分钟 10 个
def limited_task():
    pass

@app.task(time_limit=300)  # 5 分钟超时
def long_task():
    pass
```

### 任务链

```python
from celery import chain, group, chord

# Chain：顺序执行
result = chain(add.s(2, 2), add.s(4), add.s(8))()

# Group：并行执行
result = group(add.s(2, 2), add.s(4, 4))()

# Chord：group + 回调
result = chord([add.s(i, i) for i in range(10)], sum_all.s())()
```

### 定时任务（beat）

```python
# celeryconfig.py
from celery.schedules import crontab

beat_schedule = {
    'add-every-30-seconds': {
        'task': 'tasks.add',
        'schedule': 30.0,
        'args': (16, 16)
    },
    'daily-report': {
        'task': 'tasks.send_report',
        'schedule': crontab(hour=7, minute=30),
    },
}
```

### 使用 Flower 监控

```bash
pip install flower
celery -A proj flower --port=5555
# 访问 http://localhost:5555
```

## Next Steps

- [Celery 文档](https://docs.celeryq.dev/) - 官方文档
- [Celery 最佳实践](https://docs.celeryq.dev/en/stable/userguide/tasks.html#tips-and-best-practices) - 技巧
- [Flower](https://flower.readthedocs.io/) - 监控工具
- [Django Celery](https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html) - Django 集成
