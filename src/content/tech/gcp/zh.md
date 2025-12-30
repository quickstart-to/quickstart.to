---
title: "Google Cloud"
description: "Google 云基础设施 - Kubernetes 和 BigQuery 的诞生地，前沿 AI/ML，全球网络"
template: "service"
tags: ["cloud", "devops", "google"]
---

## TL;DR

**一句话**：Google Cloud 是谷歌的云平台，拥有 100+ 服务——Kubernetes 的发源地，数据/ML 领域的领导者。

**核心能力**：
- 计算 - 虚拟机、容器、无服务器（Cloud Run 很出色）
- 数据 - BigQuery 分析、Firestore NoSQL
- ML/AI - Vertex AI、预训练模型
- Kubernetes - GKE，最佳托管 K8s 体验

## Architecture

### 服务分类

- **计算**：Compute Engine（虚拟机）、Cloud Run（无服务器）、GKE（Kubernetes）、Cloud Functions
- **存储**：Cloud Storage（对象）、Persistent Disk、Filestore
- **数据库**：Cloud SQL（关系型）、Firestore（NoSQL）、Bigtable、Spanner
- **分析**：BigQuery、Dataflow、Pub/Sub、Dataproc
- **ML/AI**：Vertex AI、Vision AI、Speech-to-Text、Translation

### 核心概念

- **Project**：资源和计费的容器
- **Region/Zone**：资源的地理位置
- **Service Account**：应用程序的身份（不是用户）
- **IAM**：身份和访问管理 - 角色和权限

## Quick Start

### 创建账号

1. 访问 [cloud.google.com](https://cloud.google.com/)
2. 点击"免费开始使用"（90 天 $300 额度）
3. 在 Cloud Console 中创建项目
4. 为项目启用结算

### 安装 CLI

```bash
# macOS
brew install google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# 验证
gcloud --version
```

### 初始化和认证

```bash
# 初始化（打开浏览器认证）
gcloud init

# 设置项目
gcloud config set project PROJECT_ID

# 验证
gcloud config list
```

### 第一个命令

```bash
# 列出项目
gcloud projects list

# 列出计算实例
gcloud compute instances list
```

## Core Services

### 计算

| 服务 | 用途 | 定价模式 |
|------|------|----------|
| Compute Engine | 虚拟机 | 按秒 |
| Cloud Run | 无服务器容器 | 按请求 + CPU/内存 |
| GKE | 托管 Kubernetes | 集群 + 节点 |
| Cloud Functions | 事件驱动函数 | 按调用 |

### 存储和数据库

| 服务 | 用途 | 定价模式 |
|------|------|----------|
| Cloud Storage | 对象存储 | 按 GB + 操作 |
| Cloud SQL | 托管 MySQL/PostgreSQL | 实例 + 存储 |
| Firestore | NoSQL 文档数据库 | 按操作 + 存储 |
| BigQuery | 数据仓库 | 按查询（扫描 TB）|

## Gotchas

### 费用陷阱

- **BigQuery 查询**：扫描整列 → **使用 LIMIT、分区和预览**
- **空闲 GKE 集群**：控制平面收费 → **使用 Autopilot 或删除未用集群**
- **网络出口**：跨区域收费 → **资源保持在同一区域**
- **持久磁盘**：未挂载的磁盘仍收费 → **删除未用磁盘**

### 权限问题

- **403 Forbidden**：检查 IAM 角色 → 确保服务账号有正确角色
- **API 未启用**：在控制台启用或 `gcloud services enable SERVICE_NAME`

### 常见错误

```bash
# "The project PROJECT_ID does not exist"
gcloud projects list  # 验证项目名称

# "PERMISSION_DENIED: Request had insufficient authentication"
gcloud auth login  # 重新认证

# "API not enabled"
gcloud services enable compute.googleapis.com
```

## Next Steps

- [Google Cloud 文档](https://cloud.google.com/docs)
- [Google Cloud 免费套餐](https://cloud.google.com/free)
- [Google Cloud Skills Boost](https://www.cloudskillsboost.google/)
- [Google Cloud 架构中心](https://cloud.google.com/architecture)
