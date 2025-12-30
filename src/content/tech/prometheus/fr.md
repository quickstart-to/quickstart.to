---
title: "Prometheus"
description: "Monitoring base sur les metriques - modele pull, requetes PromQL, alerting, ideal pour cloud-natif et Kubernetes"
template: "tool"
tags: ["devops", "monitoring", "observability"]
---

## TL;DR

**Quoi** : Un toolkit de monitoring et d'alerting open-source.

**Pourquoi** : Métriques en mode pull, langage de requête puissant (PromQL), découverte de services, alerting.

## Quick Start

**Installer avec Docker** :
```bash
docker run -d --name prometheus \
  -p 9090:9090 \
  prom/prometheus
```

Ouvrez http://localhost:9090

**Ou avec fichier de configuration** :
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

```bash
docker run -d -p 9090:9090 \
  -v ./prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus
```

## Cheatsheet

| PromQL | Description |
|--------|-------------|
| `metric_name` | Sélectionner une métrique |
| `metric{label="value"}` | Filtrer par label |
| `rate(metric[5m])` | Taux par seconde |
| `sum(metric)` | Somme agrégée |
| `avg by (label)(metric)` | Moyenne groupée |
| `histogram_quantile(0.95, metric)` | 95e percentile |

## Gotchas

### Requêtes PromQL

```promql
# HTTP request rate per second
rate(http_requests_total[5m])

# Error rate percentage
sum(rate(http_requests_total{status=~"5.."}[5m])) /
sum(rate(http_requests_total[5m])) * 100

# CPU usage
100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory usage
node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes
```

### Instrumenter votre app

```python
# Python with prometheus_client
from prometheus_client import Counter, start_http_server

requests_total = Counter('http_requests_total', 'Total requests', ['method', 'path'])

@app.route('/')
def hello():
    requests_total.labels(method='GET', path='/').inc()
    return 'Hello'

start_http_server(8000)  # Metrics endpoint
```

### Règles d'alerting

```yaml
# alert.rules.yml
groups:
  - name: example
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status="500"}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: High error rate detected
```

### Configuration de scrape

```yaml
scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
```

## Next Steps

- [Prometheus Documentation](https://prometheus.io/docs/) - Documentation officielle
- [PromQL Tutorial](https://prometheus.io/docs/prometheus/latest/querying/basics/) - Langage de requête
- [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) - Routage des alertes
- [Grafana](https://grafana.com/) - Visualisation
