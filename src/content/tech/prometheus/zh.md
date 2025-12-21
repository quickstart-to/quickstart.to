---
title: "Prometheus"
description: "5 分钟快速入门 Prometheus 监控"
tags: ["devops", "monitoring", "observability"]
---

## TL;DR

**是什么**：开源监控和告警工具包。

**为什么用**：拉取式指标、强大的查询语言（PromQL）、服务发现、告警。

## Quick Start

**使用 Docker 安装**：
```bash
docker run -d --name prometheus \
  -p 9090:9090 \
  prom/prometheus
```

打开 http://localhost:9090

**或使用配置文件**：
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

| PromQL | 描述 |
|--------|-------------|
| `metric_name` | 选择指标 |
| `metric{label="value"}` | 按标签过滤 |
| `rate(metric[5m])` | 每秒速率 |
| `sum(metric)` | 聚合求和 |
| `avg by (label)(metric)` | 分组平均 |
| `histogram_quantile(0.95, metric)` | 95 分位数 |

## Gotchas

### PromQL 查询

```promql
# 每秒 HTTP 请求速率
rate(http_requests_total[5m])

# 错误率百分比
sum(rate(http_requests_total{status=~"5.."}[5m])) /
sum(rate(http_requests_total[5m])) * 100

# CPU 使用率
100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# 内存使用
node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes
```

### 应用程序埋点

```python
# Python 使用 prometheus_client
from prometheus_client import Counter, start_http_server

requests_total = Counter('http_requests_total', 'Total requests', ['method', 'path'])

@app.route('/')
def hello():
    requests_total.labels(method='GET', path='/').inc()
    return 'Hello'

start_http_server(8000)  # 指标端点
```

### 告警规则

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
          summary: 检测到高错误率
```

### 抓取配置

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

- [Prometheus 文档](https://prometheus.io/docs/) - 官方文档
- [PromQL 教程](https://prometheus.io/docs/prometheus/latest/querying/basics/) - 查询语言
- [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) - 告警路由
- [Grafana](https://grafana.com/) - 可视化
