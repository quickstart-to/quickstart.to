---
title: "Grafana"
description: "Comienza con dashboards de Grafana en 5 minutos"
template: "tool"
tags: ["devops", "monitoring", "visualization"]
---

## TL;DR

**Qué**: Una plataforma open-source de análisis y visualización.

**Por qué**: Dashboards hermosos, múltiples fuentes de datos, alertas, extenso ecosistema de plugins.

## Quick Start

**Instalación con Docker**:
```bash
docker run -d --name grafana \
  -p 3000:3000 \
  grafana/grafana
```

Abre http://localhost:3000 (admin/admin)

**O con Docker Compose** (con Prometheus):
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

| Acción | Cómo |
|--------|-----|
| Añadir fuente de datos | Configuración → Fuentes de datos → Añadir |
| Crear dashboard | + → Dashboard |
| Añadir panel | Dashboard → Añadir panel |
| Importar dashboard | + → Import → Ingresar ID |
| Crear alerta | Panel → Alerta → Crear |

## Gotchas

### Adding Prometheus data source

1. Ve a Configuración → Fuentes de datos
2. Haz clic en "Añadir fuente de datos"
3. Selecciona Prometheus
4. URL: `http://prometheus:9090` (o tu URL de Prometheus)
5. Haz clic en "Guardar y Probar"

### Basic panel query (Prometheus)

```promql
# Tasa de requests
rate(http_requests_total[5m])

# Con leyenda
rate(http_requests_total{job="api"}[5m])
# Leyenda: {{method}} {{path}}
```

### Dashboard variables

```
# Variable de consulta
label_values(http_requests_total, job)

# Usar en panel
http_requests_total{job="$job"}
```

### Popular dashboard IDs

| Dashboard | ID |
|-----------|-----|
| Node Exporter Full | 1860 |
| Docker Containers | 893 |
| Kubernetes Cluster | 6417 |
| Nginx | 9614 |

Importar: Dashboard → Import → Ingresar ID

### Alerting

```yaml
# Grafana 9+ alerting unificado
# Crear en UI: Alert Rules → Nueva regla de alerta
# O provisionar via YAML:

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

- [Documentación de Grafana](https://grafana.com/docs/grafana/) - Docs oficiales
- [Dashboards de Grafana](https://grafana.com/grafana/dashboards/) - Dashboards de la comunidad
- [Tutoriales de Grafana](https://grafana.com/tutorials/) - Aprendizaje
- [Plugins de Grafana](https://grafana.com/grafana/plugins/) - Extensiones
