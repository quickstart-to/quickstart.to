---
title: "Prometheus"
description: "Comienza con monitoreo Prometheus en 5 minutos"
template: "tool"
tags: ["devops", "monitoring", "observability"]
---

## TL;DR

**Qué**: Un toolkit de monitoreo y alertas open-source.

**Por qué**: Métricas basadas en pull, lenguaje de consulta potente (PromQL), descubrimiento de servicios, alertas.

## Quick Start

**Instalar con Docker**:
```bash
docker run -d --name prometheus \
  -p 9090:9090 \
  prom/prometheus
```

Abre http://localhost:9090

**O con archivo de configuración**:
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

| PromQL | Descripción |
|--------|-------------|
| `metric_name` | Seleccionar métrica |
| `metric{label="value"}` | Filtrar por etiqueta |
| `rate(metric[5m])` | Tasa por segundo |
| `sum(metric)` | Suma agregada |
| `avg by (label)(metric)` | Promedio agrupado |
| `histogram_quantile(0.95, metric)` | Percentil 95 |

## Gotchas

### Consultas PromQL

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

### Instrumentar tu app

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

### Reglas de alertas

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

### Configuración de scrape

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

- [Prometheus Documentation](https://prometheus.io/docs/) - Documentación oficial
- [PromQL Tutorial](https://prometheus.io/docs/prometheus/latest/querying/basics/) - Lenguaje de consulta
- [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) - Enrutamiento de alertas
- [Grafana](https://grafana.com/) - Visualización
