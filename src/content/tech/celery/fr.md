---
title: "Celery"
description: "File de taches distribuee Python - execution async, planification, reessais, traitement temps reel"
template: "tool"
tags: ["python", "queue", "async"]
---

## TL;DR

**Quoi**: File de tâches distribuée pour Python avec traitement en temps réel.

**Pourquoi**: Exécution de tâches async, planification, réessais, multiples brokers, monitoring.

## Quick Start

**Installer**:
```bash
pip install celery redis
```

**Créer des tâches** (`tasks.py`):
```python
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0')

@app.task
def add(x, y):
    return x + y
```

**Démarrer le worker**:
```bash
celery -A tasks worker --loglevel=info
```

**Appeler des tâches**:
```python
from tasks import add

# Appel async
result = add.delay(4, 4)
print(result.get())  # 8

# Ou avec apply_async
result = add.apply_async((4, 4), countdown=10)  # Exécuter dans 10 secondes
```

## Cheatsheet

| Commande | Description |
|----------|-------------|
| `celery -A app worker` | Démarrer le worker |
| `celery -A app beat` | Démarrer le planificateur |
| `celery -A app flower` | Démarrer l'UI de monitoring |
| `celery -A app inspect active` | Afficher les tâches actives |
| `celery -A app purge` | Purger tous les messages |
| `celery -A app status` | Afficher le statut du worker |

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
        # Traiter les données
        return result
    except Exception as exc:
        raise self.retry(exc=exc)

@app.task(rate_limit='10/m')  # 10 par minute
def limited_task():
    pass

@app.task(time_limit=300)  # Timeout de 5 minutes
def long_task():
    pass
```

### Task chaining

```python
from celery import chain, group, chord

# Chain: exécuter en séquence
result = chain(add.s(2, 2), add.s(4), add.s(8))()

# Group: exécuter en parallèle
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
# Accès à http://localhost:5555
```

## Next Steps

- [Documentation Celery](https://docs.celeryq.dev/) - Documentation officielle
- [Bonnes pratiques Celery](https://docs.celeryq.dev/en/stable/userguide/tasks.html#tips-and-best-practices) - Conseils
- [Flower](https://flower.readthedocs.io/) - Monitoring
- [Django Celery](https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html) - Intégration Django
