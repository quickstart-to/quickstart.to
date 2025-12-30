---
title: "Grafana"
description: "Dashboards d'observabilite - visualiser metriques de Prometheus, Loki et 50+ sources avec alerting"
template: "tool"
tags: ["devops", "monitoring", "visualization"]
---

## TL;DR

**Quoi** : Une plateforme open-source d'analyse et de visualisation.

**Pourquoi** : Beaux dashboards, multiples sources de données, alerting, vaste écosystème de plugins.

## Quick Start

**Installation avec Docker** :
```bash
docker run -d --name grafana \
  -p 3000:3000 \
  grafana/grafana
```

Ouvrez http://localhost:3000 (admin/admin)

**Ou avec Docker Compose** (avec Prometheus) :
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

| Action | Comment |
|--------|-----|
| Ajouter source de données | Paramètres → Sources de données → Ajouter |
| Créer dashboard | + → Dashboard |
| Ajouter panneau | Dashboard → Ajouter panneau |
| Importer dashboard | + → Import → Entrer ID |
| Créer alerte | Panneau → Alerte → Créer |

## Gotchas

### Adding Prometheus data source

1. Allez dans Configuration → Sources de données
2. Cliquez sur "Ajouter une source de données"
3. Sélectionnez Prometheus
4. URL : `http://prometheus:9090` (ou votre URL Prometheus)
5. Cliquez sur "Sauvegarder & Tester"

### Basic panel query (Prometheus)

```promql
# Taux de requêtes
rate(http_requests_total[5m])

# Avec légende
rate(http_requests_total{job="api"}[5m])
# Légende : {{method}} {{path}}
```

### Dashboard variables

```
# Variable de requête
label_values(http_requests_total, job)

# Utiliser dans le panneau
http_requests_total{job="$job"}
```

### Popular dashboard IDs

| Dashboard | ID |
|-----------|-----|
| Node Exporter Full | 1860 |
| Docker Containers | 893 |
| Kubernetes Cluster | 6417 |
| Nginx | 9614 |

Import : Dashboard → Import → Entrer ID

### Alerting

```yaml
# Grafana 9+ alerting unifié
# Créer dans l'UI : Alert Rules → Nouvelle règle d'alerte
# Ou provisionner via YAML :

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

- [Documentation Grafana](https://grafana.com/docs/grafana/) - Docs officielles
- [Dashboards Grafana](https://grafana.com/grafana/dashboards/) - Dashboards communautaires
- [Tutoriels Grafana](https://grafana.com/tutorials/) - Apprentissage
- [Plugins Grafana](https://grafana.com/grafana/plugins/) - Extensions
