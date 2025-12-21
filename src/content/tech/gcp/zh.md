---
title: "Google Cloud"
description: "5 分钟快速入门 Google Cloud Platform"
tags: ["cloud", "devops", "google"]
---

## TL;DR

**是什么**：谷歌的云计算平台，拥有 100+ 服务。

**为什么用**：大数据/ML 领先、Kubernetes 发源地、全球网络、有竞争力的定价。

## Quick Start

**安装 gcloud CLI**：
```bash
# macOS
brew install google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash

# 验证
gcloud --version
```

**初始化和认证**：
```bash
# 初始化（打开浏览器）
gcloud init

# 设置项目
gcloud config set project PROJECT_ID

# 列出配置
gcloud config list
```

## Cheatsheet

| 命令 | 描述 |
|---------|-------------|
| `gcloud init` | 初始化 SDK |
| `gcloud auth login` | 认证 |
| `gcloud projects list` | 列出项目 |
| `gcloud compute instances list` | 列出虚拟机 |
| `gcloud container clusters list` | 列出 GKE 集群 |
| `gcloud functions list` | 列出 Cloud Functions |
| `gcloud run services list` | 列出 Cloud Run 服务 |

## Gotchas

### 核心服务

```
计算：       Compute Engine, Cloud Run, GKE, Cloud Functions
存储：       Cloud Storage, Persistent Disk, Filestore
数据库：     Cloud SQL, Firestore, Bigtable, Spanner
分析：       BigQuery, Dataflow, Pub/Sub
ML/AI：      Vertex AI, Vision AI, Natural Language
```

### Cloud Storage (GCS)

```bash
# 创建存储桶
gcloud storage buckets create gs://my-bucket-name

# 上传文件
gcloud storage cp file.txt gs://my-bucket/

# 列出对象
gcloud storage ls gs://my-bucket/

# 下载文件
gcloud storage cp gs://my-bucket/file.txt ./
```

### Compute Engine

```bash
# 创建虚拟机
gcloud compute instances create my-vm \
  --zone=us-central1-a \
  --machine-type=e2-micro \
  --image-family=debian-11 \
  --image-project=debian-cloud

# SSH 到虚拟机
gcloud compute ssh my-vm --zone=us-central1-a

# 停止/删除虚拟机
gcloud compute instances stop my-vm --zone=us-central1-a
gcloud compute instances delete my-vm --zone=us-central1-a
```

### Cloud Run

```bash
# 从源代码部署
gcloud run deploy my-service \
  --source . \
  --region us-central1 \
  --allow-unauthenticated

# 部署容器
gcloud run deploy my-service \
  --image gcr.io/PROJECT_ID/my-image \
  --region us-central1
```

## Next Steps

- [Google Cloud 文档](https://cloud.google.com/docs) - 官方文档
- [Google Cloud 免费套餐](https://cloud.google.com/free) - 免费资源
- [Google Cloud Skills Boost](https://www.cloudskillsboost.google/) - 培训
- [Google Cloud 架构中心](https://cloud.google.com/architecture) - 最佳实践
