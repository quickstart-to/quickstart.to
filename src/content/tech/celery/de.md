---
title: "Celery"
description: "Python verteilte Task-Queue - async Ausfuhrung, Scheduling, Wiederholungen, Echtzeit-Verarbeitung"
template: "tool"
tags: ["python", "queue", "async"]
---

## TL;DR

**Was**: Verteilte Task-Queue für Python mit Echtzeit-Verarbeitung.

**Warum**: Async-Task-Ausführung, Scheduling, Wiederholungen, mehrere Broker, Monitoring.

## Quick Start

**Installieren**:
```bash
pip install celery redis
```

**Tasks erstellen** (`tasks.py`):
```python
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0')

@app.task
def add(x, y):
    return x + y
```

**Worker starten**:
```bash
celery -A tasks worker --loglevel=info
```

**Tasks aufrufen**:
```python
from tasks import add

# Async-Aufruf
result = add.delay(4, 4)
print(result.get())  # 8

# Oder mit apply_async
result = add.apply_async((4, 4), countdown=10)  # In 10 Sekunden ausführen
```

## Cheatsheet

| Befehl | Beschreibung |
|--------|--------------|
| `celery -A app worker` | Worker starten |
| `celery -A app beat` | Scheduler starten |
| `celery -A app flower` | Monitoring-UI starten |
| `celery -A app inspect active` | Aktive Tasks anzeigen |
| `celery -A app purge` | Alle Nachrichten löschen |
| `celery -A app status` | Worker-Status anzeigen |

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
        # Daten verarbeiten
        return result
    except Exception as exc:
        raise self.retry(exc=exc)

@app.task(rate_limit='10/m')  # 10 pro Minute
def limited_task():
    pass

@app.task(time_limit=300)  # 5 Minuten Timeout
def long_task():
    pass
```

### Task chaining

```python
from celery import chain, group, chord

# Chain: sequentiell ausführen
result = chain(add.s(2, 2), add.s(4), add.s(8))()

# Group: parallel ausführen
result = group(add.s(2, 2), add.s(4, 4))()

# Chord: Group + Callback
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
# Zugriff unter http://localhost:5555
```

## Next Steps

- [Celery-Dokumentation](https://docs.celeryq.dev/) - Offizielle Dokumentation
- [Celery Best Practices](https://docs.celeryq.dev/en/stable/userguide/tasks.html#tips-and-best-practices) - Tipps
- [Flower](https://flower.readthedocs.io/) - Monitoring
- [Django Celery](https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html) - Django-Integration
