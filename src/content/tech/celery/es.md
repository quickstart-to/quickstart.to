---
title: "Celery"
description: "Comienza con la cola de tareas Celery en 5 minutos"
template: "tool"
tags: ["python", "queue", "async"]
---

## TL;DR

**Qué**: Cola de tareas distribuida para Python con procesamiento en tiempo real.

**Por qué**: Ejecución de tareas async, programación, reintentos, múltiples brokers, monitoreo.

## Quick Start

**Instalar**:
```bash
pip install celery redis
```

**Crear tareas** (`tasks.py`):
```python
from celery import Celery

app = Celery('tasks', broker='redis://localhost:6379/0')

@app.task
def add(x, y):
    return x + y
```

**Iniciar worker**:
```bash
celery -A tasks worker --loglevel=info
```

**Llamar tareas**:
```python
from tasks import add

# Llamada async
result = add.delay(4, 4)
print(result.get())  # 8

# O con apply_async
result = add.apply_async((4, 4), countdown=10)  # Ejecutar en 10 segundos
```

## Cheatsheet

| Comando | Descripción |
|---------|-------------|
| `celery -A app worker` | Iniciar worker |
| `celery -A app beat` | Iniciar programador |
| `celery -A app flower` | Iniciar UI de monitoreo |
| `celery -A app inspect active` | Mostrar tareas activas |
| `celery -A app purge` | Purgar todos los mensajes |
| `celery -A app status` | Mostrar estado del worker |

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
        # Procesar datos
        return result
    except Exception as exc:
        raise self.retry(exc=exc)

@app.task(rate_limit='10/m')  # 10 por minuto
def limited_task():
    pass

@app.task(time_limit=300)  # Timeout de 5 minutos
def long_task():
    pass
```

### Task chaining

```python
from celery import chain, group, chord

# Chain: ejecutar en secuencia
result = chain(add.s(2, 2), add.s(4), add.s(8))()

# Group: ejecutar en paralelo
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
# Acceso en http://localhost:5555
```

## Next Steps

- [Documentación de Celery](https://docs.celeryq.dev/) - Documentación oficial
- [Mejores prácticas de Celery](https://docs.celeryq.dev/en/stable/userguide/tasks.html#tips-and-best-practices) - Consejos
- [Flower](https://flower.readthedocs.io/) - Monitoreo
- [Django Celery](https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html) - Integración con Django
