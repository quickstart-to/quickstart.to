---
title: "Helm"
description: "5 分钟快速入门 Helm Kubernetes 包管理器"
template: "tool"
tags: ["kubernetes", "devops", "package-manager"]
---

## TL;DR

**是什么**：Kubernetes 的包管理器，管理 chart（包）。

**为什么用**：简化 K8s 部署、版本控制发布、可复用模板、轻松回滚。

## Quick Start

**安装**：
```bash
# macOS
brew install helm

# Linux
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# 验证
helm version
```

**添加仓库并安装 chart**：
```bash
# 添加官方仓库
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# 安装 nginx
helm install my-nginx bitnami/nginx

# 列出发布
helm list
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `helm repo add name url` | 添加 chart 仓库 |
| `helm repo update` | 更新仓库 |
| `helm search repo keyword` | 搜索 chart |
| `helm install name chart` | 安装 chart |
| `helm upgrade name chart` | 升级发布 |
| `helm uninstall name` | 卸载发布 |
| `helm list` | 列出发布 |
| `helm rollback name rev` | 回滚发布 |

## Gotchas

### Chart 结构

```
mychart/
  Chart.yaml          # Chart 元数据
  values.yaml         # 默认值
  charts/             # 依赖
  templates/          # K8s 清单
    deployment.yaml
    service.yaml
    _helpers.tpl      # 模板助手
```

### Chart.yaml

```yaml
apiVersion: v2
name: mychart
description: A Helm chart for my app
version: 0.1.0
appVersion: "1.0.0"

dependencies:
  - name: postgresql
    version: "12.x.x"
    repository: https://charts.bitnami.com/bitnami
```

### values.yaml

```yaml
replicaCount: 2

image:
  repository: nginx
  tag: "1.25"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

resources:
  limits:
    cpu: 100m
    memory: 128Mi
```

### 模板示例

```yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "mychart.fullname" . }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ include "mychart.name" . }}
  template:
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          ports:
            - containerPort: {{ .Values.service.port }}
```

### 常用操作

```bash
# 使用自定义值安装
helm install my-app ./mychart -f custom-values.yaml

# 使用 set 值安装
helm install my-app ./mychart --set replicaCount=3

# 预演（预览）
helm install my-app ./mychart --dry-run --debug

# 升级发布
helm upgrade my-app ./mychart --set image.tag=v2

# 回滚到之前版本
helm rollback my-app 1

# 显示发布历史
helm history my-app
```

## Next Steps

- [Helm 文档](https://helm.sh/docs/) - 官方文档
- [Artifact Hub](https://artifacthub.io/) - 查找 chart
- [Chart 模板指南](https://helm.sh/docs/chart_template_guide/) - 模板编写
- [Helm 最佳实践](https://helm.sh/docs/chart_best_practices/) - 指南
