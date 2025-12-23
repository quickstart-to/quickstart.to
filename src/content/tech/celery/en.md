---
title: "Celery"
description: "Get started with Celery task queue in 5 minutes"
template: "tool"
tags: ["python", "queue", "async"]
---

## TL;DR

**What**: Distributed task queue for Python with real-time processing.

**Why**: Async task execution, scheduling, retries, multiple brokers, monitoring.

## Quick Start

**Install**:
```bash
pip install celery redis
```

**Create tasks** (`tasks.py`):
```python
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0')

@app.task
def add(x, y):
    return x + y
```

**Start worker**:
```bash
celery -A tasks worker --loglevel=info
```

**Call tasks**:
```python
from tasks import add

# Async call
result = add.delay(4, 4)
print(result.get())  # 8

# Or with apply_async
result = add.apply_async((4, 4), countdown=10)  # Execute in 10 seconds
```

## Cheatsheet

| Command | Description |
|---------|-------------|
| `celery -A app worker` | Start worker |
| `celery -A app beat` | Start scheduler |
| `celery -A app flower` | Start monitoring UI |
| `celery -A app inspect active` | Show active tasks |
| `celery -A app purge` | Purge all messages |
| `celery -A app status` | Show worker status |

## Gotchas

### Project structure

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

### Task options

```python
@app.task(bind=True, max_retries=3, default_retry_delay=60)
def process_data(self, data):
    try:
        # Process data
        return result
    except Exception as exc:
        raise self.retry(exc=exc)

@app.task(rate_limit='10/m')  # 10 per minute
def limited_task():
    pass

@app.task(time_limit=300)  # 5 minute timeout
def long_task():
    pass
```

### Task chaining

```python
from celery import chain, group, chord

# Chain: execute in sequence
result = chain(add.s(2, 2), add.s(4), add.s(8))()

# Group: execute in parallel
result = group(add.s(2, 2), add.s(4, 4))()

# Chord: group + callback
result = chord([add.s(i, i) for i in range(10)], sum_all.s())()
```

### Periodic tasks (beat)

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

### Monitoring with Flower

```bash
pip install flower
celery -A proj flower --port=5555
# Access at http://localhost:5555
```

## Next Steps

- [Celery Documentation](https://docs.celeryq.dev/) - Official docs
- [Celery Best Practices](https://docs.celeryq.dev/en/stable/userguide/tasks.html#tips-and-best-practices) - Tips
- [Flower](https://flower.readthedocs.io/) - Monitoring
- [Django Celery](https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html) - Django integration
