---
title: "Grafana"
description: "5 分钟快速入门 Grafana 仪表板"
template: "tool"
tags: ["devops", "monitoring", "visualization"]
---

## TL;DR

**是什么**：开源分析和可视化平台。

**为什么用**：美观的仪表板、多数据源、告警、丰富的插件生态。

## Quick Start

**使用 Docker 安装**：
```bash
docker run -d --name grafana \
  -p 3000:3000 \
  grafana/grafana
```

打开 http://localhost:3000（admin/admin）

**或使用 Docker Compose**（配合 Prometheus）：
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

| 操作 | 方法 |
|--------|-----|
| 添加数据源 | Settings → Data Sources → Add |
| 创建仪表板 | + → Dashboard |
| 添加面板 | Dashboard → Add panel |
| 导入仪表板 | + → Import → 输入 ID |
| 创建告警 | Panel → Alert → Create |

## Gotchas

### 添加 Prometheus 数据源

1. 进入 Configuration → Data Sources
2. 点击 "Add data source"
3. 选择 Prometheus
4. URL: `http://prometheus:9090`（或你的 Prometheus URL）
5. 点击 "Save & Test"

### 基础面板查询（Prometheus）

```promql
# 请求速率
rate(http_requests_total[5m])

# 带图例
rate(http_requests_total{job="api"}[5m])
# 图例：{{method}} {{path}}
```

### 仪表板变量

```
# 查询变量
label_values(http_requests_total, job)

# 在面板中使用
http_requests_total{job="$job"}
```

### 热门仪表板 ID

| 仪表板 | ID |
|-----------|-----|
| Node Exporter Full | 1860 |
| Docker Containers | 893 |
| Kubernetes Cluster | 6417 |
| Nginx | 9614 |

导入：Dashboard → Import → 输入 ID

### 告警

```yaml
# Grafana 9+ 统一告警
# 在 UI 中创建：Alert Rules → New Alert Rule
# 或通过 YAML 配置：

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

- [Grafana 文档](https://grafana.com/docs/grafana/) - 官方文档
- [Grafana 仪表板](https://grafana.com/grafana/dashboards/) - 社区仪表板
- [Grafana 教程](https://grafana.com/tutorials/) - 学习
- [Grafana 插件](https://grafana.com/grafana/plugins/) - 扩展
