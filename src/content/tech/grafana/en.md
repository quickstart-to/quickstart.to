---
title: "Grafana"
description: "Observability dashboards - visualize metrics from Prometheus, Loki, and 50+ data sources with alerting"
template: "tool"
tags: ["devops", "monitoring", "visualization"]
---

## TL;DR

**What**: An open-source analytics and visualization platform.

**Why**: Beautiful dashboards, multiple data sources, alerting, extensive plugin ecosystem.

## Quick Start

**Install with Docker**:
```bash
docker run -d --name grafana \
  -p 3000:3000 \
  grafana/grafana
```

Open http://localhost:3000 (admin/admin)

**Or with Docker Compose** (with Prometheus):
```yaml
version: '3'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=secret
```

## Cheatsheet

| Action | How |
|--------|-----|
| Add data source | Settings → Data Sources → Add |
| Create dashboard | + → Dashboard |
| Add panel | Dashboard → Add panel |
| Import dashboard | + → Import → Enter ID |
| Create alert | Panel → Alert → Create |

## Gotchas

### Adding Prometheus data source

1. Go to Configuration → Data Sources
2. Click "Add data source"
3. Select Prometheus
4. URL: `http://prometheus:9090` (or your Prometheus URL)
5. Click "Save & Test"

### Basic panel query (Prometheus)

```promql
# Request rate
rate(http_requests_total[5m])

# With legend
rate(http_requests_total{job="api"}[5m])
# Legend: {{method}} {{path}}
```

### Dashboard variables

```
# Query variable
label_values(http_requests_total, job)

# Use in panel
http_requests_total{job="$job"}
```

### Popular dashboard IDs

| Dashboard | ID |
|-----------|-----|
| Node Exporter Full | 1860 |
| Docker Containers | 893 |
| Kubernetes Cluster | 6417 |
| Nginx | 9614 |

Import: Dashboard → Import → Enter ID

### Alerting

```yaml
# Grafana 9+ unified alerting
# Create in UI: Alert Rules → New Alert Rule
# Or provision via YAML:

apiVersion: 1
groups:
  - name: example
    rules:
      - alert: HighCPU
        condition: B
        data:
          - refId: A
            datasourceUid: prometheus
            model:
              expr: avg(rate(node_cpu_seconds_total{mode!="idle"}[5m])) > 0.8
```

## Next Steps

- [Grafana Documentation](https://grafana.com/docs/grafana/) - Official docs
- [Grafana Dashboards](https://grafana.com/grafana/dashboards/) - Community dashboards
- [Grafana Tutorials](https://grafana.com/tutorials/) - Learning
- [Grafana Plugins](https://grafana.com/grafana/plugins/) - Extensions
