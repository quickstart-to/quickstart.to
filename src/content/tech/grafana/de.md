---
title: "Grafana"
description: "Observability-Dashboards - Metriken aus Prometheus, Loki und 50+ Datenquellen visualisieren mit Alerting"
template: "tool"
tags: ["devops", "monitoring", "visualization"]
---

## TL;DR

**Was**: Eine Open-Source-Analyse- und Visualisierungsplattform.

**Warum**: Schöne Dashboards, mehrere Datenquellen, Alerting, umfangreiches Plugin-Ökosystem.

## Quick Start

**Installation mit Docker**:
```bash
docker run -d --name grafana \
  -p 3000:3000 \
  grafana/grafana
```

Öffnen Sie http://localhost:3000 (admin/admin)

**Oder mit Docker Compose** (mit Prometheus):
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

| Aktion | Wie |
|--------|-----|
| Datenquelle hinzufügen | Einstellungen → Datenquellen → Hinzufügen |
| Dashboard erstellen | + → Dashboard |
| Panel hinzufügen | Dashboard → Panel hinzufügen |
| Dashboard importieren | + → Import → ID eingeben |
| Alert erstellen | Panel → Alert → Erstellen |

## Gotchas

### Adding Prometheus data source

1. Gehen Sie zu Konfiguration → Datenquellen
2. Klicken Sie auf "Datenquelle hinzufügen"
3. Wählen Sie Prometheus
4. URL: `http://prometheus:9090` (oder Ihre Prometheus-URL)
5. Klicken Sie auf "Speichern & Testen"

### Basic panel query (Prometheus)

```promql
# Request-Rate
rate(http_requests_total[5m])

# Mit Legende
rate(http_requests_total{job="api"}[5m])
# Legende: {{method}} {{path}}
```

### Dashboard variables

```
# Query-Variable
label_values(http_requests_total, job)

# Im Panel verwenden
http_requests_total{job="$job"}
```

### Popular dashboard IDs

| Dashboard | ID |
|-----------|-----|
| Node Exporter Full | 1860 |
| Docker Containers | 893 |
| Kubernetes Cluster | 6417 |
| Nginx | 9614 |

Import: Dashboard → Import → ID eingeben

### Alerting

```yaml
# Grafana 9+ vereinheitlichtes Alerting
# In UI erstellen: Alert Rules → Neue Alert-Regel
# Oder via YAML provisionieren:

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

- [Grafana Dokumentation](https://grafana.com/docs/grafana/) - Offizielle Docs
- [Grafana Dashboards](https://grafana.com/grafana/dashboards/) - Community Dashboards
- [Grafana Tutorials](https://grafana.com/tutorials/) - Lernen
- [Grafana Plugins](https://grafana.com/grafana/plugins/) - Erweiterungen
