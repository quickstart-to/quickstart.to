---
title: "Prometheus"
description: "Metrics-based monitoring - pull model, PromQL queries, alerting, ideal for cloud-native and Kubernetes"
template: "tool"
tags: ["devops", "monitoring", "observability"]
---

## TL;DR

**What**: An open-source monitoring and alerting toolkit.

**Why**: Pull-based metrics, powerful query language (PromQL), service discovery, alerting.

## Quick Start

**Install with Docker**:
```bash
docker run -d --name prometheus \
  -p 9090:9090 \
  prom/prometheus
```

Open http://localhost:9090

**Or with config file**:
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
| `metric_name` | Select metric |
| `metric{label="value"}` | Filter by label |
| `rate(metric[5m])` | Per-second rate |
| `sum(metric)` | Aggregate sum |
| `avg by (label)(metric)` | Average grouped |
| `histogram_quantile(0.95, metric)` | 95th percentile |

## Gotchas

### PromQL queries

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

### Instrument your app

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

### Alerting rules

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

### Scrape config

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

- [Prometheus Documentation](https://prometheus.io/docs/) - Official docs
- [PromQL Tutorial](https://prometheus.io/docs/prometheus/latest/querying/basics/) - Query language
- [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) - Alert routing
- [Grafana](https://grafana.com/) - Visualization
