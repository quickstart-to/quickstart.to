---
title: "Prometheus"
description: "Starten Sie mit Prometheus-Monitoring in 5 Minuten"
template: "tool"
tags: ["devops", "monitoring", "observability"]
---

## TL;DR

**Was**: Ein Open-Source Monitoring- und Alerting-Toolkit.

**Warum**: Pull-basierte Metriken, mächtige Abfragesprache (PromQL), Service Discovery, Alerting.

## Quick Start

**Mit Docker installieren**:
```bash
docker run -d --name prometheus \
  -p 9090:9090 \
  prom/prometheus
```

Öffnen Sie http://localhost:9090

**Oder mit Konfigurationsdatei**:
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

| PromQL | Beschreibung |
|--------|-------------|
| `metric_name` | Metrik auswählen |
| `metric{label="value"}` | Nach Label filtern |
| `rate(metric[5m])` | Rate pro Sekunde |
| `sum(metric)` | Summe aggregieren |
| `avg by (label)(metric)` | Gruppierter Durchschnitt |
| `histogram_quantile(0.95, metric)` | 95. Perzentil |

## Gotchas

### PromQL-Abfragen

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

### Ihre App instrumentieren

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

### Alerting-Regeln

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

### Scrape-Konfiguration

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

- [Prometheus Documentation](https://prometheus.io/docs/) - Offizielle Dokumentation
- [PromQL Tutorial](https://prometheus.io/docs/prometheus/latest/querying/basics/) - Abfragesprache
- [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) - Alert-Routing
- [Grafana](https://grafana.com/) - Visualisierung
